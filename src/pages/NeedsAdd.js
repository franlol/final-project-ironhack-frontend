import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import needService from '../lib/need-service';
import { Redirect } from 'react-router-dom';

import '../public/styles/needsAdd.css';

class NeedsAdd extends Component {

	state = {
		title: '',
		rate: '',
		description: '',
		formError: false,
	}

	formInputHandler = (ev) => {
		this.setState({
			[ev.target.name]: ev.target.value
		});
	}

	addNeed = async (e, title, rate, description) => {
		e.preventDefault();
		const { _id } = this.props.user;
		
		if (!title || !rate || !description) {
			this.setState({formError: true});
			console.log("missing data")
			return;
		}

		try {
			const newNeed = await needService.add({ id: _id, title, rate, description });
			if (newNeed.status === 200) {
				console.log(this.props)
				this.props.history.push("/")
				return <Redirect to="/" />;
			}
		} catch (err) {
			console.log(err)
		}

	}

	render() {
		const { title, rate, description } = this.state;

		return (
			<>
				<h1>Create need:</h1>
				<main className="form-card shadow">

					<div className="form-content">

						<form onSubmit={(e) => this.addNeed(e, title, rate, description)}>
							<div className="form-input">
								<label htmlFor="title">Title:</label>
								<input value={title} onChange={this.formInputHandler} className="shadow" id="title" type="text" name="title" />
							</div>

							<div className="form-input">
								<label htmlFor="rate">Rate:</label>
								<input value={rate} onChange={this.formInputHandler} className="shadow" id="rate" type="number" name="rate" />
							</div>

							<div className="form-input">
								<label htmlFor="description">Description:</label>
								<textarea value={description} onChange={this.formInputHandler} name="description" id="description" className="shadow" placeholder="Description here.."></textarea>
							</div>

							<button className="shadow" type="submit">Create</button>
						</form>

					</div>

				</main>
			</>
		);
	}
}

export default withAuth(NeedsAdd);