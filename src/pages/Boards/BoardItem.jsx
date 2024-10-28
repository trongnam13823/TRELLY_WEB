import ImageLoader from "@/components/ImageLoader";
import { Link } from "react-router-dom";
import ButtonPin from "./ButtonPin";

export default function BoardItem({ _id, title, background }) {
  return (
    <Link to={`/boards/${_id}`}>
      <div className="aspect-video rounded-md relative cursor-pointer group overflow-hidden hover:scale-105 transition-transform border-b hover:shadow-md hover:shadow-primary/10">
        <ImageLoader src={background} classNameContainer="size-full" />
        <div className="absolute inset-0 p-2 text-white bg-black/40 group-hover:bg-black/60 transition-colors">
          <h3 className="font-bold group-hover:underline line-clamp-2">{title}</h3>
          <ButtonPin _id={_id} />
        </div>
      </div>
    </Link>
  );
}
