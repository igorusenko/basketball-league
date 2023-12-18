import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {PaginatorItemInterface} from "../../core/interfaces/paginator/paginator-item.intarface";
import {SelectItemInterface} from "../../core/interfaces/select/select-item.interface";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges{

  @Input() totalCount: number;
  @Input() isPageSizeSelectVisible: boolean = true;
  @Input() isPaginatorVisible: boolean = true;
  @Input() page: number = 1;
  @Input() pageSize: number = 6;
  @Input() pageSizeControl: FormControl<number>;
  selectOptions: Array<SelectItemInterface> = [
    {id: 6, name: '6'},
    {id: 12, name: '12'},
    {id: 24, name: '24'},
  ]
  pages: Array<PaginatorItemInterface> = [];
  vewPageFrom: number = 0;
  vewPageTo: number = 4;
  isChoosenLastPage: boolean = false;
  @Output() onPage: EventEmitter<number> = new EventEmitter<number>();
  @Output() onPageSize: EventEmitter<number> = new EventEmitter<number>();
  constructor() {

  }

  ngOnInit() {
    this.refreshPages();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalCount']) {
      this.refreshPages();
    }
  }

  refreshPages(): void {
    this.pages = [];
    this.vewPageFrom = 0;
    this.vewPageTo = 4;
    this.isChoosenLastPage = false;
    for(let i: number = 1; i < this.totalCount; i++) {
      this.pages.push({name: i, isActive: i === this.page})
    }
  }

  setPage(item: PaginatorItemInterface): void {
    this.isChoosenLastPage = false;
    this.unSetAllPages();
    item.isActive = true;
    this.emitPage();
  }

  unSetAllPages(): void {
    this.pages.forEach(page => page.isActive = false)
  }

  setActivePreviousPage(): void {
    if (!this.isChoosenLastPage) {
      if (this.getCurrentActivePageIndex - 1 !== -1 && this.getCurrentActivePageIndex > this.vewPageFrom) {
        let currentPage = this.pages[this.getCurrentActivePageIndex]
        this.pages[this.getCurrentActivePageIndex - 1].isActive = true;
        currentPage.isActive = false;
      } else if (this.getCurrentActivePageIndex <= this.vewPageFrom && (this.getCurrentActivePageIndex !== 0 && this.vewPageFrom !== 0)) {
        this.vewPageFrom -= 1;
        this.vewPageTo -= 1;
        let currentPage = this.pages[this.getCurrentActivePageIndex];
        this.pages[this.getCurrentActivePageIndex - 1].isActive = true;
        currentPage.isActive = false;
      }
    }
    else {
      this.isChoosenLastPage = false;
      this.getSlicedPages()[this.getSlicedPages().length - 1].isActive = true
    }
    this.emitPage();
  }

  setActiveNextPage(): void {
      if (this.getCurrentActivePageIndex + 1 < this.pages.length && this.getCurrentActivePageIndex + 1 < this.vewPageTo) {
        this.pages[this.getCurrentActivePageIndex + 1].isActive = true;
        this.unselectCurrentPage();
      } else if (this.vewPageTo < this.totalCount - 1) {
        this.vewPageFrom += 1;
        this.vewPageTo += 1;
        this.pages[this.getCurrentActivePageIndex + 1].isActive = true;
        this.unselectCurrentPage();
      }
      else {
        this.isChoosenLastPage = true;
        this.unselectCurrentPage();
      }
      this.emitPage();
  }

  get getCurrentActivePageIndex(): number {
    return this.pages.findIndex(page => page.isActive);
  }

  unselectCurrentPage(): void {
    let currentPage = this.pages[this.getCurrentActivePageIndex]
    currentPage.isActive = false;
  }

  getSlicedPages(): Array<PaginatorItemInterface> {
    return this.pages
      .slice(this.vewPageFrom, this.vewPageTo)
  }

  chooseLastPage(): void {
    this.isChoosenLastPage = true;
    this.pages[this.getCurrentActivePageIndex].isActive = false;
    this.vewPageFrom = this.totalCount - 5;
    this.vewPageTo = this.totalCount - 1;
    this.emitPage();
  }

  viewAdditionalPages(): void {
    let pageDifference: number = this.totalCount - this.vewPageTo - 1;
      if (pageDifference > 4) {
        this.vewPageFrom = this.vewPageTo;
        this.vewPageTo += 4;
        this.getSlicedPages()[0].isActive = true;
        this.unselectCurrentPage();
      }
      else {
        this.vewPageFrom = this.vewPageFrom + pageDifference;
        this.vewPageTo += pageDifference;
        this.getSlicedPages()[0].isActive = true;
        this.unselectCurrentPage();
      }
  }

  isViewLastArrayObject(): boolean {
    return this.getSlicedPages().some(x => x.name === 14)
  }

  emitPage(): void {
    this.isChoosenLastPage ? this.onPage.emit(this.pages.length + 1) : this.onPage.emit(this.pages[this.getCurrentActivePageIndex].name)
  }

}
