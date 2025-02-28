import React, { useState } from 'react';
import styled from 'styled-components';
import { formatTime } from '../utils/gameUtils';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  width: 90%;
  max-width: 500px;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Tab = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.background};
  color: ${({ active, theme }) => active ? 'white' : theme.colors.text};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: 600;
  margin: 0 ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.background};
    opacity: 0.9;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const StatItem = styled.div`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.sm};
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
`;

const StatValue = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: 600;
  font-size: 1.1rem;
  transition: all ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const HighScoreTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const TableHeader = styled.th`
  padding: ${({ theme }) => theme.spacing.sm};
  text-align: left;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.background};
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.background};
`;

const GameOverModal = ({ 
  isOpen, 
  onClose, 
  stats = { 
    timer: 0, 
    setsFound: 0, 
    wrongSets: 0, 
    missedSets: 0, 
    hintsUsed: 0 
  },
  highScores = [],
  initialTab = 'stats'
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  
  if (!isOpen) return null;

  // Format high score date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Game Complete!</ModalTitle>
        
        <TabsContainer>
          <Tab 
            active={activeTab === 'stats'} 
            onClick={() => setActiveTab('stats')}
          >
            Game Stats
          </Tab>
          <Tab 
            active={activeTab === 'highscores'} 
            onClick={() => setActiveTab('highscores')}
          >
            High Scores
          </Tab>
        </TabsContainer>
        
        {activeTab === 'stats' && (
          <StatsGrid>
            <StatItem>
              <StatLabel>Time</StatLabel>
              <StatValue>{formatTime(stats.timer)}</StatValue>
            </StatItem>
            
            <StatItem>
              <StatLabel>Sets Found</StatLabel>
              <StatValue>{stats.setsFound}</StatValue>
            </StatItem>
            
            <StatItem>
              <StatLabel>Wrong Sets</StatLabel>
              <StatValue>{stats.wrongSets}</StatValue>
            </StatItem>
            
            <StatItem>
              <StatLabel>Missed Sets</StatLabel>
              <StatValue>{stats.missedSets}</StatValue>
            </StatItem>
            
            <StatItem>
              <StatLabel>Hints Used</StatLabel>
              <StatValue>{stats.hintsUsed}</StatValue>
            </StatItem>
          </StatsGrid>
        )}
        
        {activeTab === 'highscores' && (
          <HighScoreTable>
            <thead>
              <tr>
                <TableHeader>Rank</TableHeader>
                <TableHeader>Sets</TableHeader>
                <TableHeader>Time</TableHeader>
                <TableHeader>Date</TableHeader>
              </tr>
            </thead>
            <tbody>
              {highScores.length > 0 ? (
                highScores.map((score, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{score.setsFound}</TableCell>
                    <TableCell>{formatTime(score.timer)}</TableCell>
                    <TableCell>{formatDate(score.date)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: 'center' }}>No high scores yet!</TableCell>
                </TableRow>
              )}
            </tbody>
          </HighScoreTable>
        )}
        
        <Button onClick={onClose}>Play Again</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default GameOverModal;