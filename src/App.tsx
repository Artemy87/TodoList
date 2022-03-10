import React, {useState} from 'react';
import './App.css'
import { TodoList } from './TodoList';



function App() {
    // const tasks2 = [
    //     { id: 1, title: "Hello world", isDone: true },
    //     { id: 2, title: "I am Happy", isDone: false },
    //     { id: 3, title: "Yo", isDone: false }
    // ]

    const [tasks1, setTasks1] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ])

    const removeTask = (newId:number) => {
        setTasks1(tasks1.filter(el => el.id !== newId))
    }

    const [valueButton, setValueButton] = useState('all')

    const tasksFilter = (filterValue:string) => {
        setValueButton(filterValue)
    }

    let prokladka = tasks1;

    if(valueButton === 'active') {
        prokladka = tasks1.filter(el => !el.isDone)
    }

    if(valueButton === 'completed') {
        prokladka = tasks1.filter(el => el.isDone)
    }

    return (
        <div className="App">
            <TodoList title='123'
                      tasks={prokladka}
                      removeTask={removeTask}
                      tasksFilter={tasksFilter}

            />
        </div>
    );
}

export default App;
