<template>
  <!-- 添加或修改对话框 -->
  <el-drawer
    :title="modalRef.title"
    :before-close="handleClose"
    :visible.sync="modalRef.visible"
    direction="rtl"
    custom-class="demo-drawer"
  >
    <div class="demo-drawer__content">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
        <el-form-item label="Handle" prop="handle">
          <el-input
            v-model="formData.handle"
            type="textarea"
            :rows="4"
            width="150px"
            placeholder="handle"
          />
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input
            v-model="formData.title"
            placeholder="标题"
          />
        </el-form-item>
        <el-form-item label="接口类型" prop="tags">
          <el-select
            v-model="formData.tags"
            placeholder="请选择接口类型"
            clearable
            size="small"
          >
            <el-option v-for="value, index in tagList" :key="index" :value="value">{{ value }}</el-option>
            <el-option v-if="tagList.length <= 0" value="暂无">暂无</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Method" prop="method">
          <el-select
            v-model="formData.method"
            placeholder="请选择方式"
            clearable
            size="small"
          >
            <el-option value="GET">GET</el-option>
            <el-option value="POST">POST</el-option>
            <el-option value="PUT">PUT</el-option>
            <el-option value="DELETE">DELETE</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="地址" prop="path">
          <el-input
            v-model="formData.path"
            :disabled="formData.id > 0"
            placeholder="地址"
          />
        </el-form-item>

      </el-form>
      <div class="demo-drawer__footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </div>
    </div>

  </el-drawer>

</template>

<script>
import { getTagApiApi, editSysApiApi } from '@/api/admin/sys-api'
import { createRef } from '@/utils/tool'

const createFormData = () => {
  return {}
}
const createFormRules = () => {
  return {}
}
export default {
  name: 'FormModal',
  props: {
    modalRef: {
      type: Object,
      default() {
        return createRef()
      }
    }
  },
  data() {
    return {
      formData: createFormData(),
      formRules: createFormRules(),
      tagList: []
    }
  },
  created() {
    this.getTag()
  },
  methods: {
    handleSubmit() {
      const formData = this.formData
      editSysApiApi(formData).then(res => {
        if (res.code !== 200) {
          this.msgError(res.msg)
          return
        }

        this.handleClose()
        this.msgSuccess(res.msg)
        this.$emit('handleSearch')
      })
    },
    handleClose() {
      this.modalRef = createRef()
      this.formData = createFormData()
      this.resetForm()
    },
    handleGetTag() {
      this.getTag()
    },
    getTag() {
      getTagApiApi({ page: 1, page_size: 100 }).then(res => {
        if (res.code !== 200) {
          this.msgError(res.msg)
          return
        }

        this.tagList = res.data.list || []
      })
    }
  }
}
</script>
