import React from 'react';
import BaseComponent from './BaseComponent';

class CrimeFilter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = { category: 'all', year: 'all' };
    this._bind('handleCategoryChange', 'handleYearChange', 'handleSubmit');
  }

  handleCategoryChange(e) {
    this.setState({ category: e.target.value });
  }

  handleYearChange(e) {
    this.setState({ year: e.target.value });
  }

  handleSubmit(e) {
    const category = this.state.category;
    const year = this.state.year;
    this.props.onFilterChange({ category: category, year: year });
  }

  render() {
    return (
      <form className="filterForm">
        <select id="category" onChange={this.handleCategoryChange} value={this.state.category}>
          <option value="all">All</option>
          <option value="assault">Assault</option>
          <option value="driving under the influence">DUI</option>
          <option value="vehicle theft">Vehicle Theft</option>
          <option value="non-criminal">Non-Criminal</option>
          <option value="warrants">Warrants</option>
          <option value="drug/narcotic">Drug/Narcotic</option>
          <option value="missing person">Missing Person</option>
          <option value="weapon laws">Weapon Laws</option>
          <option value="burglary">Burglary</option>
          <option value="vandalism">Vandalism</option>
          <option value="arson">Arson</option>
          <option value="suspicious occ">Suspicious Occasion</option>
          <option value="sex offenses, forcible">Sex Offenses, Forcible</option>
          <option value="robbery">Robbery</option>
          <option value="trespass">Trespass</option>
          <option value="prostitution">Prostitution</option>
          <option value="forgery/counterfeiting">Forgery/Counterfeiting</option>
          <option value="other offenses">Other Offenses</option>
        </select>

        <select id="year" onChange={this.handleYearChange} value={this.state.year}>
          <option value="all">All</option>
          <option value="2005">2005</option>
          <option value="2006">2006</option>
          <option value="2007">2007</option>
          <option value="2008">2008</option>
          <option value="2009">2009</option>
          <option value="2010">2010</option>
          <option value="2011">2011</option>
          <option value="2012">2012</option>
          <option value="2013">2013</option>
          <option value="2013">2014</option>
          <option value="2013">2015</option>
        </select>

        <button type="button" onClick={this.handleSubmit}>Filter</button>
      </form>
    );
  }
}

export default CrimeFilter;