<template>
  <el-card class="box-card">
    <el-form ref="searchRef" :model="searchData" :inline="true" label-width="48px">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="searchData.name"
          placeholder="请输入参数名称"
          clearable
          size="small"
          style="width: 160px"
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <el-form-item label="键名" prop="key">
        <el-input
          v-model="searchData.key"
          placeholder="请输入参数键名"
          clearable
          size="small"
          style="width: 160px"
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleSearch">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-permisaction="['admin:sysConfig:add']"
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-permisaction="['admin:sysConfig:delete']"
          type="danger"
          icon="el-icon-delete"
          size="mini"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-permisaction="['admin:sysConfig:export']"
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="tableList"
      border
      @selection-change="handleSelect"
      @sort-change="handleSort"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        label="ID"
        sortable="custom"
        width="75"
        prop="id"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="名称"
        sortable="custom"
        prop="name"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        label="键名"
        prop="key"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        label="键值"
        prop="config"
        align="center"
      />
      <el-table-column
        label="是否启用"
        prop="is_open"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.is_open=='2'">否</el-tag>
          <el-tag v-if="scope.row.is_open=='1'" type="success">是</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        prop="remark"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        label="操作人"
        prop="operator"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        label="更新时间"
        sortable="custom"
        prop="updated_at"
        width="160"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.updated_at !== "" ? parseTime(scope.row.updated_at) : "" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        sortable="custom"
        prop="created_at"
        width="160"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.created_at ? parseTime(scope.row.created_at) : "" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        class-name="small-padding fixed-width"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            v-permisaction="['admin:sysConfig:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
          >修改</el-button>
          <el-button
            v-permisaction="['admin:sysConfig:delete']"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
          <el-button
            v-permisaction="['admin:sysConfig:setStatus']"
            size="mini"
            type="text"
            :style="scope.row.is_open === 1 ? 'color: red' : '' "
            @click="handleSetStatus(scope.row)"
          >{{ scope.row.is_open == 1 ? "关闭" : "启用" }}</el-button>
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
import { listConfigApi, delConfigApi, SetStatusConfigApi } from '@/api/admin/sys-config'
const createSearchData = () => {
  return {
    page: 1,
    pageSize: 10,
    name: '',
    key: '',
    type: 1,
    order: ''
  }
}
export default {
  name: 'TableItem',
  data() {
    return {
      searchData: createSearchData(),
      tableList: [],
      total: 0,
      ids: []
    }
  },
  created() {
    this.handleSearch()
  },
  methods: {
    handleSearch() {
      this.getList(this.searchData)
    },
    handleReset() {
      this.searchData = createSearchData()
    },
    handlePageChange(val) {
      this.searchData.page = val
      this.handleSearch()
    },
    handleAdd() {
      this.$emit('handleAdd', { visible: true, title: '新增' })
    },
    handleEdit(row) {
      this.$emit('handleEdit', { visible: true, title: '新增', data: row })
    },
    handleSort(column, prop, order) {
      prop = column.prop
      order = column.order
      if (order === 'descending') {
        this.searchData.order = prop + ' desc'
      } else if (order === 'ascending') {
        this.searchData.order = prop + ' asc'
      } else {
        this.searchData.order = ''
      }
      this.handleSearch()
    },
    handleSetStatus(row) {
      var isOpen = row.is_open === 1 ? 2 : 1
      SetStatusConfigApi({ id: row.id, is_open: isOpen }).then(res => {
        if (res.code !== 200) {
          this.msgError(res.msg)
          return
        }
        this.handleSearch()
      })
    },
    handleSelect(selection) {
      this.ids = selection.map(item => item.id)
    },
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
        return delConfigApi({ 'ids': Ids })
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
    handleExport() {

    },
    getList(searchData) {
      listConfigApi(searchData).then(res => {
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

