import React, { Component } from 'react';
import { PageHeader } from '../components/Header';
import OffscreenContainer from '../components/UI/OffscreenContainer';
import Button from '../components/UI/Button';
import ScrollBox from '../components/UI/ScrollBox';
import Tabs from '../components/UI/Tabs';
import {
	Input,
	Select,
	InputTextArea,
	InputSelect,
	InputCheck,
} from '../components/UI/Input';
import ErrorMessage from '../components/UI/ErrorMessage';
// import './CreateUpdateForm.css';

function isEmpty(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) return false;
	}
	return true;
}

class AssetManagerCreateUpdateForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			item: {
				name: '',
				loctionId: '',
				typeId: '',
			},
		};

		this.handleInputChange =  this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const name = target.name;
		const value = target.type === 'checkbox' ? target.checked : target.value;

		this.setState( prevState => {
			return {
				item: {
					...prevState.item, [name]: value
				}
			}
		});
	};

	componentDidMount() {
		console.log(`componentDidMount`);
		const { item, editMode } = this.props;
		if (item && editMode) {
			this.setState({ item })
		}
	}

	render() {
		const {
			assetList,
			optionTables,
			editMode,
			handleSubmit,
			createUpdateFormIsVisible,
			handleCreateUpdateForm,
			getInputValue,
		} = this.props;
		const { item } = this.state;
		console.log(`In Mount: ${JSON.stringify(item)}`);

		return (
			<OffscreenContainer isVisible={createUpdateFormIsVisible}>
				<PageHeader
					title={editMode ? 'Edit Item' : 'Add Item'}
					onClick={handleCreateUpdateForm}
				>
				</PageHeader>
				<ScrollBox>
					<form
						className="create-update-form"
						onSubmit={(event) => handleSubmit(event, item)}
					>
						<Input
							type="text"
							name="name"
							value={item.name}
							handleOnChange={this.handleInputChange}
							label="Item"
							placeholderText="Item"
							// errorMessage="You must enter an item"
							focus={true}
						/>
						{/* {!this.state.isValid && <ErrorMessage errorMessage={errorMessage}/>} */}
						{/* <InputTextArea
							name="description"
							labelText="Description"
							placeholderText="Describe..."
							errorMessage=""
							getInputValue={getInputValue}
							presetValue={editMode ? item.description : ''}
						/> */}
						<div className="container-location">
							<h6 className="container-location__imperative">
								Choose a Location <em>or</em> a Container
							</h6>
							{/* <Tabs activeChild={!isEmpty(item) ? props.activeChild(item.locationId) : 0}>
								<div label="Locations">
									<InputSelect
										type="select"
										name="locationId"
										labelText="Location"
										options={props.optionTables.locationOptions}
										errorMessage="You must enter a location"
										getInputValue={getInputValue}
										presetValue={
											editMode ? (props.isLocation(item.locationId) ? item.locationId : null) : null
										}
									/>
								</div>
								<div label="Containers">
									<InputSelect
										type="select"
										name="locationId"
										labelText="Container"
										options={assetList
											.filter(item => item.isContainer)
											.map(option => {
												return {
													id: option.id,
													name: option.name,
													description: option.description,
												};
											})}
										errorMessage="You must enter a location"
										getInputValue={getInputValue}
										presetValue={
											editMode
												? !props.isLocation(item.locationId)
													? item.locationId
													: null
												: null
										}
									/>
								</div>
							</Tabs> */}
						</div>
						<Select
						 	label={'Type'}
							name={'typeId'}
							options = {optionTables.typeOptions} 
							value = {item.typeId}
							placeholder = {'Select the item type...'}
							handleChange = {this.handleInputChange}
						/>
						<Select
						 	label={'Type'}
							name={'typeId'}
							options = {optionTables.typeOptions} 
							value = {item.typeId}
							placeholder = {'Select the item type...'}
							handleChange = {this.handleInputChange}
						/>
						<Select
						 	label={'Condition'}
							name={'conditionId'}
							options = {optionTables.conditionOptions} 
							value = {item.conditionId}
							placeholder = {'Select the condition of the item...'}
							handleChange = {this.handleInputChange}
						/>
						{/* <InputSelect
							type="select"
							name="typeId"
							labelText="Type"
							options={optionTables.typeOptions}
							errorMessage="You must enter a type"
							getInputValue={getInputValue}
							presetValue={editMode ? item.typeId : null}
						/> */}
						{/* <InputSelect
							type="select"
							name="conditionId"
							labelText="Condition"
							options={optionTables.conditionOptions}
							errorMessage="You must enter a condition"
							getInputValue={getInputValue}
							presetValue={editMode ? item.conditionId : null}
						/> */}
						{/* <InputCheck
							type="check"
							name="isContainer"
							labelText="Is this a Container?"
							options={optionTables.conditionOptions}
							getInputValue={getInputValue}
							presetValue={editMode ? item.isContainer : null}
						/> */}
						<input type="submit" value="Save" />
					</form>
				</ScrollBox>
			</OffscreenContainer>
		);
	}
};

export default AssetManagerCreateUpdateForm;