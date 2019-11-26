<template>
  <div class="recommend">
    <div 
      class="banner-container" 
      :style="'background-image:url('+ imageUrlList[imageUrlIndex] + '?imageView&blur=40x20' +')'"
      @mouseenter="handleMove(true)"
      @mouseleave="handleMove(false)">
      <div class="left">
        <div @click="handleClickToChangeImgIndex(1)"></div>
      </div>
      <div class="center">
        <div>
          <img :src="imageUrlList[imageUrlIndex]" alt="" :style="'transition: opacity 1s ease-in-out 0s; opacity: ' + opacityV">
          <div class="center-circle">
            <span v-for="(item, index) in imageUrlList" :key="index" @click="changeImageIndex(index)">
              <span :style="imageUrlIndex === index ? 'background-color: red' : ''"></span>
            </span>
          </div>
        </div>
        <div><span>PC 安卓 iPhone WP iPad Mac 六大客户端</span></div>
      </div>
      <div class="right">
        <div @click="handleClickToChangeImgIndex(0)"></div>
      </div>
    </div>
    <div class="main-container">
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script>
import { getBanner } from '@/api/index'
export default {
  data () {
    return {
      imageUrlList: [],
      imageUrlIndex: 0,
      opacityV: 1,
      interval: null
    }
  },
  mounted () {
    this.handleGetBanner()
    this.setImageUrl()
  },
  methods: {
    handleGetBanner () {
      getBanner().then(res => {
        if (res.data.code === 200) {
          res.data.banners.forEach(item => {
            this.imageUrlList.push(item.imageUrl)
          })
        }
      })
    },
    changeImageUrl () {
      const len = this.imageUrlList.length
      if (this.imageUrlIndex < len - 1) {
        this.imageUrlIndex++
      } else {
        this.imageUrlIndex = 0
      }
    },
    setImageUrl () {
      this.interval = setInterval(() => {
        this.opacityV = 0.2
        setTimeout(() => {
          this.changeImageUrl()
          this.opacityV = 1
          }, 1000)
      }, 5000)
    },
    handleMove (type) {
      if (type) {
        clearInterval(this.interval)
      } else {
        this.setImageUrl()
      }
    },
    changeImageIndex (idx) {
      this.imageUrlIndex = idx
    },
    handleClickToChangeImgIndex (type) {
      type ? this.imageUrlIndex-- : this.imageUrlIndex++
    }
  }
}
</script>
<style lang="less" scoped>
.recommend {
  width: 100%;
  background-color: transparent;
  .banner-container {
    width: 100%;
    height: 285px;
    display: flex;
    background-size: 6000px;
    background-position: center center;
    .left, .right {
      flex-basis: 1px;
      flex-grow: 1;
      position: relative;
      > div {
        width: 40px;
        height: 65px;
        position: absolute;
        right: 40px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        &:hover {
          cursor: pointer;
          background-color: rgba(255, 255, 255, 0.1)
        }
        &:before {
          content: '';
          display: block;
          width: 25px;
          height: 25px;
          border: 2px solid #fff;
          border-right: none;
          border-bottom: none;
          transform: rotate(-45deg);
          margin-left: 10px;
        }
      }
    }
    .right {
      > div {
        left: 40px;
        &::before {
          transform: rotate(135deg);
          margin-left: 0;
          margin-right: 10px;
        }
      }
    }
    .center {
      flex-basis: 980px;
      flex-grow: 0;
      display: flex;
      > div {
        height: 100%;
        &:nth-child(1) {
          flex-basis: 730px;
         flex-grow: 1;
         position: relative;
         img {
          width: 100%;
          height: 100%;
         }
         .center-circle {
           position: absolute;
           bottom: 10px;
           left: 50%;
           transform: translateX(-50%);
           display: flex;
           > span {
             display: flex;
             justify-content: center;
             align-items: center;
             width: 20px;
             height: 20px;
             background-color: transparent;
             margin: 0 2px;
             cursor: pointer;
             > span {
               display: inline-block;
               width: 6px;
               height: 6px;
               border-radius: 50%;
               background-color: #ccc;
             }
           }
         }
        }
        &:nth-child(2) {
          flex-basis: 250px;
          background: url(https://s2.music.126.net/style/web2/img/index/download.jpg?965a94c87533ccbde73106bea32344d9) no-repeat;
          background-size: 100% 130%;
          position: relative;
          span {
            font-size: 12px;
            color: #8d8d8d;
            position: absolute;
            bottom: 5px;
            left: 13px;
          }
        }
      }
    }
  }
  .main-container {
    width: 980px;
    margin: 0 auto;
    display: flex;
    div {
      height: 200px;
      &:nth-child(1) {
        flex-grow: 1;
      }
      &:nth-child(2) {
        flex-basis: 250px;
      }
    }
  }
}
</style>