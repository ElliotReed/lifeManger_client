import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../components/UI/ErrorMessage';
import './Input.module.scss';

export class InputText extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			isValid: true,
		};
		this.inputElement = React.createRef();
	}

	handleOnChange = event => {
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
			<div id="TextInput">
				<label htmlFor={name}>{labelText}</label>
				<input
					ref={this.inputElement}
					name={name}
					type={type}
					placeholder={placeholderText}
					value={presetValue ? presetValue : this.state.value}
					onChange={this.handleOnChange}
				/>
				{!this.state.isValid && (
					<ErrorMessage errorMessage={errorMessage} />
				)}
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
			value: '',
			isValid: true,
		};
	}

	handleOnChange = event => {
		const value = event.target.value;
		this.setState({ value: value });
		if (this.state.isValid) {
			this.props.getInputValue(value);
		}
	};

	render() {
		const { name, labelText, placeholderText, errorMessage } = this.props;

		return (
			<div id="TextInput">
				<label htmlFor={name}>{labelText}</label>
				<input
					name={name}
					type="text"
					placeholder={placeholderText}
					value={this.state.value}
					onChange={this.handleOnChange}
				/>
				{!this.state.isValid && (
					<ErrorMessage errorMessage={errorMessage} />
				)}
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
			value: '',
			isValid: true,
		};
	}

	handleOnChange = event => {
		this.setState({ value: event.target.value });
	};

	render() {
		const { name, labelText, placeholderText, errorMessage } = this.props;

		return (
			<div id="PasswordInput">
				<label htmlFor={name}>{labelText}</label>
				<input
					name={name}
					type="password"
					placeholder={placeholderText}
					value={this.state.value}
					onChange={this.handleOnChange}
				/>
				{!this.state.isValid && (
					<ErrorMessage errorMessage={errorMessage} />
				)}
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
			value: '',
			isValid: true,
		};
		this.inputElement = React.createRef();
	}

	handleOnChange = event => {
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
			<div id="TextInput">
				<label htmlFor={name}>{labelText}</label>
				<textarea
					ref={this.inputElement}
					name={name}
					type={type}
					placeholder={placeholderText}
					value={presetValue ? presetValue : this.state.value}
					onChange={this.handleOnChange}
				/>
				{!this.state.isValid && (
					<ErrorMessage errorMessage={errorMessage} />
				)}
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
			value: '',
			isValid: true,
			showOptions: false,
		};
		this.mySelect = React.createRef();
	}

	showOptions = event => {
		this.setState({ showOptions: true });
	};

	handleOptionClick = event => {
		const value = event.target.value;
		console.log(`clicked`);
		this.setState({ value: value });
		if (this.state.isValid) {
			this.props.getInputValue(this.props.name, value);
		}
	};

	handleOnChange = event => {
		const value = event.target.value;
		this.setState({ value: value });
		if (this.state.isValid) {
			this.props.getInputValue(this.props.name, value);
		}
	};

	showOptionsClasses = () => {
		const showOptions = this.state.showOptions;
		let classes = 'select-items';
		if (!showOptions) {
			classes += ' select-hide';
		}
		return classes;
	};

	handleSelectSelected = () => {
		console.log(`${this.mySelect.current.getAttribute('name')}`);
		// console.log(`${this.mySelect.current.options[this.mySelect.selectedIndex]}`)
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
			<div name="SelectInput">
				<label htmlFor={name}>{labelText}</label>
				<div className="custom-select">
					<div onClick={this.showOptions} className="select-selected">
						Select...{this.handleSelectSelected()}
					</div>
					<div
						className={this.showOptionsClasses()}
						onClick={this.handleOptionClick}
					>
						{options.map(option => (
							<div
								className={`${
									this.state.showOptions
										? ''
										: 'same-as-selected'
								}`}
								key={option.id}
								// value={option.id}
								onClick={this.handleOptionClick}
							>
								{option.name}
							</div>
						))}
						<div className={this.showOptionsClasses()}>
							+ add to list
						</div>
					</div>
					<select
						ref={this.mySelect}
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
						{options.map(option => (
							<option key={option.id} value={option.id}>
								{option.name}
							</option>
						))}
						<option className="select-input__option-add">
							+ add to list
						</option>
					</select>
				</div>
				{!this.state.isValid && (
					<ErrorMessage errorMessage={errorMessage} />
				)}
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
			value: '',
			isValid: true,
		};
	}

	handleOnChange = event => {
		this.setState({ value: event.target.value });
	};

	render() {
		const { name, labelText, options, errorMessage } = this.props;

		return (
			<div id="PasswordInput">
				<label htmlFor={name}>{labelText}</label>
				<select
					name={name}
					type="select"
					value={this.state.value}
					onChange={this.handleOnChange}
				>
					options=
					{options.map(option => (
						<option key={option.id} id={option.id}>
							{option.name}
						</option>
					))}
				</select>
				{!this.state.isValid && (
					<ErrorMessage errorMessage={errorMessage} />
				)}
			</div>
		);
	}

	static propTypes = {
		name: PropTypes.string,
		labelText: PropTypes.string,
		placeholderText: PropTypes.string,
	};
}
