<template>
  <el-card class="box-card">
    <el-form ref="searchForm" :model="searchData" :inline="true" label-width="48px">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="searchData.name"
          placeholder="请输入参数名称"
          clearable
          size="small"
          style="width: 160px"
          @keyup.enter.native="handleQuery"
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
      <el-form-item label="内置" prop="configType">
        <el-select v-model="queryParams.configType" placeholder="系统内置" clearable size="small">
          <el-option
            v-for="dict in typeOptions"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleSearch">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- <el-row :gutter="10" class="mb8">
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
          v-permisaction="['admin:sysConfig:edit']"
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-permisaction="['admin:sysConfig:remove']"
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
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
    </el-row> -->

    <!-- <el-table
      v-loading="loading"
      :data="configList"
      border
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChang"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        label="编码"
        sortable="custom"
        width="75"
        prop="id"
      />
      <el-table-column
        label="名称"
        sortable="custom"
        prop="configName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="键名"
        sortable="custom"
        prop="configKey"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>键值: {{ scope.row.configValue }}</p>
            <p>UI参数:  <el-tag v-if="scope.row.isFrontend=='2'">否</el-tag>
              <el-tag v-if="scope.row.isFrontend=='1'" type="success">是</el-tag>
            </p>
            <div slot="reference" class="name-wrapper">
              {{ scope.row.configKey }}
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="内置"
        sortable="custom"
        prop="configType"
        :formatter="typeFormat"
        width="80"
      />
      <el-table-column
        label="备注"
        prop="remark"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="创建时间"
        sortable="custom"
        prop="createdAt"
        width="160"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createdAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        class-name="small-padding fixed-width"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            v-permisaction="['admin:sysConfig:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-permisaction="['admin:sysConfig:remove']"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table> -->

    <!-- <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageIndex"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    /> -->
  </el-card>
</template>

<script>
const createSearchData = () => {
  return {
    page: 1,
    pageSize: 10,
    configName: '',
    configKey: '',
    configType: '',
    createdAtOrder: 'desc'
  }
}
export default {
  name: 'TableItem',
  data() {
    return {
      searchData: createSearchData()
    }
  },
  methods: {
    handleSearch() {

    },
    handleReset() {

    },
    handlePageChange(val) {
      this.searchData.page = val
      this.handleSearch()
    }
  }
}
</script>

