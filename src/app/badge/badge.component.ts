import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-texto',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {
  @Input() text = '';
  @Input() type = 'success';
  @Input() tooltip = '';
  @Input() position = 'top';
  @Input() bold = false;
  @Input() texto = '';
  @Input() fondo = '';
  private _icon = false;
  private _iconCss = false;
  iconType = '';

  constructor() {
  }

  get icon() {
    return this._icon;
  }

  @Input()
  set tipoTransaccion(val: any) {
    this.text = val;
    if(val == 'Efectivo') {
      this.texto = '#004225';
      this.fondo = '#bfffdf';
    } else if(val == 'Transferencia') {
      this.texto = '#5c2e00';
      this.fondo = '#fff1ad';
    } else {
      this.texto = '#004c59';
      this.fondo = '#abf2ff';
    }
  }

  @Input()
  set icon(val) {

    if (val) {
      this._icon = val;
      this.setIcon();
    }
  }

  get iconCss() {
    return this._iconCss;
  }

  @Input()
  set iconCss(val) {
    console.log(this.type)
    if (val) {
      this._iconCss = val;
      this.setIconCss();
    }
  }

  ngOnInit(): void {
  }

  setIcon(): void {
    
    switch (this.type) {
      case 'success':
        this.iconType = 'check-circle'
        break;
      case 'warning':
        this.iconType = 'exclamation-triangle'
        break;
      case 'danger':
        this.iconType = 'times-circle'
        break;
      case 'info':
        this.iconType = 'info-circle'
        break;
      case 'info2':
        this.iconType = 'info-circle'
        break;
    }
  }

  setIconCss():void{
    switch (this.type) {
      case 'warning':
        this.iconType = 'icon icon_smallest_stethoscope_brown'
        break;
      case 'warning2':
          this.iconType = 'icon icon_smallest_stethoscope_brown'
      break;
    }
  }
}
