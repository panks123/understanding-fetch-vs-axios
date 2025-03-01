import axios from 'axios';
import './App.css'
import PostRequestDifference from './PostRequestDifference';
import FileUploader from './FileUploader';
import HandlingTimeoutsDifference from './HandlingTimeoutsDiffrence';
import InterceptorsInAxios from './InterceptorsInAxios/InterceptorsInAxios';
import FunctionWrappersToMimicIntecetorsWithFetch from './FunctionWrapperToMimicInterceptorWithFetch';

const getDataUrl = "https://jsonplaceholder.typicode.com/todos"
function App() {
  const onClickFetch = () => {
    const randomNumber = Math.floor(Math.random() * 10000);
    const url = `${getDataUrl}?random=${randomNumber}`;
    // const url = `${getDataUrl}xyz?random=${randomNumber}`; // introducing error
    fetch(url).then((response) => {
      console.log("Fetch axios response object::", { response})
      if(response.ok) { // We have to manually check because fetch does not throw error on error codes like 404, 503, 400 etc. We have to manually check
        // response.ok is true if the status is in the range (200 -299) , if it is outside this range then it will be false
        return response.json();
      }
      // else {
      //   return response.json(); // In this case empty object will be recieved in the  next .then
      // }
      throw new Error("Request failed with status", response.status);
    }).then(data => {
      console.log("Recieved Data::", data);
    }).catch((error => {
      console.log("Error in fetching:::", error)
    })) 
  }
  const onClickAxiosFetch = () => {
    const randomNumber = Math.floor(Math.random() * 10000);
    // const url = `${getDataUrl}?random=${randomNumber}`;
    const url = `${getDataUrl}xyz?random=${randomNumber}`; // introducing error
    // In case of axios, it automatically considers a response as successful if the HTTP status code is in the range 200-299 
    // and rejects the response if the status code is outside this range
    axios.get(url).then((response) => {
      console.log("Axios Response Object", {response})
      console.log("data recieved from axis request::", response.data)
    }).catch((error => {
      console.log("Error in fetching(axios):::", error)
    })) 
  }
  return (
    <div className="App">
      <div className='flex gap-2'>
        <button onClick={onClickFetch}>Fetch Data (fetch)</button>
        <button onClick={onClickAxiosFetch}>Fetch Data (Axios)</button>
      </div>
      <div className='m-2'>
        <PostRequestDifference />
      </div>
      <div className='m-2'>
        <FileUploader />
      </div>
      <div className="m-2">
        <HandlingTimeoutsDifference />
      </div>
      <div className="m-2">
        <InterceptorsInAxios />
      </div>
      <div className="m-2">
        <FunctionWrappersToMimicIntecetorsWithFetch />
      </div>
    </div>
  )
}

export default App
