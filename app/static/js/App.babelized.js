'use strict';

var map;
var key = 'AIzaSyATTseHucnvxtx_f-FoSALOvICvZ1XYMgw';
var config = {
  initialLat: 37.7622550270122,
  initialLon: -122.446837820235,
  mapZoomLevel: 13
};

var Header = React.createClass({
  displayName: 'Header',

  render: function render() {
    return React.createElement(
      'h1',
      { className: 'msg' },
      'San Francisco Crime Map'
    );
  }
});

var CrimeFilter = React.createClass({
  displayName: 'CrimeFilter',

  getInitialState: function getInitialState() {
    return { category: 'all', year: 'all' };
  },

  handleCategoryChange: function handleCategoryChange(e) {
    this.setState({ category: e.target.value });
  },

  handleYearChange: function handleYearChange(e) {
    this.setState({ year: e.target.value });
  },

  handleSubmit: function handleSubmit(e) {
    var category = this.state.category;
    var year = this.state.year;
    this.props.onFilterChange({ category: category, year: year });
  },

  render: function render() {
    return React.createElement(
      'form',
      { className: 'filterForm' },
      React.createElement(
        'select',
        { id: 'category', onChange: this.handleCategoryChange, value: this.state.category },
        React.createElement(
          'option',
          { value: 'all' },
          'All'
        ),
        React.createElement(
          'option',
          { value: 'assault' },
          'Assault'
        ),
        React.createElement(
          'option',
          { value: 'driving under the influence' },
          'DUI'
        ),
        React.createElement(
          'option',
          { value: 'vehicle theft' },
          'Vehicle Theft'
        ),
        React.createElement(
          'option',
          { value: 'non-criminal' },
          'Non-Criminal'
        ),
        React.createElement(
          'option',
          { value: 'warrants' },
          'Warrants'
        ),
        React.createElement(
          'option',
          { value: 'drug/narcotic' },
          'Drug/Narcotic'
        ),
        React.createElement(
          'option',
          { value: 'missing person' },
          'Missing Person'
        ),
        React.createElement(
          'option',
          { value: 'weapon laws' },
          'Weapon Laws'
        ),
        React.createElement(
          'option',
          { value: 'burglary' },
          'Burglary'
        ),
        React.createElement(
          'option',
          { value: 'vandalism' },
          'Vandalism'
        ),
        React.createElement(
          'option',
          { value: 'arson' },
          'Arson'
        ),
        React.createElement(
          'option',
          { value: 'suspicious occ' },
          'Suspicious Occasion'
        ),
        React.createElement(
          'option',
          { value: 'sex offenses, forcible' },
          'Sex Offenses, Forcible'
        ),
        React.createElement(
          'option',
          { value: 'robbery' },
          'Robbery'
        ),
        React.createElement(
          'option',
          { value: 'trespass' },
          'Trespass'
        ),
        React.createElement(
          'option',
          { value: 'prostitution' },
          'Prostitution'
        ),
        React.createElement(
          'option',
          { value: 'forgery/counterfeiting' },
          'Forgery/Counterfeiting'
        ),
        React.createElement(
          'option',
          { value: 'other offenses' },
          'Other Offenses'
        )
      ),
      React.createElement(
        'select',
        { id: 'year', onChange: this.handleYearChange, value: this.state.year },
        React.createElement(
          'option',
          { value: 'all' },
          'All'
        ),
        React.createElement(
          'option',
          { value: '2005' },
          '2005'
        ),
        React.createElement(
          'option',
          { value: '2006' },
          '2006'
        ),
        React.createElement(
          'option',
          { value: '2007' },
          '2007'
        ),
        React.createElement(
          'option',
          { value: '2008' },
          '2008'
        ),
        React.createElement(
          'option',
          { value: '2009' },
          '2009'
        ),
        React.createElement(
          'option',
          { value: '2010' },
          '2010'
        ),
        React.createElement(
          'option',
          { value: '2011' },
          '2011'
        ),
        React.createElement(
          'option',
          { value: '2012' },
          '2012'
        ),
        React.createElement(
          'option',
          { value: '2013' },
          '2013'
        ),
        React.createElement(
          'option',
          { value: '2013' },
          '2014'
        ),
        React.createElement(
          'option',
          { value: '2013' },
          '2015'
        )
      ),
      React.createElement(
        'button',
        { type: 'button', onClick: this.handleSubmit },
        'Filter'
      )
    );
  }
});

var markers = [];
var api_base_link = 'api/crime/';

function loadJSON(callback, api_link) {
  var xobj = new XMLHttpRequest();
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
    var data = JSON.parse(response);
    callback(data);
  }, api_base_link + api_params);
}

var CrimeMapApp = React.createClass({
  displayName: 'CrimeMapApp',

  onFilterChange: function onFilterChange(data) {
    for (var i = 0; i < markers.length; ++i) {
      markers[i].setMap(null);
    }
    markers = [];

    var api_params = '';
    if (data.year === 'all' && data.category === 'all') {
      init(api_params, this.renderMap);
    }
    if (data.year != 'all' && data.year != null) {
      api_params += 'year/' + data.year;

      if (data.category != 'all') {
        api_params += '/category/' + data.category;
      }
    } else if (data.category != 'all' && data.category != null) {
      api_params += 'category/' + data.category;
    }
    // make renderMap a more meaningful function?
    // all my code is being created in init()
    // change zoom level to center on SF always
    // clean up trailing '/' urls. make it consistent.
    init(api_params, this.renderMap);
  },

  renderMap: function renderMap(data) {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: config.mapZoomLevel,
      center: new google.maps.LatLng(config.initialLat, config.initialLon)
    });

    map.addListener('zoom_changed', function () {
      console.log(map.getZoom());
    });

    for (var i = 0; i < data.length; ++i) {
      markers.push(new google.maps.Marker({
        position: new google.maps.LatLng(data[i].location.latitude, data[i].location.longitude),
        title: data[i].category
      }));
    }

    var markerCluster = new MarkerClusterer(map, markers, {
      gridSize: 100,
      minimumClusterSize: 5,
      imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m'
    });
  },

  componentDidMount: function componentDidMount() {
    init('', this.renderMap);
  },

  render: function render() {
    var style = {
      width: "100vw",
      height: "100vh"
    };

    return React.createElement(
      'div',
      { id: 'app' },
      React.createElement(Header, null),
      React.createElement(CrimeFilter, { onFilterChange: this.onFilterChange }),
      React.createElement('div', { id: 'map', style: style })
    );
  }

});

ReactDOM.render(React.createElement(CrimeMapApp, null), document.getElementById('root'));
