import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className = "home">
    <section class = "logo-section">
        <img src = "https://images.unsplash.com/photo-1512734099960-65a682cbfe2b?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className = "site-picture" alt = "London Logo"></img>
    </section>
        <div className = "homepage">
            <h1>WELCOME TO LONDON</h1>
            <h2>The Heart of the UK</h2>
            <h3>Discover the beauty of London through its attractions, events, and more.</h3>
            <p>London, the vibrant capital of the United Kingdom, is a city steeped in history, culture, and innovation. Renowned for its iconic landmarks like Big Ben, the Tower of London, and Buckingham Palace, it offers a unique blend of the ancient and the modern. From world-class museums and theaters to bustling markets and serene parks, London is a melting pot of diverse cultures, cuisines, and experiences. Whether you're exploring the rich royal heritage or the contemporary art and fashion scenes, London's dynamic energy makes it a must-visit global destination.</p>
            <h2>DISCOVER</h2>
            <div className = "discover-content">
                <div className="discover-item">
                <img src = "https://images.unsplash.com/photo-1564676487888-8be98153b4a6?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Attraction"></img>
                <h3>Attractions</h3>
                <p>Explore the top attractions in London.</p>
                <Link to="/attractions" className="discover-link">Go to Attractions</Link>
                </div>

                <div className="discover-item">
                <img src = "https://cache.marriott.com/content/dam/marriott-renditions/LONPR/lonpr-staircase-9026-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1300px:*" alt="Lodging"></img>
                <h3>Accommodations</h3>
                <p>Find places to stay.</p>
                <Link to="/accommodations" className="discover-link">Go to Accommodations</Link>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Home;
