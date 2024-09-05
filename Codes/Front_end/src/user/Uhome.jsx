import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Unavbar from './Unavbar';
import './uhome.css'; // Ensure this path is correct for your CSS file
import { Card, Carousel, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Componenets/Footer'; // Adjust path as needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from '/2.jpg';

const carouselImages = [
  'th (4).jpeg',
  '3.jpg', // Ensure these images are correctly placed
  'wp2297934.jpg',
  '5.jpg',
];

const Uhome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

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

  const handleBuyClick = (itemId) => {
    navigate(`/orderitem/${itemId}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBooks = items.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Unavbar />
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for books..."
          className="search-bar"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <Carousel interval={2000} pause={false} className="carousel">
        {carouselImages.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={image}
              alt={`Slide ${index}`}
              style={{ height: '400px', objectFit: 'cover' }}
            />
          </Carousel.Item>
        ))}
      </Carousel>

     

      <div className="main-content">
        <div className="sidebar">
          <h3>Categories</h3>
          <ul>
            <li><Link to="/non-fiction">Non fiction</Link></li>
            <li><Link to="/children">Children's & Young Adult</Link></li>
            <li><Link to="/literature">Fiction</Link></li>
            <li><Link to="/comics">Comics & Graphic Novels</Link></li>
            <li><Link to="/entrance-exam">Entrance Exam</Link></li>
            <li><Link to="/history">History & Politics</Link></li>
          </ul>
        </div>

        <div className="content">
          <h1 className="text-center" style={{ fontSize: '50px' }}>Books</h1>
          <div className="card-container">
            {filteredBooks.map((book, index) => (
              <Card key={index} style={{ margin: '20px', position: 'relative' }}>
                <div className="wishlist-heart" onClick={() => handleWishlistToggle(book._id)}>
                  <FontAwesomeIcon
                    icon={faHeart}
                    size="2x"
                    style={{
                      color: isItemInWishlist(book._id) ? 'red' : 'gray',
                      cursor: 'pointer',
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                    }}
                  />
                </div>
                <Card.Img variant="top" src={`http://localhost:4000/${book.itemImage}`} />
                <Card.Body>
                  <Card.Title className="text-center">{book.title}</Card.Title>
                  <p className="text-center text-gray-700">Price: ${book.price}</p>
                  <p className="text-center text-gray-700">Genre: {book.genre}</p>
                  <Button
                    style={{ backgroundColor: 'green', border: 'none', width: '100%', marginTop: '10px' }}
                    onClick={() => handleBuyClick(book._id)}
                  >
                    Buy
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
};

export default Uhome;
