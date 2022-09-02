import axios from "axios";

export default axios.create({
    baseURL: "http://192.168.0.13:8000/",
});
