import React from 'react';

const FileUploadButton = ({ onFileSelect, buttonText }) => {
  return (
    <div className="relative">
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={onFileSelect}
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer bg-mainBlue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        {buttonText}
      </label>
    </div>
  );
};

export default FileUploadButton;
