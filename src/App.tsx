import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function removeTask(todolistID: string, id: string) {
        setTasks(
            {
                ...tasks,
                [todolistID]: tasks[todolistID].filter(tl => tl.id !== id)
            }
        )
    }

    function addTask(todolistID: string, title: string) {
        let newTask = {id: v1(), title, isDone: false};
        setTasks(
            {
                ...tasks,
                [todolistID]: [newTask, ...tasks[todolistID]]
            }
        )
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks(
            {
                ...tasks,
                [todolistID]: tasks[todolistID].map(tl => tl.id === taskId ? {...tl, isDone} : tl)
            }
        )
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(
            todolists.map(tl => tl.id === todolistID ? {...tl, filter: value} : tl)
        )
    }

    return (
        <div className="App">

            {todolists.map(tl => {
                let tasksForTodolist = tasks[tl.id];
                tl.filter === "active" && (tasksForTodolist = tasks[tl.id].filter(t => !t.isDone))
                tl.filter === "completed" && (tasksForTodolist = tasks[tl.id].filter(t => t.isDone))

                return <Todolist key={tl.id}
                                 todolistID={tl.id}
                                 title={tl.title}
                                 tasks={tasksForTodolist}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeTaskStatus={changeStatus}
                                 filter={tl.filter}
                />
            })}
        </div>
    );
}

export default App;
