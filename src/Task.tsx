import React, {useCallback} from "react";
import {UniversalChecked} from "./UniversalCheked";
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    todolistId: string
    task: TaskType
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, newValue: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const removeTaskHandler = () => props.removeTask(props.todolistId, props.task.id)

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, newValue);
    }, [props.changeTaskTitle, props.todolistId, props.task.id] );

    return (
        <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <UniversalChecked callback={(checkedValue: boolean) => props.changeTaskStatus(props.task.id, checkedValue)}
                              checked={props.task.isDone}/>
            <EditableSpan value={props.task.title} onChange={onChangeTitleHandler}/>
            <button onClick={removeTaskHandler}>x</button>
        </li>
    )
});