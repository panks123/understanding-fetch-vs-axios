import { checkRetriesFetchApi, createPostFetchApi, getPostFetchApi, getUsersFetchApi } from "./http";

const FunctionWrappersToMimicIntecetorsWithFetch = () => {
  const getUsers = async () => {
    try {
      const res = await getUsersFetchApi();
      console.log("USERS:::", res);
    } catch (err) {
      console.error("Error:", err);
    }
  };
  const getPost = async () => {
    try {
      const res = await getPostFetchApi("1");
      console.log("POST:::", res);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const createPost = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const body = formData.get("body");
    try {
      const response = await createPostFetchApi({ title, body });
      console.log("Post Created::", response);
      e.target.reset();
    } catch (e) {
      console.log("Error while creating post::", e);
    }
  };

  const checkRetries = async () => {
    try {
      const res = await checkRetriesFetchApi();
      console.log("NEXT LINEEEEE")
      console.log("CheckRetriesApi Response:::", res);
    } catch (err) {
      console.error("Error occured:", err);
    }
  };

  return (
    <div>
      <h2>Mimic Interceptors in fetch api using function wrappers</h2>
      <div className="flex gap-2">
        <button onClick={getUsers}>Get Users</button>
        <button onClick={getPost}>Get Post</button>
        <button onClick={checkRetries}>Check Retries</button>
      </div>
      <form className="m-2" onSubmit={createPost}>
        <input type="text" name="title" placeholder="Enter post title..." />
        <input type="text" name="body" placeholder="Enter post body..." />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default FunctionWrappersToMimicIntecetorsWithFetch;
