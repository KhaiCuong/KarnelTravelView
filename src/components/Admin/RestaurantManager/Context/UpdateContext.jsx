import { createContext, useState } from "react";

export const UpdateContext = createContext();

function UpdateProvider({ children }) {
  const [restaurantID, setRestaurantID] = useState("");
  const valueProvider = {
    restaurantID,
    setRestaurantID,
  };

  return (
    <UpdateContext.Provider value={valueProvider}>
      {children}
    </UpdateContext.Provider>
  );
}

export default UpdateProvider;
