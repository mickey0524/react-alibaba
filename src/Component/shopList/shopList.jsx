import React, { Component, PropTypes } from 'react';
import template from '../common/template';
import mockData from './mock.json';            // mock数据，目前不打算写服务端，只是为了熟悉react
import './shopList.less';

/**
 * index页面种类下面商家的滚动列表
 */

class Main extends Component {

  constructor(props) {
    super(props);
    if (this.props.shopList.length === 0) {
      this.props.changeShopList(mockData.shopList);
    }
  }

  render () {
    return (
      <div id="shopList">
        <ul>
          {
            this.props.shopList.map((item, index) => {
              return (
                <div className="shop-item" key={index}>
                  <div className="left">
                    <div className="shop-img">
                      <img src={ item.imgUrl } />
                    </div>
                    <div className="shop-mes">
                      <div className="shop-title">
                        {
                          item.isBrand && <span className="brand">品牌</span>
                        }
                        <span className="shop-name">{ item.shopName }</span>
                      </div>
                      <div className="shop-score">
                        <div className="empty-stars"></div>
                        <div className="full-stars" style={{ width: item.starNum * 0.56 + 'rem' }}></div>
                        <span className="star-num">{ item.starNum }</span>
                        <span className="month-sale">{ item.monthlySales }单</span>
                        <p>¥{ item.initMoney }起送 / 配送费约¥{ item.deliveryFee }</p>
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    <div className="shop-service">
                      { item.isInsurance && <span>保</span> }
                      { item.isOntime && <span>准</span> }
                      { item.needtip && <span>票</span> }
                    </div>
                    <div className="distribution">
                      { item.isBird && <span className="bird">蜂鸟专送</span> }
                      { item.isOntime && <span className="ontime">准时达</span> }
                    </div>
                    <div className="shop-distance">
                      { item.distance }公里 / <span>{ item.needTime }</span>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default template({
  id: 'shopList',
  component: Main
})