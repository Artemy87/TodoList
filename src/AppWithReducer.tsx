import React, {useReducer} from 'react';
import './App.css';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {tasksReducer} from "./state/tasks-reducer";
import {Todolist} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed";

function AppWithReducer() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])
    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });

    // function removeTask(todolistId: string, taskId: string, ) {
    //     dispatchToTasksReducer(removeTaskAC(todolistId, taskId))
    // }

    // function addTask(todolistId: string, title: string) {
    //     dispatchToTasksReducer(addTaskAC(todolistId, title))
    // }

    // function changeTaskStatus(todolistId: string, taskId: string, isDone: boolean) {
    //     dispatchToTasksReducer(changeTaskStatusAC(todolistId, taskId, isDone ))
    // }

    // function changeTaskTitle(todolistId: string, taskId: string, newTitle: string) {
    //     dispatchToTasksReducer(changeTaskTitleAC(todolistId, taskId, newTitle))
    // }

    function removeTodolist(todolistId: string) {
        const action = removeTodolistAC(todolistId)
        dispatchToTasksReducer(action)
        dispatchToTodolistsReducer(action)
    }
    function addTodolist(title: string) {
        const action = addTodolistAC(title) // обязательно создать один экшн для обоих dispatch
        dispatchToTasksReducer(action)
        dispatchToTodolistsReducer(action)
    }
    function changeTodolistFilter(todolistId: string, value: FilterValuesType) {
        dispatchToTodolistsReducer(changeTodolistFilterAC(todolistId, value))
    }
    function changeTodolistTitle(todolistId: string, title: string) {
        dispatchToTodolistsReducer(changeTodolistTitleAC(todolistId, title))
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {
                todolists.map(tl => {
                    // let allTodolistTasks = tasks[tl.id];
                    // let tasksForTodolist = allTodolistTasks;

                    // if (tl.filter === "active") {
                    //     tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                    // }

                    // if (tl.filter === "completed") {
                    //     tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
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

export default AppWithReducer;