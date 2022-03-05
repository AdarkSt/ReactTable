export const http_Request = async (path, method, body="") => {
    const url = "http://localhost:3000" + path
    const options = {}
    options.method = method;
    options.headers = {
        "Content-Type":"application/json"
    }
    
    if(body) {
        options.body = body
    }
    
    const response = await fetch(url, options)
    return response
}

export const http_GetRequest = async (id="") =>{
    const response = await http_Request(`/users/${id}`, "GET");
    return response;
}

export const http_PostRequest = async (body) => {
    const response = await http_Request('/users', "POST", body)
    return response
}

export const http_PutRequest = async (id, body) => {
    const response = await http_Request(`/users/${id}`, "PATCH", body);
    return response
}

export const http_DeleteRequest = async (id) => {
    const response = await http_Request(`/users/${id}`, "DELETE")
    return response
}