import "./style.css";

export default function FormRow({ children, columns = 1 }) {
  return (
    <div
      className="form-row"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {children}
    </div>
  );
}
