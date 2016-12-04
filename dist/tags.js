'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AutoComplete = require('material-ui/AutoComplete');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _Chip = require('material-ui/Chip');

var _Chip2 = _interopRequireDefault(_Chip);

var _FloatingActionButton = require('material-ui/FloatingActionButton');

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _add = require('material-ui/svg-icons/content/add');

var _add2 = _interopRequireDefault(_add);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
tags special component
**/
var Tags = function (_Component) {
  _inherits(Tags, _Component);

  function Tags(props) {
    _classCallCheck(this, Tags);

    var _this = _possibleConstructorReturn(this, (Tags.__proto__ || Object.getPrototypeOf(Tags)).call(this, props));

    _this.state = {
      tags: props.defTags,
      value: "",
      errorText: null,
      sourceTags: props.sourceTags.slice() //copy of source tags - we will change it
    };

    //elimination existsing tags from source tags
    _this.state.sourceTags = _this.state.sourceTags.filter(function (tag) {

      return !props.defTags.find(function (dtag) {
        return tag.label === dtag.label;
      }); //elemeny must not exists in def tags
    });

    //set error text value
    _this.errorText = _this.props.textField && _this.props.textField.errorText ? _this.props.textField.errorText : "Value is required";

    return _this;
  }

  //remove tag


  _createClass(Tags, [{
    key: 'handleRequestDelete',
    value: function handleRequestDelete(tagData, key) {

      var tags = this.state.tags.slice();
      tags.splice(key, 1);

      //ok but now add this tag to autocomplete if it was there before
      if (this.props.sourceTags.find(function (tag) {
        return tagData.label === tag.label;
      })) {

        //was there so add it again to have it in autocomplete
        var sourceTags = this.state.sourceTags.slice(); //new arr
        sourceTags.push(tagData);
        //update state
        this.setState({ sourceTags: sourceTags });
      }
      if (this.props.onRemove !== null) this.props.onRemove(tagData, tags);

      this.setState({ tags: tags });
    }
  }, {
    key: 'getContainerStyle',
    value: function getContainerStyle() {

      return this.props.containerStyle;
    }
  }, {
    key: 'getContainerClassName',
    value: function getContainerClassName() {

      return this.props.containerClassName;
    }

    //after enter key press

  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(e) {

      if (e.charCode === 13) {
        //enter

        this.add(e.target.value);
      }
    }

    //after click autocomplete

  }, {
    key: 'handleAutocomplete',
    value: function handleAutocomplete(value) {

      this.refs.textField.focus();

      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== "object") return;

      //set state value
      this.handleTextValueChange(value.label);
    }

    //on button click

  }, {
    key: 'buttonClickHandler',
    value: function buttonClickHandler() {

      this.add(this.state.value);
    }

    //text change

  }, {
    key: 'handleTextValueChange',
    value: function handleTextValueChange(value) {

      this.setState({ value: value });

      if (this.state.errorText !== null && value.trim().length > 0) this.hideInputError();

      if (this.props.handleInputChange) this.props.handleInputChange(value);
    }

    //checks if tag is on our tag list

  }, {
    key: 'tagExistsInList',
    value: function tagExistsInList(tag) {

      return this.state.tags.find(function (e) {

        return e.label === tag;
      });
    }

    /*
    Checks if tag exists in source list
    @return boolean
    */

  }, {
    key: 'tagInSourceList',
    value: function tagInSourceList(tag) {

      return this.props.sourceTags.find(function (source) {

        return source.label === tag;
      }) ? true : false;
    }

    //removes tag from autocomplete

  }, {
    key: 'removeTagFromSourceTags',
    value: function removeTagFromSourceTags(tag) {

      var sourceTags = this.state.sourceTags.filter(function (e) {

        return e.label !== tag;
      });

      this.setState({ sourceTags: sourceTags });
    }

    //add new tag

  }, {
    key: 'add',
    value: function add(value) {

      if (value.trim().length === 0) //empty
        {
          //set error info
          this.showInputError();
          return;
        }

      value = value.trim(); //remove spaces

      if (this.props.onlyFromSource) {
        //so only tags exists in souce can be added
        if (!this.tagInSourceList(value)) return this.showCannotError(); //not allowed tag
      }

      this.hideInputError();

      if (this.tagExistsInList(value)) return this.setState({ value: "" }); //we have this tag -clear input

      //remove from autocomplete list
      this.removeTagFromSourceTags(value);

      var tags = this.state.tags;
      tags.unshift({ label: value });

      this.setState({ tags: tags, value: "" }); //set new tags and clean value

      if (this.props.onAdd !== null) this.props.onAdd(this.state.tags[0], this.state.tags); //we send to callback current tags
    }

    /*
    Shows error when tah is nota allowed
    */

  }, {
    key: 'showCannotError',
    value: function showCannotError() {

      this.setState({ errorText: this.props.onlyFromSourceErrorText });
    }

    /*
    Shows error when not value is inserted in TextField
    */

  }, {
    key: 'showInputError',
    value: function showInputError() {
      this.setState({ errorText: this.errorText });
    }
  }, {
    key: 'hideInputError',
    value: function hideInputError() {

      this.setState({ errorText: null });
    }

    //render single tag

  }, {
    key: 'renderTag',
    value: function renderTag(data, key) {
      var _this2 = this;

      var otherChip = _objectWithoutProperties(this.props.chip, []);

      return _react2.default.createElement(
        _Chip2.default,
        _extends({}, otherChip, {
          key: key,
          onRequestDelete: function onRequestDelete() {
            return _this2.handleRequestDelete(data, key);
          }
        }),
        data.label
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var tags = this.state.tags.map(function (tag, index) {

        return _this3.renderTag(tag, index);
      });

      var button = null;
      //add button
      if (this.props.button !== null) {
        var _props$button = this.props.button,
            child = _props$button.child,
            style = _props$button.style,
            otherButtonProps = _objectWithoutProperties(_props$button, ['child', 'style']);

        var childEl = child ? child : _react2.default.createElement(_add2.default, null); //something inside button

        style = _extends({}, style);
        style.verticalAlign = "top";

        button = _react2.default.createElement(
          _FloatingActionButton2.default,
          _extends({ mini: true, style: style }, otherButtonProps, { onClick: this.buttonClickHandler.bind(this) }),
          childEl
        );
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_AutoComplete2.default, _extends({}, this.props.textField, {
            ref: 'textField',
            disableFocusRipple: false,
            searchText: this.state.value,
            dataSourceConfig: { text: 'label', value: 'label' },
            dataSource: this.state.sourceTags,
            onNewRequest: this.handleAutocomplete.bind(this),
            onUpdateInput: this.handleTextValueChange.bind(this),
            errorText: this.state.errorText,
            onKeyPress: this.handleKeyPress.bind(this) })),
          button
        ),
        _react2.default.createElement(
          'div',
          { style: this.getContainerStyle(), className: this.getContainerClassName() },
          tags
        )
      );
    }
  }]);

  return Tags;
}(_react.Component);

//props definitions


Tags.propTypes = {
  defTags: _react2.default.PropTypes.array, //start tags
  sourceTags: _react2.default.PropTypes.array, //tags created before and used in autocomplete
  onlyFromSource: _react2.default.PropTypes.bool, //if true it will not allow to add tag which not exists in tag list
  onlyFromSourceErrorText: _react2.default.PropTypes.string, //error info when onlyFromSource is on true and user wants add other tag
  textField: _react2.default.PropTypes.object, //textField props
  chip: _react2.default.PropTypes.object, //chip props
  containerClassName: _react2.default.PropTypes.string, //class for container
  containerStyle: _react2.default.PropTypes.object, //style for container
  onRemove: _react2.default.PropTypes.func, //remove, delete tag callback function(removedTag,allTags)
  onAdd: _react2.default.PropTypes.func, //add callback  function(addedTag,allTags)
  button: _react2.default.PropTypes.object, //button props - it has child prop inside
  handleInputChange: _react2.default.PropTypes.func

};

//default values
Tags.defaultProps = {
  defTags: [],
  sourceTags: [],
  onlyFromSource: false,
  onlyFromSourceErrorText: "This tag is not allowed",
  containerClassName: "tags-container",
  containerStyle: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  textField: { id: (Math.random() * 1000).toString(), maxSearchResults: 5 },
  chip: null,
  onRemove: null,
  onAdd: null,
  button: { child: _react2.default.createElement(_add2.default, null) } //default + icon
};

exports.default = Tags;