import { request } from "../../request/index";
Page({
// 页面的初始数据
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
    ],
    Goodlist: []
  },
  // 总页数初始化
  totalPage:1,
  //接口要的参数
  QueryParams:{
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  // 生命周期函数 -- 监听页面加载
  onLoad:function(options){
    this.QueryParams.cid = options.cid;
    this.getGoodslist()
  },
  // 获取商品列表
  async getGoodslist(){
    const res = await request({url: '/goods/search', data: this.QueryParams});
    // 获取 总页数
    const total = res.total;
    // 计算总页数 总页数 = Math.ceil(总条数 / 页容量 )
    this.totalPage = Math.ceil(total / this.QueryParams.pagesize)
    // console.log(this.totalPage);
    console.log(res);
    this.setData({
      // 用解构可以获取数据
      Goodlist: [...this.data.Goodlist,...res.goods]
      // 用concat页可以获取数据
      // Goodlist: this.data.Goodlist.concat(res.goods)
    })
    wx.stopPullDownRefresh()
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
  },

  // 页面触底发生的事件
  onReachBottom(){
    if(this.QueryParams.pagenum > this.totalPage){
      // 没有数据时触发拟态框提示
      wx:wx.showToast({
        title: '没有下一页数据了'
      })
    }else{
      this.QueryParams.pagenum++;
      this.getGoodslist()
    }
  },
  // 下拉刷新事件
  onPullDownRefresh(){
    // 1.重置数组
    this.setData({
      Goodlist: []
    })
    // 重置页码
    this.QueryParams.pagenum = 1
    // 发送请求
    this.getGoodslist()
  }
  
})