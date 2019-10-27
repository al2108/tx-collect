import _ from 'lodash';

export class TxCollect {
  private static txObjects = [];
  private static tx;
  private static collectionOrder: string = '';

  public static forTranslation(target: Object, propertyName: string) {
    const txObject = target[propertyName];
    const firstKey = _.keys(txObject)[0];

    TxCollect.collectionOrder += TxCollect.collectionOrder ? ', ' : '';
    TxCollect.collectionOrder += firstKey; 
    console.log(TxCollect.collectionOrder);

    TxCollect.modify(txObject);
    TxCollect.txObjects.push(target[propertyName]);
    TxCollect.txObjects = TxCollect.txObjects.sort((el1, el2) => {
      if (!el1 && !el2) {
        return 0;
      }
      if (!el1) {
        return -1;
      }
      if (!el2) {
        return 1;
      }
      let key1: string = _.keys(el1)[0];
      let key2: string = _.keys(el2)[0];
      return key1.localeCompare(key2);
    });
    TxCollect.tx = {};
    TxCollect.txObjects.forEach(txObject => TxCollect.tx = {...TxCollect.tx, ...txObject});
  }

  public static modify(obj: Object, parentKey: string = '') {
    for (let key of _.keys(obj)) {
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

  public getCollectionOrder(): string {
    return TxCollect.collectionOrder;
  }

}