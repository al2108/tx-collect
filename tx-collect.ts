import _ from 'lodash';

export class TxCollect {
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