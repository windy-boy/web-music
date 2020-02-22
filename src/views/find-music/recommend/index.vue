<template>
  <div class="recommend" v-if="imageUrlList.length !== 0">
    <div
      class="banner-container"
      :style="
        'background-image:url(' +
          imageUrlList[imageUrlIndex] +
          '?imageView&blur=40x20' +
          ')'
      "
      @mouseenter="handleMove(true)"
      @mouseleave="handleMove(false)"
    >
      <div class="left">
        <div @click="handleClickToChangeImgIndex(1)"></div>
      </div>
      <div class="center">
        <div>
          <img
            :src="imageUrlList[imageUrlIndex]"
            alt=""
            :style="
              'transition: opacity 1s ease-in-out 0s; opacity: ' + opacityV
            "
          />
          <div class="center-circle">
            <span
              v-for="(item, index) in imageUrlList"
              :key="index"
              @click="changeImageIndex(index)"
            >
              <span
                :style="imageUrlIndex === index ? 'background-color: red' : ''"
              ></span>
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
      <div>
        <div class="main-hot-recommend">
          <div class="main-hot-recommend-title main-title v-hd2">
            <a href="javascript:;" class="main-title-a">热门推荐</a>
            <div>
              <a href="javascript:;">华语</a>
              <span>|</span>
              <a href="javascript:;">流行</a>
              <span>|</span>
              <a href="javascript:;">摇滚</a>
              <span>|</span>
              <a href="javascript:;">民谣</a>
              <span>|</span>
              <a href="javascript:;">电子</a>
              <span>|</span>
            </div>
            <span class="main-title-span">
              <a href="javascript:;">更多</a>
              <i class="s-bg"></i>
            </span>
          </div>
          <div class="main-hot-recommend-container">
            <ul>
              <li v-for="(item, index) in hotRecommend" :key="index">
                <div>
                  <img :src="item.picUrl" alt="" />
                  <i class="u-icn2" v-if="isShowChampion === index"></i>
                  <a href="javascript:;" :title="item.name"></a>
                  <div class="button">
                    <a
                      href="javascript:;"
                      class="icon-play"
                      @click="handleGetDetail(item.id)"
                    ></a>
                    <span class="icon-headset"></span>
                    <span>{{ listenerCount[index] }}</span>
                  </div>
                </div>
                <p>
                  <a href="javascript:;" :title="item.name">
                    <i class="u-icn" v-if="item.program"></i>
                    {{ item.name }}
                  </a>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div class="new-disc-put">
            <div class="new-disc-upload-title main-title v-hd2">
              <a href="javascript:;" class="main-title-a">榜单</a>
              <span class="main-title-span">
                <a href="javascript:;">更多</a>
                <i class="s-bg"></i>
              </span>
            </div>
            <div class="new-disc-put-container">
              <div>
                <span @click="handleChangeBD(1)"></span>
                <div v-if="albumNewestList2.length !== 0">
                  <ul
                    :style="'left: ' + ulLeftOfStyle[0] + 'px'"
                    class="mk-transition-none"
                  >
                    <li v-for="(item, index) in albumNewestList1" :key="index">
                      <div>
                        <img :src="item.picUrl" alt="" />
                        <a
                          href="javascript:;"
                          :title="item.name"
                          class="msk"
                        ></a>
                        <a
                          href="javascript:;"
                          title="播放"
                          class="icon-play"
                        ></a>
                      </div>
                      <p>
                        <a href="javascript:;" :title="item.name">{{
                          item.name
                        }}</a>
                      </p>
                      <p>
                        <a href="javascript:;">{{ item.artist.name }}</a>
                      </p>
                    </li>
                  </ul>
                  <ul
                    :style="'left: ' + ulLeftOfStyle[1] + 'px'"
                    class="mk-transition-none"
                  >
                    <li v-for="(item, index) in albumNewestList2" :key="index">
                      <div>
                        <img :src="item.picUrl" alt="" />
                        <a
                          href="javascript:;"
                          :title="item.name"
                          class="msk"
                        ></a>
                        <a
                          href="javascript:;"
                          title="播放"
                          class="icon-play"
                        ></a>
                      </div>
                      <p>
                        <a href="javascript:;" :title="item.name">{{
                          item.name
                        }}</a>
                      </p>
                      <p>
                        <a href="javascript:;">{{ item.artist.name }}</a>
                      </p>
                    </li>
                  </ul>
                  <ul
                    :style="'left: ' + ulLeftOfStyle[2] + 'px'"
                    class="mk-transition-none"
                  >
                    <li v-for="(item, index) in albumNewestList1" :key="index">
                      <div>
                        <img :src="item.picUrl" alt="" />
                        <a
                          href="javascript:;"
                          :title="item.name"
                          class="msk"
                        ></a>
                        <a
                          href="javascript:;"
                          title="播放"
                          class="icon-play"
                        ></a>
                      </div>
                      <p>
                        <a href="javascript:;" :title="item.name">{{
                          item.name
                        }}</a>
                      </p>
                      <p>
                        <a href="javascript:;">{{ item.artist.name }}</a>
                      </p>
                    </li>
                  </ul>
                  <ul
                    :style="'left: ' + ulLeftOfStyle[3] + 'px'"
                    class="mk-transition-none"
                  >
                    <li v-for="(item, index) in albumNewestList2" :key="index">
                      <div>
                        <img :src="item.picUrl" alt="" />
                        <a
                          href="javascript:;"
                          :title="item.name"
                          class="msk"
                        ></a>
                        <a
                          href="javascript:;"
                          title="播放"
                          class="icon-play"
                        ></a>
                      </div>
                      <p>
                        <a href="javascript:;" :title="item.name">{{
                          item.name
                        }}</a>
                      </p>
                      <p>
                        <a href="javascript:;">{{ item.artist.name }}</a>
                      </p>
                    </li>
                  </ul>
                </div>
                <span @click="handleChangeBD(0)"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="billboard">
          <div class="v-hd2">
            <a href="javascript:;">榜单</a>
            <span>
              <a href="javascript:;">更多</a>
              <i class="s-bg"></i>
            </span>
          </div>
          <div class="n-bilst">
            <div class="bill-top">
              <div v-for="(item, index) in billList" :key="index">
                <div>
                  <img :src="item.coverImgUrl" alt="" />
                  <a href="javascript:;" :title="item.name"></a>
                </div>
                <div>
                  <a href="javascript:;" :title="item.name">
                    <h3>{{ item.name }}</h3>
                  </a>
                  <div>
                    <a href="javascript:;" title="播放" class="s-bg"></a>
                    <a href="javascript:;" title="收藏" class="s-bg"></a>
                  </div>
                </div>
              </div>
            </div>
            <div class="bill-song-list">
              <div v-for="(item, index) in songList" :key="index">
                <ul>
                  <li v-for="(option, idx) in item" :key="idx">
                    <span>{{ idx + 1 }}</span>
                    <a href="javascript:;" :title="option.name">{{
                      option.name
                    }}</a>
                    <div class="oper">
                      <a href="javascript:;" class="s-bg" title="播放"></a>
                      <a
                        href="javascript:;"
                        class="u-icn"
                        title="添加到播放列表"
                      ></a>
                      <a href="javascript:;" class="s-bg" title="收藏"></a>
                    </div>
                  </li>
                </ul>
                <div class="more">
                  <a href="javascript:;">查看全部></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="not-login s-bg">
          <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
          <a href="javascript:;" class="s-bg">用户登录</a>
        </div>
        <div>
          <h3>
            <span>入驻歌手</span>
            <a href="javascript:;">查看全部</a>
          </h3>
          <ul>
            <li v-for="(item, index) in songerList" :key="index">
              <a href="javascript:;">
                <img :src="item.picUrl" alt="" />
                <div>
                  <h4 v-if="item.alias.length > 1">
                    {{ item.name }} {{ item.alias[0] }}
                  </h4>
                  <h4 v-else>{{ item.name }}</h4>
                  <p v-if="item.briefDesc">{{ item.briefDesc }}</p>
                </div>
              </a>
            </li>
          </ul>
          <div>
            <a href="javascript:;" class="u-btn"
              ><span class="u-btn">申请成为网易音乐人</span></a
            >
          </div>
        </div>
        <div>
          <h3>热门主播</h3>
          <ul>
            <li v-for="(item, index) in zhuboList" :key="index">
              <a href="javascript:;">
                <img :src="item.picUrl" alt="" />
              </a>
              <div>
                <p>
                  <a href="javascript:;">{{ item.name }}</a>
                  <span class="u-icn"></span>
                </p>
                <p>{{ item.desc }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getBanner,
  getAlbumNewest,
  getPersonalized,
  getDJprogram,
  getTopList,
  getTopSongList,
  getArtistSettinList
} from "@/api/index";
export default {
  data() {
    return {
      imageUrlList: [],
      imageUrlIndex: 0,
      opacityV: 1,
      interval: null,
      antiShake: true,
      albumNewestList1: [],
      albumNewestList2: [],
      ulLeftOfStyle: [-645, 0, 645, 645],
      hotRecommend: [],
      listenerCount: [],
      isShowChampion: -1,
      billList: [],
      songList: [],
      billType: [3, 0, 2], // 榜单类型 3 飙升 0 新歌 2原创
      songerList: [],
      zhuboList: [
        {
          picUrl:
            "http://p2.music.126.net/H3QxWdf0eUiwmhJvA4vrMQ==/1407374893913311.jpg?param=40y40",
          name: "陈立",
          desc: "心理学家、美食家陈立教授"
        },
        {
          picUrl:
            "http://p2.music.126.net/y5-sM7tjnxnu_V9LWKgZlw==/7942872001461517.jpg?param=40y40",
          name: "DJ艳秋",
          desc: "著名音乐节目主持人"
        },
        {
          picUrl:
            "http://p2.music.126.net/6cc6lgOfQTo6ovNnTHPyJg==/3427177769086282.jpg?param=40y40",
          name: "国家大剧院古典音乐频道",
          desc: "国家大剧院古典音乐官方"
        },
        {
          picUrl:
            "http://p2.music.126.net/xa1Uxrrn4J0pm_PJwkGYvw==/3130309604335651.jpg?param=40y40",
          name: "谢谢收听",
          desc: "南京电台主持人王馨"
        },
        {
          picUrl:
            "http://p2.music.126.net/slpd09Tf5Ju82Mv-h8MP4w==/3440371884651965.jpg?param=40y40",
          name: "DJ晓苏",
          desc: "独立DJ，CRI环球旅游广播特邀DJ"
        }
      ]
    };
  },
  mounted() {
    this.handleGetBanner();
    this.setImageUrl();
    this.handleGetAlbumNewest();
    this.handleGetPersonalized();
    this.handleGetTopList(),
      this.handleGetTopSongList(),
      this.handleGetArtistSettinList();
  },
  methods: {
    handleGetBanner() {
      getBanner().then(res => {
        if (res.data.code === 200) {
          res.data.banners.forEach(item => {
            this.imageUrlList.push(item.imageUrl);
          });
        }
      });
    },
    changeImageUrl() {
      const len = this.imageUrlList.length;
      if (this.imageUrlIndex < len - 1) {
        this.imageUrlIndex++;
      } else {
        this.imageUrlIndex = 0;
      }
    },
    setImageUrl() {
      this.interval = setInterval(() => {
        this.opacityV = 0.2;
        setTimeout(() => {
          this.changeImageUrl();
          this.opacityV = 1;
        }, 1000);
      }, 5000);
    },
    handleMove(type) {
      if (type) {
        clearInterval(this.interval);
      } else {
        this.setImageUrl();
      }
    },
    changeImageIndex(idx) {
      this.imageUrlIndex = idx;
    },
    handleClickToChangeImgIndex(type) {
      type ? this.imageUrlIndex-- : this.imageUrlIndex++;
      if (this.imageUrlIndex > this.imageUrlList.length - 1) {
        this.imageUrlIndex = 0;
      }
      if (this.imageUrlIndex < 0) {
        this.imageUrlIndex = this.imageUrlList.length - 1;
      }
    },
    handleGetAlbumNewest() {
      getAlbumNewest().then(res => {
        if (res.data.code === 200 && res.data.albums.length >= 10) {
          this.albumNewestList1 = res.data.albums.slice(0, 5);
          this.albumNewestList2 = res.data.albums.slice(5, 10);
        }
      });
    },
    initULtransition() {
      document.querySelectorAll(".mk-transition-none")[0].style.transition =
        "none 1s ease 0s";
      document.querySelectorAll(".mk-transition-none")[1].style.transition =
        "none 1s ease 0s";
      document.querySelectorAll(".mk-transition-none")[2].style.transition =
        "none 1s ease 0s";
      document.querySelectorAll(".mk-transition-none")[3].style.transition =
        "none 1s ease 0s";
    },
    handleChangeBD(type) {
      if (type === 1 && this.antiShake) {
        this.antiShake = false;
        let idx = this.ulLeftOfStyle.indexOf(0);
        const lastIdx = this.ulLeftOfStyle.length - 1;
        if (idx > 0) {
          document.querySelectorAll(".mk-transition-none")[
            idx
          ].style.transition = "left 1s ease-out 0s";
          document.querySelectorAll(".mk-transition-none")[
            idx - 1
          ].style.transition = "left 1s ease-out 0s";
          this.ulLeftOfStyle.splice(idx, 1, 645);
          this.ulLeftOfStyle.splice(idx - 1, 1, 0);
          setTimeout(() => {
            this.initULtransition();
            if (idx === 1) {
              this.ulLeftOfStyle.splice(lastIdx, 1, -645);
            } else {
              this.ulLeftOfStyle.splice(idx - 2, 1, -645);
            }
            this.antiShake = true;
          }, 1000);
        } else if (idx === 0) {
          document.querySelectorAll(".mk-transition-none")[
            lastIdx
          ].style.transition = "left 1s ease-out 0s";
          document.querySelectorAll(".mk-transition-none")[
            idx
          ].style.transition = "left 1s ease-out 0s";
          this.ulLeftOfStyle.splice(lastIdx, 1, 0);
          this.ulLeftOfStyle.splice(idx, 1, 645);
          setTimeout(() => {
            this.initULtransition();
            this.ulLeftOfStyle.splice(lastIdx - 1, 1, -645);
            this.antiShake = true;
          }, 1000);
        }
      } else if (type === 0 && this.antiShake) {
        this.antiShake = false;
        let idx = this.ulLeftOfStyle.indexOf(0);
        const lastIdx = this.ulLeftOfStyle.length - 1;
        if (idx < lastIdx) {
          document.querySelectorAll(".mk-transition-none")[
            idx
          ].style.transition = "left 1s ease-out 0s";
          document.querySelectorAll(".mk-transition-none")[
            idx + 1
          ].style.transition = "left 1s ease-out 0s";
          this.ulLeftOfStyle.splice(idx, 1, -645);
          this.ulLeftOfStyle.splice(idx + 1, 1, 0);
          setTimeout(() => {
            this.initULtransition();
            if (idx === lastIdx - 1) {
              this.ulLeftOfStyle.splice(0, 1, 645);
            } else {
              this.ulLeftOfStyle.splice(idx + 2, 1, 645);
            }
            this.antiShake = true;
          }, 1000);
        } else if (idx === lastIdx) {
          document.querySelectorAll(".mk-transition-none")[0].style.transition =
            "left 1s ease-out 0s";
          document.querySelectorAll(".mk-transition-none")[
            idx
          ].style.transition = "left 1s ease-out 0s";
          this.ulLeftOfStyle.splice(0, 1, 0);
          this.ulLeftOfStyle.splice(idx, 1, -645);
          setTimeout(() => {
            this.initULtransition();
            this.ulLeftOfStyle.splice(1, 1, 645);
            this.antiShake = true;
          }, 1000);
        }
      }
    },
    handleGetPersonalized() {
      getPersonalized().then(res => {
        if (res.data.code === 200) {
          this.hotRecommend = res.data.result.slice(0, 5);
          this.handleGetDJprogram();
        }
      });
    },
    handleGetDJprogram() {
      getDJprogram().then(res => {
        if (res.data.code === 200) {
          this.hotRecommend.push(...res.data.result.slice(0, 3));
          let _hot = this.hotRecommend.slice(0, 3);
          _hot.push(...this.hotRecommend.slice(5, 6));
          _hot.push(...this.hotRecommend.slice(3, 4));
          _hot.push(...this.hotRecommend.slice(6, 7));
          _hot.push(...this.hotRecommend.slice(4, 5));
          _hot.push(...this.hotRecommend.slice(7, 8));
          this.hotRecommend = _hot;
          this.hotRecommend.forEach(item => {
            if (item.playCount) {
              this.listenerCount.push(item.playCount);
            } else {
              this.listenerCount.push(item.program.adjustedPlayCount);
            }
          });
          const _max = Math.max.apply(null, this.listenerCount);
          this.isShowChampion = this.listenerCount.indexOf(_max);
          let _count = [];
          this.listenerCount.forEach(item => {
            if (item < 100000) {
              _count.push(item);
            } else {
              const _c = parseInt(item / 10000) + "万";
              _count.push(_c);
            }
          });
          this.listenerCount = _count;
        }
      });
    },
    handleGetTopList() {
      getTopList().then(res => {
        if (res.data.code === 200) {
          this.billList = res.data.list.slice(0, 3);
        }
      });
    },
    handleGetTopSongList(idx = 3) {
      const param = {
        idx: idx
      };
      getTopSongList(param).then(res => {
        if (res.data.code === 200) {
          const _songList = res.data.playlist.tracks.slice(0, 10);
          this.songList.push(_songList);
          this.billType.shift(0);
          if (this.billType.length !== 0) {
            this.handleGetTopSongList(this.billType[0]);
          }
        }
      });
    },
    handleGetArtistSettinList() {
      const param = {
        cat: 5001
      };
      getArtistSettinList(param).then(res => {
        if (res.data.code === 200) {
          this.songerList = res.data.artists.slice(0, 5);
        }
      });
    },
    handleGetDetail(id) {
      const params = {
        id: id
      };
      this.$store.dispatch("handleGetPlayListDetail", params);
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../../../styles/common.less");
@import url("./index.less");
</style>
