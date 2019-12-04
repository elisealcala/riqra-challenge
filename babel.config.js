const presets = [
  '@babel/preset-env',
  '@babel/preset-react',
  '@babel/preset-typescript'
];

module.exports = {
  presets,
  plugins: [
    'babel-plugin-styled-components',
    '@babel/plugin-proposal-optional-chaining'
  ]
};
