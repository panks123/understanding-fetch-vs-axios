function createApi(baseURL, maxRetries = 3) {
  return async (endpoint, options = {}) => {
    let attempt = 0;
    while (attempt <= maxRetries) {
      try {
        if((options.method === "POST" || options.method === "PUT") && options.body) {
            options.body = JSON.stringify(options.body)
        }

        const apiOptions = {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                ...options.headers
            },
            ...options
        }

        const response = await fetch(`${baseURL}${endpoint}`, apiOptions);

        if (response.ok) {
          return await response.json(); // Return successful response
        }

        // Retry on 500 or 429 errors
        if (response.status === 500 || response.status === 429) {
          attempt++;
          const delay = 1000 * attempt; // Exponential backoff (1s, 2s, 3s)
          console.log(`Retrying (${attempt}/${maxRetries}) in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          throw new Error(`Request failed with status ${response.status}`);
        }
      } catch (error) {
        console.log({attempt, maxRetries})
        if (attempt >= maxRetries) {
            console.log("Max retries reached")
          throw new Error("Failed after multiple retries: " + error.message);
        }
        attempt++;
        const delay = 1000 * attempt;
        console.log(`Retrying (${attempt}/${maxRetries}) in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
    throw new Error ("Max retries reached")
  };

}
// create api instance
const api = createApi("https://jsonplaceholder.typicode.com");

export const getUsersFetchApi = () => api('/users', {
    headers: { "Authorization": `Bearer ${"token-yreryyerecnnvcnvncvncnvcnvncnvcnvc"}`}
});
export const getPostFetchApi = (postId) => api(`/posts/${postId}`)
export const createPostFetchApi = (data) => api('/posts', {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json' },
    body: data
})

export const checkRetriesFetchApi = () => api('/postsss');