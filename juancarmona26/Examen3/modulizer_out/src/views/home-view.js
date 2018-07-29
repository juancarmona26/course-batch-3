import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-image/iron-image.js'
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
    .thumbnail {
      height: 120px;
      width: 120px;
      margin:10px 0 0 0;
      border-radius: 70%;
    }
    .select {
      border: 1px solid #ccc;
      width: 140px;
      margin: 10px auto 30px;
      overflow: hidden;
      background: #fff url("http://www.csslab.cl/ejemplos/select/arrowdown.gif") no-repeat 90% center;
    }
    .select select {
        padding: 5px 8px;
        width: 130%;
        border: none;
        box-shadow: none;
        background-color: transparent;
        background-image: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }
    </style>    

    <section class="box-model">
    <h2 class="section__title">Showing Characters</h2>
    <paper-input id="filterInput" value="{{filterVal::input}}" label="Filtro"></paper-input>
    <p>Ordenar por: </p>
    <div class="select">
    
      <select value="{{sortVal::change}}">  
        <option value="id_user">User Id</option>
        <option value="first_name">First Name</option>
        <option value="last_name">Last Name</option>
      </select>  
    </div>
  <ul class="grid">
    
    <template is="dom-repeat" items="{{response}}" as="character" index-as="indexA" filter="{{_filter(filterVal)}}" 
    sort="{{_sortByName(sortVal)}}">
    <article class="" >
      <div class="grid-item">
        <div><iron-image src="{{character.avatar}}" class="thumbnail" sizing="cover" preload fade> </iron-image> </div>
            
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
        },
        employees: {
          type:Array,
          value:['hola1', 'hola2']                
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

  _sortByName(val){
    switch(val) {
      case 'first_name':
        return (a, b) => {
          if (a.first_name === b.first_name) return 0;
          return a.first_name < b.first_name ? -1 : 1;
        };
      case 'id_user':
        return (a, b) => {
          if (a.id === b.id) return 0;
          return a.id < b.id ? -1 : 1;
        };
      case 'last_name':      
        return (a, b) => {
          if (a.last_name === b.last_name) return 0;
          return a.last_name < b.last_name ? -1 : 1;
        };
    }
  }
}

window.customElements.define(HomeView.is, HomeView);
