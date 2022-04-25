<template>
  <div class="commonContent">
    <a-form-model class="commomForm" :form="form" @submit="handleSearch">
      <a-row :gutter="24">
        <!--        <a-col :span="8">
                  <a-form-model-item label="员工姓名" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-input v-model="listQuery.payload.empName" placeholder="员工姓名"/>
                  </a-form-model-item>
                </a-col>-->
<!--        <a-col :span="8">
          <a-form-model-item label="发送日期" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-date-picker v-model="listQuery.payload.sendDate" placeholder="发送日期" style="width: 100%"/>
          </a-form-model-item>
        </a-col>-->
        <a-col :span="8">
          <a-form-model-item label="主题种类" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-select defaultValue="1" v-model="listQuery.payload.setType" style="width: 100%"
                      @change="handleChange">
              <a-select-option value="0">标题</a-select-option>
              <a-select-option value="1">正文</a-select-option>
              <a-select-option value="2">落款</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="邮件类型" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-select defaultValue="1" v-model="listQuery.payload.mailType" style="width: 100%"
                      @change="handleChange">
              <a-select-option value="0">生日祝福</a-select-option>
              <a-select-option value="1">感谢信</a-select-option>
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

          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    <div class="search-result-list">
      <!--			<div class="table-operations">
              <a-button type="dashed" block style='margin:0;' @click="createlist()">+ 新增</a-button>
            </div>-->
      <a-table :columns="columns" :dataSource="list" bordered :pagination="pagination">

				<span slot="status" slot-scope="status">
        <a-badge :status="status=='1'?'success':'error'"/>
					{{ statusmap[status] }}
				</span>

        <span slot="mailType" slot-scope="mailType">
					{{ mailTypeMap[mailType] }}
				</span>
        <span slot="setType" slot-scope="setType">
					{{ setStyleMap[setType] }}
				</span>

        <span slot="fontColor" slot-scope="fontColor">
            <a-tag :color=fontColor>
        {{ fontColor }}
      </a-tag>

				</span>


        <span slot="fontStyle" slot-scope="fontStyle">
					{{ fontStyleMap[fontStyle] }}
				</span>

        <span slot="operation" slot-scope="text, record">
					<a @click="showlist(record)">查看</a>
          	<a-divider type="vertical"/>
          <a href="javascript:;" @click="update(record)">修改</a>
				</span>

      </a-table>
    </div>
    <edit ref='edit' @fresh="fresh"/>
  </div>

</template>
<script>
import {
  getTextStyleByPage
} from '@/api/textStyleInfo.js';
import edit from './edit';

export default {
  data() {
    return {
      title: '邮件内容配置',
      expand: false,
      form: this.$form.createForm(this),
      columns: [
        {
          title: '主题种类',
          dataIndex: 'setType',
          align: 'center',
          scopedSlots: {
            customRender: 'setType'
          }
        },
        {
          title: '文字大小',
          dataIndex: 'fontSize',
          align: 'center'
        },

        {
          title: '字体种类',
          dataIndex: 'fontFamily',
          align: 'center'
        },
        {
          title: '左边距(px)',
          dataIndex: 'xCoord',
          align: 'center'
        },
        {
          title: '上边距(px)',
          dataIndex: 'yCoord',
          align: 'center'
        },
        {
          title: '行间距(px)',
          dataIndex: 'lineSpace',
          align: 'center'
        },
        {
          title: '字体颜色',
          dataIndex: 'fontColor',
          align: 'center',
          scopedSlots: {
            customRender: 'fontColor'
          }
        },
        {
          title: '字体样式',
          dataIndex: 'fontStyle',
          align: 'center',
          scopedSlots: {
            customRender: 'fontStyle'
          }
        },
        {
          title: '行宽(px)',
          dataIndex: 'lineWidth',
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
        '0': '发送失败',
        '1': '发送成功'
      },
      mailTypeMap: {
        '0': '生日祝福',
        '1': '感谢信'
      },
      setStyleMap: {
        '0': '标题',
        '1': '正文',
        '2': '落款'
      },
      fontStyleMap: {
        '0': '正常',
        '1': '粗体',
        '2': '斜体',

      },
      showVisible: false,
      record: {}
    }
  },
    components: {
      edit
    }
  ,
    computed: {
      count()
      {
        return this.expand ? 11 : 3
      }
    }
  ,
    created()
    {
      this.getList()
    }
  ,
    methods: {
      getList()
      {
        getTextStyleByPage(this.listQuery).then(response => {
          this.list = response.data.extend.list;
          this.pagination.total = response.data.extend.total;
        }).catch(error => {
          console.info("失败");
          console.info(error.message);
        });
      }
    ,

      handleReset()
      {
        this.listQuery.payload = {
          cityId: '',
          cityName: '',
          status: '',
        }
        //this.form.resetFields()
      }
    ,

      //查看更多
      showlist(row)
      {
        this.$refs.edit.ShowDialog(Object.assign({}, row));
      }
    ,

      updateImg(row)
      {
        this.$refs.edit.UpdateImgDialog(Object.assign({}, row));
      }
    ,

      //新增
      createlist()
      {
        this.$refs.edit.CreateDialog();
      }
    ,
      //修改
      update(row)
      {
        this.$refs.edit.UpdateDialog(row);
      }
    ,

      //刷新数据
      fresh()
      {
        this.getList()
      }
    ,
      toggle()
      {
        this.expand = !this.expand
      }
    ,
      pageSizeChange(pageSize)
      {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = pageSize;
        this.getList();
      }
    ,
      pagechage(pageNum, pageSize)
      {
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
