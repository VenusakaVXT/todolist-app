import React from 'react'
import { useReducer, useRef, useState } from 'react'

// =================DECLARATION FOR EXTERNAL REFERENCE=================
// Init state
const initState = JSON.parse(localStorage.getItem('Venus__todoList')) ?? {
    todo: '',
    todos: []
}

// Actions
const SET_TODO = 'set_todo'
const ADD_TODO = 'add_todo'
const EDIT_TODO = 'edit_todo'
const DELETE_TODO = 'delete_todo'

const setTodo = payload => {
    return {
        type: SET_TODO,
        payload
    }
}

const addTodo = payload => {
    return {
        type: ADD_TODO,
        payload
    }
}

const editTodo = payload => {
    return {
        type: EDIT_TODO,
        payload
    }
}

const deleteTodo = payload => {
    return {
        type: DELETE_TODO,
        payload
    }
}

// Reducer
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
                todos: [...newtodos]
            }
            break;
        default:
            throw new Error('Invalid action!!!')
    }

    localStorage.setItem('Venus__todoList', JSON.stringify(newState))
    return newState
}

// =====================FUNCTION COMPONENT=====================
function App() {
    const [state, dispatch] = useReducer(reducer, initState)
    const [editVal, setEditVal] = useState('')
    const [editIndex, setEditIndex] = useState(null)

    const inputRef = useRef()
    const { todo, todos } = state

    // Dispatch
    const handleAddTodo = () => {
        dispatch(addTodo(todo))
        dispatch(setTodo(''))
        inputRef.current.focus()
    }

    const handleEditTodo = (index, editVal) => {
        dispatch(editTodo({ index, editVal }))
        setEditIndex(null)
        setEditVal('')
    }

    return (
        <div className='TodoList'
            style={{
                width: '300px',
                margin: '50px auto',
                backgroundColor: '#fff',
                borderRadius: '6px',
                boxShadow: '0 0 6px rgba(0, 0, 0, 0.6)'
            }}
        >
            {/* Use form tags to wrap inputs and buttons to listen for submit events */}
            <form className='TodoList-header'
                style={{
                    padding: '8px 12px',
                    borderBottom: '1px solid #ccc',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <input className='TodoList-input'
                    placeholder='Enter your todo'
                    style={{
                        width: '100%',
                        fontSize: '18px',
                        border: 'none',
                        outline: 'none',
                        marginRight: '10px'
                    }}
                    ref={inputRef}
                    value={todo}
                    onChange={(e) => dispatch(setTodo(e.target.value))}
                    onSubmit={handleAddTodo}
                    autoComplete='off'
                />

                <button
                    className='btn TodoList-addBtn'
                    style={{
                        backgroundColor: '#1f2328',
                        color: '#fff'
                    }}
                    onClick={(e) => {
                        e.preventDefault()
                        handleAddTodo()
                    }}
                >
                    Add
                </button>
            </form>

            <ul className='TodoList-container' 
                style={{
                    paddingLeft: '0',
                    listStyle: 'none',
                    margin: '0'
                }}>
                {todos.map((todo, index) => (
                    <li key={index} className='TodoList-item'
                        style={{
                            padding: '8px 12px',
                            overflow: 'hidden'
                        }}
                    >
                        <>
                            <input className='TodoList-input'
                                defaultValue={todo}
                                style={{
                                    width: '100%',
                                    fontSize: '18px',
                                    border: 'none',
                                    outline: 'none',
                                    marginRight: '10px'
                                }}
                            />
                        </>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App