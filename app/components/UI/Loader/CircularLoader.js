import React from 'react';

const SIZES =
  [
    'tiny',
    'small',
    'normal',
    'big',
    'huge',
  ];

const Sizes = {
  tiny: {
    style: {
      fontSize: '20px'
    }
  },
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
  },
  huge: {
    style: {
      fontSize: '200px'
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