import React from 'react';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import '../../styles/main.css';
import '../../styles/Admin.css';

const charcoalX = require('../../assets/charcoal-x-icon.png');

const AdminLogin = ({ isValidEmail, successGoogle, updateCurrentPage }) => {
  return (
    <div className="width350px marginAuto boxShadow borderRadius10px padding25px
      fontFamilyRalewayB">
      <div className="flexSpaceBetween flexAlignCenter marginBottom25px">
        <div className="colorCharcoal fontSize20px">E-Board Member <span className="colorGold">Login</span></div>
        <Link to='/' onClick={() => updateCurrentPage('Home')}>
          <img src={charcoalX} className="charcoalXIcon" alt="Charcoal X Icon" />
        </Link>
      </div>

      <GoogleLogin
        clientId='710389758047-ghdt5r42cgo83q96th9ttloo21k5eqqp.apps.googleusercontent.com'
        buttonText="Sign In with Google"
        className="googleLoginButton"
        icon={false}
        onSuccess={successGoogle}
      />

      {!isValidEmail ?
        <h3>Sorry, only E-Board members have access to this!</h3>
        :
        null
      }
    </div>
  )
}

export default AdminLogin;
