import React from 'react';

import './Home.css';
import '../../main.css';

import { ReactComponent as CharcoalXIcon } from '../../assets/charcoal-x-icon.svg';
import OccupationOption from './OccupationOption';

const ListservModal = (props) => {
  console.log("PROPS")
  console.log(props);
  return (
    <form action="" id="listservModal" className="fontFamilyRalewayB listservModal fitHeight">
      <div className="width75P marginAuto displayFlex flexColumn">
        <div className="flexSpaceBetween flexAlignCenter verticalMargin40px">
          <div className="fontSize30px colorCharcoal">Join the <span className="colorGold">Listserv</span></div>
          <CharcoalXIcon className="xIcon pointer"
          onClick={() => props.closeListservModal()} />
        </div>

        <div className="flexSpaceBetween flexAlignCenter verticalMargin15px">
          <div>Full Name: </div>
          <input type="text" className="width50P verticalPadding5px borderGrey1px" />
        </div>

        <div className="flexSpaceBetween flexAlignCenter verticalMargin15px">
          <div>Email Address: </div>
          <input type="text" className="width50P verticalPadding5px borderGrey1px" />
        </div>

        <div className="flexSpaceBetween verticalMargin15px marginBottom50px">
          <div>I Am A...</div>
          <div className="flexDisplay flexColumn">
            <OccupationOption title="Student @ Cornell" />
            <OccupationOption title="Student @ Other School" />
            <OccupationOption title="Faculty and/or Staff" />
            <OccupationOption title="Company Representative" />
          </div>
        </div>
      </div>

      <div className="textUppercase textAlignCenter verticalPadding20px bgGold
        colorWhite submitButtonCurve fontSize16px">Join</div>
    </form>
  )
}

export default ListservModal;
