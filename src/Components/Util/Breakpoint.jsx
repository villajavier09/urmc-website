import React from 'react';
import MediaQuery from 'react-responsive';

const breakpoints = {
  desktop: '(min-width: 1025px)',
  desktopAndTablet: '(min-width: 576px)',
  tablet: '(min-width: 576px) and (max-width: 1024px)',
  tabletAndMobile: '(max-width: 1024px)',
  mobile: '(max-width: 575px)'
};

const Breakpoint = (props) => {
  const breakpoint = breakpoints[props.name] || breakpoints.desktop;

  return (
    <MediaQuery {...props} query={breakpoint}>
      {props.children}
    </MediaQuery>
  )
}

export default Breakpoint;
