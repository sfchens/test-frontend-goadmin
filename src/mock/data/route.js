
export const systemRoute = () => {
  return {
    code: 200,
    msg: '操作成功',
    data: {
      total: 10,
      list: [
        {
          name: '测试1',
          method: 'get',
          router: '/backend'
        },
        {
          name: '测试2',
          method: 'get',
          router: '/backend'
        },
        {
          name: '测试3',
          method: 'get',
          router: '/backend'
        },
        {
          name: '测试4',
          method: 'get',
          router: '/backend'
        },
        {
          name: '测试5',
          method: 'get',
          router: '/backend'
        },
        {
          name: '测试6',
          method: 'get',
          router: '/backend'
        }
      ]
    }
  }
}
