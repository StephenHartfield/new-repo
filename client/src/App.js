import { useEffect, useState } from 'react';
import BasicCard from './BasicCard';
import styled from 'styled-components';
import {getTopFive} from './api.service';

const StyledContainer = styled.div`
  margin: 0px 20%;
  display: flex;
  flex-wrap: wrap;
  justify-content: ${props => props.noCards ? 'center' : 'space-between'};
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
        const data = await getTopFive();
        setBusinessData(data.data);
      } catch (e) {
        setError("Error - Please Try Again");
      }
    })();
  }, []);

  return (
    <>
      <Header>Top 5 Ice Cream Spots in Alpharetta, GA</Header>
      <StyledContainer noCards={!businessData}>
        {businessData ?
          businessData.length > 0 ?
            businessData.map((business, idx) => (
              <BasicCard 
                key={business.id} 
                business={business}
                orderNumber={idx+1}
              />
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
