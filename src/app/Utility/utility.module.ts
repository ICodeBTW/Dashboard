import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilityRoutingModule } from './utility-routing.module';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ModalViewComponent } from './modal-view/modal-view.component';

@NgModule({
  declarations: [ SearchBarComponent, ModalViewComponent],
  imports: [CommonModule, UtilityRoutingModule],
  exports: [ SearchBarComponent, ModalViewComponent],
})
export class UtilityModule {}
