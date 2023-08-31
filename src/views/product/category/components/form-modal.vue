<template>
  <!-- 添加或修改部门对话框 -->
  <el-dialog :title="modalRef.title" :visible.sync="modalRef.visible" width="600px" :close-on-click-modal="false">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="上级部门" prop="pid">
            <treeselect
              v-model="formData.pid"
              :options="treeList"
              :normalizer="handleNormalizer"
              :show-count="true"
              placeholder="选择上级部门"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="显示排序" prop="sort">
            <el-input-number v-model="formData.sort" controls-position="right" placeholder="请输入排序" :min="0" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="状态">
            <el-radio-group v-model="formData.is_show">
              <el-radio :label="1">开启</el-radio>
              <el-radio :label="2">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
      <el-button @click="handleCancel">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import Treeselect from '@riophae/vue-treeselect'
import { createRef } from '@/utils/tool'
import { addCategoryApi, listCategoryApi } from '@/api/product/category'

const createFormData = () => {
  return {
    id: '',
    pid: undefined,
    name: '',
    sort: undefined,
    leader: '',
    phone: '',
    email: '',
    is_show: ''
  }
}

const createFormRules = () => {
  return {
    pid: [
      { required: true, message: '请选择上级分类', trigger: 'blur' }
    ],
    name: [
      { required: true, message: '请填写名称', trigger: 'blur' }
    ],
    sort: [
      { required: true, message: '请填写排序', trigger: 'blur' }
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
      treeList: []
    }
  },
  created() {
    // this.getTreeList()
  },
  mounted() {
  },
  methods: {
    handleSubmit() {
      this.$refs.formRef.validate(valid => {
        if (!valid) {
          console.log(valid)
          return
        }

        var formData = this.formData
        addCategoryApi(formData).then(res => {
          if (res.code !== 200) {
            this.msgError(res.msg)
            return
          }

          this.handleClose('formRef')
          this.msgSuccess(res.msg)
          this.$emit('handleSearch')
        })
      })
    },
    handleCancel() {
      this.handleClose('formRef')
    },
    handleClose(formRef) {
      this.formData = createFormData()
      this.modalRef = createRef()
      this.resetForm(formRef)
    },
    getTreeList(type) {
      listCategoryApi().then(res => {
        if (res.code !== 200) {
          this.msgError(res.msg)
          return
        }
        this.treeList = []
        if (type === 'edit') {
          const dept = { id: 0, name: '主类目', children: [], isDisabled: true }
          dept.children = res.data.list
          this.treeList.push(dept)
        } else {
          const dept = { id: 0, name: '主类目', children: [] }
          dept.children = res.data.list
          this.treeList.push(dept)
        }
      })
    },
    /** 转换部门数据结构 */
    handleNormalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children
      }
    }
  }
}
</script>
