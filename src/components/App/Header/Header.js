import React, { useState } from 'react';
import { NavigationMenu } from '../Navigation';
import { UserProfile } from '../User';
import { LifeManagerLink } from '../Links';
import './Header.css';

const AppHeader = props => {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<HeaderContainer>
			<NavigationMenu visibility={showMenu ? 'show' : 'hide'} onClick={() => setShowMenu(!showMenu)} />
			<div id="header__top-bar--left">
				<button id="menu__button-flyout" onClick={() => setShowMenu(!showMenu)}>
					<i className="material-icons">menu</i>
				</button>
				<div className="lifeManager-link">
					<LifeManagerLink />
				</div>
			</div>
			<div id="header__top-bar--right">
				<UserProfile user={props.user} handleLogout={props.handleLogout} />
			</div>
		</HeaderContainer>
	);
};

const HeaderContainer = props =>
	<header className="header">{props.children}</header>;

const PageHeader = props => {
	const {
		children,
		onClick,
		title,
	} = props;

	return (
		<HeaderContainer>
			<div className="header__left"  >
				<i
					className="material-icons"
					data-name='close'
					onClick={onClick}
				>
					keyboard_backspace
				</i>
				<span data-name='close' onClick={onClick}>{title}</span>
			</div>
			{children
			? <div>{children}</div>
			: null
			}
		</HeaderContainer>
	);
};
export { AppHeader, PageHeader, HeaderContainer };
