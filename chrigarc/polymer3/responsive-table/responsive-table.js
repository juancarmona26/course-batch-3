import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {IronResizableBehavior} from  '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import '@polymer/iron-collapse/iron-collapse';

/**
 * `responsive-table`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class ResponsiveTable extends mixinBehaviors([IronResizableBehavior], PolymerElement){
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
        .table {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
            display: table;
        }
        
        .td, .th {
            border: 1px solid #ddd;            
            display: table-cell;                        
            padding-left: 5px;
            padding-right: 5px;
        }
        
        .tr{
            display: table-row;
        }
        
        .tr:nth-child(even){background-color: #f2f2f2;}
        
        .tr:hover {background-color: #ddd;}
        
        .th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #4CAF50;
            color: white;            
        }
        
        #area-collapse .td{
            width: 100%;
        }
        
        .btn-collapse{
            border: 1px solid #fff;    
            padding: 10px;
            background: darkgray;
        }
              
      </style>
      
      <div id="responsive-table">
        <div id="area-collapse">
            <dom-repeat items="[[collapseItems]]">
                <template>
                    <div>
                        <div class="btn-collapse"><a href="#collapse_[[index]]" on-click="toggle">[[item.title]] &darr;</a></div>        
                        <iron-collapse id="collapse_[[index]]">                                  
                            <div>
                                <dom-repeat items="[[item.data]]" as="item2">
                                    <template>
                                        <div class="tr">
                                            <div class="th">[[item2.header]]</div><div class="td">[[item2.content]]</div>
                                        </div>                                    
                                    </template>                                
                                </dom-repeat>
                            </div>
                        </iron-collapse>
                    </div>                    
                </template>
            </dom-repeat>
        </div>
        <div id="area-table">
            <div class="table">
                
                    <div class="tr">
                        <dom-repeat items="[[tableHeaders]]">
                            <template>
                                <div class="th">[[item]]</div>
                            </template>                                                  
                        </dom-repeat>
                    </div>
                
                    <dom-repeat items="[[tableBody]]">
                        <template>
                            <div class="tr">
                                <dom-repeat items="[[item.cells]]">
                                    <template>
                                        <div class="td">[[item]]</div>             
                                    </template>                                          
                                </dom-repeat>                            
                            </div> 
                        </template>                        
                    </dom-repeat>                
                
            </div>
        </div>
      </div>                
    `;
    }

    static get properties() {
        return {
            headers: {
                type: Object,
                value: {},
                reflectToAttribute: true
            },
            rows: {
                type: Object,
                value: {},
                reflectToAttribute: true
            },
            collapseItems: {
                type: Object,
                computed: '_itemsVista1(vista)'
            },
            tableHeaders: {
                type: Object,
                computed: '_headers(vista)'
            },
            tableBody: {
                type: Object,
                computed: '_body(vista)'
            },
            vista: {
                type: Number,
                value: 1
            }
        };
    }

    constructor(){
        super();

    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('iron-resize', this._handleResize);
        this.vista = this._vista();
    }

    _handleResize() {
        if(this.clientWidth < 500 && this.vista !== 1){
            this.vista = 1;
        }else if(this.clientWidth >= 500 && this.vista !== 2){
            this.vista = 2;
        }
    }

    _itemsVista1(vista){
        if(vista === 1){
            const collapseItems = [];
            for(const row of this.rows){
                const element = {title:row.title, data:[]};
                for(const cell of row.cells){
                    element.data.push({content:cell});
                }
                for(let i=0;i<this.headers.length;i++){
                    if(i<element.data.length){
                        element.data[i].header = this.headers[i];
                    }else{
                        element.data.push({header:this.headers[i]});
                    }
                }
                collapseItems.push(element);
            }
            return collapseItems;
        }
        return [];
    }

    _headers(vista){
        if(vista === 2){
            return this.headers;
        }
        return [];
    }

    _body(vista){
        if(vista === 2){
            return this.rows;
        }
        return [];
    }

    _vista(){
        if(this.clientWidth < 500){
            return  1;
        }else if(this.clientWidth >= 500){
            return 2;
        }
    }

    toggle(event){
        const index = event.model.index;
        const node = this.$['area-collapse'].querySelector('#collapse_' + index);
        node.toggle();
        event.target.setAttribute('aria-expanded',node.opened);
    }
}

window.customElements.define('responsive-table', ResponsiveTable);