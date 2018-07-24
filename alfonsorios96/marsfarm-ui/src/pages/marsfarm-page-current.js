import { LitElement, html } from "@polymer/lit-element/lit-element.js";
import ReduxMixin from "../mixins/marsfarm-redux-store.js";

class MarsfarmPageCurrent extends ReduxMixin(LitElement) {
  static get properties() {
    return {
      message: {
        type: String,
        statePath: "user.name"
      },
      temperatures: {
        type: Array,
        statePath: "temperatures"
      }
    };
  }
  
  connectedCallback(){
    super.connectedCallback();
    console.log(this.getState());
  }

  render({ temperatures, message}) {
    return html`
      <style>
        .content {
          margin: 10px 10px 0 10px;
          padding: 5px;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
          background-color: #fff;
        }
      </style>

      <div class="content">
        <h2>message ${message}</h2>

        <ul>
          ${(temperatures || []).map(
            temperature => html`
          <li>
            Year: ${temperature.Year} -
            Mean: ${temperature.Mean} -
            Source: ${temperature.Source}
          </li>
          `
          )}
        </ul>
        <h1>Current Status</h1>
        <svg width="960" height="500"></svg>
      </div>
    `;
  }
}

customElements.define("marsfarm-page-current", MarsfarmPageCurrent);
