// 引入 用来发送请求的方法
import { request } from "../../request/index";
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    cateList: [],
    floorList: [],
  },
  // 页面开始加载 就会触发
  onLoad: function (options) {
    // 发送异步请求获取轮播图数据
    //  wx.request({
    //   url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
    //   responseType: "text",
    //   success: (result) => {
    //     console.log(result);
    //     this.setData({
    //       swiperList: result.data.message,
    //     });
    //   },
    // });
    this.getswiperList();
    this.getcateList();
    this.getfloorList();
  },
  getswiperList() {
    request({
      url: "/home/swiperdata",
    }).then((result) => {
      this.setData({
        swiperList: result.data.message,
      });
    });
  },
  getcateList() {
    request({
      url: "/home/catitems",
    }).then((result) => {
      this.setData({
        cateList: result.data.message,
      });
    });
  },
  getfloorList() {
    request({
      url: "/home/floordata",
    }).then((result) => {
      this.setData({
        floorList: result.data.message,
      });
    });
  },
});
