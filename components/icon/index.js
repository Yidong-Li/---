// components/lottery-icon/index.js
const windowWidth = wx.getSystemInfoSync().windowWidth;
const re = 750 / windowWidth;
const screenHeight = wx.getSystemInfoSync().screenHeight;
const windowHeight = wx.getSystemInfoSync().windowHeight;
const barHeight = screenHeight - windowHeight;

var lastPosTop = 0,
  lastPosLeft = 0,
  currentPosTop = 0,
  currentPosLeft = 0;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    initLeft:{
      type: Number,
      value: 0,
      observer: function () { }
    },
    initTop:{
      type: Number,
      value: 0,
      observer: function () { }
    },
    moveMinLeft:{
      type:Number,
      value:0,
      observer:function(){}
    },
    moveMaxLeft: {
      type: Number,
      value: 0,
      observer: function () { }
    },
    moveMinTop:{
      type:Number,
      value:0,
      observer: function(){}
    },
    moveMaxTop: {
      type: Number,
      value: 0,
      observer: function () { }
    },
    imgUrl: {
      type:String,
      value:'',
      observer:function(){}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    startMove: false,
    top:0,
    left:0,
  },

  attached: function(){
    this.setData({
      left:this.data.initLeft/re,
      top:this.data.initTop/re
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    touchStart: function(e){
      lastPosTop = e.touches[0].pageY;
      lastPosLeft = e.touches[0].pageX;
      this.setData({
        startMove:true
      })
    },

    touchMove: function(e){
      var current = this.dealData(e);
      this.setData({
        top: current.currentTop,
        left: current.currentLeft
      })
    },

    dealData: function(e){
      currentPosTop = e.touches[0].pageY;
      currentPosLeft = e.touches[0].pageX;
      var topDiff = currentPosTop - lastPosTop;
      var leftDiff = currentPosLeft - lastPosLeft;
      var currentTop = this.data.top + topDiff;
      var currentLeft = this.data.left + leftDiff;
      if (currentTop < this.data.moveMinTop / re) {
        currentTop = this.data.moveMinTop / re;
      }
      if (currentTop > (this.data.moveMaxTop / re) - barHeight - 160 / re) {
        currentTop = (this.data.moveMaxTop / re) - barHeight - 160 / re;
      }
      if (currentLeft < this.data.moveMinLeft / re) {
        currentLeft = this.data.moveMinLeft / re;
      }
      if (currentLeft + (160 / re) > this.data.moveMaxLeft / re) {
        currentLeft = (this.data.moveMaxLeft - 160) / re
      }
      lastPosTop = currentPosTop;
      lastPosLeft = currentPosLeft;
      return {
        currentTop:currentTop,
        currentLeft:currentLeft
      }
    },
    
    touchEnd: function(e){
      if(this.data.left *re+80>375){
        this.setData({
          left: 590/re
        })
      }
      else {
        this.setData({
          left: 0
        })
      }
      this.setData({
        startMove: false
      })
    }
  }
})
