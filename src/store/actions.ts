/* eslint-disable no-bitwise */
/* eslint-disable import/extensions */
import { Action } from "redux";
import { ToDo } from "../models/ToDo";

export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO_STATUS = 'UPDATE_TODO_STATUS';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';

const uuidv4 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // eslint-disable-next-line eqeqeq
      const r = Math.random() * 16 | 0; const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    })

export interface AddTodoItemAction extends Action {
    payload: {
        todo: ToDo
    }
}

export interface UpdateTodoStatusAction extends Action {
    payload: {
        todo: ToDo,
        complete: boolean
    }
}

export interface UpdateFilterAction extends Action {
    payload: {
        filter: string
    }
}

export const addTodo = (task: string): AddTodoItemAction => ({
    type: ADD_TODO,
    payload: {
        todo: {
            id: uuidv4(),
            task,
            complete: false
        }
    }
})

export const updateTodoStatus = (todo: ToDo, complete: boolean): UpdateTodoStatusAction => ({
    type: UPDATE_TODO_STATUS,
    payload: {
        todo,
        complete
    }
})

export const updateFilter = (filter: string): UpdateFilterAction => ({
    type: UPDATE_FILTER,
    payload: {
        filter
    }
});

export const clearCompletd = () => ({
    type: CLEAR_COMPLETED
})
