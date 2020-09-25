import React from 'react';
import './style.css';
import 'bulma/css/bulma.css';

function ButtonCard(props) {
    return (
      <div className="button-card">
          <img src={props.image} width={80} alt="Button"/>
          <h1 className="title is-5 mt-1">{ props.name }</h1>
      </div>
    );
}
export default ButtonCard;