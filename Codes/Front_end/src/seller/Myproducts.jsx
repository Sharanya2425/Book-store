import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Snavbar from './Snavbar';
import { FaTrash } from "react-icons/fa";
import backgroundImage from '/2.jpg'; // Adjust the path to the image

function Myproducts() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios
        .get(`http://localhost:4000/getitem/${user.id}`)
        .then((response) => {
          console.log('Response data:', response.data); // Log the response data
          const taskData = response.data;
          setItems(taskData);
        })
        .catch((error) => {
          console.error('Error fetching tasks: ', error);
        });
    } else {
      console.log('ERROR');
    }
  }, []);

  const deleteItem = async (Id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/itemdelete/${Id}`);
      
      // Check if the response status indicates success
      if (response.status === 200) {
        // Remove the deleted item from the state
        setItems(items.filter(item => item._id !== Id));
        alert('Item has been deleted successfully.');
      } else {
        console.error('Failed to delete the item.');
        alert('Failed to delete the item. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('An error occurred while trying to delete the item. Please try again.');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`, // Apply the background image
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      <Snavbar />
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-4 text-center text-white">Books List</h2> {/* Make the heading white */}
      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded shadow">
              <div style={{ display: "flex", justifyContent: "flex-end", color: "red" }}>
                <button onClick={() => deleteItem(item._id)} style={{ border: 'none', color: 'red', background: 'none' }}>
                  <FaTrash />
                </button>
              </div>
              <img
                src={`http://localhost:4000/${item.itemImage}`}
                alt="Item Image"
                className="rounded-t-lg"
                style={{ height: "350px", width: "500px" }}
              />
              <div>
                <p className="text-xl font-bold mb-2">{item.title}</p>
                <p className="text-gray-700 mb-2">Author: {item.author}</p>
                <p className="text-gray-700 mb-2">Genre: {item.genre}</p>
                <p className="text-blue-500 font-bold">Price: ₹{item.price}</p> {/* Changed $ to ₹ */}
                <p className="text-gray-600"><strong>Description:</strong> {item.description.slice(0, 259)} ...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Myproducts;
