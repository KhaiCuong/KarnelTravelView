import { createContext, useState } from "react";

export const SearchContext = createContext();

function SearchProvider({ children }) {
  const [itemSearch, setItemSearch] = useState("");
  const valueProvide = {
    itemSearch,
    setItemSearch,

    sendInfo(key, service, price) {
      setItemSearch((currItems) => {
        return  { key, service, price };
      });
    },
  };
  return <SearchContext.Provider value={valueProvide}>{children}</SearchContext.Provider>;
}

export default SearchProvider;
