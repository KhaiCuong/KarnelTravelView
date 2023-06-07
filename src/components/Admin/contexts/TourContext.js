import { createContext, useState } from "react";

export const TourContext = createContext();

function TourProvider({children}) {

    const [itemTour, setItemTour] = useState("");
    const valueProvide = {
        itemTour,
        setItemTour

    }
    return <TourContext.Provider value={valueProvide}>
        {children}
    </TourContext.Provider>

}

export default TourProvider;