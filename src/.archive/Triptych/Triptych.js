import React, { Component } from 'react';
import './Triptych.module.scss';

class Triptych extends Component {
	constructor(props) {
		super(props);
		this.state = {
			view: 'triptych-selector',
		};
	}

	handleNavigationClick = e => {
		this.setState({ view: e.target.id });
	};

	render() {
		return (
			<div className={'triptych ' + this.state.view}>
				<div className="triptych__navigation">
					<div className="triptych__navigation-selector">
						<i
							className="material-icons text-right"
							id={'triptych-facet'}
							onClick={this.handleNavigationClick}
						>
							chevron_right
						</i>
						{this.props.selector}
						{this.props.children}
					</div>
					<div className="triptych__navigation-facet">
						<i
							className="material-icons"
							id={'triptych-selector'}
							onClick={this.handleNavigationClick}
						>
							chevron_left
						</i>
						<i
							className="material-icons text-right"
							id={'triptych-detail'}
							onClick={this.handleNavigationClick}
						>
							chevron_right
						</i>
						{this.props.facet}
					</div>
					<div className="triptych__navigation-detail">
						<i
							className="material-icons"
							id={'triptych-facet'}
							onClick={this.handleNavigationClick}
						>
							chevron_left
						</i>
						{this.props.detail}
					</div>
				</div>
			</div>
		);
	}
}

export default Triptych;
