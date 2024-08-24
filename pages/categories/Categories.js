
import Image from "next/image";
import meat from "../../public/image/meat.png";
import chicken from "../../public/image/chicken-meat.png";
import pig from "../../public/image/pig.png";
import marinated from "../../public/image/marinated.png";

export default function Categories() {

  return (
    <>
      <div className="grid grid-cols-4">
        <div>
          <Image src={meat} className="w-20 mt-10" />
        </div>
        <div>
          <Image src={pig} className="w-20 mt-10" />
        </div>
        <div>
          <Image src={chicken} className="w-20 mt-10" />
        </div>
        <div>
          <Image src={marinated} className="w-20 mt-10" />
        </div>
      </div>
    </>
  );
}
