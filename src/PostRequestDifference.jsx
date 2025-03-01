import axios from "axios";

const url = "https://jsonplaceholder.typicode.com/posts";
const PostRequestDifference = () => {
  const handleFetchSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const body = formData.get("body");
    const payload = { title, body }; // post title and post body
    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload), // In case of feth - we have to manually convert the body to json string
      headers: {
        // Headers need to be manually set using headers option.
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to create post", response.status);
      })
      .then((data) => {
        console.log("Recieved Data:", data);
      })
      .catch((err) => {
        console.log("Error occured:::", err);
      });
  };

  const handleAxiosSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const body = formData.get("body");
    const payload = { title, body };
    axios
      .post(url, payload, {
        headers: {
          // manually setting headers
          "Content-Type": "application/json",
          token: "shchdfhdhfdhfhdfhdhdh",
        },
      })
      .then((response) => {
        console.log("Data recieved in response:::", response.data);
      })
      .catch((err) => {
        console.log("Error occured:::", err);
      });
  };
  return (
    <div className="flex gap-2">
      <form onSubmit={handleFetchSubmit}>
        <h2>Using Fetch</h2>
        <input type="text" name="title" placeholder="Enter post title..." />
        <input type="text" name="body" placeholder="Enter post body..." />
        <button type="submit">Save</button>
      </form>
      <form onSubmit={handleAxiosSubmit}>
        <h2>Using Axios</h2>
        <input type="text" name="title" placeholder="Enter post title..." />
        <input type="text" name="body" placeholder="Enter post body..." />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default PostRequestDifference;
