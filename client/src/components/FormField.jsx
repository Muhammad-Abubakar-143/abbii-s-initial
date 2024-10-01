import PropTypes from "prop-types";
const FormField = ({
  labelName,
  name,
  type,
  placeholder,
  handleChange,
  value,
  handleSurpriseMe,
  isSupriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          className="text-sm block font-medium text-gray-900"
          htmlFor={name}
        >
          {labelName}
        </label>
        {isSupriseMe && (
          <button
            onClick={handleSurpriseMe}
            type="button"
            className="font-semibold text-xs px-2 py-1 bg-[#ececf1] text-black rounded-[5px]"
          >
            Suprise Me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={handleChange}
        required
        className="bg-gray-50 border rounded-md border-gray-300 text-gray-900 text-sm focus:ring-[#4649ff] focus:border-[#4649ff] outline-none p-3 w-full block"
      />
    </div>
  );
};

FormField.propTypes = {
  labelName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSurpriseMe: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  isSupriseMe: PropTypes.array.isRequired,
};

export default FormField;
