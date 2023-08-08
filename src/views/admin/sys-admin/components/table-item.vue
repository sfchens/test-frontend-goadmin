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
      <el-col>
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
          <el-form-item label="邮箱" prop="phone">
            <el-input
              v-model="searchData.email"
              placeholder="请输入邮箱"
              clearable
              size="small"
              style="width: 160px"
              @keyup.enter.native="handleSearch"
            />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select
              v-model="searchData.status"
              placeholder="状态"
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
              v-permisaction="['admin:sysAdmin:deleteBatch']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="handleDeleteBatch"
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
          <el-table-column type="selection" align="center" />
          <el-table-column label="序号" align="center" prop="id" sortable="custom" />
          <el-table-column label="账号" align="center" prop="username" sortable="custom" :show-overflow-tooltip="true" />
          <el-table-column label="姓名" align="center" prop="realname" :show-overflow-tooltip="true" />
          <el-table-column label="部门" align="center" prop="dept_info.name" :show-overflow-tooltip="true" />
          <el-table-column label="邮箱" align="center" prop="email" />
          <el-table-column label="手机号" align="center" prop="phone" />
          <el-table-column label="权限" align="center" prop="role_ids_text" />
          <el-table-column label="状态">
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
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.updated_at) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            prop="created_at"
            sortable="custom"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.created_at) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
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
              >重置密码</el-button>
              <el-button
                v-permisaction="['admin:sysAdmin:editRole']"
                size="mini"
                type="text"
                icon="el-icon-key"
                @click="handleEditRole(scope.row)"
              >编辑权限</el-button>
              <el-button
                v-permisaction="['admin:sysAdmin:setStatus']"
                size="mini"
                type="text"
                style="color: red"
                icon="el-icon-delete"
                @click="handleSetStatus(scope.row)"
              >{{ scope.row.status === 1 ? "冻结" : "解冻" }}</el-button>
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
import { listAdminApi, resetPwdAdminApi, setStatusAdminApi, deleteBatchAdminApi } from '@/api/admin/sys-admin'

const createSearchData = () => {
  return {
    page: 1,
    page_size: 10,
    realname: '',
    username: '',
    phone: '',
    email: '',
    status: ''
  }
}
export default {
  name: 'TableItem',
  data() {
    return {
      loading: true,
      searchData: createSearchData(),
      tableList: [],
      total: 0,
      ids: [],
      statusOptions: [
        {
          label: '正常',
          value: 1
        },
        {
          label: '冻结',
          value: 2
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
    handleResetPwd(row) {
      resetPwdAdminApi({ id: row.id }).then(res => {
        if (res.code !== 200) {
          this.msgError(res.msg)
          return
        }
        this.msgSuccess(res.msg)
      })
    },
    handleStatusChange(row) {
      var status = row.status === 1 ? 2 : 1
      row.status = status
      this.handleSetStatus(row)
    },
    handleSetStatus(row) {
      var status = row.status === 1 ? 2 : 1
      setStatusAdminApi({ id: row.id, status: status }).then(res => {
        if (res.code !== 200) {
          this.msgError(res.msg)
          return
        }
        this.msgSuccess(res.msg)
        this.handleSearch()
      })
    },
    handleDelete(row) {
      this.handleDelBatch([row.id])
    },
    handleSelectChange(selection) {
      this.ids = selection.map(item => item.id)
    },
    handleDeleteBatch(setion) {
      this.handleDelBatch(this.ids)
    },
    handleEditRole(row) {
      this.$emit('handleEditRole', { title: '编辑权限', visible: true, data: row })
    },
    handleDelBatch(ids) {
      if (ids.length <= 0) {
        this.msgError('请选择需要删除数据')
        return
      }
      this.$confirm('是否确认删除序号 ID 为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return deleteBatchAdminApi({ 'ids': ids })
      }).then((res) => {
        if (res.code === 200) {
          this.msgSuccess(res.msg)
          this.handleSearch()
        } else {
          this.msgError(res.msg)
        }
        this.ids = []
      }).catch(function() {})
    },
    handleSortChang() {},
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
