import axios from 'axios';

class ApplyService {

    constructor() {
        this.user = axios.create({
            baseURL: process.env.REACT_APP_BACKEND_URL,
            withCredentials: true // only beacause we want to share cookies with the backend server otherwise set it to false
        });
    }

    async get(userId) {
        const user = await this.user.get(`/user/${userId}`);
        return user;
    }

}

const applyService = new ApplyService();

export default applyService;
