# SET Card Game

A digital implementation of the popular SET card game built with React.

## Live Demo

Play the game at: [stanleyluong.com/SETv3](https://stanleyluong.com/SETv3)

## Development

To run the project locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Deployment

This project uses GitHub Actions for CI/CD. Every push to the main branch will automatically deploy the game to GitHub Pages.

For manual deployment:

```bash
# Install gh-pages package if not already installed
npm install --save-dev gh-pages

# Deploy to GitHub Pages
npm run deploy
```

## Game Rules

In SET, the goal is to identify "sets" of three cards from the cards displayed on the table. A SET consists of three cards where each feature is either all the same or all different across the three cards.

Each card has four features:
- Number (1, 2, or 3)
- Shape (diamond, oval, or squiggle)
- Shading (solid, striped, or open)
- Color (red, green, or purple)

For example, three cards form a SET if they all have the same color but different shapes, shadings, and numbers.

## License

ISC