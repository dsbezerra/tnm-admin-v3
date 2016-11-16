import React from 'react';

const SIZES =
  [
    'small',
    'normal',
    'big'
  ];

const Sizes = {
  small: {
    style: {
      fontSize: '50px',
    }
  },
  normal: {
    style: {
      fontSize: '100px',
    }
  },
  big: {
    style: {
      fontSize: '150px'
    }
  }
};

export default function CircularLoader(props) {
  const { size } = props;
  
  return (
    <div className="circular-loader"
         style={size ? Sizes[size].style : Sizes.small.style}>
      {props.children}
    </div>
  );
}