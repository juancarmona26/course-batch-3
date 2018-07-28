import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/app-route/app-route.js';
import '@polymer/app-route/app-location.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '../views/home-view.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/**
 * @customElement
 * @polymer
 */
class Examen3App extends PolymerElement {
  static get template() {
    return html`
    <style>
    * {
    margin: 0;
    padding: 0;
  }
  
  :root {
    --secondary-color: #555;
    --box-height: 100px;
    --font-size: 20px;
  }

  .box-model {
    border: 3px dashed var(--secondary-color);
    margin: 20px;
    padding: 20px;
  }

  ul {
    list-style-type: none;
  }

  .section__title {
    text-align: center;
    margin: 10px 0 25px 0;
  }

.grid {
    border: 1px solid blue;
    padding: 20px;
    display: grid;
  
    /* grid-template-columns: 1fr  2fr; */
    /* grid-template-rows: 200px 59px 200px ; */
  
    grid-template-columns: repeat(4, 1fr) ;
    /* grid-template-columns: 1fr .6fr 1fr 1fr; */
    /* grid-template-columns: 1fr 1fr 1fr 1fr; */
    grid-gap: 50px;
  }
  
  .grid-item {
    border: 2px solid var(--secondary-color);
    height: 100%;
    width: 100%;
    text-align: center;
  }
    </style>        
    
    <app-location route="{{route}}"></app-location>

    <app-route route="{{route}}" pattern="/:page" data="{{data}}"> </app-route>
    
    <iron-pages selected="{{data.page}}" attr-for-selected="view" fallback-selection="home" role="main">
          <home-view view="home" response="[[characters]]"></home-view>          
        </iron-pages>

        <iron-ajax id="requestapi" handle-as="json" content-type="application/json" on-response="handleResponse" debounce-duration="300">
      </iron-ajax>
    <h2>Hello WTF!</h2>
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
