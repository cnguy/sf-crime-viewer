"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var map = void 0;
var config = {
  initialLat: 37.7622550270122,
  initialLon: -122.446837820235,
  mapZoomLevel: 13
};

var BaseComponent = function (_React$Component) {
  _inherits(BaseComponent, _React$Component);

  function BaseComponent() {
    _classCallCheck(this, BaseComponent);

    return _possibleConstructorReturn(this, (BaseComponent.__proto__ || Object.getPrototypeOf(BaseComponent)).apply(this, arguments));
  }

  _createClass(BaseComponent, [{
    key: "_bind",
    value: function _bind() {
      var _this2 = this;

      for (var _len = arguments.length, methods = Array(_len), _key = 0; _key < _len; _key++) {
        methods[_key] = arguments[_key];
      }

      methods.forEach(function (method) {
        return _this2[method] = _this2[method].bind(_this2);
      });
    }
  }]);

  return BaseComponent;
}(React.Component);

var Header = function (_React$Component2) {
  _inherits(Header, _React$Component2);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      var msg = "San Francisco Crime Map";
      return React.createElement(
        "div",
        { className: "header" },
        React.createElement(
          "h1",
          null,
          msg
        )
      );
    }
  }]);

  return Header;
}(React.Component);

var CrimeFilter = function (_BaseComponent) {
  _inherits(CrimeFilter, _BaseComponent);

  function CrimeFilter(props) {
    _classCallCheck(this, CrimeFilter);

    var _this4 = _possibleConstructorReturn(this, (CrimeFilter.__proto__ || Object.getPrototypeOf(CrimeFilter)).call(this, props));

    _this4.state = { category: 'all', year: 'all' };
    _this4._bind('handleCategoryChange', 'handleYearChange', 'handleSubmit');
    return _this4;
  }

  _createClass(CrimeFilter, [{
    key: "handleCategoryChange",
    value: function handleCategoryChange(e) {
      this.setState({ category: e.target.value });
    }
  }, {
    key: "handleYearChange",
    value: function handleYearChange(e) {
      this.setState({ year: e.target.value });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      var category = this.state.category;
      var year = this.state.year;
      this.props.onFilterChange({ category: category, year: year });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "form",
        { className: "filterForm" },
        React.createElement(
          "select",
          { id: "category", onChange: this.handleCategoryChange, value: this.state.category },
          React.createElement(
            "option",
            { value: "all" },
            "All"
          ),
          React.createElement(
            "option",
            { value: "assault" },
            "Assault"
          ),
          React.createElement(
            "option",
            { value: "driving under the influence" },
            "DUI"
          ),
          React.createElement(
            "option",
            { value: "vehicle theft" },
            "Vehicle Theft"
          ),
          React.createElement(
            "option",
            { value: "non-criminal" },
            "Non-Criminal"
          ),
          React.createElement(
            "option",
            { value: "warrants" },
            "Warrants"
          ),
          React.createElement(
            "option",
            { value: "drug/narcotic" },
            "Drug/Narcotic"
          ),
          React.createElement(
            "option",
            { value: "missing person" },
            "Missing Person"
          ),
          React.createElement(
            "option",
            { value: "weapon laws" },
            "Weapon Laws"
          ),
          React.createElement(
            "option",
            { value: "burglary" },
            "Burglary"
          ),
          React.createElement(
            "option",
            { value: "vandalism" },
            "Vandalism"
          ),
          React.createElement(
            "option",
            { value: "arson" },
            "Arson"
          ),
          React.createElement(
            "option",
            { value: "suspicious occ" },
            "Suspicious Occasion"
          ),
          React.createElement(
            "option",
            { value: "sex offenses, forcible" },
            "Sex Offenses, Forcible"
          ),
          React.createElement(
            "option",
            { value: "robbery" },
            "Robbery"
          ),
          React.createElement(
            "option",
            { value: "trespass" },
            "Trespass"
          ),
          React.createElement(
            "option",
            { value: "prostitution" },
            "Prostitution"
          ),
          React.createElement(
            "option",
            { value: "forgery/counterfeiting" },
            "Forgery/Counterfeiting"
          ),
          React.createElement(
            "option",
            { value: "other offenses" },
            "Other Offenses"
          )
        ),
        React.createElement(
          "select",
          { id: "year", onChange: this.handleYearChange, value: this.state.year },
          React.createElement(
            "option",
            { value: "all" },
            "All"
          ),
          React.createElement(
            "option",
            { value: "2005" },
            "2005"
          ),
          React.createElement(
            "option",
            { value: "2006" },
            "2006"
          ),
          React.createElement(
            "option",
            { value: "2007" },
            "2007"
          ),
          React.createElement(
            "option",
            { value: "2008" },
            "2008"
          ),
          React.createElement(
            "option",
            { value: "2009" },
            "2009"
          ),
          React.createElement(
            "option",
            { value: "2010" },
            "2010"
          ),
          React.createElement(
            "option",
            { value: "2011" },
            "2011"
          ),
          React.createElement(
            "option",
            { value: "2012" },
            "2012"
          ),
          React.createElement(
            "option",
            { value: "2013" },
            "2013"
          ),
          React.createElement(
            "option",
            { value: "2013" },
            "2014"
          ),
          React.createElement(
            "option",
            { value: "2013" },
            "2015"
          )
        ),
        React.createElement(
          "button",
          { type: "button", onClick: this.handleSubmit },
          "Filter"
        )
      );
    }
  }]);

  return CrimeFilter;
}(BaseComponent);

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

var CrimeMap = function (_BaseComponent2) {
  _inherits(CrimeMap, _BaseComponent2);

  function CrimeMap() {
    _classCallCheck(this, CrimeMap);

    var _this5 = _possibleConstructorReturn(this, (CrimeMap.__proto__ || Object.getPrototypeOf(CrimeMap)).call(this));

    _this5._bind('onFilterChange', 'renderMap');
    return _this5;
  }

  _createClass(CrimeMap, [{
    key: "onFilterChange",
    value: function onFilterChange(data) {
      // Clear markers. and reset markers[].
      for (var marker in markers) {
        marker.setMap(null);
      }
      markers = [];

      // Logic for determining what api endpoint to use.
      var api_params = '';

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
  }, {
    key: "renderMap",
    value: function renderMap(data) {
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: config.mapZoomLevel,
        center: new google.maps.LatLng(config.initialLat, config.initialLon)
      });

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var crime = _step.value;

          markers.push(new google.maps.Marker({
            position: new google.maps.LatLng(crime.location.latitude, crime.location.longitude),
            title: crime.category
          }));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var markerCluster = new MarkerClusterer(map, markers, {
        gridSize: 100,
        minimumClusterSize: 5,
        imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m'
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      init('', this.renderMap);
    }
  }, {
    key: "render",
    value: function render() {
      var style = {
        width: "100vw",
        height: "100vh"
      };

      return React.createElement(
        "div",
        null,
        React.createElement(Header, null),
        React.createElement(CrimeFilter, { onFilterChange: this.onFilterChange }),
        React.createElement("div", { id: "map", style: style })
      );
    }
  }]);

  return CrimeMap;
}(BaseComponent);

var App = function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "App" },
        React.createElement(CrimeMap, null)
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
