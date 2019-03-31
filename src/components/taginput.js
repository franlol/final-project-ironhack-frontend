import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class TagInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            tags: [],
            // { id: "Electrician", text: "Electrician" },
            // suggestions: [
            //     { id: 'Room cleaner', text: 'Room cleaner' },
            // ]
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidUpdate() {
        
        if (!this.state.isLoaded) this.setState({ isLoaded: true, tags: this.props.tags });
    }

    async handleDelete(i) {
        const { tags } = this.state;

        await this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });

        // Aftet delete some tag i send to form, si I can handle tags
        const { updateTags } = this.props;
        updateTags(this.state.tags);
    }

    async handleAddition(tag) {
        await this.setState(state => ({ tags: [...state.tags, tag] }));

        // Aftet delete some tag i send to form, si I can handle tags
        const { updateTags } = this.props;
        updateTags(this.state.tags);
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        const { updateTags } = this.props;
        updateTags(this.state.tags);

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }

    render() {
        // const { tags, suggestions } = this.state;
        const { tags } = this.state;

        return (
            <div>
                <ReactTags tags={tags}
                    // suggestio    ns={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters}
                    placeholder={"Add category for your need"}
                    autofocus={false}
                    classNames={{
                        tags: 'tagsClass',
                        tagInput: 'tagInputClass',
                        tagInputField: 'tagInputFieldClass',
                        selected: 'selectedClass',
                        tag: 'tagClass',
                        remove: 'removeClass',
                        suggestions: 'suggestionsClass',
                        activeSuggestion: 'activeSuggestionClass'
                    }}
                />
            </div>
        )
    }
};

export default TagInput;