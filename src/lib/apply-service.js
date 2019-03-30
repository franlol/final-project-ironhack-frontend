import axios from 'axios';

class ApplyService {

    constructor() {
        this.apply = axios.create({
            baseURL: process.env.REACT_APP_BACKEND_URL,
            withCredentials: true // only beacause we want to share cookies with the backend server otherwise set it to false
        });
    }

    async add(needId, userId, comment) {
        const newApply = await this.apply.post('/apply/add', { needId, userId, comment });
        return newApply;
    }

    async getApplicants(needId) {
        const applicants = await this.apply.get(`/apply/${needId}/getall`);
        return applicants;
    }

    async updateStatus(applyId, status) {
        const updated = await this.apply.put(`/apply/${applyId}`, status);
        return updated;
    }

}

const applyService = new ApplyService();

export default applyService;

