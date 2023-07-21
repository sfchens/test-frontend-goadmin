<template>
  <BasicLayout>
    <template #wrapper>
      <table-item ref="TableItem" @handleAdd="handleAdd" @handleEdit="handleEdit" />
      <form-modal ref="FormModal" :modal-ref="modalFormRef" @handleSearch="handleSearch" />
    </template>
  </BasicLayout>
</template>

<script>
import tableItem from './components/table-item.vue'
import formModal from './components/form-modal.vue'
import { createRef } from '@/utils/tool'

export default {
  name: 'SysConfigManage',
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
      this.$refs.FormModal.formData = ref.data
    },
    handleSearch() {
      this.$refs.TableItem.handleSearch()
    }
  }
}
</script>
