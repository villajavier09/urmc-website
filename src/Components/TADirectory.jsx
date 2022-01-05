/**
 * @fileoverview The TA Directory Component which shows all of our URM
 * TA's, all details are fetched from an API except for their headshots.
 * Two of the largest subcomponents are LeadershipBar and the BoardMember
 * components.
 */

import React from 'react';

import '../styles/main.css';
import '../styles/Misc.css';


import TA from './TA';
import PageTitle from './Common/PageTitle';
import withScreenSize from './HOC/ScreenSize';

const classMap = require('../util/classMap');
const { serverURL } = require('../util/config');
const spinner = require('../assets/spinner.png');


/******************************************************************************/

const TAStatement = () => {
  return (
    <div className="fontFamilyRaleway">
      This directory is meant to show all the members of URMC who currently
      serve as TA's for classes. Feel free to reach out to them to learn
      about when their office hours are and for help on the classes they TA for.
    </div>
  )
}

/******************************************************************************/

const Line = (props) => {
  return (
    <div>
      {props.i !== props.length - 1 ? <div className="leadershipLine" /> : null}
    </div>
  )
}

/******************************************************************************/

const Circle = (props) => {
  let subteam = props.subteam;

  return (
    <div className={`${props.selectedSubteam === subteam ? 'bgCharcoal' : null}
    leadershipCircle horizontalMargin10px pointer`} onClick={() => props.goToSubteam(subteam)} />
  )
}

/******************************************************************************/

const SubteamTitle = (props) => {
  return (
    <div className={`${props.selectedSubteam === props.subteam
      ? 'colorCharcoal' : 'colorDisabled'} textUppercase fontSize14px horizontalMargin10px pointer`}
      onClick={() => props.goToSubteam(props.subteam)}
    >{props.subteam || 'Other'}</div>
  )
}

/******************************************************************************/

const LeadershipBar = (props) => {
  let subteams = props.subteams;

  return (
    <div>
      {
        subteams.map((subteam, i) =>
          <div className="displayFlex" key={i}>
            <div className="flexColumnAlignCenter">
              <Circle selectedSubteam={props.selectedSubteam} goToSubteam={props.goToSubteam} subteam={subteam} />
              <Line i={i} length={subteams.length} />
            </div>

            <SubteamTitle selectedSubteam={props.selectedSubteam} goToSubteam={props.goToSubteam} subteam={subteam} />
          </div>
        )
      }
    </div>
  )
}

/******************************************************************************/

class TADirectory extends React.Component {
  constructor(props) {
    super(props);

    this.boardMembersRef = React.createRef();

    this.buildHeightArray = this.buildHeightArray.bind(this);
    this.getSubteamInFocus = this.getSubteamInFocus.bind(this);
    this.goToSubteam = this.goToSubteam.bind(this);

    this.state = {
      automaticScroll: false,
      boardMembers: [],
      divHeight: 0,
      heightArray: [], // Stores offsetTop position of member as well member object.
      selectedSubteam: ''
    }
  }

  /**
   * Fetch the board members from the database, order the board members, then
   * build the height array for the board members.
   */
  async componentDidMount() {
    window.addEventListener("resize", this.buildHeightArray);

    let response = await fetch(`${serverURL}/tadirectory`);

    response.json().then((members) => {
      let orderedMembers = this.orderBoardMembers(members);

      this.setState({
        boardMembers: orderedMembers,
        selectedSubteam: classMap.get(orderedMembers[0].position)
      }, () => {
        this.buildHeightArray();
      });
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.buildHeightArray, false);
  }

  /**
   * Order the board members by first putting the Presidents first and then
   * after that, put it alphabetically.
   *
   * @param {Array} memberArray -- The unordered executive board members.
   *
   * @returns {Array}
   */
  orderBoardMembers(memberArray) {
    let memberMap = new Map();

    for (let member of memberArray) {
      let subteam = classMap.get(member.position);

      if (memberMap.has(subteam)) {
        let valueArray = memberMap.get(subteam);
        valueArray.push(member);

        memberMap.set(subteam, valueArray);
      } else memberMap.set(subteam, [member]);
    }

    let resultArray = [];

    for (let members of memberMap.values()) {
      resultArray = resultArray.concat(members);
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

    this.setState({ selectedSubteam: classMap.get(member.position) });
  }

  goToSubteam(subteam) {
    let heightArray = this.state.heightArray;

    console.log(heightArray)

    for (let i = 0; i < heightArray.length; i++) {
      let member = heightArray[i][1];

      console.log(member);

      if (classMap.get(member.position) === subteam) {
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
      let subteam = classMap.get(boardMember.position);

      if (!subteamSet.has(subteam)) {
        subteamSet.add(subteam);
        subteams.push(subteam);
      }

      boardMembers.push(
        <TA person={boardMember} key={i} />
      )

      i += 1;
    }

    let boardMembersClasses = breakpoint !== 'M' ? 'horizontalMargin50px overflowScroll' : '';
    let boardMembersPosition = breakpoint !== 'D' ? 'positionAbsolute overflowScroll' : '';
    let isSafariBrowser = this.isSafariBrowser();
    let updatedHeight = isSafariBrowser ? null : this.state.divHeight;

    return (
      <div>
        <PageTitle title="URMC TAs 2021-2022" />
        <div className={`$textAlignCenter colorCharcoal fontSize14px`}>
          <TAStatement />
        </div>

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

/******************************************************************************/

export default withScreenSize(TADirectory);
