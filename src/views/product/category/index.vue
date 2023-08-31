<template>
  <BasicLayout>
    <template #wrapper>
      <table-item ref="tableItem" @handleAdd="handleAdd" @handleEdit="handleEdit" />
      <form-modal ref="formModal" :modal-ref="formModalRef" @handleSearch="handleSearch" />
    </template>
  </BasicLayout>
</template>

<script>
import tableItem from './components/table-item.vue'
import formModal from './components/form-modal.vue'
import { createRef } from '@/utils/tool'

export default {
  name: 'SysDeptManage',
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

      this.$refs.formModal.getTreeList('add')
      if (ref.data !== undefined) {
        this.$refs.formModal.formData.pid = ref.data
      }
    },
    handleEdit(ref) {
      this.formModalRef = {
        ...this.formModalRef,
        ...ref
      }
      this.$refs.formModal.formData = ref.data
      this.$refs.formModal.getTreeList('edit')
    },
    handleSearch() {
      this.$refs.tableItem.handleSearch()
    }
  }
}
</script>
