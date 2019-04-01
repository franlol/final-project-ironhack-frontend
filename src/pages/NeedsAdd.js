import React, { Component } from 'react';

import { withAuth } from '../providers/AuthProvider';
import needService from '../lib/need-service';


import FormAdd from '../components/FormAdd';
import FormEdit from '../components/FormEdit';

import '../public/styles/needsAdd.css';

class NeedsAdd extends Component {

	state = {
		// title: '',
		// rate: '',
		// description: '',
		// tags: [],
		// formError: false,
		// isLoading: true,
	}

	componentDidMount() {
		// console.log(this.props.match.path)
		this.setState({
			isEdit: this.props.match.path === '/need/:id/edit',
			// isLoading: false, 
		});
	}

	addNeed = async (e, need) => {
		e.preventDefault();
		const { _id } = this.props.user;
		const { title, rate, description, tags } = need;


		if (!title || !rate || !description) {
			this.setState({ formError: true });
			console.log("missing data")
			return;
		}

		try {
			const need = await needService.add({ id: _id, title, rate, description, tags });
			this.props.history.push(`/need/${need.data.need._id}`);
		} catch (err) {
			console.log(err);
		}
	}

	updateNeed = async (e, needId, need) => {
		e.preventDefault();
		const userId = this.props.user._id;
		const { title, rate, description, tags } = need;

		try {
			const updatedNeed = await needService.update(userId, { needId, title, rate, description, tags });
			this.props.history.push(`/need/${updatedNeed.data._id}`);
		} catch (err) {
			//TODO FILL INPUT BORDERS WITH RED
			console.log(err);
		}

	}

	render() {
		const { isEdit } = this.state;

		return (
			<>
				{isEdit ? <h1 className="form-title">Edit need:</h1> : <h1 className="form-title">Create need:</h1>}
				<main className="form-card shadow">

					<div className="form-content">
						{isEdit && <FormEdit updateNeed={this.updateNeed} />}
						{!isEdit && <FormAdd addNeed={this.addNeed} />}
					</div>

				</main>
			</>
		);
	}
}

export default withAuth(NeedsAdd);