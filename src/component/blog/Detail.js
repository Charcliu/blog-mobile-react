import React, { Component } from "react";
import { List } from "antd-mobile";
import { timeConvert } from "../../util/time";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.css";
import "../../css/detail.css";

const Item = List.Item;

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: {},
      content: {
        content: ""
      }
    };
  }

  componentWillMount() {
    this.multiple(
      [
        this.postRequestParam("/blog/getOneBlogListById", {
          blogId: this.props.match.params.blogId
        }),
        this.postRequestParam("/blog/getBlogDeitailById", {
          blogId: this.props.match.params.blogId
        })
      ],
      (header, content) => {
        this.setState({
          header,
          content
        });
      }
    );
  }

  render() {
    marked.setOptions({
      highlight: code => hljs.highlightAuto(code).value
    });
    const output = marked(this.state.content.content);
    return (
      <>
        <List
          renderHeader={() => timeConvert(this.state.header.time)}
          className="my-list"
        >
          <Item extra={"访客:" + this.state.header.vistor_count}>
            {this.state.header.title}
          </Item>
        </List>
        <div className="content" dangerouslySetInnerHTML={{ __html: output }} />
      </>
    );
  }
}
