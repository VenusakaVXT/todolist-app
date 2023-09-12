import React from 'react'
import { useReducer, useRef, useState } from 'react'
import reducer, { initState } from './reducer'
import { setTodo, addTodo, editTodo, deleteTodo } from './actions'

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
        if (editVal !== '') {
            dispatch(editTodo({ index, editVal }))
        }
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
                            display: 'flex',
                            justifyContent: 'space-between',
                            overflow: 'hidden'
                        }}
                    >
                        {editIndex === index ? (
                            <>
                                <input className='TodoList-input'
                                    defaultValue={todo}
                                    style={{
                                        width: '100%',
                                        marginRight: '10px',
                                        fontSize: '18px',
                                        border: 'none'
                                    }}
                                    onChange={(e) => setEditVal(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleEditTodo(index, editVal)
                                    }}
                                />
                                <button className='btn TodoList-saveBtn'
                                    onClick={() => handleEditTodo(index, editVal)}
                                    style={{
                                        color: '#fff',
                                        backgroundColor: '#28a745'
                                    }}
                                >
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                <span 
                                    style={{
                                        width: '140px',
                                        fontSize: '18px',
                                        lineHeight: '1.9rem',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {todo}
                                </span>
                                <div>
                                    <button className='btn TodoList-editBtn'
                                        onClick={() => setEditIndex(index)}
                                        style={{
                                            color: '#fff',
                                            backgroundColor: 'blue',
                                            marginRight: '6px'
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button className='btn TodoList-deleteBtn'
                                        onClick={() => dispatch(deleteTodo(index))}
                                        style={{
                                            color: '#fff',
                                            backgroundColor: '#a40e26'
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App