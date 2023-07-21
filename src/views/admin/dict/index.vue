<template>
  <BasicLayout>
    <template #wrapper>
      <table-item ref="tableItem" @handleAdd="handleAdd" @handleEdit="handleEdit" />
      <form-modal ref="formModal" :modal-ref="modalFormRef" @handleSearch="handleSearch" />
    </template>
  </BasicLayout>
</template>

<script>
import { createRef } from '@/utils/tool'
import tableItem from './components/table-item.vue'
import formModal from './components/form-modal.vue'

export default {
  name: 'SysDictTypeManage',
  components: { tableItem, formModal },
  data() {
    return {
      modalFormRef: createRef()

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
    },
    handleEdit(ref) {
      this.modalFormRef = {
        ...this.modalFormRef,
        ...ref
      }
      this.$refs.formModal.formData = ref.data
    },
    handleSearch() {
      this.$refs.tableItem.handleSearch()
    }
  }
}
</script>
