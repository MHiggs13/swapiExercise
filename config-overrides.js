/* eslint-disable react-hooks/rules-of-hooks */
// Overrides create-react-app webpack configs without ejecting
// https://github.com/timarney/react-app-rewired

const { useBabelRc, override } = require("customize-cra");
module.exports = override(useBabelRc());
