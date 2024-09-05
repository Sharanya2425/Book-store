import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Unavbar from './Unavbar';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function Products() {
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Fetch all items
    axios
      .get('http://localhost:4000/item')
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching items: ', error);
      });

    // Fetch wishlist items
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios
        .get(`http://localhost:4000/wishlist/${user.id}`)
        .then((response) => {
          setWishlist(response.data);
        })
        .catch((error) => {
          console.error('Error fetching wishlist items: ', error);
        });
    } else {
      console.log('User not logged in');
    }
  }, []);

  const addToWishlist = async (itemId) => {
    try {
      const selectedItem = items.find((item) => item._id === itemId);

      if (!selectedItem) {
        throw new Error('Selected item not found');
      }

      const { title, itemImage, _id: itemId2 } = selectedItem;
      const user = JSON.parse(localStorage.getItem('user'));

      if (user) {
        const { id: userId, name: userName } = user;

        await axios.post('http://localhost:4000/wishlist/add', {
          itemId: itemId2,
          title,
          itemImage,
          userId,
          userName,
        });

        const response = await axios.get(`http://localhost:4000/wishlist/${user.id}`);
        setWishlist(response.data);
      }
    } catch (error) {
      console.error('Error adding item to wishlist: ', error);
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      await axios.post('http://localhost:4000/wishlist/remove', { itemId });

      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const response = await axios.get(`http://localhost:4000/wishlist/${user.id}`);
        setWishlist(response.data);
      }
    } catch (error) {
      console.error('Error removing item from wishlist: ', error);
    }
  };

  const isItemInWishlist = (itemId) => {
    return wishlist.some((item) => item.itemId === itemId);
  };

  const handleWishlistToggle = (itemId) => {
    if (isItemInWishlist(itemId)) {
      removeFromWishlist(itemId);
    } else {
      addToWishlist(itemId);
    }
  };

  return (
    <div>
      <Unavbar />
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-4 text-center">Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded shadow relative">
              <div>
                {/* Heart icon with conditional styling */}
                <div
                  className="absolute top-2 right-2"
                  onClick={() => handleWishlistToggle(item._id)}
                  style={{ cursor: 'pointer', color: isItemInWishlist(item._id) ? 'red' : 'gray' }}
                >
                  <FontAwesomeIcon icon={faHeart} size="2x" />
                </div>

                <img
                  src={`http://localhost:4000/${item.itemImage}`}
                  alt="Item Image"
                  className="rounded-t-lg"
                  style={{ height: '350px', width: '500px' }}
                />
                <div>
                  <p className="text-xl font-bold mb-2">{item.title}</p>
                  <p className="text-gray-700 mb-2">Author: {item.author}</p>
                  <p className="text-gray-700 mb-2">Genre: {item.genre}</p>
                  <p className="text-blue-500 font-bold">Price: ${item.price}</p>

                  {/* Buy Button */}
                  <Button
                    style={{ backgroundColor: 'rebeccapurple', border: 'none', marginLeft: '10px' }}
                  >
                    <Link to={`/uitem/${item._id}`} style={{ color: 'white', textDecoration: 'none' }}>
                      View
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
