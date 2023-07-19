const USER_MAP = {
  admin: {
    'code': 200,
    'currentAuthority': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhc2NvcGUiOiIiLCJleHAiOjE2ODk1NjgxNDksImlkZW50aXR5IjoxLCJuaWNlIjoiYWRtaW4iLCJvcmlnX2lhdCI6MTY4OTU2NDU0OSwicm9sZWlkIjoxLCJyb2xla2V5IjoiYWRtaW4iLCJyb2xlbmFtZSI6Iuezu-e7n-euoeeQhuWRmCJ9.EY3DqZrmfwqsTLfhjpEz1rLyMnrVL0WOM0_32jKtHHo',
    'expire': '2023-07-17T12:29:09+08:00',
    'success': true,
    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhc2NvcGUiOiIiLCJleHAiOjE2ODk1NjgxNDksImlkZW50aXR5IjoxLCJuaWNlIjoiYWRtaW4iLCJvcmlnX2lhdCI6MTY4OTU2NDU0OSwicm9sZWlkIjoxLCJyb2xla2V5IjoiYWRtaW4iLCJyb2xlbmFtZSI6Iuezu-e7n-euoeeQhuWRmCJ9.EY3DqZrmfwqsTLfhjpEz1rLyMnrVL0WOM0_32jKtHHo'
  }
}

export const systemLogin = req => {
  req = JSON.parse(req.body)
  return {
    code: 200,
    msg: '操作成功',
    data: USER_MAP[req.username]
  }
}

export const systemLogout = req => {
  return {
    code: 200,
    msg: '操作成功',
    data: {}
  }
}

export const getLoginInfo = () => {
  return {
    'requestId': 'c9dcf4c0-1911-40d3-9dd4-2a4931d75697',
    'code': 200,
    'msg': '查询成功',
    'data': {
      'sys_app_logo': 'https://doc-image.zhangwj.com/img/go-admin.png',
      'sys_app_name': 'go-admin管理系统'
    }
  }
}
