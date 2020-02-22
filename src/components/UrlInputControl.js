import React from "react";
import styled from "@emotion/styled";

const testUrl = 'https://css-tricks.com/javascript-scope-closures/';

const Wrapper = styled.div`
  color: grey;
  input {
    color: #222222;
  }
`

class UrlInputControl extends React.Component {
  state = {
    invalidUrl: false,
    urlInput: this.props.url || '' // should I just remove this and use the url state of the parent?
  };

  handleChange = event => {
    const value = event.target.value;
    this.setState({ urlInput: value });
  };

  submitUrl = event => {
    const cleanUrl = this.validateUrl(this.state.urlInput);
    if (!cleanUrl) {
      this.setState({ invalidUrl: true });
      return alert("Invalid URL");
    }
    this.props.updateState('url', cleanUrl);
    this.props.setFormState(1);
    fetch(`/articles/scrape?url=${cleanUrl}`)
      .then(res => res.json()) // body.json() returns another promise
      .then(articleInfo => {
        this.props.updateState('article', articleInfo);
        let suggestedTags = this.suggestTags(articleInfo.topics, articleInfo.parentTopics);
        this.props.updateState('tagOptions', suggestedTags);
        this.props.setFormState(2);
      })
      .catch(err => console.log(err));
  };

  validateUrl = Url => {
    if (Url.length > 0) return Url;
  };

  suggestTags = (childTopics, parentTopics) => {
    let topics = {};
    childTopics.forEach(topic => {
      if (!topics[topic]) topics[topic] = false;
    });
    parentTopics.forEach(topic => {
      if (!topics[topic]) topics[topic] = false;
    });
    return topics;
  }

  render() {
    return (
      <Wrapper>
        {testUrl}
        <input
          type="text"
          required
          placeholder="Article URL"
          value={this.state.urlInput}
          onChange={this.handleChange}
          onKeyPress={this.submitUrl}
        />
        <button onClick={this.submitUrl}>Submit URL</button>
      </Wrapper>
    );
  }
}

export default UrlInputControl;