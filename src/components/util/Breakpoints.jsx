import React from 'react';
import Breakpoint from './Breakpoint';

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
