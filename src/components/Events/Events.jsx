import React from 'react';
import '../../main.css';
import './Events.css';

class Events extends React.Component {
  render() {
    return (
      <div className="displayFlex flexColumn flexAlignCenter heightMaxContent">
        <div className="marginTop25px fontSize20px textAlignCenter fontFamilyRalewayB marginBottom25px">Events</div>
        <div id="googleCalendar">
          <iframe src="https://calendar.google.com/calendar/b/1/embed?wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FNew_York&amp;src=YXJjaGl2ZS51cm1jQGdtYWlsLmNvbQ&amp;src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%23B39DDB&amp;color=%23F6BF26&amp;showTitle=0&amp;showNav=1&amp;showPrint=0&amp;showTabs=1" style={{ "border-width": 0 }} frameborder="0" scrolling="no"></iframe>
        </div>
      </div>
    )
  };
};

export default Events; 
