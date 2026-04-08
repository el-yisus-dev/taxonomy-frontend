import "./style.css";

export default function FormRow({ children, columns = 1 }) {
  return (
    <div className={`form-row form-row--${columns}`}>
      {children}
    </div>
  );
}
