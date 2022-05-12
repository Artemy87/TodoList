import React from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {UniversalChecked} from "./UniversalCheked";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    changeTodolistFilter: (todolistId: string, value: FilterValuesType) => void
}


export function Todolist(props: PropsType) {

    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolistId])
    const dispatch = useDispatch();

    function removeTask(todolistId: string, taskId: string,) {
        dispatch(removeTaskAC(todolistId, taskId))
    }

    function addTask(title: string) {
        dispatch(addTaskAC(props.todolistId, title))
    }

    function changeTaskStatus(taskId: string, isDone: boolean) {
        dispatch(changeTaskStatusAC(props.todolistId, taskId, isDone))
    }

    function changeTaskTitle(todolistId: string, taskId: string, newTitle: string) {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }

    const removeTodolist = () => {
        props.removeTodolist(props.todolistId);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.todolistId, title);
    }

    const onAllClickHandler = () => props.changeTodolistFilter(props.todolistId, "all");
    const onActiveClickHandler = () => props.changeTodolistFilter(props.todolistId, "active");
    const onCompletedClickHandler = () => props.changeTodolistFilter(props.todolistId, "completed");

    let allTodolistTasks = tasks;
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
    }

    return (
        <div>
            <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    tasksForTodolist.map(t => {
                        const removeTaskHandler = () => removeTask(props.todolistId, t.id)

                        const onChangeTitleHandler = (newValue: string) => {
                            changeTaskTitle(props.todolistId, t.id, newValue,);
                        }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <UniversalChecked callback={(checkedValue: boolean) => changeTaskStatus(t.id, checkedValue)}
                                              checked={t.isDone}/>
                            <EditableSpan value={t.title} onChange={onChangeTitleHandler}/>
                            <button onClick={removeTaskHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}


