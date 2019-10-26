// Import stylesheets
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

interface TxObject {
  [key: string]: any;
}

type TxObjectList = Array<TxObject>;

class txCollect {
  public static tx = {};

  public static forTranslation(target: Object, propertyName: string) {
    console.log(target, propertyName);
    txCollect.tx[propertyName] = {...target[propertyName]};
    console.log(txCollect.tx);
  }
}


export class tx1 {
  @txCollect.forTranslation
  public static readonly compOne: TxObject = {
    workflow: {
      name: 'Workflow-1',
      step1: {
        fistName: 'First Name',
        lastName: 'Last Name'
      },
      step2: {
        country: 'Country',
        street: 'Street'
      }
    }
  }
}

export class tx2 {
  @txCollect.forTranslation
  public static readonly compTwo: TxObject = {
    workflow: {
      name: 'Workflow-2',
      step1: {
        fistName: 'First Name',
        lastName: 'Last Name'
      },
      step2: {
        country: 'Country',
        street: 'Street'
      },
      step3: {
        saveButton: 'Save'
      }
    }
  }
}

