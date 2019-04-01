import axios from 'axios';

class SearchService {

    constructor() {
        this.need = axios.create({
            baseURL: process.env.REACT_APP_BACKEND_URL,
            withCredentials: true // only beacause we want to share cookies with the backend server otherwise set it to false
        });
    }

    async search(keyword) {
        const response = await this.need.get('/search', { params: { search: keyword } });
        return response;
    }


}

const searchServiec = new SearchService();

export default searchServiec;