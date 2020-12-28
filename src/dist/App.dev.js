"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startApp = void 0;

var _reactNativeNavigation = require("react-native-navigation");

var _reactNative = require("react-native");

var _asyncStorage = _interopRequireDefault(require("@react-native-community/async-storage"));

var _store = _interopRequireDefault(require("./store"));

var _screens = _interopRequireDefault(require("./screens"));

var _common = require("./common");

var _selection = _interopRequireDefault(require("./common/utils/selection.json"));

var _network = require("./actions/network");

var _lang = require("./actions/lang");

var _colors = _interopRequireDefault(require("./common/defaults/colors"));

var _AuthActions = require("./actions/AuthActions");

var _location = require("./actions/location");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var startApp = function startApp() {
  (0, _common.registerCustomIconType)("custom", _selection["default"]);
  (0, _screens["default"])();

  _reactNativeNavigation.Navigation.events().registerAppLaunchedListener(function _callee() {
    var cart, total, counter, _ref, exist;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _reactNativeNavigation.Navigation.setDefaultOptions({
              statusBar: {
                visible: true,
                backgroundColor: _colors["default"].statusBar,
                style: "dark"
              },
              topBar: {
                drawBehind: true,
                visible: false,
                animate: false
              },
              layout: {
                backgroundColor: "white",
                orientation: ["portrait"]
              },
              animations: {
                push: {
                  waitForRender: false
                },
                showModal: {
                  waitForRender: false
                }
              },
              bottomTabs: {
                visible: false,
                animate: false
              }
            });

            _context.next = 3;
            return regeneratorRuntime.awrap((0, _lang.initLang)("ar", true)(_store["default"].dispatch));

          case 3:
            (0, _network.initInternetConnection)(_store["default"].dispatch);
            (0, _location.checkLocationPermission)(true, function () {
              (0, _location.initBackgroundGeolocation)(_store["default"].dispatch, _store["default"].getState);
            });
            cart = "";
            total = 0;
            counter = 0; // AsyncStorage.setItem("@CART", "");
            // AsyncStorage.setItem("@TOTAL", "");
            // AsyncStorage.setItem("@COUNTER", "");

            _context.prev = 8;
            _context.next = 11;
            return regeneratorRuntime.awrap(_asyncStorage["default"].getItem("@CART"));

          case 11:
            cart = _context.sent;
            console.log("*******", cart);
            _context.next = 15;
            return regeneratorRuntime.awrap(_asyncStorage["default"].getItem("@TOTAL"));

          case 15:
            total = _context.sent;
            _context.next = 18;
            return regeneratorRuntime.awrap(_asyncStorage["default"].getItem("@COUNTER"));

          case 18:
            counter = _context.sent;
            _context.next = 24;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](8);
            console.log("AsyncStorage#getItem error: ", _context.t0.message);

          case 24:
            if (cart !== null || total !== null) {
              cart = JSON.parse(cart);
              console.log("cart", cart);
              total = JSON.parse(total);
              console.log("total", total);
              counter = JSON.parse(counter);
              console.log("counter", counter);
              _store["default"].getState().cart.cart = cart;
              _store["default"].getState().cart.cart_sub_total = +total;
              _store["default"].getState().cart.cart_total = +total;
              _store["default"].getState().cart.items_count = +counter;
            } else {
              _asyncStorage["default"].setItem("@CART", "");

              _asyncStorage["default"].setItem("@TOTAL", "");

              _asyncStorage["default"].setItem("@COUNTER", "");
            }

            _context.next = 27;
            return regeneratorRuntime.awrap((0, _AuthActions.autoLogin)(_store["default"].dispatch));

          case 27:
            _ref = _context.sent;
            exist = _ref.exist;
            console.log("%%%%%%%%%%%%%", exist);
            (0, _network.initInternetConnection)(_store["default"].dispatch);

            _common.AppNavigation.init("MAIN_STACK", {
              rtl: _store["default"].getState().lang.rtl,
              name: "home",
              sideMenu: "menu"
            });

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[8, 21]]);
  });
};

exports.startApp = startApp;