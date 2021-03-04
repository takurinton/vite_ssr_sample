var __assign = Object.assign;
import {r as react, L as Link, S as Switch, R as Route, a as reactDom, B as BrowserRouter} from "./vendor.c0c23623.js";
const p = function polyfill(modulePath = ".", importFunctionName = "__import__") {
  try {
    self[importFunctionName] = new Function("u", `return import(u)`);
  } catch (error) {
    const baseURL = new URL(modulePath, location);
    const cleanup = (script) => {
      URL.revokeObjectURL(script.src);
      script.remove();
    };
    self[importFunctionName] = (url) => new Promise((resolve, reject) => {
      const absURL = new URL(url, baseURL);
      if (self[importFunctionName].moduleMap[absURL]) {
        return resolve(self[importFunctionName].moduleMap[absURL]);
      }
      const moduleBlob = new Blob([
        `import * as m from '${absURL}';`,
        `${importFunctionName}.moduleMap['${absURL}']=m;`
      ], {type: "text/javascript"});
      const script = Object.assign(document.createElement("script"), {
        type: "module",
        src: URL.createObjectURL(moduleBlob),
        onerror() {
          reject(new Error(`Failed to import: ${url}`));
          cleanup(script);
        },
        onload() {
          resolve(self[importFunctionName].moduleMap[absURL]);
          cleanup(script);
        }
      });
      document.head.appendChild(script);
    });
    self[importFunctionName].moduleMap = {};
  }
};
p("/assets/");
function About() {
  return /* @__PURE__ */ react.createElement("h1", null, "About");
}
var __glob_2_0 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: About
});
function Home({results}) {
  return /* @__PURE__ */ react.createElement(react.Fragment, null, results.map((post) => /* @__PURE__ */ react.createElement("h1", {
    key: post.id
  }, post.title)));
}
var __glob_2_1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Home
});
function Post() {
  return /* @__PURE__ */ react.createElement("h1", null, "Post");
}
var __glob_2_2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Post
});
const pages = {"./pages/About.jsx": __glob_2_0, "./pages/Home.jsx": __glob_2_1, "./pages/Post.jsx": __glob_2_2};
const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages\/(.*)\.jsx$/)[1];
  return {
    name,
    path: name === "Home" ? "/" : `/${name.toLowerCase()}`,
    component: pages[path].default
  };
});
function App(json2) {
  return /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("nav", null, /* @__PURE__ */ react.createElement("ul", null, routes.map(({name, path}) => {
    return /* @__PURE__ */ react.createElement("li", {
      key: path
    }, /* @__PURE__ */ react.createElement(Link, {
      to: path
    }, name));
  }))), /* @__PURE__ */ react.createElement(Switch, null, routes.map(({path, component: RouteComp}) => {
    return /* @__PURE__ */ react.createElement(Route, {
      key: path,
      path
    }, /* @__PURE__ */ react.createElement(RouteComp, __assign({}, json2)));
  })));
}
const json = JSON.parse(document.getElementById("json").getAttribute("data-json"));
reactDom.hydrate(/* @__PURE__ */ react.createElement(BrowserRouter, null, /* @__PURE__ */ react.createElement(App, __assign({}, json))), document.getElementById("takurinton"));
