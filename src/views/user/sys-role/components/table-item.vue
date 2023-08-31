<template>
  <div>
    <el-form ref="searchRef" :model="searchData" :inline="true">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="searchData.name"
          placeholder="请输入角色名称"
          clearable
          size="small"
          style="width: 160px"
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <el-form-item label="权限字符" prop="key">
        <el-input
          v-model="searchData.key"
          placeholder="请输入权限字符"
          clearable
          size="small"
          style="width: 160px"
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <!-- <el-form-item label="状态" prop="status">
        <el-select
          v-model="searchData.status"
          placeholder="角色状态"
          clearable
          size="small"
          style="width: 160px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="创建时间">
            <el-date-picker
              v-model="dateRange"
              size="small"
              style="width: 240px"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleSearch">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-permisaction="['admin:sysRole:add']"
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-permisaction="['admin:sysRole:edit']"
          type="success"
          icon="el-icon-edit"
          size="mini"
          @click="handleEdit"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-permisaction="['admin:sysRole:delete']"
          type="danger"
          icon="el-icon-delete"
          size="mini"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-permisaction="['admin:sysRole:export']"
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table
      v-loading="loading"
      :data="tableList"
      border
      @selection-change="handleSelectChange"
      @sort-change="handleSortChang"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" sortable="custom" prop="id" width="80" />
      <el-table-column label="名称" sortable="custom" prop="name" :show-overflow-tooltip="true" />
      <el-table-column label="权限字符" prop="key" :show-overflow-tooltip="true" width="150" />
      <el-table-column label="排序" sortable="custom" prop="sort" width="80" />
      <!-- <el-table-column label="状态" sortable="custom" width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="2"
            inactive-value="1"
            @change="handleStatusChange(scope.row)"
          />
        </template>
      </el-table-column> -->
      <el-table-column label="更新时间" sortable="custom" prop="updated_at" width="160">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updated_at) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" sortable="custom" prop="created_at" width="160">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.created_at) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="left"
        class-name="small-padding fixed-width"
        width="220"
      >
        <template slot-scope="scope">
          <el-button
            v-permisaction="['admin:sysRole:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
          >修改</el-button>
          <!-- <el-button
            v-permisaction="['admin:sysRole:update']"
            size="mini"
            type="text"
            icon="el-icon-circle-check"
            @click="handleDataScope(scope.row)"
          >数据权限</el-button> -->
          <el-button
            v-permisaction="['admin:sysRole:delete']"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
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

  </div>
</template>
<script>

import { listRoleApi, delBatchRoleApi } from '@/api/admin/sys-role'

const createSearchData = () => {
  return {}
}

export default {
  name: 'TableItem',
  data() {
    return {
      searchData: createSearchData(),
      tableList: [],
      total: 0,
      loading: true,
      ids: []
    }
  },
  created() {
    this.handleSearch()
  },
  methods: {
    handleSearch() {
      this.loading = true
      this.getList(this.searchData)
      this.loading = false
    },
    handleReset() {},
    handleAdd() {
      this.$emit('handleAdd', { title: '新增', visible: true })
    },
    handleEdit(row) {
      this.$emit('handleEdit', { title: '编辑', visible: true, data: row })
    },
    handleSelectChange(selection) {
      this.ids = selection.map(item => item.id)
    },
    handleSortChang() {},
    handleDelete(row) {
      const Ids = (row.id && [row.id]) || this.ids
      if (Ids.length <= 0) {
        this.msgError('请选择需要删除数据')
        return
      }
      this.$confirm('是否确认删除参数 ID 为"' + Ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delBatchRoleApi({ 'ids': Ids })
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
    handleExport() {},
    getList(searchData) {
      listRoleApi(searchData).then(res => {
        if (res.code !== 200) {
          this.msgError(res.msg)
          return
        }
        this.tableList = res.data.list || []
        this.total = res.data.total || 0
      })
    }
  }
}
</script>
