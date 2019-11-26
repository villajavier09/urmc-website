import React from 'react';
import '../../main.css';
import './Events.css';

import withScreenSize from '../HOC/ScreenSize';
import PageTitle from '../Util/PageTitle';

class Events extends React.Component {

  constructor(props) {
    super(props);

    this.pageTitleRef = React.createRef();
  }

  render() {
    let calendarOffsetTop = 0;
    let refCurrent = this.pageTitleRef.current;

    if (refCurrent) {
      calendarOffsetTop += refCurrent.offsetTop + refCurrent.offsetHeight;
    }

    let calendarStyle = {
      'minWidth': this.props.windowWidth * 0.8,
      'minHeight': (this.props.windowHeight - calendarOffsetTop) * 0.8
    }

    return (
      <div className="displayFlex flexColumn flexAlignCenter">
        <PageTitle ref={this.pageTitleRef} title="Events" />

        <div className="googleCalendar" style={calendarStyle}>
          {
            this.props.breakpoint !== 'M' ?
              <iframe title="week" src="https://calendar.google.com/calendar/b/1/embed?wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FNew_York&amp;src=YXJjaGl2ZS51cm1jQGdtYWlsLmNvbQ&amp;src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%2336383b&amp;color=%2336383b&amp;showTitle=0&amp;showNav=1&amp;showPrint=0&amp;showTabs=1&amp;mode=WEEK" style={{ "borderWidth": 0 }} frameBorder="0" scrolling="yes"></iframe>
              :
              <iframe title="agenda" src="https://calendar.google.com/calendar/b/1/embed?wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FNew_York&amp;src=YXJjaGl2ZS51cm1jQGdtYWlsLmNvbQ&amp;src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%2336383b&amp;color=%2336383b&amp;showTitle=0&amp;showNav=1&amp;showPrint=0&amp;showTabs=1&amp;mode=AGENDA" style={{ "borderWidth": 0 }} frameBorder="0" scrolling="yes"></iframe>
          }
        </div>
      </div>
    )
  };
};

export default withScreenSize(Events); 
