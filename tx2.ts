import {TxCollect} from './tx-collect'

export class Tx2 {
  @TxCollect.forTranslation
  public static readonly tx = {
    compTwo: {
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
