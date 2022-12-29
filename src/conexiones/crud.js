import back from './back';

class crud {
    async GET(resourse){

        const token = localStorage.getItem("token");
        let bearer; 
        if (token ===""){
            bearer = "";
        }else{
            bearer = `${token}`;
        }
        const data = {
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'x-auth-token': bearer
            }
        }
        const url = `${back.api.baseURL}${resourse}`
        let response = (await (await fetch(url, data)).json())
        return response

    }
    async POST(resourse, body){
        
        const token = localStorage.getItem("token");
        let bearer;
        if(token ===""){
            bearer = "";
        }else{
            bearer = `${token}`;
        }
        
        const data = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': bearer
            }
        }
        const url = `${back.api.baseURL}${resourse}`
        let response = (await (await fetch(url, data)).json())
        return response
    }
    
    async PUT(resourse, body){
        const token = localStorage.getItem("token");
        let bearer;
        if(token ===""){
            bearer = "";
        }else{
            bearer = `${token}`;
        }
        
        const data = {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': bearer
            }
        }
        const url = `${back.api.baseURL}${resourse}`
        let response = (await (await fetch(url, data)).json())
        return response 
        
    }
    async DELETE(resourse){
        const token = localStorage.getItem("token");
        let bearer; 
        if (token ===""){
            bearer = "";
        }else{
            bearer = `${token}`;
        }
        const data = {
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'x-auth-token': bearer
            }
        }
        const url = `${back.api.baseURL}${resourse}`
        let response = (await (await fetch(url, data)).json())
        return response
    }

}

export default new crud();