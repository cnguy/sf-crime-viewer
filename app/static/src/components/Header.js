import React from 'react';

class Header extends React.Component {
  render() {
    const msg = "San Francisco Crime Map";
    return (
      <div className="header">
        <h1>{msg}</h1>
      </div>
    );
  }
}

export default Header;