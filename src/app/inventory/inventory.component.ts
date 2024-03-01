import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ItemComponent} from "./components/item/item.component";
import {CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup} from "@angular/cdk/drag-drop";
import {NgForOf, NgIf} from "@angular/common";
import {StoreService} from "../services/store.service";
import {ITEMS, ITEMS_IDS} from "../common/items";
import {ContextMenu, InventoryItem} from "../common/types";

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    ItemComponent,
    CdkDropList,
    NgForOf,
    CdkDropListGroup,
    NgIf,
    CdkDrag
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit, OnDestroy {
  protected readonly ITEMS_IDS = ITEMS_IDS;
  inventory: InventoryItem[] = [];
  isDraggable: boolean = false;

  contextMenu: ContextMenu = {
    posX: '0px',
    posY: '0px',
    opened: false,
    selectedSlot: 0
  }

  constructor(private storeService: StoreService) {
    for (let i = 0; i < this.storeService.INVENTORY_SIZE; i++) {
      this.inventory[i] = this.generateEmptyItem(i)
    }
  }

  private generateEmptyItem(i: number) {
    return {
      slot: i,
      ...ITEMS[ITEMS_IDS.EMPTY],
      amount: 0
    };
  }

  ngOnInit(): void {
    this.storeService.getInventory().subscribe((inventory) => {
      for (let item of inventory) {
        this.inventory[item.slot] = item;
      }
    })
  }

  ngOnDestroy(): void {
    this.storeService.saveInventory(this.inventory.filter((item) => item.id != ITEMS_IDS.EMPTY));
  }

  drop($event: CdkDragDrop<InventoryItem>): void {
    console.log($event)
    const prevItem: InventoryItem = $event.previousContainer.data;
    const newItem: InventoryItem = $event.container.data;

    if (prevItem.slot == newItem.slot) return;

    if (prevItem.id == newItem.id && prevItem.stackable) {
      let newAmount: number = prevItem.amount + newItem.amount;
      if (newAmount > 64) {
        prevItem.amount = newAmount - 64;
        newAmount = 64;
      } else {
        this.deleteItem(prevItem.slot);
      }
      newItem.amount = newAmount;
      return;
    }

    this.swapItems(prevItem, newItem);
  }

  private deleteItem(slot: number): void {
    this.inventory[slot] = this.generateEmptyItem(slot);
  }

  private swapItems(prevItem: InventoryItem, newItem: InventoryItem): void {
    [this.inventory[prevItem.slot], this.inventory[newItem.slot]] = [this.inventory[newItem.slot], this.inventory[prevItem.slot]];
    [prevItem.slot, newItem.slot] = [newItem.slot, prevItem.slot];
  }

  @HostListener("window:click")
  onClick() {
    this.contextMenu.opened = false;
  }

  onContextMenu($event: MouseEvent, slot: number) {
    $event.preventDefault();

    this.contextMenu.posX = $event.x + 'px';
    this.contextMenu.posY = $event.y + 'px';
    this.contextMenu.opened = true;
    this.contextMenu.selectedSlot = slot;
  }

  onDragStart() {
    this.isDraggable = true;
  }

  onDragEnd() {
    this.isDraggable = false;
  }

  onSplit() {
    const item: InventoryItem = this.inventory[this.contextMenu.selectedSlot!];
    if (item.amount == 1) return;

    const index: number = this.searchFreeSlot();
    if (index === -1) return;

    const newItem: InventoryItem = JSON.parse(JSON.stringify(item));
    newItem.slot = index;
    this.inventory[index] = newItem;

    const newAmount: number = Math.floor(item.amount / 2);
    item.amount = item.amount - newAmount;
    newItem.amount = newAmount;
  }

  private searchFreeSlot(): number {
    for (let item of this.inventory) {
      if (item.id === ITEMS_IDS.EMPTY) return item.slot;
    }
    return -1;
  }

  onDelete() {
    this.deleteItem(this.contextMenu.selectedSlot!);
  }
}
