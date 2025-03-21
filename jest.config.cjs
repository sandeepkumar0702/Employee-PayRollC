module.exports = {
  testEnvironment: 'jsdom', // Simulates a browser environment
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Optional setup file
  moduleNameMapper: {
    // Handle CSS imports and other static assets
    '^.+\\.(css|less|scss|png|jpg|jpeg|gif|svg)$': 'identity-obj-proxy'
  },
  transform: {
    // Use Babel to transpile JS/JSX files
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  }
};