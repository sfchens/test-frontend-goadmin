<template>
  <div>
    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="modalRef.title" :visible.sync="modalRef.visible" width="600px" :close-on-click-modal="false">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="realname">
              <el-input v-model="formData.realname" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户账号" prop="username">
              <el-input v-model="formData.username" placeholder="请输入用户账号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户密码" prop="password">
              <el-input v-model="formData.password" placeholder="请输入用户密码" type="password" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归属部门" prop="dept_id">
              <treeselect
                v-model="formData.dept_id"
                :options="deptList"
                :normalizer="handleNormalizer"
                placeholder="请选择归属部门"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="formData.phone" placeholder="请输入手机号码" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formData.email" placeholder="请输入邮箱" maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="formData.sex" placeholder="请选择">
                <el-option
                  v-for="dict in sexOptions"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="formData.status">
                <el-radio :label="1">开启</el-radio>
                <el-radio :label="2">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <!-- <el-col :span="12">
            <el-form-item label="岗位">
              <el-select v-model="form.postId" placeholder="请选择" @change="$forceUpdate()">
                <el-option
                  v-for="item in postOptions"
                  :key="item.postId"
                  :label="item.postName"
                  :value="item.postId"
                  :disabled="item.status == 1"
                />
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="角色" prop="role_ids">
              <el-select v-model="formData.role_ids" multiple placeholder="请选择" @change="$forceUpdate()">
                <el-option
                  v-for="item in roleList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  :disabled="item.status != 1"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="formData.remark" type="textarea" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import { listRoleApi } from '@/api/admin/sys-role'
import { listDeptApi } from '@/api/admin/sys-dept'
import { addAdminApi } from '@/api/admin/sys-admin'

import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { createRef } from '@/utils/tool'
import { checkEmailByForm, checkMobileByForm } from '@/utils/form-validate'

const createFormData = () => {
  return {
    id: '',
    username: '',
    realname: '',
    email: '',
    phone: '',
    dept_id: undefined,
    role_ids: undefined,
    sex: undefined,
    password: '',
    status: undefined,
    remark: ''
  }
}

const createFormRules = () => {
  return {
    realname: [
      { required: true, message: '请输入名称', trigger: 'blur' }
    ],
    username: [
      { required: true, message: '请输入账号', trigger: 'blur' }
    ],
    dept_id: [
      { required: true, message: '请选择部门', trigger: 'blur' }
    ],
    role_ids: [
      { required: true, message: '请选择角色', trigger: 'blur' }
    ],
    sex: [
      { required: true, message: '请选择性别', trigger: 'blur' }
    ],
    status: [
      { required: true, message: '请选择状态', trigger: 'change' }
    ],
    email: [
      { required: false, message: '', trigger: 'blur' },
      { validator: checkEmailByForm, trigger: 'blur' }
    ],
    phone: [
      { required: false, message: '', trigger: 'blur' },
      { validator: checkMobileByForm, trigger: 'blur' }
    ]
  }
}

export default {
  name: 'FormModal',
  components: { Treeselect },
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
      sexOptions: [
        {
          value: 1,
          label: '女'
        },
        {
          value: 2,
          label: '男'
        },
        {
          value: 0,
          label: '未知'
        }
      ],
      roleList: [],
      deptList: []
    }
  },
  created() {
    this.initFormData()
    this.getRoleList()
    this.getDeptList()
  },
  methods: {
    initFormData() {
      this.formData = {
        ...this.formData,
        ...this.modalRef.data
      }
    },
    handleSubmit() {
      this.$refs.formRef.validate(valid => {
        if (!valid) {
          console.log(valid)
          return
        }
        const formData = this.formData
        addAdminApi(formData).then(res => {
          if (res.code !== 200) {
            this.msgError(res.msg)
            return
          }
          this.msgSuccess(res.msg)
          this.handleClose()
        })
      })
    },
    handleClose() {
      this.modalRef.visible = false
      this.resetForm('formRef')
      this.$emit('handleSearch')
    },
    handleNormalizer(node) {
      if ((node.children && !node.children.length) || node.children == null) {
        delete node.children
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children
      }
    },
    getRoleList() {
      listRoleApi({ page: 1, page_size: 1000 }).then(res => {
        if (res.code !== 200) {
          this.msgError(res.code)
          return
        }
        this.roleList = res.data.list
      })
    },
    getDeptList() {
      listDeptApi({ page: 1, page_size: 1000 }).then(res => {
        if (res.code !== 200) {
          this.msgError(res.msg)
          return
        }
        this.deptList = res.data.list
      })
    }
  }
}
</script>
