import React, {ChangeEvent} from 'react';

type UniversalCheckedType = {
    callback: (checked: boolean) => void
    checked: boolean
}

export const UniversalChecked = (props:UniversalCheckedType) => {

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        props.callback(e.currentTarget.checked)
    }

    return (
        <input type="checkbox" onChange={onChangeHandler} checked={props.checked}/>
    );
};

