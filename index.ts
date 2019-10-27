// Import stylesheets
import './style.css';
import _ from 'lodash';

class TxCollect {
  public static tx = {};

  public static forTranslation(target: Object, propertyName: string) {
    // console.log(target, propertyName);
    // const paths = txCollect.modify(target[propertyName], '');
    // console.log(paths);
    TxCollect.modify(target[propertyName]);
    console.log(target[propertyName]);
    TxCollect.tx = {...TxCollect.tx, ...target[propertyName]};
    console.log(TxCollect.tx);
  }

  public static modify(obj: Object, parentKey: string = '') {
    // console.log('modify2:', obj, parentKey);
    // console.log(_.keys(obj));
    for (let key of _.keys(obj)) {
      // console.log('modify2-key:', key);
      if (_.isPlainObject(obj[key])) {
        TxCollect.modify(obj[key], parentKey === '' ? key : parentKey + '.' + key);
      } else if (typeof obj[key] === "string") {
        obj[key] = parentKey + '.' + key;
      }
    }
  } 

  public exportTranslationNames(): string {
    let translationNames = 'export const translationNames: TranslationStructure = ';
    translationNames += JSON.stringify(TxCollect.tx, null, 2);
    translationNames = translationNames.replace(/^( *)"/gm, '$1').replace(/" *:/g, ':');
    return translationNames + ';';
  }

  public exportTranslationStructure(): string {
    let translationStructure = 'export interface TranslationStructure ';
    translationStructure += JSON.stringify(TxCollect.tx, null, 2) + ';';
    translationStructure = translationStructure.replace(/: ".*"/g, ': string;')
      .replace(/;,/g, ';').replace(/( +)"/g, '$1').replace(/":/g, ':')
      .replace(/} *,/g, '}').replace(/} *;/g, '}');
    return translationStructure;
  }

}

class Translator {
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
  public translate(path: string): string {
    return _.get(this.translations, path);
  }

}


export class tx1 {
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

export class tx2 {
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

const txCollect = new TxCollect();
const translator = new Translator();
// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

const nameDiv: HTMLElement = document.getElementById('name');
nameDiv.innerHTML = 
`<p>Name: ${tx1.tx.compOne.workflow.name}</p>
<p>Name-2: ${translator.translate(tx1.tx.compOne.workflow.name)}</p>`;

const jsonInterface: HTMLElement = document.getElementById('json-interface');
jsonInterface.innerHTML = txCollect.exportTranslationStructure();

const jsonNames: HTMLElement = document.getElementById('json-names');
jsonNames.innerHTML = txCollect.exportTranslationNames();

export interface TranslationStructure {
  compOne: {
    workflow: {
      name: string;
      step1: {
        fistName: string;
        lastName: string;
      }
      step2: {
        country: string;
        street: string;
      }
    }
  }
  compTwo: {
    workflow: {
      name: string;
      step1: {
        fistName: string;
        lastName: string;
      }
      step2: {
        country: string;
        street: string;
      }
      step3: {
        saveButton: string;
      }
    }
  }
}

export const translationNames: TranslationStructure = {
  compOne: {
    workflow: {
      name: "compOne.workflow.name",
      step1: {
        fistName: "compOne.workflow.step1.fistName",
        lastName: "compOne.workflow.step1.lastName"
      },
      step2: {
        country: "compOne.workflow.step2.country",
        street: "compOne.workflow.step2.street"
      }
    }
  },
  compTwo: {
    workflow: {
      name: "compTwo.workflow.name",
      step1: {
        fistName: "compTwo.workflow.step1.fistName",
        lastName: "compTwo.workflow.step1.lastName"
      },
      step2: {
        country: "compTwo.workflow.step2.country",
        street: "compTwo.workflow.step2.street"
      },
      step3: {
        saveButton: "compTwo.workflow.step3.saveButton"
      }
    }
  }
};