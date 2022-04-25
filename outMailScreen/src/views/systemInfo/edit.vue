<template>

	<a-drawer placement="right" :closable="true" @close="onClose" :visible="showVisible" width="800px">
		<span slot="title">
			<a-icon :type="iconType" />&nbsp; {{dialogTypeMap[dialogType]}}
		</span>

		<a-form class="ant-advanced-search-form" style="border:none;" :form="form">
			<a-row :gutter="24">
				<a-col :span="24">
					<a-form-item label="系统编号" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
						<a-input placeholder="请输入系统编号" :disabled="disabled1" v-decorator="['systemNo',rule.systemNo]" />
					</a-form-item>
				</a-col>

				<a-col :span="24">
					<a-form-item label="系统名称" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
						<a-input placeholder="请输入系统编号名称" :disabled="disabled"
							v-decorator="['systemName',rule.systemName]" />
					</a-form-item>
				</a-col>

				<a-col :span="24">
					<a-form-item label="系统类型" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
						<template>
							<a-select name='systemType' :disabled="disabled"
								v-decorator="['systemType',rule.systemType]" @change="systemTypeChange">
								<a-select-option value="1">农商行一级系统</a-select-option>
								<a-select-option value="2">农商行二级系统</a-select-option>
								<a-select-option value="3">第三方系统</a-select-option>
								<a-select-option value="4">地市中台</a-select-option>
								<a-select-option value="5">其他</a-select-option>
							</a-select>
						</template>
					</a-form-item>
				</a-col>


				<a-col :span="24" v-if="cityNovisible">
					<a-form-item label="归属农商行" v-show="false" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
						<a-input v-decorator="['cityNo']" type="hidden" />
					</a-form-item>

					<a-form-item label="归属农商行" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
						<a-input-search :disabled="disabled" enterButton="选择" placeholder="请选择归属农商行"
							v-decorator="['cityName',rule.cityName]" @search="showCityInfo">
						</a-input-search>
					</a-form-item>
				</a-col>

				<a-col :span="24">
					<a-form-item label="渠道系统" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
						<template>
							<a-radio-group name='channel' :disabled="disabled" v-decorator="['channel',rule.channel]">
								<a-radio value="0">否</a-radio>
								<a-radio value="1">是</a-radio>
							</a-radio-group>
						</template>
					</a-form-item>
				</a-col>

				<a-col :span="24">
					<a-form-item label="启用状态" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
						<template>
							<a-radio-group name='status' :disabled="disabled" v-decorator="['status',rule.status]">
								<a-radio value="0">禁用</a-radio>
								<a-radio value="1">启用</a-radio>
							</a-radio-group>
						</template>
					</a-form-item>
				</a-col>

			</a-row>
		</a-form>
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
			<a-button :style="{marginRight: '8px'}" @click="onClose" v-if="showCanel"> 取消 </a-button>
			<a-button @click="onSubmit" type="primary">{{SubmitTypeMap[dialogType]}}</a-button>
		</div>
		<cityInfo ref="cityInfo" @selectCityInfo="selectCityInfo"></cityInfo>
	</a-drawer>
</template>

<script>
	import {
		addSystemInfo,
		updateSystemInfo
	} from '@/api/systemInfo.js';
	import cityInfo from '@/views/staffInfo/cityInfo';
	export default {
		data() {
			return {
				disabled: '',
				disabled1: '',
				showVisible: false,
				form: this.$form.createForm(this),
				cityNovisible: false,
				hackRest: false,
				dialogType: '',
				cityValue: {},
				dialogTypeMap: {
					show: '农商行详情',
					create: '农商行新增',
					update: '农商行修改'
				},
				SubmitTypeMap: {
					show: '关闭',
					create: '确认新增',
					update: '确认修改',
				},
				showCanel: true,
				rule: {
					systemNo: {
						rules: [{
							required: true,
							message: '请输入系统编号'
						}],
						initialValue: ''
					},
					systemName: {
						rules: [{
							required: true,
							message: '请输入系统名称'
						}],
						initialValue: ''
					},
					systemType: {
						rules: [{
							required: true,
							message: '请选择系统类型'
						}],
						initialValue: ''
					},
					cityName: {
						rules: [{
							required: true,
							message: '请选择所属农商行'
						}],
						initialValue: ''
					},
					channel: {
						rules: [{
							required: true,
							message: '请选择是否渠道系统'
						}],
						initialValue: ''
					},
					status: {
						rules: [{
							required: true,
							message: '请选择状态'
						}],
						initialValue: '1'
					},
				}
			}
		},
		components: {
			cityInfo
		},
		methods: {
			showCityInfo() {

				this.$refs.cityInfo.ShowDialog();
			},

			selectCityInfo(query) {
				this.form.setFieldsValue(query)

			},
			//查看
			ShowDialog(query) {
				this.disabled = true
				this.disabled1 = true
				this.showCanel = false
				this.showVisible = true
				this.iconType = "copy";
				this.dialogType = 'show'
				this.timeTask = query
				if (query.systemType == '1' || query.systemType == '2') {
					this.cityNovisible = true;
				} else {
					this.cityNovisible = false;
				}

				this.$nextTick(() => {
					this.hackRest = true;
					this.form.setFieldsValue(query)
				});
			},

			//新增
			CreateDialog() {
				this.iconType = "form";
				this.showCanel = true
				this.disabled = false
				this.disabled1 = false
				this.showVisible = true
				this.dialogType = 'create'
				this.form.resetFields(); //清除缓存数据
				this.cityNovisible = false;
			},
			//修改
			UpdateDialog(query) {
				this.iconType = "form";
				this.showCanel = true
				this.disabled = false
				this.disabled1 = true
				this.showVisible = true
				this.dialogType = 'update'
				this.timeTask = query
				if (query.systemType == '1' || query.systemType == '2') {
					this.cityNovisible = true;
				} else {
					this.cityNovisible = false;
				}
				this.$nextTick(() => {
					this.hackRest = true;
					this.form.setFieldsValue(query)
				});

			},
			//关闭
			onClose() {
				this.showVisible = false;
				this.form.resetFields();
			},



			//提交按钮
			onSubmit() {
				if (this.dialogType == 'show') {
					this.showVisible = false
				}
				if (this.dialogType == 'create') {
					this.create();
				}
				if (this.dialogType == 'update') {
					this.update();
				}
			},
			//新增
			create() {
				this.form.validateFields((err, values) => {
					if (!err) {
						addSystemInfo(values).then(res => {
							//console.log(res)
							if (res.data.code == '0000') {
								this.$message.success(res.data.message)
								this.$emit('fresh')

							} else {
								this.$message.error(res.data.message)
							}
						})
						this.showVisible = false
					}
				});
			},
			//修改
			update() {
				this.form.validateFields((err, values) => {
					if (!err) {
						updateSystemInfo(values).then(res => {
							//console.log(res)
							if (res.data.code == '0000') {
								this.$message.success(res.data.message)
								this.$emit('fresh')
							} else {
								this.$message.error(res.data.message)
							}
						})
						this.showVisible = false
					}
				});
			},

			systemTypeChange(val) {
				if (val == '1' || val == '2') {
					this.cityNovisible = true;
					this.$nextTick(() => {
						this.form.setFieldsValue(this.cityValue)
					});



				} else {
					this.cityNovisible = false;
					this.cityValue = {
						cityNo: this.form.getFieldValue("cityNo"),
						cityName: this.form.getFieldValue("cityName")
					};
				}
			},


		}
	}
</script>
