/**
 * @fileoverview Stores a map of each of Instagram, Facebook and LinkedIn to
 * each icon as well as the URL to URMC's respective profile.
 */

const instagramIcon = require('../assets/instagram.png');
const facebookIcon = require('../assets/facebook.png');
const linkedinIcon = require('../assets/linkedin.png');

const socialMediaMap = {
  'Instagram': {
    logo: instagramIcon,
    href: 'https://www.instagram.com/urmc_cornell'
  },
  'Facebook': {
    logo: facebookIcon,
    href: 'https://www.facebook.com/pg/cornellurmc/about'
  },
  'LinkedIn': {
    logo: linkedinIcon,
    href: 'https://www.linkedin.com/company/19012674'
  }
}

module.exports = socialMediaMap;
