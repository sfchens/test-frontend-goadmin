<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <table-item ref="tableItem" @handleAdd="handleAdd" @handleEdit="handleEdit" @handleEditRole="handleEditRole" />
        <form-modal v-if="formModalRef.visible" ref="formModal" :modal-ref="formModalRef" @handleSearch="handleSearch" />
        <role-modal v-if="roleModalRef.visible" ref="roleModal" :modal-ref="roleModalRef" @handleSearch="handleSearch" />
      </el-card>
    </template>
  </BasicLayout>
</template>

<script>

import tableItem from './components/table-item.vue'
import formModal from './components/form-modal.vue'
import roleModal from './components/role-modal.vue'

import { createRef } from '@/utils/tool'

export default {
  name: 'UserManage',
  components: { tableItem, formModal, roleModal },
  data() {
    return {
      formModalRef: createRef(),
      roleModalRef: createRef()
    }
  },
  watch: {
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
        ...ref
      }
    },
    handleEditRole(ref) {
      this.roleModalRef = {
        ...ref
      }
    },
    handleSearch() {
      this.$refs.tableItem.handleSearch()
    }
  }
}
</script>
