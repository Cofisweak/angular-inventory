import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";

import {InventoryItem} from "../../../common/types";

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    NgIf,
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  @Input() item!: InventoryItem;
}
