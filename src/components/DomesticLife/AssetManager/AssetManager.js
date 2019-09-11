import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import AssetManagerCreateUpdateForm from './CreateUpdateForm';
import AssetManagerItemDisplay from './ItemDisplay';
import AssetManagerSelectorList from './SelectorList';

import LoadingSpinner from '../../UI/LoadingSpinner';

import './AssetManager.css';





function AssetManager(props) {


	// editMode: false,
	// createUpdateFormIsVisible: false,
	// optionTables: [],
	// searchTerm: '',
	// selectedItem: null,

	// getAssetList = () => {
	// 	this.setState({ isLoading: true });
	// 	axios
	// 		.get('/asset/item')
	// 		.then(result => {
	// 			if (this._isMounted) {
	// 				this.setState({
	// 					assetList: result.data,
	// 					isLoading: false,
	// 				});
	// 			}
	// 		})
	// 		.catch(error => this.setState({ error }));
	// };

	// getOptionTables = () => {
	// 	axios
	// 		.get('/asset/optionTables')
	// 		.then(result => {
	// 			if (this._isMounted) {
	// 				this.setState({
	// 					optionTables: result.data,
	// 				});
	// 			}
	// 		})
	// 		.catch(error => this.setState({ error }));
	// };

	// postItem = (item) => {
	// 	let newAssetList = [...this.state.assetList];
	// 	axios
	// 		.post('/asset/item/', {
	// 			item: item,
	// 		})
	// 		.then(res => {
	// 			if (res.status === 200) {
	// 				newAssetList.push(item);
	// 				this.setState({ assetList: newAssetList });
	// 			}
	// 			// this.getItem(res.data.id);
	// 		})
	// 		.catch(error => {
	// 			console.log(error);
	// 		});
	// };

	// putItem = (item) => {
	// 	const { assetList } = this.state;
	// 	axios
	// 		.put(`/asset/item/${item.id}`, {
	// 			item
	// 		})
	// 		.then(res => {
	// 			if (res.status === 200) {
	// 				const index = assetList.findIndex(obj => obj.id === item.id);
	// 				assetList[index] = item;
	// 				this.setState({ assetList, editMode: false });
	// 			}
	// 		});
	// };

	// deleteItem = event => {
	// 	const item = { ...this.state.item };
	// 	axios.delete(`/asset/item/${item.id}`).then(res => {
	// 		// add the other properties
	// 		if (res.status === '200') {
	// 			item.name = null;
	// 		}
	// 		this.setState({
	// 			item: item,
	// 		});
	// 	});
	// 	this.getAsset();
	// };

	// onSearchChange = event => {
	// 	this.setState({ searchTerm: event.target.value });
	// };

	// handleSelectorClick = event => {
	// 	const id = event.target.id;
	// 	this.setState({ view: 'diptych-facet' });
	// 	// for <ItemDisplay>
	// 	this.setSelectedItem(id);
	// };

	// for <ItemDisplay>
	// setSelectedItem = id => {
	// 	this.setState({ selectedItem: id });
	// };

	// getSelectedItemDetails = () => {
	// 	const { selectedItem, assetList } = this.state;
	// 	const item = assetList.filter(item => {
	// 		return item.id === selectedItem;
	// 	})[0];
	// 	// console.log(JSON.stringify(item));
	// 	return item;
	// };

	// getInputValue = (name, value) => {
	// 	const item = { ...this.state.item };
	// 	console.log(name, value);
	// 	item[name] = value;
	// 	this.setState({ item: item });
	// };

	// handleSubmit(event, item) {
	// 	event.preventDefault();
	// 	console.log(JSON.stringify(item));
	// 	if (this.state.editMode) {
	// 		this.putItem(item);
	// 	} else {
	// 		this.postItem(item);
	// 	}
	// 	this.setState({ createUpdateFormIsVisible: false });
	// };

	// handleCreateUpdateForm = e => {
	// 	const targetName = e.target.dataset.name;
	// 	console.log(`clecked: ${targetName}`)
	// 	if (e.keyCode === 27) {
	// 		this.setState({ createUpdateFormIsVisible: false });
	// 	}

	// 	if (targetName === 'create') {
	// 		this.setState({
	// 			createUpdateFormIsVisible: true,
	// 			editMode: false,
	// 		});
	// 	} else if (targetName === 'edit') {
	// 		this.setState({
	// 			createUpdateFormIsVisible: true,
	// 			editMode: true,
	// 		});
	// 	} else if (targetName === 'close') {
	// 		this.setState({
	// 			createUpdateFormIsVisible: false,
	// 			editMode: false,
	// 		});
	// 	}
	// };

	// handleDiptych = e => {
	// 	if (e) {
	// 		e.preventDefault();
	// 		this.setState({ view: 'diptych-selector' });
	// 	}
	// };

	// getOptionById = (id, type, field) => {
	// 	if (!id) {
	// 		return;
	// 	}

	// 	let options;

	// 	switch (type) {
	// 		case 'address':
	// 			options = this.state.optionTables.addressOptions;
	// 			break;
	// 		case 'condition':
	// 			options = this.state.optionTables.conditionOptions;
	// 			break;
	// 		case 'location':
	// 			options = this.state.optionTables.locationOptions;
	// 			break;
	// 		case 'type':
	// 			options = this.state.optionTables.typeOptions;
	// 			break;
	// 		default:
	// 			options = this.state.optionTables.typeOptions;
	// 	}

	// 	const result = options.filter(option => {
	// 		return option.id === id;
	// 	})[0];

	// 	if (result === undefined) {
	// 		const assetList = this.state.assetList;
	// 		const item = assetList.filter(item => {
	// 			return item.id === id;
	// 		})[0];
	// 		return item[field];
	// 	} else {
	// 		return result[field];
	// 	}
	// };

	// readSecondaryLocation = id => {
	// 	const item = this.state.assetList.filter(assetItem => {
	// 		return assetItem.id === id;
	// 	})[0];

	// 	if (!item) {
	// 		return;
	// 	}

	// 	return (
	// 		<div className="item-card__group item-card__group-sub">
	// 			<label>Secondary Location:</label>
	// 			<div>{this.getOptionById(item.locationId, 'location', 'name')}</div>
	// 		</div>
	// 	);
	// };

	// isLocation = id => {
	// 	const options = this.state.optionTables.locationOptions;
	// 	if (!options) return false;
	// 	const item = options.filter(item => item.id === id)[0];

	// 	if (item) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// };

	// activeChild = id => {
	// 	if (this.isLocation(id)) {
	// 		return 0;
	// 	} else {
	// 		return 1;
	// 	}
	// };

	if (!props.isLoggedIn) {
		return <Redirect to="/" />;
	}



	return (
		<React.Fragment>
			{/* {createUpdateFormIsVisible
			&& <AssetManagerCreateUpdateForm
					createUpdateFormIsVisible={createUpdateFormIsVisible}
					item={this.getSelectedItemDetails()}
					// item={{ item: { name: "Ted"}}}
					editMode={editMode}
					optionTables={optionTables}
					handleCreateUpdateForm={this.handleCreateUpdateForm}
					assetList={assetList}
					getInputValue={this.getInputValue}
					handleSubmit={this.handleSubmit}
					activeChild={this.activeChild}
					isLocation={this.isLocation}
				/>
		} */}

			<AssetManagerSelectorList
				// onSearchChange={this.onSearchChange}
				// searchTerm={searchTerm}
				// assetList={data.assetItems}
				// isSearched={isSearched}
				// handleCreateUpdateForm={this.handleCreateUpdateForm}
				// handleSelectorClick={this.handleSelectorClick}
			/>

			{/* <AssetManagerItemDisplay
				getSelectedItemDetails={this.getSelectedItemDetails()}
				handleCreateUpdateForm={this.handleCreateUpdateForm}
				getOptionById={this.getOptionById}
				readSecondaryLocation={this.readSecondaryLocation}
			/> */}
		</React.Fragment>
	);
}

export default AssetManager;
