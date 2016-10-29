import React from 'react';
import CrimeFilter from './CrimeFilter';
import CrimeMap from './CrimeMap';
import Header from './Header';
import BaseComponent from './BaseComponent';

class SFCrimeViewer extends BaseComponent {
  constructor() {
    super();
    this.state = { category: 'all', year: 'all' };
    this._bind('onFilterChange');
  }

  onFilterChange(data) {
    this.setState(data);
  }

  render() {
    return (
      <div>
        <Header />
        <CrimeFilter onFilterChange={this.onFilterChange} />
        <CrimeMap data={this.state} />
      </div>
    );
  }
}

export default SFCrimeViewer;