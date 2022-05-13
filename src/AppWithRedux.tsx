import React, {useCallback} from 'react';
import './App.css';
import {AddItemForm} from './AddItemForm';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {Todolist} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistType} from "./App";

export type FilterValuesType = "all" | "active" | "completed";

function AppWithRedux() {

    console.log('App is called')

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title) // обязательно создать один экшн для обоих dispatch
        dispatch(action)
    }, [dispatch]);
    const changeTodolistFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch] );
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }, [dispatch]);

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    return <Todolist key={tl.id}
                                     todolistId={tl.id}
                                     title={tl.title}
                                     filter={tl.filter}
                                     removeTodolist={removeTodolist}
                                     changeTodolistFilter={changeTodolistFilter}
                                     changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }

        </div>
    );
}

export default AppWithRedux;

