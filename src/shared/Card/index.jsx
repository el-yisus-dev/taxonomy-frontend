import "./style.css";

export default function Card({ children, className = "" }) {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children }) {
  return <div className="card__header">{children}</div>;
}

export function CardTitle({ children }) {
  return <h3 className="card__title">{children}</h3>;
}

export function CardDescription({ children }) {
  return <p className="card__description">{children}</p>;
}

export function CardContent({ children }) {
  return <div className="card__content">{children}</div>;
}

export function CardFooter({ children }) {
  return <div className="card__footer">{children}</div>;
}
