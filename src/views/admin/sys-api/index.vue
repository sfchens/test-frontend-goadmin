
<template>
  <BasicLayout>
    <template #wrapper>
      <table-item ref="tableItem" @handleEdit="handleEdit" @handleAdd="handleAdd" />
      <form-modal ref="formModal" :modal-ref="formModalRef" @handleSearch="handleSearch" />
    </template>
  </BasicLayout>
</template>

<script>
import { createRef } from '@/utils/tool'

import tableItem from './components/table-item.vue'
import formModal from './components/form-modal.vue'

export default {
  name: 'SysApiManage',
  components: { tableItem, formModal },
  data() {
    return {
      formModalRef: createRef()
    }
  },
  created() {
  },
  methods: {
    handleAdd(ref) {
      this.formModalRef = {
        ...this.formModalRef,
        ...ref
      }
    },
    handleEdit(ref) {
      this.formModalRef = {
        ...this.formModalRef,
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
