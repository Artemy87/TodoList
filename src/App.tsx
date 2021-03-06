import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });

    // function removeTask(todolistId: string, id: string) {
    //     //достанем нужный массив по todolistId:
    //     let todolistTasks = tasks[todolistId];
    //     // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
    //     tasks[todolistId] = todolistTasks.filter(t => t.id != id);
    //     // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    //     setTasks({...tasks});
    // }

    // function addTask(todolistId: string, title: string) {
    //     let task = {id: v1(), title: title, isDone: false};
    //     //достанем нужный массив по todolistId:
    //     let todolistTasks = tasks[todolistId];
    //     // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
    //     tasks[todolistId] = [task, ...todolistTasks];
    //     // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    //     setTasks({...tasks});
    // }

    // function changeTaskStatus(todolistId: string, id: string, isDone: boolean) {
    //     //достанем нужный массив по todolistId:
    //     let todolistTasks = tasks[todolistId];
    //     // найдём нужную таску:
    //     let task = todolistTasks.find(t => t.id === id);
    //     //изменим таску, если она нашлась
    //     if (task) {
    //         task.isDone = isDone;
    //         // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    //         setTasks({...tasks});
    //     }
    // }

    // function changeTaskTitle(todolistId: string, id: string, newTitle: string) {
    //     //достанем нужный массив по todolistId:
    //     let todolistTasks = tasks[todolistId];
    //     // найдём нужную таску:
    //     let task = todolistTasks.find(t => t.id === id);
    //     //изменим таску, если она нашлась
    //     if (task) {
    //         task.title = newTitle;
    //         // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    //         setTasks({...tasks});
    //     }
    // }


    function removeTodolist(id: string) {
        // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        setTodolists(todolists.filter(tl => tl.id != id));
        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }
    function addTodolist(title: string) {
        let newTodolistId = v1();
        let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'};
        setTodolists([newTodolist, ...todolists]);
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }
    function changeTodolistFilter(todolistId: string, value: FilterValuesType) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }
    function changeTodolistTitle(id: string, title: string) {
        // найдём нужный todolist
        const todolist = todolists.find(tl => tl.id === id);
        if (todolist) {
            // если нашёлся - изменим ему заголовок
            todolist.title = title;
            setTodolists([...todolists]);
        }
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {
                todolists.map(tl => {
                    // let allTodolistTasks = tasks[tl.id];
                    // let tasksForTodolist = allTodolistTasks;

                    // if (tl.filter === "active") {
                    //     tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                    // }

                    // if (tl.filter === "completed") {
                    //     tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                    // }

                    return <Todolist key={tl.id}
                                     todolistId={tl.id}
                                     title={tl.title}
                                     // tasks={tasksForTodolist}
                                     filter={tl.filter}
                                     // removeTask={removeTask}
                                     // addTask={addTask}
                                     // changeTaskStatus={changeTaskStatus}
                                     // changeTaskTitle={changeTaskTitle}
                                     removeTodolist={removeTodolist}
                                     changeTodolistFilter={changeTodolistFilter}
                                     changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }

        </div>
    );
}

export default App;
