import React, { Component } from 'react';

import { withAuth } from '../providers/AuthProvider';
import { withRouter } from 'react-router';

import authService from '../lib/auth-service';

import '../public/styles/profileedit.css';

// Initialize Firebase
import FileUploader from 'react-firebase-file-uploader';
// import firebase from 'firebase';

//https://stackoverflow.com/questions/50707211/warning-it-looks-like-youre-using-the-development-build-of-the-firebase-js-sdk
import firebase from 'firebase/app';
// import 'firebase/database'; // If using Firebase database
import 'firebase/storage';

var config = {
    apiKey: "AIzaSyA8cHLrsaC3EZhZ9gRtE2G1OISyNQGUaFQ",
    authDomain: "serv-seeker.firebaseapp.com",
    databaseURL: "https://serv-seeker.firebaseio.com",
    projectId: "serv-seeker",
    storageBucket: "serv-seeker.appspot.com",
    messagingSenderId: "708659023547"
};
firebase.initializeApp(config);

class ProfileEdit extends Component {

    state = {
        profession: '',
        description: '',
        rate: '',
        telephone: '',
        isLoaded: false,

        //firebase
        username: '',
        avatar: '',
        isUploading: false,
        progress: 0,
        avatarURL: this.props.user.photo
    }

    // FIrebase methods:
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = (progress) => this.setState({ progress });
    handleUploadError = (error) => {
        this.setState({ isUploading: false });
        console.error(error);
    }
    handleUploadSuccess = (filename) => {
        this.setState({ avatar: filename, progress: 100, isUploading: false });
        firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({ avatarURL: url }));
    };

    componentDidMount = () => {
        const { profession, description, rate, telephone } = this.props.user;

        this.setState({
            profession,
            description,
            rate,
            telephone,
            isLoaded: true,
        })
    }

    formInputHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    imageClickHandler = () => {
        document.getElementById("input-fileupload").click();
    }

    handleSubmit = async e => {
        e.preventDefault();

        const user = {
            _id: this.props.user._id,
            description: this.state.description,
            photo: this.state.avatarURL,
            profession: this.state.profession,
            rate: this.state.rate,
            telephone: this.state.telephone,
        }
        try {
            const response = await authService.edit(user);
            this.props.setUser(response.data.user)
            this.props.history.push('/profile');
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { user } = this.props;
        const { profession, description, rate, telephone } = this.state;

        return (
            <>
                <form>
                    <FileUploader
                        hidden
                        id="input-fileupload"
                        accept="image/*"
                        name="avatar"
                        randomizeFilename
                        storageRef={firebase.storage().ref('images')}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                    />
                </form>

                <div className="profile-edit-container">
                    <h1 className="profile-edit-title">Profile edit:</h1>
                    <main className="form-card shadow">
                        <div className="form-content">
                            <section className="profile-edit">

                                <form className="profile-edit-form" onSubmit={(e) => this.handleSubmit(e)}>
                                    <div className="profile-edit-title-box">
                                        <img onClick={() => this.imageClickHandler()} className="profile-edit-form-img" src={this.state.avatarURL} alt={user.username} />
                                        <h3 className="profile-edit-title-user">{user.username}</h3>
                                    </div>

                                    <div className="form-input">
                                        <label htmlFor="profession">Profession:</label>
                                        <input required value={profession} onChange={this.formInputHandler} className="shadow" id="profession" type="text" name="profession" />
                                    </div>

                                    <div className="form-input">
                                        <label htmlFor="telephone">Telephone:</label>
                                        <input required value={telephone} onChange={this.formInputHandler} className="shadow" id="telephone" type="tel" name="telephone" />
                                    </div>

                                    <div className="form-input">
                                        <label htmlFor="rate">Your rate:</label>
                                        <input required value={rate} onChange={this.formInputHandler} className="shadow" id="rate" type="number" name="rate" />
                                    </div>

                                    <div className="form-input">
                                        <label htmlFor="title">Description:</label>
                                        <textarea value={description} onChange={this.formInputHandler} className="shadow" id="description" type="text" name="description"></textarea>
                                    </div>

                                    <div className="form-input">
                                        {this.state.isUploading ?
                                            <button disabled style={{ color: 'lightgray' }} className="shadow" type="submit">Uploading: {this.state.progress}%</button>
                                            :
                                            <button className="shadow" type="submit">Update info</button>
                                        }

                                    </div>
                                </form>

                            </section>

                        </div>

                    </main>
                </div>
            </>
        );
    }

}

export default withRouter(withAuth(ProfileEdit));