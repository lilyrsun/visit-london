import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import './WelcomePage.css'; // Add custom CSS for styles

const WelcomePage = () => {
    const navigate = useNavigate();

    const handleEnterClick = () => {
        navigate('/home'); // Redirect to your home page
    };

    return (
        <div className="welcome-page">
            <div className="background-container">
                <video className="background-video" autoPlay muted loop>
                    <source src="/videos/welcome-bg.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Welcome Text */}
            <div className="welcome-content">
                <h1 className="welcome-text">VISIT LONDON</h1>
                <p className = "welcome-text-2">So, you've landed in London. See what's in store...</p>
                <Button className="enter-button" variant="contained" onClick={handleEnterClick}>
                    Enter
                </Button>
            </div>
        </div>
    );
};

export default WelcomePage;
