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

const Desktop = (props) => {
  return (
    <Breakpoint name="desktop">
      {props.children}
    </Breakpoint>
  )
}

const DesktopAndTablet = (props) => {
  return (
    <Breakpoint name="desktopAndTablet">
      {props.children}
    </Breakpoint>
  )
}

const Tablet = (props) => {
  return (
    <Breakpoint name="tablet">
      {props.children}
    </Breakpoint>
  )
}

const TabletAndMobile = (props) => {
  return (
    <Breakpoint name="tabletAndMobile">
      {props.children}
    </Breakpoint>
  )
}

const Mobile = (props) => {
  return (
    <Breakpoint name="mobile">
      {props.children}
    </Breakpoint>
  )
}

export {
  Desktop,
  DesktopAndTablet,
  Mobile,
  Tablet,
  TabletAndMobile
}
