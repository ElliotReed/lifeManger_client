import React, { Component } from 'react';
import { PageHeader } from '../../../App/Header';
import OffscreenContainer from '../../../UI/OffscreenContainer';
import ScrollBox from '../../../UI/ScrollBox';
import Tabs from '../../../UI/Tabs';
import {
	Input,
	Select,
	TextArea,
} from '../../../UI/Input';
import Button from '../../../UI/Button';
// import ErrorMessage from '../../UI/ErrorMessage';
import './CreateUpdateForm.css';

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
				id: null,
				name: '',
				locationId: '',
				typeId: '',
				conditionId: '',
				description: '',
				isContainer: false,
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

	handleCheckBoxChange(event) {
		const { item } = this.state;
    const newSelection = event.target.value;
    let newSelectionArray;

    if(item.isContainer.indexOf(newSelection) > -1) {
      newSelectionArray = item.isContainer.filter(s => s !== newSelection)
    } else {
      newSelectionArray = [...item.isContainer, newSelection];
    }

      this.setState( prevState => ({ item:
        {...prevState.item, isContainer: newSelectionArray }
      })
      )
}

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
							focus={true}
						/>
						<TextArea
							label={"Description"}
							rows={6}
							value={item.description}
							name={"description"}
							handleOnChange={this.handleInputChange}
							placeholder={"Describe the item..."}
						/>
						<div className="container-location">
							<h6 className="container-location__imperative">
								Choose a Location <em>or</em> a Container
							</h6>
							<Tabs activeChild={!isEmpty(item) ? this.props.activeChild(item.locationId) : 0}>
								<div label="Locations">
									<Select
										label={'Location'}
										name={'locationId'}
										options={optionTables.locationOptions} 
										value={item.locationId}
										placeholder={'Select the item location...'}
										handleChange={this.handleInputChange}
									/>
								</div>
								<div label="Containers">
									<Select
										label={'Container'}
										name={'locationId'}
										options={assetList
											.filter(item => item.isContainer)
											.map(option => {
												return {
													id: option.id,
													name: option.name,
													description: option.description,
												};
											})}
										value={item.locationId}
										placeholder={'Select the container...'}
										handleChange={this.handleInputChange}
									/>
								</div>
							</Tabs>
						</div>
						<Select
						 	label={'Type'}
							name={'typeId'}
							options={optionTables.typeOptions} 
							value={item.typeId}
							placeholder={'Select the item type...'}
							handleChange={this.handleInputChange}
						/>
						<Select
						 	label={'Condition'}
							name={'conditionId'}
							options={optionTables.conditionOptions} 
							value={item.conditionId}
							placeholder={'Select the condition of the item...'}
							handleChange={this.handleInputChange}
						/>
						<Input
							type="checkbox"
							name="isContainer"
							classNames="input-check__container"
							value={item.isContainer}
							handleOnChange={this.handleInputChange}
							label="Is this a Container?"
						/>
						<Button type="submit">Save</Button>
					</form>
				</ScrollBox>
			</OffscreenContainer>
		);
	}
};

export default AssetManagerCreateUpdateForm;