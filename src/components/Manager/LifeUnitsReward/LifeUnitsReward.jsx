import React, { useState, useEffect } from 'react';

import './LifeUnitsReward.scss';

function getLifeUnitRewards() {
	if (!localStorage.getItem('lifeUnitPoints')) {
		storeLifeUnitRewards({
			lifeUnitPoints: 0,
			earnedRewards: 0,
		});
	}
	return JSON.parse(localStorage.getItem('lifeUnitPoints'));
}

function storeLifeUnitRewards(points) {
	localStorage.setItem('lifeUnitPoints', JSON.stringify(points));
}

export default function LifeUnitsReward({
	lifeUnitRewardsNeedsUpdate,
	setLifeUnitRewardsNeedsUpdate,
}) {
	const [lifeUnitRewards, setLifeUnitRewards] = useState(
		getLifeUnitRewards()
	);

	useEffect(() => {
		if (lifeUnitRewardsNeedsUpdate) {
			const rewardThreshold = 5;
			const newLifeUnitPoints = lifeUnitRewards.lifeUnitPoints + 1;
			const newLifeUnitRewards = {
				...lifeUnitRewards,
				lifeUnitPoints: newLifeUnitPoints,
			};
			if (newLifeUnitPoints === rewardThreshold) {
				newLifeUnitRewards.earnedRewards++;
				newLifeUnitRewards.lifeUnitPoints = 0;
			}
			setLifeUnitRewardsNeedsUpdate(false);
			setLifeUnitRewards(newLifeUnitRewards);
			storeLifeUnitRewards(newLifeUnitRewards);
		}
	}, [lifeUnitRewardsNeedsUpdate]);

	const claimReward = () => {
		const newLifeUnitRewards = {
			...lifeUnitRewards,
		};

		if (newLifeUnitRewards.earnedRewards > 0) {
			newLifeUnitRewards.earnedRewards--;
			setLifeUnitRewards(newLifeUnitRewards);
			storeLifeUnitRewards(newLifeUnitRewards);
		}
	};

	return (
		<div className="life-units-reward">
			{/* <button
        onClick={() => {
          setLifeUnitRewardsNeedsUpdate(!lifeUnitRewardsNeedsUpdate);
        }}
      >
        click
      </button> */}
			<div className="life-units-reward__points">
				Life Unit Points: {lifeUnitRewards.lifeUnitPoints}
			</div>
			<div className="life-units-reward__rewards">
				<div>earned rewards: {lifeUnitRewards.earnedRewards}</div>
				<button onClick={claimReward}>Claim Award</button>
			</div>
		</div>
	);
}
