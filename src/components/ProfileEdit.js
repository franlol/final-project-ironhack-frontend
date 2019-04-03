import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';

import authService from '../lib/auth-service';

import '../public/styles/profileedit.css';

// Initialize Firebase
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';
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
        }
        try {
            const updated = await authService.edit(user);
            // console.log(updated.response.data)
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { user } = this.props;
        const { profession, description, rate } = this.state;

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
                                        <label htmlFor="title">Description:</label>
                                        <input value={description} onChange={this.formInputHandler} className="shadow" id="description" type="text" name="description" />
                                    </div>

                                    <div className="form-input">
                                        <label htmlFor="rate">Your rate:</label>
                                        <input required value={rate} onChange={this.formInputHandler} className="shadow" id="rate" type="number" name="rate" />
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

export default withAuth(ProfileEdit);