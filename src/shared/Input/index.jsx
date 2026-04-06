import "./style.css";

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  ...props
}) {
  return (
    <div className="input">
      {label && <label className="input__label">{label}</label>}

      <input
        className={`input__field ${error ? "input__field--error" : ""}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />

      {error && <span className="input__error">{error}</span>}
    </div>
  );
}
