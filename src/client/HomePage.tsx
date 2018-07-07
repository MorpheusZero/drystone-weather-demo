import * as React from 'react';
import { Clouds } from './components/Clouds';
import { UserInput } from './components/UserInput';
// const testImage = require('./image.png');

const HomePage = () => {
 return (
  <div>
    <Clouds />
    <UserInput />
  </div>
 ); 
};

export default HomePage;
