(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-20191814"],{"41d2":function(e,t,a){},f0cd:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"components-form-demo-advanced-search"},[a("a-form",{staticClass:"ant-advanced-search-form",staticStyle:{border:"none"},attrs:{form:e.form},on:{submit:function(e){}}},[a("a-row",{attrs:{gutter:24}},[a("a-col",{attrs:{span:6}},[a("a-form-item",{attrs:{label:"作业名称","label-col":{span:8},"wrapper-col":{span:12}}},[a("a-input",{attrs:{placeholder:"请输入作业名称"},model:{value:e.listQuery.processName,callback:function(t){e.$set(e.listQuery,"processName",t)},expression:"listQuery.processName"}})],1)],1),a("a-col",{attrs:{span:6}},[a("a-form-item",{attrs:{label:"状态","label-col":{span:8},"wrapper-col":{span:12}}},[a("a-select",{staticStyle:{width:"100%"},attrs:{defaultValue:"0",placeholder:"请选择状态"},on:{change:function(e){}},model:{value:e.listQuery.isValid,callback:function(t){e.$set(e.listQuery,"isValid",t)},expression:"listQuery.isValid"}},[a("a-select-option",{attrs:{value:"1"}},[e._v("禁用")]),a("a-select-option",{attrs:{value:"0"}},[e._v("启用")])],1)],1)],1),a("a-col",{attrs:{span:8}},[a("a-form-item",[a("a-button",{attrs:{type:"primary"},on:{click:e.getList}},[e._v("\n\t\t\t\t搜索\n\t\t\t  ")])],1)],1)],1)],1),a("div",{staticClass:"search-result-list"},[a("div",{staticClass:"table-operations"},[a("a-button",{staticStyle:{margin:"0"},attrs:{type:"dashed",block:""},on:{click:function(t){return e.createlist()}}},[e._v("+ 新增")])],1),a("a-table",{attrs:{columns:e.columns,dataSource:e.list,bordered:"",pagination:e.pagination,loading:e.loading},scopedSlots:e._u([{key:"status_1",fn:function(t){return a("span",{},[a("a-badge",{attrs:{status:"运行"==t?"success":"error"}}),e._v("\n            "+e._s(t)+"\n\t\t\t\n        ")],1)}},{key:"status_2",fn:function(t){return a("span",{},[a("a-badge",{attrs:{status:"0"==t?"success":"error"}}),e._v("\n\t\t     "+e._s(e._f("statusFilter")(t))+"\n\t\t\t\t\t\n\t\t ")],1)}},{key:"operation",fn:function(t,s){return a("span",{},[a("a",{on:{click:function(t){return e.showlist(s)}}},[e._v("查看")]),a("a-divider",{attrs:{type:"vertical"}}),a("a-dropdown",[a("a",{staticClass:"ant-dropdown-link",attrs:{href:"javascript:;"}},[e._v("\n\t\t\t\t更多 "),a("a-icon",{attrs:{type:"down"}})],1),a("a-menu",{attrs:{slot:"overlay"},slot:"overlay"},[a("a-menu-item",[a("a",{attrs:{href:"javascript:;"},on:{click:function(t){return e.update(s)}}},[e._v("修改")])]),a("a-menu-item",[a("a",{attrs:{href:"javascript:;"},on:{click:function(t){return e.deletList(s)}}},[e._v("删除")])]),a("a-menu-item",[a("a",{attrs:{href:"javascript:;"},on:{click:function(t){return e.updatestatue(s)}}},[e._v(e._s(e._f("FstatusFilter")(s.isValid)))])])],1)],1)],1)}}])})],1),a("edit",{ref:"edit",on:{fresh:e.fresh}})],1)},i=[],r=a("8daa");function o(e){return Object(r["a"])({url:"/jobs/getAllJobsByPage",method:"get",params:e})}function n(e){return Object(r["a"])({url:"/jobs/addJob",method:"post",params:e})}function l(e){return Object(r["a"])({url:"/jobs/delJob",method:"delete",params:e})}function c(e){return Object(r["a"])({url:"/jobs/updateJob",method:"put",params:e})}function d(e){return Object(r["a"])({url:"/jobs/forbidJob",method:"get",params:e})}function u(e){return Object(r["a"])({url:"/jobs/startJob",method:"get",params:e})}var p=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-drawer",{attrs:{placement:"right",closable:!0,visible:e.showVisible,width:"700px"},on:{close:e.onClose}},[a("span",{attrs:{slot:"title"},slot:"title"},[a("a-icon",{attrs:{type:e.iconType}}),e._v("  "+e._s(e.dialogTypeMap[e.dialogType])+"\n\t\t\t\t\n\t\t\t")],1),a("a-form",{staticClass:"ant-advanced-search-form",staticStyle:{border:"none"},attrs:{form:e.form}},[a("a-row",{attrs:{gutter:24}},[a("a-col",{attrs:{span:24}},[a("a-form-item",{attrs:{label:"作业名称","label-col":{span:4},"wrapper-col":{span:24}}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["processName",e.rule.processName],expression:"['processName',rule.processName]"}],attrs:{placeholder:"请输入作业名称",disabled:e.disabled}}),a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["processId"],expression:"['processId']"}],attrs:{type:"hidden",disabled:e.disabled}})],1)],1),a("a-col",{attrs:{span:24}},[a("a-form-item",{attrs:{label:"Java类名","label-col":{span:4},"wrapper-col":{span:12}}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["className",e.rule.className],expression:"['className',rule.className]"}],attrs:{placeholder:"请输入Java类名",disabled:e.disabled}})],1)],1),a("a-col",{attrs:{span:24}},[a("a-form-item",{attrs:{label:"组名","label-col":{span:4},"wrapper-col":{span:12}}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["groupName",e.rule.groupName],expression:"['groupName',rule.groupName]"}],attrs:{placeholder:"请输入组名",disabled:e.disabled}})],1)],1),a("a-col",{attrs:{span:24}},[a("a-form-item",{attrs:{label:"调度表达式","label-col":{span:4},"wrapper-col":{span:12}}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["cronExpr",e.rule.cronExpr],expression:"['cronExpr',rule.cronExpr]"}],attrs:{placeholder:"请输入调度表达式",disabled:e.disabled}})],1)],1),a("a-col",{attrs:{span:24}},[a("a-form-item",{attrs:{label:"调度说明","label-col":{span:4},"wrapper-col":{span:12}}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["scheduleDesc",e.rule.scheduleDesc],expression:"['scheduleDesc',rule.scheduleDesc]"}],attrs:{placeholder:"请输入调度说明",disabled:e.disabled1}})],1)],1),a("a-col",{attrs:{span:24}},[a("a-form-item",{attrs:{label:"启用状态","label-col":{span:4},"wrapper-col":{span:12}}},[[a("a-radio-group",{directives:[{name:"decorator",rawName:"v-decorator",value:["isValid",e.rule.isValid],expression:"['isValid',rule.isValid]"}],attrs:{name:"isValid",disabled:e.disabled}},[a("a-radio",{attrs:{value:"0"}},[e._v("启用")]),a("a-radio",{attrs:{value:"1"}},[e._v("禁用")])],1)]],2)],1)],1)],1),a("div",{style:{position:"absolute",left:0,bottom:0,width:"100%",borderTop:"1px solid #e9e9e9",padding:"10px 16px",background:"#fff",textAlign:"right"}},[e.showCanel?a("a-button",{style:{marginRight:"8px"},on:{click:e.onClose}},[e._v(" 取消 ")]):e._e(),a("a-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v(e._s(e.SubmitTypeMap[e.dialogType]))])],1)],1)},m=[],h={data:function(){return{disabled:"",disabled1:"",showVisible:!1,form:this.$form.createForm(this),hackRest:!1,dialogType:"",dialogTypeMap:{show:"任务详情",create:"任务管理新增",update:"任务管理修改"},SubmitTypeMap:{show:"关闭",create:"确认新增",update:"确认修改"},showCanel:!0,rule:{processName:{rules:[{required:!0,message:"请输入作业名称"}],initialValue:""},className:{rules:[{required:!0,message:"请输入Java类名"}],initialValue:""},groupName:{rules:[{required:!0,message:"请输入组名"}],initialValue:"默认组"},cronExpr:{rules:[{required:!0,message:"请输入调度表达式"}],initialValue:""},scheduleDesc:{rules:[{required:!0,message:"请输入调度说明"}],initialValue:""},isValid:{rules:[{required:!0,message:"请选择状态"}],initialValue:"1"}}}},methods:{ShowDialog:function(e){var t=this;this.disabled=!0,this.disabled1=!0,this.showCanel=!1,this.showVisible=!0,this.iconType="copy",this.dialogType="show",this.timeTask=e,this.$nextTick(function(){t.hackRest=!0,t.form.setFieldsValue(e)})},CreateDialog:function(){this.iconType="form",this.showCanel=!0,this.disabled=!1,this.disabled1=!1,this.showVisible=!0,this.dialogType="create",this.form.resetFields()},UpdateDialog:function(e){var t=this;this.iconType="form",this.showCanel=!0,this.disabled=!1,this.disabled1=!1,this.showVisible=!0,this.dialogType="update",this.timeTask=e,this.$nextTick(function(){t.hackRest=!0,t.form.setFieldsValue(e)})},onClose:function(){this.showVisible=!1,this.form.resetFields()},onSubmit:function(){"show"==this.dialogType&&(this.showVisible=!1),"create"==this.dialogType&&this.create(),"update"==this.dialogType&&this.update()},create:function(){var e=this;this.form.validateFields(function(t,a){t||(n(a).then(function(t){"0000"==t.data.code?(e.$message.success(t.data.message),e.$emit("fresh")):e.$message.error(t.data.message)}),e.showVisible=!1)})},update:function(){var e=this;this.form.validateFields(function(t,a){t||(c(a).then(function(t){"0000"==t.data.code?(e.$message.success(t.data.message),e.$emit("fresh")):e.$message.error(t.data.message)}),e.showVisible=!1)})}}},f=h,g=a("2877"),b=Object(g["a"])(f,p,m,!1,null,null,null),v=b.exports,w={filters:{statusFilter:function(e){var t={0:"启用",1:"禁用"};return t[e]},FstatusFilter:function(e){var t={1:"启用",0:"禁用"};return t[e]}},data:function(){var e=this;return{expand:!1,loading:!1,form:this.$form.createForm(this),columns:[{title:"作业名称",dataIndex:"processName"},{title:"Java类名",dataIndex:"className"},{title:"组名",dataIndex:"groupName"},{title:"调度表达式",dataIndex:"cronExpr"},{title:"调度说明",dataIndex:"scheduleDesc"},{title:"状态",dataIndex:"isValid",align:"center",scopedSlots:{customRender:"status_2"}},{title:"操作",dataIndex:"operation",width:"160px",align:"center",scopedSlots:{customRender:"operation"}}],list:[],pagination:{total:0,defaultPageSize:5,showTotal:function(e){return"共 ".concat(e," 条数据")},showSizeChanger:!0,pageSizeOptions:["5","10","15","20"],onChange:function(t,a){e.pagechage(t,a)},onShowSizeChange:function(t,a){e.pageSizeChange(a)}},showVisible:!1,record:{},listQuery:{processName:"",isValid:"",pageNum:1,pageSize:5}}},components:{edit:v},computed:{count:function(){return this.expand?11:3}},created:function(){this.getList()},methods:{getList:function(){var e=this;this.loading=!0,o(this.listQuery).then(function(t){"0000"==t.data.code?(e.loading=!1,e.list=t.data.extend.list,e.pagination.total=t.data.extend.total):(e.loading=!1,e.$message.error(t.data.message))})},handleReset:function(){this.form.resetFields()},showlist:function(e){this.$refs.edit.ShowDialog(Object.assign({},e))},createlist:function(){this.$refs.edit.CreateDialog()},deletList:function(e){if(0==e.isValid)this.$info({title:"提示",content:"启用状态下不可删除！"});else{var t=this;this.$confirm({title:"确认删除？",content:"确认删除本条记录，删除后不可恢复",okType:"danger",onOk:function(){l({processId:e.processId}).then(function(e){"0000"==e.data.code?(t.getList(),t.$message.success(e.data.message)):t.$message.error(e.data.message)})}})}},update:function(e){this.$refs.edit.UpdateDialog(e)},updatestatue:function(e){var t=this,a=e.processId;"0"==e.isValid?d({processId:a}).then(function(e){"0000"==e.data.code?(t.getList(),t.$message.success(e.data.message)):t.$message.error(e.data.message)}):u({processId:a}).then(function(e){"0000"==e.data.code?(t.getList(),t.$message.success(e.data.message)):t.$message.error(e.data.message)})},fresh:function(){this.getList()},onClose:function(){this.showVisible=!1},toggle:function(){this.expand=!this.expand},pagechage:function(e,t){this.listQuery.pageNum=e,this.listQuery.pageSize=t,this.getList()},pageSizeChange:function(e){this.listQuery.pageNum=1,this.listQuery.pageSize=e,this.getList()}}},y=w,x=(a("f7ce"),Object(g["a"])(y,s,i,!1,null,null,null));t["default"]=x.exports},f7ce:function(e,t,a){"use strict";var s=a("41d2"),i=a.n(s);i.a}}]);
//# sourceMappingURL=chunk-20191814.525c848e.js.map