import React from 'react';
import { PageHeader } from '../../../App/Header';
import './ItemDisplay.css';

const AssetManagerItemDisplay = (props) => {
	const {
		getSelectedItemDetails,
		handleDiptych,
		handleCreateUpdateForm,
		getOptionById,
		readSecondaryLocation,
	} = props;

	const item = {...getSelectedItemDetails};

	return (
		<React.Fragment>
			<i
				className="material-icons md-48 btn-add"
				onClick={handleCreateUpdateForm}
				title="Click to edit."
				data-name="edit"
			>create
			</i>
			<PageHeader
				onClick={handleDiptych}
				title="Item"
			/>
			<div className="item-card">
				<h3 className="item-card__title">{item.name}</h3>
				<div className="item-card__group item-card__group-textarea">
					<label>Description:</label>
					<textarea rows="4" value={item.description} />
				</div>
				<div className="item-card__group">
					<label>Location:</label>
					<div>{getOptionById(item.locationId, 'location', 'name')}</div>
				</div>
				{readSecondaryLocation(item.locationId)}
				<div className="item-card__group">
					<label>Type:</label>
					<div>{getOptionById(item.typeId, 'type', 'name')}</div>
				</div>
				<div className="item-card__group">
					<label>Condition:</label>
					<div>{getOptionById(item.conditionId, 'condition', 'name')}</div>
				</div>
				<div className="item-card__group">
					<label>Purchase Date:</label>
					<div>{item.purchaseDate}</div>
				</div>
				<div className="item-card__group">
					<label>Purchase Price:</label>
					<div>{item.purchasePrice}</div>
				</div>
				<div className="item-card__group">
					<label>Is this a Container?</label>
					<div>{item.isContainer ? 'This is a container' : 'Not a container'}</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default AssetManagerItemDisplay;