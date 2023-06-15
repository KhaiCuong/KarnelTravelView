import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { getListAccommodation, GetTouristSpots, getListTour, getListRestaurant, getListTransport, getListBooking } from "./Services/ApiService";
import { type } from "@testing-library/user-event/dist/type";

const ChartBook = () => {
  const [quantity, setQuantity] = useState({});
  const [bookList, setBookList] = useState({});

  useEffect(() => {
    const fetchTransportData = async () => {
      try {
        let arr = [];
        const book = await getListBooking();
        if (book.status === 200) {
          setQuantity(book.data.length);
          let arr = [0,0,0,0,0];
          for (let index = 0; index < book.data.length; index++) {
            if (book.data[index].accommodation_id != null) {
            
              arr[0] = arr[0] + 1 ;
              
            }
            if (book.data[index].restaurant_id != null) {
              arr[1] = arr[1] + 1 ;

            }
            if (book.data[index].transport_id != null) {
              arr[2] = arr[2] + 1 ;

            }
            if (book.data[index].touristSpot_id != null) {
              arr[3] = arr[3] + 1 ;

            }
            if (book.data[index].tour_id != null) {
              arr[4] = arr[4] + 1 ;

            }

          }
          setBookList(arr);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchTransportData();
  }, []);
  console.log("quantity", Object.values(bookList));

  return (
    <Pie
      data={{
        labels: ["Accommodation", "Tourist Spot", "Tour", "Restaurant", "Transport"],
        datasets: [
          {
            label: "Population (Product)",
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
            data: [2478, 5267, 734, 784, 433],
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

export default ChartBook;
