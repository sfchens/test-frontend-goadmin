<template>
  <div>
    <!-- 添加或修改菜单对话框 -->
    <el-drawer
      ref="drawer"
      :title="modalRef.title"
      :before-close="handleCancel"
      :visible.sync="modalRef.visible"
      direction="rtl"
      custom-class="demo-drawer"
      size="830px"
    >
      <div class="demo-drawer__content">
        <el-form ref="formRef" :model="formData" :rules="formRules" label-position="top" label-width="106px">
          <el-row v-if="formData.id > 0">
            <el-col :span="12">
              <el-form-item prop="id" label="ID">
                <el-input v-model="formData.id" :disabled="true" placeholder="请输入菜单标题" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="parent_id">
                <span slot="label">
                  上级菜单
                  <el-tooltip content="指当前菜单停靠的菜单归属" placement="top">
                    <i class="el-icon-question" />
                  </el-tooltip>
                </span>
                <treeselect
                  v-model="formData.parent_id"
                  :options="menuList"
                  :normalizer="normalizer"
                  :show-count="true"
                  placeholder="选择上级菜单"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="title">
                <span slot="label">
                  菜单标题
                  <el-tooltip content="菜单位置显示的说明信息" placement="top">
                    <i class="el-icon-question" />
                  </el-tooltip>
                </span>
                <el-input v-model="formData.title" placeholder="请输入菜单标题" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="sort">
                <span slot="label">
                  显示排序
                  <el-tooltip content="根据序号升序排列" placement="top">
                    <i class="el-icon-question" />
                  </el-tooltip>
                </span>
                <el-input-number v-model="formData.sort" controls-position="right" :min="0" />
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item prop="menu_type">
                <span slot="label">
                  菜单类型
                  <el-tooltip content="包含目录：以及菜单或者菜单组，菜单：具体对应某一个页面，按钮：功能才做按钮；" placement="top">
                    <i class="el-icon-question" />
                  </el-tooltip>
                </span>
                <el-radio-group v-model="formData.menu_type">
                  <el-radio label="M">目录</el-radio>
                  <el-radio label="C">菜单</el-radio>
                  <el-radio label="F">按钮</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="菜单图标">
                <el-popover
                  placement="bottom-start"
                  width="460"
                  trigger="click"
                  @show="$refs['iconSelect'].reset()"
                >
                  <IconSelect ref="iconSelect" @selected="handleSelectIcon" />
                  <el-input slot="reference" v-model="formData.icon" placeholder="点击选择图标" readonly>
                    <svg-icon
                      v-if="formData.icon"
                      slot="prefix"
                      :icon-class="formData.icon"
                      class="el-input__icon"
                      style="height: 32px;width: 16px;"
                    />
                    <i v-else slot="prefix" class="el-icon-search el-input__icon" />
                  </el-input>
                </el-popover>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="formData.menu_type == 'M' || formData.menu_type == 'C'" prop="menu_name">
                <span slot="label">
                  路由名称
                  <el-tooltip content="需要和页面name保持一致，对应页面即可选择缓存" placement="top">
                    <i class="el-icon-question" />
                  </el-tooltip>
                </span>
                <el-input v-model="formData.menu_name" placeholder="请输入路由名称" />
              </el-form-item>
            </el-col>

            <el-col v-if="formData.menu_type == 'M' || formData.menu_type == 'C'" :span="12">
              <el-form-item prop="component">
                <span slot="label">
                  组件路径
                  <el-tooltip content="菜单对应的具体vue页面文件路径views的下级路径/admin/sys-api/index；目录类型：填写Layout，如何有二级目录请参照日志目录填写；" placement="top">
                    <i class="el-icon-question" />
                  </el-tooltip>
                </span>
                <el-input v-model="formData.component" placeholder="请输入组件路径" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item v-if="formData.menu_type == 'M' || formData.menu_type == 'C'" prop="is_frame">
                <span slot="label">
                  是否外链
                  <el-tooltip content="可以通过iframe打开指定地址" placement="top">
                    <i class="el-icon-question" />
                  </el-tooltip>
                </span>
                <el-radio-group v-model="formData.is_frame">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item v-if="formData.menu_type != 'F'" prop="path">
                <span slot="label">
                  路由地址
                  <el-tooltip content="访问此页面自定义的url地址，建议/开头书写，例如 /app-name/menu-name" placement="top">
                    <i class="el-icon-question" />
                  </el-tooltip>
                </span>
                <el-input v-model="formData.path" placeholder="请输入路由地址" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item v-if="formData.menu_type == 'F' || formData.menu_type == 'C'" prop="permission">
                <span slot="label">
                  权限标识
                  <el-tooltip content="前端权限控制按钮是否显示" placement="top">
                    <i class="el-icon-question" />
                  </el-tooltip>
                </span>
                <el-input v-model="formData.permission" placeholder="请权限标识" maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="formData.menu_type != 'F'" prop="visible">
                <span slot="label">
                  菜单状态
                  <el-tooltip content="需要显示在菜单列表的菜单设置为显示，否则设置为隐藏" placement="top">
                    <i class="el-icon-question" />
                  </el-tooltip>
                </span>

                <el-radio-group v-model="formData.visible">
                  <el-radio :label="1">显示</el-radio>
                  <el-radio :label="0">隐藏</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item v-if="formData.menu_type == 'F' || formData.menu_type == 'C'">
                <span slot="label">
                  api权限
                  <el-tooltip content="配置在这个才做上需要使用到的接口，否则在设置用户角色时，接口将无权访问。" placement="top">
                    <i class="el-icon-question" />
                  </el-tooltip>
                </span>
                <el-transfer
                  v-model="formData.apis_id"
                  style="text-align: left; display: inline-block; width:110%"
                  filterable
                  :props="{
                    key: 'id',
                    label: 'title'
                  }"
                  :titles="['未授权', '已授权']"
                  :button-texts="['收回', '授权 ']"
                  :format="{
                    noChecked: '${total}',
                    hasChecked: '${checked}/${total}'
                  }"
                  class="panel"
                  :data="sysApiList"
                  @change="handleChangeApi"
                >
                  <span slot-scope="{ option }"><el-tag type="success">{{ '['+option.tags+']' }}</el-tag> &nbsp;{{ option.title }}</span>
                </el-transfer>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
          <el-button @click="handleCancel">取 消</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { addMenuApi } from '@/api/admin/sys-menu'
import { treeListAllMenuApi } from '@/api/admin/sys-menu'
import { listSysApiApi } from '@/api/admin/sys-api'

import { createRef } from '@/utils/tool'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import IconSelect from '@/components/IconSelect'

const createFormData = () => {
  return {
    id: '',
    parent_id: undefined,
    title: '',
    sort: '',
    menu_type: '',
    icon: '',
    menu_name: '',
    component: '',
    is_frame: '',
    path: '',
    permission: '',
    visible: '',
    apis_id: [],
    sys_apis: []
  }
}

const createFormRules = () => {
  return {
    parent_id: [
      { required: true, message: '请选择上级菜单', trigger: 'blur' }
    ],
    title: [
      { required: true, message: '请填写菜单标题', trigger: 'blur' }
    ],
    sort: [
      { required: true, message: '请填写排序', trigger: 'blur' }
    ],
    menu_type: [
      { required: true, message: '请选择菜单类型', trigger: 'blur' }
    ],
    menu_name: [
      { required: true, message: '请填写菜单名称', trigger: 'blur' }
    ],
    permission: [
      { required: true, message: '请填写权限标识', trigger: 'blur' }
    ],
    is_frame: [
      { required: true, message: '请选择是否外链', trigger: 'change' }
    ],
    path: [
      { required: true, message: '请填写地址', trigger: 'blur' }
    ],
    visible: [
      { required: true, message: '请选择是否显示', trigger: 'change' }
    ],
    resource: [
      { required: true, message: '请选择活动资源', trigger: 'change' }
    ],
    apis: [
      { required: true, message: '请选择api授权', trigger: 'blur' }
    ]
  }
}
export default {
  name: 'FormModal',
  components: { Treeselect, IconSelect },
  props: {
    modalRef: {
      type: Object,
      default: createRef()
    }
  },
  data() {
    return {
      formData: createFormData(),
      formRules: createFormRules(),
      menuList: [],
      sysApiList: []
    }
  },
  mounted() {
    this.getTreeselect()
    this.getSysApiList()
  },
  created() {
    // this.getTreeselect()
    // this.getSysApiList()
  },
  methods: {
    handleCancel() {
      this.handleClose()
    },
    handleSelectIcon(name) {
      this.formData.icon = name
    },
    handleClose() {
      this.formData = createFormData()
      this.resetForm('formRef')
      this.modalRef = createRef()
    },
    handleSubmit() {
      this.$refs.formRef.validate(valid => {
        if (!valid) {
          console.log(valid)
          return
        }

        const formData = this.formData
        addMenuApi(formData).then(res => {
          if (res.code !== 200) {
            this.msgError(res.msg)
            return
          }
          this.handleClose()
          this.msgSuccess(res.msg)
        })
      })
    },
    handleChangeApi(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
      if (this.formData.sys_apis == null) {
        this.formData.sys_apis = []
      }
      const list = this.formData.sys_apis
      this.formData.apis_id = value
      if (direction === 'right') {
        for (let x = 0; x < movedKeys.length; x++) {
          for (let index = 0; index < this.sysApiList.length; index++) {
            const element = this.sysApiList[index]
            if (element.id === movedKeys[x]) {
              list.push(element)
              break
            }
          }
        }
        this.formData.sys_apis = list
      } else if (direction === 'left') {
        const l = []
        for (let index = 0; index < movedKeys.length; index++) {
          const element = movedKeys[index]
          for (let x = 0; x < list.length; x++) {
            const e = list[x]
            if (element !== e.id) {
              l.push()
              break
            }
          }
        }
        this.formData.sys_apis = l
      }
      // this.setApis(this.form.SysApi)
    },
    /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.children == null || node.children === 'null' || (node.children && !node.children.length)) {
        delete node.children
      }
      return {
        id: node.id,
        label: node.title,
        children: node.children
      }
    },
    getTreeselect() {
      treeListAllMenuApi().then(res => {
        const menu = { id: 0, title: '主类目', children: [] }
        menu.children = res.data.list
        this.menuList.push(menu)
      })
    },
    getSysApiList() {
      listSysApiApi({ page: 1, page_size: 1000 }).then(res => {
        if (res.code !== 200) {
          this.msgError(res.msg)
          return
        }
        this.sysApiList = res.data.list
      })
    }
  }
}
</script>
<style lang="css">
.panel .el-transfer__buttons{
  width: 150px;
}
.panel .el-transfer__buttons .el-button + .el-button{
  margin-left:0;
}
.panel .el-transfer-panel{
  width: 300px;
}

.el-col {
padding: 0 5px;
}
.el-drawer__header{
margin-bottom: 0;
}
</style>
