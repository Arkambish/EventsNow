// // components/UploadForm.js

// import React, { useState } from "react";

// const UploadForm = () => {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         console.log("File uploaded successfully");
//       } else {
//         console.error("Failed to upload file");
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Import</button>
//     </div>
//   );
// };

// export default UploadForm;
