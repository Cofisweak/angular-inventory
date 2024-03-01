import {ITEMS, ITEMS_IDS} from "./items";
import {InventoryItem, Item} from "./types";

function randomNumber(max: number, min: number = 0): number {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function generateItem(slot: number): InventoryItem {
  const index: ITEMS_IDS = randomNumber(ITEMS.length - 1, 1);
  const item: Item = ITEMS[index];
  const amount: number = item.stackable ? randomNumber(64, 1) : 1;

  return {
    ...item,
    id: index,
    amount: amount,
    slot: slot
  };
}

function generateSlotsToFill(inventorySize: number, slotsCountToFill: number): number[] {
  const availableSlots: number[] = new Array(inventorySize);
  for (let i = 0; i < inventorySize; i++) {
    availableSlots[i] = i;
  }

  const slotsToFill: number[] = [];
  for (let i = 0; i < slotsCountToFill; i++) {
    const index = randomNumber(availableSlots.length - 1);
    slotsToFill.push(availableSlots[index]);
    availableSlots.splice(index, 1);
  }
  return slotsToFill;
}

export const generateInventory = (inventorySize: number) => {
  const slotsCountToFill: number = Math.floor(inventorySize * 0.8);
  const inventory: InventoryItem[] = [];
  const slotsToFill = generateSlotsToFill(inventorySize, slotsCountToFill);
  for (let slot of slotsToFill) {
    inventory.push(generateItem(slot));
  }
  return inventory;
};
