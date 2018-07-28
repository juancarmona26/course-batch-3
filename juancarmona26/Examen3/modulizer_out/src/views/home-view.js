import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
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

    <section class="box-model">
    <h2 class="section__title">Showing Characters</h2>
  <ul class="grid">
    
    <template is="dom-repeat" items="[[response]]" as="character" index-as="indexA" >
    <article class="" >
      <div class="grid-item">
        <div><img src="{{character.avatar}}" alt="Character">  </div>
            
            <li>

                <p>{{character.id}} </p>
                <p>{{character.first_name}} </p>
                <p>{{character.last_name}} </p>

            </li>  
            </div>          

            </article>
   </template>
   </section>
</ul>
<p>Hola mundo XD<p/>
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
