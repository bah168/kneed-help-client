import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common"

import { PaginationDirective } from './pagination.directive';

@NgModule({
  imports: [
   CommonModule
  ],
  declarations: [
      PaginationDirective
  ],
  exports: [
      PaginationDirective
  ],
  providers: []
})
export class PaginationModule {}
