import React from 'react';
import Popup from 'reactjs-popup';

const withPopup = (component, popup) => {
  return (
    <Popup trigger={component} position="right center">
      {popup}
    </Popup>
  );
}

export default withPopup;