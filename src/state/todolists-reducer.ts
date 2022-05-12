import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: todolistReducerType):Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter(el => el.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST' : {
            return [{id: action.payload.todolistId, title: action.payload.title, filter: "all"}, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.todolistId ? {...el, title: action.payload.title} : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.filter} : el)
        }

        default: return state
    }
}

export type todolistReducerType =
    ReturnType<typeof removeTodolistAC> |
    ReturnType<typeof addTodolistAC> |
    ReturnType<typeof changeTodolistTitleAC> |
    ReturnType<typeof changeTodolistFilterAC>


export const removeTodolistAC = (todolistId:string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            todolistId: v1()
        }
    } as const
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId,
            filter
        }
    } as const
}

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId,
            title
        }
    } as const
}