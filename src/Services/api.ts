import axios  from "axios";

export const api = axios.create({
    baseURL : "https://148.113.194.192:8080/",
});