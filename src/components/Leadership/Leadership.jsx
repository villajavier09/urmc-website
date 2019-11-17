import React from 'react';
import '../../main.css';
import './Leadership.css';

import withScreenSize from '../HOC/ScreenSize';
import PageTitle from '../Util/PageTitle';
import LeadershipBar from './LeadershipBar';
import BoardMember from './BoardMember';
const boardMemberMap = require('./BoardMembers.js');

console.log(boardMemberMap);

class Leadership extends React.Component {
  constructor(props) {
    super(props);

    // Parent div of all the board members.
    this.boardMembersRef = React.createRef();

    this.getMemberInFocus = this.getMemberInFocus.bind(this);
    this.buildHeightArray = this.buildHeightArray.bind(this);
    this.goToSubteam = this.goToSubteam.bind(this);

    this.subteams = ['Presidents', 'Events', 'Outreach', 'Design', 'Professional',
      'Corporate', 'Operations', 'Secretary', 'Mentorship', 'Academic'];

    this.subteamMap = new Map([['Co-President', 'Presidents'], ['Co-Events Chair', 'Events'],
    ['Co-Outreach Chair', 'Outreach'], ['Co-Design Chair', 'Design'],
    ['Professional Development Chair', 'Professional'], ['Co-Corporate Chair', 'Corporate'],
    ['Operations Chair', 'Operations'], ['Secretary', 'Secretary'], ['Co-Mentorship Chair', 'Mentorship'],
    ['CS Academic Chair', 'Academic'], ['IS Academic Chair', 'Academic']])

    this.state = {
      divHeight: 0,
      selectedSubteam: 'Presidents',
      memberInFocus: 1,
      heightArray: [], // Stores offsetTop position of member as well member object.
      lastChildMarginBottom: 0,
      automaticScroll: false
    }

    this.NUM_BOARD_MEMBERS = 6;
  }

  componentDidMount() {
    window.addEventListener("resize", this.buildHeightArray);
    this.buildHeightArray();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.buildHeightArray);
  }

  buildHeightArray() {
    const MARGIN_BOTTOM = 25; // For each board member div.

    // Total height of the parent div of the board members.
    let divHeight = window.innerHeight - this.boardMembersRef.current.offsetTop;

    let arr = [];
    let arrLength = this.boardMembersRef.current.children.length;

    let i = 0;

    for (let child of this.boardMembersRef.current.children) {
      let offsetTop;

      // Case: First Child
      if (i === 0) offsetTop = child.offsetHeight + MARGIN_BOTTOM;

      // Case: Last Child
      else if (i === arrLength - 1) {
        offsetTop = child.offsetHeight + this.state.lastChildMarginBottom;

        if (child.offsetHeight < this.state.divHeight) {
          let marginBottom = this.state.divHeight - child.offsetHeight;
          offsetTop += marginBottom;

          this.setState({ lastChildMarginBottom: marginBottom });
        } else {
          offsetTop += MARGIN_BOTTOM;
        }
      }

      // Case: All Other Children
      else offsetTop = arr[i - 1][0] + child.offsetHeight + MARGIN_BOTTOM;

      let member = this.findReactElement(child).props.person;
      arr.push([offsetTop, member]);

      i++;
    }

    this.setState({
      heightArray: arr,
      divHeight: divHeight
    });
  }

  getMemberInFocus() {
    if (this.state.automaticScroll) return;

    let scrollPosition = this.boardMembersRef.current.scrollTop;
    let heightArray = this.state.heightArray;

    let i = 0;

    while (i < heightArray.length) {
      if (scrollPosition < heightArray[i][0]) break;

      i++;
    }

    let member = heightArray[i][1];

    this.setState({
      selectedSubteam: this.subteamMap.get(member.position),
      memberInFocus: member.id
    });
  }

  findReactElement(node) {
    for (var key in node) {
      if (key.startsWith("__reactInternalInstance$")) {
        return node[key]._debugOwner.stateNode;
      }
    }

    return null;
  }

  goToSubteam(subteam) {
    let heightArray = this.state.heightArray;

    let i = 0;

    while (i < heightArray.length) {
      if (this.subteamMap.get(heightArray[i][1].position) === subteam) {
        let element = document.getElementById(heightArray[i][1].id);

        this.setState({
          selectedSubteam: subteam,
          memberInFocus: heightArray[i][1].id,
          automaticScroll: true
        }, () => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' }, () => {
            this.setState({ automaticScroll: false });
          });
        });
        break;
      }

      i++;
    }
  }

  render() {

    let breakpoint = this.props.breakpoint;

    let boardMembers = [];
    let i = 1;

    console.log(boardMembers)

    while (i <= this.NUM_BOARD_MEMBERS) {
      console.log(boardMemberMap[i]);

      boardMembers.push(
        <BoardMember person={boardMemberMap[i]} key={i} />
      )
      i += 1;
    }

    let boardMembersClasses = breakpoint !== 'M' ? 'horizontalMargin50px overflowScroll' : '';
    let boardMembersPosition = breakpoint !== 'D' ? 'positionAbsolute overflowScroll' : '';
    let bodyClasses = breakpoint === 'D' ? 'maxWidth75P' : '';

    return (
      <div>
        <PageTitle title="2019-2020 Executive Board Members" />

        <div className={`flexSpaceBetween fontFamilyRalewayB marginTop25px marginAuto
          ${bodyClasses}`}>

          {
            breakpoint === 'D' ?
              <LeadershipBar goToSubteam={this.goToSubteam} selectedSubteam={this.state.selectedSubteam} subteams={this.subteams} />
              :
              null
          }

          <div ref={this.boardMembersRef} className={`displayFlex flexColumn
            ${boardMembersClasses} ${boardMembersPosition}`}
            style={{ height: this.state.divHeight }} onScroll={this.getMemberInFocus}>
            {boardMembers}
          </div>
        </div>
      </div>
    )
  };
};

export default withScreenSize(Leadership);
