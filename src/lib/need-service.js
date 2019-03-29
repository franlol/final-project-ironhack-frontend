import axios from 'axios';

class NeedService {

    constructor() {
        this.need = axios.create({
            baseURL: process.env.REACT_APP_BACKEND_URL,
            withCredentials: true // only beacause we want to share cookies with the backend server otherwise set it to false
        });
    }

    async add(need) {
        const newNeed = await this.need.post('/need/add', need);
        return newNeed;
    }

    async moreContentGetLatest() {
        const latest = await this.need.get('/need/latest');
        return latest;
    }

    async getById(id) {
        const need = await this.need.get(`/need/${id}`);
        return need;
    }

    async update(userId, need) {
        const updatedNeed = await this.need.post(`/need/${need.needId}`, { userId, need });
        return updatedNeed;
    }

}

const needService = new NeedService();

export default needService;
