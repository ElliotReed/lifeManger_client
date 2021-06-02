import React, { useState } from 'react';
import { NavigationMenu } from '../Navigation';
import { UserProfile } from '../User';
import { LifeManagerLink } from '../Links';
import styles from './header.module.scss';

const Header = props => {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<header className={styles.header}>
			<NavigationMenu
				visibility={showMenu ? 'show' : 'hide'}
				onClick={() => setShowMenu(!showMenu)}
			>
				{props.children}
			</NavigationMenu>
			<div className={styles.barLeft}>
				<button
					className={styles.flyout}
					onClick={() => setShowMenu(!showMenu)}
				>
					<i className="material-icons">menu</i>
				</button>
				<div className={styles.lifeManagerLink}>
					<LifeManagerLink />
				</div>
			</div>
			<div className={styles.barRight}>{props.children}</div>
		</header>
	);
};

const AppHeader = props => {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<HeaderContainer>
			<NavigationMenu
				visibility={showMenu ? 'show' : 'hide'}
				onClick={() => setShowMenu(!showMenu)}
			/>
			<div className={styles.barLeft}>
				<button
					className={styles.flyout}
					onClick={() => setShowMenu(!showMenu)}
				>
					<i className="material-icons">menu</i>
				</button>
				<div className={styles.lifeManagerLink}>
					<LifeManagerLink />
				</div>
			</div>
			<div className={styles.barRight}>
				<UserProfile
					user={props.user}
					handleLogout={props.handleLogout}
				/>
			</div>
		</HeaderContainer>
	);
};

const HeaderContainer = props => (
	<header className={styles.header}>{props.children}</header>
);

const PageHeader = props => {
	const { children, onClick, title } = props;

	return (
		<HeaderContainer>
			<div className={styles.headerLeft}>
				<i
					className="material-icons"
					data-name="close"
					onClick={onClick}
				>
					keyboard_backspace
				</i>
				<span data-name="close" onClick={onClick}>
					{title}
				</span>
			</div>
			{children ? <div>{children}</div> : null}
		</HeaderContainer>
	);
};
export { AppHeader, PageHeader, HeaderContainer, Header };
