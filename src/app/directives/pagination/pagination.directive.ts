import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {NgModel, ControlValueAccessor} from "@angular/forms";

@Component({
  selector:'ng-pagination[ngModel]',
  template:`
              <ul class="pagination" >
                  <li *ngIf="previousItemValid && firstText" (click)="firstPage()"><a [innerHTML]="firstText">First</a></li>
                  <li> <a *ngIf="previousItemValid" (click)="previousPage(previousItem)" aria-label="Previous"> <span aria-hidden="true">&laquo;</span> </a> </li>
                  <li *ngFor="let pageNo of pageList" [ngClass]="{'active':selectedPage === pageNo}">
                      <a (click)="setCurrentPage(pageNo)">{{pageNo}}</a>
                  </li>
                  <li> <a *ngIf="nextItemValid" (click)="nextPage(nextItem)" aria-label="Next"> <span aria-hidden="true">&raquo;</span> </a></li>
                  <li><a *ngIf="nextItemValid && lastText" (click)="lastPage()" [innerHTML]="lastText" >Last</a></li>
                </ul>

`
})
export class PaginationDirective implements ControlValueAccessor, OnInit{
  @Input("previous-text") previousText:string;
  @Input("next-text") nextText:string;
  @Input("first-text") firstText:string;
  @Input("last-text") lastText:string;
  @Input("totalItems") totalItems:number;
  @Input("currentPage") cPage:number;
  @Input("maxSize") pageSize:number;
  @Input("boundaryLinks") boundaryLinks:boolean;
  @Output("pageChanged") pageChanged = new EventEmitter();
  currentpage:number;
  pageList:Array<number> = [];
  private onChange: Function;
  private onTouched: Function;
  private selectedPage: number;
  private nextItem: number;
  private previousItem: number;
  public nextItemValid: boolean;
  public previousItemValid: boolean;

  constructor(private pageChangedNgModel: NgModel) {
    this.pageChangedNgModel.valueAccessor = this;

  }
  ngOnInit() {
    this.doPaging();
  }
  doPaging() {
     this.pageList = [];
     var i:number,count:number;
     this.selectedPage = this.currentpage;
     var remaining = this.totalItems % this.pageSize;
    var totalSize =((this.totalItems-remaining) / this.pageSize)+(remaining ===0 ? 0 : 1);
    var modStart = 0;
    if(totalSize == 1) {
      modStart = 0;
    }
    if(this.currentpage - Math.floor(this.pageSize / 2) > 0) {
      modStart = -Math.floor(this.pageSize / 2);
    }
    else if(this.currentpage - Math.floor(this.pageSize / 2) < 1) {
      modStart = -this.currentpage + 1;
    }
    else if(this.currentpage + Math.floor(this.pageSize / 2) > totalSize) {
      modStart = -Math.floor(this.pageSize / 2);
    }
    for (i = (this.currentpage) + modStart, count=0; i<= totalSize && count<this.pageSize; i++, count++) {
      this.pageList.push(i);
    }
    //next validation
    if(i-1<totalSize) {
      this.nextItemValid = true;
      this.nextItem = i;
    }else {
      this.nextItemValid = false;
    }
    //previous validation
    if((this.currentpage) > Math.floor(this.pageSize / 2)) {
      this.previousItemValid = true;
       this.previousItem = (this.currentpage + Math.floor(this.pageSize / 2));
    }else {
      this.previousItemValid = false;
    }
  }
  setCurrentPage(pageNo:number) {
    this.selectedPage = pageNo;
    this.pageChangedNgModel.viewToModelUpdate(pageNo);
    this.pageChageListner();
  }
  firstPage() {
    this.currentpage = 1;
    this.pageChangedNgModel.viewToModelUpdate(1);
    this.pageChageListner();
    this.doPaging()
  }
  lastPage() {
    var lastPage = Math.ceil(this.totalItems / this.pageSize);
    this.currentpage = lastPage;
    this.pageChangedNgModel.viewToModelUpdate(lastPage);
    this.pageChageListner();
    this.doPaging()
  }
  nextPage(pageNo:number) {
    this.currentpage = pageNo;
    this.pageChangedNgModel.viewToModelUpdate(pageNo);
    this.pageChageListner();
    this.doPaging()
  }
  previousPage(pageNo:number) {
    var temp = pageNo - this.pageSize;
    this.currentpage = temp > 0 ?temp: 1;
    this.pageChangedNgModel.viewToModelUpdate(this.currentpage);
    this.pageChageListner();
    this.doPaging();
  }
  writeValue(value: string): void {
        if (!value && value != '0') return;
        this.setValue(value);
    }

    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: (_: any) => {}): void {
        this.onTouched = fn;
    }
  setValue(currentValue:any){
    this.currentpage = currentValue;
    this.doPaging();
  }
  pageChageListner() {
    this.pageChanged.emit({
      selectedPage: this.selectedPage
    })
  }
}
