<template>
  <div>
    <el-card class="box-card">
      <el-form ref="searchRef" :model="searchData" :inline="true" label-width="68px">
        <el-form-item label="字典名称" prop="name">
          <el-input
            v-model="searchData.name"
            placeholder="请输入字典名称"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleSearch"
          />
        </el-form-item>
        <el-form-item label="字典类型" prop="type">
          <el-input
            v-model="searchData.type"
            placeholder="请输入字典类型"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleSearch"
          />
        </el-form-item>
        <!-- <el-form-item label="状态" prop="status">
        <el-select
          v-model="searchData.status"
          placeholder="字典状态"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item> -->

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleSearch">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="handleCancel">重置</el-button>
        </el-form-item>
      </el-form>

      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            v-permisaction="['admin:sysDict:add']"
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
          >新增</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            v-permisaction="['admin:sysDict:delete']"
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="handleDelete"
          >删除</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            v-permisaction="['admin:sysDict:export']"
            type="warning"
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
          >导出</el-button>
        </el-col>
      </el-row>

      <el-table v-loading="loading" :data="tableList" border @selection-change="handleSelect">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="序号" width="80" align="center" prop="id" />
        <el-table-column label="字典名称" align="center" prop="name" :show-overflow-tooltip="true" />
        <el-table-column label="字典键" align="center" prop="key" :show-overflow-tooltip="true" />
        <el-table-column label="状态" align="center" prop="status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status==1" type="success">开启</el-tag>
            <el-tag v-if="scope.row.status==2" type="warning">关闭</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" />
        <el-table-column label="更新时间" align="center" prop="updated_at" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.updated_at) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="created_at" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.created_at) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              v-permisaction="['admin:sysDict:edit']"
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
            >修改</el-button>
            <el-button
              v-permisaction="['admin:sysDict:delete']"
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
            >删除</el-button>
            <el-button
              v-permisaction="['admin:sysDict:setStatus']"
              size="mini"
              type="text"
              :style="scope.row.status === 1 ? 'color: red' : '' "
              @click="handleSetStatus(scope.row)"
            >{{ scope.row.status == 1 ? "关闭" : "开启" }}</el-button>
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
  </div>

</template>

<script>

import { listDictApi, delDictApi, SetStatusDictApi } from '@/api/admin/sys-dict'

const createSearchData = () => {
  return {
    page: 1,
    page_size: 10,
    name: '',
    type: '',
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
    handleCancel() {
      this.searchData = createSearchData()
    },
    handleAdd() {
      this.$emit('handleAdd', { title: '新增', visible: true })
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
        return delDictApi({ 'ids': Ids })
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
    handleEdit(row) {
      this.$emit('handleEdit', { title: '编辑', visible: true, data: row })
    },
    handleSelect(selection) {
      this.ids = selection.map(item => item.id)
    },
    handleSetStatus(row) {
      var status = row.status === 1 ? 2 : 1
      SetStatusDictApi({ id: row.id, status: status }).then(res => {
        if (res.code !== 200) {
          this.msgError(res.msg)
          return
        }
        this.handleSearch()
      })
    },
    handleExport() {},
    getList(searchData) {
      listDictApi(searchData).then(res => {
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

