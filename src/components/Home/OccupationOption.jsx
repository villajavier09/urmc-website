import React from 'react';

import './Home.css';
import '../../main.css';

const OccupationOption = (props) => {
  return (
    <div className="flexSpaceBetween flexAlignCenter verticalMargin15px">
      <div className="fontSize14px">{props.title}</div>
      <div className="checkbox borderGrey1px marginLeft15px"></div>
    </div>
  )
}

export default OccupationOption;
