import React from 'react';
import '../../main.css';
import './Leadership.css';

class LeadershipBar extends React.Component {
  render() {
    let subteams = this.props.subteams;

    console.log(this.props);

    return (
      <div>
        {
          subteams.map((subteam, i) =>
            <div className="displayFlex" key={subteam}>
              <div className="displayFlex flexColumn flexAlignCenter">
                <div className={`${this.props.selectedSubteam === subteam ? 'bgCharcoal' : null}
                  leadershipCircle horizontalMargin10px pointer`} onClick={() => this.props.goToMember(subteam)}></div>
                {
                  (i !== subteams.length - 1) ?
                    <div className="leadershipLine"></div>
                    :
                    null
                }
              </div>

              <div className={(this.props.selectedSubteam === subteam
                ? 'colorCharcoal' : 'colorDisabled') + " textUppercase  fontSize14px horizontalMargin10px pointer"}
                onClick={() => this.props.goToSubteam(subteam)}
              >{subteam}</div>
            </div>
          )
        }
      </div>
    )
  };
};

export default LeadershipBar; 
