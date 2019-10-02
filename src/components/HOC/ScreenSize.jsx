import React, { Component } from 'react';

export default function withScreenSize(ScreenComponent) {
  return class ScreenWrapped extends Component {
    constructor(props) {
      super(props);

      this.state = {
        windowWidth: 0,
        windowHeight: 0
      };

      this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
      this.updateDimensions();
      window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
    }

    componentDidUpdate() {
      console.log("YER")
    }

    updateDimensions() {
      let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
      let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

      this.setState({
        windowWidth: windowWidth,
        windowHeight: windowHeight
      });
    }

    render() {
      return (
        <div>
          <ScreenComponent windowWidth={this.state.windowWidth} windowHeight={this.state.windowHeight}></ScreenComponent>
        </div>
      )
    }
  }
}
