<?php
// What we do?
define( 'DOING_AJAX', true );

// Only for our requests
if ( ! filter_input( INPUT_POST, 'action', FILTER_SANITIZE_FULL_SPECIAL_CHARS ) ) {
    die( '-1' );
}

// Hide any errors
ini_set( 'html_errors', 0 );

// Tell WordPress to load as little as possible
define( 'SHORTINIT', true );

// Load minimal
$path = explode( 'wp-content', __FILE__ );
if ( is_file( reset( $path ) . 'wp-load.php' ) ) {
	require_once( reset( $path ) . 'wp-load.php' );
} else {
	die( '-1' );
}

// Extra Security
$action = filter_input( INPUT_POST, 'action', FILTER_SANITIZE_FULL_SPECIAL_CHARS );
$allowed_actions = [ 'preload', 'clear' ];

if( ! in_array( $action, $allowed_actions, true ) ) {
    die( '-1' );
}

// Typical Headers
header( 'Content-Type: text/html' );
send_nosniff_header();

// Disable Caching
header( 'Cache-Control: no-cache' );
header( 'Pragma: no-cache' );

// Constants
wp_plugin_directory_constants();
wp_functionality_constants();
wp_cookie_constants();
wp_ssl_constants();

// Default Data
$data = [];

// Require files
require_once( ABSPATH . WPINC . '/meta.php' );

$object = filter_input( INPUT_POST, 'object', FILTER_SANITIZE_FULL_SPECIAL_CHARS );

switch( $object ) {
    // Taxonomy required
    case 'taxonomy':
        // Translations are required.
        wp_load_translations_early();
        
        require_once( ABSPATH . WPINC . '/taxonomy.php' );
        require_once( ABSPATH . WPINC . '/class-wp-term.php' );


        $get_meta = 'get_term_meta';
        $set_meta = 'update_term_meta';
        $callback = 'delete_term_meta';
    break;
    // Post required
    default:
        require_once( ABSPATH . WPINC . '/post.php' );
        require_once( ABSPATH . WPINC . '/revision.php' );
        require_once( ABSPATH . WPINC . '/class-wp-post.php' );

        $get_meta = 'get_post_meta';
        $set_meta = 'update_post_meta';
        $callback = 'delete_post_meta';
    break;
}

switch( $action ) :

    // Preload critical media
    case 'preload' :
        // Formatting
        require_once( ABSPATH . WPINC . '/kses.php' );
        require_once( ABSPATH . WPINC . '/formatting.php' );

        $device     = filter_input( INPUT_POST, 'device', FILTER_SANITIZE_FULL_SPECIAL_CHARS );
        $currentId  = (int) filter_input( INPUT_POST, 'currentId', FILTER_SANITIZE_NUMBER_INT ) ?: 1;
        $paged      = (int) filter_input( INPUT_POST, 'paged', FILTER_SANITIZE_NUMBER_INT );
        $preload    = filter_input( INPUT_POST, 'preload', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY );
        $preload    = array_map( static function( $item ) use ( $device, $paged ) {
            return [
                'media'     => is_numeric( $item ) ? absint( $item ) : esc_url( $item ),
                'device'    => [ $device => [ $paged ] ],
                'type'      => 'image'
            ];
        }, $preload );

        $existing  = $get_meta( $currentId, '_wca_preload_auto', true ) ?: [];

        foreach ( $preload as $item ) {
            $found = array_search( $item['media'], array_column( $existing, 'media' ) );

            if ( $found !== false ) {
                // Merge device arrays while eliminating duplicates
                $existing[$found]['device'] = array_unique( array_merge( (array) $existing[$found]['device'], (array) $item['device'] ) );
                
                // Merge and unique paged values for the specific device, if paged is not 0
                if ( $paged !== 0 ) {
                    if ( ! isset( $existing[$found]['device'][$device] ) ) {
                        $existing[$found]['device'][$device] = [];
                    }
                    $existing[$found]['device'][$device][] = $paged;
                    $existing[$found]['device'][$device] = array_unique( $existing[$found]['device'][$device] );
                }
            } else {
                if ( $paged !== 0 ) {
                    // If the item is new and paged is specified, structure it to include device-based pages
                    $item['device'] = [ $device => [ $paged ] ];
                }
                $existing[] = $item;
            }
        }

        $set_meta( $currentId, '_wca_preload_auto', $existing );

        $data = wp_parse_args( [
            'status'    => true,
            'preload'   => $existing,
        ], $data );
    break;

    case 'clear':
        $currentId  = filter_input( INPUT_POST, 'currentId', FILTER_SANITIZE_NUMBER_INT );

        $callback( $currentId, '_wca_preload_auto' );

        $data = wp_parse_args( [
            'status'    => true,
            'currentId' => $currentId,
        ], $data );
    break;

endswitch;

do_action( 'wecodeart/optimization/ajax', $data, $action );

wp_send_json( $data );

die;