import util from "../libs/axios";

export function getBanner(params) {
  return util.get("/banner", { params });
}

/**
 * 获取歌单
 * @param order // new hot 对应最新和最热
 * @param cat // tag 类型
 * @param limit // 数量
 */
export function getPlayList(params) {
  return util.get("/top/playlist", { params });
}

/**
 * 获取歌单分类
 * @param params
 */
export function getPlayListCatList(params) {
  return util.get("/playlist/catlist", { params });
}

/**
 * 获取热门歌单分类
 * @param params
 */
export function getPlayListHot(params) {
  return util.get("/playlist/hot", { params });
}

/**
 * 获取热门新碟/最新专辑
 * @param params
 */
export function getAlbumNewest(params) {
  return util.get("/album/newest", { params });
}

// 推荐歌单/personalized以及推荐电台/personalized/djprogram   limit//数量

/**
 * 推荐歌单
 * @param
 */
export function getPersonalized(params) {
  return util.get("/personalized", { params });
}

/**
 * 推荐电台
 * @param
 */
export function getDJprogram(params) {
  return util.get("/personalized/djprogram", { params });
}

/**
 * 获取对应榜单下的歌曲
 * @param idx // 榜单id
 */
export function getTopSongList(params) {
  return util.get("/top/list", { params });
}

/**
 * 获取榜单内容摘要
 */
export function getTopListDetail(params) {
  return util.get("/toplist/detail", { params });
}

/**
 * 获取所有榜单
 */
export function getTopList(params) {
  return util.get("/toplist", { params });
}

/**
 * 获取入驻歌手
 * cat 歌手类型 5001 => 入驻歌手
 */
export function getArtistSettinList(params) {
  return util.get("/artist/list", { params });
}

/**
 * 获取歌单详情
 * id 歌单id
 */
export function getPlayListDetail(params) {
  return util.get("/playlist/detail", { params });
}

/**
 * 获取音乐url
 * id 音乐 id
 */
export function getSongUrl(params) {
  return util.get("/song/url", { params });
}

/**
 * 获取歌词
 * id 音乐id
 */
export function getSongLyric(params) {
  return util.get("/lyric", { params });
}
