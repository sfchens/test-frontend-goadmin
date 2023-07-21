
<template>
  <!-- 添加或修改参数配置对话框 -->
  <el-dialog :title="modalRef.title" :visible.sync="modalRef.visible" width="500px" :close-on-click-modal="false">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
      <el-form-item v-if="formData.id" label="ID" prop="id">
        <el-input v-model="formData.id" :disabled="true" />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="字典键" prop="key">
        <el-input v-model="formData.key" :disabled="formData.id > 0" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="2">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark" type="textarea" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
      <el-button @click="handleCancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createRef } from '@/utils/tool'
import { addDictApi } from '@/api/admin/sys-dict'

const createFormData = () => {
  return {
    id: '',
    name: '',
    key: '',
    status: '',
    remark: ''
  }
}

const createFormRules = () => {
  return {
    name: [
      { required: true, message: '请填写名称', trigger: 'blur' }
    ],
    key: [
      { required: true, message: '请填写键', trigger: 'blur' }
    ],
    status: [
      { required: true, message: '请选择状态', trigger: 'blur' }
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
      formRules: createFormRules()
    }
  },
  created() {
  },
  methods: {
    handleSubmit() {
      this.$refs.formRef.validate(valid => {
        if (!valid) {
          console.log(valid)
          return
        }

        var formData = this.formData
        addDictApi(formData).then(res => {
          if (res.code !== 200) {
            this.msgError(res.msg)
            return
          }
          this.formData = createFormData()
          this.modalRef = createRef()
          this.msgSuccess(res.msg)

          this.$emit('handleSearch')
        })
      })
    },
    handleCancel() {
      this.formData = createFormData()
      this.modalRef = createRef()
    }
  }
}
</script>
