import React, { Component } from "react";
import { List, Progress } from "antd-mobile";
import { timeConvert } from "../../util/time";
const Item = List.Item;
const Brief = Item.Brief;

export default class BlogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogList: [],
      percent: 0,
      showPercent: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(item) {
    this.props.history.push("/blogDetail/" + item.id);
  }

  componentWillMount() {
    let interval = setInterval(() => {
      this.setState((prevState, props) => ({
        percent: prevState.percent + 20
      }));
    }, 100);
    this.postRequestBody("/blog/getMyBlog", {}).then(res => {
      clearInterval(interval);
      this.setState({
        blogList: res,
        percent: 100
      });
      setTimeout(() => {
        this.setState({
          showPercent: false
        });
      }, 500);
    });
  }

  render() {
    return (
      <>
        {this.state.showPercent && (
          <Progress percent={this.state.percent} position="fixed" />
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
