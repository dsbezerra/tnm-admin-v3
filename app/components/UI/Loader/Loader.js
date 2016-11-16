import React from 'react';

export default function Loader(props) {

  return (
    <div className="tnm-loader" style={props.style}>
      <div className="circular">
	<span className="animating left"></span>
	<span className="animating top"></span>
	<span className="animating right"></span>
	<span className="animating down"></span>
      </div>
    </div>
  );
}