<template>
  <div class="commonContent">
    <a-card title="当日发送记录"   style="text-align:center" :hoverable="true" >
    <div class="search-result-list">
      <!--			<div class="table-operations">
              <a-button type="dashed" block style='margin:0;' @click="createlist()">+ 新增</a-button>
            </div>-->
      <a-table :columns="columns" :dataSource="list" bordered :pagination="pagination">
				<span slot="status" slot-scope="status">
      <a-badge :status="status=='1'?'success':'error'" />
					{{ statusmap[status] }}
				</span>

        <span slot="mailType" slot-scope="mailType">
					{{ mailTypeMap[mailType] }}
				</span>

        <span slot="channel" slot-scope="channel">
					{{ channelMap[channel] }}
				</span>

        <span slot="operation" slot-scope="text, record">
					<a @click="showlist(record)">查看</a>
				</span>
      </a-table>
    </div>
    </a-card>
    <edit ref='edit' @fresh="fresh"/>
  </div>

</template>
<script>
import {
  getMailSendLogInfoByPage
} from '@/api/mailLogInfo.js';
import edit from './edit';
import moment from "moment";

export default {
  data() {
    return {
      title: '邮箱日志',
      expand: false,
      form: this.$form.createForm(this),
      columns: [{
        title: '流水号',
        dataIndex: 'id',
        align: 'center'
      },
        {
          title: '员工编号',
          dataIndex: 'empId',
          align: 'center'
        },
        {
          title: '员工姓名',
          dataIndex: 'empName',
          align: 'center'
        },

        {
          title: '发送时间',
          dataIndex: 'sendDate',
          align: 'center'
        },
        {
          title: '员工邮箱',
          dataIndex: 'empEmail',
          align: 'center'
        },

        {
          title: '发送状态',
          dataIndex: 'status',
          align: 'center',
          scopedSlots: {
            customRender: 'status'
          }
        },

        {
          title: '邮件类型',
          dataIndex: 'mailType',
          align: 'center',
          scopedSlots: {
            customRender: 'mailType'
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
          sendDate:moment(new Date()).format("YYYY-MM-DD")
        },
        page: 1,
        pageSize: 5
      },
      statusmap: {
        '0': '发送失败',
        '1': '发送成功'
      },
      mailTypeMap:{
        '0': '生日祝福',
        '1': '感谢信'
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
      getMailSendLogInfoByPage(this.listQuery).then(response => {
        this.list = response.data.extend.list;
        this.pagination.total = response.data.extend.total;
      }).catch(error => {
        console.info("失败");
        console.info(error.message);
      });
    },

    handleReset() {
      this.listQuery.payload = {
        cityId: '',
        cityName: '',
        status: '',
      }
      //this.form.resetFields()
    },

    //查看更多
    showlist(row) {
      this.$refs.edit.ShowDialog(Object.assign({}, row));
    },

    updateImg(row){
      this.$refs.edit.UpdateImgDialog(Object.assign({}, row));
    },

    //新增
    createlist() {
      this.$refs.edit.CreateDialog();
    },
    //修改
    update(row) {
      this.$refs.edit.UpdateDialog(row);
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
  z-index: 999;
}
</style>
