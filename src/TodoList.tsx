import React from 'react';

type TasksPropsType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (id:number)=>void
    tasksFilter: (filterValue:string)=>void
}


export const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(el => {
                    return (
                        <li key={el.id}>
                            <button onClick={() => props.removeTask(el.id) }>X</button>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => props.tasksFilter('all')}>All</button>
                <button onClick={() => props.tasksFilter('active')}>Active</button>
                <button onClick={() => props.tasksFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}