import React from 'react';
import Nav from './Nav';

class Header extends React.Component {
  render() {
    const msg = "San Francisco Crime Viewer";
    return (
      <div className="header">
        <h1>{msg}</h1>
        <Nav />
      </div>
    );
  }
}

export default Header;