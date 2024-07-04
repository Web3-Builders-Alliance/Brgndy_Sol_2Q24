import React from 'react'; // Import React explicitly
import { NextPage } from 'next';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';

const Home: NextPage = () => {
  return (
    <>
      <GlobalStyles />
      <Main>
        <Title>Funder DAO</Title>
        <Description>Stake tokens and vote for projects to get listed</Description>
      </Main>
    </>
  );
};

const Main = styled.main`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f4f4f9; /* Solid color */
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  color: #333; /* Solid color */
`;

const Description = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 40px;
  color: #555; /* Solid color */
`;

const ProjectsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export default Home;
