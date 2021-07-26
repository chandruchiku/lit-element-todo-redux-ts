/* eslint-disable import/extensions */
import { ToDo } from "../models/ToDo"
import { ADD_TODO, CLEAR_COMPLETED, UPDATE_FILTER, UPDATE_TODO_STATUS } from "./actions";

export const VisibilityFilters = {
    SHOW_ALL: 'All',
    SHOW_ACTIVE: 'Active',
    SHOW_COMPLETED: 'Complete'
}

interface ToDoState {
    todos : ToDo[],
    filter: string
}

const INITIAL_STATE : ToDoState = {
    todos: [],
    filter: VisibilityFilters.SHOW_ALL
}

export const reducer = (state = INITIAL_STATE, action: any): any => {
    switch(action.type) {
        case ADD_TODO: 
            return {
                ...state,
                todos: [...state.todos, action.payload.todo]
            };
        case UPDATE_TODO_STATUS: 
            return {
                ...state,
                todos: state.todos.map((todo: ToDo) => (
                    action.payload.todo === todo ? { ...todo, complete: action.payload.complete} : todo
                ))
            };
        case UPDATE_FILTER : 
            return {
                ...state,
                filter: action.payload.filter
            }
        case CLEAR_COMPLETED:
            return {
                ...state,
                todos: state.todos.filter(todo => !todo.complete)
            }
        default: 
            return state; 
    }
}

