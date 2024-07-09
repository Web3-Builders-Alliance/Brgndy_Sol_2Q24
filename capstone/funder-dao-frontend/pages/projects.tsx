import React, { useState } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import ProjectCard from '../components/ProjectCard';
import GlobalStyles from '../styles/GlobalStyles';
import { useSolana } from '../hooks/useSolana';

const Projects: NextPage = () => {
  const { vote } = useSolana();
  const [showModal, setShowModal] = useState(false);
  const [ask, setAsk] = useState(true);
  const [strategy, setStrategy] = useState(true);
  const [idea, setIdea] = useState(true);

  const handleVote = () => {
    setShowModal(true);
  };

  const handleSubmitVote = async () => {
    try {
      await vote(ask, strategy, idea);
      setShowModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <GlobalStyles />
      <Main>
        <Title>Projects</Title>
        <Description>Explore projects you can support by voting.</Description>
        <ProjectsContainer>
          <ProjectCard
            projectName="Project B"
            description="Project B description..."
            idea="Idea for Project B..."
            strategy="Strategy for Project B..."
            ask="Ask for Project B..."
            onVote={handleVote}
          />
        </ProjectsContainer>
        {showModal && (
          <ModalOverlay>
            <ModalContent>
              <h2>Vote on Project B</h2>
              <div>
                <label>
                  Idea:
                  <select value={idea.toString()} onChange={(e) => setIdea(e.target.value === 'true')}>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </label>
              </div>
              <div>
                <label>
                  Ask:
                  <select value={ask.toString()} onChange={(e) => setAsk(e.target.value === 'true')}>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </label>
              </div>
              <div>
                <label>
                  Strategy:
                  <select value={strategy.toString()} onChange={(e) => setStrategy(e.target.value === 'true')}>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </label>
              </div>
              <button onClick={handleSubmitVote}>Submit Vote</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </ModalContent>
          </ModalOverlay>
        )}
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
  margin-bottom: 20px;
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  text-align: center;

  h2 {
    margin-bottom: 20px;
  }

  div {
    margin-bottom: 10px;
  }

  label {
    font-weight: bold;
    margin-right: 10px;
  }

  select {
    padding: 5px;
    border-radius: 4px;
  }

  button {
    margin: 10px;
    padding: 10px 20px;
    background-color: #6200ea;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #3700b3;
    }

    &:first-of-type {
      margin-right: 20px;
    }
  }
`;

export default Projects;
