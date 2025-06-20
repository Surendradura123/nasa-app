export default {
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(axios)/)', // 👈 allow axios to be transformed
  ],
};
