import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '../dom-clima/dom-clima.js';

/**
 * @customElement
 * @polymer
 */
class ClimaAppApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <dom-clima></dom-clima>
    `;
  }
  static get properties() {
    return {
    };
  }
}

window.customElements.define('clima-app-app', ClimaAppApp);
