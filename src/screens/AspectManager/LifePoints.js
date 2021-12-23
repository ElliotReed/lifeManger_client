import React from 'react';

import styles from './LifePoints.module.scss';

export default function LifePoints({ lifePoints, handleClaimRewardClick }) {

	return (
		<div className={styles.lifePoints}>
			<div className={styles.points}>
				Life Points: {lifePoints.earnedPoints}
			</div>
			<div className={styles.rewards}>
				<div>Earned ewards: {lifePoints.earnedRewards}</div>
				<button onClick={handleClaimRewardClick}>Claim Award</button>
			</div>
		</div>
	);
}
