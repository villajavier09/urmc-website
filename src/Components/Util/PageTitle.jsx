import React from 'react';

import '../../main.css';

const PageTitle = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="fontFamilyRalewayB textAlignCenter verticalMargin25px fontSize20px">
      {props.title}
    </div>
  )
});

export default PageTitle;
