import { PolymerElement } from '../../../../@polymer/polymer/polymer-element.js';
import '../../../../@polymer/iron-pages/iron-pages.js';
import '../../../../@polymer/app-route/app-route.js';
import '../../../../@polymer/app-route/app-location.js';
import '../../../../@polymer/iron-ajax/iron-ajax.js';
import '../views/home-view.js';
import { html } from '../../../../@polymer/polymer/lib/utils/html-tag.js';
/**
 * @customElement
 * @polymer
 */
class Examen3App extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }
    </style>        
    
    <app-location route="{{route}}"></app-location>

    <app-route route="{{route}}" pattern="/:page" data="{{data}}"> </app-route>
    
    <iron-pages selected="{{data.page}}" attr-for-selected="view" fallback-selection="home" role="main">
          <home-view view="home" response="[[characters]]"></home-view>          
        </iron-pages>

        <iron-ajax id="requestapi" handle-as="json" content-type="application/json" on-response="handleResponse" debounce-duration="300">
      </iron-ajax>
    <h2>Hello [[prop1]]!</h2>
`;
  }

  static get is() { return 'examen-3-app'; }
  static get properties() {
    return {        
      characters: {
          type:Array,
          value: []                
      }

    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.getCharacterList();
  }

  getCharacterList() {
    this.$.requestapi.url = 'https://reqres.in/api/users?per_page=12';
    this.$.requestapi.method = 'GET';
    this.$.requestapi.generateRequest();
  }

  handleResponse() {
    this.set('characters', this.$.requestapi.lastResponse.data);
  }
}

window.customElements.define(Examen3App.is, Examen3App);
