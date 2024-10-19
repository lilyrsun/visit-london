const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: '*'
}));

app.use((req, res, next) => {
    req.headers['host'] = req.headers['x-forwarded-host'] || req.headers['host'];
    next();
});

// Attractions endpoint
app.get('/api/attractions', (req, res) => {
    res.json([
        { id: 1, name: "Tower of London", description: "A historic castle...", hours: "9 AM - 5 PM", pricing: "£25.00", location: "London EC3N 4AB", website: "https://www.hrp.org.uk/tower-of-london/", image: "https://worldstrides.com/wp-content/uploads/2015/07/api201.jpg" },
        { id: 2, name: "London Eye", description: "A giant Ferris wheel...", hours: "10 AM - 8 PM", pricing: "£30.00", location: "London SE1 7PB", website: "https://www.londoneye.com/", image: "https://www.londoneye.com/media/ackfhb4v/22747_london-eye_1b_c_pod-to-pod_055_rgb_ns.jpg"},
        { id: 3, name: "Big Ben", description: "Iconic clock tower...", hours: "Open 24 hours", pricing: "Free", location: "Westminster, London SW1A 0AA", website: "https://www.parliament.uk/bigben", image: "https://static.toiimg.com/photo/101366699.cms"},
        { id: 4, name: "The British Museum", description: "A world-famous museum...", hours: "10 AM - 5 PM", pricing: "Free", location: "London WC1B 3DG", website: "https://www.britishmuseum.org/", image: "https://www.travelguide.net/media/london-british-museum.jpg" },
        { id: 5, name: "Buckingham Palace", description: "The residence of the British monarch...", hours: "10 AM - 6 PM", pricing: "£27.50", location: "London SW1A 1AA", website: "https://www.rct.uk/visit/buckingham-palace", image: "https://cdn.britannica.com/94/148994-159-25B17024/Buckingham-Palace-Queen-Victoria-Memorial-London-statue.jpg" },
        { id: 6, name: "Hyde Park", description: "One of London's largest parks...", hours: "5 AM - Midnight", pricing: "Free", location: "London W2 2UH", website: "https://www.royalparks.org.uk/parks/hyde-park", image: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/91000/91187-Hyde-Park.jpg"}
    ]);
});

// Accommodations endpoint
app.get('/api/accommodations', (req, res) => {
    res.json([
        { id: 1, name: "The Ritz", type: "royalty", price: "£600+", location: "London W1J 9BR", website: "https://www.theritzlondon.com/", image: "https://media.cntraveler.com/photos/5f6198aa987090832029b181/16:9/w_2560%2Cc_limit/ritz-london-exterior.jpg" },
        { id: 2, name: "The Z Hotel", type: "budget", price: "£150", location: "London WC2H 9HD", website: "https://www.thezhotels.com/", image: "https://www.thezhotels.com/media/1573/z-queen1.jpg?width=700&height=394&rnd=133392613442930000"},
        { id: 3, name: "Shangri-La The Shard", type: "royalty", price: "£800+", location: "London SE1 9QU", website: "https://www.shangri-la.com/london/shangrila/" , image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/295688310.jpg?k=bd792d1487eebf49f687f15e26663dd3d1abd1d1e501f2a9a7b9d89330a6670a&o=&hp=1"},
        { id: 4, name: "The Chesterfield Mayfair", type: "bougie", price: "£400-£500", location: "London W1J 5EB", website: "https://www.chesterfieldmayfair.com/", image: "https://media.cntraveler.com/photos/5f61ad3168f3712403129f6c/16:9/w_2560%2Cc_limit/The-Chesterfield-Mayfair-Junior-Suite-cr-The-Red-Carnation-Hotel-Collection.jpg" },
        { id: 5, name: "Royal Lancaster London", type: "bougie", price: "£400-£500", location: "London W2 2TY", website: "https://www.royallancaster.com/", image: "https://www.royallancaster.com/wp-content/uploads/2018/03/MainPage_Slide1-1.jpg" },
        { id: 6, name: "Milestone Hotel Kensington", type: "royalty", price: "£600+", location: "London W8 5DL", website: "https://www.milestonehotel.com/", image: "https://prod-media.redcarnationhotels.com/media/22smbn50/the-milestone-hotel-exterior-the-milestone-exterior.jpg"},
        { id: 7, name: "The Londoner", type: "royalty", price: "£600+", location: "London WC2H 7LH", website: "https://www.thelondoner.com/", image: "https://publish.purewow.net/wp-content/uploads/sites/2/2023/06/the-londoner-hotel_mobile.jpg" },
        { id: 8, name: "The Fox & Goose Hotel", type: "budget", price: "£150-£200", location: "London W5 1DP", website: "https://www.foxandgoosehotel.co.uk/" , image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/207589661.jpg?k=af89b584ebb90257a533ce722da5a887b8151647563f030b51913349628e7631&o=&hp=1"},
        { id: 9, name: "Page8, Page Hotels", type: "bougie", price: "£300-£400", location: "London WC2N 5AE", website: "https://www.pagehotels.com/" , image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/319428051.jpg?k=0cc59d6a2afab0011994026037c76c0aca62742a0e56364f131dfd8775b39c99&o=&hp=1"},
        { id: 10, name: "The Langham London", type: "royalty", price: "£600+", location: "London W1B 1JA", website: "https://www.langhamhotels.com/en/the-langham/london/", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Langham_london.jpg/1200px-Langham_london.jpg"},
        { id: 11, name: "The Stafford London", type: "royalty", price: "£600+", location: "London SW1A 1NJ", website: "https://www.thestaffordlondon.com/", image: "https://thestaffordlondon.com/wp-content/uploads/2020/11/The-Stafford-London-Christmas-External-scaled.jpg"},
        { id: 12, name: "Montague On The Gardens", type: "bougie", price: "£300-£400", location: "London WC1B 5BJ", website: "https://www.montaguehotel.com/", image: "https://media.cntraveler.com/photos/5da0e36c91a0100008e60e7d/16:9/w_2560%2Cc_limit/The%2520Montague%2520on%2520the%2520Gardens_2019_The-Lord-Master-Suite-Lounge.jpg"}
    ]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));