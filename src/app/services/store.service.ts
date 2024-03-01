import {Injectable} from '@angular/core';
import {generateInventory} from "../common/inventory-generator";
import {Observable} from "rxjs";

import {InventoryItem} from "../common/types";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public readonly INVENTORY_SIZE: number = 27;
  private INVENTORY: InventoryItem[] = generateInventory(this.INVENTORY_SIZE);

  saveInventory(inventory: InventoryItem[]): void {
    this.INVENTORY = inventory;
  }

  public getInventory(): Observable<InventoryItem[]> {
    return new Observable<InventoryItem[]>((subscriber) => {
      subscriber.next(this.INVENTORY);
      subscriber.complete();
    });
  }
}
