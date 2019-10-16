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
      heightArray: []
    }
  }

  componentDidMount() {

    console.log(this.boardMembersRef.current.offsetTop)
    console.log(this.boardMembersRef)

    let heightArray = this.buildHeightArray();
    console.log(heightArray)

    this.setState({
      divHeight: window.innerHeight - this.boardMembersRef.current.offsetTop,
      heightArray: heightArray
    });
  }

  buildHeightArray() {
    const OFFSET_TOP = this.boardMembersRef.current.offsetTop;
    const MARGIN_BOTTOM = 25;

    let arr = [];
    let i = 0

    for (let child of this.boardMembersRef.current.children) {
      let offsetTop = i > 0 ? arr[i - 1] + child.offsetHeight + MARGIN_BOTTOM :
        child.offsetHeight + MARGIN_BOTTOM;

      console.log(child.offsetHeight)

      arr.push(offsetTop);

      i++;
    }

    return arr;
  }

  getMemberInFocus() {
    let scrollTop = this.boardMembersRef.current.scrollTop;
    let heightArray = this.state.heightArray;

    let i = 0;

    let arrLength = heightArray.length;

    while (i < arrLength) {
      if (scrollTop <= heightArray[i]) break;
      i++;
    }

    console.log(scrollTop);
    console.log(heightArray)

    console.log("YER")
    console.log(i)
    // console.log(this.boardMembersRef.current.children[i])


    // [500, 1000, 1500, 2000], 300
    // return arr_length - 1
  }

  // handleSizeChange() {
  //   let arr = this.buildHeightArray();

  //   let closestIndex = this.getClosestIndex(arr, this.boardMembersRef.current.scrollTop);
  //   let child = this.boardMembersRef.current.children[closestIndex];
  //   let position = child.children[1].children[0].innerHTML;

  //   this.setState({
  //     selectedSubteam: this.subteamMap.get(position)
  //   });
  // }

  // getClosestIndex(arr, num) {
  //   let i = 0;

  //   let arr_length = arr.length;

  //   while (i < arr_length - 1) {
  //     if (num >= arr[i] && num <= arr[i + 1]) return i;
  //     i++;
  //   }

  //   return arr_length - 1
  // }

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
      position: 'Co-Outreach Chair',
      bio: `My major is Computer Science, and I am currently serving as one of URMC’s Co-Presidents. I
      want to merge my passion for coding and product development with my love for the URM
      community, especially at Cornell. I hope that I can take what I’ve learned in my CIS courses
      and use it to inspire others to create community impact. If you at all related to my interests
      and goals, please reach out to me because I have a dope side project in the works right now!`,
      askMe: ['Machine Learning', 'Basketball', 'My Story', 'Being Egyptian',
        'Entrepreneurship', "Being Jehron's BFF"]
    }

    let boardMembersClasses = this.props.breakpoint !== 'M' ? 'horizontalMargin50px overflowScroll' : '';
    let bodyClasses = this.props.breakpoint === 'D' ? 'maxWidth75P' : '';

    return (
      <div>
        <PageTitle title="2019-2020 Executive Board Members" />

        <div className={`flexSpaceBetween fontFamilyRalewayB marginTop25px marginAuto
          ${bodyClasses}`}>

          {
            this.props.breakpoint === 'D' ?
              <LeadershipBar selectedSubteam={this.state.selectedSubteam} subteams={this.subteams} />
              :
              null
          }

          <div ref={this.boardMembersRef} className={`displayFlex flexColumn
            ${boardMembersClasses}`} onScroll={this.getMemberInFocus}
            style={{ height: this.state.divHeight }}>
            <BoardMember person={Rami} />
            <BoardMember person={Rami} />
            <BoardMember person={Rami2} />
            <BoardMember person={Rami2} />
            <BoardMember person={Rami2} />
            <BoardMember person={Rami} />
            <BoardMember person={Rami} marginBottom={this.state.divMarginBottom} />
          </div>
        </div>
      </div>
    )
  };
};

export default withScreenSize(Leadership);
