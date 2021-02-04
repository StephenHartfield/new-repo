import axios from 'axios';
const base = "http://localhost:4000";

export async function getTopFive() {
    const data = await axios.get(`${base}/business`);
    return data;
}

export async function getReview(businessId) {
    const data = await axios.get(`${base}/reviews/${businessId}`);
    return data;
}