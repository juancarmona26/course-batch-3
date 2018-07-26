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
            color: #575757;
            padding: 1rem;
            margin: 0.3rem;
            text-decoration: none;
            border-bottom: solid;
            border-width: 1.3px;
            padding-bottom: 5px;
            text-align: center;
        }
        .row{
            padding: 0px;
        }
        .cell{
            padding-left: 1rem;
        }
        table{
        width: 100%;
        }
        table tr.full-screen:nth-child(even){
            background: #e0e0e0
        }
        table tr.full-screen:nth-child(odd) {
            background: #FFF
        }
        
        .row_active{
            color: #575757;
        }
        

        @media (max-width:530px) {
            div a{
                text-align: left;
            }
            #container {
                flex-direction: column;
            }
            span{
                color: #3b93ca;
                width: 87px;
            }
            .row{
                display: none;
                padding-left: 1rem;
            }
            .row_active{
                color: #3b93ca;
            }
            
        }
        
  
      </style>
      <div id="container">
            <template is="dom-repeat" items ="[[grid]]">
              <div>
                  <a href="#" on-click="displayNext">[[item.header]]</a>
                  <div class="row">
                    
                                        
                        <template is="dom-if" if="[[isMobile]]">
                            <table>   
                               <template is="dom-repeat" items="[[item.cells]]" as="cell">
                                <tr>
                                    <td style="width: 87px"><span>[[cell.label]]: </span></td>
                                    <td>{{cell.value}}</td>
                                </tr>
                                                  
                                </template>
                            </table>
                        </template>
                        
                        <template is="dom-if" if="[[!isMobile]]">
                            <table> 
                                <template is="dom-repeat" items="[[item.cells]]" as="cell">
                                   <tr class="full-screen"> <td class="cell">[[cell]]</td> </tr> 
                                </template>                
                            </table>             
                        </template>  
                        
                    
                            
                  </div>
              </div>
            </template>
       </div>
    `;
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
            isMobile:{
                type: Boolean,
                value: false,
                observer: '_redefineData'
            }
        };
    }

  ready(){
     super.ready();
     if(window.innerWidth <= 530){
       this.set('isMobile', true);
     }
     this._resizeListener();
  }


    _resizeListener() {
        window.addEventListener('resize', () => {
            const width = window.innerWidth;
            if (width <= 530) {
                this.isMobile = true;
                this._displayContent('none');
            } else {
                this.isMobile = false;
                this._displayContent('block');
            }
        }, true);
    }

    _displayContent(dis) {
        const rowList = this.shadowRoot.querySelectorAll('.row');
        if(dis === 'none'){
            this._removeLastActive();
        }
        for (const row of rowList) {
            row.style.display = dis;
        }
    }

    displayNext(el){
      if(this.isMobile){
          const content = el.target.nextElementSibling;
          if (content.style.display === 'block') {
              content.style.display = 'none';
              el.target.innerText = el.target.innerText.replace('+','-');
              el.target.classList.remove('row_active');
          } else {
              content.style.display = 'block';
              el.target.innerText = el.target.innerText.replace('-','+');
              this._removeLastActive();
              el.target.classList.add('row_active');
          }
      }
   }

    _removeLastActive() {
        const row = this.shadowRoot.querySelector('.row_active');
        if(row){
            row.innerText = row.innerText.replace('+','-');
            row.classList.remove('row_active');
            row.nextElementSibling.style.display = 'none';
        }
    }

    _onPropsChange(){
        this._redefineData();
    }

    _redefineData(){
        const newGrid = [];
        if(this.isMobile === false){
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
                column.header = '- ' + row.title;
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
        this.set('grid', newGrid);
    }

}


window.customElements.define('responsive-table', ResponsiveTable);
