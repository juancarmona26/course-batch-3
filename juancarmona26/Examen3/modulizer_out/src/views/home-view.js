import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
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

    <section class="box-model">
    <h2 class="section__title">Showing Characters</h2>
    <paper-input id="filterInput" value="{{filterVal::input}}" label="Filtro"></paper-input>
       
  <ul class="grid">
    
    <template is="dom-repeat" items="{{response}}" as="character" index-as="indexA" filter="{{_filter(filterVal)}}" >
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
  
  _filter(val)  {  
    return (character) => {
      if (!val) return true;
      if (!character) return false;
      return (character.first_name && ~character.first_name.indexOf(val));
    };
  };
}

window.customElements.define(HomeView.is, HomeView);
