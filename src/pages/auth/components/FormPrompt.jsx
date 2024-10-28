import { Link } from "react-router-dom";

export default function FormPrompt({ message, linkText, linkTo }) {
  return (
    <p className="flex gap-1 text-sm mx-auto">
      <span>{message}</span>
      <Link to={linkTo} className="underline">
        {linkText}
      </Link>
    </p>
  )
}