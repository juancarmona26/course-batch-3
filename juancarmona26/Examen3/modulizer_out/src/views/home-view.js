import { PolymerElement } from '../../../../@polymer/polymer/polymer-element.js';
import { html } from '../../../../@polymer/polymer/lib/utils/html-tag.js';
/**
 * @customElement
 * @polymer
 */
class HomeView extends PolymerElement {
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

    <ul>
    <template is="dom-repeat" items="[[response]]" as="character" index-as="indexA">
        
        <div><img src="{{character.avatar}}" alt="Character">  </div>
            
            <li>

                <p>{{character.id}} </p>
                <p>{{character.first_name}} </p>
                <p>{{character.last_name}} </p>

            </li>            

     
   </template>
</ul>
`;
  }

  static get is() { return 'home-view'; }
  static get properties() {
    return {
        name: {
          type: String,
          value: 'World'
        },
        response: {
          type:Array,
          value:[]                
        }
    
    }
  }
}

window.customElements.define(HomeView.is, HomeView);
