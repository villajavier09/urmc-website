import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLink = (props) => {
  return (
    <Link to={props.to} className="noDecoration colorCharcoal">
      <div className="pointer horizontalMargin25px">{props.title}</div>
    </Link>
  )
}

export default HeaderLink; 
