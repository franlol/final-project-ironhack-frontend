import React, { Component } from 'react';
import TagInput from '../components/taginput';

class FormAdd extends Component {

    state = {
        title: '',
        rate: '',
        description: '',
    }

    formInputHandler = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        });
    }

    render() {
        const { title, rate, description, addNeed } = this.props;

        return (
            <form onSubmit={(e) => addNeed(e, this.state.title, this.state.rate, this.state.description)}>
                <div className="form-input">
                    <label htmlFor="title">Title:</label>
                    <input value={title} onChange={this.formInputHandler} className="shadow" id="title" type="text" name="title" />
                </div>

                <div className="form-input">
                    <label htmlFor="rate">Rate:</label>
                    <input value={rate} onChange={this.formInputHandler} className="shadow" id="rate" type="number" name="rate" />
                </div>

                <div className="form-input">
                    <label htmlFor="description">About you:</label>
                    <textarea value={description} onChange={this.formInputHandler} name="description" id="description" className="shadow" placeholder="Something about your experiences.."></textarea>
                </div>
<TagInput/>
                <div className="form-input">
                    <button className="shadow" type="submit">Create</button>
                </div>
            </form>
        );
    }

}

export default FormAdd;