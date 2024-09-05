import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../Componenets/Footer'; // Ensure this path is correct

const IndianWriting = () => {
    const indianBooks = [
        { title: 'The White Tiger', imageUrl: '', link: '/uproducts' },
        { title: 'Midnight\'s Children', imageUrl: '', link: '/uproducts' },
        { title: 'The God of Small Things', imageUrl: '', link: '/uproducts' },
        { title: 'A Suitable Boy', imageUrl: '', link: '/uproducts' },
        // Add more Indian writing books as needed
    ];

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className="main-content">
                <h1 className="text-center" style={{ fontSize: '36px' }}>Indian Writing</h1>
                <div className="card-container">
                    {indianBooks.map((book, index) => (
                        <Card key={index} style={{ margin: '20px' }}>
                            <Link to={book.link}>
                                <Card.Img variant="top" src={book.imageUrl} />
                            </Link>
                            <Card.Body>
                                <Card.Title className="text-center">{book.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default IndianWriting;
