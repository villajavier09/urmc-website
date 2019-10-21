import React from 'react';
import '../../main.css';
import './Leadership.css';

import withScreenSize from '../HOC/ScreenSize';
import PageTitle from '../Util/PageTitle';
import LeadershipBar from './LeadershipBar';
import BoardMember from './BoardMember';

class Leadership extends React.Component {
  constructor(props) {
    super(props);

    this.boardMembersRef = React.createRef();

    this.getMemberInFocus = this.getMemberInFocus.bind(this);
    this.buildHeightArray = this.buildHeightArray.bind(this);
    this.goToMember = this.goToMember.bind(this);

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
      heightArray: [],
      lastChildMarginBottom: 0
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.buildHeightArray);
    setTimeout(() => { this.buildHeightArray() }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.buildHeightArray);
  }

  buildHeightArray() {
    const MARGIN_BOTTOM = 25;

    let divHeight = window.innerHeight - this.boardMembersRef.current.offsetTop;

    let arr = [];
    let arrLength = this.boardMembersRef.current.children.length;

    let i = 0;

    for (let child of this.boardMembersRef.current.children) {
      let offsetTop;

      if (i === 0) offsetTop = child.offsetHeight + MARGIN_BOTTOM;

      else if (i === arrLength - 1) {
        offsetTop = child.offsetHeight + this.state.lastChildMarginBottom;

        if (child.offsetHeight < this.state.divHeight) {
          let marginBottom = this.state.divHeight - child.offsetHeight;
          offsetTop += marginBottom;

          this.setState({ lastChildMarginBottom: marginBottom }, () => {
            console.log(this.state)
          });
        } else {
          offsetTop += MARGIN_BOTTOM;
        }
      }

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
    let scrollPosition = this.boardMembersRef.current.scrollTop;
    let heightArray = this.state.heightArray;

    let i = 0;

    while (i < heightArray.length) {
      if (scrollPosition < heightArray[i][0]) break;

      i++;
    }

    let member = heightArray[i][1];

    this.setState({ selectedSubteam: this.subteamMap.get(member.position) });
  }

  findReactElement(node) {
    for (var key in node) {
      if (key.startsWith("__reactInternalInstance$")) {
        return node[key]._debugOwner.stateNode;
      }
    }

    return null;
  }

  goToMember(subteam) {
    let heightArray = this.state.heightArray;

    let i = 0;

    while (i < heightArray.length) {
      if (this.subteamMap.get(heightArray[i][1].position) === subteam) {
        if (i === 0) this.boardMembersRef.current.scrollTop = 0;
        else this.boardMembersRef.current.scrollTop = heightArray[i - 1][0];

        this.setState({ selectedSubteam: subteam });
        break;
      }

      i++;
    }
  }

  render() {

    var Rami = {
      name: 'Rami Abdou',
      major: 'Computer Science',
      year: '20',
      socials: new Map([['I', null], ['F', null], ['L', 'https://www.linkedin.com/in/rami-abdou/']]),
      position: 'Co-President',
      bio: `My major is Computer Science, and I am currently serving as one of URMC’s Co-Presidents. I
      want to merge my passion for coding and product development with my love for the URM
      community, especially at Cornell. I hope that I can take what I’ve learned in my CIS courses
      and use it to inspire others to create community impact. If you at all related to my interests
      and goals, please reach out to me because I have a dope side project in the works right now!`,
      askMe: ['Machine Learning', 'Basketball', 'My Story', 'Being Egyptian',
        'Entrepreneurship', "Being Jehron's BFF"]
    }

    var Rami2 = {
      name: 'Rami Abdou',
      major: 'Computer Science',
      year: '20',
      socials: new Map([['I', null], ['F', 'https://www.linkedin.com/in/rami-abdou/'], ['L', 'https://www.linkedin.com/in/rami-abdou/']]),
      position: 'Co-Events Chair',
      bio: `My major is Computer Science, and I am currently serving as one of URMC’s Co-Presidents. I
      want to merge my passion for coding and product development with my love for the URM
      community, especially at Cornell. I hope that I can take what I’ve learned in my CIS courses
      and use it to inspire others to create community impact. If you at all related to my interests
      and goals, please reach out to me because I have a dope side project in the works right now!`,
      askMe: ['Machine Learning', 'Basketball', 'My Story', 'Being Egyptian',
        'Entrepreneurship', "Being Jehron's BFF"]
    }

    var Rami3 = {
      name: 'Rami Abdou',
      major: 'Computer Science',
      year: '20',
      socials: new Map([['I', null], ['F', 'https://www.linkedin.com/in/rami-abdou/'], ['L', 'https://www.linkedin.com/in/rami-abdou/']]),
      position: 'Co-Outreach Chair',
      bio: `My major is Computer Science, and I am currently serving as one of URMC’s Co-Presidents. I
      want to merge my passion for coding and product development with my love for the URM
      community, especially at Cornell. I hope that I can take what I’ve learned in my CIS courses
      and use it to inspire others to create community impact. If you at all related to my interests
      and goals, please reach out to me because I have a dope side project in the works right now!`,
      askMe: ['Machine Learning', 'Basketball', 'My Story', 'Being Egyptian',
        'Entrepreneurship', "Being Jehron's BFF"]
    }

    var Rami4 = {
      name: 'Rami Abdou',
      major: 'Computer Science',
      year: '20',
      socials: new Map([['I', null], ['F', 'https://www.linkedin.com/in/rami-abdou/'], ['L', 'https://www.linkedin.com/in/rami-abdou/']]),
      position: 'Co-Design Chair',
      bio: `My major is Computer Science, and I am currently serving as one of URMC’s Co-Presidents. I
      want to merge my passion for coding and product development with my love for the URM
      community, especially at Cornell. I hope that I can take what I’ve learned in my CIS courses
      and use it to inspire others to create community impact. If you at all related to my interests
      and goals, please reach out to me because I have a dope side project in the works right now!`,
      askMe: ['Machine Learning', 'Basketball', 'My Story', 'Being Egyptian',
        'Entrepreneurship', "Being Jehron's BFF"]
    }

    var Rami5 = {
      name: 'Rami Abdou',
      major: 'Computer Science',
      year: '20',
      socials: new Map([['I', null], ['F', 'https://www.linkedin.com/in/rami-abdou/'], ['L', 'https://www.linkedin.com/in/rami-abdou/']]),
      position: 'Professional Development Chair',
      bio: `My major is Computer Science, and I am currently serving as one of URMC’s Co-Presidents. I
      want to merge my passion for coding and product development with my love for the URM
      community, especially at Cornell. I hope that I can take what I’ve learned in my CIS courses
      and use it to inspire others to create community impact. If you at all related to my interests
      and goals, please reach out to me because I have a dope side project in the works right now!`,
      askMe: ['Machine Learning', 'Basketball', 'My Story', 'Being Egyptian',
        'Entrepreneurship', "Being Jehron's BFF"]
    }

    let boardMembersClasses = this.props.breakpoint !== 'M' ? 'horizontalMargin50px overflowScroll' : '';
    let boardMembersPosition = this.props.breakpoint !== 'D' ? 'positionAbsolute overflowScroll' : '';
    let bodyClasses = this.props.breakpoint === 'D' ? 'maxWidth75P' : '';

    return (
      <div>
        <PageTitle title="2019-2020 Executive Board Members" />

        <div className={`flexSpaceBetween fontFamilyRalewayB marginTop25px marginAuto
          ${bodyClasses}`}>

          {
            this.props.breakpoint === 'D' ?
              <LeadershipBar goToMember={this.goToMember} selectedSubteam={this.state.selectedSubteam} subteams={this.subteams} />
              :
              null
          }

          <div ref={this.boardMembersRef} className={`displayFlex flexColumn
            ${boardMembersClasses} ${boardMembersPosition}`} onScroll={this.getMemberInFocus}
            style={{ height: this.state.divHeight }}>
            <BoardMember person={Rami} />
            <BoardMember person={Rami2} />
            <BoardMember person={Rami3} />
            <BoardMember person={Rami4} />
            <BoardMember person={Rami5} />
            <BoardMember person={Rami} />
            <BoardMember person={Rami} />
          </div>
        </div>
      </div>
    )
  };
};

export default withScreenSize(Leadership);
