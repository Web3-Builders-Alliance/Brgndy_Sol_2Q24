import React, { useState } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import { useSolana } from '../hooks/useSolana';

const Staking: NextPage = () => {
  const [stakedTokens, setStakedTokens] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [showUnstakePopup, setShowUnstakePopup] = useState(false);
  const { staking, startUnstaking } = useSolana();

  const handleStake = async () => {
    try {
      await staking(inputValue);
      // Update stakedTokens state here if needed
    } catch (e) {
      console.log(e);
    }
  };

  const handleUnstake = async () => {
    try {
      await startUnstaking(unstakeAmount);
      // Update stakedTokens state here if needed
      setShowUnstakePopup(false);
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
          <UnstakeButton onClick={() => setShowUnstakePopup(true)}>Unstake Tokens</UnstakeButton>
        </StakedTokens>
        {showUnstakePopup && (
          <Popup>
            <PopupContent>
              <CloseButton onClick={() => setShowUnstakePopup(false)}>X</CloseButton>
              <h2>Enter amount to unstake</h2>
              <Input
                type="number"
                value={unstakeAmount}
                onChange={(e) => setUnstakeAmount(e.target.value)}
                placeholder="Enter unstaking amount"
              />
              <UnstakeConfirmButton onClick={handleUnstake}>Confirm Unstake</UnstakeConfirmButton>
            </PopupContent>
          </Popup>
        )}
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

const UnstakeButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const UnstakeConfirmButton = styled.button`
  background-color: #e60023;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #b3001a;
  }
`;

export default Staking;
