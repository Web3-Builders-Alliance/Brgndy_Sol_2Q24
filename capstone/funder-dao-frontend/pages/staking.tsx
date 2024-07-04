import React, { useState } from 'react'; // Import React explicitly
import { NextPage } from 'next';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import { useSolana } from '../hooks/useSolana';


const Staking: NextPage = () => {
  const [stakedTokens, setStakedTokens] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const { staking } = useSolana();

  const handleStake = async () => {
    try {
      await staking(inputValue)

    } catch (e) {
      console.log(e);
    }


  };


  return (
    <>
      <GlobalStyles />
      <Main>
        <Title>Stake Your Tokens</Title>
        <Description>Stake tokens to participate in the DAO and vote for projects.</Description>
        <StakingForm>
          <Input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter token amount"
          />
          <StakeButton onClick={handleStake}>Stake Tokens</StakeButton>
        </StakingForm>
        <StakedTokens>
          <h3>Staked Tokens: {stakedTokens}</h3>
        </StakedTokens>
      </Main>
    </>
  );
};

const Main = styled.main`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  background-color: #f4f4f9; /* Solid color */
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333; /* Solid color */
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 40px;
  color: #555; /* Solid color */
`;

const StakingForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 200px;
  text-align: center;
`;

const StakeButton = styled.button`
  background-color: #e60023;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #b3001a;
  }
`;

const StakedTokens = styled.div`
  margin-top: 40px;
  color: #333; /* Solid color */
`;

export default Staking;
