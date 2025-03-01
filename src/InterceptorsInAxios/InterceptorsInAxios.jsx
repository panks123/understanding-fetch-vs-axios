import { checkRetriesApi, createPostApi, getPostApi, getTodosApi } from './http';

const InterceptorsInAxios = () => {
    const getTodos = async () => {
        try {
            const res = await getTodosApi();
            console.log("TODOS:::", res.data);
        } catch (err) {  console.error("Error:", err)}
    }
    const getPost = async () => {
        try {
            const res = await getPostApi('1');
            console.log("POST:::", res.data);
        } catch (err) {  console.error("Error:", err)}
    }

    const createPost = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const body = formData.get('body');
        try {
            const response = await createPostApi({ title, body });
            console.log("Post Created::", response.data);
            e.target.reset();
        } catch (e) {
            console.log("Error while creating post::", e)
        }
    }

    const checkRetries = async () => {
        try {
            const res = await checkRetriesApi();
            console.log("CheckRetriesApi Response:::", res.data);
        } catch (err) {  console.error("Error occured:", err)}
    }

  return (
    <div>
        <h2>Interceptors in Axios</h2>
        <div className='flex gap-2'>
            <button onClick={getTodos}>Get Todos</button>
            <button onClick={getPost}>Get Post</button>
            <button onClick={checkRetries}>Check Retries</button>
        </div>
        <form className="m-2" onSubmit={createPost}>
            <input type="text" name="title" placeholder="Enter post title..." />
            <input type="text" name="body" placeholder="Enter post body..." />
            <button type="submit">Save</button>
        </form>
    </div>
  )
}

export default InterceptorsInAxios
