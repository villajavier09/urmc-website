import React from 'react';
import '../../main.css';
import './Leadership.css';

class LeadershipBar extends React.Component {
  render() {
    let subteams = this.props.subteams;

    return (
      <div>
        {
          subteams.map((subteam, i) =>
            <div className="displayFlex" key={subteam}>
              <div className="displayFlex flexColumn flexAlignCenter">
                <div className="leadershipCircle horizontalMargin10px"></div>
                {
                  (i !== subteams.length - 1) ?
                    <div className="leadershipLine"></div>
                    :
                    null
                }
              </div>

              <div className={(this.props.selectedSubteam === subteam
                ? 'colorCharcoal' : 'colorDisabled') + " textUppercase  fontSize14px horizontalMargin10px pointer"}
              >{subteam}</div>
            </div>
          )
        }
      </div>
    )
  };
};

export default LeadershipBar; 
