/*! Built with http://stenciljs.com */
jhstimg.loadBundle("2hicyy3f",["exports"],function(e){var t=window.jhstimg.h,r=function(){function e(){this._isHandleImageFallback=!1,this._sources=[]}return e.prototype.srcWatchHandler=function(){this.addIntersectionObserver()},e.prototype.srcsetWatchHandler=function(){this.addIntersectionObserver()},e.prototype.sourcesWatchHandler=function(){this.addIntersectionObserver()},e.prototype.documentScrollHandler=function(){this._isHandleImageFallback&&this.fallbackLazyLoad()},e.prototype.windowResizeHandler=function(){this._isHandleImageFallback&&this.fallbackLazyLoad()},e.prototype.windowRrientationchangeHandler=function(){this._isHandleImageFallback&&this.fallbackLazyLoad()},e.prototype.componentWillLoad=function(){this._hasIntersectionObserver="IntersectionObserver"in window},e.prototype.componentDidLoad=function(){this.addIntersectionObserver()},e.prototype.componentDidUnload=function(){this.removeIntersectionObserver()},e.prototype.handleImage=function(){var e=this;this.sources?this._sources="string"==typeof this.sources?JSON.parse(this.sources):this.sources:this._sources=[],this._hasIntersectionObserver?setTimeout(function(){var t=e.el.shadowRoot.querySelector("img");t.getAttribute("data-src")&&(t.setAttribute("src",t.getAttribute("data-src")),t.removeAttribute("data-src")),t.getAttribute("data-srcset")&&(t.setAttribute("srcset",t.getAttribute("data-srcset")),t.removeAttribute("data-srcset"))},0===this._sources.length?0:300):(this._isHandleImageFallback=!0,this.fallbackLazyLoad())},e.prototype.fallbackLazyLoad=function(){var e=this.el.shadowRoot.querySelector("img");e.getBoundingClientRect().top<=window.innerHeight&&e.getBoundingClientRect().bottom>=0&&"none"!==getComputedStyle(e).display&&(e.getAttribute("data-src")&&(e.setAttribute("src",e.getAttribute("data-src")),e.removeAttribute("data-src")),e.getAttribute("data-srcset")&&(e.setAttribute("srcset",e.getAttribute("data-srcset")),e.removeAttribute("data-srcset")))},e.prototype.addIntersectionObserver=function(){var e=this;(this.src||this.srcset)&&(this._hasIntersectionObserver?(this.removeIntersectionObserver(),this.io=new IntersectionObserver(function(t){t[0].isIntersecting&&(e.handleImage(),e.removeIntersectionObserver())}),this.io.observe(this.el.shadowRoot.querySelector("img"))):this.handleImage())},e.prototype.removeIntersectionObserver=function(){this.io&&(this.io.disconnect(),this.io=null)},e.prototype.render=function(){return t("picture",null,this._sources.map(function(e){return t("source",{sizes:e.sizes,srcSet:e.srcset,type:e.type,media:e.media})}),t("img",{"data-src":this.src,"data-srcset":this.srcset,alt:this.alt}))},Object.defineProperty(e,"is",{get:function(){return"jh-st-img"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{_hasIntersectionObserver:{state:!0},_isHandleImageFallback:{state:!0},_sources:{state:!0},alt:{type:String,attr:"alt"},el:{elementRef:!0},sources:{type:"Any",attr:"sources",watchCallbacks:["sourcesWatchHandler"]},src:{type:String,attr:"src",watchCallbacks:["srcWatchHandler"]},srcset:{type:String,attr:"srcset",watchCallbacks:["srcsetWatchHandler"]}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"listeners",{get:function(){return[{name:"document:scroll",method:"documentScrollHandler",passive:!0},{name:"window:resize",method:"windowResizeHandler",passive:!0},{name:"window:orientationchange",method:"windowRrientationchangeHandler"}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"[data-jh-st-img-host]{display:block}img[data-jh-st-img]{max-width:100%}"},enumerable:!0,configurable:!0}),e}();e.JhStImg=r,Object.defineProperty(e,"__esModule",{value:!0})});