import axios from 'axios';
const baseURL = "http://localhost:8080/api/users/";

export const usersSearch = async (key) => {
  
    try {
        const  response = await axios.get(`${baseURL}search?page=&pageSize=&keyword=${key}`,{
            headers:{ 'Content-Type': 'application/json',
                              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')).access_token}`
                  }});
        return await response.data;
    } catch (error) {
        console.log(error)
        return error;
    }
   
}