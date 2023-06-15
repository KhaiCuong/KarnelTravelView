import { createContext, useState } from "react";

export const TransportContext = createContext();

function TransportProvider({ children }) {
  const [itemTransport, setItemTransport] = useState("");
  const valueProvide = {
    itemTransport,
    setItemTransport
  }
  return  <TransportContext.Provider value={valueProvide}>
  {children}
</TransportContext.Provider>
   
  
}

export default TransportProvider;
