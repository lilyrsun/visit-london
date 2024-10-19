import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Chip, Button, Modal, Box } from '@mui/material';
import './Home.css';

const Attractions = () => {
    const [attractions, setAttractions] = useState([]);
    const [selectedAttraction, setSelectedAttraction] = useState(null); // Store selected attraction for the modal
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state
    const [filter, setFilter] = useState("all"); // Filter state for free/not free attractions

    useEffect(() => {
        fetch('http://localhost:5000/api/attractions')
            .then(res => res.json())
            .then(data => setAttractions(data))
            .catch(err => console.error("Error fetching attractions:", err));
    }, []);

    const handleOpenModal = (attraction) => {
        setSelectedAttraction(attraction);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedAttraction(null);
        setIsModalOpen(false);
    };

    // Filter attractions based on the selected filter
    const filteredAttractions = filter === "all"
        ? attractions
        : attractions.filter(attraction => filter === "free" ? attraction.pricing === "Free" : attraction.pricing !== "Free");

    return (
        <div className = "attractions">
            <h1>Top Attractions in London</h1>

            {/* Filter Buttons */}
            <div className = "filter-buttons">
                <Button
                    variant={filter === "all" ? "contained" : "outlined"}
                    onClick={() => setFilter("all")}
                    sx={{ marginRight: 2 }}
                >
                    Show All
                </Button>
                <Button
                    variant={filter === "free" ? "contained" : "outlined"}
                    onClick={() => setFilter("free")}
                    sx={{ marginRight: 2 }}
                >
                    Free Attractions
                </Button>
                <Button
                    variant={filter === "paid" ? "contained" : "outlined"}
                    onClick={() => setFilter("paid")}
                >
                    Paid Attractions
                </Button>
            </div>

            <Grid container spacing={3}>
                {filteredAttractions.map(attraction => (
                    <Grid item xs={12} sm={6} md={4} key={attraction.id}>
                        <Card sx={{ marginBottom: 2 }}>
                            <img 
                                src={attraction.image} 
                                alt={attraction.name} 
                                class = "attraction-image"
                            />
                            <CardContent>
                                <Typography variant="h5">
                                    {attraction.name}
                                    {/* Display the Free Chip if the attraction is free */}
                                    {attraction.pricing === "Free" && (
                                        <Chip 
                                            label="Free" 
                                            color="success" 
                                            sx={{ marginLeft: 1 }} 
                                        />
                                    )}
                                </Typography>
                                <Typography>{attraction.description.substring(0, 100)}...</Typography> {/* Short description */}
                                <Button class = "attraction-button" variant="contained" onClick={() => handleOpenModal(attraction)}>
                                    Learn More
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Modal */}
            {selectedAttraction && (
                <Modal
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    aria-labelledby="attraction-modal-title"
                    aria-describedby="attraction-modal-description"
                >
                    <Box 
                        sx={{
                            position: 'absolute', top: '50%', left: '50%',
                            transform: 'translate(-50%, -50%)', width: 400,
                            bgcolor: 'background.paper', borderRadius: 1, p: 4, 
                            boxShadow: 24
                        }}
                    >
                        <Typography id="attraction-modal-title" variant="h4" component="h2">
                            {selectedAttraction.name}
                        </Typography>

                        <Typography id="attraction-modal-description" sx={{ mt: 2 }}>
                            {selectedAttraction.description}
                        </Typography>
                        <Typography><strong>Pricing:</strong> {selectedAttraction.pricing}</Typography>
                        <Typography><strong>Hours:</strong> {selectedAttraction.hours}</Typography>
                        <Typography><strong>Location:</strong> {selectedAttraction.location}</Typography>
                        <Typography>
                            <strong>Website:</strong> 
                            <a href={selectedAttraction.website} target="_blank" rel="noopener noreferrer">
                                {selectedAttraction.website}
                            </a>
                        </Typography>

                        {/* Embed Google Maps iframe */}
                        <iframe
                            width="100%"
                            height="200"
                            frameBorder="0"
                            style={{ border: 0, marginTop: '10px' }}
                            src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(selectedAttraction.location)}&key=AIzaSyAshvoyd6x5MGZZyk_Y_EXdkDmFpwwLPFk`}
                            allowFullScreen
                        ></iframe>

                        <Button onClick={handleCloseModal} sx={{ mt: 2 }} variant="contained" color="error">
                            Close
                        </Button>
                    </Box>
                </Modal>
            )}
        </div>
    );
};

export default Attractions;
