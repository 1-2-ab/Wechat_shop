// pages/category/index.js
import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单的菜单数据
    leftMenuList: [],
    // 右侧的商品数据
    rightContent: [],
    // 被点击的左侧菜单
    currentIndex: 0,
    // 右侧内容的滚动条距离顶部的距离
    scrollTop: 0,
  },
  // 返回接口的数据
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 先判断一下本地存储中有没有旧的数据
      {tiem:Date.now(),data:[...]}
      2.没有旧数据 直接发送请求
      3.由旧的数据 同时 旧的数据也没有过期 就使用 本地存储中的旧数据即可
    */
    // 1. 获取本地存储中的数据 (小程序也是存在本地存储 技术)
    const Cates = wx.getStorageSync("cates");
    // 2 判断
    if (!Cates) {
      // 不存在 发送请求获取数据
      this.getCate();
    } else {
      // 获取当前时间 - 点击本地存储中的数据 > 10s
      if (Date.now() - Cates.time > 400 * 10) {
        // 获取最新数据
        this.getCate();
        console.log("获取新的数据");
      } else {
        // 可以使用旧数据
        console.log("可以使用旧的数据");
        // 全局的Cates 获取本地的数据
        this.Cates = Cates.data;
        // console.log(Cates.data);
        // 渲染左边和右边的数据
        let leftMenuList = this.Cates.map((v) => v.cat_name);
        // 构建右侧的商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent,
        });
      }
    }
  },
  // 获取分类的数据
  getCate() {
    request({
      url: "/categories",
    }).then((res) => {
      console.log(res);
      this.Cates = res.data.message;
      // web 中的本地存储 和 小程序中的本地存储的区别
      /* 
        1.写代码的方式不一样了
        web:localStorage.setItem("key","value") localStorage.getItem("key")
        小程序中 ：wx.setStorageSync("key","value") wx.getStorageSync("key")
        2.存数据的时候 有没有做数据转换
         web:不管存入什么样的数据，最终都会先调用一下 Tostring()，把数据转换为字符串 在存入进去
         小程序:不存在 类型转换的这个操作 存什么类型的数据进去，获取的时候就是什么类型
      */
      wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
      // 构建左侧的大菜单数据
      let leftMenuList = this.Cates.map((v) => v.cat_name);
      // 构建右侧的商品数据
      let rightContent = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent,
      });
    });
  },
  // 左侧菜单点击事件
  handleItemTap(e) {
    console.log(e);
    // 1.获取被点击的标题身上的索引
    // 2.给data中的currentIndex赋值就可以了
    // 3.根据不同的索引来渲染右侧的商品内容
    const { index } = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      // 重新设置 右侧内容 scroll-view标签的距离顶部的距离
      scrollTop: 0,
    });
  },
});
