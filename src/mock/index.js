import Mock from 'mockjs'
// import { ajcaptcha } from './data/common'
// import { systemLogin } from './data/login'
// import { systemMenuTreeList } from './data/menu'
// import { getUserInfo } from './data/user'

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 1000
})

// 登录相关和获取用户信息
// Mock.mock(/\/api\/v1\/sys\/login/, systemLogin)
// Mock.mock(/\/api\/v1\/sys\/config\/get_one/, getLoginInfo)
// Mock.mock(/\/api\/v1\/sys\/logout/, systemLogout)
// Mock.mock(/\/api\/v1\/sys\/admin\/get_admin_info/, getUserInfo)

// // 公共部分
// Mock.mock(/\/api\/v1\/captcha\/get_one/, ajcaptcha)

// 菜单管理
// Mock.mock(/\/api\/v1\/sys\/menu\/tree_list/, systemMenuTreeList)
// Mock.mock(/\/api\/v1\/sys\/menu\/role/, systemMenuTreeList)
// Mock.mock(/\/backend\/system\/auths_menu\/tree_list/, systemMenuTreeList)
// Mock.mock(/\/backend\/system\/auths_route\/router_list/, systemRoute)
// Mock.mock(/\/backend\/system\/auths_menu\/list/, getSystemMenusList)

// Mock.mock(/\/get_table_data/, getTableData);
// Mock.mock(/\/get_drag_list/, getDragList);
// Mock.mock(/\/save_error_logger/, 'success');
// Mock.mock(/\/image\/upload/, uploadImage);
// Mock.mock(/\/message\/init/, getMessageInit);
// Mock.mock(/\/message\/content/, getContentByMsgId);
// Mock.mock(/\/message\/has_read/, hasRead);
// Mock.mock(/\/message\/remove_readed/, removeReaded);
// Mock.mock(/\/message\/restore/, restoreTrash);
// Mock.mock(/\/message\/count/, messageCount);
// Mock.mock(/\/get_org_data/, getOrgData);
// Mock.mock(/\/get_tree_select_data/, getTreeSelectData);
//
// export default Mock
