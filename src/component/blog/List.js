import React, { Component } from "react";
import { List, Progress, Toast } from "antd-mobile";
import { timeConvert } from "../../util/time";
import HocLoading from "../hoc/HocLoading";
import ReactPullLoad, { STATS } from "react-pullload";
import "../../../node_modules/react-pullload/dist/ReactPullLoad.css";
import "../../css/list.css";

const Item = List.Item;
const Brief = Item.Brief;

class BlogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogList: [],
      pageNum: 1,
      pageSize: 10,
      pages: 0,
      action: STATS.init
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(item) {
    this.props.history.push("/blogDetail/" + item.id);
  }

  componentWillMount() {
    this.getMyBlog();
  }

  getMyBlog = type => {
    this.props.startLoading();
    return this.postRequestBody("/blog/getMyBlog", {
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize
    }).then(res => {
      let blogList = [];
      type === STATS.refreshing
        ? (blogList = [...res.list])
        : (blogList = [...this.state.blogList, ...res.list]);
      this.setState({
        blogList: blogList,
        pages: res.pages
      });
      this.props.stopLoading();
    });
  };

  handleAction = action => {
    console.info(action, this.state.action, action === this.state.action);

    if (action === this.state.action) {
      return false;
    }

    if (action === STATS.refreshing) {
      //刷新
      this.handRefreshing();
    } else if (action === STATS.loading) {
      //加载更多
      this.handLoadMore();
    } else {
      //DO NOT modify below code
      this.setState({
        action: action
      });
    }
  };

  handRefreshing = () => {
    if (STATS.refreshing === this.state.action) {
      return false;
    }

    this.setState({
      pageNum: 1
    });
    this.getMyBlog(STATS.refreshing).then(res => {
      this.setState({
        action: STATS.refreshed
      });
    });

    this.setState({
      action: STATS.refreshing
    });
  };

  handLoadMore = () => {
    if (STATS.loading === this.state.action) {
      return false;
    }

    if (this.state.pageNum < this.state.pages) {
      this.setState(preState => ({
        pageNum: preState.pageNum + 1
      }));
      this.getMyBlog(STATS.loading).then(res => {
        this.setState({
          action: STATS.reset
        });
      });
    } else {
      Toast.fail("到底啦！！！", 1);
      return false;
    }

    this.setState({
      action: STATS.loading
    });
  };

  render() {
    return (
      <>
        {this.props.showPercent && (
          <Progress percent={this.props.percent} position="fixed" />
        )}
        <ReactPullLoad
          downEnough={100}
          action={this.state.action}
          handleAction={this.handleAction}
          distanceBottom={100}
        >
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
        </ReactPullLoad>
      </>
    );
  }
}

export default HocLoading(BlogList);
