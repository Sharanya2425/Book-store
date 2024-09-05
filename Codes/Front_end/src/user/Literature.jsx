import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Footer from '../Componenets/Footer'; // Adjust path as needed
import './uhome.css'; // Ensure this path is correct

const Fiction = () => {
    const [books, setBooks] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all books and filter by genre
        axios.get('http://localhost:4000/item')
            .then((response) => {
                const allBooks = response.data;
                const fictionBooks = allBooks.filter(book => book.genre.toLowerCase() === 'fiction');
                setBooks(fictionBooks);
            })
            .catch((error) => {
                console.error('Error fetching books:', error);
            });

        // Fetch wishlist items
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            axios.get(`http://localhost:4000/wishlist/${user.id}`)
                .then((response) => {
                    setWishlist(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching wishlist items:', error);
                });
        } else {
            console.log('User not logged in');
        }
    }, []);

    const addToWishlist = async (itemId) => {
        try {
            const selectedItem = books.find((book) => book._id === itemId);

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

                // Refresh wishlist after adding
                const response = await axios.get(`http://localhost:4000/wishlist/${user.id}`);
                setWishlist(response.data);
            }
        } catch (error) {
            console.error('Error adding item to wishlist:', error);
        }
    };

    const removeFromWishlist = async (itemId) => {
        try {
            await axios.post('http://localhost:4000/wishlist/remove', { itemId });

            // Refresh wishlist after removal
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                const response = await axios.get(`http://localhost:4000/wishlist/${user.id}`);
                setWishlist(response.data);
            } else {
                console.log('User not logged in');
            }
        } catch (error) {
            console.error('Error removing item from wishlist:', error);
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

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className="search-bar-container">
                <input
                    type="text"
                    placeholder="Search for books..."
                    className="search-bar"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="main-content">
                <h1 className="text-center" style={{ fontSize: '36px', marginTop: '20px' }}>Fiction Books</h1>
                <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {filteredBooks.map((book, index) => (
                        <Card key={index} style={{ margin: '20px', width: '18rem', position: 'relative' }}>
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
                            <Link to={`/uproducts/${book._id}`}>
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:4000/${book.itemImage}`} // Corrected URL path
                                    alt={book.title}
                                    style={{ height: '450px', objectFit: 'cover' }}
                                />
                            </Link>
                            <Card.Body>
                                <Card.Title className="text-center">{book.title}</Card.Title>
                                <p className="text-center text-gray-700">Price: ${book.price}</p>
                                <p className="text-center text-gray-700">Genre: {book.genre}</p>

                                <Button
                                    style={{ backgroundColor: 'green', border: 'none', width: '100%' }}
                                    onClick={() => handleBuyClick(book._id)}
                                >
                                    Buy
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Fiction;
