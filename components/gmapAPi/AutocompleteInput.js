import React, { useRef, useEffect } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];

const AutocompleteInput = ({ value, onChangeadd }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "",
    libraries,
  });

  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isLoaded && autocompleteRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteRef.current
      );
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          onChangeadd({
            target: {
              name: "address1",
              value: place.formatted_address,
            },
          });
        }
      });
    }
  }, [isLoaded, onChangeadd]);

  return (
    <input
      type="text"
      ref={(ref) => {
        autocompleteRef.current = ref;
        inputRef.current = ref;
      }}
      name="address1"
      value={value}
      onChange={(e) => onChangeadd(e)}
      className="px-4 py-3.5 bg-gray-100 text-[#333] w-full text-sm border rounded-md focus:border-black outline-none"
      placeholder="Address"
    />
  );
};

export default AutocompleteInput;
