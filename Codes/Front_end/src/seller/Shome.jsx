
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Snavbar from './Snavbar';
import Footer from '../Componenets/Footer';
import backgroundImage from '/2.jpg'; // Adjust the path to the image

function Shome() {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      // Fetch items data
      axios
        .get(`http://localhost:4000/getitem/${user.id}`)
        .then((response) => {
          setItems(response.data);
        })
        .catch((error) => {
          console.error('Error fetching tasks: ', error);
        });

      // Fetch orders data
      axios.get(`http://localhost:4000/getsellerorders/${user.id}`)
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.error('Error fetching orders: ', error);
        });
    } else {
      console.log('User not logged in');
    }
  }, []);

  const colors = {
    items: '#32CD32', // Green
    orders: '#FFD700' // Yellow
  };

  // Calculate the number of items and orders
  const totalItems = items.length;
  const totalOrders = orders.length;

  // Define data for the bar chart
  const barChartData = [
    { name: 'Items', value: totalItems, fill: colors.items },
    { name: 'Orders', value: totalOrders, fill: colors.orders },
  ];

  // Define data for the pie chart
  const pieChartData = [
    { name: 'Items', value: totalItems, color: colors.items },
    { name: 'Orders', value: totalOrders, color: colors.orders },
  ];

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      <Snavbar />
      <br />
      <h3 className="text-3xl font-semibold mb-4 text-center" style={{ color: 'white' }}>
        DashBoard
      </h3>
      <Card body style={{ backgroundColor: "wheat", width: "80%", marginLeft: "10%", marginTop: "20px", padding: "20px" }}>
        <div className="flex justify-around items-center p-4">
          <Link to="/myproducts" style={{ textDecoration: "none" }}>
            <div
              className="rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-gray-800 text-center"
              style={{ backgroundColor: colors.items, width: '250px', height: '100px' }}
            >
              Items <br /> <br />{totalItems}
            </div>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <div
              className="rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-gray-800 text-center"
              style={{ backgroundColor: colors.orders, width: '250px', height: '100px' }}
            >
              Total Orders <br /> <br />{totalOrders}
            </div>
          </Link>
        </div>
        <br />
        <br />
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '420px', // Slightly larger to accommodate both charts
            margin: '0 auto',
          }}
        >
          {/* Container for Bar Chart */}
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              marginBottom: '20px',
              width: '100%', // Use full width of the parent container
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <BarChart width={350} height={200} data={barChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" barSize={50}>
                {barChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </div>
          {/* Container for Pie Chart */}
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              width: '100%', // Use full width of the parent container
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <PieChart width={350} height={200}>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      </Card>
      <br />
      <Footer />
    </div>
  );
}

export default Shome;
