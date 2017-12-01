import React from 'react';

// Constants
const header = 'the WeatherBot';
const author = 'Shuchen Liu';
const authorHolder = `by ${author}`;

//pure container for holding header
const AppHeader = () => (
  <div className="AppHeader">
    <span className="header Pacifico">{header}</span>
    <span className="lowerHeader Sorts-Mill-Goudy">{authorHolder}</span>
  </div>
);


export default AppHeader;
