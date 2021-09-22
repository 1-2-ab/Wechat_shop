// pages/good_detail/index.js
import { request } from '../../request/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options;
    this.getGoodsDetail(goods_id);
  },
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({url: '/goods/detail',data : {goods_id}});
    // console.log(goodsObj);
    this.GoodInfo = goodsObj
    this.setData({
      goodsObj: {
        pics:goodsObj.pics,
        goods_price: goodsObj.goods_price,
        goods_name: goodsObj.goods_name,
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
      }
    })
  },
  // 点击轮播图 放大预览
  handlePreviewImage(e) {
    // 1. 构建造要预览的图片数组
    const urls = this.GoodInfo.pics.map(v => v.pics_mid)
    // 2.接收传递过来的图片url
    console.log(e);
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      urls,
      current
    })
  }
  
})