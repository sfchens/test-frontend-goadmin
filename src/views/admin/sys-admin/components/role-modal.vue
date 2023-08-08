<template>
  <div>
    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="modalRef.title" :visible.sync="modalRef.visible" width="600px" :close-on-click-modal="false">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="序号" prop="id">
              <el-input v-model="formData.id" placeholder="请输入ID" :disabled="formData.id" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号" prop="username">
              <el-input v-model="formData.username" placeholder="请输入账号" :disabled="formData.username != ''" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="角色" prop="role_ids">
              <el-select v-model="formData.role_ids" multiple placeholder="请选择" style="width: 480px;" @change="$forceUpdate()">
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
import { setRoleAdminApi } from '@/api/admin/sys-admin'

import { createRef } from '@/utils/tool'

const createFormData = () => {
  return {
    id: '',
    username: '',
    role_ids: undefined,
    remark: ''
  }
}

const createFormRules = () => {
  return {
    role_ids: [
      { required: true, message: '请选择角色', trigger: 'blur' }
    ]
  }
}

export default {
  name: 'RoleModal',
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
      roleList: []
    }
  },
  created() {
    this.initFormData()
    this.getRoleList()
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
        setRoleAdminApi(formData).then(res => {
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
    getRoleList() {
      listRoleApi({ page: 1, page_size: 1000 }).then(res => {
        if (res.code !== 200) {
          this.msgError(res.code)
          return
        }
        this.roleList = res.data.list
      })
    }
  }
}
</script>
