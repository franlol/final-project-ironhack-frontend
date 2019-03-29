import React, { Component } from 'react';

class FormEdit extends Component {

    state = {
        title: '',
        rate: '',
        description: '',
    }

    async componentDidMount() {
        console.log(this.props)

        // try {
        //     // get the need by id
        //     const need = await needService.getById(needId);
        //     const needOwnerId = need.data.owner._id;
        //     let isOwnNeed = (userId === needOwnerId);


        // } catch (error) {
        //     console.log(error);
        //     this.props.history.push("/");
        // }
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
                    <label htmlFor="description">Description:</label>
                    <textarea value={description} onChange={this.formInputHandler} name="description" id="description" className="shadow" placeholder="Description here.."></textarea>
                </div>

                <div className="form-input">
                    <button className="shadow" type="submit">Edit</button>
                </div>
            </form>
        );
    }

}

export default FormEdit;