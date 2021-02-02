import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Card = styled.div`
    border: solid green 2px;
    border-radius: 8px;
    padding: 20px;
    margin: 10px 40px;
    flex:1;
    min-width: 200px;
    min-height: 180px;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const Header = styled.h1`
    margin: 6px 0px;
    font-size: 22px;
    text-align: center;
`;
const Location = styled.p`
    margin: 2px 0px 10px 0px;
    text-align: center;
`;
const RevName = styled.p`
    font-weight: 700;
    font-style: italic;
    text-align: center;
    margin: 20px 0px 2px 0px;
`;
const RevText = styled.p`
    font-weight: 300;
    font-style: italic;
    text-align: center;
    margin-top: 0px;
    font-size: 13px;
`;

export default function BasicCard({ business }) {
    const [reviewData, setReviewData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (business.id) {
            (async () => {
                try {
                    const data = await axios.get(`http://localhost:4000/reviews/${business.id}`);
                    setReviewData(data.data);
                } catch (e) {
                    setError("Error - Please Try Again");
                }
            })();
        }
    }, []);

    return (
        <Card>
            <Header>{business.name}</Header>
            <Location>{business.location.address1}, {business.location.city}</Location>
            {reviewData ?
                <>
                    <RevName>{reviewData.user.name}</RevName>
                    <RevText>"{reviewData.text.slice(0, 100)}..."</RevText>
                </>
                :
                error ?
                    <p>{error}</p>
                    :
                    <p>Loading ...</p>
            }
        </Card>
    )
}