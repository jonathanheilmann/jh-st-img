/*! Built with http://stenciljs.com */
import{h}from"./jhstimg.core.js";var JhStImg=function(){function t(){this._isHandleImageFallback=!1,this._sources=[]}return t.prototype.srcWatchHandler=function(){this.addIntersectionObserver()},t.prototype.srcsetWatchHandler=function(){this.addIntersectionObserver()},t.prototype.sourcesWatchHandler=function(){this.addIntersectionObserver()},t.prototype.documentScrollHandler=function(){this._isHandleImageFallback&&this.fallbackLazyLoad()},t.prototype.windowResizeHandler=function(){this._isHandleImageFallback&&this.fallbackLazyLoad()},t.prototype.windowRrientationchangeHandler=function(){this._isHandleImageFallback&&this.fallbackLazyLoad()},t.prototype.componentWillLoad=function(){this._hasIntersectionObserver="IntersectionObserver"in window},t.prototype.componentDidLoad=function(){this.addIntersectionObserver()},t.prototype.componentDidUnload=function(){this.removeIntersectionObserver()},t.prototype.handleImage=function(){var t=this;this.sources?this._sources="string"==typeof this.sources?JSON.parse(this.sources):this.sources:this._sources=[],this._hasIntersectionObserver?setTimeout(function(){var e=t.el.querySelector("img");e.getAttribute("data-src")&&(e.setAttribute("src",e.getAttribute("data-src")),e.removeAttribute("data-src")),e.getAttribute("data-srcset")&&(e.setAttribute("srcset",e.getAttribute("data-srcset")),e.removeAttribute("data-srcset"))},0===this._sources.length?0:300):(this._isHandleImageFallback=!0,this.fallbackLazyLoad())},t.prototype.fallbackLazyLoad=function(){var t=this.el.querySelector("img");t.getBoundingClientRect().top<=window.innerHeight&&t.getBoundingClientRect().bottom>=0&&"none"!==getComputedStyle(t).display&&(t.getAttribute("data-src")&&(t.setAttribute("src",t.getAttribute("data-src")),t.removeAttribute("data-src")),t.getAttribute("data-srcset")&&(t.setAttribute("srcset",t.getAttribute("data-srcset")),t.removeAttribute("data-srcset")))},t.prototype.addIntersectionObserver=function(){var t=this;(this.src||this.srcset)&&(this._hasIntersectionObserver?(this.removeIntersectionObserver(),this.io=new IntersectionObserver(function(e){e[0].isIntersecting&&(t.handleImage(),t.removeIntersectionObserver())}),this.io.observe(this.el.querySelector("img"))):this.handleImage())},t.prototype.removeIntersectionObserver=function(){this.io&&(this.io.disconnect(),this.io=null)},t.prototype.render=function(){return this._sources.length?h("picture",null,this._sources.map(function(t){return h("source",{sizes:t.sizes,srcSet:t.srcset,type:t.type,media:t.media})}),h("img",{"data-src":this.src,"data-srcset":this.srcset,alt:this.alt,class:this.imgClass})):h("img",{"data-src":this.src,"data-srcset":this.srcset,alt:this.alt,class:this.imgClass})},Object.defineProperty(t,"is",{get:function(){return"jh-st-img"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{_hasIntersectionObserver:{state:!0},_isHandleImageFallback:{state:!0},_sources:{state:!0},alt:{type:String,attr:"alt"},el:{elementRef:!0},imgClass:{type:String,attr:"img-class"},sources:{type:"Any",attr:"sources",watchCallbacks:["sourcesWatchHandler"]},src:{type:String,attr:"src",watchCallbacks:["srcWatchHandler"]},srcset:{type:String,attr:"srcset",watchCallbacks:["srcsetWatchHandler"]}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"document:scroll",method:"documentScrollHandler",passive:!0},{name:"window:resize",method:"windowResizeHandler",passive:!0},{name:"window:orientationchange",method:"windowRrientationchangeHandler"}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"jh-st-img{display:block}"},enumerable:!0,configurable:!0}),t}();export{JhStImg};