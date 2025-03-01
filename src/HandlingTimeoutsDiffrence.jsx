import { useState } from 'react';
import axios from 'axios';
const partialURL = "https://jsonplaceholder.typicode.com/todos?_delay=5000&random="
const HandlingTimeoutsDifference = () => {
    const [fetchData, setFetchData] = useState(null);
    const [axiosData, setAxiosData] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [axiosError, setAxiosError] = useState(null);

    const fetchWithTimeout = async (url_, options, timeout = 5000) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        const randomNumber = Math.floor(Math.random() * 10000);
        const url = `${partialURL}${randomNumber}`
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        clearTimeout(id);
        return response;
    };

    const handleFetchRequest = async () => {
        try {
            const response = await fetchWithTimeout('https://jsonplaceholder.typicode.com/todos/1', {}, 2000);
            if (!response.ok) {
                throw new Error(`Fetch request failed with status ${response.status}`);
            }
            const data = await response.json();
            setFetchData(data);
            setFetchError(null);
        } catch (error) {
            setFetchError(error.message);
            setFetchData(null);
        }
    };

    const handleAxiosRequest = async () => {
        try {
            const randomNumber = Math.floor(Math.random() * 10000);
            const url = `${partialURL}${randomNumber}`
            const response = await axios.get(url, {
                timeout: 2000,
            });
            setAxiosData(response.data);
            setAxiosError(null);
        } catch (error) {
            setAxiosError(error.message);
            setAxiosData(null);
        }
    };

    return (
        <div>
            <h2>Handling Timeouts: Fetch vs Axios</h2>
            <div className='flex gap-2'>
                <div>
                    <button onClick={handleFetchRequest}>Fetch Data (fetch)</button>
                    {fetchData && <pre>{JSON.stringify(fetchData, null, 2)}</pre>}
                    {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
                </div>
                <div>
                    <button onClick={handleAxiosRequest}>Fetch Data (Axios)</button>
                    {axiosData && <pre>{JSON.stringify(axiosData, null, 2)}</pre>}
                    {axiosError && <p style={{ color: 'red' }}>{axiosError}</p>}
                </div>
            </div>
        </div>
    );
};

export default HandlingTimeoutsDifference;