import { useRef } from "react";
import "./style.css";

export default function OTPInput({ length = 6, value = "", onChange }) {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/, ""); // solo números

    if (!val) return;

    const newValue =
      value.substring(0, index) +
      val +
      value.substring(index + 1);

    onChange(newValue);

    // mover al siguiente input
    if (index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!value[index] && index > 0) {
        inputsRef.current[index - 1].focus();
      }

      const newValue =
        value.substring(0, index) +
        "" +
        value.substring(index + 1);

      onChange(newValue);
    }
  };

  return (
    <div className="otp">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          className="otp__input"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
        />
      ))}
    </div>
  );
}