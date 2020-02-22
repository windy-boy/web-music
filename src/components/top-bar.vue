<template>
  <div class="top-bar-container">
    <div class="top-bar-main">
      <div class="logo-container">
        <span></span>
        <span>WEB云音乐</span>
      </div>
      <div class="top-bar-title-container">
        <ul>
          <router-link to="/find-music">
            <li
              @click="handleChangeTitle(1)"
              :class="triangle[1] ? 'top-li-active' : ''"
            >
              发现音乐
              <span v-show="triangle[1]"></span>
            </li>
          </router-link>
          <router-link to="/me-music">
            <li
              @click="handleChangeTitle(2)"
              :class="triangle[2] ? 'top-li-active' : ''"
            >
              我的音乐
              <span v-show="triangle[2]"></span>
            </li>
          </router-link>
          <router-link to="/friends">
            <li
              @click="handleChangeTitle(3)"
              :class="triangle[3] ? 'top-li-active' : ''"
            >
              朋友
              <span v-show="triangle[3]"></span>
            </li>
          </router-link>
          <router-link to="/mall">
            <li
              @click="handleChangeTitle(4)"
              :class="triangle[4] ? 'top-li-active' : ''"
            >
              商城
              <span v-show="triangle[4]"></span>
            </li>
          </router-link>
          <router-link to="/musician">
            <li
              @click="handleChangeTitle(5)"
              :class="triangle[5] ? 'top-li-active' : ''"
            >
              音乐人
              <span v-show="triangle[5]"></span>
            </li>
          </router-link>
          <router-link to="/download-client">
            <li
              @click="handleChangeTitle(6)"
              :class="triangle[6] ? 'top-li-active' : ''"
            >
              下载客户端
              <span v-show="triangle[6]"></span>
            </li>
          </router-link>
        </ul>
        <span><Badge text="HOT"></Badge></span>
      </div>
      <div class="top-bar-other-container">
        <Input
          prefix="ios-search"
          placeholder="音乐/视频/电台/用户"
          style="width: 175px;"
        />
        <div>创作者中心</div>
        <div>登录</div>
      </div>
    </div>
    <div class="top-bar-hot">
      <div v-show="triangle[1]">
        <ul>
          <router-link to="/find-music/recommend">
            <li @click="handleChangeMusicType(1)">
              <span :class="musicType[0] === 1 ? 'top-span-active' : ''"
                >推荐</span
              >
            </li>
          </router-link>
          <router-link to="/find-music/leaderboard">
            <li @click="handleChangeMusicType(2)">
              <span :class="musicType[0] === 2 ? 'top-span-active' : ''"
                >排行榜</span
              >
            </li>
          </router-link>
          <router-link to="/find-music/song-list">
            <li @click="handleChangeMusicType(3)">
              <span :class="musicType[0] === 3 ? 'top-span-active' : ''"
                >歌单</span
              >
            </li>
          </router-link>
          <router-link to="/find-music/anchor-radio">
            <li @click="handleChangeMusicType(4)">
              <span :class="musicType[0] === 4 ? 'top-span-active' : ''"
                >主播电台</span
              >
            </li>
          </router-link>
          <router-link to="/find-music/singer">
            <li @click="handleChangeMusicType(5)">
              <span :class="musicType[0] === 5 ? 'top-span-active' : ''"
                >歌手</span
              >
            </li>
          </router-link>
          <router-link to="/find-music/new-disc-shelf">
            <li @click="handleChangeMusicType(6)">
              <span :class="musicType[0] === 6 ? 'top-span-active' : ''"
                >新碟上架</span
              >
            </li>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      triangle: {
        1: true,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false
      },
      musicType: [1],
      routerLink: ""
    };
  },
  methods: {
    handleChangeTitle(idx) {
      for (let index in this.triangle) {
        if (this.triangle.hasOwnProperty(index)) {
          this.triangle[index] = false;
        }
      }
      this.triangle[idx] = true;
    },
    handleChangeMusicType(type) {
      this.musicType = [];
      this.musicType.unshift(type);
    }
  }
};
</script>
<style lang="less" scoped>
.top-bar-container {
  width: 100%;
  background-color: #242424;
  .top-bar-main {
    width: 1100px;
    margin: 0 auto;
    height: 70px;
    box-sizing: border-box;
    border-bottom: 1px solid #333;
    display: flex;
    .logo-container {
      width: 176px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: default;
      span {
        &:nth-child(1) {
          display: inline-block;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: url("../assets/logo.png") no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(2) {
          display: inline-block;
          color: #fff;
          margin-left: 10px;
          font-size: 20px;
        }
      }
    }
    .top-bar-title-container {
      flex-grow: 1;
      position: relative;
      > span {
        display: inline-block;
        position: absolute;
        right: -10px;
        top: 8px;
        cursor: default;
        /deep/ .ivu-badge-count {
          box-shadow: none;
          height: 16px;
          line-height: 16px;
          width: 40px;
          border: none;
        }
      }
      ul {
        display: flex;
        height: 100%;
        margin: 0;
        padding: 0;
        align-items: center;
        a {
          flex-basis: 95px;
          flex-grow: 1;
          &:nth-child(3) {
            flex-basis: 65px;
          }
          &:nth-child(4) {
            flex-basis: 65px;
          }
          &:nth-child(5) {
            flex-basis: 80px;
          }
          &:nth-child(6) {
            flex-basis: 112px;
            flex-grow: 2;
          }
          li {
            user-select: none;
            text-align: center;
            color: #ccc;
            list-style: none;
            font-size: 14px;
            height: 70px;
            line-height: 70px;
            position: relative;
            &:hover {
              color: #fff;
              cursor: pointer;
              background-color: #000;
            }
            span {
              display: inline-block;
              width: 0;
              height: 0;
              border: 8px solid transparent;
              border-bottom: 8px solid #c20c0c;
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
            }
          }
        }
      }
    }
    .top-bar-other-container {
      width: 350px;
      height: 100%;
      display: flex;
      padding: 20px 0 20px 30px;
      /deep/ input {
        border-radius: 25px;
      }
      div {
        &:nth-child(2) {
          width: 90px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          color: #ccc;
          border: 1px solid #ccc;
          border-radius: 25px;
          margin-left: 15px;
          font-size: 12px;
          &:hover {
            color: #fff;
            border: 1px solid #fff;
            cursor: pointer;
          }
        }
        &:nth-child(3) {
          color: #787878;
          margin-left: 10px;
          margin-top: 6px;
          font-size: 12px;
          &:hover {
            color: #666;
            cursor: pointer;
          }
        }
      }
    }
  }
  .top-bar-hot {
    min-height: 5px;
    background-color: #c20c0c;
    border-bottom: 1px solid #a40011;
    > div {
      &:nth-child(1) {
        width: 1100px;
        margin: 0 auto;
        height: 40px;
        padding: 0 350px 0 176px;
        ul {
          width: 526px;
          height: 100%;
          display: flex;
          a {
            flex: 1;
            li {
              list-style: none;
              height: 40px;
              line-height: 40px;
              flex: 1;
              color: #fff;
              font-size: 12px;
              span {
                padding: 3px 13px;
                border-radius: 20px;
              }
              &:hover {
                cursor: pointer;
                span {
                  background-color: #9b0909;
                }
              }
            }
          }
        }
      }
    }
  }
  .top-li-active {
    background-color: #000;
  }
  .top-span-active {
    background-color: #9b0909;
  }
}
</style>