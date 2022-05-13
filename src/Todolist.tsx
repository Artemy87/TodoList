import React, {useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {Task} from "./Task";

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


export const Todolist = React.memo((props: PropsType) => {

    console.log('Todolist is called')

    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolistId])
    const dispatch = useDispatch();

    const removeTask = useCallback((todolistId: string, taskId: string,) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }, [dispatch]);
    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(props.todolistId, title))
    }, [dispatch])
    const changeTaskStatus = useCallback((taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(props.todolistId, taskId, isDone))
    }, [dispatch]);
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }, [dispatch]);

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.todolistId);
    }, [props.removeTodolist, props.todolistId]);

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolistId, title);
    }, [props.changeTodolistTitle, props.todolistId]);

    const onAllClickHandler = useCallback(() => props.changeTodolistFilter(props.todolistId, "all"),
        [props.changeTodolistFilter, props.todolistId]
    );
    const onActiveClickHandler = useCallback(() => props.changeTodolistFilter(props.todolistId, "active"),
        [props.changeTodolistFilter, props.todolistId]
    );
    const onCompletedClickHandler = useCallback(() => props.changeTodolistFilter(props.todolistId, "completed"),
        [props.changeTodolistFilter, props.todolistId]
    );

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
            <h3>
                <EditableSpan value={props.title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    tasksForTodolist.map(t => {
                        return (
                            <Task key={t.id}
                                todolistId={props.todolistId}
                                task={t}
                                removeTask={removeTask}
                                changeTaskTitle={changeTaskTitle}
                                changeTaskStatus={changeTaskStatus}
                            />
                        )}
                    )
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
});

