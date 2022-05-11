import React from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {UniversalChecked} from "./UniversalCheked";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    changeTodolistFilter: (todolistId: string, value: FilterValuesType) => void
}


export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(props.id, title);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const onAllClickHandler = () => props.changeTodolistFilter(props.id, "all");
    const onActiveClickHandler = () => props.changeTodolistFilter(props.id, "active");
    const onCompletedClickHandler = () => props.changeTodolistFilter(props.id, "completed");

    const onChangeHandler = (id:string, checkedValue: boolean) => {
        props.changeTaskStatus(props.id, id, checkedValue);
    }

    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <button onClick={removeTodolist}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.id, t.id)

                    const onTitleChangeHandler = (newValue: string) => {
                        props.changeTaskTitle(props.id, t.id, newValue,);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <UniversalChecked callback={(checkedValue: boolean) => onChangeHandler(t.id, checkedValue)} checked={t.isDone}/>
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                        <button onClick={onClickHandler}>x</button>
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
}


