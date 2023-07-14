import React from 'react';


const Dots = ({ value }) => {

  const generateDots = () => {
    switch (value) {
      case 1:
        return (
          <span className="dot dot-center"></span>
        );
      case 2:
        return (
          <div>
            <span className="dot dot-top"></span>
            <span className="dot dot-bottom"></span>
          </div>
        );
      case 3:
        return (
          <div>
            <span className="dot dot-top"></span>
            <span className="dot dot-center"></span>
            <span className="dot dot-bottom"></span>
          </div>
        );
      case 4:
        return (
          <div>
            <span className="dot dot-top-left"></span>
            <span className="dot dot-top-right"></span>
            <span className="dot dot-bottom-left"></span>
            <span className="dot dot-bottom-right"></span>
          </div>
        );
      case 5:
        return (
          <div>
            <span className="dot dot-center"></span>
            <span className="dot dot-top-left"></span>
            <span className="dot dot-top-right"></span>
            <span className="dot dot-bottom-left"></span>
            <span className="dot dot-bottom-right"></span>
          </div>
        );
      case 6:
        return (
          <div>
            <span className="dot dot-left-top"></span>
            <span className="dot dot-left-center"></span>
            <span className="dot dot-left-bottom"></span>
            <span className="dot dot-right-top"></span>
            <span className="dot dot-right-center"></span>
            <span className="dot dot-right-bottom"></span>
          </div>
        );
      default:
        return null;
    }
  };


  return generateDots();
};

export default Dots;