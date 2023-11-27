import React, { useEffect, useState } from 'react';

const TextArea = ({ label, name, value, placeholder, onChange, readOnly }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    // Attach the event listener on component mount
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const numberOfRows = () => {
    if (screenWidth > 924) {
      return parseInt(value.length / 100) + 1;
    } else if (screenWidth > 767) {
      return parseInt(value.length / 75) + 1;
    } else if (screenWidth > 640) {
      return parseInt(value.length / 60) + 1;
    } else if (screenWidth > 590) {
      return parseInt(value.length / 55) + 1;
    } else if (screenWidth > 574) {
      return parseInt(value.length / 52) + 1;
    } else if (screenWidth > 500) {
      return parseInt(value.length / 45) + 1;
    } else if (screenWidth > 484) {
      return parseInt(value.length / 40) + 1;
    } else if (screenWidth > 468) {
      return parseInt(value.length / 38) + 1;
    } else if (screenWidth > 395) {
      return parseInt(value.length / 30) + 1;
    } else if (screenWidth > 370) {
      return parseInt(value.length / 28) + 1;
    } else {
      return parseInt(value.length / 25) + 1;
    }
  };

  return (
    <div className="my-3">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        {screenWidth}
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={numberOfRows()}
          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ${
            !readOnly ? 'ring-1' : 'ring-1'
          } ring-inset ring-gray-300 placeholder:text-gray-400 ${
            !readOnly ? 'focus:ring-2' : 'focus:ring-1'
          } focus:ring-inset ${
            !readOnly ? 'focus:ring-indigo-600' : 'focus:ring-gray-300'
          } sm:text-sm sm:leading-6`}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export default TextArea;
