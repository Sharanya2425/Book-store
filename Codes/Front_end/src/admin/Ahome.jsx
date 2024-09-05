import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Anavbar from './Anavbar';
import backgroundImage from '/2.jpg'; // Adjust the path to the image

function Ahome() {
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch user data
    axios.get(`http://localhost:4000/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users: ', error);
      });

    // Fetch vendors data
    axios.get(`http://localhost:4000/sellers`)
      .then((response) => {
        setVendors(response.data);
      })
      .catch((error) => {
        console.error('Error fetching vendors: ', error);
      });

    // Fetch items data
    axios.get(`http://localhost:4000/item`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching items: ', error);
      });

    // Fetch orders data
    axios.get(`http://localhost:4000/orders`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders: ', error);
      });
  }, []);

  const colors = {
    users: '#66B3FF', // Lighter Blue
    vendors: '#00CCCC', // Lighter Cyan
    items: '#99FF99', // Lighter Green
    orders: '#FFFF99' // Lighter Yellow
  };

  // Calculate the number of users, vendors, items, and orders
  const totalUsers = users.length;
  const totalVendors = vendors.length;
  const totalItems = items.length;
  const totalOrders = orders.length;

  // Define data for the bar chart
  const data = [
    { name: 'Users', value: totalUsers, fill: colors.users },
    { name: 'Vendors', value: totalVendors, fill: colors.vendors },
    { name: 'Items', value: totalItems, fill: colors.items },
    { name: 'Orders', value: totalOrders, fill: colors.orders },
  ];

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      <Anavbar />
      <h3 className="text-center" style={{ color: "white" }}>Dashboard</h3>
      <Card body style={{ background: "white", width: "80%", marginLeft: "10%", marginTop: "20px", height: "580px" }}>
        <div className="flex justify-around items-center p-4">
          <Link to="/users" style={{ textDecoration: "none" }}>
            <div
              className="rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-gray-800 text-center"
              style={{ backgroundColor: colors.users, width: '250px', height: '100px' }}
            >
              USERS <br /> <br />{totalUsers}
            </div>
          </Link>
          <Link to="/vendors" style={{ textDecoration: "none" }}>
            <div
              className="rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-gray-800 text-center"
              style={{ backgroundColor: colors.vendors, width: '250px', height: '100px' }}
            >
              Vendors <br /> <br /> {totalVendors}
            </div>
          </Link>
          <Link to="/items" style={{ textDecoration: "none" }}>
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
        <br />
        <div className="d-flex justify-content-center">
          <BarChart width={400} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" barSize={50}>
              {data.map((entry, index) => (
                <Bar key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </div>
      </Card>
    </div>
  );
}

export default Ahome;
