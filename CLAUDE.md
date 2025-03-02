# Disperse Project Guidelines

## Commands
- `npm run dev`: Start local development server
- `npm run build`: Build using rollup
- `npm run production`: Build for production
- `npm run watch`: Watch files and rebuild on changes
- `npm run deploy`: Deploy smart contracts
- `pytest -xvs tests/test_file.py`: Run specific test
- `pytest -xvs tests/`: Run all tests

## Code Style
- **Python**: 4-space indentation, type hints encouraged
- **JavaScript**: ES6 imports, Riot.js components
- **Solidity**: Version 0.4.25, 4-space indentation

## Project Structure
- `/contracts`: Solidity smart contracts
- `/src`: Frontend source (JS, CSS, Riot tags)
- `/tests`: Python pytest files
- `/docs`: Built application (production)
- `/build`: Contract artifacts and deployments

## Dependencies
- Python: eth-brownie
- JS: Riot.js, rollup
- Multiple blockchain network support