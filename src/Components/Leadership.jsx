import React from 'react';
import '../styles/main.css';
import '../styles/Leadership.css';

import withScreenSize from './HOC/ScreenSize';
import PageTitle from './Common/PageTitle';
import LeadershipBar from './LeadershipBar';
import BoardMember from './BoardMember';

const subteamMap = require('./Util/subteamMap');

const spinner = require('../assets/spinner.png');

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
      selectedSubteam: '',
      heightArray: [], // Stores offsetTop position of member as well member object.
      boardMembers: []
    }
  }

  async componentDidMount() {
    window.addEventListener("resize", this.buildHeightArray);

    const URL = process.env.NODE_ENV === 'development' ?
      'http://127.0.0.1:8080' : 'https://urmc-website-api.herokuapp.com';

    let response = await fetch(`${URL}/board-members`);

    response.json().then((members) => {
      let orderedMembers = this.orderBoardMembers(members);

      this.setState({
        boardMembers: orderedMembers,
        selectedSubteam: subteamMap.get(orderedMembers[0].position)
      }, () => {
        this.buildHeightArray();
      });
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.buildHeightArray, false);
  }

  orderBoardMembers(memberArray) {
    let memberMap = new Map();

    for (let member of memberArray) {
      let subteam = subteamMap.get(member.position);

      if (memberMap.has(subteam)) {
        let valueArray = memberMap.get(subteam);
        valueArray.push(member);

        memberMap.set(subteam, valueArray);
      } else memberMap.set(subteam, [member]);
    }

    let resultArray = [];

    for (let members of memberMap.values()) {
      if (members[0].position === 'Co-President') resultArray = members.concat(resultArray);
      else resultArray = resultArray.concat(members);
    }

    return resultArray;
  }

  buildHeightArray() {
    const MARGIN_BOTTOM = 25; // For each board member div.

    let boardMembersRef = this.boardMembersRef.current;

    // Total height of the parent div of the board members.
    let divHeight = window.innerHeight - boardMembersRef.offsetTop;

    let heightArray = [];
    let arrLength = boardMembersRef.children.length;

    if (arrLength === 0) return;

    for (let i = 0; i < arrLength; i++) {
      let child = boardMembersRef.children[i];

      console.log(child);

      let offsetTop;

      if (i === 0) offsetTop = child.offsetHeight + MARGIN_BOTTOM;
      else offsetTop = heightArray[i - 1][0] + child.offsetHeight + MARGIN_BOTTOM;

      let member = this.state.boardMembers[i];
      console.log(member);

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

    let member = this.state.boardMembers[i];

    this.setState({ selectedSubteam: subteamMap.get(member.position) });
  }

  goToSubteam(subteam) {
    let heightArray = this.state.heightArray;

    console.log(heightArray)

    for (let i = 0; i < heightArray.length; i++) {
      let member = heightArray[i][1];

      console.log(member);

      if (subteamMap.get(member.position) === subteam) {
        let ID = member.name.toLowerCase().replace(' ', '');
        let element = document.getElementById(ID);

        this.setState({
          selectedSubteam: subteam,
          automaticScroll: true
        }, () => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          let boardMembersRef = this.boardMembersRef.current;

          setTimeout(() => {
            if ((boardMembersRef.offsetTop + boardMembersRef.scrollTop) === element.offsetTop) {
              this.setState({ automaticScroll: false })
            } else {
              setTimeout(() => {
                this.setState({ automaticScroll: false })
              }, 1000);
            }
          }, 1000);
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

    for (let boardMember of this.state.boardMembers) {
      let subteam = subteamMap.get(boardMember.position);

      if (!subteamSet.has(subteam)) {
        subteamSet.add(subteam);
        subteams.push(subteam);
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
            {
              this.state.boardMembers.length > 0 ?
                boardMembers
                :
                <img src={spinner} className="spin" alt="Spinner" />
            }
          </div>
        </div>
      </div>
    )
  };
};

export default withScreenSize(Leadership);
