import axios from 'axios';
import decode from 'jwt-decode';

const { serverURL } = require('../../util/config');

export default class AuthService {
  constructor(endpoint) {
    // API Service Endpoint
    this.apiEndpoint = endpoint || serverURL;
    this.fetch = this.fetch.bind(this);
    this.signIn = this.signIn.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  fetch(url, options) {
    return fetch(url, options)
      .then(this.checkStatus)
      .then(response => response.json());
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      // Success Case
      return response;
    } else {
      // Failure Case: Raises an error.
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

  signIn(token, profile) {
    return new Promise((resolve, reject) => {
      const profileAndToken = {
        access_token: token,
        profile: profile
      }

      const options = {
        method: 'POST',
        url: `${this.apiEndpoint}/google/auth`,
        data: profileAndToken,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      axios(options)
        .then(response => {
          const token = response.headers['x-auth-token']
          if (token) {
            this.setToken(token);
            resolve(true);
          } else {
            reject(false);
          }
        })
    });
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) return true;
      else return false;
    } catch (error) {
      return false;
    }
  }

  setToken(idToken) {
    localStorage.setItem('idToken', idToken);
  }

  getToken() {
    return localStorage.getItem('idToken');
  }

  logout() {
    localStorage.removeItem('idToken');
  }

  getProfile() {
    try {
      return decode(this.getToken());
    } catch (error) {
      return null;
    }
  }
}
