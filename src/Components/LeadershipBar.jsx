import React from 'react';

import '../styles/Main.css';
import '../styles/Leadership.css';

const LeadershipBar = (props) => {
  let subteams = props.subteams;

  return (
    <div>
      {
        subteams.map((subteam, i) =>
          <div className="displayFlex" key={i}>
            <div className="flexColumnAlignCenter">
              <div className={`${props.selectedSubteam === subteam ? 'bgCharcoal' : null}
                leadershipCircle horizontalMargin10px pointer`} onClick={() => props.goToSubteam(subteam)} />
              {(i !== subteams.length - 1) ? <div className="leadershipLine"></div> : null}
            </div>

            <div className={`${props.selectedSubteam === subteam
              ? 'colorCharcoal' : 'colorDisabled'} textUppercase fontSize14px horizontalMargin10px pointer`}
              onClick={() => props.goToSubteam(subteam)}
            >{subteam}</div>
          </div>
        )
      }
    </div>
  )
}

export default LeadershipBar; 
