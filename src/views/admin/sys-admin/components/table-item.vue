<template>
  <div>
    <el-row :gutter="20">
      <!--部门数据-->
      <!-- <el-col :span="4" :xs="24">
        <div class="head-container">
          <el-input
            v-model="deptName"
            placeholder="请输入部门名称"
            clearable
            size="small"
            prefix-icon="el-icon-search"
            style="margin-bottom: 20px"
          />
        </div>
        <div class="head-container">
          <el-tree
            ref="tree"
            :data="deptOptions"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            default-expand-all
            @node-click="handleNodeClick"
          />
        </div>
      </el-col> -->
      <!--用户数据-->
      <el-col :span="20" :xs="24">
        <el-form ref="searchRef" :model="searchData" :inline="true" label-width="68px">
          <el-form-item label="用户名称" prop="realname">
            <el-input
              v-model="searchData.realname"
              placeholder="请输入用户名称"
              clearable
              size="small"
              style="width: 160px"
              @keyup.enter.native="handleSearch"
            />
          </el-form-item>
          <el-form-item label="用户账号" prop="username">
            <el-input
              v-model="searchData.username"
              placeholder="请输入用户账号"
              clearable
              size="small"
              style="width: 160px"
              @keyup.enter.native="handleSearch"
            />
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input
              v-model="searchData.phone"
              placeholder="请输入手机号码"
              clearable
              size="small"
              style="width: 160px"
              @keyup.enter.native="handleSearch"
            />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <!-- <el-select
              v-model="searchData.status"
              placeholder="用户状态"
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
            </el-select> -->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleSearch">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:sysAdmin:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:sysAdmin:delete']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="handleDelete"
            >删除</el-button>
          </el-col>
        </el-row>

        <el-table
          v-loading="loading"
          :data="tableList"
          border
          @selection-change="handleSelectChange"
          @sort-change="handleSortChang"
        >
          <el-table-column type="selection" width="45" align="center" />
          <el-table-column label="序号" width="75" prop="id" sortable="custom" />
          <el-table-column label="账号" width="105" prop="username" sortable="custom" :show-overflow-tooltip="true" />
          <el-table-column label="姓名" prop="realname" :show-overflow-tooltip="true" />
          <el-table-column label="部门" prop="dept_info.name" :show-overflow-tooltip="true" />
          <el-table-column label="邮箱" prop="email" width="108" />
          <el-table-column label="手机号" prop="phone" width="108" />
          <el-table-column label="状态" width="80" sortable="custom">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="2"
                @change="handleStatusChange(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="更新时间"
            prop="updated_at"
            sortable="custom"
            width="155"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.updated_at) }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="创建时间"
            prop="created_at"
            sortable="custom"
            width="155"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.created_at) }}</span>
            </template>
          </el-table-column> -->
          <el-table-column
            label="操作"
            width="160"

            fix="right"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button
                v-permisaction="['admin:sysAdmin:edit']"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleEdit(scope.row)"
              >修改</el-button>
              <el-button
                v-if="scope.row.userId !== 1"
                v-permisaction="['admin:sysAdmin:delete']"
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
              >删除</el-button>
              <el-button
                v-permisaction="['admin:sysAdmin:resetPassword']"
                size="mini"
                type="text"
                icon="el-icon-key"
                @click="handleResetPwd(scope.row)"
              >重置</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- <pagination
          v-show="total>0"
          :total="total"
          :page.sync="searchData.page"
          :limit.sync="searchData.page_size"
          @pagination="getList"
        /> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { listAdminApi } from '@/api/admin/sys-admin'

const createSearchData = () => {
  return {
    page: 1,
    page_size: 10
  }
}
export default {
  name: 'TableItem',
  data() {
    return {
      loading: true,
      searchData: createSearchData(),
      tableList: [],
      total: 0
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
    handleReset() {
      this.searchData = createSearchData()
    },
    handleAdd() {
      this.$emit('handleAdd', { title: '新增', visible: true })
    },
    handleEdit(row) {
      row.password = ''
      this.$emit('handleEdit', { title: '编辑', visible: true, data: row })
    },
    handleResetPwd() {},
    handleDelete() {},
    handleSelectChange() {},
    handleSortChang() {},
    handleStatusChange() {},
    getList(searchData) {
      listAdminApi(searchData).then(res => {
        if (res.code !== 200) {
          this.msgError(res.msg)
          return
        }
        this.tableList = res.data.list || []
        this.total = res.data.total
      })
    }
  }
}
</script>
