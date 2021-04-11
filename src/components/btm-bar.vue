<template>
  <div class="btm-bar-container" ref="btm-bar-container">
    <div class="main-container">
      <div class="play-btns">
        <a class="m-playbar" href="javascript:;" title="上一首(ctrl+←)">
          上一首
        </a>
        <a
          class="m-playbar"
          :class="play ? 'play' : 'paused'"
          href="javascript:;"
          title="播放/暂停(p)"
          @click="handlePlayBtn"
        >
          播放/暂停
        </a>
        <a class="m-playbar" href="javascript:;" title="下一首(ctrl+→)"
          >下一首</a
        >
      </div>
      <div class="head">
        <img :src="songItem.al.picUrl" alt="" v-if="songItemLength !== 0" />
        <img
          src="http://s4.music.126.net/style/web2/img/default/default_album.jpg"
          alt=""
          v-if="songItemLength === 0"
        />
      </div>
      <div class="play-info">
        <div class="top-info">
          <a
            v-if="songItemLength !== 0"
            href="javascript:;"
            class="a-nowrap"
            title=""
            >{{ songItem.name }}</a
          >
          <a
            v-if="songItemLength !== 0"
            href="javascript:;"
            class="m-playbar"
            title="MV"
          ></a>
          <span v-if="songItemLength !== 0" class="a-nowrap">
            <span>
              <a href="javascript:;">{{ songItem.ar.name }}</a>
            </span>
          </span>
        </div>
        <div class="bottom-info">
          <div class="barbg" ref="barbg" @mousedown="handleChangePlayTime">
            <div class="rdy" ref="rdy"></div>
            <div class="cur" ref="cur">
              <span
                class="m-pbar btn red-circle-btn"
                @mousedown="handleMouseDown"
              >
                <i></i>
              </span>
            </div>
          </div>
          <div class="time">
            <span>{{ audioCurrentTime }}</span>
            /
            <span>{{ audioAllTime }}</span>
          </div>
        </div>
      </div>
      <div class="oper">
        <a href="javascript:;" title="收藏" class="m-playbar"></a>
        <a href="javascript:;" title="分享" class="m-playbar"></a>
      </div>
      <div class="ctrl m-playbar">
        <div></div>
        <a
          href="javascript:;"
          class="m-playbar"
          @click="handleShowOrHideVoice"
        ></a>
        <a href="javascript:;" class="m-playbar" title="随机"></a>
        <span @click="handleShowList">
          <a href="javascript:;" class="m-playbar" title="播放列表">
            {{ songList.length }}
          </a>
        </span>
        <div class="voice" ref="voice">
          <div class="bar m-playbar"></div>
          <div class="voice-container" ref="voice-container">
            <div class="poit" @mousedown="handleChangeVoice"></div>
            <div class="curr m-playbar" ref="curr"></div>
            <span
              class="f-alpha btn"
              ref="alpha"
              style="top: 0px"
              @mousedown="handleMouseDownVoice"
            ></span>
          </div>
        </div>
      </div>
      <div class="list" v-show="showList">
        <div class="listhd">
          <div class="listhdc">
            <h4>
              播放列表(<span>61</span>)
            </h4>
            <a href="javascript:;" class="addall">
              <span class="ico ico-add m-playbar "></span>
              收藏全部
            </a>
            <span class="line"></span>
            <a href="javascript:;" class="clear">
              <span class="ico ico-del"></span>
              清除
            </a>
            <p class="lytit">{{ songItem.name }}</p>
            <span class="close ico">关闭</span>
          </div>
        </div>
        <div class="listbd">
          <img
            class="imgbg"
            src="https://p3.music.126.net/HQl-dmEY2xPeh3xhonFArg==/109951164565671055.jpg"
            alt=""
          />
          <div class="msk"></div>
          <div class="displayY">
            <div class="listbdc">
              <ul>
                <li
                  v-for="(item, index) in songList"
                  :key="index"
                  @click="handleChangeSong(item)"
                >
                  <div class="col col-1"></div>
                  <div class="col col-2">{{ item.name }}</div>
                  <div class="col col-3">
                    <div class="icns">
                      <i title="删除" class="ico icn-del">删除</i>
                      <i title="下载" class="ico ico-dl">下载</i>
                      <i title="分享" class="ico ico-share">分享</i>
                      <i title="收藏" class="j-t ico ico-add">收藏</i>
                    </div>
                  </div>
                  <div class="col col-4">
                    <span>
                      <a href="javascript:;">{{ item.ar[0].name }}</a>
                    </span>
                  </div>
                  <div class="col col-5">{{ item.songTime }}</div>
                  <div class="col col-6">
                    <div class="ico" title="来自神秘的百慕大……"></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="bline"></div>
          <div class="msk2"></div>
          <div class="listlyric"></div>
          <div class="bline bline-1"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getSongUrl, getSongLyric } from "@/api/index";
import dateTools from "@/utils/dateTools.js";
import songUtils from "@/utils/songUtils.js";
export default {
  data() {
    return {
      songItem: {},
      songUrl: "",
      audio: "",
      audioAllTime: "00:00",
      audioCurrentTime: "00:00",
      playTimer: "",
      play: false,
      mCurRate: 0,
      mRdyRate: 0,
      showList: false,
      prentRdyInterval: "",
      lyric: "",
      tlyric: "",
      mergeLyric: []
    };
  },
  computed: {
    ...mapState({
      songList: state => state.song.songList
    }),
    songItemLength() {
      return Object.keys(this.songItem).length;
    }
  },
  watch: {
    songList(val) {
      this.songItem = val[0];
      this.handleGetSongUrl();
      val.forEach((item, index) => {
        songUtils.getSongTime(item.id).then(res => {
          this.songList[index].songTime = res;
        });
      });
    },
    songUrl(val) {
      this.playAudio(val);
    },
    songItem() {
      this.handleGetSongUrl();
      this.handleGetSongLyric();
    }
  },
  methods: {
    handleGetSongLyric() {
      getSongLyric({ id: this.songItem.id }).then(res => {
        if (res.data.code === 200) {
          console.log(res.data, "555");
          this.lyric = res.data.lrc.lyric;
          this.tlyric = res.data.tlyric.lyric;
        }
      });
    },
    handleChangeSong(item) {
      this.mRdyRate = 0;
      clearInterval(this.prentRdyInterval);
      this.songItem = item;
    },
    handleShowList() {
      this.showList = !this.showList;
    },
    handleShowOrHideVoice(e) {
      e.stopPropagation();
      if (window.getComputedStyle(this.$refs.voice).display === "none") {
        this.$refs.voice.style.display = "block";
      } else {
        this.$refs.voice.style.display = "none";
      }
      document.onmousedown = evt => {
        if (
          evt.target.className !== "voice-container" &&
          evt.target.className !== "m-playbar" &&
          window.getComputedStyle(this.$refs.voice).display === "block"
        ) {
          this.$refs.voice.style.display = "none";
        }
      };
    },
    handleChangeVoice(e) {
      e.stopPropagation();
      this.$refs.alpha.style.top = e.offsetY + "px";
      if (this.$refs.alpha.style.top.split("p")[0] < 0) {
        this.$refs.alpha.style.top = "0px";
      }
      if (this.$refs.alpha.style.top.split("p")[0] > 90) {
        this.$refs.alpha.style.top = "90px";
      }
      this.$refs.curr.style.height = 100 - e.offsetY + "px";
      if (this.songList.length !== 0) {
        this.audio.volume = this.$refs.curr.clientHeight / 100;
      }
    },
    handleMouseDownVoice(e) {
      e = e || window.event;
      e.stopPropagation();
      const _h = this.$refs.curr.clientHeight;
      const _top = +this.$refs.alpha.style.top.split("p")[0];
      const _pageY = e.pageY;
      this.$refs["voice-container"].onmousemove = evt => {
        evt = evt || window.event;
        evt.stopPropagation();
        if (evt.pageY < _pageY) {
          // 向上
          this.$refs.curr.style.height = _h + (_pageY - evt.pageY) + "px";
          this.$refs.alpha.style.top = _top - (_pageY - evt.pageY) + "px";
          if (this.$refs.curr.clientHeight > 100) {
            this.$refs.curr.style.height = "100px";
          }
          if (this.$refs.alpha.style.top.split("p")[0] < 0) {
            this.$refs.alpha.style.top = "0px";
          }
        } else {
          // 向下
          this.$refs.curr.style.height = _h - (evt.pageY - _pageY) + "px";
          this.$refs.alpha.style.top = _top + (evt.pageY - _pageY) + "px";
          if (this.$refs.alpha.style.top.split("p")[0] > 90) {
            this.$refs.alpha.style.top = "90px";
          }
        }
        if (this.songList.length !== 0) {
          this.audio.volume = this.$refs.curr.clientHeight / 100;
        }
      };
      document.onmouseup = () => {
        this.$refs["voice-container"].onmousemove = null;
      };
    },
    handleMouseDown(e) {
      e.stopPropagation();
      if (this.songItemLength !== 0) {
        this.audio.pause();
        clearInterval(this.playTimer);
      }
      const startX = e.clientX;
      const curW = this.$refs.cur.clientWidth;
      let _wRate = this.$refs.cur.clientWidth / 493;
      document.onmousemove = evt => {
        evt.stopPropagation();
        if (evt.pageX > startX) {
          // 向左
          let b = evt.pageX - startX + curW;
          _wRate = b / 493;
          if (_wRate > 1) {
            _wRate = 1;
          }
        } else if (evt.pageX < startX) {
          // 向右
          let b = curW - (startX - evt.pageX);
          _wRate = b / 493;
          if (_wRate < 0) {
            _wRate = 0;
          }
        }
        this.$refs.cur.style.width = _wRate * 100 + "%";
      };
      document.onmouseup = ev => {
        ev.stopPropagation();
        document.onmousemove = null;
        if (this.songItemLength !== 0) {
          this.audio.currentTime = this.audio.duration * _wRate;
          this.audio.play();
          this.intervalFn();
        }
      };
      document
        .querySelector("#find-music-box")
        .addEventListener("mouseenter", () => {
          document.onmousemove = null;
        });
    },
    handleChangePlayTime(e) {
      e = e || window.event;
      e.stopPropagation();
      if (this.songList.length !== 0 && !this.audio.paused) {
        this.audio.pause();
      }
      clearInterval(this.playTimer);
      const mcurRate = e.offsetX / 493;
      this.$refs.cur.style.width = mcurRate * 100 + "%";
      if (this.songList.length !== 0 && !this.audio.paused) {
        this.audio.currentTime = this.audio.duration * mcurRate;
        this.audio.play();
      }
      this.intervalFn();
      document.onmouseup = evt => {
        //覆盖拖动的mouseup事件
        evt.stopPropagation();
      };
    },
    handlePlayBtn() {
      this.play = !this.play;
      if (this.play) {
        this.audio.play();
        this.intervalFn();
      } else {
        this.audio.pause();
        clearInterval(this.playTimer);
      }
    },
    handleGetSongUrl() {
      getSongUrl({ id: this.songItem.id }).then(res => {
        if (res.data.code === 200) {
          this.songUrl = res.data.data[0].url;
        }
      });
    },
    canPlay(url) {
      return new Promise((resolve, reject) => {
        this.audio = new Audio(url);
        if (this.audio.canPlayType("audio/mpeg")) {
          resolve(true);
        } else {
          reject("this brower not support mp3");
        }
      });
    },
    intervalFn() {
      clearInterval(this.playTimer);
      this.playTimer = setInterval(() => {
        if (this.songItemLength === 0) return;
        this.audioCurrentTime = dateTools.SecondToMS(this.audio.currentTime);
        this.mCurRate = (this.audio.currentTime / this.audio.duration) * 100;
        this.$refs.cur.style.width = this.mCurRate + "%";
        if (this.audio.ended) {
          this.mCurRate = 0;
          this.play = false;
          clearInterval(this.playTimer);
        }
      }, 1000);
    },
    playAudio(val) {
      this.canPlay(val).then(res => {
        if (res) {
          const prentRdy = 100 / 12;
          this.prentRdyInterval = setInterval(() => {
            this.mRdyRate += prentRdy;
            if (this.mRdyRate < 100) {
              this.$refs.rdy.style.width = this.mRdyRate + "%";
            } else {
              this.mRdyRate = 0;
              clearInterval(this.prentRdyInterval);
            }
          }, 1000);
          this.audio.addEventListener("durationchange", () => {
            this.audioAllTime = dateTools.SecondToMS(this.audio.duration);
            this.audioCurrentTime = dateTools.SecondToMS(
              this.audio.currentTime
            );
          });
          this.audio.addEventListener("canplay", () => {
            this.audio.play();
            this.play = true;
          });
          clearInterval(this.playTimer);
          this.intervalFn();
        } else {
          this.$Message.error(res);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../styles/common.less";
.a-nowrap {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.btm-bar-container {
  width: 100%;
  height: 53px;
  background-position: 0 0;
  background-repeat: repeat-x;
  position: fixed;
  bottom: 0;
  left: 0;
  user-select: none;
  .main-container {
    width: 980px;
    height: 47px;
    margin: 0 auto;
    display: flex;
    margin-top: 5px;
    .play-btns {
      flex-basis: 137px;
      flex-grow: 0;
      display: flex;
      padding-top: 6px;
      .play {
        background-position: -40px -165px;
      }
      .paused {
        background-position: 0 -204px;
      }
      a {
        display: block;
        width: 28px;
        height: 28px;
        margin-right: 8px;
        margin-top: 5px;
        text-indent: -9999px;
        &:nth-child(1) {
          background-position: 0 -130px;
        }
        &:nth-child(2) {
          width: 36px;
          height: 36px;
          margin-top: 0;
        }
        &:nth-child(3) {
          background-position: -80px -130px;
        }
      }
      .a-hover {
        background-position: -40px -165px;
      }
    }
    .head {
      margin: 6px 13px 0 0;
      width: 34px;
      height: 34px;
      img {
        width: 34px;
        height: 34px;
      }
    }
    .play-info {
      flex-basis: 608px;
      flex-grow: 0;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      .top-info,
      .bottom-info {
        display: flex;
      }
      .top-info {
        height: 28px;
        overflow: hidden;
        color: #e8e8e8;
        text-shadow: 0 1px 0 #171717;
        line-height: 28px;
        > a {
          &:nth-child(1) {
            max-width: 300px;
            color: #e8e8e8;
          }
          &:nth-child(2) {
            width: 19px;
            height: 17px;
            margin: 6px 0 0 3px;
            background-position: 0 -57px;
          }
        }
        > span {
          max-width: 220px;
          margin-left: 15px;
          color: #9b9b9b;
          a {
            color: #9b9b9b;
          }
        }
      }
      .bottom-info {
        display: flex;
        .barbg {
          width: 493px;
          height: 9px;
          background-position: right 0;
          margin-top: 5px;
          position: relative;
          &-position {
            width: 100%;
            height: 100%;
            z-index: 2;
            position: absolute;
          }
          .rdy {
            height: 100%;
            background-position: right -30px;
            width: 0;
          }
          .cur {
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-position: left -66px;
            z-index: 1;
            > span {
              position: absolute;
              top: -7px;
              right: -13px;
              width: 22px;
              height: 24px;
              margin-left: -11px;
              background-position: 0 -250px;
              i {
                visibility: hidden;
                position: absolute;
                left: 5px;
                top: 5px;
                width: 12px;
                height: 12px;
                background: url(https://s2.music.126.net/style/web2/img/outchain/loading.gif?6e1555582e0a27c0037cf0da3696c098);
              }
            }
          }
        }
        .time {
          margin-left: 20px;
          color: #797979;
          text-shadow: 0 1px 0 #121212;
        }
      }
    }
    .oper {
      width: 60px;
      display: flex;
      margin-left: 20px;
      > a {
        display: block;
        width: 25px;
        height: 25px;
        margin: 11px 2px 0 0;
        text-indent: -9999px;
        &:nth-child(1) {
          background-position: -88px -163px;
        }
        &:nth-child(2) {
          background-position: -114px -163px;
        }
      }
    }
    .ctrl {
      width: 124px;
      padding-left: 13px;
      background-position: -147px -238px;
      position: relative;
      display: flex;
      z-index: 999;
      > a {
        float: left;
        width: 25px;
        height: 25px;
        margin: 11px 2px 0 0;
        text-indent: -9999px;
        &:nth-child(2) {
          background-position: -2px -248px;
        }
        &:nth-child(2):hover {
          background-position: -31px -248px;
        }
        &:nth-child(3) {
          background-position: -66px -248px;
        }
      }
      > span {
        width: 59px;
        height: 36px;
        > a {
          display: block;
          float: none;
          width: 60px;
          height: 25px;
          margin: 11px 2px 0 0;
          padding-left: 21px;
          background-position: -42px -68px;
          line-height: 27px;
          text-align: center;
          color: #666;
          text-shadow: 0 1px 0 #080707;
          text-indent: 0;
          text-decoration: none;
          &:hover {
            background-position: -42px -98px;
          }
        }
      }
    }
    .voice {
      display: none;
      position: absolute;
      bottom: 46px;
      left: 5px;
      width: 32px;
      height: 113px;
      background-position: -147px -238px;
      .bar {
        position: absolute;
        top: 0;
        left: 0;
        width: 32px;
        height: 113px;
        background-position: 0 -503px;
      }
      .voice-container {
        width: 100%;
        height: 100%;
        position: relative;
        .poit {
          width: 4px;
          height: 100px;
          position: absolute;
          top: auto;
          bottom: 9px;
          left: 15px;
          z-index: 2;
        }
        .curr {
          width: 4px;
          height: 100px;
          position: absolute;
          top: auto;
          bottom: 9px;
          left: 15px;
          background-position: -40px bottom;
          overflow: hidden;
          z-index: 1;
        }
        .f-alpha {
          position: absolute;
          display: block;
          width: 100%;
          height: 20px;
          background-position: -33px -250px;
          z-index: 3;
          cursor: pointer;
          &:hover {
            background-position: -33px -280px;
          }
        }
      }
    }
    .list {
      position: absolute;
      left: 50%;
      bottom: 47px;
      width: 986px;
      height: 301px;
      margin-left: -493px;
      .listhd {
        background-position: 0 0;
        height: 41px;
        padding: 0 5px;
        .listhdc {
          position: relative;
          height: 40px;
          h4 {
            position: absolute;
            left: 25px;
            top: 0;
            height: 39px;
            line-height: 39px;
            font-size: 14px;
            color: #e2e2e2;
          }
          .addall {
            position: absolute;
            left: 398px;
            top: 12px;
            height: 15px;
            line-height: 15px;
            cursor: pointer;
            color: #ccc;
            .ico-add {
              float: left;
              margin: 1px 6px 0 0;
              width: 16px;
              background-position: -24px 0;
              height: 16px;
            }
          }
          .line {
            position: absolute;
            top: 13px;
            left: 481px;
            height: 15px;
            border-left: 1px solid #000;
            border-right: 1px solid #2c2c2c;
          }
          .clear {
            position: absolute;
            left: 490px;
            top: 12px;
            height: 15px;
            line-height: 15px;
            cursor: pointer;
            color: #ccc;
            .ico-del {
              float: left;
              margin: 1px 6px 0 0;
              width: 13px;
              background-position: -51px 0;
              height: 16px;
            }
          }
          .lytit {
            position: absolute;
            left: 595px;
            top: 0;
            width: 346px;
            text-align: center;
            height: 39px;
            line-height: 39px;
            color: #fff;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
          }
          .close {
            position: absolute;
            top: 6px;
            right: 8px;
            width: 30px;
            height: 30px;
            overflow: hidden;
            text-indent: -999px;
            cursor: pointer;
            background-position: -195px 9px;
          }
        }
      }
      .listbd {
        position: absolute;
        left: 0;
        top: 41px;
        width: 984px;
        height: 260px;
        overflow: hidden !important;
        padding: 0 5px;
        background-position: -1014px 0;
        background-repeat: repeat-y;
        > img {
          position: absolute;
          left: 2px;
          top: -306px;
          z-index: 1;
          width: 980px;
          height: auto;
          opacity: 0.2;
        }
        .msk {
          position: absolute;
          left: 2px;
          top: 0;
          z-index: 2;
          width: 558px;
          height: 260px;
          background: #121212;
          opacity: 0.5;
        }
        .displayY {
          overflow: hidden;
          position: relative;
          width: 538px;
          height: 260px;
          .listbdc {
            position: absolute;
            left: 2px;
            top: 0;
            z-index: 4;
            height: 260px;
            width: 553px;
            color: #9b9b9b;
            font-size: 12px;
            overflow-y: scroll;
            overflow-x: hidden;
            overscroll-behavior: contain;
            -ms-scroll-chaining: contain;
            &::-webkit-scrollbar {
              display: none;
            }
            ul {
              width: 538px;
              height: 260px;
            }
            > ul li::after {
              content: "";
              display: block;
              clear: both;
            }
            a {
              color: #9b9b9b;
            }
            li:hover {
              color: #fff;
              background-color: rgba(0, 0, 0, 0.4);
              a {
                color: #fff;
              }
              .col-3 .icns {
                display: inline-block;
              }
            }
            .col {
              float: left;
              padding-left: 10px;
              height: 28px;
              line-height: 28px;
              overflow: hidden;
              cursor: pointer;
              text-align: left;
            }
            .col-1 {
              width: 10px;
            }
            .col-2 {
              width: 256px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .col-3 {
              width: 110px;
              position: relative;
              .icns {
                display: none;
                position: absolute;
                right: 0;
                top: 0;
                width: 100px;
                height: 23px;
                .ico {
                  float: right;
                  overflow: hidden;
                  margin: 7px 0 0 10px;
                  text-indent: -9999px;
                  height: 16px;
                }
                .icn-del {
                  width: 13px;
                  background-position: -51px 0;
                }
                .ico-dl {
                  width: 14px;
                  background-position: -57px -50px;
                }
                .ico-share {
                  width: 14px;
                  background-position: 0 0;
                }
                .ico-add {
                  width: 16px;
                  background-position: -24px 0;
                }
              }
            }
            .col-4 {
              width: 70px;
            }
            .col-5 {
              width: 50px;
            }
            .col-6 {
              width: 37px;
              padding-left: 6px;
              float: right;
              > div {
                width: 14px;
                height: 14px;
                margin-top: 8px;
                margin-left: 0;
                background-position: -80px 0px;
              }
            }
          }
        }
        .bline {
          position: absolute;
          left: 555px;
          top: -1px;
          z-index: 2;
          width: 6px;
          height: 260px;
          background: #000;
          opacity: 0.5;
        }
        .bline-1 {
          left: auto;
          right: 0px;
        }
        .msk2 {
          position: absolute;
          left: 560px;
          top: 0;
          z-index: 3;
          width: 420px;
          height: 250px;
          background: #121212;
          opacity: 0.01;
        }
        .listlyric {
          position: absolute;
          right: 40px;
          top: 0;
          z-index: 4;
          margin: 21px 0 20px 0;
          height: 219px;
          width: 354px;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
