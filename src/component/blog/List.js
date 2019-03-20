import React, { Component } from "react";
import { List } from "antd-mobile";
import { timeConvert } from "../../util/time";
const Item = List.Item;
const Brief = Item.Brief;

export default class BlogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogList: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log(e);
  }

  componentWillMount() {
    this.postRequestBody("/blog/getMyBlog", {}).then(res => {
      this.setState({
        blogList: res
      });
    });
  }

  render() {
    return (
      <List renderHeader={() => "博客列表"} className="my-list">
        {this.state.blogList.map(item => (
          <Item
            key={item.id}
            extra={"访客:" + item.vistor_count}
            align="top"
            multipleLine
            onClick={this.handleClick}
          >
            {item.title} <Brief>{timeConvert(item.time)}</Brief>
          </Item>
        ))}
      </List>
    );
  }
}
