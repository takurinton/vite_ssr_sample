"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports[Symbol.toStringTag] = "Module";
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var reactRouterDom = require("react-router-dom");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : {default: e};
}
var React__default = /* @__PURE__ */ _interopDefaultLegacy(React);
var ReactDOMServer__default = /* @__PURE__ */ _interopDefaultLegacy(ReactDOMServer);
function About() {
  return /* @__PURE__ */ React__default["default"].createElement("h1", null, "About");
}
var __glob_2_0 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: About
});
function Home() {
  return /* @__PURE__ */ React__default["default"].createElement("h1", null, "Home");
}
var __glob_2_1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Home
});
const pages = {"./pages/About.jsx": __glob_2_0, "./pages/Home.jsx": __glob_2_1};
const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages\/(.*)\.jsx$/)[1];
  return {
    name,
    path: name === "Home" ? "/" : `/${name.toLowerCase()}`,
    component: pages[path].default
  };
});
function App() {
  return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement("nav", null, /* @__PURE__ */ React__default["default"].createElement("ul", null, routes.map(({name, path}) => {
    return /* @__PURE__ */ React__default["default"].createElement("li", {
      key: path
    }, /* @__PURE__ */ React__default["default"].createElement(reactRouterDom.Link, {
      to: path
    }, name));
  }))), /* @__PURE__ */ React__default["default"].createElement(reactRouterDom.Switch, null, routes.map(({path, component: RouteComp}) => {
    return /* @__PURE__ */ React__default["default"].createElement(reactRouterDom.Route, {
      key: path,
      path
    }, /* @__PURE__ */ React__default["default"].createElement(RouteComp, null));
  })));
}
function render(url, context) {
  return ReactDOMServer__default["default"].renderToStaticMarkup(/* @__PURE__ */ React__default["default"].createElement(reactRouterDom.StaticRouter, {
    location: url,
    context
  }, /* @__PURE__ */ React__default["default"].createElement(App, null)));
}
exports.render = render;
