const Input = ({
  label,
  value,
  placeholder,
  type,
  name,
  onChange,
  readOnly,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ${
            !readOnly ? 'ring-1' : 'ring-0'
          } ring-inset ring-gray-300 placeholder:text-gray-400 ${
            !readOnly ? 'focus:ring-2' : 'focus:ring-0'
          } focus:ring-inset ${
            !readOnly && 'focus:ring-indigo-600'
          } sm:text-sm sm:leading-6`}
          placeholder={placeholder}
          onChange={onChange}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export default Input;
