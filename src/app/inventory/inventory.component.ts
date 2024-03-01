import {Component, OnDestroy, OnInit} from '@angular/core';
import {ItemComponent} from "./components/item/item.component";
import {CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup} from "@angular/cdk/drag-drop";
import {NgForOf, NgIf} from "@angular/common";
import {StoreService} from "../services/store.service";
import {ITEMS, ITEMS_IDS} from "../common/items";
import {InventoryItem} from "../common/types";

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
    const prevItem: InventoryItem = $event.previousContainer.data;
    const newItem: InventoryItem = $event.container.data;

    if (prevItem.slot == newItem.slot) return;

    if (prevItem.id == newItem.id && prevItem.stackable) {
      let newAmount: number = prevItem.amount + newItem.amount;
      if(newAmount > 64) {
        prevItem.amount = newAmount - 64;
        newAmount = 64;
      } else {
        this.inventory[prevItem.slot] = this.generateEmptyItem(prevItem.slot);
      }
      newItem.amount = newAmount;
      return;
    }

    [this.inventory[prevItem.slot], this.inventory[newItem.slot]] = [this.inventory[newItem.slot], this.inventory[prevItem.slot]];
    [prevItem.slot, newItem.slot] = [newItem.slot, prevItem.slot];
  }
}
