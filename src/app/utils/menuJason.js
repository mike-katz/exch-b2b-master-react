import Images from '../../assets/images/images';

export const TopMenuJSON = [
  {
    label: 'Home',
    icon: Images.MenuHome,
    url: '/',
    hight_light_menu: false
  },
  {
    label: 'In-Play',
    icon: Images.MenuInPlay,
    url: '/in-play',
    hight_light_menu: false
  },
  {
    label: 'Cricket',
    icon: Images.MenuCricket,
    url: '/cricket',
    hight_light_menu: false
  },
  {
    label: 'Football',
    icon: Images.MenuFootball,
    url: '/football',
    hight_light_menu: false
  },
  {
    label: 'Tennis',
    icon: Images.MenuTennis,
    url: '/tennis',
    hight_light_menu: false
  },
  {
    label: 'Hours Racing',
    icon: Images.MenuHoureRacing,
    url: '/hours-racing',
    hight_light_menu: false
  },
  {
    label: 'Greyhound Racing',
    icon: Images.MenuGreygoundRacing,
    url: '/greyhound-racing',
    hight_light_menu: false
  },
  {
    label: 'Kabaddi',
    icon: Images.MenuKabaddi,
    url: '/kabaddi',
    hight_light_menu: false
  },
  {
    label: 'Politics',
    icon: Images.MenuPolitics,
    url: '/politics',
    hight_light_menu: false
  },
  {
    label: 'Casino',
    icon: Images.MenuCasino,
    url: '/casino',
    hight_light_menu: true
  },
  {
    label: 'Sports Book',
    icon: Images.MenuSportsBook,
    url: '/sports-book',
    hight_light_menu: false
  },
  {
    label: 'Int Casino',
    icon: Images.MenuInCasino,
    url: '/int-casino',
    hight_light_menu: true
  },
  {
    label: 'Binary',
    icon: Images.MenuBinary,
    url: '/binary',
    hight_light_menu: false
  }
];

export const SideMenuJSON = [
  {
    label: 'Cricket',
    icon: Images.MenuCricket,
    url: '/cricket',
    hight_light_menu: false,
    sub_menu_available: true,
    sub_menu: [
      {
        label: 'Test Matches',
        url: '/',
        hight_light_menu: false,
        sub_menu_available: true,
        sub_menu: [
          {
            label: 'Bangladesh v Afghanistan',
            url: '/',
            hight_light_menu: false,
            sub_menu_available: false
          },
          {
            label: 'England v Australia',
            url: '/',
            hight_light_menu: false,
            sub_menu_available: false
          }
        ]
      },
      {
        label: 'Other',
        url: '/football',
        hight_light_menu: false,
        sub_menu_available: true,
        sub_menu: [
          {
            label: 'UNITED ARAB EMIRATES T10 VS QATAR T10',
            url: '/',
            hight_light_menu: false,
            sub_menu_available: false
          },
          {
            label: 'SYDNEY SIXERS T10 VS SYDNEY THUNDER T10',
            url: '/',
            hight_light_menu: false,
            sub_menu_available: false
          },
          {
            label: 'KOLKATA KNIGHT RIDERS T10 VS ROYAL CHALLENGERS BANGALORE T10',
            url: '/',
            hight_light_menu: false,
            sub_menu_available: false
          },
          {
            label: 'GUYANA AMAZON WARRIORS T10  VS JAMAICA TALLAWAHS T10',
            url: '/',
            hight_light_menu: false,
            sub_menu_available: false
          },
          {
            label: 'ASHES COMMON MARKET 2023 ENGLAND VS AUSTRALIA',
            url: '/',
            hight_light_menu: false,
            sub_menu_available: false
          }
        ]
      },
      {
        label: 'Tamil Nadu Premier League',
        url: '/football',
        hight_light_menu: false,
        sub_menu_available: false
      },
      {
        label: 'T20 Blast',
        url: '/football',
        hight_light_menu: false,
        sub_menu_available: false
      }
    ]
  },
  {
    label: 'Football',
    icon: Images.MenuFootball,
    url: '/football',
    hight_light_menu: false,
    sub_menu_available: false
  },
  {
    label: 'Tennis',
    icon: Images.MenuTennis,
    url: '/tennis',
    hight_light_menu: false,
    sub_menu_available: false
  },
  {
    label: 'Hours Racing',
    icon: Images.MenuHoureRacing,
    url: '/hours-racing',
    hight_light_menu: false,
    sub_menu_available: false
  },
  {
    label: 'Greyhound Racing',
    icon: Images.MenuGreygoundRacing,
    url: '/greyhound-racing',
    hight_light_menu: false,
    sub_menu_available: false
  },
  {
    label: 'Kabaddi',
    icon: Images.MenuKabaddi,
    url: '/kabaddi',
    hight_light_menu: false,
    sub_menu_available: false
  },
  {
    label: 'Politics',
    icon: Images.MenuPolitics,
    url: '/politics',
    hight_light_menu: false,
    sub_menu_available: false
  },
  {
    label: 'Casino',
    icon: Images.MenuCasino,
    url: '/casino',
    hight_light_menu: true,
    sub_menu_available: false
  },
  {
    label: 'Sports Book',
    icon: Images.MenuSportsBook,
    url: '/sports-book',
    hight_light_menu: false,
    sub_menu_available: false
  },
  {
    label: 'Int Casino',
    icon: Images.MenuInCasino,
    url: '/int-casino',
    hight_light_menu: true,
    sub_menu_available: false
  },
  {
    label: 'Binary',
    icon: Images.MenuBinary,
    url: '/binary',
    hight_light_menu: false,
    sub_menu_available: false
  }
];
