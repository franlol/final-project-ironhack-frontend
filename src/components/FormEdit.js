import React, { Component } from 'react';
import { withRouter } from 'react-router';

import TagInput from '../components/taginput';

import needService from '../lib/need-service';

class FormEdit extends Component {

    state = {
        title: '',
        rate: '',
        description: '',
        tags: [],
    }

    async componentDidMount() {
        const { id } = this.props.match.params;

        try {
            const need = await needService.getById(id);

            this.setState({
                title: need.data.title,
                rate: need.data.rate,
                description: need.data.description,
                tags: need.data.tags,
            });

        } catch (err) {
            this.props.history.push("/NoMatch");
        }
    }

    formInputHandler = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        });
    }

    updateTags = (tags) => {
        this.setState({ tags });
    }

    render() {
        const { updateNeed } = this.props;
        const { id } = this.props.match.params;
        const { title, rate, tags, description } = this.state;

        return (

            <form onSubmit={(e) => updateNeed(e, id, this.state)}>
                <div className="form-input">
                    <label htmlFor="title">Title:</label>
                    <input value={title} onChange={this.formInputHandler} className="shadow" id="title" type="text" name="title" />
                </div>

                <div className="form-input">
                    <label htmlFor="rate">How much do you pay:</label>
                    <input value={rate} onChange={this.formInputHandler} className="shadow" id="rate" type="number" name="rate" />
                </div>

                <div className="form-input">
                    <label>Categories:</label>
                    <TagInput tags={tags} updateTags={this.updateTags} />
                </div>

                <div className="form-input">
                    <label htmlFor="description">About need:</label>
                    <textarea value={description} onChange={this.formInputHandler} name="description" id="description" className="shadow" placeholder="Something about your need.."></textarea>
                </div>

                <div className="form-input">
                    <button className="shadow" type="submit">Edit</button>
                </div>
            </form>
        );
    }

}

export default withRouter(FormEdit);