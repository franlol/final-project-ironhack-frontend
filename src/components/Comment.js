import React, { Component } from 'react';

import '../public/styles/common.css';

class Comment extends Component {

    componentDidMount() {

        // Formating comments, to replace \b by <br>
        let comments = document.querySelectorAll('.common-comment p');
        comments.forEach((comment) => {
            let content = comment.innerHTML.replace(/\n/g, '<br>');
            comment.innerHTML = content;
        });

    }

    render() {
        const { comment } = this.props;

        return (
            <div className="common-comment">
                <hr/>
                <p>{comment}</p>
            </div>
        );
    }

}

export default Comment;