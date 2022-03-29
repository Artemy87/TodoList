import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
    id: string,
    title: string
    filter: FilterValuesType
}

function App() {
    //
    // let[ todolists, setTodolists ] = useState<Array<todolistsType>>([
    //     {id:v1(),title:'What to learn',filter:'all'},
    //     {id:v1(),title:'What to buy',filter:'active'},
    // ])
    //
    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    //
    // // let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const removeTodolist = (todolistID:string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
    }

    function removeTask(todolistID:string, id: string) {
        setTasks(
            {
                ...tasks,
                [todolistID]: tasks[todolistID].filter(el => el.id !== todolistID)
            } )
    }

    function addTask(todolistID:string ,title: string) {
        let task = {id: v1(), title: title, isDone: false};

        setTasks(
            {
                ...tasks,
                [todolistID]: [task, ...tasks[todolistID]]
            }
        )
    }

    function changeStatus(todolistID:string, taskId: string, isDoneValue: boolean) {
        // let task = tasks.find(el => el.id === todolistID)
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // setTasks([...tasks]);

        setTasks(
            {
                ...tasks,
                [todolistID]: tasks[todolistID].map(el => el.id ===taskId ? {...el, isDone: isDoneValue} : el)
            }
        )
    }

    function changeFilter(todoListID: string, value: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todoListID ? {...el, filter:value} : el))
    }

    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let tasksForTodolist = tasks[tl.id];
                    tl.filter === "active" && (tasksForTodolist = tasks[tl.id].filter(t => !t.isDone))
                    tl.filter === "completed" && (tasksForTodolist = tasks[tl.id].filter(t => t.isDone))

                    return (
                        <Todolist
                            key={tl.id}
                            todoListID={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
