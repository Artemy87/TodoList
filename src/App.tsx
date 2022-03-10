import React, {useState} from 'react';
import './App.css'
import { TodoList } from './TodoList';
import {TasksPropsType} from "./TodoList";


export type FilterType = 'all' | 'active' | 'completed';

function App() {
    const [tasks, setTasks] = useState<TasksPropsType[]>([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ])
    const [filter, setFilter] = useState<FilterType>('all')

    const changeFilter = (value:FilterType) => {
        setFilter(value)
    }

    const removeTask = (newId:number) => {
        setTasks(tasks.filter(t => t.id !== newId))
    }

    let filteredTasks = tasks;
    if(filter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if(filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    }

    return (
        <div className="App">
            <TodoList title='123'
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
