const express = require('express');
const router = express.Router();
const yelp = require('yelp-fusion');
const apiKey = process.env.YELP_API_KEY;

// using yelp-fusion as an example and these parameters are easily readable and switched out.
const searchRequest = {
    location: "Alpharetta",
    categories: "icecream",
    sort_by: "rating",
    limit: "5"
}

const client = yelp.client(apiKey);

router.get('/', (req, res, next) => {
    client.search(searchRequest).then(response => {
        const body = JSON.parse(response.body);
        // sort by rating first, then, if equal, sort by review count
        const sorted = body.businesses.sort((a, b) => a.rating === b.rating ? b.review_count - a.review_count : b.rating - a.rating);
        res.status(200).json(sorted);
    }).catch(e => {
        res.status(400).json(e);
    })

})

module.exports = router;