<template>
  <div>
    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="modalRef.title" :visible.sync="modalRef.visible" width="500px" :close-on-click-modal="false">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
        <el-form-item v-if="formData.id>0" label="ID" prop="id">
          <el-input v-model="formData.id" :disabled="formData.id >0" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="权限字符" prop="key">
          <el-input v-model="formData.key" :disabled="formData.id >0" placeholder="请输入权限字符" />
        </el-form-item>
        <el-form-item label="角色顺序" prop="sort">
          <el-input-number v-model="formData.sort" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="2">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单权限">
          <el-tree
            ref="menuTree"
            :data="menuList"
            show-checkbox
            node-key="id"
            :empty-text="menuOptionsAlert"
            style="height:171px;overflow-y:auto;overflow-x:hidden;"
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formData.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addRoleApi } from '@/api/admin/sys-role'
import { treeListAllMenuApi } from '@/api/admin/sys-menu'
import { createRef } from '@/utils/tool'

const createFormData = () => {
  return {
    id: '',
    name: '',
    key: '',
    sort: '',
    status: '',
    remark: ''
  }
}
const createFormRules = () => {
  return {
    name: [
      { required: true, message: '请输入名称', trigger: 'blur' }
    ],
    key: [
      { required: true, message: '请输入权限标识', trigger: 'blur' }
    ],
    status: [
      { required: true, message: '请选择状态', trigger: 'blur' }
    ],
    sort: [
      { required: true, message: '请输入排序', trigger: 'blur' }
    ]
  }
}
export default {
  name: 'FormModal',
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
      menuOptionsAlert: '加载中，请稍后',
      menuList: []
    }
  },
  mounted() {
  },
  created() {
    this.initFormData()
    this.getMenuTreeselect()
  },
  methods: {
    initFormData() {
      this.formData = {
        ...this.formData,
        ...this.modalRef.data
      }
      if (this.formData.id > 0) {
        this.getRoleMenuTreeselect(this.formData, this.formData.menu_ids)
      }
    },
    handleSubmit() {
      this.$refs.formRef.validate(valid => {
        if (!valid) {
          console.log(valid)
          return
        }
        var formData = this.formData
        formData.menu_ids = this.getMenuAllCheckedKeys()
        addRoleApi(formData).then(res => {
          if (res.code !== 200) {
            this.msgError(res.msg)
            return
          }
          this.msgSuccess(res.msg)
          this.handleClose()
          this.$emit('handleSearch')
        })
      })
    },
    getMenuTreeselect() {
      treeListAllMenuApi({ page: 1, page_size: 200 }).then(response => {
        this.menuOptions = response.data.list
        this.menuList = response.data.list
      })
    },
    handleClose() {
      this.modalRef.visible = false
      this.modalRef.title = ''
      this.modalRef.data = {}
      this.formData = createFormData()
      this.resetForm('formRef')
    },
    getMenuAllCheckedKeys() {
      // 目前被选中的菜单节点
      const checkedKeys = this.$refs.menuTree.getHalfCheckedKeys()
      console.log('目前被选中的菜单节点', checkedKeys)
      // 半选中的菜单节点
      const halfCheckedKeys = this.$refs.menuTree.getCheckedKeys()
      console.log('半选中的菜单节点', halfCheckedKeys)
      // checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys)
      return halfCheckedKeys
    },
    getRoleMenuTreeselect(row, checkedKeys) {
      if (row.key === 'superAdmin') {
        this.menuOptionsAlert = '系统超级管理员无需此操作'
        this.menuList = []
      } else {
        this.$nextTick(() => {
          this.$refs.menuTree.setCheckedKeys(checkedKeys)
        })
      }
    }
  }
}
</script>
