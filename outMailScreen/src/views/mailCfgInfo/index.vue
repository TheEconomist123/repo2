<template>
  <div class="commonContent">
    <a-form-model class="commomForm" :form="form" @submit="handleSearch">
      <a-row :gutter="24">
        <!--        <a-col :span="8">
                  <a-form-model-item label="邮箱编号" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-input v-model="listQuery.payload.id" placeholder="邮箱编号"/>
                  </a-form-model-item>
                </a-col>-->
        <!--        <a-col :span="8">
                  <a-form-model-item label="邮箱主题" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-input v-model="listQuery.payload.title" placeholder="邮箱主题"/>
                  </a-form-model-item>
                </a-col>-->
        <a-col :span="8">
          <a-form-model-item label="邮件类型" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-select defaultValue="1" v-model="listQuery.payload.mailType" style="width: 100%"
                      @change="handleChange">
              <a-select-option value="0">生日祝福</a-select-option>
              <a-select-option value="1">感谢信</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8" :style="{ textAlign: 'right',paddingRight:'20px' }">
          <a-form-model-item>
            <a-button type="primary" @click="getList" icon="search">
              搜&nbsp;&nbsp;索
            </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset" icon="redo">
              重&nbsp;&nbsp;置
            </a-button>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    <div class="search-result-list">
      <!--			<div class="table-operations">
              <a-button type="dashed" block style='margin:0;' @click="createlist()">+ 新增</a-button>
            </div>-->
      <a-table :columns="columns" :dataSource="list" bordered :pagination="pagination">
				<span slot="mailType" slot-scope="mailType">

					{{ statusmap[mailType] }}
				</span>

        <span slot="systemType" slot-scope="systemType">
					{{ systemTypeMap[systemType] }}
				</span>

        <span slot="channel" slot-scope="channel">
					{{ channelMap[channel] }}
				</span>

        <span slot="operation" slot-scope="text, record">



					<a-divider type="vertical"/>

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
                          <a href="javascript:;" @click="updateImg(record)">修改背景</a>
                        </a-menu-item>

                        <a-menu-item>
                          <a href="javascript:;" @click="checkSendMail(record)">邮箱测试</a>
                        </a-menu-item>
                          <a-menu-item>
                          <a href="javascript:;" @click="previewSendMail(record)">预览邮件</a>
                        </a-menu-item>

                      </a-menu>
                    </a-dropdown>
				</span>
      </a-table>
    </div>
    <edit ref='edit' @fresh="fresh"/>

<!--    <a-modal
        class="picPreview"
        title="邮件预览"
        :visible="imgListShow"
        :bodyStyle="moduleCenter"
    >
      <div id="test_3">
        <img :src="furl" ref="singleImg" class="originStyle" />
      </div>
    </a-modal>-->


    <div class="clearfix">

      <a-modal  width="800px" :visible="imgListShow" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="furl" />
      </a-modal>
    </div>

  </div>
</template>
<script>
import {
  checkSendMail,
  getPreviewImgById,
  getMailCfgInfoByPage
} from '@/api/mailCfgInfo.js';
import edit from './edit';

export default {
  data() {
    return {
      title: '邮箱配置',
      expand: false,
      imgListShow:false,
      furl:'',
      form: this.$form.createForm(this),
      columns: [{
        title: '邮箱编号',
        dataIndex: 'id',
        align: 'center'
      },
        {
          title: '邮箱主题',
          dataIndex: 'title',
          align: 'center'
        },
        {
          title: '发件邮箱',
          dataIndex: 'pubMail',
          align: 'center'
        },

        /*   {
             title: '邮箱密码',
             dataIndex: 'pubMailPass',
             align: 'center'
           },*/
        /*   {
             title: '模板内容',
             dataIndex: 'modelContent',
             align: 'center'
           },*/

        {
          title: '发送时间',
          dataIndex: 'sendTime',
          align: 'center'
        },
        {
          title: '描述信息',
          dataIndex: 'descx',
          align: 'center'
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
          id: '',
          name: '',
          status: '',
        },
        page: 1,
        pageSize: 5
      },
      statusmap: {
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
      getMailCfgInfoByPage(this.listQuery).then(response => {
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

    //校验邮箱
    checkSendMail(row){
      checkSendMail(row).then(res => {
        //console.log(res)
        if (res.data.code == '0000') {
          this.$message.success(res.data.message)
          this.$emit('fresh')
        } else {
          this.$message.error(res.data.message)
        }
      })

    },

    handleCancel(){
      this.imgListShow=false;
    },


    previewSendMail(row){

      //下载文件
      getPreviewImgById({id:row.id}).then(res=>{
        let file = {
          uid: '1',    // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
          name: '背景图片',   // 文件名
          status: 'done', // 状态有：uploading done error removed
        }
        const blob = new Blob([res.data]);
        var href = window.URL.createObjectURL(blob);
        this.furl=href;
        this.imgListShow=true;
       /* file.url = href;
        //this.fileList =[];
        //this.fileList.push(file);
        var downloadElement = document.createElement("a");
        downloadElement.href = href;
        const filename = "员工信息表1111.png";
        downloadElement.download = decodeURIComponent(filename);
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        window.URL.revokeObjectURL(href);*/
      })


    },



    updateImg(row) {
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
