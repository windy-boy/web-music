const userRouter = [
  {
    path: '/',
    name: '/',
    component: () => import('@c/main'),
    children: [
      {
        path: '/find-music',
        name: 'find-music',
        title: '发现音乐',
        component: () => import('@/view/find-music'),
        children: [
          {
            path: 'recommend',
            name: 'recommend',
            title: '推荐',
            component: () => import('@/view/find-music/recommend')
          },
          {
            path: 'leaderboard',
            name: 'leaderboard',
            title: '排行榜',
            component: () => import('@/view/find-music/leaderboard')
          },
          {
            path: 'song-list',
            name: 'song-list',
            title: '歌单',
            component: () => import('@/view/find-music/song-list')
          },
          {
            path: 'anchor-radio',
            name: 'anchor-radio',
            title: '主播电台',
            component: () => import('@/view/find-music/anchor-radio')
          },
          {
            path: 'singer',
            name: 'singer',
            title: '歌手',
            component: () => import('@/view/find-music/singer')
          },
          {
            path: 'new-disc-shelf',
            name: 'new-disc-shelf',
            title: '新碟上架',
            component: () => import('@/view/find-music/new-disc-shelf')
          },
        ]
      },
      {
        path: '/me-music',
        name: 'me-music',
        title: '我的音乐',
        component: () => import('@/view/me-music')
      },
      {
        path: '/mall',
        name: 'mall',
        title: '商城',
        component: () => import('@/view/mall')
      },
      {
        path: '/friends',
        name: 'friends',
        title: '朋友',
        component: () => import('@/view/friends')
      },
      {
        path: '/musician',
        name: 'musician',
        title: '音乐人',
        component: () => import('@/view/musician')
      },
      {
        path: '/download-client',
        name: 'download-client',
        title: '下载客户端',
        component: () => import('@/view/download-client')
      },
    ]
  },

]

export default [...userRouter]