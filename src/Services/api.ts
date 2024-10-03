import axios  from "axios";

export const api = axios.create({
    baseURL : "http://148.113.194.192:8080",
});