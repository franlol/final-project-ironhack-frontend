import React, { Component } from 'react';
import { withRouter } from 'react-router';

import needService from '../lib/need-service';

class FormEdit extends Component {

    state = {
        title: '',
        rate: '',
        description: '',
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        try {
            const need = await needService.getById(id);
            this.setState({
                title: need.data.title,
                rate: need.data.rate,
                description: need.data.description
            })
        } catch (err) {
            console.log(err)
            // this.props.history.push(`/`);
        }
    }

    formInputHandler = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        });
    }

    render() {
        const { updateNeed } = this.props;
        const { id } = this.props.match.params;
        
        return (
            <form onSubmit={(e) => updateNeed(e, id, this.state.title, this.state.rate, this.state.description)}>
                <div className="form-input">
                    <label htmlFor="title">Title:</label>
                    <input value={this.state.title} onChange={this.formInputHandler} className="shadow" id="title" type="text" name="title" />
                </div>

                <div className="form-input">
                    <label htmlFor="rate">Rate:</label>
                    <input value={this.state.rate} onChange={this.formInputHandler} className="shadow" id="rate" type="number" name="rate" />
                </div>

                <div className="form-input">
                    <label htmlFor="description">Description:</label>
                    <textarea value={this.state.description} onChange={this.formInputHandler} name="description" id="description" className="shadow" placeholder="Description here.."></textarea>
                </div>

                <div className="form-input">
                    <button className="shadow" type="submit">Edit</button>
                </div>
            </form>
        );
    }

}

export default withRouter(FormEdit);