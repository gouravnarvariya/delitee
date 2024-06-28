import React, { useState, useRef, useEffect } from "react";
import ErrorImage from '../../utils/ErrorImage';
const Uploader = ({ imagesFiles, setImagesFiles , length = 1, title, setErrorImage, error}) => {
  const handleFileChange = (e) => {


    // for validation image
    if (title && setErrorImage) {

      setErrorImage(p => {
          const obj = { ...p }
          obj?.errors && delete obj?.errors[title]
          return obj
      })
  }


    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setImagesFiles({ file, url: event.target.result });
      };

      reader.readAsDataURL(file);
    }
  };

  const removeFiles = (url) => {
    const filteredFiles = imagesFiles.filter((item) => item.url !== url);
    setImagesFiles(filteredFiles);
  };

  return (
    <div className="fileuploder-main">
      <label htmlFor="dropzone-file" className="fileuploder-label">
        <div className="fileuploder-label-inner">
          <svg
            className=""
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="uploder-descrp">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="uploder-note">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input
          onChange={handleFileChange}
          id="dropzone-file"
          type="file"
          className="hidden"
        />
      </label>
{/* for Error */}
{error && <ErrorImage error={error} title={title} />}
            {
                length > 2 ? <div className="note-image">
                        <p><span>Note:-</span>Upload up to {length} images maximum</p>
                    </div>
                : <div className="note-image">
                <p><span>Note:-</span>Upload a maximum {length} image</p>
            </div>
            } 
      {/* images main box */}
      {imagesFiles.url ? (
        <div className="fileuplodr-list">
          <div className="filuploadr-image">
            <em style={{ backgroundImage: `url(${imagesFiles.url})` }}></em>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Uploader;
