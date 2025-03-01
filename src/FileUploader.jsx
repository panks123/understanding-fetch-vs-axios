import { useState } from "react";
import axios from "axios";

export default function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState(null);
  
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("https://api.escuelajs.co/api/v1/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log("OnUploadProgress::::", {percent})
          setUploadProgress(percent);
        },
      });

      setFileUrl(response.data.location);
      setUploadProgress(100); // Ensure progress bar reaches 100%
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload failed", error);
      alert("File upload failed!");
    }
  };

  const handleDownload = async () => {
    if (!fileUrl) {
      alert("No file uploaded yet!");
      return;
    }

    try {
      const fileName = fileUrl.split("/").pop(); // Extract filename from URL
      const response = await axios.get(`https://api.escuelajs.co/api/v1/files/${fileName}`, {
        responseType: "blob", // Ensure response is treated as a file
        onDownloadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setDownloadProgress(percent);
        },
      });

      // Create a Blob URL and trigger file download
      const blob = new Blob([response.data]);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", selectedFile.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadProgress(100); // Ensure progress bar reaches 100%
    } catch (error) {
      console.error("Download failed", error);
      alert("File download failed!");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-bold mb-3">File Upload & Download</h2>

      <input type="file" onChange={handleFileChange} className="mb-3" />

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        disabled={!selectedFile}
      >
        Upload
      </button>
      <div>Upload progress: {uploadProgress}%</div>

      {fileUrl && (
        <div className="mt-4">
          <p className="text-sm text-green-600">File uploaded: <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="underline">{fileUrl}</a></p>

          <button
            onClick={handleDownload}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          >
            Download
          </button>
          <div>Download Progress: {downloadProgress}%</div>
        </div>
      )}
    </div>
  );
}
