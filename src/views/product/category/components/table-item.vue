<template>
  <el-card class="box-card">
    <el-form ref="searchRef" :inline="true">
      <el-form-item label="名称">
        <el-input
          v-model="searchData.name"
          placeholder="请输入名称"
          clearable
          size="small"
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchData.status" placeholder="状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleSearch"
        >搜索</el-button>
        <el-button
          v-permisaction="['admin:sysDept:add']"
          class="filter-item"
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      :data="tableList"
      row-key="id"
      default-expand-all
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="序号" width="80" align="center" prop="id" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="sort" label="排序" width="200" />
      <el-table-column prop="is_show" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.is_show === 2 ? 'danger' : 'success'"
            disable-transitions
          >{{ scope.row.is_show === 1 ? '开启' : '关闭' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operator" label="操作人" width="200" />
      <el-table-column label="更新时间" align="center" prop="updated_at" width="200">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updated_at) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="created_at" width="200">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.created_at) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-permisaction="['admin:sysDept:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
          >修改</el-button>
          <el-button
            v-permisaction="['admin:sysDept:add']"
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
          >新增</el-button>
          <el-button
            v-if="scope.row.p_id != 0"
            v-permisaction="['admin:sysDept:deleteMulti']"
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDeleteMulti(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="searchData.page"
      :limit.sync="searchData.page_size"
      @pagination="handleSearch"
    />
  </el-card>
</template>
<script>

import { listCategoryApi, delMultiCategoryApi } from '@/api/product/category'
import _ from 'lodash'

const createSearchData = () => {
  return {
    page: 1,
    page_size: 10,
    name: '',
    status: '',
    order: '',
    parent_id: 0
  }
}

export default {
  name: 'TableItem',
  props: {},
  data() {
    return {
      searchData: createSearchData(),
      loading: true,
      tableList: [],
      total: 0,
      ids: [],
      statusOptions: [
        {
          value: '1',
          label: '开启'
        }, {
          value: '2',
          label: '关闭'
        }
      ]
    }
  },
  created() {
    this.handleSearch()
  },
  methods: {
    handleSearch() {
      this.loading = true
      var searchData = this.searchData
      if (searchData.name.length > 0 || searchData.status !== '') {
        searchData.parent_id = -1
      }
      console.log(searchData.name.length, searchData)
      this.getList(this.searchData)
      this.loading = false
    },
    handleAdd(row) {
      const formModalRef = { title: '新增', visible: true }
      if (row !== undefined) {
        formModalRef.data = row.id
      }
      this.$emit('handleAdd', formModalRef)
    },
    handleEdit(row) {
      this.$emit('handleEdit', { title: '编辑', visible: true, data: _.cloneDeep(row) })
    },
    handleSelect(selection) {
      this.ids = selection.map(item => item.id)
    },
    handleDeleteMulti(row) {
      const Ids = (row.id && [row.id]) || this.ids
      if (Ids.length <= 0) {
        this.msgError('请选择需要删除数据')
        return
      }
      this.$confirm('是否确认删除序号 ID 为"' + Ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delMultiCategoryApi({ 'ids': Ids })
      }).then((res) => {
        if (res.code === 200) {
          this.msgSuccess(res.msg)
          this.open = false
          this.handleSearch()
        } else {
          this.msgError(res.msg)
        }
      }).catch(function() {})
    },
    getList(searchData) {
      listCategoryApi(searchData).then(res => {
        if (res.code !== 200) {
          this.msgError(res.msg)
          return
        }
        this.tableList = res.data.list
        this.total = res.data.total
      })
    }
  }
}
</script>
