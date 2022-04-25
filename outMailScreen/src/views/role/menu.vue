<template>

  <a-drawer title="菜单分配"  placement="right"  :closable="true"  @close="onClose"  :visible="showVisible"  width="400px">
    <a-tree
    v-if="a"
    checkable
    :treeData="treeData"
    :checkedKeys="innerCheckedKeys"
    @select="this.onSelect"
    @check="this.onCheck"
    :replaceFields="replaceFields">
      <template slot="custom" slot-scope="item">
        <a-icon :type="item.icon"/>&nbsp;
        <span>{{ item.name }}</span>
    </template>
  </a-tree>

    <div class="modeButton">
      <a-button :style="{marginRight: '8px'}"
                @click="onClose">
        取消
      </a-button>
      <a-button @click="onSubmit" type="primary">确认</a-button>
    </div>
  </a-drawer>

</template>

<script>
import {allMenuList,rolemenu} from '@/api/system.js';
  export default {
    data() {
      return {
          treeData:[
              {
                name: '系统设置',
                id: '2',
                icon:'home',
                scopedSlots: { title: 'custom' },
                node: [
                  { name: '用户管理',id: '3',icon:'home',scopedSlots: { title: 'custom' }},
                  { name: '角色管理',id: '4',icon:'user',scopedSlots: { title: 'custom' }},
                  { name: '菜单管理',id: '5',icon:'home',scopedSlots: { title: 'custom' }}
                ],
              },
              {
                name: '系统设置1',
                id: '21',
                icon:'home',
                scopedSlots: { title: 'custom' },
                node: [
                  { name: '用户管理',id: '31',icon:'home',scopedSlots: { title: 'custom' }},
                  { name: '角色管理',id: '41',icon:'user',scopedSlots: { title: 'custom' }},
                  { name: '菜单管理',id: '51',icon:'home',scopedSlots: { title: 'custom' }}
                ],
              },
            ],
          replaceFields:{
          children:'node',
          title:'name',
          key:'id'
        },
        innerCheckedKeys:['4'],
        a:true
      }
    },
    props: {
      showVisible: Boolean
    },

    methods: {
      onSelect(selectedKeys, info) {
       console.log('selected', selectedKeys, info);
     },
     onCheck(checkedKeys, info) {
         this.innerCheckedKeys = checkedKeys;
       console.log('onCheck', checkedKeys, info);
     },

  	  initDialog(query) {
       this.handleSearch(query)
      //this.getrolemanu(query)
  	    this.showVisible = true
  	  },
      //查询所有菜单
      handleSearch(query) {
        allMenuList().then(res=>{
            this.treeData = res.data;
            this.treeData.map(item => item.key)
            this.getrolemanu();

        });

      },


      getrolemanu(){
        rolemenu().then(res1=>{
            this.innerCheckedKeys = res1.data;
        });
      },

  	  //关闭
  	  onClose(){
  		  this.showVisible = false;
  	  },
      //提交按钮
        onSubmit() {
     }
        //end update

    }
  }

</script>
