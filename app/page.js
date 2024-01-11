'use client'
import React, { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';

const Home = () => {
  // Initialize state as an array to manage multiple resources
  const [resources, setResources] = useState([]);

  console.log(resources);

  return (
    <div>
      <CldUploadWidget
        options={{
          sources: ['local', 'url', 'unsplash'],
          multiple: true,
          maxFiles: 5
        }}
        signatureEndpoint="/api/sign-cloudinary-params"
        onSuccess={(result, { widget }) => {
          // Update state by appending the new resource to the existing array
          setResources((prevResources) => [...prevResources, result?.info?.url]);
          widget.close();
        }}
      >
        {({ open }) => {
          function handleOnClick() {
            // Reset the state to an empty array when opening the widget
            setResources([]);
            open();
          }
          return (
            <button
              onClick={handleOnClick}
              className="bg-green-600 px-6 py-2 text-white rounded-lg"
            >
              Upload Images
            </button>
          );
        }}
      </CldUploadWidget>

      {/* Display information about the uploaded resources */}
      {resources.length > 0 && (
        <div>
          <h2>Uploaded Resources:</h2>
          {/* Display information about each uploaded resource */}
          {resources.map((resource, index) => (
            <pre key={index}>{JSON.stringify(resource, null, 2)}</pre>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
