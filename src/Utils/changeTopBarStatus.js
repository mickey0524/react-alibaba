const changeTopBarStatus = (path) => {
  let topBar = {
    left: 'back',
    middle: '',
    right: false
  };
  if (path === 'takeaway') {
    topBar.left = 'search';
    topBar.middle = '北京邮电大学';
    topBar.right = true;
  }
  else if (path === 'search') {
    topBar.middle = '搜索';
  }
  else if (path === 'order') {
    topBar.middle = '订单';
  }
  else if (path === 'user') {
    topBar.middle = '我的';
  }
  else if (path === 'shopDetail') {
    topBar.middle = '商家详情';
  }
  else if (path === '/user/account') {
    topBar.middle = '账户信息';
  }
  else if (path === '/user/setUserName') {
    topBar.middle = '修改用户名';
  }
  else if (path === '/user/address') {
    topBar.middle = '编辑地址';
  }
  else if (path === '/user/addAddress') {
    topBar.middle = '新增地址';
  }
  else if (path === '/user/changePassword') {
    topBar.middle = '重置密码';
  }
  else if (path === '/user/balance') {
    topBar.middle = '我的余额';
  }
  return topBar;
}

export {
  changeTopBarStatus
}