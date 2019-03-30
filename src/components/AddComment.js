import React, { Component } from 'react';

import '../public/styles/addcomment.css'

class AddComment extends Component {

    state = {
        comment: '',
    }

    formInputHandler = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        });
    }

    submitHandler = (e) => {
        const { apply } = this.props;
        
        e.preventDefault();
        apply(this.state.comment);
    }

    render() {
        const { comment } = this.state;

        return (
            <main className="form-card shadow">

                <div className="form-content">
                    <form onSubmit={(e) => this.submitHandler(e)}>

                        <div className="form-input">
                            <label htmlFor="comment">Apply with message:</label>
                            <textarea value={comment} onChange={this.formInputHandler} name="comment" id="comment" className="shadow" placeholder="Your message .."></textarea>
                        </div>

                        <div className="form-input">
                            <button className="shadow" type="submit">Apply</button>
                        </div>
                    </form>
                </div>

            </main>
        );
    }

}

export default AddComment;