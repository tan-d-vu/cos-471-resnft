const inputStyle =
  "mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-slate-300 focus:ring focus:ring-slate-200 focus:ring-opacity-50";

const InputWrapper = ({ label, element }) => {
  return (
    <label className="block my-3">
      <span className="text-gray-700">{label}</span>
      {element}
    </label>
  );
};

export const Input = ({
  name,
  label,
  elementType,
  type,
  placeholder,
  value,
  onChange,
}) => {
  const element =
    elementType === "input" ? (
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        className={inputStyle}
        onChange={onChange}
      />
    ) : (
      <textarea
        className={inputStyle}
        name={name}
        rows="4"
        defaultValue={value}
        onChange={onChange}
      />
    );

  return <InputWrapper label={label} element={element} />;
};

export const Select = ({ label, name, value, onChange, options }) => {
  const element = (
    <select
      name={name}
      defaultValue={value}
      onChange={onChange}
      className={inputStyle}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
      ;
    </select>
  );

  return <InputWrapper label={label} element={element} />;
};

export const InputDatetime = ({ type, id, label, min, value, onChange }) => {
  const element = (
    <input
      type={type}
      id={id}
      min={min}
      value={value}
      onChange={onChange}
      className={inputStyle}
    />
  );

  return <InputWrapper label={label} element={element} />;
};
