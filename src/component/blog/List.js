import React, { Component } from "react";
import { List, Progress } from "antd-mobile";
import { timeConvert } from "../../util/time";
import HocLoading from "../hoc/HocLoading";
const Item = List.Item;
const Brief = Item.Brief;

class BlogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogList: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(item) {
    this.props.history.push("/blogDetail/" + item.id);
  }

  componentWillMount() {
    this.postRequestBody("/blog/getMyBlog", {}).then(res => {
      this.setState({
        blogList: res
      });
      this.props.stopLoading();
    });
  }

  render() {
    return (
      <>
        {this.props.showPercent && (
          <Progress percent={this.props.percent} position="fixed" />
        )}

        <List renderHeader={() => "博客列表"} className="my-list">
          {this.state.blogList.map(item => (
            <Item
              key={item.id}
              extra={"访客:" + item.vistor_count}
              align="top"
              multipleLine
              onClick={e => this.handleClick(item)}
            >
              {item.title} <Brief>{timeConvert(item.time)}</Brief>
            </Item>
          ))}
        </List>
      </>
    );
  }
}

export default HocLoading(BlogList);
