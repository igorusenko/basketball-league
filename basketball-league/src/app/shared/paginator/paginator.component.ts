import {Component, Input, OnInit} from '@angular/core';
import {PaginatorItemInterface} from "../../core/interfaces/paginator-item.intarface";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit{

  @Input() totalCount: number = 10;
  pages: Array<PaginatorItemInterface> = [];

  constructor() {

  }

  ngOnInit() {
    for(let i: number = 1; i < this.totalCount; i++) {
      this.pages.push({name: i, isActive: i === 1})
    }
  }

  setPage(item: PaginatorItemInterface): void {
    this.unSetAllPages()
    item.isActive = true;
  }

  unSetAllPages(): void {
    this.pages.forEach(page => page.isActive = false)
  }

  setActivePreviousPage(): void {
    if (this.getCurrentActivePageIndex - 1 !== -1) {
      let currentPage = this.pages[this.getCurrentActivePageIndex]
      this.pages[this.getCurrentActivePageIndex - 1].isActive = true;
      currentPage.isActive = false;
    }
  }

  setActiveNextPage(): void {
    if (this.getCurrentActivePageIndex + 1 < this.pages.length) {
      this.pages[this.getCurrentActivePageIndex + 1].isActive = true;
      this.unselectCurrentPage();
    }
  }

  get getCurrentActivePageIndex(): number {
    return this.pages.findIndex(page => page.isActive);
  }

  unselectCurrentPage(): void {
    let currentPage = this.pages[this.getCurrentActivePageIndex]
    currentPage.isActive = false;
  }

}
