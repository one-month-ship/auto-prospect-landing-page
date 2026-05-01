import{c as r,j as e,m as n}from"./createLucideIcon.4_fmeubW.js";import{r as c}from"./index.CdJzaNS0.js";import{A as i}from"./index.BqKr22VB.js";/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=[["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 18h16",key:"19g7jn"}],["path",{d:"M4 6h16",key:"1o0s65"}]],d=r("menu",l);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],p=r("x",x);function f({links:s}){const[t,a]=c.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>a(!t),className:"text-text-secondary hover:text-text","aria-label":"Menu",children:t?e.jsx(p,{size:24}):e.jsx(d,{size:24})}),e.jsx(i,{children:t&&e.jsx(n.div,{initial:{opacity:0,y:-8},animate:{opacity:1,y:0},exit:{opacity:0,y:-8},transition:{duration:.2},className:"absolute left-0 right-0 top-full border-b border-border bg-bg/95 backdrop-blur-xl",children:e.jsxs("div",{className:"flex flex-col gap-1 p-4",children:[s.map(o=>e.jsx("a",{href:o.href,onClick:()=>a(!1),className:"rounded-lg px-4 py-3 text-sm text-text-secondary transition-colors hover:bg-card hover:text-text",children:o.label},o.href)),e.jsx("a",{href:"#pricing",onClick:()=>a(!1),className:"mt-2 rounded-lg bg-accent px-4 py-3 text-center text-sm font-semibold text-bg transition-colors hover:bg-accent-hover",children:"Essai gratuit"})]})})})]})}export{f as default};
