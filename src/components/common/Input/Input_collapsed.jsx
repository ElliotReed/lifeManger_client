import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import PropTypes from "prop-types";

import ErrorMessage from "../ErrorMessage";

import styles from "./Input.module.scss";

export function CollapsedInput({
  initialValue = "",
  focus = false,
  label,
  name,
  placeholder,
  type = "text",
}) {
  const [value, setValue] = React.useState(initialValue);
  const [displayInput, setDisplayInput] = React.useState(false);
  const inputRef = React.useRef(null);

  const barClass = classNames(styles.bar, displayInput ? styles.hideBar : "");
  const activeBarClass = classNames(
    styles.activeBar,
    displayInput ? styles.show : ""
  );

  const handleBlur = (e) => {
    setDisplayInput(false);
  };

  const handleClick = (e) => {
    setDisplayInput(true);
  };

  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    displayInput && inputRef.current.focus();
  }, [displayInput]);

  return (
    <div className={styles.CollapsedInput}>
      <section className={barClass} onClick={handleClick}>
        <label className={styles.label}>{label}</label>
        <span className={styles.value}>{value}</span>
        <span className={styles.icon}>
          {value.length > 0 && !displayInput ? (
            <FontAwesomeIcon icon={["fas", "edit"]} />
          ) : !displayInput ? (
            <FontAwesomeIcon icon={["fas", "plus"]} />
          ) : (
            ""
          )}
        </span>
      </section>

      <section className={activeBarClass}>
        <label className={styles.label}>{label}</label>
        <input
          onBlur={handleBlur}
          className={styles.input}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleOnChange}
          ref={inputRef}
        />
        <div className={styles.buttonContainer}>
          {/* <button className={styles.btn}>cancel</button> */}
          <button className={styles.btn}>done</button>
        </div>
      </section>
    </div>
  );
}

export function HiddenInput({
  initialValue = "",
  focus = false,
  label,
  name,
  placeholder,
  type = "text",
}) {
  const [value, setValue] = React.useState(initialValue);
  const [displayInput, setDisplayInput] = React.useState(false);

  const handleBlur = (e) => {
    setDisplayInput(false);
  };
  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  const handleDisplayInput = () => {
    setDisplayInput(!displayInput);
  };
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className={styles.HiddenInput}>
      <label
        className={styles.label}
        htmlFor={name}
        onClick={handleDisplayInput}
      >
        <span className={styles.labelText}>{label}</span>
        <span className={styles.selected}>{value}</span>
        <span className={styles.icon}>
          {value.length > 0 && !displayInput ? (
            <FontAwesomeIcon icon={["fas", "edit"]} />
          ) : !displayInput ? (
            <FontAwesomeIcon icon={["fas", "plus"]} />
          ) : (
            ""
          )}
        </span>
      </label>
      <input
        className={displayInput ? styles.displayInput : styles.hideInput}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
        onBlur={handleBlur}
      />
    </div>
  );
}

export function HiddenInputSelector({
  name,
  initialValue = "",
  label,
  options = [],
  placeholder,
}) {
  const [displayList, setDisplayList] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState({});

  let listClass = classNames(
    styles.list,
    displayList ? styles.displayList : ""
  );

  const handleOnChange = (e) => {
    const targetValue = e.target.dataset.value;
    const selected = options.filter((option) => option.id === targetValue)[0];
    setSelectedOption(selected);
    setDisplayList(false);
  };

  React.useEffect(() => {
    // setValue(initialValue);
  }, [initialValue]);

  return (
    <div name="select" className={styles.HiddenInputSelector}>
      <label
        htmlFor={name}
        onClick={() => setDisplayList(!displayList)}
        className={styles.label}
      >
        <span className={styles.labelText}>{label}</span>
        <span className={styles.selected}> {selectedOption?.label}</span>
        <span className={styles.icon}>
          {displayList ? (
            <FontAwesomeIcon icon={["fas", "caret-up"]} />
          ) : (
            <FontAwesomeIcon icon={["fas", "caret-down"]} />
          )}
        </span>
      </label>

      <input type="hidden" name={name} value={selectedOption.id} />
      <div>
        <ul className={listClass}>
          {options.map((option) => (
            <li
              key={option.id}
              data-value={option.id}
              label={option.name}
              onClick={handleOnChange}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Input({
  initialValue = "",
  focus,
  label,
  name,
  placeholderText,
  type = "text",
  classNames,
}) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.Input}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholderText}
        value={value}
        onChange={handleOnChange}
        autoFocus={focus}
      />
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholderText: PropTypes.string,
};

export function TextArea({
  name,
  rows,
  cols,
  initialValue = "",
  label,
  placeholder,
}) {
  const [value, setValue] = React.useState(initialValue);

  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <textarea
        className="form-control"
        name={name}
        rows={rows}
        cols={cols}
        value={value}
        onChange={handleOnChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export function Select({
  name,
  initialValue = "",
  label,
  options = [],
  placeholder,
}) {
  const [value, setValue] = React.useState(initialValue);

  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div name="select" className={styles.Input}>
      <label htmlFor={name}> {label} </label>
      <select name={name} value={value} onChange={handleOnChange}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => {
          return (
            <option key={option.id} value={option.id} label={option.name}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export function StatelessSelect({ value, onChange, label, children, name }) {
  return (
    <div className={styles.Input}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.custom_select}>
        <select value={value} onChange={onChange} id={name} name={name}>
          {children}
        </select>
      </div>
    </div>
  );
}

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

export class InputText extends React.Component {
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

export class InputEmail extends React.Component {
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

export class InputPassword extends React.Component {
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

export class InputTextArea extends React.Component {
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

export class InputSelect extends React.Component {
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
    const { name, labelText, options, errorMessage, required, presetValue } =
      this.props;

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

export class InputCheck extends React.Component {
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
