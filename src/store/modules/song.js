import { getPlayListDetail } from '@/api/index'
const song = {
  state: {
    songList: []
  },
  mutations: {
    SET_SONG_LIST (state, list) {
      console.log(list, 33)
      state.songList = list
    }
  },
  actions: {
    handleGetPlayListDetail ({commit}, params) {
      console.log(params, 666)
      getPlayListDetail(params).then(res => {
        if (res.data.code === 200) {
          console.log(res.data.playlist.tracks, 22)
          commit('SET_SONG_LIST', res.data.playlist.tracks)
        }
      })
      
    }
  }
}
export default song