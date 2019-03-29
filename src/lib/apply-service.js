import axios from 'axios';

class ApplyService {

    constructor() {
        this.need = axios.create({
            baseURL: process.env.REACT_APP_BACKEND_URL,
            withCredentials: true // only beacause we want to share cookies with the backend server otherwise set it to false
        });
    }

    async add(needId, userId) {
        const newNeed = await this.need.post('/apply/add', { needId, userId });
        return newNeed;
    }


}

const applyService = new ApplyService();

export default applyService;
