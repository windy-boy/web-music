import { getPlayListDetail } from "@/api/index";
const song = {
  state: {
    songList: []
  },
  mutations: {
    SET_SONG_LIST(state, list) {
      state.songList = list;
    }
  },
  actions: {
    handleGetPlayListDetail({ commit }, params) {
      getPlayListDetail(params).then(res => {
        if (res.data.code === 200) {
          commit("SET_SONG_LIST", res.data.playlist.tracks);
        }
      });
    }
  }
};
export default song;
