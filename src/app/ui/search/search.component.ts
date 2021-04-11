import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  @Input() placeholder: string = '';
  @Output() searchCriteria: EventEmitter<string> = new EventEmitter<string>();
  searchword = new FormControl('', [Validators.required]);

  onSearch() {
    if (this.searchword.invalid) {
      this.searchword.markAsDirty();
      return;
    }
    this.searchCriteria.emit(this.searchword.value.trim());
  }
}
