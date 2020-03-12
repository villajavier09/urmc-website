import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/Main.css';
import '../../styles/Admin.css';

import AuthService from '../Services/AuthService';
import AdminLogin from './AdminLogin';

const fingerprint = require('../../assets/fingerprint.png');
const { serverURL } = require('../../util/config');

class DeleteCheckbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false
    }
  }

  toggleCheckbox() {
    this.setState({ clicked: !this.state.clicked });
  }

  render() {
    return (
      <div onClick={() => {
        this.props.toggleMemberToDelete(this.props.member);
        this.toggleCheckbox()}} className={`adminCheckbox
        ${this.state.clicked ? 'bgLightGray' : null}`}></div>
    )
  }
  
}

const MemberButton = (props) => {
  return (
    <div className={`padding8px borderRadius5px fontFamilyNovecento
    fontSize13px horizontalMargin10px adminBoxShadow pointer borderRadius5px
    ${props.deleteCount ? 'adminDeleteButton' : 'bgWhite colorGold'}`}
    onClick={props.onClick}>{props.title} {props.deleteCount >= 0 ? ` (${props.deleteCount})` : null}</div>
    )
}

class MemberDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDeleteMode = this.toggleDeleteMode.bind(this);

    this.state = {
      deleteMode: false
    }
  }

  toggleDeleteMode() {
    this.setState({ deleteMode: !this.state.deleteMode });
  }

  render() {
    let props = this.props;

    let members = [];
    let i = 0;

    for (let member of props.members) {

      members.push(
        <div key={i}>
            <div className="displayFlex flexAlignCenter fontFamilyNovecento verticalMargin15px">
              <div className="width33P fontSize13px colorLightGrey">{member.name}</div>
              <div className="width33P fontSize13px colorLightGrey">{member.position}</div>
              <div className="width33P flexSpaceBetween flexAlignCenter">
                <div className="visibilityHidden"></div>
                <div className="editButton fontFamilyRalewayB textUppercase flexAlignSelfEnd"
                onClick={() => props.setMember(member)}>Edit</div>
                {
                  this.state.deleteMode ?
                  <DeleteCheckbox toggleMemberToDelete={props.toggleMemberToDelete} member={member} />
                  :
                  null
                }
              </div>
            </div>

            <div className="separator"></div>
          </div>
      )

      i += 1;
    }

    return (
      <div className="width60P marginAuto borderRadius boxShadow paddingBottom50px">
        <div className="flexSpaceBetween flexAlignCenter bgGold">
          <div className="colorWhite padding15px fontFamilyRalewayB borderRadius
          fontSize18px verticalPadding25px">
            Executive Board Members
          </div>

          <div className="flexCenter flexAlignCenter">
            <MemberButton title="Add Member" onClick={props.toggleAddModal} />
            <MemberButton title="Delete Members" onClick={this.toggleDeleteMode} />
          </div>

        </div>

        <div className="padding15px">
          <div className="displayFlex flexAlignCenter fontFamilyNovecento marginBottom25px">
            <div className="width33P fontSize14px colorGold">Name</div>
            <div className="width33P fontSize14px colorGold">Position</div>
            {
              this.state.deleteMode ? 
              <div className="width33P flexSpaceBetween">
                <div className="visibilityHidden"></div>
                <MemberButton title="Delete" onClick={() => {this.toggleDeleteMode(); props.deleteBoardMembers()}}
                deleteMode={this.state.deleteMode} deleteCount={props.deleteCount}
                deleteBoardMembers={props.deleteBoardMembers} />
              </div> : null
            }
          </div>

          {members}
        </div>
      </div>
    )
  }

}

const FormItem = (props) => {
  return (
    <div className="verticalMargin25px">
      <div className="fontFamilyNovecento fontSize12px colorCharcoal marginBottom10px">{props.title}</div>

      { props.title !== 'Biography' ?
        <input type="text" onChange={props.onChange} className="width80P noMarginLeft noPadding fontFamilyRaleway colorDisabled noBorder noBoxShadow inputNoFocus fontSize13px"
        defaultValue={props.value} name={props.name} />
        :
        <textarea rows="15" className="width80P noMarginLeft noPadding fontFamilyRaleway colorDisabled noBorder noBoxShadow inputNoFocus fontSize13px"
        defaultValue={props.value} onChange={props.onChange} name={props.name} />
      }

      <div className="formItemSeparator width80P"></div>
    </div>
  )
}

class MemberModal extends React.Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangePicture = this.onChangePicture.bind(this);

    this.state = {
      name: '',
      bio: '',
      askMe: '',
      position: '',
      major: '',
      year: '',
      instagram: null,
      facebook: null,
      linkedIn: null,
      profilePicture: null
    }
  }

  componentWillMount() {
    if (this.props.type === 'N') return; // Only set state if in update mode.

    let member = this.props.member;

    for (let field in this.state) {
      if (member[field]) this.setState({ [field]: member[field] });
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onChangePicture(event) {
    this.setState({ profilePicture: event.target.files[0] });
  }

  uploadPicture(memberID = this.props.member._id) {
    let imageObject = new FormData();
    imageObject.append("imageData", this.state.profilePicture);

    const options = {
      method: 'PUT',
      headers: {'Access-Control-Allow-Origin': '*' },
      body: imageObject
    }

    let response = fetch(`${serverURL}/board-members/${memberID}/profile-picture`, options);
  }

  async submitForm(event) {
    event.preventDefault();

    let askMe = this.state.askMe;
    if (typeof askMe == "string") {
      askMe = askMe.split(',');
    }

    let trimmedAskMe = [];

    for (let str of askMe) trimmedAskMe.push(str.trim());
    
    let body = {
      askMe: trimmedAskMe,
      bio: this.state.bio,
      major: this.state.major,
      name: this.state.name,
      position: this.state.position,
      year: this.state.year,
      instagram: this.state.instagram,
      facebook: this.state.facebook,
      linkedIn: this.state.linkedIn
    }

    let options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(body)
    };

    let response;

    if (this.props.type === 'U') {
      options['method'] = 'PUT';
      response = await fetch(`${serverURL}/board-members/${this.props.member._id}`, options);
      this.uploadPicture();
    } else {
      options['method'] = 'POST';
      response = await fetch(`${serverURL}/board-members`, options);
      response.json().then((member) => { this.uploadPicture(member._id) });
    }

    this.props.fetchBoardMembers();
    this.props.toggleModal();
  }

  render() {

    let formItems = [];

    let formSections = [["Name", "name"], ["Position", "position"], ["Major", "major"],
    ["Graduation Year", "year"], ["Biography", "bio"], ["Ask Me Abouts", "askMe"],
    ["Instagram", "instagram"], ["Facebook", "facebook"], ["LinkedIn", "linkedIn"]];

    for (let i = 0; i < formSections.length; i++) {
      let member = this.props.member;

      if (this.props.type === 'N') {
        formItems.push(
          <FormItem onChange={this.onChange} key={i} name={formSections[i][1]} title={formSections[i][0]} />
        )
      } else {
        formItems.push(
          <FormItem onChange={this.onChange} key={i} name={formSections[i][1]} title={formSections[i][0]} value={member[formSections[i][1]]} member={member} />
        )
      }
    }

    formItems.push(
      <div className="verticalMargin25px">
        <input type="file" className="noBorder noBoxShadow" name="file"
        onChange={this.onChangePicture}/>
      </div>
    )

    return (
      <div id="editMemberModal" className="width40P editModal bgWhite minWidth350px lightBoxShadow borderRadius5px">
        {
          this.props.type === 'N' ? 
          <div className="fontFamilyRalewayB fontSize20px adminMemberModalTitle">Add <span className="colorGold">New Board Member</span></div>
          :
          <div className="fontFamilyRalewayB fontSize20px adminMemberModalTitle">Edit <span className="colorGold">{this.props.member.name}'s Profile</span></div>
        }
      
        <form id="editMemberForm" onSubmit={this.submitForm}>
          {formItems}
        </form> 

        <div className="flexSpaceBetween">
          <div className="fontFamilyNovecento colorWhite bgGrey2 width50P verticalPadding15px textAlignCenter pointer"
          onClick={() => this.props.toggleModal()}>Cancel</div>

          <button type="submit" className="fontFamilyNovecento colorWhite bgGold width50P verticalPadding15px textAlignCenter pointer"
          form="editMemberForm">{this.props.type === 'N' ? 'Save' : 'Update'}</button>
        </div>
      </div>
    )
  }
}

class Admin extends React.Component {

  constructor(props) {
    super(props);

    this.Auth = new AuthService(serverURL);
    
    this.fetchBoardMembers = this.fetchBoardMembers.bind(this);
    this.logout = this.logout.bind(this);
    this.setMember = this.setMember.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.toggleMemberToDelete = this.toggleMemberToDelete.bind(this);
    this.deleteBoardMembers = this.deleteBoardMembers.bind(this);
    this.successGoogle = this.successGoogle.bind(this);

    this.state = {
      profile: this.Auth.getProfile(),
      members: [],
      boardMember: null,
      showEditModal: false,
      showAddModal: false,
      membersToDelete: [],
      isValidEmail: true
    }
  }

  componentWillMount() {
    if (this.state.profile !== null) this.fetchBoardMembers();
  }

  successGoogle = async (response) => {
    const email = response.profileObj.email;
    const isValidEmail = this.validateEmail(email);

    if (!isValidEmail) return this.setState({ isValidEmail: isValidEmail });

    let success = await this.Auth.signIn(response.accessToken, response.profileObj);

    if (success) {
      let profile = this.Auth.getProfile();
      this.setState({ profile: profile }, () => this.fetchBoardMembers());
    }
  };

  validateEmail(email) {
    return email.includes('@cornell.edu');
  }

  async fetchBoardMembers () {
    let response = await fetch(`${serverURL}/board-members`);

    response.json().then((members) => {
      let orderedMembers = this.sortBoardMembers(members, 'name');
      this.setState({ members: orderedMembers });
    });
  }

  async deleteBoardMembers () {
    if (this.state.membersToDelete.length === 0) return;

    let memberIDs = [];

    for (let member of this.state.membersToDelete) {
      memberIDs.push(member._id);
    }

    let body = {
      memberIDs: memberIDs
    }

    let options = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(body)
    };

    let response = await fetch(`${serverURL}/board-members`, options);

    this.setState({ membersToDelete: [] });
    this.fetchBoardMembers();
  }

  logout () {
    this.Auth.logout();
    this.setState({ profile: null });
  }

  setMember(member) {
    this.setState({ boardMember: member}, () => this.toggleEditModal());
  }

  toggleEditModal () {
    this.setState({ showEditModal: !this.state.showEditModal });
  }

  toggleAddModal () {
    this.setState({ showAddModal: !this.state.showAddModal });
  }

  toggleMemberToDelete(member) {
    let membersToDelete = this.state.membersToDelete;

    if (membersToDelete.includes(member)) {
      membersToDelete = membersToDelete.filter(element => element !== member);
    } else {
      membersToDelete.push(member);
    }
    this.setState({ membersToDelete: membersToDelete });
  }

  sortBoardMembers(array, key) {
    return array.sort((a, b) => {
      let x = a[key]; let y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
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
        <MemberDashboard members={this.state.members} toggleAddModal={this.toggleAddModal}
        setMember={this.setMember} toggleMemberToDelete={this.toggleMemberToDelete}
        deleteCount={this.state.membersToDelete.length} deleteBoardMembers={this.deleteBoardMembers} />
        :
        <AdminLogin updateCurrentPage={this.props.updateCurrentPage}
          successGoogle={this.successGoogle} isValidEmail={this.state.isValidEmail} />
      }

      {
        isProfilePresent && this.state.boardMember && this.state.showEditModal ?
        <MemberModal member={this.state.boardMember} toggleModal={this.toggleEditModal}
        fetchBoardMembers={this.fetchBoardMembers} type="U" />
        :
        null
      }

      {
        this.state.showAddModal ?
        <MemberModal toggleModal={this.toggleAddModal}
        fetchBoardMembers={this.fetchBoardMembers} type='N' />
        :
        null
      }

      </div>
      
    )
  }
}

export default Admin;
