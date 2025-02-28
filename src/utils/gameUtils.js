/**
 * Generate all k combinations from a set
 * @param {Array} set - Array of elements to generate combinations from
 * @param {Number} k - Size of each combination
 * @returns {Array} Array of k-sized combinations
 */
export const kCombinations = (set, k) => {
  if (k > set.length || k <= 0) {
    return [];
  }
  
  if (k === set.length) {
    return [set];
  }
  
  if (k === 1) {
    return set.map(element => [element]);
  }
  
  const combs = [];
  for (let i = 0; i < set.length - k + 1; i++) {
    const head = set.slice(i, i + 1);
    const tailCombs = kCombinations(set.slice(i + 1), k - 1);
    for (let j = 0; j < tailCombs.length; j++) {
      combs.push(head.concat(tailCombs[j]));
    }
  }
  
  return combs;
};

/**
 * Check if three cards form a valid SET
 * @param {Array} set - Array of three card objects
 * @returns {Boolean} True if the three cards form a valid SET
 */
export const isValidSet = (set) => {
  if (!set || set.length !== 3) return false;
  
  const [a, b, c] = set;
  
  // For each attribute, either all three cards have the same value,
  // or all three cards have different values
  const numberValid = (a.number === b.number && b.number === c.number) || 
                      (a.number !== b.number && a.number !== c.number && b.number !== c.number);
  
  const shapeValid = (a.shape === b.shape && b.shape === c.shape) || 
                     (a.shape !== b.shape && a.shape !== c.shape && b.shape !== c.shape);
                     
  const shadingValid = (a.shading === b.shading && b.shading === c.shading) || 
                       (a.shading !== b.shading && a.shading !== c.shading && b.shading !== c.shading);
                       
  const colorValid = (a.color === b.color && b.color === c.color) || 
                     (a.color !== b.color && a.color !== c.color && b.color !== c.color);
  
  return numberValid && shapeValid && shadingValid && colorValid;
};

/**
 * Find all possible SETs in a collection of cards
 * @param {Array} cards - Array of card objects
 * @returns {Array} Array of valid SET combinations
 */
export const findPossibleSets = (cards) => {
  const combinations = kCombinations(cards, 3);
  return combinations.filter(combo => isValidSet(combo));
};

/**
 * Shuffle an array in place
 * @param {Array} array - Array to shuffle
 * @returns {Array} The shuffled array
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Deal cards from the deck
 * @param {Array} deck - Array of cards in the deck
 * @param {Number} count - Number of cards to deal
 * @returns {Object} Object with new deck and dealt cards
 */
export const dealCards = (deck, count) => {
  if (deck.length < count) {
    return {
      deck,
      dealtCards: [...deck],
      notEnoughCards: true
    };
  }
  
  const newDeck = [...deck];
  const dealtCards = [];
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * newDeck.length);
    const card = newDeck.splice(randomIndex, 1)[0];
    dealtCards.push(card);
  }
  
  return {
    deck: newDeck,
    dealtCards,
    notEnoughCards: false
  };
};

/**
 * Format seconds into MM:SS format
 * @param {Number} seconds - Seconds to format
 * @returns {String} Formatted time string
 */
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${padZero(minutes)}:${padZero(remainingSeconds)}`;
};

/**
 * Pad a number with leading zero if needed
 * @param {Number} num - Number to pad
 * @returns {String} Padded number string
 */
const padZero = (num) => {
  return num < 10 ? `0${num}` : `${num}`;
};

/**
 * Determine responsive card size based on number of cards and screen orientation
 * @param {Number} cardCount - Number of cards on the table
 * @param {Boolean} isPortrait - Whether the screen is in portrait orientation
 * @returns {String} CSS width value for cards
 */
export const getCardSize = (cardCount, isPortrait) => {
  if (isPortrait) {
    // Portrait mode - stacked in columns
    if (cardCount <= 3) return '100%';
    if (cardCount <= 6) return '48%';
    if (cardCount <= 12) return '32%';
    if (cardCount <= 24) return '24%';
    return '20%';
  } else {
    // Landscape mode - cards in rows - adjusted for rotation
    if (cardCount === 1) return '80%';
    if (cardCount === 2) return '60%';
    if (cardCount <= 4) return '40%';
    if (cardCount <= 6) return '35%';
    if (cardCount <= 8) return '30%';
    if (cardCount <= 12) return '25%';
    if (cardCount <= 15) return '22%';
    if (cardCount <= 20) return '20%';
    if (cardCount <= 24) return '18%';
    if (cardCount <= 28) return '16%';
    if (cardCount <= 35) return '14%';
    if (cardCount <= 40) return '12%';
    if (cardCount <= 45) return '10%';
    if (cardCount <= 54) return '9%';
    if (cardCount <= 60) return '8%';
    if (cardCount <= 70) return '7%';
    if (cardCount <= 77) return '6%';
    return '5%';
  }
};