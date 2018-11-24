import { Component, Element, Listen, Prop, State, Watch } from '@stencil/core';
import { JsStImgSource } from './jh-st-img-types';


@Component({
  tag: 'jh-st-img',
  styleUrl: 'jh-st-img.scss'
})
export class JhStImg {

  @Element() el: HTMLElement;

  @Prop() alt: string;
  @Prop() imgClass: string;
  @Prop() src: string;
  @Prop() sources: any;

  @State() _sources: JsStImgSource[] = [];

  io: IntersectionObserver;

  _hasIntersectionObserver: boolean;
  _hasPictureElementSupport: boolean;
  _isFallbackImageLoaded: boolean = false;
  _isHandleImageFallback: boolean = false;
  _isUnsupportedPictureElementImageLoaded: boolean = false;

  @Watch('src')
  srcWatchHandler() {
    this._isUnsupportedPictureElementImageLoaded = false;

    this.addIntersectionObserver();
  }

  @Watch('sources')
  sourcesWatchHandler(newSources) {
    this.updateSources(newSources, true);
    this.addIntersectionObserver();
  }

  @Listen('document:scroll')
  documentScrollHandler() {
    if (this._hasIntersectionObserver === false) {
      this.fallback();
    }
  }

  @Listen('window:resize')
  windowResizeHandler() {
    if (this._hasIntersectionObserver === false) {
      this.fallback();
    }
  }

  @Listen('window:orientationchange')
  windowRrientationchangeHandler() {
    if (this._hasIntersectionObserver === false) {
      this.fallback();
    }
  }

  componentWillLoad() {
    this._hasIntersectionObserver = 'IntersectionObserver' in window;

    const pictureElement = document.createElement('picture');
    this._hasPictureElementSupport = pictureElement.toString().includes('HTMLPictureElement');
  }

  componentDidLoad() {
    this.addIntersectionObserver();
  }

  componentDidUnload() {
    this.removeIntersectionObserver();
  }

  addIntersectionObserver() {
    if (!this.src) {
      throw new Error('Required attribute in web component `jh-st-img` not set.');
    }

    if (this._hasIntersectionObserver) {
      // Remove old IntersectionObserver
      this.removeIntersectionObserver();
      // Create new IntersectionObserver
      this.io = new IntersectionObserver((data: any) => {
        // because there will only ever be one instance
        // of the element we are observing
        // we can just use data[0]
        if (data[ 0 ].isIntersecting) {
          this.updateSources(this.sources);
          this.handleUnsupportedPictureElement();
          this.removeIntersectionObserver();
        }
      });

      this.io.observe(this.el.querySelector('img'));
    } else if (this._isFallbackImageLoaded === false) {
      // fall back to setTimeout for Safari and IE in handleImage method
      this.fallback();
    }
  }

  handleUnsupportedPictureElement() {
    if (this._hasPictureElementSupport === false && this._isUnsupportedPictureElementImageLoaded === false) {
      const image: HTMLImageElement = this.el.querySelector('img');
      image.setAttribute('src', this.src);

      this._isUnsupportedPictureElementImageLoaded = true;
    }
  }

  fallback() {
    if (this._isFallbackImageLoaded === false) {
      const image: HTMLImageElement = this.el.querySelector('img');

      if (
        (image.getBoundingClientRect().top <= window.innerHeight && image.getBoundingClientRect().bottom >= 0)
        && getComputedStyle(image).display !== 'none'
      ) {
        this.updateSources(this.sources);
        this.handleUnsupportedPictureElement();

        this._isFallbackImageLoaded = true;
      }
    }
  };

  updateSources(sources, forceUpdate = false) {
    if (this._sources.length !== 0 && forceUpdate === false) {
      return;
    }

    if (sources) {
      let _sources = typeof sources === 'string' ? JSON.parse(sources) : sources;

      // Safari fails for mime `image/jpg` (see https://stackoverflow.com/questions/35932530/safari-difference-with-image-jpeg-and-img-jpg)
      // Replace type `image/jpg` by `image/jpeg`
      for (let i = (_sources.length - 1); i >= 0; i--) {
        if (_sources[i]['type'] && _sources[i]['type'] === 'image/jpg') {
          _sources[i]['type'] = 'image/jpeg';
        }
      }

      this._sources = _sources;
    } else {
      this._sources = [ { sizes: null, srcset: this.src, type: null, media: null } ];
    }
  }

  removeIntersectionObserver() {
    if (this.io) {
      this.io.disconnect();
      this.io = null;
    }
  }

  render() {
    return <picture>
      {this._sources.map((source) => {
        return <source sizes={source.sizes} srcSet={source.srcset} type={source.type} media={source.media}/>;
      })}
      <img src="" alt={this.alt} class={this.imgClass}/>
    </picture>;
  }
}
