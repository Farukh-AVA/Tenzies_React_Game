import React from 'react';


const Dots = ({ value }) => {
  const dots = [
    [], // 0
    [3], // 1
    [2, 4], // 2
    [2, 3, 4], // 3
    [0, 2, 4, 6], // 4
    [0, 2, 3, 4, 6], // 5
    [0, 1, 2, 4, 5, 6], // 6
  ];

  const generateDots = () => {
    return dots[value].map((dot, index) => (
      <span className={`dot dot-${index}`} key={index}></span>
    ));
  };

  return generateDots();
};

export default Dots;