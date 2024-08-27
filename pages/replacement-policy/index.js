import Image from "next/image";
import imageAbout from "../../public/image/owner.webp";

export default function index() {
  return (
    <>
      <div class="container mx-auto mt-3 p-20">
        <h1 className="text-center p-10 text-[30px]">Replacement Policy</h1>
        <div className="grid grid-cols-2 grid-flow-row gap-10">
          <div>
            <p>
              In order to be eligible for replacement, the purchased item shall
              be returned within 12 hours the product is delivered. For more
              details, please contact our support team.{" "}
            </p>
          </div>
          <div>
            <Image className="w-[100%] h-auto rounded-md" src={imageAbout} />
          </div>
        </div>
      </div>
    </>
  );
}
