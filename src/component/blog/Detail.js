import React, { Component } from "react";
import { List } from "antd-mobile";
import { timeConvert } from "../../util/time";

const Item = List.Item;

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: {},
      content: {}
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
        <p>{this.state.content.content}</p>
      </>
    );
  }
}
