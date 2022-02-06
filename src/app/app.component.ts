import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {WEB3} from './contract.service';
import Web3 from 'web3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private selectedAddress = '';
  connected: boolean = false;

  constructor(@Inject(WEB3) private web3: Web3,
              private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.searchForConnectedAccounts();
    this.listenForAccountDisconnection();
  }

  connect() {
    // @ts-ignore
    this.web3.currentProvider.send('eth_requestAccounts').then(() => {
      // @ts-ignore
      this.selectedAddress = this.web3.currentProvider.selectedAddress
      this.connected = true
    });
  }

  getSelectedAddress() {
    let length = this.selectedAddress.length;
    if (length > 0) {
      return this.selectedAddress.substring(0, 4) + '....' + this.selectedAddress.substring(length - 5, length - 1)
    }
  }

  private listenForAccountDisconnection() {
    // @ts-ignore
    this.web3.currentProvider.on('accountsChanged', (accounts) => this.ngZone.run(() => {
      if (accounts.length == 0) {
        this.selectedAddress = '';
        this.connected = false;
      }
    }));
  }

  private searchForConnectedAccounts() {
    // @ts-ignore
    this.web3.currentProvider.send('eth_accounts').then((data: { result: string[] }) => {
      if (data.result.length > 0) {
        this.connected = true;
        this.selectedAddress = data.result[0]
      }
    });
  }

}
