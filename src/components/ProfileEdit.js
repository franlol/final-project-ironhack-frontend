import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';

import '../public/styles/profileedit.css';

class ProfileEdit extends Component {


    state = {
        profession: '',
        description: '',
        rate: '',
        isLoaded: false,
    }

    componentDidMount = () => {
        const { profession, description, rate } = this.props.user;

        this.setState({
            profession,
            description,
            rate,
            isLoaded: true,
        })
    }

    formInputHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        console.log(this.props.user)
        const { user } = this.props;
        const { profession, description, rate } = this.state;

        return (

            <main className="form-card shadow">
                <div className="form-content">
                    <section className="profile-edit">
                        <h1>Profile edit:</h1>
                        <h3>{user.username}</h3>

                        <form className="profile-edit-form" onSubmit={() => console.log("submit")}>

                            <img src={user.photo} alt={user.username} />

                            <div className="form-input">
                                <label htmlFor="profession">Profession:</label>
                                <input required value={profession} onChange={this.formInputHandler} className="shadow" id="profession" type="text" name="profession" />
                            </div>

                            <div className="form-input">
                                <label htmlFor="title">Description:</label>
                                <input value={description} onChange={this.formInputHandler} className="shadow" id="description" type="text" name="description" />
                            </div>

                            <div className="form-input">
                                <label htmlFor="rate">How much do you pay:</label>
                                <input required value={rate} onChange={this.formInputHandler} className="shadow" id="rate" type="number" name="rate" />
                            </div>

                            <div className="form-input">
                                <button className="shadow" type="submit">Edit</button>
                            </div>
                        </form>

                    </section>

                </div>

            </main>
        );
    }

}

export default withAuth(ProfileEdit);