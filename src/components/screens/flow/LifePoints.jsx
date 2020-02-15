import React from 'react';

import styles from './LifePoints.module.scss';

function getLifePoints() {
	if (!localStorage.getItem('lifePoints')) {
		storeLifePoints({
			earnedPoints: 0,
			earnedRewards: 0,
			rewardThreshold: 5,
		});
	}
	return JSON.parse(localStorage.getItem('lifePoints'));
}

function storeLifePoints(points) {
	localStorage.setItem('lifePoints', JSON.stringify(points));
}

export default class LifePoints extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lifePoints: getLifePoints(),
		};
	}

	setLifePoints = lifePoints => {
		this.setState({ lifePoints });
	};

	claimReward = () => {
		const newLifePoints = {
			...this.state.lifePoints,
		};

		if (newLifePoints.earnedRewards > 0) {
			newLifePoints.earnedRewards--;
			this.setLifePoints(newLifePoints);
			storeLifePoints(newLifePoints);
		}
	};

	render() {
		const { lifePointsNeedsUpdate, setLifePointsNeedsUpdate } = this.props;
		const { lifePoints } = this.state;

		if (lifePointsNeedsUpdate) {
			const rewardThreshold = lifePoints.rewardThreshold;
			const newLifeUnitPoints = lifePoints.earnedPoints + 1;
			const newLifeUnitRewards = {
				...lifePoints,
				earnedPoints: newLifeUnitPoints,
			};

			if (newLifeUnitPoints === rewardThreshold) {
				newLifeUnitRewards.earnedRewards++;
				newLifeUnitRewards.earnedPoints = 0;
			}

			setLifePointsNeedsUpdate(false);
			this.setLifePoints(newLifeUnitRewards);
			storeLifePoints(newLifeUnitRewards);
		}

		return (
			<div className={styles.lifePoints}>
				<div className={styles.points}>
					Life Points: {lifePoints.earnedPoints}
				</div>
				<div className={styles.rewards}>
					<div>Earned ewards: {lifePoints.earnedRewards}</div>
					<button onClick={this.claimReward}>Claim Award</button>
				</div>
			</div>
		);
	}
}
