// Import stylesheets
import {TxCollect} from './tx-collect';
import {Translator} from './translator';
import {Tx2} from './tx2';
import {Tx1} from './tx1';

console.log(Tx2.tx);
const txCollect = new TxCollect();
const translator = new Translator();

const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

const nameDiv: HTMLElement = document.getElementById('name');
nameDiv.innerHTML = 
`<p>Name: ${Tx1.tx.compOne.workflow.name}</p>
<p>Name-2: ${translator.translate(Tx1.tx.compOne.workflow.name)}</p>`;

const jsonInterface: HTMLElement = document.getElementById('json-interface');
jsonInterface.innerHTML = txCollect.exportTranslationStructure();

const jsonNames: HTMLElement = document.getElementById('json-names');
jsonNames.innerHTML = txCollect.exportTranslationNames();
