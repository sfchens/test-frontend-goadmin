<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">

        <table-item ref="tableItem" @handleAdd="handleAdd" @handleEdit="handleEdit" />
        <form-modal ref="formModal" :modal-ref="formalModalRef" />

      </el-card>
    </template>
  </BasicLayout>
</template>

<script>

import { createRef } from '@/utils/tool'
import tableItem from './components/table-item.vue'
import formModal from './components/form-modal.vue'

export default {
  name: 'SysMenuManage',
  components: { tableItem, formModal },
  data() {
    return {
      formalModalRef: createRef()
    }
  },
  created() {
  },
  methods: {
    handleAdd(ref) {
      this.formalModalRef = {
        ...this.formalModalRef,
        ...ref
      }

      if (ref.data !== undefined) {
        this.$refs.formModal.formData.parent_id = ref.data.id
      }
    },
    handleEdit(ref) {
      this.formalModalRef = {
        ...this.formalModalRef,
        ...ref
      }
      this.$refs.formModal.formData = ref.data
      console.log(999, ref, this.$refs.formModal.formData)
    }
  }
}
</script>

