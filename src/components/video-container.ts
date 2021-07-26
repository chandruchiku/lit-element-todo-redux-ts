/* eslint-disable class-methods-use-this */
/* eslint-disable lines-between-class-members */
/* eslint-disable import/extensions */
import {connect} from 'pwa-helpers';
import { LitElement, html, css, property } from 'lit-element';
import { VisibilityFilters } from '../store/reducer';
import './video-chat';
import './video-participants';
import '@material/mwc-textfield';
import '@material/mwc-button';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';
import '@material/mwc-radio';
import { ToDo } from '../models/ToDo';
import { RootState, store } from '../store/store';
import { addTodo, clearCompletd, updateFilter } from '../store/actions';
 
export class VideoContainer extends connect(store)(LitElement) {

  @property({ type: String }) title = 'ToDo App';

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--open-wc-scaffold-ts-background-color);
    }

    main {
      flex-grow: 1;
    }

    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .tile-area {
        background-color: bisque;
    }
    .input-layout {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  `;

  todos: ToDo[] = [];
  filter: string = '';
  task: string = '';

  stateChanged(state: RootState) {
    this.todos = state.todos;
    this.filter = state.filter;
  }

  static get properties() {
    return {
      todos: { type: Array },
      filter: { type: String },
      task: { type: String }
    }
  }

  updateTask(e: any) {
    this.task = e.target.value;
  }

  addToDo() {
    if (this.task) {
      store.dispatch(addTodo(this.task));

      this.task = '';
    }
  }



  shortCutListerner(e: any) {
    if (e.key === 'Enter') {
      this.addToDo();
    }
  }

  filterChanged(e: any) {    
    store.dispatch(updateFilter(e.target.value));
  }



  clearCompleted() {
    // this.todos = this.todos.filter(todo => !todo.complete);
    store.dispatch(clearCompletd());
  }

  render() {
    return html`
          <main>
            <h2>${this.title}</h2>
            <div class="container">
                <div class="tile-area">
                  <div class="input-layout" @keyup="${this.shortCutListerner}">
                    <mwc-textfield 
                      label="Task"
                      value="${this.task}"
                      @change="${this.updateTask}"></mwc-textfield>
                    <mwc-button raised 
                      label="Add"
                      @click="${this.addToDo}"></mwc-button>
                  </div>
                  

                  <div>
                    ${Object.values(VisibilityFilters).map((value: any) => html`
                      <mwc-formfield label="${value}">
                        <mwc-radio name="Filters" 
                          value="${value}"
                          @change="${this.filterChanged}"></mwc-radio>
                      </mwc-formfield>
                    `)}
                  </div>
                  <mwc-button 
                      label="Clear Completed"
                      @click="${this.clearCompleted}"></mwc-button>
                </div>
                <div>
                    <video-participants></video-participants>
                    <video-chat></video-chat>
                </div>
            </div>
          </main>
        `;
  }


}

customElements.define('video-container', VideoContainer);