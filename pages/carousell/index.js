import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import banner from "../../public/image/Banner1.jpg";
import banner2 from "../../public/image/banner2.jpg";
import banner3 from "../../public/image/banner3.jpg";
import Autoplay from "embla-carousel-autoplay";

export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  return (
    <div className="embla mt-3 mb-8" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide w-auto">
          <Image src={banner} className="w-full embla__slide" alt="banner" />
        </div>
        <div className="embla__slide">
          <Image src={banner2} className="w-full embla__slide" alt="banner" />
        </div>
        <div className="embla__slide">
          <Image src={banner3} className="w-full embla__slide" alt="banner" />
        </div>
      </div>
    </div>
  );
}
