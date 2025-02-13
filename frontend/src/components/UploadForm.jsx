import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "../api/imageApi";

export default function UploadForm() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;

      setError(null);
      const file = acceptedFiles[0];
      const response = await uploadImage(file);

      if (response?.processed_image_url) {
        navigate(
          `/result?image=${encodeURIComponent(response.processed_image_url)}`
        );
      } else {
        setError("Image upload failed. Please try again.");
      }
    },
  });

  return (
    <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer w-96">
      <div {...getRootProps()} className="p-6 w-full text-center">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the image here...</p>
        ) : (
          <p className="text-gray-600">
            Drag & drop an image here, or click to select one
          </p>
        )}
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
