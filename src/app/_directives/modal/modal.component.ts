import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})

export class ModalComponent implements OnInit {

  //get message text and type of modal to show from other components
	@Input() message: string;
	@Input() modalType: string;

  //send the confirmation from user to other components
	@Output('confirmed') change: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  //get the confirmation from user (if he click OK or Cancel button)
  isConfirmed(value: boolean) {
  	this.change.emit(value);
  }

}
