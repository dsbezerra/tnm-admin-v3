import { MENUITEM_NAV_DIVIDER,
         MENUITEM_NAV_HEADER,
         MENUITEM_NAV_LIST,
         MENUITEM_NAV_LIST_ITEM} from '../constants/MenuItemTypes.js';

const navMenuItems = [
  {
    type: MENUITEM_NAV_HEADER,
    text: 'INÍCIO'
  },
  {
    type: MENUITEM_NAV_LIST,
    items: [
      {
        type: MENUITEM_NAV_LIST_ITEM,
        text: 'Resumo',
        icon: 'dashboard',
        pathname: '/dashboard/summary',
      },
      /*{
        type: MENUITEM_NAV_LIST_ITEM,
        text: 'Analytics',
        icon: 'show_chart',
        pathname: '/analytics',
      },
      {
        type: MENUITEM_NAV_LIST_ITEM,
        text: 'Avaliações',
        icon: 'comment',
        pathname: '/reviews',
      }*/
    ]
  },
  {
    type: MENUITEM_NAV_DIVIDER
  },
  {
    type: MENUITEM_NAV_HEADER,
    text: 'FORMULÁRIOS'
  },
  {
    type: MENUITEM_NAV_LIST,
    items: [
      {
        type: MENUITEM_NAV_LIST_ITEM,
        icon: 'gavel',
        text: 'Licitações',
        pathname: '/forms/notice'
      },
      {
        type: MENUITEM_NAV_LIST_ITEM,
        icon: 'view_comfy',
        text: 'Segmentos',
        pathname: '/forms/segment'
      },
      {
        type: MENUITEM_NAV_LIST_ITEM,
        icon: 'account_balance',
        text: 'Órgãos',
        pathname: '/forms/agency'
      },
      {
        type: MENUITEM_NAV_LIST_ITEM,
        icon: 'location_city',
        text: 'Locais',
        pathname: '/forms/location'
      }
    ]
  },
  {
    type: MENUITEM_NAV_DIVIDER
  },
  {
    type: MENUITEM_NAV_LIST,
    items: [
      {
        type: MENUITEM_NAV_LIST_ITEM,
        text: 'Usuários',
        icon: 'supervisor_account',
        pathname: '/users',
      }
    ]
  },
  {
    type: MENUITEM_NAV_DIVIDER
  },
  {
    type: MENUITEM_NAV_HEADER,
    text: 'Ferramentas'
  },
  {
    type: MENUITEM_NAV_LIST,
    items: [
      {
        type: MENUITEM_NAV_LIST_ITEM,
        text: 'Scraper',
        icon: 'supervisor_account',
        pathname: '/tools/scraper',
      },
      {
        type: MENUITEM_NAV_LIST_ITEM,
        text: 'Rede Neural',
        icon: 'layers',
        pathname: '/tools/neural-network',
      },
      {
        type: MENUITEM_NAV_LIST_ITEM,
        text: 'Extrator/Conversor de Arquivos',
        icon: 'file_upload',
        pathname: '/tools/file-handlers',
      }
    ]
  },
];
    
export default navMenuItems;