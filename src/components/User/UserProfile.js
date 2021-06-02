import React, { useState } from 'react';
import './UserProfile.module.scss';

const UserProfile = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="user__profile">
    {showMenu &&
      <UserAccountMenu
        user={props.user.name}
        handleLogout={props.handleLogout}
        hide={() => setShowMenu(!showMenu)}
      />
    }
      <button
        className="user__profile-button"
        onClick={() => setShowMenu(!showMenu)}
      >
        <i className="material-icons">account_circle</i>
        <p>{props.user.name}</p>
      </button>
    </div>
  );
}

const UserAccountMenu = (props) => {
  return (
    <nav onClick={props.hide}>
      <ul className="user__account-menu">
        <li className="user__account-header">
          <i className="material-icons">account_circle</i>
          <h4>{props.user}</h4>
        </li>
        <hr />
        <li
          className="user__account-logout"
          onClick={props.handleLogout}
        >
          Log Out
        </li>
      </ul>
    </nav>
  );
};

export default UserProfile;