import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../../components/UI/ErrorMessage';
import './EmailInput.module.scss';

class EmailInput extends Component {
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

export default EmailInput;
