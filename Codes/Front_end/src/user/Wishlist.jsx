import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Unavbar from './Unavbar';
import backgroundImage from '/2.jpg'; // Adjust the path to the image

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          const response = await axios.get(`http://localhost:4000/wishlist/${user.id}`);
          console.log('Fetched wishlist data:', response.data); // Log the response data
          setWishlist(response.data);
        } else {
          console.log('User not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching wishlist items: ', error);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (itemId) => {
    try {
      await axios.post(`http://localhost:4000/wishlist/remove`, { itemId });

      // Refresh the wishlist items after removal
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const response = await axios.get(`http://localhost:4000/wishlist/${user.id}`);
        setWishlist(response.data);
      } else {
        console.log('User not found in localStorage');
      }
    } catch (error) {
      console.error('Error removing item from wishlist: ', error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      <Unavbar />
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-4 text-center text-white">Wishlist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded shadow">
              <img
                src={`http://localhost:4000/${item.itemImage}`}
                alt="Item Image"
                className="rounded-t-lg"
                style={{ height: '350px', width: '100%', objectFit: 'cover' }}
              />
              <div className="p-4">
                <p className="text-xl font-bold mb-2 text-gray-800">{item.title}</p>

                {/* Removed author, genre, and price details */}

                <Button
                  style={{ backgroundColor: 'red', border: 'none', marginRight: '10px' }}
                  onClick={() => removeFromWishlist(item.itemId)}
                >
                  Remove from Wishlist
                </Button>

                <Button style={{ backgroundColor: 'rebeccapurple', border: 'none' }}>
                  <Link to={`/uitem/${item.itemId}`} style={{ color: 'white', textDecoration: 'none' }}>
                    View
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
