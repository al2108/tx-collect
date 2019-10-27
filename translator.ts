import _ from 'lodash';

export class Translator {
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
