import React from 'react';

const TextArea = ({ label, name, value, placeholder, onChange, readOnly }) => {
  return (
    <div className="my-3">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows="auto"
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
