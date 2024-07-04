import React from 'react';
import styled from 'styled-components';

type ProjectCardProps = {
  projectName: string;
  description?: string;
  idea?: string;
  strategy?: string;
  ask?: string;
  onVote: () => void;
};

const ProjectCard = ({ projectName, description, idea, strategy, ask, onVote }: ProjectCardProps) => {
  return (
    <Card>
      <ProjectTitle>{projectName}</ProjectTitle>
      <ProjectImage src={`./images/${projectName.toLowerCase()}.jpg`} alt={`${projectName} Image`} />
      <ProjectDetails>
        <ProjectDescription>{description}</ProjectDescription>
        <DetailTitle>Idea:</DetailTitle>
        <DetailText>{idea}</DetailText>
        <DetailTitle>Strategy:</DetailTitle>
        <DetailText>{strategy}</DetailText>
        <DetailTitle>Ask:</DetailTitle>
        <DetailText>{ask}</DetailText>
      </ProjectDetails>
      <VoteButton onClick={onVote}>Vote</VoteButton>
    </Card>
  );
};

const Card = styled.div`
  background-color: #fff;
  padding: 20px;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

const ProjectTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const ProjectImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const ProjectDetails = styled.div`
  text-align: left;
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
`;

const DetailTitle = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const DetailText = styled.span`
  margin-bottom: 10px;
  display: block;
`;

const VoteButton = styled.button`
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

export default ProjectCard;
