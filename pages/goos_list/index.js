// pages/goos_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id: 0,
        name: '综合',
        isActive:true
      },
      {
        id: 1,
        name: '销量',
        isActive:false
      },
      {
        id: 2,
        name: '价格',
        isActive:false
      },
    ]
  },
  // 标题点击事件 从子组件传递过来
  handletabsItemChange(e){
    // console.log(e);
    // 1. 获取被点击的标题索引
    const {index} = e.detail;
    // console.log(index);
    // 修改原数组
    let {tabs} = this.data;
    // console.log(tabs);
    tabs.forEach((v,i)=>{i===index?v.isActive=true:v.isActive=false})
    this.setData({
      tabs
    })
  }
})