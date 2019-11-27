import React from 'react';
import '../../main.css';
import './Leadership.css';

import withScreenSize from '../HOC/ScreenSize';
import PageTitle from '../Util/PageTitle';
import LeadershipBar from './LeadershipBar';
import BoardMember from './BoardMember';

const boardMemberArray = require('./BoardMembers.js');
const subteamMap = require('../Util/subteamMap');

class Leadership extends React.Component {
  constructor(props) {
    super(props);

    // Parent div of all the board members.
    this.boardMembersRef = React.createRef();

    this.buildHeightArray = this.buildHeightArray.bind(this);
    this.getSubteamInFocus = this.getSubteamInFocus.bind(this);
    this.goToSubteam = this.goToSubteam.bind(this);

    this.state = {
      automaticScroll: false,
      divHeight: 0,
      selectedSubteam: subteamMap.get(boardMemberArray[0].position),
      heightArray: [], // Stores offsetTop position of member as well member object.
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.buildHeightArray);

    this.buildHeightArray();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.buildHeightArray, false);
  }

  buildHeightArray() {
    const MARGIN_BOTTOM = 25; // For each board member div.

    let boardMembersRef = this.boardMembersRef.current;

    // Total height of the parent div of the board members.
    let divHeight = window.innerHeight - boardMembersRef.offsetTop;

    let heightArray = [];
    let arrLength = boardMembersRef.children.length;

    for (let i = 0; i < arrLength; i++) {
      let child = boardMembersRef.children[i];

      let offsetTop;

      if (i === 0) offsetTop = child.offsetHeight + MARGIN_BOTTOM;
      else offsetTop = heightArray[i - 1][0] + child.offsetHeight + MARGIN_BOTTOM;

      let member = boardMemberArray[i];

      heightArray.push([offsetTop, member]);
    }

    this.setState({ heightArray: heightArray, divHeight: divHeight });
  }

  getSubteamInFocus() {
    if (this.state.automaticScroll) return; // Don't scroll if already using JS scrollIntoView function.

    let scrollPosition = this.boardMembersRef.current.scrollTop;
    let heightArray = this.state.heightArray;

    let i = 0;

    while (i < heightArray.length) {
      if (scrollPosition < heightArray[i][0]) break;

      i++;
    }

    let member = boardMemberArray[i];

    this.setState({ selectedSubteam: subteamMap.get(member.position) });
  }

  goToSubteam(subteam) {
    let heightArray = this.state.heightArray;

    for (let i = 0; i < heightArray.length; i++) {
      let member = heightArray[i][1];

      if (subteamMap.get(member.position) === subteam) {
        let ID = member.name.toLowerCase().replace(' ', '');
        let element = document.getElementById(ID);

        this.setState({
          selectedSubteam: subteam,
          automaticScroll: true
        }, () => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => { this.setState({ automaticScroll: false }) }, 1000);
        });

        break;
      }
    }
  }

  isSafariBrowser() {
    let userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.indexOf('safari') !== -1 && userAgent.indexOf('chrome') === -1) {
      return true;
    }

    return false;
  }

  render() {
    let breakpoint = this.props.breakpoint;

    let subteams = [];
    let subteamSet = new Set();

    let boardMembers = [];
    let i = 0;

    for (let boardMember of boardMemberArray) {
      let subteam = subteamMap.get(boardMember.position);

      if (!subteamSet.has(subteam)) {
        subteams.push(subteam);
        subteamSet.add(subteam);
      }

      boardMembers.push(
        <BoardMember person={boardMember} key={i} />
      )

      i += 1;
    }

    let boardMembersClasses = breakpoint !== 'M' ? 'horizontalMargin50px overflowScroll' : '';
    let boardMembersPosition = breakpoint !== 'D' ? 'positionAbsolute overflowScroll' : '';

    let isSafariBrowser = this.isSafariBrowser();
    let updatedHeight = isSafariBrowser ? null : this.state.divHeight;

    return (
      <div>
        <PageTitle title="2019-2020 Executive Board Members" />

        <div className={`flexSpaceBetween fontFamilyRalewayB marginTop25px marginAuto
          ${breakpoint === 'D' ? 'maxWidth75P' : ''}`}>

          {
            breakpoint === 'D' && !isSafariBrowser ?
              <LeadershipBar goToSubteam={this.goToSubteam}
                selectedSubteam={this.state.selectedSubteam}
                subteams={subteams} />
              :
              null
          }

          <div ref={this.boardMembersRef}
            className={`displayFlex flexColumn ${boardMembersClasses} ${boardMembersPosition}`}
            style={{ height: updatedHeight }} onScroll={this.getSubteamInFocus}>
            {boardMembers}
          </div>
        </div>
      </div>
    )
  };
};

export default withScreenSize(Leadership);
