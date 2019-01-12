import React, { Component } from "react";

import './index.css';
const BACKSPACE_KEY = 8;
const LEFT_ARROW_KEY = 37;
const UP_ARROW_KEY = 38;
const RIGHT_ARROW_KEY = 39;
const DOWN_ARROW_KEY = 40;
const E_KEY = 69;

class PINInput extends Component {
  constructor(props) {
    super(props);

    const { fields, type, isValid, readOnly, filterKeyCodes, forceUppercase } = props;
    let { value } = props;

    if (forceUppercase) {
      value = value.toUpperCase();
    }

    this.state = {
      value,
      fields,
      type,
      input: [],
      fakeValues: [],
      isValid,
      readOnly,
      filterKeyCodes
    };

    for (let i = 0; i < Number(this.state.fields); i += 1) {
      if (i < 32) {
        const value = this.state.value[i] || '';
        this.state.input.push(value);
        this.state.fakeValues.push(value);
      }
    }

    this.textInput = [];

  }

  handleBlur = (e) => {
    this.setState({ focusOut: true });
  };

  handelFocus = (e) => {
    this.setState({ focusOut: false });
    e.target.select(e);
  };

  handleChange = (e) => {
    const { filterChars } = this.props;

    let value = String(e.target.value);

    if (this.props.forceUppercase) {
      value = value.toUpperCase();
    }

    if (this.state.type === 'number') {
      value = value.replace(/[^\d]/g, '');
    }

    /** Filter Chars */
    value = value.split('').filter(currChar => !filterChars.includes(currChar)).join('');

    let fullValue = value;

    if (value !== '') {
      const input = this.state.input.slice();

      if (value.length > 1) {
        value.split('').map((chart, i) => {
          if (Number(e.target.dataset.id) + i < this.props.fields) {
            input[Number(e.target.dataset.id) + i] = chart;
          }
          return false;
        });
      } else {
        input[Number(e.target.dataset.id)] = value;
      }

      input.map((s, i) => {
        if (this.textInput[i]) {
          this.textInput[i].value = s;
        }
        return false;
      });

      const newTarget = this.textInput[e.target.dataset.id < input.length
        ? Number(e.target.dataset.id) + 1
        : e.target.dataset.id];

      if (newTarget) {
        newTarget.focus();
        newTarget.select();
      }

      fullValue = input.join('');

      this.setState({ value: input.join(''), input });
    }

    if (this.props.onChange && fullValue) {
      this.props.onChange(fullValue);
    }

  };


  handleKeyDown = (e) => {
    if(this.props.readOnly){
      return false;
    }
    const target = Number(e.target.dataset.id),
      nextTarget = this.textInput[target + 1],
      prevTarget = this.textInput[target - 1];

    let input, value;

    if (this.state.filterKeyCodes.length > 0) {
      this.state.filterKeyCodes.map((item) => {
        if (item === e.keyCode) {
          e.preventDefault();
          return true;
        }
      });
    }

    switch (e.keyCode) {
      case BACKSPACE_KEY:
        e.preventDefault();
        this.textInput[target].value = '';
        input = this.state.input.slice();
        input[target] = '';
        value = input.join('');

        this.setState({ value, input });
        if (this.textInput[target].value === '') {
          if (prevTarget) {
            prevTarget.focus();
            prevTarget.select();
          }
        }
        if (this.props.onChange) {
          this.props.onChange(value);
        }
        break;

      case LEFT_ARROW_KEY:
        e.preventDefault();
        if (prevTarget) {
          prevTarget.focus();
          prevTarget.select();
        }
        break;

      case RIGHT_ARROW_KEY:
        e.preventDefault();
        if (nextTarget) {
          nextTarget.focus();
          nextTarget.select();
        }
        break;

      case UP_ARROW_KEY:
        e.preventDefault();
        break;

      case DOWN_ARROW_KEY:
        e.preventDefault();
        break;

      case E_KEY:
        if (e.target.type === 'number') {
          e.preventDefault();
          break;
        }
    }

  };

  getInputType = (type, i) => {
    let inputLength = this.state.input.filter(item => item).length;
    if (this.props.showLastTypedValue && inputLength > 1 && i < inputLength - 1) {
      return 'password';
    }
    return type;
  };

  render() {
    const { inputType, pattern, showLastTypedValue, value, type, inputClassName, inputWrapperClassName, readOnly } = this.props;
    let { input, isValid, focusOut } = this.state;
    let passwordType = (showLastTypedValue && focusOut) ? 'password' : (type === 'password' && !showLastTypedValue) ? 'password' : false;

    input = input.sort(function (a, b) {
      if (a && b) return a;
      if (!a || !b) {
        return b - a;
      }
    });

    return (
      <div className={inputWrapperClassName}>
        {input.map((character, i) => {
          return (
            <input
              ref={(ref) => {
                this.textInput[i] = ref;
              }}
              type={type !== 'password' ? type : passwordType || this.getInputType(inputType, i)}
              className={inputClassName}
              id={`${'pin-input'}-${i}`}
              data-id={i}
              autoFocus={(value.length === i)}
              value={character}
              key={`input_${i}`}
              min={0}
              max={1}
              maxLength={input.length === i + 1 ? 1 : input.length}
              autoComplete="off"
              onFocus={this.handelFocus}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              data-valid={isValid}
              pattern={pattern}
              readOnly={readOnly}
            />
          );
        })}
      </div>
    );
  }
}

PINInput.defaultProps = {
  autoFocus: true,
  isValid: true,
  readOnly: false,
  forceUppercase: false,
  fields: 4,
  inputType: 'text',
  type: 'text',
  showLastTypedValue: false,
  value: '',
  filterKeyCodes: [189, 190],
  filterChars: ['-', '.'],
  inputClassName: 'pin-input',
  inputWrapperClassName: 'pin-input-wrapper'
};

export default PINInput;