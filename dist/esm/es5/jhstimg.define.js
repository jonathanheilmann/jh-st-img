// jhstimg: Custom Elements Define Library, ES Module/ES5 Target
import { defineCustomElement } from './jhstimg.core.js';
import {
  JhStImg
} from './jhstimg.components.js';

export function defineCustomElements(window, opts) {
  defineCustomElement(window, [
    JhStImg
  ], opts);
}