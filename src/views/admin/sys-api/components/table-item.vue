<template>
  <el-card class="box-card">
    <el-form ref="searchRef" :model="searchData" :inline="true" label-width="80px" style="text-align:left">
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="searchData.title"
          placeholder="请输入标题"
          clearable
          size="small"
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <el-form-item label="地址" prop="path">
        <el-input
          v-model="searchData.path"
          placeholder="请输入地址"
          clearable
          size="small"
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <el-form-item label="Method" prop="method">
        <el-select
          v-model="searchData.method"
          placeholder="请选择Method"
          clearable
          size="small"
          @keyup.enter.native="handleSearch"
        >
          <el-option value="GET">GET</el-option>
          <el-option value="POST">POST</el-option>
          <el-option value="PUT">PUT</el-option>
          <el-option value="DELETE">DELETE</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="接口类型" prop="tag">
        <el-select
          v-model="searchData.tag"
          placeholder="请选择接口类型"
          clearable
          size="small"
          @keyup.enter.native="handleSearch"
        >
          <el-option v-for="value, index in tagList" :key="index" :value="value">{{ value }}</el-option>
          <el-option v-if="tableList.length <= 0" value="暂无">暂无</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button v-permisaction="['admin:sysApi:list']" type="primary" icon="el-icon-search" size="mini" @click="handleSearch">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-permisaction="['admin:sysApi:add']"
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-permisaction="['admin:sysApi:deleteMulti']"
          type="danger"
          icon="el-icon-delete"
          size="mini"
          @click="handleDeleteMulti"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-permisaction="['admin:sysApi:refresh']"
          type="danger"
          icon="el-icon-refresh"
          size="mini"
          @click="handleRefresh"
        >重置接口</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-permisaction="['admin:sysApi:export']"
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
      @sort-change="handleSortChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        label="标题"
        header-align="center"
        align="left"
        prop="title"
        fixed="left"
        sortable="custom"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.title==''"><el-tag type="danger">暂无</el-tag></span>
          <span v-else><el-tag type="info">{{ '['+scope.row.tags +'] ' }}</el-tag><el-tag>{{ scope.row.title }}</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column
        label="接口"
        header-align="center"
        align="left"
        prop="path"
        sortable="custom"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.path==''"><el-tag type="danger">暂无</el-tag></span>
          <span v-else> <el-tag type="info">{{ '['+scope.row.method +'] ' }}</el-tag><el-tag>{{ scope.row.path }}</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column
        label="handle"
        header-align="center"
        align="left"
        prop="handle"
        sortable="custom"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="操作人"
        header-align="center"
        align="left"
        prop="operator"
      />
      <el-table-column
        label="更新时间"
        align="center"
        prop="updated_at"
        width="155px"
        sortable="custom"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updated_at) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="created_at"
        width="155px"
        sortable="custom"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.created_at) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="120"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            v-permisaction="['admin:sysApi:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
          >修改
          </el-button>
          <el-button
            v-permisaction="['admin:sysApi:deleteMulti']"
            size="mini"
            type="text"
            icon="el-icon-delete"
            style="color:red"
            @click="handleDeleteMulti(scope.row)"
          >删除
          </el-button>
        </template></el-table-column>
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

import { listSysApiApi, getTagApiApi, deleteMultiApi, refreshApi } from '@/api/admin/sys-api'

const createSearchData = () => {
  return {
    page: 1,
    page_size: 10,
    title: '',
    tag: '',
    path: '',
    method: ''
  }
}

export default {
  name: 'TableItem',
  data() {
    return {
      searchData: createSearchData(),
      loading: true,
      tableList: [],
      tagList: [],
      total: 0,
      ids: []
    }
  },
  created() {
    this.handleSearch()
    this.handleGetTag()
  },
  methods: {
    handleSearch() {
      this.loading = true
      this.getList(this.searchData)
      this.loading = false
    },
    handleReset() {
      this.resetForm('searchRef')
    },
    handleSelectChange(selection) {
      this.ids = selection.map(item => item.id)
    },
    handleSortChange() {},
    handleAdd() {
      this.$emit('handleAdd', { title: '新增', visible: true })
    },
    handleEdit(row) {
      this.$emit('handleEdit', { title: '编辑', visible: true, data: row })
    },
    handleGetTag() {
      this.getTag()
    },
    handleExport() {},
    handleRefresh() {
      refreshApi().then(res => {
        if (res.code !== 200) {
          this.msgError(res.msg)
          return
        }
        this.msgSuccess(res.msg)
        this.handleSearch()
      })
    },
    handleDeleteMulti(row) {
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
        return deleteMultiApi({ 'ids': Ids })
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
      listSysApiApi(searchData).then(res => {
        if (res.code !== 200) {
          this.mesError(res.msg)
          return
        }

        this.tableList = res.data.list || []
        this.total = res.data.total || 0
      })
    },
    getTag() {
      getTagApiApi({ page: 1, page_size: 100 }).then(res => {
        if (res.code !== 200) {
          this.msgError(res.msg)
          return
        }
        this.tagList = res.data.list || []
      })
    }
  }
}
</script>
