import React, { useState } from 'react'; // Import React explicitly
import { NextPage } from 'next';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import { useSolana } from '../hooks/useSolana';

const InitPlatform: NextPage = () => {
    const [inputValue, setInputValue] = useState('');
    const { initialize } = useSolana();


    const handleInit = async () => {
        try {
            await initialize(inputValue)

        } catch (e) {
            console.log(e);
        }


    };


    return (
        <>
            <GlobalStyles />
            <Main>
                <Title>Init Your Platform</Title>
                <Description>Enter the unstaking period</Description>
                <InitForm>
                    <Input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter unstaking period in days"></Input>
                    <InitButton onClick={handleInit}>Init</InitButton>
                </InitForm>
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

const InitForm = styled.div`
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

const InitButton = styled.button`
  background-color: #e77892;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #b3001a;
  }
`;

export default InitPlatform;
