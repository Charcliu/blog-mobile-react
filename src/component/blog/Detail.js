import React, { Component } from "react";
import { List, Progress } from "antd-mobile";
import { timeConvert } from "../../util/time";
import HocLoading from "../hoc/HocLoading";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.css";
import "../../css/detail.css";

const Item = List.Item;

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: {
        time: "",
        title: "",
        vistor_count: ""
      },
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
        this.props.stopLoading();
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
        {this.props.showPercent && (
          <Progress percent={this.props.percent} position="fixed" />
        )}

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

export default HocLoading(Detail);
