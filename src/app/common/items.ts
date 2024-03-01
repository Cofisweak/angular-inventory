import {Item} from "./types";

export enum ITEMS_IDS {
  EMPTY,
  COOKIE,
  BRICK,
  CARROT,
  BOWL,
  DIAMOND,
  DIAMOND_HOE
}

export const ITEMS: Item[] = [
  {
    id: ITEMS_IDS.EMPTY,
    image: '',
    name: 'Air',
    stackable: false
  },
  {
    id: ITEMS_IDS.COOKIE,
    image: 'assets/icons/cookie.webp',
    name: 'Cookie',
    stackable: true
  },
  {
    id: ITEMS_IDS.BRICK,
    image: 'assets/icons/brick.webp',
    name: 'Brick',
    stackable: true
  },
  {
    id: ITEMS_IDS.CARROT,
    image: 'assets/icons/carrot.webp',
    name: 'Carrot',
    stackable: true
  },
  {
    id: ITEMS_IDS.BOWL,
    image: 'assets/icons/bowl.webp',
    name: 'Bowl',
    stackable: true
  },
  {
    id: ITEMS_IDS.DIAMOND,
    image: 'assets/icons/diamond.webp',
    name: 'Diamond',
    stackable: true
  },
  {
    id: ITEMS_IDS.DIAMOND_HOE,
    image: 'assets/icons/diamond-hoe.webp',
    name: 'Diamond hoe',
    stackable: false
  },
];
