import React, { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

const UploadFile = ({
  id,
  label,
  accept,
  acceptType,
  extentions,
  handleUploadClick,
  handleDrop,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [t] = useTranslation();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // const handleFileDrop = (e) => {
  //   e.preventDefault();
  //   setIsDragging(false);
  //   const files = e.dataTransfer.files;
  //   handleDrop(files);
  // };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;

    // Check if any of the dropped files are image type
    const areAnyFiles = Array.from(files).filter((file) =>
      file.type.startsWith(acceptType)
    );

    if (areAnyFiles.length > 0) {
      handleDrop(files);
    } else {
      if (acceptType === 'image/') {
        alert('Please drop only image files.');
      } else if (acceptType === 'video/') {
        alert('Please drop only video files.');
      }
    }
  };

  return (
    <div className="col-span-full">
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div
        className={`mt-2 flex justify-center rounded-lg border ${
          isDragging
            ? 'border-2 border-dashed border-green-500'
            : 'border-dashed border-gray-900/25'
        } px-6 py-10`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleFileDrop}
      >
        <div className="text-center">
          <PhotoIcon
            className="mx-auto h-12 w-12 text-gray-300"
            aria-hidden="true"
          />
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor={id}
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>{t('upload_a_file')}</span>
              <input
                accept={accept}
                id={id}
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleUploadClick}
              />
            </label>
            <p className="pl-1">{t('or_drag_and_drop')}</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">{extentions}</p>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
