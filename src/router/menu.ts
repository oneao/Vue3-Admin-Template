interface Menu {
  key: string
  title: string
  icon: string
  showMenu: boolean
  father?: string
}

const MenuData: Menu[] = [
  {
    key: "/home",
    title: "首页",
    icon: "tabler:apps",
    showMenu: true,
  },
  {
    key: "/aboutUs/index",
    title: "关于我们",
    icon: "material-symbols:boat-railway-outline-sharp",
    showMenu: true,
  },
]

export { MenuData }
