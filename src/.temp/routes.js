const c1 = () => import(/* webpackChunkName: "page--src--templates--markdown-page-vue" */ "/home/killer/Documentos/Dev/Killer-OS-Oficial.github.io/src/templates/MarkdownPage.vue")
const c2 = () => import(/* webpackChunkName: "page--src--templates--md-page-vue" */ "/home/killer/Documentos/Dev/Killer-OS-Oficial.github.io/src/templates/MdPage.vue")
const c3 = () => import(/* webpackChunkName: "page--src--pages--404-vue" */ "/home/killer/Documentos/Dev/Killer-OS-Oficial.github.io/src/pages/404.vue")
const c4 = () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/home/killer/Documentos/Dev/Killer-OS-Oficial.github.io/src/pages/Index.vue")

export default [
  {
    path: "/wiki/other/screencast/",
    component: c1
  },
  {
    path: "/wiki/packages/other-pkg/",
    component: c1
  },
  {
    path: "/wiki/other/notes/",
    component: c1
  },
  {
    path: "/wiki/config/videocfg/",
    component: c1
  },
  {
    path: "/wiki/packages/iwd/",
    component: c1
  },
  {
    path: "/wiki/wm/bspwm/",
    component: c1
  },
  {
    path: "/wiki/backup/timeshift-rsync/",
    component: c1
  },
  {
    path: "/wiki/config/trouble/",
    component: c1
  },
  {
    path: "/wiki/other/git-start/",
    component: c1
  },
  {
    path: "/wiki/other/grub-uefi/",
    component: c1
  },
  {
    path: "/wiki/config/ssh/",
    component: c1
  },
  {
    path: "/wiki/other/gnupg/",
    component: c1
  },
  {
    path: "/wiki/backup/squashfs/",
    component: c1
  },
  {
    path: "/wiki/config/recomend/",
    component: c1
  },
  {
    path: "/wiki/backup/netcat/",
    component: c1
  },
  {
    path: "/wiki/changelog/bspwm-1-0/",
    component: c1
  },
  {
    path: "/wiki/btrfs/btrfs-part1/",
    component: c1
  },
  {
    path: "/wiki/btrfs/btrfs-part2/",
    component: c1
  },
  {
    path: "/wiki/config/autologin/",
    component: c1
  },
  {
    path: "/wiki/whois/",
    component: c1
  },
  {
    path: "/wiki/changelog/",
    component: c1
  },
  {
    path: "/wiki/",
    component: c1
  },
  {
    path: "/get/",
    component: c2,
    meta: {
      $vueRemark: () => import(/* webpackChunkName: "vue-remark--mdpages--get-md" */ "/home/killer/Documentos/Dev/Killer-OS-Oficial.github.io/mdpages/get.md")
    }
  },
  {
    path: "/donat/",
    component: c2,
    meta: {
      $vueRemark: () => import(/* webpackChunkName: "vue-remark--mdpages--donat-md" */ "/home/killer/Documentos/Dev/Killer-OS-Oficial.github.io/mdpages/donat.md")
    }
  },
  {
    name: "404",
    path: "/404/",
    component: c3
  },
  {
    name: "home",
    path: "/",
    component: c4
  },
  {
    name: "*",
    path: "*",
    component: c3
  }
]
