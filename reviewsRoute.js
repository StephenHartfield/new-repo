const express = require('express');
const router = express.Router();
const apiKey = process.env.YELP_API_KEY;
const axios = require('axios');

// without yelp-fusion, using axios for a different demonstration
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    axios.get(`https://api.yelp.com/v3/businesses/${id}/reviews`, {
        headers: {
            "Authorization": `Bearer ${apiKey}`
        }
    }).then(response => {
        // bring a 5-star rating to the top
        const sorted = response.data.reviews.sort((a, b) => b.rating - a.rating);
        res.status(200).json(sorted[0]);
    }).catch(e => {
        res.status(400).json(e);
    })

})

module.exports = router;