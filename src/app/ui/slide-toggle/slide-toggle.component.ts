import { Component, HostListener, Input, Output, EventEmitter, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SlideToggleComponent),
    multi: true,
  }]
})
export class SlideToggleComponent implements ControlValueAccessor {
  private _checked: boolean;
  private _disabled: boolean;
  private _reverse: boolean;

  @Input() size = 'medium';
  @Output() change = new EventEmitter<boolean>();
  @Input() labelOn = '';
  @Input() labelOff = '';

  @Input() set checked(v: boolean) {
    this._checked = v !== false;
  }

  get checked() {
    return this._checked;
  }

  @Input() set disabled(v: boolean) {
    this._disabled = v !== false;
  }

  get disabled() {
    return this._disabled;
  }

  @Input() set reverse(v: boolean) {
    this._reverse = v !== false;
  }

  get reverse() {
    return this._reverse;
  }

  @HostListener('click')
  onToggle() {
    if (this.disabled) {
      return;
    }
    this.checked = !this.checked;
    this.change.emit(this.checked);
    this.changed(this.checked);
    this.touched(this.checked);
  }

  changed = (_: any) => {};

  touched = (_: any) => {};

  public writeValue(obj: any) {
    if (obj !== this.checked) {
      this.checked = !!obj;
    }
  }

  public registerOnChange(fn: any) {
    this.changed = fn;
  }

  public registerOnTouched(fn: any) {
    this.touched = fn;
  }

  public setDisabledState(isDisabled: boolean) {
    //
  }
}
