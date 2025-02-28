import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Layout from './components/Layout';
import CardGrid from './components/CardGrid';
import GameStats from './components/GameStats';
import GameControls from './components/GameControls';
import SetDisplay from './components/SetDisplay';
import GameOverModal from './components/GameOverModal';
import allCards from './data/cards';
import { dealCards, isValidSet, findPossibleSets, shuffleArray } from './utils/gameUtils';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// Define high score service - can be implemented with a real backend later
const HighScoreService = {
  getHighScores: () => {
    const scores = localStorage.getItem('set-game-high-scores');
    return scores ? JSON.parse(scores) : [];
  },
  
  saveHighScore: (score) => {
    const scores = HighScoreService.getHighScores();
    const newScores = [...scores, score].sort((a, b) => {
      // Sort by sets found (descending)
      if (a.setsFound !== b.setsFound) {
        return b.setsFound - a.setsFound;
      }
      // Then by time (ascending)
      return a.timer - b.timer;
    }).slice(0, 10); // Keep top 10
    
    localStorage.setItem('set-game-high-scores', JSON.stringify(newScores));
    return newScores;
  },
  
  isHighScore: (score) => {
    const scores = HighScoreService.getHighScores();
    
    if (scores.length < 10) return true;
    
    // Check if this score is better than the lowest high score
    const lowestScore = scores[scores.length - 1];
    return score.setsFound > lowestScore.setsFound || 
           (score.setsFound === lowestScore.setsFound && score.timer < lowestScore.timer);
  }
};

const App = () => {
  // Game state
  const [deck, setDeck] = useState([]);
  const [tableCards, setTableCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [correctSet, setCorrectSet] = useState(null);
  const [incorrectSet, setIncorrectSet] = useState(null);
  const [foundSets, setFoundSets] = useState([]);
  const [possibleSets, setPossibleSets] = useState([]);
  const [showHints, setShowHints] = useState(false);
  const [cardSize, setCardSize] = useState('medium'); // small, medium, large
  
  // Game stats
  const [timer, setTimer] = useState(0);
  const [setsFound, setSetsFound] = useState(0);
  const [wrongSets, setWrongSets] = useState(0);
  const [missedSets, setMissedSets] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [highScores, setHighScores] = useState([]);
  
  // Game modal
  const [isGameOver, setIsGameOver] = useState(false);
  const [showScores, setShowScores] = useState(false);

  // Load high scores
  useEffect(() => {
    setHighScores(HighScoreService.getHighScores());
  }, []);

  // Initialize the game
  const initializeGame = useCallback(() => {
    setSelectedCards([]);
    setCorrectSet(null);
    setIncorrectSet(null);
    setFoundSets([]);
    setPossibleSets([]);
    setShowHints(false);
    setSetsFound(0);
    setWrongSets(0);
    setMissedSets(0);
    setHintsUsed(0);
    setTimer(0);
    setIsGameOver(false);
    
    // Shuffle cards and deal initial 12
    const shuffledDeck = shuffleArray([...allCards]);
    const { deck: newDeck, dealtCards } = dealCards(shuffledDeck, 12);
    setDeck(newDeck);
    setTableCards(dealtCards);
  }, []);

  // Start a new game
  const handleNewGame = () => {
    initializeGame();
  };
  
  // Check for possible SETs when cards on the table change
  useEffect(() => {
    if (tableCards.length > 0) {
      const possibleSetCombos = findPossibleSets(tableCards);
      setPossibleSets(possibleSetCombos);
      
      // Check for game over condition
      if (possibleSetCombos.length === 0 && deck.length === 0) {
        // Save score if game is actually played (not just initialized)
        if (setsFound > 0) {
          const gameStats = {
            timer,
            setsFound,
            wrongSets,
            missedSets,
            hintsUsed,
            date: new Date().toISOString()
          };
          
          if (HighScoreService.isHighScore(gameStats)) {
            const newHighScores = HighScoreService.saveHighScore(gameStats);
            setHighScores(newHighScores);
          }
        }
        
        setIsGameOver(true);
      }
    }
  }, [tableCards, deck, setsFound, timer, wrongSets, missedSets, hintsUsed]);
  
  // Timer effect
  useEffect(() => {
    if (isGameOver) return;
    
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isGameOver]);
  
  // Initialize game on first render
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);
  
  // Handle card selection
  const handleCardClick = (card) => {
    if (selectedCards.includes(card)) {
      // Deselect the card
      setSelectedCards(prev => prev.filter(c => c !== card));
      return;
    }
    
    // Don't allow more than 3 selections
    if (selectedCards.length >= 3) return;
    
    // Add card to selection
    const newSelection = [...selectedCards, card];
    setSelectedCards(newSelection);
    
    // Check if we have 3 cards selected
    if (newSelection.length === 3) {
      if (isValidSet(newSelection)) {
        handleCorrectSet(newSelection);
      } else {
        handleIncorrectSet(newSelection);
      }
    }
  };
  
  // Handle correct SET
  const handleCorrectSet = (set) => {
    setCorrectSet(set);
    setSetsFound(prev => prev + 1);
    setFoundSets(prev => [...prev, set]);
    
    // Wait a bit then remove the cards and draw new ones if needed
    setTimeout(() => {
      // Remove the SET cards from table
      const newTableCards = tableCards.filter(card => !set.includes(card));
      
      // Deal new cards if needed and possible - ensure we have exactly 12 cards
      if (newTableCards.length < 12 && deck.length > 0) {
        const cardsNeeded = Math.min(12 - newTableCards.length, deck.length);
        const { deck: newDeck, dealtCards } = dealCards(deck, cardsNeeded);
        setDeck(newDeck);
        setTableCards([...newTableCards, ...dealtCards]);
      } else {
        setTableCards(newTableCards);
      }
      
      setSelectedCards([]);
      setCorrectSet(null);
    }, 1000);
  };
  
  // Handle incorrect SET
  const handleIncorrectSet = (set) => {
    setIncorrectSet(set);
    setWrongSets(prev => prev + 1);
    
    // Wait a bit then clear selection
    setTimeout(() => {
      setSelectedCards([]);
      setIncorrectSet(null);
    }, 1000);
  };
  
  // Draw one additional card
  const handleDrawOne = () => {
    if (deck.length === 0) return;
    
    // Count missed sets before dealing
    if (possibleSets.length > 0) {
      setMissedSets(prev => prev + possibleSets.length);
    }
    
    const { deck: newDeck, dealtCards } = dealCards(deck, 1);
    setDeck(newDeck);
    setTableCards([...tableCards, ...dealtCards]);
  };
  
  // Draw three additional cards
  const handleDrawThree = () => {
    if (deck.length === 0) return;
    
    // Count missed sets before dealing
    if (possibleSets.length > 0) {
      setMissedSets(prev => prev + possibleSets.length);
    }
    
    const { deck: newDeck, dealtCards } = dealCards(deck, 3);
    setDeck(newDeck);
    setTableCards([...tableCards, ...dealtCards]);
  };
  
  // Toggle hints
  const handleToggleHints = () => {
    if (!showHints && !hintsUsed) {
      setHintsUsed(prev => prev + 1);
    }
    setShowHints(prev => !prev);
  };
  
  // Show high scores
  const handleShowHighScores = () => {
    setShowScores(true);
  };
  
  // Hide high scores
  const handleHideHighScores = () => {
    setShowScores(false);
  };
  
  // Handle card size toggle
  const handleToggleCardSize = () => {
    setCardSize(prevSize => {
      switch (prevSize) {
        case 'small': return 'medium';
        case 'medium': return 'large';
        case 'large': return 'small';
        default: return 'medium';
      }
    });
  };
  
  return (
    <Layout>
      <GameContainer>
        <GameControls
          onNewGame={handleNewGame}
          onDrawOne={handleDrawOne}
          onDrawThree={handleDrawThree}
          onToggleHints={handleToggleHints}
          onToggleCardSize={handleToggleCardSize}
          onShowHighScores={handleShowHighScores}
          showHints={showHints}
          cardSize={cardSize}
          deckEmpty={deck.length === 0}
        />
        
        <GameStats
          timer={timer}
          setsFound={setsFound}
          cardsRemaining={deck.length}
          cardsOnTable={tableCards.length}
          possibleSets={possibleSets.length}
          wrongSets={wrongSets}
          missedSets={missedSets}
          hintsUsed={hintsUsed}
        />
        
        <CardGrid
          cards={tableCards}
          selectedCards={selectedCards}
          correctSet={correctSet}
          incorrectSet={incorrectSet}
          onCardClick={handleCardClick}
          cardSize={cardSize}
        />
        
        {showHints && <SetDisplay title="Possible Sets" sets={possibleSets} />}
        
        {foundSets.length > 0 && <SetDisplay title="Found Sets" sets={foundSets} />}
        
        <GameOverModal
          isOpen={isGameOver}
          onClose={handleNewGame}
          stats={{
            timer,
            setsFound,
            wrongSets,
            missedSets,
            hintsUsed
          }}
          highScores={highScores}
        />
        
        <GameOverModal
          isOpen={showScores}
          onClose={handleHideHighScores}
          stats={{
            timer,
            setsFound,
            wrongSets,
            missedSets,
            hintsUsed
          }}
          highScores={highScores}
          initialTab="highscores"
        />
      </GameContainer>
    </Layout>
  );
};

export default App;