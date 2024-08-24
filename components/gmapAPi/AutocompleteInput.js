import React, { useRef, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

const AutocompleteInput = ({ address_info, onChange }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyASYos801bwMY1dXG9XyUoYE2veKOYjXlM",
    libraries,
  });

  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (isLoaded && autocompleteRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteRef.current
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          onChange({
            target: {
              name: "address1",
              value: place.formatted_address,
            },
          });
        }
      });
    }
  }, [isLoaded, onChange]);

  return (
    <input
      type="text"
      ref={autocompleteRef}
      name="address1"
      value={address_info}
      onChange={onChange}
      className="px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm border rounded-md focus:border-black outline-none"
      placeholder="Address"
    />
  );
};

export default AutocompleteInput;
