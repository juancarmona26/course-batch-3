import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {ReduxMixin} from "../redux/reduxMixin.js";

/**
 * @customElement
 * @polymer
 */
class ReduxPolymerApp extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[user.email]]!</h2>
    `;
  }
  
  static get actions() {
    return {
      updateUser(user) {
        return {
          type: 'UPDATE_USER',
          user
        };
      },
      addEmployee(employee) {
        return {
          type: 'ADD_EMPLOYEES',
          employee
        };
      }
    };
  }
  
  static get properties() {
    return {
      user: {
        type: Object,
        statePath: 'user'
      },
      employees: {
        type: Array,
        statePath: 'employees'
      }
    };
  }
  
  connectedCallback() {
    super.connectedCallback();
    this.dispatch('updateUser', {
      email: 'aldo.aldaco@gmail.com'
    });
    this.dispatch('addEmployee', {
      email: 'malforime@gmail.com'
    });
    const state = this.getState();
  }
}

window.customElements.define('redux-polymer-app', ReduxPolymerApp);
