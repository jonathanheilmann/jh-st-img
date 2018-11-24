# jh-st-img

![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)


## What is it?
jh-st-img is a web component built with [Stencil](https://stenciljs.com/) that allows you to lazy load images as the 
user scrolls them into the viewport. On supported browsers (Chrome and chrome based browsers, Firefox and Edge) it 
uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to accomplish 
this functionality. For Safari and IE it simply falls back to the BoundingClientRect method.

## Usage
To use this component in your app, no matter what framework you are using, follow these steps:

- pop this script tag `<script async defer src='https://unpkg.com/jh-st-img@0.1.0/dist/jhstimg.js'></script>` into your 
index.html

## API
Properties:

- alt (string): the value you want to use for the alt property of the image https://www.w3schools.com/tags/att_img_alt.asp
- imgClass (string): the class(es) you want to set as class property of the image
- src (string): the path or url to the image you want to load
- sources (string|JsStImgSource[]): the sources to add to picture https://www.w3schools.com/tags/tag_picture.asp, as 
 JsStImgSource type array or JSON encoded string (for vanilla HTML page usage)

Types:

```typescript
type JsStImgSource = {
  sizes?: string
  srcset: string
  type?: string
  media?: string
}
```


## Examples

Simple without sources, just lazy loading one image:
``` 
 <jh-st-img src="https://madeby.google.com/static/images/google_g_logo.svg"
            alt="google logo"
            img-class="img-thumbnail"
            title="google">
 </jh-st-img>
```

Vanilla HTML page, two image sizes with alternative webp image:
``` 
 <jh-st-img src="/path/to/large/jpg/image.jpg"
            alt="image"
            img-class="img-thumbnail"
            sources='[{"srcset":"/path/to/small/jpg/image.jpg", "type": "image/jpeg", "media": "max-width: 599px"},{"srcset":"/path/to/small/jpg/image.webp", "type": "image/webp", "media": "max-width: 599px"},{"srcset":"/path/to/large/jpg/image.jpg", "type": "image/jpeg", "media": "min-width: 600px"},{"srcset":"/path/to/large/jpg/image.webp", "type": "image/webp", "media": "min-width: 600px"}]' 
            title="best mathing image loaded from picture sources">
 </jh-st-img>
```

