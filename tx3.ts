import {TxCollect} from './tx-collect'

export class Tx3 {
  @TxCollect.forTranslation
  public static readonly tx = {
    comp3: {
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
