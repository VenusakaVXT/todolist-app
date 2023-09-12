import { 
    SET_TODO, 
    ADD_TODO, 
    EDIT_TODO, 
    DELETE_TODO 
} from './constants'

export const initState = JSON.parse(localStorage.getItem('Venus__todoList')) ?? {
    todo: '',
    todos: []
}

const reducer = (state, action) => {
    let newState

    switch (action.type) {
        case SET_TODO:
            newState = {
                ...state,
                todo: action.payload
            }
            break;
        case ADD_TODO:
            newState = {
                ...state,
                todos: [...state.todos, action.payload]
            }
            break
        case EDIT_TODO:
            let updateTodos = [...state.todos]

            updateTodos.splice(action.payload.index, 1, action.payload.editVal)

            newState = {
                ...state,
                todos: [...updateTodos]
            }
            break;
        case DELETE_TODO:
            let newTodos = [...state.todos]

            newTodos.splice(action.payload, 1)

            newState = {
                ...state,
                todos: [...newTodos]
            }
            break;
        default:
            throw new Error('Invalid action!!!')
    }

    localStorage.setItem('Venus__todoList', JSON.stringify(newState))
    return newState
}

export default reducer