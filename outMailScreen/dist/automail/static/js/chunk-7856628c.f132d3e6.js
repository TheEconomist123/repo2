(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7856628c"],{"330f":function(t,e,a){"use strict";a.d(e,"e",function(){return i}),a.d(e,"a",function(){return n}),a.d(e,"b",function(){return r}),a.d(e,"g",function(){return o}),a.d(e,"f",function(){return l}),a.d(e,"d",function(){return c});var s=a("8daa");function i(t){return Object(s["a"])({url:"/staff/getStaffInfoByPage",method:"post",data:t})}function n(t){return Object(s["a"])({url:"/staff/addStaffInfo",method:"post",data:t})}function r(t){return Object(s["a"])({url:"/staff/delStaffInfo",method:"delete",params:t})}function o(t){return Object(s["a"])({url:"/staff/updateStaffInfo",method:"post",data:t})}function l(t){return Object(s["a"])({url:"/staff/saveExcelData",method:"post",data:t})}function c(t){return Object(s["a"])({url:"/staff/getExcelModel",method:"post",responseType:"blob",params:t})}},7581:function(t,e,a){"use strict";var s=a("cac0"),i=a.n(s);i.a},"9a3c":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"commonContent"},[a("a-form-model",{staticClass:"commomForm",attrs:{form:t.form},on:{submit:t.handleSearch}},[a("a-row",{attrs:{gutter:24}},[a("a-col",{attrs:{span:8}},[a("a-form-model-item",{attrs:{label:"员工编号","label-col":{span:5},"wrapper-col":{span:12}}},[a("a-input",{attrs:{placeholder:"员工编号"},model:{value:t.listQuery.payload.id,callback:function(e){t.$set(t.listQuery.payload,"id",e)},expression:"listQuery.payload.id"}})],1)],1),a("a-col",{attrs:{span:8}},[a("a-form-model-item",{attrs:{label:"员工名称","label-col":{span:5},"wrapper-col":{span:12}}},[a("a-input",{attrs:{placeholder:"员工名称"},model:{value:t.listQuery.payload.name,callback:function(e){t.$set(t.listQuery.payload,"name",e)},expression:"listQuery.payload.name"}})],1)],1),a("a-col",{style:{display:this.expand?"block":"none"},attrs:{span:8}},[a("a-form-model-item",{attrs:{label:"在职状态","label-col":{span:5},"wrapper-col":{span:12}}},[a("a-select",{staticStyle:{width:"100%"},attrs:{defaultValue:"1"},on:{change:t.handleChange},model:{value:t.listQuery.payload.status,callback:function(e){t.$set(t.listQuery.payload,"status",e)},expression:"listQuery.payload.status"}},[a("a-select-option",{attrs:{value:"0"}},[t._v("离职")]),a("a-select-option",{attrs:{value:"1"}},[t._v("在职")])],1)],1)],1),a("a-col",{style:{textAlign:"right",paddingRight:"20px"},attrs:{span:this.expand?24:8}},[a("a-form-model-item",[a("a-button",{attrs:{type:"primary",icon:"search"},on:{click:t.getList}},[t._v("\n              搜  索\n            ")]),a("a-button",{style:{marginLeft:"8px"},attrs:{icon:"redo"},on:{click:t.handleReset}},[t._v("\n              重  置\n            ")]),a("a",{style:{marginLeft:"8px",fontSize:"12px"},on:{click:t.toggle}},[a("a-label",{attrs:{label:"dsdfd"}},[t._v(t._s(t.expand?"收起":"展开"))]),a("a-icon",{attrs:{type:t.expand?"up":"down"}})],1)],1)],1)],1)],1),a("div",{staticClass:"search-result-list"},[a("div",{staticClass:"table-operations1"},[a("a-button",{attrs:{type:"primary"},on:{click:function(e){return t.createlist()}}},[t._v("+ 新    增")]),a("a-button",{attrs:{type:"primary"},on:{click:function(e){return t.importStaff()}}},[t._v(" 批量导入")]),a("a-button",{attrs:{type:"primary"},on:{click:function(e){return t.downloadModel()}}},[t._v(" 模板下载")]),a("input",{ref:"inputFile",attrs:{type:"file",accept:".xls,.xlsx",hidden:""},on:{change:t.fileChange}})],1),a("a-table",{attrs:{columns:t.columns,dataSource:t.list,bordered:"",pagination:t.pagination},scopedSlots:t._u([{key:"status",fn:function(e){return a("span",{},[a("a-badge",{attrs:{status:"1"==e?"success":"error"}}),t._v("\n\t\t\t\t\t"+t._s(t.statusmap[e])+"\n\t\t\t\t")],1)}},{key:"systemType",fn:function(e){return a("span",{},[t._v("\n\t\t\t\t\t"+t._s(t.systemTypeMap[e])+"\n\t\t\t\t")])}},{key:"channel",fn:function(e){return a("span",{},[t._v("\n\t\t\t\t\t"+t._s(t.channelMap[e])+"\n\t\t\t\t")])}},{key:"operation",fn:function(e,s){return a("span",{},[a("a",{on:{click:function(e){return t.showlist(s)}}},[t._v("查看")]),a("a-divider",{attrs:{type:"vertical"}}),a("a-dropdown",[a("a",{staticClass:"ant-dropdown-link",attrs:{href:"javascript:;"}},[t._v("\n\t\t\t\t\t\t\t更多\n\t\t\t\t\t\t\t"),a("a-icon",{attrs:{type:"down"}})],1),a("a-menu",{attrs:{slot:"overlay"},slot:"overlay"},[a("a-menu-item",[a("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.update(s)}}},[t._v("修改")])]),a("a-menu-item",[a("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.deletList(s)}}},[t._v("删除")])])],1)],1)],1)}}])})],1),a("edit",{ref:"edit",on:{fresh:t.fresh}})],1)},i=[],n=a("330f"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a-drawer",{attrs:{placement:"right",closable:!0,visible:t.showVisible,width:"700px"},on:{close:t.onClose}},[a("span",{attrs:{slot:"title"},slot:"title"},[a("a-icon",{attrs:{type:t.iconType}}),t._v("  "+t._s(t.dialogTypeMap[t.dialogType])+"\n\n\t\t")],1),a("a-form",{staticClass:"ant-advanced-search-form",staticStyle:{border:"none"},attrs:{form:t.form}},[a("a-row",{attrs:{gutter:24}},[a("a-col",{attrs:{span:24}},[a("a-form-item",{attrs:{label:"员工编号","label-col":{span:4},"wrapper-col":{span:12}}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["id",t.rule.id],expression:"['id',rule.id]"}],attrs:{placeholder:"请输入员工编号",disabled:t.disabled1}})],1)],1),a("a-col",{attrs:{span:24}},[a("a-form-item",{attrs:{label:"员工姓名","label-col":{span:4},"wrapper-col":{span:12}}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["name",t.rule.name],expression:"['name',rule.name]"}],attrs:{placeholder:"请输入员工姓名",disabled:t.disabled}})],1)],1),a("a-col",{attrs:{span:24}},[a("a-form-item",{attrs:{label:"出生日期","label-col":{span:4},"wrapper-col":{span:12}}},[a("a-date-picker",{directives:[{name:"decorator",rawName:"v-decorator",value:["birth",t.rule.birth],expression:"['birth',rule.birth]"}],staticStyle:{width:"100%"},attrs:{placeholder:"请输入出生日期",disabled:t.disabled,format:"yyyy-MM-DD",valueFormat:"yyyy-MM-DD"}})],1)],1),a("a-col",{attrs:{span:24}},[a("a-form-item",{attrs:{label:"入职日期","label-col":{span:4},"wrapper-col":{span:12}}},[a("a-date-picker",{directives:[{name:"decorator",rawName:"v-decorator",value:["entry",t.rule.entry],expression:"['entry',rule.entry]"}],staticStyle:{width:"100%"},attrs:{placeholder:"请输入入职日期",disabled:t.disabled,format:"yyyy-MM-DD",valueFormat:"yyyy-MM-DD"}})],1)],1),a("a-col",{attrs:{span:24}},[a("a-form-item",{attrs:{label:"员工描述","label-col":{span:4},"wrapper-col":{span:12}}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["desx",t.rule.desx],expression:"['desx',rule.desx]"}],attrs:{placeholder:"请输入员工描述",disabled:t.disabled}})],1)],1),a("a-col",{attrs:{span:24}},[a("a-form-item",{attrs:{label:"Email","label-col":{span:4},"wrapper-col":{span:12}}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["eMail",t.rule.eMail],expression:"['eMail',rule.eMail]"}],attrs:{placeholder:"请输入员工邮箱",disabled:t.disabled}})],1)],1),a("a-col",{attrs:{span:24}},[a("a-form-item",{attrs:{label:"在职状态","label-col":{span:4},"wrapper-col":{span:12}}},[[a("a-radio-group",{directives:[{name:"decorator",rawName:"v-decorator",value:["status",t.rule.status],expression:"['status',rule.status]"}],attrs:{name:"status",disabled:t.disabled}},[a("a-radio",{attrs:{value:"0"}},[t._v("离职")]),a("a-radio",{attrs:{value:"1"}},[t._v("在职")])],1)]],2)],1)],1)],1),a("div",{style:{position:"absolute",left:0,bottom:0,width:"100%",borderTop:"1px solid #e9e9e9",padding:"10px 16px",background:"#fff",textAlign:"right"}},[t.showCanel?a("a-button",{style:{marginRight:"8px"},on:{click:t.onClose}},[t._v(" 取消")]):t._e(),a("a-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v(t._s(t.SubmitTypeMap[t.dialogType]))])],1)],1)},o=[],l={data:function(){return{disabled:"",disabled1:"",showVisible:!1,form:this.$form.createForm(this),hackRest:!1,dialogType:"",dialogTypeMap:{show:"员工详情",create:"员工新增",update:"员工修改"},SubmitTypeMap:{show:"关闭",create:"确认新增",update:"确认修改"},showCanel:!0,rule:{id:{rules:[{required:!0,message:"请输入员工编号"}],initialValue:""},name:{rules:[{required:!0,message:"请输入员工名称"}],initialValue:""},birth:{rules:[{required:!0,message:"请输入员工出生日期"}],initialValue:""},eMail:{rules:[{required:!0,message:"请输入员工邮箱"}],initialValue:""},entry:{rules:[{required:!0,message:"请输入员工入职日期"}],initialValue:""},desx:{rules:[{required:!1,message:"请输入员工描述"}],initialValue:""},status:{rules:[{required:!0,message:"请选择在职状态"}],initialValue:"1"}}}},methods:{ShowDialog:function(t){var e=this;this.disabled=!0,this.disabled1=!0,this.showCanel=!1,this.showVisible=!0,this.iconType="copy",this.dialogType="show",this.timeTask=t,this.$nextTick(function(){e.hackRest=!0,e.form.setFieldsValue(t)})},CreateDialog:function(){this.iconType="form",this.showCanel=!0,this.disabled=!1,this.disabled1=!1,this.showVisible=!0,this.dialogType="create",this.form.resetFields()},UpdateDialog:function(t){var e=this;this.iconType="form",this.showCanel=!0,this.disabled=!1,this.disabled1=!0,this.showVisible=!0,this.dialogType="update",this.timeTask=t,this.$nextTick(function(){e.hackRest=!0,e.form.setFieldsValue(t)})},onClose:function(){this.showVisible=!1,this.form.resetFields()},onSubmit:function(){"show"==this.dialogType&&(this.showVisible=!1),"create"==this.dialogType&&this.create(),"update"==this.dialogType&&this.update()},create:function(){var t=this;this.form.validateFields(function(e,a){e||(Object(n["a"])(a).then(function(e){"0000"==e.data.code?(t.$message.success(e.data.message),t.$emit("fresh")):t.$message.error(e.data.message)}),t.showVisible=!1)})},update:function(){var t=this;this.form.validateFields(function(e,a){e||(Object(n["g"])(a).then(function(e){"0000"==e.data.code?(t.$message.success(e.data.message),t.$emit("fresh")):t.$message.error(e.data.message)}),t.showVisible=!1)})}}},c=l,d=a("2877"),u=Object(d["a"])(c,r,o,!1,null,null,null),p=u.exports,f={data:function(){var t=this;return{title:"员工新增",expand:!1,form:this.$form.createForm(this),columns:[{title:"员工编号",dataIndex:"id",align:"center"},{title:"姓名",dataIndex:"name",align:"center"},{title:"出生日期",dataIndex:"birth",align:"center"},{title:"入职日期",dataIndex:"entry",align:"center"},{title:"邮箱账号",dataIndex:"eMail",align:"center"},{title:"备注",dataIndex:"desx",align:"center"},{title:"状态",dataIndex:"status",align:"center",scopedSlots:{customRender:"status"}},{title:"操作",dataIndex:"operation",width:"160px",align:"center",scopedSlots:{customRender:"operation"}}],list:[],pagination:{total:0,defaultPageSize:5,showTotal:function(t){return"共 ".concat(t," 条数据")},showSizeChanger:!0,pageSizeOptions:["5","10","15","20"],onChange:function(e,a){t.pagechage(e,a)},onShowSizeChange:function(e,a){t.pageSizeChange(a)}},listQuery:{payload:{id:"",name:"",status:""},page:1,pageSize:5},statusmap:{0:"离职",1:"在职"},showVisible:!1,record:{}}},components:{edit:p},computed:{count:function(){return this.expand?11:3}},created:function(){this.getList()},methods:{importStaff:function(){this.$refs.inputFile.dispatchEvent(new MouseEvent("click"))},downloadModel:function(){Object(n["d"])().then(function(t){var e="员工信息表.xlsx",a=new Blob([t.data]),s=document.createElement("a"),i=window.URL.createObjectURL(a);s.href=i,s.download=decodeURIComponent(e),document.body.appendChild(s),s.click(),document.body.removeChild(s),window.URL.revokeObjectURL(i)})},fileChange:function(t){var e=this,a=new FormData;a.append("file",t.target.files[0]),Object(n["f"])(a).then(function(a){t.target.value="","0000"==a.data.code?(e.$message.success(a.data.message),e.getList()):e.$message.error(a.data.message)})},getList:function(){var t=this;Object(n["e"])(this.listQuery).then(function(e){t.list=e.data.extend.list,t.pagination.total=e.data.extend.total}).catch(function(t){console.info("失败"),console.info(t.message)})},handleReset:function(){this.listQuery.payload={id:"",name:"",status:""}},showlist:function(t){this.$refs.edit.ShowDialog(Object.assign({},t))},createlist:function(){this.$refs.edit.CreateDialog()},update:function(t){this.$refs.edit.UpdateDialog(t)},deletList:function(t){var e=this;this.$confirm({title:"确认删除？",content:"确认删除记录，删除后不可恢复",okType:"danger",onOk:function(){Object(n["b"])({id:t.id}).then(function(t){200==t.status?(e.getList(),e.$message.success("删除成功！")):e.$message.error("删除失败！")})}})},fresh:function(){this.getList()},toggle:function(){this.expand=!this.expand},pageSizeChange:function(t){this.listQuery.pageNum=1,this.listQuery.pageSize=t,this.getList()},pagechage:function(t,e){this.listQuery.pageNum=t,this.listQuery.pageSize=e,this.getList()}}},h=f,m=(a("7581"),Object(d["a"])(h,s,i,!1,null,null,null));e["default"]=m.exports},cac0:function(t,e,a){}}]);
//# sourceMappingURL=chunk-7856628c.f132d3e6.js.map