import { createContext, useContext, useState } from "react";

const SearchContext = createContext();
export function useSearch() {
  return useContext(SearchContext);
}

function SearchProvider({ children }) {
  const [itemSearch, setItemSearch] = useState("");
  const valueProvide = {
    itemSearch,
    setItemSearch,

    sendInfo(key, service, price) {
      setItemSearch(() => {
        return { key, service, price };
      });
    },
  };
  return <SearchContext.Provider value={valueProvide}>{children}</SearchContext.Provider>;
}

export default SearchProvider;
