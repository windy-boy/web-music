const userRouter = [
  {
    path: "/",
    name: "/",
    component: () => import("@c/main"),
    children: [
      {
        path: "/find-music",
        name: "find-music",
        title: "发现音乐",
        component: () => import("@/views/find-music"),
        children: [
          {
            path: "recommend",
            name: "recommend",
            title: "推荐",
            component: () => import("@/views/find-music/recommend")
          },
          {
            path: "leaderboard",
            name: "leaderboard",
            title: "排行榜",
            component: () => import("@/views/find-music/leaderboard")
          },
          {
            path: "song-list",
            name: "song-list",
            title: "歌单",
            component: () => import("@/views/find-music/song-list")
          },
          {
            path: "anchor-radio",
            name: "anchor-radio",
            title: "主播电台",
            component: () => import("@/views/find-music/anchor-radio")
          },
          {
            path: "singer",
            name: "singer",
            title: "歌手",
            component: () => import("@/views/find-music/singer")
          },
          {
            path: "new-disc-shelf",
            name: "new-disc-shelf",
            title: "新碟上架",
            component: () => import("@/views/find-music/new-disc-shelf")
          }
        ]
      },
      {
        path: "/me-music",
        name: "me-music",
        title: "我的音乐",
        component: () => import("@/views/me-music")
      },
      {
        path: "/mall",
        name: "mall",
        title: "商城",
        component: () => import("@/views/mall")
      },
      {
        path: "/friends",
        name: "friends",
        title: "朋友",
        component: () => import("@/views/friends")
      },
      {
        path: "/musician",
        name: "musician",
        title: "音乐人",
        component: () => import("@/views/musician")
      },
      {
        path: "/download-client",
        name: "download-client",
        title: "下载客户端",
        component: () => import("@/views/download-client")
      }
    ]
  }
];

export default [...userRouter];
