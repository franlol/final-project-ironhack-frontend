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

    async getLatest() {
        const latest = await this.need.get('/need/latest');
        return latest;
    }

    async getAllbyUser(userId) {
        const needs = await this.need.get(`/need/all/${userId}`, { params: { userId } });
        return needs;
    }

    async getAll() {
        const needs = await this.need.get(`/need/all/`);
        return needs;
    }

    async getById(id) {
        const need = await this.need.get(`/need/${id}`); // get requires body with 'params  ' key
        return need;
    }

    async update(userId, need) {
        const updatedNeed = await this.need.put(`/need/${need.needId}`, { userId, need });
        return updatedNeed;
    }

    async delete(needId, userId) {
        const deleted = await this.need.delete(`/need/${needId}`, { data: { needId, userId } }); // delete requires body with 'data' key
        return deleted;
        // if OK, 204, no content
    }

}

const needService = new NeedService();

export default needService;
