import axios from "axios";

const MAX_RETRIES = 3;

const api = axios.create({ baseURL: "https://jsonplaceholder.typicode.com", headers: {
    "Content-Type": 'application/json',
    "Accept": 'application/json'
} });

// Request Interceptor
api.interceptors.request.use(
    (config) => { // config is the request config
        console.log("Request sent at: ", new Date().toISOString(), "Request config::", config); // We can use it as logger for debugging
        const token = "wewdwe29239djsdse73eehwehwhe";
        config.headers.Authorization = `Bearer ${token}`; // Modifing the request headers - adding Authorization header

        return config; // Return the modified request so request  proceed with changes
    },
    (error) => {
        return Promise.reject(error); // If an error occurs while modifying the request then the error so that it is properly propagated
    }
)

// Response interceptor
api.interceptors.response.use(
    (response)=> {
        // here if we want to modify the reponse before sending it it to the caller code, we can do it here
        return response; // return seuccessful response
    },
    async (error)=> {
        const { config } = error; // get original request config
        if(!config) { 
            return Promise.reject(error)
        }

        if(!config.retryCount) config.retryCount = 0;

        // if((error.response?.status === 500 || error.response?.status ===429) && config.retryCount < MAX_RETRIES) {
        if(config.retryCount < MAX_RETRIES) {
            config.retryCount += 1;
            console.log(`Retrying request... Attempt ${config.retryCount}`);

            // Wait before retrying (exponential backoff)
            await new Promise(resolve => {
                setTimeout(resolve, config.retryCount * 1000);
            })

            return api(config); // retry request
        }

        return Promise.reject(error); // Reject if max retries exceeded
    }
)

export const getTodosApi = () => {
    return api.get('/users');
}

export const createPostApi = (data) => {
    return api.post('/posts', data)
}

export const getPostApi = (postId) => {
    return api.get(`/posts/${postId}`);
}

export const checkRetriesApi = () => {
    // return api.get('/posts'); // No error
    return api.get('/postss'); // Will retry
}