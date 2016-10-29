let map;
const config = {
  initialLat: 37.7622550270122,
  initialLon: -122.446837820235,
  mapZoomLevel: 13
};

class BaseComponent extends React.Component {
  _bind(...methods) {
    methods.forEach((method) => this[method] = this[method].bind(this));
  }
}

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

let markers = [];
const api_base_link = 'api/crime/';

function loadJSON(callback, api_link) {
  const xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', api_link, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status === 200) {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function init(api_params, callback) {
  loadJSON(function (response) {
    const data = JSON.parse(response);
    callback(data);
  }, api_base_link + api_params);
}

class CrimeMap extends BaseComponent {
  constructor() {
    super();
    this._bind('onFilterChange', 'renderMap');
  }

  onFilterChange(data) {
    // Clear markers. and reset markers[].
    for (let i = 0; i < markers.length; ++i) {
      markers[i].setMap(null);
    }
    markers = [];

    // Logic for determining what api endpoint to use.
    let api_params = '';

    if (data.year != 'all') {
      // my api <= year -> category
      api_params += 'year/' + data.year;

      if (data.category != 'all') {
        api_params += '/category/' + data.category;
      }
    } else if (data.category != 'all') {
      api_params += 'category/' + data.category;
    }

    init(api_params, this.renderMap);
  }

  renderMap(data) {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: config.mapZoomLevel,
      center: new google.maps.LatLng(config.initialLat, config.initialLon),
    });

    for (let i = 0; i < data.length; ++i) {
      markers.push(new google.maps.Marker({
        position: new google.maps.LatLng(
          data[i].location.latitude,
          data[i].location.longitude
        ),
        title: data[i].category
      }));
    }

    const markerCluster = new MarkerClusterer(map, markers, {
      gridSize: 100,
      minimumClusterSize: 5,
      imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m',
    });
  }

  componentDidMount() {
    init('', this.renderMap);
  }

  render() {
    const style = {
      width: "100vw",
      height: "100vh"
    }

    return (
      <div id="app">
        <Header />
        <CrimeFilter onFilterChange={this.onFilterChange} />
        <div id="map" style={style}></div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <CrimeMap />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);