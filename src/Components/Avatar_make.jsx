import React, { useState } from 'react'

const Avatar_make = () => {
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={imageUploader}
        style={{
          display: "none"
        }}
      />
      <div
        style={{
          height: "250px",
          width: "300px",
          border: "2px solid purple",
          borderRadius: "20px"
        }}
        onClick={() => imageUploader.current.click()}
      >
        <img
          ref={uploadedImage}
          style={{
            width: "300px",
            height: "250px",
            position: "absolute",
            borderRadius: "20px"
          }}
        />
        <h2 style={{
          textAlign:"center",
          marginLeft:"50px",
          marginTop:"100px",
          width : "70%"
          }}>CLICK TO UPLOAD PHOTO</h2>
      </div>
    </div>
    );
}

export default Avatar_make
