if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let r={};const o=e=>a(e,c),d={module:{uri:c},exports:r,require:o};s[c]=Promise.all(i.map((e=>d[e]||o(e)))).then((e=>(n(...e),r)))}}define(["./workbox-873c5e43"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/android-chrome-144x144.png",revision:"9672d2f197713e641b854805b526b9a4"},{url:"assets/android-chrome-192x192.png",revision:"218f29557b2739cfb08b0d8e7672fa7a"},{url:"assets/android-chrome-256x256.png",revision:"91606e6792ba3456e99d11822da51657"},{url:"assets/android-chrome-36x36.png",revision:"4b8762c34e8603a2114035bf17426e23"},{url:"assets/android-chrome-384x384.png",revision:"b4502262c1d8972cf696ec17116aadcf"},{url:"assets/android-chrome-48x48.png",revision:"3523dff4441ae0a6f3efccb7c208df56"},{url:"assets/android-chrome-512x512.png",revision:"79906d162bad8d2efffe52097f018794"},{url:"assets/android-chrome-72x72.png",revision:"6c213a62e3815550eb82616227799a14"},{url:"assets/android-chrome-96x96.png",revision:"587b3247c2df913eef7b2a2a55459afa"},{url:"assets/apple-touch-icon-1024x1024.png",revision:"e1a79c200266a1e746c1c49ec31289a7"},{url:"assets/apple-touch-icon-114x114.png",revision:"a119f886235f48af6464cf763ddc2503"},{url:"assets/apple-touch-icon-120x120.png",revision:"3a88bcd8858034a479f3ca1556f06b04"},{url:"assets/apple-touch-icon-144x144.png",revision:"4d338cb5e2d2451491d2c4908851dbc9"},{url:"assets/apple-touch-icon-152x152.png",revision:"2a5107e6c79d54d80f9dafe3dfdc3b16"},{url:"assets/apple-touch-icon-167x167.png",revision:"d9a3ea2c36cf650f32be916fa8a6253e"},{url:"assets/apple-touch-icon-180x180.png",revision:"19a79b32230a47f956a18e01f653525a"},{url:"assets/apple-touch-icon-57x57.png",revision:"76b92e0d9c23ed78b2c35bbb56f10386"},{url:"assets/apple-touch-icon-60x60.png",revision:"b33101a64669e2cad09636560e3058f4"},{url:"assets/apple-touch-icon-72x72.png",revision:"66015570204c413fc87609dbe8c04eb9"},{url:"assets/apple-touch-icon-76x76.png",revision:"60f23aad70a20d656d657e003e11337c"},{url:"assets/apple-touch-icon-precomposed.png",revision:"19a79b32230a47f956a18e01f653525a"},{url:"assets/apple-touch-icon.png",revision:"19a79b32230a47f956a18e01f653525a"},{url:"assets/browserconfig.xml",revision:"6678685f076271f924816248563e7436"},{url:"assets/favicon-16x16.png",revision:"b2c28332a53f2c4d49f2c3205d59a7a2"},{url:"assets/favicon-32x32.png",revision:"b9298fed5da507224280ae8c48202141"},{url:"assets/favicon-48x48.png",revision:"3523dff4441ae0a6f3efccb7c208df56"},{url:"assets/favicon.ico",revision:"75ecb3e08ec6c7208d8a8567c8aae402"},{url:"assets/manifest.json",revision:"2e79caf2d18c07776218720318349f1c"},{url:"assets/mstile-144x144.png",revision:"9672d2f197713e641b854805b526b9a4"},{url:"assets/mstile-150x150.png",revision:"4fe4551d67b5d325f43ee2dab62a2469"},{url:"assets/mstile-310x150.png",revision:"d31f8a5bcad7ee6b21f50df2c1196f05"},{url:"assets/mstile-310x310.png",revision:"79ca515aab17a29c61b0964a73de3c44"},{url:"assets/mstile-70x70.png",revision:"36a14f8459abe16b86be22917be50e31"},{url:"bundle.js",revision:"c10a052900eeb6fe3e17af21f8e21a70"},{url:"bundle.js.LICENSE.txt",revision:"26a9431bc1d4ac32e5ec214c61d7763d"},{url:"index.html",revision:"a9c1eb84a73eb92d4cad5de2c3a65314"}],{})}));
