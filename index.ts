// Import stylesheets
import {TxCollect} from './tx-collect';
import {Translator} from './translator';
import {Tx2} from './tx2';
import {Tx1} from './tx1';
import {Tx3} from './tx3';

const txCollect = new TxCollect();
const translator = new Translator();

const tx3 = Tx3.tx;
const tx2 = Tx2.tx;
const tx1Workflow = Tx1.tx.comp1.workflow;

const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

const nameDiv: HTMLElement = document.getElementById('name');
nameDiv.innerHTML = 
`<p>Name key: ${tx1Workflow.name}</p>
<p>Name translated: ${translator.translate(tx1Workflow.name)}</p>`;

const jsonInterface: HTMLElement = document.getElementById('json-interface');
jsonInterface.innerHTML = txCollect.exportTranslationStructure();

const jsonNames: HTMLElement = document.getElementById('json-names');
jsonNames.innerHTML = txCollect.exportTranslationNames();

const order: HTMLElement = document.getElementById('order');
order.innerHTML = txCollect.getCollectionOrder();