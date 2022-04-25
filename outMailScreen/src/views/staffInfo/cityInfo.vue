<template>
	<a-drawer placement="right" :closable="true" @close="onChildrenDrawerClose" :visible="childrenDrawer" width="850px">
		<span slot="title">
			<a-icon type="select"  />&nbsp;农商行选择 
		</span>
	<div class="commonContent">
		<a-form-model class="commomForm" :form="form" @submit="handleSearch">
			<a-row :gutter="24">
				<a-col :span="12">
					<a-form-model-item label="员工编号" :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }">
						<a-input v-model="listQuery.payload.id" placeholder="员工编号" />
					</a-form-model-item>
				</a-col>
				<a-col :span="12" :style="{ display: this.expand ? 'block' : 'none'} ">
					<a-form-model-item label="员工名称" :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }">
						<a-input v-model="listQuery.payload.name" placeholder="员工名称" />
					</a-form-model-item>
				</a-col>
				<a-col :span="12" :style="{ display: this.expand ? 'block' : 'none'} ">
					<a-form-model-item label="状态" :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }">
						<a-select defaultValue="1" v-model="listQuery.payload.status" style="width: 100%"
							@change="handleChange">
							<a-select-option value="0">停用</a-select-option>
							<a-select-option value="1">启用</a-select-option>
						</a-select>
					</a-form-model-item>
				</a-col>
				<a-col :span="12" :style="{ textAlign: 'right',paddingRight:'20px' }">
					<a-form-model-item>
						<a-button type="primary" @click="getList" icon="search">
							搜&nbsp;&nbsp;索
						</a-button>
						<a-button :style="{ marginLeft: '8px' }" @click="handleReset" icon="redo">
							重&nbsp;&nbsp;置
						</a-button>
						<a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
							<a-label label="dsdfd">{{expand ? '收起' : '展开'}}</a-label>
							<a-icon :type="expand ? 'up' : 'down'" />
						</a>
					</a-form-model-item>
				</a-col>
			</a-row>
		</a-form-model>
		<div class="search-result-list">
			<a-table :columns="columns" :rowSelection="rowSelection" :dataSource="list" bordered :pagination="pagination">
				<span slot="status" slot-scope="status">
					<a-badge :status="status=='1'?'success':'error'" />
					{{statusmap[status]}}
				</span>

				<span slot="systemType" slot-scope="systemType">
					{{systemTypeMap[systemType]}}
				</span>

				<span slot="channel" slot-scope="channel">
					{{channelMap[channel]}}
				</span>
			</a-table>
		</div>
	</div>
	
	<div :style="{
	             position: 'absolute',
	             left: 0,
	             bottom: 0,
	             width: '100%',
	             borderTop: '1px solid #e9e9e9',
	             padding: '10px 16px',
	             background: '#fff',
	             textAlign: 'right',
	           }">
	  <a-button :style="{marginRight: '8px'}" @click="onChildrenDrawerClose"> 取消 </a-button>
	  <a-button @click="onSubmit" type="primary">确认</a-button>
	</div>
</a-drawer>
</template>
<script>
	import {
		getCityInfosByPage
	} from '@/api/staffInfo.js';
	export default {
		data() {
			return {
				title: '农商行新增',
				expand: false,
				form: this.$form.createForm(this),
				columns: [{
						title: '农商行编号',
						dataIndex: 'cityNo',
						align: 'center'
					},
					{
						title: '农商行名称',
						dataIndex: 'cityName',
						align: 'center'
					},
					{
						title: '状态',
						dataIndex: 'status',
						align: 'center',
						scopedSlots: {
							customRender: 'status'
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
					'0': '停用',
					'1': '启用'
				},
				childrenDrawer: false,
				record: {}
			}
		},
		computed: {
			count() {
				return this.expand ? 3 : 2
			},
			rowSelection() {
						const { selectedRowKeys } = this;
						return {
						  onChange: (selectedRowKeys, selectedRows) => {
							// console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
							this.enterData=selectedRows
							//console.log(this.enterData)
						  },
			
						};
			},
		},
		created() {
			this.getList()
		},
		methods: {
			ShowDialog(){
				this.childrenDrawer = true
			},
			
			getList() {
				getCityInfosByPage(this.listQuery).then(response => {
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
			selected(row) {
				alert("dd");
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
			},
			
			onChildrenDrawerClose() {
				this.childrenDrawer = false;
				this.$message.info('已取消操作')
			},
			
			//提交
			onSubmit() {
				if(this.enterData.length==1){
					var query={cityNo:this.enterData[0].cityNo,cityName:this.enterData[0].cityName}
					this.$emit('selectCityInfo',query)
					this.childrenDrawer = false;
				}else{
					this.$message.error('请选择一条数据！')
				}
			
			},
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

	.table-operations>button {
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
