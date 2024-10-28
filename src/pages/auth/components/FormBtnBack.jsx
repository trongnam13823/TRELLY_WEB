import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function FormBtnBack({ linkText, linkTo }) {
  return (
    <Button variant='link' asChild className='h-fit p-0 flex mx-auto'>
      <Link to={linkTo}>{linkText}</Link>
    </Button>
  )
}