import axios from 'axios';
import { useEffect, useState } from 'react';
import BasicCard from './BasicCard';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin: 0px 20%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-height: 600px;
`;

const NoData = styled.p`
  font-size: 28px;
  font-weight: 700;
`;
const Header = styled.h1`
  text-align: center;
`;

function App() {
  const [businessData, setBusinessData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get("http://localhost:4000/business");
        setBusinessData(data.data);
      } catch (e) {
        setError("Error - Please Try Again");
      }
    })();
  }, []);

  return (
    <>
      <Header>Top 5 Ice Cream Spots in Alpharetta, GA</Header>
      <StyledContainer>
        {businessData ?
          businessData.length > 0 ?
            businessData.map(business => (
              <BasicCard key={business.id} business={business} />
            ))
            :
            <NoData>No Data To Show</NoData>
          :
          error ?
            <div>{error}</div>
            :
            <div>Loading ...</div>
        }
      </StyledContainer>
    </>
  )
}

export default App;
