import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { getListAccommodation, GetTouristSpots, getListTour, getListRestaurant, getListTransport } from "./Services/ApiService";
import { type } from "@testing-library/user-event/dist/type";

const ChartTour = () => {
  const [quantity, setQuantity] = useState({});

  useEffect(() => {

    const fetchTransportData = async () => {
      try {
        let arr = [];
        const acc = await getListAccommodation();
        if(acc.status === 200) {
             arr[0] = acc.data.length;
        }
        const spot = await GetTouristSpots();
        if(spot.status === 200) {
            arr[1] = spot.data.length;
        }
        const tour = await getListTour();
        if(tour.status === 200) {
            arr[2] = tour.data.length;
        }
        const res = await getListRestaurant();
        if(res.status === 200) {
            arr[3] = res.data.length;
        }
        const trans = await getListTransport();
        if(trans.status === 200) {
            arr[4] = trans.data.length;
        }


        setQuantity(arr)

      } catch (error) {
        console.log("error", error);
      }
    };
    fetchTransportData();
  }, []);
  console.log("quantity", Object.values(quantity));

  return (
    <Bar
      data={{
        labels: ["Accommodation", "Tourist Spot", "Tour", "Restaurant", "Transport"],
        datasets: [
          {
            label: "Quantity of Service",
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
            data: Object.values(quantity),
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: {
          display: true,
          text: "Predicted world population (millions) in 2050",
        },
      }}
    />
  );
};

export default ChartTour;
