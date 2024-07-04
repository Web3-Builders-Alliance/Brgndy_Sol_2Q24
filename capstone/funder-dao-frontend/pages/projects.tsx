import React from 'react'; // Import React explicitly
import { NextPage } from 'next';
import styled from 'styled-components';
import ProjectCard from '../components/ProjectCard';
import GlobalStyles from '../styles/GlobalStyles';
import { useSolana } from '../hooks/useSolana';
const { vote } = useSolana();

const handleVote = async () => {
  try {
    await vote(true, true, true)

  } catch (e) {
    console.log(e);
  }


};

const Projects: NextPage = () => {
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

export default Projects;
