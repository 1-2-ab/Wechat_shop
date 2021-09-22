// pages/cart/index.js

// import {getSetting, chooseAddress, openSetting} from '../utils/acyncWX'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 1.获取收获地址
  handleChooseAddress() {
    // 2. 获取收获地址
   wx.getSetting({
     success: (result) => {
       const scopeAddress = result.authSetting['scope.address']
       if(scopeAddress === true || scopeAddress === undefined){
        wx.chooseAddress({
          success: (result1) => {
            console.log(result1);
          }
        })
       }else{
         wx.openSetting({
           success:(result2) => {
            wx.chooseAddress({
              success: (result1) => {
                console.log(result1);
              }
            })
           }
         })
       }
     }
   })
  }

})