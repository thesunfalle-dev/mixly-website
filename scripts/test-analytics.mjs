import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {randomUUID} from 'node:crypto';
import {test} from 'node:test';

const source = readFileSync(new URL('../analytics.js', import.meta.url), 'utf8');
const settle = async () => { for (let i = 0; i < 40; i++) await Promise.resolve(); };
function harness({consent, blockedStorage = false, deferInit = false} = {}) {
  const storage = new Map(consent ? [['mixly-analytics-consent', consent]] : []);
  const listeners = new Map();
  const scripts = [], instances = [], sent = [];
  let panel, finishInit;
  const node = () => ({hidden:false, textContent:'', listeners:{}, setAttribute(){}, addEventListener(name,fn){this.listeners[name]=fn;}});
  const document = {
    readyState:'complete', documentElement:{lang:'en'}, referrer:'https://example.com/private?q=secret',
    body:{dataset:{},appendChild(value){panel=value;}},
    head:{appendChild(value){scripts.push(value);}},
    createElement(tag){const result=node();result.remove=()=>scripts.splice(scripts.indexOf(result),1);if(tag==='aside'){const children={};result.querySelector=selector=>children[selector] ||= node();}return result;},
    querySelector(){return panel;},
    addEventListener(name,fn){listeners.set(name,fn);}
  };
  const location = new URL('https://get-mixly.app/en/');
  const window = {addEventListener(name,fn){listeners.set(name,fn);}};
  const localStorage = {getItem(key){if(blockedStorage)throw Error('blocked');return storage.get(key)??null;}, setItem(key,value){if(blockedStorage)throw Error('blocked');storage.set(key,value);},removeItem(key){storage.delete(key);}};
  const context=vm.createContext({window,document,localStorage,location,crypto:{randomUUID},URL,URLSearchParams,console});
  const sdk = {createInstance(){
    const instance = {events:[], queue:[], optOut:false,
      add(plugin){this.plugin=plugin;},
      init(key,options){this.key=key;this.options=options;this.config={transportProvider:{send:async(url,payload)=>{sent.push(payload);return {status:'success'};}}};const ready=deferInit?new Promise(resolve=>{finishInit=resolve;}):Promise.resolve();return {promise:ready.then(()=>this.plugin.setup(this.config))};},
      track(name,properties){const event={event_type:name,event_properties:properties};this.events.push(event);this.queue.push(event);},
      flush(){},
      setOptOut(value){this.optOut=value;},
      async upload(){for(const event of this.queue.splice(0)){if(await this.plugin.execute(event))await this.config.transportProvider.send('',event);}}
    };instances.push(instance);return instance;
  }};
  vm.runInContext(source,context);
  return {storage,scripts,instances,sent,document,location,
    panel:()=>panel,
    async sdkReady(){window.amplitude=sdk;scripts.at(-1).onload();await settle();},
    async finishInit(){finishInit();await settle();},
    async click(action){panel.querySelector(`[data-consent-${action}]`).listeners.click();await settle();},
    async event(name,event={}){listeners.get(name)(event);await settle();},
    async navigate(path,lang='en'){location.pathname=path;document.documentElement.lang=lang;panel=undefined;await this.event('mixly:page');}
  };
}

test('no provider before consent or after rejection; failed SDK can retry',async()=>{
 const h=harness();assert.equal(h.scripts.length,0);await h.click('reject');assert.equal(h.scripts.length,0);
 await h.click('accept');assert.equal(h.scripts.length,1);h.scripts[0].onerror();await settle();
 await h.click('accept');assert.equal(h.scripts.length,1);await h.sdkReady();assert.equal(h.instances[0].events.length,1);
});
test('explicit SDK privacy settings and one page view for each SPA destination',async()=>{
 const h=harness({consent:'accepted'});await h.sdkReady();const c=h.instances[0];
 assert.equal(c.options.autocapture,false);assert.equal(c.options.remoteConfig.fetchRemoteConfig,false);
 assert.equal(c.options.enableDiagnostics,false);assert.equal(c.options.trackingOptions.ipAddress,false);
 assert.equal(c.options.identityStorage,'localStorage');assert.equal(c.events[0].event_properties.referrer_origin,'https://example.com');
 assert.equal(c.events[0].event_properties.environment,'production');assert.equal(c.events.length,1);
 await h.event('mixly:page');assert.equal(c.events.length,1);
 await h.navigate('/en/blog');assert.deepEqual(c.events.slice(-2).map(e=>e.event_type),['page_view','blog_open']);
 h.location.search='?slug=private-secret&email=private@example.com';
 await h.navigate('/en/blog/how-to-mix-hookah-tobacco');assert.equal(c.events.at(-1).event_properties.article_slug,'how-to-mix-hookah-tobacco');
 assert.ok(!JSON.stringify(c.events).includes('private-secret'));assert.ok(!JSON.stringify(c.events).includes('private@example'));
 await h.navigate('/en/blog');assert.equal(c.events.filter(e=>e.event_type==='page_view').length,4);
 assert.ok(h.panel());assert.equal(h.panel().hidden,true);
 await h.navigate('/s/sensitive-share-code');assert.equal(c.events.at(-1).event_properties.page_path,'/s/:code');
});
test('one explicit language and store click event',async()=>{
 const h=harness({consent:'accepted'});await h.sdkReady();const c=h.instances[0];
 await h.event('mixly:language-choice',{detail:{from:'en',to:'de'}});await h.event('mixly:locale',{detail:{lang:'de'}});await h.event('mixly:locale',{detail:{lang:'de'}});
 assert.equal(c.events.filter(e=>e.event_type==='language_change').length,1);
 const link={href:'https://apps.apple.com/app/id6762792005',closest:selector=>selector==='.hero'?{}:null};
 await h.event('click',{target:{closest:selector=>selector==='a[href]'?link:null}});
 assert.equal(c.events.at(-1).event_type,'store_click');assert.equal(c.events.at(-1).event_properties.placement,'hero');
});
test('withdrawal blocks queued events and retries, removes identity and supports reaccept',async()=>{
 const h=harness({consent:'accepted'});await h.sdkReady();const old=h.instances[0];
 h.storage.set('AMP_db21b88f9a', 'identity');h.storage.set('AMP_unsent_db21b88f9a','queue');h.storage.set('unrelated','keep');
 await h.click('reject');await old.upload();await old.config.transportProvider.send('',{event_type:'retry'});assert.equal(h.sent.length,0);
 assert.equal(h.storage.has('mixly-amplitude-device-id'),false);assert.equal(h.storage.has('AMP_db21b88f9a'),false);assert.equal(h.storage.has('AMP_unsent_db21b88f9a'),false);assert.equal(h.storage.get('unrelated'),'keep');
 await h.click('accept');assert.equal(h.instances.length,2);await old.config.transportProvider.send('',{event_type:'old-retry'});assert.equal(h.sent.length,0);
 await h.instances[1].upload();assert.equal(h.sent.length,1);
});
test('reject while SDK loads never initializes; quick reaccept waits for cleanup',async()=>{
 const h=harness();await h.click('accept');await h.click('reject');await h.sdkReady();assert.equal(h.instances.length,0);
 await h.click('accept');assert.equal(h.instances.length,1);
 const pending=harness({consent:'accepted',deferInit:true});await pending.sdkReady();await pending.click('reject');await pending.click('accept');
 assert.equal(pending.instances.length,1);await pending.finishInit();assert.equal(pending.instances.length,2);await pending.finishInit();
 assert.equal(pending.instances[0].events.length,0);assert.equal(pending.instances[1].events.length,1);
});
test('cross-tab withdrawal and unavailable storage preserve consent semantics',async()=>{
 const h=harness({consent:'accepted'});await h.sdkReady();h.storage.set('mixly-analytics-consent','rejected');await h.event('storage',{key:'mixly-analytics-consent'});await h.instances[0].upload();assert.equal(h.sent.length,0);
 const blocked=harness({blockedStorage:true});assert.equal(blocked.scripts.length,0);await blocked.click('accept');await blocked.sdkReady();assert.equal(blocked.instances[0].events.length,1);await blocked.click('reject');await blocked.instances[0].upload();assert.equal(blocked.sent.length,0);
});

test('cross-tab quick revoke and reaccept invalidates old uploads before storage callbacks',async()=>{
 const h=harness({consent:'accepted'});await h.sdkReady();const old=h.instances[0];
 h.storage.set('mixly-analytics-revocation','new-epoch');h.storage.set('mixly-analytics-consent','accepted');
 await old.config.transportProvider.send('',{event_type:'old-retry'},true);assert.equal(h.sent.length,0);
 await h.event('storage',{key:'mixly-analytics-revocation'});assert.equal(h.instances.length,2);
 await h.event('storage',{key:'mixly-analytics-consent'});assert.equal(h.instances.length,2);
});
