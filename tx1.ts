import {TxCollect} from './tx-collect'

export class Tx1 {
  @TxCollect.forTranslation
  public static readonly tx = {
    compOne: {
      workflow: {
        name: '',
        step1: {
          fistName: '',
          lastName: ''
        },
        step2: {
          country: '',
          street: ''
        }
      }
    }
  }
}