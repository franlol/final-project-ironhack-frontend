//https://www.npmjs.com/package/react-tag-input

import React, { Component } from 'react';
import TagInput from '../components/taginput';

class FormAdd extends Component {

    state = {
        title: '',
        rate: '',
        description: '',
        tags: ''
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
        const { title, rate, description, addNeed } = this.props;

        return (
            <form onSubmit={(e) => addNeed(e, this.state)}>
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
                    <TagInput updateTags={this.updateTags} />
                </div>

                <div className="form-input">
                    <label htmlFor="description">About need:</label>
                    <textarea value={description} onChange={this.formInputHandler} name="description" id="description" className="shadow" placeholder="Something about your need.."></textarea>
                </div>
                <div className="form-input">
                    <button className="shadow" type="submit">Create</button>
                </div>
            </form>
        );
    }

}

export default FormAdd;