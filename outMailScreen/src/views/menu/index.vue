<template>

  <div class="commonContent">
    <a-form class="commomForm"
            :form="form"
            @submit="handleSearch">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="菜单名称" :label-col="{ span: 5 }"
                       :wrapper-col="{ span: 12 }">
            <a-input v-model="listQuery.name" placeholder="菜单名称"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="状态" :label-col="{ span: 5 }"
                       :wrapper-col="{ span: 16  }">
            <a-select defaultValue="0" v-model="listQuery.status" style="width: 100%" @change="handleChange">
              <a-select-option value="0">停用</a-select-option>
              <a-select-option value="1">启用</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8" :style="{ textAlign: 'right',paddingRight:'20px' }">
          <a-form-item>
            <a-button type="primary" @click="getList" icon="search">
              搜&nbsp;&nbsp;索
            </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset" icon="redo">
              重&nbsp;&nbsp;置
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div class="search-result-list">
      <div class="table-operations">
        <a-button type="dashed" block style='margin:0;' @click="createlist()">+ 新增</a-button>
      </div>
      <a-table :columns="columns" :dataSource="list" bordered :pagination="pagination">
        <span slot="icon" slot-scope="icon">
            <a-icon :type="icon"/>
        </span>
        <span slot="status" slot-scope="status">
             <a-badge :status="status=='1'?'success':'error'"/>
            {{ statusmap[status] }}
        </span>
        <span slot="type" slot-scope="type">
		    {{ typemap[type] }}
		</span>

        <span slot="operation" slot-scope="text, record">
        <a @click="showlist(record)">查看</a>
        <a-divider type="vertical"/>
        <a-dropdown>
          <a class="ant-dropdown-link" href="javascript:;">
          更多 <a-icon type="down"/>
          </a>
          <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;" @click="update(record)">修改</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;" @click="deletList(record)">删除</a>
          </a-menu-item>
          </a-menu>
        </a-dropdown>
          </span>
      </a-table>
    </div>
    <edit ref='edit' @fresh="fresh"/>
  </div>

</template>
<script>
import {getMenusByPage, delMenu} from '@/api/system.js';
import edit from './edit';

export default {
  data() {
    return {
      title: '菜单列表',
      expand: false,
      form: this.$form.createForm(this),
      columns: [
        {title: '菜单ID', dataIndex: 'id', align: 'center'},
        {title: '菜单名称', dataIndex: 'name', align: 'center'},
        {title: '菜单路径', dataIndex: 'path', align: 'center'},
        {title: '菜单类型', dataIndex: 'type', align: 'center', scopedSlots: {customRender: 'type'}},
        {title: '父菜单', dataIndex: 'parentName', align: 'center'},
        {title: '菜单图标', dataIndex: 'icon', align: 'center', width: '90px', scopedSlots: {customRender: 'icon'}},
        {title: '状态', dataIndex: 'status', align: 'center', scopedSlots: {customRender: 'status'}},
        {title: '操作', dataIndex: 'operation', width: '160px', align: 'center', scopedSlots: {customRender: 'operation'}}
      ],
      list: [],
      pagination: {
        total: 0,
        defaultPageSize: 5,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        onChange: (page, pageSize) => {
          this.pagechage(page, pageSize);
        },
        onShowSizeChange: (current, pageSize) => {
          this.pageSizeChange(pageSize);
        }
      },
      listQuery: {
        name: '',
        status: '',
        page: 1,
        pageSize: 5
      },
      statusmap: {
        '0': '停用',
        '1': '启用'
      },
      typemap: {
        '0': '一级菜单',
        '1': '二级菜单'
      },

      showVisible: false,
      record: {}
    }
  },
  components: {
    edit
  },
  computed: {
    count() {
      return this.expand ? 11 : 3
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getMenusByPage(this.listQuery).then(response => {
        this.list = response.data.extend.list;
        this.pagination.total = response.data.extend.total;
      }).catch(error => {
        console.info("失败");
        console.info(error.message);
      });
    },

    handleReset() {
      this.form.resetFields()
    },

    //查看更多
    showlist(row) {
      this.$refs.edit.ShowDialog(Object.assign({}, row));
    },

    //新增
    createlist() {
      this.$refs.edit.CreateDialog();
    },
    //修改
    update(row) {
      this.$refs.edit.UpdateDialog(row);
    },
    //删除
    deletList(row) {
      if (row.isValid == 0) {
        this.$error({
          title: '提示',
          content: '启用状态下不可删除！'
        })
      } else {
        var _this = this
        this.$confirm({
          title: '确认删除？',
          content: '确认删除记录，删除后不可恢复',
          okType: 'danger',
          onOk() {
            delMenu({id: row.id}).then(res => {
              if (res.status == 200) {
                _this.getList()
                _this.$message.success('删除成功！')
              } else {
                _this.$message.error('删除失败！')
              }
            })
          },
        })
      }
    },
    //刷新数据
    fresh() {
      this.getList()
    },
    toggle() {
      this.expand = !this.expand
    },
    pageSizeChange(pageSize) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = pageSize;
      this.getList();
    },
    pagechage(pageNum, pageSize) {

      this.listQuery.pageNum = pageNum;
      this.listQuery.pageSize = pageSize;
      this.getList();
    }
  }
}

</script>
<style>

.commomForm {
  padding: 0px 12px;
  --border: 1px solid #d9d9d9;
  --border-radius: 6px;
}

.commomForm .ant-form-item {
  display: flex;
}

.commomForm .ant-form-item-control-wrapper {
  flex: 1;
}

.commonContent .ant-form {
  max-width: none;
  border-radius: 4px;
}

.commonContent .search-result-list {
  --margin-top: 5px;
  text-align: center;
  padding: 4px 12px;
}

.table-operations {
  text-align: right;
  margin-bottom: 10px;
}

.table-operations > button {
  margin-right: 18px;
}

.modeButton {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e9e9e9;
  padding: 10px 26px;
  background: #fff;
  text-align: right;
}
</style>
