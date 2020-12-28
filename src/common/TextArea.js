import React, { PureComponent } from "react";
import { TextInput as NativeInput } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  BasePropTypes,
  dimensionsStyles,
  paddingStyles,
  fontSizeStyles,
  fontFamilyStyles,
  textDirectionStyles,
  colorStyles,
  borderStyles,
  borderRadiusStyles,
  backgroundColorStyles,
  elevationStyles
} from "./Base";
import { isASCII } from "./utils/text";
import View from "./View";
import InputError from "./micro/InputError";
import { getTheme } from "./Theme";
import { convertNumbers } from "./utils/numbers";

class TextArea extends PureComponent {
  static propTypes = {
    ...BasePropTypes,
    initialValue: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    placeholder: PropTypes.string,
    placeholderColor: PropTypes.string,
    error: PropTypes.string,
    noValidation: PropTypes.bool,
    noBorder: PropTypes.bool
  };

  state = {
    isTouched: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset !== this.props.reset) {
      this.clear();
    }

    if (nextProps.error && !this.state.isTouched) {
      this.setState({
        isTouched: true
      });
    }
  }

  static defaultProps = {
    ...getTheme().textArea,
    noBorder: false
  };

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.state = {
      text: props.initialValue
    };
  }

  onChangeText = (text, noValidate) => {
    const { name, onChange } = this.props;

    this.setState({
      text
    });

    if (onChange) {
      if (name) onChange(name, text, !this.state.isTouched || noValidate);
      else onChange(text);
    }
  };

  onBlur = () => {
    const { name, onBlur } = this.props;

    if (onBlur) {
      if (name) onBlur(name, this.state.text);
      else onBlur(this.state.text);
    }
  };

  onFocus = () => {
    const { name, onFocus } = this.props;

    if (onFocus) {
      if (name) onFocus(name, this.state.text);
      else onFocus(this.state.text);
    }
    this.setState({ isTouched: true });
  };

  onSubmitEditing = () => {
    const { name, onSubmitEditing } = this.props;

    if (onSubmitEditing) {
      if (name) onSubmitEditing(name, this.state.text);
      else onSubmitEditing(this.state.text);
    }
  };

  focus = () => {
    this.inputRef.current.focus();
  };

  blur = () => {
    this.inputRef.current.blur();
  };

  clear = () => {
    this.inputRef.current.clear();
    this.onChangeText("", true);
  };

  render() {
    const {
      placeholder,
      placeholderColor,
      rtl,
      translateNumbers,
      noValidation,
      error,
      size,
      flex,
      margin,
      marginHorizontal,
      marginVertical,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      underlineColor,
      maxLength,
      editable,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      noBorder
    } = this.props;

    return (
      <View
        stretch
        flex={flex}
        margin={margin}
        marginHorizontal={marginHorizontal}
        marginVertical={marginVertical}
        marginTop={marginTop}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
        borderBottomLeftRadius={borderBottomLeftRadius}
        borderBottomRightRadius={borderBottomRightRadius}
        borderTopLeftRadius={borderTopRightRadius}
        borderTopRightRadius={borderTopRightRadius}
      >
        <NativeInput
          ref={this.inputRef}
          maxLength={maxLength}
          // {...rest}
          placeholder={convertNumbers(
            placeholder,
            translateNumbers ? rtl : false
          )}
          placeholderTextColor={placeholderColor}
          multiline
          blurOnSubmit
          editable={editable}
          value={this.state.text}
          underlineColorAndroid={underlineColor}
          onChangeText={this.onChangeText}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onSubmitEditing={this.onSubmitEditing}
          style={[
            dimensionsStyles(this.props),
            backgroundColorStyles(this.props),
            textDirectionStyles(this.props),
            fontSizeStyles(this.props),
            fontFamilyStyles(this.props),
            colorStyles(this.props),
            borderStyles(this.props),
            borderRadiusStyles(this.props),
            elevationStyles(this.props),
            {
              alignSelf: "stretch",
              textAlignVertical: "top",
              padding: 0,
              writingDirection: isASCII(this.state.text) ? "ltr" : "rtl"
            },
            paddingStyles(this.props)
          ]}
        />
        {!noValidation ? <InputError error={error} size={size} /> : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl
});

export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true }
)(TextArea);
