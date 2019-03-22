import React from "react";
import { connect } from "dva";
import { Row, Spin, Icon } from "antd";
import ReactEcharts from "echarts-for-react";
import _ from "lodash";
import echarts from "echarts/dist/echarts.common";
import axios from "axios";
import moment from "moment";
import {queryUrlToObj} from '../../../../utils/utils'

@connect(({ loading: { effects }, media_action_media }) => {
  // console.log(media_action_media);
  return {
    showLoading: effects["media_action_media/fetchCountData"],
    infoTap: media_action_media.infoTap,
    ...media_action_media,
  };
})
class PlayCount extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.mediaInfo.userId,
      list: [],
    };
  }
  componentDidMount() {
    this.fetchVideoTrend();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.mediaInfo.userId != this.state.userId) {
      this.setState(
        {
          ...this.state,
          userId: prevProps.mediaInfo.userId,
        },
        () => {
          this.fetchVideoTrend();
        }
      );
    }
  }
  fetchVideoTrend = () => {
    axios
      .get(`http://apicenter.aisuperstar.com/user/video_trend?user_id=${this.state.userId}&token=${queryUrlToObj()['token']}`)
      .then(res => {
        this.setState({
          userId: this.props.mediaInfo.userId,
          list: res.data.data ? res.data.data.ltm_item_statics : [],
        });
      });
  };

  render() {
    /**
     * lineType 粉丝线||获赞线
     * periods  false周||true日
     */
    let { style, info, tap } = this.props,
      countData = [],
      xData = [],
      yData = [];
    //时间排序
    countData = _.cloneDeepWith(this.state.list);
    countData = _.sortBy(countData, t => {
      return -moment(t.item_date, "YYYY-MM-DD HH:mm:ss").valueOf();
    });
    _.filter(countData, (val, key) => {
      xData.push(val.item_date);
      yData.push(val.play);
    });
    const infoLoading = info && info != "fans" && info != "like" ? true : tap;
    if (this.props.showLoading && infoLoading) {
      return (
        <Row style={style.style} type="flex" justify="center" align="middle">
          <Spin spinning />
        </Row>
      );
    }
    if (!this.state.list) {
      return (
        <Row style={style.style} type="flex" justify="center" align="middle">
          <span>
            <Icon type="frown-o" />&nbsp;暂无数据
          </span>
        </Row>
      );
    }

    const option = {
      toolbox: {
        show: true,
        feature: {
          dataZoom: { yAxisIndex: "none" },
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      tooltip: {
        show: true,
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: xData,
        axisLabel: {
          show: true,
          formatter: function(val) {
            return val.slice(5, 10);
          },
        },
        splitLine: { show: false },
        axisLine: { lineStyle: { color: "rgba(255, 255, 255, 0.45)" } },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          show: true,
          formatter: val => (val > 10000 ? _.round(val / 1000, 2) + "k" : val),
        },
        splitLine: { show: false },
        axisLine: { lineStyle: { color: "rgba(255, 255, 255, 0.45)" } },
      },
      series: [
        {
          type: "bar",
          data: yData,
          itemStyle: {
            normal: {
              color: "rgba(34, 231, 185, 0.8)",
            },
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(58, 137, 108, .5)",
                },
                {
                  offset: 1,
                  color: "rgba(58, 137, 108, 0)",
                },
              ]),
            },
          },
          markLine: {
            silent: true,
            data: [
              {
                yAxis: _.round(
                  _.reduce(yData, (pre, next) => pre + next, 0) / _.get(yData, "length", 0),
                  2
                ),
              },
            ],
          },
        },
      ],
    };
    return <ReactEcharts option={option} style={style.style} />;
    // return (<CommonLine
    //     {...{
    //         ...this.props,
    //         xData: _.map(miniLine, item => item.post_time),
    //         yData: _.map(miniLine, item => item.comments_sum),
    //         cardTitle: "头条阅读总数",
    //         tip: "一个月内微信头条阅读数曲线",
    //     }}
    // />)
  }
}
export default PlayCount;