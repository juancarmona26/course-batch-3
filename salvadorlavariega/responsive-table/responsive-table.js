import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `responsive-table`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class ResponsiveTable extends PolymerElement {
  static get template() {
    return html`
      <style>
        #container{
            padding: 0;
            margin: 0;
            display: flex;
            width: 100%;
        }

        div a{
            display: block;
            background: darkorange;
            color: #fff;
            padding: 1rem;
            margin: 0.3rem;
            text-decoration: none;
        }
        ul{
            text-decoration: none;
            list-style: none;
        }

        @media (max-width:530px) {
            #container {
                flex-direction: column;
            }
            span{
                font-weight: bold;
            }
            ul{
                display: none;
            }
            span{
                font-weight: bold;
            }
        }
      </style>
      <div id="container">
            <template is="dom-repeat" items ="[[grid]]">
              <div>
                  <a href="#" on-click="displayNext">[[item.header]]</a>
                  <ul>
                      <template is="dom-repeat" items="[[item.cells]]" as="cell">
                        <template is="dom-if" if="[[!mode_movil]]">
                            <li>[[cell]]</li>
                        </template>  
                        <template is="dom-if" if="[[mode_movil]]">
                            <li><span>[[cell.label]]: </span> {{cell.value}}</li>
                        </template>
                      </template>                     
                  </ul>
              </div>
            </template>
       </div>
    `;
  }

  ready(){
    super.ready();
      const ro = new ResizeObserver((entries, observer) => {
          for (const entry of entries) {
              const width = entry.contentRect.width;
              console.log(width);
              if(width < 442){
                  this.mode_movil = true;
              } else {
                  this.mode_movil = false;

              }

          }
      });
      ro.observe(this.$.container);

  }
  static get properties() {
    return {
      headers: {
        type: Array,
        value: [],
        observer: '_onPropsChange'
      },
        rows : {
       type : Array,
       value : []
      },
      grid: {
          type: Array,
          value: []
      },
      mode_movil:{
        type: Boolean,
        value: false,
        observer: '_redefineData'
      }
    };
  }

    displayNext(el){
      const content = el.target.nextElementSibling;
      if (content.style.display === "block") {
          content.style.display = "none";
      } else {
          content.style.display = "block";
      }
   }

    _onPropsChange(){
        this._redefineData();
    }

    _redefineData(){
        const newGrid = [];
        if(this.mode_movil === false){
            for(const index in this.headers){
                const column = {};
                column.header = this.headers[index];
                column.cells = [];
                for(const row of this.rows){
                    column.cells.push(row.cells[index]);
                }
                newGrid.push(column);
            }
        }

        else {

            for(const row of this.rows){
                const column = {};
                column.header = row.title;
                column.cells = [];
                for(const index in this.headers){
                    const cell = {};
                    cell.label = this.headers[index];
                    cell.value = row.cells[index];
                    column.cells.push(cell);
                }
                newGrid.push(column);
            }
        }

        this.grid = newGrid;
    }

}


window.customElements.define('responsive-table', ResponsiveTable);
