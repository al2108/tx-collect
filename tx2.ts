import {TxCollect} from './tx-collect'

export class Tx2 {
  @TxCollect.forTranslation
  public static readonly tx = {
    comp2: {
      workflow: {
        name: '',
        step1: {
          fistName: '',
          lastName: ''
        },
        step2: {
          country: '',
          street: ''
        },
        step3: {
          saveButton: ''
        }
      }
    }
  }
}
