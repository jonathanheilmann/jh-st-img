import { Component, Element, Listen, Prop, State, Watch } from '@stencil/core';


@Component({
  tag: 'jh-st-img',
  styleUrl: 'jh-st-img.scss',
  shadow: true
})
export class JhStImg {

  @Element() el: HTMLElement;

  @Prop() src: string;
  @Prop() srcset: string;
  @Prop() alt: string;
  @Prop() sources: any;

  @State() _hasIntersectionObserver: boolean;
  @State() _isHandleImageFallback: boolean = false;
  @State() _sources: {
    sizes: string,
    srcset: string,
    type: string,
    media: string
  } [] = [];

  @Watch('src')
  srcWatchHandler() {
    this.addIntersectionObserver();
  }

  @Watch('srcset')
  srcsetWatchHandler() {
    this.addIntersectionObserver();
  }

  @Watch('sources')
  sourcesWatchHandler() {
    this.addIntersectionObserver();
  }

  @Listen('document:scroll')
  documentScrollHandler() {
    if (this._isHandleImageFallback) {
      this.fallbackLazyLoad();
    }
  }

  @Listen('window:resize')
  windowResizeHandler() {
    if (this._isHandleImageFallback) {
      this.fallbackLazyLoad();
    }
  }

  @Listen('window:orientationchange')
  windowRrientationchangeHandler() {
    if (this._isHandleImageFallback) {
      this.fallbackLazyLoad();
    }
  }

  io: IntersectionObserver;

  componentWillLoad() {
    this._hasIntersectionObserver = 'IntersectionObserver' in window;
  }

  componentDidLoad() {
    this.addIntersectionObserver();
  }

  componentDidUnload() {
    this.removeIntersectionObserver();
  }

  handleImage() {
    if (this.sources) {
      this._sources = typeof this.sources === 'string' ? JSON.parse(this.sources) : this.sources;
    } else {
      this._sources = [];
    }

    if (this._hasIntersectionObserver) {
      setTimeout(() => {
        const image: HTMLImageElement = this.el.shadowRoot.querySelector('img');

        if (image.getAttribute('data-src')) {
          image.setAttribute('src', image.getAttribute('data-src'));
          image.removeAttribute('data-src');
        }
        if (image.getAttribute('data-srcset')) {
          image.setAttribute('srcset', image.getAttribute('data-srcset'));
          image.removeAttribute('data-srcset');
        }
      }, this._sources.length === 0 ? 0 : 300);
    } else {
      this._isHandleImageFallback = true;

      this.fallbackLazyLoad();
    }
  }

  fallbackLazyLoad() {
    const image: HTMLImageElement = this.el.shadowRoot.querySelector('img');
    if (
      (image.getBoundingClientRect().top <= window.innerHeight && image.getBoundingClientRect().bottom >= 0)
      && getComputedStyle(image).display !== 'none'
    ) {
      if (image.getAttribute('data-src')) {
        image.setAttribute('src', image.getAttribute('data-src'));
        image.removeAttribute('data-src');
      }
      if (image.getAttribute('data-srcset')) {
        image.setAttribute('srcset', image.getAttribute('data-srcset'));
        image.removeAttribute('data-srcset');
      }
    }
  };

  addIntersectionObserver() {
    if (!this.src && !this.srcset) {
      return;
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
          this.handleImage();
          this.removeIntersectionObserver();
        }
      });

      this.io.observe(this.el.shadowRoot.querySelector('img'));
    } else {
      // fall back to setTimeout for Safari and IE in handleImage method
      this.handleImage();
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
      <img data-src={this.src} data-srcset={this.srcset} alt={this.alt}/>
    </picture>;
  }
}
