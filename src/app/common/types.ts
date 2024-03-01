import {ITEMS_IDS} from "./items";

export type Item = {
  id: ITEMS_IDS;
  name: string;
  image: string;
  stackable: boolean;
}

export type InventoryItem = {
  amount: number,
  slot: number
} & Item;

export type ContextMenu = {
  posX: string;
  posY: string;
  opened: boolean;
  selectedSlot: number;
}
