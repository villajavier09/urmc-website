import React from 'react';

const SocialMedia = (props) => {
  return (
    <a href={props.href} target="_blank">
      <img src={props.icon} className="socialMediaIcon horizontalMargin5px pointer" alt={props.alt} />
    </a>
  )
}

export default SocialMedia; 
