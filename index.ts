// Import stylesheets
import './style.css';
import _ from 'lodash';




interface TxObject {
  [key: string]: any;
}

type TxObjectList = Array<TxObject>;

class txCollect {
  private translations = {
    compOne: {
      workflow: {
        name: 'Translated worklow name',
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
  public static tx = {};

  public static forTranslation(target: Object, propertyName: string) {
    console.log(target, propertyName);
    txCollect.modify(target[propertyName]);
    txCollect.tx = {...txCollect.tx, ...target[propertyName]};
    console.log(txCollect.tx);
  }

  public static modify(obj: Object) {

  }

  public translate(path: string): string {
    return _.get(this.translations, path);
  }
}


export class tx1 {
  @txCollect.forTranslation
  public static readonly tx: TxObject = {
    compOne: {
      workflow: {
        name: 'compOne.workflow.name',
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
}

export class tx2 {
  @txCollect.forTranslation
  public static readonly tx: TxObject = {
    compTwo: {
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
}

const tx = new txCollect();
// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

const nameDiv: HTMLElement = document.getElementById('name');
nameDiv.innerHTML = 
`<p>Name: ${tx1.tx.compOne.workflow.name}</p>
<p>Name-2: ${tx.translate(tx1.tx.compOne.workflow.name)}</p>`;
