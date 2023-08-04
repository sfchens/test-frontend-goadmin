<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <table-item ref="tableItem" @handleAdd="handleAdd" @handleEdit="handleEdit" />
        <form-modal v-if="formModalRef.visible" ref="formModal" :modal-ref="formModalRef" @handleSearch="handleSearch" @handleEdit="handleEdit" />
      </el-card>
    </template>
  </BasicLayout>
</template>

<script>

import tableItem from './components/table-item.vue'
import formModal from './components/form-modal.vue'
import { createRef } from '@/utils/tool'

export default {
  name: 'Role',
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
    },
    handleSearch() {
      this.$refs.tableItem.handleSearch()
    }
  }
}
</script>
