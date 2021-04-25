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
  @Input() requiredErrorMessage: string = '';
  @Output() searchCriteria: EventEmitter<string> = new EventEmitter<string>();
  searchWord = new FormControl('', [Validators.required]);

  onSearch() {
    if (this.searchWord.invalid) {
      this.searchWord.markAsDirty();
      return;
    }
    this.searchCriteria.emit(this.searchWord.value.trim());
  }
}
