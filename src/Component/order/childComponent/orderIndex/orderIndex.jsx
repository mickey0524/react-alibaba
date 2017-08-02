import React, { Component, PropTypes } from 'react';
import template from '../../../common/template';
import TopBar from '../../../common/topBar/topBar';
import BottomBar from '../../../common/bottomBar/bottomBar';
import Interval from '../../../common/interval/interval';
import mockData from './mockData.json';
import { dateToStamp } from '../../../../Utils/dateForm';
import './orderIndex.less';

class Main extends Component {
  static timer = '';
  constructor(props) {
    super(props);
    this.state = {
      orderList: mockData.orderList
    }
    this.changeOrderTime = () => {
      let newOrderList = this.state.orderList;
      newOrderList.forEach((item) => {
        if (item.orderStatus === '等待支付') {
          let min = parseInt(item.minuteLeft, 10);
          let sec = parseInt(item.secondLeft, 10) - 1;
          if (sec < 0) {
            min += sec;
            sec = 59;
          }
          if (min < 0) {
            item.orderStatus = '支付超时';
          }
          else {
            min = this.addZero(min);
            sec = this.addZero(sec);
            item.minuteLeft = min;
            item.secondLeft = sec;
          }
        }
      });
      this.setState({
        orderList: newOrderList
      })
    }
    this.addZero = (num) => {
      return (num < 10) ? '0' + num : num;
    }
  }

  render() {
    return (
      <div id="orderIndex">
        <TopBar route={this.props.route}></TopBar>
        <div className="order-container">
          <ul>
            {
              this.state.orderList.map((item, index) => {
                return (
                  <li key={index}>
                    <div className="order-item">
                      <div className="order-img">
                        <img src={item.shopImg} />
                      </div>
                      <div className="order-mes">
                        <div className="order-shop">
                          <div className="shop">
                            <p>{ item.shopName }<span>></span></p>
                            <p>{ item.orderTime }</p>
                          </div>
                          <div className="order-status">
                            { item.orderStatus }
                          </div>
                        </div>
                        <div className="order-details">
                          {
                            item.goods.length === 1 ? (
                              <span>{ item.goods[0] }</span>
                            ) : (
                              <span>{ item.goods[0] }等{ item.goods.length }件商品</span>
                            )
                          }
                          <span>¥{ item.orderMoney }</span>
                        </div>
                        {
                          item.orderStatus === '等待支付' ? (
                            <p className="wait-pay">去支付(还剩{ item.minuteLeft }分{ item.secondLeft }秒)</p>
                          ) : (
                            <p className="more-order">再来一单</p>
                          )
                        }
                      </div>
                    </div>
                    <Interval></Interval>
                  </li>
                );
              })
            }
          </ul>
        </div>
        <BottomBar></BottomBar>
      </div>
    );
  }

  componentWillMount() {
    let newOrderList = this.state.orderList;
    newOrderList.forEach((item) => {
      let timeDiff = parseInt(dateToStamp(item.orderTime), 10) + (15 * 60 * 1000) - Date.now();
      if (timeDiff < 0) {
        item.orderStatus = '支付超时';
      }
      else {
        timeDiff /= 1000;
        item.minuteLeft = this.addZero(parseInt(timeDiff / 60, 10));
        item.secondLeft = this.addZero(parseInt(timeDiff % 60, 10));
      }
    })
    this.setState({ orderList: newOrderList });
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.changeOrderTime();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
}

export default template({
  id: 'orderIndex',
  component: Main
});