import { http_GetRequest, http_PostRequest } from "../Utils/AppBasedUtils/http_Request";

export const createUser = async(user) => {
    const body = JSON.stringify(user)
    const response = await http_PostRequest(body)
    return response
}

export const getUsers = async() => {
    const response = await http_GetRequest()
    return response
}

export const getUser = async(id) => {
    const response = await http_GetRequest(`/user/${id}`)
    return response
}

export const updateUser = async(user, id) => {

}

export const deleteUser = async(id) =>{

}