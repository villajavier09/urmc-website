import React, { Component } from 'react';

export default function withScreenSize(ScreenComponent) {
  return class ScreenWrapped extends Component {
    constructor(props) {
      super(props);

      this.state = {
        windowWidth: 0,
        windowHeight: 0,
        breakpoint: 'D'
      };

      this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
      this.updateDimensions();
      window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions, false);
    }

    updateDimensions() {
      let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
      let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

      let breakpoint;

      if (windowWidth > 1025) breakpoint = 'D';
      else if (windowWidth <= 1024 && windowWidth >= 576) breakpoint = 'T';
      else if (windowWidth <= 575) breakpoint = 'M';

      this.setState({
        windowWidth: windowWidth,
        windowHeight: windowHeight,
        breakpoint: breakpoint
      });
    }

    render() {
      return (
        <ScreenComponent {...this.props}
          windowWidth={this.state.windowWidth}
          windowHeight={this.state.windowHeight}
          breakpoint={this.state.breakpoint} />
      )
    }
  }
}
