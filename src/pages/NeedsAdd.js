import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import needService from '../lib/need-service';

import FormAdd from '../components/FormAdd';
import FormEdit from '../components/FormEdit';

import '../public/styles/needsAdd.css';

class NeedsAdd extends Component {

	state = {
		title: '',
		rate: '',
		description: '',
		formError: false,
		isLoading: true,
	}

	componentDidMount() {
		this.setState({
			isEdit: this.props.match.path === '/need/:id/edit',
			isLoading: false,
		});
	}



	addNeed = async (e, title, rate, description) => {
		e.preventDefault();
		console.log(e, title, rate, description)
		const { _id } = this.props.user;

		if (!title || !rate || !description) {
			this.setState({ formError: true });
			console.log("missing data")
			return;
		}

		try {
			await needService.add({ id: _id, title, rate, description });
			this.props.history.push("/")
		} catch (err) {
			console.log(err)
		}
	}

	updateNeed = async() => {
		console.log("edit")
	}

	render() {
		// const { title, rate, description, isEdit } = this.state;
		const { isEdit } = this.state;


		return (
			<>
				<h1>Create need:</h1>
				<main className="form-card shadow">

					<div className="form-content">
						{isEdit && <FormEdit updateNeed={this.updateNeed}/>}
						{!isEdit && <FormAdd addNeed={this.addNeed} />}
					</div>

				</main>
			</>
		);
	}
}

export default withAuth(NeedsAdd);