// React Library
import React from 'react';
import { Link } from 'react-router-dom';

// CSS Files
import '../../main.css';

// Components
import { DesktopAndTablet, Mobile } from '../Util/Breakpoints';
import withScreenSize from '../HOC/ScreenSize';

// Images
const girl = require('../../assets/girl.png');

const Join = () => {
  return (
    <div>Join Page</div>
  )
}


export default withScreenSize(Join);
