import React, { Component } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

class Dashboard extends Component {
  state = {
    Restaurant: [],
    Accomodation: [],
    labels: []
  }

  componentDidMount() {
    this.getChartData();
  }

  getChartData = () => {
    axios.get('http://localhost:5158/${restaurant}')
      .then(res => {
        const data = res.data;

        // Lấy dữ liệu restaurant và accomodation
        const Restaurant = data.map(item => item.restauran_id);
        const Accomodation = data.map(item => item.accomdation_id);

        // Lấy các label từ dữ liệu đầu tiên
        const labels = Object.keys(data[0]).filter(key => key !== 'restaurant' && key !== 'accommodation');

        this.setState({
          Restaurant,
          Accomodation,
          labels
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { Restaurant, Accomodation, labels } = this.state;

    const chartData = {
      labels,
      datasets: [
        {
          label: 'Sales',
          data: Restaurant,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderWidth: 4
        },
        {
          label: 'Expenses',
          data: Accomodation,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderWidth: 4
        }
      ]
    };

    return (
      <div>
        <Line
          data={chartData}
          options={{
            title: {
              display: true,
              text: "Sales and Expenses Data",
              fontSize: 25
            },
            legend: {
              display: true,
              position: "right"
            }
          }}
        />
      </div>
    )
  }
}

export default Dashboard;
