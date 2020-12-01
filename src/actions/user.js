import axios from 'axios'

export const signIn = (payload) => {
    return axios.post('http://localhost:4000/sign-in', payload)
}

export const saveSymbols = (payload) => {
    return axios.post('http://localhost:4000/save-symbols', payload)
}

export const getUser = (id) => {
    return axios.get(`http://localhost:4000/user/${id}`)
}