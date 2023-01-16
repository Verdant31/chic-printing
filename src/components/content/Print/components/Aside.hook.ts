import { useState } from "react";

export const useAside = () => {
  const [filterName, setFilterName] = useState("");

  return {
    setFilterName,
    filterName,
  };
};
