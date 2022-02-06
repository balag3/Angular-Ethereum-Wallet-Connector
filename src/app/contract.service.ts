import {Injectable, InjectionToken} from '@angular/core';
import Web3 from 'web3';
import {isNullOrUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
}

export const WEB3 = new InjectionToken<Web3>('web3', {
  providedIn: 'root',
  factory: () => {
    const provider = ('ethereum' in window) ? window['ethereum'] : Web3.givenProvider;
    if (provider === null || provider === undefined) {
      alert('Non-Ethereum browser detected!');
      throw Error('Non-Ethereum browser detected!');
    }
    return new Web3(provider);
  }
});
