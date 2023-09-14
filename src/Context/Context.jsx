import axios from 'axios'
import {useContext, createContext, useState, useReducer, useEffect} from 'react'

const OdontoStates = createContext()


const reducer = (state, action) => {
    switch(action.type){
        case 'GET_ODONTOLOGOS':
            return {...state, odontologos: action.payload}
        case 'GET_ODONTOLOGO':
            return {...state, odontologo: action.payload}
        case 'ADD_FAV':
            return {...state, favs: [...state.favs, action.payload]}
        case 'DELETE_FAV':
            return {...state, favs: state.favs.filter(fav => fav.id !== action.payload.id)}
        case 'SWITCH_THEME':
            return  {...state, theme: state.theme === '' ? 'dark' : '' }; // Cambia el tema entre "light" y "dark"
        default:
            throw new Error()
    }
    //accion para borrar favoritos
}

const localFavs = JSON.parse(localStorage.getItem('favs'))
const initialFavState = localFavs ? localFavs : []


const initialState = {
    odontologos: [],
    odontologo: {},
    favs: initialFavState,
    theme: ''
}


const Context = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    // const [odontologos, setOdontologo] = useState([])
    // const [favs, setFavs] = useState(initialFavState)
    //const [theme, setTheme] = useState(true) --> Modo oscuro
    
    const url = 'https://jsonplaceholder.typicode.com/users'

    useEffect(() => {
        axios(url)
        .then(res => dispatch({type: 'GET_ODONTOLOGOS', payload: res.data}))
    }, [])

    useEffect(() => {
        localStorage.setItem('favs', JSON.stringify(state.favs))
    },[state.favs])


    return (
        <OdontoStates.Provider value={{state,dispatch}}>
            {children}
        </OdontoStates.Provider>
    )
}

export default Context

export const useOdontoStates = () => useContext(OdontoStates)