<template>
  <div>
    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="modalRef.title" :visible.sync="modalRef.visible" width="500px" :close-on-click-modal="false">
      这是user-modal
      <!-- <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
        <el-form-item v-if="formData.id" label="ID" prop="id">
          <el-input v-model="formData.id" :disabled="true" />
        </el-form-item>
        <el-form-item label="参数名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入参数名称" />
        </el-form-item>
        <el-form-item label="参数键名" prop="key">
          <el-input v-model="formData.key" :disabled="formData.id>0" placeholder="请输入参数键名" />
        </el-form-item>
        <el-form-item label="参数键值" prop="config">
          <el-input v-model="formData.config" placeholder="请输入参数键值" />
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
        <el-button @click="handleCancel">取 消</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import { addConfigApi, editConfigApi } from '@/api/admin/sys-config'
import { createRef } from '@/utils/tool'

const createFormData = () => {
  return {
    id: '',
    name: '',
    key: '',
    config: '',
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
    value: [
      { required: true, message: '请输入键值', trigger: 'blur' }
    ],
    is_open: [
      { required: true, message: '请选择前台是否展示', trigger: 'blur' }
    ]
  }
}
export default {
  name: 'LiveModal',
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
  },
  methods: {
    handleSubmit() {
      this.$refs.formRef.validate(valid => {
        if (!valid) {
          console.log('valid', valid)
          return
        }
        var formData = this.formData
        if (formData.id <= 0) {
          addConfigApi(formData).then((res) => {
            if (res.code !== 200) {
              this.msgError(res.msg)
              return
            }

            this.formData = createFormData()
            this.msgSuccess(res.msg)
          })
        } else {
          editConfigApi(formData).then((res) => {
            if (res.code !== 200) {
              this.msgError(res.msg)
              return
            }

            this.formData = createFormData()
            this.msgSuccess(res.msg)
          })
        }

        this.modalRef = createRef()
        this.$emit('handleSearch')
      })
    },
    handleCancel() {
      this.modalRef = createRef()
    }
  }
}
</script>

<style>

</style>
