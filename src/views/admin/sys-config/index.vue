<template>
  <BasicLayout>
    <template #wrapper>
      <table-item ref="TableItem" @handleAdd="handleAdd" @handleEdit="handleEdit" />
      <basic-modal v-if="currentKey === 'BASE_CONFIG'" ref="BaseModal" :modal-ref="modalFormRef" @handleSubmit="handleSubmit" @handleClose="handleClose" />
      <form-modal v-if="currentKey === 'FORM'" ref="FormModal" :modal-ref="modalFormRef" @handleSubmit="handleSubmit" @handleClose="handleClose" />
      <live-modal v-if="currentKey === 'LIVE_CONFIG'" ref="LiveModal" :modal-ref="modalFormRef" @handleSubmit="handleSubmit" @handleClose="handleClose" />
    </template>
  </BasicLayout>
</template>

<script>
import tableItem from './components/table-item.vue'
import basicModal from './components/basic-modal.vue'
import formModal from './components/form-modal.vue'
import liveModal from './components/live-modal.vue'

import { createRef } from '@/utils/tool'
import { editConfigApi } from '@/api/admin/sys-config'

export default {
  name: 'SysConfigManage',
  components: { tableItem, basicModal, formModal, liveModal },
  data() {
    return {
      modalFormRef: createRef(),
      modalFormBaseRef: createRef(),
      modalFormLiveRef: createRef(),
      modalFormUserRef: createRef(),
      currentKey: ''
    }
  },
  created() {

  },
  methods: {
    handleAdd(ref) {
      this.modalFormRef = {
        ...this.modalFormRef,
        ...ref
      }
      this.currentKey = 'FORM'
    },
    handleEdit(ref) {
      this.modalFormRef = {
        ...this.modalFormRef,
        ...ref
      }
      this.currentKey = ref.data.key
    },
    handleSearch() {
      this.$refs.TableItem.handleSearch()
    },
    handleClose() {
      this.modalFormRef = createRef()
      this.currentKey = ''
    },
    handleSubmit(formData) {
      var key = ''
      switch (formData.key) {
        case 'BASE_CONFIG' :
          key = 'BaseModal'
          break
        case 'LIVE_CONFIG':
          key = 'LiveModal'
          break
        default:
          this.msgError('配置类型异常')
          return
      }
      this.$refs[key].$refs.formRef.validate(valid => {
        editConfigApi(formData).then((res) => {
          if (res.code !== 200) {
            this.msgError(res.msg)
            return
          }
          this.msgSuccess(res.msg)
        })
        this.handleClose()
        this.$refs.TableItem.handleSearch()
      })
    }
  }
}
</script>
