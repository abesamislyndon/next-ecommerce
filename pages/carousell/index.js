import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import banner from "../../public/image/Banner1.jpg";
import banner2 from "../../public/image/banner2.jpg";

export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="embla mt-3 mb-8" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide w-auto">
          <Image src={banner} className="w-full" alt="banner" />
        </div>
        <div className="embla__slide">
          <Image src={banner2} className="w-full" alt="banner" />
        </div>
        <div className="embla__slide">Slide 3</div>
      </div>
    </div>
  );
}
