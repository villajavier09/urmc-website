import React from 'react';
import { Link } from 'react-router-dom';
import '../../main.css';
import './Admin.css';

import GoogleLogin from 'react-google-login';
import AuthService from '../Services/AuthService';

const charcoalX = require('../../assets/charcoal-x-icon.png');
const fingerprint = require('../../assets/fingerprint.png');

const AdminLogin = (props) => {
  return (
    <div className="width350px marginAuto boxShadow borderRadius10px padding25px
      fontFamilyRalewayB">
        <div className="flexSpaceBetween flexAlignCenter marginBottom25px">
          <div className="colorCharcoal fontSize20px">E-Board Member <span className="colorGold">Login</span></div>
          <Link to='/' onClick={() => props.updateCurrentPage('Home')}>
            <img src={charcoalX} className="charcoalXIcon" alt="Charcoal X Icon"/>
          </Link>
        </div>

        <GoogleLogin
          clientId='710389758047-ghdt5r42cgo83q96th9ttloo21k5eqqp.apps.googleusercontent.com'
          buttonText="Sign In with Google"
          className="googleLoginButton"
          icon={false}
          onSuccess={props.successGoogle}
        />
      </div>
  )
}

const MemberDashboard = (props) => {

  let members = [];
  let i = 0;

  for (let member of props.members) {

    members.push(
      <div key={i}>
          <div className="displayFlex flexAlignCenter fontFamilyNovecento verticalMargin15px">
            <div className="width33P fontSize13px colorLightGrey">{member.name}</div>
            <div className="width33P fontSize13px colorLightGrey">{member.position}</div>
            <div className="width33P flexSpaceBetween">
              <div className="visibilityHidden"></div>
              <div className="editButton fontFamilyRalewayB textUppercase flexAlignSelfEnd"
              onClick={() => props.setMember(member)}>Edit</div>
            </div>
          </div>

          <div className="separator"></div>
        </div>
    )

    i += 1;
  }

  return (
    <div className="width60P marginAuto borderRadius boxShadow paddingBottom50px">
      <div className="colorWhite padding15px gradient fontFamilyRalewayB borderRadius
      fontSize18px verticalPadding25px">
        Executive Board Members
      </div>

      <div className="padding15px">
        <div className="displayFlex flexAlignCenter fontFamilyNovecento marginBottom25px">
          <div className="width33P fontSize14px colorGold">Name</div>
          <div className="width33P fontSize14px colorGold">Position</div>
        </div>

        {members}
      </div>
    </div>
  )
}

const FormItem = (props) => {
  return (
    <div className="verticalMargin25px">
      <div className="fontFamilyNovecento fontSize12px colorCharcoal marginBottom10px">{props.title}</div>

      { props.name !== 'Biography' ?
        <input type="text" className="noMarginLeft noPadding fontFamilyRalewayB colorDisabled noBorder noBoxShadow inputNoFocus fontSize13px"
        defaultValue={props.value} onChange={props.onChange} name={props.name} />
        :
        <textarea type="text" className="noMarginLeft noPadding fontFamilyRalewayB colorDisabled noBorder noBoxShadow inputNoFocus fontSize13px"
        defaultValue={props.value} onChange={props.onChange} name={props.name} />
      }

      <div className="formItemSeparator width80P"></div>
    </div>
  )
}

class EditMemberModal extends React.Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);

    this.state = {
      name: '',
      bio: '',
      askMe: [],
      position: '',
      major: '',
      year: ''
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async submitForm(event) {
    event.preventDefault();
    this.props.toggleEditModal();

    console.log("SUBMITTED")

    const URL = process.env.NODE_ENV === 'development' ?
      'http://127.0.0.1:8080' : 'https://urmc-website-api.herokuapp.com'

    let body = {
      name: this.state.name,
      bio: this.state.bio,
      askMe: this.state.askMe,
      position: this.state.position,
      major: this.state.major,
      year: this.state.year
    }

    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(body)
    }

    let response = await fetch(`${URL}/board-members/${this.props.member._id}`, options);

    console.log(response);

  }

  render() {

    let formSections = [["Name", "name"], ["Position", "position"], ["Major", "major"],
    ["Graduation Year", "year"], ["Biography", "bio"], ["Ask Me Abouts", "askMe"]];
    let formItems = [];

    for (let i = 0; i < formSections.length; i++) {
      let member = this.props.member;

      formItems.push(
        <FormItem onChange={this.onChange} key={i} name={formSections[i][1]} title={formSections[i][0]} value={member[formSections[i][1]]} member={member} />
      )
    }

    return (
      <div id="editMemberModal" className="width40P editModal bgWhite minWidth350px lightBoxShadow borderRadius5px">
        <div className="fontFamilyRalewayB fontSize20px padding25px">Edit <span className="colorGold">{this.props.member.name}'s Profile</span></div>

        <form id="editMemberForm" className="padding25px" onSubmit={this.submitForm}>
          {formItems}
        </form>  

        <div className="flexSpaceBetween">
          <div className="fontFamilyNovecento colorWhite bgGrey2 width50P verticalPadding15px textAlignCenter pointer"
          onClick={() => this.props.toggleEditModal()}>Cancel</div>
          <button type="submit" className="fontFamilyNovecento colorWhite bgGold width50P verticalPadding15px textAlignCenter pointer"
          form="editMemberForm">Update</button>
        </div>
      </div>
    )
  }
}

class Admin extends React.Component {

  constructor(props) {
    super(props);

    this.Auth = new AuthService();
    this.logout = this.logout.bind(this);
    this.setMember = this.setMember.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);

    this.state = {
      profile: this.Auth.getProfile(),
      members: [],
      boardMember: null,
      showEditModal: false
    }
  }

  componentWillMount() {
    if (this.state.profile !== null) {
      this.fetchBoardMembers();
    }
  }

  successGoogle = async (response) => {
    let success = await this.Auth.signIn(response.accessToken, response.profileObj);

    if (success) {
      let profile = this.Auth.getProfile();

      this.setState({ profile: profile }, () => {
        this.fetchBoardMembers();
      });
    }
  };

  async fetchBoardMembers () {
    const URL = process.env.NODE_ENV === 'development' ?
      'http://127.0.0.1:8080' : 'https://urmc-website-api.herokuapp.com';

    let response = await fetch(`${URL}/board-members`);

    response.json().then((members) => {
      this.setState({ members: members });
    });
  }

  logout () {
    this.Auth.logout();
    this.setState({ profile: null });
  }

  setMember(member) {
    this.props.toggleOverlay();
    console.log(member);
    this.setState({ boardMember: member}, () => this.toggleEditModal());
  }

  toggleEditModal () {
    this.setState({ showEditModal: !this.state.showEditModal });
  }

  render() {
    let isProfilePresent = this.state.profile !== null;

    return (
      <div>

        <div className="flexSpaceBetween flexAlignCenter width90P marginAuto paddingTop15px">
          <Link to='/'>
            <img src={fingerprint} className="width50px" alt="URMC Fingerprint Logo"
              onClick={() => this.props.updateCurrentPage('Home')} />
          </Link>

          {
            isProfilePresent ?

            <div className="flexColumn flexAlignEnd">
              <div className="fontFamilyRalewayB fontSize20px colorCharcoal marginBottom10px">Hi, <span className="colorGold">{this.state.profile.givenName}!</span></div>
              <div className="colorCharcoal textAlignCenter horizontalPadding8px verticalPadding5px
              borderCharcoal1px borderRadius5px fontFamilyNovecento fontSize12px fitWidth
              pointer" onClick={this.logout}>Log Out</div>
            </div>

            :

            null
          }
        </div>

      {
        isProfilePresent ?
        <MemberDashboard members={this.state.members} setMember={this.setMember} toggleEditModal={this.toggleEditModal} />
        :
        <AdminLogin updateCurrentPage={this.props.updateCurrentPage}
          successGoogle={this.successGoogle} />
      }

      {
        isProfilePresent && this.state.boardMember && this.state.showEditModal ?
        <EditMemberModal member={this.state.boardMember} toggleEditModal={this.toggleEditModal}/>
        :
        null
      }

      </div>
      
    )
  }
}

export default Admin;
