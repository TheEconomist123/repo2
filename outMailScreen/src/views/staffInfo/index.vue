<template>
  <div class="commonContent">
    <a-form-model class="commomForm" :form="form" @submit="handleSearch">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-model-item label="员工编号" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-input v-model="listQuery.payload.id" placeholder="员工编号"/>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="员工名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-input v-model="listQuery.payload.name" placeholder="员工名称"/>
          </a-form-model-item>
        </a-col>
        <a-col :span="8" :style="{ display: this.expand ? 'block' : 'none'} ">
          <a-form-model-item label="在职状态" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-select defaultValue="1" v-model="listQuery.payload.status" style="width: 100%"
                      @change="handleChange">
              <a-select-option value="0">离职</a-select-option>
              <a-select-option value="1">在职</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="this.expand ? 24 : 8" :style="{ textAlign: 'right',paddingRight:'20px' }">
          <a-form-model-item>
            <a-button type="primary" @click="getList" icon="search">
              搜&nbsp;&nbsp;索
            </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset" icon="redo">
              重&nbsp;&nbsp;置
            </a-button>
            <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
              <a-label label="dsdfd">{{ expand ? '收起' : '展开' }}</a-label>
              <a-icon :type="expand ? 'up' : 'down'"/>
            </a>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    <div class="search-result-list">
      <div class="table-operations1">
        <a-button type="primary" style='' @click="createlist()">+ 新&nbsp;&nbsp;&nbsp;&nbsp;增</a-button>
        <a-button type="primary" style='' @click="importStaff()"> 批量导入</a-button>
        <a-button type="primary" style='' @click="downloadModel()"> 模板下载</a-button>

        <input ref="inputFile" type="file" accept=".xls,.xlsx" hidden @change="fileChange"/>
      </div>
      <a-table :columns="columns" :dataSource="list" bordered :pagination="pagination">
				<span slot="status" slot-scope="status">
					<a-badge :status="status=='1'?'success':'error'"/>
					{{ statusmap[status] }}
				</span>

        <span slot="systemType" slot-scope="systemType">
					{{ systemTypeMap[systemType] }}
				</span>

        <span slot="channel" slot-scope="channel">
					{{ channelMap[channel] }}
				</span>

        <span slot="operation" slot-scope="text, record">
					<a @click="showlist(record)">查看</a>
					<a-divider type="vertical"/>
					<a-dropdown>
						<a class="ant-dropdown-link" href="javascript:;">
							更多
							<a-icon type="down"/>
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
import {
  getExcelModel,
  saveExcelData,
  getStaffInfoByPage,
  delStaffInfo
} from '@/api/staffInfo.js';

import edit from './edit';

export default {
  data() {
    return {
      title: '员工新增',
      expand: false,
      form: this.$form.createForm(this),
      columns: [{
        title: '员工编号',
        dataIndex: 'id',
        align: 'center'
      },
        {
          title: '姓名',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: '出生日期',
          dataIndex: 'birth',
          align: 'center'
        },
        {
          title: '入职日期',
          dataIndex: 'entry',
          align: 'center'
        },

        {
          title: '邮箱账号',
          dataIndex: 'eMail',
          align: 'center'
        },
        {
          title: '备注',
          dataIndex: 'desx',
          align: 'center'
        },
        {
          title: '状态',
          dataIndex: 'status',
          align: 'center',
          scopedSlots: {
            customRender: 'status'
          }
        },
        {
          title: '操作',
          dataIndex: 'operation',
          width: '160px',
          align: 'center',
          scopedSlots: {
            customRender: 'operation'
          }
        }
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
        payload: {
          id: '',
          name: '',
          status: '',
        },
        page: 1,
        pageSize: 5
      },
      statusmap: {
        '0': '离职',
        '1': '在职'
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

    importStaff() {

      this.$refs.inputFile.dispatchEvent(new MouseEvent('click'))

    },

    //下载模板
    downloadModel(){

      //下载excel
      getExcelModel().then(res=>{
        const filename = "员工信息表.xlsx";
        const blob = new Blob([res.data]);
        var downloadElement = document.createElement("a");
        var href = window.URL.createObjectURL(blob);
        downloadElement.href = href;
        downloadElement.download = decodeURIComponent(filename);
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        window.URL.revokeObjectURL(href);
      })


    },

    fileChange(event) {

      const formData = new FormData()
      formData.append("file", event.target.files[0]); //将file属性添加到formData里
      saveExcelData(formData).then(res => {
        event.target.value = '';
        if (res.data.code == '0000') {
          this.$message.success(res.data.message)
          this.getList();
        } else {
          this.$message.error(res.data.message)
        }
      })
    },


    getList() {
      getStaffInfoByPage(this.listQuery).then(response => {
        this.list = response.data.extend.list;
        this.pagination.total = response.data.extend.total;
      }).catch(error => {
        console.info("失败");
        console.info(error.message);
      });
    },

    handleReset() {
      this.listQuery.payload = {
        id: '',
        name: '',
        status: '',
      }
      //this.form.resetFields()
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

      var _this = this
      this.$confirm({
        title: '确认删除？',
        content: '确认删除记录，删除后不可恢复',
        okType: 'danger',
        onOk() {
          delStaffInfo({
            id: row.id
          }).then(res => {
            if (res.status == 200) {
              _this.getList()
              _this.$message.success('删除成功！')
            } else {
              _this.$message.error('删除失败！')
            }
          })
        },
      })
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

.table-operations1 {
  text-align: left;
  margin-left: 20px;
  margin-bottom: 10px;
}

.table-operations1 > button {
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
  z-index: 999;
}
</style>
