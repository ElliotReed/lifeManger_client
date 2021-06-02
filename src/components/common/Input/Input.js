import React, { Component } from "react";
import PropTypes from "prop-types";
import ErrorMessage from "../ErrorMessage";
import "./Input.module.scss";

export const Input = (props) => {
  const {
    focus,
    handleOnChange,
    label,
    name,
    placeholderText,
    value,
    type,
    classNames,
  } = props;

  return (
    <div name="input" className={classNames}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholderText}
        value={value || ""}
        onChange={handleOnChange}
        autoFocus={focus}
      />
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  labelText: PropTypes.string,
  placeholderText: PropTypes.string,
};

export const TextArea = (props) => (
  <div className="form-group">
    <label className="form-label">{props.label}</label>
    <textarea
      className="form-control"
      name={props.name}
      rows={props.rows}
      cols={props.cols}
      value={props.value}
      onChange={props.handleOnChange}
      placeholder={props.placeholder}
    />
  </div>
);

export const Select = (props) => {
  return (
    <div name="select">
      <label htmlFor={props.name}> {props.label} </label>
      <select
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
      >
        <option value="" disabled>
          {props.placeholder}
        </option>
        {props.options.map((option) => {
          return (
            <option key={option.id} value={option.id} label={option.name}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export const CheckBox = (props) => {
  return (
    <div>
      <label htmlFor={props.name} className="form-label">
        {props.label}
      </label>
      <div className="checkbox-group">
        {props.options.map((option) => {
          return (
            <label key={option}>
              <input
                className="form-checkbox"
                id={props.name}
                name={props.name}
                onChange={props.handleChange}
                value={option}
                checked={props.selectedOptions.indexOf(option) > -1}
                type="checkbox"
              />{" "}
              {option}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export class InputText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      isValid: true,
    };
    this.inputElement = React.createRef();
  }

  handleOnChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ value: value });
    if (this.state.isValid) {
      this.props.getInputValue(name, value);
    }
  };

  componentDidMount() {
    if (this.props.focus) {
      this.inputElement.current.focus();
    }
  }

  render() {
    const {
      focus,
      name,
      labelText,
      placeholderText,
      type,
      errorMessage,
      presetValue,
    } = this.props;

    return (
      <div name="TextInput">
        <label htmlFor={name}>{labelText}</label>
        <input
          ref={this.inputElement}
          name={name}
          type={type}
          placeholder={placeholderText}
          value={presetValue ? presetValue : this.state.value}
          onChange={this.handleOnChange}
          autoFocus={focus}
        />
        {!this.state.isValid && <ErrorMessage errorMessage={errorMessage} />}
      </div>
    );
  }

  static propTypes = {
    name: PropTypes.string,
    labelText: PropTypes.string,
    placeholderText: PropTypes.string,
  };
}

export class InputEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      isValid: true,
    };
  }

  handleOnChange = (event) => {
    const value = event.target.value;
    this.setState({ value: value });
    if (this.state.isValid) {
      this.props.getInputValue(value);
    }
  };

  render() {
    const { name, labelText, placeholderText, errorMessage } = this.props;

    return (
      <div name="TextInput">
        <label htmlFor={name}>{labelText}</label>
        <input
          name={name}
          type="text"
          placeholder={placeholderText}
          value={this.state.value}
          onChange={this.handleOnChange}
        />
        {!this.state.isValid && <ErrorMessage errorMessage={errorMessage} />}
      </div>
    );
  }

  static propTypes = {
    name: PropTypes.string,
    labelText: PropTypes.string,
    placeholderText: PropTypes.string,
  };
}

export class InputPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      isValid: true,
    };
  }

  handleOnChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { name, labelText, placeholderText, errorMessage } = this.props;

    return (
      <div name="PasswordInput">
        <label htmlFor={name}>{labelText}</label>
        <input
          name={name}
          type="password"
          placeholder={placeholderText}
          value={this.state.value}
          onChange={this.handleOnChange}
        />
        {!this.state.isValid && <ErrorMessage errorMessage={errorMessage} />}
      </div>
    );
  }

  static propTypes = {
    name: PropTypes.string,
    labelText: PropTypes.string,
    placeholderText: PropTypes.string,
  };
}

export class InputTextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      isValid: true,
    };
    this.inputElement = React.createRef();
  }

  handleOnChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ value: value });
    if (this.state.isValid) {
      this.props.getInputValue(name, value);
    }
  };

  componentDidMount() {
    if (this.props.focus) {
      this.inputElement.current.focus();
    }
  }

  render() {
    const {
      focus,
      name,
      labelText,
      placeholderText,
      type,
      errorMessage,
      presetValue,
    } = this.props;

    return (
      <div name="TextInput">
        <label htmlFor={name}>{labelText}</label>
        <textarea
          ref={this.inputElement}
          name={name}
          type={type}
          placeholder={placeholderText}
          value={presetValue ? presetValue : this.state.value}
          onChange={this.handleOnChange}
          onFocus={focus}
        />
        {!this.state.isValid && <ErrorMessage errorMessage={errorMessage} />}
      </div>
    );
  }

  static propTypes = {
    name: PropTypes.string,
    labelText: PropTypes.string,
    placeholderText: PropTypes.string,
  };
}

export class InputSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      isValid: true,
    };
  }

  handleOnChange = (event) => {
    const value = event.target.value;
    this.setState({ value: value });
    if (this.state.isValid) {
      this.props.getInputValue(this.props.name, value);
    }
  };

  render() {
    const {
      name,
      labelText,
      options,
      errorMessage,
      required,
      presetValue,
    } = this.props;

    return (
      <div name="InputSelect">
        <label htmlFor={name}>{labelText}</label>
        <select
          name={name}
          required={required}
          value={presetValue ? presetValue : this.state.value}
          onChange={this.handleOnChange}
        >
          {!presetValue && (
            <option value="" className="placeholder">
              Select...
            </option>
          )}

          {options &&
            options.map((option) => (
              <option key={option.id} value={option.id}>
                {`${option.name}
										${option.description ? "(" + option.description + ")" : ""}`}
              </option>
            ))}
        </select>
        {!this.state.isValid && <ErrorMessage errorMessage={errorMessage} />}
      </div>
    );
  }

  static propTypes = {
    name: PropTypes.string,
    labelText: PropTypes.string,
    placeholderText: PropTypes.string,
  };
}

export class InputCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  handleOnChange = (event) => {
    const checked = event.target.checked;
    this.setState({ checked: checked });
    this.props.getInputValue(this.props.name, checked);
  };

  render() {
    const { name, labelText, presetValue } = this.props;

    return (
      <div name="InputCheck" className="input-check__container">
        <input
          name={name}
          type="checkbox"
          checked={presetValue ? presetValue : this.state.checked}
          onChange={this.handleOnChange}
        />
        <label htmlFor={name} className="input-check__label">
          {labelText}
        </label>
      </div>
    );
  }

  static propTypes = {
    name: PropTypes.string,
    labelText: PropTypes.string,
    placeholderText: PropTypes.string,
  };
}
