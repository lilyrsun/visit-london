import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Chip, Button, Modal, Box } from '@mui/material';

const Accommodations = () => {
    const [accommodations, setAccommodations] = useState([]);
    const [selectedAccommodation, setSelectedAccommodation] = useState(null); // Selected accommodation for the modal
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const [filter, setFilter] = useState("all"); // Filter state
    const [placeDetails, setPlaceDetails] = useState(null); // Place details

    useEffect(() => {
        fetch('http://localhost:5000/api/accommodations')
            .then(res => res.json())
            .then(data => setAccommodations(data))
            .catch(err => console.error("Error fetching accommodations:", err));
    }, []);

    // Helper function to extract the numeric part of the price
    const getNumericPrice = (price) => {
        if (typeof price === 'string') {
            return parseFloat(price.replace(/[£$,]+/g, ''));
        }
        return price;
    };

    // Filter accommodations based on price range
    const filteredAccommodations = filter === "all"
        ? accommodations
        : accommodations.filter(accommodation => {
            const price = getNumericPrice(accommodation.price);
            if (filter === "budget") return price < 200;
            if (filter === "bougie") return price >= 200 && price <= 500;
            if (filter === "royalty") return price > 500;
        });

    const handleOpenModal = (accommodation) => {
        setSelectedAccommodation(accommodation);
        setIsModalOpen(true);

        // Optional: Fetch place details if placeId exists
        if (accommodation.placeId) {
            fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${accommodation.placeId}&key=AIzaSyAshvoyd6x5MGZZyk_Y_EXdkDmFpwwLPFk`)
                .then(res => res.json())
                .then(data => setPlaceDetails(data.result))
                .catch(err => console.error("Error fetching place details:", err));
        }
    };

    const handleCloseModal = () => {
        setSelectedAccommodation(null);
        setIsModalOpen(false);
        setPlaceDetails(null); // Reset place details when closing the modal
    };

    return (
        <div className = "attractions">
            <h1>Top Accommodations in London</h1>

            {/* Filter Buttons */}
            <div style={{ marginBottom: '20px' }}>
                <Button
                    variant={filter === "all" ? "contained" : "outlined"}
                    onClick={() => setFilter("all")}
                    sx={{ marginRight: 2 }}
                >
                    Show All
                </Button>
                <Button
                    variant={filter === "budget" ? "contained" : "outlined"}
                    onClick={() => setFilter("budget")}
                    sx={{ marginRight: 2 }}
                >
                    Budget-Friendly (Under £200)
                </Button>
                <Button
                    variant={filter === "bougie" ? "contained" : "outlined"}
                    onClick={() => setFilter("bougie")}
                    sx={{ marginRight: 2 }}
                >
                    Slightly Bougie (£200-£500)
                </Button>
                <Button
                    variant={filter === "royalty" ? "contained" : "outlined"}
                    onClick={() => setFilter("royalty")}
                >
                    Treat Me Like Royalty (£500+)
                </Button>
            </div>

            <Grid container spacing={3}>
                {filteredAccommodations.map(accommodation => (
                    <Grid item xs={12} sm={6} md={4} key={accommodation.id}>
                        <Card sx={{ marginBottom: 2 }}>
                            <CardContent>
                                <img 
                                    src={accommodation.image} 
                                    alt={accommodation.name} 
                                    class = "attraction-image"
                                />
                                <Typography variant="h6">
                                    {accommodation.name}
                                    {/* Chips based on the type of accommodation */}
                                    {accommodation.type === "budget" && (
                                        <Chip label="Budget" color="success" sx={{ marginLeft: 1 }} />
                                    )}
                                    {accommodation.type === "bougie" && (
                                        <Chip label="Bougie" color="info" sx={{ marginLeft: 1 }} />
                                    )}
                                    {accommodation.type === "royalty" && (
                                        <Chip label="Royalty" color="secondary" sx={{ marginLeft: 1 }} />
                                    )}
                                </Typography>
                                <Typography>Price: {accommodation.price}</Typography>
                                <Button class = "attraction-button" variant="contained" onClick={() => handleOpenModal(accommodation)}>
                                    Learn More
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Modal */}
            {selectedAccommodation && (
                <Modal
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    aria-labelledby="accommodation-modal-title"
                    aria-describedby="accommodation-modal-description"
                >
                    <Box 
                        sx={{
                            position: 'absolute', top: '50%', left: '50%',
                            transform: 'translate(-50%, -50%)', width: 400,
                            bgcolor: 'background.paper', borderRadius: 1, p: 4, boxShadow: 24
                        }}
                    >
                        <Typography id="accommodation-modal-title" variant="h4">
                            {selectedAccommodation.name}
                        </Typography>
                        <Typography>{selectedAccommodation.type}</Typography>
                        <Typography><strong>Price:</strong> {selectedAccommodation.price}</Typography>
                        <Typography><strong>Location:</strong> {selectedAccommodation.location}</Typography>
                        <Typography><strong>Website:</strong> 
                            <a href={selectedAccommodation.website} target="_blank" rel="noopener noreferrer">
                                {selectedAccommodation.website}
                            </a>
                        </Typography>

                        {/* Display additional place details if available */}
                        {placeDetails && (
                            <div>
                                <Typography><strong>Rating:</strong> {placeDetails.rating}</Typography>
                                <Typography><strong>Reviews:</strong> {placeDetails.reviews?.length || 0}</Typography>
                            </div>
                        )}

                        {/* Embed Google Maps iframe */}
                        <iframe
                            width="100%"
                            height="200"
                            frameBorder="0"
                            style={{ border: 0, marginTop: '10px' }}
                            src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(selectedAccommodation.location)}&key=AIzaSyAshvoyd6x5MGZZyk_Y_EXdkDmFpwwLPFk`}
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

export default Accommodations;
