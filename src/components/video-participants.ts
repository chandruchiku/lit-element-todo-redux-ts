/* eslint-disable import/extensions */
/* eslint-disable lines-between-class-members */
import { LitElement, html, css, property } from 'lit-element';
import { connect } from 'pwa-helpers';
import { ToDo } from '../models/ToDo';
import { updateTodoStatus } from '../store/actions';
import { VisibilityFilters } from '../store/reducer';
import { RootState, store } from '../store/store';

export class VideoParticipants extends connect(store)(LitElement) {

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
            background-color: lightskyblue
        }

        .todos-list {
            text-align: left;
        }
    `;

    @property()
    todos: ToDo[] = [];
    @property()
    filter: string = '';
    task: string = '';

    stateChanged(state: RootState) {
        this.todos = state.todos;
        this.filter = state.filter;
    }

    applyFilter(todos: ToDo[]) {
        switch (this.filter) {
            case VisibilityFilters.SHOW_ACTIVE:
                return todos.filter(todo => !todo.complete);
            case VisibilityFilters.SHOW_COMPLETED:
                return todos.filter(todo => todo.complete);
            default:
                return todos;
        }
    }

    // eslint-disable-next-line class-methods-use-this
    updateToDoStatus(updatedTodo: ToDo, complete: any) {
        store.dispatch(updateTodoStatus(updatedTodo, complete));
    }

    render() {
        return html`
          <h3>ToDo List</h3>
          <div class="todos-list">
                    ${this.applyFilter(this.todos).map(todo => html`
                      <div class="todo-item">
                      <mwc-formfield label="${todo.task}">
                        <mwc-checkbox
                          ?checked="${todo.complete}"
                          @change="${(e: any) => this.updateToDoStatus(todo, e.target.checked)}"
                          ></mwc-checkbox>
                          </mwc-formfield>
                      </div>
                    `)}
                  </div>
        `;
    }
}

customElements.define('video-participants', VideoParticipants);