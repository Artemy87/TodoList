import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    callback: (newTitle:string) => void
    title:string
}

export const EditableSpan = (props:EditableSpanPropsType) => {

    const [newTitle, setNewTitle] = useState(props.title)
    const [edit, setEdit] = useState(false);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const offTurnHandler = () => {
        setEdit(false)
        props.callback(newTitle)
    }

    const onTurnHandler = () => {
        setEdit(true)
    }

    return (
        edit ? <input
                value={newTitle}
                onBlur={offTurnHandler}
                onChange={onChangeHandler}
                autoFocus />
            : <span onDoubleClick={onTurnHandler}>{props.title}</span>
    );
};