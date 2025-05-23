<?php
/**
 * WeCodeArt Framework.
 *
 * WARNING: This file is part of the core WeCodeArt Framework. DO NOT edit this file under any circumstances.
 * Please do all modifications in the form of a child theme.
 *
 * @package 	WeCodeArt Framework
 * @subpackage 	Support\Modules\ScrollTop
 * @copyright   Copyright (c) 2024, WeCodeArt Framework
 * @since 		6.3.7
 * @version		6.6.3
 */

namespace WeCodeArt\Support\Modules;

defined( 'ABSPATH' ) || exit;

use WeCodeArt\{ Singleton, Integration };
use WeCodeArt\Config\Traits\{ Asset, No_Conditionals };
use function WeCodeArt\Functions\{ get_prop, toJSON };

/**
 * The Optimization object.
 */
final class Optimization implements Integration {

    use Asset;
    use Singleton;
	use No_Conditionals;

	const VERSION = '1.1.0';

    /**
	 * The config of the plugin.
	 *
	 * @access   protected
	 * @var      mixed    $config    The config of the plugin.
	 */
	protected $config;

	/**
	 * Send to Constructor
	 */
	public function init() {
		$this->config = wp_parse_args( wecodeart_option( 'optimization' ), self::get_defaults() );
	}

	/**
	 * Hooks
	 */
	public function register_hooks() {
		\add_action( 'admin_enqueue_scripts',	[ $this, 'admin_assets' 	], 20, 1 );
		\add_action( 'admin_init',				[ $this, 'insert_defaults'	], 20, 1 );

		// Clean Header
		if( get_prop( $this->config, [ 'header' ] ) !== false ) {
			\add_action( 'init', [ $this, 'clean_header' ], 20, 1 );
		}

		// Instant Page
		if( get_prop( $this->config, [ 'preload', 'instantPage' ] ) ) {
			\add_action( 'init', [ $this, 'instant_page' ], 20, 1 );
		}

		// Preload Viewport
		if( get_prop( $this->config, [ 'preload', 'preloadViewport' ] ) ) {
			\add_action( 'init', [ $this, 'preload_viewport' ], 20, 1 );
		}

		// Preconnect
		if( ! empty( get_prop( $this->config, [ 'preload', 'preconnect' ] ) ) ) {
			\add_action( 'wp_head',	[ $this, 'preconnect' ], 1 );
		}

		// DNS Prefech
		if( ! empty( get_prop( $this->config, [ 'preload', 'dnsPrefetch' ] ) ) ) {
			\add_action( 'wp_head',	[ $this, 'dns_prefech' ], 1 );
		}
	}

	/**
	 * Clean WP_Head of unwanted of stuff
	 *
	 * @return 	void
	 */
	public function clean_header(): void {
		if( $header = get_prop( $this->config, [ 'header' ] ) ) {
			$actions = [
				// Deprecated anyway
				[ 'wp_head', 'wlwmanifest_link' ],
				[ 'wp_head', 'index_rel_link' ],
				[ 'wp_head', 'parent_post_rel_link', 10, 0 ],
				[ 'wp_head', 'start_post_rel_link', 10, 0 ],
				[ 'wp_head', 'adjacent_posts_rel_link', 10, 0 ],
			];

			if( is_bool( $header ) || get_prop( $header, 'wpGenerator' ) ) {
				$actions[] = [ 'wp_head', 'wp_generator' ];
			}

			if( is_bool( $header ) || get_prop( $header, 'rsdLink' ) ) {
				$actions[] = [ 'wp_head', 'rsd_link' ];
			}
			
			if( is_bool( $header ) || get_prop( $header, 'feedLinks' ) ) {
				$actions[] = [ 'wp_head', 'feed_links', 2 ];
				$actions[] = [ 'wp_head', 'feed_links_extra', 3 ];
			}

			if( is_bool( $header ) || get_prop( $header, 'restApi' ) ) {
				$actions[] = [ 'xmlrpc_rsd_apis', 'rest_output_rsd' ];
				$actions[] = [ 'wp_head', 'rest_output_link_wp_head' ];
				$actions[] = [ 'template_redirect', 'rest_output_link_header', 11 ];
			}

			if( is_bool( $header ) || get_prop( $header, 'shortLink' ) ) {
				$actions[] = [ 'wp_head', 'wp_shortlink_wp_head' ];
				$actions[] = [ 'template_redirect', 'wp_shortlink_header' ];
			}

			if( is_bool( $header ) || get_prop( $header, 'oEmbed' ) ) {
				$actions[] = [ 'wp_head', 'wp_oembed_add_discovery_links' ];
			}
			
			if( is_bool( $header ) || get_prop( $header, 'emoji' ) ) {
				$actions[] = [ 'wp_head', 'print_emoji_detection_script', 7 ];
				$actions[] = [ 'wp_print_styles', 'print_emoji_styles' ];
			}
			
			foreach( $actions as $args ) {
				call_user_func( 'remove_action', ...$args );
			}

			if( is_bool( $header ) || get_prop( $header, 'dashicons' ) ) {
				\add_action( 'wp_enqueue_scripts', static function(): void {
					if( is_user_logged_in() ) {
						return;
					}

					wp_deregister_style( 'dashicons' );
					wp_dequeue_style( 'dashicons' );
				} );
			}

			if( is_bool( $header ) || get_prop( $header, 'footerScripts' ) ) {
				\add_action( 'wp_default_scripts', static function( $wp_scripts ): void {
					$wp_scripts->add_data( 'jquery', 			'group', 1 );
					$wp_scripts->add_data( 'jquery-core', 		'group', 1 );
					$wp_scripts->add_data( 'jquery-migrate', 	'group', 1 );
				} );
			}
		}
	}

	/**
	 * DNS Prefetch
	 *
	 * @return 	void
	 */
	public function preconnect(): void {
		$links = get_prop( $this->config, [ 'preload', 'preconnect' ], [] );
		
		foreach( $links as $link ) {
			list( $link, $crossorigin ) = [ ...explode( '|', $link ), ...[ '','' ] ];

			if( empty( $link ) ) {
				continue;
			}

			printf( '<link rel="preconnect" href="%s" %s/>' . PHP_EOL, esc_url_raw( $link ), $crossorigin ? 'crossorigin' : '' );
		}
	}

	/**
	 * DNS Prefetch
	 *
	 * @return 	void
	 */
	public function dns_prefech(): void {
		$links = get_prop( $this->config, [ 'preload', 'dnsPrefetch' ], [] );
		
		foreach( $links as $link ) {
			if( empty( $link ) ) {
				continue;
			}
			
			printf( '<link rel="dns-prefetch" href="%s" />' . PHP_EOL, esc_url_raw( $link ) );
		}
	}

	/**
	 * Instant Page
	 *
	 * @return 	void
	 */
	public function instant_page(): void {
		add_filter( 'script_loader_tag', static function( $tag, $handle ) {
			if( $handle !== 'instant-page' ) {
				return $tag;
			}

			return str_replace( ' src', ' async data-no-optimize="1" src', $tag );
		}, 10, 2 );

		wecodeart( 'assets' )->add_script( 'instant-page', [
			'path'	=> $this->get_asset( 'js', 'instant-page' ),
			'load'	=> ! is_admin()
		] );
	}

	/**
	 * Preload Viewport
	 *
	 * @return 	void
	 */
	public function preload_viewport(): void {
		// Currently supported content types.
		if( is_singular() !== false && is_tax() !== false && is_home() !== false ) {
			return;
		}

		function get_device_preload(): array {
			$device = wp_is_mobile() ? 'mobile' : 'desktop';
			$paged  = (int) get_query_var( 'paged' ) ?: 1;
			$loaded = get_post_meta( get_queried_object_id(), '_wca_preload_auto', true ) ?: [];
			$loaded = array_filter( $loaded, fn( $item ) => isset( $item['device'][$device] ) && in_array( $paged, $item['device'][$device] ) );

			return $loaded;
		}

		\add_action( 'wp_enqueue_scripts', function(): void {
			$preload = get_device_preload();

			// If already loaded, we dont need this.
			if( count( $preload ) ) {
				return;
			}

			$inline_js = <<<JS
				document.addEventListener( 'DOMContentLoaded', function() {
					const { request, currentId, object, paged } = wecodeartPreloadViewport;
					const getDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
	
					const mediaInViewPort = [];
					document.querySelector('.wp-site-blocks')?.querySelectorAll('img').forEach(img => {
						const { top, bottom } = img.getBoundingClientRect();
						if (top < window.innerHeight && bottom >= 0) {
							let image = img.src ?? img.getAttribute('data-src');
							
							// Skip images with data URIs
							if (!image || image.startsWith('data:')) {
								return;
							}

							// Get ID if exists in attr
							let imageId = img?.dataset?.id;
							
							// Attempt to get from class
							if(!imageId) {
								const wpImageClass = Array.from(img.classList).find(className => className.startsWith('wp-image-'));
								if (wpImageClass) {
									imageId = parseFloat(wpImageClass.split('wp-image-').pop());
								}
							}
	
							mediaInViewPort.push(imageId ?? image);
						}
					});
	
					if(mediaInViewPort.length === 0) {
						return;
					}
	
					const params = new URLSearchParams();
					params.append('action', 'preload');
					params.append('device', getDevice);
					params.append('object', object);
					params.append('currentId', currentId);
					params.append('paged', paged);

					mediaInViewPort.forEach(src => params.append('preload[]', src));
	
					return fetch(request, {
						method: 'POST',
						credentials: 'same-origin',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded;',
						},
						body: params.toString()
					}).then(res => res.json()).catch(error => console.error('Error:', error));
				} );
			JS;

			$object = 'post';
			
			if( is_tax() || is_category() || is_tag() ) {
				$object = 'taxonomy';
			}
			
			wecodeart( 'assets' )->add_script( 'wecodeart-preload-viewport', [
				'inline'	=> $inline_js,
				'locale'	=> [
					'object'	=> $object,
					'currentId' => get_queried_object_id(),
					'paged'		=> get_query_var( 'paged' ) ?: 1,
					'request'	=> get_template_directory_uri() . '/inc/support/modules/optimization/ajax.php',
				]
			] );
		} );
		
		\add_action( 'wp_head', function(): void {
			// Filtered for current device/page
			$preload = get_device_preload();

			if( empty( $preload ) ) {
				return;
			}

			foreach( $preload as $item ) {
				if( empty( $item ) ) {
					continue;
				}

				$id_or_string = get_prop( $item, [ 'media' ] );

				$attrs = [];
				switch( $id_or_string ) {
					case is_numeric( $id_or_string ):
						if( get_post_status( $id_or_string ) ) {
							$attrs = wp_parse_args( [
								'href' 			=> wp_get_attachment_image_src( $id_or_string, 'full' )[0],
								'imagesrcset' 	=> wp_get_attachment_image_srcset( $id_or_string ),
								'as'			=> get_prop( $item, [ 'type' ], 'image' ),
							], $attrs );
						}
						break;
					case is_string( $id_or_string ):
						$maybe_id = attachment_url_to_postid( $id_or_string );

						if( $maybe_id ) {
							$attrs = wp_parse_args( [
								'href' 			=> wp_get_attachment_image_src( $maybe_id, 'full' )[0],
								'imagesrcset' 	=> wp_get_attachment_image_srcset( $maybe_id ),
								'as'			=> get_prop( $item, [ 'type' ], 'image' ),
							], $attrs );
						} else {
							$attrs = wp_parse_args( [
								'href' 	=> $id_or_string,
								'as'	=> get_prop( $item, [ 'type' ], 'image' ),
							], $attrs );
						}
					break;
				}

				$inline = '';
				foreach ( $attrs as $key => $value ) {
					if( empty( $value ) ) {
						continue;
					}

					$value = esc_attr( $value );
					$inline .= "{$key}=\"{$value}\" ";
				}
				
				printf( '<link rel="preload" %s/>' . PHP_EOL, trim( $inline ) );
			}
		}, 1 );
		
		// Cleanup
		\add_action( 'save_post', static fn( $object_id ) => self::clear_data( 'preload', $object_id, 'post' ) );
		\add_action( 'created_term', static fn( $object_id ) => self::clear_data( 'preload', $object_id, 'taxonomy' ) );
		\add_action( 'edited_term', static fn( $object_id ) => self::clear_data( 'preload', $object_id, 'taxonomy' ) );
	}

	/**
	 * Clear data
	 *
	 * @param	string	$type
	 * @param	int		$object_id
	 * @param	string	$object
	 *
	 * @return 	bool
	 */
	public static function clear_data( string $type = 'preload', $object_id = 0, $object = 'post' ): bool {
		switch( $type ) {
			case 'preload':
				switch( $object ) {
					case 'taxonomy':
						delete_term_meta( $object_id, '_wca_preload_auto' );
					break;
					default:
						delete_post_meta( $object_id, '_wca_preload_auto' );
					break;
				}
			break;
		}

		return true;
	}

	/**
	 * Admin assets.
	 *
	 * @return void
	 */
	public function admin_assets() {
		if( ! wecodeart_if( 'is_theme_admin' ) || ! current_user_can( 'activate_plugins' ) ) {
			return;
		}

		wp_register_script( 
			$this->make_handle(),
			$this->get_asset( 'js', 'admin' ),
			[ 'wecodeart-admin' ],
			wecodeart( 'version' ),
			true 
		);

		wp_enqueue_script( $this->make_handle() );

		wp_set_script_translations( $this->make_handle(), 'wecodeart', wecodeart_config( 'directories' )['languages'] );
	}

	/**
	 * Get file.
	 *
	 * @return string
	 */
	public function get_asset( string $type, string $name ): string {
		$file_path = wecodeart_if( 'is_dev_mode' ) ? 'unminified' : 'minified';
		$file_name = wecodeart_if( 'is_dev_mode' ) ? $name . '.' . $type :  $name . '.min.' . $type;
		$file_path = wecodeart_config( 'paths' )['uri'] . '/inc/support/modules/optimization/assets/' . $file_path . '/' . $type . '/' . $file_name;

		return esc_url( $file_path );
	}

	/**
	 * Insert defaults.
	 *
	 * @return 	void
	 */
	public function insert_defaults() {
		if( ! wecodeart_option( 'optimization' ) ) {
			wecodeart_option( [
				'optimization' => self::get_defaults()
			] );
		}
	}

    /**
	 * Get defaults.
	 *
	 * @return 	array
	 */
	public static function get_defaults(): array {
		return [
			'header'	=> true,
			'preload' 	=> [
				'instantPage' 		=> true,
				'preloadViewport' 	=> true,
			]
		];
	}
}
