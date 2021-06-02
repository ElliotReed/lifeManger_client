import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Triptych from '../components/UI/Triptych';
import Selector from '../components/UI/Selector';
import Facet from '../components/UI/Facet';
import Modal from '../components/UI/Modal';
import { InputText, InputSelect } from '../components/UI/Input';
import './Asset.module.scss';

class AssetManager extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inventory: [],
			item: {},
			optionTables: {},
			modalIsVisible: false,
		};
	}

	getAsset = () => {
		axios.get('/inventory/item').then(res => {
			if (typeof res.data === 'object') {
				this.setState({
					inventory: res.data,
				});
			}
		});
	};

	getOptionTables = () => {
		axios.get('/inventory/optionTables').then(res => {
			this.setState({
				optionTables: res.data,
			});
			console.log(
				`optionTables ${this.state.optionTables.conditionOptions[0].name}`
			);
		});
	};

	addItem = event => {
		event.preventDefault();
		const name = event.target.name.value;
		const item = { ...this.state.item };

		axios
			.post('/inventory/item/', {
				name: name,
			})
			.then(response => {
				this.getItem();
			})
			.catch(error => {
				console.log(error);
			});
	};

	handleSubmit = event => {
		event.preventDefault();
		console.log(event.target.locationId.value);
		const item = { ...this.state.item };

		axios
			.post('/inventory/item/', {
				item: item,
			})
			.then(response => {
				this.getItem();
			})
			.catch(error => {
				console.log(error);
			});
	};

	getItem = id => {
		if (!id) {
			return;
		}
		axios
			.get(`/inventory/item/${id}`)
			.then(res => {
				this.setState({
					item: res.data,
				});
			})
			.catch(error => {
				console.log(error);
			});
	};

	updateItem = event => {
		event.preventDefault();
		const id = this.state.id;
		axios
			.put(`/inventory/item/${id}`, {
				name: this.state.name,
			})
			.then(res => {
				console.log(res);
				this.getAsset();
			});
	};

	deleteItem = event => {
		const id = this.state.id;
		axios.delete(`/inventory/item/${id}`).then(res => {
			this.setState({
				name: 'Deleted',
				id: null,
			});
			this.getAsset();
		});
	};

	handleInputChange = event => {
		const target = event.target;
		const name = target.name;
		const value =
			target.type === 'checkbox' ? target.checked : target.value;

		this.setState({
			[name]: value,
		});
	};

	handleSelectorClick = event => {
		const id = event.target.id;
		const item = { ...this.state.item };
		item.id = id;
		this.setState({ item });
		this.getItem(id);
	};

	componentDidMount() {
		this.getAsset();
		this.getOptionTables();
		this.getItem(this.state.id);
	}

	handleModal = event => {
		const targetName = event.target.dataset.name;

		if (targetName === 'add') {
			this.setState({ modalIsVisible: true });
		} else {
			this.setState({ modalIsVisible: false });
		}
	};

	getInputValue = (name, value) => {
		console.log(`Name: ${name}, Value: ${value}`);
		const item = { ...this.state.item };

		item[name] = value;
		this.setState({ item: item });
	};

	render() {
		if (!this.props.isLoggedIn) {
			return <Redirect to="/" />;
		}
		let deleteButton;

		if (this.state.id) {
			deleteButton = (
				<button onClick={this.deleteItem}>Delete Item</button>
			);
		}

		return (
			<React.Fragment>
				<Modal
					modalIsVisible={this.state.modalIsVisible}
					handleModal={this.handleModal}
				>
					<form onSubmit={this.handleSubmit}>
						<InputText
							type="text"
							name="name"
							labelText="Item"
							placeholderText="Item"
							errorMessage="You must enter an item"
							getInputValue={this.getInputValue}
						/>
						<InputText
							type="textarea"
							name="description"
							labelText="Description"
							placeholderText="describe..."
							errorMessage=""
							getInputValue={this.getInputValue}
						/>
						<InputSelect
							type="select"
							name="locationId"
							labelText="Location"
							options={this.state.optionTables.locationOptions}
							errorMessage="You must enter a location"
							getInputValue={this.getInputValue}
						/>
						<InputSelect
							type="select"
							name="typeId"
							labelText="Type"
							options={this.state.optionTables.typeOptions}
							errorMessage="You must enter a type"
							getInputValue={this.getInputValue}
						/>
						<InputSelect
							type="select"
							name="conditionId"
							labelText="Condition"
							options={this.state.optionTables.conditionOptions}
							errorMessage="You must enter a condition"
							getInputValue={this.getInputValue}
						/>
						<input
							type="submit"
							className="inventory__add"
							value="Add item"
						/>
						<input
							type="submit"
							className="inventory__edit"
							value="Edit item"
						/>
					</form>
				</Modal>
				<Triptych
					selector={
						<Selector>
							<h1>Asset</h1>
							<ul>
								{this.state.inventory.map(item => (
									<li
										key={item.id}
										id={item.id}
										onClick={this.handleSelectorClick}
									>
										{item.name}
									</li>
								))}
							</ul>
						</Selector>
					}
					facet={
						<Facet>
							<h1>Item</h1>
							<ul>
								<li>{this.state.item.name}</li>
								<li>{this.state.item.location_id}</li>
								<li>{this.state.item.description}</li>
								<li>{this.state.item.purchase_date}</li>
								<li>{this.state.item.condition_id}</li>
								<li>{this.state.item.type_id}</li>
							</ul>
						</Facet>
					}
					detail={
						<Facet>
							<h1>Item Detail</h1>
							<form onSubmit={this.updateItem}>
								<label htmlFor="name">
									Name
									<input
										type="text"
										id="name"
										name="name"
										value={this.state.name}
										onChange={this.handleInputChange}
									/>
								</label>
								<input type="submit" value="Submit" />
							</form>
							{deleteButton}
						</Facet>
					}
				>
					<button onClick={this.handleModal} data-name="add">
						Add
					</button>
				</Triptych>
			</React.Fragment>
		);
	}
}

export default AssetManager;
