import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';

/**
 * `p3-component`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class P3Component extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
      <paper-input label="[[prop1]]"></paper-input>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'p3-component',
      },
    };
  }
}

window.customElements.define('p3-component', P3Component);
