import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import PropTypes from "prop-types";

import ErrorMessage from "../ErrorMessage";

import WithLoading from "components/WithLoading";

import styles from "./Input.module.scss";

export function FullScreen({ name }) {
  const [value, setValue] = React.useState();

  return (
    <div>
      <label htmlFor={name}>Asset</label>
      <input
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export function InputComponent({
  dataId,
  initialValue = "",
  label = "",
  name,
  onSubmit,
  placeholder,
  description = "",
  type = "text",
  ...rest
}) {
  const ref = React.useRef();
  const [value, setValue] = React.useState("");
  const [hasFocus, setFocus] = React.useState(false);

  const inputClass = classNames(styles.input, {
    [styles.inputChange]: hasFocus,
  });

  const InputTag = type === "textarea" ? "textarea" : "input";

  function handleOnKeyUp(e) {
    e = e || window.event;
    if (e.keyCode === 27) {
      setFocus(false);
    }
  }

  function handleBlur() {
    // setFocus(false);
    return;
  }
  function cancelEdit() {
    ref.current.blur();
    setFocus(false);
  }

  function setInputFocus() {
    setFocus(true);
    ref.current.focus();
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  React.useEffect(() => {
    initialValue && setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    if (document.hasFocus() && ref.current.contains(document.activeElement)) {
      setFocus(true);
    }
  });

  return (
    <div className={styles.FieldForm}>
      <form data-id={dataId} onSubmit={onSubmit}>
        <div className={styles.InputComponent}>
          <InputComponentLabel
            label={label}
            name={name}
            hasFocus={hasFocus}
            placeholder={placeholder}
          />

          <div className={styles.inputWrapper}>
            <div>
              <InputTag
                type={type}
                id={name}
                name={name}
                className={inputClass}
                placeholder={placeholder}
                value={value}
                ref={ref}
                {...rest}
                onKeyUp={handleOnKeyUp}
                onChange={handleChange}
                onFocus={setInputFocus}
                onBlur={handleBlur}
              />
            </div>
            <InputComponentEditButton
              setInputFocus={setInputFocus}
              hasFocus={hasFocus}
            />
            <InputComponentEditorControls
              cancel={cancelEdit}
              setFocus={setFocus}
              hasFocus={hasFocus}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

function InputComponentEditButton({ setInputFocus, hasFocus }) {
  const editBtnClass = classNames(styles.editBtn, {
    [styles.editBtnChange]: hasFocus,
  });
  return (
    <button className={editBtnClass} onClick={setInputFocus} type="button">
      <FontAwesomeIcon icon={["fas", "edit"]} />
    </button>
  );
}

function InputComponentEditorControls({ cancel, setFocus, hasFocus }) {
  const editorControlsClass = classNames(styles.editorControls, {
    [styles.editorControlsChange]: hasFocus,
  });

  return (
    <div className={editorControlsClass}>
      <button type="button" onClick={cancel}>
        cancel
      </button>
      <button type="submit" onClick={() => setFocus(false)}>
        save
      </button>
    </div>
  );
}

function InputComponentLabel({ label, name, hasFocus, placeholder }) {
  const labelClass = classNames(styles.label, {
    [styles.labelChange]: hasFocus,
  });

  const labelText = hasFocus ? (placeholder ? placeholder : label) : label;

  return (
    label.length > 0 && (
      <div className={styles.labelWrapper}>
        <label htmlFor={name} className={labelClass}>
          {labelText}
        </label>
      </div>
    )
  );
}

export function SelectorComponent({
  initialValue = "",
  dataId,
  label,
  name,
  onSubmit,
  options = [],
  placeholder,
}) {
  const [displayList, setDisplayList] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState({});

  let labelClass = classNames(styles.label, {
    [styles.labelChange]: displayList,
  });

  let iconClass = classNames(styles.icon, { [styles.iconChange]: displayList });

  let inputClass = classNames(styles.input, {
    [styles.inputChange]: displayList,
  });

  const submitForm = (targetValue) => {
    const event = {
      id: dataId,
      fieldValues: { [name]: targetValue },
      nonevent: true,
    };
    // onSubmit expects a form submit event, this fake event is a workaround
    onSubmit(event);
  };

  const handleOnChange = (e) => {
    const targetValue = e.target.dataset.value;
    const selected = options.filter((option) => option.id === targetValue)[0];
    setSelectedOption(selected);
    setDisplayList(false);
    submitForm(targetValue);
  };

  React.useEffect(() => {
    setSelectedOption(
      options.filter((option) => option.id === initialValue)[0]
    );
  }, [initialValue]);

  return (
    <div name="select" className={styles.SelectorComponent}>
      <form data-id={dataId}>
        <label
          htmlFor={name}
          onClick={() => setDisplayList(!displayList)}
          className={labelClass}
        >
          {label}
        </label>
        <div className={styles.inputWrapper}>
          <input
            readOnly
            onClick={() => setDisplayList(!displayList)}
            autoComplete="off"
            className={inputClass}
            value={selectedOption?.label ? selectedOption.label : placeholder}
          />

          <button
            type="button"
            className={iconClass}
            onClick={() => setDisplayList(!displayList)}
          >
            <FontAwesomeIcon icon={["fas", "caret-down"]} />
          </button>
          <div>
            <SelectorComponentDropdownList
              displayList={displayList}
              options={options}
              selectedOption={selectedOption}
              handleOnChange={handleOnChange}
            />
          </div>
          <input type="hidden" name={name} value={selectedOption?.id || ""} />
        </div>
      </form>
    </div>
  );
}

function SelectorComponentDropdownList({
  displayList,
  options,
  selectedOption,
  handleOnChange,
}) {
  let listClass = classNames(styles.list, {
    [styles.displayList]: displayList,
  });

  return (
    <ul className={listClass}>
      {options.map((option) => (
        <SelectorComponentListItem
          key={option.id}
          option={option}
          selected={selectedOption}
          handleOnChange={handleOnChange}
        />
      ))}
    </ul>
  );
}

function SelectorComponentListItem({ option, selected, handleOnChange }) {
  return (
    <li
      className={option.id === selected?.id ? styles.selected : null}
      key={option.id}
      data-value={option.id}
      label={option.name}
      onClick={handleOnChange}
    >
      <p>{option.label}</p>
      <hr className={styles.seperator} />
    </li>
  );
}

export function SearchTextComponent({
  initialValue = "",
  dataId,
  label,
  name,
  onSearchChange,
  ListItemComponent,
  handleSubmit,
  placeholder,
  ...rest
}) {
  const ref = React.useRef();
  const [hasFocus, setFocus] = React.useState(false);
  const [searchText, setSearchText] = React.useState(initialValue);
  const [displayList, setDisplayList] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState({ id: "" });
  const [options, setOptions] = React.useState([]);

  let labelClass = classNames(styles.label, {
    [styles.labelChange]: displayList,
  });

  let inputClass = classNames(styles.input, {
    [styles.inputChange]: displayList,
  });

  const editBtnClass = classNames(styles.editBtn, {
    [styles.editBtnChange]: hasFocus,
  });

  const lineClass = classNames(styles.line, {
    [styles.lineChange]: hasFocus,
  });

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    // const targetValue = e.target.dataset.value;
    // const selected = options.filter((option) => option.id === targetValue)[0];
    // setSelectedOption(selected);
    // setDisplayList(false);
  };

  // const handleOptionClick = (e) => {
  //   console.log("e.target: ", e.target);
  // };

  // const reset = () => {
  //   setDisplayList(false);
  //   setSearchText(initialValue);
  // };

  // function handleOnKeyUp(e) {
  //   e = e || window.event;
  //   if (e.keyCode === 27) {
  //     setFocus(false);
  //   }
  // }

  function handleBlur() {
    // setFocus(false);
    return;
  }

  // React.useEffect(() => {
  //   // reset();
  // }, [selectedOption]);

  React.useEffect(() => {
    setSelectedOption(
      options.filter((option) => option.id === initialValue)[0]
    );
  }, [initialValue]);

  // React.useEffect(() => {
  //   // setSearchText(initialValue);
  // }, [initialValue]);

  React.useEffect(() => {
    if (document.hasFocus() && ref.current.contains(document.activeElement)) {
      setFocus(true);
    }
  });

  React.useEffect(() => {
    const getData = async () => {
      if (searchText.length > 0) {
        setOptions(await onSearchChange(searchText));
      }
    };

    getData();
  }, [searchText]);

  return (
    <div className={styles.SearchTextComponent}>
      {label.length > 0 && (
        <label
          htmlFor={name}
          className={labelClass}
          // onClick={() => setDisplayList(!displayList)}
        >
          {hasFocus ? (placeholder ? placeholder : label) : label}
        </label>
      )}

      <div className={styles.inputWrapper}>
        <div>
          <input
            autoComplete="off"
            className={inputClass}
            id={name}
            name={name}
            placeholder={placeholder}
            ref={ref}
            value={searchText}
            onBlur={handleBlur}
            onChange={handleInputChange}
            onClick={() => setDisplayList(!displayList)}
            onFocus={() => setFocus(true)}
            // onKeyUp={handleOnKeyUp}
            {...rest}
          />
          {/* <div className={lineClass}></div> */}
        </div>
        <button
          className={editBtnClass}
          type="button"
          onClick={() => {
            setFocus(true);
            ref.current.focus();
            setDisplayList(!displayList);
          }}
        >
          {searchText.length === 0 ? (
            <FontAwesomeIcon icon={["fas", "search"]} />
          ) : (
            <FontAwesomeIcon
              icon={["fas", "times"]}
              className={styles.clearBtn}
              onClick={() => setSearchText("")}
            />
          )}
        </button>
        <div>
          <DropdownList
            displayList={displayList}
            options={options}
            selectedOption={selectedOption}
            ListItemComponent={ListItemComponent}
            dataId={dataId}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export const SearchTextComponentWithLoading = WithLoading(SearchTextComponent);

function DropdownList({
  options,
  selectedOption,
  ListItemComponent,
  dataId,
  handleSubmit,
  displayList,
}) {
  let listClass = classNames(styles.DropdownList, {
    [styles.displayList]: displayList,
  });

  return (
    <ul className={listClass}>
      {options.map((option) => (
        <li className={styles.listItem} key={option.id}>
          <ListItemComponent
            item={option}
            dataId={dataId}
            handleSubmit={handleSubmit}
          />
          <hr className={styles.seperator} />
        </li>
      ))}
    </ul>
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
