import React, {Component, PropTypes} from 'react';
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router';

import takeaway from '../Component/takeaway/takeaway'; //销售录入

class Roots extends Component {
  render() {
    return (
      <div>{ this.props.children }</div>
    );
  }
}

const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;

const search = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/search/search').default)
  },'search')
}

const order = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/order/order').default)
  }, 'order')
}

const user = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/user/user').default)
  }, 'user')
}

const shop = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/shop/shop').default)
  }, 'shop')
}

const ac = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/shop/childComponent/activityDetail/activityDetail').default)
  }, 'ac')
}

const shopDetail = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/shop/childComponent/shopDetail/shopDetail').default)
  }, 'shopDetail')
}

const shopIndex = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/shop/childComponent/shopIndex/shopIndex').default)
  }, 'shopIndex')
}

const goodList = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/shop/childComponent/goodList/goodList').default)
  }, 'goodList')
}

const account = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/account/account').default)
  }, 'account')
}

const RouteConfig = (
  <Router history={history}>
    <Route path="/" component={Roots}>
      <IndexRoute component={takeaway} />//首页
      <Route path="takeaway" component={takeaway} />
      <Route path="search" getComponent={search} />
      <Route path="order" getComponent={order} />
      <Route path="user" getComponent={user} />
      <Route path="shop" getComponent={shop}>
        <IndexRoute getComponent={shopIndex} />
        <Route path="/shop/activityDetail" getComponent={ac} />
        <Route path="/shop/shopDetail" getComponent={shopDetail} />
      </Route>
      <Route path="account" getComponent={account} />
    </Route>
    <Redirect from='*' to='/' />
  </Router>
);

export default RouteConfig;