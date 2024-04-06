/**
 * @package: 	WeCodeArt Optimization
 * @author: 	Bican Marian Valeriu
 * @license:	https://www.wecodeart.com/
 * @version:	1.0.0
 */

const {
    i18n: {
        __,
    },
    hooks: {
        addFilter
    },
    components: {
        Placeholder,
        Card,
        CardHeader,
        CardBody,
        Spinner,
        Button,
        TextControl,
        TextareaControl,
        BaseControl,
        ColorPicker,
        RangeControl,
        DropdownMenu,
        SelectControl,
        ToggleControl,
        ColorIndicator,
        __experimentalHStack: HStack,
        __experimentalNumberControl: NumberControl,
        __experimentalBorderBoxControl: BorderBoxControl,
    },
    element: {
        useState,
    },
    blockEditor: {
        useSetting
    },
} = wp;

addFilter('wecodeart.admin.tabs.plugins', 'wecodeart/optimization/admin/panel', optionsPanel);
function optionsPanel(panels) {
    return [...panels, {
        name: 'wca-optimization',
        title: __('Optimization'),
        render: (props) => <Options {...props} />
    }];
}

const Options = (props) => {
    const { settings, saveSettings, isRequesting, createNotice } = props;

    if (isRequesting || !settings) {
        return <Placeholder {...{
            icon: <Spinner />,
            label: __('Loading'),
            instructions: __('Please wait, loading settings...', 'wecodeart')
        }} />;
    }

    const apiOptions = (({ optimization }) => (optimization))(settings);
    const [loading, setLoading] = useState(null);
    const [formData, setFormData] = useState(apiOptions);

    const setHeaderOption = (option) => {
        setFormData({ ...formData, header: { ...formData.header, ...option } });
    }

    const handleNotice = () => {
        setLoading(false);

        return createNotice('success', __('Settings saved.', 'wecodeart'));
    };

    return (
        <>
            <div className="grid" style={{ '--wca--columns': 2 }}>
                <div className="g-col-1">
                    <Card className="border shadow-none">
                        <CardHeader>
                            <HStack>
                                <h5 className="text-uppercase fw-medium m-0">{__('Header', 'wecodeart')}</h5>
                                <ToggleControl
                                    label={__('Clean Header?', 'wecodeart')}
                                    className="m-0"
                                    checked={formData?.header === true}
                                    onChange={header => setFormData({ ...formData, header })}
                                />
                            </HStack>
                        </CardHeader>
                        <CardBody style={{ color: 'rgb(30, 30, 30)' }}>
                            <p>
                                <ToggleControl
                                    label={__('WP Generator', 'wecodeart')}
                                    help={__('Remove WP Generator meta tag.', 'wecodeart')}
                                    checked={formData?.header?.wpGenerator || formData?.header === true}
                                    disabled={formData?.header === true}
                                    onChange={wpGenerator => setHeaderOption({ wpGenerator })}
                                />
                            </p>
                            <p>
                                <ToggleControl
                                    label={__('RSD Link', 'wecodeart')}
                                    help={__('Remove Really Simple Discovery service endpoint.', 'wecodeart')}
                                    checked={formData?.header?.rsdLink || formData?.header === true}
                                    disabled={formData?.header === true}
                                    onChange={rsdLink => setHeaderOption({ rsdLink })}
                                />
                            </p>
                            <p>
                                <ToggleControl
                                    label={__('Feed Links', 'wecodeart')}
                                    help={__('Remove the feed links.', 'wecodeart')}
                                    checked={formData?.header?.feedLinks || formData?.header === true}
                                    disabled={formData?.header === true}
                                    onChange={feedLinks => setHeaderOption({ feedLinks })}
                                />
                            </p>
                            <p>
                                <ToggleControl
                                    label={__('Shortlink', 'wecodeart')}
                                    help={__('Remove the rel=shortlink.', 'wecodeart')}
                                    checked={formData?.header?.shortLink || formData?.header === true}
                                    disabled={formData?.header === true}
                                    onChange={shortLink => setHeaderOption({ shortLink })}
                                />
                            </p>
                            <p>
                                <ToggleControl
                                    label={__('Rest API', 'wecodeart')}
                                    help={__('Remove the REST API link tag.', 'wecodeart')}
                                    checked={formData?.header?.restApi || formData?.header === true}
                                    disabled={formData?.header === true}
                                    onChange={restApi => setHeaderOption({ restApi })}
                                />
                            </p>
                            <p>
                                <ToggleControl
                                    label={__('oEmbed', 'wecodeart')}
                                    help={__('Remove oEmbed discovery links.', 'wecodeart')}
                                    checked={formData?.header?.oEmbed || formData?.header === true}
                                    disabled={formData?.header === true}
                                    onChange={oEmbed => setHeaderOption({ oEmbed })}
                                />
                            </p>
                            <p>
                                <ToggleControl
                                    label={__('Emoji', 'wecodeart')}
                                    help={__('Remove WP Emojis and fallback to browser`s emoji.', 'wecodeart')}
                                    checked={formData?.header?.emoji || formData?.header === true}
                                    disabled={formData?.header === true}
                                    onChange={emoji => setHeaderOption({ emoji })}
                                />
                            </p>
                            <p>
                                <ToggleControl
                                    label={__('Dashicons CSS', 'wecodeart')}
                                    help={__('Remove Dashicons CSS in frontend.', 'wecodeart')}
                                    checked={formData?.header?.dashicons || formData?.header === true}
                                    disabled={formData?.header === true}
                                    onChange={dashicons => setHeaderOption({ dashicons })}
                                />
                            </p>
                            <p>
                                <ToggleControl
                                    label={__('Default Scripts', 'wecodeart')}
                                    help={__('Move default scripts to footer.', 'wecodeart')}
                                    checked={formData?.header?.footerScripts || formData?.header === true}
                                    disabled={formData?.header === true}
                                    onChange={footerScripts => setHeaderOption({ footerScripts })}
                                />
                            </p>
                        </CardBody>
                    </Card>
                </div>
                <div className="g-col-1">
                    <Card className="border shadow-none position-sticky sticky-top h-100">
                        <CardHeader>
                            <h5 className="text-uppercase fw-medium m-0">{__('Preloading', 'wecodeart')}</h5>
                        </CardHeader>
                        <CardBody style={{ color: 'rgb(30, 30, 30)' }}>
                            <p>
                                <ToggleControl
                                    label={__('Instant Page', 'wecodeart')}
                                    help={__('Automatically prefetch URLs in the background when a user hovers over a link.', 'wecodeart')}
                                    checked={formData?.preload?.instantPage}
                                    onChange={instantPage => setFormData({ ...formData, preload: { ...formData.preload, instantPage } })}
                                />
                            </p>
                            <p>
                                <ToggleControl
                                    label={__('Preload Viewport Media', 'wecodeart')}
                                    help={__('Automatically preload resources that are needed right away or very soon during a page load.', 'wecodeart')}
                                    checked={formData?.preload?.preloadViewport}
                                    onChange={preloadViewport => setFormData({ ...formData, preload: { ...formData.preload, preloadViewport } })}
                                />
                            </p>
                            <p>
                                <TextareaControl
                                    label={__('Preconnect', 'wecodeart')}
                                    help={__('Preconnect allows the browser to set up early connections before an HTTP request, eliminating round-trip latency and saving time for users. Format: https://example.com|crossorigin', 'wecodeart')}
                                    value={formData?.preload?.preconnect?.join('\n')}
                                    onChange={preconnect => {
                                        const asArray = preconnect ? preconnect.split('\n') : [];
                                        setFormData({ ...formData, preload: { ...formData.preload, preconnect: asArray } });
                                    }}
                                />
                            </p>
                            <p>
                                <TextareaControl
                                    label={__('DNS Prefetch', 'wecodeart')}
                                    help={__('Resolve DNS before a user clicks - one per line. Format: //example.com', 'wecodeart')}
                                    value={formData?.preload?.dnsPrefetch?.join('\n')}
                                    onChange={dnsPrefetch => {
                                        const asArray = dnsPrefetch ? dnsPrefetch.split('\n') : [];
                                        setFormData({ ...formData, preload: { ...formData.preload, dnsPrefetch: asArray } });
                                    }}
                                />
                            </p>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <hr style={{ margin: '20px 0' }} />
            <Button
                className="button"
                isPrimary
                isLarge
                icon={loading && <Spinner />}
                onClick={() => {
                    setLoading(true);
                    saveSettings({ optimization: formData }, handleNotice);
                }}
                {...{ disabled: loading }}
            >
                {loading ? '' : __('Save', 'wecodeart')}
            </Button>
        </>
    );
};