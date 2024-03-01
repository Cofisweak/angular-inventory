import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {InventoryComponent} from "./inventory/inventory.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InventoryComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isInventoryOpened: boolean = false;

  switchInventory() {
    this.isInventoryOpened = !this.isInventoryOpened;
  }
}
