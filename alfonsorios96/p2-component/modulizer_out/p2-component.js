import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';

/**
 * `p2-component`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class P2Component extends PolymerElement {
  static get template() {
    return html`
        <style>
            :host {
                display: block;
            }

            paper-button.green {
                background-color: var(--paper-green-500);
                color: white;
            }
        </style>
        <iron-ajax id="ajaxId" method="post" url="https/ponchos/course/3" on-response="onResponse" handle-as="json" content-type="application/json">

        </iron-ajax>
        <ul>
            <template is="dom-repeat" items="[[myArray]]" as="lol" index-as="indexA" id="a">
                <li>
                    <paper-input id\$="input-[[indexA]]" label="Introduce tu nombre" value="{{lol.name}} {{lol.last}}">
                    </paper-input>
                    <paper-button class="green" on-click="callbackButton">Suscribe !</paper-button>
                </li>
            </template>
        </ul>
`;
  }

  static get is() {
    return 'p2-component';
  }

  static get properties() {
    return {
      myArray: {
        type: Array,
        value: []
      }
    };
  }

  callbackButton(event) {
    const index = this.myArray.indexOf(event.model.lol);
    const element = this.shadowRoot.querySelector(`#input-${index}`);
    this.dispatchEvent(new CustomEvent('eventito', {
      bubbles: true,
      composed: true,
      detail: this.toUppercase(element.value)
    }));
    this.resetField(element);
  }

  toUppercase(value) {
    return value;
  }

  resetField(element) {
    element.value = '';
    this.$.ajaxId.generateRequest();
  }

  onResponse(response) {
    this.dispatchEvent(new CustomEvent('answering', {
      bubbles: true,
      composed: true,
      detail: response
    }));
  }

  myPromise(number) {
    return new Promise((resolve, reject) => {
      if (number === 1) {
        resolve('success');
      } else {
        reject({
          code: 101
        });
      }
    });
  }
}

window.customElements.define(P2Component.is, P2Component);
