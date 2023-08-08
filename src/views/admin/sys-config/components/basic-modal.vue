<template>
  <div>
    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="modalRef.title" :visible.sync="modalRef.visible" width="500px" :close-on-click-modal="false">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
        <el-form-item v-if="formData.id" label="ID" prop="id">
          <el-input v-model="formData.id" :disabled="true" />
        </el-form-item>
        <el-form-item label="参数名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入参数名称" />
        </el-form-item>
        <el-form-item label="参数键名" prop="key">
          <el-input v-model="formData.key" :disabled="formData.id>0" placeholder="请输入参数键名" />
        </el-form-item>
        <el-form-item label="APP logo" prop="config['sys_app_logo']">
          <el-input v-model="formData.config['sys_app_logo']" placeholder="请输入app logo" />
        </el-form-item>
        <el-form-item label="APP 名称" prop="config['sys_app_name']">
          <el-input v-model="formData.config['sys_app_name']" placeholder="请输入app 名称" />
        </el-form-item>
        <el-form-item label="前台显示" prop="is_open">
          <el-select v-model="formData.is_open" placeholder="是否前台显示" clearable size="small">
            <el-option label="是" :value="1" />
            <el-option label="否" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
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
import { createRef } from '@/utils/tool'

const createFormData = () => {
  return {
    id: '',
    name: '',
    key: '',
    config: {
      sys_app_logo: '',
      sys_app_name: ''
    },
    type: 1,
    is_open: '',
    remark: ''
  }
}

const createFormRule = () => {
  return {
    name: [
      { required: true, message: '请输入名称', trigger: 'blur' }
    ],
    key: [
      { required: true, message: '请输入键名', trigger: 'blur' }
    ],
    sys_app_logo: [
      { required: true, message: '请输入app logo', trigger: 'blur' }
    ],
    sys_app_name: [
      { required: true, message: '请输入app 名称', trigger: 'blur' }
    ],
    is_open: [
      { required: true, message: '请选择前台是否展示', trigger: 'blur' }
    ]
  }
}
export default {
  name: 'BasicModal',
  props: {
    modalRef: {
      type: Object,
      default: createRef()
    }
  },
  data() {
    return {
      formData: createFormData(),
      formRules: createFormRule()
    }
  },
  created() {
    this.initFormData()
  },
  methods: {
    initFormData() {
      if (this.modalRef.data.id > 0) {
        this.formData = {
          ...this.formData,
          ...this.modalRef.data
        }
      }
    },
    handleSubmit() {
      var formData = this.formData
      this.$emit('handleSubmit', formData)
    },
    handleClose() {
      this.$emit('handleClose')
    }
  }
}
</script>

<style>

</style>
