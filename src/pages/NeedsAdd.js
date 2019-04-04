import React, { Component } from 'react';

import { withRouter } from 'react-router';
import { withAuth } from '../providers/AuthProvider';
import needService from '../lib/need-service';

import Error from '../components/Error';
import FormAdd from '../components/FormAdd';
import FormEdit from '../components/FormEdit';

import '../public/styles/needsAdd.css';

class NeedsAdd extends Component {

	state = {
		error: false,
		errors: [],
	}

	componentDidMount() {
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
			this.setState({
				error: true,
				errors: ['Please, fill all required fields (*)']
			})
			return;
		}

		try {
			const need = await needService.add({ id: _id, title, rate, description, tags });
			this.props.history.push(`/need/${need.data.need._id}`);
		} catch (err) {
			this.props.history.push("/NoMatch");
		}
	}

	updateNeed = async (e, needId, need) => {
		e.preventDefault();
		const userId = this.props.user._id;
		const { title, rate, description, tags } = need;

		if (!title || !rate || !description) {
			this.setState({
				error: true,
				errors: ['Please, fill all required fields (*)']
			})
			return;
		}

		try {
			const updatedNeed = await needService.update(userId, { needId, title, rate, description, tags });
			this.props.history.push(`/need/${updatedNeed.data._id}`);
		} catch (err) {
			this.props.history.push("/NoMatch");
		}

	}

	render() {
		const { isEdit } = this.state;

		return (
			<>
				{isEdit ? <h1 className="form-title">Edit need:</h1> : <h1 className="form-title">Create need:</h1>}
				<main className="form-card shadow">

					<div className="form-content">
						{isEdit && <FormEdit error={this.state.error} errors={this.state.errors} updateNeed={this.updateNeed} />}
						{!isEdit && <FormAdd addNeed={this.addNeed} />}
						{this.state.error && <Error errors={this.state.errors} />}
					</div>

				</main>
			</>
		);
	}
}

export default withRouter(withAuth(NeedsAdd));