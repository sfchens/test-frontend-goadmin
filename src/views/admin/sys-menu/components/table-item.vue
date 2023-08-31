<template>
  <div>
    <el-form ref="searchRef" :inline="true">
      <el-form-item label="菜单名称">
        <el-input
          v-model="searchData.key"
          placeholder="请输入菜单名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="状态">
        <el-select v-model="searchData.visible" placeholder="菜单状态" clearable size="small">
          <el-option
            v-for="dict in visibleOptions"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleSearch">搜索</el-button>
        <el-button
          v-permisaction="['admin:sysMenu:add']"
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
      border
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="title" label="菜单名称" :show-overflow-tooltip="true" width="180px" />
      <el-table-column prop="icon" label="图标" align="center" width="100px">
        <template slot-scope="scope">
          <svg-icon :icon-class="scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="60px" />
      <!-- <el-table-column prop="permission" label="权限标识" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-popover v-if="scope.row.sysApi.length>0" trigger="hover" placement="top">
            <el-table
              :data="scope.row.sysApi"
              border
              style="width: 100%"
            >
              <el-table-column
                prop="title"
                label="title"
                width="260px"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.type=='SYS' && scope.row.title!=''"><el-tag type="success">{{ '['+scope.row.type +'] '+ scope.row.title }}</el-tag></span>
                  <span v-if="scope.row.type!='SYS' && scope.row.title!=''"><el-tag type="">{{ '['+scope.row.type +'] '+scope.row.title }}</el-tag></span>
                  <span v-if="scope.row.title==''"><el-tag type="danger">暂无</el-tag></span>

                </template>
              </el-table-column>
              <el-table-column
                prop="path"
                label="path"
                width="270px"
              >
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.action=='GET'">{{ scope.row.action }}</el-tag>
                  <el-tag v-if="scope.row.action=='POST'" type="success">{{ scope.row.action }}</el-tag>
                  <el-tag v-if="scope.row.action=='PUT'" type="warning">{{ scope.row.action }}</el-tag>
                  <el-tag v-if="scope.row.action=='DELETE'" type="danger">{{ scope.row.action }}</el-tag>
                  {{ scope.row.path }}
                </template>
              </el-table-column>

            </el-table>
            <div slot="reference" class="name-wrapper">
              <span v-if="scope.row.permission==''">-</span>
              <span v-else>{{ scope.row.permission }}</span>
            </div>
          </el-popover>
          <span v-else>
            <span v-if="scope.row.permission==''">-</span>
            <span v-else>{{ scope.row.permission }}</span>
          </span>
        </template>
      </el-table-column> -->
      <el-table-column prop="path" label="组件路径" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-if="scope.row.menu_type=='A'">{{ scope.row.path }}</span>
          <span v-else>{{ scope.row.component }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="visible" label="可见" :formatter="visibleFormat" width="80">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.visible === '1' ? 'danger' : 'success'"
            disable-transitions
          >{{ visibleFormat(scope.row) }}</el-tag>
        </template>
      </el-table-column>
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
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="180">
        <template slot-scope="scope">
          <el-button
            v-permisaction="['admin:sysMenu:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
          >修改</el-button>
          <el-button
            v-permisaction="['admin:sysMenu:add']"
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
          >新增</el-button>
          <el-button
            v-permisaction="['admin:sysMenu:delete']"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
import { treeListAllMenuApi } from '@/api/admin/sys-menu'
const createSearchData = () => {
  return {
    key: ''
  }
}
export default {
  name: 'TableItem',
  data() {
    return {
      searchData: createSearchData(),
      loading: true,
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
      this.getMenuList(this.searchData)
      this.loading = false
    },
    handleAdd(row) {
      this.$emit('handleAdd', { tital: '新增', visible: true, data: row })
    },
    handleEdit(row) {
      this.$emit('handleEdit', { tital: '修改', visible: true, data: row })
    },
    handleDelete() {},
    getMenuList(searchData) {
      treeListAllMenuApi(searchData).then(res => {
        if (res.code !== 200) {
          this.msgError(res.msg)
          return
        }

        this.tableList = res.data.list
        this.total = res.data.total
      })
    },
    // 菜单显示状态字典翻译
    visibleFormat(row) {
      if (row.menuType === 'F') {
        return '-- --'
      }

      if (row.visible === 1) {
        return '显示'
      }

      return '隐藏'
    }
  }
}
</script>
