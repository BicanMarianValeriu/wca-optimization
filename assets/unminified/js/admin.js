/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************************************************!*\
  !*** ./inc/support/modules/optimization/src/js/admin.js ***!
  \**********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

/**
 * @package: 	WeCodeArt Optimization
 * @author: 	Bican Marian Valeriu
 * @license:	https://www.wecodeart.com/
 * @version:	1.0.0
 */

const {
  i18n: {
    __
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
    __experimentalBorderBoxControl: BorderBoxControl
  },
  element: {
    useState
  },
  blockEditor: {
    useSetting
  }
} = wp;
addFilter('wecodeart.admin.tabs.plugins', 'wecodeart/optimization/admin/panel', optionsPanel);
function optionsPanel(panels) {
  return [...panels, {
    name: 'wca-optimization',
    title: __('Optimization'),
    render: props => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Options, {
      ...props
    })
  }];
}
const Options = props => {
  const {
    settings,
    saveSettings,
    isRequesting,
    createNotice
  } = props;
  if (isRequesting || !settings) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Placeholder, {
      icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Spinner, {}),
      label: __('Loading'),
      instructions: __('Please wait, loading settings...', 'wecodeart')
    });
  }
  const apiOptions = (({
    optimization
  }) => optimization)(settings);
  const [loading, setLoading] = useState(null);
  const [formData, setFormData] = useState(apiOptions);
  const setHeaderOption = option => {
    setFormData({
      ...formData,
      header: {
        ...formData.header,
        ...option
      }
    });
  };
  const handleNotice = () => {
    setLoading(false);
    return createNotice('success', __('Settings saved.', 'wecodeart'));
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "grid",
      style: {
        '--wca--columns': 2
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "g-col-1",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Card, {
          className: "border shadow-none",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardHeader, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(HStack, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h5", {
                className: "text-uppercase fw-medium m-0",
                children: __('Header', 'wecodeart')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleControl, {
                label: __('Clean Header?', 'wecodeart'),
                className: "m-0",
                checked: formData?.header === true,
                onChange: header => setFormData({
                  ...formData,
                  header
                })
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(CardBody, {
            style: {
              color: 'rgb(30, 30, 30)'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleControl, {
                label: __('WP Generator', 'wecodeart'),
                help: __('Remove WP Generator meta tag.', 'wecodeart'),
                checked: formData?.header?.wpGenerator || formData?.header === true,
                disabled: formData?.header === true,
                onChange: wpGenerator => setHeaderOption({
                  wpGenerator
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleControl, {
                label: __('RSD Link', 'wecodeart'),
                help: __('Remove Really Simple Discovery service endpoint.', 'wecodeart'),
                checked: formData?.header?.rsdLink || formData?.header === true,
                disabled: formData?.header === true,
                onChange: rsdLink => setHeaderOption({
                  rsdLink
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleControl, {
                label: __('Feed Links', 'wecodeart'),
                help: __('Remove the feed links.', 'wecodeart'),
                checked: formData?.header?.feedLinks || formData?.header === true,
                disabled: formData?.header === true,
                onChange: feedLinks => setHeaderOption({
                  feedLinks
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleControl, {
                label: __('Shortlink', 'wecodeart'),
                help: __('Remove the rel=shortlink.', 'wecodeart'),
                checked: formData?.header?.shortLink || formData?.header === true,
                disabled: formData?.header === true,
                onChange: shortLink => setHeaderOption({
                  shortLink
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleControl, {
                label: __('Rest API', 'wecodeart'),
                help: __('Remove the REST API link tag.', 'wecodeart'),
                checked: formData?.header?.restApi || formData?.header === true,
                disabled: formData?.header === true,
                onChange: restApi => setHeaderOption({
                  restApi
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleControl, {
                label: __('oEmbed', 'wecodeart'),
                help: __('Remove oEmbed discovery links.', 'wecodeart'),
                checked: formData?.header?.oEmbed || formData?.header === true,
                disabled: formData?.header === true,
                onChange: oEmbed => setHeaderOption({
                  oEmbed
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleControl, {
                label: __('Emoji', 'wecodeart'),
                help: __('Remove WP Emojis and fallback to browser`s emoji.', 'wecodeart'),
                checked: formData?.header?.emoji || formData?.header === true,
                disabled: formData?.header === true,
                onChange: emoji => setHeaderOption({
                  emoji
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleControl, {
                label: __('Dashicons CSS', 'wecodeart'),
                help: __('Remove Dashicons CSS in frontend.', 'wecodeart'),
                checked: formData?.header?.dashicons || formData?.header === true,
                disabled: formData?.header === true,
                onChange: dashicons => setHeaderOption({
                  dashicons
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleControl, {
                label: __('Default Scripts', 'wecodeart'),
                help: __('Move default scripts to footer.', 'wecodeart'),
                checked: formData?.header?.footerScripts || formData?.header === true,
                disabled: formData?.header === true,
                onChange: footerScripts => setHeaderOption({
                  footerScripts
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleControl, {
                label: __('Font Display Swap', 'wecodeart'),
                help: __('Swap font display for better performance.', 'wecodeart'),
                checked: formData?.header?.fontDisplaySwap || formData?.header === true,
                disabled: formData?.header === true,
                onChange: fontDisplaySwap => setHeaderOption({
                  fontDisplaySwap
                })
              })
            })]
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "g-col-1",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Card, {
          className: "border shadow-none position-sticky sticky-top h-100",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardHeader, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h5", {
              className: "text-uppercase fw-medium m-0",
              children: __('Preloading', 'wecodeart')
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(CardBody, {
            style: {
              color: 'rgb(30, 30, 30)'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleControl, {
                label: __('Instant Page', 'wecodeart'),
                help: __('Automatically prefetch URLs in the background when a user hovers over a link.', 'wecodeart'),
                checked: formData?.preload?.instantPage,
                onChange: instantPage => setFormData({
                  ...formData,
                  preload: {
                    ...formData.preload,
                    instantPage
                  }
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleControl, {
                label: __('Preload Viewport Media', 'wecodeart'),
                help: __('Automatically preload resources that are needed right away or very soon during a page load.', 'wecodeart'),
                checked: formData?.preload?.preloadViewport,
                onChange: preloadViewport => setFormData({
                  ...formData,
                  preload: {
                    ...formData.preload,
                    preloadViewport
                  }
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TextareaControl, {
                label: __('Preconnect', 'wecodeart'),
                help: __('Preconnect allows the browser to set up early connections before an HTTP request, eliminating round-trip latency and saving time for users. Format: https://example.com|crossorigin', 'wecodeart'),
                value: formData?.preload?.preconnect?.join('\n'),
                onChange: preconnect => {
                  const asArray = preconnect ? preconnect.split('\n') : [];
                  setFormData({
                    ...formData,
                    preload: {
                      ...formData.preload,
                      preconnect: asArray
                    }
                  });
                }
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TextareaControl, {
                label: __('DNS Prefetch', 'wecodeart'),
                help: __('Resolve DNS before a user clicks - one per line. Format: //example.com', 'wecodeart'),
                value: formData?.preload?.dnsPrefetch?.join('\n'),
                onChange: dnsPrefetch => {
                  const asArray = dnsPrefetch ? dnsPrefetch.split('\n') : [];
                  setFormData({
                    ...formData,
                    preload: {
                      ...formData.preload,
                      dnsPrefetch: asArray
                    }
                  });
                }
              })
            })]
          })]
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("hr", {
      style: {
        margin: '20px 0'
      }
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Button, {
      className: "button",
      isPrimary: true,
      isLarge: true,
      icon: loading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Spinner, {}),
      onClick: () => {
        setLoading(true);
        saveSettings({
          optimization: formData
        }, handleNotice);
      },
      disabled: loading,
      children: loading ? '' : __('Save', 'wecodeart')
    })]
  });
};
})();

/******/ })()
;
//# sourceMappingURL=admin.js.map