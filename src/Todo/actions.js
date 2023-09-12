import { 
    SET_TODO, 
    ADD_TODO, 
    EDIT_TODO, 
    DELETE_TODO 
} from './constants'

export const setTodo = payload => {
    return {
        type: SET_TODO,
        payload
    }
}

export const addTodo = payload => {
    return {
        type: ADD_TODO,
        payload
    }
}

export const editTodo = payload => {
    return {
        type: EDIT_TODO,
        payload
    }
}

export const deleteTodo = payload => {
    return {
        type: DELETE_TODO,
        payload
    }
}