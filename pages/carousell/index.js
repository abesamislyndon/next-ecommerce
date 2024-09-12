import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export function EmblaCarousel() {
  const [slider, setSlider] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Define error state

  useEffect(() => {
    async function fetchBanner() {
      setLoading(true);
      try {
        const res = await fetch(`/api/sliders`); // Assuming your API is relative
        if (!res.ok) {
          throw new Error(`Failed to fetch banners: ${res.statusText}`);
        }
        const sliderData = await res.json();
        setSlider(sliderData || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBanner();
  }, []);

  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  if (loading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error}</span>;
  }

  if (!slider.data || slider.data.length === 0) {
    return <span>No slider available.</span>;
  }

  return (
    <div className="embla mt-3 mb-0" ref={emblaRef}>
      <div className="embla__container">
        {slider.data.map((sliderBanner) => (
          <div className="embla__slide" key={sliderBanner.id}>
            <img
              src={sliderBanner.image_url_cache}
              className="w-full embla__slide"
              alt={sliderBanner.title || "Slider image"}
              width="120"
              height="auto"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}


export default EmblaCarousel;