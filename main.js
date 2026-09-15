var _t=Object.defineProperty;var Hr=Object.getOwnPropertyDescriptor;var Gr=Object.getOwnPropertyNames;var Wr=Object.prototype.hasOwnProperty;var We=(a,o)=>()=>(a&&(o=a(a=0)),o);var ps=(a,o)=>{for(var t in o)_t(a,t,{get:o[t],enumerable:!0})},jr=(a,o,t,e)=>{if(o&&typeof o=="object"||typeof o=="function")for(let s of Gr(o))!Wr.call(a,s)&&s!==t&&_t(a,s,{get:()=>o[s],enumerable:!(e=Hr(o,s))||e.enumerable});return a};var Vr=a=>jr(_t({},"__esModule",{value:!0}),a);var le,je,z,Y=We(()=>{le=["\u89D2\u8272\u540D\u79F0","\u53F0\u8BCD\u5BF9\u8BDD","\u573A\u666F\u73AF\u5883","\u5185\u5FC3\u72EC\u767D","\u65C1\u767D\u53D9\u4E8B","\u7CFB\u7EDF\u6307\u4EE4","\u5907\u6CE8\u6807\u8BB0","\u672A\u5206\u7C7B"],je=["\u65C1\u767D\u5305\u88F9","\u53F0\u8BCD\u5305\u88F9","\u6CE8\u91CA\u533A\u95F4","\u53C2\u6570\u5757","\u81EA\u5B9A\u4E49\u7B26\u53F7","\u672A\u5206\u7C7B"],z="1.0.0"});function Ts(a,o){var s,r,i,n;let t=String(a||"").split(".").map(l=>parseInt(l,10)||0),e=String(o||"").split(".").map(l=>parseInt(l,10)||0);for(let l=0;l<3;l++){if(((s=t[l])!=null?s:0)>((r=e[l])!=null?r:0))return 1;if(((i=t[l])!=null?i:0)<((n=e[l])!=null?n:0))return-1}return 0}function Me(a){return`${a}_${Date.now().toString(36)}${Math.random().toString(36).slice(2,7)}`}var Mt=We(()=>{});function _s(a,o,t,e,s){new Lt(a,o==="token"?"\u9009\u62E9\u4EE4\u724C\u5206\u7C7B":"\u9009\u62E9\u89C4\u5219\u5206\u7C7B",[...e],t||"\u672A\u5206\u7C7B",s).open()}function ce(a,o,t,e){new At(a,o,t,e).open()}function Se(a,o,t){new It(a,o,t).open()}function Ps(a,o,t){new Ft(a,o,t).open()}function Rs(a,o,t,e,s){new Bt(a,o,t,e,s).open()}function Ds(a,o,t){new Ot(a,o,t).open()}function Ms(a,o,t,e){new $t(a,o,t,e).open()}function Ls(a,o,t,e,s,r,i){new Nt(a,o,t,e,s,r,i).open()}function As(a,o,t,e){new zt(a,o,t,e).open()}function ci(a){if(!a)return null;let o=a.trim().match(/^#?([0-9a-fA-F]{6})$/);return o?`#${o[1]}`:null}function Is(a,o,t,e){new Ht(a,o,t,e).open()}var q,Lt,At,It,Ft,Bt,Ot,$t,Nt,zt,Ht,tt=We(()=>{q=require("obsidian"),Lt=class extends q.Modal{constructor(t,e,s,r,i){super(t);this.title=e;this.options=s;this.current=r;this.onPick=i}onOpen(){this.contentEl.empty(),this.titleEl.setText(this.title);let t=this.contentEl.createDiv({cls:"pc-pk-pick-list"});for(let e of this.options){let s=t.createDiv({cls:"pc-pk-pick-row"});e===this.current&&s.addClass("is-current"),s.createSpan({text:e}),s.addEventListener("click",()=>{this.close(),this.onPick(e)})}}onClose(){this.contentEl.empty()}};At=class extends q.Modal{constructor(t,e,s,r){super(t);this.titleText=e;this.desc=s;this.onConfirm=r}onOpen(){this.contentEl.empty(),this.titleEl.setText(this.titleText),this.contentEl.createDiv({cls:"pc-pk-confirm-desc",text:this.desc});let t=this.contentEl.createDiv({cls:"pc-pk-modal-actions"});t.createEl("button",{text:"\u53D6\u6D88"}).addEventListener("click",()=>this.close()),t.createEl("button",{text:"\u786E\u8BA4",cls:"mod-warning"}).addEventListener("click",()=>{this.close(),this.onConfirm()})}onClose(){this.contentEl.empty()}};It=class extends q.Modal{constructor(t,e,s){super(t);this.current=e;this.onRename=s}onOpen(){this.contentEl.empty(),this.titleEl.setText("\u91CD\u547D\u540D\u5305");let t=this.contentEl.createEl("input",{cls:"pc-pk-rename-input",attr:{type:"text",value:this.current,placeholder:"\u8F93\u5165\u65B0\u540D\u79F0"}}),e=this.contentEl.createDiv({cls:"pc-pk-modal-actions"});e.createEl("button",{text:"\u53D6\u6D88"}).addEventListener("click",()=>this.close()),e.createEl("button",{text:"\u786E\u8BA4",cls:"mod-cta"}).addEventListener("click",()=>{let s=t.value.trim();this.close(),s&&s!==this.current&&this.onRename(s)})}onClose(){this.contentEl.empty()}};Ft=class extends q.Modal{constructor(t,e,s){super(t);this.entries=e;this.onConfirm=s;this.selected=new Set}onOpen(){this.contentEl.empty(),this.titleEl.setText("\u6E05\u7406\u672A\u5F15\u7528\u8D44\u6E90"),this.contentEl.createDiv({cls:"pc-pk-modal-desc",text:"\u4EE5\u4E0B\u8D44\u6E90\u672A\u88AB\u4EFB\u4F55\u5305\u5F15\u7528\u4E14\u672A\u9501\u5B9A\uFF0C\u8BF7\u52FE\u9009\u9700\u8981\u5220\u9664\u7684\u8D44\u6E90\u3002\u5220\u9664\u540E\u4E0D\u53EF\u6062\u590D\u3002"});let t=this.contentEl.createDiv({cls:"pc-pk-clean-list"});for(let r of this.entries){let i=t.createDiv({cls:"pc-pk-clean-row"}),n=i.createEl("input",{attr:{type:"checkbox"}});n.addEventListener("change",()=>{n.checked?this.selected.add(r.id):this.selected.delete(r.id)});let l=r.kind==="token"?"\u4EE4\u724C":"\u89C4\u5219";i.createSpan({cls:"pc-pk-clean-kind",text:l}),i.createSpan({cls:"pc-pk-clean-name",text:r.name,attr:{title:r.name}})}let e=this.contentEl.createDiv({cls:"pc-pk-modal-actions"});e.createEl("button",{text:"\u53D6\u6D88"}).addEventListener("click",()=>this.close()),e.createEl("button",{text:"\u5220\u9664\u9009\u4E2D\u8D44\u6E90",cls:"mod-warning"}).addEventListener("click",()=>{let r=this.entries.filter(i=>this.selected.has(i.id));this.close(),r.length>0&&this.onConfirm(r)})}onClose(){this.contentEl.empty()}};Bt=class extends q.Modal{constructor(t,e,s,r,i){super(t);this.stats=e;this.suggestions=s;this.onApplySuggestions=r;this.onLockIdle=i}onOpen(){this.contentEl.empty(),this.titleEl.setText("\u626B\u63CF\u5E76\u5F52\u7C7B\u8D44\u6E90");let t=this.contentEl.createDiv({cls:"pc-pk-stats-grid"}),e=[["\u2705 \u5DF2\u5F15\u7528\uFF08\u6D3B\u8DC3\uFF09",String(this.stats.active)],["\u{1F5C2}\uFE0F \u672A\u5F15\u7528\uFF08\u95F2\u7F6E\uFF09",String(this.stats.idle)],["\u26A0\uFE0F \u5F15\u7528\u4E22\u5931\uFF08\u5931\u6548\uFF09",String(this.stats.missing)],["\u{1F512} \u53D7\u4FDD\u62A4\u9501\u5B9A",String(this.stats.locked)]];for(let[r,i]of e){let n=t.createDiv({cls:"pc-pk-stats-cell"});n.createDiv({cls:"pc-pk-stats-num",text:i}),n.createDiv({cls:"pc-pk-stats-label",text:r})}if(this.suggestions.length>0){this.contentEl.createDiv({cls:"pc-pk-modal-desc",text:"\u542F\u53D1\u5F0F\u63A8\u8350\u5206\u7C7B\uFF08\u4EC5\u4FEE\u6539\u300C\u672A\u5206\u7C7B\u300D\u8D44\u6E90\uFF0C\u4E0D\u8986\u76D6\u624B\u52A8\u5206\u7C7B\u4E0E\u9501\u5B9A\u72B6\u6001\uFF09\uFF1A"});let r=this.contentEl.createDiv({cls:"pc-pk-suggest-list"});for(let{entry:i,category:n}of this.suggestions.slice(0,50)){let l=r.createDiv({cls:"pc-pk-suggest-row"});l.createSpan({cls:"pc-pk-clean-kind",text:i.kind==="token"?"\u4EE4\u724C":"\u89C4\u5219"}),l.createSpan({cls:"pc-pk-clean-name",text:i.name,attr:{title:i.name}}),l.createSpan({cls:"pc-pk-suggest-arrow",text:"\u2192"}),l.createSpan({cls:"pc-pk-suggest-target",text:n})}}else this.contentEl.createDiv({cls:"pc-pk-modal-desc",text:"\u6CA1\u6709\u53EF\u63A8\u8350\u7684\u5206\u7C7B\u53D8\u66F4\u3002"});let s=this.contentEl.createDiv({cls:"pc-pk-modal-actions"});this.suggestions.length>0&&s.createEl("button",{text:"\u5E94\u7528\u63A8\u8350\u5206\u7C7B",cls:"mod-cta"}).addEventListener("click",()=>{this.close(),this.onApplySuggestions()}),s.createEl("button",{text:"\u6279\u91CF\u9501\u5B9A\u95F2\u7F6E\u8D44\u6E90"}).addEventListener("click",()=>{this.close(),this.onLockIdle()}),s.createEl("button",{text:"\u5173\u95ED"}).addEventListener("click",()=>this.close())}onClose(){this.contentEl.empty()}};Ot=class extends q.Modal{constructor(t,e,s){super(t);this.entry=e;this.clonedFrom=s}onOpen(){this.contentEl.empty(),this.titleEl.setText(`\u5F15\u7528\u6765\u6E90\uFF1A${this.entry.name}`);let t=this.contentEl.createDiv({cls:"pc-pk-suggest-list"});if(this.entry.refPackages.length===0)t.createDiv({cls:"pc-pk-modal-desc",text:"\u6CA1\u6709\u88AB\u4EFB\u4F55\u5305\u5F15\u7528\u3002"});else for(let e of this.entry.refPackages)t.createDiv({cls:"pc-pk-suggest-row"}).createSpan({text:`\u{1F4E6} ${e}`});this.clonedFrom&&this.contentEl.createDiv({cls:"pc-pk-modal-desc",text:`\u514B\u9686\u6EAF\u6E90\uFF1A\u6765\u81EA\u5305\u300C${this.clonedFrom}\u300D`})}onClose(){this.contentEl.empty()}};$t=class extends q.Modal{constructor(t,e,s,r){super(t);this.tokens=e;this.rules=s;this.onConfirm=r}onOpen(){var s;this.contentEl.empty(),this.titleEl.setText("\u5BFC\u51FA\u5305\u9884\u89C8"),this.contentEl.createDiv({cls:"pc-pk-modal-desc",text:`\u5373\u5C06\u6253\u5305 ${this.tokens.length} \u4E2A\u4EE4\u724C\u3001${this.rules.length} \u4E2A\u89C4\u5219\u7684\u5B8C\u6574\u6570\u636E\u4E3A .stylepkg \u538B\u7F29\u5305\u3002`});let t=this.contentEl.createDiv({cls:"pc-pk-suggest-list"});for(let r of this.tokens){let i=t.createDiv({cls:"pc-pk-suggest-row"});i.createSpan({cls:"pc-pk-clean-kind",text:"\u4EE4\u724C"}),i.createSpan({cls:"pc-pk-clean-name",text:r.text||r.id,attr:{title:(s=r.note)!=null?s:""}})}for(let r of this.rules){let i=t.createDiv({cls:"pc-pk-suggest-row"});i.createSpan({cls:"pc-pk-clean-kind",text:"\u89C4\u5219"}),i.createSpan({cls:"pc-pk-clean-name",text:r.name||r.id})}let e=this.contentEl.createDiv({cls:"pc-pk-modal-actions"});e.createEl("button",{text:"\u53D6\u6D88"}).addEventListener("click",()=>this.close()),e.createEl("button",{text:"\u786E\u8BA4\u5BFC\u51FA",cls:"mod-cta"}).addEventListener("click",()=>{this.close(),this.onConfirm()})}onClose(){this.contentEl.empty()}};Nt=class extends q.Modal{constructor(t,e,s,r,i,n,l){super(t);this.packageName=e;this.newTokens=s;this.newRules=r;this.tokenIdConflicts=i;this.ruleIdConflicts=n;this.onConfirm=l}onOpen(){this.contentEl.empty(),this.titleEl.setText(`\u5BFC\u5165\u5305\uFF1A\u300C${this.packageName}\u300D`);let t=this.tokenIdConflicts+this.ruleIdConflicts;this.contentEl.createDiv({cls:"pc-pk-modal-desc",text:`\u5373\u5C06\u65B0\u589E ${this.newTokens.length} \u4E2A\u4EE4\u724C\u3001${this.newRules.length} \u4E2A\u89C4\u5219\u3002`+(t>0?`\u68C0\u6D4B\u5230 ${t} \u4E2A ID \u51B2\u7A81\uFF0C\u5C06\u81EA\u52A8\u751F\u6210\u5168\u65B0 ID \u5E76\u91CD\u5199\u5305\u5185\u8986\u76D6\u914D\u7F6E\u3002`:"\u65E0 ID \u51B2\u7A81\u3002")});let e=this.contentEl.createDiv({cls:"pc-pk-suggest-list"});for(let{token:r}of this.newTokens){let i=e.createDiv({cls:"pc-pk-suggest-row"});i.createSpan({cls:"pc-pk-clean-kind",text:"\u4EE4\u724C"}),i.createSpan({cls:"pc-pk-clean-name",text:r.text||r.id})}for(let{rule:r}of this.newRules){let i=e.createDiv({cls:"pc-pk-suggest-row"});i.createSpan({cls:"pc-pk-clean-kind",text:"\u89C4\u5219"}),i.createSpan({cls:"pc-pk-clean-name",text:r.name||r.id})}let s=this.contentEl.createDiv({cls:"pc-pk-modal-actions"});s.createEl("button",{text:"\u53D6\u6D88"}).addEventListener("click",()=>this.close()),s.createEl("button",{text:"\u786E\u8BA4\u5BFC\u5165",cls:"mod-cta"}).addEventListener("click",()=>{this.close(),this.onConfirm()})}onClose(){this.contentEl.empty()}};zt=class extends q.Modal{constructor(t,e,s,r){super(t);this.entry=e;this.current=s;this.onSave=r;this.inputs={}}onOpen(){var r,i,n,l,c;this.contentEl.empty();let t=this.entry.kind==="token";this.titleEl.setText(`\u5305\u7EA7\u6837\u5F0F\u8986\u76D6\uFF08${t?"\u4EE4\u724C":"\u89C4\u5219"}\uFF1A${this.entry.name}\uFF09`),this.contentEl.createDiv({cls:"pc-pk-modal-desc",text:t?"\u8986\u76D6\u4EC5\u5728\u672C\u5305\u5185\u751F\u6548\uFF08\u542F\u7528\u8BE5\u5305\u65F6\u538B\u8FC7\u4EE4\u724C\u672C\u4F53\u6837\u5F0F\uFF09\uFF1B\u7559\u7A7A = \u7EE7\u627F\u672C\u4F53\u6837\u5F0F\u3002":"\u8986\u76D6\u4EC5\u5728\u672C\u5305\u5185\u751F\u6548\uFF08\u542F\u7528\u8BE5\u5305\u65F6\u538B\u8FC7\u89C4\u5219\u672C\u4F53\u6837\u5F0F\uFF09\uFF1B\u7559\u7A7A = \u7EE7\u627F\u672C\u4F53\u6837\u5F0F\u3002"});let e=t?[{key:"color",label:"\u989C\u8272",type:"color"},{key:"fontStyle",label:"\u5B57\u4F53\u98CE\u683C",type:"select",options:["","bold","italic","normal"]}]:[{key:"color",label:"\u6587\u5B57\u989C\u8272",type:"color"},{key:"bgColor",label:"\u80CC\u666F\u8272",type:"color"},{key:"border",label:"\u8FB9\u6846\u6837\u5F0F",type:"select",options:["","dashed","solid","dotted"]}];for(let d of e){let p=this.contentEl.createDiv({cls:"pc-pk-ov-row"});if(p.createSpan({cls:"pc-pk-ov-label",text:d.label}),d.type==="color"){let g=p.createEl("input",{cls:"pc-pk-ov-color",attr:{type:"color"}}),u=(r=this.current)==null?void 0:r[d.key];g.value=(i=ci(u))!=null?i:"#000000",this.inputs[d.key]=g}else{let g=p.createEl("select",{cls:"pc-pk-ov-select"});for(let u of(n=d.options)!=null?n:[]){let h=g.createEl("option",{text:u===""?"\u7EE7\u627F\u672C\u4F53":u,attr:{value:u}});((c=(l=this.current)==null?void 0:l[d.key])!=null?c:"")===u&&(h.selected=!0)}this.inputs[d.key]=g}}let s=this.contentEl.createDiv({cls:"pc-pk-modal-actions"});s.createEl("button",{text:"\u53D6\u6D88"}).addEventListener("click",()=>this.close()),s.createEl("button",{text:"\u6E05\u9664\u8986\u76D6"}).addEventListener("click",()=>{this.close(),this.onSave(null)}),s.createEl("button",{text:"\u4FDD\u5B58\u8986\u76D6",cls:"mod-cta"}).addEventListener("click",()=>{var p,g;let d={};for(let u of e){let h=((g=(p=this.inputs[u.key])==null?void 0:p.value)!=null?g:"").trim();h&&(d[u.key]=h)}this.close(),this.onSave(Object.keys(d).length>0?d:null)})}onClose(){this.contentEl.empty()}};Ht=class extends q.Modal{constructor(t,e,s,r){super(t);this.ruleId=e;this.current=s;this.onSave=r;this.textarea=null}onOpen(){this.contentEl.empty(),this.titleEl.setText("\u89C4\u5219\u6807\u6CE8\u8BF4\u660E"),this.modalEl.addClass("pc-annotation-modal"),this.contentEl.createDiv({cls:"pc-annotation-rule",text:this.ruleId}),this.contentEl.createDiv({cls:"pc-annotation-tip",text:"\u5199\u4E0B\u4E3A\u4EC0\u4E48\u6807\u6CE8\u5B83 \u2014 \u9F20\u6807\u60AC\u505C\u5230\u67D3\u8272\u6587\u672C\u65F6\uFF0C\u6D6E\u7A97\u4F1A\u663E\u793A\u8FD9\u6BB5\u8BF4\u660E\u3002"}),this.textarea=this.contentEl.createEl("textarea",{cls:"pc-annotation-textarea",attr:{rows:"5",placeholder:"\u4F8B\u5982\uFF1A\u4E3B\u89D2\u53F0\u8BCD\u4E13\u7528\u8272\uFF0C\u65B9\u4FBF\u5FEB\u901F\u5B9A\u4F4D\u5BF9\u8BDD\u6D41\u2026"}}),this.textarea.value=this.current;let t=this.contentEl.createDiv({cls:"pc-annotation-actions"});t.createEl("button",{text:"\u53D6\u6D88"}).addEventListener("click",()=>this.close()),t.createEl("button",{text:"\u4FDD\u5B58",cls:"mod-cta"}).addEventListener("click",()=>{var e,s;this.onSave((s=(e=this.textarea)==null?void 0:e.value.trim())!=null?s:""),this.close()})}onClose(){this.contentEl.empty()}}});var Gt={};ps(Gt,{exportPackage:()=>st,importStylePkg:()=>rt,ruleIdToDef:()=>te});function Fs(){try{let a=typeof globalThis.require=="function"?globalThis.require:null;if(!a)return null;let o=a("zlib");return o&&typeof o.deflateSync=="function"&&typeof o.inflateSync=="function"?o:null}catch(a){return null}}function st(a,o){var s,r;if(!o.manifest){new Ee.Notice("\u65E0\u6548\u5305\u65E0\u6CD5\u5BFC\u51FA");return}let t=o.embeddedTokens?o.embeddedTokens.map(i=>structuredClone(i)):((s=o.refTokenIds)!=null?s:[]).map(i=>a.settings.customTextColors.find(n=>n.id===i)).filter(i=>!!i).map(i=>structuredClone(i)),e=o.embeddedRules?o.embeddedRules.map(i=>structuredClone(i)):((r=o.refRuleIds)!=null?r:[]).map(i=>te(a,i)).filter(i=>!!i);Ms(a.app,t,e,()=>{let i={format:"prompt-colorizer-stylepkg",specVersion:z,exportedAt:new Date().toISOString(),manifest:{...structuredClone(o.manifest),type:"user"},tokens:t,rules:e};di(i,`${o.dirName}.stylepkg`),new Ee.Notice(`\u5DF2\u5BFC\u51FA\u300C${i.manifest.name}\u300D\uFF08${t.length} \u4EE4\u724C / ${e.length} \u89C4\u5219\uFF09`)})}function te(a,o){var r,i,n,l,c,d;let t=((r=a.settings.customRules)!=null?r:[]).find(p=>p.id===o);if(t)return structuredClone(t);let e=((n=(i=a.currentRuleSet)==null?void 0:i.rules)!=null?n:[]).find(p=>p.id===o);if(!e)return null;let s=(d=(c=(l=a.currentRuleSet)==null?void 0:l.styleRules)==null?void 0:c[e.cssClass])!=null?d:void 0;return{id:e.id,name:e.id,regex:e.regex.source,cssClass:e.cssClass,priority:e.priority,captureGroup:e.captureGroup,flags:e.regex.flags,style:s?JSON.parse(JSON.stringify(s)):void 0}}function di(a,o){let t=JSON.stringify(a,null,2),e;try{let i=Fs();if(i){let n=new TextEncoder().encode("PCPKG1"),l=i.deflateSync(Buffer.from(t,"utf-8")),c=new Uint8Array(n.length+l.length);c.set(n,0),c.set(l,n.length),e=new Blob([c],{type:"application/octet-stream"})}else throw new Error("zlib unavailable")}catch(i){e=new Blob([t],{type:"application/json"})}let s=URL.createObjectURL(e),r=document.createElement("a");r.href=s,r.download=o,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(s)}async function pi(a){let o=new Uint8Array(await a.arrayBuffer()),t;if(new TextDecoder().decode(o.slice(0,6))==="PCPKG1"){let r=Fs();if(!r)throw new Error("\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301\u89E3\u538B deflate \u683C\u5F0F .stylepkg");let i=r.inflateSync(Buffer.from(o.slice(6)));t=new TextDecoder().decode(i)}else t=new TextDecoder().decode(o);let s=JSON.parse(t);if(!s||s.format!=="prompt-colorizer-stylepkg"||!s.manifest)throw new Error("\u4E0D\u662F\u6709\u6548\u7684 .stylepkg \u5305\u6587\u4EF6");return s}function rt(a,o){let t=document.createElement("input");t.type="file",t.accept=".stylepkg,.json",t.addEventListener("change",()=>{var s;let e=(s=t.files)==null?void 0:s[0];e&&(async()=>{try{let r=await pi(e);if(Ts(r.specVersion,z)>0){new Ee.Notice(`\u5BFC\u5165\u5931\u8D25\uFF1A\u5305\u89C4\u8303\u7248\u672C ${r.specVersion} \u9AD8\u4E8E\u5F53\u524D\u652F\u6301\u7248\u672C ${z}\uFF0C\u8BF7\u5347\u7EA7\u8F6F\u4EF6\u540E\u91CD\u8BD5`);return}let i=gi(a,r);Ls(a.app,r.manifest.name,i.newTokens,i.newRules,i.tokenIdConflicts,i.ruleIdConflicts,()=>void ui(a,r,i).then(()=>o==null?void 0:o()))}catch(r){new Ee.Notice(`\u5BFC\u5165\u5931\u8D25: ${r instanceof Error?r.message:String(r)}`)}})()}),t.click()}function gi(a,o){var u,h,y,m,b,v;let t=new Set(((u=a.settings.customTextColors)!=null?u:[]).map(k=>k.id)),e=new Set([...((y=(h=a.currentRuleSet)==null?void 0:h.rules)!=null?y:[]).map(k=>k.id),...((m=a.settings.customRules)!=null?m:[]).map(k=>k.id)]),s=[],r={},i=0;for(let k of(b=o.tokens)!=null?b:[]){let _=structuredClone(k),R=_.id;t.has(R)&&(R=Me("token"),i++),t.add(R),r[_.id]=R,_.id=R,s.push({token:_,newId:R})}let n=[],l={},c=0;for(let k of(v=o.rules)!=null?v:[]){let _=structuredClone(k),R=_.id,T=_.cssClass;e.has(R)&&(R=Me("rule"),T=`dsl-pkg-${R}`,c++),e.add(R),l[_.id]=R,_.id=R,_.cssClass=T,n.push({rule:_,newId:R,newCssClass:T})}let d=hi(o.manifest.packageId||o.manifest.name||"imported_pack"),p=d,g=2;for(;a.loadedPackages.some(k=>k.dirName===p);)p=`${d}_${g++}`;return{newTokens:s,newRules:n,tokenIdConflicts:i,ruleIdConflicts:c,tokenIdMap:r,ruleIdMap:l,newDirName:p}}async function ui(a,o,t){var i,n,l,c;for(let{token:d}of t.newTokens)a.settings.customTextColors.push(d);for(let{rule:d}of t.newRules)a.settings.customRules.push(d);let e=structuredClone(o.manifest),s={};for(let[d,p]of Object.entries((i=e.tokenOverrides)!=null?i:{})){let g=(n=t.tokenIdMap[d])!=null?n:d;s[g]=p}let r={};for(let[d,p]of Object.entries((l=e.ruleOverrides)!=null?l:{})){let g=(c=t.ruleIdMap[d])!=null?c:d;r[g]=p}Object.keys(s).length>0?e.tokenOverrides=s:delete e.tokenOverrides,e.ruleOverrides=r,e.packageId=t.newDirName,e.specVersion=o.specVersion||z,e.type="user",await a.pkgManager.createPackage(e,t.newTokens.map(d=>d.token),t.newRules.map(d=>d.rule)),await a.saveSettings(),a.applyCustomTextColorsStyles(),a.appendCustomRules(),a.refreshEditorExtensions(),await a.reloadPackages(),a.app.workspace.trigger("prompt-colorizer:custom-colors-changed"),new Ee.Notice(`\u5BFC\u5165\u5B8C\u6210\uFF1A\u300C${e.name}\u300D \u65B0\u589E\u4EE4\u724C ${t.newTokens.length} \u4E2A\u3001\u89C4\u5219 ${t.newRules.length} \u4E2A`+(t.tokenIdConflicts+t.ruleIdConflicts>0?`\uFF08${t.tokenIdConflicts+t.ruleIdConflicts} \u4E2A ID \u51B2\u7A81\u5DF2\u81EA\u52A8\u91CD\u751F\u6210\uFF09`:""))}function hi(a){let o=a.replace(/[\\/:*?"<>|#^[\]]/g,"_").trim();return o.length>0?o:"imported_pack"}var Ee,ye=We(()=>{Ee=require("obsidian");Y();Mt();tt()});var Bo={};ps(Bo,{default:()=>Et});module.exports=Vr(Bo);var M=require("obsidian");Y();var gs=["danger","success","warning","info","purple","cyan","pink","amber","orange","paren"],qr=["indigo","emerald","slate","darkslate","yellow","music"];function Ur(){let a={};for(let o of qr)a[o]=!1;return a}var Kr=["highlightVariables","highlightRoleTags","highlightRoleHeaders","highlightInstructionMarkers","highlightComments","highlightCodeBlocks","highlightJsonBlocks","highlightInlineCode","highlightSectionMarkers","highlightShotHeaders","highlightAssetRefs","highlightFieldLabels","highlightDialogue","highlightAudioRefs","highlightNegativePrompts","highlightTechParams","highlightParentheticals","highlightEmphasisWeights","highlightLoraRefs","highlightBracketEmphasis","highlightQualityTags","highlightSdNegativeHeader","highlightCameraMoves","highlightSceneTransitions"],he=["highlightVariables","highlightRoleTags","highlightRoleHeaders","highlightInstructionMarkers","highlightComments","highlightCodeBlocks","highlightJsonBlocks","highlightInlineCode"],Ve=["highlightSectionMarkers","highlightShotHeaders","highlightAssetRefs","highlightFieldLabels","highlightDialogue","highlightAudioRefs","highlightNegativePrompts","highlightTechParams","highlightParentheticals","highlightCameraMoves","highlightSceneTransitions"],Yr=[{id:"agent-all",name:"\u5168\u80FD\u7740\u8272\u8C03\u6821\u5E08",description:"\u542F\u7528\u6240\u6709\u9AD8\u4EAE\u89C4\u5219\uFF0C\u9002\u914D\u4EFB\u4F55\u63D0\u793A\u8BCD\u573A\u666F",icon:"\u2726",enabledKeys:[...Kr]},{id:"agent-basic",name:"\u63D0\u793A\u8BCD\u5DE5\u7A0B\u5E08",description:"\u4EC5\u542F\u7528\u57FA\u7840\u9AD8\u4EAE\uFF1A\u53D8\u91CF\u3001\u89D2\u8272\u6807\u7B7E\u3001\u4EE3\u7801\u5757\u7B49",icon:"\u25A3",enabledKeys:[...he]},{id:"agent-video",name:"\u89C6\u9891\u5206\u955C\u5E08",description:"\u89C6\u9891/\u5206\u955C\u63D0\u793A\u8BCD\u4E13\u7528\uFF1A\u533A\u6BB5\u3001\u5206\u955C\u3001\u53F0\u8BCD\u3001\u8FD0\u955C\u7B49",icon:"\u25B6",enabledKeys:[...Ve]},{id:"agent-minimal",name:"\u6781\u7B80\u6807\u6CE8\u5E08",description:"\u4EC5\u533A\u6BB5\u6807\u8BB0\u4E0E\u5206\u955C\u6807\u9898\uFF0C\u964D\u4F4E\u89C6\u89C9\u566A\u97F3",icon:"\u25CB",enabledKeys:["highlightSectionMarkers","highlightShotHeaders"]}],Jr=["highlightEmphasisWeights","highlightLoraRefs","highlightBracketEmphasis","highlightQualityTags","highlightSdNegativeHeader"],Pt=[{id:"pack-video",name:"\u89C6\u9891\u5206\u955C\u5305",description:"\u5206\u955C\u811A\u672C/\u89C6\u9891\u63D0\u793A\u8BCD\uFF1A\u533A\u6BB5\u3001\u5206\u955C\u3001\u53F0\u8BCD\u3001\u8FD0\u955C\u3001\u5149\u5F71\u8BCD\u6C47\u5168\u5F00",icon:"\u{1F3AC}",direction:"video",enabledKeys:[...he,...Ve],colorScheme:"default",palettePreset:"",builtin:!0},{id:"pack-image",name:"\u56FE\u50CF\u751F\u6210\u5305",description:"SD/MJ/\u901A\u7528\u56FE\u50CF\u63D0\u793A\u8BCD\uFF1A\u6743\u91CD\u3001LoRA\u3001\u8D28\u91CF\u6807\u7B7E\u3001\u6444\u5F71\u98CE\u683C",icon:"\u{1F3A8}",direction:"image",enabledKeys:[...he,...Jr],colorScheme:"vivid",palettePreset:"",builtin:!0},{id:"pack-writing",name:"\u5199\u4F5C\u53D9\u4E8B\u5305",description:"\u5C0F\u8BF4/\u5267\u672C/\u6587\u6848\uFF1A\u57FA\u7840\u8BED\u6CD5 + \u53D9\u4E8B\u4E0E\u60C5\u7EEA\u8BCD\u6C47",icon:"\u270D\uFE0F",direction:"writing",enabledKeys:[...he],colorScheme:"soft",palettePreset:"",builtin:!0},{id:"pack-code",name:"\u7F16\u7A0B\u63D0\u793A\u5305",description:"Agent/CoT/\u4EE3\u7801\u751F\u6210\uFF1A\u53D8\u91CF\u3001\u4EE3\u7801\u5757 + AI/\u7F16\u7A0B\u672F\u8BED",icon:"\u{1F4BB}",direction:"code",enabledKeys:[...he],colorScheme:"default",palettePreset:"",builtin:!0},{id:"pack-minimal",name:"\u6781\u7B80\u6807\u6CE8\u5305",description:"\u4EC5\u533A\u6BB5\u4E0E\u5206\u955C\u6807\u9898\u7ED3\u6784\u6807\u6CE8\uFF0C\u96F6\u8BCD\u6C47\u5E72\u6270",icon:"\u25CB",direction:"minimal",enabledKeys:["highlightSectionMarkers","highlightShotHeaders"],colorScheme:"mono",palettePreset:"",builtin:!0},{id:"pack-seed",name:"Seed \u4E13\u5C5E\u5305",description:"\u5B57\u8282 Seedance 2.0/2.5 \u89C6\u9891\u63D0\u793A\u8BCD\uFF1A\u955C\u5934\u8BED\u8A00 + \u753B\u8D28 + \u53C2\u6570\u5F3A\u5316",icon:"\u{1F331}",direction:"video",enabledKeys:[...he,...Ve,"highlightTechParams","highlightEmphasisWeights"],colorScheme:"vivid",palettePreset:"neon",builtin:!0},{id:"pack-h3",name:"H3 \u4E13\u5C5E\u5305",description:"MiniMax H3 \u89C6\u9891\u63D0\u793A\u8BCD\uFF1A\u533A\u6BB5/\u5206\u955C\u5F3A\u5316 + \u8FD0\u955C\u5149\u5F71\u8BCD\u6C47\u805A\u7126",icon:"\u{1F40B}",direction:"video",enabledKeys:[...he,...Ve],colorScheme:"default",palettePreset:"macaron",builtin:!0}],Rt=[{type:"system",label:"System \u63D0\u793A\u8BCD",color:"#ef4444",icon:"shield"},{type:"user",label:"User \u63D0\u793A\u8BCD",color:"#3b82f6",icon:"user"},{type:"assistant",label:"Assistant \u63D0\u793A\u8BCD",color:"#10b981",icon:"bot"},{type:"tool",label:"Tool \u63D0\u793A\u8BCD",color:"#ea580c",icon:"wrench"},{type:"example",label:"\u793A\u4F8B/Few-shot",color:"#0891b2",icon:"list"},{type:"variable",label:"\u53D8\u91CF\u5B9A\u4E49",color:"#f59e0b",icon:"braces"},{type:"template",label:"\u6A21\u677F\u6587\u4EF6",color:"#8b5cf6",icon:"file-code"},{type:"video",label:"\u89C6\u9891\u63D0\u793A\u8BCD",color:"#db2777",icon:"video"},{type:"none",label:"\u666E\u901A\u6587\u4EF6",color:"#6b7280",icon:"file"}],Qr=[{path:"prompts/system",type:"system"},{path:"prompts/user",type:"user"},{path:"prompts/assistant",type:"assistant"},{path:"prompts/tool",type:"tool"},{path:"prompts/examples",type:"example"},{path:"prompts/variables",type:"variable"},{path:"prompts/templates",type:"template"},{path:"prompts/video",type:"video"}],qe={editorHighlightEnabled:!0,fileColorizerEnabled:!0,readerModeEnabled:!0,embedCardStyle:"tech",readerTableBlockEnabled:!0,readerTableRounded:!0,readerTableHeaderBg:!0,readerTableStickyHeader:!1,readerTableFirstCol:!1,readerTableZebra:!0,readerTableZebraAlpha:4,readerTableHover:!0,readerTableHoverAlpha:8,readerTableDensity:"normal",readerMetadataBlockEnabled:!0,readerMetadataKeyBold:!0,readerMetadataRowHover:!0,readerMetadataDensity:"normal",colorMode:"auto",colorScheme:"default",palettePreset:"",tokenDeriveAlphas:{},colorBlindAssist:!1,folderPalettes:[],folderPalettesEnabled:!1,highlightVariables:!0,highlightRoleTags:!0,highlightRoleHeaders:!0,highlightInstructionMarkers:!0,highlightComments:!0,highlightCodeBlocks:!0,highlightJsonBlocks:!0,highlightInlineCode:!0,highlightSectionMarkers:!0,highlightShotHeaders:!0,highlightAssetRefs:!0,highlightFieldLabels:!0,highlightDialogue:!0,highlightAudioRefs:!0,highlightNegativePrompts:!0,highlightTechParams:!0,highlightParentheticals:!0,highlightEmphasisWeights:!0,highlightLoraRefs:!0,highlightBracketEmphasis:!0,highlightQualityTags:!0,highlightSdNegativeHeader:!0,highlightCameraMoves:!0,highlightSceneTransitions:!0,fileTypeColors:Rt,detectByFrontmatter:!0,detectByFolder:!0,detectByFilename:!1,folderMappings:Qr,language:"zh",ruleSource:"builtin",gitRawBaseUrl:"https://raw.githubusercontent.com/xiongmiaozai/prompt-dsl-highlight-rules/main/rules",gitBranch:"main",autoUpdateRules:!1,autoUpdateInterval:24,lastCheckTime:0,contextSemanticEnabled:!0,ruleSources:[{id:"github-official",name:"GitHub \u5B98\u65B9\u6E90",type:"github",rawBaseUrl:"https://raw.githubusercontent.com/xiongmiaozai/prompt-dsl-highlight-rules/main/rules",needsToken:!1,enabled:!0},{id:"gitee-mirror",name:"Gitee \u955C\u50CF\u6E90(\u56FD\u5185\u63A8\u8350)",type:"gitee",rawBaseUrl:"https://gitee.com/xiongmiaozai/prompt-dsl-highlight-rules/raw/main/rules",needsToken:!1,enabled:!0},{id:"jsdelivr-cdn",name:"jsDelivr CDN \u6E90",type:"custom",rawBaseUrl:"https://cdn.jsdelivr.net/gh/xiongmiaozai/prompt-dsl-highlight-rules@main/rules",needsToken:!1,enabled:!0}],activeRuleSourceId:"github-official",agentPresets:Yr,activeAgentPresetId:"",promptPacks:Pt,activePackId:"",gitTokenEnabled:!1,gitToken:"",gitReportEnabled:!0,downloadToCache:!0,lastPullReport:null,customColors:{},tokenEnabled:Ur(),customTextColors:[],customTextPopoverAutoShow:!0,customTextPopoverDelay:350,colorMapCollapsed:[],colorMapPackFilter:!1,packageMode:"single",enabledPackageIds:[],packageOrder:[],colorMapViewMode:"package",ruleMeta:{},ruleAnnotations:{},customRules:[],legacyResourcesMigrated:!1};function us(a,o){let t={...a};for(let e in o){let s=e;if(!(s in a))continue;let r=o[s],i=a[s];(Array.isArray(r)&&Array.isArray(i)||r!=null)&&(t[s]=r)}return t}var w=require("obsidian");Y();function Pe(a,o){let t=a.trim();if(/^#[0-9a-fA-F]{6}$/.test(t)){let e=Math.round(o*255).toString(16).padStart(2,"0");return t+e}if(/^#[0-9a-fA-F]{3}$/.test(t)){let e="#"+t.slice(1).split("").map(s=>s+s).join("");return Pe(e,o)}return t}function Re(a){let o=a.trim();return/^#[0-9a-fA-F]{3,4}$/.test(o)||/^#[0-9a-fA-F]{6}$/.test(o)||/^#[0-9a-fA-F]{8}$/.test(o)}function Xr(a,o){let t=e=>{let s=e.trim().toLowerCase();return/^#[0-9a-f]{3}$/.test(s)?"#"+s.slice(1).split("").map(r=>r+r).join(""):s};return t(a)===t(o)}var hs=[{value:"glow",labelKey:"customText.effectGlow",declarations:{"text-shadow":"0 0 {param:radius}px {color55}, 0 0 {param:spread}px {color30}, 0 0 {param:halo}px {color12}"},params:[{id:"radius",labelKey:"customText.paramCoreRadius",min:1,max:8,step:1,def:2,unit:"px"},{id:"spread",labelKey:"customText.paramSpread",min:2,max:20,step:1,def:6,unit:"px"},{id:"halo",labelKey:"customText.paramHalo",min:4,max:40,step:1,def:14,unit:"px"}]},{value:"shadow",labelKey:"customText.effectShadow",declarations:{"text-shadow":"{param:offset}px {param:offset}px {param:blur}px rgba(0, 0, 0, {param:opacity})"},params:[{id:"offset",labelKey:"customText.paramOffset",min:1,max:6,step:1,def:1,unit:"px"},{id:"blur",labelKey:"customText.paramBlur",min:0,max:12,step:1,def:3,unit:"px"},{id:"opacity",labelKey:"customText.paramOpacity",min:.05,max:.9,step:.05,def:.45}]},{value:"bold",labelKey:"customText.effectBold",declarations:{"font-weight":"{param:weight}"},params:[{id:"weight",labelKey:"customText.paramWeight",min:100,max:900,step:100,def:700}]},{value:"italic",labelKey:"customText.effectItalic",declarations:{"font-style":"oblique {param:skew}deg"},params:[{id:"skew",labelKey:"customText.paramSkew",min:8,max:20,step:1,def:14,unit:"\xB0"}]},{value:"underline",labelKey:"customText.effectUnderline",declarations:{"text-decoration":"underline","text-decoration-thickness":"{param:thickness}px"},params:[{id:"thickness",labelKey:"customText.paramThickness",min:1,max:5,step:1,def:1,unit:"px"}]},{value:"wavy",labelKey:"customText.effectWavy",declarations:{"text-decoration":"underline wavy {color}","text-decoration-thickness":"{param:thickness}px"},params:[{id:"thickness",labelKey:"customText.paramThickness",min:1,max:5,step:1,def:1,unit:"px"}]},{value:"dashed",labelKey:"customText.effectDashed",declarations:{"text-decoration":"underline dashed {color}","text-decoration-thickness":"{param:thickness}px"},params:[{id:"thickness",labelKey:"customText.paramThickness",min:1,max:5,step:1,def:1,unit:"px"}]},{value:"strikethrough",labelKey:"customText.effectStrikethrough",declarations:{"text-decoration":"line-through","text-decoration-thickness":"{param:thickness}px"},params:[{id:"thickness",labelKey:"customText.paramThickness",min:1,max:5,step:1,def:1,unit:"px"}]},{value:"highlight",labelKey:"customText.effectHighlight",declarations:{background:"{color}{param:alpha}","border-radius":"{param:radius}px",padding:"0 2px"},params:[{id:"alpha",labelKey:"customText.paramOpacity",min:5,max:60,step:1,def:26,unit:"hex2"},{id:"radius",labelKey:"customText.paramRadius",min:0,max:12,step:1,def:3,unit:"px"}]},{value:"marker",labelKey:"customText.effectMarker",declarations:{background:"linear-gradient(to top, {color}33 0%, transparent {param:height}%)","border-radius":"2px",padding:"0 1px"},params:[{id:"height",labelKey:"customText.paramHeight",min:20,max:100,step:5,def:45,unit:"%"}]},{value:"mono",labelKey:"customText.effectMono",declarations:{"font-family":"var(--pc-font-mono)"}},{value:"smallcaps",labelKey:"customText.effectSmallcaps",declarations:{"font-variant":"small-caps","letter-spacing":"{param:spacing}em"},params:[{id:"spacing",labelKey:"customText.paramSpacing",min:0,max:.2,step:.01,def:.03,unit:"em"}]},{value:"outline",labelKey:"customText.effectOutline",declarations:{"-webkit-text-stroke":"{param:width}px {color}","-webkit-text-fill-color":"transparent"},params:[{id:"width",labelKey:"customText.paramStrokeWidth",min:.5,max:4,step:.5,def:1,unit:"px"}]},{value:"superscript",labelKey:"customText.effectSuperscript",declarations:{"vertical-align":"super","font-size":"{param:scale}em"},params:[{id:"scale",labelKey:"customText.paramScale",min:.5,max:1,step:.05,def:.8,unit:"em"}]},{value:"uppercase",labelKey:"customText.effectUppercase",declarations:{"text-transform":"uppercase","letter-spacing":"{param:spacing}em"},params:[{id:"spacing",labelKey:"customText.paramSpacing",min:0,max:.3,step:.01,def:.05,unit:"em"}]}],Ue=new Map(hs.map(a=>[a.value,a])),Ke=hs.filter(a=>a.value!=="none");function Zr(a,o){return a.replace(/\{color(\d*)\}/g,(t,e)=>e===""?o:Pe(o,parseInt(e,10)/100))}function ei(a){return Math.min(100,Math.max(0,Math.round(a))).toString(16).padStart(2,"0")}function ti(a,o,t){return!o||!o.params||o.params.length===0?a:a.replace(/\{param:([\w-]+)\}/g,(e,s)=>{let r=o.params.find(l=>l.id===s);if(!r)return e;let i=t&&Number.isFinite(t[s])?t[s]:r.def;return i=Math.min(r.max,Math.max(r.min,i)),r.unit==="hex2"?ei(i):Number.isInteger(r.step)?String(Math.round(i)):String(Math.round(i*100)/100)})}function ms(a){let o={};if(!a.params)return o;for(let t of a.params)o[t.id]=t.def;return o}function Ye(a,o,t){let e={};for(let s of a){if(s==="none")continue;let r=Ue.get(s);if(!r)continue;let i=t==null?void 0:t[s];for(let[n,l]of Object.entries(r.declarations)){let c=ti(l,r,i);c=Zr(c,o),n==="text-decoration"?e[n]=si(e[n],c):n==="text-shadow"?e[n]=e[n]?`${e[n]}, ${c}`:c:e[n]=c}}return e}function si(a,o){if(!a)return o;let t=h=>h.trim().split(/\s+/).filter(Boolean),e=["underline","overline","line-through"],s=["wavy","dashed","dotted","solid","double"],r=t(a),i=t(o),n=[];for(let h of[...r,...i])e.includes(h)&&!n.includes(h)&&n.push(h);let l=r.filter(h=>s.includes(h)),c=i.filter(h=>s.includes(h));c.length>0&&(l=c);let d=h=>!e.includes(h)&&!s.includes(h),p=r.filter(d),g=i.filter(d),u=g.length>0?g:p;return[...n,...l,...u].join(" ")}function Je(a,o,t){if(!o.includes("outline"))return;o.filter(r=>r!=="outline"&&r!=="none").length>0&&a["-webkit-text-fill-color"]==="transparent"&&(a["-webkit-text-fill-color"]=t)}function fs(a,o){let t=Object.entries(o).map(([e,s])=>`  ${e}: ${s} !important;`).join(`
`);return`.cm-line .${a} {
${t}
}
.${a} {
${t}
}`}function X(a){return a.effects&&a.effects.length>0?a.effects:a.effect&&a.effect!=="none"?[a.effect]:[]}function Z(a){if(!a||a.length===0)return[];let o=a.filter(t=>t&&Re(t.color)).map(t=>({color:t.color.trim(),position:Math.min(100,Math.max(0,Number(t.position)||0))})).sort((t,e)=>t.position-e.position);return o.length<2?[]:(o[0].position>0&&o.unshift({...o[0],position:0}),o[o.length-1].position<100&&o.push({...o[o.length-1],position:100}),o)}function ee(a){return!a||a.length<2?null:a.map(o=>`${o.color} ${o.position}%`).join(", ")}function Qe(a,o,t,e,s){let r=Math.min(360,Math.max(0,Number(s!=null?s:135)||0)),i=a["background-image"],n=a.background,l=Z(e),c=ee(l),d=null;if(c)d=`linear-gradient(${r}deg, ${c})`;else if(t&&Re(t)&&Re(o)&&!Xr(o,t))d=`linear-gradient(${r}deg, ${o}, ${t})`;else return;let p=[];if(i&&p.push(i),n){let u=n.trim();p.push(/^linear-gradient\(/i.test(u)?u:`linear-gradient(${u}, ${u})`),delete a.background}p.push(d),a["background-image"]=p.join(", "),a["-webkit-background-clip"]="text",a["background-clip"]="text",a["-webkit-text-fill-color"]="transparent";let g=c?l[0].color:o;a["text-shadow"]&&(a.filter=`drop-shadow(0 0 2px ${Pe(g,.55)}), drop-shadow(0 0 6px ${Pe(g,.3)}), drop-shadow(0 0 14px ${Pe(g,.12)})`,delete a["text-shadow"])}var De={global:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',editor:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>',video:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',display:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',detection:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',colors:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',sd:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',videoExt:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/><line x1="3" y1="11" x2="13" y2="11"/></svg>',cloud:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>'};function W(a,o,t,e,s,r){let i=a.createDiv({cls:"pc-setting-card"}),n=i.createDiv({cls:"pc-setting-card-title"});if(De[e]){let l=n.createSpan({cls:"pc-setting-card-title-icon"});l.innerHTML=De[e]}if(n.createSpan({cls:"pc-setting-card-title-text",text:o}),r){let l=n.createSpan({cls:`pc-card-badge pc-card-badge-${r.kind}`});(r.dot||r.kind==="on")&&l.createSpan({cls:"pc-card-badge-dot"}),l.createSpan({cls:"pc-card-badge-text",text:r.text})}t&&i.createDiv({cls:"pc-setting-card-desc",text:t}),s(i)}function me(a,o,t,e,s){let r=a.createDiv({cls:"pc-confirm-backdrop"}),i=a.createDiv({cls:"pc-confirm-dialog"});i.createDiv({cls:"pc-confirm-dialog-title",text:t}),i.createDiv({cls:"pc-confirm-dialog-desc",text:e});let n=i.createDiv({cls:"pc-confirm-dialog-actions"});n.createEl("button",{text:o("confirm.cancel"),attr:{cls:"pc-confirm-cancel-btn"}}).addEventListener("click",()=>{r.remove(),i.remove()}),n.createEl("button",{text:o("confirm.confirm"),attr:{cls:"pc-confirm-confirm-btn mod-warning"}}).addEventListener("click",async()=>{r.remove(),i.remove(),await s()})}var ys=require("obsidian");var ri={"tab.overview":"\u6982\u89C8","tab.packages":"\u5305\u7BA1\u7406","tab.rules":"\u7740\u8272\u89C4\u5219","tab.colors":"\u989C\u8272\u7BA1\u7406","tab.engine":"\u89C4\u5219\u5F15\u64CE","tab.files":"\u6587\u4EF6\u4E0E\u663E\u793A","preset.title":"\u5FEB\u901F\u9884\u8BBE","preset.all":"\u5168\u90E8\u542F\u7528","preset.basic":"\u57FA\u7840\u6A21\u5F0F","preset.video":"\u89C6\u9891\u63D0\u793A\u8BCD\u6A21\u5F0F","preset.minimal":"\u6781\u7B80\u6A21\u5F0F","preset.custom":"\u81EA\u5B9A\u4E49","preset.allDesc":"\u542F\u7528\u6240\u6709\u9AD8\u4EAE\u89C4\u5219","preset.basicDesc":"\u4EC5\u542F\u7528\u57FA\u7840\u63D0\u793A\u8BCD\u9AD8\u4EAE","preset.videoDesc":"\u542F\u7528\u89C6\u9891/\u5206\u955C\u63D0\u793A\u8BCD\u9AD8\u4EAE","preset.minimalDesc":"\u4EC5\u542F\u7528\u533A\u6BB5\u6807\u8BB0\u4E0E\u5206\u955C\u6807\u9898","agent.title":"\u667A\u80FD\u4F53\u9884\u8BBE","agent.desc":"\u5C06\u4E00\u7EC4\u9AD8\u4EAE\u89C4\u5219\u5C01\u88C5\u4E3A\u53EF\u547D\u540D\u3001\u53EF\u590D\u7528\u7684\u667A\u80FD\u4F53\u9884\u8BBE","agent.new":"\u65B0\u5EFA\u9884\u8BBE","agent.apply":"\u5E94\u7528","agent.rename":"\u91CD\u547D\u540D","agent.delete":"\u5220\u9664","agent.active":"\u4F7F\u7528\u4E2D","agent.rulesCount":"\u6761\u89C4\u5219","agent.namePrompt":"\u8F93\u5165\u9884\u8BBE\u540D\u79F0\uFF08\u5982\uFF1A\u63D0\u793A\u8BCD\u5DE5\u7A0B\u5E08\uFF09","agent.descPrompt":"\u8F93\u5165\u7B80\u77ED\u63CF\u8FF0\uFF08\u53EF\u7559\u7A7A\uFF09","agent.created":"\u667A\u80FD\u4F53\u9884\u8BBE\u5DF2\u521B\u5EFA","agent.applied":"\u667A\u80FD\u4F53\u9884\u8BBE\u5DF2\u5E94\u7528","agent.renamed":"\u667A\u80FD\u4F53\u9884\u8BBE\u5DF2\u91CD\u547D\u540D","agent.deleted":"\u667A\u80FD\u4F53\u9884\u8BBE\u5DF2\u5220\u9664","agent.nameRequired":"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A","agent.confirmDeleteTitle":"\u786E\u8BA4\u5220\u9664\u667A\u80FD\u4F53\u9884\u8BBE","agent.confirmDeleteDesc":"\u5220\u9664\u540E\u4E0D\u53EF\u6062\u590D\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F","agent.custom":"\u81EA\u5B9A\u4E49\u7EC4\u5408","pack.title":"\u63D0\u793A\u8BCD\u5305","pack.desc":"\u65B9\u5411\u5316\u914D\u7F6E\u5FEB\u7167\uFF1A\u8BED\u6CD5\u89C4\u5219 + \u8BCD\u6C47\u4EE4\u724C + \u989C\u8272\u65B9\u6848\u4E00\u952E\u5207\u6362\uFF08\u5982\u89C6\u9891\u5206\u955C\u3001\u56FE\u50CF\u751F\u6210\u3001Seedance/H3 \u4E13\u5C5E\uFF09","pack.new":"\u65B0\u5EFA\u5305","pack.rename":"\u91CD\u547D\u540D","pack.delete":"\u5220\u9664","pack.reset":"\u6062\u590D\u9ED8\u8BA4","pack.active":"\u4F7F\u7528\u4E2D","pack.rulesCount":"\u6761\u89C4\u5219","pack.namePrompt":"\u8F93\u5165\u5305\u540D\u79F0\uFF08\u5982\uFF1AH3 \u4E13\u5C5E\u5305\uFF09","pack.descPrompt":"\u8F93\u5165\u7B80\u77ED\u63CF\u8FF0\uFF08\u53EF\u7559\u7A7A\uFF09","pack.created":"\u63D0\u793A\u8BCD\u5305\u5DF2\u521B\u5EFA","pack.applied":"\u63D0\u793A\u8BCD\u5305\u5DF2\u5E94\u7528","pack.renamed":"\u63D0\u793A\u8BCD\u5305\u5DF2\u91CD\u547D\u540D","pack.deleted":"\u63D0\u793A\u8BCD\u5305\u5DF2\u5220\u9664","pack.nameRequired":"\u5305\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A","pack.confirmDeleteTitle":"\u786E\u8BA4\u5220\u9664\u63D0\u793A\u8BCD\u5305","pack.confirmDeleteDesc":"\u5220\u9664\u540E\u4E0D\u53EF\u6062\u590D\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F","pack.resetDone":"\u5185\u7F6E\u5305\u5DF2\u6062\u590D\u9ED8\u8BA4\u914D\u7F6E","preview.title":"\u5B9E\u65F6\u6548\u679C\u9884\u89C8","preview.desc":"\u53EF\u7F16\u8F91\u9884\u89C8\u6587\u672C\uFF0C\u5B9E\u65F6\u7740\u8272\u8F93\u51FA\uFF0C\u968F\u89C4\u5219\u5207\u6362\u5373\u65F6\u66F4\u65B0","preview.empty":"\u89C4\u5219\u96C6\u5C1A\u672A\u52A0\u8F7D\uFF0C\u6682\u65E0\u9884\u89C8","preview.inputLabel":"\u9884\u89C8\u8F93\u5165","preview.outputLabel":"\u7740\u8272\u8F93\u51FA","preview.placeholder":"\u8F93\u5165\u63D0\u793A\u8BCD\u6587\u672C\u4EE5\u9884\u89C8\u7740\u8272\u6548\u679C\u2026","settings.global":"\u5168\u5C40\u8BBE\u7F6E","settings.globalDesc":"\u63D2\u4EF6\u6838\u5FC3\u5F00\u5173\u4E0E\u57FA\u7840\u914D\u7F6E","settings.editorHighlight":"\u7F16\u8F91\u5668\u9AD8\u4EAE","settings.editorHighlightDesc":"\u5728\u7F16\u8F91\u6A21\u5F0F\u4E0B\u4E3A\u63D0\u793A\u8BCD\u8BED\u6CD5\u7740\u8272","settings.fileColorizer":"\u6587\u4EF6\u6D4F\u89C8\u5668\u7740\u8272","settings.fileColorizerDesc":"\u5728\u6587\u4EF6\u6D4F\u89C8\u5668\u4E2D\u4E3A\u4E0D\u540C\u7C7B\u578B\u7684\u6587\u4EF6\u663E\u793A\u989C\u8272\u6807\u8BB0","settings.readerMode":"\u9605\u8BFB\u6A21\u5F0F\u6E32\u67D3","settings.readerModeDesc":"\u5728\u9605\u8BFB\u6A21\u5F0F\u4E0B\u6E32\u67D3\u5F69\u8272\u63D0\u793A\u8BCD\u5757","settings.colorMode":"\u989C\u8272\u6A21\u5F0F","settings.colorModeDesc":"\u9009\u62E9\u989C\u8272\u65B9\u6848\uFF1A\u81EA\u52A8\u8DDF\u968F\u4E3B\u9898\u6216\u5F3A\u5236\u660E\u6697\u6A21\u5F0F","settings.colorModeAuto":"\u8DDF\u968F Obsidian \u4E3B\u9898","settings.colorModeLight":"\u5F3A\u5236\u6D45\u8272\u6A21\u5F0F","settings.colorModeDark":"\u5F3A\u5236\u6DF1\u8272\u6A21\u5F0F","settings.colorScheme":"\u914D\u8272\u65B9\u6848","settings.colorSchemeDesc":"\u5BF9\u5168\u90E8\u989C\u8272\u4EE4\u724C\u505A\u6574\u4F53\u53D8\u6362\uFF1A\u67D4\u548C\u964D\u4F4E\u9971\u548C\u5EA6\u3001\u5355\u8272\u5F3A\u8C03\u8FD1\u4E4E\u7070\u5EA6\uFF08\u53EF\u81EA\u5B9A\u4E49\u4E2A\u522B\u4EE4\u724C\u4E0A\u8272\uFF09\u3001\u9C9C\u660E\u589E\u5F3A\u5BF9\u6BD4\u3001\u9AD8\u5BF9\u6BD4\u660E\u5EA6\u62C9\u4F38\u9002\u914D\u6295\u5F71","settings.schemeContrast":"\u9AD8\u5BF9\u6BD4\uFF08\u660E\u5EA6\u62C9\u4F38\uFF09","settings.palettePreset":"\u8272\u677F\u9884\u8BBE","settings.palettePresetDesc":"\u4E00\u952E\u5207\u6362\u6574\u5957\u4EE4\u724C\u914D\u8272\uFF08\u6765\u81EA\u89C4\u5219\u6587\u4EF6 palettes \u533A\u5757\uFF1A\u9A6C\u5361\u9F99/\u8367\u5149\u9713\u8679/\u83AB\u5170\u8FEA/\u843D\u65E5\uFF09","settings.paletteDefault":"\u9ED8\u8BA4\u914D\u8272","settings.colorBlindAssist":"\u8272\u76F2\u8F85\u52A9","settings.colorBlindAssistDesc":"\u7EA2/\u7EFF\u7CFB\u4EE4\u724C\u8FFD\u52A0\u5197\u4F59\u4E0B\u5212\u7EBF\uFF08\u6CE2\u6D6A/\u5B9E\u7EBF\uFF09\uFF0C\u4E0D\u4F9D\u8D56\u8272\u76F8\u5373\u53EF\u533A\u5206","settings.alphaSoft":"\u80CC\u666F\u884D\u751F\u900F\u660E\u5EA6","settings.alphaSoftDesc":"soft \u80CC\u666F\u7684\u4E0D\u900F\u660E\u5EA6\uFF1A\u5DE6\u6846\u6D45\u8272\u6A21\u5F0F\uFF08\u9ED8\u8BA4 0.06\uFF09\uFF0C\u53F3\u6846\u6DF1\u8272\u6A21\u5F0F\uFF08\u9ED8\u8BA4 0.10\uFF09\uFF0C\u8303\u56F4 0.01\u20130.6","settings.alphaBorder":"\u8FB9\u6846\u884D\u751F\u900F\u660E\u5EA6","settings.alphaBorderDesc":"border \u8FB9\u6846\u7684\u4E0D\u900F\u660E\u5EA6\uFF1A\u5DE6\u6846\u6D45\u8272\u6A21\u5F0F\uFF08\u9ED8\u8BA4 0.15\uFF09\uFF0C\u53F3\u6846\u6DF1\u8272\u6A21\u5F0F\uFF08\u9ED8\u8BA4 0.20\uFF09\uFF0C\u8303\u56F4 0.01\u20130.6","settings.folderPalettes":"\u6587\u4EF6\u5939\u8272\u677F","settings.folderPalettesDesc":"\u4E0D\u540C\u6587\u4EF6\u5939\u6302\u4E0D\u540C\u8272\u677F\u9884\u8BBE\uFF08\u6700\u957F\u8DEF\u5F84\u4F18\u5148\uFF0C\u7B14\u8BB0 frontmatter theme-palette \u53EF\u518D\u8986\u76D6\uFF09","settings.folderPaletteAdd":"\u6DFB\u52A0\u6620\u5C04","customText.secondaryColor":"\u8F85\u52A9\u8272\uFF08\u53CC\u8272\u6E10\u53D8\uFF09","customText.secondaryColorDesc":"\u8BBE\u7F6E\u540E\u6587\u5B57\u5448\u4E3B\u8272\u2192\u8F85\u52A9\u8272\u6E10\u53D8\uFF1B\u7559\u7A7A\u4E3A\u7EAF\u8272","customText.secondaryColorOff":"\u7559\u7A7A = \u7EAF\u8272","customText.secondaryColorPick":"\u9009\u53D6\u8F85\u52A9\u8272","customText.gradientTitle":"\u591A\u8272\u6E10\u53D8","customText.gradientDesc":"\u5F00\u542F\u540E\u81EA\u5B9A\u4E49\u8272\u70B9\uFF1A\u70B9\u51FB\u6D6E\u5757\u5728\u4E0B\u65B9\u9009\u8272\uFF0C\u62D6\u52A8\u6D6E\u5757\u6539\u4F4D\u7F6E\uFF0C+ \u6DFB\u52A0\u8272\u70B9\uFF0C\u2212 \u5220\u9664\u9009\u4E2D\u8272\u70B9\uFF08\u81F3\u5C11\u4FDD\u7559 2 \u4E2A\uFF09","customText.gradientToggle":"\u542F\u7528\u591A\u8272\u6E10\u53D8","customText.gradientAngle":"\u89D2\u5EA6","customText.gradientAddStop":"\u6DFB\u52A0\u8272\u70B9","customText.gradientDeleteStop":"\u5220\u9664\u9009\u4E2D\u8272\u70B9","customText.gradientReset":"\u91CD\u7F6E\u4E3A\u9ED8\u8BA4\uFF08\u53CC\u7AEF\u70B9 + 135\xB0\uFF09","customText.gradientStopAria":"\u6E10\u53D8\u8272\u70B9\uFF08\u70B9\u51FB\u6539\u8272\uFF0C\u62D6\u52A8\u6539\u4F4D\u7F6E\uFF09","customText.gradientNoSelection":"\u672A\u9009\u4E2D\u8272\u70B9","customText.gradientStopCount":"\u8272\u70B9","customText.gradientStopPalette":"\u8272\u70B9\u989C\u8272","settings.schemeDefault":"\u9ED8\u8BA4\uFF08\u539F\u8272\uFF09","settings.schemeSoft":"\u67D4\u548C\uFF08\u964D\u9971\u548C\uFF09","settings.schemeMono":"\u5355\u8272\u5F3A\u8C03\uFF08\u8FD1\u7070\u5EA6\uFF09","settings.schemeVivid":"\u9C9C\u660E\uFF08\u589E\u9971\u548C\uFF09","settings.editorRules":"\u57FA\u7840\u9AD8\u4EAE\u89C4\u5219","settings.editorRulesDesc":"\u901A\u7528\u63D0\u793A\u8BCD\u8BED\u6CD5\u7740\u8272\uFF1A\u53D8\u91CF\u3001\u89D2\u8272\u6807\u7B7E\u3001\u4EE3\u7801\u5757\u7B49","settings.highlightVariables":"\u53D8\u91CF\u5360\u4F4D\u7B26","settings.highlightVariablesDesc":"\u9AD8\u4EAE {{variable}}\u3001${variable}\u3001<|variable|> \u7B49\u5360\u4F4D\u7B26","settings.highlightRoleTags":"\u89D2\u8272\u6807\u7B7E","settings.highlightRoleTagsDesc":"\u9AD8\u4EAE <system>\u3001<user>\u3001<assistant> \u7B49 XML \u6807\u7B7E","settings.highlightRoleHeaders":"\u89D2\u8272\u6807\u9898","settings.highlightRoleHeadersDesc":"\u9AD8\u4EAE ### System\u3001### User \u7B49 Markdown \u6807\u9898","settings.highlightInstructions":"\u6307\u4EE4\u6807\u8BB0","settings.highlightInstructionsDesc":"\u9AD8\u4EAE [INST]\u3001[/INST]\u3001[SYS] \u7B49\u6307\u4EE4\u6807\u8BB0","settings.highlightComments":"\u6CE8\u91CA","settings.highlightCommentsDesc":"\u9AD8\u4EAE <!-- --> \u548C %%...%% \u6CE8\u91CA","settings.highlightCodeBlocks":"\u4EE3\u7801\u5757","settings.highlightCodeBlocksDesc":"\u4E3A\u56F4\u680F\u4EE3\u7801\u5757\u6DFB\u52A0\u80CC\u666F\u8272","settings.highlightJsonBlocks":"JSON \u4EE3\u7801\u5757","settings.highlightJsonBlocksDesc":"\u4E3A JSON \u4EE3\u7801\u5757\u6DFB\u52A0\u7279\u6B8A\u9AD8\u4EAE","settings.highlightInlineCode":"\u884C\u5185\u4EE3\u7801","settings.highlightInlineCodeDesc":"\u9AD8\u4EAE `code` \u683C\u5F0F\u7684\u884C\u5185\u4EE3\u7801","settings.videoPromptRules":"\u89C6\u9891\u63D0\u793A\u8BCD\u9AD8\u4EAE\u89C4\u5219","settings.videoPromptRulesDesc":"\u89C6\u9891/\u5206\u955C\u63D0\u793A\u8BCD\u4E13\u7528\u7740\u8272\uFF1A\u533A\u6BB5\u3001\u5206\u955C\u3001\u8D44\u6E90\u5F15\u7528\u3001\u53F0\u8BCD\u7B49","settings.highlightSectionMarkers":"\u533A\u6BB5\u6807\u8BB0","settings.highlightSectionMarkersDesc":"\u9AD8\u4EAE \u3010\u6574\u4F53\u8BBE\u5B9A\u3011\u3010\u5206\u955C\u8BBE\u8BA1\u3011 \u7B49\u533A\u6BB5\u6807\u8BB0","settings.highlightShotHeaders":"\u5206\u955C\u6807\u9898","settings.highlightShotHeadersDesc":"\u9AD8\u4EAE \u955C\u59341\uFF083\u79D2\uFF09\u3001Shot 1 \u7B49\u5206\u955C\u6807\u9898","settings.highlightAssetRefs":"\u8D44\u6E90\u5F15\u7528","settings.highlightAssetRefsDesc":"\u9AD8\u4EAE @\u56FE1(\u5B89\u5FB7\u70C8)\u3001@\u56FE2(\u7B80)-\u53C2\u8003\u56FE\u670D\u88C5 \u7B49\u8D44\u6E90\u5F15\u7528","settings.highlightFieldLabels":"\u5B57\u6BB5\u6807\u7B7E","settings.highlightFieldLabelsDesc":"\u9AD8\u4EAE \u666F\u522B\uFF1A\u8FD0\u955C\uFF1A\u5149\u5F71\uFF1A \u7B49\u5B57\u6BB5\u6807\u7B7E","settings.highlightDialogue":"\u53F0\u8BCD\u5185\u5BB9","settings.highlightDialogueDesc":"\u9AD8\u4EAE\u5F15\u53F7\u5185\u7684\u53F0\u8BCD\u5185\u5BB9","settings.highlightAudioRefs":"\u97F3\u9891\u5F15\u7528","settings.highlightAudioRefsDesc":"\u9AD8\u4EAE @\u97F3\u98911\u3001\u97F3\u8272 @\u97F3\u98912 \u7B49\u97F3\u9891\u5F15\u7528","settings.highlightNegativePrompts":"\u6392\u9664/\u7981\u6B62\u89C4\u5219","settings.highlightNegativePromptsDesc":"\u9AD8\u4EAE \u6392\u9664\u3001\u7981\u6B62\u3001\u675C\u7EDD \u7B49\u6392\u9664\u6027\u6307\u4EE4","settings.highlightTechParams":"\u6280\u672F\u53C2\u6570","settings.highlightTechParamsDesc":"\u9AD8\u4EAE 3200K\u30013\u79D2 \u7B49\u6280\u672F\u53C2\u6570","settings.highlightParentheticals":"\u62EC\u53F7\u6CE8\u91CA","settings.highlightParentheticalsDesc":"\u9AD8\u4EAE \uFF08\u7C97\u4FD7\u3001\u620F\u8C11\uFF09\uFF08\u6C14\u573A\u793A\u5A01\uFF09 \u7B49\u62EC\u53F7\u6CE8\u91CA","settings.sdPromptRules":"SD/ComfyUI \u6269\u5C55\u89C4\u5219","settings.sdPromptRulesDesc":"\u56FE\u50CF\u751F\u6210\u63D0\u793A\u8BCD\u4E13\u7528\u7740\u8272\uFF1A\u6743\u91CD\u3001Lora\u3001\u8D28\u91CF\u6807\u7B7E\u7B49","settings.highlightEmphasisWeights":"\u6743\u91CD\u6807\u8BB0","settings.highlightEmphasisWeightsDesc":"\u9AD8\u4EAE (text:1.3) \u683C\u5F0F\u7684\u6743\u91CD\u8C03\u6574\u8BED\u6CD5","settings.highlightLoraRefs":"Lora/\u6A21\u578B\u5F15\u7528","settings.highlightLoraRefsDesc":"\u9AD8\u4EAE <lora:name:0.8>\u3001<model:name> \u7B49\u6A21\u578B\u5F15\u7528","settings.highlightBracketEmphasis":"\u62EC\u53F7\u5F3A\u8C03","settings.highlightBracketEmphasisDesc":"\u9AD8\u4EAE ((text)) \u5F3A\u8C03\u548C [text] \u5F31\u5316\u8BED\u6CD5","settings.highlightQualityTags":"\u8D28\u91CF\u6807\u7B7E","settings.highlightQualityTagsDesc":"\u9AD8\u4EAE masterpiece\u3001best quality \u7B49\u8D28\u91CF\u589E\u5F3A\u6807\u7B7E","settings.highlightSdNegativeHeader":"SD \u8D1F\u9762\u63D0\u793A\u8BCD\u5934","settings.highlightSdNegativeHeaderDesc":"\u9AD8\u4EAE Negative prompt: \u8D1F\u9762\u63D0\u793A\u8BCD\u5206\u9694\u6807\u8BB0","settings.videoExtRules":"\u89C6\u9891\u63D0\u793A\u8BCD\u6269\u5C55\u89C4\u5219","settings.videoExtRulesDesc":"\u955C\u5934\u8FD0\u52A8\u3001\u8F6C\u573A\u6807\u8BB0\u7B49\u7740\u8272","settings.highlightCameraMoves":"\u955C\u5934\u8FD0\u52A8\u672F\u8BED","settings.highlightCameraMovesDesc":"\u9AD8\u4EAE \u63A8\u955C\u5934\u3001\u62C9\u955C\u5934\u3001\u6447\u955C\u5934 \u7B49\u8FD0\u955C\u672F\u8BED","settings.highlightSceneTransitions":"\u8F6C\u573A\u6807\u8BB0","settings.highlightSceneTransitionsDesc":"\u9AD8\u4EAE \u8F6C\u573A\u3001\u6DE1\u5165\u3001\u6DE1\u51FA \u7B49\u8F6C\u573A\u6807\u8BB0","batch.enableAll":"\u5168\u90E8\u542F\u7528","batch.disableAll":"\u5168\u90E8\u7981\u7528","batch.reset":"\u91CD\u7F6E","search.placeholder":"\u641C\u7D22\u5F00\u5173\u6216\u4EE4\u724C\u2026","search.noMatch":"\u65E0\u5339\u914D\u9879","search.matchCount":"\u5339\u914D {count} \u9879","gs.placeholder":"\u641C\u7D22\u5168\u90E8\u8BBE\u7F6E\u9879\uFF1A\u540D\u79F0 / \u63CF\u8FF0 / \u5361\u7247\u2026\uFF08\u8DE8 Tab\uFF09","gs.noMatch":"\u65E0\u5339\u914D\u9879","gs.matchCount":"\u5339\u914D {count} \u9879","gs.empty":"\u6362\u4E2A\u5173\u952E\u8BCD\u8BD5\u8BD5\uFF1A\u8868\u683C / \u989C\u8272 / \u7B26\u53F7 / \u68C0\u6D4B / \u5BFC\u51FA\u2026","settings.fileDetection":"\u6587\u4EF6\u7C7B\u578B\u68C0\u6D4B","settings.fileDetectionDesc":"\u914D\u7F6E\u81EA\u52A8\u8BC6\u522B\u63D0\u793A\u8BCD\u6587\u4EF6\u7C7B\u578B\u7684\u7B56\u7565","settings.detectByFrontmatter":"\u901A\u8FC7 Frontmatter \u68C0\u6D4B","settings.detectByFrontmatterDesc":"\u6839\u636E frontmatter \u4E2D\u7684 type \u5B57\u6BB5\u6216 tags \u5224\u65AD\u6587\u4EF6\u7C7B\u578B","settings.detectByFolder":"\u901A\u8FC7\u6587\u4EF6\u5939\u68C0\u6D4B","settings.detectByFolderDesc":"\u6839\u636E\u6587\u4EF6\u6240\u5728\u6587\u4EF6\u5939\u8DEF\u5F84\u5224\u65AD\u6587\u4EF6\u7C7B\u578B","settings.detectByFilename":"\u901A\u8FC7\u6587\u4EF6\u540D\u68C0\u6D4B","settings.detectByFilenameDesc":"\u6839\u636E\u6587\u4EF6\u540D\u524D\u7F00\uFF08\u5982 sys-\u3001user-\uFF09\u5224\u65AD\u6587\u4EF6\u7C7B\u578B","settings.displayOptions":"\u663E\u793A\u9009\u9879","settings.displayOptionsDesc":"\u63A7\u5236\u63D2\u4EF6\u5728\u6587\u4EF6\u6D4F\u89C8\u5668\u7B49\u89C6\u56FE\u4E2D\u7684\u7740\u8272\u663E\u793A","settings.embedCardStyle":"\u5D4C\u5165\u5361\u7247\u98CE\u683C","settings.embedCardStyleDesc":"\u7B14\u8BB0\u4E2D\u56FE\u7247/\u89C6\u9891/PDF \u7B49\u5D4C\u5165\u5361\u7247\u7684\u88C5\u9970\u98CE\u683C","settings.embedCardStyleTech":"\u79D1\u6280\u56DB\u89D2","settings.embedCardStyleVision":"\u60AC\u6D6E\u89C6\u56FE","settings.embedCardStylePolaroid":"\u62CD\u7ACB\u5F97","settings.embedCardStyleGlass":"\u78E8\u7802\u73BB\u7483","settings.readerBlocks":"\u9605\u8BFB\u6A21\u5F0F\u5757\u5316\u6837\u5F0F","settings.readerBlocksDesc":"\u9605\u8BFB\u6A21\u5F0F\u4E0B\u4E3A\u8868\u683C\u4E0E\u7B14\u8BB0\u5C5E\u6027\uFF08frontmatter\uFF09\u6DFB\u52A0\u5361\u7247\u5316\u88C5\u9970\uFF0C\u989C\u8272\u8DDF\u968F\u5F53\u524D\u8272\u677F","settings.readerTableBlock":"\u8868\u683C\u5757\u7F8E\u5316","settings.readerTableBlockDesc":"\u5706\u89D2\u3001\u9634\u5F71\u3001\u7D2B\u5E95\u8868\u5934\u7B49\u5361\u7247\u5316\u6548\u679C","settings.readerTableRounded":"\u5706\u89D2\u5BB9\u5668","settings.readerTableRoundedDesc":"\u8868\u683C\u56DB\u89D2\u5706\u89D2 + \u67D4\u548C\u6295\u5F71","settings.readerTableHeaderBg":"\u7D2B\u5E95\u8868\u5934","settings.readerTableHeaderBgDesc":"\u8868\u5934\u7D2B\u5E95\u3001\u52A0\u7C97\u4E0E\u5E95\u90E8\u5206\u9694\u7EBF","settings.readerTableStickyHeader":"\u60AC\u6D6E\u8868\u5934","settings.readerTableStickyHeaderDesc":"\u957F\u8868\u683C\u6EDA\u52A8\u65F6\u8868\u5934\u5438\u9644\u9876\u90E8","settings.readerTableFirstCol":"\u9996\u5217\u884C\u5934\u5F3A\u8C03","settings.readerTableFirstColDesc":"\u9996\u5217\u52A0\u7C97\u7740\u8272\uFF0C\u7C7B\u4F3C\u884C\u8868\u5934","settings.readerTableZebra":"\u8868\u683C\u6591\u9A6C\u7EB9","settings.readerTableZebraDesc":"\u5076\u6570\u884C\u8FFD\u52A0\u6D45\u8272\u5E95\u7EB9\uFF0C\u589E\u5F3A\u6A2A\u5411\u53EF\u8BFB\u6027","settings.readerTableZebraAlpha":"\u6591\u9A6C\u7EB9\u5F3A\u5EA6","settings.readerTableZebraAlphaDesc":"\u6591\u9A6C\u7EB9\u5E95\u8272\u4E0D\u900F\u660E\u5EA6\u767E\u5206\u6BD4\uFF080\u201310\uFF0C\u9ED8\u8BA4 4\uFF09","settings.readerTableHover":"\u8868\u683C\u884C\u60AC\u505C\u9AD8\u4EAE","settings.readerTableHoverDesc":"\u9F20\u6807\u60AC\u505C\u65F6\u6574\u884C\u7740\u8272\uFF0C\u4FBF\u4E8E\u9010\u884C\u9605\u8BFB","settings.readerTableHoverAlpha":"\u60AC\u505C\u5F3A\u5EA6","settings.readerTableHoverAlphaDesc":"\u60AC\u505C\u5E95\u8272\u4E0D\u900F\u660E\u5EA6\u767E\u5206\u6BD4\uFF080\u201312\uFF0C\u9ED8\u8BA4 8\uFF09","settings.readerTableDensity":"\u8868\u683C\u5BC6\u5EA6","settings.readerTableDensityDesc":"\u5355\u5143\u683C\u5185\u8FB9\u8DDD\u4E09\u6863\uFF1A\u7D27\u51D1 / \u9ED8\u8BA4 / \u5BBD\u677E","settings.densityCompact":"\u7D27\u51D1","settings.densityNormal":"\u9ED8\u8BA4","settings.densityRelaxed":"\u5BBD\u677E","settings.readerMetadataBlock":"\u5143\u6570\u636E\u5757\u7F8E\u5316","settings.readerMetadataBlockDesc":"\u7B14\u8BB0\u5C5E\u6027\uFF08frontmatter\uFF09\u7070\u5E95\u5361\u7247 + \u952E\u540D\u7740\u8272","settings.readerMetadataKeyBold":"\u952E\u540D\u52A0\u7C97","settings.readerMetadataKeyBoldDesc":"\u5C5E\u6027\u952E\u540D\u52A0\u7C97\u663E\u793A","settings.readerMetadataRowHover":"\u5C5E\u6027\u884C\u60AC\u505C\u9AD8\u4EAE","settings.readerMetadataRowHoverDesc":"\u9F20\u6807\u60AC\u505C\u65F6\u5C5E\u6027\u884C\u7740\u8272","settings.readerMetadataDensity":"\u5143\u6570\u636E\u5BC6\u5EA6","settings.readerMetadataDensityDesc":"\u5C5E\u6027\u884C\u5185\u8FB9\u8DDD\u4E09\u6863\uFF1A\u7D27\u51D1 / \u9ED8\u8BA4 / \u5BBD\u677E","settings.fileTypeColors":"\u6587\u4EF6\u7C7B\u578B\u989C\u8272","settings.fileTypeColorsDesc":"\u81EA\u5B9A\u4E49\u5404\u6587\u4EF6\u7C7B\u578B\u5728\u6587\u4EF6\u6D4F\u89C8\u5668\u4E2D\u7684\u6807\u8BB0\u989C\u8272","settings.resetColors":"\u91CD\u7F6E\u989C\u8272","settings.resetColorsDesc":"\u5C06\u6240\u6709\u6587\u4EF6\u7C7B\u578B\u989C\u8272\u6062\u590D\u4E3A\u9ED8\u8BA4\u503C","settings.reset":"\u91CD\u7F6E","confirm.resetTitle":"\u786E\u8BA4\u91CD\u7F6E\u989C\u8272","confirm.resetDesc":"\u6B64\u64CD\u4F5C\u5C06\u628A\u6240\u6709\u6587\u4EF6\u7C7B\u578B\u989C\u8272\u6062\u590D\u4E3A\u9ED8\u8BA4\u503C\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F","confirm.cancel":"\u53D6\u6D88","confirm.ok":"\u786E\u5B9A","confirm.confirm":"\u786E\u8BA4\u91CD\u7F6E","confirm.importTitle":"\u786E\u8BA4\u5BFC\u5165\u914D\u7F6E","confirm.importDesc":"\u5C06\u5408\u5E76 {count} \u4E2A\u914D\u7F6E\u6587\u4EF6\uFF0C\u76F8\u540C\u9879\u5C06\u88AB\u8986\u76D6\u3002\u662F\u5426\u7EE7\u7EED\uFF1F","settings.configManagement":"\u914D\u7F6E\u7BA1\u7406","settings.configManagementDesc":"\u5BFC\u51FA\u5F53\u524D\u914D\u7F6E\u6216\u5BFC\u5165\u5176\u4ED6\u914D\u7F6E\u6587\u4EF6\uFF08\u652F\u6301\u591A\u6587\u4EF6\u5408\u5E76\uFF09","settings.exportConfig":"\u5BFC\u51FA\u914D\u7F6E","settings.exportConfigDesc":"\u5C06\u5F53\u524D\u6240\u6709\u7740\u8272\u914D\u7F6E\u5BFC\u51FA\u4E3A JSON \u6587\u4EF6","settings.export":"\u5BFC\u51FA","settings.importConfig":"\u5BFC\u5165\u914D\u7F6E","settings.importConfigDesc":"\u4ECE JSON \u6587\u4EF6\u5BFC\u5165\u914D\u7F6E\uFF0C\u652F\u6301\u9009\u62E9\u591A\u4E2A\u6587\u4EF6\u4F9D\u6B21\u5408\u5E76","settings.import":"\u5BFC\u5165","notice.refreshed":"\u5DF2\u5237\u65B0\u7740\u8272","notice.enabled":"\u63D0\u793A\u8BCD\u7740\u8272\u5DF2\u542F\u7528","notice.disabled":"\u63D0\u793A\u8BCD\u7740\u8272\u5DF2\u7981\u7528","notice.presetApplied":"\u9884\u8BBE\u65B9\u6848\u5DF2\u5E94\u7528","notice.colorsReset":"\u989C\u8272\u5DF2\u91CD\u7F6E\u4E3A\u9ED8\u8BA4\u503C","notice.configExported":"\u914D\u7F6E\u5DF2\u5BFC\u51FA","notice.configImported":"\u5DF2\u5BFC\u5165\u5E76\u5408\u5E76 {count} \u4E2A\u914D\u7F6E\u6587\u4EF6","notice.noGitUrl":"\u8BF7\u5148\u5728\u8BBE\u7F6E\u4E2D\u914D\u7F6E Git \u89C4\u5219\u4ED3\u5E93\u5730\u5740","notice.checkingUpdates":"\u6B63\u5728\u68C0\u67E5\u89C4\u5219\u66F4\u65B0\u2026","notice.fetchFailed":"\u65E0\u6CD5\u8FDE\u63A5\u5230\u8FDC\u7A0B\u89C4\u5219\u4ED3\u5E93","notice.alreadyLatest":"\u89C4\u5219\u5DF2\u662F\u6700\u65B0\u7248\u672C","notice.downloading":"\u6B63\u5728\u4E0B\u8F7D\u6700\u65B0\u89C4\u5219\u2026","notice.downloadFailed":"\u89C4\u5219\u6587\u4EF6\u4E0B\u8F7D\u5931\u8D25","notice.updateSuccess":"\u89C4\u5219\u66F4\u65B0\u6210\u529F","notice.compileFailed":"\u89C4\u5219\u7F16\u8BD1\u5931\u8D25\uFF0C\u5DF2\u56DE\u9000\u5230\u4E0A\u4E00\u7248\u672C","notice.updateError":"\u89C4\u5219\u66F4\u65B0\u51FA\u9519","notice.rulesReloaded":"\u89C4\u5219\u5DF2\u91CD\u65B0\u52A0\u8F7D","notice.cacheCleared":"\u672C\u5730\u7F13\u5B58\u5DF2\u6E05\u7A7A","notice.gitParsed":"Git \u5730\u5740\u5DF2\u81EA\u52A8\u89E3\u6790","command.groupPrefix":"\u63D0\u793A\u8BCD\u7740\u8272 \u203A ","command.refresh":"\u5237\u65B0\u7740\u8272","command.refreshDesc":"\u91CD\u65B0\u5E94\u7528\u6240\u6709\u7740\u8272\u89C4\u5219","command.toggleHighlight":"\u5207\u6362\u7F16\u8F91\u5668\u9AD8\u4EAE","command.toggleHighlightDesc":"\u542F\u7528\u6216\u7981\u7528\u7F16\u8F91\u5668\u9AD8\u4EAE","command.updateRules":"\u68C0\u67E5\u89C4\u5219\u66F4\u65B0","command.updateRulesDesc":"\u4ECE Git \u8FDC\u7A0B\u4ED3\u5E93\u62C9\u53D6\u6700\u65B0\u7740\u8272\u89C4\u5219","command.reloadRules":"\u91CD\u65B0\u52A0\u8F7D\u89C4\u5219","command.reloadRulesDesc":"\u4ECE\u672C\u5730\u7F13\u5B58\u91CD\u65B0\u7F16\u8BD1\u7740\u8272\u89C4\u5219","command.exportFull":"\u5BFC\u51FA\u5168\u91CF\u8BBE\u7F6E","command.exportFullDesc":"\u5C06\u5F53\u524D\u6240\u6709\u8BBE\u7F6E\u5BFC\u51FA\u4E3A JSON \u6587\u4EF6\u5230 Vault \u6839\u76EE\u5F55","command.importFull":"\u5BFC\u5165\u5168\u91CF\u8BBE\u7F6E","command.importFullDesc":"\u4ECE\u5F53\u524D\u6253\u5F00\u7684 JSON \u6587\u4EF6\u5BFC\u5165\u8BBE\u7F6E(\u8986\u76D6\u5F53\u524D)","command.exportCustomTextColors":"\u5BFC\u51FA\u81EA\u5B9A\u4E49\u6587\u672C\u989C\u8272","command.exportCustomTextColorsDesc":"\u5BFC\u51FA\u6240\u6709\u81EA\u5B9A\u4E49\u6587\u672C\u989C\u8272\u89C4\u5219\u4E3A JSON \u6587\u4EF6","command.exportFolderMappings":"\u5BFC\u51FA\u6587\u4EF6\u5939\u6620\u5C04","command.exportFolderMappingsDesc":"\u5BFC\u51FA\u6240\u6709\u6587\u4EF6\u5939\u6620\u5C04\u89C4\u5219\u4E3A JSON \u6587\u4EF6","notice.exportSuccess":"\u5BFC\u51FA\u6210\u529F","notice.exportFailed":"\u5BFC\u51FA\u5931\u8D25","notice.importSuccess":"\u5BFC\u5165\u6210\u529F","notice.importFailed":"\u5BFC\u5165\u5931\u8D25","notice.importInvalidFormat":"\u5BFC\u5165\u6587\u4EF6\u683C\u5F0F\u65E0\u6548","notice.importFileError":"\u65E0\u6CD5\u8BFB\u53D6\u5F53\u524D\u6587\u4EF6,\u8BF7\u6253\u5F00\u6709\u6548\u7684 JSON \u5BFC\u51FA\u6587\u4EF6\u540E\u91CD\u8BD5","settings.ruleEngine":"\u89C4\u5219\u5F15\u64CE","settings.ruleEngineDesc":"DSL \u7740\u8272\u89C4\u5219\u7684\u6765\u6E90\u4E0E\u7BA1\u7406","settings.ruleSource":"\u89C4\u5219\u6765\u6E90","settings.ruleSourceDesc":"\u9009\u62E9\u7740\u8272\u89C4\u5219\u7684\u52A0\u8F7D\u65B9\u5F0F","settings.ruleSourceBuiltin":"\u5185\u7F6E\u89C4\u5219","settings.ruleSourceLocal":"\u672C\u5730\u7F13\u5B58","settings.ruleSourceRemote":"Git \u8FDC\u7A0B","settings.gitRawBaseUrl":"Git Raw \u5730\u5740","settings.gitRawBaseUrlDesc":"\u6307\u5411 rules/ \u76EE\u5F55\u7684 Git Raw \u57FA\u7840 URL","settings.gitRawBaseUrlPh":"https://raw.githubusercontent.com/user/repo/branch/rules","settings.gitBranch":"Git \u5206\u652F","settings.gitBranchDesc":"\u89C4\u5219\u4ED3\u5E93\u7684\u5206\u652F\u540D\u79F0\uFF08\u533A\u5206\u5927\u5C0F\u5199\uFF09","settings.autoUpdateRules":"\u81EA\u52A8\u68C0\u67E5\u66F4\u65B0","settings.autoUpdateRulesDesc":"\u5B9A\u671F\u68C0\u67E5\u8FDC\u7A0B\u89C4\u5219\u662F\u5426\u6709\u65B0\u7248\u672C","settings.autoUpdateInterval":"\u68C0\u67E5\u95F4\u9694\uFF08\u5C0F\u65F6\uFF09","settings.autoUpdateIntervalDesc":"\u81EA\u52A8\u68C0\u67E5\u89C4\u5219\u66F4\u65B0\u7684\u65F6\u95F4\u95F4\u9694","settings.contextSemantic":"\u4E0A\u4E0B\u6587\u8BED\u4E49\u8FC7\u6EE4","settings.contextSemanticDesc":"\u6839\u636E\u6240\u5904\u533A\u5757\u51B3\u5B9A\u5B50\u5185\u5BB9\u7740\u8272\u89C4\u5219\u662F\u5426\u751F\u6548","settings.ruleVersion":"\u5F53\u524D\u89C4\u5219\u7248\u672C","settings.ruleVersionDesc":"\u5F53\u524D\u52A0\u8F7D\u7684\u89C4\u5219\u96C6\u7248\u672C\u53F7","settings.checkUpdate":"\u68C0\u67E5\u66F4\u65B0","settings.reloadRules":"\u91CD\u65B0\u52A0\u8F7D","settings.clearCache":"\u6E05\u7A7A\u7F13\u5B58","settings.ruleEngineIcon":"cloud","settings.pullReport":"\u62C9\u53D6\u62A5\u544A","settings.pullReportDesc":"\u4E0A\u6B21 Git \u89C4\u5219\u62C9\u53D6\u7684\u8BE6\u7EC6\u62A5\u544A","settings.gitReportEnabled":"\u542F\u7528\u62C9\u53D6\u62A5\u544A","settings.gitReportEnabledDesc":"\u8BB0\u5F55\u6BCF\u6B21 Git \u62C9\u53D6\u64CD\u4F5C\u7684\u8BE6\u7EC6\u7ED3\u679C","settings.downloadToCache":"\u4E0B\u8F7D\u5230\u672C\u5730\u7F13\u5B58","settings.downloadToCacheDesc":"\u62C9\u53D6\u6210\u529F\u540E\u81EA\u52A8\u4FDD\u5B58\u89C4\u5219\u6587\u4EF6\u5230\u672C\u5730\u7F13\u5B58","settings.reportStatus":"\u72B6\u6001","settings.reportStatusSuccess":"\u6210\u529F","settings.reportStatusFailed":"\u5931\u8D25","settings.reportNoUpdate":"\u65E0\u9700\u66F4\u65B0","settings.reportRemoteVersion":"\u8FDC\u7A0B\u7248\u672C","settings.reportLocalVersion":"\u672C\u5730\u7248\u672C","settings.reportUpdateTime":"\u66F4\u65B0\u65F6\u95F4","settings.reportDuration":"\u8017\u65F6","settings.reportFiles":"\u6587\u4EF6\u5217\u8868","settings.reportCategories":"\u5206\u7C7B\u7EDF\u8BA1","settings.reportTotalFiles":"\u603B\u6587\u4EF6\u6570","settings.reportSuccessFiles":"\u6210\u529F\u6587\u4EF6\u6570","settings.reportTotalRules":"\u603B\u89C4\u5219\u6570","settings.reportError":"\u9519\u8BEF\u4FE1\u606F","settings.reportNoReport":"\u6682\u65E0\u62C9\u53D6\u62A5\u544A\uFF0C\u8BF7\u5148\u68C0\u67E5\u66F4\u65B0","settings.reportFile":"\u6587\u4EF6","settings.reportSize":"\u5927\u5C0F","settings.reportCategory":"\u5206\u7C7B","settings.reportCount":"\u6761\u76EE\u6570","settings.reportParsed":"\u89E3\u6790","settings.reportYes":"\u662F","settings.reportNo":"\u5426","settings.gitRepoUrl":"Git \u4ED3\u5E93\u5730\u5740","settings.gitRepoUrlDesc":"\u7C98\u8D34\u5B8C\u6574 GitHub URL\uFF0C\u81EA\u52A8\u89E3\u6790\u4E3A Raw \u5730\u5740\u548C\u5206\u652F","settings.gitRepoUrlPh":"https://github.com/user/repo/tree/branch/rules","settings.colorCustom":"\u7740\u8272\u989C\u8272\u81EA\u5B9A\u4E49","settings.colorCustomDesc":"\u989C\u8272\u4EE4\u724C\u7531 YAML \u89C4\u5219\u6587\u4EF6\u5B9A\u4E49\uFF0C\u53EF\u65E0\u9650\u6269\u5C55\u3002\u8C03\u6574\u989C\u8272\u540E\u5B9E\u65F6\u9884\u89C8\u6548\u679C","settings.noColorTokens":"\u5F53\u524D\u89C4\u5219\u96C6\u672A\u5B9A\u4E49\u989C\u8272\u4EE4\u724C\u3002\u8BF7\u5728\u89C4\u5219\u5F15\u64CE\u4E2D\u9009\u62E9\u89C4\u5219\u6765\u6E90\u5E76\u52A0\u8F7D\u89C4\u5219","settings.resetCustomColorsDesc":"\u5C06\u6240\u6709\u81EA\u5B9A\u4E49\u989C\u8272\u6062\u590D\u4E3A YAML \u9ED8\u8BA4\u503C","settings.tokenGroupBasic":"\u57FA\u7840\u4EE4\u724C","settings.tokenGroupBasicDesc":"\u6392\u9664/\u6210\u529F/\u8B66\u544A\u7B49\u6838\u5FC3\u8BED\u4E49\u8272\uFF0C\u88AB\u9AD8\u4EAE\u89C4\u5219\u5F15\u7528","settings.tokenGroupExtended":"\u6269\u5C55\u4EE4\u724C","settings.tokenGroupExtendedDesc":"ANTML/Markdown/\u94FE\u63A5\u7B49\u6269\u5C55\u8BED\u6CD5\u8272","settings.tokenGroupShot":"\u5206\u955C\u6269\u5C55\u4EE4\u724C","settings.tokenGroupShotDesc":"\u5206\u955C\u6BB5\u843D/\u6A21\u5757/\u5F15\u7528\u6807\u8BB0\u8272","settings.tokenGroupMultimodal":"\u591A\u6A21\u6001\u6269\u5C55\u4EE4\u724C","settings.tokenGroupMultimodalDesc":"\u97F3\u4E50/\u6B4C\u8BCD\u7B49\u591A\u6A21\u6001\u8272","settings.tokenNoiseWarning":"\u5F53\u524D\u5DF2\u542F\u7528 {count} \u4E2A\u989C\u8272\u4EE4\u724C\uFF0C\u540C\u5C4F\u989C\u8272\u8FC7\u591A\u4F1A\u964D\u4F4E\u53EF\u8BFB\u6027","settings.tokenNoiseAction":"\u4E00\u952E\u964D\u566A\uFF08\u4EC5\u4FDD\u7559\u57FA\u7840\u4EE4\u724C\uFF09","settings.tokenNoiseDone":"\u5DF2\u964D\u566A\uFF1A\u4EC5\u4FDD\u7559\u57FA\u7840 10 \u4EE4\u724C\uFF0C\u5176\u4F59\u53EF\u5728\u4EE4\u724C\u5361\u7247\u4E2D\u624B\u52A8\u5F00\u542F","settings.tokenRelatedRules":"\u5173\u8054\u89C4\u5219","settings.tokenRelatedRulesCount":"\u5173\u8054\u89C4\u5219\uFF08{count}\uFF09\uFF1A","settings.tokenGroupCount":"\uFF08{count}\uFF09","confirm.resetCustomColorsDesc":"\u6B64\u64CD\u4F5C\u5C06\u6E05\u9664\u6240\u6709\u81EA\u5B9A\u4E49\u989C\u8272\u8986\u76D6\uFF0C\u6062\u590D YAML \u89C4\u5219\u5B9A\u4E49\u7684\u9ED8\u8BA4\u989C\u8272\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F","notice.tokenGroupColorsReset":"\u5DF2\u91CD\u7F6E\u8BE5\u5206\u7EC4\u7684\u81EA\u5B9A\u4E49\u989C\u8272","color.danger":"\u7EA2\u8272\uFF08\u6392\u9664/\u7981\u6B62\uFF09","color.dangerDesc":"\u6392\u9664\u89C4\u5219\u3001SD \u8D1F\u9762\u63D0\u793A\u8BCD\u5934","color.success":"\u7EFF\u8272\uFF08\u6210\u529F/\u53F0\u8BCD\uFF09","color.successDesc":"\u53F0\u8BCD\u5185\u5BB9\u3001\u8D28\u91CF\u6807\u7B7E","color.warning":"\u9EC4\u8272\uFF08\u8B66\u544A/\u53C2\u6570\uFF09","color.warningDesc":"\u6280\u672F\u53C2\u6570\u3001\u53D8\u91CF\u3001\u6743\u91CD\u6807\u8BB0","color.info":"\u84DD\u8272\uFF08\u4FE1\u606F/\u6807\u7B7E\uFF09","color.infoDesc":"\u5B57\u6BB5\u6807\u7B7E\u3001\u62EC\u53F7\u5F3A\u8C03","color.purple":"\u7D2B\u8272\uFF08\u533A\u6BB5/\u6307\u4EE4\uFF09","color.purpleDesc":"\u533A\u6BB5\u6807\u8BB0\u3001\u89D2\u8272\u6807\u7B7E\u3001\u6307\u4EE4\u6807\u8BB0","color.cyan":"\u9752\u8272\uFF08\u5206\u955C/\u8FD0\u955C\uFF09","color.cyanDesc":"\u5206\u955C\u6807\u9898\u3001\u955C\u5934\u8FD0\u52A8\u672F\u8BED","color.pink":"\u7C89\u8272\uFF08\u97F3\u9891\uFF09","color.pinkDesc":"\u97F3\u9891\u5F15\u7528\u3001\u97F3\u8272\u6807\u7B7E","color.amber":"\u68D5\u8272\uFF08\u8D44\u6E90\u5F15\u7528\uFF09","color.amberDesc":"\u8D44\u6E90\u5F15\u7528\u3001Lora \u6A21\u578B\u5F15\u7528","color.orange":"\u6A59\u8272\uFF08\u5149\u6548\uFF09","color.orangeDesc":"\u5149\u6548\u672F\u8BED","customText.section":"\u81EA\u5B9A\u4E49\u6587\u672C\u989C\u8272","customText.sectionDesc":"\u4E3A\u4EFB\u610F\u6587\u672C\u5E94\u7528\u81EA\u5B9A\u4E49\u989C\u8272\uFF08\u6309\u6587\u672C\u5185\u5BB9\u5168\u5C40\u5339\u914D\uFF0C\u4E0D\u5199\u5165 md \u6587\u4EF6\uFF0C\u4FDD\u6301\u539F\u6587\u7EAF\u51C0\uFF09","customText.enabled":"\u542F\u7528\u81EA\u5B9A\u4E49\u6587\u672C\u989C\u8272","customText.enabledDesc":"\u5173\u95ED\u540E\u6240\u6709\u81EA\u5B9A\u4E49\u6587\u672C\u989C\u8272\u89C4\u5219\u5C06\u4E0D\u518D\u751F\u6548","customText.modalTitle":"\u4E3A\u9009\u4E2D\u6587\u672C\u5E94\u7528\u989C\u8272","customText.preview":"\u9009\u4E2D\u6587\u672C\u9884\u89C8","customText.noSelection":"\u672A\u9009\u4E2D\u6587\u672C","customText.presetPalette":"\u6807\u51C6\u9884\u8BBE\u8272\u677F","customText.colorSection":"\u989C\u8272","customText.matchOptions":"\u5339\u914D\u9009\u9879","customText.category":"\u8D44\u6E90\u5206\u7C7B","customText.copyHex":"\u70B9\u51FB\u590D\u5236\u8272\u503C","customText.copied":"\u5DF2\u590D\u5236","customText.customColor":"\u81EA\u5B9A\u4E49\u989C\u8272","customText.hexValue":"\u5341\u516D\u8FDB\u5236\u989C\u8272\u503C","customText.caseSensitive":"\u533A\u5206\u5927\u5C0F\u5199","customText.caseSensitiveDesc":"\u5339\u914D\u65F6\u662F\u5426\u533A\u5206\u5927\u5C0F\u5199\uFF08\u9ED8\u8BA4\u4E0D\u533A\u5206\uFF09","customText.wholeWord":"\u5168\u5B57\u5339\u914D","customText.wholeWordDesc":'\u4EC5\u5339\u914D\u5B8C\u6574\u5355\u8BCD\uFF0C\u907F\u514D\u90E8\u5206\u5339\u914D\uFF08\u5982 "Cat" \u4E0D\u5339\u914D "Category"\uFF09',"customText.effect":"\u6587\u5B57\u6548\u679C","customText.effectDesc":"\u5728\u989C\u8272\u57FA\u7840\u4E0A\u53E0\u52A0\u6587\u5B57\u6548\u679C\uFF08\u53EF\u591A\u9009\u81EA\u7531\u7EC4\u5408\uFF09","customText.effectComposableHint":"\u70B9\u51FB\u53EF\u52FE\u9009/\u53D6\u6D88\uFF0C\u591A\u4E2A\u6548\u679C\u53EF\u81EA\u7531\u53E0\u52A0\u7EC4\u5408","customText.effectNone":"\u65E0","customText.effectGlow":"\u53D1\u5149","customText.paramCoreRadius":"\u6838\u5FC3\u534A\u5F84","customText.paramSpread":"\u6269\u6563","customText.paramHalo":"\u5149\u6655","customText.paramOffset":"\u504F\u79FB","customText.paramBlur":"\u6A21\u7CCA","customText.paramOpacity":"\u4E0D\u900F\u660E\u5EA6","customText.paramWeight":"\u5B57\u91CD","customText.paramSkew":"\u503E\u659C","customText.paramThickness":"\u7EBF\u6761\u7C97\u7EC6","customText.paramRadius":"\u5706\u89D2","customText.paramHeight":"\u8986\u76D6\u9AD8\u5EA6","customText.paramSpacing":"\u5B57\u8DDD","customText.paramStrokeWidth":"\u63CF\u8FB9\u5BBD\u5EA6","customText.paramScale":"\u5B57\u53F7\u7F29\u653E","customText.effectShadow":"\u6295\u5F71","customText.effectBold":"\u52A0\u7C97","customText.effectItalic":"\u659C\u4F53","customText.effectUnderline":"\u4E0B\u5212\u7EBF","customText.effectWavy":"\u6CE2\u6D6A\u7EBF","customText.effectDashed":"\u865A\u7EBF\u4E0B\u5212","customText.effectStrikethrough":"\u5220\u9664\u7EBF","customText.effectHighlight":"\u80CC\u666F\u9AD8\u4EAE","customText.effectMarker":"\u8367\u5149\u7B14","customText.effectMono":"\u7B49\u5BBD\u5B57\u4F53","customText.effectSmallcaps":"\u5C0F\u578B\u5927\u5199","customText.effectOutline":"\u7A7A\u5FC3\u63CF\u8FB9","customText.effectSuperscript":"\u4E0A\u6807","customText.effectUppercase":"\u5168\u5927\u5199","customText.effectName_glow":"\u53D1\u5149","customText.effectName_shadow":"\u6295\u5F71","customText.effectName_bold":"\u52A0\u7C97","customText.effectName_italic":"\u659C\u4F53","customText.effectName_underline":"\u4E0B\u5212\u7EBF","customText.effectName_wavy":"\u6CE2\u6D6A\u7EBF","customText.effectName_dashed":"\u865A\u7EBF\u4E0B\u5212","customText.effectName_strikethrough":"\u5220\u9664\u7EBF","customText.effectName_highlight":"\u80CC\u666F\u9AD8\u4EAE","customText.effectName_marker":"\u8367\u5149\u7B14","customText.effectName_mono":"\u7B49\u5BBD","customText.effectName_smallcaps":"\u5C0F\u578B\u5927\u5199","customText.effectName_outline":"\u7A7A\u5FC3\u63CF\u8FB9","customText.effectName_superscript":"\u4E0A\u6807","customText.effectName_uppercase":"\u5168\u5927\u5199","customText.cancel":"\u53D6\u6D88","customText.confirm":"\u5E94\u7528\u989C\u8272","customText.add":"\u4E3A\u9009\u4E2D\u6587\u672C\u6DFB\u52A0\u989C\u8272","customText.addDesc":"\u5728\u7F16\u8F91\u5668\u4E2D\u9009\u4E2D\u6587\u672C\u540E\uFF0C\u70B9\u51FB\u6B64\u6309\u94AE\u6216\u4F7F\u7528\u547D\u4EE4\u4E3A\u5176\u5E94\u7528\u81EA\u5B9A\u4E49\u989C\u8272","customText.empty":"\u6682\u65E0\u81EA\u5B9A\u4E49\u6587\u672C\u989C\u8272\uFF0C\u8BF7\u5728\u7F16\u8F91\u5668\u4E2D\u9009\u4E2D\u6587\u672C\u540E\u901A\u8FC7\u547D\u4EE4\u6DFB\u52A0","customText.detailEmpty":"\u672A\u9009\u62E9\u89C4\u5219","customText.gradientStopsLabel":"\u8272\u70B9\u4E32","customText.gradientPreview":"\u6E10\u53D8\u9884\u89C8","customText.enableAction":"\u542F\u7528","customText.disableAction":"\u7981\u7528","customText.disabled":"\u5DF2\u7981\u7528","customText.textCol":"\u6587\u672C","customText.colorCol":"\u989C\u8272","customText.optionsCol":"\u5339\u914D\u9009\u9879","customText.enabledCol":"\u542F\u7528","customText.actionsCol":"\u64CD\u4F5C","customText.edit":"\u7F16\u8F91","customText.delete":"\u5220\u9664","customText.caseShort":"\u533A\u5206\u5927\u5C0F\u5199","customText.wholeShort":"\u5168\u5B57\u5339\u914D","customText.caseInsensitive":"\u4E0D\u533A\u5206\u5927\u5C0F\u5199","customText.wholeWordOff":"\u90E8\u5206\u5339\u914D","customText.cmdApply":"\u4E3A\u9009\u4E2D\u6587\u672C\u5E94\u7528\u989C\u8272","customText.cmdApplyDesc":"\u5728\u7F16\u8F91\u5668\u4E2D\u9009\u4E2D\u6587\u672C\u540E\u8C03\u7528\u6B64\u547D\u4EE4\uFF0C\u4E3A\u5176\u6307\u5B9A\u989C\u8272","customText.cmdRemove":"\u79FB\u9664\u9009\u4E2D\u6587\u672C\u7684\u989C\u8272","customText.cmdRemoveDesc":"\u79FB\u9664\u4E0E\u5F53\u524D\u9009\u4E2D\u6587\u672C\u5339\u914D\u7684\u81EA\u5B9A\u4E49\u989C\u8272\u89C4\u5219","customText.noticeApplied":"\u5DF2\u4E3A\u6587\u672C\u5E94\u7528\u989C\u8272","customText.noticeRemoved":"\u5DF2\u79FB\u9664\u6587\u672C\u989C\u8272\u89C4\u5219","customText.noticeNotFound":"\u672A\u627E\u5230\u5339\u914D\u7684\u989C\u8272\u89C4\u5219","customText.noticeNoSelection":"\u8BF7\u5148\u5728\u7F16\u8F91\u5668\u4E2D\u9009\u4E2D\u6587\u672C","customText.noticeNoText":"\u9009\u4E2D\u6587\u672C\u4E3A\u7A7A","customText.confirmDelete":"\u786E\u5B9A\u5220\u9664\u6B64\u989C\u8272\u89C4\u5219\uFF1F","customText.tip":"\u63D0\u793A\uFF1A\u989C\u8272\u4FE1\u606F\u4EC5\u4FDD\u5B58\u5728\u63D2\u4EF6\u672C\u5730\u6570\u636E\u4E2D\uFF0C\u4E0D\u4F1A\u5199\u5165 md \u6587\u4EF6","customText.menuApply":"\u4E3A\u9009\u4E2D\u6587\u672C\u5E94\u7528\u989C\u8272\u2026","customText.menuRemove":"\u79FB\u9664\u9009\u4E2D\u6587\u672C\u7684\u989C\u8272","customText.menuOpenPicker":"\u6253\u5F00\u9AD8\u7EA7\u989C\u8272\u9009\u62E9\u5668\u2026","customText.menuSeparator":"\u63D0\u793A\u8BCD\u7740\u8272","customText.popoverTitle":"\u5FEB\u901F\u7740\u8272","customText.popoverMore":"\u9AD8\u7EA7\u9009\u9879\u2026","customText.popoverMoreDesc":"\u6253\u5F00\u5B8C\u6574\u989C\u8272\u9009\u62E9\u5668\uFF08\u81EA\u5B9A\u4E49\u989C\u8272\u3001\u5339\u914D\u9009\u9879\uFF09","customText.popoverRemove":"\u79FB\u9664\u989C\u8272","customText.popoverRemoveDesc":"\u79FB\u9664\u4E0E\u5F53\u524D\u9009\u4E2D\u6587\u672C\u5339\u914D\u7684\u989C\u8272\u89C4\u5219","customText.popoverExisting":"\u5F53\u524D\u6587\u672C\u5DF2\u8BBE\u7F6E\u989C\u8272","customText.popoverAutoShow":"\u9009\u4E2D\u6587\u672C\u81EA\u52A8\u663E\u793A\u6D6E\u52A8\u9762\u677F","customText.popoverAutoShowDesc":"\u5728\u7F16\u8F91\u5668\u4E2D\u9009\u4E2D\u6587\u672C\u65F6\u81EA\u52A8\u5F39\u51FA\u5FEB\u901F\u7740\u8272\u9762\u677F","customText.popoverDelay":"\u6D6E\u52A8\u9762\u677F\u663E\u793A\u5EF6\u8FDF\uFF08\u6BEB\u79D2\uFF09","customText.popoverDelayDesc":"\u9009\u4E2D\u540E\u5EF6\u8FDF\u591A\u5C11\u6BEB\u79D2\u663E\u793A\u6D6E\u52A8\u9762\u677F\uFF08\u907F\u514D\u8BEF\u89E6\u53D1\uFF09","customText.noticeColorApplied":"\u5DF2\u4E3A\u6587\u672C\u5E94\u7528\u989C\u8272\uFF1A","colorMap.title":"\u989C\u8272\u5BFC\u56FE","colorMap.refresh":"\u5237\u65B0","colorMap.expandAll":"\u5C55\u5F00","colorMap.collapseAll":"\u6298\u53E0","colorMap.searchPlaceholder":"\u641C\u7D22\u7740\u8272\u5185\u5BB9\u2026","colorMap.noDocument":"\u8BF7\u6253\u5F00 Markdown \u6587\u4EF6","colorMap.noMatches":"\u672A\u68C0\u6D4B\u5230\u7740\u8272\u5185\u5BB9","colorMap.highlightDisabled":"\u7F16\u8F91\u5668\u9AD8\u4EAE\u5DF2\u7981\u7528","colorMap.noResults":"\u65E0\u5339\u914D\u7ED3\u679C","colorMap.totalMatches":"\u5171 {n} \u5904\u7740\u8272","colorMap.openPanel":"\u6253\u5F00\u989C\u8272\u5BFC\u56FE\u9762\u677F","colorMap.gradientLabel":"\u6E10\u53D8","colorMap.animationLabel":"\u52A8\u753B","colorMap.hoverLabel":"\u60AC\u505C","colorMap.glowLabel":"\u53D1\u5149","colorMap.multiColorLabel":"\u591A\u8272","colorMap.dragHint":"\u62D6\u62FD\u5339\u914D\u9879\u5230\u7F16\u8F91\u5668\u4F7F\u7528","colorMap.scopeCurrent":"\u5F53\u524D\u6587\u4EF6","colorMap.scopeGlobal":"\u5168\u5C40\u68C0\u6D4B","colorMap.scanning":"\u6B63\u5728\u626B\u63CF\u5168\u90E8\u6587\u4EF6\u2026","colorMap.searchPlaceholderCurrent":"\u641C\u7D22\u5F53\u524D\u6587\u4EF6\u7740\u8272\u2026","colorMap.searchPlaceholderGlobal":"\u641C\u7D22\u5168\u90E8\u6587\u4EF6\u7740\u8272\u2026","colorMap.fileLabel":"\u6587\u4EF6","colorMap.fileBadge":"\u6587\u4EF6\uFF1A{name}","colorMap.lock":"\u9501\u5B9A","colorMap.unlock":"\u89E3\u9501","colorMap.lockHint":"\u9501\u5B9A\u540E\u5207\u6362\u6587\u6863\u4E0D\u518D\u8DDF\u968F\uFF0C\u6301\u7EED\u626B\u63CF\u8BE5\u6587\u4EF6","colorMap.filesCount":"{n} \u4E2A\u6587\u4EF6","colorMap.truncatedTip":"\u4EC5\u663E\u793A\u524D {n} \u9879","colorMap.globalEmptyTitle":"\u672A\u53D1\u73B0\u7740\u8272\u5185\u5BB9","colorMap.globalEmptyDesc":"\u5168\u5E93\u6240\u6709 Markdown \u6587\u4EF6\u5747\u65E0\u7740\u8272\u5339\u914D","colorMap.jumpFileHint":"\u70B9\u51FB\u6253\u5F00\u6587\u4EF6\u5E76\u8DF3\u8F6C","colorMap.rulesCount":"{n} \u6761\u89C4\u5219","colorMap.lineLabel":"L","colorMap.customTag":"\u81EA\u5B9A\u4E49","colorMap.builtinTag":"\u5185\u7F6E","colorMap.emptyTitle":"\u6682\u65E0\u7740\u8272\u89C4\u5219","colorMap.emptyDesc":"\u9009\u4E2D\u6587\u672C\u5373\u53EF\u521B\u5EFA\u7740\u8272\u89C4\u5219","colorMap.noDocTitle":"\u672A\u6253\u5F00\u6587\u6863","colorMap.noDocDesc":"\u6253\u5F00 Markdown \u6587\u4EF6\u67E5\u770B\u5339\u914D","colorMap.noMatchTitle":"\u65E0\u5339\u914D","colorMap.noMatchDesc":"\u5F53\u524D\u6587\u6863\u672A\u547D\u4E2D\u6B64\u89C4\u5219","colorMap.collapse":"\u6536\u8D77","colorMap.expand":"\u5C55\u5F00","colorMap.switchToCategory":"\u5207\u6362\u5230\u8D44\u6E90\u5206\u7C7B\u89C6\u56FE","colorMap.switchToPackage":"\u5207\u6362\u5230\u5305\u89C6\u56FE","colorMap.modeSingle":"\u5355\u9009","colorMap.modeMulti":"\u53E0\u52A0","colorMap.scanClassify":"\u626B\u63CF\u5E76\u5F52\u7C7B\u8D44\u6E90","colorMap.cleanupUnreferenced":"\u6E05\u7406\u672A\u5F15\u7528\u8D44\u6E90","colorMap.importPkg":"\u5BFC\u5165 .stylepkg \u5305","guide.quickStart":"\u5FEB\u901F\u4E0A\u624B","guide.step1Title":"\u2460 \u7F16\u8F91\u5668\u81EA\u52A8\u7740\u8272","guide.step1Desc":"\u6253\u5F00\u4EFB\u610F Markdown \u6587\u4EF6\uFF0C\u63D0\u793A\u8BCD\u4E2D\u7684\u89D2\u8272\u6807\u7B7E\u3001\u53C2\u6570\u3001\u53D8\u91CF\u7B49\u4F1A\u81EA\u52A8\u7740\u8272\uFF0C\u65E0\u9700\u624B\u52A8\u64CD\u4F5C","guide.step2Title":"\u2461 \u9009\u4E2D\u6587\u672C\u5FEB\u901F\u7740\u8272","guide.step2Desc":"\u5728\u7F16\u8F91\u5668\u4E2D\u9009\u4E2D\u6587\u672C\uFF0C\u81EA\u52A8\u5F39\u51FA\u9009\u8272\u9762\u677F\uFF1B\u6216\u53F3\u952E\u83DC\u5355 \u2192 \u63D0\u793A\u8BCD\u7740\u8272 \u2192 \u4E3A\u9009\u4E2D\u6587\u672C\u5E94\u7528\u989C\u8272","guide.step3Title":"\u2462 \u989C\u8272\u5BFC\u56FE\u8DF3\u8F6C","guide.step3Desc":"\u70B9\u51FB\u5DE6\u4FA7\u680F\u5730\u56FE\u56FE\u6807\uFF0C\u6309\u989C\u8272\u5206\u7EC4\u6D4F\u89C8\u5168\u6587\u7740\u8272\u7247\u6BB5\uFF0C\u70B9\u51FB\u8DF3\u8F6C\u5230\u5BF9\u5E94\u4F4D\u7F6E","guide.commands":"\u547D\u4EE4\u6E05\u5355","guide.commandsDesc":"\u5728\u547D\u4EE4\u9762\u677F\uFF08Ctrl/Cmd + P\uFF09\u641C\u7D22\u4EE5\u4E0B\u547D\u4EE4\u4F7F\u7528","guide.openColorMap":"\u6253\u5F00\u989C\u8272\u5BFC\u56FE","guide.tip":"\u63D0\u793A\uFF1A\u5728\u7F16\u8F91\u5668\u4E2D\u9009\u4E2D\u4E00\u6BB5\u6587\u672C\u8BD5\u8BD5\uFF0C\u4F1A\u81EA\u52A8\u5F39\u51FA\u9009\u8272\u9762\u677F","tab.overviewTip":"\u63D2\u4EF6\u72B6\u6001\u603B\u89C8\u3001\u5B9E\u65F6\u9884\u89C8\u4E0E\u5168\u5C40\u8BBE\u7F6E","tab.packagesTip":"\u5305\u7BA1\u7406\uFF1A\u7740\u8272\u89C4\u5219\u4E0E\u4EE4\u724C\u6309\u5305\u5206\u7EC4\uFF0C\u70B9\u51FB\u5305\u8FDB\u884C\u7BA1\u7406","tab.rulesTip":"\u7740\u8272\u89C4\u5219\u5F00\u5173\uFF1A\u57FA\u7840\u7B26\u53F7\u3001\u89C6\u9891/\u5206\u955C\u3001SD \u6269\u5C55","tab.colorsTip":"\u8BCD\u6C47\u4EE4\u724C\u7BA1\u7406\u3001\u57FA\u7840\u8272\u677F\u3001\u81EA\u5B9A\u4E49\u6587\u672C\u989C\u8272","tab.engineTip":"\u89C4\u5219\u6E90\u914D\u7F6E\u3001Git \u62C9\u53D6\u3001\u89C4\u5219\u66F4\u65B0","tab.filesTip":"\u6587\u4EF6\u7C7B\u578B\u68C0\u6D4B\u3001\u663E\u793A\u9009\u9879"};function f(a){var o;return(o=ri[a])!=null?o:a}var fe=class extends ys.Modal{constructor(o,t,e,s,r,i,n){super(o),this.titleText=t,this.namePlaceholder=e,this.descPlaceholder=s,this.initialName=r,this.initialDesc=i,this.onSubmit=n}onOpen(){let{contentEl:o,titleEl:t}=this;t.setText(this.titleText);let e=o.createDiv({cls:"pc-agent-form"}),s=e.createEl("input",{type:"text",cls:"pc-agent-input",attr:{placeholder:this.namePlaceholder,value:this.initialName}}),r=e.createEl("input",{type:"text",cls:"pc-agent-input",attr:{placeholder:this.descPlaceholder,value:this.initialDesc}}),i=e.createDiv({cls:"pc-agent-form-actions"}),n=i.createEl("button",{text:f("confirm.cancel"),cls:"pc-agent-form-cancel"}),l=i.createEl("button",{text:f("confirm.ok"),cls:"pc-agent-form-confirm mod-cta"}),c=()=>{let d=s.value.trim();d&&(this.onSubmit(d,r.value.trim()),this.close())};l.addEventListener("click",c),n.addEventListener("click",()=>this.close()),s.addEventListener("keydown",d=>{d.key==="Enter"&&c()}),setTimeout(()=>s.focus(),50)}onClose(){this.contentEl.empty()}};var ii=new Set(["ruleSource","gitRawBaseUrl","gitBranch","autoUpdateRules","autoUpdateInterval","lastCheckTime","ruleSources","activeRuleSourceId","gitTokenEnabled","gitToken","gitReportEnabled","downloadToCache","lastPullReport","customTextColors","customRules","ruleMeta","ruleAnnotations","legacyResourcesMigrated"]);function vs(a,o){let t={};for(let e of Object.keys(a))ii.has(e)||(t[e]=a[e]);return{version:o,exportedAt:new Date().toISOString(),plugin:"prompt-colorizer",settings:t}}function oi(a,o){let t={...a};for(let[e,s]of Object.entries(o)){if(s===void 0)continue;let r=t[e];if(Array.isArray(s)&&Array.isArray(r))if(s.length>0&&typeof s[0].id!="undefined"){let i=new Map;for(let n of r)i.set(n.id,n);for(let n of s)i.set(n.id,n);t[e]=[...i.values()]}else t[e]=s;else typeof s=="object"&&s!==null&&!Array.isArray(s)&&typeof r=="object"&&r!==null?t[e]={...r,...s}:t[e]=s}return t}function bs(a,o){let t={...a};for(let e of o)t=oi(t,e);return t}function ks(a){let o=JSON.parse(a);if(o&&typeof o=="object"&&"settings"in o&&o.settings)return o.settings;if(o&&typeof o=="object")return o;throw new Error("Invalid config format")}function xs(a,o){let t=o||`prompt-colorizer-config-${new Date().toISOString().slice(0,10)}.json`,e=JSON.stringify(a,null,2),s=new Blob([e],{type:"application/json"}),r=URL.createObjectURL(s),i=document.createElement("a");i.href=r,i.download=t,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(r)}var B=require("obsidian");var Xe={highlightVariables:"dsl-variable",highlightRoleTags:"dsl-role-tag",highlightInstructionMarkers:"dsl-instruction",highlightSectionMarkers:"dsl-block-wrapper",highlightShotHeaders:"dsl-shot-header",highlightAssetRefs:"dsl-asset",highlightFieldLabels:"dsl-param-key",highlightDialogue:"dsl-dialogue",highlightAudioRefs:"dsl-audio-ref",highlightNegativePrompts:"dsl-constraint",highlightTechParams:"dsl-tech-param",highlightParentheticals:"dsl-parenthetical",highlightEmphasisWeights:"dsl-emphasis-weight",highlightLoraRefs:"dsl-lora-ref",highlightBracketEmphasis:"dsl-bracket-strong",highlightQualityTags:"dsl-quality-tag",highlightSdNegativeHeader:"dsl-sd-negative-header",highlightCameraMoves:"dsl-camera-word",highlightSceneTransitions:"dsl-scene-transition"},Ze=Object.fromEntries(Object.entries(Xe).map(([a,o])=>[o,a]));var et=[{id:"custom",nameKey:"colorMap.sectionCustom",icon:"paintbrush"},{id:"basic",nameKey:"colorMap.sectionBasic",icon:"braces"},{id:"video",nameKey:"colorMap.sectionVideo",icon:"film"},{id:"sd",nameKey:"colorMap.sectionSd",icon:"sparkles"},{id:"other",nameKey:"colorMap.sectionOther",icon:"box"}],Jo=Object.fromEntries(et.map(a=>[a.id,a])),ai=(()=>{let a={},o=(t,e)=>{for(let s of t)a[s]=e};return o(["highlightVariables","highlightRoleTags","highlightRoleHeaders","highlightInstructionMarkers","highlightComments","highlightCodeBlocks","highlightJsonBlocks","highlightInlineCode"],"basic"),o(["highlightSectionMarkers","highlightShotHeaders","highlightAssetRefs","highlightFieldLabels","highlightDialogue","highlightAudioRefs","highlightNegativePrompts","highlightTechParams","highlightParentheticals"],"video"),o(["highlightEmphasisWeights","highlightLoraRefs","highlightBracketEmphasis","highlightSdNegativeHeader"],"sd"),a})(),ni=(()=>{let a={};for(let[t,e]of Object.entries(Xe)){let s=ai[t];s&&!(e in a)&&(a[e]=s)}let o={"dsl-md-comment":"basic","dsl-md-code-fence":"basic","dsl-md-inline-code":"basic","dsl-role-header":"basic","dsl-asset-bracket":"video"};for(let[t,e]of Object.entries(o))t in a||(a[t]=e);return a})();function Dt(a){if(a.startsWith("dsl-custom-text-"))return{sectionId:"custom"};let o=ni[a];return o?{sectionId:o}:{sectionId:"other"}}function Cs(a){if(!a)return null;let o=new Set;for(let t of a.enabledKeys){let e=Xe[t];e&&o.add(e)}return o}var J=require("obsidian");Y();Y();var li=[{keywords:["\u89D2\u8272","\u4EBA\u7269","\u4E3B\u89D2","speaker"],category:"\u89D2\u8272\u540D\u79F0",kind:"token"},{keywords:["\u53F0\u8BCD","\u5BF9\u8BDD","\u5BF9\u767D","dialogue"],category:"\u53F0\u8BCD\u5BF9\u8BDD",kind:"token"},{keywords:["\u573A\u666F","\u73AF\u5883","scene","\u5730\u70B9"],category:"\u573A\u666F\u73AF\u5883",kind:"token"},{keywords:["\u72EC\u767D","\u5185\u5FC3","\u5FC3\u7406"],category:"\u5185\u5FC3\u72EC\u767D",kind:"token"},{keywords:["\u65C1\u767D","\u53D9\u4E8B","narration"],category:"\u65C1\u767D\u53D9\u4E8B",kind:"both"},{keywords:["\u6307\u4EE4","\u7CFB\u7EDF","\u547D\u4EE4","instruction","system"],category:"\u7CFB\u7EDF\u6307\u4EE4",kind:"token"},{keywords:["\u6CE8\u91CA","\u5907\u6CE8","\u6807\u8BB0","comment","note"],category:"\u5907\u6CE8\u6807\u8BB0",kind:"both"},{keywords:["\u5305\u88F9","\u533A\u95F4","\u5927\u62EC\u53F7","\u5C0F\u62EC\u53F7","\u62EC\u53F7","bracket","paren"],category:"\u65C1\u767D\u5305\u88F9",kind:"rule"},{keywords:["\u53C2\u6570","\u6743\u91CD","param","weight"],category:"\u53C2\u6570\u5757",kind:"rule"}];function ws(a,o,t){let e=`${o} ${t}`.toLowerCase();for(let s of li)if(!(s.kind!=="both"&&s.kind!==a)&&s.keywords.some(r=>e.includes(r.toLowerCase())))return s.category;return null}function Ss(a,o){return!o||o==="\u672A\u5206\u7C7B"||!(a==="token"?le:je).includes(o)}function we(a){var n,l,c,d,p,g,u,h,y,m,b,v,k,_,R,T,D,I;let o=[],t=(n=a.loadedPackages)!=null?n:[],e=(c=(l=a.pkgManager)==null?void 0:l.collectAllRefIds(t))!=null?c:{tokenIds:new Set,ruleIds:new Set},s=new Map,r=new Map;for(let S of t){for(let C of(d=S.refTokenIds)!=null?d:[])((p=s.get(C))!=null?p:(s.set(C,[]),s.get(C))).push(S.dirName);for(let C of(g=S.refRuleIds)!=null?g:[])((u=r.get(C))!=null?u:(r.set(C,[]),r.get(C))).push(S.dirName)}for(let S of(h=a.settings.customTextColors)!=null?h:[]){let C=(y=s.get(S.id))!=null?y:[],x=S.resourceLock?"locked":C.length>0?"active":"idle";o.push({kind:"token",id:S.id,name:S.text||S.id,cssClass:`dsl-custom-text-${S.id}`,category:(m=S.category)!=null?m:"\u672A\u5206\u7C7B",resourceLock:!!S.resourceLock,note:(b=S.note)!=null?b:"",status:x,refPackages:C,color:S.color,enabled:S.enabled}),s.delete(S.id)}for(let[S,C]of s)o.push({kind:"token",id:S,name:S,cssClass:`dsl-custom-text-${S}`,category:"\u672A\u5206\u7C7B",resourceLock:!1,note:"",status:"missing",refPackages:C});let i=(v=a.settings.ruleMeta)!=null?v:{};for(let S of(_=(k=a.currentRuleSet)==null?void 0:k.rules)!=null?_:[]){if(!(S!=null&&S.id))continue;let C=(R=i[S.id])!=null?R:{},x=(T=r.get(S.id))!=null?T:[],P=C.resourceLock?"locked":x.length>0?"active":"idle";o.push({kind:"rule",id:S.id,name:S.id,cssClass:S.cssClass,category:(D=C.category)!=null?D:"\u672A\u5206\u7C7B",resourceLock:!!C.resourceLock,note:(I=C.note)!=null?I:"",status:P,refPackages:x}),r.delete(S.id)}for(let[S,C]of r)o.push({kind:"rule",id:S,name:S,cssClass:"",category:"\u672A\u5206\u7C7B",resourceLock:!1,note:"",status:"missing",refPackages:C});return o}function Es(a){return a.filter(o=>o.status==="idle")}var Bs=require("obsidian");Y();Mt();ye();async function N(a,o){await a.saveSettings(),await a.reloadPackages(),a.app.workspace.trigger("prompt-colorizer:custom-colors-changed"),o&&new Bs.Notice(o)}async function Le(a,o){var s;let t=a.settings,e=new Set((s=t.enabledPackageIds)!=null?s:[]);t.packageMode==="single"?t.enabledPackageIds=e.has(o)?[]:[o]:(e.has(o)?e.delete(o):e.add(o),t.enabledPackageIds=[...e]),await N(a)}async function de(a,o){var t;if(a.settings.packageMode=o,o==="single"){let e=(t=a.settings.enabledPackageIds)!=null?t:[];e.length>1&&(a.settings.enabledPackageIds=[e[0]])}await N(a)}async function Wt(a,o,t){var n;let e=a.settings,s=[...(n=e.packageOrder)!=null?n:[]];for(let l of a.loadedPackages)s.includes(l.dirName)||s.push(l.dirName);let r=s.indexOf(o),i=r+t;r<0||i<0||i>=s.length||(s.splice(r,1),s.splice(i,0,o),e.packageOrder=s,await N(a))}async function Ae(a,o,t){var e,s;!o.manifest||o.isBuiltin||(o.manifest.name=t,await a.pkgManager.writePackage(o.dirName,o.manifest,(e=o.embeddedTokens)!=null?e:[],(s=o.embeddedRules)!=null?s:[]),await N(a,"\u5305\u5DF2\u91CD\u547D\u540D"))}async function Ie(a,o){var i,n,l,c,d,p,g;let t=await Vt(a,`${o.dirName}_copy`),e={...(i=o.manifest)!=null?i:qs(t),packageId:t,name:`${(l=(n=o.manifest)==null?void 0:n.name)!=null?l:o.dirName} \u526F\u672C`,type:"user",version:"1.0.0"},s=((c=o.embeddedTokens)!=null?c:[]).map(u=>structuredClone(u)),r=((d=o.embeddedRules)!=null?d:[]).map(u=>structuredClone(u));await a.pkgManager.createPackage(e,s,r),await N(a,`\u5DF2\u590D\u5236\u5305\u300C${(g=(p=o.manifest)==null?void 0:p.name)!=null?g:o.dirName}\u300D`)}async function Fe(a,o){var c,d,p,g;let t=await Vt(a,`${o.dirName}_clone`),e={},s=[];for(let u of(c=o.embeddedTokens)!=null?c:[]){let h=Me("token");e[h]=u.id,s.push({...structuredClone(u),id:h})}let r=((d=o.embeddedRules)!=null?d:[]).map(u=>structuredClone(u)),i=(p=o.manifest)!=null?p:qs(t),n={};for(let[u,h]of Object.entries((g=i.tokenOverrides)!=null?g:{})){let y=s.find(m=>e[m.id]===u);y&&(n[y.id]=h)}let l={...i,packageId:t,name:`${i.name} \u514B\u9686`,type:"user",version:"1.0.0",specVersion:z,clonedFromPackageId:o.dirName,clonedFromResourceIds:e};Object.keys(n).length>0?l.tokenOverrides=n:delete l.tokenOverrides,a.settings.customTextColors.push(...s),a.applyCustomTextColorsStyles(),a.refreshEditorExtensions(),await a.pkgManager.createPackage(l,s,r),await N(a,`\u5DF2\u514B\u9686\u5305\u300C${i.name}\u300D\uFF08\u4EE4\u724C\u6570\u636E\u5B8C\u5168\u72EC\u7ACB\uFF09`)}async function Be(a,o){var t,e,s,r;o.isBuiltin||(await a.pkgManager.deletePackage(o.dirName),a.settings.enabledPackageIds=((t=a.settings.enabledPackageIds)!=null?t:[]).filter(i=>i!==o.dirName),a.settings.packageOrder=((e=a.settings.packageOrder)!=null?e:[]).filter(i=>i!==o.dirName),await N(a,`\u5DF2\u5220\u9664\u5305\u300C${(r=(s=o.manifest)==null?void 0:s.name)!=null?r:o.dirName}\u300D\uFF08\u8D44\u6E90\u672C\u4F53\u4FDD\u7559\uFF09`))}async function Os(a,o,t){if(o.kind==="token"){let e=a.settings.customTextColors.find(s=>s.id===o.id);if(!e)return;e.category=t}else{let e=Oe(a,o.id);e.category=t,a.settings.ruleMeta[o.id]=e}await N(a,`\u5206\u7C7B\u5DF2\u66F4\u65B0\u4E3A\u300C${t}\u300D`)}async function $s(a,o){if(o.kind==="token"){let t=a.settings.customTextColors.find(e=>e.id===o.id);if(!t)return;t.resourceLock=!o.resourceLock}else{let t=Oe(a,o.id);t.resourceLock=!o.resourceLock,a.settings.ruleMeta[o.id]=t}await N(a,o.resourceLock?"\u5DF2\u53D6\u6D88\u9501\u5B9A":"\u5DF2\u9501\u5B9A\u4FDD\u62A4")}async function Ns(a,o,t){var s,r,i,n,l,c;let e=a.loadedPackages.find(d=>d.dirName===t);if(!(!e||!e.manifest||e.isBuiltin)){if(o.kind==="token"){if(((s=e.embeddedTokens)!=null?s:[]).some(p=>p.id===o.id))return;let d=a.settings.customTextColors.find(p=>p.id===o.id);if(!d)return;e.embeddedTokens=[...(r=e.embeddedTokens)!=null?r:[],structuredClone(d)]}else{if(((i=e.embeddedRules)!=null?i:[]).some(p=>p.id===o.id))return;let d=te(a,o.id);if(!d)return;e.embeddedRules=[...(n=e.embeddedRules)!=null?n:[],d]}await a.pkgManager.writePackage(e.dirName,e.manifest,(l=e.embeddedTokens)!=null?l:[],(c=e.embeddedRules)!=null?c:[]),await N(a,`\u5DF2\u6DFB\u52A0\u5230\u5305\u300C${e.manifest.name}\u300D`)}}async function zs(a,o){var t,e,s,r,i,n,l,c,d,p,g,u;for(let h of a.loadedPackages){if(!h.manifest||h.isBuiltin)continue;let y=(e=(t=h.embeddedTokens)==null?void 0:t.length)!=null?e:0,m=(r=(s=h.embeddedRules)==null?void 0:s.length)!=null?r:0;o.kind==="token"?h.embeddedTokens=((i=h.embeddedTokens)!=null?i:[]).filter(b=>b.id!==o.id):h.embeddedRules=((n=h.embeddedRules)!=null?n:[]).filter(b=>b.id!==o.id),(((c=(l=h.embeddedTokens)==null?void 0:l.length)!=null?c:0)!==y||((p=(d=h.embeddedRules)==null?void 0:d.length)!=null?p:0)!==m)&&await a.pkgManager.writePackage(h.dirName,h.manifest,(g=h.embeddedTokens)!=null?g:[],(u=h.embeddedRules)!=null?u:[])}await N(a,"\u5DF2\u4ECE\u6240\u6709\u5305\u79FB\u9664")}async function jt(a,o){let t=new Set(o.filter(s=>s.kind==="token").map(s=>s.id));if(t.size===0)return;let e=a.settings.customTextColors.length;a.settings.customTextColors=a.settings.customTextColors.filter(s=>!t.has(s.id)),a.settings.customTextColors.length!==e&&(a.applyCustomTextColorsStyles(),a.refreshEditorExtensions(),await N(a,`\u5DF2\u5220\u9664 ${t.size} \u4E2A\u8D44\u6E90\u672C\u4F53`))}async function Hs(a,o,t){var e,s;o.manifest&&(t.tokenOverrides&&(o.manifest.tokenOverrides=t.tokenOverrides),t.ruleOverrides&&(o.manifest.ruleOverrides=t.ruleOverrides),await a.pkgManager.writePackage(o.dirName,o.manifest,(e=o.embeddedTokens)!=null?e:[],(s=o.embeddedRules)!=null?s:[]),await N(a))}async function Gs(a,o,t,e,s){var i,n,l,c;let r=a.loadedPackages.find(d=>d.dirName===o);if(!(!r||!r.manifest)){if(t==="token"){let d=(i=r.embeddedTokens)!=null?i:[];if(s){if(d.some(g=>g.id===e))return;let p=a.settings.customTextColors.find(g=>g.id===e);if(!p)return;r.embeddedTokens=[...d,structuredClone(p)]}else r.embeddedTokens=d.filter(p=>p.id!==e)}else{let d=(n=r.embeddedRules)!=null?n:[];if(s){if(d.some(g=>g.id===e))return;let p=te(a,e);if(!p)return;r.embeddedRules=[...d,p]}else r.embeddedRules=d.filter(p=>p.id!==e)}await a.pkgManager.writePackage(r.dirName,r.manifest,(l=r.embeddedTokens)!=null?l:[],(c=r.embeddedRules)!=null?c:[]),await N(a)}}async function Ws(a,o){let t=await Vt(a,mi(o)),e={packageId:t,name:o,tagColor:"#7c8aff",description:"",version:"1.0.0",specVersion:z,type:"user",usageTag:"",previewSampleText:"",ruleOverrides:{}};return await a.pkgManager.createPackage(e,[],[]),await N(a,`\u5DF2\u521B\u5EFA\u7A7A\u5305\u300C${o}\u300D`),t}function mi(a){let o=a.replace(/[\\/:*?"<>|#^[\]]/g,"_").trim();return o.length>0?o:"new_pack"}async function js(a,o){for(let{entry:t,category:e}of o)if(t.kind==="token"){let s=a.settings.customTextColors.find(r=>r.id===t.id);s&&(s.category=e)}else{let s=Oe(a,t.id);s.category=e,a.settings.ruleMeta[t.id]=s}return await N(a),o.length}function Oe(a,o){var e,s,r,i;let t=(s=(e=a.settings.ruleMeta)==null?void 0:e[o])!=null?s:{};return{category:(r=t.category)!=null?r:"\u672A\u5206\u7C7B",resourceLock:!!t.resourceLock,note:(i=t.note)!=null?i:""}}async function Vs(a,o,t){var s,r;let e=a.loadedPackages.find(i=>{var n;return!i.isBuiltin&&((n=i.embeddedRules)!=null?n:[]).some(l=>l.id===o)});if(e&&e.manifest){let i=(s=e.embeddedRules)!=null?s:[];for(let n of i)if(n.id===o){n.annotation=t||void 0;break}await a.pkgManager.writePackage(e.dirName,e.manifest,(r=e.embeddedTokens)!=null?r:[],i)}else a.settings.ruleAnnotations||(a.settings.ruleAnnotations={}),t?a.settings.ruleAnnotations[o]=t:delete a.settings.ruleAnnotations[o];await N(a,"\u8BF4\u660E\u5DF2\u66F4\u65B0")}function it(a,o){var t,e,s;for(let r of a.loadedPackages){let i=((t=r.embeddedRules)!=null?t:[]).find(n=>n.id===o);if(i!=null&&i.annotation)return i.annotation}return(s=(e=a.settings.ruleAnnotations)==null?void 0:e[o])!=null?s:""}async function Vt(a,o){let t=o,e=2;for(;await a.app.vault.adapter.exists(`packages/${t}`);)t=`${o}_${e++}`;return t}function qs(a){return{packageId:a,name:a,tagColor:"#7c8aff",description:"",version:"1.0.0",specVersion:z,type:"user",usageTag:"",previewSampleText:""}}tt();var Us={active:{icon:"\u2705",title:"\u5DF2\u5F15\u7528\uFF08\u6D3B\u8DC3\uFF09",cls:"is-active"},idle:{icon:"\u{1F5C2}\uFE0F",title:"\u672A\u5F15\u7528\uFF08\u95F2\u7F6E\uFF09",cls:"is-idle"},missing:{icon:"\u26A0\uFE0F",title:"\u5F15\u7528\u4E22\u5931\uFF08\u5931\u6548\uFF09",cls:"is-missing"},locked:{icon:"\u{1F512}",title:"\u53D7\u4FDD\u62A4\u9501\u5B9A",cls:"is-locked"}};function Ys(a,o,t){let e=o.pkgManager?o.pkgManager.sortPackages(o.loadedPackages):[],s=we(o),r=new Map(s.map(l=>[`${l.kind}:${l.id}`,l])),i=t.searchQuery.trim().toLowerCase(),n=a.createDiv({cls:"pc-pk-tree"});if(e.length===0){Ei(n,"package","\u6682\u65E0\u5305","packages/ \u76EE\u5F55\u4E3A\u7A7A\u3002\u70B9\u51FB\u300C\u5BFC\u5165\u5305\u300D\u5BFC\u5165 .stylepkg\uFF0C\u6216\u521B\u5EFA\u65B0\u5305");return}for(let l of e)fi(l,s,i)&&yi(n,o,l,r,t,i);wi(a,o,t.selectedPackageId,e)}function fi(a,o,t){var r,i,n,l,c,d;if(!t||((i=(r=a.manifest)==null?void 0:r.name)!=null?i:a.dirName).toLowerCase().includes(t)||a.dirName.toLowerCase().includes(t)||((l=(n=a.manifest)==null?void 0:n.usageTag)!=null?l:"").toLowerCase().includes(t))return!0;let e=(c=a.refTokenIds)!=null?c:[],s=(d=a.refRuleIds)!=null?d:[];return o.some(p=>p.name.toLowerCase().includes(t)&&(p.kind==="token"?e.includes(p.id):s.includes(p.id)))}function yi(a,o,t,e,s,r){var R,T,D,I,S,C;let n=((R=o.settings.enabledPackageIds)!=null?R:[]).includes(t.dirName),l=t.manifest,c=(T=l==null?void 0:l.name)!=null?T:t.dirName,d=a.createDiv({cls:"pc-pk-node"});(t.status==="invalid"||t.status==="id-conflict")&&d.addClass("is-broken");let p=d.createDiv({cls:"pc-pk-row"});s.selectedPackageId===t.dirName&&p.addClass("is-selected");let g=p.createEl("input",{cls:"pc-pk-check",attr:{type:"checkbox"}});g.checked=n,g.disabled=t.status==="invalid"||t.status==="id-conflict",g.addEventListener("change",()=>{Le(o,t.dirName)});let u=p.createSpan({cls:"pc-pk-dot"});u.style.background=(l==null?void 0:l.tagColor)||"#7c8aff",p.createSpan({cls:"pc-pk-name",text:c}).setAttribute("title",(I=(D=l==null?void 0:l.description)!=null?D:t.statusMessage)!=null?I:c),t.isBuiltin&&p.createSpan({cls:"pc-pk-tag is-builtin",text:"\u5185\u7F6E"}),l!=null&&l.usageTag&&p.createSpan({cls:"pc-pk-tag",text:l.usageTag});let y=(l!=null&&l.clonedFromPackageId,null);t.status==="id-conflict"?p.createSpan({cls:"pc-pk-tag is-warn",text:"ID\u51B2\u7A81\uFF0C\u7981\u7528"}):t.status==="invalid"?p.createSpan({cls:"pc-pk-tag is-warn",text:"\u65E0\u6548\u5305"}):t.status==="partial"&&p.createSpan({cls:"pc-pk-tag is-warn",text:"\u90E8\u5206\u5931\u6548"}),l!=null&&l.clonedFromPackageId&&p.createSpan({cls:"pc-pk-tag",text:"\u514B\u9686"}),p.addEventListener("click",()=>{s.onSelectPackage(s.selectedPackageId===t.dirName?null:t.dirName)}),p.addEventListener("contextmenu",x=>{x.preventDefault(),bi(o,t,x)});let m=(S=t.refTokenIds)!=null?S:[],b=(C=t.refRuleIds)!=null?C:[],v=d.createDiv({cls:"pc-pk-children"}),k=m.map(x=>e.get(`token:${x}`)).filter(x=>!!x).filter(x=>!r||x.name.toLowerCase().includes(r)),_=b.map(x=>e.get(`rule:${x}`)).filter(x=>!!x).filter(x=>!r||x.name.toLowerCase().includes(r));(m.length>0||k.length>0)&&Ks(v,"\u{1F7E2}","\u4EE4\u724C\u7EC4",k,o,r,m),(b.length>0||_.length>0)&&Ks(v,"\u{1F7E3}","\u89C4\u5219\u7EC4",_,o,r,b),t.refTokenIds===null||t.refRuleIds===null?v.createDiv({cls:"pc-pk-index-warn"}).setText(`\u26A0\uFE0F ${t.refTokenIds===null?"tokens/":"rules/"} \u5206\u7C7B\u6587\u4EF6\u635F\u574F\uFF0C\u8BE5\u5206\u7EC4\u90E8\u5206\u5931\u6548`):k.length===0&&_.length===0&&v.createDiv({cls:"pc-pk-group-empty",text:"\uFF08\u7A7A\u5305\uFF1A\u672A\u5305\u542B\u4EFB\u4F55\u8D44\u6E90\uFF09"})}function Ks(a,o,t,e,s,r,i){let n=a.createDiv({cls:"pc-pk-group"}),l=n.createDiv({cls:"pc-pk-group-head"});if(l.createSpan({cls:"pc-pk-group-icon",text:o}),l.createSpan({cls:"pc-pk-group-name",text:t}),l.createSpan({cls:"pc-pk-group-count",text:String(i.length)}),e.length===0){r||n.createDiv({cls:"pc-pk-group-empty",text:"\uFF08\u7A7A\uFF09"});return}for(let c of e)vi(n,s,c)}function vi(a,o,t){var i;let e=(i=Us[t.status])!=null?i:Us.idle,s=a.createDiv({cls:`pc-pk-res-row ${e.cls}`});if(t.status==="idle"&&s.addClass("is-dim"),t.status==="missing"&&s.addClass("is-gray"),t.kind==="token"){let n=s.createSpan({cls:"pc-pk-res-dot"});n.style.background=t.color||"#888",t.enabled===!1&&n.addClass("is-disabled")}else s.createSpan({cls:"pc-pk-rule-glyph",text:/paren|dialogue|bracket/.test(t.id)?"( )":"{ }"});s.createSpan({cls:"pc-pk-res-name",text:t.name}).setAttribute("title",`${t.name}
${t.note?t.note+`
`:""}${e.title}`),s.createSpan({cls:"pc-pk-res-status",text:e.icon,attr:{title:e.title}}),s.addEventListener("contextmenu",n=>{n.preventDefault(),ki(o,t,n)})}function bi(a,o,t){var i;let e=new J.Menu,s=o.isBuiltin;!!o.manifest&&(e.addItem(n=>{n.setTitle("\u5BFC\u51FA\u5305").setIcon("upload").onClick(()=>{Promise.resolve().then(()=>(ye(),Gt)).then(l=>l.exportPackage(a,o))})}),e.addItem(n=>{n.setTitle("\u590D\u5236\u5305\uFF08\u5171\u4EAB\u5F15\u7528\uFF09").setIcon("copy").onClick(()=>{Ie(a,o)})}),e.addItem(n=>{n.setTitle("\u514B\u9686\u5305\uFF08\u6DF1\u5EA6\u62F7\u8D1D\uFF09").setIcon("copy-plus").setDisabled(s).onClick(()=>{Fe(a,o)})}),e.addSeparator(),e.addItem(n=>{n.setTitle("\u91CD\u547D\u540D").setIcon("pencil").setDisabled(s).onClick(()=>{var l,c;Se(a.app,(c=(l=o.manifest)==null?void 0:l.name)!=null?c:o.dirName,d=>{Ae(a,o,d)})})}),e.addItem(n=>{n.setTitle("\u5220\u9664\u5305").setIcon("trash-2").setDisabled(s).onClick(()=>{ce(a.app,"\u5220\u9664\u5305",`\u4EC5\u5220\u9664 packages/${o.dirName} \u76EE\u5F55\u4E0E\u7D22\u5F15\u6587\u4EF6\uFF0C\u4E0D\u4F1A\u5220\u9664\u5E95\u5C42\u4EE4\u724C\u3001\u89C4\u5219\u672C\u4F53\u3002\u786E\u8BA4\u5220\u9664\uFF1F`,()=>void Be(a,o))})})),((i=a.settings.packageMode)!=null?i:"single")==="multi"&&(e.addSeparator(),e.addItem(n=>{n.setTitle("\u4E0A\u79FB\uFF08\u63D0\u9AD8\u4F18\u5148\u7EA7\uFF09").setIcon("arrow-up").onClick(()=>{Wt(a,o.dirName,-1)})}),e.addItem(n=>{n.setTitle("\u4E0B\u79FB\uFF08\u964D\u4F4E\u4F18\u5148\u7EA7\uFF09").setIcon("arrow-down").onClick(()=>{Wt(a,o.dirName,1)})})),e.showAtMouseEvent(t)}function ki(a,o,t){let e=new J.Menu,s=o.refPackages.length>0&&o.refPackages.every(i=>xi(a,i));e.addItem(i=>{i.setTitle("\u4FEE\u6539\u5206\u7C7B").setIcon("tag").onClick(()=>{_s(a.app,o.kind,o.category,o.kind==="token"?le:je,n=>void Os(a,o,n))})}),e.addItem(i=>{i.setTitle(o.resourceLock?"\u53D6\u6D88\u9501\u5B9A":"\u6807\u8BB0\u9501\u5B9A").setIcon(o.resourceLock?"lock-open":"lock").onClick(()=>{$s(a,o)})}),e.addItem(i=>{i.setTitle("\u67E5\u770B\u5F15\u7528\u6765\u6E90").setIcon("search").onClick(()=>{var c,d;let n=(c=a.loadedPackages.find(p=>p.dirName===o.refPackages[0]))==null?void 0:c.manifest,l=o.kind==="token"?(d=n==null?void 0:n.clonedFromPackageId)!=null?d:Ci(a,o):null;Ds(a.app,o,l)})});let r=a.loadedPackages.filter(i=>!i.isBuiltin&&i.manifest);if(r.length>0){e.addSeparator(),e.addItem(i=>{i.setTitle("\u6DFB\u52A0\u5230\u5305\u2026").setIcon("package-plus").setDisabled(!0)});for(let i of r)e.addItem(n=>{var l,c;n.setTitle(`\u2192 ${(c=(l=i.manifest)==null?void 0:l.name)!=null?c:i.dirName}`).onClick(()=>{Ns(a,o,i.dirName)})})}e.addItem(i=>{i.setTitle("\u4ECE\u6240\u6709\u5305\u79FB\u9664\u5F15\u7528").setIcon("package-minus").setDisabled(s).onClick(()=>{zs(a,o)})}),o.kind==="token"&&(e.addSeparator(),e.addItem(i=>{i.setTitle("\u5220\u9664\u8D44\u6E90\u672C\u4F53").setIcon("trash-2").onClick(()=>{ce(a.app,"\u5220\u9664\u8D44\u6E90\u672C\u4F53",`\u4EE4\u724C\u300C${o.name}\u300D\u5C06\u88AB\u6C38\u4E45\u5220\u9664\uFF08\u5373\u4F7F\u5DF2\u9501\u5B9A\uFF0C\u624B\u52A8\u5220\u9664\u4ECD\u5141\u8BB8\uFF09\u3002\u5F15\u7528\u5B83\u7684\u5305\u4F1A\u51FA\u73B0\u5931\u6548\u8B66\u544A\u3002\u786E\u8BA4\u5220\u9664\uFF1F`,()=>void jt(a,[o]))})})),e.showAtMouseEvent(t)}function xi(a,o){var t,e;return(e=(t=a.loadedPackages.find(s=>s.dirName===o))==null?void 0:t.isBuiltin)!=null?e:!1}function Ci(a,o){var t;for(let e of a.loadedPackages){let s=(t=e.manifest)==null?void 0:t.clonedFromResourceIds;if(s&&s[o.id])return e.dirName}return null}function wi(a,o,t,e){var l;let s=e.find(c=>c.dirName===t),r=a.createDiv({cls:"pc-pk-preview"});if(!s||!s.manifest){r.createDiv({cls:"pc-pk-preview-empty",text:"\u9009\u4E2D\u5305\u540E\u5728\u6B64\u9884\u89C8\u793A\u4F8B\u6587\u672C\uFF08\u5B9E\u65F6\u5957\u7528\u5F53\u524D\u5305\u6837\u5F0F\uFF09"});return}r.createDiv({cls:"pc-pk-preview-title",text:`\u{1F4E6} ${s.manifest.name} \u2014 \u793A\u4F8B\u9884\u89C8`});let i=r.createDiv({cls:"pc-pk-preview-body"}),n=(l=s.manifest.previewSampleText)!=null?l:"";if(!n){i.createDiv({cls:"pc-pk-preview-empty",text:"\uFF08\u8BE5\u5305\u672A\u914D\u7F6E previewSampleText\uFF09"});return}Si(i,o,n)}function Si(a,o,t){let e=[];try{e=o.getAllMatches(t)}catch(n){e=[]}e.sort((n,l)=>n.from-l.from);let s=0,r=t.split(`
`),i=0;for(let n of r){let l=a.createDiv({cls:"pc-pk-preview-line"}),c=i,d=i+n.length;for(let p of e){if(p.to<=c||p.from>=d)continue;p.from>s&&l.createSpan({text:t.slice(s,Math.min(p.from,d))});let g=Math.max(p.from,c),u=Math.min(p.to,d);u>g&&(l.createSpan({cls:p.cssClass,text:t.slice(g,u)}).setAttribute("title",p.cssClass),s=u)}s<d&&l.createSpan({text:t.slice(Math.max(s,c),d)}),s=d,i=d+1}}function Js(a){let o=we(a),t={total:o.length,active:o.filter(s=>s.status==="active").length,idle:o.filter(s=>s.status==="idle").length,missing:o.filter(s=>s.status==="missing").length,locked:o.filter(s=>s.status==="locked").length},e=[];for(let s of o){if(s.status==="missing"||!Ss(s.kind,s.category))continue;let r=ws(s.kind,s.name,s.note);r&&r!==s.category&&e.push({entry:s,category:r})}Rs(a.app,t,e,()=>{js(a,e).then(()=>{new J.Notice(`\u5DF2\u5E94\u7528 ${e.length} \u6761\u63A8\u8350\u5206\u7C7B`)})},()=>{for(let s of o.filter(r=>r.status==="idle"))if(s.kind==="token"){let r=a.settings.customTextColors.find(i=>i.id===s.id);r&&(r.resourceLock=!0)}else{let r=Oe(a,s.id);r.resourceLock=!0,a.settings.ruleMeta[s.id]=r}a.saveSettings().then(()=>a.reloadPackages()).then(()=>{a.app.workspace.trigger("prompt-colorizer:custom-colors-changed"),new J.Notice("\u5DF2\u6279\u91CF\u9501\u5B9A\u5168\u90E8\u95F2\u7F6E\u8D44\u6E90")})})}function Qs(a){let o=we(a),t=Es(o);if(t.length===0){new J.Notice("\u6CA1\u6709\u53EF\u6E05\u7406\u7684\u672A\u5F15\u7528\u8D44\u6E90");return}Ps(a.app,t,e=>{jt(a,e).then(()=>{new J.Notice(`\u5DF2\u6E05\u7406 ${e.length} \u4E2A\u8D44\u6E90`)})})}function Ei(a,o,t,e){let s=a.createDiv({cls:"pc-pk-empty"}),r=s.createDiv({cls:"pc-pk-empty-icon"});(0,J.setIcon)(r,o),s.createDiv({cls:"pc-pk-empty-title",text:t}),s.createDiv({cls:"pc-pk-empty-desc",text:e})}var $e="prompt-colorizer-color-map",Xs=80,qt=50,Ti=20,ot=class extends B.ItemView{constructor(t,e){var s;super(t);this.colorListEl=null;this.detailEl=null;this.searchInputEl=null;this.scanScope="current";this.searchQuery="";this.selectedCssClass=null;this.cachedGroups=[];this.refreshTimer=null;this.isScanning=!1;this.scanGen=0;this.scannedFileCount=0;this.targetFile=null;this.isLocked=!1;this.lockBtnEl=null;this.packBarEl=null;this.selectedPackageId=null;this.plugin=e,this.collapsedSections=new Set((s=e.settings.colorMapCollapsed)!=null?s:[])}getViewType(){return $e}getDisplayText(){return f("colorMap.title")}getIcon(){return"palette"}async onOpen(){this.render(),this.registerEvent(this.app.workspace.on("active-leaf-change",t=>{if(this.scanScope!=="current"||this.isLocked)return;let e=t==null?void 0:t.view;e instanceof B.MarkdownView&&e.file&&(this.targetFile=e.file,this.scheduleRefresh())})),this.registerEvent(this.app.workspace.on("prompt-colorizer:custom-colors-changed",()=>this.scheduleRefresh()))}async onClose(){this.refreshTimer!==null&&(window.clearTimeout(this.refreshTimer),this.refreshTimer=null)}scheduleRefresh(){this.refreshTimer!==null&&window.clearTimeout(this.refreshTimer),this.refreshTimer=window.setTimeout(()=>{this.refreshTimer=null,this.getViewMode()==="package"?this.render():this.refreshAll()},200)}analyzeDslEffect(t){let e=this.plugin.getStyleRuleByCssClass(t),s={tags:[],gradientCss:null};if(!e)return s;if(e.backgroundImage&&/gradient\(/.test(e.backgroundImage)){s.gradientCss=e.backgroundImage;let r=(e.backgroundImage.match(/\d+%/g)||[]).length>=3;s.tags.push(r?f("colorMap.multiColorLabel"):f("colorMap.gradientLabel"))}return(e.textShadow||e.boxShadow)&&s.tags.push(f("colorMap.glowLabel")),e.animation&&s.tags.push(f("colorMap.animationLabel")),e.hover&&s.tags.push(f("colorMap.hoverLabel")),(e.textStroke||e.textFillColor)&&s.tags.push(f("customText.effectName_outline")),e.textDecoration&&s.tags.push(f("customText.effectName_"+this.textDecorationToEffect(e.textDecoration))),(e.fontWeight==="bold"||e.fontWeight==="700"||e.fontWeight==="800")&&s.tags.push(f("customText.effectName_bold")),e.fontStyle==="italic"&&s.tags.push(f("customText.effectName_italic")),e.fontFamily&&/mono/i.test(e.fontFamily)&&s.tags.push(f("customText.effectName_mono")),s}textDecorationToEffect(t){return t.includes("line-through")?"strikethrough":t.includes("wavy")?"wavy":t.includes("dashed")||t.includes("dotted")?"dashed":(t.includes("underline"),"underline")}paintColorDot(t,e){let s=this.plugin.getCustomTextColorByCssClass(e);if(s){let n=Z(s.gradientStops),l=ee(n);l?t.style.background=`linear-gradient(135deg, ${l})`:s.color2&&s.color2!==s.color?t.style.background=`linear-gradient(135deg, ${s.color}, ${s.color2})`:t.style.background=s.color;return}let r=this.analyzeDslEffect(e);if(r.gradientCss){t.style.background=r.gradientCss;return}let i=this.plugin.getColorByCssClass(e);i?t.style.background=i:t.addClass("is-empty")}getDisplayLabel(t){let e=this.plugin.getCustomTextColorByCssClass(t);if(e&&e.text){let s=e.text;return s.length>24?s.slice(0,24)+"\u2026":s}return t}renderEffectTags(t,e){let s=this.plugin.getCustomTextColorByCssClass(e),r=[];if(s?r=X(s).map(n=>f(`customText.effectName_${n}`)):r=this.analyzeDslEffect(e).tags,r.length===0)return;let i=t.createDiv({cls:"pc-cm-effect-tags"});for(let n of r)i.createSpan({cls:"pc-cm-effect-tag",text:n})}render(){let t=this.contentEl;if(t.empty(),t.addClass("pc-color-map-panel"),this.renderToolbar(t),this.getViewMode()==="package"){let s=t.createDiv({cls:"pc-cm-package-wrap"});Ys(s,this.plugin,{searchQuery:this.searchQuery,selectedPackageId:this.selectedPackageId,onSelectPackage:r=>{this.selectedPackageId=r,this.render()}});return}this.renderPackBar(t),this.renderSearchBox(t);let e=t.createDiv({cls:"pc-cm-split"});this.colorListEl=e.createDiv({cls:"pc-cm-color-list"}),this.detailEl=e.createDiv({cls:"pc-cm-detail"}),this.refreshAll()}getViewMode(){return this.plugin.settings.colorMapViewMode==="category"?"category":"package"}renderPackBar(t){let e=this.getActivePack();if(this.packBarEl&&this.packBarEl.remove(),this.packBarEl=null,!e)return;let s=t.createDiv({cls:"pc-cm-pack-bar"});this.packBarEl=s,s.createDiv({cls:"pc-cm-pack-icon"}).setText(e.icon||"\u{1F4E6}");let i=s.createDiv({cls:"pc-cm-pack-name"});i.setText(e.name),i.setAttribute("title",e.description||e.name);let n=s.createEl("button",{cls:"pc-cm-pack-filter-btn"}),l=()=>{let c=this.plugin.settings.colorMapPackFilter;n.toggleClass("is-active",c),n.setAttribute("aria-label",c?f("colorMap.packFilterOn"):f("colorMap.packFilterOff")),n.setText(c?f("colorMap.packFilterOn"):f("colorMap.packFilterOff"))};l(),n.addEventListener("click",()=>{this.plugin.settings.colorMapPackFilter=!this.plugin.settings.colorMapPackFilter,this.plugin.saveSettings(),l(),this.refreshColorList(),this.refreshDetail()})}renderToolbar(t){let e=t.createDiv({cls:"pc-cm-toolbar"}),s=this.getViewMode()==="package",r=e.createEl("button",{cls:"pc-cm-btn pc-cm-view-btn"});if((0,B.setIcon)(r,s?"folder-tree":"list"),r.setAttribute("aria-label",s?f("colorMap.switchToCategory"):f("colorMap.switchToPackage")),r.addEventListener("click",()=>{this.plugin.settings.colorMapViewMode=s?"category":"package",this.plugin.saveSettings(),this.render()}),s){let n=e.createEl("button",{cls:"pc-cm-btn"});(0,B.setIcon)(n,"import"),n.setAttribute("aria-label",f("colorMap.importPkg")),n.addEventListener("click",()=>{Promise.resolve().then(()=>(ye(),Gt)).then(h=>h.importStylePkg(this.plugin))});let l=e.createDiv({cls:"pc-cm-mode-toggle"}),c=l.createEl("button",{cls:"pc-cm-mode-btn"});c.setText(f("colorMap.modeSingle"));let d=l.createEl("button",{cls:"pc-cm-mode-btn"});d.setText(f("colorMap.modeMulti"));let p=()=>{c.classList.toggle("is-active",this.plugin.settings.packageMode!=="multi"),d.classList.toggle("is-active",this.plugin.settings.packageMode==="multi")};p(),c.addEventListener("click",()=>{this.plugin.settings.packageMode!=="single"&&de(this.plugin,"single").then(()=>{p(),this.render()})}),d.addEventListener("click",()=>{this.plugin.settings.packageMode!=="multi"&&de(this.plugin,"multi").then(()=>{p(),this.render()})});let g=e.createEl("button",{cls:"pc-cm-btn"});(0,B.setIcon)(g,"scan-search"),g.setAttribute("aria-label",f("colorMap.scanClassify")),g.addEventListener("click",()=>Js(this.plugin));let u=e.createEl("button",{cls:"pc-cm-btn"});(0,B.setIcon)(u,"eraser"),u.setAttribute("aria-label",f("colorMap.cleanupUnreferenced")),u.addEventListener("click",()=>Qs(this.plugin))}if(!s){let n=e.createEl("button",{cls:"pc-cm-btn"});n.setAttribute("aria-label",f("colorMap.lockHint")),n.addEventListener("click",()=>{this.scanScope==="current"&&(!this.isLocked&&!this.targetFile||(this.isLocked=!this.isLocked,this.syncLockBtn()))}),this.lockBtnEl=n,this.syncLockBtn()}let i=e.createEl("button",{cls:"pc-cm-btn"});i.setAttribute("aria-label",f("colorMap.refresh")),(0,B.setIcon)(i,"refresh-cw"),i.addEventListener("click",()=>{s?this.render():this.refreshAll()})}syncLockBtn(){this.lockBtnEl&&((0,B.setIcon)(this.lockBtnEl,this.isLocked?"lock":"lock-open"),this.lockBtnEl.toggleClass("is-active",this.isLocked),this.lockBtnEl.setAttribute("aria-label",this.isLocked?f("colorMap.unlock"):f("colorMap.lockHint")))}renderSearchBox(t){let e=t.createDiv({cls:"pc-cm-search"}),s=e.createDiv({cls:"pc-cm-mode-toggle"}),r=s.createEl("button",{cls:"pc-cm-mode-btn"});r.setText(f("colorMap.scopeCurrent"));let i=s.createEl("button",{cls:"pc-cm-mode-btn"});i.setText(f("colorMap.scopeGlobal"));let n=()=>{r.classList.toggle("is-active",this.scanScope==="current"),i.classList.toggle("is-active",this.scanScope==="global"),this.searchInputEl&&this.searchInputEl.setAttribute("placeholder",this.scanScope==="global"?f("colorMap.searchPlaceholderGlobal"):f("colorMap.searchPlaceholderCurrent"))};n(),r.addEventListener("click",()=>{this.scanScope!=="current"&&(this.scanScope="current",n(),this.refreshAll())}),i.addEventListener("click",()=>{this.scanScope!=="global"&&(this.scanScope="global",this.isLocked=!1,this.syncLockBtn(),n(),this.refreshAll())});let l=e.createDiv({cls:"pc-cm-search-wrap"}),c=l.createDiv({cls:"pc-cm-search-icon"});(0,B.setIcon)(c,"search");let d=l.createEl("input",{cls:"pc-cm-search-input",attr:{type:"text"}});this.searchInputEl=d,d.value=this.searchQuery,d.addEventListener("input",()=>{this.searchQuery=d.value,this.refreshColorList(),this.refreshDetail()})}async collectCurrentGroups(){var n;let t=(n=this.plugin.settings.customTextColors)!=null?n:[],e=this.resolveTargetFile();if(!e)return this.targetFile=null,this.buildGroups(t,new Map);this.targetFile=e;let s=await this.readTargetText(e),r=s?this.plugin.getAllMatches(s):[],i=this.groupMatches(r,l=>({file:e,text:s,match:l}));return this.buildGroups(t,i)}resolveTargetFile(){if(this.isLocked&&this.targetFile)return this.targetFile;let t=this.app.workspace.getActiveViewOfType(B.MarkdownView);if(t!=null&&t.file)return t.file;if(this.targetFile){let e=this.app.vault.getAbstractFileByPath(this.targetFile.path);if(e instanceof B.TFile&&e.extension==="md")return e}for(let e of this.app.workspace.getLeavesOfType("markdown")){let s=e.view;if(s instanceof B.MarkdownView&&s.file)return s.file}return null}async readTargetText(t){var e;for(let s of this.app.workspace.getLeavesOfType("markdown")){let r=s.view;if(r instanceof B.MarkdownView&&((e=r.file)==null?void 0:e.path)===t.path)try{return r.editor.getValue()}catch(i){break}}try{return await this.app.vault.cachedRead(t)}catch(s){return""}}async collectGlobalGroups(){var i;let t=(i=this.plugin.settings.customTextColors)!=null?i:[],e=this.app.vault.getMarkdownFiles(),s=new Map,r=new Set;for(let n=0;n<e.length;n++){let l=e[n];try{let c=await this.app.vault.cachedRead(l);for(let d of this.plugin.getAllMatches(c)){let p=s.get(d.cssClass);p||(p=[],s.set(d.cssClass,p)),p.push({file:l,text:c,match:d}),r.add(l.path)}}catch(c){}(n+1)%Ti===0&&await new Promise(c=>setTimeout(c,0))}return this.scannedFileCount=r.size,this.buildGroups(t,s)}groupMatches(t,e){let s=new Map;for(let r of t){let i=s.get(r.cssClass);i||(i=[],s.set(r.cssClass,i)),i.push(e(r))}return s}buildGroups(t,e){var i;let s=[];for(let n of t){if(!n.enabled)continue;let l=`dsl-custom-text-${n.id}`;s.push({cssClass:l,items:(i=e.get(l))!=null?i:[],isCustom:!0,...Dt(l)})}for(let[n,l]of e.entries())n.startsWith("dsl-custom-text-")||s.push({cssClass:n,items:l,isCustom:!1,...Dt(n)});let r=new Map(et.map((n,l)=>[n.id,l]));return s.sort((n,l)=>{var p,g;let c=(p=r.get(n.sectionId))!=null?p:99,d=(g=r.get(l.sectionId))!=null?g:99;return c!==d?c-d:l.items.length-n.items.length})}getActivePack(){var s;let{promptPacks:t,activePackId:e}=this.plugin.settings;return!e||!t?null:(s=t.find(r=>r&&r.id===e))!=null?s:null}filterByPack(t){if(!this.plugin.settings.colorMapPackFilter)return t;let e=this.getActivePack(),s=Cs(e);return s?t.filter(r=>r.sectionId==="custom"||s.has(r.cssClass)):t}getFilteredGroups(){let t=this.filterByPack(this.cachedGroups),e=this.searchQuery.trim().toLowerCase();return e&&(t=t.filter(({items:s})=>s.some(r=>r.text.slice(r.match.from,r.match.to).toLowerCase().includes(e)))),t}async refreshAll(){if(!this.plugin.settings.editorHighlightEnabled){this.renderRichEmpty(this.colorListEl,"alert-circle",f("colorMap.highlightDisabled"),""),this.renderRichEmpty(this.detailEl,"","",""),this.cachedGroups=[],this.scannedFileCount=0;return}if(this.scanScope==="global"){let t=++this.scanGen;this.isScanning=!0,this.renderScanningState();try{let e=await this.collectGlobalGroups();if(t!==this.scanGen)return;this.cachedGroups=e}catch(e){if(t!==this.scanGen)return;this.cachedGroups=[]}finally{t===this.scanGen&&(this.isScanning=!1)}}else{let t=++this.scanGen;try{let e=await this.collectCurrentGroups();if(t!==this.scanGen)return;this.cachedGroups=e}catch(e){if(t!==this.scanGen)return;this.cachedGroups=[]}this.scannedFileCount=0}if(this.cachedGroups.length===0){this.scanScope==="global"?this.renderRichEmpty(this.colorListEl,"palette",f("colorMap.globalEmptyTitle"),f("colorMap.globalEmptyDesc")):this.targetFile?this.renderRichEmpty(this.colorListEl,"palette",f("colorMap.emptyTitle"),f("colorMap.emptyDesc")):this.renderRichEmpty(this.colorListEl,"file-text",f("colorMap.noDocTitle"),f("colorMap.noDocDesc")),this.renderRichEmpty(this.detailEl,"","","");return}this.selectedCssClass&&!this.cachedGroups.some(t=>t.cssClass===this.selectedCssClass)&&(this.selectedCssClass=null),this.selectedCssClass||(this.selectedCssClass=this.cachedGroups[0].cssClass),this.refreshColorList(),this.refreshDetail()}renderScanningState(){this.renderRichEmpty(this.colorListEl,"loader",f("colorMap.scanning"),"",!0),this.renderRichEmpty(this.detailEl,"","","")}refreshColorList(){if(!this.colorListEl)return;let t=this.colorListEl;t.empty();let e=this.getFilteredGroups(),s=e.filter(l=>l.items.length>0),r=s.reduce((l,c)=>l+c.items.length,0),i=s.length,n=t.createDiv({cls:"pc-cm-status"});if(this.scanScope==="current"&&this.targetFile){let l=n.createSpan({cls:"pc-cm-status-file"});(0,B.setIcon)(l,"file-text");let c=this.targetFile.basename,d=c.length>14?c.slice(0,14)+"\u2026":c;l.createSpan({text:d}),l.setAttribute("title",this.targetFile.path),n.createSpan({cls:"pc-cm-status-sep",text:"\xB7"})}if(n.createSpan({cls:"pc-cm-status-rules",text:f("colorMap.rulesCount").replace("{n}",String(i))}),n.createSpan({cls:"pc-cm-status-sep",text:"\xB7"}),n.createSpan({cls:"pc-cm-status-matches",text:f("colorMap.totalMatches").replace("{n}",String(r))}),this.scanScope==="global"&&this.scannedFileCount>0&&(n.createSpan({cls:"pc-cm-status-sep",text:"\xB7"}),n.createSpan({cls:"pc-cm-status-files",text:f("colorMap.filesCount").replace("{n}",String(this.scannedFileCount))})),e.length===0){this.renderRichEmpty(t,"search",f("colorMap.noResults"),"");return}this.renderSectionedGroups(t,s)}renderSectionedGroups(t,e){let s=this.searchQuery.trim().length>0;for(let r of et){let i=e.filter(y=>y.sectionId===r.id);if(i.length===0)continue;let n=i.some(y=>y.cssClass===this.selectedCssClass),l=!s&&!n&&this.collapsedSections.has(r.id),c=i.reduce((y,m)=>y+m.items.length,0),d=t.createDiv({cls:"pc-cm-section"}),p=d.createDiv({cls:"pc-cm-section-header"});l&&d.addClass("is-collapsed");let g=p.createSpan({cls:"pc-cm-section-chevron"});(0,B.setIcon)(g,"chevron-down");let u=p.createSpan({cls:"pc-cm-section-icon"});if((0,B.setIcon)(u,r.icon),p.createSpan({cls:"pc-cm-section-name",text:f(r.nameKey)}),p.createSpan({cls:"pc-cm-section-count",text:String(c)}),p.addEventListener("click",()=>{this.toggleSection(r.id)}),l)continue;let h=d.createDiv({cls:"pc-cm-section-body"});for(let y of i)this.renderColorItem(h,y)}}toggleSection(t){this.collapsedSections.has(t)?this.collapsedSections.delete(t):this.collapsedSections.add(t),this.plugin.settings.colorMapCollapsed=[...this.collapsedSections],this.plugin.saveSettings(),this.refreshColorList()}renderColorItem(t,e){let{cssClass:s,isCustom:r}=e,i=e.items.length,n=s===this.selectedCssClass,l=i>0,c=t.createDiv({cls:"pc-cm-color-item"});n&&c.addClass("is-selected"),l||c.addClass("is-dim"),c.createDiv({cls:"pc-cm-color-bar"});let d=c.createDiv({cls:"pc-cm-color-dot"});this.paintColorDot(d,s);let p=c.createDiv({cls:"pc-cm-color-name-col"}),g=p.createDiv({cls:"pc-cm-color-name-row"});g.createDiv({cls:"pc-cm-color-name"}).setText(this.getDisplayLabel(s)),g.createSpan({cls:"pc-cm-type-tag"}).setText(r?f("colorMap.customTag"):f("colorMap.builtinTag")),this.renderEffectTags(p,s);let h=c.createDiv({cls:"pc-cm-count"});h.setText(String(i)),l&&h.addClass("has-match"),c.addEventListener("click",()=>{this.selectedCssClass=s,this.refreshColorList(),this.refreshDetail()})}refreshDetail(){var b;if(!this.detailEl)return;let t=this.detailEl;if(t.empty(),!this.selectedCssClass){this.renderRichEmpty(t,"","","");return}let e=this.cachedGroups.find(v=>v.cssClass===this.selectedCssClass);if(!e){this.renderRichEmpty(t,"","","");return}if(this.scanScope==="current"&&!this.resolveTargetFile()){this.renderRichEmpty(t,"file-text",f("colorMap.noDocTitle"),f("colorMap.noDocDesc"));return}let s=t.createDiv({cls:"pc-cm-detail-header"}),r=s.createDiv({cls:"pc-cm-color-dot"});this.paintColorDot(r,e.cssClass);let i=s.createDiv({cls:"pc-cm-color-name-col"}),n=i.createDiv({cls:"pc-cm-color-name-row"});n.createDiv({cls:"pc-cm-detail-title"}).setText(this.getDisplayLabel(e.cssClass)),n.createSpan({cls:"pc-cm-type-tag"}).setText(e.isCustom?f("colorMap.customTag"):f("colorMap.builtinTag")),this.renderEffectTags(i,e.cssClass);let c=s.createDiv({cls:"pc-cm-count"});c.setText(String(e.items.length)),e.items.length>0&&c.addClass("has-match");let d=this.plugin.getCustomTextColorByCssClass(e.cssClass);if(d){let v=Z(d.gradientStops),k=ee(v);if(k){let _=t.createDiv({cls:"pc-cm-gradient-band-wrap"}),R=_.createDiv({cls:"pc-cm-gradient-band"}),T=(b=d.gradientAngle)!=null?b:135;R.style.background=`linear-gradient(${T}deg, ${k})`,_.createSpan({cls:"pc-cm-gradient-meta"}).setText(`${v.length} ${f("customText.gradientStopCount")} \xB7 ${T}\xB0`)}}else{let v=this.analyzeDslEffect(e.cssClass);if(v.gradientCss){let k=t.createDiv({cls:"pc-cm-gradient-band-wrap"});k.createDiv({cls:"pc-cm-gradient-band"}).style.background=v.gradientCss,k.createSpan({cls:"pc-cm-gradient-meta"}).setText(f("colorMap.gradientLabel"))}}let p=this.searchQuery.trim().toLowerCase(),g=p?e.items.filter(v=>v.text.slice(v.match.from,v.match.to).toLowerCase().includes(p)):e.items,u=t.createDiv({cls:"pc-cm-detail-list"});if(g.length===0){this.renderRichEmpty(u,"circle-slash",f("colorMap.noMatchTitle"),f("colorMap.noMatchDesc"));return}let h=g.slice(0,qt);for(let v=0;v<h.length;v++)this.renderMatchItem(u,h[v],v+1);g.length>qt&&u.createDiv({cls:"pc-cm-truncated-tip"}).setText(f("colorMap.truncatedTip").replace("{n}",String(qt)));let y=t.createDiv({cls:"pc-cm-drag-hint"}),m=y.createDiv({cls:"pc-cm-drag-hint-icon"});(0,B.setIcon)(m,"grab-horizontal"),y.createSpan({text:f("colorMap.dragHint")})}renderMatchItem(t,e,s){let r=e.text.slice(e.match.from,e.match.to),i=r.length>Xs?r.slice(0,Xs)+"\u2026":r,n=this.scanScope==="global"&&!!e.file,l=t.createDiv({cls:"pc-cm-item"});n&&l.addClass("has-file"),l.createSpan({cls:"pc-cm-item-idx"}).setText(String(s));let p=l.createDiv({cls:"pc-cm-item-text"}).createSpan({cls:e.match.cssClass});if(p.setText(i),p.setAttribute("title",r),n&&e.file){let h=l.createSpan({cls:"pc-cm-item-file"});h.setText(e.file.basename),h.setAttribute("title",e.file.path),l.setAttribute("title",f("colorMap.jumpFileHint"))}let g=this.lineOf(e.text,e.match.from);l.createSpan({cls:"pc-cm-item-line"}).setText(`${f("colorMap.lineLabel")}${g}`),l.draggable=!0,l.addEventListener("dragstart",h=>{var y,m;(y=h.dataTransfer)==null||y.setData("text/plain",r),(m=h.dataTransfer)==null||m.setDragImage(l,0,0),l.addClass("is-dragging")}),l.addEventListener("dragend",()=>l.removeClass("is-dragging")),l.addEventListener("click",()=>void this.jumpToMatch(e))}lineOf(t,e){let s=Math.min(e,t.length),r=1;for(let i=0;i<s;i++)t.charCodeAt(i)===10&&r++;return r}async jumpToMatch(t){var c;let e=this.scanScope==="current"?this.resolveTargetFile():t.file;if(!e)return;let s=this.app.workspace.getActiveViewOfType(B.MarkdownView);if(!s||((c=s.file)==null?void 0:c.path)!==e.path){let d=this.app.workspace.getLeaf(!1);try{await d.openFile(e)}catch(p){return}await new Promise(p=>setTimeout(p,30))}let r=this.app.workspace.getActiveViewOfType(B.MarkdownView);if(!r)return;let i=r.editor,n=i.offsetToPos(t.match.from),l=i.offsetToPos(t.match.to);i.setSelection(n,l),i.scrollIntoView({from:n,to:l},!0),r.editor.focus()}renderRichEmpty(t,e,s,r,i=!1){if(!t||(t.empty(),!s&&!r))return;let n=t.createDiv({cls:"pc-cm-rich-empty"});if(e){let l=n.createDiv({cls:"pc-cm-rich-empty-icon"});i&&l.addClass("is-spin"),(0,B.setIcon)(l,e)}s&&n.createDiv({cls:"pc-cm-rich-empty-title"}).setText(s),r&&n.createDiv({cls:"pc-cm-rich-empty-desc"}).setText(r)}refresh(){this.getViewMode()==="package"?this.render():this.refreshAll()}};async function Te(a){let{workspace:o}=a,t=o.getLeavesOfType($e)[0];if(!t){let e=o.getRightLeaf(!1);if(!e)return;t=e,await t.setViewState({type:$e,active:!0})}o.revealLeaf(t)}ye();var pe=require("obsidian");Y();ye();function Kt(a,o){new Ut(a,o).open()}var Ut=class extends pe.Modal{constructor(t,e){super(t.app);this.plugin=t;this.onComplete=e;this.entries=[];this.filtered=[];this.selected=new Set;this.searchQuery="";this.kindFilter="all";this.statusFilter="all";this.listEl=null;this.summaryEl=null;this.nameInput=null;this.descInput=null;this.colorInput=null;this.usageInput=null;this.entries=we(t).filter(s=>s.status!=="missing"),this.filtered=[...this.entries]}onOpen(){this.contentEl.empty(),this.titleEl.setText("\u4ECE\u8D44\u6E90\u751F\u6210\u5305"),this.modalEl.addClass("pc-wizard-modal"),this.renderFilterBar(this.contentEl),this.listEl=this.contentEl.createDiv({cls:"pc-wizard-list"}),this.renderResourceList(),this.renderFooter(this.contentEl),this.updateSummary()}onClose(){this.contentEl.empty()}renderFilterBar(t){let e=t.createDiv({cls:"pc-wizard-filter-bar"}),s=e.createEl("input",{cls:"pc-wizard-search",attr:{type:"text",placeholder:"\u641C\u7D22\u8D44\u6E90\u540D\u79F0 / ID / \u5206\u7C7B\u2026"}});s.value=this.searchQuery,s.addEventListener("input",()=>{this.searchQuery=s.value.trim().toLowerCase(),this.applyFilter()});let r=e.createDiv({cls:"pc-wizard-seg"});for(let c of["all","token","rule"]){let d=r.createEl("button",{cls:`pc-wizard-seg-btn ${this.kindFilter===c?"is-active":""}`,text:c==="all"?"\u5168\u90E8":c==="token"?"\u4EE4\u724C":"\u89C4\u5219"});d.addEventListener("click",()=>{this.kindFilter=c,r.querySelectorAll(".pc-wizard-seg-btn").forEach(p=>p.classList.remove("is-active")),d.classList.add("is-active"),this.applyFilter()})}let i=e.createDiv({cls:"pc-wizard-seg"});for(let c of["all","active","idle"]){let d=i.createEl("button",{cls:`pc-wizard-seg-btn ${this.statusFilter===c?"is-active":""}`,text:c==="all"?"\u4E0D\u9650":c==="active"?"\u5DF2\u5F15\u7528":"\u95F2\u7F6E"});d.addEventListener("click",()=>{this.statusFilter=c,i.querySelectorAll(".pc-wizard-seg-btn").forEach(p=>p.classList.remove("is-active")),d.classList.add("is-active"),this.applyFilter()})}e.createEl("button",{cls:"pc-wizard-select-all",text:"\u5168\u9009\u5F53\u524D"}).addEventListener("click",()=>{for(let c of this.filtered)this.selected.add(c.id);this.renderResourceList(),this.updateSummary()}),e.createEl("button",{cls:"pc-wizard-clear",text:"\u6E05\u7A7A\u9009\u62E9"}).addEventListener("click",()=>{this.selected.clear(),this.renderResourceList(),this.updateSummary()})}applyFilter(){let t=this.searchQuery;this.filtered=this.entries.filter(e=>!(this.kindFilter!=="all"&&e.kind!==this.kindFilter||this.statusFilter==="active"&&e.status!=="active"||this.statusFilter==="idle"&&e.status!=="idle"||t.length>0&&!`${e.name} ${e.id} ${e.category} ${e.note}`.toLowerCase().includes(t))),this.renderResourceList()}renderResourceList(){if(this.listEl){if(this.listEl.empty(),this.filtered.length===0){this.listEl.createDiv({cls:"pc-wizard-empty",text:"\u65E0\u5339\u914D\u8D44\u6E90\u3002"});return}for(let t of this.filtered){let e=this.listEl.createDiv({cls:"pc-wizard-row"});this.selected.has(t.id)&&e.addClass("is-selected");let s=e.createEl("input",{attr:{type:"checkbox"}});s.checked=this.selected.has(t.id),s.addEventListener("change",()=>{s.checked?this.selected.add(t.id):this.selected.delete(t.id),e.classList.toggle("is-selected",s.checked),this.updateSummary()}),e.createSpan({cls:`pc-wizard-kind pc-wizard-kind-${t.kind}`}).setText(t.kind==="token"?"\u4EE4\u724C":"\u89C4\u5219"),e.createSpan({cls:"pc-wizard-name",text:t.name,attr:{title:t.name}});let i=[t.category];if(t.status==="active"?i.push("\u5DF2\u5F15\u7528"):t.status==="idle"?i.push("\u95F2\u7F6E"):t.status==="locked"&&i.push("\u9501\u5B9A"),t.refPackages.length>0&&i.push(`\u2208 ${t.refPackages.length}\u5305`),e.createSpan({cls:"pc-wizard-meta",text:i.join(" \xB7 ")}),t.kind==="token"&&t.color){let n=e.createSpan({cls:"pc-wizard-swatch"});n.style.background=t.color}}}}renderFooter(t){let e=t.createDiv({cls:"pc-wizard-footer"}),s=e.createDiv({cls:"pc-wizard-form"}),r=s.createDiv({cls:"pc-wizard-field"});r.createSpan({cls:"pc-wizard-label",text:"\u5305\u540D\u79F0"}),this.nameInput=r.createEl("input",{cls:"pc-wizard-input",attr:{type:"text",placeholder:"\u8F93\u5165\u65B0\u5305\u540D\u79F0",value:"\u6211\u7684\u6837\u5F0F\u5305"}});let i=s.createDiv({cls:"pc-wizard-field"});i.createSpan({cls:"pc-wizard-label",text:"\u63CF\u8FF0"}),this.descInput=i.createEl("input",{cls:"pc-wizard-input",attr:{type:"text",placeholder:"\u53EF\u9009\u63CF\u8FF0"}});let n=s.createDiv({cls:"pc-wizard-field"});n.createSpan({cls:"pc-wizard-label",text:"\u6807\u8BC6\u8272"}),this.colorInput=n.createEl("input",{cls:"pc-wizard-color",attr:{type:"color",value:"#7c8aff"}});let l=s.createDiv({cls:"pc-wizard-field"});l.createSpan({cls:"pc-wizard-label",text:"\u7528\u9014\u6807\u7B7E"}),this.usageInput=l.createEl("input",{cls:"pc-wizard-input",attr:{type:"text",placeholder:"\u5982\uFF1A\u6545\u4E8B\u9605\u8BFB / \u6280\u672F\u6587\u6863"}}),this.summaryEl=e.createDiv({cls:"pc-wizard-summary"});let c=e.createDiv({cls:"pc-wizard-actions"});c.createEl("button",{text:"\u53D6\u6D88"}).addEventListener("click",()=>this.close()),c.createEl("button",{text:"\u751F\u6210\u5305",cls:"mod-cta"}).addEventListener("click",()=>void this.handleGenerate())}updateSummary(){if(!this.summaryEl)return;let t=this.entries.filter(r=>this.selected.has(r.id)),e=t.filter(r=>r.kind==="token").length,s=t.filter(r=>r.kind==="rule").length;this.summaryEl.setText(`\u5DF2\u9009 ${this.selected.size} \u9879\uFF08\u4EE4\u724C ${e} / \u89C4\u5219 ${s}\uFF09`)}async handleGenerate(){var l,c,d,p,g,u,h,y,m;let t=(c=(l=this.nameInput)==null?void 0:l.value.trim())!=null?c:"";if(!t){new pe.Notice("\u8BF7\u8F93\u5165\u5305\u540D\u79F0");return}if(this.selected.size===0){new pe.Notice("\u8BF7\u81F3\u5C11\u9009\u62E9\u4E00\u4E2A\u8D44\u6E90");return}let e=this.entries.filter(b=>this.selected.has(b.id)),s=[],r=[];for(let b of e)if(b.kind==="token"){let v=this.plugin.settings.customTextColors.find(k=>k.id===b.id);v&&s.push(structuredClone(v))}else{let v=te(this.plugin,b.id);v&&r.push(v)}if(s.length===0&&r.length===0){new pe.Notice("\u65E0\u6CD5\u63D0\u53D6\u6240\u9009\u8D44\u6E90\u7684\u6570\u636E\uFF0C\u751F\u6210\u4E2D\u6B62");return}let i=await Pi(this.plugin,_i(t)),n={packageId:i,name:t,tagColor:(p=(d=this.colorInput)==null?void 0:d.value)!=null?p:"#7c8aff",description:(u=(g=this.descInput)==null?void 0:g.value.trim())!=null?u:"",version:"1.0.0",specVersion:z,type:"user",usageTag:(y=(h=this.usageInput)==null?void 0:h.value.trim())!=null?y:"",previewSampleText:"",ruleOverrides:{}};try{await this.plugin.pkgManager.createPackage(n,s,r),await this.plugin.saveSettings(),await this.plugin.reloadPackages(),this.plugin.refreshEditorExtensions(),this.plugin.app.workspace.trigger("prompt-colorizer:custom-colors-changed"),new pe.Notice(`\u5DF2\u751F\u6210\u5305\u300C${t}\u300D\uFF08\u4EE4\u724C ${s.length} / \u89C4\u5219 ${r.length}\uFF09`),this.close(),(m=this.onComplete)==null||m.call(this,i)}catch(b){new pe.Notice(`\u751F\u6210\u5931\u8D25: ${b instanceof Error?b.message:String(b)}`)}}};function _i(a){let o=a.replace(/[\\/:*?"<>|#^[\]]/g,"_").trim();return o.length>0?o:"new_pack"}async function Pi(a,o){let t=o,e=2;for(;await a.app.vault.adapter.exists(`packages/${t}`);)t=`${o}_${e++}`;return t}tt();var Ri=12,Q=["highlightVariables","highlightRoleTags","highlightRoleHeaders","highlightInstructionMarkers","highlightComments","highlightCodeBlocks","highlightJsonBlocks","highlightInlineCode","highlightSectionMarkers","highlightShotHeaders","highlightAssetRefs","highlightFieldLabels","highlightDialogue","highlightAudioRefs","highlightNegativePrompts","highlightTechParams","highlightParentheticals","highlightEmphasisWeights","highlightLoraRefs","highlightBracketEmphasis","highlightSdNegativeHeader"],Di=["highlightVariables","highlightRoleTags","highlightRoleHeaders","highlightInstructionMarkers","highlightComments","highlightCodeBlocks","highlightJsonBlocks","highlightInlineCode"],Mi=["highlightSectionMarkers","highlightShotHeaders","highlightAssetRefs","highlightFieldLabels","highlightDialogue","highlightAudioRefs","highlightNegativePrompts","highlightTechParams","highlightParentheticals"],Li=["highlightEmphasisWeights","highlightLoraRefs","highlightBracketEmphasis","highlightSdNegativeHeader"],Zs={highlightVariables:"dsl-variable",highlightRoleTags:"dsl-role-tag",highlightInstructionMarkers:"dsl-instruction",highlightSectionMarkers:"dsl-block-wrapper",highlightShotHeaders:"dsl-shot-header",highlightAssetRefs:"dsl-asset",highlightFieldLabels:"dsl-param-key",highlightDialogue:"dsl-dialogue",highlightAudioRefs:"dsl-audio-ref",highlightNegativePrompts:"dsl-constraint",highlightTechParams:"dsl-tech-param",highlightParentheticals:"dsl-parenthetical",highlightEmphasisWeights:"dsl-emphasis-weight",highlightLoraRefs:"dsl-lora-ref",highlightBracketEmphasis:"dsl-bracket-strong",highlightQualityTags:"dsl-quality-tag",highlightSdNegativeHeader:"dsl-sd-negative-header",highlightCameraMoves:"dsl-camera-word",highlightSceneTransitions:"dsl-scene-transition"};function Ai(a){let o=a.trim();if(!o)return null;if(/raw\.githubusercontent\.com/.test(o)){let s=o.match(/^https?:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)$/);return s?{rawBaseUrl:o.replace(/\/$/,""),branch:s[3]}:null}let t=o.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)(?:\/(tree|blob)\/([^/]+)(\/(.*))?)?/);if(t){let s=t[1],r=t[2].replace(/\.git$/,""),i=t[4]||"main",l=t[6]||"";return l&&l.startsWith("rules")||(l="rules"),{rawBaseUrl:`https://raw.githubusercontent.com/${s}/${r}/${i}/${l}`,branch:i}}let e=o.match(/^([^/\s]+)\/([^/\s]+)$/);if(e){let s=e[1],r=e[2].replace(/\.git$/,"");return{rawBaseUrl:`https://raw.githubusercontent.com/${s}/${r}/main/rules`,branch:"main"}}return null}var Ii={overview:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>',packages:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',engine:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',files:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>'},Fi=[{id:"overview",labelKey:"tab.overview",icon:"overview"},{id:"packages",labelKey:"tab.packages",icon:"packages"},{id:"engine",labelKey:"tab.engine",icon:"engine"},{id:"files",labelKey:"tab.files",icon:"files"}],ve=class ve extends w.PluginSettingTab{constructor(t,e){super(t,e);this.currentTab="overview";this.selectedPkgDir=null;this.rulesSearchQuery="";this.previewText="";this.tabScrollPositions={};this.tokenGroupOpenStates=new Map;this.selectedCustomTextId=null;this.plugin=e}registerColorsChangedListener(){if(this.colorsChangedRef)return;let t=()=>{this.containerEl.children.length>0&&this.display()};this.colorsChangedRef=t,this.plugin.registerEvent(this.app.workspace.on("prompt-colorizer:custom-colors-changed",t))}display(){let{containerEl:t}=this;this.registerColorsChangedListener();let e=t.querySelector(".pc-tab-content");e&&(this.tabScrollPositions[this.currentTab]=e.scrollTop),t.empty(),t.addClass("prompt-colorizer-setting-tab");let s=this.plugin.t.bind(this.plugin),r=t.createDiv({cls:"pc-layout"});this.renderTabNav(r,s);let i=r.createDiv({cls:"pc-tab-content"});switch(this.currentTab){case"overview":this.renderOverviewTab(i,s);break;case"packages":this.renderPackagesTab(i,s);break;case"engine":this.renderEngineTab(i,s);break;case"files":this.renderFilesTab(i,s);break}let n=this.tabScrollPositions[this.currentTab];n!==void 0&&requestAnimationFrame(()=>{i.scrollTop=n})}renderTabNav(t,e){let s=t.createDiv({cls:"pc-tab-nav"});for(let r of Fi){let i=this.currentTab===r.id,n=`tab.${r.id}Tip`,l=s.createDiv({cls:`pc-tab-item ${i?"active":""}`,attr:{"data-tab":r.id,role:"tab",tabindex:"0","aria-selected":String(i),title:e(n)}}),c=l.createSpan({cls:"pc-tab-icon"});c.innerHTML=Ii[r.icon]||"",l.createSpan({cls:"pc-tab-label",text:e(r.labelKey)});let d=()=>{this.currentTab!==r.id&&(this.currentTab=r.id,this.display())};l.addEventListener("click",d),l.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),d())})}}async renderOverviewTab(t,e){this.renderStatusBar(t,e),this.renderPreviewCard(t,e),await this.renderPackageManagerBar(t,e),this.renderQuickStartCard(t,e),this.renderCommandListCard(t,e),W(t,e("settings.global"),e("settings.globalDesc"),"global",s=>{var n,l;new w.Setting(s).setName(e("settings.editorHighlight")).setDesc(e("settings.editorHighlightDesc")).addToggle(c=>c.setValue(this.plugin.settings.editorHighlightEnabled).onChange(async d=>{this.plugin.settings.editorHighlightEnabled=d,await this.plugin.saveSettings(),this.plugin.refreshEditorExtensions(),this.updateStatusBar()})),new w.Setting(s).setName(e("settings.readerMode")).setDesc(e("settings.readerModeDesc")).addToggle(c=>c.setValue(this.plugin.settings.readerModeEnabled).onChange(async d=>{this.plugin.settings.readerModeEnabled=d,await this.plugin.saveSettings(),this.updateStatusBar()})),new w.Setting(s).setName(e("settings.colorMode")).setDesc(e("settings.colorModeDesc")).addDropdown(c=>c.addOption("auto",e("settings.colorModeAuto")).addOption("light",e("settings.colorModeLight")).addOption("dark",e("settings.colorModeDark")).setValue(this.plugin.settings.colorMode).onChange(async d=>{this.plugin.settings.colorMode=d,await this.plugin.saveSettings(),this.plugin.applyColorMode()})),new w.Setting(s).setName(e("settings.colorScheme")).setDesc(e("settings.colorSchemeDesc")).addDropdown(c=>{var d;return c.addOption("default",e("settings.schemeDefault")).addOption("soft",e("settings.schemeSoft")).addOption("mono",e("settings.schemeMono")).addOption("vivid",e("settings.schemeVivid")).addOption("contrast",e("settings.schemeContrast")).setValue((d=this.plugin.settings.colorScheme)!=null?d:"default").onChange(async p=>{this.plugin.settings.colorScheme=p,await this.plugin.saveSettings(),this.plugin.applyColorMode()})});let r=(l=(n=this.plugin.currentRuleSet)==null?void 0:n.palettes)!=null?l:{},i=new w.Setting(s).setName(e("settings.palettePreset")).setDesc(e("settings.palettePresetDesc")).addDropdown(c=>{var d,p,g;c.addOption("",e("settings.paletteDefault"));for(let[u,h]of Object.entries(r)){let y=typeof h.name=="string"?h.name:(p=(d=h.name)==null?void 0:d.zh)!=null?p:u;c.addOption(u,`${y} (${u})`)}c.setValue((g=this.plugin.settings.palettePreset)!=null?g:"").onChange(async u=>{this.plugin.settings.palettePreset=u,await this.plugin.saveSettings(),this.plugin.applyColorMode(),this.display()})});new w.Setting(s).setName(e("settings.colorBlindAssist")).setDesc(e("settings.colorBlindAssistDesc")).addToggle(c=>c.setValue(!!this.plugin.settings.colorBlindAssist).onChange(async d=>{this.plugin.settings.colorBlindAssist=d,await this.plugin.saveSettings(),this.plugin.applyColorMode()})),this.renderDeriveAlphaSettings(s,e),this.renderFolderPalettes(s,e,r)})}renderQuickStartCard(t,e){W(t,e("guide.quickStart"),"","global",s=>{let r=[{title:e("guide.step1Title"),desc:e("guide.step1Desc")},{title:e("guide.step2Title"),desc:e("guide.step2Desc")},{title:e("guide.step3Title"),desc:e("guide.step3Desc")}];for(let n of r){let l=s.createDiv({cls:"pc-guide-step"});l.createDiv({cls:"pc-guide-step-title",text:n.title}),l.createDiv({cls:"pc-guide-step-desc",text:n.desc})}s.createDiv({cls:"pc-guide-actions"}).createEl("button",{cls:"pc-guide-btn",text:e("guide.openColorMap")}).addEventListener("click",()=>{Te(this.plugin.app)}),s.createDiv({cls:"pc-guide-tip",text:e("guide.tip")})})}renderCommandListCard(t,e){let s=[{name:"\u5237\u65B0\u7740\u8272",desc:"\u91CD\u65B0\u626B\u63CF\u5F53\u524D\u6587\u6863\u5E76\u5E94\u7528\u7740\u8272"},{name:"\u5207\u6362\u7F16\u8F91\u5668\u9AD8\u4EAE",desc:"\u5F00/\u5173\u7F16\u8F91\u5668\u5B9E\u65F6\u7740\u8272"},{name:"\u4E3A\u9009\u4E2D\u6587\u672C\u5E94\u7528\u989C\u8272",desc:"\u5F39\u51FA\u9009\u8272\u9762\u677F\u4E3A\u9009\u4E2D\u6587\u672C\u7740\u8272"},{name:"\u79FB\u9664\u9009\u4E2D\u6587\u672C\u7684\u989C\u8272",desc:"\u6E05\u9664\u9009\u4E2D\u6587\u672C\u7684\u81EA\u5B9A\u4E49\u989C\u8272"},{name:"\u6253\u5F00\u989C\u8272\u5BFC\u56FE\u9762\u677F",desc:"\u6253\u5F00\u4FA7\u8FB9\u680F\u989C\u8272\u5BFC\u56FE"},{name:"\u68C0\u67E5\u89C4\u5219\u66F4\u65B0",desc:"\u4ECE\u8FDC\u7A0B Git \u62C9\u53D6\u6700\u65B0\u89C4\u5219"},{name:"\u91CD\u65B0\u52A0\u8F7D\u89C4\u5219",desc:"\u91CD\u65B0\u7F16\u8BD1\u672C\u5730\u89C4\u5219\u96C6"},{name:"\u5BFC\u51FA\u5168\u91CF\u8BBE\u7F6E",desc:"\u5BFC\u51FA\u6240\u6709\u8BBE\u7F6E\u4E3A JSON"},{name:"\u5BFC\u51FA\u81EA\u5B9A\u4E49\u6587\u672C\u989C\u8272",desc:"\u4EC5\u5BFC\u51FA\u81EA\u5B9A\u4E49\u989C\u8272\u89C4\u5219"},{name:"\u5BFC\u51FA\u6587\u4EF6\u5939\u6620\u5C04",desc:"\u5BFC\u51FA\u6587\u4EF6\u5939\u2192\u6587\u4EF6\u7C7B\u578B\u6620\u5C04"}];W(t,e("guide.commands"),e("guide.commandsDesc"),"global",r=>{let i=r.createDiv({cls:"pc-cmd-list"});for(let n of s){let l=i.createDiv({cls:"pc-cmd-row"});l.createDiv({cls:"pc-cmd-name",text:n.name}),l.createDiv({cls:"pc-cmd-desc",text:n.desc})}})}renderHighlightRulesSection(t,e){let s=[{title:e("settings.editorRules"),desc:e("settings.editorRulesDesc"),iconKey:"editor",keys:Di,defaultExpanded:!0,toggles:[{key:"highlightVariables",label:e("settings.highlightVariables"),desc:e("settings.highlightVariablesDesc")},{key:"highlightRoleTags",label:e("settings.highlightRoleTags"),desc:e("settings.highlightRoleTagsDesc")},{key:"highlightRoleHeaders",label:e("settings.highlightRoleHeaders"),desc:e("settings.highlightRoleHeadersDesc")},{key:"highlightInstructionMarkers",label:e("settings.highlightInstructions"),desc:e("settings.highlightInstructionsDesc")},{key:"highlightComments",label:e("settings.highlightComments"),desc:e("settings.highlightCommentsDesc")},{key:"highlightCodeBlocks",label:e("settings.highlightCodeBlocks"),desc:e("settings.highlightCodeBlocksDesc")},{key:"highlightJsonBlocks",label:e("settings.highlightJsonBlocks"),desc:e("settings.highlightJsonBlocksDesc")},{key:"highlightInlineCode",label:e("settings.highlightInlineCode"),desc:e("settings.highlightInlineCodeDesc")}]},{title:e("settings.videoPromptRules"),desc:e("settings.videoPromptRulesDesc"),iconKey:"video",keys:Mi,defaultExpanded:!1,toggles:[{key:"highlightSectionMarkers",label:e("settings.highlightSectionMarkers"),desc:e("settings.highlightSectionMarkersDesc")},{key:"highlightShotHeaders",label:e("settings.highlightShotHeaders"),desc:e("settings.highlightShotHeadersDesc")},{key:"highlightAssetRefs",label:e("settings.highlightAssetRefs"),desc:e("settings.highlightAssetRefsDesc")},{key:"highlightFieldLabels",label:e("settings.highlightFieldLabels"),desc:e("settings.highlightFieldLabelsDesc")},{key:"highlightDialogue",label:e("settings.highlightDialogue"),desc:e("settings.highlightDialogueDesc")},{key:"highlightAudioRefs",label:e("settings.highlightAudioRefs"),desc:e("settings.highlightAudioRefsDesc")},{key:"highlightNegativePrompts",label:e("settings.highlightNegativePrompts"),desc:e("settings.highlightNegativePromptsDesc")},{key:"highlightTechParams",label:e("settings.highlightTechParams"),desc:e("settings.highlightTechParamsDesc")},{key:"highlightParentheticals",label:e("settings.highlightParentheticals"),desc:e("settings.highlightParentheticalsDesc")}]},{title:e("settings.sdPromptRules"),desc:e("settings.sdPromptRulesDesc"),iconKey:"sd",keys:Li,defaultExpanded:!1,toggles:[{key:"highlightEmphasisWeights",label:e("settings.highlightEmphasisWeights"),desc:e("settings.highlightEmphasisWeightsDesc")},{key:"highlightLoraRefs",label:e("settings.highlightLoraRefs"),desc:e("settings.highlightLoraRefsDesc")},{key:"highlightBracketEmphasis",label:e("settings.highlightBracketEmphasis"),desc:e("settings.highlightBracketEmphasisDesc")},{key:"highlightSdNegativeHeader",label:e("settings.highlightSdNegativeHeader"),desc:e("settings.highlightSdNegativeHeaderDesc")}]}];for(let r of s)this.renderCollapsibleSection(t,r.title,r.desc,r.iconKey,r.keys,r.toggles,r.defaultExpanded,e)}renderEngineTab(t,e){W(t,e("settings.ruleEngine"),e("settings.ruleEngineDesc"),"cloud",s=>{new w.Setting(s).setName(e("settings.ruleSource")).setDesc(e("settings.ruleSourceDesc")).addDropdown(p=>p.addOption("builtin",e("settings.ruleSourceBuiltin")).addOption("local",e("settings.ruleSourceLocal")).addOption("remote",e("settings.ruleSourceRemote")).setValue(this.plugin.settings.ruleSource).onChange(async g=>{this.plugin.settings.ruleSource=g,await this.plugin.saveSettings(),await this.plugin.reloadRules(),this.display()})),this.plugin.settings.ruleSource==="remote"&&(new w.Setting(s).setName(e("settings.gitRepoUrl")).setDesc(e("settings.gitRepoUrlDesc")).addText(g=>g.setPlaceholder(e("settings.gitRepoUrlPh")).setValue("").onChange(async u=>{let h=Ai(u);h&&(this.plugin.settings.gitRawBaseUrl=h.rawBaseUrl,this.plugin.settings.gitBranch=h.branch,await this.plugin.saveSettings(),new w.Notice(e("notice.gitParsed")),this.display())})),s.createDiv({cls:"pc-git-parse-hint"}).createSpan({cls:"pc-git-parse-status",text:`${e("settings.gitRawBaseUrl")}: ${this.plugin.settings.gitRawBaseUrl}`}),new w.Setting(s).setName(e("settings.gitRawBaseUrl")).setDesc(e("settings.gitRawBaseUrlDesc")).addText(g=>g.setPlaceholder(e("settings.gitRawBaseUrlPh")).setValue(this.plugin.settings.gitRawBaseUrl).onChange(async u=>{this.plugin.settings.gitRawBaseUrl=u.trim(),await this.plugin.saveSettings()})),new w.Setting(s).setName(e("settings.gitBranch")).setDesc(e("settings.gitBranchDesc")).addText(g=>g.setPlaceholder("main").setValue(this.plugin.settings.gitBranch).onChange(async u=>{this.plugin.settings.gitBranch=u.trim()||"main",await this.plugin.saveSettings()})),new w.Setting(s).setName(e("settings.autoUpdateRules")).setDesc(e("settings.autoUpdateRulesDesc")).addToggle(g=>g.setValue(this.plugin.settings.autoUpdateRules).onChange(async u=>{this.plugin.settings.autoUpdateRules=u,await this.plugin.saveSettings(),this.display()})),this.plugin.settings.autoUpdateRules&&new w.Setting(s).setName(e("settings.autoUpdateInterval")).setDesc(e("settings.autoUpdateIntervalDesc")).addSlider(g=>g.setLimits(1,72,1).setValue(this.plugin.settings.autoUpdateInterval).setDynamicTooltip().onChange(async u=>{this.plugin.settings.autoUpdateInterval=u,await this.plugin.saveSettings()}))),new w.Setting(s).setName(e("settings.contextSemantic")).setDesc(e("settings.contextSemanticDesc")).addToggle(p=>p.setValue(this.plugin.settings.contextSemanticEnabled).onChange(async g=>{this.plugin.settings.contextSemanticEnabled=g,await this.plugin.saveSettings(),this.plugin.refreshEditorExtensions()}));let r=this.plugin.getRuleVersion();new w.Setting(s).setName(e("settings.ruleVersion")).setDesc(e("settings.ruleVersionDesc")).addText(p=>p.setValue(r).setDisabled(!0));let i=s.createDiv({cls:"pc-batch-row"});i.createSpan({text:""});let n=i.createDiv({cls:"pc-batch-actions",attr:{style:"display: flex; gap: 4px;"}}),l=n.createEl("button",{cls:"pc-batch-btn",text:e("settings.checkUpdate")});l.addEventListener("click",async()=>{await this.plugin.checkForUpdates(!0),this.display()}),this.plugin.settings.ruleSource!=="remote"&&(l.setAttribute("disabled","true"),l.style.opacity="0.5"),n.createEl("button",{cls:"pc-batch-btn",text:e("settings.reloadRules")}).addEventListener("click",async()=>{await this.plugin.reloadRules(),new w.Notice(this.plugin.t("notice.rulesReloaded")),this.display()}),n.createEl("button",{cls:"pc-batch-btn mod-warning",text:e("settings.clearCache")}).addEventListener("click",async()=>{await this.plugin.clearRuleCache(),new w.Notice(this.plugin.t("notice.cacheCleared")),this.display()}),s.createDiv({cls:"pc-setting-divider"}),new w.Setting(s).setName(e("settings.gitReportEnabled")).setDesc(e("settings.gitReportEnabledDesc")).addToggle(p=>p.setValue(this.plugin.settings.gitReportEnabled).onChange(async g=>{this.plugin.settings.gitReportEnabled=g,await this.plugin.saveSettings(),this.display()})),new w.Setting(s).setName(e("settings.downloadToCache")).setDesc(e("settings.downloadToCacheDesc")).addToggle(p=>p.setValue(this.plugin.settings.downloadToCache).onChange(async g=>{this.plugin.settings.downloadToCache=g,await this.plugin.saveSettings()})),this.plugin.settings.gitReportEnabled&&this.renderPullReport(s,e)})}renderFilesTab(t,e){W(t,e("settings.fileDetection"),e("settings.fileDetectionDesc"),"detection",s=>{new w.Setting(s).setName(e("settings.detectByFrontmatter")).setDesc(e("settings.detectByFrontmatterDesc")).addToggle(r=>r.setValue(this.plugin.settings.detectByFrontmatter).onChange(async i=>{this.plugin.settings.detectByFrontmatter=i,await this.plugin.saveSettings(),this.plugin.refreshFileColorizer()})),new w.Setting(s).setName(e("settings.detectByFolder")).setDesc(e("settings.detectByFolderDesc")).addToggle(r=>r.setValue(this.plugin.settings.detectByFolder).onChange(async i=>{this.plugin.settings.detectByFolder=i,await this.plugin.saveSettings(),this.plugin.refreshFileColorizer()})),new w.Setting(s).setName(e("settings.detectByFilename")).setDesc(e("settings.detectByFilenameDesc")).addToggle(r=>r.setValue(this.plugin.settings.detectByFilename).onChange(async i=>{this.plugin.settings.detectByFilename=i,await this.plugin.saveSettings(),this.plugin.refreshFileColorizer()}))}),W(t,e("settings.displayOptions"),e("settings.displayOptionsDesc"),"display",s=>{new w.Setting(s).setName(e("settings.fileColorizer")).setDesc(e("settings.fileColorizerDesc")).addToggle(r=>r.setValue(this.plugin.settings.fileColorizerEnabled).onChange(async i=>{this.plugin.settings.fileColorizerEnabled=i,await this.plugin.saveSettings(),this.plugin.refreshFileColorizer(),this.updateStatusBar()}))})}async renderPackagesTab(t,e){var k,_,R,T,D,I,S,C,x;let s=t.createDiv({cls:"pc-pkg-tab"}),r=s.createDiv({cls:"pc-pkg-toolbar"});r.createEl("button",{text:"\u65B0\u5EFA\u5305",cls:"pc-pkg-btn"}).addEventListener("click",()=>{Se(this.app,"",async P=>{P.trim()&&(await Ws(this.plugin,P.trim()),this.display())})}),r.createEl("button",{text:"\u5BFC\u5165\u5305",cls:"pc-pkg-btn"}).addEventListener("click",()=>{rt(this.plugin,async()=>{this.display()})}),r.createEl("button",{text:"\u4ECE\u8D44\u6E90\u751F\u6210\u5305",cls:"pc-pkg-btn"}).addEventListener("click",()=>{Kt(this.plugin,async()=>{this.display()})});let c=r.createDiv({cls:"pc-pkg-mode-switch"}),d=this.plugin.settings.packageMode==="multi",p=c.createEl("button",{text:"\u5355\u9009",cls:"pc-pkg-btn"}),g=c.createEl("button",{text:"\u53E0\u52A0",cls:"pc-pkg-btn"});d?g.addClass("is-active"):p.addClass("is-active"),p.addEventListener("click",async()=>{await de(this.plugin,"single"),this.display()}),g.addEventListener("click",async()=>{await de(this.plugin,"multi"),this.display()});let u=s.createDiv({cls:"pc-pkg-main"}),h=u.createDiv({cls:"pc-pkg-list-pane"}),y=u.createDiv({cls:"pc-pkg-detail-pane"}),m=this.plugin.loadedPackages,b=new Set(this.plugin.settings.enabledPackageIds);for(let P of m){let A=h.createDiv({cls:"pc-pkg-row"});P.dirName===this.selectedPkgDir&&A.addClass("is-selected"),P.status!=="ok"&&A.addClass("is-warn");let O=A.createEl("input",{type:"checkbox",cls:"pc-pkg-row-cb"});O.checked=b.has(P.dirName),O.disabled=P.status==="invalid",O.addEventListener("change",async()=>{await Le(this.plugin,P.dirName),this.display()});let ie=A.createSpan({cls:"pc-pkg-dot"});ie.style.background=(_=(k=P.manifest)==null?void 0:k.tagColor)!=null?_:"#999",A.createSpan({cls:"pc-pkg-name",text:(T=(R=P.manifest)==null?void 0:R.name)!=null?T:P.dirName});let H=(I=(D=P.refTokenIds)==null?void 0:D.length)!=null?I:0,$=(C=(S=P.refRuleIds)==null?void 0:S.length)!=null?C:0;A.createSpan({cls:"pc-pkg-badge",text:`T${H} R${$}`}),P.isBuiltin&&A.createSpan({cls:"pc-pkg-tag",text:"\u5185\u7F6E"}),P.status!=="ok"&&A.createSpan({cls:"pc-pkg-tag is-warn",text:P.status}),A.addEventListener("click",j=>{j.target.classList.contains("pc-pkg-row-cb")||(this.selectedPkgDir=P.dirName,this.display())})}let v=(x=m.find(P=>P.dirName===this.selectedPkgDir))!=null?x:m[0];v?(this.selectedPkgDir=v.dirName,this.renderPackageDetail(y,v,e)):y.createDiv({cls:"pc-pkg-empty",text:"\u5C1A\u65E0\u5305\uFF0C\u70B9\u51FB\u300C\u65B0\u5EFA\u5305\u300D\u521B\u5EFA\u3002"})}renderPackageDetail(t,e,s){var y;if(!e.manifest){t.createDiv({cls:"pc-pkg-invalid",text:"\u8BE5\u5305\u6E05\u5355\u635F\u574F\uFF08package.json \u65E0\u6548\uFF09\uFF0C\u65E0\u6CD5\u7BA1\u7406\u3002\u53EF\u5C1D\u8BD5\u5220\u9664\u540E\u91CD\u65B0\u5BFC\u5165\u3002"});return}let r=e.manifest,i=new Set((y=e.refRuleIds)!=null?y:[]),n=t.createDiv({cls:"pc-pkg-header"}),l=n.createDiv({cls:"pc-pkg-title-row"}),c=l.createSpan({cls:"pc-pkg-dot"});c.style.background=r.tagColor,l.createEl("h3",{text:r.name}),r.description&&n.createEl("p",{cls:"pc-pkg-desc",text:r.description}),n.createSpan({cls:"pc-pkg-meta",text:`ID: ${r.packageId} \xB7 v${r.version} \xB7 ${r.type}${r.usageTag?" \xB7 "+r.usageTag:""}`});let d=n.createDiv({cls:"pc-pkg-actions"});if(e.isBuiltin||(d.createEl("button",{text:"\u91CD\u547D\u540D",cls:"pc-pkg-btn"}).addEventListener("click",()=>{Se(this.app,r.name,async _=>{_.trim()&&(await Ae(this.plugin,e,_.trim()),this.display())})}),d.createEl("button",{text:"\u590D\u5236",cls:"pc-pkg-btn"}).addEventListener("click",async()=>{await Ie(this.plugin,e),this.display()}),d.createEl("button",{text:"\u514B\u9686",cls:"pc-pkg-btn"}).addEventListener("click",async()=>{await Fe(this.plugin,e),this.display()}),d.createEl("button",{text:"\u5220\u9664",cls:"pc-pkg-btn is-danger"}).addEventListener("click",()=>{ce(this.app,"\u5220\u9664\u5305",`\u786E\u8BA4\u5220\u9664\u5305\u300C${r.name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,async()=>{await Be(this.plugin,e),this.selectedPkgDir=null,this.display()})})),d.createEl("button",{text:"\u5BFC\u51FA",cls:"pc-pkg-btn"}).addEventListener("click",()=>st(this.plugin,e)),this.renderPackageCategoryStats(t,e),r.previewSampleText){let m=t.createDiv({cls:"pc-pkg-preview-box"});m.createDiv({cls:"pc-pkg-preview-label",text:"\u5305\u9884\u89C8"}),m.createDiv({cls:"pc-pkg-preview-text",text:r.previewSampleText})}let g=t.createEl("details",{cls:"pc-pkg-section"});g.createEl("summary",{text:`\u7740\u8272\u89C4\u5219\u5F15\u7528\uFF08${i.size}\uFF09`});let u=this.plugin.getRuleIdToCssClassMap(),h=Object.keys(u);if(h.length===0)g.createDiv({cls:"pc-pkg-empty",text:"\u5F53\u524D\u89C4\u5219\u96C6\u4E3A\u7A7A\u3002"});else for(let m of h){let b=u[m],v=g.createDiv({cls:"pc-pkg-ref-row"});v.createSpan({cls:"pc-pkg-ref-name",text:m}),v.createSpan({cls:"pc-pkg-ref-css",text:b}),i.has(m)&&(v.createEl("button",{cls:"pc-pkg-ref-ov",text:"\u8BF4\u660E"}).addEventListener("click",T=>{T.stopPropagation();let D=it(this.plugin,m);Is(this.app,m,D,I=>{Vs(this.plugin,m,I)})}),v.createEl("button",{cls:"pc-pkg-ref-ov",text:"\u8986\u76D6"}).addEventListener("click",T=>{var I,S;T.stopPropagation();let D=(S=(I=e.manifest)==null?void 0:I.ruleOverrides)==null?void 0:S[m];As(this.app,{kind:"rule",id:m,name:m},D,C=>{var P,A;let x={...(A=(P=e.manifest)==null?void 0:P.ruleOverrides)!=null?A:{}};C?x[m]=C:delete x[m],Hs(this.plugin,e,{ruleOverrides:x}).then(()=>this.display())})}));let k=v.createEl("input",{type:"checkbox",cls:"pc-pkg-ref-sw"});k.checked=i.has(m),k.addEventListener("change",async()=>{await Gs(this.plugin,e.dirName,"rule",m,k.checked),this.display()})}}renderPackageCategoryStats(t,e){var d,p,g,u,h,y;let s=(d=e.embeddedTokens)!=null?d:[],r=(p=e.embeddedRules)!=null?p:[];if(s.length===0&&r.length===0)return;let i=new Map,n=(m,b)=>{var k;let v=(k=i.get(m))!=null?k:{tokens:0,rules:0};b==="token"?v.tokens++:v.rules++,i.set(m,v)};for(let m of s)n((g=m.category)!=null?g:"\u672A\u5206\u7C7B","token");let l=(u=this.plugin.settings.ruleMeta)!=null?u:{};for(let m of r)n((y=(h=l[m.id])==null?void 0:h.category)!=null?y:"\u672A\u5206\u7C7B","rule");if(i.size===0)return;let c=t.createDiv({cls:"pc-pkg-cat-stats"});c.createSpan({cls:"pc-pkg-cat-stats-label",text:"\u5206\u7C7B\u5206\u5E03"});for(let[m,b]of[...i.entries()].sort()){let v=c.createSpan({cls:"pc-pkg-cat-badge"});v.createSpan({cls:"pc-pkg-cat-badge-name",text:m});let k=[];b.tokens>0&&k.push(`T${b.tokens}`),b.rules>0&&k.push(`R${b.rules}`),v.createSpan({cls:"pc-pkg-cat-badge-count",text:k.join(" ")})}}renderRulesTab(t,e){this.renderRulesSearchBox(t,e),this.renderHighlightRulesSection(t,e)}renderRulesSearchBox(t,e){let s=t.createDiv({cls:"pc-search-box"}),r=s.createSpan({cls:"pc-search-icon"});r.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';let i=s.createEl("input",{cls:"pc-search-input",attr:{type:"text",placeholder:e("search.placeholder")}});i.value=this.rulesSearchQuery;let n=s.createSpan({cls:"pc-search-hint"}),l=()=>{let c=this.rulesSearchQuery.trim().toLowerCase(),d=this.containerEl.querySelector(".pc-tab-content");if(!d)return;let p=d.querySelectorAll(".pc-collapsible-content .setting-item"),g=0;p.forEach(h=>{let y=(h.textContent||"").toLowerCase(),m=c===""||y.includes(c);h.classList.toggle("pc-search-hidden",!m),m&&g++}),d.querySelectorAll(".pc-collapsible").forEach(h=>{let y=h.querySelectorAll(".setting-item:not(.pc-search-hidden)").length;h.classList.toggle("pc-search-group-hidden",c!==""&&y===0)}),n.textContent=c===""?"":g===0?e("search.noMatch"):e("search.matchCount").replace("{count}",String(g))};i.addEventListener("input",()=>{this.rulesSearchQuery=i.value,l()}),setTimeout(l,0)}renderColorsTab(t,e){this.renderTokenCards(t,e),W(t,e("settings.fileTypeColors"),e("settings.fileTypeColorsDesc"),"colors",s=>{for(let r of this.plugin.settings.fileTypeColors)new w.Setting(s).setName(r.label).addColorPicker(i=>i.setValue(r.color).onChange(async n=>{r.color=n,await this.plugin.saveSettings(),this.plugin.refreshFileColorizer(),this.plugin.applyColorMode()})).addText(i=>i.setValue(r.color).onChange(async n=>{/^#[0-9a-fA-F]{6}$/.test(n)&&(r.color=n,await this.plugin.saveSettings(),this.plugin.refreshFileColorizer(),this.plugin.applyColorMode())}));new w.Setting(s).setName(e("settings.resetColors")).setDesc(e("settings.resetColorsDesc")).addButton(r=>r.setButtonText(e("settings.reset")).setWarning().onClick(async()=>{me(this.containerEl,this.plugin.t.bind(this.plugin),e("confirm.resetTitle"),e("confirm.resetDesc"),async()=>{this.plugin.settings.fileTypeColors=[...Rt],await this.plugin.saveSettings(),this.plugin.refreshFileColorizer(),this.display(),new w.Notice(this.plugin.t("notice.colorsReset"))})}))}),this.renderCustomTextColors(t,e),this.renderConfigManagement(t,e)}renderConfigManagement(t,e){W(t,e("settings.configManagement"),e("settings.configManagementDesc"),"global",s=>{new w.Setting(s).setName(e("settings.exportConfig")).setDesc(e("settings.exportConfigDesc")).addButton(n=>n.setButtonText(e("settings.export")).setCta().onClick(()=>{let l=vs(this.plugin.settings,this.plugin.manifest.version);xs(l),new w.Notice(e("notice.configExported"))}));let r=new w.Setting(s).setName(e("settings.importConfig")).setDesc(e("settings.importConfigDesc")),i=s.createEl("input",{attr:{type:"file",accept:"application/json,.json",multiple:"multiple"}});i.style.display="none",i.addEventListener("change",async()=>{let n=i.files;if(!n||n.length===0)return;let l=[];for(let d of Array.from(n))try{let p=await d.text();l.push(ks(p))}catch(p){new w.Notice(`${e("notice.importFailed")}: ${d.name}`)}if(l.length===0)return;let c=String(l.length);me(this.containerEl,this.plugin.t.bind(this.plugin),e("confirm.importTitle"),e("confirm.importDesc").replace("{count}",c),async()=>{this.plugin.settings=bs(this.plugin.settings,l),await this.plugin.saveSettings(),this.plugin.refreshDynamicStyles(),this.plugin.refreshEditorExtensions(),this.plugin.refreshFileColorizer(),this.display(),new w.Notice(e("notice.configImported").replace("{count}",c))}),i.value=""}),r.addButton(n=>n.setButtonText(e("settings.import")).onClick(()=>i.click()))})}renderDeriveAlphaSettings(t,e){var l;let s=(l=this.plugin.settings.tokenDeriveAlphas)!=null?l:{},r=(c,d,p)=>{c.addText(g=>g.setPlaceholder(String(p)).setValue(s[d]!==void 0?String(s[d]):"").onChange(async u=>{let h=parseFloat(u),y=Math.min(.6,Math.max(.01,isNaN(h)?p:h));this.plugin.settings.tokenDeriveAlphas||(this.plugin.settings.tokenDeriveAlphas={}),isNaN(h)?delete this.plugin.settings.tokenDeriveAlphas[d]:this.plugin.settings.tokenDeriveAlphas[d]=y,await this.plugin.saveSettings(),this.plugin.applyColorMode()}))},i=new w.Setting(t).setName(e("settings.alphaSoft")).setDesc(e("settings.alphaSoftDesc"));r(i,"softLight",.06),r(i,"softDark",.1);let n=new w.Setting(t).setName(e("settings.alphaBorder")).setDesc(e("settings.alphaBorderDesc"));r(n,"borderLight",.15),r(n,"borderDark",.2)}renderFolderPalettes(t,e,s){let r=new w.Setting(t).setName(e("settings.folderPalettes")).setDesc(e("settings.folderPalettesDesc")).addToggle(l=>l.setValue(!!this.plugin.settings.folderPalettesEnabled).onChange(async c=>{this.plugin.settings.folderPalettesEnabled=c,await this.plugin.saveSettings(),this.plugin.applyColorMode()})),i=t.createDiv({cls:"pc-folder-palette-list"}),n=()=>{var c,d,p;i.empty();let l=(c=this.plugin.settings.folderPalettes)!=null?c:[];for(let g=0;g<l.length;g++){let u=i.createDiv({cls:"pc-folder-palette-row"});u.createEl("input",{cls:"pc-folder-palette-path",attr:{type:"text",placeholder:"projects/tech"}});let h=u.querySelector("input");h.value=l[g].path;let y=u.createEl("select",{cls:"pc-folder-palette-select dropdown"});y.createEl("option",{text:e("settings.paletteDefault"),attr:{value:""}});for(let[b,v]of Object.entries(s)){let k=typeof v.name=="string"?v.name:(p=(d=v.name)==null?void 0:d.zh)!=null?p:b;y.createEl("option",{text:`${k} (${b})`,attr:{value:b}})}y.value=l[g].palette,u.createEl("button",{cls:"pc-folder-palette-remove",text:"\u2715",attr:{"aria-label":e("customText.delete"),title:e("customText.delete")}}).addEventListener("click",async()=>{this.plugin.settings.folderPalettes.splice(g,1),await this.plugin.saveSettings(),this.plugin.applyColorMode(),n()}),h.addEventListener("change",async()=>{l[g].path=h.value.trim().replace(/^\/+|\/+$/g,""),await this.plugin.saveSettings(),this.plugin.applyColorMode()}),y.addEventListener("change",async()=>{l[g].palette=y.value,await this.plugin.saveSettings(),this.plugin.applyColorMode()})}};n(),r.addButton(l=>l.setButtonText(e("settings.folderPaletteAdd")).setCta().onClick(async()=>{this.plugin.settings.folderPalettes||(this.plugin.settings.folderPalettes=[]),this.plugin.settings.folderPalettes.push({path:"",palette:""}),this.plugin.settings.folderPalettesEnabled=!0,await this.plugin.saveSettings(),n()}))}renderCustomTextColors(t,e){W(t,e("customText.section"),e("customText.sectionDesc"),"colors",s=>{var d,p,g;s.addClass("pc-custom-text"),new w.Setting(s).setName(e("customText.popoverAutoShow")).setDesc(e("customText.popoverAutoShowDesc")).addToggle(u=>u.setValue(this.plugin.settings.customTextPopoverAutoShow!==!1).onChange(async h=>{this.plugin.settings.customTextPopoverAutoShow=h,await this.plugin.saveSettings(),this.display()})),new w.Setting(s).setName(e("customText.popoverDelay")).setDesc(e("customText.popoverDelayDesc")).addText(u=>{var h;return u.setPlaceholder("350").setValue(String((h=this.plugin.settings.customTextPopoverDelay)!=null?h:350)).onChange(async y=>{let m=parseInt(y,10);!isNaN(m)&&m>=0&&m<=2e3&&(this.plugin.settings.customTextPopoverDelay=m,await this.plugin.saveSettings())})});let r=s.createDiv({cls:"pc-custom-text-tip"});r.createEl("span",{cls:"pc-custom-text-tip-icon",text:"\u24D8"}),r.createEl("span",{cls:"pc-custom-text-tip-text",text:e("customText.tip")}),new w.Setting(s).setName(e("customText.add")).setDesc(e("customText.addDesc")).addButton(u=>u.setButtonText(e("customText.cmdApply")).setCta().onClick(()=>{new w.Notice(e("customText.noticeNoSelection"))})),s.createDiv({cls:"pc-custom-text-divider"});let i=(d=this.plugin.settings.customTextColors)!=null?d:[];if(i.length===0){s.createDiv({cls:"pc-custom-text-empty",text:e("customText.empty")});return}i.some(u=>u.id===this.selectedCustomTextId)||(this.selectedCustomTextId=(g=(p=i[0])==null?void 0:p.id)!=null?g:null);let n=s.createDiv({cls:"pc-custom-text-md"}),l=n.createDiv({cls:"pc-custom-text-md-list"}),c=n.createDiv({cls:"pc-custom-text-md-detail"});for(let u of i)this.renderCustomTextListItem(l,u,e);this.renderCustomTextDetail(c,e)})}renderCustomTextListItem(t,e,s){var g;let r=e.id===this.selectedCustomTextId,i=t.createDiv({cls:`pc-custom-text-md-item ${r?"selected":""} ${e.enabled?"":"disabled"}`,attr:{role:"button",tabindex:"0"}}),n=i.createDiv({cls:"pc-custom-text-md-item-text"});n.setText(e.text.length>40?e.text.slice(0,40)+"\u2026":e.text),n.setAttribute("title",e.text);let l=(g=e.category)!=null?g:"\u672A\u5206\u7C7B";l&&l!=="\u672A\u5206\u7C7B"&&i.createSpan({cls:"pc-custom-text-md-item-cat",text:l});let c=i.createDiv({cls:"pc-custom-text-md-item-badge"}),d=ee(Z(e.gradientStops));if(d){let u=c.createDiv({cls:"pc-custom-text-md-item-grad"});u.style.background=`linear-gradient(90deg, ${d})`}else{let u=c.createDiv({cls:"pc-custom-text-md-item-dot"});u.style.background=e.color}let p=()=>{if(this.selectedCustomTextId===e.id)return;this.selectedCustomTextId=e.id;let u=i.closest(".pc-custom-text-md");if(u){let h=u.querySelector(".pc-custom-text-md-list"),y=u.querySelector(".pc-custom-text-md-detail");h==null||h.querySelectorAll(".pc-custom-text-md-item").forEach(m=>m.classList.remove("selected")),i.addClass("selected"),y&&(y.empty(),this.renderCustomTextDetail(y,this.plugin.t.bind(this.plugin)))}};i.addEventListener("click",p),i.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),p())})}renderCustomTextDetail(t,e){var oe,ae,_e,Ce;let s=((oe=this.plugin.settings.customTextColors)!=null?oe:[]).find(E=>E.id===this.selectedCustomTextId);if(!s){t.createDiv({cls:"pc-custom-text-md-empty",text:e("customText.detailEmpty")});return}let r=[{id:"narrative",label:"\u53D9\u8FF0",sentence:E=>`${E}\u7AD9\u5728\u95E8\u53E3\uFF0C\u76EE\u5149\u7F13\u7F13\u626B\u8FC7\u6574\u4E2A\u623F\u95F4\u3002`},{id:"dialogue",label:"\u5BF9\u8BDD",sentence:E=>`\u300C\u6211\u4EEC\u5FC5\u987B\u5728\u9ECE\u660E\u524D\u51FA\u53D1\u3002\u300D${E}\u538B\u4F4E\u58F0\u97F3\u8BF4\u9053\u3002`},{id:"instruction",label:"\u6307\u4EE4",sentence:E=>`\u7CFB\u7EDF\u6307\u4EE4\uFF1A\u8BF7\u6839\u636E ${E} \u7684\u8BBE\u5B9A\u751F\u6210\u540E\u7EED\u5267\u60C5\uFF0C\u4FDD\u6301\u98CE\u683C\u4E00\u81F4\u3002`},{id:"list",label:"\u5217\u8868",sentence:E=>`- \u89D2\u8272\u8BBE\u5B9A\uFF1A${E}
- \u573A\u666F\uFF1A\u9EC4\u660F\u7684\u6D77\u8FB9\u6808\u6865
- \u955C\u5934\uFF1A\u7F13\u6162\u63A8\u8FD1`}],i=r[0],n=t.createDiv({cls:"pc-custom-text-md-scene-chips"}),l=t.createDiv({cls:"pc-custom-text-md-preview pc-custom-text-md-preview-scene"}),c=()=>{l.empty();let E=i.sentence(s.text),L=s.text?E.indexOf(s.text):-1;L>=0?(l.createSpan({text:E.slice(0,L)}),l.createSpan({cls:`dsl-custom-text-${s.id}`,text:s.text}),l.createSpan({text:E.slice(L+s.text.length)})):(l.createSpan({text:E+" "}),l.createSpan({cls:`dsl-custom-text-${s.id}`,text:s.text}))};for(let E of r){let L=n.createSpan({cls:`pc-custom-text-md-scene-chip ${E.id===i.id?"is-active":""}`,text:E.label});L.addEventListener("click",()=>{i=E,n.querySelectorAll(".pc-custom-text-md-scene-chip").forEach(K=>K.classList.remove("is-active")),L.classList.add("is-active"),c()})}c();let d=l,p=t.createDiv({cls:"pc-custom-text-md-actions"});p.createEl("button",{cls:"pc-custom-text-action-btn pc-custom-text-edit-btn",text:"\u9AD8\u7EA7\u7F16\u8F91"}).addEventListener("click",()=>this.plugin.editCustomTextColor(s.id)),p.createEl("button",{cls:"pc-custom-text-action-btn",text:s.enabled?e("customText.disableAction"):e("customText.enableAction")}).addEventListener("click",async()=>{await this.plugin.updateCustomTextColor(s.id,{enabled:!s.enabled}),this.refreshCustomTextDetail(t)}),p.createEl("button",{cls:"pc-custom-text-action-btn pc-custom-text-delete-btn",text:e("customText.delete")}).addEventListener("click",()=>{me(this.containerEl,this.plugin.t.bind(this.plugin),e("customText.delete"),e("customText.confirmDelete"),async()=>{await this.plugin.deleteCustomTextColor(s.id),this.display()})});let y=t.createDiv({cls:"pc-custom-text-md-form"}),m=(E,L)=>{let K=y.createDiv({cls:"pc-custom-text-md-field"});return K.createSpan({cls:"pc-custom-text-md-field-label",text:E}),K.createDiv({cls:"pc-custom-text-md-field-value"}).appendChild(L),K},b=document.createElement("input");b.className="pc-custom-text-md-text-input",b.type="text",b.value=s.text,b.addEventListener("change",async()=>{let E=b.value.trim();E&&E!==s.text&&(await this.plugin.updateCustomTextColor(s.id,{text:E}),this.refreshCustomTextDetail(t))}),m("\u6587\u672C",b);let v=document.createElement("span");v.className="pc-custom-text-md-color-wrap";let k=v.createEl("input",{cls:"pc-custom-text-md-color-input",attr:{type:"color"}});k.value=s.color;let _=v.createEl("input",{cls:"pc-custom-text-md-hex-input",attr:{type:"text",value:s.color}}),R=async()=>{let E=k.value;_.value=E,await this.plugin.updateCustomTextColor(s.id,{color:E}),this.refreshCustomTextDetail(t)};k.addEventListener("change",R),_.addEventListener("change",async()=>{let E=_.value.trim();/^#[0-9a-fA-F]{6}$/.test(E)&&(k.value=E,await this.plugin.updateCustomTextColor(s.id,{color:E}),this.refreshCustomTextDetail(t))}),m("\u989C\u8272",v);let T=document.createElement("span");T.className="pc-custom-text-md-fx-chips";let D=new Set(X(s));for(let E of Ke)T.createEl("span",{cls:`pc-custom-text-md-fx-chip ${D.has(E.value)?"is-active":""}`,text:e(`customText.effectName_${E.value}`)}).addEventListener("click",async()=>{let K=X(s),V=new Set(K);V.has(E.value)?V.delete(E.value):V.add(E.value);let Ge=[...V];await this.plugin.updateCustomTextColor(s.id,{effects:Ge}),this.refreshCustomTextDetail(t)});m("\u6548\u679C",T);let I=document.createElement("span");I.className="pc-custom-text-md-match-wrap";let S=I.createEl("label",{cls:"pc-custom-text-md-match-label"}),C=S.createEl("input",{attr:{type:"checkbox"}});C.checked=s.caseSensitive,S.createSpan({text:e("customText.caseSensitive")}),C.addEventListener("change",async()=>{await this.plugin.updateCustomTextColor(s.id,{caseSensitive:C.checked})});let x=I.createEl("label",{cls:"pc-custom-text-md-match-label"}),P=x.createEl("input",{attr:{type:"checkbox"}});P.checked=s.wholeWord,x.createSpan({text:e("customText.wholeWord")}),P.addEventListener("change",async()=>{await this.plugin.updateCustomTextColor(s.id,{wholeWord:P.checked})}),m("\u5339\u914D",I);let A=document.createElement("span");A.className="pc-custom-text-md-cat";let O=A.createEl("input",{cls:"pc-custom-text-md-cat-input",attr:{type:"text",list:"pc-token-categories-list",value:(ae=s.category)!=null?ae:"\u672A\u5206\u7C7B",placeholder:"\u9009\u62E9\u6216\u8F93\u5165"}}),ie=A.createEl("datalist",{attr:{id:"pc-token-categories-list"}});for(let E of le)ie.createEl("option",{attr:{value:E}});O.addEventListener("change",async()=>{let E=O.value.trim()||"\u672A\u5206\u7C7B";await this.plugin.updateCustomTextColor(s.id,{category:E})}),m("\u5206\u7C7B",A);let H=document.createElement("span");H.className="pc-custom-text-md-note-wrap";let $=H.createEl("input",{cls:"pc-custom-text-md-note-input",attr:{type:"text",value:(_e=s.note)!=null?_e:"",placeholder:"\u4E3A\u4EC0\u4E48\u6807\u6CE8\u5B83\uFF1F\u60AC\u505C\u67D3\u8272\u6587\u672C\u65F6\u6D6E\u7A97\u663E\u793A"}});$.addEventListener("change",async()=>{await this.plugin.updateCustomTextColor(s.id,{note:$.value.trim()})}),m("\u8BF4\u660E",H);let j=ee(Z(s.gradientStops));if(j){let E=document.createElement("span");E.className="pc-custom-text-md-gradinfo";let L=E.createEl("span",{cls:"pc-custom-text-md-gradbar"});L.style.background=`linear-gradient(90deg, ${j})`,E.createSpan({text:`${s.gradientStops.length}\u8272 \xB7 ${(Ce=s.gradientAngle)!=null?Ce:135}\xB0`}),m("\u6E10\u53D8",E)}}refreshCustomTextDetail(t){let e=t.closest(".pc-custom-text-md"),s=e==null?void 0:e.querySelector(".pc-custom-text-md-detail");s&&(s.empty(),this.renderCustomTextDetail(s,this.plugin.t.bind(this.plugin)))}renderVocabTokenCards(t,e){}renderVocabTokenItem(t,e,s,r,i){}renderTokenCards(t,e){var d,p,g,u,h,y;let s=this.plugin.getColorTokens();if(Object.keys(s).length===0){W(t,e("settings.colorCustom"),e("settings.colorCustomDesc"),"colors",m=>{m.createDiv({cls:"pc-pull-report-empty",text:e("settings.noColorTokens")})});return}let r=getComputedStyle(document.documentElement),i=(d=this.plugin.settings.customColors)!=null?d:{},n=Object.keys(s),l=n.filter(m=>{var b,v;return(v=(b=this.plugin.settings.tokenEnabled)==null?void 0:b[m])!=null?v:!0}).length;if(l>Ri){let m=t.createDiv({cls:"pc-token-noise-warning"});m.createSpan({text:e("settings.tokenNoiseWarning").replace("{count}",String(l))}),m.createEl("button",{cls:"pc-batch-btn pc-batch-btn-sm",text:e("settings.tokenNoiseAction")}).addEventListener("click",async()=>{this.plugin.settings.tokenEnabled||(this.plugin.settings.tokenEnabled={});for(let v of n)this.plugin.settings.tokenEnabled[v]=gs.includes(v);await this.plugin.saveSettings(),this.plugin.refreshDynamicStyles(),this.updatePreviewCard(),this.display(),new w.Notice(e("settings.tokenNoiseDone"))})}let c=new Map;for(let[m,b]of Object.entries(Zs)){let k=this.plugin.getColorByCssClass(b).match(/--dsl-([a-zA-Z_][\w-]*)/);if(k){let _=k[1].replace(/-(?:soft|border)$/,"");c.has(_)||c.set(_,[]),c.get(_).push(m)}}for(let m of ve.TOKEN_GROUPS){let b=m.tokens.filter(C=>s[C]);if(b.length===0)continue;let v=t.createEl("details",{cls:"pc-token-group-details"}),k=m.titleKey,_=this.tokenGroupOpenStates.get(k);(_!=null?_:m.defaultExpanded)&&v.setAttribute("open",""),v.addEventListener("toggle",()=>{this.tokenGroupOpenStates.set(k,v.open)});let R=v.createEl("summary",{cls:"pc-token-group-summary"});R.createSpan({text:e(m.titleKey)}),R.createSpan({cls:"pc-token-group-count",text:e("settings.tokenGroupCount").replace("{count}",String(b.length))});let T=R.createDiv({cls:"pc-token-group-batch"});T.createEl("button",{cls:"pc-batch-btn pc-batch-btn-sm",text:e("batch.enableAll")}).addEventListener("click",C=>{C.stopPropagation(),this.plugin.settings.tokenEnabled||(this.plugin.settings.tokenEnabled={});for(let x of b)this.plugin.settings.tokenEnabled[x]=!0;this.plugin.saveSettings().then(()=>{this.plugin.refreshDynamicStyles(),this.display()})}),T.createEl("button",{cls:"pc-batch-btn pc-batch-btn-sm",text:e("batch.disableAll")}).addEventListener("click",C=>{C.stopPropagation(),this.plugin.settings.tokenEnabled||(this.plugin.settings.tokenEnabled={});for(let x of b)this.plugin.settings.tokenEnabled[x]=!1;this.plugin.saveSettings().then(()=>{this.plugin.refreshDynamicStyles(),this.display()})}),T.createEl("button",{cls:"pc-batch-btn pc-batch-btn-sm",text:e("batch.reset")}).addEventListener("click",C=>{if(C.stopPropagation(),this.plugin.settings.customColors)for(let x of b)delete this.plugin.settings.customColors[`--dsl-${x}`];this.plugin.saveSettings().then(()=>{this.plugin.refreshDynamicStyles(),this.display(),new w.Notice(e("notice.tokenGroupColorsReset"))})});for(let C of b){let x=s[C],P=`--dsl-${C}`,A=C;typeof x.name=="object"?A=(p=x.name.zh)!=null?p:x.name.en:typeof x.name=="string"&&(A=x.name);let O="";x.desc&&(typeof x.desc=="object"?O=(g=x.desc.zh)!=null?g:x.desc.en:O=x.desc);let H=i[P]||r.getPropertyValue(P).trim()||x.light||"",$=new w.Setting(v).setName(A).setDesc(O||C),j=(h=(u=this.plugin.settings.tokenEnabled)==null?void 0:u[C])!=null?h:!0,oe=null,ae=null;$.settingEl.classList.toggle("is-token-disabled",!j),$.addToggle(E=>E.setValue(j).onChange(async L=>{this.plugin.settings.tokenEnabled||(this.plugin.settings.tokenEnabled={}),this.plugin.settings.tokenEnabled[C]=L,await this.plugin.saveSettings(),this.plugin.refreshDynamicStyles(),this.updatePreviewCard(),oe&&oe.setDisabled(!L),ae&&ae.setDisabled(!L),$.settingEl.classList.toggle("is-token-disabled",!L)}));let _e=$.controlEl.createEl("span",{cls:"pc-color-preview",attr:{style:`background-color: var(${P});`}});$.addColorPicker(E=>{oe=E,E.setValue(H.startsWith("#")?H:x.light||"#8b5cf6").setDisabled(!j),E.onChange(async L=>{this.plugin.settings.customColors||(this.plugin.settings.customColors={}),this.plugin.settings.customColors[P]=L,await this.plugin.saveSettings(),document.documentElement.style.setProperty(P,L),_e.style.backgroundColor=L,ae&&ae.setValue(L),this.updatePreviewCard()})}),$.addText(E=>{ae=E,E.setValue(H).setPlaceholder(x.light||"#8b5cf6").setDisabled(!j),E.onChange(async L=>{/^#[0-9a-fA-F]{6}$/.test(L)&&(this.plugin.settings.customColors||(this.plugin.settings.customColors={}),this.plugin.settings.customColors[P]=L,await this.plugin.saveSettings(),document.documentElement.style.setProperty(P,L),_e.style.backgroundColor=L,oe&&oe.setValue(L),this.updatePreviewCard())})});let Ce=(y=c.get(C))!=null?y:[];if(Ce.length>0){let E=$.settingEl.createDiv({cls:"pc-token-chips"});E.createSpan({cls:"pc-token-chips-label",text:e("settings.tokenRelatedRulesCount").replace("{count}",String(Ce.length))});for(let L of Ce){let K=this.plugin.settings[L],V=E.createEl("span",{cls:`pc-token-chip ${K?"is-enabled":"is-disabled"}`,attr:{role:"button",tabindex:"0","aria-pressed":String(K)}});V.createSpan({text:e(`settings.${L}`)});let Ge=async()=>{let ne=!this.plugin.settings[L];this.plugin.settings[L]=ne,await this.plugin.saveSettings(),this.plugin.refreshEditorExtensions(),this.detectActiveAgentPreset(),this.updatePreviewCard(),V.classList.toggle("is-enabled",ne),V.classList.toggle("is-disabled",!ne),V.setAttribute("aria-pressed",String(ne))};V.addEventListener("click",Ge),V.addEventListener("keydown",ne=>{(ne.key==="Enter"||ne.key===" ")&&(ne.preventDefault(),Ge())})}}}}W(t,e("settings.colorCustom"),e("settings.colorCustomDesc"),"colors",m=>{new w.Setting(m).setName(e("settings.resetColors")).setDesc(e("settings.resetCustomColorsDesc")).addButton(b=>b.setButtonText(e("settings.reset")).setWarning().onClick(async()=>{me(this.containerEl,this.plugin.t.bind(this.plugin),e("confirm.resetTitle"),e("confirm.resetCustomColorsDesc"),async()=>{this.plugin.resetCustomColors(),await this.plugin.saveSettings(),this.plugin.refreshEditorExtensions(),this.display(),new w.Notice(this.plugin.t("notice.colorsReset"))})}))})}renderCollapsibleSection(t,e,s,r,i,n,l,c){let d=t.createDiv({cls:`pc-collapsible ${l?"":"collapsed"}`}),p=d.createDiv({cls:"pc-collapsible-header"}),g=p.createDiv({cls:"pc-collapsible-header-left"});if(g.createSpan({cls:"pc-collapsible-chevron"}),De[r]){let T=g.createSpan({cls:"pc-collapsible-icon"});T.innerHTML=De[r]}let u=g.createDiv({cls:"pc-collapsible-title-wrap"});u.createSpan({cls:"pc-collapsible-title",text:e}),u.createSpan({cls:"pc-collapsible-desc",text:s});let h=p.createDiv({cls:"pc-collapsible-header-right"}),y=i.filter(T=>this.plugin.settings[T]===!0).length,m=h.createSpan({cls:"pc-rule-count-badge"});m.createSpan({cls:"pc-rule-count-active",text:String(y)}),m.createSpan({cls:"pc-rule-count-sep",text:"/"}),m.createSpan({cls:"pc-rule-count-total",text:String(i.length)});let b=h.createDiv({cls:"pc-collapsible-batch"});b.createEl("button",{cls:"pc-batch-btn pc-batch-btn-sm",text:c("batch.enableAll")}).addEventListener("click",async T=>{T.stopPropagation();for(let D of i)this.plugin.settings[D]=!0;await this.plugin.saveSettings(),this.plugin.refreshEditorExtensions(),this.detectActiveAgentPreset(),this.display()}),b.createEl("button",{cls:"pc-batch-btn pc-batch-btn-sm",text:c("batch.disableAll")}).addEventListener("click",async T=>{T.stopPropagation();for(let D of i)this.plugin.settings[D]=!1;await this.plugin.saveSettings(),this.plugin.refreshEditorExtensions(),this.detectActiveAgentPreset(),this.display()}),b.createEl("button",{cls:"pc-batch-btn pc-batch-btn-sm",text:c("batch.reset")}).addEventListener("click",async T=>{T.stopPropagation();for(let D of i)this.plugin.settings[D]=qe[D];await this.plugin.saveSettings(),this.plugin.refreshEditorExtensions(),this.detectActiveAgentPreset(),this.display()}),p.addEventListener("click",()=>{d.toggleClass("collapsed",!d.hasClass("collapsed"))});let R=d.createDiv({cls:"pc-collapsible-content"});for(let T of n){let D=new w.Setting(R).setName(T.label).setDesc(T.desc),I=Zs[T.key],S=null;if(I){let C=this.plugin.getColorByCssClass(I);C&&(S=D.nameEl.createSpan({cls:"pc-rule-color-dot"}),S.style.backgroundColor=C);let x=C.match(/--dsl-([a-zA-Z_][\w-]*)/);if(x){let P=`--dsl-${x[1]}`,A=getComputedStyle(document.documentElement),O=C.startsWith("#")?C:A.getPropertyValue(P).trim()||"#8b5cf6";D.addColorPicker(ie=>{ie.setValue(O),ie.onChange(async H=>{this.plugin.settings.customColors||(this.plugin.settings.customColors={}),this.plugin.settings.customColors[P]=H,await this.plugin.saveSettings(),document.documentElement.style.setProperty(P,H),this.plugin.refreshDynamicStyles(),S&&(S.style.backgroundColor=H),this.updatePreviewCard()})})}}else D.nameEl.createSpan({cls:"pc-rule-color-dot pc-rule-color-dot-none",text:"\u2014"});D.addToggle(C=>C.setValue(this.plugin.settings[T.key]).onChange(async x=>{this.plugin.settings[T.key]=x,await this.plugin.saveSettings(),this.plugin.refreshEditorExtensions(),this.detectActiveAgentPreset(),this.updatePreviewCard()}))}}renderPullReport(t,e){let s=this.plugin.getPullReport(),r=t.createDiv({cls:"pc-pull-report"});if(r.createDiv({cls:"pc-pull-report-header"}).createSpan({text:e("settings.pullReport")}),!s){r.createDiv({cls:"pc-pull-report-empty",text:e("settings.reportNoReport")});return}let n=r.createDiv({cls:"pc-pull-report-overview"}),l=n.createDiv({cls:"pc-report-status-badge"}),c="",d="";s.success?s.hasUpdate?(c=e("settings.reportStatusSuccess"),d="success"):(c=e("settings.reportNoUpdate"),d="no-update"):(c=e("settings.reportStatusFailed"),d="failed"),l.addClass(d),l.createSpan({text:c});let p=n.createDiv({cls:"pc-report-metrics"}),g=[{label:e("settings.reportRemoteVersion"),value:s.remoteVersion||"\u2014"},{label:e("settings.reportLocalVersion"),value:s.localVersion||"\u2014"},{label:e("settings.reportUpdateTime"),value:this.formatTime(s.timestamp)},{label:e("settings.reportDuration"),value:`${s.duration}ms`},{label:e("settings.reportTotalFiles"),value:`${s.successFiles}/${s.totalFiles}`},{label:e("settings.reportTotalRules"),value:String(s.totalRules)}];for(let u of g){let h=p.createDiv({cls:"pc-report-metric-item"});h.createSpan({cls:"pc-report-metric-label",text:u.label}),h.createSpan({cls:"pc-report-metric-value",text:u.value})}if(s.error){let u=r.createDiv({cls:"pc-pull-report-error"});u.createSpan({text:`${e("settings.reportError")}: `}),u.createSpan({text:s.error})}if(s.files.length>0){let u=r.createDiv({cls:"pc-report-section"});u.createDiv({cls:"pc-report-section-title",text:e("settings.reportFiles")});let h=u.createEl("table",{cls:"pc-report-table"}),m=h.createEl("thead").createEl("tr");m.createEl("th",{text:e("settings.reportFile")}),m.createEl("th",{text:e("settings.reportStatus")}),m.createEl("th",{text:e("settings.reportSize")});let b=h.createEl("tbody");for(let v of s.files){let k=b.createEl("tr");k.createEl("td",{text:v.fileName}),k.createEl("td").createSpan({cls:`pc-file-status ${v.success?"success":"failed"}`,text:v.success?e("settings.reportYes"):e("settings.reportNo")}),k.createEl("td",{text:v.success?this.formatSize(v.size):v.error||"\u2014"})}}if(s.categories.length>0){let u=r.createDiv({cls:"pc-report-section"});u.createDiv({cls:"pc-report-section-title",text:e("settings.reportCategories")});let h=u.createEl("table",{cls:"pc-report-table"}),m=h.createEl("thead").createEl("tr");m.createEl("th",{text:e("settings.reportCategory")}),m.createEl("th",{text:e("settings.reportFile")}),m.createEl("th",{text:e("settings.reportCount")}),m.createEl("th",{text:e("settings.reportParsed")});let b=h.createEl("tbody");for(let v of s.categories){let k=b.createEl("tr");k.createEl("td",{text:v.name}),k.createEl("td",{text:v.file}),k.createEl("td",{text:String(v.count)}),k.createEl("td").createSpan({cls:`pc-file-status ${v.parsed?"success":"failed"}`,text:v.parsed?e("settings.reportYes"):e("settings.reportNo")})}}}formatSize(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KB`:`${(t/(1024*1024)).toFixed(1)} MB`}formatTime(t){let e=new Date(t),s=r=>String(r).padStart(2,"0");return`${e.getFullYear()}-${s(e.getMonth()+1)}-${s(e.getDate())} ${s(e.getHours())}:${s(e.getMinutes())}:${s(e.getSeconds())}`}renderStatusBar(t,e){let s=t.createDiv({cls:"pc-status-bar"}),r=this.getRuleStats(),i=this.getVocabTokenStats(),n=s.createDiv({cls:"pc-status-counts"}),l=n.createDiv({cls:"pc-status-count-card pc-status-count-card-rules"}),c=l.createDiv({cls:"pc-status-count-head"});c.createSpan({text:e("status.activeRules")}),c.createSpan({cls:"pc-status-count-num pc-status-count-rules",text:`${r.active}/${r.total}`}),l.createDiv({cls:"pc-status-progress"}).createDiv({cls:"pc-status-progress-fill",attr:{style:`width: ${r.percent}%;`}});let p=n.createDiv({cls:"pc-status-count-card pc-status-count-card-vocabs"}),g=p.createDiv({cls:"pc-status-count-head"});g.createSpan({text:e("status.activeVocabTokens")}),g.createSpan({cls:"pc-status-count-num pc-status-count-vocabs",text:`${i.active}/${i.total}`}),p.createDiv({cls:"pc-status-progress"}).createDiv({cls:"pc-status-progress-fill",attr:{style:`width: ${i.percent}%;`}});let h=s.createDiv({cls:"pc-status-item"});h.createSpan({text:e("status.ruleSource")+": "}),h.createSpan({text:this.plugin.settings.ruleSource,attr:{style:"font-weight: 500;"}});let y=Object.keys(this.plugin.getColorTokens()).length,m=s.createDiv({cls:"pc-status-item"});m.createSpan({text:e("status.tokenCount")+": "}),m.createSpan({text:String(y),attr:{style:"font-weight: 500;"}})}getRuleStats(){let t=Q.filter(s=>this.plugin.settings[s]===!0).length,e=Q.length;return{active:t,total:e,percent:e?Math.round(t/e*100):0}}getVocabTokenStats(){return{active:0,total:0,percent:0}}updateStatusBar(){let t=document.querySelector(".pc-status-bar");if(!t)return;let e=this.getRuleStats(),s=this.getVocabTokenStats(),r=t.querySelector(".pc-status-count-rules");r&&(r.textContent=`${e.active}/${e.total}`);let i=t.querySelector(".pc-status-count-card-rules .pc-status-progress-fill");i&&(i.style.width=`${e.percent}%`);let n=t.querySelector(".pc-status-count-vocabs");n&&(n.textContent=`${s.active}/${s.total}`);let l=t.querySelector(".pc-status-count-card-vocabs .pc-status-progress-fill");l&&(l.style.width=`${s.percent}%`)}async renderPackageManagerBar(t,e){(!this.plugin.loadedPackages||this.plugin.loadedPackages.length===0)&&await this.plugin.reloadPackages();let s=t.createDiv({cls:"pc-agent-section pc-pack-section"}),r=s.createDiv({cls:"pc-agent-header"}),i=r.createDiv({cls:"pc-agent-title-wrap"});i.createSpan({cls:"pc-agent-title",text:"\u5305\u7BA1\u7406"}),i.createSpan({cls:"pc-agent-desc",text:"\u4EE4\u724C/\u89C4\u5219\u7684\u5206\u7EC4\u5BB9\u5668\uFF1A\u7D22\u5F15\u5F15\u7528 + \u5305\u7EA7\u6837\u5F0F\u8986\u76D6\uFF0C\u5355\u9009\u6216\u53E0\u52A0\u542F\u7528"});let n=r.createDiv({cls:"pc-pk-bar-actions"});n.createEl("button",{cls:"pc-agent-new-btn",text:"\u5BFC\u5165\u5305"}).addEventListener("click",()=>rt(this.plugin)),n.createEl("button",{cls:"pc-agent-new-btn",text:"\u4ECE\u8D44\u6E90\u751F\u6210\u5305"}).addEventListener("click",()=>{Kt(this.plugin,async()=>{this.display()})}),n.createEl("button",{cls:"pc-agent-new-btn",text:"\u989C\u8272\u5BFC\u56FE"}).addEventListener("click",()=>void Te(this.app));let p=s.createDiv({cls:"pc-cm-mode-toggle pc-pk-mode-toggle"}),g=p.createEl("button",{cls:"pc-cm-mode-btn",text:"\u5355\u9009\u6A21\u5F0F"}),u=p.createEl("button",{cls:"pc-cm-mode-btn",text:"\u53E0\u52A0\u6A21\u5F0F"});(()=>{let b=this.plugin.settings.packageMode==="multi";g.classList.toggle("is-active",!b),u.classList.toggle("is-active",b)})(),g.addEventListener("click",()=>{this.plugin.settings.packageMode!=="single"&&de(this.plugin,"single").then(()=>this.display())}),u.addEventListener("click",()=>{this.plugin.settings.packageMode!=="multi"&&de(this.plugin,"multi").then(()=>this.display())});let y=s.createDiv({cls:"pc-agent-grid"}),m=this.plugin.pkgManager?this.plugin.pkgManager.sortPackages(this.plugin.loadedPackages):[];if(m.length===0){y.createDiv({cls:"pc-pk-settings-empty",text:"\u6682\u65E0\u5305\u3002\u70B9\u51FB\u300C\u5BFC\u5165\u5305\u300D\u5BFC\u5165 .stylepkg\uFF0C\u6216\u5728 vault \u6839 packages/ \u76EE\u5F55\u521B\u5EFA\u5305\u6587\u4EF6\u5939\u3002"});return}for(let b of m)this.renderPackageManagerCard(y,b,e)}renderPackageManagerCard(t,e,s){var R,T,D,I,S,C,x,P,A;let r=e.manifest,n=((R=this.plugin.settings.enabledPackageIds)!=null?R:[]).includes(e.dirName),l=e.status==="invalid"||e.status==="id-conflict",c=t.createDiv({cls:`pc-agent-card ${n?"active":""} ${l?"pc-pk-card-broken":""}`}),d=c.createDiv({cls:"pc-agent-card-body"}),p=d.createEl("input",{cls:"pc-pk-settings-check",attr:{type:"checkbox"}});p.checked=n,p.disabled=l,p.addEventListener("change",()=>{Le(this.plugin,e.dirName).then(()=>this.display())});let g=d.createSpan({cls:"pc-pk-dot"});g.style.background=(r==null?void 0:r.tagColor)||"#7c8aff";let u=d.createDiv({cls:"pc-agent-card-info"});u.createDiv({cls:"pc-agent-card-name",text:(T=r==null?void 0:r.name)!=null?T:e.dirName});let h=e.status==="id-conflict"?"ID \u51B2\u7A81\uFF0C\u5DF2\u7981\u7528":e.status==="invalid"?`\u65E0\u6548\u5305\uFF1A${(D=e.statusMessage)!=null?D:"package.json \u635F\u574F"}`:e.status==="partial"?`\u90E8\u5206\u5931\u6548\uFF1A${(I=e.statusMessage)!=null?I:"\u7D22\u5F15\u6587\u4EF6\u635F\u574F"}`:(S=r==null?void 0:r.description)!=null?S:"";h&&u.createDiv({cls:"pc-agent-card-desc",text:h});let y=d.createSpan({cls:"pc-agent-card-badge"}),m=(x=(C=e.refTokenIds)==null?void 0:C.length)!=null?x:0,b=(A=(P=e.refRuleIds)==null?void 0:P.length)!=null?A:0;y.createSpan({cls:"pc-agent-card-badge-num",text:`${m}+${b}`}),y.createSpan({cls:"pc-agent-card-badge-label",text:" \u4EE4\u724C+\u89C4\u5219"}),e.isBuiltin&&d.createSpan({cls:"pc-pk-tag is-builtin",text:"\u5185\u7F6E"}),n&&d.createSpan({cls:"pc-agent-card-active",text:"\u5DF2\u542F\u7528"});let v=c.createDiv({cls:"pc-agent-card-actions"});v.createEl("button",{cls:"pc-agent-action-btn",text:"\u5BFC\u51FA"}).addEventListener("click",O=>{O.stopPropagation(),r?st(this.plugin,e):new w.Notice("\u65E0\u6548\u5305\u65E0\u6CD5\u5BFC\u51FA")}),v.createEl("button",{cls:"pc-agent-action-btn",text:"\u590D\u5236"}).addEventListener("click",O=>{O.stopPropagation(),r&&ce(this.app,"\u590D\u5236\u5305\uFF08\u8F7B\u91CF\uFF0C\u5171\u4EAB\u5F15\u7528\uFF09","\u590D\u5236\u5305\u76EE\u5F55\u4E0E\u7D22\u5F15\u6587\u4EF6\uFF0C\u4EC5\u590D\u5236 ID \u5F15\u7528\u3002\u4FEE\u6539\u5E95\u5C42\u4EE4\u724C\u4F1A\u5F71\u54CD\u6240\u6709\u5F15\u7528\u5B83\u7684\u5305\u3002\u786E\u8BA4\u590D\u5236\uFF1F",()=>void Ie(this.plugin,e).then(()=>this.display()))}),e.isBuiltin||(v.createEl("button",{cls:"pc-agent-action-btn",text:"\u514B\u9686"}).addEventListener("click",$=>{$.stopPropagation(),r&&ce(this.app,"\u514B\u9686\u5305\uFF08\u6DF1\u5EA6\u62F7\u8D1D\uFF0C\u72EC\u7ACB\u9694\u79BB\uFF09","\u65B0\u5EFA\u5305\u76EE\u5F55\uFF0C\u5E76\u628A\u5305\u5F15\u7528\u7684\u5168\u90E8\u4EE4\u724C\u751F\u6210\u72EC\u7ACB\u5168\u65B0\u526F\u672C\u3002\u65B0\u65E7\u5305\u6570\u636E\u5B8C\u5168\u9694\u79BB\uFF0C\u4FEE\u6539\u4E92\u4E0D\u5F71\u54CD\uFF08\u89C4\u5219\u672C\u4F53\u5171\u4EAB\uFF09\u3002\u786E\u8BA4\u514B\u9686\uFF1F",()=>void Fe(this.plugin,e).then(()=>this.display()))}),v.createEl("button",{cls:"pc-agent-action-btn",text:s("pack.rename")}).addEventListener("click",$=>{$.stopPropagation(),r&&Se(this.app,r.name,j=>{Ae(this.plugin,e,j).then(()=>this.display())})}),v.createEl("button",{cls:"pc-agent-action-btn pc-agent-action-danger",text:s("pack.delete")}).addEventListener("click",$=>{$.stopPropagation(),r&&ce(this.app,"\u5220\u9664\u5305",`\u4EC5\u5220\u9664 packages/${e.dirName} \u76EE\u5F55\u4E0E\u7D22\u5F15\u6587\u4EF6\uFF0C\u4E0D\u4F1A\u5220\u9664\u5E95\u5C42\u4EE4\u724C\u3001\u89C4\u5219\u672C\u4F53\u3002\u786E\u8BA4\u5220\u9664\uFF1F`,()=>void Be(this.plugin,e).then(()=>this.display()))}))}renderPromptPackBar(t,e){var d;let s=t.createDiv({cls:"pc-agent-section pc-pack-section"}),r=s.createDiv({cls:"pc-agent-header"}),i=r.createDiv({cls:"pc-agent-title-wrap"});i.createSpan({cls:"pc-agent-title",text:e("pack.title")}),i.createSpan({cls:"pc-agent-desc",text:e("pack.desc")}),r.createEl("button",{cls:"pc-agent-new-btn",text:"+ "+e("pack.new")}).addEventListener("click",()=>this.createPromptPackFromCurrent(e));let l=s.createDiv({cls:"pc-agent-grid"}),c=(d=this.plugin.settings.promptPacks)!=null?d:[];for(let p of c)this.renderPromptPackCard(l,p,e)}renderPromptPackCard(t,e,s){let r=this.plugin.settings.activePackId===e.id,i=t.createDiv({cls:`pc-agent-card ${r?"active":""}`,attr:{"data-pack":e.id}}),n=i.createDiv({cls:"pc-agent-card-body"});n.createSpan({cls:"pc-agent-card-icon",text:e.icon||"\u{1F4E6}"});let l=n.createDiv({cls:"pc-agent-card-info"});l.createDiv({cls:"pc-agent-card-name",text:e.name}),e.description&&l.createDiv({cls:"pc-agent-card-desc",text:e.description});let c=n.createSpan({cls:"pc-agent-card-badge"});c.createSpan({cls:"pc-agent-card-badge-num",text:`${e.enabledKeys.length}`}),c.createSpan({cls:"pc-agent-card-badge-label",text:" "+s("pack.rulesVocabCount")}),r&&n.createSpan({cls:"pc-agent-card-active",text:s("pack.active")}),n.addEventListener("click",async()=>{await this.applyPromptPack(e.id),new w.Notice(this.plugin.t("pack.applied"))});let d=i.createDiv({cls:"pc-agent-card-actions"});d.createEl("button",{cls:"pc-agent-action-btn",text:s("pack.rename"),attr:{"aria-label":s("pack.rename")}}).addEventListener("click",g=>{g.stopPropagation(),this.renamePromptPack(e.id,s)}),e.builtin?d.createEl("button",{cls:"pc-agent-action-btn",text:s("pack.reset"),attr:{"aria-label":s("pack.reset")}}).addEventListener("click",u=>{u.stopPropagation(),this.resetPromptPack(e.id)}):d.createEl("button",{cls:"pc-agent-action-btn pc-agent-action-danger",text:s("pack.delete"),attr:{"aria-label":s("pack.delete")}}).addEventListener("click",u=>{u.stopPropagation(),this.deletePromptPack(e.id,s)})}async applyPromptPack(t){var l,c,d;let e=this.plugin.settings.promptPacks.find(p=>p.id===t);if(!e)return;let s=this.plugin.settings;for(let p of Q)s[p]=!1;for(let p of e.enabledKeys)Q.includes(p)&&(s[p]=!0);s.colorScheme=e.colorScheme,s.palettePreset=(l=e.palettePreset)!=null?l:"",s.activePackId=t;let r=Q.filter(p=>s[p]===!0).map(String),i=new Set(r),n=((c=s.agentPresets)!=null?c:[]).find(p=>p.enabledKeys.length===i.size&&p.enabledKeys.every(g=>i.has(g)));s.activeAgentPresetId=(d=n==null?void 0:n.id)!=null?d:"",await this.plugin.saveSettings(),this.plugin.refreshEditorExtensions(),this.plugin.applyColorMode(),this.display()}resetPromptPack(t){let e=Pt.find(r=>r.id===t);if(!e)return;let s=this.plugin.settings.promptPacks.findIndex(r=>r.id===t);s<0||(this.plugin.settings.promptPacks[s]={...e},this.plugin.saveSettings().then(()=>{this.display(),new w.Notice(this.plugin.t("pack.resetDone"))}))}createPromptPackFromCurrent(t){new fe(this.app,t("pack.new"),t("pack.namePrompt"),t("pack.descPrompt"),"","",(e,s)=>{var l,c;if(!e){new w.Notice(this.plugin.t("pack.nameRequired"));return}let r=this.plugin.settings,i=Q.filter(d=>r[d]===!0).map(String),n={id:`pack-${Date.now()}`,name:e,description:s,icon:"\u{1F4E6}",direction:"image",enabledKeys:i,colorScheme:(l=r.colorScheme)!=null?l:"default",palettePreset:(c=r.palettePreset)!=null?c:"",builtin:!1};r.promptPacks.push(n),r.activePackId=n.id,this.plugin.saveSettings().then(()=>{this.display(),new w.Notice(this.plugin.t("pack.created"))})}).open()}renamePromptPack(t,e){let s=this.plugin.settings.promptPacks.find(r=>r.id===t);s&&new fe(this.app,e("pack.rename"),e("pack.namePrompt"),e("pack.descPrompt"),s.name,s.description,(r,i)=>{if(!r){new w.Notice(this.plugin.t("pack.nameRequired"));return}s.name=r,s.description=i,this.plugin.saveSettings().then(()=>{this.display(),new w.Notice(this.plugin.t("pack.renamed"))})}).open()}deletePromptPack(t,e){let s=this.plugin.settings,r=s.promptPacks.find(i=>i.id===t);!r||r.builtin||me(this.containerEl,this.plugin.t.bind(this.plugin),e("pack.confirmDeleteTitle"),e("pack.confirmDeleteDesc"),async()=>{s.promptPacks=s.promptPacks.filter(i=>i.id!==t),s.activePackId===t&&(s.activePackId=""),await this.plugin.saveSettings(),this.display(),new w.Notice(this.plugin.t("pack.deleted"))})}renderAgentPresetBar(t,e){var d;let s=t.createDiv({cls:"pc-agent-section"}),r=s.createDiv({cls:"pc-agent-header"}),i=r.createDiv({cls:"pc-agent-title-wrap"});i.createSpan({cls:"pc-agent-title",text:e("agent.title")}),i.createSpan({cls:"pc-agent-desc",text:e("agent.desc")}),r.createEl("button",{cls:"pc-agent-new-btn",text:"+ "+e("agent.new")}).addEventListener("click",()=>this.createAgentPresetFromCurrent(e));let l=s.createDiv({cls:"pc-agent-grid"}),c=(d=this.plugin.settings.agentPresets)!=null?d:[];for(let p of c)this.renderAgentCard(l,p,e)}renderAgentCard(t,e,s){let r=this.plugin.settings.activeAgentPresetId===e.id,i=t.createDiv({cls:`pc-agent-card ${r?"active":""}`,attr:{"data-agent":e.id}}),n=i.createDiv({cls:"pc-agent-card-body"});n.createSpan({cls:"pc-agent-card-icon",text:e.icon||"\u2726"});let l=n.createDiv({cls:"pc-agent-card-info"});l.createDiv({cls:"pc-agent-card-name",text:e.name}),e.description&&l.createDiv({cls:"pc-agent-card-desc",text:e.description});let c=e.enabledKeys.length,d=n.createSpan({cls:"pc-agent-card-badge"});d.createSpan({cls:"pc-agent-card-badge-num",text:String(c)}),d.createSpan({cls:"pc-agent-card-badge-label",text:" "+s("agent.rulesCount")}),r&&n.createSpan({cls:"pc-agent-card-active",text:s("agent.active")}),n.addEventListener("click",async()=>{await this.applyAgentPreset(e.id),new w.Notice(this.plugin.t("agent.applied"))});let p=i.createDiv({cls:"pc-agent-card-actions"});p.createEl("button",{cls:"pc-agent-action-btn",text:s("agent.rename"),attr:{"aria-label":s("agent.rename")}}).addEventListener("click",h=>{h.stopPropagation(),this.renameAgentPreset(e.id,s)}),p.createEl("button",{cls:"pc-agent-action-btn pc-agent-action-danger",text:s("agent.delete"),attr:{"aria-label":s("agent.delete")}}).addEventListener("click",h=>{h.stopPropagation(),this.deleteAgentPreset(e.id,s)})}async applyAgentPreset(t){let e=this.plugin.settings.agentPresets.find(i=>i.id===t);if(!e)return;let s=this.plugin.settings;for(let i of Q)s[i]=!1;let r=Q;for(let i of e.enabledKeys)r.includes(i)&&(s[i]=!0);s.activeAgentPresetId=t,await this.plugin.saveSettings(),this.plugin.refreshEditorExtensions(),this.display()}detectActiveAgentPreset(){var n,l;let t=this.plugin.settings,e=Q.filter(c=>t[c]===!0).map(c=>String(c)),s=new Set(e),r=((n=t.agentPresets)!=null?n:[]).find(c=>c.enabledKeys.length!==s.size?!1:c.enabledKeys.every(d=>s.has(d))),i=(l=r==null?void 0:r.id)!=null?l:"";i!==t.activeAgentPresetId&&(t.activeAgentPresetId=i,this.plugin.saveSettings(),document.querySelectorAll(".pc-agent-card").forEach(c=>{let d=c;d.toggleClass("active",d.dataset.agent===i)}))}createAgentPresetFromCurrent(t){new fe(this.app,t("agent.new"),t("agent.namePrompt"),t("agent.descPrompt"),"","",(e,s)=>{if(!e){new w.Notice(this.plugin.t("agent.nameRequired"));return}let r=Q.filter(n=>this.plugin.settings[n]===!0).map(n=>String(n)),i={id:`agent-${Date.now()}`,name:e,description:s,icon:"\u2727",enabledKeys:r};this.plugin.settings.agentPresets.push(i),this.plugin.settings.activeAgentPresetId=i.id,this.plugin.saveSettings().then(()=>{this.display(),new w.Notice(this.plugin.t("agent.created"))})}).open()}renameAgentPreset(t,e){let s=this.plugin.settings.agentPresets.find(r=>r.id===t);s&&new fe(this.app,e("agent.rename"),e("agent.namePrompt"),e("agent.descPrompt"),s.name,s.description,(r,i)=>{if(!r){new w.Notice(this.plugin.t("agent.nameRequired"));return}s.name=r,s.description=i,this.plugin.saveSettings().then(()=>{this.display(),new w.Notice(this.plugin.t("agent.renamed"))})}).open()}deleteAgentPreset(t,e){this.plugin.settings.agentPresets.find(r=>r.id===t)&&me(this.containerEl,this.plugin.t.bind(this.plugin),e("agent.confirmDeleteTitle"),e("agent.confirmDeleteDesc"),async()=>{this.plugin.settings.agentPresets=this.plugin.settings.agentPresets.filter(r=>r.id!==t),this.plugin.settings.activeAgentPresetId===t&&(this.plugin.settings.activeAgentPresetId=""),await this.plugin.saveSettings(),this.display(),new w.Notice(this.plugin.t("agent.deleted"))})}renderPreviewCard(t,e){W(t,e("preview.title"),e("preview.desc"),"display",s=>{let r=s.createDiv({cls:"pc-preview-input-wrap"});r.createDiv({cls:"pc-preview-label",text:e("preview.inputLabel")});let i=r.createEl("textarea",{cls:"pc-preview-input",attr:{rows:"5",placeholder:e("preview.placeholder")}}),n=this.previewText||ve.PREVIEW_SAMPLE;i.value=n,this.previewText=n;let l=s.createDiv({cls:"pc-preview-output-wrap"});l.createDiv({cls:"pc-preview-label",text:e("preview.outputLabel")});let c=l.createDiv({cls:"pc-preview-sample"}),d=()=>{let p=i.value;this.previewText=p;let g=this.plugin.highlightTextToHtml(p);if(!g||g.trim().length===0){c.empty(),c.createDiv({cls:"pc-preview-empty",text:e("preview.empty")});return}c.innerHTML=g};i.addEventListener("input",d),d()})}updatePreviewCard(){let t=document.querySelector(".pc-preview-sample");if(!t)return;let e=this.previewText||ve.PREVIEW_SAMPLE,s=this.plugin.highlightTextToHtml(e);t.innerHTML=s||""}};ve.TOKEN_GROUPS=[{titleKey:"settings.tokenGroupBasic",descKey:"settings.tokenGroupBasicDesc",tokens:["danger","success","warning","info","purple","cyan","pink","amber","orange","paren"],defaultExpanded:!0},{titleKey:"settings.tokenGroupExtended",descKey:"settings.tokenGroupExtendedDesc",tokens:["indigo","emerald","slate","darkslate","yellow"],defaultExpanded:!1},{titleKey:"settings.tokenGroupMultimodal",descKey:"settings.tokenGroupMultimodalDesc",tokens:["music"],defaultExpanded:!1}],ve.PREVIEW_SAMPLE=["<system>\u4F60\u662F\u8D44\u6DF1\u63D0\u793A\u8BCD\u5DE5\u7A0B\u5E08</system>","<user>\u8BF7\u4E3A {{\u4E3B\u9898}} \u8BBE\u8BA1\u5206\u955C\uFF1A</user>","\u3010\u6574\u4F53\u8BBE\u5B9A\u3011\u955C\u59341\uFF083\u79D2\uFF09\u63A8\u955C\u5934\u5165\u573A\uFF0C\u300C\u5979\u8F6C\u8EAB\u5FAE\u7B11\u300D\u3002","\u666F\u522B\uFF1A\u7279\u5199  \u8FD0\u955C\uFF1A\u63A8  \u5149\u5F71\uFF1A3200K","\u6392\u9664\uFF1A\u4F4E\u4FD7\u3001\u6A21\u7CCA\uFF1B<lora:film-grain:0.8> (masterpiece:1.3)"].join(`
`);var at=ve;var lt=require("@codemirror/state"),be=require("@codemirror/view");function Bi(a){return a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Oi(a){let o=a.text;if(!o)return null;let t=Bi(o),e;a.wholeWord?e=`(?<![\\w\\u4e00-\\u9fff\\u3400-\\u4dbf])${t}(?![\\w\\u4e00-\\u9fff\\u3400-\\u4dbf])`:e=t;let s=a.caseSensitive?"g":"gi";try{return new RegExp(e,s)}catch(r){console.warn("[PromptColorizer] \u81EA\u5B9A\u4E49\u989C\u8272\u89C4\u5219\u6B63\u5219\u7F16\u8BD1\u5931\u8D25\uFF0C\u964D\u7EA7\u5904\u7406:",r);try{return new RegExp(t,s)}catch(i){return null}}}function nt(a,o,t){if(!t||!o||o.length===0)return[];let e=[],s=a.length;for(let i of o){if(!i.enabled||!i.text)continue;let n=Oi(i);if(!n)continue;let l;for(n.lastIndex=0;(l=n.exec(a))!==null;){let c=l.index,d=c+l[0].length;if(c===d||c>=s){l[0]===""&&n.lastIndex++;continue}e.push({from:Math.max(0,c),to:Math.min(s,d),cssClass:`dsl-custom-text-${i.id}`,priority:1e3,block:!1,ruleId:`custom-text-${i.id}`}),l[0]===""&&n.lastIndex++}}if(e.sort((i,n)=>i.from-n.from),e.length===0)return[];let r=[];for(let i of e){let n=r[r.length-1];if(n&&n.to>i.from&&n.from<=i.from){n.cssClass===i.cssClass&&n.to<i.to&&(n.to=i.to);continue}r.push({...i})}return r}function er(a,o,t){for(let e of t)if(a<e.to&&e.from<o)return!0;return!1}function tr(a){if(!a||a.length===0)return"";let o=[];for(let t of a){if(!t.id||!t.color)continue;let e=X(t),s={color:t.color,...Ye(e,t.color,t.effectParams)};Je(s,e,t.color),Qe(s,t.color,t.color2,t.gradientStops,t.gradientAngle),o.push(fs(`dsl-custom-text-${t.id}`,s))}return o.join(`
`)}function sr(a,o){if(!a||!o||o.length===0)return[];let t=[];for(let e of o){if(!e.enabled||!e.text)continue;let s=e.text;e.caseSensitive?a===s&&t.push(e.id):a.toLowerCase()===s.toLowerCase()&&t.push(e.id)}return t}function ct(a,o,t){var l;if(!o)return[];o.setContextEnabled(t.contextSemanticEnabled);let e=o.match(a,null),s=o.getTokenIdScope(),r=(l=t.customTextColors)!=null?l:[];s&&(r=r.filter(c=>s.has(c.id)));let i=nt(a,r,!0),n;return i.length>0?n=[...e.filter(d=>!er(d.from,d.to,i)),...i].sort((d,p)=>d.from-p.from):n=e,Yt(n,t)}function Yt(a,o){return a.filter(t=>{let e=Ze[t.cssClass];return e?o[e]!==!1:!0})}function rr(a,o,t){let e=new lt.RangeSetBuilder;if(!t.editorHighlightEnabled||!o)return e.finish();let s=a.state.doc.toString(),r=ct(s,o,t);for(let i of r){let n=s.length,l=Math.max(0,Math.min(i.from,n)),c=Math.max(l,Math.min(i.to,n));if(l!==c)try{if(i.block){let d=a.state.doc.lineAt(l).number,p=a.state.doc.lineAt(c).number;for(let g=d;g<=p;g++){let u=a.state.doc.line(g);e.add(u.from,u.from,be.Decoration.line({class:i.cssClass}))}}else e.add(l,c,be.Decoration.mark({class:i.cssClass,attributes:i.refIndex?{"data-ref":i.refIndex}:void 0}))}catch(d){continue}}return e.finish()}function $i(a,o){return be.ViewPlugin.fromClass(class{constructor(t){this.decorations=rr(t,o,a)}update(t){(t.docChanged||t.viewportChanged)&&(this.decorations=rr(t.view,o,a))}},{decorations:t=>t.decorations})}function Ni(a,o,t){return(0,be.hoverTooltip)((e,s)=>{var u,h;if(!t.editorHighlightEnabled||!o||e.state.doc.length===0)return null;let i=e.state.doc.toString(),l=ct(i,o,t).find(y=>y.from<=s&&s<=y.to&&!y.block);if(!l)return null;let c="",d="";if(l.ruleId.startsWith("custom-text-")){let y=l.ruleId.slice(12),m=((u=t.customTextColors)!=null?u:[]).find(b=>b.id===y);c=(h=m==null?void 0:m.note)!=null?h:"",d="\u81EA\u5B9A\u4E49\u7740\u8272"}else c=it(a,l.ruleId),d=l.cssClass;if(!c)return null;let p=document.createElement("div");return p.className="pc-annotation-tooltip",p.createEl("div",{cls:"pc-annotation-tooltip-label"}).createSpan({text:d}),p.createEl("div",{cls:"pc-annotation-tooltip-text",text:c}),{pos:l.from,end:l.to,create:()=>({dom:p}),above:!0}})}function Jt(a,o=null,t){let e=[];return a.editorHighlightEnabled&&(e.push(lt.Prec.high($i(a,o))),t&&e.push(Ni(t,o,a))),e}var or=require("obsidian"),zi={system:{zh:"\u7CFB\u7EDF",en:"SYS"},user:{zh:"\u7528\u6237",en:"USR"},assistant:{zh:"\u52A9\u624B",en:"AST"},tool:{zh:"\u5DE5\u5177",en:"TOL"},example:{zh:"\u793A\u4F8B",en:"EX"},variable:{zh:"\u53D8\u91CF",en:"VAR"},template:{zh:"\u6A21\u677F",en:"TPL"},video:{zh:"\u89C6\u9891",en:"VID"},none:{zh:"",en:""}};function dt(a,o,t){var e,s;if(t.detectByFrontmatter){let r=a.metadataCache.getFileCache(o),i=(e=r==null?void 0:r.frontmatter)==null?void 0:e.type;if(i){let l=i.toLowerCase().trim();if(Hi(l))return l}let n=(s=r==null?void 0:r.frontmatter)==null?void 0:s.tags;if(n){let l=Array.isArray(n)?n:[n];for(let c of l){let d=String(c).toLowerCase().replace(/^#/,"");if(d==="system-prompt"||d==="system")return"system";if(d==="user-prompt"||d==="user")return"user";if(d==="assistant-prompt"||d==="assistant")return"assistant";if(d==="tool-prompt"||d==="tool")return"tool";if(d==="example"||d==="few-shot")return"example";if(d==="variable"||d==="variables")return"variable";if(d==="template")return"template";if(d==="video-prompt"||d==="video"||d==="storyboard")return"video"}}}if(t.detectByFolder){let r=o.path.toLowerCase(),i=[...t.folderMappings].sort((n,l)=>l.path.length-n.path.length);for(let n of i){let l=n.path.toLowerCase();if(r===l||r.startsWith(l+"/"))return n.type}}if(t.detectByFilename){let r=o.basename.toLowerCase();if(r.startsWith("sys-")||r.startsWith("system-"))return"system";if(r.startsWith("user-"))return"user";if(r.startsWith("assistant-")||r.startsWith("ast-"))return"assistant";if(r.startsWith("tool-")||r.startsWith("tol-"))return"tool";if(r.startsWith("example-")||r.startsWith("few-shot-"))return"example";if(r.startsWith("var-")||r.startsWith("variable-"))return"variable";if(r.startsWith("template-")||r.startsWith("tpl-"))return"template";if(r.startsWith("video-")||r.startsWith("vid-")||r.startsWith("shot-"))return"video"}return"none"}function Hi(a){return["system","user","assistant","tool","example","variable","template","video","none"].includes(a)}function pt(a,o){return o.fileTypeColors.find(t=>t.type===a)}function Gi(a,o){var e,s;let t=zi[a];return t&&(s=(e=t.zh)!=null?e:t.en)!=null?s:""}function ir(a,o){let t=parseInt(a.slice(1,3),16),e=parseInt(a.slice(3,5),16),s=parseInt(a.slice(5,7),16);return`rgba(${t}, ${e}, ${s}, ${o})`}function Xt(a,o){if(!o.fileColorizerEnabled)return;let t=a.workspace.getLeavesOfType("file-explorer");for(let e of t){let s=e.view.containerEl;if(!s)continue;s.querySelectorAll(".tree-item-self").forEach(i=>{var u,h,y;let n=i,l=n.dataset.pcProcessed==="true",c=!!n.querySelector(".pc-file-type-badge");if(l&&c)return;n.querySelectorAll(".pc-file-type-badge").forEach(m=>m.remove());let d=n.closest(".tree-item"),p=(u=d==null?void 0:d.dataset)==null?void 0:u.path,g=null;if(p){let m=a.vault.getAbstractFileByPath(p);m instanceof or.TFile&&(g=m)}if(!g){let m=n.querySelector(".tree-item-inner");if(!m)return;let b=m.textContent||"";g=(h=a.vault.getMarkdownFiles().find(k=>k.basename===b))!=null?h:null}if(g){let m=dt(a,g,o),b=pt(m,o);if(b&&m!=="none"){n.dataset.pcProcessed="true",n.dataset.pcType=m;let v=n.querySelector(".tree-item-inner");if(!v)return;let k=Gi(m,o.language);if(k){let _=n.createEl("span",{cls:"pc-file-type-badge",text:k});_.style.color=b.color,_.style.backgroundColor=ir(b.color,.08),_.style.border=`1px solid ${ir(b.color,.15)}`,(y=v.parentElement)==null||y.insertBefore(_,v.nextSibling)}}}})}}function Zt(a){let o=a.workspace.getLeavesOfType("file-explorer");for(let t of o){let e=t.view.containerEl;e&&(e.querySelectorAll(".pc-file-type-badge").forEach(s=>s.remove()),e.querySelectorAll("[data-pc-processed]").forEach(s=>{let r=s;r.removeAttribute("data-pc-processed"),r.removeAttribute("data-pc-type")}))}}function ar(a,o,t){var i;if(!o||!t.fileColorizerEnabled)return;let e=dt(a,o,t),s=pt(e,t);if(!s||e==="none")return;let r=a.workspace.getLeavesOfType("markdown");for(let n of r)if(((i=n.getViewState().state)==null?void 0:i.file)===o.path){let l=n.tabHeaderEl;if(!l)continue;if(!l.querySelector(".pc-tab-indicator")){let c=l.createEl("span",{cls:"pc-tab-indicator"});c.style.borderBottomColor=s.color}}}var Qt=new Set,ke=null;function es(){for(let a of Qt)a.disconnect();Qt.clear(),ke!==null&&(clearTimeout(ke),ke=null)}function nr(a,o,t=80){var s;es();let e=()=>{ke!==null&&clearTimeout(ke),ke=setTimeout(()=>{ke=null,o()},t)};for(let r of a.workspace.getLeavesOfType("file-explorer")){let i=r.view.containerEl;if(!i)continue;let n=(s=i.querySelector(".nav-files-container"))!=null?s:i,l=new MutationObserver(()=>e());l.observe(n,{childList:!0,subtree:!0}),Qt.add(l)}}function lr(a,o=null){return(t,e)=>{a.readerModeEnabled&&(Wi(t,a),ji(t,a),Vi(t,a),qi(t,a),Ui(t,a),Ki(t,a),o&&Yi(t,a,o),Qi(t,a,o),Ji(t,a))}}function Wi(a,o){if(!o.highlightCodeBlocks&&!o.highlightJsonBlocks)return;a.querySelectorAll("pre > code").forEach(e=>{var i,n,l,c;let s=e;((n=(i=s.className.match(/language-(\w+)/))==null?void 0:i[1])==null?void 0:n.toLowerCase())==="json"&&o.highlightJsonBlocks?(l=s.parentElement)==null||l.addClass("pc-reader-codeblock-json"):o.highlightCodeBlocks&&((c=s.parentElement)==null||c.addClass("pc-reader-codeblock"))})}function ji(a,o){if(!o.highlightInlineCode)return;a.querySelectorAll("code:not(pre > code)").forEach(e=>{let s=e,r=s.textContent||"";/^\{\{[^}]+\}\}$/.test(r)||/^\$\{[^}]+\}$/.test(r)?s.addClass("pc-reader-variable"):s.addClass("pc-reader-inline-code")})}function Vi(a,o){if(!o.highlightRoleHeaders)return;a.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(e=>{var i;let s=e,r=((i=s.textContent)==null?void 0:i.toLowerCase().trim())||"";r==="system"||r==="\u7CFB\u7EDF"?s.addClass("pc-reader-role-system"):r==="user"||r==="\u7528\u6237"?s.addClass("pc-reader-role-user"):r==="assistant"||r==="\u52A9\u624B"||r==="ai"?s.addClass("pc-reader-role-assistant"):(r==="tool"||r==="\u5DE5\u5177")&&s.addClass("pc-reader-role-tool")})}function qi(a,o){if(!o.highlightRoleTags)return;let t=document.createTreeWalker(a,NodeFilter.SHOW_TEXT,{acceptNode:r=>{let i=r.textContent||"";return/<\/?(system|user|assistant|tool)>/i.test(i)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),e=[],s;for(;s=t.nextNode();)e.push(s);for(let r of e){let i=r.textContent||"",n=r.parentElement;if(!n)continue;let l=document.createDocumentFragment(),c=0,d=/<(\/?)(system|user|assistant|tool)>/gi,p;for(;(p=d.exec(i))!==null;){p.index>c&&l.appendChild(document.createTextNode(i.slice(c,p.index)));let g=document.createElement("span"),u=p[2].toLowerCase(),h=p[1]==="/";g.className=`pc-reader-role-tag pc-reader-role-${u}${h?"-close":"-open"}`,g.textContent=p[0],l.appendChild(g),c=p.index+p[0].length}c<i.length&&l.appendChild(document.createTextNode(i.slice(c))),n.replaceChild(l,r)}}function Ui(a,o){if(!o.highlightComments)return;let t=document.createTreeWalker(a,NodeFilter.SHOW_TEXT,{acceptNode:r=>{let i=r.textContent||"";return/%%[\s\S]*?%%/.test(i)||/<!--[\s\S]*?-->/.test(i)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),e=[],s;for(;s=t.nextNode();)e.push(s);for(let r of e){let i=r.textContent||"",n=r.parentElement;if(!n)continue;let l=document.createDocumentFragment(),c=0,d=/%%([\s\S]*?)%%/g,p;for(;(p=d.exec(i))!==null;){p.index>c&&l.appendChild(document.createTextNode(i.slice(c,p.index)));let g=document.createElement("span");g.className="pc-reader-comment",g.textContent=p[0],l.appendChild(g),c=p.index+p[0].length}c<i.length&&l.appendChild(document.createTextNode(i.slice(c))),n.replaceChild(l,r)}}function Ki(a,o){if(!o.highlightInstructionMarkers)return;let t=document.createTreeWalker(a,NodeFilter.SHOW_TEXT,{acceptNode:r=>{let i=r.parentElement;if(!i||i.closest("code")||i.closest("pre"))return NodeFilter.FILTER_REJECT;let n=r.textContent||"";return/\[\/?(INST|SYS)\]/i.test(n)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),e=[],s;for(;s=t.nextNode();)e.push(s);for(let r of e){let i=r.textContent||"",n=r.parentElement;if(!n)continue;let l=document.createDocumentFragment(),c=0,d=/(\[\/?(?:INST|SYS)\])/gi,p;for(;(p=d.exec(i))!==null;){p.index>c&&l.appendChild(document.createTextNode(i.slice(c,p.index)));let g=document.createElement("span"),u=p[0].includes("/");g.className=u?"pc-reader-instruction-close":"pc-reader-instruction-open",g.textContent=p[0],l.appendChild(g),c=p.index+p[0].length}c<i.length&&l.appendChild(document.createTextNode(i.slice(c))),n.replaceChild(l,r)}}function Yi(a,o,t){t.setContextEnabled(o.contextSemanticEnabled);let e=document.createTreeWalker(a,NodeFilter.SHOW_TEXT,{acceptNode:i=>{let n=i.parentElement;return!n||n.closest("code")||n.closest("pre")||n.closest('[class*="pc-reader-"]')?NodeFilter.FILTER_REJECT:(i.textContent||"").trim().length===0?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT}}),s=[],r;for(;r=e.nextNode();)s.push(r);for(let i of s){let n=i.textContent||"",l=i.parentElement;if(!l)continue;let c=Yt(t.match(n),o);if(c.length===0)continue;let d=document.createDocumentFragment(),p=0;for(let g of c){let u=Math.max(0,Math.min(g.from,n.length)),h=Math.max(u,Math.min(g.to,n.length));if(u===h)continue;u>p&&d.appendChild(document.createTextNode(n.slice(p,u)));let y=document.createElement("span");y.className=g.cssClass,g.refIndex&&y.setAttribute("data-ref",g.refIndex),y.textContent=n.slice(u,h),d.appendChild(y),p=h}p<n.length&&d.appendChild(document.createTextNode(n.slice(p))),l.replaceChild(d,i)}}function Ji(a,o){if(!o.highlightVariables)return;let t=document.createTreeWalker(a,NodeFilter.SHOW_TEXT,{acceptNode:r=>{let i=r.parentElement;if(!i||i.closest("code")||i.closest("pre"))return NodeFilter.FILTER_REJECT;let n=r.textContent||"";return/\{\{[^}]+\}\}|\$\{[^}]+\}|<\|[^|]+\|>/.test(n)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),e=[],s;for(;s=t.nextNode();)e.push(s);for(let r of e){let i=r.textContent||"",n=r.parentElement;if(!n)continue;let l=document.createDocumentFragment(),c=0,d=/(\{\{[^}]+\}\}|\$\{[^}]+\}|<\|[^|]+\|>)/g,p;for(;(p=d.exec(i))!==null;){p.index>c&&l.appendChild(document.createTextNode(i.slice(c,p.index)));let g=document.createElement("span");g.className="pc-reader-variable",g.textContent=p[0],l.appendChild(g),c=p.index+p[0].length}c<i.length&&l.appendChild(document.createTextNode(i.slice(c))),n.replaceChild(l,r)}}function Qi(a,o,t=null){var n;if(!o.customTextColors||o.customTextColors.length===0)return;let e=(n=t==null?void 0:t.getTokenIdScope())!=null?n:null;if(e&&(o.customTextColors=o.customTextColors.filter(l=>e.has(l.id)),o.customTextColors.length===0))return;let s=document.createTreeWalker(a,NodeFilter.SHOW_TEXT,{acceptNode:l=>{let c=l.parentElement;return!c||c.closest("code")||c.closest("pre")||c.closest('[class*="pc-reader-"]')||c.closest('[class*="dsl-"]')?NodeFilter.FILTER_REJECT:(l.textContent||"").trim().length===0?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT}}),r=[],i;for(;i=s.nextNode();)r.push(i);for(let l of r){let c=l.textContent||"",d=l.parentElement;if(!d)continue;let p=nt(c,o.customTextColors,!0);if(p.length===0)continue;let g=document.createDocumentFragment(),u=0;for(let h of p){let y=Math.max(0,Math.min(h.from,c.length)),m=Math.max(y,Math.min(h.to,c.length));if(y===m)continue;y>u&&g.appendChild(document.createTextNode(c.slice(u,y)));let b=document.createElement("span");b.className=h.cssClass,b.textContent=c.slice(y,m),g.appendChild(b),u=m}u<c.length&&g.appendChild(document.createTextNode(c.slice(u))),d.replaceChild(g,l)}}var xe=require("obsidian");Y();var se=[{name:"\u7EA2",value:"#ef4444"},{name:"\u6A59",value:"#f97316"},{name:"\u9EC4",value:"#eab308"},{name:"\u7EFF",value:"#10b981"},{name:"\u9752",value:"#06b6d4"},{name:"\u84DD",value:"#3b82f6"},{name:"\u7D2B",value:"#8b5cf6"},{name:"\u7C89",value:"#ec4899"},{name:"\u68D5",value:"#92400e"},{name:"\u7070",value:"#6b7280"},{name:"\u6DF1",value:"#1f2937"},{name:"\u6D45",value:"#9ca3af"}];function Xi(){return"c"+Date.now().toString(36)+Math.random().toString(36).slice(2,8)}function ss(a,o,t,e){let s=new ts(a,o,t,r=>{e(r),s.close()});s.open()}var ts=class extends xe.Modal{constructor(t,e,s,r){var i,n,l,c,d,p,g,u;super(t);this.gradientTrackEl=null;this.gradientThumbLayerEl=null;this.angleSliderEl=null;this.angleValueEl=null;this.previewEl=null;this.previewHexEl=null;this.colorInput=null;this.hexInput=null;this.selectedStopIndex=0;this.gradientSelectedInfoEl=null;this.gradientDeleteBtnEl=null;this.stopPaletteEl=null;this.stopSwatchEls=[];this.stopColorInput=null;this.stopHexInput=null;this.effectParamsEl=null;this.selectedText=e,this.existing=s,this.currentColor=(i=s==null?void 0:s.color)!=null?i:se[5].value,this.currentColor2=(n=s==null?void 0:s.color2)!=null?n:"",this.gradientStops=(l=s==null?void 0:s.gradientStops)!=null&&l.length?s.gradientStops.map(h=>({...h})):this.currentColor2&&Re(this.currentColor2)?[{color:this.currentColor,position:0},{color:this.currentColor2,position:100}]:[],this.gradientAngle=(c=s==null?void 0:s.gradientAngle)!=null?c:135,this.currentEffects=X(s!=null?s:{}),this.effectParams=s!=null&&s.effectParams?JSON.parse(JSON.stringify(s.effectParams)):{},this.currentEffect=(d=this.currentEffects[0])!=null?d:"none",this.caseSensitive=(p=s==null?void 0:s.caseSensitive)!=null?p:!1,this.wholeWord=(g=s==null?void 0:s.wholeWord)!=null?g:!1,this.currentCategory=(u=s==null?void 0:s.category)!=null?u:"\u672A\u5206\u7C7B",this.onConfirmCb=r}onOpen(){let{contentEl:t,titleEl:e}=this;t.empty(),t.addClass("pc-color-picker-modal"),e.setText(f("customText.modalTitle")),this.renderPreview(t);let s=this.renderPresetPalette(t);this.renderCustomColor(s),this.renderGradientEditor(t),this.renderEffectOptions(t),this.renderMatchOptions(t),this.renderCategorySelector(t),this.renderActions(t),this.registerKeybindings(),setTimeout(()=>{let r=t.querySelector(".pc-cp-main-palette .pc-cp-swatch");r&&r.focus()},0)}registerKeybindings(){this.contentEl.addEventListener("keydown",t=>{var e;if(t.key==="Enter"&&!t.shiftKey){let s=t.target,r=((e=s.getAttribute)==null?void 0:e.call(s,"role"))||"",i=s.tagName||"";if(r==="button"||i==="BUTTON"||i==="INPUT"&&s.getAttribute("type")!=="text")return;t.preventDefault(),this.confirmApply();return}if(t.key==="Tab"){let s=Array.from(this.contentEl.querySelectorAll(".pc-cp-main-palette .pc-cp-swatch"));if(s.length===0)return;let r=s.findIndex(n=>n===document.activeElement);if(r===-1)return;t.preventDefault();let i=t.shiftKey?(r-1+s.length)%s.length:(r+1)%s.length;s[i].focus();return}if(t.key==="ArrowRight"||t.key==="ArrowLeft"){let s=Array.from(this.contentEl.querySelectorAll(".pc-cp-main-palette .pc-cp-swatch"));if(s.length===0)return;let r=s.findIndex(l=>l===document.activeElement);if(r===-1)return;t.preventDefault();let i=t.key==="ArrowRight"?(r+1)%s.length:(r-1+s.length)%s.length;s[i].focus();let n=s[i].getAttribute("data-color");n&&(this.currentColor=n,this.updatePreview(),this.updatePaletteSelection(),this.updateCustomColorInputs());return}})}confirmApply(){let t=this.selectedText.trim();t&&this.onConfirmCb({text:t,color:this.currentColor,color2:this.currentColor2,gradientStops:this.gradientStops.map(e=>({...e})),gradientAngle:this.gradientAngle,caseSensitive:this.caseSensitive,wholeWord:this.wholeWord,effect:this.currentEffect,effects:[...this.currentEffects],effectParams:this.snapshotEffectParams(),category:this.currentCategory})}renderPreview(t){let e=t.createDiv({cls:"pc-cp-section"});e.createEl("div",{cls:"pc-cp-label",text:f("customText.preview")});let s=e.createDiv({cls:"pc-cp-preview"});this.previewEl=s.createSpan({cls:"pc-cp-preview-text"}),this.previewEl.setText(this.selectedText||f("customText.noSelection"));let r=s.createDiv({cls:"pc-cp-preview-hex",attr:{role:"button",tabindex:"0",title:f("customText.copyHex")}});r.setText(this.currentColor),r.addEventListener("click",()=>this.copyHexBadge(r)),r.addEventListener("keydown",i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),i.stopPropagation(),this.copyHexBadge(r))}),this.previewHexEl=r,this.updatePreview()}copyHexBadge(t){var s;let e=this.currentColor;(s=navigator.clipboard)==null||s.writeText(e).then(()=>{t.setText(f("customText.copied")),t.addClass("copied"),window.setTimeout(()=>{t.setText(this.currentColor),t.removeClass("copied")},900)})}renderPresetPalette(t){let e=t.createDiv({cls:"pc-cp-section"});e.createEl("div",{cls:"pc-cp-label",text:f("customText.colorSection")});let s=e.createDiv({cls:"pc-cp-palette pc-cp-main-palette"});for(let r of se){let i=s.createDiv({cls:`pc-cp-swatch ${this.currentColor.toLowerCase()===r.value.toLowerCase()?"active":""}`,attr:{"data-color":r.value,"aria-label":r.name,title:`${r.name} ${r.value}`,role:"button",tabindex:"0"}});i.style.backgroundColor=r.value,i.createEl("span",{cls:"pc-cp-swatch-check"}),i.addEventListener("click",()=>{this.currentColor=r.value,this.updatePreview(),this.updatePaletteSelection(),this.updateCustomColorInputs()}),i.addEventListener("keydown",n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),n.stopPropagation(),this.currentColor=r.value,this.updatePreview(),this.updatePaletteSelection(),this.updateCustomColorInputs())})}return e}renderCustomColor(t){let e=t.createDiv({cls:"pc-cp-custom-row"});this.colorInput=e.createEl("input",{cls:"pc-cp-color-input",attr:{type:"color","aria-label":f("customText.customColor")}}),this.colorInput.value=this.normalizeHex(this.currentColor),this.colorInput.addEventListener("input",()=>{this.currentColor=this.colorInput.value,this.updatePreview(),this.updatePaletteSelection(),this.hexInput&&(this.hexInput.value=this.currentColor)}),this.hexInput=e.createEl("input",{cls:"pc-cp-hex-input",attr:{type:"text",placeholder:"#3b82f6",spellcheck:"false","aria-label":f("customText.hexValue")}}),this.hexInput.value=this.currentColor,this.hexInput.addEventListener("input",()=>{let s=this.hexInput.value.trim();(/^#[0-9a-fA-F]{6}$/.test(s)||/^#[0-9a-fA-F]{3}$/.test(s))&&(this.currentColor=s,this.colorInput&&(this.colorInput.value=this.normalizeHex(s)),this.updatePreview(),this.updatePaletteSelection())})}renderGradientEditor(t){let e=t.createDiv({cls:"pc-cp-section pc-cp-gradient-section"});new xe.Setting(e).setName(f("customText.gradientTitle")).setDesc(f("customText.gradientDesc")).addToggle(r=>r.setTooltip(f("customText.gradientToggle")).setValue(this.gradientStops.length>=2).onChange(i=>{i&&this.gradientStops.length<2?this.gradientStops=[{color:this.currentColor,position:0},{color:se[6].value,position:100}]:i||(this.gradientStops=[]),this.updatePreview();let n=e.querySelector(".pc-cp-gradient-editor");this.gradientStops.length>=2&&n&&!this.gradientTrackEl?this.buildGradientEditorDom(n):this.gradientStops.length===0&&(n&&n.empty(),this.gradientTrackEl=null,this.gradientThumbLayerEl=null,this.angleSliderEl=null,this.angleValueEl=null,this.gradientSelectedInfoEl=null,this.gradientDeleteBtnEl=null,this.stopPaletteEl=null,this.stopSwatchEls=[],this.stopColorInput=null,this.stopHexInput=null)}));let s=e.createDiv({cls:"pc-cp-gradient-editor"});this.gradientStops.length!==0&&(this.gradientStops.length===1&&this.gradientStops.push({color:se[6].value,position:100}),this.buildGradientEditorDom(s))}buildGradientEditorDom(t){t.empty();let e=t.createDiv({cls:"pc-cp-gradient-angle"});this.angleSliderEl=e.createEl("input",{cls:"pc-cp-gradient-angle-slider",attr:{type:"range",min:"0",max:"360",step:"1"}}),this.angleSliderEl.value=String(this.gradientAngle),this.angleValueEl=e.createSpan({cls:"pc-cp-gradient-angle-value"}),this.angleValueEl.setText(`${this.gradientAngle}\xB0`),this.angleSliderEl.addEventListener("input",()=>{var d;this.gradientAngle=parseInt(this.angleSliderEl.value,10)||0,(d=this.angleValueEl)==null||d.setText(`${this.gradientAngle}\xB0`),this.updatePreview()});let s=t.createDiv({cls:"pc-cp-gradient-track-wrap"});this.gradientTrackEl=s.createDiv({cls:"pc-cp-gradient-track"}),this.gradientThumbLayerEl=s.createDiv({cls:"pc-cp-gradient-thumbs"});let r=t.createDiv({cls:"pc-cp-gradient-ops"}),i=r.createEl("button",{cls:"pc-cp-gradient-add",attr:{type:"button"}});i.setText("+"),i.setAttribute("aria-label",f("customText.gradientAddStop")),i.addEventListener("click",()=>{let d=this.gradientStops.length===0?50:Math.round(this.nearestGapMiddle()*100)/100;this.gradientStops.push({color:se[Math.floor(Math.random()*12)].value,position:Math.min(100,Math.max(0,d))}),this.syncStopsSorted(),this.updatePreview(),this.rerenderGradientEditor()});let n=r.createSpan({cls:"pc-cp-gradient-selected-info"}),l=r.createEl("button",{cls:"pc-cp-gradient-delete",attr:{type:"button"}});l.setText("\u2212"),l.setAttribute("aria-label",f("customText.gradientDeleteStop")),l.addEventListener("click",()=>{this.selectedStopIndex>=0&&this.gradientStops.length>2&&(this.gradientStops.splice(this.selectedStopIndex,1),this.selectedStopIndex=Math.min(this.selectedStopIndex,this.gradientStops.length-1),this.updatePreview(),this.rerenderGradientEditor())});let c=r.createEl("button",{cls:"pc-cp-gradient-reset",attr:{type:"button"}});c.setText("\u21BA"),c.setAttribute("aria-label",f("customText.gradientReset")),c.addEventListener("click",()=>this.resetGradient()),this.gradientSelectedInfoEl=n,this.gradientDeleteBtnEl=l,this.renderGradientTrack(),this.renderGradientThumbs(),this.updateGradientOpsState(),this.buildStopPaletteDom(t)}nearestGapMiddle(){let t=[...this.gradientStops].sort((i,n)=>i.position-n.position);if(t.length===0)return 50;let e=-1,s=50,r=0;for(let i of t){let n=i.position-r;n>e&&(e=n,s=r+n/2),r=i.position}return 100-r>e&&(s=r+(100-r)/2),s}syncStopsSorted(){let t=this.gradientStops[this.selectedStopIndex];this.gradientStops.sort((e,s)=>e.position-s.position),t?this.selectedStopIndex=Math.max(0,this.gradientStops.indexOf(t)):this.selectedStopIndex=0}resetGradient(){this.gradientStops=[{color:this.currentColor,position:0},{color:se[6].value,position:100}],this.gradientAngle=135,this.selectedStopIndex=0,this.angleSliderEl&&(this.angleSliderEl.value="135"),this.angleValueEl&&this.angleValueEl.setText("135\xB0"),this.updatePreview(),this.rerenderGradientEditor()}renderGradientTrack(){if(!this.gradientTrackEl)return;let t=ee(Z(this.gradientStops));this.gradientTrackEl.style.background=t?`linear-gradient(90deg, ${t})`:"var(--background-modifier-border)"}renderGradientThumbs(){if(!this.gradientThumbLayerEl)return;this.gradientThumbLayerEl.empty();let t=[...this.gradientStops].sort((e,s)=>e.position-s.position);for(let e=0;e<t.length;e++){let s=t[e],r=e===this.selectedStopIndex,i=this.gradientThumbLayerEl.createDiv({cls:`pc-cp-gradient-thumb ${r?"selected":""}`,attr:{role:"slider",tabindex:"0","aria-label":f("customText.gradientStopAria"),"aria-valuenow":String(Math.round(s.position)),"data-index":String(e),title:`${s.color} \xB7 ${Math.round(s.position)}%`}});i.style.left=`${s.position}%`,i.style.background=s.color,i.addEventListener("pointerdown",n=>{n.preventDefault(),this.selectedStopIndex=e,this.refreshThumbSelection(),this.updateGradientOpsState();let l=n.clientX,c=!1,d=!1,p=u=>{if(!d){if(Math.abs(u.clientX-l)<3)return;d=!0,this.beginThumbDrag(i,s,n)}},g=u=>{window.removeEventListener("pointermove",p),window.removeEventListener("pointerup",g),d||this.showStopPalette()};window.addEventListener("pointermove",p),window.addEventListener("pointerup",g)}),i.addEventListener("keydown",n=>{let l=n.shiftKey?5:1;n.key==="ArrowLeft"||n.key==="ArrowRight"?(n.preventDefault(),s.position=Math.min(100,Math.max(0,s.position+(n.key==="ArrowLeft"?-l:l))),this.syncStopsSorted(),this.updatePreview(),this.rerenderGradientEditor()):(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),this.showStopPalette())})}}beginThumbDrag(t,e,s){let i=this.gradientThumbLayerEl.getBoundingClientRect();if(!i.width)return;t.setCssStyles({transition:"none"}),t.addClass("dragging");let n=c=>{let d=(c.clientX-i.left)/i.width;e.position=Math.round(Math.min(100,Math.max(0,d*100))*100)/100,t.style.left=`${e.position}%`,t.setAttribute("aria-valuenow",String(Math.round(e.position))),t.setAttribute("title",`${e.color} \xB7 ${Math.round(e.position)}%`),this.renderGradientTrack(),this.updatePreview()},l=()=>{t.removeClass("dragging"),t.setCssStyles({transition:""}),window.removeEventListener("pointermove",n),window.removeEventListener("pointerup",l),this.syncStopsSorted(),this.rerenderGradientEditor()};window.addEventListener("pointermove",n),window.addEventListener("pointerup",l)}buildStopPaletteDom(t){let e=t.createDiv({cls:"pc-cp-gradient-stop-palette"});e.setAttribute("hidden",""),e.createDiv({cls:"pc-cp-gradient-stop-palette-label",text:f("customText.gradientStopPalette")});let s=e.createDiv({cls:"pc-cp-palette"});this.stopSwatchEls=[];for(let i of se){let n=s.createDiv({cls:"pc-cp-swatch",attr:{"data-color":i.value,"aria-label":i.name,title:`${i.name} ${i.value}`,role:"button",tabindex:"0"}});n.style.backgroundColor=i.value,n.createEl("span",{cls:"pc-cp-swatch-check"});let l=()=>this.applyColorToSelectedStop(i.value);n.addEventListener("click",l),n.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),c.stopPropagation(),l())}),this.stopSwatchEls.push(n)}let r=e.createDiv({cls:"pc-cp-custom-row"});this.stopColorInput=r.createEl("input",{cls:"pc-cp-color-input",attr:{type:"color","aria-label":f("customText.customColor")}}),this.stopColorInput.addEventListener("input",()=>{this.applyColorToSelectedStop(this.stopColorInput.value)}),this.stopHexInput=r.createEl("input",{cls:"pc-cp-hex-input",attr:{type:"text",placeholder:"#3b82f6",spellcheck:"false","aria-label":f("customText.hexValue")}}),this.stopHexInput.addEventListener("input",()=>{let i=this.stopHexInput.value.trim();(/^#[0-9a-fA-F]{6}$/.test(i)||/^#[0-9a-fA-F]{3}$/.test(i))&&this.applyColorToSelectedStop(i)}),this.stopPaletteEl=e,this.updateStopPalette()}showStopPalette(){this.stopPaletteEl&&(this.stopPaletteEl.removeAttribute("hidden"),this.updateStopPalette())}updateStopPalette(){let t=this.gradientStops[this.selectedStopIndex];if(!this.stopPaletteEl||!t)return;let e=t.color.toLowerCase();for(let s of this.stopSwatchEls){let r=(s.getAttribute("data-color")||"").toLowerCase();s.classList.toggle("active",r===e)}this.stopColorInput&&document.activeElement!==this.stopColorInput&&(this.stopColorInput.value=this.normalizeHex(t.color)),this.stopHexInput&&document.activeElement!==this.stopHexInput&&(this.stopHexInput.value=t.color)}applyColorToSelectedStop(t){let e=this.gradientStops[this.selectedStopIndex];e&&(e.color=t,this.updatePreview(),this.rerenderGradientEditor())}refreshThumbSelection(){this.gradientThumbLayerEl&&this.gradientThumbLayerEl.querySelectorAll(".pc-cp-gradient-thumb").forEach(t=>{let e=parseInt(t.getAttribute("data-index")||"-1",10);t.classList.toggle("selected",e===this.selectedStopIndex)})}updateGradientOpsState(){let t=this.selectedStopIndex,e=this.gradientStops[t];this.gradientSelectedInfoEl&&this.gradientSelectedInfoEl.setText(e?`${e.color} \xB7 ${Math.round(e.position)}%`:f("customText.gradientNoSelection")),this.gradientDeleteBtnEl&&(this.gradientDeleteBtnEl.disabled=this.gradientStops.length<=2)}rerenderGradientEditor(){this.renderGradientTrack(),this.renderGradientThumbs(),this.updateGradientOpsState(),this.updateStopPalette()}renderEffectOptions(t){let e=t.createDiv({cls:"pc-cp-section"});e.createEl("div",{cls:"pc-cp-label",text:f("customText.effect")}),e.createDiv({cls:"pc-cp-effects-hint"}).setText(f("customText.effectComposableHint"));let r=e.createDiv({cls:"pc-cp-effects-chips"});for(let i of Ke){let n=this.currentEffects.includes(i.value),l=r.createDiv({cls:`pc-cp-effect-chip ${n?"active":""}`,attr:{role:"button",tabindex:"0","aria-pressed":String(n),"data-effect":i.value,title:f(i.labelKey)},text:f(i.labelKey)});l.addEventListener("click",()=>this.toggleEffect(i.value)),l.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),c.stopPropagation(),this.toggleEffect(i.value))})}this.effectParamsEl=e.createDiv({cls:"pc-cp-fx-panel"}),this.rerenderEffectParams()}toggleEffect(t){var s;let e=this.currentEffects.indexOf(t);if(e>=0)this.currentEffects.splice(e,1),delete this.effectParams[t];else{this.currentEffects.push(t);let r=Ue.get(t);r&&r.params&&r.params.length>0&&!this.effectParams[t]&&(this.effectParams[t]=ms(r))}this.currentEffect=(s=this.currentEffects[0])!=null?s:"none",this.refreshEffectChips(),this.rerenderEffectParams(),this.updatePreview()}snapshotEffectParams(){return JSON.parse(JSON.stringify(this.effectParams))}rerenderEffectParams(){if(!this.effectParamsEl)return;this.effectParamsEl.empty();let t=this.currentEffects.map(e=>Ue.get(e)).filter(e=>!!e&&!!e.params&&e.params.length>0);if(t.length!==0)for(let e of t){let s=this.effectParamsEl.createDiv({cls:"pc-cp-fx-group"});s.createDiv({cls:"pc-cp-fx-group-title",text:f(e.labelKey)});for(let r of e.params)this.renderParamSlider(s,e.value,r)}}renderParamSlider(t,e,s){var p,g;let r=(g=((p=this.effectParams[e])!=null?p:{})[s.id])!=null?g:s.def,i=t.createDiv({cls:"pc-cp-fx-row"});i.createSpan({cls:"pc-cp-fx-label",text:f(s.labelKey)});let n=i.createEl("input",{cls:"pc-cp-fx-slider",attr:{type:"range",min:String(s.min),max:String(s.max),step:String(s.step)}});n.value=String(r);let l=i.createSpan({cls:"pc-cp-fx-value"}),c=u=>{var h;return l.setText(`${Number.isInteger(s.step)?Math.round(u):Math.round(u*100)/100}${(h=s.unit)!=null?h:""}`)};c(r);let d=u=>{this.effectParams[e]||(this.effectParams[e]={}),this.effectParams[e][s.id]=u,c(u),this.updatePreview()};n.addEventListener("input",()=>{let u=parseFloat(n.value);Number.isFinite(u)&&d(u)})}refreshEffectChips(){this.contentEl.querySelectorAll(".pc-cp-effect-chip").forEach(e=>{let s=e,r=this.currentEffects.includes(s.getAttribute("data-effect"));s.classList.toggle("active",r),s.setAttribute("aria-pressed",String(r))})}renderMatchOptions(t){let e=t.createDiv({cls:"pc-cp-section"});e.createEl("div",{cls:"pc-cp-label",text:f("customText.matchOptions")});let s=e.createDiv({cls:"pc-cp-match-row"});this.renderMatchCheckbox(s,f("customText.caseSensitive"),this.caseSensitive,r=>{this.caseSensitive=r}),this.renderMatchCheckbox(s,f("customText.wholeWord"),this.wholeWord,r=>{this.wholeWord=r})}renderCategorySelector(t){let e=t.createDiv({cls:"pc-cp-section"});e.createEl("div",{cls:"pc-cp-label",text:"\u8D44\u6E90\u5206\u7C7B"});let s=e.createEl("input",{cls:"pc-cp-category-input",attr:{type:"text",list:"pc-token-categories",value:this.currentCategory,placeholder:"\u9009\u62E9\u6216\u8F93\u5165\u5206\u7C7B"}}),r=e.createEl("datalist",{attr:{id:"pc-token-categories"}});for(let i of le)r.createEl("option",{attr:{value:i}});s.addEventListener("input",()=>{this.currentCategory=s.value.trim()||"\u672A\u5206\u7C7B"})}renderMatchCheckbox(t,e,s,r){let i=t.createEl("label",{cls:"pc-cp-match-item"}),n=i.createEl("input",{cls:"pc-cp-match-checkbox",attr:{type:"checkbox"}});n.checked=s,n.addEventListener("change",()=>r(n.checked)),i.createSpan({cls:"pc-cp-match-label",text:e})}renderActions(t){let e=t.createDiv({cls:"pc-cp-actions"});new xe.ButtonComponent(e).setButtonText(f("customText.cancel")).onClick(()=>{this.close()});let s=new xe.ButtonComponent(e).setButtonText(f("customText.confirm")).setCta().onClick(()=>{let r=this.selectedText.trim();r&&this.onConfirmCb({text:r,color:this.currentColor,color2:this.currentColor2,gradientStops:this.gradientStops.map(i=>({...i})),gradientAngle:this.gradientAngle,caseSensitive:this.caseSensitive,wholeWord:this.wholeWord,effect:this.currentEffect,effects:[...this.currentEffects],effectParams:this.snapshotEffectParams(),category:this.currentCategory})});this.selectedText.trim()||s.setDisabled(!0)}updatePreview(){if(!this.previewEl)return;let t=this.previewEl,e=["text-shadow","font-weight","font-style","text-decoration","text-decoration-thickness","background","background-image","padding","border-radius","font-family","font-variant","letter-spacing","vertical-align","font-size","text-transform","-webkit-text-stroke","-webkit-text-fill-color","filter","background-clip","-webkit-background-clip"];for(let r of e)t.style.setProperty(r,"");let s=Ye(this.currentEffects,this.currentColor,this.effectParams);Je(s,this.currentEffects,this.currentColor),Qe(s,this.currentColor,this.currentColor2,this.gradientStops,this.gradientAngle),t.style.color=this.currentColor;for(let[r,i]of Object.entries(s))t.style.setProperty(r,i);this.previewHexEl&&this.previewHexEl.setText(this.currentColor)}updatePaletteSelection(){this.contentEl.querySelectorAll(".pc-cp-swatch").forEach(e=>{if(e.closest(".pc-cp-gradient-stop-palette"))return;let s=e;(s.getAttribute("data-color")||"").toLowerCase()===this.currentColor.toLowerCase()?s.addClass("active"):s.removeClass("active")})}updateCustomColorInputs(){this.colorInput&&(this.colorInput.value=this.normalizeHex(this.currentColor)),this.hexInput&&(this.hexInput.value=this.currentColor)}normalizeHex(t){let e=t.trim().toLowerCase();return/^#[0-9a-f]{6}$/.test(e)?e:/^#[0-9a-f]{3}$/.test(e)?"#"+e.slice(1).split("").map(s=>s+s).join(""):"#3b82f6"}onClose(){this.contentEl.empty()}};function cr(a){return{id:Xi(),text:a.text,color:a.color,color2:a.color2||"",gradientStops:a.gradientStops.map(o=>({...o})),gradientAngle:a.gradientAngle,enabled:!0,caseSensitive:a.caseSensitive,wholeWord:a.wholeWord,effect:a.effect,effects:[...a.effects],effectParams:a.effectParams?JSON.parse(JSON.stringify(a.effectParams)):{},category:a.category}}var Ne=null;function dr(a,o,t){if(ze(),!t.selectedText||t.selectedText.trim().length===0)return;let e=o,s=e.coordsAtPos(o.getCursor("from")),r=e.coordsAtPos(o.getCursor("to"));if(!s||!r)return;let i=window.scrollX,n=window.scrollY,l={left:Math.min(s.left,r.left),right:Math.max(s.right,r.right),top:Math.min(s.top,r.top),bottom:Math.max(s.bottom,r.bottom)},c=(l.left+l.right)/2+i,d=l.bottom+n+8;Ne=new rs(a,t,{x:c,y:d}),Ne.show()}function ze(){Ne&&(Ne.hide(),Ne=null)}var rs=class{constructor(o,t,e){this.el=null;this.hideHandlers=[];this.app=o,this.options=t,this.position=e}show(){if(this.el)return;let o=document.body.createDiv({cls:"pc-color-popover"});if(this.el=o,this.options.existing){let r=o.createDiv({cls:"pc-popover-hint"});r.createEl("span",{cls:"pc-popover-hint-dot",attr:{style:`background-color: ${this.options.existing.color}`}}),r.createSpan({text:f("customText.popoverExisting")})}let t=o.createDiv({cls:"pc-popover-palette"});for(let r of se){let i=this.options.existing&&this.options.existing.color.toLowerCase()===r.value.toLowerCase(),n=t.createDiv({cls:`pc-popover-swatch ${i?"active":""}`,attr:{"data-color":r.value,"aria-label":r.name,title:`${r.name} ${r.value}`,role:"button",tabindex:"0"}});n.style.backgroundColor=r.value,n.createEl("span",{cls:"pc-popover-swatch-check"}),n.addEventListener("click",l=>{l.stopPropagation(),this.options.onApplyColor(r.value),this.hide()}),n.addEventListener("keydown",l=>{(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),l.stopPropagation(),this.options.onApplyColor(r.value),this.hide())})}o.createDiv({cls:"pc-popover-divider"});let e=o.createDiv({cls:"pc-popover-actions"}),s=e.createEl("button",{cls:"pc-popover-action pc-popover-advanced",attr:{"aria-label":f("customText.popoverMore"),title:f("customText.popoverMoreDesc")}});if(s.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',s.addEventListener("click",r=>{r.stopPropagation(),this.options.onOpenAdvanced(),this.hide()}),this.options.existing){let r=e.createEl("button",{cls:"pc-popover-action pc-popover-remove",attr:{"aria-label":f("customText.popoverRemove"),title:f("customText.popoverRemoveDesc")}});r.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',r.addEventListener("click",i=>{i.stopPropagation(),this.options.onRemove(),this.hide()})}this.positionEl(),requestAnimationFrame(()=>{o.addClass("pc-popover-visible")}),this.registerHideHandlers()}hide(){if(!this.el)return;for(let{event:t,handler:e,target:s}of this.hideHandlers)s.removeEventListener(t,e);this.hideHandlers=[],this.el.removeClass("pc-popover-visible"),this.el.addClass("pc-popover-hiding");let o=this.el;this.el=null,setTimeout(()=>{o.remove()},180)}positionEl(){if(!this.el)return;this.el.style.visibility="hidden",this.el.style.display="block";let o=this.el.getBoundingClientRect(),t=o.width,e=o.height,s=window.innerWidth,r=window.innerHeight,i=window.scrollX,n=window.scrollY,l=this.position.x-t/2,c=this.position.y,d=8;l<i+d&&(l=i+d),l+t>i+s-d&&(l=i+s-d-t);let p=r-(this.position.y-n),g=this.position.y-n-8,u=!1;p<e+d&&g>e+d&&(c=this.position.y-16-e,u=!0),this.el.style.left=`${l}px`,this.el.style.top=`${c}px`,this.el.style.visibility="",this.el.style.display="",u?this.el.addClass("pc-popover-above"):this.el.addClass("pc-popover-below")}registerHideHandlers(){let o=r=>{this.el&&!this.el.contains(r.target)&&this.hide()};document.addEventListener("pointerdown",o,!0),this.hideHandlers.push({event:"pointerdown",handler:o,target:document});let t=r=>{r.key==="Escape"&&(r.preventDefault(),r.stopPropagation(),this.hide())};document.addEventListener("keydown",t,!0),this.hideHandlers.push({event:"keydown",handler:t,target:document});let e=()=>this.hide();window.addEventListener("scroll",e,!0),this.hideHandlers.push({event:"scroll",handler:e,target:window});let s=()=>this.hide();window.addEventListener("resize",s),this.hideHandlers.push({event:"resize",handler:s,target:window})}};function pr(a,o,t){let e=o.getSelection(),s=e&&e.trim().length>0;a.addItem(r=>{r.setTitle(f("customText.menuSeparator")).setIcon("palette").setSection("prompt-colorizer").setDisabled(!0)}),a.addItem(r=>{r.setTitle(f("customText.menuApply")).setIcon("droplet").setSection("prompt-colorizer").setDisabled(!s).onClick(()=>{t.onApply()})}),a.addItem(r=>{r.setTitle(f("customText.menuOpenPicker")).setIcon("settings-2").setSection("prompt-colorizer").setDisabled(!s).onClick(()=>{t.onOpenPicker()})}),a.addItem(r=>{r.setTitle(f("customText.menuRemove")).setIcon("trash").setSection("prompt-colorizer").setDisabled(!s).onClick(()=>{t.onRemove()})})}var mr=require("obsidian");Y();var re="packages",gr="tokens/token_index.json",ur="rules/rule_index.json",ut="\u672A\u5206\u7C7B";function gt(a){try{let o=JSON.parse(a);return o&&typeof o=="object"?o:null}catch(o){return null}}function hr(a){let o=(a||ut).replace(/[\\/:*?"<>|#^[\]]/g,"_").trim();return`${o.length>0?o:ut}.json`}var ht=class{constructor(o,t,e,s){this.app=o;this.getSettings=t;this.resolveRuleDef=e;this.getKnownRuleIds=s}async userDirExists(){try{return await this.app.vault.adapter.exists(re)}catch(o){return!1}}async listUserPackageDirs(){let o=this.app.vault.adapter;try{return await o.exists(re)?(await o.list(re)).folders.map(e=>{var s;return(s=e.replace(/\/$/,"").split("/").pop())!=null?s:""}).filter(e=>e.length>0&&!e.startsWith(".")).sort():[]}catch(t){return[]}}async readUserPackage(o){let t=this.app.vault.adapter,e=`${re}/${o}`,s={dirName:o,dirPath:e,manifest:null,refTokenIds:[],refRuleIds:[],embeddedTokens:[],embeddedRules:[],isBuiltin:!1,status:"ok"};try{let n=`${e}/package.json`;if(await t.exists(n)){let l=gt(await t.read(n));l&&typeof l.packageId=="string"&&l.packageId.length>0?s.manifest={...l,type:"user"}:(s.status="invalid",s.statusMessage="package.json \u683C\u5F0F\u975E\u6CD5")}else s.status="invalid",s.statusMessage="\u7F3A\u5C11 package.json"}catch(n){s.status="invalid",s.statusMessage=`package.json \u8BFB\u53D6\u5931\u8D25: ${n instanceof Error?n.message:String(n)}`}let r=await this.scanCategoryDir(`${e}/tokens`),i=await this.scanCategoryDir(`${e}/rules`);return s.embeddedTokens=r||[],s.embeddedRules=i||[],s.refTokenIds=r?r.map(n=>n.id):null,s.refRuleIds=i?i.map(n=>n.id):null,(s.refTokenIds===null||s.refRuleIds===null)&&(s.status=s.status==="invalid"?"invalid":"partial",s.status==="partial"&&!s.statusMessage&&(s.statusMessage=s.refTokenIds===null?"tokens/ \u5206\u7C7B\u6587\u4EF6\u635F\u574F":"rules/ \u5206\u7C7B\u6587\u4EF6\u635F\u574F")),s}async scanCategoryDir(o){let t=this.app.vault.adapter;try{if(!await t.exists(o))return[];let e=await t.list(o),s=[];for(let r of e.files){if(!r.endsWith(".json"))continue;let i=gt(await t.read(r));if(!Array.isArray(i))return null;for(let n of i)n&&typeof n=="object"&&typeof n.id=="string"&&s.push(n)}return s}catch(e){return null}}async loadAll(){var s,r;let o=[],t=new Set,e=await this.listUserPackageDirs();for(let i of e){let n=await this.detectLegacyRefs(`${re}/${i}`);n&&await this.migrateLegacyPackage(i,n);let l=await this.readUserPackage(i),c=(r=(s=l.manifest)==null?void 0:s.packageId)!=null?r:i;t.has(c)?(l.status=l.status==="invalid"?"invalid":"id-conflict",l.statusMessage=`\u5305 ID\u300C${c}\u300D\u4E0E\u5DF2\u6709\u5305\u91CD\u590D\uFF0C\u5DF2\u7981\u7528`):t.add(c),o.push(l)}return{packages:o}}async detectLegacyRefs(o){let t=this.app.vault.adapter;try{let e=await t.exists(`${o}/${gr}`),s=await t.exists(`${o}/${ur}`);if(!e&&!s)return null;let r=e?await this.readRefIndex(`${o}/${gr}`,"refTokenIds"):[],i=s?await this.readRefIndex(`${o}/${ur}`,"refRuleIds"):[];return{tokenIds:r!=null?r:[],ruleIds:i!=null?i:[]}}catch(e){return null}}async migrateLegacyPackage(o,t){var c,d;let e=this.app.vault.adapter,s=`${re}/${o}`,i=((c=this.getSettings().customTextColors)!=null?c:[]).filter(p=>t.tokenIds.includes(p.id)).map(p=>structuredClone(p)),n=[];for(let p of t.ruleIds){let g=(d=this.resolveRuleDef)==null?void 0:d.call(this,p);g&&n.push(g)}let l=null;try{let p=`${s}/package.json`;if(await e.exists(p)){let g=gt(await e.read(p));g&&typeof g.packageId=="string"&&g.packageId.length>0&&(l=g)}}catch(p){l=null}await this.writePackage(o,l!=null?l:this.fallbackManifest(o),i,n)}fallbackManifest(o){return{packageId:o,name:o,tagColor:"#7c8aff",description:"",version:"1.0.0",specVersion:z,type:"user",usageTag:"",previewSampleText:""}}async readRefIndex(o,t){let e=this.app.vault.adapter;try{if(!await e.exists(o))return[];let s=gt(await e.read(o));if(!s)return null;let r=s[t];return Array.isArray(r)?r.filter(i=>typeof i=="string"):[]}catch(s){return null}}sortPackages(o){var s;let t=(s=this.getSettings().packageOrder)!=null?s:[],e=new Map(t.map((r,i)=>[r,i]));return[...o].sort((r,i)=>{let n=e.has(r.dirName)?e.get(r.dirName):t.length,l=e.has(i.dirName)?e.get(i.dirName):t.length;return n!==l?n-l:0})}getAvailablePackages(o){return o.filter(t=>t.manifest&&(t.status==="ok"||t.status==="partial"))}getEnabledPackages(o){var i,n;let t=this.getSettings(),e=(i=t.packageMode)!=null?i:"single",s=new Set((n=t.enabledPackageIds)!=null?n:[]),r=this.sortPackages(this.getAvailablePackages(o)).filter(l=>s.has(l.dirName));return e==="single"?r.slice(0,1):r}collectEnabledRefIds(o){var s,r;let t=new Set,e=new Set;for(let i of o){for(let n of(s=i.refTokenIds)!=null?s:[])t.add(n);for(let n of(r=i.refRuleIds)!=null?r:[])e.add(n)}return{tokenIds:t,ruleIds:e}}collectAllRefIds(o){var s,r;let t=new Set,e=new Set;for(let i of o){for(let n of(s=i.refTokenIds)!=null?s:[])t.add(n);for(let n of(r=i.refRuleIds)!=null?r:[])e.add(n)}return{tokenIds:t,ruleIds:e}}mergeTokenOverrides(o){var e,s;let t={};for(let r=o.length-1;r>=0;r--){let i=(e=o[r].manifest)==null?void 0:e.tokenOverrides;if(i)for(let[n,l]of Object.entries(i)){if(!l||typeof l!="object")continue;let c=(s=t[n])!=null?s:t[n]={};typeof l.color=="string"&&(c.color=l.color),typeof l.fontStyle=="string"&&(c.fontStyle=l.fontStyle)}}return t}mergeRuleOverrides(o){var e,s;let t={};for(let r=o.length-1;r>=0;r--){let i=(e=o[r].manifest)==null?void 0:e.ruleOverrides;if(i)for(let[n,l]of Object.entries(i)){if(!l||typeof l!="object")continue;let c=(s=t[n])!=null?s:t[n]={};typeof l.bgColor=="string"&&(c.bgColor=l.bgColor),typeof l.border=="string"&&(c.border=l.border),typeof l.color=="string"&&(c.color=l.color)}}return t}async mkdirp(o){let t=this.app.vault.adapter,e=o.split("/").filter(Boolean),s="";for(let r of e)s=s?`${s}/${r}`:r,await t.exists(s)||await t.mkdir(s)}async clearJsonFiles(o){let t=this.app.vault.adapter;try{if(!await t.exists(o))return;let e=await t.list(o);for(let s of e.files)s.endsWith(".json")&&await t.remove(s)}catch(e){}}async writePackage(o,t,e,s){var p,g,u,h;let r=this.app.vault.adapter,i=`${re}/${o}`;e.length>0&&await this.mkdirp(`${i}/tokens`),await this.mkdirp(`${i}/rules`);let n={...t,packageId:o,specVersion:t.specVersion||z};await r.write(`${i}/package.json`,JSON.stringify(n,null,2)),await this.clearJsonFiles(`${i}/tokens`),await this.clearJsonFiles(`${i}/rules`);let l=this.getSettings(),c=new Map;for(let y of e){if(!(y!=null&&y.id))continue;let m=y.category||ut;((p=c.get(m))!=null?p:(c.set(m,[]),c.get(m))).push(y)}let d=new Map;for(let y of s){if(!(y!=null&&y.id))continue;let m=((u=(g=l.ruleMeta)==null?void 0:g[y.id])==null?void 0:u.category)||ut;((h=d.get(m))!=null?h:(d.set(m,[]),d.get(m))).push(y)}for(let[y,m]of c)await r.write(`${i}/tokens/${hr(y)}`,JSON.stringify(m,null,2));for(let[y,m]of d)await r.write(`${i}/rules/${hr(y)}`,JSON.stringify(m,null,2))}async createPackage(o,t,e){let s=o.packageId;if(await this.app.vault.adapter.exists(`${re}/${s}`))throw new Error(`\u5305\u76EE\u5F55\u5DF2\u5B58\u5728: ${s}`);await this.writePackage(s,o,t,e)}async deletePackage(o){let t=this.app.vault.adapter,e=`${re}/${o}`;if(await t.exists(e))try{await t.rmdir(e,!0)}catch(s){new mr.Notice(`\u5220\u9664\u5305\u76EE\u5F55\u5931\u8D25: ${s instanceof Error?s.message:String(s)}`)}}registerEmbeddedResources(o){return!1}};ye();function Zi(a){let o=[];return a.color&&(o.push(`color: ${a.color} !important`),o.push("background: none !important"),o.push("-webkit-background-clip: initial !important"),o.push("background-clip: initial !important"),o.push("-webkit-text-fill-color: currentColor !important")),a.fontStyle==="bold"?o.push("font-weight: 700 !important"):a.fontStyle==="italic"?o.push("font-style: italic !important"):a.fontStyle==="normal"&&(o.push("font-weight: 400 !important"),o.push("font-style: normal !important")),o}function eo(a){let o=[];return a.bgColor&&o.push(`background: ${a.bgColor} !important`),a.border&&o.push(`border: 1px ${a.border} currentColor !important`),a.color&&o.push(`color: ${a.color} !important`),o}function fr(a,o,t,e){let s=[];for(let[r,i]of Object.entries(a)){if(!t.has(r))continue;let n=Zi(i);if(n.length===0)continue;let l=`.dsl-custom-text-${r}`;s.push(`${l} {
  ${n.join(`;
  `)};
}`)}for(let[r,i]of Object.entries(o)){let n=e[r];if(!n)continue;let l=eo(i);l.length!==0&&s.push(`.cm-line .${n},
.${n} {
  ${l.join(`;
  `)};
}`)}return s.join(`

`)}var mt=require("obsidian"),to=1;function is(a,o,t){return{formatVersion:to,kind:a,exportedAt:new Date().toISOString(),pluginVersion:t,data:o}}function os(a){let o=new Date,t=s=>String(s).padStart(2,"0"),e=`${o.getFullYear()}${t(o.getMonth()+1)}${t(o.getDate())}-${t(o.getHours())}${t(o.getMinutes())}${t(o.getSeconds())}`;return`prompt-colorizer-${a}-${e}.json`}async function yr(a,o,t){let e=is("full",a,o),s=os("full"),r=await as(t,s,e);new mt.Notice(`\u5DF2\u5BFC\u51FA\u5168\u91CF\u8BBE\u7F6E\u5230 ${r}`,5e3)}async function vr(a,o,t){let e=is("customTextColors",a,o),s=os("customTextColors"),r=await as(t,s,e);new mt.Notice(`\u5DF2\u5BFC\u51FA ${a.length} \u6761\u81EA\u5B9A\u4E49\u6587\u672C\u989C\u8272\u5230 ${r}`,5e3)}async function br(a,o,t){let e=is("folderMappings",a,o),s=os("folderMappings"),r=await as(t,s,e);new mt.Notice(`\u5DF2\u5BFC\u51FA ${a.length} \u6761\u6587\u4EF6\u5939\u6620\u5C04\u5230 ${r}`,5e3)}async function as(a,o,t){let e=o.replace(/\.json$/,""),s=o,r=1;for(;await a.vault.adapter.exists(s);)s=`${e}-${r}.json`,r++;let i=JSON.stringify(t,null,2);return await a.vault.create(s,i),s}function kr(a){try{let o=JSON.parse(a);return typeof o.formatVersion!="number"||typeof o.kind!="string"||typeof o.exportedAt!="string"||o.data===void 0?null:o}catch(o){return null}}function xr(a,o){if(a.kind!=="full")throw new Error("\u5BFC\u51FA\u5305\u7C7B\u578B\u4E0D\u662F full");let t=a.data;return{...o,...t,lastCheckTime:o.lastCheckTime,lastPullReport:o.lastPullReport}}var ft=class{constructor(o,t){this.app=o;this.settings=t}isPluginEnabled(o){var e,s,r;let t=this.app.plugins;return t&&(r=(s=(e=t.enabledPlugins)==null?void 0:e.has)==null?void 0:s.call(e,o))!=null?r:!1}async initIntegrations(){this.isPluginEnabled("templater-obsidian")&&await this.registerTemplaterIntegration(),this.isPluginEnabled("dataview")&&this.registerDataviewIntegration()}async registerTemplaterIntegration(){var o,t;try{let e=(t=(o=this.app.plugins)==null?void 0:o.plugins)==null?void 0:t["templater-obsidian"];if(!e)return;let s={section:r=>`\u3010${r}\u3011`,shot:(r,i)=>`\u955C\u5934${r}\uFF08${i}\u79D2\uFF09`,role:r=>`<${r}>`,asset:(r,i)=>`@\u56FE${r}(${i})`,field:(r,i="")=>`${r}\uFF1A${i}`,storyboardSkeleton:(r=3)=>{let i=["\u3010\u6574\u4F53\u8BBE\u5B9A\u3011",""];for(let n=1;n<=r;n++)i.push(`\u955C\u5934${n}\uFF083\u79D2\uFF09`),i.push("\u666F\u522B\uFF1A"),i.push("\u8FD0\u955C\uFF1A"),i.push("\u5149\u5F71\uFF1A"),i.push("\u753B\u9762\uFF1A"),i.push("");return i.join(`
`)}};e.functions_parser&&(e.functions_parser.generated_user_functions=e.functions_parser.generated_user_functions||{},e.functions_parser.generated_user_functions.prompt=s),console.log("[PromptColorizer] Templater \u8054\u52A8\u5DF2\u6CE8\u518C")}catch(e){console.warn("[PromptColorizer] Templater \u8054\u52A8\u6CE8\u518C\u5931\u8D25:",e)}}registerDataviewIntegration(){this.app.workspace.on("layout-change",()=>{this.colorizeDataviewTables()}),this.app.workspace.on("dataview:refresh-views",()=>{setTimeout(()=>this.colorizeDataviewTables(),100)}),console.log("[PromptColorizer] Dataview \u8054\u52A8\u5DF2\u6CE8\u518C")}colorizeDataviewTables(){if(!this.settings.fileColorizerEnabled)return;document.querySelectorAll(".dataview-table").forEach(t=>{let e=t;if(e.dataset.pcDataviewProcessed==="true")return;e.querySelectorAll("tr").forEach((r,i)=>{if(i===0)return;let n=r.querySelector("td");if(!n)return;let l=n.querySelector("a.internal-link, a.data-link");if(!l)return;let c=l,d=c.dataset.href||c.getAttribute("data-href")||c.textContent;if(!d)return;let p=this.app.vault.getAbstractFileByPath(d);if(!p)return;let{TFile:g}=require("obsidian");if(!(p instanceof g))return;let u=dt(this.app,p,this.settings);if(u==="none")return;let h=pt(u,this.settings);if(h&&!n.querySelector(".pc-dataview-dot")){let y=n.createEl("span",{cls:"pc-dataview-dot"});y.style.display="inline-block",y.style.width="6px",y.style.height="6px",y.style.borderRadius="50%",y.style.backgroundColor=h.color,y.style.marginRight="6px",y.style.flexShrink="0",n.insertBefore(y,n.firstChild)}}),e.dataset.pcDataviewProcessed="true"})}cleanup(){var o,t,e,s;document.querySelectorAll(".pc-dataview-dot").forEach(r=>r.remove()),document.querySelectorAll("[data-pc-dataview-processed]").forEach(r=>{r.removeAttribute("data-pc-dataview-processed")});try{let r=(t=(o=this.app.plugins)==null?void 0:o.plugins)==null?void 0:t["templater-obsidian"];(s=(e=r==null?void 0:r.functions_parser)==null?void 0:e.generated_user_functions)!=null&&s.prompt&&delete r.functions_parser.generated_user_functions.prompt}catch(r){}}};var yt=class{constructor(){this.ruleSet=null;this.contextEnabled=!0;this.ruleIdScope=null;this.tokenIdScope=null}setRuleSet(o){this.ruleSet=o}setRuleIdScope(o){this.ruleIdScope=o}getRuleIdScope(){return this.ruleIdScope}setTokenIdScope(o){this.tokenIdScope=o}getTokenIdScope(){return this.tokenIdScope}setContextEnabled(o){this.contextEnabled=o}match(o,t=null){if(!this.ruleSet)return[];let e=t;if(this.ruleIdScope){if(!e)e=this.ruleIdScope;else if(e=new Set([...e].filter(n=>this.ruleIdScope.has(n))),e.size===0)return[]}let s=this.parseBlockContexts(o),r=this.matchPatterns(o,e,s);return r.sort((n,l)=>n.from!==l.from?n.from-l.from:l.priority-n.priority),this.removeOverlaps(r)}matchRange(o,t,e,s=null){return this.match(o,s).filter(i=>i.from<e&&i.to>t)}resetRegex(o){return o.lastIndex=0,o}parseBlockContexts(o){if(!this.contextEnabled||this.ruleSet.contextRules.length===0)return[];let t=[],e=/【([^】]+)】/g,s=[],r;for(;(r=e.exec(o))!==null;)s.push({marker:r[0],index:r.index});if(s.length===0)return[];for(let i=0;i<s.length;i++){let n=s[i].index,l=i+1<s.length?s[i+1].index:o.length,c=this.ruleSet.contextRules.find(d=>d.blockMarker===s[i].marker);c&&t.push({marker:s[i].marker,start:n,end:l,allowPatterns:new Set(c.allowPatterns)})}return t}matchPatterns(o,t,e){let s=[];for(let r of this.ruleSet.rules){if(t&&!t.has(r.id))continue;let i=this.resetRegex(r.regex),n;for(;(n=i.exec(o))!==null;){if(n[0].length===0){i.lastIndex++;continue}let l=n.index,c=n.index+n[0].length;if(this.contextEnabled&&e.length>0&&!this.isPatternAllowedInContext(r.id,l,e))continue;let d={from:l,to:c,cssClass:r.cssClass,priority:r.priority,block:r.blockLevel,ruleId:r.id};if(r.cssClass==="dsl-asset"&&n[1]){let p=n[1].match(/\d+/);p&&(d.refIndex=p[0])}s.push(d)}}return s}isPatternAllowedInContext(o,t,e){let s=e.find(r=>t>=r.start&&t<r.end);return s?s.allowPatterns.has(o):!0}removeOverlaps(o){if(o.length===0)return[];let t=[],e=-1;for(let s of o)s.from>=e&&(t.push(s),e=s.to);return t}getAllRuleIds(){return this.ruleSet?this.ruleSet.rules.map(o=>o.id):[]}getVersion(){var o,t;return(t=(o=this.ruleSet)==null?void 0:o.version)!=null?t:"unknown"}getColorTokens(){var o;return this.ruleSet?(o=this.ruleSet.colorTokens)!=null?o:{}:{}}getStyleRules(){var o;return this.ruleSet?(o=this.ruleSet.styleRules)!=null?o:{}:{}}getColorByCssClass(o){var n,l;if(!this.ruleSet)return"";let t=(n=this.ruleSet.styleRules)==null?void 0:n[o];if(!t||!t.color)return"";let e=(l=this.ruleSet.colorTokens)!=null?l:{},s=t.color.trim(),r=s.match(/^([a-zA-Z_][\w-]*)$/);if(r&&e[r[1]])return`var(--dsl-${r[1]})`;let i=s.match(/^([a-zA-Z_][\w-]*)\.(soft|border)$/);return i&&e[i[1]]?`var(--dsl-${i[1]}-${i[2]})`:s}};function Cr(a){let o=a.replace(/^\uFEFF/,""),t=[];for(let s of o.split(`
`)){let r=s.replace(/\r$/,"");if(r.trim()===""||/^\s*#/.test(r))continue;let i=so(r);i.trim()!==""&&t.push(i)}return new ns(t).parseObject(0)}function so(a){let o=!1,t=!1;for(let e=0;e<a.length;e++){let s=a[e];if(s==="'"&&!t)o=!o;else if(s==='"'&&!o)t=!t;else if(s==="#"&&!o&&!t&&(e===0||/\s/.test(a[e-1])))return a.slice(0,e)}return a}function vt(a){let o=a.match(/^(\s*)/);return o?o[1].length:0}function ro(a){let o=a.trim();return o.startsWith("'")&&o.endsWith("'")?o.slice(1,-1).replace(/''/g,"'"):o.startsWith('"')&&o.endsWith('"')?o.slice(1,-1).replace(/\\"/g,'"').replace(/\\n/g,`
`).replace(/\\t/g,"	"):o}function ge(a){let o=a.trim();return o.startsWith("'")&&o.endsWith("'")||o.startsWith('"')&&o.endsWith('"')?ro(o):o==="true"||o==="True"||o==="TRUE"?!0:o==="false"||o==="False"||o==="FALSE"?!1:o==="null"||o==="Null"||o==="~"?"":/^-?\d+$/.test(o)?parseInt(o,10):/^-?\d+\.\d+$/.test(o)?parseFloat(o):o}function bt(a){let o=a.trim();if(!o.startsWith("[")||!o.endsWith("]"))return[ge(o)];let t=o.slice(1,-1);if(t.trim()==="")return[];let e=[],s="",r=!1,i="";for(let n=0;n<t.length;n++){let l=t[n];!r&&(l==="'"||l==='"')?(r=!0,i=l,s+=l):r&&l===i?(r=!1,s+=l):l===","&&!r?(e.push(s),s=""):s+=l}return s.trim()&&e.push(s),e.map(n=>ge(n))}function io(a){let o=!1,t=!1;for(let e=0;e<a.length;e++){let s=a[e];if(s==="'"&&!t)o=!o;else if(s==='"'&&!o)t=!t;else if(s===":"&&!o&&!t&&(e===a.length-1||a[e+1]===" "||a[e+1]==="	"))return e}return-1}function kt(a){let o=a.trim();if(!o.startsWith("{")||!o.endsWith("}"))return{};let t=o.slice(1,-1);if(t.trim()==="")return{};let e=[],s="",r=!1,i=!1;for(let l=0;l<t.length;l++){let c=t[l];c==="'"&&!i?(r=!r,s+=c):c==='"'&&!r?(i=!i,s+=c):c===","&&!r&&!i?(e.push(s),s=""):s+=c}s.trim()&&e.push(s);let n={};for(let l of e){let c=io(l);if(c>0){let d=l.slice(0,c).trim(),p=l.slice(c+1).trim();p.startsWith("[")?n[d]=bt(p):p.startsWith("{")?n[d]=kt(p):n[d]=ge(p)}}return n}var ns=class{constructor(o){this.pos=0;this.lines=o}parseObject(o){let t={};for(;this.pos<this.lines.length;){let e=this.lines[this.pos],s=vt(e);if(s<o)break;if(s>o){this.pos++;continue}let r=e.slice(s),i=this.findColon(r);if(i===-1){this.pos++;continue}let n=r.slice(0,i).trim(),l=r.slice(i+1).trim();if(l===""){this.pos++;let c=this.peekNextIndent();if(c>s){let d=this.lines[this.pos];d&&d.trim().startsWith("-")?t[n]=this.parseArray(c):t[n]=this.parseObject(c)}else t[n]=""}else l.startsWith("[")?(t[n]=bt(l),this.pos++):l.startsWith("{")?(t[n]=kt(l),this.pos++):(t[n]=ge(l),this.pos++)}return t}parseArray(o){let t=[];for(;this.pos<this.lines.length;){let e=this.lines[this.pos],s=vt(e);if(s<o)break;if(s>o){this.pos++;continue}let r=e.slice(s);if(!r.startsWith("-"))break;let i=r.slice(1).trim();if(i===""){this.pos++;let n=this.peekNextIndent();n>s?t.push(this.parseObject(n)):t.push("")}else if(i.includes(":")&&!i.startsWith("'")&&!i.startsWith('"')){let n=this.findColon(i);if(n>0){let l=i.slice(0,n).trim(),c=i.slice(n+1).trim(),d={};if(c===""){this.pos++;let p=this.peekNextIndent();p>s+2?d[l]=this.parseObject(p):d[l]=""}else c.startsWith("[")?(d[l]=bt(c),this.pos++):c.startsWith("{")?(d[l]=kt(c),this.pos++):(d[l]=ge(c),this.pos++);for(;this.pos<this.lines.length;){let p=this.lines[this.pos],g=vt(p);if(g<=s||p.trim().startsWith("-"))break;let u=p.slice(g),h=this.findColon(u);if(h>0){let y=u.slice(0,h).trim(),m=u.slice(h+1).trim();if(m===""){this.pos++;let b=this.peekNextIndent();b>g?d[y]=this.parseObject(b):d[y]=""}else m.startsWith("[")?(d[y]=bt(m),this.pos++):m.startsWith("{")?(d[y]=kt(m),this.pos++):(d[y]=ge(m),this.pos++)}else this.pos++}t.push(d)}else t.push(ge(i)),this.pos++}else t.push(ge(i)),this.pos++}return t}findColon(o){let t=!1,e=!1;for(let s=0;s<o.length;s++){let r=o[s];if(r==="'"&&!e)t=!t;else if(r==='"'&&!t)e=!e;else if(r===":"&&!t&&!e&&(s===o.length-1||o[s+1]===" "||o[s+1]==="	"))return s}return-1}peekNextIndent(){return this.pos>=this.lines.length?-1:vt(this.lines[this.pos])}};var wr="2.8.0",Sr="2026-09-15",oo=`# \u57FA\u7840\u7ED3\u6784\u6B63\u5219\u89C4\u5219\uFF08\u6838\u5FC3\uFF0C\u65E0\u8BCD\u5178\u4F9D\u8D56\uFF09
# \u65B0\u589E\u683C\u5F0F\u4EC5\u8FFD\u52A0\u8282\u70B9\uFF0C\u65E0\u9700\u4FEE\u6539\u63D2\u4EF6\u4EE3\u7801
# \u5305\u542B\uFF1A\u63D0\u793A\u8BCD\u8BED\u6CD5 + Markdown \u8BED\u6CD5\u7B26\u53F7 + \u64CD\u4F5C\u6807\u8BB0
patterns:
  # ============================================================
  # \u4E00\u3001\u63D0\u793A\u8BCD\u8BED\u6CD5\u5339\u914D
  # ============================================================

  # \u9876\u5C42\u7AE0\u8282\u5757\uFF1A\u3010\u6574\u4F53\u8BBE\u5B9A\u3011\u3010\u5206\u955C\u8BBE\u8BA1\u3011
  block_wrapper:
    regex: '\u3010([^\u3011]+)\u3011'
    cssClass: "dsl-block-wrapper"
    captureGroup: 0
    priority: 30

  # \u955C\u5934\u6807\u9898\uFF1A\u955C\u59341\uFF083\u79D2\uFF09\u3001\u955C\u59343.5\uFF082.5\u79D2\uFF09
  shot_header:
    regex: '(?:\u955C\u5934|Shot|shot|SHOT)s*(d+)s*(?:[\uFF08(]s*(d+(?:-d+)?.?d*s*(?:\u79D2|s|S|Sec|sec))?(?:s*[\uFF5C|]s*[^\uFF09)]*)?s*[\uFF09)])?'
    cssClass: "dsl-shot-header"
    captureGroup: 0
    priority: 35

  # \u8D44\u4EA7\u5F15\u7528\uFF1A@\u56FE1(\u5B89\u5FB7\u70C8)\u3001@\u97F3\u98911\u3001@\u56FE1(\u5B89\u5FB7\u70C8)-\u53C2\u8003\u56FE\u670D\u88C5
  asset_ref:
    regex: '@(\u56FEd+|\u89C6\u9891d+|\u6587\u4EF6d+|\u8D44\u6E90d+|assetd+|\u97F3\u9891d+)(([^)]*))?(-[^s\uFF0C\u3002\u3001,.)\uFF09]]+)?'
    cssClass: "dsl-asset"
    captureGroup: 0
    priority: 40

  # \u65B9\u62EC\u53F7\u8D44\u6E90\u5F15\u7528\uFF1A[@\u56FE1(\u5B89\u5FB7\u70C8)-\u53C2\u8003\u56FE\u670D\u88C5]
  asset_bracket:
    regex: '[(@[^]]+)]'
    cssClass: "dsl-asset-bracket"
    captureGroup: 0
    priority: 40

  # \u952E\u503C\u53C2\u6570\uFF1A\u8272\u6E29\uFF1A\u3001\u666F\u522B\uFF1A\u3001\u8FD0\u955C\uFF1A
  param_key:
    regex: '([\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF]{2,10})(?:s*[\uFF08(][^\uFF09)]*[\uFF09)])?s*[\uFF1A:](?!s*")'
    cssClass: "dsl-param-key"
    captureGroup: 0
    priority: 40

  # \u4E2D\u6587\u5F15\u53F7\u53F0\u8BCD\uFF1A"..." \u300C...\u300D\uFF08\u6392\u9664\u6362\u884C\uFF0C\u907F\u514D\u5947\u6570\u5F15\u53F7\u8DE8\u884C\u914D\u5BF9\u5927\u7247\u67D3\u8272\uFF09
  dialogue_cn:
    regex: '[""\u300C]([^""\u300D
]+)[""\u300D]'
    cssClass: "dsl-dialogue"
    captureGroup: 0
    priority: 50

  # \u82F1\u6587\u5F15\u53F7\u53F0\u8BCD\uFF08\u4EC5\u5339\u914D "\u8BF4\uFF1A" \u540E\u6216\u884C\u9996\u7684\u82F1\u6587\u5F15\u53F7\u5185\u5BB9\uFF09
  dialogue_en:
    regex: '(?:\u8BF4[\uFF1A:]s*|^[ 	]*|,s*)"([^"
]+)"'
    cssClass: "dsl-dialogue"
    captureGroup: 0
    priority: 50
    flags: 'gm'

  # \u7EA6\u675F\u6307\u4EE4\uFF1A\u7981\u6B62\u3001\u6392\u9664\u3001\u675C\u7EDD\u3001\u4FDD\u8BC1\u3001\u9501\u5B9A\u3001\u4E0D\u5F97
  constraint:
    regex: '(?:\u6392\u9664|\u7981\u6B62|\u675C\u7EDD|\u4E0D\u5F97|\u4E0D\u5141\u8BB8|\u4E25\u7981|\u907F\u514D|\u5207\u52FF|\u52FF\u8981|\u4FDD\u8BC1|\u9501\u5B9A|\u4EC5\u4FDD\u7559|\u4E25\u683C)[^\u3002.
]*[\u3002.]?'
    cssClass: "dsl-constraint"
    captureGroup: 0
    priority: 45

  # \u6280\u672F\u53C2\u6570\uFF1A\u8272\u6E29 3200K\u3001\u65F6\u957F 3\u79D2\u3001\u5206\u8FA8\u7387 1920x1080
  tech_param:
    regex: 'd{3,5}K|d+.?d*s*(?:\u79D2|s|S)|d{3,4}s*[x\xD7]s*d{3,4}|[48]K'
    cssClass: "dsl-tech-param"
    captureGroup: 0
    priority: 45

  # \u62EC\u53F7\u6CE8\u91CA\uFF1A\uFF08\u7C97\u4FD7\u3001\u620F\u8C11\uFF09\uFF08\u6C14\u573A\u793A\u5A01\uFF09
  parenthetical:
    regex: '\uFF08([^\uFF09]+)\uFF09'
    cssClass: "dsl-parenthetical"
    captureGroup: 0
    priority: 25

  # \u53D8\u91CF\u5360\u4F4D\u7B26\uFF1A{{variable}} \${variable} <|variable|>
  variable:
    regex: '{{([^}]+)}}|\${([^}]+)}|<|([^|]+)|>'
    cssClass: "dsl-variable"
    captureGroup: 0
    priority: 20

  # \u89D2\u8272\u6807\u7B7E\uFF1A<system> <user> <assistant> <tool>
  role_tag:
    regex: '</?(?:system|user|assistant|tool)>'
    cssClass: "dsl-role-tag"
    captureGroup: 0
    priority: 50
    flags: 'gi'

  # \u6307\u4EE4\u6807\u8BB0\uFF1A[INST] [/INST] [SYS]
  instruction:
    regex: '[/?(?:INST|SYS)]'
    cssClass: "dsl-instruction"
    captureGroup: 0
    priority: 50
    flags: 'gi'

  # SD\u6743\u91CD\u6807\u8BB0\uFF1A(text:1.3)
  emphasis_weight:
    regex: '(([^()]+):(d+.?d*))'
    cssClass: "dsl-emphasis-weight"
    captureGroup: 0
    priority: 42

  # Lora/\u6A21\u578B\u5F15\u7528\uFF1A<lora:name:0.8>
  lora_ref:
    regex: '<(?:lora|model|lyco|embedding|hypernet):[^:>]+(?::d+.?d*)?>'
    cssClass: "dsl-lora-ref"
    captureGroup: 0
    priority: 48
    flags: 'gi'

  # \u591A\u91CD\u5706\u62EC\u53F7\u5F3A\u8C03\uFF1A((text)) (((text)))
  bracket_strong:
    regex: '(({2,})([^()]+)(){2,})'
    cssClass: "dsl-bracket-strong"
    captureGroup: 0
    priority: 38

  # \u65B9\u62EC\u53F7\u5F31\u5316\uFF1A[text]
  bracket_weak:
    regex: '[([a-zA-Z\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF][^[]]{1,30})]'
    cssClass: "dsl-bracket-weak"
    captureGroup: 0
    priority: 22

  # \u8D28\u91CF\u6807\u7B7E\uFF1Amasterpiece, best quality
  quality_tag:
    regex: '\b(?:masterpiece|best quality|high quality|ultra detailed|highly detailed|extremely detailed|8k|4k|highres|absurdres|original|amazing quality|very aesthetic|aesthetic)\b'
    cssClass: "dsl-quality-tag"
    captureGroup: 0
    priority: 46
    flags: 'gi'

  # SD\u8D1F\u9762\u63D0\u793A\u8BCD\u5934\uFF1ANegative prompt:
  sd_negative_header:
    regex: '^(?:Negative prompt|\u8D1F\u9762\u63D0\u793A\u8BCD|\u8D1F\u9762\u63D0\u793A)s*[\uFF1A:]s*'
    cssClass: "dsl-sd-negative-header"
    captureGroup: 0
    priority: 55
    flags: 'gmi'
    blockLevel: true

  # \u97F3\u9891\u5F15\u7528\uFF1A@\u97F3\u98911 @\u97F3\u98912
  audio_ref:
    regex: '@\u97F3\u9891s*d+'
    cssClass: "dsl-audio-ref"
    captureGroup: 0
    priority: 40

  # \u97F3\u8272\u6807\u7B7E
  audio_tone:
    regex: '\u97F3\u8272s*'
    cssClass: "dsl-audio-tone"
    captureGroup: 0
    priority: 40

  # \u97F3\u6548\u5B57\u6BB5\u6807\u7B7E
  audio_sfx:
    regex: '\u97F3\u6548[\uFF1A:]'
    cssClass: "dsl-audio-sfx"
    captureGroup: 0
    priority: 45

  # SD\u53C2\u6570\uFF1A--ar 16:9 --v 6 --style raw
  sd_parameter:
    regex: '--(?:ar|v|niji|style|seed|s|w|h|c|chaos|stylize|tile|quality|fast|hd|relax|turbo)s+S+'
    cssClass: "dsl-sd-parameter"
    captureGroup: 0
    priority: 48
    flags: 'gi'

  # ============================================================
  # \u4E8C\u3001Markdown \u8BED\u6CD5\u7B26\u53F7\u5339\u914D
  # ============================================================

  # Frontmatter \u5206\u9694\u7B26\uFF1A\u884C\u9996 ---
  md_frontmatter:
    regex: '^---s*$'
    cssClass: "dsl-md-frontmatter"
    captureGroup: 0
    priority: 60
    flags: 'gm'
    blockLevel: true

  # \u6807\u9898\u6807\u8BB0\uFF1A# ## ### #### ##### ######
  md_heading:
    regex: '^(#{1,6})s+(.+)$'
    cssClass: "dsl-md-heading"
    captureGroup: 0
    priority: 58
    flags: 'gm'
    blockLevel: true

  # \u7C97\u4F53\u6807\u8BB0\uFF1A**text** __text__
  md_bold:
    regex: '**([^*]+)**|__([^_]+)__'
    cssClass: "dsl-md-bold"
    captureGroup: 0
    priority: 52

  # \u659C\u4F53\u6807\u8BB0\uFF1A*text* _text_\uFF08\u907F\u514D\u4E0E\u7C97\u4F53\u51B2\u7A81\uFF09
  md_italic:
    regex: '(?<!*)*(?!*)([^*
]+)*(?!*)|(?<!_)_(?!_)([^_
]+)_(?!_)'
    cssClass: "dsl-md-italic"
    captureGroup: 0
    priority: 51

  # \u5220\u9664\u7EBF\uFF1A~~text~~
  md_strikethrough:
    regex: '~~([^~]+)~~'
    cssClass: "dsl-md-strikethrough"
    captureGroup: 0
    priority: 52

  # \u4EE3\u7801\u5757\u56F4\u680F\uFF1A\`\`\`language
  md_code_fence:
    regex: '^\`\`\`[^
]*$'
    cssClass: "dsl-md-code-fence"
    captureGroup: 0
    priority: 60
    flags: 'gm'
    blockLevel: true

  # \u884C\u5185\u4EE3\u7801\uFF1A\`code\`
  md_inline_code:
    regex: '\`([^\`
]+)\`'
    cssClass: "dsl-md-inline-code"
    captureGroup: 0
    priority: 53

  # \u94FE\u63A5\uFF1A[text](url)
  md_link:
    regex: '[([^]]+)](([^)]+))'
    cssClass: "dsl-md-link"
    captureGroup: 0
    priority: 54

  # \u56FE\u7247\uFF1A![alt](url)
  md_image:
    regex: '![([^]]*)](([^)]+))'
    cssClass: "dsl-md-image"
    captureGroup: 0
    priority: 55

  # Wiki \u94FE\u63A5\uFF1A[[text]] \u6216 [[text|alias]]
  md_wiki_link:
    regex: '[[([^]]+)(?:|[^]]+)?]]'
    cssClass: "dsl-md-wiki-link"
    captureGroup: 0
    priority: 56

  # \u6807\u7B7E\uFF1A#tag\uFF08\u975E\u6807\u9898\u884C\u7684\u884C\u9996\u6216\u7A7A\u683C\u540E\uFF09
  md_tag:
    regex: '(?:^|s)(#[a-zA-Z\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF][w/\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF-]*)'
    cssClass: "dsl-md-tag"
    captureGroup: 0
    priority: 50
    flags: 'gm'

  # \u4EFB\u52A1\u5217\u8868\u6807\u8BB0\uFF1A- [ ] \u6216 - [x]
  md_task_list:
    regex: '^(s*[-*+]s+[)[xX ](])'
    cssClass: "dsl-md-task"
    captureGroup: 0
    priority: 57
    flags: 'gm'

  # \u811A\u6CE8\u5F15\u7528\uFF1A[^1]
  md_footnote_ref:
    regex: '[^([^]]+)]'
    cssClass: "dsl-md-footnote"
    captureGroup: 0
    priority: 54

  # \u811A\u6CE8\u5B9A\u4E49\uFF1A[^1]:
  md_footnote_def:
    regex: '^[^([^]]+)]:s*(.*)$'
    cssClass: "dsl-md-footnote-def"
    captureGroup: 0
    priority: 57
    flags: 'gm'

  # \u6570\u5B66\u516C\u5F0F\u5757\uFF1A$$ ... $$
  md_math_block:
    regex: '^$$'
    cssClass: "dsl-md-math"
    captureGroup: 0
    priority: 60
    flags: 'gm'
    blockLevel: true

  # \u884C\u5185\u6570\u5B66\u516C\u5F0F\uFF1A$...$
  md_math_inline:
    regex: '(?<!$)$(?!$)([^$
]+)$(?!$)'
    cssClass: "dsl-md-math-inline"
    captureGroup: 0
    priority: 53

  # \u5F15\u7528\u5757\uFF1A> text
  md_blockquote:
    regex: '^>s*(.*)$'
    cssClass: "dsl-md-blockquote"
    captureGroup: 0
    priority: 55
    flags: 'gm'
    blockLevel: true

  # Callout \u5757\uFF1A> [!note]
  md_callout:
    regex: '^>s*[!(w+)]'
    cssClass: "dsl-md-callout"
    captureGroup: 0
    priority: 60
    flags: 'gmi'
    blockLevel: true

  # \u6C34\u5E73\u5206\u5272\u7EBF\uFF1A--- *** ___
  md_hr:
    regex: '^(?:-{3,}|*{3,}|_{3,})s*$'
    cssClass: "dsl-md-hr"
    captureGroup: 0
    priority: 56
    flags: 'gm'
    blockLevel: true

  # \u8868\u683C\u5206\u9694\u884C\uFF1A| --- | --- |
  md_table_sep:
    regex: '^|?[s-:|]+|[s-:|]+|?s*$'
    cssClass: "dsl-md-table-sep"
    captureGroup: 0
    priority: 58
    flags: 'gm'
    blockLevel: true

  # \u8868\u683C\u884C\uFF1A| cell | cell |
  md_table_row:
    regex: '^|.*|s*$'
    cssClass: "dsl-md-table-row"
    captureGroup: 0
    priority: 50
    flags: 'gm'
    blockLevel: true

  # \u5217\u8868\u9879\uFF1A- * + 1.
  md_list_item:
    regex: '^(s*)([-*+]|d+.)s+'
    cssClass: "dsl-md-list-item"
    captureGroup: 0
    priority: 49
    flags: 'gm'
    blockLevel: true

  # \u5B9A\u4E49\u5217\u8868\u6807\u8BB0\uFF1A: \u672F\u8BED
  md_definition:
    regex: '^:s+'
    cssClass: "dsl-md-definition"
    captureGroup: 0
    priority: 50
    flags: 'gm'

  # \u5757\u5F15\u7528 ID\uFF1A^block-id
  md_block_id:
    regex: '^([a-zA-Z0-9][w-]*)s*$'
    cssClass: "dsl-md-block-id"
    captureGroup: 0
    priority: 50
    flags: 'gm'

  # Obsidian \u6CE8\u91CA\uFF1A%% ... %%
  md_comment:
    regex: '%%[sS]*?%%'
    cssClass: "dsl-md-comment"
    captureGroup: 0
    priority: 54
    flags: 'g'

  # Emoji \u77ED\u7801\uFF1A:emoji:
  md_emoji_shortcode:
    regex: ':([a-z_]+):'
    cssClass: "dsl-md-emoji"
    captureGroup: 0
    priority: 48

  # \u9AD8\u4EAE\u6807\u8BB0\uFF1A==text==
  md_highlight:
    regex: '==([^=]+)=='
    cssClass: "dsl-md-highlight"
    captureGroup: 0
    priority: 52

  # \u4E0B\u6807\u6807\u8BB0\uFF1A~text~\uFF08Obsidian \u4E13\u5C5E\uFF0C\u9700\u4E0E strikethrough ~~ \u533A\u5206\uFF09
  md_subscript:
    regex: '(?<!~)~(?!~)([^~
]+)~(?!~)'
    cssClass: "dsl-md-subscript"
    captureGroup: 0
    priority: 51

  # \u4E0A\u6807\u6807\u8BB0\uFF1A^text^\uFF08Obsidian \u4E13\u5C5E\uFF0C\u9700\u4E0E block_id ^id \u533A\u5206\uFF1A\u884C\u5185 vs \u884C\u5C3E\uFF09
  md_superscript:
    regex: '(?<!^)^(?!^)([^^
]+)^(?!^)(?!s*$)'
    cssClass: "dsl-md-superscript"
    captureGroup: 0
    priority: 51

  # \u952E\u503C\u5BF9\uFF08YAML/JSON frontmatter\uFF09\uFF1Akey: value
  md_yaml_key:
    regex: '^([a-zA-Z_][w-]*)s*:s*(.*)$'
    cssClass: "dsl-md-yaml-key"
    captureGroup: 0
    priority: 47
    flags: 'gm'

  # ============================================================
  # \u4E09\u3001\u64CD\u4F5C\u6863\u6848\u6807\u8BB0
  # ============================================================

  # \u65F6\u95F4\u6233\uFF1A2026-07-24\u30012026/07/24\u300107:30:00
  timestamp:
    regex: 'd{4}[-/]d{1,2}[-/]d{1,2}(?:s+d{1,2}:d{2}(?::d{2})?)?|d{1,2}:d{2}(?::d{2})?'
    cssClass: "dsl-timestamp"
    captureGroup: 0
    priority: 42

  # \u7248\u672C\u53F7\uFF1Av1.0.0\u3001version 2.3
  version_number:
    regex: '(?:v|versions+)?d+.d+(?:.d+)?(?:-[a-zA-Z0-9]+)?'
    cssClass: "dsl-version-number"
    captureGroup: 0
    priority: 42
    flags: 'gi'

  # URL \u94FE\u63A5
  url_link:
    regex: 'https?://[^s<>"'')]]+'
    cssClass: "dsl-url-link"
    captureGroup: 0
    priority: 44

  # \u6587\u4EF6\u8DEF\u5F84
  file_path:
    regex: '(?:.?/)?(?:[w.-]+/)+[w.-]+(?:.w+)?'
    cssClass: "dsl-file-path"
    captureGroup: 0
    priority: 40

  # \u547D\u4EE4\u884C\u6307\u4EE4\uFF1A\u4EE5 > \u6216 $ \u5F00\u5934
  cli_command:
    regex: '^[>$#]s+(.+)'
    cssClass: "dsl-cli-command"
    captureGroup: 0
    priority: 48
    flags: 'gm'
    blockLevel: true

  # \u952E\u76D8\u5FEB\u6377\u952E\uFF1A<kbd>Ctrl+C</kbd>
  kbd_tag:
    regex: '<kbd>([^<]+)</kbd>'
    cssClass: "dsl-kbd-tag"
    captureGroup: 0
    priority: 54
    flags: 'gi'

  # HTML \u6807\u7B7E\uFF1A<tag>...</tag>
  html_tag:
    regex: '</?[a-zA-Z][^>]*>'
    cssClass: "dsl-html-tag"
    captureGroup: 0
    priority: 46
    flags: 'gi'

  # \u952E\u503C\u5206\u9694\u7B26\uFF1Akey: value\uFF08\u901A\u7528\uFF09
  key_value:
    regex: '^([a-zA-Z\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF][w\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFFs]{0,20})[\uFF1A:]s*(.+)$'
    cssClass: "dsl-key-value"
    captureGroup: 0
    priority: 30
    flags: 'gm'

  # \u5F15\u7528\u6807\u8BB0\uFF1A> \u5F15\u7528\u5185\u5BB9
  reference_marker:
    regex: '^>{1,}s+'
    cssClass: "dsl-reference-marker"
    captureGroup: 0
    priority: 48
    flags: 'gm'

  # \u5206\u9694\u6807\u8BB0\uFF1A=== \u6216 ---
  separator:
    regex: '^={3,}s*$'
    cssClass: "dsl-separator"
    captureGroup: 0
    priority: 56
    flags: 'gm'
    blockLevel: true

  # ============================================================
  # \u56DB\u3001AI \u5DE5\u5177\u7ED3\u6784\u5316\u8BED\u6CD5\uFF082025-2026 \u8D8B\u52BF\uFF09
  # ============================================================

  # ANTML \u547D\u540D\u7A7A\u95F4\u6807\u7B7E\uFF1AClaude \u4E13\u5C5E\u6807\u8BB0 <antml:thinking> \u7B49
  antml_tag:
    regex: '</?antml:[a-z_]+>'
    cssClass: "dsl-antml-tag"
    captureGroup: 0
    priority: 58
    flags: 'gi'

  # \u51FD\u6570\u7ED3\u679C\u5757\uFF1A<function_results> </function_results>
  function_results_tag:
    regex: '</?function_results>'
    cssClass: "dsl-function-results"
    captureGroup: 0
    priority: 54
    flags: 'gi'

  # \u7ED3\u6784\u5316 XML \u6807\u7B7E\uFF1A<instructions> <context> <example> <output_format> <thinking> <answer>
  xml_block:
    regex: '</?(?:instructions|context|example|examples|output_format|thinking|answer|input|role|task|reasoning|reflection|critique|summary|steps|solution)>'
    cssClass: "dsl-xml-block"
    captureGroup: 0
    priority: 54
    flags: 'gi'

  # Chat Template Token\uFF1AQwen/Phi <|im_start|> <|im_end|> <|im_sep|>
  chat_token:
    regex: '<|im_(?:start|end|sep)|>'
    cssClass: "dsl-chat-token"
    captureGroup: 0
    priority: 58
    flags: 'g'

  # Llama 3 \u7279\u6B8A token\uFF1A<|begin_of_text|> <|start_header_id|> <|end_header_id|>
  llama3_token:
    regex: '<|(?:begin_of_text|start_header_id|end_header_id|eot_id|reserved)|>'
    cssClass: "dsl-llama-token"
    captureGroup: 0
    priority: 58
    flags: 'g'

  # Gemma \u5BF9\u8BDD\u6807\u8BB0\uFF1A<start_of_turn> <end_of_turn>
  gemma_token:
    regex: '</?start_of_turn>|</?end_of_turn>'
    cssClass: "dsl-gemma-token"
    captureGroup: 0
    priority: 58
    flags: 'gi'

  # Llama 2/Mistral \u7CFB\u7EDF\u6807\u8BB0\uFF1A<<SYS>> <</SYS>>
  llama2_sys:
    regex: '<</?SYS>>'
    cssClass: "dsl-llama-sys"
    captureGroup: 0
    priority: 56
    flags: 'g'

  # \u5DE5\u4F5C\u6D41\u5206\u9694\u7B26\uFF1A## ##\uFF08Dify \u7269\u7406\u5206\u9694\uFF09
  workflow_sep:
    regex: '^#{2}s+.*$'
    cssClass: "dsl-workflow-sep"
    captureGroup: 0
    priority: 50
    flags: 'gm'
    blockLevel: true

  # JSON Schema \u5173\u952E\u5B57\uFF1Atype/properties/required \u7B49
  json_schema_key:
    regex: '"(?:type|properties|required|items|enum|const|description|response_format|json_schema|additionalProperties|definitions|$ref)"'
    cssClass: "dsl-json-schema-key"
    captureGroup: 0
    priority: 46
    flags: 'g'

  # Jinja2 \u63A7\u5236\u6D41\uFF1A{% ... %}
  jinja_control:
    regex: '{%[^%]*%}'
    cssClass: "dsl-jinja-control"
    captureGroup: 0
    priority: 54

  # \u5DE5\u4F5C\u6D41\u8282\u70B9\u6807\u8BC6\uFF1Anode_1\u3001start_node
  workflow_node:
    regex: '(?:node|\u8282\u70B9)_[a-zA-Z0-9_]+'
    cssClass: "dsl-workflow-node"
    captureGroup: 0
    priority: 44

  # ============================================================
  # \u4E94\u3001Markdown \u6269\u5C55\u8BED\u6CD5
  # ============================================================

  # Mermaid \u56FE\u8868\u56F4\u680F\uFF1A\`\`\`mermaid
  md_mermaid:
    regex: '^\`\`\`(?:mermaid|flowchart|sequenceDiagram|classDiagram|stateDiagram|erDiagram|gantt|pie|gitGraph|mindmap|timeline)\b'
    cssClass: "dsl-md-mermaid"
    captureGroup: 0
    priority: 60
    flags: 'gmi'
    blockLevel: true

  # \u5D4C\u5957\u5F15\u7528\uFF1A>> text
  md_nested_quote:
    regex: '^>{2,}s+'
    cssClass: "dsl-md-nested-quote"
    captureGroup: 0
    priority: 56
    flags: 'gm'
    blockLevel: true

  # \u951A\u70B9\u94FE\u63A5\uFF1A[text](#anchor)
  md_anchor_link:
    regex: '[([^]]+)](#[^)]+)'
    cssClass: "dsl-md-anchor-link"
    captureGroup: 0
    priority: 55

  # \u5F15\u7528\u5757\u522B\u540D\uFF1A> [!note]+ \u6298\u53E0
  md_callout_meta:
    regex: '^>s*[!w+][+-]?'
    cssClass: "dsl-md-callout-meta"
    captureGroup: 0
    priority: 60
    flags: 'gm'
    blockLevel: true

  # Admonition\uFF1A!!! note
  md_admonition:
    regex: '^!!!s+w+'
    cssClass: "dsl-md-admonition"
    captureGroup: 0
    priority: 60
    flags: 'gm'
    blockLevel: true

  # ============================================================
  # \u516D\u3001\u64CD\u4F5C\u6863\u6848\u6269\u5C55\u6807\u8BB0
  # ============================================================

  # \u90AE\u7BB1\u5730\u5740
  email:
    regex: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'
    cssClass: "dsl-email"
    captureGroup: 0
    priority: 44

  # IP \u5730\u5740\uFF08IPv4\uFF09
  ip_address:
    regex: '\b(?:(?:25[0-5]|2[0-4]d|1?d?d).){3}(?:25[0-5]|2[0-4]d|1?d?d)\b'
    cssClass: "dsl-ip-address"
    captureGroup: 0
    priority: 44

  # MAC \u5730\u5740
  mac_address:
    regex: '(?:[0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}'
    cssClass: "dsl-mac-address"
    captureGroup: 0
    priority: 44

  # UUID
  uuid:
    regex: '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}'
    cssClass: "dsl-uuid"
    captureGroup: 0
    priority: 44

  # \u5341\u516D\u8FDB\u5236\u989C\u8272\u503C\uFF1A#FF5733 #fff
  hex_color:
    regex: '#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b'
    cssClass: "dsl-hex-color"
    captureGroup: 0
    priority: 46

  # rgb/rgba/hsl \u989C\u8272\u51FD\u6570
  css_color_func:
    regex: '\b(?:rgb|rgba|hsl|hsla)([^)]+)'
    cssClass: "dsl-css-color-func"
    captureGroup: 0
    priority: 46
    flags: 'gi'

  # \u5730\u7406\u5750\u6807\uFF1A\u7ECF\u7EAC\u5EA6
  geo_coord:
    regex: '-?d{1,3}.d{1,6},s*-?d{1,3}.d{1,6}'
    cssClass: "dsl-geo-coord"
    captureGroup: 0
    priority: 42

  # \u8D27\u5E01\u91D1\u989D
  currency:
    regex: '(?:\xA5|\uFFE5|$|\u20AC|\xA3)s?d+(?:,d{3})*(?:.d+)?'
    cssClass: "dsl-currency"
    captureGroup: 0
    priority: 44

  # \u767E\u5206\u6BD4
  percentage:
    regex: 'd+(?:.d+)?s*%'
    cssClass: "dsl-percentage"
    captureGroup: 0
    priority: 42

  # \u5EA6\u91CF\u5355\u4F4D
  measurement:
    regex: 'd+(?:.d+)?s*(?:px|em|rem|vw|vh|pt|cm|mm|in|kg|g|km|m\b|\xB0C|\xB0F|\xB0|Hz|MHz|GHz|kHz|ms|fps|dpi|ppi|lpx|pt)\b'
    cssClass: "dsl-measurement"
    captureGroup: 0
    priority: 42
    flags: 'gi'

  # ============================================================
  # \u4E03\u3001\u5206\u955C\u811A\u672C\u6269\u5C55\u8BED\u6CD5\uFF08v2.3.0 \u65B0\u589E\uFF09
  # ============================================================

  # \u5206\u955C\u7F16\u53F7\uFF1A\u5206\u955C 1-0-6-1\u3001\u5206\u955C 1-0-6-2\uFF08\u591A\u6BB5\u8FDE\u5B57\u7B26\u7F16\u53F7\uFF0Cv2.3.1 \u65B0\u589E\uFF09
  shot_id:
    regex: '\u5206\u955Cs*d+(?:-d+)+'
    cssClass: "dsl-shot-id"
    captureGroup: 0
    priority: 52
    flags: 'g'

  # \u6BB5\u843D\u6807\u9898\uFF1AA \u6BB5 13s\uFF5C\u63CF\u8FF0\u3001B \u6BB5 14s\uFF5C\u63CF\u8FF0\uFF08\u63CF\u8FF0\uFF09
  segment_header:
    regex: '^[A-Z]s*\u6BB5s*d+s*(?:\u79D2|s|S)?s*[\uFF5C|]s*[^
]+'
    cssClass: "dsl-segment-header"
    captureGroup: 0
    priority: 56
    flags: 'gm'
    blockLevel: true

  # \u6A21\u5757\u6807\u9898\uFF1A\u6A21\u5757 1 \u65B9\u5411\u9501\u3001\u6A21\u5757 4 \u5206\u955C\u5934\u6269\u5199
  module_header:
    regex: '^\u6A21\u5757s*d+s+[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFFw]+'
    cssClass: "dsl-module-header"
    captureGroup: 0
    priority: 55
    flags: 'gm'
    blockLevel: true

  # \u53F0\u8BCD\u6807\u6CE8\uFF1A\u53F0\u8BCD Draven\uFF08\u4F4E\u54D1\u86CA\u60D1\uFF09 {{Mixed 4}} \uFF1A
  dialogue_speaker:
    regex: '\u53F0\u8BCDs+S+s*[\uFF08(][^\uFF09)]*[\uFF09)]s*(?:{{[^}]+}}s*)?[\uFF1A:]'
    cssClass: "dsl-dialogue-speaker"
    captureGroup: 0
    priority: 50

  # \u89D2\u8272\u5B9A\u4E49\uFF1ADraven\uFF08S \u4E3B\uFF0C\u9AD8\u4F4D\u5F3A\u52BF\u65B9\uFF09\uFF1A
  character_def:
    regex: '^([A-Za-z\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF][w\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF]{0,20})s*[\uFF08(]([^\uFF09)]+)[\uFF09)]s*[\uFF1A:]'
    cssClass: "dsl-character-def"
    captureGroup: 0
    priority: 48
    flags: 'gm'

  # \u4E66\u540D\u53F7\u5F15\u7528\uFF1A\u300A\u4ED6\u662F\u9F99\u300B\u3001\u300A\u6C34\u5F62\u7269\u8BED\u300B
  book_title:
    regex: '\u300A[^\u300B]+\u300B'
    cssClass: "dsl-book-title"
    captureGroup: 0
    priority: 44

  # \u4E2D\u6587\u5E8F\u53F7\u7AE0\u8282\uFF1A\u4E00\u3001\u4E8C\u3001\u4E09\u3001
  cn_chapter:
    regex: '^(?:[\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D\u5341\u767E\u5343]+[\u3001\uFF0C]|\u7B2C[\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D\u5341\u767E\u5343\u4E07]+[\u96C6\u7AE0\u8282\u5E55\u56DE\u8BFE])'
    cssClass: "dsl-cn-chapter"
    captureGroup: 0
    priority: 54
    flags: 'gm'

  # \u65F6\u95F4\u8303\u56F4\uFF1A0-4s\u30014-9s\u30010-13s
  time_range:
    regex: '\bd+-d+s*(?:\u79D2|s|S)\b'
    cssClass: "dsl-time-range"
    captureGroup: 0
    priority: 46

  # \u6BB5\u843D\u5C0F\u6807\u9898\uFF1A\u672C\u6BB5\u8C03\u5EA6\u8BF4\u660E\u3001\u5168\u5C40\u7EA6\u675F
  section_note:
    regex: '^(?:\u672C\u6BB5|\u5168\u5C40)[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF]{2,12}$'
    cssClass: "dsl-section-note"
    captureGroup: 0
    priority: 52
    flags: 'gm'
    blockLevel: true

  # ============================================================
  # \u516B\u3001AI \u591A\u6A21\u6001\u6269\u5C55\u8BED\u6CD5\uFF08v2.4.0 \u65B0\u589E\uFF09
  # ============================================================

  # SSML \u8BED\u97F3\u5408\u6210\u6807\u7B7E\uFF1A<prosody rate="slow">\u3001<emphasis>\u3001<break time="1s">\u3001<voice>\u3001<say-as>
  ssml_tag:
    regex: '</?(?:prosody|emphasis|break|voice|say-as|speak|phoneme|sub|p|s|audio|mark|emphasis|lang|token|w)(?:s+[^>]*)?>'
    cssClass: "dsl-ssml-tag"
    captureGroup: 0
    priority: 56
    flags: 'gi'

  # \u6B4C\u8BCD\u6BB5\u843D\u6807\u7B7E\uFF1A[Verse] [Chorus] [Bridge] [Outro] [Intro] [Hook] [Pre-Chorus] [Instrumental]
  lyric_section:
    regex: '[(?:Verse|Chorus|Bridge|Outro|Intro|Hook|Pre-Chorus|Pre Chorus|Instrumental|Refrain|Interlude|Solo|Drop|Build|Beat Drop|Spoken|Spoken Word|Ad lib|Ad-lib|Vamp|Coda|Post-Chorus|Post Chorus|Tag|Lead In|Lead-In)(?:s+d+)?]'
    cssClass: "dsl-lyric-section"
    captureGroup: 0
    priority: 52
    flags: 'gi'

  # Suno \u98CE\u683C\u5143\u6807\u7B7E\uFF1A[style: pop] [genre: rock] [mood: happy]
  suno_meta:
    regex: '[(?:style|genre|mood|tempo|key|bpm|instrument|vocal|language|voice)s*[:\uFF1A]s*[^]]+]'
    cssClass: "dsl-suno-meta"
    captureGroup: 0
    priority: 50
    flags: 'gi'

  # \u6570\u5B57\u4EBA/\u865A\u62DF\u4E3B\u64AD\u6307\u4EE4\u6807\u7B7E\uFF1A[emotion]happy[/emotion] [gesture]wave[/gesture] [pause] [action]smile[/action]
  avatar_directive:
    regex: '[(?:emotion|gesture|action|pause|expression|pose|movement|gaze|blink|head|hand|body|camera|scene|transition)(?:s+[^]]*)?](?:[^[]*)?[/(?:emotion|gesture|action|expression|pose|movement|gaze|blink|head|hand|body|camera|scene|transition)]|[(?:pause|blink|nod|shake|wave|smile|frown|wink)]'
    cssClass: "dsl-avatar-directive"
    captureGroup: 0
    priority: 54
    flags: 'gi'

  # Excel Copilot \u51FD\u6570\uFF1A=COPILOT("\u63D0\u793A\u8BCD", A1:A100)
  copilot_formula:
    regex: '=(?:COPILOT|AI|GPT|CHATGPT|CLAUDE|GEMINI)s*([^)]*)'
    cssClass: "dsl-copilot-formula"
    captureGroup: 0
    priority: 56
    flags: 'gi'

  # ReAct Agent \u6807\u8BB0\uFF1AThought: / Action: / Observation: / Final Answer:
  react_marker:
    regex: '^(?:Thought|Action|Observation|Final Answer|Action Input|Question|Answer)s*[:\uFF1A]'
    cssClass: "dsl-react-marker"
    captureGroup: 0
    priority: 54
    flags: 'gmi'
    blockLevel: true

  # CoT \u89E6\u53D1\u77ED\u8BED\uFF1ALet's think step by step / \u8BA9\u6211\u4EEC\u4E00\u6B65\u6B65\u601D\u8003
  cot_trigger:
    regex: "(?:Let's think|\u8BA9\u6211\u4EEC|\u8BF7|\u9010\u6B65|step[- ]by[- ]step|\u4E00\u6B65\u4E00\u6B65|\u6309\u6B65\u9AA4|think step by step|reason step by step|chain of thought|\u601D\u7EF4\u94FE)[^\u3002.\\n]*"
    cssClass: "dsl-cot-trigger"
    captureGroup: 0
    priority: 48
    flags: 'gi'

  # AI \u6A21\u578B\u6807\u8BC6\u7B26\uFF1Agpt-4\u3001claude-3-opus\u3001gemini-pro\u3001dall-e-3\u3001midjourney-v6
  model_identifier:
    regex: '\b(?:gpt[- ]?d(?:.d)?(?:s*(?:turbo|mini|nano))?|claude[- ]?d(?:.d)?(?:s*(?:opus|sonnet|haiku|instant))?|gemini[- ]?(?:pro|ultra|flash|nano)?|dall[- ]?e[- ]?d|midjourney[- ]?vd|stable[- ]?diffusion[- ]?(?:xl|3|2|1)|sora|pika|runway[- ]?gen[- ]?d|seedance|kling|hunyuan|qwen[- ]?d|llama[- ]?d|mistral|mixtral|phi[- ]?d|gemma[- ]?d|deepseek|yi[- ]?d|baichuan|chatglm)\b'
    cssClass: "dsl-model-identifier"
    captureGroup: 0
    priority: 46
    flags: 'gi'

  # ComfyUI \u8282\u70B9\u8C03\u7528\uFF1AKSampler(...)\u3001CLIPTextEncode(...)\u3001VAEDecode(...)
  comfyui_node:
    regex: '\b(?:KSampler|CLIPTextEncode|VAEDecode|VAEEncode|CheckpointLoader|LoadCheckpoint|LoadVAE|LoadLoRA|LoraLoader|ControlNetApply|ControlNetLoader|IPAdapterApply|IPAdapterModelLoader|SaveImage|PreviewImage|LoadImage|UpscaleModelLoader|ESRGANUpscale|LatentUpscale|EmptyLatentImage|VAESave|ModelSamplingDiscrete|SamplerCustom|StableCascade_StageB|StableCascade_StageC|SwarmUI|UltimateSDUpscale|ImpactPack|AnimateDiff|AnimateDiffLoader|Deforum|FrameInterpolator|Reroute|PrimitiveNode|Note|Reroute|Seed|Context|SaveImageWebsocket|PreviewImageWebsocket)s*('
    cssClass: "dsl-comfyui-node"
    captureGroup: 0
    priority: 50
    flags: 'g'

  # Pika \u89C6\u9891\u53C2\u6570\uFF1A--camera pan right\u3001--motion 5\u3001--fps 24
  pika_parameter:
    regex: '--(?:camera|motion|fps|duration|aspect|ar|guidance|negative|prompt|strength|seed|loop|canvas|zoom|pan|tilt|rotate)s+S+'
    cssClass: "dsl-pika-parameter"
    captureGroup: 0
    priority: 48
    flags: 'gi'

  # Runway Gen \u53C2\u6570\uFF1A--prompt\u3001--motion_score\u3001--safety_check
  runway_parameter:
    regex: '--(?:prompt|motion_score|safety_check|seed|text_prompt|image_prompt|seconds|fps|resolution|model|style)s+S+'
    cssClass: "dsl-runway-parameter"
    captureGroup: 0
    priority: 48
    flags: 'gi'

  # \u7FFB\u8BD1\u4EFB\u52A1\u6807\u8BB0\uFF1ASource: / Target: / \u539F\u6587\uFF1A / \u8BD1\u6587\uFF1A
  translation_marker:
    regex: '^(?:Source|Target|\u539F\u6587|\u8BD1\u6587|\u6E90\u6587|Source Text|Target Text|SL|TL)s*[:\uFF1A]'
    cssClass: "dsl-translation-marker"
    captureGroup: 0
    priority: 52
    flags: 'gmi'
    blockLevel: true

  # Few-shot \u793A\u4F8B\u6807\u8BB0\uFF1AExample: / \u793A\u4F8B\uFF1A / Q: / A:
  fewshot_marker:
    regex: '^(?:Example|\u793A\u4F8B|\u4F8B\u5B50|\u6848\u4F8B|\u6837\u4F8B|Q|A|Question|Answer|Input|Output|\u8F93\u5165|\u8F93\u51FA|\u95EE\u9898|\u56DE\u7B54)s*[:\uFF1A]'
    cssClass: "dsl-fewshot-marker"
    captureGroup: 0
    priority: 50
    flags: 'gmi'
    blockLevel: true

  # 3D \u751F\u6210\u5E73\u53F0\u6807\u8BC6\uFF1A[Meshy] [Hunyuan3D] [Rodin] [Genie]
  gen3d_platform:
    regex: '[(?:Meshy|Hunyuan3D|Rodin|Hyper3D|Genie|Shap-E|DreamFusion|3DGen|Tripo3D|Tripo3)]'
    cssClass: "dsl-gen3d-platform"
    captureGroup: 0
    priority: 50
    flags: 'gi'

  # ============================================================
  # \u4E5D\u3001\u663E\u5F0F\u8FB9\u754C\u6807\u8BB0\uFF08v2.5.0 \u65B0\u589E\uFF0C\u501F\u9274\u6587\u8A00\u8BED\u8A00\u300C\u300D\u673A\u5236\uFF09
  # ============================================================

  # \u663E\u5F0F\u6807\u8BC6\u7B26\uFF1A\u300C\u6807\u8BC6\u7B26\u300D\u3001\u300E\u6807\u8BC6\u7B26\u300F\uFF08\u501F\u9274\u6587\u8A00\u7684\u6807\u8BC6\u7B26\u5305\u88F9\u673A\u5236\uFF1B\u6392\u9664\u6362\u884C\u9632\u8DE8\u884C\u914D\u5BF9\uFF09
  explicit_identifier:
    regex: '\u300C([^\u300D
]+)\u300D|\u300E([^\u300F
]+)\u300F'
    cssClass: "dsl-explicit-identifier"
    captureGroup: 0
    priority: 65
    flags: 'g'

  # \u663E\u5F0F\u5B57\u7B26\u4E32\uFF1A\u300C"\u5B57\u7B26\u4E32"\u300D\u3001\u300E"\u5B57\u7B26\u4E32"\u300F\uFF08\u53CC\u5C42\u5F15\u53F7\uFF0C\u501F\u9274\u6587\u8A00\u5B57\u9762\u91CF\u8BED\u6CD5\uFF1B\u6392\u9664\u6362\u884C\u9632\u8DE8\u884C\u914D\u5BF9\uFF09
  explicit_string:
    regex: '\u300C"([^"
]+)"\u300D|\u300E"([^"
]+)"\u300F'
    cssClass: "dsl-explicit-string"
    captureGroup: 0
    priority: 59
    flags: 'g'

  # ============================================================
  # \u5341\u3001\u7EA6\u675F\u5173\u952E\u5B57\u5206\u5C42\uFF08v2.5.0 \u65B0\u589E\uFF0C\u501F\u9274\u6613\u8BED\u8A00\u4FDD\u7559\u5B57\u5206\u5C42\uFF09
  # ============================================================

  # \u7EDD\u5BF9\u7EA6\u675F\u5173\u952E\u5B57\uFF1A\u7981\u6B62/\u4E25\u7981/\u675C\u7EDD/\u4E0D\u5F97/\u4E0D\u5141\u8BB8/\u5207\u52FF/\u52FF\u8981
  # \u524D\u4F4D\u5426\u5B9A\u8BCD\u65AD\u8A00\u907F\u514D"\u65E0\u7981\u6B62"\u8BEF\u5339\u914D\uFF0C\u540E\u63A5\u4EFB\u610F\u5185\u5BB9\u5747\u53EF\uFF08\u4E2D\u6587\u8BCD\u672C\u8EAB\u72EC\u7ACB\uFF09
  constraint_absolute:
    regex: '(?<!\u65E0|\u4E0D|\u975E|\u672A)(\u7981\u6B62|\u4E25\u7981|\u675C\u7EDD|\u4E0D\u5F97|\u4E0D\u5141\u8BB8|\u5207\u52FF|\u52FF\u8981)'
    cssClass: "dsl-constraint"
    captureGroup: 0
    priority: 55
    flags: 'gi'

  # \u8F6F\u7EA6\u675F\u5173\u952E\u5B57\uFF1A\u6392\u9664/\u907F\u514D/\u4FDD\u8BC1/\u9501\u5B9A/\u4EC5\u4FDD\u7559/\u4E25\u683C
  # \u9700\u540E\u63A5\u5192\u53F7\u624D\u9AD8\u4EAE\uFF08\u4E0A\u4E0B\u6587\u6D88\u6B67\uFF09
  constraint_soft:
    regex: '(\u6392\u9664|\u907F\u514D|\u4FDD\u8BC1|\u9501\u5B9A|\u4EC5\u4FDD\u7559|\u4E25\u683C)(?=[\uFF1A:])'
    cssClass: "dsl-constraint"
    captureGroup: 0
    priority: 50
    flags: 'gi'

  # ============================================================
  # \u5341\u4E00\u3001\u53C2\u6570\u952E\u4F4D\u7F6E\u6D88\u6B67\uFF08v2.5.0 \u65B0\u589E\uFF0C\u501F\u9274\u4E2D\u87D2\u8BED\u6CD5\u4F4D\u7F6E\u5224\u65AD\uFF09
  # ============================================================

  # \u4E25\u683C\u53C2\u6570\u952E\uFF1A\u524D\u4F4D\u4E3A\u884C\u9996/\u7A7A\u683C/\u6807\u70B9\uFF0C\u540E\u4F4D\u5FC5\u987B\u6709\u503C
  param_key_strict:
    regex: '(?<=^|s|[\uFF0C\u3002\u3001\uFF1B])([\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF]{2,10})(?:s*[\uFF08(][^\uFF09)]*[\uFF09)])?s*[\uFF1A:](?!s*")(?=S)'
    cssClass: "dsl-param-key"
    captureGroup: 0
    priority: 46
    flags: 'gm'

  # ============================================================
  # \u5341\u4E8C\u3001\u53F0\u8BCD\u4E0E\u62EC\u53F7\u8FB9\u754C\u65AD\u8A00\uFF08v2.5.0 \u65B0\u589E\uFF0C\u501F\u9274\u4E2D\u6587\u7F16\u7A0B\u8BED\u8A00\u8BCD\u8FB9\u754C\uFF09
  # ============================================================

  # \u4E25\u683C\u4E2D\u6587\u5F15\u53F7\u53F0\u8BCD\uFF1A\u524D\u4F4D\u4E3A\u884C\u9996/\u7A7A\u683C/\u6807\u70B9/\u8BF4\u5B57\uFF08\u540E\u4F4D\u4E0D\u9650\u5236\uFF0C\u5141\u8BB8\u53F0\u8BCD\u540E\u63A5\u52A8\u8BCD\uFF1B\u6392\u9664\u6362\u884C\u9632\u8DE8\u884C\u914D\u5BF9\uFF09
  dialogue_cn_strict:
    regex: '(?<=^|s|[\uFF0C\u3002\u3001\uFF1B\uFF1A]|\u8BF4)[""\u300C]([^""\u300D
]+)[""\u300D]'
    cssClass: "dsl-dialogue"
    captureGroup: 0
    priority: 52
    flags: 'gm'

  # \u4E25\u683C\u5168\u89D2\u62EC\u53F7\u6CE8\u91CA\uFF1A\u524D\u4F4D\u4E3A\u884C\u9996/\u7A7A\u683C/\u6807\u70B9
  parenthetical_strict:
    regex: '(?<=^|s|[\uFF0C\u3002\u3001\uFF1B\uFF1A])\uFF08([^\uFF09]+)\uFF09'
    cssClass: "dsl-parenthetical"
    captureGroup: 0
    priority: 27

  # \u534A\u89D2\u62EC\u53F7\u6CE8\u91CA\uFF08\u975E\u6570\u5B57\u5185\u5BB9\uFF09\uFF1A\u4E0E emphasis_weight \u5206\u5C42
  parenthetical_half:
    regex: '(([^()0-9]+))'
    cssClass: "dsl-parenthetical-half"
    captureGroup: 0
    priority: 26

  # ============================================================
  # \u4E94\u3001AI \u5E38\u89C1\u7B26\u53F7\uFF0834 \u7C7B\uFF0C2026-09-14\uFF09
  # \u89C4\u5219\u6B63\u5219\u5B9A\u4E49\u5728\u5305 rules/*.json \u4E2D\uFF08regex \u975E\u7A7A\uFF09\uFF0C
  # \u7531\u300CMarkdown \u663E\u793A\u4F18\u5316\u5305\u300D\u542F\u7528\u65F6\u6CE8\u5165\uFF0C\u907F\u514D\u5168\u5C40\u9AD8\u9891\u5B57\u7B26\u5339\u914D
  # \u5E72\u6270\u7F16\u8F91\u5668\u9AD8\u4EAE\uFF08\u5982 \u2192 == \u03B1 \xB0 \u7B49\u5728\u666E\u901A\u6587\u672C\u4E2D\u9891\u7E41\u51FA\u73B0\uFF09
  # \u6837\u5F0F\u5B9A\u4E49\u89C1 04-theme-color.yaml styleRules: dsl-sym-*
  # ============================================================
`,ao=`# \u4E0A\u4E0B\u6587\u8BED\u4E49\u4F53\u7CFB\uFF08\u9AD8\u7EA7\u7740\u8272\u6838\u5FC3\uFF09
# \u5B9E\u73B0\u7236\u7EA7\u533A\u5757\u51B3\u5B9A\u5B50\u5185\u5BB9\u7740\u8272\u903B\u8F91\uFF0C\u65B0\u589E\u7AE0\u8282\u65E0\u9700\u4FEE\u6539\u63D2\u4EF6
# \u7236\u7EA7\u533A\u5757 -> \u5B50\u8282\u70B9\u751F\u6548\u89C4\u5219\u6620\u5C04

contextMap:
  # ============================================================
  # \u4E00\u3001\u5F71\u89C6\u5206\u955C\u7C7B\u533A\u5757
  # ============================================================
  "\u3010\u6574\u4F53\u8BBE\u5B9A\u3011":
    allowPatterns:
      - asset_ref
      - asset_bracket
      - param_key
      - constraint
      - tech_param
      - audio_ref
      - audio_tone

  "\u3010\u5206\u955C\u8BBE\u8BA1\u3011":
    allowPatterns:
      - shot_header
      - asset_ref
      - asset_bracket
      - param_key
      - dialogue_cn
      - dialogue_en
      - constraint
      - tech_param
      - parenthetical
      - audio_ref
      - audio_tone
      - audio_sfx

  "\u3010\u89D2\u8272\u8BBE\u5B9A\u3011":
    allowPatterns:
      - param_key
      - constraint
      - dialogue_cn
      - dialogue_en
      - parenthetical
      - asset_ref
      - asset_bracket

  "\u3010\u4EBA\u7269\u8BBE\u5B9A\u3011":
    allowPatterns:
      - param_key
      - constraint
      - dialogue_cn
      - dialogue_en
      - parenthetical
      - asset_ref

  "\u3010\u4E16\u754C\u89C2\u3011":
    allowPatterns:
      - param_key
      - constraint
      - asset_ref
      - tech_param

  "\u3010\u4E16\u754C\u8BBE\u5B9A\u3011":
    allowPatterns:
      - param_key
      - constraint
      - asset_ref
      - tech_param

  "\u3010\u5267\u60C5\u5927\u7EB2\u3011":
    allowPatterns:
      - constraint
      - dialogue_cn
      - dialogue_en
      - parenthetical
      - shot_header

  "\u3010\u5267\u60C5\u6897\u6982\u3011":
    allowPatterns:
      - constraint
      - dialogue_cn
      - dialogue_en
      - parenthetical

  "\u3010\u53F0\u8BCD\u811A\u672C\u3011":
    allowPatterns:
      - dialogue_cn
      - dialogue_en
      - constraint
      - parenthetical
      - role_tag

  "\u3010\u5BF9\u767D\u8BBE\u8BA1\u3011":
    allowPatterns:
      - dialogue_cn
      - dialogue_en
      - constraint
      - parenthetical

  "\u3010\u97F3\u6548\u8BBE\u8BA1\u3011":
    allowPatterns:
      - audio_ref
      - audio_tone
      - audio_sfx
      - param_key
      - constraint
      - tech_param

  "\u3010\u97F3\u9891\u8BBE\u8BA1\u3011":
    allowPatterns:
      - audio_ref
      - audio_tone
      - audio_sfx
      - param_key
      - constraint

  "\u3010\u540E\u671F\u8C03\u8272\u3011":
    allowPatterns:
      - tech_param
      - param_key
      - constraint
      - hex_color
      - css_color_func

  "\u3010\u8272\u5F69\u65B9\u6848\u3011":
    allowPatterns:
      - tech_param
      - param_key
      - constraint
      - hex_color
      - css_color_func

  "\u3010\u955C\u5934\u6E05\u5355\u3011":
    allowPatterns:
      - shot_header
      - param_key
      - tech_param
      - asset_ref
      - asset_bracket
      - constraint

  "\u3010\u8D44\u4EA7\u6E05\u5355\u3011":
    allowPatterns:
      - asset_ref
      - asset_bracket
      - param_key
      - file_path
      - url_link

  "\u3010\u8F6C\u573A\u8BBE\u8BA1\u3011":
    allowPatterns:
      - param_key
      - constraint
      - tech_param

  "\u3010\u573A\u666F\u8BBE\u5B9A\u3011":
    allowPatterns:
      - param_key
      - constraint
      - asset_ref
      - tech_param
      - parenthetical

  # ============================================================
  # \u4E8C\u3001AI \u63D0\u793A\u8BCD\u5DE5\u7A0B\u533A\u5757
  # ============================================================
  "\u3010\u7CFB\u7EDF\u63D0\u793A\u3011":
    allowPatterns:
      - role_tag
      - instruction
      - xml_block
      - antml_tag
      - chat_token
      - llama2_sys
      - llama3_token
      - gemma_token
      - constraint
      - param_key
      - variable
      - jinja_control
      - json_schema_key

  "\u3010\u7528\u6237\u8F93\u5165\u3011":
    allowPatterns:
      - variable
      - param_key
      - constraint
      - parenthetical

  "\u3010\u8F93\u51FA\u683C\u5F0F\u3011":
    allowPatterns:
      - xml_block
      - json_schema_key
      - param_key
      - constraint
      - jinja_control

  "\u3010\u793A\u4F8B\u3011":
    allowPatterns:
      - role_tag
      - instruction
      - xml_block
      - dialogue_en
      - dialogue_cn
      - param_key

  "\u3010\u8D1F\u9762\u63D0\u793A\u8BCD\u3011":
    allowPatterns:
      - sd_negative_header
      - constraint
      - param_key

  "\u3010\u91C7\u6837\u53C2\u6570\u3011":
    allowPatterns:
      - tech_param
      - sd_parameter
      - param_key
      - measurement
      - percentage
      - param_key_strict

  "\u3010\u53C2\u6570\u914D\u7F6E\u3011":
    allowPatterns:
      - tech_param
      - sd_parameter
      - param_key
      - measurement
      - percentage
      - version_number
      - param_key_strict

  "\u3010LoRA\u914D\u7F6E\u3011":
    allowPatterns:
      - lora_ref
      - param_key
      - tech_param
      - sd_parameter
      - param_key_strict

  "\u3010\u5DE5\u4F5C\u6D41\u3011":
    allowPatterns:
      - workflow_sep
      - workflow_node
      - variable
      - jinja_control
      - param_key
      - constraint

  # ============================================================
  # \u4E09\u3001\u5206\u955C\u811A\u672C\u6269\u5C55\u533A\u5757\uFF08v2.3.0 \u65B0\u589E\uFF09
  # ============================================================
  "\u6BB5\u843D\u8BF4\u660E":
    allowPatterns:
      - segment_header
      - module_header
      - section_note
      - param_key
      - parenthetical
      - time_range
      - tech_param

  "\u5206\u955C\u6A21\u5757":
    allowPatterns:
      - shot_header
      - shot_id
      - param_key
      - dialogue_speaker
      - dialogue_cn
      - dialogue_en
      - parenthetical
      - time_range
      - constraint
      - variable

  "\u8C03\u5EA6\u8BBE\u8BA1":
    allowPatterns:
      - param_key
      - constraint
      - parenthetical
      - book_title
      - cn_chapter

  "\u89D2\u8272\u8BBE\u5B9A\u6269\u5C55":
    allowPatterns:
      - character_def
      - param_key
      - constraint
      - parenthetical
      - dialogue_cn
      - dialogue_en
      - variable
      - measurement

  "\u5168\u5C40\u8BBE\u5B9A":
    allowPatterns:
      - cn_chapter
      - param_key
      - constraint
      - tech_param
      - parenthetical
      - measurement
      - character_def

  "\u5F71\u89C6\u5BF9\u6807":
    allowPatterns:
      - book_title
      - param_key
      - parenthetical

  # ============================================================
  # \u56DB\u3001AI \u591A\u6A21\u6001\u6269\u5C55\u533A\u5757\uFF08v2.4.0 \u65B0\u589E\uFF09
  # ============================================================
  "\u3010\u8BED\u97F3\u5408\u6210\u3011":
    allowPatterns:
      - ssml_tag
      - param_key
      - constraint
      - tech_param
      - parenthetical

  "\u3010SSML\u914D\u7F6E\u3011":
    allowPatterns:
      - ssml_tag
      - param_key
      - constraint
      - measurement
      - percentage

  "\u3010\u6570\u5B57\u4EBA\u3011":
    allowPatterns:
      - avatar_directive
      - param_key
      - constraint
      - dialogue_cn
      - dialogue_en
      - parenthetical
      - tech_param

  "\u3010\u865A\u62DF\u4E3B\u64AD\u3011":
    allowPatterns:
      - avatar_directive
      - param_key
      - dialogue_cn
      - dialogue_en
      - parenthetical

  "\u3010\u97F3\u4E50\u751F\u6210\u3011":
    allowPatterns:
      - lyric_section
      - suno_meta
      - param_key
      - constraint
      - tech_param
      - parenthetical

  "\u3010\u6B4C\u8BCD\u521B\u4F5C\u3011":
    allowPatterns:
      - lyric_section
      - suno_meta
      - dialogue_cn
      - dialogue_en
      - parenthetical

  "\u30103D\u5EFA\u6A21\u3011":
    allowPatterns:
      - gen3d_platform
      - param_key
      - constraint
      - tech_param
      - measurement
      - parenthetical

  "\u30103D\u751F\u6210\u3011":
    allowPatterns:
      - gen3d_platform
      - param_key
      - constraint
      - tech_param
      - parenthetical

  "\u3010\u6570\u636E\u5206\u6790\u3011":
    allowPatterns:
      - copilot_formula
      - param_key
      - constraint
      - tech_param
      - measurement
      - percentage

  "\u3010Excel AI\u3011":
    allowPatterns:
      - copilot_formula
      - param_key
      - constraint
      - measurement

  "\u3010Agent\u7CFB\u7EDF\u3011":
    allowPatterns:
      - react_marker
      - cot_trigger
      - model_identifier
      - xml_block
      - function_results_tag
      - json_schema_key
      - param_key
      - constraint
      - variable

  "\u3010ReAct\u6D41\u7A0B\u3011":
    allowPatterns:
      - react_marker
      - cot_trigger
      - model_identifier
      - param_key
      - constraint
      - variable

  "\u3010CoT\u63A8\u7406\u3011":
    allowPatterns:
      - cot_trigger
      - param_key
      - constraint
      - variable

  "\u3010Logo\u8BBE\u8BA1\u3011":
    allowPatterns:
      - param_key
      - constraint
      - hex_color
      - css_color_func
      - parenthetical
      - tech_param

  "\u3010\u56FE\u6807\u8BBE\u8BA1\u3011":
    allowPatterns:
      - param_key
      - constraint
      - hex_color
      - css_color_func
      - parenthetical

  "\u3010\u5BA4\u5185\u8BBE\u8BA1\u3011":
    allowPatterns:
      - param_key
      - constraint
      - hex_color
      - css_color_func
      - measurement
      - parenthetical
      - tech_param

  "\u3010\u5EFA\u7B51\u8BBE\u8BA1\u3011":
    allowPatterns:
      - param_key
      - constraint
      - hex_color
      - css_color_func
      - measurement
      - parenthetical
      - tech_param

  "\u3010\u6F2B\u753B\u521B\u4F5C\u3011":
    allowPatterns:
      - shot_header
      - param_key
      - dialogue_cn
      - dialogue_en
      - parenthetical
      - constraint
      - tech_param

  "\u3010\u7ED8\u672C\u521B\u4F5C\u3011":
    allowPatterns:
      - param_key
      - dialogue_cn
      - dialogue_en
      - parenthetical
      - constraint

  "\u3010\u6E38\u620F\u5F00\u53D1\u3011":
    allowPatterns:
      - param_key
      - constraint
      - dialogue_cn
      - dialogue_en
      - parenthetical
      - variable
      - tech_param

  "\u3010NPC\u5BF9\u8BDD\u3011":
    allowPatterns:
      - dialogue_cn
      - dialogue_en
      - param_key
      - parenthetical
      - constraint
      - variable

  "\u3010\u7FFB\u8BD1\u4EFB\u52A1\u3011":
    allowPatterns:
      - translation_marker
      - dialogue_cn
      - dialogue_en
      - param_key
      - constraint

  "\u3010Few-shot\u793A\u4F8B\u3011":
    allowPatterns:
      - fewshot_marker
      - dialogue_cn
      - dialogue_en
      - param_key
      - parenthetical

  "\u3010\u6A21\u578B\u5BF9\u6BD4\u3011":
    allowPatterns:
      - model_identifier
      - param_key
      - constraint
      - tech_param
      - percentage
      - measurement

  "\u3010ComfyUI\u5DE5\u4F5C\u6D41\u3011":
    allowPatterns:
      - comfyui_node
      - param_key
      - sd_parameter
      - tech_param
      - measurement
      - constraint

  "\u3010\u89C6\u9891\u751F\u6210\u3011":
    allowPatterns:
      - pika_parameter
      - runway_parameter
      - model_identifier
      - param_key
      - tech_param
      - constraint
      - parenthetical

  # ============================================================
  # \u4E94\u3001\u4E2D\u6587\u7F16\u7A0B\u6807\u8BC6\u903B\u8F91\u6269\u5C55\u533A\u5757\uFF08v2.5.0 \u65B0\u589E\uFF09
  # \u652F\u6301\u8F6F\u5173\u952E\u5B57\u4E0A\u4E0B\u6587\u8BC6\u522B\u4E0E\u663E\u5F0F\u6807\u8BC6\u7B26\u58F0\u660E
  # ============================================================
  "\u3010\u7EA6\u675F\u3011":
    allowPatterns:
      - constraint_absolute
      - constraint_soft
      - constraint
      - param_key
      - param_key_strict
      - parenthetical
      - parenthetical_strict

# \u8DE8\u884C\u72B6\u6001\u5B9A\u4E49\uFF08\u89E3\u51B3\u591A\u884C\u6CE8\u91CA\u3001\u8DE8\u6BB5\u843D\u8D44\u4EA7\u89E3\u6790\u9519\u4E71\uFF09
scanStateEnum:
  Normal: 0
  InQuoteDialogue: 1
  InBlockWrapper: 2
  InCodeFence: 3
  InMathBlock: 4
  InComment: 5
`,no=`# \u53EF\u9009\u4E1A\u52A1\u8BCD\u5178\uFF08\u8F7B\u91CF\u5316\uFF09
# \u4EC5\u505A\u7CBE\u7EC6\u5316\u4E8C\u6B21\u4E0A\u8272\uFF0C\u5220\u9664\u540E\u57FA\u7840\u9AD8\u4EAE\u5B8C\u5168\u6B63\u5E38\u8FD0\u884C
# \u65B0\u589E\u5173\u952E\u8BCD\u4EC5\u8FFD\u52A0\u6570\u7EC4\uFF0C\u65E0\u9700\u4FEE\u6539\u63D2\u4EF6\u4EE3\u7801
# \u672C\u6587\u4EF6\u5305\u542B 25 \u4E2A\u884C\u4E1A\u7C7B\u522B\u7684\u4E2D\u82F1\u6587\u4E13\u4E1A\u672F\u8BED
# \u6240\u6709\u5B57\u7B26\u4E32\u5747\u7528\u53CC\u5F15\u53F7\u5305\u88F9\u4EE5\u907F\u514D YAML \u7279\u6B8A\u5B57\u7B26\u89E3\u6790\u95EE\u9898

lexicon:
  # ============================================================
  # 1. \u955C\u5934\u8FD0\u52A8\u672F\u8BED
  # ============================================================
  camera_move:
    # --- \u5DF2\u6709\u4E2D\u6587\u672F\u8BED ---
    - "\u63A8\u955C\u5934"
    - "\u62C9\u955C\u5934"
    - "\u6447\u955C\u5934"
    - "\u8DDF\u955C\u5934"
    - "\u79FB\u955C\u5934"
    - "\u5347\u964D\u955C\u5934"
    - "\u5FAE\u63A8\u955C\u5934"
    - "\u77ED\u4FC3\u8F7B\u63A8"
    - "\u8F7B\u5FAE\u540E\u62C9"
    - "\u5FAE\u6447\u955C\u5934"
    - "\u7F13\u6162\u63A8\u955C\u5934"
    - "\u5FEB\u901F\u63A8\u955C\u5934"
    - "\u73AF\u7ED5\u955C\u5934"
    - "\u65CB\u8F6C\u955C\u5934"
    - "\u4FEF\u4EF0\u955C\u5934"
    - "\u6A2A\u79FB\u955C\u5934"
    - "\u7EB5\u79FB\u955C\u5934"
    - "\u5F27\u5F62\u8FD0\u52A8"
    - "\u5FAE\u56FA\u5B9A"
    - "\u955C\u5934\u547C\u5438\u611F"
    # --- \u5DF2\u6709\u82F1\u6587\u672F\u8BED ---
    - "push in"
    - "pull back"
    - "pan left"
    - "pan right"
    - "tilt up"
    - "tilt down"
    - "zoom in"
    - "zoom out"
    - "tracking shot"
    - "dolly shot"
    - "crane shot"
    - "handheld"
    - "steady cam"
    - "drone shot"
    - "aerial shot"
    - "orbit shot"
    - "rotate shot"
    - "rack focus"
    - "whip pan"
    # --- \u6269\u5C55\u82F1\u6587\u672F\u8BED ---
    - "Dutch angle"
    - "Steadicam"
    - "Gimbal"
    - "FPV"
    - "Bird's eye view"
    - "Worm's eye view"
    - "Jib shot"
    - "Arc shot"
    - "Dolly zoom"
    - "Vertigo effect"
    - "Snap zoom"
    - "Tilt-shift"
    - "Dutch tilt"
    - "Low angle"
    - "High angle"
    - "Eye level"
    - "Over the shoulder"
    - "Point of view"
    - "Establishing shot"
    - "Insert shot"
    - "Cutaway"
    - "Two shot"
    - "Three shot"
    - "Group shot"
    - "Wide shot"
    - "Extreme wide shot"
    - "Medium shot"
    - "Medium close-up"
    - "Close-up"
    - "Extreme close-up"
    - "Cowboy shot"
    - "Full shot"
    - "Master shot"
    # --- \u6269\u5C55\u4E2D\u6587\u672F\u8BED ---
    - "\u8377\u5170\u89D2"
    - "\u7A33\u5B9A\u5668"
    - "\u9E1F\u77B0"
    - "\u866B\u77B0"
    - "\u5F27\u7EBF\u955C\u5934"
    - "\u63A8\u8F68\u53D8\u7126"
    - "\u7729\u6655\u6548\u679C"
    - "\u7529\u955C\u5934"
    - "\u6025\u901F\u53D8\u7126"
    - "\u7126\u70B9\u8F6C\u6362"
    - "\u79FB\u8F74"
    - "\u4F4E\u4F4D\u4EF0\u62CD"
    - "\u9AD8\u4F4D\u4FEF\u62CD"
    - "\u5E73\u89C6"
    - "\u8FC7\u80A9\u955C\u5934"
    - "\u4E3B\u89C2\u89C6\u89D2"
    - "\u5EFA\u7ACB\u955C\u5934"
    - "\u63D2\u5165\u955C\u5934"
    - "\u5207\u51FA\u955C\u5934"
    - "\u53CC\u4EBA\u955C\u5934"
    - "\u4E09\u4EBA\u955C\u5934"
    - "\u7FA4\u50CF\u955C\u5934"
    - "\u8FDC\u666F"
    - "\u5927\u8FDC\u666F"
    - "\u4E2D\u666F"
    - "\u4E2D\u8FD1\u666F"
    - "\u8FD1\u666F"
    - "\u7279\u5199"
    - "\u5927\u7279\u5199"
    - "\u725B\u4ED4\u955C\u5934"
    - "\u5168\u666F"
    - "\u4E3B\u955C\u5934"

  # ============================================================
  # \u666F\u522B\u7EC4\u5408\u672F\u8BED\uFF08v2.3.0 \u65B0\u589E\uFF09
  # ============================================================
  shot_size:
    - "\u53CC\u4EBA\u8FD1\u666F"
    - "\u53CC\u4EBA\u4E2D\u666F"
    - "\u53CC\u4EBA\u5168\u8EAB"
    - "\u4E0A\u534A\u8EAB\u7279\u5199"
    - "\u4E0B\u534A\u8EAB\u7279\u5199"
    - "\u808C\u80A4\u5C40\u90E8\u7279\u5199"
    - "\u9762\u90E8\u7279\u5199"
    - "\u773C\u795E\u7279\u5199"
    - "\u5634\u5507\u7279\u5199"
    - "\u9501\u9AA8\u7279\u5199"
    - "\u624B\u90E8\u7279\u5199"
    - "\u6B63\u53CD\u7279\u5199"
    - "\u8FC7\u80A9\u7279\u5199"
    - "\u80CC\u5F71\u7279\u5199"
    - "\u526A\u5F71\u7279\u5199"
    - "\u8F6E\u5ED3\u7279\u5199"
    # --- v2.3.1 \u6269\u5C55\u7EC4\u5408\u666F\u522B ---
    - "\u624B\u90E8\u6781\u81F4\u5FAE\u8DDD\u7279\u5199"
    - "\u7AD6\u5C4F\u5355\u4EBA\u8FD1\u666F"
    - "\u5FAE\u8DDD\u7279\u5199"
    - "\u6781\u81F4\u5FAE\u8DDD"

  # ============================================================
  # \u673A\u4F4D\u56FA\u5B9A\u4E0E\u8FD0\u52A8\u7EC4\u5408\uFF08v2.3.0 \u65B0\u589E\uFF09
  # ============================================================
  camera_fixed:
    - "\u5FAE\u4FEF\u56FA\u5B9A"
    - "\u5FAE\u4EF0\u56FA\u5B9A"
    - "\u5E73\u89C6\u56FA\u5B9A"
    - "\u4FA7\u5149\u56FA\u5B9A"
    - "\u9876\u5149\u56FA\u5B9A"
    - "\u9006\u5149\u56FA\u5B9A"
    - "\u987A\u5149\u56FA\u5B9A"
    - "\u56FA\u5B9A\u4E0D\u52A8"
    - "\u56FA\u5B9A\u673A\u4F4D"
    - "\u56FA\u5B9A\u7279\u5199"
    - "\u56FA\u5B9A\u955C\u5934"
    - "\u56FA\u5B9A\u8FD1\u666F"
    - "\u56FA\u5B9A\u4E2D\u666F"
    - "\u56FA\u5B9A\u5168\u666F"
    - "\u7F13\u6162\u524D\u63A8"
    - "\u5FEB\u901F\u524D\u63A8"
    - "\u7F13\u6162\u540E\u62C9"
    - "\u5FEB\u901F\u540E\u62C9"
    - "\u5FAE\u524D\u63A8"
    - "\u5FAE\u540E\u62C9"
    - "\u6A2A\u79FB\u8DDF\u968F"
    - "\u7EB5\u79FB\u8DDF\u968F"
    - "\u5F27\u5F62\u56F4\u7ED5"
    - "\u73AF\u7ED5\u8DDF\u968F"
    # --- v2.3.1 \u6269\u5C55\u8FD0\u955C\u672F\u8BED ---
    - "\u8DDF\u624B\u52A8\u6001\u8FD0\u955C"
    - "\u5300\u901F\u79FB\u52A8"
    - "\u5E73\u7A33\u62C9\u955C"
    - "\u5FAE\u63A8\u9501\u5B9A"
    - "\u547C\u5438\u6643\u52A8"
    - "\u9759\u6B62\u5B9A\u683C"
    - "\u5C0F\u5E45\u62C9\u955C"
    - "\u5C0F\u5E45\u524D\u63A8"
    - "\u5C0F\u5E45\u540E\u62C9"

  # ============================================================
  # \u5F71\u89C6\u8C03\u5EA6\u672F\u8BED\uFF08v2.3.0 \u65B0\u589E\uFF09
  # ============================================================
  blocking:
    - "\u573A\u9762\u8C03\u5EA6"
    - "\u7A7A\u95F4\u8C03\u5EA6"
    - "\u4EBA\u7269\u7AD9\u4F4D\u8C03\u5EA6"
    - "\u955C\u5934\u8C03\u5EA6"
    - "\u5149\u5F71\u8C03\u5EA6"
    - "\u8868\u6F14\u8C03\u5EA6"
    - "\u52A8\u4F5C\u8C03\u5EA6"
    - "\u8272\u5F69\u8C03\u5EA6"
    - "\u58F0\u97F3\u8C03\u5EA6"
    - "\u52A8\u7EBF"
    - "\u7AD9\u4F4D"
    - "\u8F74\u7EBF"
    - "\u8D8A\u8F74"
    - "\u5BF9\u8F74"
    - "\u673A\u4F4D"
    - "\u666F\u6DF1"
    - "\u538B\u7F29\u7A7A\u95F4"
    - "\u62C9\u5F00\u7A7A\u95F4"
    - "\u8D34\u8EAB\u5BF9\u5CD9"
    - "\u9AD8\u4F4E\u4F4D\u5DEE"
    - "\u5F3A\u5F31\u533A"
    - "\u89C6\u89C9\u91CD\u5FC3"
    - "\u524D\u666F\u906E\u6321"
    - "\u80CC\u666F\u865A\u5316"
    - "\u7A7A\u95F4\u951A\u5B9A"
    - "\u65B9\u5411\u9501"
    - "\u89D2\u8272\u9501\u5B9A"
    - "\u6BB5\u5C3E\u94A9\u5B50"
    - "\u620F\u5267\u5185\u6838"
    - "\u620F\u5267\u53CD\u5DEE"
    - "\u8868\u6F14\u5206\u5C42"
    - "\u955C\u5934\u9012\u8FDB"

  # ============================================================
  # \u7126\u6BB5\u672F\u8BED\uFF08v2.3.1 \u65B0\u589E\uFF09
  # ============================================================
  focal_length:
    - "\u957F\u7126\u5FAE\u8DDD"
    - "\u4EBA\u50CF\u7126\u6BB5"
    - "\u5E7F\u89D2\u7126\u6BB5"
    - "\u6807\u51C6\u7126\u6BB5"
    - "\u957F\u7126\u7126\u6BB5"
    - "\u5FAE\u8DDD\u7126\u6BB5"
    - "\u9C7C\u773C\u7126\u6BB5"
    - "\u79FB\u8F74\u7126\u6BB5"
    - "\u4E2D\u7126\u7126\u6BB5"
    - "\u77ED\u7126\u7126\u6BB5"

  # ============================================================
  # \u5F71\u89C6\u8868\u6F14\u672F\u8BED\uFF08v2.3.1 \u65B0\u589E\uFF09
  # ============================================================
  performance:
    - "\u8170\u80CC\u633A\u76F4"
    - "\u4FA7\u8138\u51B7\u786C"
    - "\u51B7\u6DE1\u65E0\u89C6"
    - "\u5A07\u67D4\u8C04\u5A9A"
    - "\u67D4\u5A9A\u7B11\u610F"
    - "\u80A2\u4F53\u52A8\u4F5C\u8FDE\u8D2F"
    - "\u547C\u5438\u523B\u610F\u653E\u8F7B"
    - "\u60C5\u7EEA\u8D77\u4F0F"
    - "\u523B\u610F\u8BA8\u597D"
    - "\u89C6\u7EBF\u9ECF\u5728"
    - "\u8111\u888B\u8F7B\u9760"
    - "\u80A9\u8180\u8E6D\u52A8"
    - "\u7709\u773C\u5F2F\u8D77"
    - "\u6BEB\u65E0\u60C5\u7EEA\u8D77\u4F0F"

  # ============================================================
  # 2. \u5149\u5F71\u672F\u8BED
  # ============================================================
  light_effect:
    # --- \u5DF2\u6709\u4E2D\u6587\u672F\u8BED ---
    - "\u4FA7\u5149"
    - "\u51B7\u8C03"
    - "\u6696\u8C03"
    - "\u8F6E\u5ED3\u5149"
    - "\u706B\u5149\u7167\u660E"
    - "\u660F\u6697\u9634\u5F71"
    - "\u4FA7\u9762\u5F3A\u5149"
    - "\u534A\u8FB9\u8138\u9690\u5728\u6697\u4E2D"
    - "\u81EA\u7136\u5149"
    - "\u9006\u5149"
    - "\u9876\u5149"
    - "\u67D4\u5149"
    - "\u786C\u5149"
    # --- \u6269\u5C55\u82F1\u6587\u672F\u8BED ---
    - "Key light"
    - "Fill light"
    - "Back light"
    - "Rim light"
    - "Ambient light"
    - "Practical light"
    - "Hard light"
    - "Soft light"
    - "Directional light"
    - "Diffused light"
    - "Spotlight"
    - "Floodlight"
    - "Neon light"
    - "Candlelight"
    - "Moonlight"
    - "Sunlight"
    - "Golden hour"
    - "Blue hour"
    - "Magic hour"
    - "Rembrandt lighting"
    - "Butterfly lighting"
    - "Split lighting"
    - "Loop lighting"
    - "Broad lighting"
    - "Short lighting"
    - "High key"
    - "Low key"
    - "Chiaroscuro"
    - "Three-point lighting"
    - "Studio lighting"
    - "Natural lighting"
    - "Silhouette"
    - "Lens flare"
    - "God rays"
    - "Volumetric lighting"
    - "Caustics"
    - "Subsurface scattering"
    - "Global illumination"
    - "Ambient occlusion"
    - "Ray tracing"
    - "HDR"
    - "Bloom"
    - "Tone mapping"
    # --- \u6269\u5C55\u4E2D\u6587\u672F\u8BED ---
    - "\u4E3B\u5149"
    - "\u8865\u5149"
    - "\u80CC\u5149"
    - "\u8FB9\u7F18\u5149"
    - "\u73AF\u5883\u5149"
    - "\u5B9E\u666F\u5149"
    - "\u5B9A\u5411\u5149"
    - "\u6F2B\u5C04\u5149"
    - "\u805A\u5149\u706F"
    - "\u6CDB\u5149\u706F"
    - "\u9713\u8679\u706F"
    - "\u70DB\u5149"
    - "\u6708\u5149"
    - "\u9633\u5149"
    - "\u9EC4\u91D1\u65F6\u523B"
    - "\u84DD\u8272\u65F6\u523B"
    - "\u9B54\u672F\u65F6\u523B"
    - "\u4F26\u52C3\u6717\u5E03\u5149"
    - "\u8774\u8776\u5E03\u5149"
    - "\u5206\u5272\u5E03\u5149"
    - "\u73AF\u5F62\u5E03\u5149"
    - "\u5BBD\u5149"
    - "\u77ED\u5149"
    - "\u9AD8\u8C03"
    - "\u4F4E\u8C03"
    - "\u660E\u6697\u5BF9\u6BD4"
    - "\u4E09\u70B9\u5E03\u5149"
    - "\u5F71\u68DA\u5E03\u5149"
    - "\u526A\u5F71"
    - "\u955C\u5934\u5149\u6655"
    - "\u4E01\u8FBE\u5C14\u6548\u5E94"
    - "\u4F53\u79EF\u5149"
    - "\u7126\u6563"
    - "\u6B21\u8868\u9762\u6563\u5C04"
    - "\u5168\u5C40\u5149\u7167"
    - "\u73AF\u5883\u5149\u906E\u853D"
    - "\u5149\u7EBF\u8FFD\u8E2A"
    - "\u6CDB\u5149"
    - "\u8272\u8C03\u6620\u5C04"
    # --- v2.3.1 \u6269\u5C55\u5F71\u89C6\u5149\u5F71\u672F\u8BED ---
    - "\u5C40\u90E8\u5355\u70B9\u70DB\u5149"
    - "\u660E\u6697\u5206\u5272"
    - "\u660E\u6697\u4EA4\u754C"
    - "\u5927\u9762\u79EF\u865A\u5316\u538B\u6697"
    - "\u5927\u9762\u79EF\u6697\u8C03\u865A\u5316"
    - "\u6DF1\u6697\u80CC\u666F"

  # ============================================================
  # 3. \u60C5\u7EEA/\u8868\u60C5\u672F\u8BED
  # ============================================================
  emotion_word:
    # --- \u5DF2\u6709\u4E2D\u6587\u672F\u8BED ---
    - "\u5014\u5F3A"
    - "\u6212\u5907"
    - "\u9634\u72E0"
    - "\u620F\u8C11"
    - "\u51B7\u9759"
    - "\u4E0D\u6000\u597D\u610F"
    - "\u6311\u8845"
    - "\u73A9\u5473"
    - "\u7C97\u9C81"
    - "\u6E05\u51B7"
    - "\u7D27\u7EF7"
    - "\u51F6\u72E0"
    # --- \u6269\u5C55\u82F1\u6587\u672F\u8BED ---
    - "Happy"
    - "Sad"
    - "Angry"
    - "Surprised"
    - "Disgusted"
    - "Fearful"
    - "Contemptuous"
    - "Excited"
    - "Calm"
    - "Anxious"
    - "Nostalgic"
    - "Melancholic"
    - "Euphoric"
    - "Serene"
    - "Tense"
    - "Relaxed"
    - "Confident"
    - "Insecure"
    - "Curious"
    - "Bored"
    - "Hopeful"
    - "Desperate"
    - "Proud"
    - "Ashamed"
    - "Jealous"
    - "Envious"
    - "Grateful"
    - "Resentful"
    - "Lonely"
    - "Loved"
    - "Heartbroken"
    - "Passionate"
    - "Indifferent"
    - "Determined"
    - "Hesitant"
    - "Brave"
    - "Cowardly"
    - "Wise"
    - "Foolish"
    - "Kind"
    - "Cruel"
    - "Generous"
    - "Selfish"
    - "Humble"
    - "Arrogant"
    - "Honest"
    - "Deceitful"
    - "Loyal"
    - "Treacherous"
    # --- \u6269\u5C55\u4E2D\u6587\u672F\u8BED ---
    - "\u5FEB\u4E50"
    - "\u60B2\u4F24"
    - "\u6124\u6012"
    - "\u60CA\u8BB6"
    - "\u538C\u6076"
    - "\u6050\u60E7"
    - "\u8F7B\u8511"
    - "\u5174\u594B"
    - "\u5E73\u9759"
    - "\u7126\u8651"
    - "\u6000\u65E7"
    - "\u5FE7\u90C1"
    - "\u6B23\u5FEB"
    - "\u5B81\u9759"
    - "\u7D27\u5F20"
    - "\u653E\u677E"
    - "\u81EA\u4FE1"
    - "\u4E0D\u5B89"
    - "\u597D\u5947"
    - "\u65E0\u804A"
    - "\u5E0C\u671B"
    - "\u7EDD\u671B"
    - "\u9A84\u50B2"
    - "\u7F9E\u6127"
    - "\u5AC9\u5992"
    - "\u7FA1\u6155"
    - "\u611F\u6069"
    - "\u6028\u6068"
    - "\u5B64\u72EC"
    - "\u88AB\u7231"
    - "\u5FC3\u788E"
    - "\u70ED\u60C5"
    - "\u51B7\u6F20"
    - "\u575A\u5B9A"
    - "\u72B9\u8C6B"
    - "\u52C7\u6562"
    - "\u61E6\u5F31"
    - "\u667A\u6167"
    - "\u611A\u8822"
    - "\u5584\u826F"
    - "\u6B8B\u5FCD"
    - "\u6177\u6168"
    - "\u81EA\u79C1"
    - "\u8C26\u900A"
    - "\u50B2\u6162"
    - "\u8BDA\u5B9E"
    - "\u72E1\u8BC8"
    - "\u5FE0\u8BDA"
    - "\u80CC\u53DB"

  # ============================================================
  # 4. \u8F6C\u573A\u6807\u8BB0
  # ============================================================
  scene_transition:
    # --- \u5DF2\u6709\u4E2D\u6587\u672F\u8BED ---
    - "\u8F6C\u573A"
    - "\u6DE1\u5165"
    - "\u6DE1\u51FA"
    - "\u53E0\u5316"
    - "\u5212\u50CF"
    - "\u786C\u5207"
    - "\u95EA\u767D"
    - "\u95EA\u9ED1"
    - "\u6EB6\u89E3"
    - "\u6E10\u53D8"
    # --- \u5DF2\u6709\u82F1\u6587\u672F\u8BED ---
    - "fade in"
    - "fade out"
    - "dissolve"
    - "wipe"
    - "cut to"
    - "smash cut"
    - "jump cut"
    - "match cut"
    - "cross dissolve"

  # ============================================================
  # 5. AI/\u673A\u5668\u5B66\u4E60\u672F\u8BED
  # ============================================================
  ai_ml_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "LLM"
    - "GPT"
    - "Transformer"
    - "Token"
    - "Embedding"
    - "Fine-tuning"
    - "Fine-tune"
    - "RAG"
    - "Prompt engineering"
    - "Chain of thought"
    - "Few-shot"
    - "Zero-shot"
    - "LoRA"
    - "QLoRA"
    - "PEFT"
    - "RLHF"
    - "DPO"
    - "PPO"
    - "Hallucination"
    - "Context window"
    - "Temperature"
    - "Top-p"
    - "Top-k"
    - "Beam search"
    - "Greedy decoding"
    - "Attention mechanism"
    - "Self-attention"
    - "Multi-head attention"
    - "BERT"
    - "GPT-4"
    - "Claude"
    - "Gemini"
    - "Llama"
    - "Mistral"
    - "Quantization"
    - "Pruning"
    - "Distillation"
    - "Inference"
    - "Training"
    - "Epoch"
    - "Batch size"
    - "Learning rate"
    - "Gradient descent"
    - "Backpropagation"
    - "Overfitting"
    - "Underfitting"
    - "Regularization"
    - "Dropout"
    - "Batch normalization"
    - "Activation function"
    - "Softmax"
    - "ReLU"
    - "Sigmoid"
    - "Loss function"
    - "Cross-entropy"
    - "MSE"
    - "Optimizer"
    - "Adam"
    - "SGD"
    - "AdamW"
    - "Checkpoint"
    - "Weights"
    - "Biases"
    - "Parameters"
    - "Hyperparameters"
    - "Embedding space"
    - "Vector database"
    - "Semantic search"
    - "Cosine similarity"
    - "Dot product"
    - "Dimensionality reduction"
    - "PCA"
    - "t-SNE"
    - "UMAP"
    - "Clustering"
    - "K-means"
    - "DBSCAN"
    - "Classification"
    - "Regression"
    - "Reinforcement learning"
    - "Supervised learning"
    - "Unsupervised learning"
    - "Transfer learning"
    - "Data augmentation"
    - "Feature extraction"
    - "Feature engineering"
    - "Model compression"
    - "Edge inference"
    - "Latency"
    - "Throughput"
    - "FLOPS"
    - "GPU"
    - "TPU"
    - "CUDA"
    - "Tensor"
    - "Matrix multiplication"
    - "Forward pass"
    - "Backward pass"
    - "Gradient clipping"
    - "Early stopping"
    - "Learning rate scheduler"
    - "Warmup"
    - "Cosine annealing"
    - "Linear schedule"
    - "Exponential decay"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u5927\u8BED\u8A00\u6A21\u578B"
    - "\u63D0\u793A\u8BCD\u5DE5\u7A0B"
    - "\u601D\u7EF4\u94FE"
    - "\u5C11\u6837\u672C"
    - "\u96F6\u6837\u672C"
    - "\u5FAE\u8C03"
    - "\u68C0\u7D22\u589E\u5F3A\u751F\u6210"
    - "\u5E7B\u89C9"
    - "\u4E0A\u4E0B\u6587\u7A97\u53E3"
    - "\u6E29\u5EA6"
    - "\u6CE8\u610F\u529B\u673A\u5236"
    - "\u81EA\u6CE8\u610F\u529B"
    - "\u591A\u5934\u6CE8\u610F\u529B"
    - "\u91CF\u5316"
    - "\u526A\u679D"
    - "\u84B8\u998F"
    - "\u63A8\u7406"
    - "\u8BAD\u7EC3"
    - "\u8F6E\u6B21"
    - "\u6279\u5927\u5C0F"
    - "\u5B66\u4E60\u7387"
    - "\u68AF\u5EA6\u4E0B\u964D"
    - "\u53CD\u5411\u4F20\u64AD"
    - "\u8FC7\u62DF\u5408"
    - "\u6B20\u62DF\u5408"
    - "\u6B63\u5219\u5316"
    - "\u4E22\u5F03"
    - "\u6279\u5F52\u4E00\u5316"
    - "\u6FC0\u6D3B\u51FD\u6570"
    - "\u635F\u5931\u51FD\u6570"
    - "\u4EA4\u53C9\u71B5"
    - "\u4F18\u5316\u5668"
    - "\u68C0\u67E5\u70B9"
    - "\u6743\u91CD"
    - "\u504F\u7F6E"
    - "\u53C2\u6570"
    - "\u8D85\u53C2\u6570"
    - "\u5D4C\u5165\u7A7A\u95F4"
    - "\u5411\u91CF\u6570\u636E\u5E93"
    - "\u8BED\u4E49\u641C\u7D22"
    - "\u4F59\u5F26\u76F8\u4F3C\u5EA6"
    - "\u964D\u7EF4"
    - "\u805A\u7C7B"
    - "\u5206\u7C7B"
    - "\u56DE\u5F52"
    - "\u5F3A\u5316\u5B66\u4E60"
    - "\u76D1\u7763\u5B66\u4E60"
    - "\u65E0\u76D1\u7763\u5B66\u4E60"
    - "\u8FC1\u79FB\u5B66\u4E60"
    - "\u6570\u636E\u589E\u5F3A"
    - "\u7279\u5F81\u63D0\u53D6"
    - "\u7279\u5F81\u5DE5\u7A0B"
    - "\u6A21\u578B\u538B\u7F29"
    - "\u8FB9\u7F18\u63A8\u7406"
    - "\u5EF6\u8FDF"
    - "\u541E\u5410\u91CF"

  # ============================================================
  # 6. SD/\u56FE\u50CF\u751F\u6210\u672F\u8BED
  # ============================================================
  sd_image_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Checkpoint"
    - "Sampler"
    - "DPM++"
    - "Karras"
    - "Euler a"
    - "CFG scale"
    - "Steps"
    - "Denoising strength"
    - "VAE"
    - "CLIP"
    - "Tokenizer"
    - "Latent space"
    - "Upscale"
    - "Hires fix"
    - "ControlNet"
    - "IP-Adapter"
    - "Textual inversion"
    - "LoRA"
    - "LyCORIS"
    - "Hypernetwork"
    - "VAE decode"
    - "Img2img"
    - "Inpainting"
    - "Outpainting"
    - "Inpaint"
    - "Outpaint"
    - "Mask"
    - "Region"
    - "Seed"
    - "Variation"
    - "Blend"
    - "Merge"
    - "Concat"
    - "Merge model"
    - "Prune"
    - "EMA"
    - "FP16"
    - "BF16"
    - "Safetensors"
    - "Ckpt"
    - "Pth"
    - "Diffusion"
    - "Stable Diffusion"
    - "SDXL"
    - "SD 1.5"
    - "SD 2.1"
    - "SD 3"
    - "Flux"
    - "Midjourney"
    - "DALL-E"
    - "DALLE"
    - "NovelAI"
    - "NAI"
    - "Pony"
    - "Illustrious"
    - "NoobAI"
    - "Animagine"
    - "AnythingV3"
    - "Realistic Vision"
    - "DreamShaper"
    - "Civitai"
    - "A1111"
    - "Forge"
    - "ComfyUI"
    - "InvokeAI"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u63A8\u7406\u6B65\u6570"
    - "\u91C7\u6837\u5668"
    - "\u964D\u566A\u5F3A\u5EA6"
    - "\u6F5C\u7A7A\u95F4"
    - "\u653E\u5927"
    - "\u9AD8\u6E05\u4FEE\u590D"
    - "\u8499\u7248"
    - "\u533A\u57DF"
    - "\u79CD\u5B50"
    - "\u53D8\u4F53"
    - "\u6DF7\u5408"
    - "\u5408\u5E76\u6A21\u578B"
    - "\u526A\u679D"
    - "\u6269\u6563"
    - "\u7A33\u5B9A\u6269\u6563"

  # ============================================================
  # 7. \u6444\u5F71\u672F\u8BED
  # ============================================================
  photography_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Aperture"
    - "Shutter speed"
    - "ISO"
    - "Exposure"
    - "Bokeh"
    - "Depth of field"
    - "DOF"
    - "Focal length"
    - "Wide angle"
    - "Telephoto"
    - "Macro"
    - "Fisheye"
    - "Tilt-shift"
    - "Lens flare"
    - "Chromatic aberration"
    - "Vignette"
    - "Grain"
    - "Noise"
    - "HDR"
    - "Bracketing"
    - "Long exposure"
    - "Double exposure"
    - "Multiple exposure"
    - "Panorama"
    - "Time-lapse"
    - "Bulb"
    - "RAW"
    - "JPEG"
    - "TIFF"
    - "Color space"
    - "sRGB"
    - "Adobe RGB"
    - "ProPhoto"
    - "White balance"
    - "AWB"
    - "Kelvin"
    - "Color temperature"
    - "Tungsten"
    - "Fluorescent"
    - "Daylight"
    - "Cloudy"
    - "Shade"
    - "Rule of thirds"
    - "Golden ratio"
    - "Leading lines"
    - "Framing"
    - "Symmetry"
    - "Patterns"
    - "Texture"
    - "Negative space"
    - "Foreground"
    - "Background"
    - "Midground"
    - "Subject"
    - "Composition"
    - "Aspect ratio"
    - "Megapixel"
    - "Resolution"
    - "Dynamic range"
    - "Histogram"
    - "Clipping"
    - "Blowout"
    - "Underexposed"
    - "Overexposed"
    - "Metering"
    - "Spot metering"
    - "Matrix metering"
    - "Center-weighted"
    - "Autofocus"
    - "Manual focus"
    - "AF-S"
    - "AF-C"
    - "AF point"
    - "Image stabilization"
    - "IS"
    - "VR"
    - "OIS"
    - "Tripod"
    - "Monopod"
    - "Gimbal"
    - "Filter"
    - "ND filter"
    - "Polarizer"
    - "UV filter"
    - "Gradient filter"
    - "Star filter"
    - "Soft focus"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u5149\u5708"
    - "\u5FEB\u95E8\u901F\u5EA6"
    - "\u611F\u5149\u5EA6"
    - "\u66DD\u5149"
    - "\u666F\u6DF1"
    - "\u7126\u8DDD"
    - "\u5E7F\u89D2"
    - "\u957F\u7126"
    - "\u5FAE\u8DDD"
    - "\u9C7C\u773C"
    - "\u79FB\u8F74"
    - "\u955C\u5934\u5149\u6655"
    - "\u8272\u5DEE"
    - "\u6697\u89D2"
    - "\u9897\u7C92"
    - "\u566A\u70B9"
    - "\u5305\u56F4\u66DD\u5149"
    - "\u957F\u66DD\u5149"
    - "\u53CC\u91CD\u66DD\u5149"
    - "\u591A\u91CD\u66DD\u5149"
    - "\u5168\u666F"
    - "\u5EF6\u65F6\u6444\u5F71"
    - "RAW\u683C\u5F0F"
    - "\u8272\u5F69\u7A7A\u95F4"
    - "\u767D\u5E73\u8861"
    - "\u8272\u6E29"
    - "\u4E09\u5206\u6CD5"
    - "\u9EC4\u91D1\u6BD4\u4F8B"
    - "\u5F15\u5BFC\u7EBF"
    - "\u6784\u56FE"
    - "\u753B\u5E45\u6BD4"
    - "\u52A8\u6001\u8303\u56F4"
    - "\u76F4\u65B9\u56FE"
    - "\u6D4B\u5149"
    - "\u81EA\u52A8\u5BF9\u7126"
    - "\u624B\u52A8\u5BF9\u7126"
    - "\u56FE\u50CF\u9632\u6296"
    - "\u4E09\u811A\u67B6"
    - "\u6EE4\u955C"

  # ============================================================
  # 8. \u827A\u672F\u98CE\u683C\u672F\u8BED
  # ============================================================
  art_style:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Impressionism"
    - "Surrealism"
    - "Cubism"
    - "Abstract"
    - "Expressionism"
    - "Minimalism"
    - "Baroque"
    - "Rococo"
    - "Renaissance"
    - "Gothic"
    - "Art Deco"
    - "Art Nouveau"
    - "Bauhaus"
    - "Pop Art"
    - "Op Art"
    - "Conceptual art"
    - "Contemporary"
    - "Modern"
    - "Classical"
    - "Neo-classical"
    - "Romanticism"
    - "Realism"
    - "Photorealism"
    - "Hyperrealism"
    - "Stylized"
    - "Cartoon"
    - "Anime"
    - "Manga"
    - "Pixel art"
    - "Vector art"
    - "Watercolor"
    - "Oil painting"
    - "Acrylic"
    - "Charcoal"
    - "Pencil sketch"
    - "Ink"
    - "Pastel"
    - "Gouache"
    - "Tempera"
    - "Fresco"
    - "Engraving"
    - "Lithography"
    - "Screen printing"
    - "Digital painting"
    - "Matte painting"
    - "Concept art"
    - "Character design"
    - "Environment design"
    - "Storyboard"
    - "Comic book"
    - "Graphic novel"
    - "Cel shading"
    - "Flat shading"
    - "Gouraud shading"
    - "Phong shading"
    - "Toon shading"
    - "Hatching"
    - "Cross-hatching"
    - "Stippling"
    - "Pointillism"
    - "Sfumato"
    - "Impasto"
    - "Glazing"
    - "Scumbling"
    - "Dry brush"
    - "Wet on wet"
    - "Alla prima"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u5370\u8C61\u6D3E"
    - "\u8D85\u73B0\u5B9E\u4E3B\u4E49"
    - "\u7ACB\u4F53\u4E3B\u4E49"
    - "\u62BD\u8C61"
    - "\u8868\u73B0\u4E3B\u4E49"
    - "\u6781\u7B80\u4E3B\u4E49"
    - "\u5DF4\u6D1B\u514B"
    - "\u6D1B\u53EF\u53EF"
    - "\u6587\u827A\u590D\u5174"
    - "\u54E5\u7279\u5F0F"
    - "\u88C5\u9970\u827A\u672F"
    - "\u65B0\u827A\u672F\u8FD0\u52A8"
    - "\u5305\u8C6A\u65AF"
    - "\u6CE2\u666E\u827A\u672F"
    - "\u5F53\u4EE3"
    - "\u73B0\u4EE3"
    - "\u53E4\u5178"
    - "\u65B0\u53E4\u5178"
    - "\u6D6A\u6F2B\u4E3B\u4E49"
    - "\u73B0\u5B9E\u4E3B\u4E49"
    - "\u7167\u7247\u7EA7\u5199\u5B9E"
    - "\u8D85\u5199\u5B9E"
    - "\u98CE\u683C\u5316"
    - "\u5361\u901A"
    - "\u52A8\u6F2B"
    - "\u6F2B\u753B"
    - "\u50CF\u7D20\u827A\u672F"
    - "\u77E2\u91CF\u827A\u672F"
    - "\u6C34\u5F69"
    - "\u6CB9\u753B"
    - "\u4E19\u70EF"
    - "\u70AD\u7B14"
    - "\u94C5\u7B14\u7D20\u63CF"
    - "\u6C34\u58A8"
    - "\u7C89\u5F69"
    - "\u6570\u5B57\u7ED8\u753B"
    - "\u6982\u5FF5\u827A\u672F"
    - "\u89D2\u8272\u8BBE\u8BA1"
    - "\u73AF\u5883\u8BBE\u8BA1"
    - "\u5206\u955C"
    - "\u6F2B\u753B\u4E66"
    - "\u56FE\u50CF\u5C0F\u8BF4"
    - "\u8D5B\u7490\u7490\u7740\u8272"
    - "\u5E73\u9762\u7740\u8272"
    - "\u6392\u7EBF"
    - "\u4EA4\u53C9\u6392\u7EBF"
    - "\u70B9\u753B"
    - "\u6655\u6D82\u6CD5"
    - "\u539A\u6D82"

  # ============================================================
  # 9. \u8272\u5F69\u7406\u8BBA\u672F\u8BED
  # ============================================================
  color_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Complementary colors"
    - "Analogous colors"
    - "Triadic"
    - "Tetradic"
    - "Monochromatic"
    - "Warm colors"
    - "Cool colors"
    - "Primary colors"
    - "Secondary colors"
    - "Tertiary colors"
    - "Hue"
    - "Saturation"
    - "Brightness"
    - "Value"
    - "Lightness"
    - "Chroma"
    - "Tint"
    - "Shade"
    - "Tone"
    - "Color wheel"
    - "Color palette"
    - "Color scheme"
    - "Color harmony"
    - "Color temperature"
    - "Color grading"
    - "Color correction"
    - "Color space"
    - "RGB"
    - "CMYK"
    - "HSL"
    - "HSV"
    - "LAB"
    - "YUV"
    - "Grayscale"
    - "Sepia"
    - "Duotone"
    - "Tritone"
    - "Quadtone"
    - "Gradient"
    - "Ombre"
    - "Iridescent"
    - "Holographic"
    - "Pearlescent"
    - "Metallic"
    - "Matte"
    - "Glossy"
    - "Satin"
    - "Vibrant"
    - "Muted"
    - "Pastel"
    - "Neon"
    - "Earth tones"
    - "Skin tones"
    - "Flesh tones"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u4E92\u8865\u8272"
    - "\u7C7B\u4F3C\u8272"
    - "\u4E09\u5143\u8272"
    - "\u56DB\u5143\u8272"
    - "\u5355\u8272"
    - "\u6696\u8272"
    - "\u51B7\u8272"
    - "\u539F\u8272"
    - "\u95F4\u8272"
    - "\u590D\u8272"
    - "\u8272\u76F8"
    - "\u9971\u548C\u5EA6"
    - "\u660E\u5EA6"
    - "\u8272\u5EA6"
    - "\u8272\u8C03"
    - "\u8272\u8F6E"
    - "\u8C03\u8272\u677F"
    - "\u914D\u8272\u65B9\u6848"
    - "\u8272\u5F69\u548C\u8C10"
    - "\u8272\u6E29"
    - "\u8C03\u8272"
    - "\u6821\u8272"
    - "\u8272\u5F69\u7A7A\u95F4"
    - "\u7070\u5EA6"
    - "\u68D5\u8910\u8272"
    - "\u53CC\u8272\u8C03"
    - "\u6E10\u53D8"
    - "\u5F69\u8679\u8272"
    - "\u5168\u606F"
    - "\u73E0\u5149"
    - "\u91D1\u5C5E\u8272"
    - "\u54D1\u5149"
    - "\u5149\u6CFD"
    - "\u7F0E\u9762"
    - "\u9C9C\u8273"
    - "\u67D4\u548C"
    - "\u7C89\u5F69"
    - "\u9713\u8679"
    - "\u5927\u5730\u8272\u7CFB"
    - "\u80A4\u8272"

  # ============================================================
  # 10. \u6784\u56FE\u672F\u8BED
  # ============================================================
  composition_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Rule of thirds"
    - "Golden ratio"
    - "Golden spiral"
    - "Fibonacci spiral"
    - "Leading lines"
    - "Framing"
    - "Symmetry"
    - "Asymmetry"
    - "Balance"
    - "Radial balance"
    - "Negative space"
    - "Positive space"
    - "Foreground interest"
    - "Layering"
    - "Depth"
    - "Perspective"
    - "Vanishing point"
    - "Horizon line"
    - "Eye level"
    - "Bird's eye"
    - "Worm's eye"
    - "Dutch angle"
    - "Dutch tilt"
    - "Overhead"
    - "Top-down"
    - "Isometric"
    - "Orthographic"
    - "Foreshortening"
    - "Scale"
    - "Proportion"
    - "Scale comparison"
    - "Juxtaposition"
    - "Repetition"
    - "Pattern"
    - "Rhythm"
    - "Unity"
    - "Variety"
    - "Emphasis"
    - "Focal point"
    - "Center of interest"
    - "Visual weight"
    - "Visual flow"
    - "S-curve"
    - "C-curve"
    - "L-shape"
    - "Triangle"
    - "Diagonal"
    - "Horizontal"
    - "Vertical"
    - "Grid"
    - "Modular grid"
    - "Column"
    - "Row"
    - "Margin"
    - "Gutter"
    - "Bleed"
    - "Trim"
    - "Safe area"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u4E09\u5206\u6CD5"
    - "\u9EC4\u91D1\u6BD4\u4F8B"
    - "\u9EC4\u91D1\u87BA\u65CB"
    - "\u5F15\u5BFC\u7EBF"
    - "\u6846\u67B6\u6784\u56FE"
    - "\u5BF9\u79F0"
    - "\u4E0D\u5BF9\u79F0"
    - "\u5E73\u8861"
    - "\u7559\u767D"
    - "\u524D\u666F"
    - "\u5C42\u6B21"
    - "\u7EB5\u6DF1"
    - "\u900F\u89C6"
    - "\u6D88\u5931\u70B9"
    - "\u5730\u5E73\u7EBF"
    - "\u8377\u5170\u89D2"
    - "\u4FEF\u89C6"
    - "\u4EF0\u89C6"
    - "\u7B49\u8DDD\u6295\u5F71"
    - "\u6B63\u4EA4\u6295\u5F71"
    - "\u900F\u89C6\u7F29\u77ED"
    - "\u6BD4\u4F8B"
    - "\u5E76\u7F6E"
    - "\u91CD\u590D"
    - "\u56FE\u6848"
    - "\u8282\u594F"
    - "\u7EDF\u4E00"
    - "\u591A\u6837"
    - "\u5F3A\u8C03"
    - "\u7126\u70B9"
    - "\u89C6\u89C9\u91CD\u91CF"
    - "\u89C6\u89C9\u5F15\u5BFC\u7EBF"
    - "S\u66F2\u7EBF"
    - "\u4E09\u89D2\u6784\u56FE"
    - "\u5BF9\u89D2\u7EBF"
    - "\u7F51\u683C"

  # ============================================================
  # 11. \u97F3\u4E50\u97F3\u9891\u672F\u8BED
  # ============================================================
  music_audio_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Tempo"
    - "BPM"
    - "Pitch"
    - "Tone"
    - "Note"
    - "Chord"
    - "Melody"
    - "Harmony"
    - "Rhythm"
    - "Beat"
    - "Bass"
    - "Treble"
    - "Mid range"
    - "Frequency"
    - "Hertz"
    - "Decibel"
    - "dB"
    - "Volume"
    - "Gain"
    - "Pan"
    - "Reverb"
    - "Echo"
    - "Delay"
    - "Chorus"
    - "Flanger"
    - "Phaser"
    - "Distortion"
    - "Overdrive"
    - "Fuzz"
    - "Compressor"
    - "Limiter"
    - "Equalizer"
    - "EQ"
    - "Filter"
    - "Low-pass"
    - "High-pass"
    - "Band-pass"
    - "Notch"
    - "Envelope"
    - "ADSR"
    - "Attack"
    - "Decay"
    - "Sustain"
    - "Release"
    - "LFO"
    - "Oscillator"
    - "Synthesizer"
    - "Sampler"
    - "Drum machine"
    - "Sequencer"
    - "MIDI"
    - "Audio interface"
    - "Microphone"
    - "Condenser"
    - "Dynamic"
    - "Ribbon"
    - "Cardioid"
    - "Omnidirectional"
    - "Bidirectional"
    - "Stereo"
    - "Mono"
    - "Surround"
    - "5.1"
    - "7.1"
    - "Atmos"
    - "Ambisonic"
    - "Binaural"
    - "Foley"
    - "Sound effect"
    - "SFX"
    - "Background music"
    - "BGM"
    - "Soundtrack"
    - "Score"
    - "Jingle"
    - "Stinger"
    - "Bed"
    - "Sweetener"
    - "Stem"
    - "Mix"
    - "Master"
    - "Remix"
    - "Dub"
    - "Dubstep"
    - "EDM"
    - "Techno"
    - "House"
    - "Trance"
    - "Drum and bass"
    - "Ambient"
    - "Lo-fi"
    - "Hip hop"
    - "Rock"
    - "Jazz"
    - "Classical"
    - "Folk"
    - "Country"
    - "Pop"
    - "R&B"
    - "Soul"
    - "Funk"
    - "Reggae"
    - "Metal"
    - "Punk"
    - "Blues"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u8282\u594F"
    - "\u65CB\u5F8B"
    - "\u548C\u58F0"
    - "\u4F4E\u97F3"
    - "\u9AD8\u97F3"
    - "\u9891\u7387"
    - "\u8D6B\u5179"
    - "\u5206\u8D1D"
    - "\u97F3\u91CF"
    - "\u589E\u76CA"
    - "\u58F0\u50CF"
    - "\u6DF7\u54CD"
    - "\u56DE\u58F0"
    - "\u5EF6\u8FDF"
    - "\u5408\u5531"
    - "\u9576\u8FB9"
    - "\u79FB\u76F8"
    - "\u5931\u771F"
    - "\u538B\u7F29\u5668"
    - "\u9650\u5236\u5668"
    - "\u5747\u8861\u5668"
    - "\u6EE4\u6CE2\u5668"
    - "\u4F4E\u901A"
    - "\u9AD8\u901A"
    - "\u5305\u7EDC"
    - "\u632F\u8361\u5668"
    - "\u5408\u6210\u5668"
    - "\u91C7\u6837\u5668"
    - "\u9F13\u673A"
    - "\u97F3\u5E8F\u5668"
    - "\u9EA6\u514B\u98CE"
    - "\u7535\u5BB9\u8BDD\u7B52"
    - "\u52A8\u5708\u8BDD\u7B52"
    - "\u7ACB\u4F53\u58F0"
    - "\u5355\u58F0\u9053"
    - "\u73AF\u7ED5\u58F0"
    - "\u62DF\u97F3"
    - "\u97F3\u6548"
    - "\u80CC\u666F\u97F3\u4E50"
    - "\u914D\u4E50"
    - "\u6DF7\u97F3"
    - "\u6BCD\u5E26"
    - "\u7535\u5B50\u821E\u66F2"

  # ============================================================
  # 12. \u7F16\u7A0B\u672F\u8BED
  # ============================================================
  programming_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Function"
    - "Variable"
    - "Constant"
    - "Class"
    - "Object"
    - "Method"
    - "Property"
    - "Interface"
    - "Type"
    - "Enum"
    - "Struct"
    - "Array"
    - "List"
    - "Dictionary"
    - "Map"
    - "Set"
    - "Tuple"
    - "String"
    - "Integer"
    - "Float"
    - "Boolean"
    - "Null"
    - "Undefined"
    - "Void"
    - "Async"
    - "Await"
    - "Promise"
    - "Callback"
    - "Event"
    - "Listener"
    - "Handler"
    - "Observer"
    - "Iterator"
    - "Generator"
    - "Decorator"
    - "Wrapper"
    - "Module"
    - "Package"
    - "Import"
    - "Export"
    - "Namespace"
    - "Scope"
    - "Closure"
    - "Hoisting"
    - "Prototype"
    - "Inheritance"
    - "Polymorphism"
    - "Encapsulation"
    - "Abstraction"
    - "Constructor"
    - "Destructor"
    - "Getter"
    - "Setter"
    - "Static"
    - "Instance"
    - "This"
    - "Self"
    - "Super"
    - "Extend"
    - "Implement"
    - "Override"
    - "Overload"
    - "Recursive"
    - "Iteration"
    - "Loop"
    - "For"
    - "While"
    - "Switch"
    - "Case"
    - "If"
    - "Else"
    - "Try"
    - "Catch"
    - "Finally"
    - "Throw"
    - "Exception"
    - "Error"
    - "Warning"
    - "Debug"
    - "Breakpoint"
    - "Log"
    - "Console"
    - "Print"
    - "Assert"
    - "Test"
    - "Unit test"
    - "Integration test"
    - "Mock"
    - "Stub"
    - "Spy"
    - "Fixture"
    - "Coverage"
    - "CI"
    - "CD"
    - "Git"
    - "Branch"
    - "Commit"
    - "Push"
    - "Pull"
    - "Merge"
    - "Rebase"
    - "Conflict"
    - "Tag"
    - "Release"
    - "Deploy"
    - "Rollback"
    - "API"
    - "REST"
    - "GraphQL"
    - "gRPC"
    - "WebSocket"
    - "HTTP"
    - "HTTPS"
    - "TCP"
    - "UDP"
    - "DNS"
    - "CDN"
    - "SSL"
    - "TLS"
    - "CORS"
    - "Authentication"
    - "Authorization"
    - "JWT"
    - "OAuth"
    - "Session"
    - "Cookie"
    - "Token"
    - "Cache"
    - "Queue"
    - "Stack"
    - "Heap"
    - "Buffer"
    - "Stream"
    - "Pipe"
    - "Thread"
    - "Process"
    - "Worker"
    - "Daemon"
    - "Cron"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u51FD\u6570"
    - "\u53D8\u91CF"
    - "\u5E38\u91CF"
    - "\u7C7B"
    - "\u5BF9\u8C61"
    - "\u65B9\u6CD5"
    - "\u5C5E\u6027"
    - "\u63A5\u53E3"
    - "\u7C7B\u578B"
    - "\u679A\u4E3E"
    - "\u7ED3\u6784\u4F53"
    - "\u6570\u7EC4"
    - "\u5B57\u5178"
    - "\u5B57\u7B26\u4E32"
    - "\u6574\u6570"
    - "\u6D6E\u70B9\u6570"
    - "\u5E03\u5C14\u503C"
    - "\u5F02\u6B65"
    - "\u56DE\u8C03"
    - "\u4E8B\u4EF6"
    - "\u95ED\u5305"
    - "\u539F\u578B"
    - "\u7EE7\u627F"
    - "\u591A\u6001"
    - "\u5C01\u88C5"
    - "\u62BD\u8C61"
    - "\u6784\u9020\u51FD\u6570"
    - "\u4F5C\u7528\u57DF"
    - "\u6A21\u5757"
    - "\u547D\u540D\u7A7A\u95F4"
    - "\u9012\u5F52"
    - "\u5FAA\u73AF"
    - "\u5F02\u5E38"
    - "\u9519\u8BEF"
    - "\u8C03\u8BD5"
    - "\u65AD\u70B9"
    - "\u5355\u5143\u6D4B\u8BD5"
    - "\u96C6\u6210\u6D4B\u8BD5"
    - "\u6301\u7EED\u96C6\u6210"
    - "\u6301\u7EED\u90E8\u7F72"
    - "\u5206\u652F"
    - "\u63D0\u4EA4"
    - "\u5408\u5E76"
    - "\u7F13\u5B58"
    - "\u961F\u5217"
    - "\u6808"
    - "\u5806"
    - "\u7EBF\u7A0B"
    - "\u8FDB\u7A0B"

  # ============================================================
  # 13. \u6570\u636E\u79D1\u5B66\u672F\u8BED
  # ============================================================
  data_science_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Dataset"
    - "Dataframe"
    - "Series"
    - "Index"
    - "Column"
    - "Row"
    - "Cell"
    - "Missing value"
    - "NaN"
    - "Null"
    - "Outlier"
    - "Normalization"
    - "Standardization"
    - "Min-max"
    - "Z-score"
    - "One-hot encoding"
    - "Label encoding"
    - "Feature"
    - "Feature engineering"
    - "Feature selection"
    - "Dimensionality"
    - "PCA"
    - "t-SNE"
    - "Correlation"
    - "Covariance"
    - "P-value"
    - "Hypothesis"
    - "A/B testing"
    - "Statistical significance"
    - "Confidence interval"
    - "Regression"
    - "Logistic regression"
    - "Linear regression"
    - "Decision tree"
    - "Random forest"
    - "Gradient boosting"
    - "XGBoost"
    - "LightGBM"
    - "CatBoost"
    - "Neural network"
    - "CNN"
    - "RNN"
    - "LSTM"
    - "GRU"
    - "GAN"
    - "VAE"
    - "Autoencoder"
    - "Transformer"
    - "BERT"
    - "GPT"
    - "Clustering"
    - "K-means"
    - "Hierarchical"
    - "DBSCAN"
    - "Silhouette"
    - "Elbow method"
    - "Confusion matrix"
    - "Precision"
    - "Recall"
    - "F1 score"
    - "Accuracy"
    - "ROC"
    - "AUC"
    - "Precision-recall curve"
    - "True positive"
    - "False positive"
    - "True negative"
    - "False negative"
    - "Sensitivity"
    - "Specificity"
    - "Overfitting"
    - "Underfitting"
    - "Cross-validation"
    - "K-fold"
    - "Train test split"
    - "Hyperparameter"
    - "Grid search"
    - "Random search"
    - "Bayesian optimization"
    - "Pipeline"
    - "Scikit-learn"
    - "TensorFlow"
    - "PyTorch"
    - "Keras"
    - "Pandas"
    - "NumPy"
    - "Matplotlib"
    - "Seaborn"
    - "Plotly"
    - "Jupyter"
    - "Colab"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u6570\u636E\u96C6"
    - "\u6570\u636E\u6846"
    - "\u7F3A\u5931\u503C"
    - "\u5F02\u5E38\u503C"
    - "\u5F52\u4E00\u5316"
    - "\u6807\u51C6\u5316"
    - "\u72EC\u70ED\u7F16\u7801"
    - "\u7279\u5F81"
    - "\u7279\u5F81\u5DE5\u7A0B"
    - "\u7279\u5F81\u9009\u62E9"
    - "\u964D\u7EF4"
    - "\u76F8\u5173\u6027"
    - "\u534F\u65B9\u5DEE"
    - "P\u503C"
    - "\u5047\u8BBE\u68C0\u9A8C"
    - "A/B\u6D4B\u8BD5"
    - "\u7EDF\u8BA1\u663E\u8457\u6027"
    - "\u7F6E\u4FE1\u533A\u95F4"
    - "\u56DE\u5F52"
    - "\u903B\u8F91\u56DE\u5F52"
    - "\u7EBF\u6027\u56DE\u5F52"
    - "\u51B3\u7B56\u6811"
    - "\u968F\u673A\u68EE\u6797"
    - "\u68AF\u5EA6\u63D0\u5347"
    - "\u795E\u7ECF\u7F51\u7EDC"
    - "\u5377\u79EF\u795E\u7ECF\u7F51\u7EDC"
    - "\u5FAA\u73AF\u795E\u7ECF\u7F51\u7EDC"
    - "\u751F\u6210\u5BF9\u6297\u7F51\u7EDC"
    - "\u53D8\u5206\u81EA\u7F16\u7801\u5668"
    - "\u81EA\u7F16\u7801\u5668"
    - "\u805A\u7C7B"
    - "\u6DF7\u6DC6\u77E9\u9635"
    - "\u7CBE\u786E\u7387"
    - "\u53EC\u56DE\u7387"
    - "F1\u5206\u6570"
    - "\u51C6\u786E\u7387"
    - "\u8FC7\u62DF\u5408"
    - "\u4EA4\u53C9\u9A8C\u8BC1"
    - "\u8D85\u53C2\u6570"
    - "\u7F51\u683C\u641C\u7D22"
    - "\u7BA1\u9053"

  # ============================================================
  # 14. \u53D9\u4E8B\u5199\u4F5C\u672F\u8BED
  # ============================================================
  narrative_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Protagonist"
    - "Antagonist"
    - "Character"
    - "Character arc"
    - "Backstory"
    - "Motivation"
    - "Goal"
    - "Conflict"
    - "Internal conflict"
    - "External conflict"
    - "Rising action"
    - "Climax"
    - "Falling action"
    - "Resolution"
    - "Denouement"
    - "Exposition"
    - "Inciting incident"
    - "Plot twist"
    - "Foreshadowing"
    - "Flashback"
    - "Flash-forward"
    - "Suspense"
    - "Tension"
    - "Pacing"
    - "Theme"
    - "Motif"
    - "Symbol"
    - "Symbolism"
    - "Metaphor"
    - "Simile"
    - "Allegory"
    - "Irony"
    - "Dramatic irony"
    - "Verbal irony"
    - "Situational irony"
    - "Personification"
    - "Hyperbole"
    - "Alliteration"
    - "Assonance"
    - "Consonance"
    - "Onomatopoeia"
    - "Imagery"
    - "Tone"
    - "Mood"
    - "Voice"
    - "Style"
    - "Point of view"
    - "First person"
    - "Second person"
    - "Third person"
    - "Omniscient"
    - "Limited"
    - "Stream of consciousness"
    - "Dialogue"
    - "Monologue"
    - "Soliloquy"
    - "Aside"
    - "Narrator"
    - "Narration"
    - "Setting"
    - "World-building"
    - "Lore"
    - "Canon"
    - "Continuity"
    - "Genre"
    - "Subplot"
    - "B-story"
    - "Act"
    - "Scene"
    - "Sequence"
    - "Beat"
    - "Treatment"
    - "Outline"
    - "Synopsis"
    - "Logline"
    - "Pitch"
    - "Draft"
    - "Revision"
    - "Edit"
    - "Proofread"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u4E3B\u89D2"
    - "\u53CD\u6D3E"
    - "\u89D2\u8272"
    - "\u89D2\u8272\u5F27\u7EBF"
    - "\u80CC\u666F\u6545\u4E8B"
    - "\u52A8\u673A"
    - "\u76EE\u6807"
    - "\u51B2\u7A81"
    - "\u5185\u5FC3\u51B2\u7A81"
    - "\u5916\u90E8\u51B2\u7A81"
    - "\u4E0A\u5347\u52A8\u4F5C"
    - "\u9AD8\u6F6E"
    - "\u4E0B\u964D\u52A8\u4F5C"
    - "\u7ED3\u5C40"
    - "\u94FA\u57AB"
    - "\u89E6\u53D1\u4E8B\u4EF6"
    - "\u60C5\u8282\u53CD\u8F6C"
    - "\u4F0F\u7B14"
    - "\u95EA\u56DE"
    - "\u95EA\u524D"
    - "\u60AC\u5FF5"
    - "\u5F20\u529B"
    - "\u8282\u594F"
    - "\u4E3B\u9898"
    - "\u6BCD\u9898"
    - "\u8C61\u5F81"
    - "\u9690\u55BB"
    - "\u660E\u55BB"
    - "\u5BD3\u8A00"
    - "\u53CD\u8BBD"
    - "\u62DF\u4EBA"
    - "\u5938\u5F20"
    - "\u5934\u97F5"
    - "\u610F\u8C61"
    - "\u8BED\u8C03"
    - "\u6C1B\u56F4"
    - "\u89C6\u89D2"
    - "\u7B2C\u4E00\u4EBA\u79F0"
    - "\u7B2C\u4E09\u4EBA\u79F0"
    - "\u5168\u77E5\u89C6\u89D2"
    - "\u5BF9\u8BDD"
    - "\u72EC\u767D"
    - "\u65C1\u767D"
    - "\u53D9\u8FF0\u8005"
    - "\u573A\u666F\u8BBE\u5B9A"
    - "\u4E16\u754C\u89C2\u6784\u5EFA"
    - "\u8BBE\u5B9A\u96C6"
    - "\u6B63\u5178"
    - "\u8FDE\u7EED\u6027"
    - "\u4F53\u88C1"
    - "\u526F\u7EBF"
    - "\u5E55"
    - "\u573A\u666F"
    - "\u5E8F\u5217"
    - "\u8282\u62CD"
    - "\u5927\u7EB2"
    - "\u6897\u6982"
    - "\u4E00\u53E5\u8BDD\u6982\u8981"
    - "\u8349\u7A3F"
    - "\u4FEE\u8BA2"

  # ============================================================
  # 15. \u8425\u9500\u672F\u8BED
  # ============================================================
  marketing_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "CTA"
    - "Call to action"
    - "Conversion"
    - "Conversion rate"
    - "Bounce rate"
    - "Click-through rate"
    - "CTR"
    - "ROI"
    - "ROAS"
    - "CPA"
    - "CPL"
    - "CAC"
    - "LTV"
    - "KPI"
    - "OKR"
    - "SEO"
    - "SEM"
    - "SERP"
    - "Backlink"
    - "Keyword"
    - "Long tail"
    - "SERP feature"
    - "Organic traffic"
    - "Paid traffic"
    - "Direct traffic"
    - "Referral traffic"
    - "Social media"
    - "SMM"
    - "Content marketing"
    - "Inbound marketing"
    - "Outbound marketing"
    - "Email marketing"
    - "Drip campaign"
    - "Newsletter"
    - "Lead"
    - "Lead generation"
    - "Lead scoring"
    - "Lead nurturing"
    - "Funnel"
    - "TOFU"
    - "MOFU"
    - "BOFU"
    - "Awareness"
    - "Consideration"
    - "Decision"
    - "Retention"
    - "Advocacy"
    - "Brand"
    - "Branding"
    - "Brand identity"
    - "Brand awareness"
    - "Brand loyalty"
    - "Positioning"
    - "Differentiation"
    - "Value proposition"
    - "Unique selling proposition"
    - "USP"
    - "Target audience"
    - "Persona"
    - "Customer journey"
    - "Touchpoint"
    - "Omnichannel"
    - "Multichannel"
    - "A/B testing"
    - "Multivariate testing"
    - "Heatmap"
    - "Session recording"
    - "Funnel analysis"
    - "Cohort analysis"
    - "Retention rate"
    - "Churn rate"
    - "NPS"
    - "Net promoter score"
    - "CSAT"
    - "CES"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u7528\u6237\u753B\u50CF"
    - "\u8F6C\u5316\u7387"
    - "\u8DF3\u51FA\u7387"
    - "\u70B9\u51FB\u7387"
    - "\u6295\u8D44\u56DE\u62A5\u7387"
    - "\u641C\u7D22\u5F15\u64CE\u4F18\u5316"
    - "\u641C\u7D22\u5F15\u64CE\u8425\u9500"
    - "\u5185\u5BB9\u8425\u9500"
    - "\u90AE\u4EF6\u8425\u9500"
    - "\u6F0F\u6597"
    - "\u54C1\u724C\u8BA4\u77E5"
    - "\u54C1\u724C\u5FE0\u8BDA\u5EA6"
    - "\u5B9A\u4F4D"
    - "\u5DEE\u5F02\u5316"
    - "\u4EF7\u503C\u4E3B\u5F20"
    - "\u76EE\u6807\u53D7\u4F17"
    - "\u5BA2\u6237\u65C5\u7A0B"
    - "\u5168\u6E20\u9053"
    - "A/B\u6D4B\u8BD5"
    - "\u70ED\u529B\u56FE"
    - "\u7559\u5B58\u7387"
    - "\u6D41\u5931\u7387"
    - "\u51C0\u63A8\u8350\u503C"

  # ============================================================
  # 16. \u6E38\u620F\u5F00\u53D1\u672F\u8BED
  # ============================================================
  game_dev_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "NPC"
    - "FPS"
    - "TPS"
    - "RPG"
    - "MMORPG"
    - "MOBA"
    - "RTS"
    - "Turn-based"
    - "Real-time"
    - "Physics engine"
    - "Collision detection"
    - "Raycasting"
    - "Pathfinding"
    - "A*"
    - "NavMesh"
    - "Steering behaviors"
    - "State machine"
    - "FSM"
    - "Behavior tree"
    - "ECS"
    - "Entity component system"
    - "Rendering"
    - "Rasterization"
    - "Ray tracing"
    - "Path tracing"
    - "Shader"
    - "Vertex shader"
    - "Fragment shader"
    - "Compute shader"
    - "Texture"
    - "UV mapping"
    - "Normal map"
    - "Bump map"
    - "Displacement map"
    - "Specular map"
    - "Roughness map"
    - "Metallic map"
    - "Ambient occlusion map"
    - "Albedo"
    - "PBR"
    - "Physically based rendering"
    - "LOD"
    - "Level of detail"
    - "Culling"
    - "Frustum culling"
    - "Occlusion culling"
    - "Draw call"
    - "Batch"
    - "Instancing"
    - "Atlas"
    - "Sprite"
    - "Sprite sheet"
    - "Animation"
    - "Skeletal animation"
    - "Blend tree"
    - "Inverse kinematics"
    - "IK"
    - "Forward kinematics"
    - "FK"
    - "Particle system"
    - "VFX"
    - "Post-processing"
    - "Bloom"
    - "Depth of field"
    - "Motion blur"
    - "Screen space reflections"
    - "SSR"
    - "Screen space ambient occlusion"
    - "SSAO"
    - "Tone mapping"
    - "Color grading"
    - "LUT"
    - "Frame rate"
    - "Delta time"
    - "Fixed update"
    - "Game loop"
    - "Coroutine"
    - "Async"
    - "Asset"
    - "Prefab"
    - "Scene"
    - "GameObject"
    - "Component"
    - "Transform"
    - "Collider"
    - "Rigidbody"
    - "Trigger"
    - "Raycast"
    - "Non-player character"
    - "Non playable character"
    - "Procedural generation"
    - "Roguelike"
    - "Metroidvania"
    - "Open world"
    - "Sandbox"
    - "Tutorial"
    - "Difficulty curve"
    - "Balance"
    - "Patch"
    - "Hotfix"
    - "DLC"
    - "Microtransaction"
    - "Loot box"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u975E\u73A9\u5BB6\u89D2\u8272"
    - "\u7B2C\u4E00\u4EBA\u79F0\u5C04\u51FB"
    - "\u7B2C\u4E09\u4EBA\u79F0\u5C04\u51FB"
    - "\u89D2\u8272\u626E\u6F14"
    - "\u7269\u7406\u5F15\u64CE"
    - "\u78B0\u649E\u68C0\u6D4B"
    - "\u5BFB\u8DEF"
    - "\u72B6\u6001\u673A"
    - "\u884C\u4E3A\u6811"
    - "\u6E32\u67D3"
    - "\u5149\u7EBF\u8FFD\u8E2A"
    - "\u7740\u8272\u5668"
    - "\u7EB9\u7406"
    - "UV\u6620\u5C04"
    - "\u6CD5\u7EBF\u8D34\u56FE"
    - "\u7269\u7406\u6E32\u67D3"
    - "\u7EC6\u8282\u5C42\u6B21"
    - "\u5254\u9664"
    - "\u7ED8\u5236\u8C03\u7528"
    - "\u7CBE\u7075\u56FE"
    - "\u52A8\u753B"
    - "\u9AA8\u9ABC\u52A8\u753B"
    - "\u9006\u8FD0\u52A8\u5B66"
    - "\u7C92\u5B50\u7CFB\u7EDF"
    - "\u7279\u6548"
    - "\u540E\u5904\u7406"
    - "\u6CDB\u5149"
    - "\u8FD0\u52A8\u6A21\u7CCA"
    - "\u8272\u8C03\u6620\u5C04"
    - "\u5E27\u7387"
    - "\u6E38\u620F\u5FAA\u73AF"
    - "\u534F\u7A0B"
    - "\u8D44\u6E90"
    - "\u9884\u5236\u4F53"
    - "\u573A\u666F"
    - "\u78B0\u649E\u4F53"
    - "\u521A\u4F53"
    - "\u7A0B\u5E8F\u5316\u751F\u6210"
    - "\u5F00\u653E\u4E16\u754C"
    - "\u6C99\u76D2"
    - "\u96BE\u5EA6\u66F2\u7EBF"
    - "\u5E73\u8861\u6027"
    - "\u8865\u4E01"
    - "\u70ED\u4FEE\u590D"

  # ============================================================
  # 17. \u6269\u5C55\u8D28\u91CF\u6807\u7B7E
  # ============================================================
  quality_tag_ext:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "ultra high quality"
    - "ultra HD"
    - "UHD"
    - "full HD"
    - "FHD"
    - "1080p"
    - "1440p"
    - "2K"
    - "4K"
    - "8K"
    - "16K"
    - "ultra-detailed"
    - "insanely detailed"
    - "intricate details"
    - "fine details"
    - "razor sharp"
    - "sharp focus"
    - "perfect composition"
    - "award winning"
    - "professional"
    - "studio quality"
    - "photorealistic"
    - "hyper-realistic"
    - "ultra-realistic"
    - "cinematic"
    - "cinematic lighting"
    - "cinematic composition"
    - "dramatic lighting"
    - "volumetric lighting"
    - "god rays"
    - "anamorphic"
    - "film grain"
    - "bokeh"
    - "shallow depth of field"
    - "depth of field"
    - "motion blur"
    - "long exposure"
    - "HDR"
    - "tone mapped"
    - "color graded"
    - "pristine"
    - "flawless"
    - "impeccable"
    - "sublime"
    - "breathtaking"
    - "stunning"
    - "gorgeous"
    - "magnificent"
    - "spectacular"
    - "awe-inspiring"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u8D85\u9AD8\u8D28\u91CF"
    - "\u8D85\u9AD8\u6E05"
    - "\u5168\u9AD8\u6E05"
    - "\u8D85\u7CBE\u7EC6"
    - "\u6781\u81F4\u7EC6\u8282"
    - "\u9510\u5229\u5BF9\u7126"
    - "\u5B8C\u7F8E\u6784\u56FE"
    - "\u83B7\u5956"
    - "\u4E13\u4E1A\u7EA7"
    - "\u5F71\u68DA\u7EA7"
    - "\u7167\u7247\u7EA7"
    - "\u8D85\u5199\u5B9E"
    - "\u7535\u5F71\u611F"
    - "\u7535\u5F71\u7EA7\u5E03\u5149"
    - "\u620F\u5267\u6027\u5149\u7167"
    - "\u4F53\u79EF\u5149"
    - "\u53D8\u5F62\u5BBD\u5C4F"
    - "\u80F6\u7247\u9897\u7C92"
    - "\u6D45\u666F\u6DF1"
    - "\u9AD8\u52A8\u6001\u8303\u56F4"
    - "\u65E0\u7455\u75B5"
    - "\u4EE4\u4EBA\u60CA\u53F9"
    - "\u58EE\u89C2"
    - "\u7EDD\u7F8E"

  # ============================================================
  # 18. SD \u8D1F\u9762\u63D0\u793A\u8BCD\u6807\u7B7E
  # ============================================================
  negative_tag:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "worst quality"
    - "low quality"
    - "normal quality"
    - "lowres"
    - "bad anatomy"
    - "bad hands"
    - "text"
    - "error"
    - "missing fingers"
    - "extra digit"
    - "fewer digits"
    - "cropped"
    - "jpeg artifacts"
    - "signature"
    - "watermark"
    - "username"
    - "blurry"
    - "artist name"
    - "deformed"
    - "ugly"
    - "duplicate"
    - "mutated"
    - "mutation"
    - "disfigured"
    - "poorly drawn"
    - "extra limbs"
    - "missing limbs"
    - "floating limbs"
    - "disconnected limbs"
    - "malformed hands"
    - "long neck"
    - "cross-eyed"
    - "mutated hands"
    - "poorly drawn hands"
    - "poorly drawn face"
    - "extra arms"
    - "extra legs"
    - "fused fingers"
    - "too many fingers"
    - "clone"
    - "bad proportions"
    - "gross proportions"
    - "malformed"
    - "missing arms"
    - "missing legs"
    - "extra ears"
    - "bad feet"
    - "distorted"
    - "grainy"
    - "cluttered"
    - "busy background"
    - "messy"
    - "chaotic"
    - "nsfw"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u6700\u4F4E\u8D28\u91CF"
    - "\u4F4E\u8D28\u91CF"
    - "\u4F4E\u5206\u8FA8\u7387"
    - "\u9519\u8BEF\u7684\u4EBA\u4F53\u7ED3\u6784"
    - "\u9519\u8BEF\u7684\u624B"
    - "\u6587\u5B57"
    - "\u9519\u8BEF"
    - "\u7F3A\u5931\u624B\u6307"
    - "\u591A\u4F59\u624B\u6307"
    - "\u88C1\u5207"
    - "JPEG\u4F2A\u5F71"
    - "\u7B7E\u540D"
    - "\u6C34\u5370"
    - "\u7528\u6237\u540D"
    - "\u6A21\u7CCA"
    - "\u827A\u672F\u5BB6\u540D"
    - "\u7578\u5F62"
    - "\u4E11\u964B"
    - "\u91CD\u590D"
    - "\u53D8\u5F02"
    - "\u6BC1\u5BB9"
    - "\u753B\u5F97\u5DEE"
    - "\u591A\u4F59\u80A2\u4F53"
    - "\u7F3A\u5931\u80A2\u4F53"
    - "\u60AC\u6D6E\u80A2\u4F53"
    - "\u65AD\u88C2\u80A2\u4F53"
    - "\u7578\u5F62\u624B"
    - "\u957F\u8116\u5B50"
    - "\u6597\u9E21\u773C"
    - "\u591A\u4F59\u624B\u81C2"
    - "\u591A\u4F59\u817F"
    - "\u624B\u6307\u878D\u5408"
    - "\u624B\u6307\u8FC7\u591A"
    - "\u514B\u9686"
    - "\u6BD4\u4F8B\u5931\u8C03"
    - "\u80CC\u666F\u6742\u4E71"
    - "\u51CC\u4E71"
    - "\u6DF7\u4E71"
    - "\u4E0D\u5B89\u5168\u5185\u5BB9"

  # ============================================================
  # 19. \u533B\u5B66\u672F\u8BED
  # ============================================================
  medical_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Diagnosis"
    - "Treatment"
    - "Therapy"
    - "Medication"
    - "Prescription"
    - "Dosage"
    - "Symptom"
    - "Syndrome"
    - "Chronic"
    - "Acute"
    - "Benign"
    - "Malignant"
    - "Tumor"
    - "Cancer"
    - "Infection"
    - "Inflammation"
    - "Immune system"
    - "Vaccine"
    - "Vaccination"
    - "Antibody"
    - "Antigen"
    - "Pathogen"
    - "Bacteria"
    - "Virus"
    - "Fungal"
    - "Blood pressure"
    - "Heart rate"
    - "Pulse"
    - "Temperature"
    - "Respiration"
    - "MRI"
    - "CT scan"
    - "X-ray"
    - "Ultrasound"
    - "Biopsy"
    - "Blood test"
    - "Urine test"
    - "Surgery"
    - "Operation"
    - "Anesthesia"
    - "Recovery"
    - "Rehabilitation"
    - "Physical therapy"
    - "Occupational therapy"
    - "Prognosis"
    - "Complication"
    - "Side effect"
    - "Contraindication"
    - "Allergy"
    - "Allergic reaction"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u8BCA\u65AD"
    - "\u6CBB\u7597"
    - "\u7597\u6CD5"
    - "\u836F\u7269"
    - "\u5904\u65B9"
    - "\u5242\u91CF"
    - "\u75C7\u72B6"
    - "\u7EFC\u5408\u5F81"
    - "\u6162\u6027"
    - "\u6025\u6027"
    - "\u826F\u6027"
    - "\u6076\u6027"
    - "\u80BF\u7624"
    - "\u764C\u75C7"
    - "\u611F\u67D3"
    - "\u708E\u75C7"
    - "\u514D\u75AB\u7CFB\u7EDF"
    - "\u75AB\u82D7"
    - "\u63A5\u79CD"
    - "\u6297\u4F53"
    - "\u6297\u539F"
    - "\u75C5\u539F\u4F53"
    - "\u7EC6\u83CC"
    - "\u75C5\u6BD2"
    - "\u8840\u538B"
    - "\u5FC3\u7387"
    - "\u8109\u640F"
    - "\u4F53\u6E29"
    - "\u547C\u5438"
    - "\u6838\u78C1\u5171\u632F"
    - "CT\u626B\u63CF"
    - "X\u5149"
    - "\u8D85\u58F0\u6CE2"
    - "\u6D3B\u68C0"
    - "\u8840\u6DB2\u68C0\u67E5"
    - "\u5C3F\u68C0"
    - "\u624B\u672F"
    - "\u9EBB\u9189"
    - "\u6062\u590D"
    - "\u5EB7\u590D"
    - "\u9884\u540E"
    - "\u5E76\u53D1\u75C7"
    - "\u526F\u4F5C\u7528"
    - "\u7981\u5FCC\u75C7"
    - "\u8FC7\u654F"

  # ============================================================
  # 20. \u6CD5\u5F8B\u672F\u8BED
  # ============================================================
  legal_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Contract"
    - "Agreement"
    - "Clause"
    - "Provision"
    - "Term"
    - "Condition"
    - "Party"
    - "Plaintiff"
    - "Defendant"
    - "Respondent"
    - "Petitioner"
    - "Appellant"
    - "Appellee"
    - "Jurisdiction"
    - "Court"
    - "Tribunal"
    - "Judge"
    - "Jury"
    - "Attorney"
    - "Lawyer"
    - "Counsel"
    - "Barrister"
    - "Solicitor"
    - "Litigation"
    - "Lawsuit"
    - "Suit"
    - "Filing"
    - "Motion"
    - "Petition"
    - "Appeal"
    - "Verdict"
    - "Judgment"
    - "Ruling"
    - "Order"
    - "Injunction"
    - "Restraining order"
    - "Subpoena"
    - "Summons"
    - "Deposition"
    - "Testimony"
    - "Evidence"
    - "Exhibit"
    - "Witness"
    - "Expert witness"
    - "Cross-examination"
    - "Direct examination"
    - "Objection"
    - "Sustained"
    - "Overruled"
    - "Settlement"
    - "Mediation"
    - "Arbitration"
    - "Negligence"
    - "Liability"
    - "Damages"
    - "Compensation"
    - "Restitution"
    - "Intellectual property"
    - "Copyright"
    - "Trademark"
    - "Patent"
    - "Trade secret"
    - "Breach"
    - "Violation"
    - "Infringement"
    - "Compliance"
    - "Regulatory"
    - "Statute"
    - "Law"
    - "Act"
    - "Bill"
    - "Legislation"
    - "Regulation"
    - "Ordinance"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u5408\u540C"
    - "\u534F\u8BAE"
    - "\u6761\u6B3E"
    - "\u89C4\u5B9A"
    - "\u6761\u4EF6"
    - "\u5F53\u4E8B\u4EBA"
    - "\u539F\u544A"
    - "\u88AB\u544A"
    - "\u7BA1\u8F96\u6743"
    - "\u6CD5\u9662"
    - "\u6CD5\u5B98"
    - "\u966A\u5BA1\u56E2"
    - "\u5F8B\u5E08"
    - "\u8BC9\u8BBC"
    - "\u8D77\u8BC9"
    - "\u52A8\u8BAE"
    - "\u4E0A\u8BC9"
    - "\u5224\u51B3"
    - "\u88C1\u51B3"
    - "\u7981\u4EE4"
    - "\u4F20\u7968"
    - "\u4F20\u5524"
    - "\u8BC1\u8BCD"
    - "\u8BC1\u636E"
    - "\u8BC1\u4EBA"
    - "\u4EA4\u53C9\u8BE2\u95EE"
    - "\u5F02\u8BAE"
    - "\u548C\u89E3"
    - "\u8C03\u89E3"
    - "\u4EF2\u88C1"
    - "\u8FC7\u5931"
    - "\u8D23\u4EFB"
    - "\u8D54\u507F"
    - "\u77E5\u8BC6\u4EA7\u6743"
    - "\u7248\u6743"
    - "\u5546\u6807"
    - "\u4E13\u5229"
    - "\u5546\u4E1A\u79D8\u5BC6"
    - "\u8FDD\u7EA6"
    - "\u4FB5\u6743"
    - "\u5408\u89C4"
    - "\u6CD5\u89C4"
    - "\u6CD5\u5F8B"
    - "\u6CD5\u6848"

  # ============================================================
  # 21. \u91D1\u878D\u672F\u8BED
  # ============================================================
  finance_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Asset"
    - "Liability"
    - "Equity"
    - "Revenue"
    - "Expense"
    - "Profit"
    - "Loss"
    - "Income"
    - "Cash flow"
    - "Balance sheet"
    - "Income statement"
    - "Cash flow statement"
    - "P&L"
    - "EBITDA"
    - "EBIT"
    - "Net income"
    - "Gross profit"
    - "Operating profit"
    - "Margin"
    - "ROI"
    - "ROE"
    - "ROA"
    - "P/E ratio"
    - "EPS"
    - "Dividend"
    - "Yield"
    - "Bond"
    - "Stock"
    - "Share"
    - "Market cap"
    - "Capitalization"
    - "Portfolio"
    - "Diversification"
    - "Risk"
    - "Volatility"
    - "Liquidity"
    - "Solvency"
    - "Leverage"
    - "Debt"
    - "Credit"
    - "Loan"
    - "Mortgage"
    - "Interest"
    - "Principal"
    - "Amortization"
    - "Depreciation"
    - "Appreciation"
    - "Inflation"
    - "Deflation"
    - "Recession"
    - "Depression"
    - "GDP"
    - "CPI"
    - "PMI"
    - "Bull market"
    - "Bear market"
    - "IPO"
    - "M&A"
    - "Acquisition"
    - "Merger"
    - "LBO"
    - "Venture capital"
    - "Private equity"
    - "Angel investor"
    - "Seed funding"
    - "Series A"
    - "Series B"
    - "Series C"
    - "Valuation"
    - "Pre-money"
    - "Post-money"
    - "Due diligence"
    - "Term sheet"
    - "Cap table"
    - "ESOP"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u8D44\u4EA7"
    - "\u8D1F\u503A"
    - "\u6743\u76CA"
    - "\u6536\u5165"
    - "\u652F\u51FA"
    - "\u5229\u6DA6"
    - "\u4E8F\u635F"
    - "\u73B0\u91D1\u6D41"
    - "\u8D44\u4EA7\u8D1F\u503A\u8868"
    - "\u5229\u6DA6\u8868"
    - "\u73B0\u91D1\u6D41\u91CF\u8868"
    - "\u51C0\u5229\u6DA6"
    - "\u6BDB\u5229\u6DA6"
    - "\u8425\u4E1A\u5229\u6DA6"
    - "\u5229\u6DA6\u7387"
    - "\u6295\u8D44\u56DE\u62A5\u7387"
    - "\u80A1\u672C\u56DE\u62A5\u7387"
    - "\u8D44\u4EA7\u56DE\u62A5\u7387"
    - "\u5E02\u76C8\u7387"
    - "\u6BCF\u80A1\u6536\u76CA"
    - "\u80A1\u606F"
    - "\u6536\u76CA\u7387"
    - "\u503A\u5238"
    - "\u80A1\u7968"
    - "\u5E02\u503C"
    - "\u6295\u8D44\u7EC4\u5408"
    - "\u591A\u5143\u5316"
    - "\u98CE\u9669"
    - "\u6CE2\u52A8\u7387"
    - "\u6D41\u52A8\u6027"
    - "\u507F\u4ED8\u80FD\u529B"
    - "\u6760\u6746"
    - "\u503A\u52A1"
    - "\u4FE1\u8D37"
    - "\u8D37\u6B3E"
    - "\u62B5\u62BC\u8D37\u6B3E"
    - "\u5229\u606F"
    - "\u672C\u91D1"
    - "\u6298\u65E7"
    - "\u5347\u503C"
    - "\u901A\u80C0"
    - "\u901A\u7F29"
    - "\u8870\u9000"
    - "\u8427\u6761"
    - "\u725B\u5E02"
    - "\u718A\u5E02"
    - "\u9996\u6B21\u516C\u5F00\u52DF\u80A1"
    - "\u5E76\u8D2D"
    - "\u6536\u8D2D"
    - "\u5408\u5E76"
    - "\u98CE\u9669\u6295\u8D44"
    - "\u79C1\u52DF\u80A1\u6743"
    - "\u5929\u4F7F\u6295\u8D44\u4EBA"
    - "\u79CD\u5B50\u8F6E"
    - "A\u8F6E"
    - "B\u8F6E"
    - "\u4F30\u503C"
    - "\u5C3D\u804C\u8C03\u67E5"
    - "\u6761\u6B3E\u6E05\u5355"

  # ============================================================
  # 22. \u5EFA\u7B51\u672F\u8BED
  # ============================================================
  architecture_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Facade"
    - "Elevation"
    - "Floor plan"
    - "Section"
    - "Detail"
    - "Blueprint"
    - "Foundation"
    - "Column"
    - "Beam"
    - "Slab"
    - "Wall"
    - "Roof"
    - "Ceiling"
    - "Floor"
    - "Staircase"
    - "Elevator"
    - "Escalator"
    - "Corridor"
    - "Hall"
    - "Atrium"
    - "Lobby"
    - "Entrance"
    - "Exit"
    - "Window"
    - "Door"
    - "Arch"
    - "Vault"
    - "Dome"
    - "Cantilever"
    - "Truss"
    - "Frame"
    - "Structure"
    - "Load bearing"
    - "Reinforced concrete"
    - "Steel frame"
    - "Glass curtain wall"
    - "Cladding"
    - "Insulation"
    - "HVAC"
    - "Plumbing"
    - "Electrical"
    - "Sustainability"
    - "LEED"
    - "Green building"
    - "Passive house"
    - "Solar panel"
    - "Rainwater harvesting"
    - "Urban planning"
    - "Zoning"
    - "Site plan"
    - "Landscape"
    - "Courtyard"
    - "Terrace"
    - "Balcony"
    - "Pergola"
    - "Gazebo"
    - "Pavilion"
    - "Modernism"
    - "Brutalism"
    - "Deconstructivism"
    - "Parametric"
    - "Organic architecture"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u7ACB\u9762"
    - "\u5E73\u9762\u56FE"
    - "\u5256\u9762\u56FE"
    - "\u57FA\u7840"
    - "\u67F1"
    - "\u6881"
    - "\u677F"
    - "\u5899"
    - "\u5C4B\u9876"
    - "\u5929\u82B1\u677F"
    - "\u697C\u68AF"
    - "\u7535\u68AF"
    - "\u8D70\u5ECA"
    - "\u5927\u5385"
    - "\u4E2D\u5EAD"
    - "\u95E8\u5385"
    - "\u5165\u53E3"
    - "\u51FA\u53E3"
    - "\u7A97"
    - "\u95E8"
    - "\u62F1"
    - "\u62F1\u9876"
    - "\u7A79\u9876"
    - "\u60AC\u81C2"
    - "\u6841\u67B6"
    - "\u6846\u67B6"
    - "\u627F\u91CD"
    - "\u94A2\u7B4B\u6DF7\u51DD\u571F"
    - "\u94A2\u6846\u67B6"
    - "\u73BB\u7483\u5E55\u5899"
    - "\u5916\u6302\u677F"
    - "\u4FDD\u6E29"
    - "\u6696\u901A\u7A7A\u8C03"
    - "\u53EF\u6301\u7EED\u5EFA\u7B51"
    - "\u7EFF\u8272\u5EFA\u7B51"
    - "\u88AB\u52A8\u623F"
    - "\u592A\u9633\u80FD\u677F"
    - "\u57CE\u5E02\u89C4\u5212"
    - "\u5206\u533A\u89C4\u5212"
    - "\u603B\u5E73\u9762"
    - "\u666F\u89C2"
    - "\u5EAD\u9662"
    - "\u9732\u53F0"
    - "\u9633\u53F0"
    - "\u82B1\u67B6"
    - "\u51C9\u4EAD"
    - "\u73B0\u4EE3\u4E3B\u4E49"
    - "\u7C97\u91CE\u4E3B\u4E49"
    - "\u89E3\u6784\u4E3B\u4E49"
    - "\u53C2\u6570\u5316\u8BBE\u8BA1"
    - "\u6709\u673A\u5EFA\u7B51"

  # ============================================================
  # 23. \u65F6\u5C1A\u672F\u8BED
  # ============================================================
  fashion_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Haute couture"
    - "Pr\xEAt-\xE0-porter"
    - "Ready to wear"
    - "Runway"
    - "Catwalk"
    - "Lookbook"
    - "Collection"
    - "Line"
    - "Season"
    - "Silhouette"
    - "Cut"
    - "Drape"
    - "Hem"
    - "Seam"
    - "Stitch"
    - "Fabric"
    - "Textile"
    - "Cotton"
    - "Silk"
    - "Wool"
    - "Linen"
    - "Polyester"
    - "Nylon"
    - "Leather"
    - "Suede"
    - "Denim"
    - "Velvet"
    - "Lace"
    - "Chiffon"
    - "Satin"
    - "Organza"
    - "Tulle"
    - "Tweed"
    - "Cashmere"
    - "Mohair"
    - "Pattern"
    - "Print"
    - "Embroidery"
    - "Beading"
    - "Sequin"
    - "Appliqu\xE9"
    - "Pleat"
    - "Ruffle"
    - "Frill"
    - "Flounce"
    - "Gather"
    - "Dart"
    - "Waistline"
    - "Neckline"
    - "Collar"
    - "Cuff"
    - "Sleeve"
    - "Lapel"
    - "Button"
    - "Zipper"
    - "Snap"
    - "Hook"
    - "Avant-garde"
    - "Minimalist"
    - "Streetwear"
    - "Athleisure"
    - "Vintage"
    - "Retro"
    - "Bohemian"
    - "Preppy"
    - "Grunge"
    - "Glamour"
    - "Elegant"
    - "Casual"
    - "Formal"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u9AD8\u7EA7\u5B9A\u5236"
    - "\u6210\u8863"
    - "\u79C0\u573A"
    - "\u753B\u518C"
    - "\u7CFB\u5217"
    - "\u8F6E\u5ED3"
    - "\u526A\u88C1"
    - "\u5782\u611F"
    - "\u4E0B\u6446"
    - "\u63A5\u7F1D"
    - "\u7F1D\u7EBF"
    - "\u9762\u6599"
    - "\u68C9"
    - "\u4E1D\u7EF8"
    - "\u7F8A\u6BDB"
    - "\u4E9A\u9EBB"
    - "\u805A\u916F\u7EA4\u7EF4"
    - "\u5C3C\u9F99"
    - "\u76AE\u9769"
    - "\u9E82\u76AE"
    - "\u725B\u4ED4"
    - "\u5929\u9E45\u7ED2"
    - "\u857E\u4E1D"
    - "\u96EA\u7EBA"
    - "\u7F0E"
    - "\u6B27\u6839\u7EB1"
    - "\u8584\u7EB1"
    - "\u7C97\u82B1\u5462"
    - "\u7F8A\u7ED2"
    - "\u9A6C\u6D77\u6BDB"
    - "\u56FE\u6848"
    - "\u5370\u82B1"
    - "\u523A\u7EE3"
    - "\u73E0\u9970"
    - "\u4EAE\u7247"
    - "\u8936\u88E5"
    - "\u8377\u53F6\u8FB9"
    - "\u6536\u8170"
    - "\u9886\u53E3"
    - "\u9886\u5B50"
    - "\u8896\u53E3"
    - "\u8896\u5B50"
    - "\u7FFB\u9886"
    - "\u7EBD\u6263"
    - "\u62C9\u94FE"
    - "\u524D\u536B"
    - "\u6781\u7B80"
    - "\u8857\u5934\u98CE"
    - "\u8FD0\u52A8\u4F11\u95F2"
    - "\u590D\u53E4"
    - "\u6CE2\u897F\u7C73\u4E9A"
    - "\u5B66\u9662\u98CE"
    - "\u4F18\u96C5"
    - "\u4F11\u95F2"
    - "\u6B63\u5F0F"

  # ============================================================
  # 24. \u7F8E\u98DF\u70F9\u996A\u672F\u8BED
  # ============================================================
  food_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Cuisine"
    - "Recipe"
    - "Ingredient"
    - "Seasoning"
    - "Spice"
    - "Herb"
    - "Marinade"
    - "Sauce"
    - "Dressing"
    - "Glaze"
    - "Rub"
    - "Brine"
    - "Cure"
    - "Smoke"
    - "Grill"
    - "Roast"
    - "Bake"
    - "Broil"
    - "Sear"
    - "Saut\xE9"
    - "Fry"
    - "Deep fry"
    - "Steam"
    - "Poach"
    - "Boil"
    - "Simmer"
    - "Braise"
    - "Stew"
    - "Blanch"
    - "Parboil"
    - "Caramelize"
    - "Deglaze"
    - "Reduce"
    - "Emulsify"
    - "Whip"
    - "Fold"
    - "Knead"
    - "Proof"
    - "Ferment"
    - "Infuse"
    - "Garnish"
    - "Plate"
    - "Plating"
    - "Texture"
    - "Mouthfeel"
    - "Umami"
    - "Sour"
    - "Sweet"
    - "Bitter"
    - "Salty"
    - "Savory"
    - "Spicy"
    - "Acidic"
    - "Rich"
    - "Light"
    - "Heavy"
    - "Crispy"
    - "Crunchy"
    - "Chewy"
    - "Tender"
    - "Juicy"
    - "Dry"
    - "Moist"
    - "Flakey"
    - "Creamy"
    - "Frothy"
    - "Velvety"
    - "Silky"
    - "Gourmet"
    - "Delicacy"
    - "Appetizer"
    - "Entree"
    - "Dessert"
    - "Beverage"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u70F9\u996A"
    - "\u83DC\u8C31"
    - "\u98DF\u6750"
    - "\u8C03\u5473"
    - "\u9999\u6599"
    - "\u9999\u8349"
    - "\u814C\u6599"
    - "\u9171\u6C41"
    - "\u6C99\u62C9\u9171"
    - "\u91C9\u6599"
    - "\u70E4"
    - "\u714E"
    - "\u7092"
    - "\u70B8"
    - "\u84B8"
    - "\u716E"
    - "\u7096"
    - "\u712F"
    - "\u7126\u7CD6\u5316"
    - "\u6536\u6C41"
    - "\u4E73\u5316"
    - "\u6253\u53D1"
    - "\u6298\u53E0"
    - "\u63C9\u9762"
    - "\u53D1\u9175"
    - "\u6D78\u6CE1"
    - "\u88C5\u9970"
    - "\u6446\u76D8"
    - "\u8D28\u5730"
    - "\u53E3\u611F"
    - "\u9C9C\u5473"
    - "\u9178"
    - "\u751C"
    - "\u82E6"
    - "\u54B8"
    - "\u8FA3"
    - "\u9165\u8106"
    - "\u6709\u56BC\u52B2"
    - "\u5AE9"
    - "\u591A\u6C41"
    - "\u5E72"
    - "\u6E7F\u6DA6"
    - "\u9165\u677E"
    - "\u5976\u6CB9\u72B6"
    - "\u7EC6\u817B"
    - "\u5F00\u80C3\u83DC"
    - "\u4E3B\u83DC"
    - "\u751C\u70B9"
    - "\u996E\u54C1"

  # ============================================================
  # 25. \u7269\u7406\u79D1\u5B66\u672F\u8BED
  # ============================================================
  physics_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Velocity"
    - "Acceleration"
    - "Force"
    - "Mass"
    - "Weight"
    - "Momentum"
    - "Energy"
    - "Kinetic energy"
    - "Potential energy"
    - "Work"
    - "Power"
    - "Friction"
    - "Gravity"
    - "Inertia"
    - "Torque"
    - "Angular momentum"
    - "Frequency"
    - "Wavelength"
    - "Amplitude"
    - "Phase"
    - "Refraction"
    - "Reflection"
    - "Diffraction"
    - "Interference"
    - "Polarization"
    - "Electromagnetic"
    - "Magnetic field"
    - "Electric field"
    - "Voltage"
    - "Current"
    - "Resistance"
    - "Capacitance"
    - "Inductance"
    - "Conductor"
    - "Insulator"
    - "Semiconductor"
    - "Thermodynamics"
    - "Entropy"
    - "Enthalpy"
    - "Heat"
    - "Temperature"
    - "Conduction"
    - "Convection"
    - "Radiation"
    - "Quantum"
    - "Photon"
    - "Electron"
    - "Proton"
    - "Neutron"
    - "Nucleus"
    - "Isotope"
    - "Fission"
    - "Fusion"
    - "Relativity"
    - "Space-time"
    - "Black hole"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u901F\u5EA6"
    - "\u52A0\u901F\u5EA6"
    - "\u529B"
    - "\u8D28\u91CF"
    - "\u91CD\u91CF"
    - "\u52A8\u91CF"
    - "\u80FD\u91CF"
    - "\u52A8\u80FD"
    - "\u52BF\u80FD"
    - "\u529F"
    - "\u529F\u7387"
    - "\u6469\u64E6\u529B"
    - "\u91CD\u529B"
    - "\u60EF\u6027"
    - "\u529B\u77E9"
    - "\u89D2\u52A8\u91CF"
    - "\u9891\u7387"
    - "\u6CE2\u957F"
    - "\u632F\u5E45"
    - "\u6298\u5C04"
    - "\u53CD\u5C04"
    - "\u884D\u5C04"
    - "\u5E72\u6D89"
    - "\u504F\u632F"
    - "\u7535\u78C1"
    - "\u78C1\u573A"
    - "\u7535\u573A"
    - "\u7535\u538B"
    - "\u7535\u6D41"
    - "\u7535\u963B"
    - "\u70ED\u529B\u5B66"
    - "\u71B5"
    - "\u7113"
    - "\u70ED\u91CF"
    - "\u6E29\u5EA6"
    - "\u4F20\u5BFC"
    - "\u5BF9\u6D41"
    - "\u8F90\u5C04"
    - "\u91CF\u5B50"
    - "\u5149\u5B50"
    - "\u7535\u5B50"
    - "\u8D28\u5B50"
    - "\u4E2D\u5B50"
    - "\u539F\u5B50\u6838"
    - "\u540C\u4F4D\u7D20"
    - "\u88C2\u53D8"
    - "\u805A\u53D8"
    - "\u76F8\u5BF9\u8BBA"
    - "\u65F6\u7A7A"
    - "\u9ED1\u6D1E"

  # ============================================================
  # 26. UI/UX \u8BBE\u8BA1\u672F\u8BED
  # ============================================================
  ui_ux_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Wireframe"
    - "Prototype"
    - "Mockup"
    - "Design System"
    - "Component Library"
    - "Design Token"
    - "Responsive Design"
    - "Adaptive Layout"
    - "Grid System"
    - "Spacing System"
    - "Visual Hierarchy"
    - "Information Architecture"
    - "User Journey"
    - "Usability Testing"
    - "Accessibility"
    - "Breadcrumb Navigation"
    - "Hamburger Menu"
    - "Floating Action Button"
    - "Skeleton Screen"
    - "Empty State"
    - "Onboarding"
    - "Microinteraction"
    - "Hover State"
    - "Focus State"
    - "Touch Target"
    - "Elevation"
    - "Border Radius"
    - "Typography"
    - "Font Weight"
    - "Line Height"
    - "Letter Spacing"
    - "Contrast Ratio"
    - "Color Mode"
    - "User Interface"
    - "User Experience"
    - "Interaction Design"
    - "Persona"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u7EBF\u6846\u56FE"
    - "\u539F\u578B"
    - "\u6A21\u578B"
    - "\u8BBE\u8BA1\u7CFB\u7EDF"
    - "\u7EC4\u4EF6\u5E93"
    - "\u8BBE\u8BA1\u4EE4\u724C"
    - "\u54CD\u5E94\u5F0F\u8BBE\u8BA1"
    - "\u81EA\u9002\u5E94\u5E03\u5C40"
    - "\u7F51\u683C\u7CFB\u7EDF"
    - "\u95F4\u8DDD\u7CFB\u7EDF"
    - "\u89C6\u89C9\u5C42\u7EA7"
    - "\u4FE1\u606F\u67B6\u6784"
    - "\u7528\u6237\u65C5\u7A0B"
    - "\u53EF\u7528\u6027\u6D4B\u8BD5"
    - "\u65E0\u969C\u788D\u8BBE\u8BA1"
    - "\u9762\u5305\u5C51\u5BFC\u822A"
    - "\u6C49\u5821\u83DC\u5355"
    - "\u6D6E\u52A8\u64CD\u4F5C\u6309\u94AE"
    - "\u9AA8\u67B6\u5C4F"
    - "\u7A7A\u72B6\u6001"
    - "\u5F15\u5BFC\u52A8\u753B"
    - "\u5FAE\u4EA4\u4E92"
    - "\u60AC\u505C\u72B6\u6001"
    - "\u805A\u7126\u72B6\u6001"
    - "\u70B9\u51FB\u533A\u57DF"
    - "\u9634\u5F71"
    - "\u5706\u89D2"
    - "\u5B57\u4F53\u6392\u5370"
    - "\u5B57\u91CD"
    - "\u884C\u9AD8"
    - "\u5B57\u95F4\u8DDD"
    - "\u5BF9\u6BD4\u5EA6"
    - "\u8272\u5F69\u6A21\u5F0F"

  # ============================================================
  # 27. 3D\u5EFA\u6A21/CG \u672F\u8BED
  # ============================================================
  cg_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Polygon Modeling"
    - "Mesh"
    - "Vertex"
    - "Edge"
    - "Normal"
    - "UV Mapping"
    - "UV Unwrapping"
    - "Material"
    - "Shader"
    - "Node Material"
    - "Procedural Texture"
    - "Bump Mapping"
    - "Normal Mapping"
    - "Displacement Mapping"
    - "Roughness"
    - "Metalness"
    - "Specular"
    - "Emission"
    - "Global Illumination"
    - "Ray Tracing"
    - "Path Tracing"
    - "Renderer"
    - "Sampling"
    - "Denoising"
    - "Rigging"
    - "Skinning"
    - "Weight Painting"
    - "Keyframe Animation"
    - "Particle System"
    - "Cloth Simulation"
    - "Fluid Simulation"
    - "Rigid Body Dynamics"
    - "Soft Body Dynamics"
    - "Boolean Operation"
    - "Subdivision Surface"
    - "Modifier"
    - "Topology"
    - "Retopology"
    - "Albedo"
    - "Physically Based Rendering"
    - "Level of Detail"
    - "Frustum Culling"
    - "Occlusion Culling"
    - "Draw Call"
    - "Instancing"
    - "Sprite Atlas"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u591A\u8FB9\u5F62\u5EFA\u6A21"
    - "\u7F51\u683C"
    - "\u9876\u70B9"
    - "\u6CD5\u7EBF"
    - "UV\u5C55\u5F00"
    - "\u6750\u8D28"
    - "\u7EB9\u7406"
    - "\u7740\u8272\u5668"
    - "\u8282\u70B9\u6750\u8D28"
    - "\u7A0B\u5E8F\u5316\u7EB9\u7406"
    - "\u51F9\u51F8\u8D34\u56FE"
    - "\u6CD5\u7EBF\u8D34\u56FE"
    - "\u4F4D\u79FB\u8D34\u56FE"
    - "\u7C97\u7CD9\u5EA6"
    - "\u91D1\u5C5E\u5EA6"
    - "\u9AD8\u5149"
    - "\u81EA\u53D1\u5149"
    - "\u73AF\u5883\u5149\u906E\u853D"
    - "\u5168\u5C40\u5149\u7167"
    - "\u5149\u7EBF\u8FFD\u8E2A"
    - "\u8DEF\u5F84\u8FFD\u8E2A"
    - "\u6E32\u67D3\u5668"
    - "\u91C7\u6837"
    - "\u964D\u566A"
    - "\u9AA8\u9ABC\u7ED1\u5B9A"
    - "\u8499\u76AE"
    - "\u6743\u91CD\u7ED8\u5236"
    - "\u5173\u952E\u5E27\u52A8\u753B"
    - "\u7C92\u5B50\u7CFB\u7EDF"
    - "\u5E03\u6599\u6A21\u62DF"
    - "\u6D41\u4F53\u6A21\u62DF"
    - "\u521A\u4F53\u52A8\u529B\u5B66"
    - "\u8F6F\u4F53\u52A8\u529B\u5B66"
    - "\u5E03\u5C14\u8FD0\u7B97"
    - "\u7EC6\u5206\u66F2\u9762"
    - "\u4FEE\u6539\u5668"
    - "\u62D3\u6251"
    - "\u91CD\u65B0\u62D3\u6251"
    - "\u7269\u7406\u6E32\u67D3"
    - "\u7EC6\u8282\u5C42\u6B21"
    - "\u5254\u9664"
    - "\u7ED8\u5236\u8C03\u7528"
    - "\u5B9E\u4F8B\u5316"

  # ============================================================
  # 28. \u5F71\u89C6\u540E\u671F/VFX \u672F\u8BED
  # ============================================================
  vfx_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Compositing"
    - "Keying"
    - "Chroma Key"
    - "Luma Key"
    - "Rotoscoping"
    - "Motion Tracking"
    - "2D Tracking"
    - "3D Tracking"
    - "Camera Solving"
    - "Node-based Compositing"
    - "Layer-based Compositing"
    - "Pre-compose"
    - "Color Grading"
    - "Color Correction"
    - "Color Space"
    - "Gamut"
    - "Color Depth"
    - "Look-Up Table"
    - "Node Tree"
    - "Alpha Channel"
    - "Z-Depth Pass"
    - "Motion Blur"
    - "Depth of Field"
    - "Bloom"
    - "Glow"
    - "Lens Flare"
    - "Particle Effects"
    - "Smoke Simulation"
    - "Explosion FX"
    - "Matte Painting"
    - "Set Extension"
    - "Wire Removal"
    - "Cleanup"
    - "Time Remapping"
    - "Frame Blending"
    - "Optical Flow"
    - "Title Sequence"
    - "Film Scan"
    - "Film Grain"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u5408\u6210"
    - "\u62A0\u50CF"
    - "\u8272\u5EA6\u952E"
    - "\u4EAE\u5EA6\u952E"
    - "\u906E\u7F69"
    - "\u8499\u7248\u7ED8\u5236"
    - "\u8FD0\u52A8\u8DDF\u8E2A"
    - "2D\u8DDF\u8E2A"
    - "3D\u8DDF\u8E2A"
    - "\u6444\u50CF\u673A\u89E3\u7B97"
    - "\u8282\u70B9\u5408\u6210"
    - "\u56FE\u5C42\u5408\u6210"
    - "\u9884\u5408\u6210"
    - "\u8C03\u8272"
    - "\u6821\u8272"
    - "\u8272\u5F69\u7A7A\u95F4"
    - "\u8272\u57DF"
    - "\u8272\u5F69\u6DF1\u5EA6"
    - "\u8282\u70B9\u6811"
    - "\u901A\u9053"
    - "Alpha\u901A\u9053"
    - "\u6DF1\u5EA6\u901A\u9053"
    - "\u8FD0\u52A8\u6A21\u7CCA"
    - "\u666F\u6DF1"
    - "\u8F89\u5149"
    - "\u955C\u5934\u5149\u6655"
    - "\u7C92\u5B50\u7279\u6548"
    - "\u70DF\u96FE\u6A21\u62DF"
    - "\u7206\u70B8\u7279\u6548"
    - "\u6570\u5B57\u7ED8\u666F"
    - "\u5B9E\u666F\u5EF6\u4F38"
    - "\u64E6\u9664"
    - "\u5A01\u4E9A\u53BB\u9664"
    - "\u65F6\u95F4\u91CD\u6620\u5C04"
    - "\u5E27\u878D\u5408"
    - "\u5149\u6D41\u6CD5"
    - "\u7247\u5934"
    - "\u5E95\u7247\u626B\u63CF"
    - "\u80F6\u7247\u9897\u7C92"

  # ============================================================
  # 29. \u52A8\u6548\u8BBE\u8BA1\u672F\u8BED
  # ============================================================
  motion_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Motion Graphics"
    - "Keyframe"
    - "Easing"
    - "B\xE9zier Curve"
    - "Timeline"
    - "Time Remap"
    - "Frame Rate"
    - "Path Animation"
    - "Morphing"
    - "Text on Path"
    - "Kinetics"
    - "Physics Simulation"
    - "Spring Animation"
    - "Damping"
    - "Amplitude"
    - "Frequency"
    - "Phase"
    - "Loop Animation"
    - "Expression"
    - "Script-driven"
    - "Emitter"
    - "Vector Animation"
    - "Skeletal Animation"
    - "Frame-by-frame Animation"
    - "Tweening"
    - "Mask Animation"
    - "Mask Tracking"
    - "Preset"
    - "Render Queue"
    - "Codec"
    - "Bitrate"
    - "Compression"
    - "Transparent Video"
    - "Image Sequence"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u52A8\u6001\u56FE\u5F62"
    - "\u5173\u952E\u5E27"
    - "\u7F13\u52A8"
    - "\u8D1D\u585E\u5C14\u66F2\u7EBF"
    - "\u65F6\u95F4\u8F74"
    - "\u65F6\u95F4\u7EBF"
    - "\u5E27\u901F\u7387"
    - "\u8DEF\u5F84\u52A8\u753B"
    - "\u5F62\u53D8\u52A8\u753B"
    - "\u8DEF\u5F84\u6587\u5B57"
    - "\u52A8\u529B\u5B66"
    - "\u7269\u7406\u6A21\u62DF"
    - "\u521A\u4F53"
    - "\u5F39\u7C27\u52A8\u753B"
    - "\u963B\u5C3C"
    - "\u632F\u5E45"
    - "\u9891\u7387"
    - "\u76F8\u4F4D"
    - "\u5FAA\u73AF\u52A8\u753B"
    - "\u8868\u8FBE\u5F0F"
    - "\u811A\u672C\u9A71\u52A8"
    - "\u53D1\u5C04\u5668"
    - "\u77E2\u91CF\u52A8\u753B"
    - "\u9AA8\u9ABC\u52A8\u753B"
    - "\u9010\u5E27\u52A8\u753B"
    - "\u8865\u95F4\u52A8\u753B"
    - "\u8499\u7248\u52A8\u753B"
    - "\u906E\u7F69\u8FFD\u8E2A"
    - "\u9884\u8BBE"
    - "\u6E32\u67D3\u961F\u5217"
    - "\u7F16\u89E3\u7801\u5668"
    - "\u6BD4\u7279\u7387"
    - "\u538B\u7F29"
    - "\u900F\u660E\u89C6\u9891"
    - "\u5E8F\u5217\u5E27"

  # ============================================================
  # 30. \u7535\u5546\u8FD0\u8425\u672F\u8BED
  # ============================================================
  ecommerce_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Conversion Rate"
    - "Average Order Value"
    - "Customer Acquisition Cost"
    - "Customer Lifetime Value"
    - "Return Rate"
    - "Repurchase Rate"
    - "Add-to-cart Rate"
    - "Bounce Rate"
    - "Gross Merchandise Volume"
    - "Stock Keeping Unit"
    - "Product Detail Page"
    - "Landing Page"
    - "Funnel Analysis"
    - "Flash Sale"
    - "Group Buy"
    - "Full Reduction"
    - "Coupon"
    - "Loyalty Program"
    - "Private Domain Traffic"
    - "Product Seeding"
    - "Livestream Selling"
    - "Product Selection"
    - "Product Testing"
    - "Stocking"
    - "Sell-through Rate"
    - "Inventory Turnover"
    - "Supply Chain"
    - "Dropshipping"
    - "Cross-border E-commerce"
    - "Independent Store"
    - "Brand Going Global"
    - "Store Decoration"
    - "Main Image"
    - "White Background Image"
    - "Detail Image"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u8F6C\u5316\u7387"
    - "\u5BA2\u5355\u4EF7"
    - "\u83B7\u5BA2\u6210\u672C"
    - "\u5BA2\u6237\u7EC8\u8EAB\u4EF7\u503C"
    - "\u9000\u8D27\u7387"
    - "\u590D\u8D2D\u7387"
    - "\u52A0\u8D2D\u7387"
    - "\u8DF3\u51FA\u7387"
    - "\u5546\u54C1\u8BE6\u60C5\u9875"
    - "\u843D\u5730\u9875"
    - "\u6F0F\u6597\u5206\u6790"
    - "\u79D2\u6740"
    - "\u62FC\u56E2"
    - "\u6EE1\u51CF"
    - "\u4F18\u60E0\u5238"
    - "\u4F1A\u5458\u4F53\u7CFB"
    - "\u79C1\u57DF\u6D41\u91CF"
    - "\u79CD\u8349"
    - "\u5E26\u8D27"
    - "\u9009\u54C1"
    - "\u6D4B\u6B3E"
    - "\u5907\u8D27"
    - "\u52A8\u9500\u7387"
    - "\u5E93\u5B58\u5468\u8F6C"
    - "\u4F9B\u5E94\u94FE"
    - "\u4E00\u4EF6\u4EE3\u53D1"
    - "\u8DE8\u5883\u7535\u5546"
    - "\u72EC\u7ACB\u7AD9"
    - "\u54C1\u724C\u51FA\u6D77"
    - "\u8BE6\u60C5\u9875\u88C5\u4FEE"
    - "\u4E3B\u56FE"
    - "\u767D\u5E95\u56FE"
    - "\u8BE6\u60C5\u56FE"

  # ============================================================
  # 31. \u6559\u80B2\u5B66\u672F\u8BED
  # ============================================================
  education_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Instructional Design"
    - "Curriculum Development"
    - "Bloom's Taxonomy"
    - "Formative Assessment"
    - "Summative Assessment"
    - "Blended Learning"
    - "Flipped Classroom"
    - "Project-Based Learning"
    - "Inquiry-Based Learning"
    - "Differentiated Instruction"
    - "Scaffolding"
    - "Constructivism"
    - "Cognitive Load"
    - "Metacognition"
    - "Learning Objective"
    - "Syllabus"
    - "Lesson Plan"
    - "Learning Outcome"
    - "Competency Map"
    - "Microlearning"
    - "Gamification"
    - "Self-directed Learning"
    - "Collaborative Learning"
    - "Situated Learning"
    - "Prior Knowledge"
    - "Transfer of Learning"
    - "Deliberate Practice"
    - "Spaced Repetition"
    - "Ebbinghaus Forgetting Curve"
    - "Formative Feedback"
    - "Learning Analytics"
    - "Open Educational Resources"
    - "Massive Open Online Course"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u6559\u5B66\u8BBE\u8BA1"
    - "\u8BFE\u7A0B\u5F00\u53D1"
    - "\u5E03\u9C81\u59C6\u5206\u7C7B\u6CD5"
    - "\u5F62\u6210\u6027\u8BC4\u4EF7"
    - "\u603B\u7ED3\u6027\u8BC4\u4EF7"
    - "\u6DF7\u5408\u5F0F\u5B66\u4E60"
    - "\u7FFB\u8F6C\u8BFE\u5802"
    - "\u9879\u76EE\u5F0F\u5B66\u4E60"
    - "\u63A2\u7A76\u5F0F\u5B66\u4E60"
    - "\u5DEE\u5F02\u5316\u6559\u5B66"
    - "\u811A\u624B\u67B6"
    - "\u5EFA\u6784\u4E3B\u4E49"
    - "\u8BA4\u77E5\u8D1F\u8377"
    - "\u5143\u8BA4\u77E5"
    - "\u5B66\u4E60\u76EE\u6807"
    - "\u6559\u5B66\u5927\u7EB2"
    - "\u6559\u6848"
    - "\u5B66\u4E60\u6210\u679C"
    - "\u80FD\u529B\u56FE\u8C31"
    - "\u5FAE\u5B66\u4E60"
    - "\u6E38\u620F\u5316\u5B66\u4E60"
    - "\u81EA\u4E3B\u5B66\u4E60"
    - "\u534F\u4F5C\u5B66\u4E60"
    - "\u60C5\u5883\u5B66\u4E60"
    - "\u652F\u67B6\u5F0F\u6559\u5B66"
    - "\u5148\u5907\u77E5\u8BC6"
    - "\u8FC1\u79FB\u5B66\u4E60"
    - "\u523B\u610F\u7EC3\u4E60"
    - "\u95F4\u9694\u91CD\u590D"
    - "\u827E\u5BBE\u6D69\u65AF\u9057\u5FD8\u66F2\u7EBF"
    - "\u5F62\u6210\u6027\u53CD\u9988"
    - "\u5B66\u4E60\u5206\u6790"
    - "\u5F00\u653E\u6559\u80B2\u8D44\u6E90"
    - "\u6155\u8BFE"

  # ============================================================
  # 32. \u5FC3\u7406\u5B66\u672F\u8BED
  # ============================================================
  psychology_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Cognitive Behavioral Therapy"
    - "Classical Conditioning"
    - "Operant Conditioning"
    - "Positive Reinforcement"
    - "Negative Reinforcement"
    - "Punishment"
    - "Extinction"
    - "Maslow's Hierarchy of Needs"
    - "Self-actualization"
    - "Flow State"
    - "Intrinsic Motivation"
    - "Extrinsic Motivation"
    - "Cognitive Dissonance"
    - "Confirmation Bias"
    - "Anchoring Effect"
    - "Framing Effect"
    - "Availability Heuristic"
    - "Dunning-Kruger Effect"
    - "Bystander Effect"
    - "Self-fulfilling Prophecy"
    - "Attachment Theory"
    - "Defense Mechanism"
    - "Projection"
    - "Rationalization"
    - "Repression"
    - "Sublimation"
    - "Personality Traits"
    - "Emotion Regulation"
    - "Mindfulness"
    - "Empathy"
    - "Self-efficacy"
    - "Learned Helplessness"
    - "Resilience"
    - "Post-traumatic Growth"
    - "Schema Therapy"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u8BA4\u77E5\u884C\u4E3A\u7597\u6CD5"
    - "\u7ECF\u5178\u6761\u4EF6\u53CD\u5C04"
    - "\u64CD\u4F5C\u6027\u6761\u4EF6\u53CD\u5C04"
    - "\u6B63\u5F3A\u5316"
    - "\u8D1F\u5F3A\u5316"
    - "\u60E9\u7F5A"
    - "\u6D88\u9000"
    - "\u9A6C\u65AF\u6D1B\u9700\u6C42\u5C42\u6B21"
    - "\u81EA\u6211\u5B9E\u73B0"
    - "\u5FC3\u6D41\u72B6\u6001"
    - "\u5185\u5728\u52A8\u673A"
    - "\u5916\u5728\u52A8\u673A"
    - "\u8BA4\u77E5\u5931\u8C03"
    - "\u786E\u8BA4\u504F\u8BEF"
    - "\u951A\u5B9A\u6548\u5E94"
    - "\u6846\u67B6\u6548\u5E94"
    - "\u53EF\u7528\u6027\u542F\u53D1"
    - "\u8FBE\u514B\u6548\u5E94"
    - "\u65C1\u89C2\u8005\u6548\u5E94"
    - "\u81EA\u8BC1\u9884\u8A00"
    - "\u4F9D\u604B\u7406\u8BBA"
    - "\u5FC3\u7406\u9632\u5FA1\u673A\u5236"
    - "\u6295\u5C04"
    - "\u5408\u7406\u5316"
    - "\u538B\u6291"
    - "\u5347\u534E"
    - "\u4EBA\u683C\u7279\u8D28"
    - "\u60C5\u7EEA\u8C03\u8282"
    - "\u6B63\u5FF5"
    - "\u5171\u60C5"
    - "\u81EA\u6211\u6548\u80FD\u611F"
    - "\u4E60\u5F97\u6027\u65E0\u52A9"
    - "\u5FC3\u7406\u97E7\u6027"
    - "\u521B\u4F24\u540E\u6210\u957F"
    - "\u56FE\u5F0F\u6CBB\u7597"

  # ============================================================
  # 33. \u5316\u5B66\u672F\u8BED
  # ============================================================
  chemistry_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Chemical Reaction"
    - "Catalyst"
    - "Organic Chemistry"
    - "Inorganic Chemistry"
    - "Biochemistry"
    - "Stoichiometry"
    - "Molecule"
    - "Atom"
    - "Ion"
    - "Covalent Bond"
    - "Ionic Bond"
    - "Hydrogen Bond"
    - "Intermolecular Force"
    - "Functional Group"
    - "Polymer"
    - "Monomer"
    - "Isomer"
    - "Chirality"
    - "Stereochemistry"
    - "Redox Reaction"
    - "Hydrolysis"
    - "Synthesis"
    - "Extraction"
    - "Distillation"
    - "Crystallization"
    - "Titration"
    - "Spectroscopy"
    - "Chromatography"
    - "Activation Energy"
    - "Exothermic Reaction"
    - "Endothermic Reaction"
    - "Equilibrium Constant"
    - "Reaction Rate"
    - "Solubility"
    - "Concentration"
    - "Molar Mass"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u5316\u5B66\u53CD\u5E94"
    - "\u50AC\u5316\u5242"
    - "\u9178\u78B1\u5EA6"
    - "\u6709\u673A\u5316\u5B66"
    - "\u65E0\u673A\u5316\u5B66"
    - "\u751F\u7269\u5316\u5B66"
    - "\u5316\u5B66\u8BA1\u91CF\u5B66"
    - "\u6469\u5C14"
    - "\u5206\u5B50"
    - "\u539F\u5B50"
    - "\u79BB\u5B50"
    - "\u5171\u4EF7\u952E"
    - "\u79BB\u5B50\u952E"
    - "\u6C22\u952E"
    - "\u5206\u5B50\u95F4\u4F5C\u7528\u529B"
    - "\u5B98\u80FD\u56E2"
    - "\u805A\u5408\u7269"
    - "\u5355\u4F53"
    - "\u540C\u5206\u5F02\u6784\u4F53"
    - "\u624B\u6027"
    - "\u7ACB\u4F53\u5316\u5B66"
    - "\u6C27\u5316\u8FD8\u539F\u53CD\u5E94"
    - "\u6C34\u89E3"
    - "\u5408\u6210"
    - "\u8403\u53D6"
    - "\u84B8\u998F"
    - "\u7ED3\u6676"
    - "\u6EF4\u5B9A"
    - "\u5149\u8C31\u5B66"
    - "\u8272\u8C31\u6CD5"
    - "\u6D3B\u5316\u80FD"
    - "\u653E\u70ED\u53CD\u5E94"
    - "\u5438\u70ED\u53CD\u5E94"
    - "\u5E73\u8861\u5E38\u6570"
    - "\u53CD\u5E94\u901F\u7387"
    - "\u6EB6\u89E3\u5EA6"
    - "\u6D53\u5EA6"
    - "\u6469\u5C14\u8D28\u91CF"

  # ============================================================
  # 34. \u751F\u7269\u5B66\u672F\u8BED
  # ============================================================
  biology_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Cell"
    - "Deoxyribonucleic Acid"
    - "Ribonucleic Acid"
    - "Gene"
    - "Protein"
    - "Enzyme"
    - "Organelle"
    - "Mitochondria"
    - "Nucleus"
    - "Ribosome"
    - "Cell Division"
    - "Mitosis"
    - "Meiosis"
    - "Gene Expression"
    - "Transcription"
    - "Translation"
    - "Mutation"
    - "Heredity"
    - "Epigenetics"
    - "Evolution"
    - "Natural Selection"
    - "Ecosystem"
    - "Biodiversity"
    - "Food Chain"
    - "Symbiosis"
    - "Photosynthesis"
    - "Cellular Respiration"
    - "Metabolism"
    - "Anabolism"
    - "Catabolism"
    - "Taxonomy"
    - "Tissue"
    - "Organ"
    - "Organ System"
    - "Neuron"
    - "Synapse"
    - "Hormone"
    - "Immune System"
    - "Antibody"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u7EC6\u80DE"
    - "\u8131\u6C27\u6838\u7CD6\u6838\u9178"
    - "\u6838\u7CD6\u6838\u9178"
    - "\u57FA\u56E0"
    - "\u86CB\u767D\u8D28"
    - "\u9176"
    - "\u7EC6\u80DE\u5668"
    - "\u7EBF\u7C92\u4F53"
    - "\u7EC6\u80DE\u6838"
    - "\u6838\u7CD6\u4F53"
    - "\u7EC6\u80DE\u5206\u88C2"
    - "\u6709\u4E1D\u5206\u88C2"
    - "\u51CF\u6570\u5206\u88C2"
    - "\u57FA\u56E0\u8868\u8FBE"
    - "\u8F6C\u5F55"
    - "\u7FFB\u8BD1"
    - "\u7A81\u53D8"
    - "\u9057\u4F20"
    - "\u8868\u89C2\u9057\u4F20\u5B66"
    - "\u8FDB\u5316"
    - "\u81EA\u7136\u9009\u62E9"
    - "\u751F\u6001\u7CFB\u7EDF"
    - "\u751F\u7269\u591A\u6837\u6027"
    - "\u98DF\u7269\u94FE"
    - "\u5171\u751F"
    - "\u5149\u5408\u4F5C\u7528"
    - "\u7EC6\u80DE\u547C\u5438"
    - "\u4EE3\u8C22"
    - "\u540C\u5316\u4F5C\u7528"
    - "\u5F02\u5316\u4F5C\u7528"
    - "\u5206\u7C7B\u5B66"
    - "\u7EC4\u7EC7"
    - "\u5668\u5B98"
    - "\u795E\u7ECF\u5143"
    - "\u7A81\u89E6"
    - "\u6FC0\u7D20"
    - "\u514D\u75AB\u7CFB\u7EDF"
    - "\u6297\u4F53"

  # ============================================================
  # 35. \u5730\u7406/GIS \u672F\u8BED
  # ============================================================
  geography_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Spatial Analysis"
    - "Geographic Information System"
    - "Remote Sensing"
    - "Urban Sprawl"
    - "Gentrification"
    - "Environmental Justice"
    - "Place Attachment"
    - "Biogeography"
    - "Watershed"
    - "Geomorphology"
    - "Raster Data"
    - "Vector Data"
    - "Interpolation"
    - "Spatial Autocorrelation"
    - "Coordinate System"
    - "Map Projection"
    - "Geodesy"
    - "Contour Line"
    - "Digital Elevation Model"
    - "Buffer Analysis"
    - "Overlay Analysis"
    - "Network Analysis"
    - "Heat Map"
    - "Spatial Interpolation"
    - "Kriging"
    - "Geostatistics"
    - "Longitude"
    - "Latitude"
    - "Equator"
    - "Prime Meridian"
    - "Time Zone"
    - "Plate Tectonics"
    - "Climate Zone"
    - "Ocean Current"
    - "Monsoon"
    - "El Ni\xF1o"
    - "Karst Topography"
    - "Alluvial Plain"
    - "Delta"
    - "Isotherm"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u7A7A\u95F4\u5206\u6790"
    - "\u5730\u7406\u4FE1\u606F\u7CFB\u7EDF"
    - "\u9065\u611F"
    - "\u57CE\u5E02\u8513\u5EF6"
    - "\u58EB\u7EC5\u5316"
    - "\u73AF\u5883\u6B63\u4E49"
    - "\u5730\u65B9\u4F9D\u604B"
    - "\u751F\u7269\u5730\u7406\u5B66"
    - "\u6D41\u57DF"
    - "\u5730\u8C8C\u5B66"
    - "\u6805\u683C\u6570\u636E"
    - "\u77E2\u91CF\u6570\u636E"
    - "\u63D2\u503C"
    - "\u7A7A\u95F4\u81EA\u76F8\u5173"
    - "\u5750\u6807\u7CFB"
    - "\u6295\u5F71"
    - "\u5927\u5730\u6D4B\u91CF"
    - "\u7B49\u9AD8\u7EBF"
    - "\u6570\u5B57\u9AD8\u7A0B\u6A21\u578B"
    - "\u7F13\u51B2\u533A\u5206\u6790"
    - "\u53E0\u52A0\u5206\u6790"
    - "\u7F51\u7EDC\u5206\u6790"
    - "\u70ED\u529B\u56FE"
    - "\u7A7A\u95F4\u63D2\u503C"
    - "\u514B\u91CC\u91D1\u63D2\u503C"
    - "\u5730\u7EDF\u8BA1\u5B66"
    - "\u7ECF\u5EA6"
    - "\u7EAC\u5EA6"
    - "\u8D64\u9053"
    - "\u672C\u521D\u5B50\u5348\u7EBF"
    - "\u65F6\u533A"
    - "\u677F\u5757\u6784\u9020"
    - "\u6C14\u5019\u5E26"
    - "\u6D0B\u6D41"
    - "\u5B63\u98CE"
    - "\u5384\u5C14\u5C3C\u8BFA"
    - "\u5580\u65AF\u7279\u5730\u8C8C"
    - "\u51B2\u79EF\u5E73\u539F"
    - "\u4E09\u89D2\u6D32"
    - "\u7B49\u6E29\u7EBF"

  # ============================================================
  # 36. \u822A\u7A7A\u822A\u5929\u672F\u8BED
  # ============================================================
  aerospace_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Aerodynamics"
    - "Thrust"
    - "Lift"
    - "Drag"
    - "Airfoil"
    - "Angle of Attack"
    - "Aspect Ratio"
    - "Mach Number"
    - "Supersonic"
    - "Hypersonic"
    - "Subsonic"
    - "Transonic"
    - "Thrust-to-weight Ratio"
    - "Orbital Mechanics"
    - "Kepler's Laws"
    - "Orbital Inclination"
    - "Perigee"
    - "Apogee"
    - "Geostationary Orbit"
    - "Low Earth Orbit"
    - "Escape Velocity"
    - "Attitude Control"
    - "Propulsion System"
    - "Turbofan Engine"
    - "Ramjet"
    - "Scramjet"
    - "Rocket Propulsion"
    - "Specific Impulse"
    - "Combustion Chamber"
    - "Nozzle"
    - "Payload"
    - "Avionics"
    - "Flight Control System"
    - "Navigation"
    - "Inertial Navigation"
    - "Space Debris"
    - "Atmospheric Reentry"
    - "Thermal Protection System"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u7A7A\u6C14\u52A8\u529B\u5B66"
    - "\u63A8\u529B"
    - "\u5347\u529B"
    - "\u963B\u529B"
    - "\u7FFC\u578B"
    - "\u8FCE\u89D2"
    - "\u5C55\u5F26\u6BD4"
    - "\u9A6C\u8D6B\u6570"
    - "\u8D85\u97F3\u901F"
    - "\u9AD8\u8D85\u97F3\u901F"
    - "\u4E9A\u97F3\u901F"
    - "\u8DE8\u97F3\u901F"
    - "\u63A8\u91CD\u6BD4"
    - "\u8F68\u9053\u529B\u5B66"
    - "\u5F00\u666E\u52D2\u5B9A\u5F8B"
    - "\u8F68\u9053\u503E\u89D2"
    - "\u8FD1\u5730\u70B9"
    - "\u8FDC\u5730\u70B9"
    - "\u540C\u6B65\u8F68\u9053"
    - "\u4F4E\u5730\u7403\u8F68\u9053"
    - "\u8131\u8F68\u901F\u5EA6"
    - "\u59FF\u6001\u63A7\u5236"
    - "\u63A8\u8FDB\u7CFB\u7EDF"
    - "\u6DA1\u8F6E\u98CE\u6247\u53D1\u52A8\u673A"
    - "\u51B2\u538B\u53D1\u52A8\u673A"
    - "\u8D85\u71C3\u51B2\u538B\u53D1\u52A8\u673A"
    - "\u706B\u7BAD\u63A8\u8FDB"
    - "\u6BD4\u51B2"
    - "\u71C3\u70E7\u5BA4"
    - "\u55B7\u7BA1"
    - "\u6709\u6548\u8F7D\u8377"
    - "\u822A\u7535\u7CFB\u7EDF"
    - "\u98DE\u63A7\u7CFB\u7EDF"
    - "\u5BFC\u822A"
    - "\u60EF\u6027\u5BFC\u822A"
    - "\u592A\u7A7A\u788E\u7247"
    - "\u518D\u5165\u5927\u6C14\u5C42"
    - "\u70ED\u9632\u62A4\u7CFB\u7EDF"

  # ============================================================
  # 37. \u519B\u4E8B/\u56FD\u9632\u672F\u8BED
  # ============================================================
  military_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Situational Awareness"
    - "Command and Control"
    - "Electronic Warfare"
    - "Radar"
    - "Sonar"
    - "Stealth Technology"
    - "Guided Weapon"
    - "Precision Strike"
    - "Ballistic Missile"
    - "Cruise Missile"
    - "Unmanned Aerial Vehicle"
    - "Swarm Tactics"
    - "Air Defense System"
    - "Airborne Early Warning"
    - "Electronic Countermeasures"
    - "Signals Intelligence"
    - "Satellite Reconnaissance"
    - "Tactical Data Link"
    - "Infrared Guidance"
    - "Laser Guidance"
    - "GPS Guidance"
    - "Armored Vehicle"
    - "Main Battle Tank"
    - "Infantry Fighting Vehicle"
    - "Artillery"
    - "Multiple Launch Rocket System"
    - "Torpedo"
    - "Naval Mine"
    - "Anti-submarine Warfare"
    - "Carrier Strike Group"
    - "Amphibious Operation"
    - "Special Operations"
    - "Urban Warfare"
    - "Asymmetric Warfare"
    - "Hybrid Warfare"
    - "Cognitive Warfare"
    - "Cyber Warfare"
    - "Psychological Warfare"
    - "Logistics"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u6001\u52BF\u611F\u77E5"
    - "\u6307\u6325\u63A7\u5236"
    - "\u7535\u5B50\u6218"
    - "\u58F0\u5450"
    - "\u9690\u8EAB\u6280\u672F"
    - "\u5236\u5BFC\u6B66\u5668"
    - "\u7CBE\u786E\u6253\u51FB"
    - "\u5F39\u9053\u5BFC\u5F39"
    - "\u5DE1\u822A\u5BFC\u5F39"
    - "\u65E0\u4EBA\u673A"
    - "\u8702\u7FA4\u6218\u672F"
    - "\u9632\u7A7A\u7CFB\u7EDF"
    - "\u9884\u8B66\u673A"
    - "\u7535\u5B50\u5BF9\u6297"
    - "\u4FE1\u53F7\u60C5\u62A5"
    - "\u536B\u661F\u4FA6\u5BDF"
    - "\u6218\u672F\u6570\u636E\u94FE"
    - "\u7EA2\u5916\u5236\u5BFC"
    - "\u6FC0\u5149\u5236\u5BFC"
    - "\u88C5\u7532\u8F66\u8F86"
    - "\u4E3B\u6218\u5766\u514B"
    - "\u6B65\u5175\u6218\u8F66"
    - "\u706B\u70AE"
    - "\u591A\u7BA1\u706B\u7BAD\u70AE"
    - "\u9C7C\u96F7"
    - "\u6C34\u96F7"
    - "\u53CD\u6F5C\u6218"
    - "\u822A\u6BCD\u6218\u6597\u7FA4"
    - "\u4E24\u6816\u4F5C\u6218"
    - "\u7279\u79CD\u4F5C\u6218"
    - "\u57CE\u5E02\u6218"
    - "\u975E\u5BF9\u79F0\u4F5C\u6218"
    - "\u6DF7\u5408\u6218\u4E89"
    - "\u8BA4\u77E5\u6218"
    - "\u7F51\u7EDC\u6218"
    - "\u5FC3\u7406\u6218"
    - "\u540E\u52E4\u8865\u7ED9"

  # ============================================================
  # 38. \u4F53\u80B2/\u8FD0\u52A8\u79D1\u5B66\u672F\u8BED
  # ============================================================
  sports_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Aerobic Exercise"
    - "Anaerobic Exercise"
    - "VO2 Max"
    - "Heart Rate Zone"
    - "Lactate Threshold"
    - "Core Strength"
    - "Flexibility"
    - "Explosive Power"
    - "Endurance"
    - "Agility"
    - "Coordination"
    - "Balance"
    - "Reaction Time"
    - "Hypertrophy"
    - "Muscular Endurance"
    - "Eccentric Contraction"
    - "Concentric Contraction"
    - "Isometric Contraction"
    - "Dynamic Stretching"
    - "Static Stretching"
    - "Sports Injury"
    - "Rehabilitation"
    - "Periodization"
    - "Supercompensation"
    - "Overtraining"
    - "Sports Nutrition"
    - "Hydration"
    - "Electrolyte"
    - "Protein Synthesis"
    - "Muscle Glycogen"
    - "Body Fat Percentage"
    - "Basal Metabolic Rate"
    - "Tactical Formation"
    - "Transition"
    - "Man-to-man Defense"
    - "Zone Defense"
    - "High Press"
    - "Counterattack"
    - "Tactical Analysis"
    - "Sports Biomechanics"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u6709\u6C27\u8FD0\u52A8"
    - "\u65E0\u6C27\u8FD0\u52A8"
    - "\u6700\u5927\u6444\u6C27\u91CF"
    - "\u5FC3\u7387\u533A\u95F4"
    - "\u4E73\u9178\u9608\u503C"
    - "\u6838\u5FC3\u529B\u91CF"
    - "\u67D4\u97E7\u6027"
    - "\u7206\u53D1\u529B"
    - "\u8010\u529B"
    - "\u654F\u6377\u6027"
    - "\u534F\u8C03\u6027"
    - "\u5E73\u8861\u80FD\u529B"
    - "\u53CD\u5E94\u65F6\u95F4"
    - "\u808C\u80A5\u5927"
    - "\u808C\u8010\u529B"
    - "\u79BB\u5FC3\u6536\u7F29"
    - "\u5411\u5FC3\u6536\u7F29"
    - "\u7B49\u957F\u6536\u7F29"
    - "\u52A8\u6001\u62C9\u4F38"
    - "\u9759\u6001\u62C9\u4F38"
    - "\u8FD0\u52A8\u635F\u4F24"
    - "\u5EB7\u590D\u8BAD\u7EC3"
    - "\u5468\u671F\u5316\u8BAD\u7EC3"
    - "\u8D85\u91CF\u6062\u590D"
    - "\u8FC7\u5EA6\u8BAD\u7EC3"
    - "\u8FD0\u52A8\u8425\u517B"
    - "\u8865\u6C34"
    - "\u7535\u89E3\u8D28"
    - "\u86CB\u767D\u8D28\u5408\u6210"
    - "\u808C\u7CD6\u539F"
    - "\u4F53\u8102\u7387"
    - "\u57FA\u7840\u4EE3\u8C22\u7387"
    - "\u6218\u672F\u5E03\u7F6E"
    - "\u653B\u9632\u8F6C\u6362"
    - "\u76EF\u4EBA\u9632\u5B88"
    - "\u533A\u57DF\u9632\u5B88"
    - "\u9AD8\u4F4D\u903C\u62A2"
    - "\u53CD\u51FB"
    - "\u6218\u672F\u5206\u6790"
    - "\u8FD0\u52A8\u751F\u7269\u529B\u5B66"

  # ============================================================
  # 39. \u519C\u4E1A/\u519C\u5B66\u672F\u8BED
  # ============================================================
  agriculture_term:
    # --- \u82F1\u6587\u672F\u8BED ---
    - "Precision Agriculture"
    - "Crop Rotation"
    - "Intercropping"
    - "Irrigation System"
    - "Drip Irrigation"
    - "Fertilization"
    - "Organic Farming"
    - "Soil Fertility"
    - "Soil pH"
    - "Composting"
    - "Pest Management"
    - "Biological Control"
    - "Pesticide"
    - "Herbicide"
    - "Fungicide"
    - "Insecticide"
    - "Genetically Modified Crop"
    - "Hybrid Breeding"
    - "Seed Treatment"
    - "Seedling Nursery"
    - "Transplanting"
    - "Harvesting"
    - "Yield"
    - "Cash Crop"
    - "Grain Crop"
    - "Greenhouse Cultivation"
    - "Hydroponics"
    - "Vertical Farming"
    - "Agricultural IoT"
    - "Drone Spraying"
    - "Remote Sensing Monitoring"
    - "Soil Moisture"
    - "Water-saving Irrigation"
    - "Agricultural Mechanization"
    - "Combine Harvester"
    - "Agricultural Traceability"
    - "Fallow"
    - "Saline-alkali Soil Improvement"
    - "Agrometeorology"
    # --- \u4E2D\u6587\u672F\u8BED ---
    - "\u7CBE\u51C6\u519C\u4E1A"
    - "\u8F6E\u4F5C"
    - "\u95F4\u4F5C\u5957\u79CD"
    - "\u704C\u6E89\u7CFB\u7EDF"
    - "\u6EF4\u704C"
    - "\u65BD\u80A5"
    - "\u6709\u673A\u519C\u4E1A"
    - "\u571F\u58E4\u80A5\u529B"
    - "\u571F\u58E4\u9178\u78B1\u5EA6"
    - "\u5806\u80A5"
    - "\u75C5\u866B\u5BB3\u9632\u6CBB"
    - "\u751F\u7269\u9632\u6CBB"
    - "\u519C\u836F"
    - "\u9664\u8349\u5242"
    - "\u6740\u83CC\u5242"
    - "\u6740\u866B\u5242"
    - "\u8F6C\u57FA\u56E0\u4F5C\u7269"
    - "\u6742\u4EA4\u80B2\u79CD"
    - "\u79CD\u5B50\u5904\u7406"
    - "\u80B2\u82D7"
    - "\u79FB\u683D"
    - "\u6536\u5272"
    - "\u4EA7\u91CF"
    - "\u7ECF\u6D4E\u4F5C\u7269"
    - "\u7CAE\u98DF\u4F5C\u7269"
    - "\u6E29\u5BA4\u79CD\u690D"
    - "\u6C34\u57F9"
    - "\u5782\u76F4\u519C\u4E1A"
    - "\u519C\u4E1A\u7269\u8054\u7F51"
    - "\u65E0\u4EBA\u673A\u690D\u4FDD"
    - "\u9065\u611F\u76D1\u6D4B"
    - "\u571F\u58E4\u5892\u60C5"
    - "\u8282\u6C34\u704C\u6E89"
    - "\u519C\u4E1A\u673A\u68B0\u5316"
    - "\u8054\u5408\u6536\u5272\u673A"
    - "\u519C\u4EA7\u54C1\u6EAF\u6E90"
    - "\u4F11\u8015"
    - "\u76D0\u78B1\u5730\u6539\u826F"
    - "\u519C\u4E1A\u6C14\u8C61"

  # ============================================================
  # 26. \u97F3\u4E50\u7ED3\u6784\u672F\u8BED\uFF08v2.4.0 \u65B0\u589E\uFF09
  # ============================================================
  music_structure:
    - "Verse"
    - "Chorus"
    - "Bridge"
    - "Outro"
    - "Intro"
    - "Hook"
    - "Pre-Chorus"
    - "Instrumental"
    - "Refrain"
    - "Interlude"
    - "Solo"
    - "Drop"
    - "Build"
    - "Beat Drop"
    - "Spoken Word"
    - "Ad lib"
    - "Vamp"
    - "Coda"
    - "Post-Chorus"
    - "\u4E3B\u6B4C"
    - "\u526F\u6B4C"
    - "\u6865\u6BB5"
    - "\u524D\u594F"
    - "\u5C3E\u594F"
    - "\u95F4\u594F"
    - "\u72EC\u594F"
    - "\u526F\u6BB5"

  # ============================================================
  # 27. \u6570\u5B57\u4EBA\u60C5\u7EEA\u6307\u4EE4\uFF08v2.4.0 \u65B0\u589E\uFF09
  # ============================================================
  avatar_emotion:
    - "happy"
    - "sad"
    - "angry"
    - "surprised"
    - "disgusted"
    - "fearful"
    - "neutral"
    - "excited"
    - "bored"
    - "confused"
    - "proud"
    - "ashamed"
    - "jealous"
    - "grateful"
    - "hopeful"
    - "anxious"
    - "calm"
    - "love"
    - "contempt"
    - "amused"
    - "\u5F00\u5FC3"
    - "\u60B2\u4F24"
    - "\u6124\u6012"
    - "\u60CA\u8BB6"
    - "\u538C\u6076"
    - "\u6050\u60E7"
    - "\u5174\u594B"
    - "\u5E73\u9759"
    - "\u7126\u8651"
    - "\u611F\u6FC0"

  # ============================================================
  # 28. \u6570\u5B57\u4EBA\u624B\u52BF\u6307\u4EE4\uFF08v2.4.0 \u65B0\u589E\uFF09
  # ============================================================
  avatar_gesture:
    - "wave"
    - "nod"
    - "shake"
    - "point"
    - "thumbs up"
    - "thumbs down"
    - "clap"
    - "snap"
    - "raise hand"
    - "cross arms"
    - "fold hands"
    - "scratch head"
    - "rub chin"
    - "stroke chin"
    - "touch face"
    - "cover mouth"
    - "wink"
    - "blink"
    - "roll eyes"
    - "raise eyebrow"
    - "frown"
    - "smile"
    - "laugh"
    - "cry"
    - "yawn"
    - "sigh"
    - "\u6447\u5934"
    - "\u70B9\u5934"
    - "\u6325\u624B"
    - "\u7728\u773C"
    - "\u5FAE\u7B11"

  # ============================================================
  # 29. TTS \u8BED\u97F3\u60C5\u7EEA\u6807\u7B7E\uFF08v2.4.0 \u65B0\u589E\uFF09
  # ============================================================
  tts_emotion:
    - "cheerful"
    - "sad"
    - "angry"
    - "fearful"
    - "disgusted"
    - "surprised"
    - "calm"
    - "gentle"
    - "serious"
    - "friendly"
    - "whisper"
    - "shouting"
    - "singing"
    - "narration"
    - "announcement"
    - "newscast"
    - "customer service"
    - "assertive"
    - "empathetic"
    - "professional"
    - "warm"
    - "bright"
    - "soft"
    - " firm"
    - "energetic"

  # ============================================================
  # 30. \u5BA4\u5185\u8BBE\u8BA1\u98CE\u683C\uFF08v2.4.0 \u65B0\u589E\uFF09
  # ============================================================
  interior_style:
    - "Shabby Chic"
    - "Industrial"
    - "Scandinavian"
    - "Mid-century"
    - "Bohemian"
    - "Minimalist"
    - "Modern"
    - "Contemporary"
    - "Traditional"
    - "Rustic"
    - "Farmhouse"
    - "Coastal"
    - "Mediterranean"
    - "Japanese"
    - "Chinese"
    - "Art Deco"
    - "Victorian"
    - "Gothic"
    - "Baroque"
    - "Rococo"
    - "\u6CE2\u897F\u7C73\u4E9A"
    - "\u5317\u6B27"
    - "\u6781\u7B80"
    - "\u73B0\u4EE3"
    - "\u590D\u53E4"
    - "\u5DE5\u4E1A\u98CE"
    - "\u65E5\u5F0F"
    - "\u65B0\u4E2D\u5F0F"

  # ============================================================
  # 31. Logo \u8BBE\u8BA1\u98CE\u683C\uFF08v2.4.0 \u65B0\u589E\uFF09
  # ============================================================
  logo_style:
    - "minimalist"
    - "modern"
    - "vintage"
    - "retro"
    - "geometric"
    - "abstract"
    - "mascot"
    - "emblem"
    - "wordmark"
    - "lettermark"
    - "combination"
    - "pictorial"
    - "dynamic"
    - "3D"
    - "gradient"
    - "flat"
    - "line art"
    - "watercolor"
    - "hand drawn"
    - "luxury"
    - "\u6781\u7B80"
    - "\u73B0\u4EE3"
    - "\u590D\u53E4"
    - "\u51E0\u4F55"
    - "\u62BD\u8C61"
    - "\u5FBD\u7AE0"
    - "\u6587\u5B57"
    - "\u5B57\u6BCD"
    - "\u7EC4\u5408"
    - "\u6241\u5E73"
    - "\u7EBF\u6761"

# ============================================================
# \u8BCD\u5178 -> CSS \u7C7B\u540D\u6620\u5C04
# ============================================================
cssClassMap:
  camera_move: "dsl-camera-word"
  light_effect: "dsl-light-word"
  emotion_word: "dsl-emotion-word"
  scene_transition: "dsl-scene-transition"
  ai_ml_term: "dsl-ai-ml-term"
  sd_image_term: "dsl-sd-image-term"
  photography_term: "dsl-photography-term"
  art_style: "dsl-art-style"
  color_term: "dsl-color-term"
  composition_term: "dsl-composition-term"
  music_audio_term: "dsl-music-audio-term"
  programming_term: "dsl-programming-term"
  data_science_term: "dsl-data-science-term"
  narrative_term: "dsl-narrative-term"
  marketing_term: "dsl-marketing-term"
  game_dev_term: "dsl-game-dev-term"
  quality_tag_ext: "dsl-quality-tag-ext"
  negative_tag: "dsl-negative-tag"
  medical_term: "dsl-medical-term"
  legal_term: "dsl-legal-term"
  finance_term: "dsl-finance-term"
  architecture_term: "dsl-architecture-term"
  fashion_term: "dsl-fashion-term"
  food_term: "dsl-food-term"
  physics_term: "dsl-physics-term"
  ui_ux_term: "dsl-ui-ux-term"
  cg_term: "dsl-cg-term"
  vfx_term: "dsl-vfx-term"
  motion_term: "dsl-motion-term"
  ecommerce_term: "dsl-ecommerce-term"
  education_term: "dsl-education-term"
  psychology_term: "dsl-psychology-term"
  chemistry_term: "dsl-chemistry-term"
  biology_term: "dsl-biology-term"
  geography_term: "dsl-geography-term"
  aerospace_term: "dsl-aerospace-term"
  military_term: "dsl-military-term"
  sports_term: "dsl-sports-term"
  agriculture_term: "dsl-agriculture-term"
  # v2.3.0 \u5206\u955C\u811A\u672C\u6269\u5C55\u5206\u7C7B
  shot_size: "dsl-lexicon-shot-size"
  camera_fixed: "dsl-lexicon-camera-fixed"
  blocking: "dsl-lexicon-blocking"
  # v2.3.1 \u65B0\u589E\u5206\u7C7B
  focal_length: "dsl-lexicon-focal-length"
  performance: "dsl-lexicon-performance"

  # v2.4.0 \u65B0\u589E\u8BCD\u5178\u6620\u5C04
  music_structure: "dsl-lexicon-music-structure"
  avatar_emotion: "dsl-lexicon-avatar-emotion"
  avatar_gesture: "dsl-lexicon-avatar-gesture"
  tts_emotion: "dsl-lexicon-tts-emotion"
  interior_style: "dsl-lexicon-interior-style"
  logo_style: "dsl-lexicon-logo-style"
`,lo=`# \u52A8\u6001\u989C\u8272\u914D\u7F6E \u2014 \u989C\u8272\u5B8C\u5168\u7531 YAML \u9A71\u52A8\uFF0C\u652F\u6301\u65E0\u9650\u6269\u5C55
# \u5DE5\u4F5C\u539F\u7406\uFF1Acolors \u533A\u5B9A\u4E49\u4EE4\u724C \u2192 \u63D2\u4EF6\u751F\u6210 CSS \u53D8\u91CF \u2192 styleRules \u533A\u5F15\u7528\u4EE4\u724C\u540D
#
# \u4FEE\u6539\u989C\u8272\u6B65\u9AA4\uFF1A
# 1. \u5728 colors \u533A\u627E\u5230\u5BF9\u5E94\u4EE4\u724C
# 2. \u4FEE\u6539 light/dark \u503C
# 3. \u4FDD\u5B58\u540E\u63D2\u4EF6\u81EA\u52A8\u91CD\u65B0\u52A0\u8F7D\uFF08\u6216\u91CD\u542F Obsidian\uFF09
#
# \u65B0\u589E\u989C\u8272\u6B65\u9AA4\uFF1A
# 1. \u5728 colors \u533A\u6DFB\u52A0\u65B0\u4EE4\u724C\uFF08\u5982 mycolor: { light: "#ff0000", dark: "#ff5555" }\uFF09
# 2. \u5728 styleRules \u4E2D\u7528\u4EE4\u724C\u540D\u5F15\u7528\uFF08\u5982 color: "mycolor"\uFF09
# 3. \u652F\u6301 .soft \u548C .border \u4FEE\u9970\uFF08\u5982 background: "mycolor.soft"\uFF09

# ============================================================
# \u989C\u8272\u5B9A\u4E49\u533A \u2014 \u5B9A\u4E49\u6240\u6709\u53EF\u7528\u7684\u989C\u8272\u4EE4\u724C
# \u6BCF\u4E2A\u4EE4\u724C\u81EA\u52A8\u751F\u6210 3 \u4E2A CSS \u53D8\u91CF\uFF1A
#   --dsl-{name}        \u2192 \u4E3B\u8272
#   --dsl-{name}-soft   \u2192 \u534A\u900F\u660E\u80CC\u666F\uFF08\u81EA\u52A8\u8BA1\u7B97 6% \u900F\u660E\u5EA6\uFF09
#   --dsl-{name}-border \u2192 \u8FB9\u6846\u8272\uFF08\u81EA\u52A8\u8BA1\u7B97 15% \u900F\u660E\u5EA6\uFF09
# ============================================================
colors:
  # ---- \u57FA\u7840 10 \u4EE4\u724C ----
  danger:
    light: "#ef4444"
    dark: "#f87171"
    name: { zh: "\u7EA2\u8272\uFF08\u6392\u9664/\u7981\u6B62\uFF09", en: "Red (Exclude)" }
    desc: { zh: "\u6392\u9664\u89C4\u5219\u3001SD \u8D1F\u9762\u63D0\u793A\u8BCD\u5934", en: "Exclusion rules, SD negative" }
  success:
    light: "#10b981"
    dark: "#34d399"
    name: { zh: "\u7EFF\u8272\uFF08\u6210\u529F/\u53F0\u8BCD\uFF09", en: "Green (Success)" }
    desc: { zh: "\u53F0\u8BCD\u5185\u5BB9\u3001\u8D28\u91CF\u6807\u7B7E", en: "Dialogue, quality tags" }
  warning:
    light: "#d97706"
    dark: "#f59e0b"
    name: { zh: "\u9EC4\u8272\uFF08\u8B66\u544A/\u53C2\u6570\uFF09", en: "Yellow (Warning)" }
    desc: { zh: "\u6280\u672F\u53C2\u6570\u3001\u53D8\u91CF\u3001\u6743\u91CD\u6807\u8BB0", en: "Tech params, variables, weights" }
  info:
    light: "#3b82f6"
    dark: "#60a5fa"
    name: { zh: "\u84DD\u8272\uFF08\u4FE1\u606F/\u6807\u7B7E\uFF09", en: "Blue (Info)" }
    desc: { zh: "\u5B57\u6BB5\u6807\u7B7E\u3001\u62EC\u53F7\u5F3A\u8C03", en: "Field labels, bracket emphasis" }
  purple:
    light: "#8b5cf6"
    dark: "#a78bfa"
    name: { zh: "\u7D2B\u8272\uFF08\u533A\u6BB5/\u6307\u4EE4\uFF09", en: "Purple (Section)" }
    desc: { zh: "\u533A\u6BB5\u6807\u8BB0\u3001\u89D2\u8272\u6807\u7B7E\u3001\u6307\u4EE4\u6807\u8BB0", en: "Section markers, role tags" }
  cyan:
    light: "#0891b2"
    dark: "#22d3ee"
    name: { zh: "\u9752\u8272\uFF08\u5206\u955C/\u8FD0\u955C\uFF09", en: "Cyan (Shot)" }
    desc: { zh: "\u5206\u955C\u6807\u9898\u3001\u955C\u5934\u8FD0\u52A8\u672F\u8BED", en: "Shot headers, camera moves" }
  pink:
    light: "#db2777"
    dark: "#f472b6"
    name: { zh: "\u7C89\u8272\uFF08\u97F3\u9891\uFF09", en: "Pink (Audio)" }
    desc: { zh: "\u97F3\u9891\u5F15\u7528\u3001\u97F3\u8272\u6807\u7B7E", en: "Audio references, tone tags" }
  amber:
    light: "#b45309"
    dark: "#d97706"
    name: { zh: "\u68D5\u8272\uFF08\u8D44\u6E90\u5F15\u7528\uFF09", en: "Amber (Asset)" }
    desc: { zh: "\u8D44\u6E90\u5F15\u7528\u3001Lora \u6A21\u578B\u5F15\u7528", en: "Asset refs, Lora models" }
  orange:
    light: "#ea580c"
    dark: "#fb923c"
    name: { zh: "\u6A59\u8272\uFF08\u5149\u6548\uFF09", en: "Orange (Light)" }
    desc: { zh: "\u5149\u6548\u672F\u8BED", en: "Light effect terms" }
  paren:
    light: "#94a3b8"
    dark: "#94a3b8"
    name: { zh: "\u7070\u8272\uFF08\u62EC\u53F7\u6CE8\u91CA\uFF09", en: "Gray (Parenthetical)" }
    desc: { zh: "\u62EC\u53F7\u6CE8\u91CA\u3001\u5F31\u5316\u6807\u8BB0", en: "Parenthetical notes, weak markers" }

  # ---- \u6269\u5C55\u4EE4\u724C ----
  indigo:
    light: "#6366f1"
    dark: "#818cf8"
    name: { zh: "\u975B\u84DD\uFF08Chat Token\uFF09", en: "Indigo (Chat Token)" }
    desc: { zh: "Chat Template Token", en: "Chat tokens, special markers" }
  emerald:
    light: "#059669"
    dark: "#10b981"
    name: { zh: "\u7FE0\u7EFF\uFF08Mermaid/\u547D\u4EE4\uFF09", en: "Emerald (Mermaid)" }
    desc: { zh: "Mermaid \u56FE\u8868\u3001\u547D\u4EE4\u884C\u6307\u4EE4", en: "Mermaid diagrams, CLI commands" }
  slate:
    light: "#64748b"
    dark: "#94a3b8"
    name: { zh: "\u77F3\u677F\u7070\uFF08\u5F15\u7528/\u6CE8\u91CA\uFF09", en: "Slate (Quote)" }
    desc: { zh: "\u5D4C\u5957\u5F15\u7528\u3001Frontmatter", en: "Nested quotes, frontmatter" }
  darkslate:
    light: "#1e293b"
    dark: "#e2e8f0"
    name: { zh: "\u6DF1\u77F3\u677F\uFF08\u6807\u9898\uFF09", en: "Dark Slate (Heading)" }
    desc: { zh: "Markdown \u6807\u9898", en: "Markdown headings" }
  yellow:
    light: "#facc15"
    dark: "#fde047"
    name: { zh: "\u9EC4\u8272\uFF08\u9AD8\u4EAE\uFF09", en: "Yellow (Highlight)" }
    desc: { zh: "\u9AD8\u4EAE\u6807\u8BB0", en: "Highlight markers" }

  music:
    light: "#c026d3"
    dark: "#e879f9"
    name: { zh: "\u54C1\u7EA2\uFF08\u97F3\u4E50\u751F\u6210\uFF09", en: "Music (Magenta)" }
    desc: { zh: "Suno \u6B4C\u8BCD\u6BB5\u843D\u3001\u97F3\u4E50\u5143\u6807\u7B7E", en: "Suno lyrics, music meta tags" }

# ============================================================
# \u6837\u5F0F\u89C4\u5219\u533A \u2014 \u6BCF\u6761\u89C4\u5219\u5F15\u7528\u989C\u8272\u4EE4\u724C\u540D
# \u5F15\u7528\u683C\u5F0F\uFF1A
#   "danger"         \u2192 var(--dsl-danger)
#   "danger.soft"    \u2192 var(--dsl-danger-soft)\uFF08\u534A\u900F\u660E\u80CC\u666F\uFF09
#   "danger.border"  \u2192 var(--dsl-danger-border)\uFF08\u8FB9\u6846\u8272\uFF09
#   "1px solid danger.border" \u2192 1px solid var(--dsl-danger-border)
# ============================================================
styleRules:
  # ============================================================
  # \u4E00\u3001\u57FA\u7840\u7ED3\u6784
  # ============================================================
  dsl-block-wrapper:
    color: "purple"
    fontWeight: "bold"
    fontSize: "1.05em"
    letterSpacing: "0.08em"
    backgroundImage: "linear-gradient(135deg, purple.soft, indigo.soft)"
    border: "1px solid purple.border"
    borderRadius: "8px"
    padding: "1px 12px"
    # \u60AC\u505C\u8272\u76F8\u504F\u79FB\uFF1Ahover \u65F6\u6574\u5757\u65CB\u8F6C 30\xB0 \u8272\u76F8\uFF08\u9879 9\uFF09
    hover:
      filter: "hue-rotate(30deg) saturate(1.15)"


  dsl-shot-header:
    fontWeight: "bold"
    # \u5F69\u8679\u6D41\u52A8\uFF1A\u591A\u8272\u6E10\u53D8\u6587\u5B57 + \u80CC\u666F\u6EDA\u52A8\u52A8\u753B\uFF08pc-rainbow-flow keyframes \u7531\u5F15\u64CE\u6309\u9700\u6CE8\u5165\uFF09
    backgroundImage: "linear-gradient(90deg, cyan, info, purple, pink, cyan)"
    backgroundSize: "200% 100%"
    backgroundClip: "text"
    animation: "pc-rainbow-flow 6s linear infinite"
    textShadow: "cyan.glow"

  dsl-asset:
    color: "amber"
    fontWeight: "600"
    before:
      content: '"\u25B8 "'
      color: "amber"
      fontSize: "0.85em"
    after:
      content: "attr(data-ref)"
      color: "amber"
      fontSize: "0.65em"
      fontWeight: "600"
      verticalAlign: "super"
      marginLeft: "1px"
      opacity: "0.8"

  dsl-asset-bracket:
    color: "amber"
    fontWeight: "500"

  dsl-param-key:
    color: "info"
    fontWeight: "600"
    borderBottom: "2px solid info.border"

  dsl-dialogue:
    color: "success"
    fontStyle: "italic"
    background: "success.soft"
    borderRadius: "4px"
    padding: "0 2px"
    hover:
      background: "success.border"

  # \u4E2D\u6587\u5F15\u53F7\u300C\u300D\u300E\u300F\u5F31\u5316\uFF08v2.4.1 \u65B0\u589E\uFF0C\u7A81\u51FA\u5F15\u53F7\u5185\u53F0\u8BCD\uFF09
  dsl-dialogue-quote:
    color: "paren"
    opacity: "0.60"

  dsl-constraint:
    color: "danger"
    fontWeight: "600"
    textDecoration: "line-through"
    background: "danger.soft"
    borderRadius: "4px"
    padding: "0 2px"

  dsl-tech-param:
    color: "warning"
    fontWeight: "600"
    borderBottom: "2px solid warning.border"

  dsl-parenthetical:
    color: "paren"
    fontStyle: "italic"
    opacity: "0.70"

  dsl-variable:
    color: "warning"
    fontWeight: "600"
    fontFamily: "monospace"
    textDecoration: "underline wavy warning"

  dsl-role-tag:
    color: "purple"
    fontWeight: "bold"
    fontFamily: "monospace"
    fontSize: "0.92em"
    opacity: "0.85"
    letterSpacing: "0.05em"

  dsl-instruction:
    color: "var(--text-on-accent, #ffffff)"
    background: "purple"
    fontWeight: "bold"
    fontFamily: "monospace"
    borderRadius: "4px"
    padding: "0 3px"


  # ============================================================
  # \u4E8C\u3001SD/ComfyUI \u6269\u5C55
  # ============================================================
  dsl-emphasis-weight:
    color: "warning"
    fontWeight: "600"
    fontFamily: "monospace"
    background: "warning.soft"
    borderRadius: "4px"
    padding: "0 2px"
    hover:
      background: "warning.border"

  dsl-lora-ref:
    color: "amber"
    fontWeight: "bold"
    background: "amber.soft"
    borderRadius: "4px"
    padding: "0 2px"
    hover:
      background: "amber.border"

  dsl-bracket-strong:
    color: "info"
    fontWeight: "bold"

  dsl-bracket-weak:
    textStroke: "1px paren"
    textFillColor: "transparent"
    opacity: "0.75"

  dsl-quality-tag:
    color: "success"
    fontWeight: "600"
    backgroundImage: "linear-gradient(to top, success.soft 45%, transparent 45%)"

  dsl-sd-negative-header:
    color: "danger"
    fontWeight: "bold"
    textShadow: "danger.glow"
    backgroundImage: "linear-gradient(to right, danger.soft, transparent)"
    borderLeft: "3px solid danger"
    paddingLeft: "12px"
    borderRadius: "0 4px 4px 0"

  # SD \u53C2\u6570\u6807\u8BB0\uFF1A--ar 16:9 --v 6
  dsl-sd-parameter:
    color: "purple"
    fontWeight: "600"
    fontFamily: "monospace"
    background: "purple.soft"
    borderRadius: "3px"
    padding: "0 3px"

  # \u97F3\u9891\u76F8\u5173
  dsl-audio-ref:
    color: "pink"
    fontWeight: "600"

  dsl-audio-tone:
    color: "pink"
    fontWeight: "500"
    fontStyle: "italic"

  dsl-audio-sfx:
    color: "pink"
    fontWeight: "600"

  # ============================================================
  # \u4E09\u3001AI \u5DE5\u5177\u7ED3\u6784\u5316\u8BED\u6CD5\uFF082025-2026 \u8D8B\u52BF\uFF0C\u7D2B\u84DD\u79D1\u6280\u7CFB\uFF09
  # ============================================================
  # ANTML \u547D\u540D\u7A7A\u95F4\u6807\u7B7E\uFF08\u6700\u9AD8\u4F18\u5148\u7EA7\u5F3A\u8C03\uFF09
  dsl-antml-tag:
    color: "purple"
    fontWeight: "bold"
    background: "purple.soft"
    borderRadius: "4px"
    padding: "0 2px"


  dsl-function-results:
    color: "purple"
    fontWeight: "600"
    background: "purple.soft"
    borderRadius: "4px"

  dsl-xml-block:
    color: "purple"
    fontWeight: "600"

  dsl-chat-token:
    color: "indigo"
    fontWeight: "bold"

  dsl-llama-token:
    color: "indigo"
    fontWeight: "bold"

  dsl-gemma-token:
    color: "info"
    fontWeight: "bold"

  dsl-llama-sys:
    color: "purple"
    fontWeight: "bold"

  dsl-workflow-sep:
    color: "paren"
    fontWeight: "600"
    fontStyle: "italic"

  dsl-json-schema-key:
    color: "warning"
    fontWeight: "600"

  dsl-jinja-control:
    color: "purple"
    fontWeight: "600"
    background: "purple.soft"
    borderRadius: "4px"
    padding: "0 2px"

  dsl-workflow-node:
    color: "cyan"
    fontWeight: "600"

  # ============================================================
  # \u56DB\u3001Markdown \u6269\u5C55\u8BED\u6CD5
  # ============================================================
  dsl-md-mermaid:
    color: "emerald"
    fontWeight: "bold"
    background: "emerald.soft"
    borderRadius: "4px"

  dsl-md-nested-quote:
    color: "slate"
    fontStyle: "italic"

  dsl-md-anchor-link:
    color: "info"
    fontWeight: "500"
    textDecoration: "underline dotted"

  dsl-md-callout-meta:
    color: "warning"
    fontWeight: "bold"
    background: "warning.soft"
    borderRadius: "4px"
    padding: "0 4px"

  dsl-md-admonition:
    color: "warning"
    fontWeight: "bold"
    background: "warning.soft"
    borderRadius: "4px"

  # ============================================================
  # \u56DB-B\u3001\u57FA\u7840 Markdown \u8BED\u6CD5
  # ============================================================
  # Frontmatter \u5206\u9694\u7B26
  dsl-md-frontmatter:
    color: "slate"
    fontWeight: "bold"
    opacity: "0.60"

  # \u6807\u9898\u6807\u8BB0
  dsl-md-heading:
    color: "darkslate"
    fontWeight: "bold"


  # \u7C97\u4F53
  dsl-md-bold:
    fontWeight: "bold"

  # \u659C\u4F53
  dsl-md-italic:
    fontStyle: "italic"

  # \u5220\u9664\u7EBF
  dsl-md-strikethrough:
    color: "paren"
    textDecoration: "line-through"

  # \u4EE3\u7801\u5757\u56F4\u680F
  dsl-md-code-fence:
    color: "slate"
    fontWeight: "600"
    fontFamily: "monospace"
    background: "slate.soft"
    borderRadius: "4px"

  # \u884C\u5185\u4EE3\u7801
  dsl-md-inline-code:
    color: "pink"
    fontFamily: "monospace"
    background: "pink.soft"
    borderRadius: "3px"
    padding: "0 3px"

  # \u94FE\u63A5
  dsl-md-link:
    color: "info"
    textDecoration: "underline"

  # \u56FE\u7247
  dsl-md-image:
    color: "cyan"
    fontWeight: "500"

  # Wiki \u94FE\u63A5
  dsl-md-wiki-link:
    color: "info"
    fontWeight: "500"

  # \u6807\u7B7E #tag
  dsl-md-tag:
    color: "purple"
    fontWeight: "500"

  # \u4EFB\u52A1\u5217\u8868\u6807\u8BB0
  dsl-md-task:
    color: "emerald"
    fontWeight: "bold"

  # \u811A\u6CE8\u5F15\u7528
  dsl-md-footnote:
    color: "indigo"
    fontWeight: "500"
    fontSize: "0.85em"
    verticalAlign: "super"

  # \u811A\u6CE8\u5B9A\u4E49
  dsl-md-footnote-def:
    color: "indigo"
    fontWeight: "600"

  # \u6570\u5B66\u516C\u5F0F\u5757
  dsl-md-math:
    color: "purple"
    fontWeight: "bold"

  # \u884C\u5185\u6570\u5B66\u516C\u5F0F
  dsl-md-math-inline:
    color: "purple"

  # \u5F15\u7528\u5757
  dsl-md-blockquote:
    color: "slate"
    fontStyle: "italic"
    borderLeft: "3px solid slate.border"
    paddingLeft: "12px"

  # Callout \u5757
  dsl-md-callout:
    color: "warning"
    fontWeight: "bold"
    backgroundImage: "linear-gradient(135deg, warning.soft, amber.soft)"
    borderRadius: "4px"
    padding: "0 4px"


  # \u6C34\u5E73\u5206\u5272\u7EBF
  dsl-md-hr:
    color: "paren"
    opacity: "0.50"

  # \u8868\u683C\u5206\u9694\u884C
  dsl-md-table-sep:
    color: "paren"
    fontFamily: "monospace"
    editor:
      background: "purple.soft"
      fontWeight: "600"

  # \u8868\u683C\u884C
  dsl-md-table-row:
    color: "slate"
    fontFamily: "monospace"
    editor:
      background: "purple.soft"

  # \u5217\u8868\u9879
  dsl-md-list-item:
    color: "slate"
    fontWeight: "600"

  # \u5B9A\u4E49\u5217\u8868
  dsl-md-definition:
    color: "cyan"
    fontWeight: "500"

  # \u5757\u5F15\u7528 ID
  dsl-md-block-id:
    color: "paren"
    fontFamily: "monospace"
    fontSize: "0.85em"

  # Obsidian \u6CE8\u91CA
  dsl-md-comment:
    color: "paren"
    fontStyle: "italic"
    opacity: "0.50"
    fontSize: "0.92em"
    backgroundImage: "repeating-linear-gradient(45deg, paren.soft 0 2px, transparent 2px 6px)"

  # Emoji \u77ED\u7801
  dsl-md-emoji:
    color: "emerald"

  # \u9AD8\u4EAE\u6807\u8BB0
  dsl-md-highlight:
    background: "yellow.soft"
    borderRadius: "3px"
    padding: "0 2px"

  # YAML/JSON \u952E\u503C
  dsl-md-yaml-key:
    color: "warning"
    fontWeight: "600"

  # ============================================================
  # \u4E94\u3001\u64CD\u4F5C\u6863\u6848\u6269\u5C55\u6807\u8BB0
  # ============================================================
  dsl-email:
    color: "info"
    fontWeight: "500"

  dsl-ip-address:
    color: "cyan"
    fontWeight: "500"
    fontFamily: "monospace"

  dsl-mac-address:
    color: "cyan"
    fontWeight: "500"
    fontFamily: "monospace"

  dsl-uuid:
    color: "slate"
    fontWeight: "500"
    fontFamily: "monospace"

  dsl-hex-color:
    color: "warning"
    fontWeight: "600"
    fontFamily: "monospace"

  dsl-css-color-func:
    color: "warning"
    fontWeight: "500"
    fontFamily: "monospace"

  dsl-geo-coord:
    color: "cyan"
    fontWeight: "500"
    fontFamily: "monospace"

  dsl-currency:
    color: "emerald"
    fontWeight: "600"

  dsl-percentage:
    color: "warning"
    fontWeight: "600"

  dsl-measurement:
    color: "warning"
    fontWeight: "500"

  # ============================================================
  # \u4E94-B\u3001\u57FA\u7840\u64CD\u4F5C\u6863\u6848\u6807\u8BB0
  # ============================================================
  # \u65F6\u95F4\u6233
  dsl-timestamp:
    color: "cyan"
    fontWeight: "500"
    fontFamily: "monospace"

  # \u7248\u672C\u53F7
  dsl-version-number:
    color: "purple"
    fontWeight: "600"
    fontFamily: "monospace"

  # URL \u94FE\u63A5
  dsl-url-link:
    color: "info"
    textDecoration: "underline"

  # \u6587\u4EF6\u8DEF\u5F84
  dsl-file-path:
    color: "slate"
    fontFamily: "monospace"
    background: "slate.soft"
    borderRadius: "3px"
    padding: "0 2px"

  # \u547D\u4EE4\u884C\u6307\u4EE4
  dsl-cli-command:
    color: "emerald"
    fontWeight: "600"
    fontFamily: "monospace"
    background: "emerald.soft"
    borderRadius: "4px"
    padding: "0 4px"
    boxShadow: "0 1px 4px emerald.soft"

  # \u952E\u76D8\u5FEB\u6377\u952E
  dsl-kbd-tag:
    color: "slate"
    fontWeight: "600"
    fontFamily: "monospace"
    background: "slate.soft"
    borderRadius: "4px"
    padding: "1px 6px"
    border: "1px solid slate.border"
    boxShadow: "0 2px 4px slate.soft"

  # HTML \u6807\u7B7E
  dsl-html-tag:
    color: "purple"
    fontWeight: "500"
    fontFamily: "monospace"

  # \u952E\u503C\u5206\u9694\u7B26
  dsl-key-value:
    color: "warning"
    fontWeight: "500"

  # \u5F15\u7528\u6807\u8BB0
  dsl-reference-marker:
    color: "slate"
    fontWeight: "600"

  # \u5206\u9694\u6807\u8BB0
  dsl-separator:
    color: "paren"
    opacity: "0.50"

  # ============================================================
  # \u516D\u3001\u8BCD\u5178\u7CBE\u7EC6\u5316\u7740\u8272\uFF08\u6309\u884C\u4E1A\u8272\u76F8\u5206\u533A\uFF09
  # ============================================================
  # \u955C\u5934\u8FD0\u52A8 - \u9752\u8272\u7CFB
  dsl-camera-word:
    color: "cyan"
    fontWeight: "600"

  # \u5149\u5F71 - \u6A59\u8272\u7CFB
  dsl-light-word:
    color: "orange"
    fontWeight: "500"

  # \u60C5\u7EEA - \u7D2B\u8272\u7CFB
  dsl-emotion-word:
    color: "purple"
    fontStyle: "italic"

  # \u8F6C\u573A - \u7D2B\u8272\u7CFB
  dsl-scene-transition:
    color: "purple"
    fontWeight: "600"
    background: "purple.soft"
    borderRadius: "4px"
    padding: "0 2px"

  # AI/\u673A\u5668\u5B66\u4E60 - \u7D2B\u8272\u79D1\u6280\u7CFB
  dsl-ai-ml-term:
    color: "purple"
    fontWeight: "600"

  # SD/\u56FE\u50CF\u751F\u6210 - \u9752\u8272\u7CFB
  dsl-sd-image-term:
    color: "cyan"
    fontWeight: "600"

  # \u6444\u5F71 - \u84DD\u8272\u7CFB
  dsl-photography-term:
    color: "info"
    fontWeight: "600"

  # \u827A\u672F\u98CE\u683C - \u7C89\u8272\u7CFB
  dsl-art-style:
    color: "pink"
    fontWeight: "500"
    fontStyle: "italic"

  # \u8272\u5F69\u7406\u8BBA - \u6A59\u8272\u7CFB
  dsl-color-term:
    color: "orange"
    fontWeight: "500"

  # \u6784\u56FE - \u975B\u84DD\u7CFB
  dsl-composition-term:
    color: "indigo"
    fontWeight: "500"

  # \u97F3\u4E50\u97F3\u9891 - \u7D2B\u7EA2\u7CFB
  dsl-music-audio-term:
    color: "music"
    fontWeight: "500"

  # \u7F16\u7A0B - \u7EFF\u8272\u7CFB
  dsl-programming-term:
    color: "emerald"
    fontWeight: "600"
    fontFamily: "monospace"

  # \u6570\u636E\u79D1\u5B66 - \u9752\u7EFF\u7CFB
  dsl-data-science-term:
    color: "cyan"
    fontWeight: "600"

  # \u53D9\u4E8B\u5199\u4F5C - \u7425\u73C0\u7CFB
  dsl-narrative-term:
    color: "warning"
    fontWeight: "500"
    fontStyle: "italic"

  # \u8425\u9500 - \u7EA2\u8272\u7CFB
  dsl-marketing-term:
    color: "danger"
    fontWeight: "600"

  # \u6E38\u620F\u5F00\u53D1 - \u7D2B\u8272\u7CFB
  dsl-game-dev-term:
    color: "purple"
    fontWeight: "600"

  # \u8D28\u91CF\u6807\u7B7E - \u7EFF\u8272\u7CFB
  dsl-quality-tag-ext:
    color: "success"
    fontWeight: "600"

  # \u8D1F\u9762\u6807\u7B7E - \u7EA2\u8272\u7CFB
  dsl-negative-tag:
    color: "danger"
    fontWeight: "500"
    opacity: "0.85"

  # \u533B\u5B66 - \u73AB\u7EA2\u7CFB
  dsl-medical-term:
    color: "danger"
    fontWeight: "500"

  # \u6CD5\u5F8B - \u975B\u84DD\u7CFB
  dsl-legal-term:
    color: "indigo"
    fontWeight: "600"

  # \u91D1\u878D - \u7FE0\u7EFF\u7CFB
  dsl-finance-term:
    color: "emerald"
    fontWeight: "600"

  # \u5EFA\u7B51 - \u77F3\u677F\u7070\u7CFB
  dsl-architecture-term:
    color: "slate"
    fontWeight: "500"

  # \u65F6\u5C1A - \u7C89\u7D2B\u7CFB
  dsl-fashion-term:
    color: "music"
    fontWeight: "500"
    fontStyle: "italic"

  # \u7F8E\u98DF\u70F9\u996A - \u6A59\u7EA2\u7CFB
  dsl-food-term:
    color: "orange"
    fontWeight: "500"

  # \u7269\u7406\u79D1\u5B66 - \u975B\u7D2B\u7CFB
  dsl-physics-term:
    color: "indigo"
    fontWeight: "500"

  # ============================================================
  # \u4E03\u3001\u6269\u5C55\u884C\u4E1A\u8BCD\u5178\uFF08\u65B0\u589E 14 \u4E2A\u9886\u57DF\uFF09
  # ============================================================
  # UI/UX \u8BBE\u8BA1 - \u84DD\u8272\u7CFB
  dsl-ui-ux-term:
    color: "info"
    fontWeight: "600"

  # 3D\u5EFA\u6A21/CG - \u9752\u8272\u7CFB
  dsl-cg-term:
    color: "cyan"
    fontWeight: "600"

  # \u5F71\u89C6\u540E\u671F/VFX - \u7D2B\u8272\u7CFB
  dsl-vfx-term:
    color: "purple"
    fontWeight: "600"

  # \u52A8\u6548\u8BBE\u8BA1 - \u7C89\u8272\u7CFB
  dsl-motion-term:
    color: "pink"
    fontWeight: "500"

  # \u7535\u5546\u8FD0\u8425 - \u6A59\u8272\u7CFB
  dsl-ecommerce-term:
    color: "orange"
    fontWeight: "600"

  # \u6559\u80B2\u5B66 - \u84DD\u7EFF\u7CFB
  dsl-education-term:
    color: "cyan"
    fontWeight: "500"

  # \u5FC3\u7406\u5B66 - \u7D2B\u8272\u7CFB
  dsl-psychology-term:
    color: "purple"
    fontWeight: "500"
    fontStyle: "italic"

  # \u5316\u5B66 - \u7EFF\u8272\u7CFB
  dsl-chemistry-term:
    color: "success"
    fontWeight: "500"

  # \u751F\u7269\u5B66 - \u7FE0\u7EFF\u7CFB
  dsl-biology-term:
    color: "emerald"
    fontWeight: "500"

  # \u5730\u7406/GIS - \u9EC4\u7EFF\u7CFB
  dsl-geography-term:
    color: "success"
    fontWeight: "500"

  # \u822A\u7A7A\u822A\u5929 - \u5929\u84DD\u7CFB
  dsl-aerospace-term:
    color: "cyan"
    fontWeight: "600"

  # \u519B\u4E8B - \u6697\u7070\u7CFB
  dsl-military-term:
    color: "slate"
    fontWeight: "600"

  # \u4F53\u80B2/\u8FD0\u52A8\u79D1\u5B66 - \u6A59\u8272\u7CFB
  dsl-sports-term:
    color: "orange"
    fontWeight: "500"

  # \u519C\u4E1A - \u8349\u7EFF\u7CFB
  dsl-agriculture-term:
    color: "success"
    fontWeight: "500"

  # ============================================================
  # \u516B\u3001\u5206\u955C\u811A\u672C\u6269\u5C55\u6837\u5F0F\uFF08v2.3.0 \u65B0\u589E\uFF09
  # ============================================================
  dsl-segment-header:
    color: "danger"
    fontWeight: "bold"
    fontSize: "1.1em"
    textShadow: "danger.glow"
  dsl-module-header:
    color: "cyan"
    fontWeight: "bold"
  dsl-dialogue-speaker:
    color: "info"
    fontWeight: "bold"
  dsl-character-def:
    color: "purple"
    fontWeight: "bold"
  dsl-book-title:
    color: "purple"
    fontStyle: "italic"
  dsl-cn-chapter:
    color: "darkslate"
    fontWeight: "bold"
    fontSize: "1.15em"

  dsl-time-range:
    color: "warning"
  dsl-section-note:
    color: "slate"
    fontWeight: "bold"
  dsl-lexicon-blocking:
    color: "indigo"
  dsl-lexicon-camera-fixed:
    color: "cyan"
  dsl-lexicon-shot-size:
    color: "cyan"

  # ============================================================
  # \u4E5D\u3001\u5206\u955C\u811A\u672C\u6269\u5C55\u6837\u5F0F\uFF08v2.3.1 \u65B0\u589E\uFF09
  # ============================================================
  dsl-shot-id:
    color: "cyan"
    fontWeight: "bold"
  dsl-lexicon-focal-length:
    color: "orange"
  dsl-lexicon-performance:
    color: "pink"

  # ============================================================
  # \u5341\u3001AI \u591A\u6A21\u6001\u6269\u5C55\u6837\u5F0F\uFF08v2.4.0 \u65B0\u589E\uFF09
  # ============================================================
  # SSML \u8BED\u97F3\u5408\u6210\u6807\u7B7E
  dsl-ssml-tag:
    color: "orange"
    fontWeight: "bold"
    background: "orange.soft"
    borderRadius: "4px"
    padding: "0 2px"

  # \u6B4C\u8BCD\u6BB5\u843D\u6807\u7B7E [Verse] [Chorus]
  dsl-lyric-section:
    color: "music"
    fontWeight: "bold"
    background: "music.soft"
    borderRadius: "4px"
    padding: "0 6px"

  # Suno \u98CE\u683C\u5143\u6807\u7B7E [style: pop]
  dsl-suno-meta:
    color: "music"
    fontWeight: "600"
    background: "music.soft"
    borderRadius: "3px"
    padding: "0 3px"

  # \u6570\u5B57\u4EBA\u6307\u4EE4\u6807\u7B7E [emotion]happy[/emotion]
  dsl-avatar-directive:
    color: "pink"
    fontWeight: "bold"
    background: "pink.soft"
    borderRadius: "4px"
    padding: "0 2px"

  # Excel Copilot \u51FD\u6570 =COPILOT(...)
  dsl-copilot-formula:
    color: "emerald"
    fontWeight: "bold"
    fontFamily: "monospace"
    background: "emerald.soft"
    borderRadius: "4px"
    padding: "0 4px"

  # ReAct Agent \u6807\u8BB0 Thought: / Action:
  dsl-react-marker:
    color: "purple"
    fontWeight: "bold"
    background: "purple.soft"
    borderRadius: "4px"
    padding: "0 6px"
    boxShadow: "0 2px 6px purple.soft"

  # CoT \u89E6\u53D1\u77ED\u8BED
  dsl-cot-trigger:
    color: "purple"
    fontWeight: "600"
    fontStyle: "italic"
    background: "purple.soft"
    borderRadius: "4px"
    padding: "0 2px"

  # AI \u6A21\u578B\u6807\u8BC6\u7B26 gpt-4\u3001claude-3
  dsl-model-identifier:
    color: "purple"
    fontWeight: "600"
    fontFamily: "monospace"

  # ComfyUI \u8282\u70B9\u8C03\u7528 KSampler(...)
  dsl-comfyui-node:
    color: "cyan"
    fontWeight: "bold"
    fontFamily: "monospace"
    background: "cyan.soft"
    borderRadius: "4px"
    padding: "0 3px"
    boxShadow: "0 1px 4px cyan.soft"

  # Pika \u89C6\u9891\u53C2\u6570 --camera
  dsl-pika-parameter:
    color: "indigo"
    fontWeight: "600"
    fontFamily: "monospace"
    background: "indigo.soft"
    borderRadius: "3px"
    padding: "0 3px"

  # Runway Gen \u53C2\u6570
  dsl-runway-parameter:
    color: "indigo"
    fontWeight: "600"
    fontFamily: "monospace"
    background: "indigo.soft"
    borderRadius: "3px"
    padding: "0 3px"

  # \u7FFB\u8BD1\u4EFB\u52A1\u6807\u8BB0 Source: / Target:
  dsl-translation-marker:
    color: "purple"
    fontWeight: "bold"


  # Few-shot \u793A\u4F8B\u6807\u8BB0 Example: / Q:
  dsl-fewshot-marker:
    color: "purple"
    fontWeight: "600"
    background: "purple.soft"
    borderRadius: "4px"
    padding: "0 4px"

  # 3D \u751F\u6210\u5E73\u53F0\u6807\u8BC6 [Meshy] [Hunyuan3D]
  dsl-gen3d-platform:
    color: "cyan"
    fontWeight: "bold"
    background: "cyan.soft"
    borderRadius: "4px"
    padding: "0 4px"

  # v2.4.0 \u8BCD\u5178\u6269\u5C55\u6837\u5F0F
  dsl-lexicon-music-structure:
    color: "music"
    fontWeight: "600"
  dsl-lexicon-avatar-emotion:
    color: "pink"
    fontWeight: "500"
  dsl-lexicon-avatar-gesture:
    color: "pink"
    fontWeight: "500"
    fontStyle: "italic"
  dsl-lexicon-tts-emotion:
    color: "orange"
    fontWeight: "500"
  dsl-lexicon-interior-style:
    color: "slate"
    fontWeight: "500"
    fontStyle: "italic"
  dsl-lexicon-logo-style:
    color: "indigo"
    fontWeight: "500"

  # ============================================================
  # \u5341\u4E00\u3001\u4E2D\u6587\u7F16\u7A0B\u6807\u8BC6\u903B\u8F91\u6269\u5C55\u6837\u5F0F\uFF08v2.5.0 \u65B0\u589E\uFF09
  # ============================================================
  # \u663E\u5F0F\u6807\u8BC6\u7B26\uFF08\u501F\u9274\u6587\u8A00\u300C\u300D\u5305\u88F9\u673A\u5236\uFF09
  dsl-explicit-identifier:
    color: "purple"
    fontWeight: "bold"
    background: "purple.soft"
    borderRadius: "4px"
    padding: "0 4px"

  # \u663E\u5F0F\u5B57\u7B26\u4E32\uFF08\u501F\u9274\u6587\u8A00\u53CC\u5C42\u5F15\u53F7\u5B57\u9762\u91CF\uFF09
  dsl-explicit-string:
    color: "success"
    fontStyle: "italic"
    background: "success.soft"
    borderRadius: "4px"
    padding: "0 4px"

  # \u534A\u89D2\u62EC\u53F7\u6CE8\u91CA\uFF08\u4E0E\u5168\u89D2 parenthetical \u89C6\u89C9\u4E00\u81F4\uFF09
  dsl-parenthetical-half:
    color: "paren"
    fontStyle: "italic"
    opacity: "0.70"

  # ============================================================
  # \u5341\u4E00\u3001\u7EC4\u5408\u89C4\u5219\u6837\u5F0F\uFF08v2.5.0 \u65B0\u589E\uFF09
  # ============================================================
  # \u955C\u5934\u52A8\u4F5C\u6307\u4EE4\uFF08\u52A8\u5BBE\u7ED3\u6784\u8BC6\u522B\uFF09
  dsl-camera-action:
    color: "cyan"
    fontWeight: "600"

  # \u60C5\u7EEA\u6807\u6CE8\uFF08\u5E76\u5217\u7ED3\u6784\u8BC6\u522B\uFF09
  dsl-emotion-parallel:
    color: "pink"
    fontStyle: "italic"
    fontWeight: "500"

  # ============================================================
  # AI \u5E38\u89C1\u7B26\u53F7\u6837\u5F0F\uFF0834 \u7C7B\uFF0C2026-09-14 \u65B0\u589E\uFF09
  # \u514B\u5236\u88C5\u9970\uFF1A\u4EC5\u7740\u8272 + \u5B57\u91CD\uFF0C\u5C11\u6570\u52A0\u5F31\u80CC\u666F
  # ============================================================

  # ---- \u7D2B\u8272\uFF1A\u89D2\u8272/\u6307\u4EE4 ----
  dsl-sym-chatml:
    color: "purple"
    fontWeight: "bold"
    fontFamily: "monospace"
    opacity: "0.85"

  # ---- \u9752\u8272\uFF1A\u601D\u7EF4\u94FE/\u903B\u8F91/\u6570\u5B66/\u5E0C\u814A/\u96C6\u5408 ----
  dsl-sym-think:
    color: "cyan"
    fontWeight: "600"
    background: "cyan.soft"
    borderRadius: "3px"
    padding: "0 3px"

  dsl-sym-logic:
    color: "cyan"
    fontWeight: "600"

  dsl-sym-math:
    color: "cyan"
    fontWeight: "600"

  dsl-sym-greek:
    color: "cyan"
    fontStyle: "italic"

  dsl-sym-set:
    color: "cyan"
    fontWeight: "600"

  # ---- \u9EC4\u8272\uFF1A\u8D27\u5E01/\u5EA6\u6570/\u5929\u6C14 ----
  dsl-sym-currency:
    color: "warning"
    fontWeight: "600"

  dsl-sym-degree:
    color: "warning"

  dsl-sym-weather:
    color: "warning"
    opacity: "0.80"

  # ---- \u84DD\u8272\uFF1A\u4EE3\u7801\u8FD0\u7B97\u7B26/\u5236\u8868\u7EBF\u6846 ----
  dsl-sym-codeop:
    color: "info"
    fontWeight: "600"
    fontFamily: "monospace"

  dsl-sym-box:
    color: "info"
    opacity: "0.70"

  # ---- \u7EFF\u8272\uFF1A\u97F3\u4E50 ----
  dsl-sym-music:
    color: "success"

  # ---- \u7EA2\u8272\uFF1A\u8B66\u544A/\u5371\u9669 ----
  dsl-sym-warning:
    color: "danger"
    fontWeight: "bold"

  # ---- \u68D5\u8272\uFF1A\u6251\u514B/\u68CB\u5B50 ----
  dsl-sym-suit:
    color: "amber"

  # ---- \u7070\u8272\uFF1A\u7BAD\u5934/\u9879\u76EE/\u7F16\u53F7/\u7701\u7565/\u8FDB\u5EA6/\u7248\u6743 ----
  dsl-sym-arrow:
    color: "paren"
    fontWeight: "600"

  dsl-sym-bullet:
    color: "paren"
    opacity: "0.80"

  dsl-sym-circlenum:
    color: "paren"
    fontWeight: "600"

  dsl-sym-ellipsis:
    color: "paren"
    opacity: "0.70"

  dsl-sym-progress:
    color: "paren"

  dsl-sym-copyright:
    color: "paren"
    opacity: "0.60"
    fontSize: "0.85em"

  # ---- \u7D2B\u8272\uFF1A\u4E2D\u6587\u62EC\u53F7\u7B26\u53F7\uFF08\u5B8C\u6574\u3010\u2026\u3011/\uFF08\u2026\uFF09\u5305\u88F9\u7531 block_wrapper/parenthetical \u4F18\u5148\uFF09----
  dsl-sym-bracket-cn:
    color: "purple"
    fontWeight: "600"

  # ---- \u84DD\u8272\uFF1A\u52A0\u53F7\uFF08++ \u7531 sym_codeop \u4F18\u5148\uFF09----
  dsl-sym-plus:
    color: "info"
    fontWeight: "600"
    fontFamily: "monospace"

# ============================================================
# \u8272\u677F\u9884\u8BBE\uFF08v2.9 \u8272\u5F69\u73A9\u6CD5\uFF09\u2014 \u4E00\u952E\u5207\u6362\u6574\u5957\u4EE4\u724C\u914D\u8272
# \u7528\u6CD5\uFF1A\u8BBE\u7F6E \u2192 \u989C\u8272\u7BA1\u7406 \u2192 \u8272\u677F\u9884\u8BBE \u9009\u62E9\u67D0\u5957 palettes
# \u6BCF\u5957\u4E3A\u90E8\u5206\u4EE4\u724C\u7684 light/dark \u8986\u76D6\uFF0C\u672A\u8986\u76D6\u4EE4\u724C\u6CBF\u7528\u9ED8\u8BA4 colors \u533A
# ============================================================
palettes:
  # \u9A6C\u5361\u9F99 \u2014 \u4F4E\u9971\u548C\u7CD6\u679C\u8272\uFF0C\u65E5\u5E38\u5199\u4F5C\u67D4\u548C\u62A4\u773C
  macaron:
    name: { zh: "\u9A6C\u5361\u9F99", en: "Macaron" }
    tokens:
      danger:   { light: "#e11d48", dark: "#fb7185" }
      success: { light: "#2dd4bf", dark: "#5eead4" }
      warning: { light: "#fbbf24", dark: "#fcd34d" }
      info:    { light: "#93c5fd", dark: "#bfdbfe" }
      purple:  { light: "#c4b5fd", dark: "#ddd6fe" }
      cyan:    { light: "#a5f3fc", dark: "#cffafe" }
      pink:    { light: "#f9a8d4", dark: "#fbcfe8" }
      amber:   { light: "#fdba74", dark: "#fed7aa" }
  # \u8367\u5149 \u2014 \u9AD8\u9971\u548C\u9713\u8679\uFF0C\u6697\u8272\u6A21\u5F0F\u8D5B\u535A\u611F
  neon:
    name: { zh: "\u8367\u5149\u9713\u8679", en: "Neon" }
    tokens:
      danger:   { light: "#ff0040", dark: "#ff2266" }
      success: { light: "#00ff88", dark: "#00ff9d" }
      warning: { light: "#ffe600", dark: "#fff03d" }
      info:    { light: "#00cfff", dark: "#22d3ee" }
      purple:  { light: "#bf00ff", dark: "#c026d3" }
      cyan:    { light: "#00e5ff", dark: "#00e5ff" }
      pink:    { light: "#ff2e88", dark: "#ff4d9d" }
      amber:   { light: "#ff9500", dark: "#ffaa33" }
  # \u83AB\u5170\u8FEA \u2014 \u7070\u8C03\u9AD8\u7EA7\u611F\uFF0C\u5370\u5237\u9605\u8BFB
  morandi:
    name: { zh: "\u83AB\u5170\u8FEA\u7070\u8C03", en: "Morandi" }
    tokens:
      danger:   { light: "#a26363", dark: "#c08484" }
      success: { light: "#7ba182", dark: "#9cbfa4" }
      warning: { light: "#b8a37e", dark: "#cabfa0" }
      info:    { light: "#6d85a8", dark: "#8fa5c2" }
      purple:  { light: "#9a7fa1", dark: "#b09ab5" }
      cyan:    { light: "#67949e", dark: "#84acB5" }
      pink:    { light: "#ab7b8f", dark: "#bf96a8" }
      amber:   { light: "#a58e6d", dark: "#bda685" }
  # \u843D\u65E5 \u2014 \u6696\u6A59\u8C03\uFF0C\u521B\u4F5C\u6C1B\u56F4
  sunset:
    name: { zh: "\u843D\u65E5\u6696\u8C03", en: "Sunset" }
    tokens:
      danger:   { light: "#dc2626", dark: "#f87171" }
      success: { light: "#65a30d", dark: "#a3e635" }
      warning: { light: "#ea580c", dark: "#fb923c" }
      info:    { light: "#0284c7", dark: "#38bdf8" }
      purple:  { light: "#9333ea", dark: "#c084fc" }
      cyan:    { light: "#0e7490", dark: "#06b6d4" }
      pink:    { light: "#db2777", dark: "#f472b6" }
      amber:   { light: "#b45309", dark: "#f59e0b" }


`,co=`# \u4F18\u5148\u7EA7\u63A7\u5236\uFF08\u89E3\u51B3\u591A\u5C42\u9AD8\u4EAE\u8986\u76D6\u51B2\u7A81\uFF09
# \u6570\u503C\u8D8A\u5927\u6E32\u67D3\u8D8A\u665A\u3001\u4F18\u5148\u7EA7\u8D8A\u9AD8\uFF0C\u81EA\u52A8\u8986\u76D6\u4F4E\u5C42\u6837\u5F0F

priority:
  # \u539F\u751F Markdown \u8BED\u6CD5\uFF08\u6700\u4F4E\u5C42\uFF0C\u7531 Obsidian \u5904\u7406\uFF09
  native-markdown: 10

  # \u57FA\u7840\u7ED3\u6784\u6B63\u5219\u5339\u914D
  base-pattern: 30

  # \u4E0A\u4E0B\u6587\u8BED\u4E49\u8FC7\u6EE4\u540E\u7684\u5339\u914D
  semantic-context: 60

  # \u8BCD\u5178\u5173\u952E\u8BCD\u7CBE\u7EC6\u5316\u7740\u8272\uFF08\u6700\u9AD8\u5C42\uFF09
  lexicon-keyword: 80

  # ============================================================
  # v2.5.0 \u65B0\u589E pattern \u7EA7\u522B\u4F18\u5148\u7EA7\u6620\u5C04\uFF08\u4E2D\u6587\u7F16\u7A0B\u8BED\u8A00\u6807\u8BC6\u903B\u8F91\uFF09
  # ============================================================

  # \u663E\u5F0F\u8FB9\u754C\u6807\u8BB0\uFF08\u501F\u9274\u6587\u8A00\u8BED\u8A00\u300C\u300D\u673A\u5236\uFF0C\u9AD8\u4E8E semantic-context \u5C42\u786E\u4FDD\u6700\u4F18\u5148\uFF09
  explicit_identifier: 65
  explicit_string: 59

  # \u7EA6\u675F\u5173\u952E\u5B57\u5206\u5C42\uFF08\u501F\u9274\u6613\u8BED\u8A00\u4FDD\u7559\u5B57\u5206\u5C42\uFF09
  constraint_absolute: 55
  constraint_soft: 50
  constraint: 45            # \u515C\u5E95\uFF0C\u4ECE 55 \u964D\u7EA7

  # \u53C2\u6570\u952E\u4F4D\u7F6E\u6D88\u6B67\uFF08\u501F\u9274\u4E2D\u87D2\u8BED\u6CD5\u4F4D\u7F6E\u5224\u65AD\uFF09
  param_key_strict: 46
  param_key: 40             # \u515C\u5E95\uFF0C\u4ECE 45 \u964D\u7EA7

  # \u53F0\u8BCD\u4E0E\u62EC\u53F7\u8FB9\u754C\u65AD\u8A00\uFF08\u501F\u9274\u4E2D\u6587\u7F16\u7A0B\u8BED\u8A00\u8BCD\u8FB9\u754C\uFF09
  dialogue_cn_strict: 52
  parenthetical_strict: 27
  parenthetical_half: 26

  # ---- \u7EC4\u5408\u89C4\u5219\u4F18\u5148\u7EA7\uFF08v2.5.0 \u65B0\u589E\uFF09----
  # \u7EC4\u5408\u89C4\u5219\u5C42\u4F4D\u4E8E patterns\uFF0850+\uFF09\u4E0E\u515C\u5E95\uFF0840-\uFF09\u4E4B\u95F4
  # \u4EC5\u5728 patterns/lexicons \u5339\u914D\u5931\u8D25\u65F6\u89E6\u53D1
  combination_constraint_verb_prefix: 48
  combination_tech_param_num_quant: 47
  combination_param_key_adj_noun: 46
  combination_param_key_noun_noun: 46
  combination_chapter_title: 45
  combination_camera_action_verb_noun: 44
  combination_emotion_parallel: 43

  # ---- \u8BCD\u7EC4\u8BCD\u5178\u4F18\u5148\u7EA7\uFF08v2.6.0 \u65B0\u589E\uFF0Cv2.6.1 \u6269\u5C55\uFF0Cv2.7.0 \u62C6\u5206+\u5BFC\u6F14\u77E5\u8BC6\u6574\u5408\uFF09----
  # \u8BCD\u7EC4\u5206\u8BCD\u5C42\u4F4D\u4E8E\u7EC4\u5408\u89C4\u5219\u4E4B\u540E\uFF0C\u4F5C\u4E3A\u5B57\u7EA7\u89C4\u5219\u7684\u515C\u5E95\u524D\u7F6E\u5C42
  # \u4F18\u5148\u7EA7\u4E0E 07a-07k \u5404\u5B50\u6587\u4EF6\u4E2D\u5206\u7EC4\u7684 priority \u5B57\u6BB5\u4FDD\u6301\u4E00\u81F4
  # v2.6.0 \u57FA\u7840\u5206\u7EC4\uFF0807a-07f\uFF0C\u4ECE\u539F 07-word-lexicon.yaml \u62C6\u5206\uFF09
  word_lexicon_constraint_phrase: 48
  word_lexicon_tech_param_phrase: 47
  word_lexicon_param_key_phrase: 46
  word_lexicon_chapter_title_phrase: 45
  word_lexicon_camera_action_phrase: 44
  word_lexicon_emotion_phrase: 43
  word_lexicon_scene_description_phrase: 42
  word_lexicon_character_action_phrase: 42
  word_lexicon_atmosphere_phrase: 41
  word_lexicon_time_season_phrase: 41
  word_lexicon_costume_makeup_phrase: 40

  # v2.7.0 \u5BFC\u6F14\u5FC5\u5B66\xB7\u6444\u5F71\u4E0E\u955C\u5934\u8BED\u8A00\uFF0807g-director-cinematography.yaml\uFF09
  word_lexicon_cinematography_basic: 46
  word_lexicon_shot_size_extended: 44
  word_lexicon_camera_angle_extended: 44
  word_lexicon_camera_movement_extended: 44
  word_lexicon_focal_length_phrase: 47
  word_lexicon_composition_phrase: 46
  word_lexicon_depth_of_field_phrase: 47

  # v2.7.0 \u5BFC\u6F14\u5FC5\u5B66\xB7\u5149\u5F71\u4E0E\u8272\u5F69\uFF0807h-director-lighting-color.yaml\uFF09
  word_lexicon_lighting_basic: 41
  word_lexicon_light_quality: 41
  word_lexicon_light_ratio: 41
  word_lexicon_color_theory: 46
  word_lexicon_color_psychology: 42
  word_lexicon_color_grading_style: 39

  # v2.7.0 \u5BFC\u6F14\u5FC5\u5B66\xB7\u526A\u8F91\u4E0E\u58F0\u97F3\uFF0807i-director-editing-sound.yaml\uFF09
  word_lexicon_editing_basic: 39
  word_lexicon_montage_theory: 39
  word_lexicon_editing_rhythm: 39
  word_lexicon_sound_design: 39
  word_lexicon_music_score: 39

  # v2.7.0 \u5BFC\u6F14\u5FC5\u5B66\xB7\u8868\u6F14\u4E0E\u5267\u4F5C\uFF0807j-director-performance-screenplay.yaml\uFF09
  word_lexicon_performance_theory: 43
  word_lexicon_emotion_expression: 43
  word_lexicon_body_language: 42
  word_lexicon_screenplay_structure: 39
  word_lexicon_story_element: 39
  word_lexicon_dialogue_craft: 39

  # v2.7.0 \u5BFC\u6F14\u5FC5\u5B66\xB7\u7C7B\u578B/\u5236\u7247/\u7535\u5F71\u53F2\uFF0807k-director-genre-production.yaml\uFF09
  word_lexicon_genre_film: 39
  word_lexicon_film_movement: 39
  word_lexicon_production_management: 38
  word_lexicon_post_production: 39
  word_lexicon_film_theory: 39

# \u9ED8\u8BA4\u4F18\u5148\u7EA7\uFF08\u5F53 pattern \u672A\u6307\u5B9A priority \u65F6\u4F7F\u7528\uFF09
defaultPatternPriority: 30

# \u8BCD\u5178\u4F18\u5148\u7EA7\u56FA\u5B9A\u4E3A\u6700\u9AD8
lexiconPriority: 80
`,po=`# ============================================================
# 06-char-lexicon.yaml
# \u6C49\u5B57\u8BCD\u6027\u8BCD\u5178\u9A71\u52A8\u7684\u7EC4\u5408\u5224\u65AD\u89C4\u5219\uFF08v2.5.0 \u65B0\u589E\uFF09
# ------------------------------------------------------------
# \u672C\u6587\u4EF6\u63D0\u4F9B\u57FA\u4E8E\u6C49\u5B57\u8BCD\u6027\u7684\u7EC4\u5408\u8BC6\u522B\u80FD\u529B\uFF1A
#   1. charLexicon: \u6309\u8BCD\u6027\u5206\u7C7B\u5F55\u5165\u6C49\u5B57\uFF0C\u6BCF\u4E2A\u5B57\u6807\u6CE8 pos \u4E0E category
#   2. combinationRules: \u5B9A\u4E49 6 \u79CD\u7EC4\u5408\u89C4\u5219\uFF08\u504F\u6B63/\u52A8\u5BBE/\u91CF\u8BCD/\u7EA6\u675F/\u5E76\u5217/\u6807\u9898\uFF09
# \u7EC4\u5408\u89C4\u5219\u4F18\u5148\u7EA7\uFF1A
#   constraint(48) > tech_param(47) > param_key(46)
#   > chapter_title(45) > camera_action(44) > emotion(43)
# ============================================================

charLexicon:

  # ============================================================
  # \u5F62\u5BB9\u8BCD\u7C7B\uFF08adj\uFF09\u2014\u2014 \u89C6\u89C9/\u7A7A\u95F4/\u901F\u5EA6/\u8D28\u611F/\u7A0B\u5EA6/\u6E29\u5EA6\u5C5E\u6027
  # ============================================================
  adj:
    # --- \u89C6\u89C9\u5C5E\u6027 ---
    \u8272: { pos: adj, category: visual }
    \u660E: { pos: adj, category: visual }
    \u6697: { pos: adj, category: visual }
    \u6DF1: { pos: adj, category: visual }
    \u6D45: { pos: adj, category: visual }
    \u6D53: { pos: adj, category: visual }
    \u6DE1: { pos: adj, category: visual }
    \u9C9C: { pos: adj, category: visual }
    \u8273: { pos: adj, category: visual }
    \u4EAE: { pos: adj, category: visual }
    \u6666: { pos: adj, category: visual }
    \u707F: { pos: adj, category: visual }

    # --- \u7A7A\u95F4\u5C5E\u6027 ---
    \u957F: { pos: adj, category: spatial }
    \u77ED: { pos: adj, category: spatial }
    \u9AD8: { pos: adj, category: spatial }
    \u4F4E: { pos: adj, category: spatial }
    \u5927: { pos: adj, category: spatial }
    \u5C0F: { pos: adj, category: spatial }
    \u5BBD: { pos: adj, category: spatial }
    \u7A84: { pos: adj, category: spatial }
    \u539A: { pos: adj, category: spatial }
    \u8584: { pos: adj, category: spatial }
    \u8FDC: { pos: adj, category: spatial }
    \u8FD1: { pos: adj, category: spatial }
    \u7C97: { pos: adj, category: spatial }
    \u7EC6: { pos: adj, category: spatial }

    # --- \u901F\u5EA6\u5C5E\u6027 ---
    \u5FEB: { pos: adj, category: speed }
    \u6162: { pos: adj, category: speed }
    \u6025: { pos: adj, category: speed }
    \u7F13: { pos: adj, category: speed }
    \u8FC5: { pos: adj, category: speed }
    \u901F: { pos: adj, category: speed }
    \u8FDF: { pos: adj, category: speed }

    # --- \u8D28\u611F\u5C5E\u6027 ---
    \u786C: { pos: adj, category: texture }
    \u8F6F: { pos: adj, category: texture }
    \u6ED1: { pos: adj, category: texture }
    \u7CD9: { pos: adj, category: texture }
    \u97E7: { pos: adj, category: texture }
    \u8106: { pos: adj, category: texture }

    # --- \u7A0B\u5EA6\u5C5E\u6027 ---
    \u5F3A: { pos: adj, category: degree }
    \u5F31: { pos: adj, category: degree }
    \u91CD: { pos: adj, category: degree }
    \u8F7B: { pos: adj, category: degree }
    \u6781: { pos: adj, category: degree }
    \u6700: { pos: adj, category: degree }
    \u9887: { pos: adj, category: degree }
    \u7A0D: { pos: adj, category: degree }

    # --- \u6E29\u5EA6\u5C5E\u6027 ---
    \u6696: { pos: adj, category: temperature }
    \u51B7: { pos: adj, category: temperature }
    \u70ED: { pos: adj, category: temperature }
    \u51C9: { pos: adj, category: temperature }
    \u51B0: { pos: adj, category: temperature }

  # ============================================================
  # \u52A8\u8BCD\u7C7B\uFF08verb\uFF09\u2014\u2014 \u955C\u5934\u8FD0\u52A8/\u7EA6\u675F\u6307\u4EE4/\u52A8\u4F5C\u6307\u4EE4/\u8868\u6F14\u52A8\u4F5C
  # ============================================================
  verb:
    # --- \u955C\u5934\u8FD0\u52A8 ---
    \u63A8: { pos: verb, category: camera_motion }
    \u62C9: { pos: verb, category: camera_motion }
    \u6447: { pos: verb, category: camera_motion }
    \u79FB: { pos: verb, category: camera_motion }
    \u8DDF: { pos: verb, category: camera_motion }
    \u5347: { pos: verb, category: camera_motion }
    \u964D: { pos: verb, category: camera_motion }
    \u7529: { pos: verb, category: camera_motion }
    \u65CB: { pos: verb, category: camera_motion }
    \u73AF: { pos: verb, category: camera_motion }
    \u7ED5: { pos: verb, category: camera_motion }
    \u4FEF: { pos: verb, category: camera_motion }
    \u4EF0: { pos: verb, category: camera_motion }

    # --- \u7EA6\u675F\u6307\u4EE4 ---
    \u6392: { pos: verb, category: constraint }
    \u907F: { pos: verb, category: constraint }
    \u9501: { pos: verb, category: constraint }
    \u5B9A: { pos: verb, category: constraint }
    \u7981: { pos: verb, category: constraint }
    \u4E25: { pos: verb, category: constraint }
    \u675C: { pos: verb, category: constraint }
    \u7EDD: { pos: verb, category: constraint }
    \u5207: { pos: verb, category: constraint }
    \u52FF: { pos: verb, category: constraint }
    \u6B62: { pos: verb, category: constraint }
    \u9632: { pos: verb, category: constraint }
    \u963B: { pos: verb, category: constraint }
    \u62D2: { pos: verb, category: constraint }

    # --- \u52A8\u4F5C\u6307\u4EE4 ---
    \u4FDD: { pos: verb, category: action }
    \u7559: { pos: verb, category: action }
    \u663E: { pos: verb, category: action }
    \u9690: { pos: verb, category: action }
    \u6362: { pos: verb, category: action }
    \u5F00: { pos: verb, category: action }
    \u5173: { pos: verb, category: action }
    \u542F: { pos: verb, category: action }
    \u505C: { pos: verb, category: action }
    \u52A0: { pos: verb, category: action }
    \u51CF: { pos: verb, category: action }
    \u589E: { pos: verb, category: action }
    \u5220: { pos: verb, category: action }
    \u6539: { pos: verb, category: action }

    # --- \u8868\u6F14\u52A8\u4F5C ---
    \u770B: { pos: verb, category: performance }
    \u671B: { pos: verb, category: performance }
    \u76EF: { pos: verb, category: performance }
    \u77A5: { pos: verb, category: performance }
    \u51DD: { pos: verb, category: performance }
    \u8F6C: { pos: verb, category: performance }
    \u56DE: { pos: verb, category: performance }
    \u8D77: { pos: verb, category: performance }
    \u5750: { pos: verb, category: performance }
    \u7ACB: { pos: verb, category: performance }
    \u884C: { pos: verb, category: performance }
    \u8DD1: { pos: verb, category: performance }
    \u8DF3: { pos: verb, category: performance }
    \u8E72: { pos: verb, category: performance }

  # ============================================================
  # \u540D\u8BCD\u7C7B\uFF08noun\uFF09\u2014\u2014 \u7269\u7406\u91CF/\u89C6\u89C9\u5BF9\u8C61/\u573A\u666F\u5BF9\u8C61/\u62BD\u8C61\u6982\u5FF5
  # ============================================================
  noun:
    # --- \u7269\u7406\u91CF ---
    \u6E29: { pos: noun, category: physical }
    \u7126: { pos: noun, category: physical }
    \u8DDD: { pos: noun, category: physical }
    \u5EA6: { pos: noun, category: physical }
    \u6BD4: { pos: noun, category: physical }
    \u7387: { pos: noun, category: physical }
    \u91CF: { pos: noun, category: physical }
    \u901F: { pos: noun, category: physical }
    \u9891: { pos: noun, category: physical }
    \u538B: { pos: noun, category: physical }
    \u6D41: { pos: noun, category: physical }
    \u5BC6: { pos: noun, category: physical }
    \u6D53: { pos: noun, category: physical }

    # --- \u89C6\u89C9\u5BF9\u8C61 ---
    \u5149: { pos: noun, category: visual_object }
    \u5F71: { pos: noun, category: visual_object }
    \u955C: { pos: noun, category: visual_object }
    \u5934: { pos: noun, category: visual_object }
    \u753B: { pos: noun, category: visual_object }
    \u9762: { pos: noun, category: visual_object }
    \u5F62: { pos: noun, category: visual_object }
    \u6001: { pos: noun, category: visual_object }
    \u52BF: { pos: noun, category: visual_object }
    \u8272: { pos: noun, category: visual_object }
    \u5F69: { pos: noun, category: visual_object }
    \u8C03: { pos: noun, category: visual_object }
    \u7EB9: { pos: noun, category: visual_object }

    # --- \u573A\u666F\u5BF9\u8C61 ---
    \u4EBA: { pos: noun, category: scene_object }
    \u7269: { pos: noun, category: scene_object }
    \u666F: { pos: noun, category: scene_object }
    \u573A: { pos: noun, category: scene_object }
    \u8F66: { pos: noun, category: scene_object }
    \u623F: { pos: noun, category: scene_object }
    \u6811: { pos: noun, category: scene_object }
    \u82B1: { pos: noun, category: scene_object }
    \u6C34: { pos: noun, category: scene_object }
    \u5C71: { pos: noun, category: scene_object }
    \u4E91: { pos: noun, category: scene_object }
    \u98CE: { pos: noun, category: scene_object }
    \u96E8: { pos: noun, category: scene_object }
    \u96EA: { pos: noun, category: scene_object }

    # --- \u62BD\u8C61\u6982\u5FF5 ---
    \u65F6: { pos: noun, category: abstract }
    \u7A7A: { pos: noun, category: abstract }
    \u7EBF: { pos: noun, category: abstract }
    \u70B9: { pos: noun, category: abstract }
    \u533A: { pos: noun, category: abstract }
    \u5C42: { pos: noun, category: abstract }
    \u7EA7: { pos: noun, category: abstract }
    \u7C7B: { pos: noun, category: abstract }
    \u79CD: { pos: noun, category: abstract }
    \u7EC4: { pos: noun, category: abstract }
    \u6BB5: { pos: noun, category: abstract }
    \u6B65: { pos: noun, category: abstract }
    \u6B21: { pos: noun, category: abstract }
    \u8F6E: { pos: noun, category: abstract }

  # ============================================================
  # \u91CF\u8BCD\u7C7B\uFF08quantifier\uFF09\u2014\u2014 \u65F6\u95F4/\u5F71\u89C6/\u7AE0\u8282/\u9891\u6B21/\u6570\u91CF
  # ============================================================
  quantifier:
    # --- \u65F6\u95F4 ---
    \u79D2: { pos: quantifier, category: time }
    \u5206: { pos: quantifier, category: time }
    \u65F6: { pos: quantifier, category: time }
    \u5929: { pos: quantifier, category: time }
    \u5468: { pos: quantifier, category: time }
    \u6708: { pos: quantifier, category: time }
    \u5E74: { pos: quantifier, category: time }

    # --- \u5F71\u89C6 ---
    \u5E27: { pos: quantifier, category: film }
    \u96C6: { pos: quantifier, category: film }
    \u5E55: { pos: quantifier, category: film }
    \u573A: { pos: quantifier, category: film }
    \u955C: { pos: quantifier, category: film }
    \u6BB5: { pos: quantifier, category: film }

    # --- \u7AE0\u8282 ---
    \u7AE0: { pos: quantifier, category: chapter }
    \u8282: { pos: quantifier, category: chapter }
    \u56DE: { pos: quantifier, category: chapter }
    \u8BFE: { pos: quantifier, category: chapter }
    \u7BC7: { pos: quantifier, category: chapter }
    \u5377: { pos: quantifier, category: chapter }

    # --- \u9891\u6B21 ---
    \u6B21: { pos: quantifier, category: frequency }
    \u904D: { pos: quantifier, category: frequency }
    \u8F6E: { pos: quantifier, category: frequency }
    \u56DE: { pos: quantifier, category: frequency }
    \u8D9F: { pos: quantifier, category: frequency }
    \u756A: { pos: quantifier, category: frequency }

    # --- \u6570\u91CF ---
    \u4E2A: { pos: quantifier, category: quantity }
    \u53EA: { pos: quantifier, category: quantity }
    \u6761: { pos: quantifier, category: quantity }
    \u4EF6: { pos: quantifier, category: quantity }
    \u9879: { pos: quantifier, category: quantity }
    \u7C7B: { pos: quantifier, category: quantity }
    \u79CD: { pos: quantifier, category: quantity }
    \u7EC4: { pos: quantifier, category: quantity }
    \u6279: { pos: quantifier, category: quantity }
    \u5806: { pos: quantifier, category: quantity }
    \u675F: { pos: quantifier, category: quantity }
    \u4E32: { pos: quantifier, category: quantity }

  # ============================================================
  # \u6570\u8BCD\u7C7B\uFF08number\uFF09\u2014\u2014 \u4E2D\u6587\u6570\u5B57/\u5927\u6570/\u5E8F\u6570
  # ============================================================
  number:
    # --- \u4E2D\u6587\u6570\u5B57 ---
    \u96F6: { pos: number, category: digit }
    \u4E00: { pos: number, category: digit }
    \u4E8C: { pos: number, category: digit }
    \u4E09: { pos: number, category: digit }
    \u56DB: { pos: number, category: digit }
    \u4E94: { pos: number, category: digit }
    \u516D: { pos: number, category: digit }
    \u4E03: { pos: number, category: digit }
    \u516B: { pos: number, category: digit }
    \u4E5D: { pos: number, category: digit }
    \u5341: { pos: number, category: digit }

    # --- \u963F\u62C9\u4F2F\u6570\u5B57\uFF08v2.5.0 \u8865\u5145\uFF0C\u4F7F"3\u79D2"\u7B49\u91CF\u8BCD\u7EC4\u5408\u53EF\u5339\u914D\uFF09---
    "0": { pos: number, category: digit }
    "1": { pos: number, category: digit }
    "2": { pos: number, category: digit }
    "3": { pos: number, category: digit }
    "4": { pos: number, category: digit }
    "5": { pos: number, category: digit }
    "6": { pos: number, category: digit }
    "7": { pos: number, category: digit }
    "8": { pos: number, category: digit }
    "9": { pos: number, category: digit }

    # --- \u5927\u6570 ---
    \u767E: { pos: number, category: big }
    \u5343: { pos: number, category: big }
    \u4E07: { pos: number, category: big }
    \u4EBF: { pos: number, category: big }

    # --- \u5E8F\u6570 ---
    \u7B2C: { pos: number, category: ordinal }
    \u9996: { pos: number, category: ordinal }
    \u672B: { pos: number, category: ordinal }
    \u521D: { pos: number, category: ordinal }
    \u7EC8: { pos: number, category: ordinal }

  # ============================================================
  # \u6807\u70B9\u7C7B\uFF08punctuation\uFF09\u2014\u2014 \u5192\u53F7/\u9017\u53F7/\u987F\u53F7/\u53E5\u53F7/\u5206\u53F7/\u5F15\u53F7/\u62EC\u53F7/\u611F\u53F9\u53F7/\u95EE\u53F7/\u7834\u6298\u53F7/\u7701\u7565\u53F7
  # \u6240\u6709\u6807\u70B9 key \u5747\u7528\u53CC\u5F15\u53F7\u5305\u88F9\uFF0C\u907F\u514D YAML \u7279\u6B8A\u5B57\u7B26\u89E3\u6790\u95EE\u9898
  # ============================================================
  punctuation:
    # --- \u5192\u53F7 ---
    ":": { pos: punctuation, category: colon }
    "\uFF1A": { pos: punctuation, category: colon }
    # --- \u9017\u53F7 ---
    ",": { pos: punctuation, category: comma }
    "\uFF0C": { pos: punctuation, category: comma }
    # --- \u987F\u53F7 ---
    "\u3001": { pos: punctuation, category: enumeration }
    # --- \u53E5\u53F7 ---
    ".": { pos: punctuation, category: period }
    "\u3002": { pos: punctuation, category: period }
    # --- \u5206\u53F7 ---
    ";": { pos: punctuation, category: semicolon }
    "\uFF1B": { pos: punctuation, category: semicolon }
    # --- \u5F15\u53F7 ---
    """: { pos: punctuation, category: quote }
    "\u201C": { pos: punctuation, category: quote }
    "\u201D": { pos: punctuation, category: quote }
    "\u300C": { pos: punctuation, category: quote }
    "\u300D": { pos: punctuation, category: quote }
    "\u300E": { pos: punctuation, category: quote }
    "\u300F": { pos: punctuation, category: quote }
    # --- \u62EC\u53F7 ---
    "(": { pos: punctuation, category: bracket }
    ")": { pos: punctuation, category: bracket }
    "\uFF08": { pos: punctuation, category: bracket }
    "\uFF09": { pos: punctuation, category: bracket }
    # --- \u611F\u53F9\u53F7 ---
    "!": { pos: punctuation, category: exclamation }
    "\uFF01": { pos: punctuation, category: exclamation }
    # --- \u95EE\u53F7 ---
    "?": { pos: punctuation, category: question }
    "\uFF1F": { pos: punctuation, category: question }
    # --- \u7834\u6298\u53F7 ---
    "-": { pos: punctuation, category: dash }
    "\u2014\u2014": { pos: punctuation, category: dash }
    # --- \u7701\u7565\u53F7 ---
    "\u2026": { pos: punctuation, category: ellipsis }
    "...": { pos: punctuation, category: ellipsis }

# ============================================================
# \u7EC4\u5408\u89C4\u5219\u5B9A\u4E49\uFF08combinationRules\uFF09
# ------------------------------------------------------------
# 6 \u79CD\u7EC4\u5408\u89C4\u5219\uFF1A\u504F\u6B63/\u52A8\u5BBE/\u91CF\u8BCD/\u7EA6\u675F/\u5E76\u5217/\u6807\u9898
# \u4F18\u5148\u7EA7\u6570\u503C\u8D8A\u5927\u8D8A\u4F18\u5148\u5339\u914D\uFF0848 > 47 > 46 > 45 > 44 > 43\uFF09
# ============================================================
combinationRules:
  # \u504F\u6B63\u7ED3\u6784\uFF1A\u5F62\u5BB9\u8BCD + \u540D\u8BCD \u2192 \u53C2\u6570\u952E
  - name: param_key_adj_noun
    firstCharPos: adj
    lastCharPos: noun
    length: { min: 2, max: 4 }
    followedBy: "[\uFF1A:]"
    cssClass: "dsl-param-key"
    priority: 46

  # \u504F\u6B63\u7ED3\u6784\uFF08\u540D\u8BCD\u4FEE\u9970\u540D\u8BCD\uFF09\uFF1A\u7126\u8DDD/\u8272\u6E29/\u901F\u5EA6 \u2192 \u53C2\u6570\u952E
  # \u4E0E param_key_adj_noun \u540C\u4F18\u5148\u7EA7\uFF0C\u5B9A\u4E49\u5728\u5176\u540E\uFF08\u7A33\u5B9A\u6392\u5E8F\u4FDD\u8BC1 adj \u89C4\u5219\u5148\u5339\u914D\uFF09
  - name: param_key_noun_noun
    firstCharPos: noun
    lastCharPos: noun
    length: { min: 2, max: 4 }
    followedBy: "[\uFF1A:]"
    cssClass: "dsl-param-key"
    priority: 46

  # \u52A8\u5BBE\u7ED3\u6784\uFF1A\u52A8\u8BCD + \u540D\u8BCD \u2192 \u52A8\u4F5C\u6307\u4EE4
  - name: camera_action_verb_noun
    firstCharPos: verb
    lastCharPos: noun
    length: { min: 2, max: 4 }
    cssClass: "dsl-camera-action"
    priority: 44

  # \u91CF\u8BCD\u7ED3\u6784\uFF1A\u6570\u8BCD + \u91CF\u8BCD \u2192 \u6280\u672F\u53C2\u6570
  # \u9650\u5B9A\u9996\u5B57 category=digit\uFF08\u4E2D\u6587/\u963F\u62C9\u4F2F\u6570\u5B57\uFF09\uFF0C\u6392\u9664 ordinal\uFF08"\u7B2C"\u5B57\u5F00\u5934\u5F52 chapter_title\uFF09
  # \u907F\u514D"\u7B2C\u4E00\u96C6"\u88AB\u672C\u89C4\u5219\u62A2\u5360\uFF08priority 47 \u9AD8\u4E8E chapter_title 45\uFF09
  - name: tech_param_num_quant
    firstCharPos: number
    firstCharCategory: digit
    lastCharPos: quantifier
    length: { min: 2, max: 4 }
    cssClass: "dsl-tech-param"
    priority: 47

  # \u7EA6\u675F\u7ED3\u6784\uFF1A\u7EA6\u675F\u52A8\u8BCD + \u4EFB\u610F \u2192 \u7EA6\u675F\u6307\u4EE4
  - name: constraint_verb_prefix
    firstCharPos: verb
    firstCharCategory: constraint
    length: { min: 2, max: 6 }
    cssClass: "dsl-constraint"
    priority: 48

  # \u5E76\u5217\u7ED3\u6784\uFF1A\u540C\u8BCD\u6027 + \u987F\u53F7\u5206\u9694 \u2192 \u60C5\u7EEA\u6807\u6CE8
  - name: emotion_parallel
    separator: "\u3001"
    samePosRequired: true
    length: { min: 2, max: 8 }
    cssClass: "dsl-emotion-parallel"
    priority: 43

  # \u6807\u9898\u7ED3\u6784\uFF1A\u5E8F\u6570\u6807\u8BB0 + \u6570\u8BCD + \u91CF\u8BCD \u2192 \u7AE0\u8282\u6807\u9898
  # \u9996\u5B57\u9650\u5B9A ordinal\uFF08"\u7B2C"\u5B57\u5F00\u5934\uFF09\uFF0C\u907F\u514D\u4E0E tech_param\uFF08digit\uFF09\u51B2\u7A81
  - name: chapter_title
    firstCharPos: number
    firstCharCategory: ordinal
    midCharPos: number
    lastCharPos: quantifier
    length: { min: 3, max: 4 }
    cssClass: "dsl-cn-chapter"
    priority: 45
`,go=`# ============================================================
# 07-word-lexicon.yaml
# \u8BCD\u7EC4\u8BED\u4E49\u5206\u8BCD\u8BCD\u5178\xB7\u7D22\u5F15\u6587\u4EF6\uFF08v2.7.0 \u6539\u9020\u4E3A\u591A\u6587\u4EF6\u5408\u5E76\u52A0\u8F7D\uFF09
# ------------------------------------------------------------
# \u672C\u6587\u4EF6\u662F\u8BCD\u7EC4\u8BCD\u5178\u7CFB\u5217\u7684\u7D22\u5F15\u6587\u4EF6\uFF0C\u4EC5\u4FDD\u7559\u5206\u8BCD\u5668\u914D\u7F6E\uFF08segmenterConfig\uFF09\u3002
# \u6240\u6709\u8BCD\u7EC4\u5206\u7EC4\u5DF2\u8FC1\u79FB\u5230 07a-07k \u5B50\u6587\u4EF6\uFF0C\u7531 rule-compiler.ts \u7684
# loadMergedWordLexicon \u51FD\u6570\u6309\u5B57\u6BCD\u5347\u5E8F\u5408\u5E76\u52A0\u8F7D\u3002
#
# \u6587\u4EF6\u52A0\u8F7D\u987A\u5E8F\uFF08\u6309\u5B57\u6BCD\u5347\u5E8F\uFF09\uFF1A
#   07-word-lexicon.yaml\uFF08\u672C\u6587\u4EF6\uFF0C\u7D22\u5F15 + segmenterConfig\uFF09
#   \u2192 07a-constraint-tech-phrase.yaml\uFF08\u7EA6\u675F\u4E0E\u6280\u672F\u53C2\u6570\uFF0C5 \u5206\u7EC4\uFF09
#   \u2192 07b-narrative-scene-phrase.yaml\uFF08\u53D9\u4E8B\u573A\u666F\uFF0C8 \u5206\u7EC4\uFF09
#   \u2192 07c-camera-action-phrase.yaml\uFF08\u955C\u5934\u8FD0\u52A8\uFF0C1 \u5206\u7EC4\uFF09
#   \u2192 07d-english-core-phrase.yaml\uFF08\u82F1\u6587\u6838\u5FC3\u672F\u8BED\uFF0C10 \u5206\u7EC4\uFF09
#   \u2192 07e-english-extended-phrase.yaml\uFF08\u82F1\u6587\u6269\u5C55\u672F\u8BED\uFF0C9 \u5206\u7EC4\uFF09
#   \u2192 07f-english-subject-phrase.yaml\uFF08\u82F1\u6587\u4E3B\u9898\u672F\u8BED\uFF0C7 \u5206\u7EC4\uFF09
#   \u2192 07g-director-cinematography.yaml\uFF08\u5BFC\u6F14\xB7\u6444\u5F71\u4E0E\u955C\u5934\u8BED\u8A00\uFF0C7 \u5206\u7EC4\uFF09
#   \u2192 07h-director-lighting-color.yaml\uFF08\u5BFC\u6F14\xB7\u5149\u5F71\u4E0E\u8272\u5F69\uFF0C6 \u5206\u7EC4\uFF09
#   \u2192 07i-director-editing-sound.yaml\uFF08\u5BFC\u6F14\xB7\u526A\u8F91\u4E0E\u58F0\u97F3\uFF0C5 \u5206\u7EC4\uFF09
#   \u2192 07j-director-performance-screenplay.yaml\uFF08\u5BFC\u6F14\xB7\u8868\u6F14\u4E0E\u5267\u4F5C\uFF0C6 \u5206\u7EC4\uFF09
#   \u2192 07k-director-genre-production.yaml\uFF08\u5BFC\u6F14\xB7\u7C7B\u578B/\u5236\u7247/\u7535\u5F71\u53F2\uFF0C5 \u5206\u7EC4\uFF09
#
# \u5B50\u6587\u4EF6\u5206\u7EC4\u6620\u5C04\u8868\uFF1A
#   07a: constraint_phrase, tech_param_phrase, param_key_phrase,
#        commercial_design_phrase, photography_phrase
#   07b: chapter_title_phrase, scene_description_phrase, character_action_phrase,
#        atmosphere_phrase, time_season_phrase, costume_makeup_phrase,
#        style_genre_phrase, emotion_phrase
#   07c: camera_action_phrase
#   07d: english_quality_phrase, english_shot_phrase, english_light_phrase,
#        english_style_phrase, english_render_phrase, english_material_phrase,
#        english_artist_phrase, english_negative_phrase, english_mj_param_phrase,
#        english_prompt_eng_phrase
#   07e: english_photo_gear_phrase, english_color_grading_phrase,
#        english_lens_effect_phrase, english_mood_phrase,
#        english_composition_extended_phrase, english_style_extended_phrase,
#        english_render_extended_phrase, english_material_extended_phrase,
#        english_vfx_extended_phrase
#   07f: english_pose_expression_phrase, english_costume_fashion_phrase,
#        english_architecture_scene_phrase, english_scifi_cyberpunk_phrase,
#        english_fantasy_myth_phrase, english_creature_race_phrase,
#        english_weapon_gear_phrase
#   07g: cinematography_basic, shot_size_extended, camera_angle_extended,
#        camera_movement_extended, focal_length_phrase, composition_phrase,
#        depth_of_field_phrase
#   07h: lighting_basic, light_quality, light_ratio, color_theory,
#        color_psychology, color_grading_style
#   07i: editing_basic, montage_theory, editing_rhythm, sound_design,
#        music_score
#   07j: performance_theory, emotion_expression, body_language,
#        screenplay_structure, story_element, dialogue_craft
#   07k: genre_film, film_movement, production_management,
#        post_production, film_theory
# ============================================================

segmenterConfig:
  # \u6700\u5927\u8BCD\u957F\uFF08\u5B57\u7B26\u6570\uFF09\uFF0C\u8D85\u8FC7\u6B64\u957F\u5EA6\u7684\u8BCD\u4E0D\u4F1A\u88AB\u5339\u914D
  # \u5EFA\u8BAE\u503C 4-8\uFF0C\u8FC7\u5927\u589E\u52A0\u626B\u63CF\u6210\u672C\uFF0C\u8FC7\u5C0F\u6F0F\u5339\u914D\u957F\u8BCD
  maxWordLength: 6
  # \u6700\u5C0F\u8BCD\u957F\uFF08\u5B57\u7B26\u6570\uFF09\uFF0C\u5C0F\u4E8E\u6B64\u957F\u5EA6\u7684\u8FDE\u7EED\u6BB5\u4E0D\u8FDB\u5165\u5206\u8BCD
  # \u8BBE\u4E3A 2 \u8868\u793A\u5355\u5B57\u76F4\u63A5\u4EA4\u7531 06 \u5B57\u7EA7\u89C4\u5219\u5904\u7406
  minWordLength: 2
`,uo=`# ============================================================
# 07a-constraint-tech-phrase.yaml
# \u8BCD\u7EC4\u8BCD\u5178\xB7\u7EA6\u675F\u4E0E\u6280\u672F\u53C2\u6570\uFF08v2.7.0 \u4ECE 07-word-lexicon.yaml \u62C6\u5206\uFF09
# ------------------------------------------------------------
# \u5305\u542B\u5206\u7EC4\uFF085 \u4E2A\uFF09\uFF1A
#   constraint_phrase         (priority 48, dsl-constraint)        \u7EA6\u675F\u6307\u4EE4\u8BCD\u7EC4
#   tech_param_phrase         (priority 47, dsl-tech-param)        \u6280\u672F\u53C2\u6570\u8BCD\u7EC4
#   param_key_phrase          (priority 46, dsl-param-key)         \u53C2\u6570\u952E\u8BCD\u7EC4\uFF08\u542B followedBy\uFF09
#   commercial_design_phrase  (priority 39, dsl-tech-param)        \u5546\u4E1A\u8BBE\u8BA1\u8BCD\u7EC4
#   photography_phrase        (priority 39, dsl-tech-param)        \u6444\u5F71\u8BCD\u7EC4
# ============================================================

wordLexicon:

  constraint_phrase:
    cssClass: "dsl-constraint"
    priority: 48
    words:
      # --- \u5426\u5B9A\u7EA6\u675F ---
      - "\u5207\u52FF"
      - "\u5207\u5FCC"
      - "\u52FF\u8981"
      - "\u52FF\u5C06"
      - "\u52FF\u8BA9"
      - "\u52FF\u4F7F"
      - "\u52FF\u7528"
      - "\u4E0D\u5F97\u6709"
      - "\u4E0D\u5E94\u6709"
      - "\u4E0D\u53EF\u6709"
      - "\u4E0D\u80FD\u6709"
      - "\u4E0D\u5141\u8BB8\u6709"
      - "\u4E25\u7981\u6709"
      - "\u907F\u514D\u51FA\u73B0"
      - "\u907F\u514D\u4F7F\u7528"
      - "\u907F\u514D\u4EA7\u751F"
      - "\u907F\u514D\u9020\u6210"
      - "\u6392\u9664\u5E72\u6270"
      - "\u6392\u9664\u6742\u8BAF"
      - "\u675C\u7EDD\u51FA\u73B0"
      - "\u675C\u7EDD\u4F7F\u7528"
      # --- \u5426\u5B9A\u7EA6\u675F\uFF08v2.6.1 \u6269\u5C55\uFF09---
      - "\u5207\u5FCC\u51FA\u73B0"
      - "\u5207\u5FCC\u4F7F\u7528"
      - "\u5207\u52FF\u8BA9"
      - "\u52FF\u4F7F\u51FA\u73B0"
      - "\u4E0D\u5F97\u51FA\u73B0"
      - "\u4E0D\u5E94\u51FA\u73B0"
      - "\u4E0D\u53EF\u51FA\u73B0"
      - "\u4E25\u7981\u51FA\u73B0"
      - "\u675C\u7EDD\u4EA7\u751F"
      - "\u907F\u514D\u91CD\u590D"
      - "\u907F\u514D\u6B67\u4E49"
      - "\u907F\u514D\u51B2\u7A81"
      - "\u907F\u514D\u9057\u6F0F"
      - "\u907F\u514D\u9519\u4F4D"
      - "\u907F\u514D\u8D8A\u754C"
      - "\u6392\u9664\u8BEF\u5DEE"
      - "\u6392\u9664\u566A\u58F0"
      - "\u6392\u9664\u504F\u5DEE"
      # --- \u80AF\u5B9A\u7EA6\u675F ---
      - "\u5FC5\u987B\u4FDD\u6301"
      - "\u5FC5\u987B\u786E\u4FDD"
      - "\u5FC5\u987B\u5305\u542B"
      - "\u52A1\u5FC5\u4FDD\u6301"
      - "\u52A1\u5FC5\u786E\u4FDD"
      - "\u52A1\u5FC5\u5305\u542B"
      - "\u4FDD\u8BC1\u4E0D"
      - "\u786E\u4FDD\u4E0D"
      - "\u9501\u5B9A\u4E3A"
      - "\u4E25\u683C\u6309"
      - "\u4E25\u683C\u9075\u5FAA"
      - "\u4E25\u683C\u4FDD\u6301"
      - "\u4EC5\u4FDD\u7559"
      - "\u4EC5\u4F7F\u7528"
      - "\u4EC5\u91C7\u7528"
      # --- \u80AF\u5B9A\u7EA6\u675F\uFF08v2.6.1 \u6269\u5C55\uFF09---
      - "\u5FC5\u987B\u4E00\u81F4"
      - "\u5FC5\u987B\u5339\u914D"
      - "\u5FC5\u987B\u5BF9\u9F50"
      - "\u52A1\u5FC5\u7CBE\u786E"
      - "\u52A1\u5FC5\u5BF9\u9F50"
      - "\u786E\u4FDD\u4E00\u81F4"
      - "\u786E\u4FDD\u5339\u914D"
      - "\u786E\u4FDD\u5BF9\u9F50"
      - "\u4E25\u683C\u5339\u914D"
      - "\u4E25\u683C\u9075\u5B88"
      - "\u4E25\u683C\u63A7\u5236"
      - "\u4EC5\u9650\u4F7F\u7528"
      - "\u4EC5\u9650\u4E8E"
      - "\u4E0D\u5F97\u4FEE\u6539"
      - "\u4E0D\u53EF\u66F4\u6539"
      - "\u4E0D\u53EF\u7701\u7565"
      - "\u4E0D\u5F97\u7701\u7565"
      - "\u4E0D\u5F97\u8D85\u51FA"
      - "\u4E0D\u53EF\u8D85\u51FA"
      # --- \u9AD8\u9891\u52A8\u8BCD\u7EA6\u675F\uFF08v2.6.2 \u8BED\u6599\u8BAD\u7EC3\u8865\u5145\uFF09---
      - "\u4FDD\u7559"
      - "\u4FDD\u6301"
      - "\u4FDD\u6301\u4EA7\u54C1"
      - "\u4FDD\u6301\u771F\u5B9E"
      - "\u4FDD\u6301\u771F\u5B9E\u5F62\u72B6"
      - "\u4FDD\u6301\u4EA7\u54C1\u7ED3\u6784"
      - "\u4FDD\u7559\u5E72\u51C0"
      - "\u4FDD\u7559\u4EF7\u683C"
      - "\u907F\u514D"
      - "\u907F\u514D\u51FA\u73B0"
      - "\u907F\u514D\u4F7F\u7528"
      - "\u907F\u514D\u91CD\u590D"
      - "\u907F\u514D\u6B67\u4E49"
      - "\u4E0D\u8981\u6DFB\u52A0"
      - "\u4E0D\u8981\u8BA9"
      - "\u4E0D\u8981\u6539\u53D8"
      - "\u4E0D\u8981\u8FC7\u5EA6"
      - "\u4E0D\u8981\u751F\u6210"
      - "\u4E0D\u8981\u4F7F\u7528"

  # ============================================================
  # 2. \u6280\u672F\u53C2\u6570\u8BCD\u7EC4\uFF08\u8865\u5145 03 sd_image_term/photography_term\uFF09
  # ============================================================

  tech_param_phrase:
    cssClass: "dsl-tech-param"
    priority: 47
    words:
      # --- \u5206\u8FA8\u7387/\u5E27\u7387\u7EC4\u5408 ---
      - "\u9AD8\u5E27\u7387"
      - "\u4F4E\u5E27\u7387"
      - "\u6807\u51C6\u5E27\u7387"
      - "\u7535\u5F71\u5E27\u7387"
      - "\u5E7F\u64AD\u5E27\u7387"
      - "\u9AD8\u5206\u8FA8\u7387"
      - "\u4F4E\u5206\u8FA8\u7387"
      - "\u6807\u51C6\u5206\u8FA8\u7387"
      - "\u539F\u751F\u5206\u8FA8\u7387"
      - "\u76EE\u6807\u5206\u8FA8\u7387"
      - "\u8F93\u51FA\u5206\u8FA8\u7387"
      # --- \u8272\u5F69\u53C2\u6570\u7EC4\u5408 ---
      - "\u9AD8\u8272\u57DF"
      - "\u5E7F\u8272\u57DF"
      - "\u7A84\u8272\u57DF"
      - "\u6807\u51C6\u8272\u57DF"
      - "\u9AD8\u52A8\u6001\u8303\u56F4"
      - "\u6807\u51C6\u52A8\u6001\u8303\u56F4"
      - "\u8272\u5F69\u6DF1\u5EA6"
      - "\u8272\u5F69\u91C7\u6837"
      - "\u8272\u5EA6\u62BD\u6837"
      # --- \u7F16\u7801\u53C2\u6570\u7EC4\u5408 ---
      - "\u9AD8\u7801\u7387"
      - "\u4F4E\u7801\u7387"
      - "\u6052\u5B9A\u7801\u7387"
      - "\u53EF\u53D8\u7801\u7387"
      - "\u65E0\u635F\u538B\u7F29"
      - "\u6709\u635F\u538B\u7F29"
      - "\u9AD8\u538B\u7F29\u6BD4"
      - "\u4F4E\u538B\u7F29\u6BD4"
      # --- \u6280\u672F\u53C2\u6570\uFF08v2.6.1 \u6269\u5C55\uFF09---
      - "\u539F\u751F\u5E27\u7387"
      - "\u76EE\u6807\u5E27\u7387"
      - "\u8F93\u51FA\u5E27\u7387"
      - "\u9AD8\u6BD4\u7279\u7387"
      - "\u4F4E\u6BD4\u7279\u7387"
      - "\u539F\u751F\u6BD4\u7279\u7387"
      - "\u8272\u5F69\u7CBE\u5EA6"
      - "\u8272\u57DF\u8986\u76D6"
      - "\u52A8\u6001\u8303\u56F4"
      - "\u5E27\u7CBE\u5EA6"
      - "\u573A\u7CBE\u5EA6"
      - "\u9010\u884C\u626B\u63CF"
      - "\u9694\u884C\u626B\u63CF"
      - "\u9AD8\u8272\u6DF1"
      - "\u4F4E\u8272\u6DF1"
      - "\u516B\u4F4D\u8272\u6DF1"
      - "\u5341\u4F4D\u8272\u6DF1"
      - "\u5341\u516D\u4F4D\u8272\u6DF1"

  # ============================================================
  # 3. \u53C2\u6570\u952E\u8BCD\u7EC4\uFF08\u8865\u5145 01 param_key \u6B63\u5219\u9057\u6F0F\u7684\u56FA\u5B9A\u642D\u914D\uFF09
  # \u4EC5\u5728\u540E\u63A5\u5192\u53F7\u65F6\u89E6\u53D1\uFF08followedBy \u7EA6\u675F\uFF09
  # ============================================================

  param_key_phrase:
    cssClass: "dsl-param-key"
    priority: 46
    followedBy: "[\uFF1A:]"
    words:
      # --- \u89C6\u89C9\u53C2\u6570 ---
      - "\u8272\u6E29"
      - "\u8272\u8C03"
      - "\u8272\u76F8"
      - "\u9971\u548C\u5EA6"
      - "\u660E\u5EA6"
      - "\u5BF9\u6BD4\u5EA6"
      - "\u4EAE\u5EA6"
      - "\u66DD\u5149"
      - "\u5149\u5708"
      - "\u5FEB\u95E8"
      - "\u7126\u8DDD"
      - "\u7126\u6BB5"
      - "\u666F\u6DF1"
      - "\u767D\u5E73\u8861"
      - "\u611F\u5149\u5EA6"
      # --- \u955C\u5934\u53C2\u6570 ---
      - "\u955C\u5934"
      - "\u7126\u6BB5\u8303\u56F4"
      - "\u5149\u5708\u503C"
      - "\u5FEB\u95E8\u901F\u5EA6"
      - "\u62CD\u6444\u8DDD\u79BB"
      - "\u5BF9\u7126\u8DDD\u79BB"
      - "\u6700\u8FD1\u5BF9\u7126"
      - "\u955C\u5934\u89C6\u89D2"
      - "\u89C6\u89D2\u8303\u56F4"
      # --- \u6784\u56FE\u53C2\u6570 ---
      - "\u6784\u56FE"
      - "\u673A\u4F4D"
      - "\u666F\u522B"
      - "\u62CD\u6444\u89D2\u5EA6"
      - "\u4FEF\u4EF0\u89D2"
      - "\u822A\u5411\u89D2"
      - "\u89C6\u573A\u89D2"
      # --- \u97F3\u9891\u53C2\u6570 ---
      - "\u97F3\u91CF"
      - "\u91C7\u6837\u7387"
      - "\u4F4D\u6DF1\u5EA6"
      - "\u58F0\u9053\u6570"
      # --- \u540E\u671F\u53C2\u6570 ---
      - "\u964D\u566A"
      - "\u9510\u5316"
      - "\u6A21\u7CCA"
      - "\u8272\u5F69\u7A7A\u95F4"
      - "\u4F3D\u9A6C\u503C"
      - "\u8272\u8C03\u6620\u5C04"
      # --- \u53C2\u6570\u952E\uFF08v2.6.1 \u6269\u5C55\uFF09---
      - "\u5E27\u7387"
      - "\u7801\u7387"
      - "\u6BD4\u7279\u7387"
      - "\u91C7\u6837\u683C\u5F0F"
      - "\u8272\u5F69\u77E9\u9635"
      - "\u4F20\u8F93\u7279\u6027"
      - "\u539F\u8272\u8272\u57DF"
      - "\u53C2\u8003\u767D"
      - "\u53C2\u8003\u9ED1"
      - "\u663E\u793A\u4EAE\u5EA6"
      - "\u73AF\u5883\u5149"
      - "\u53CD\u5C04\u7387"
      - "\u5BBD\u9AD8\u6BD4"
      - "\u753B\u5E45\u6BD4"
      - "\u6E32\u67D3\u7CBE\u5EA6"
      - "\u8FED\u4EE3\u6B65\u6570"
      - "\u968F\u673A\u79CD\u5B50"
      - "\u6743\u91CD\u5F3A\u5EA6"

  # ============================================================
  # 4. \u7AE0\u8282\u6807\u9898\u8BCD\u7EC4\uFF08\u8865\u5145 06 chapter_title \u7EC4\u5408\u89C4\u5219\uFF09
  # ============================================================

  commercial_design_phrase:
    cssClass: "dsl-tech-param"
    priority: 39
    words:
      # --- \u7535\u5546\u6838\u5FC3\u5BF9\u8C61 ---
      - "\u4EA7\u54C1"
      - "\u4EA7\u54C1\u540D\u79F0"
      - "\u4EA7\u54C1\u6444\u5F71"
      - "\u4EA7\u54C1\u6444\u5F71\u56FE"
      - "\u4EA7\u54C1\u56FE"
      - "\u4EA7\u54C1\u5E7F\u544A"
      - "\u4EA7\u54C1\u5E7F\u544A\u6D77\u62A5"
      - "\u4EA7\u54C1\u5360\u753B\u9762"
      - "\u4EA7\u54C1\u7EC6\u8282"
      - "\u4EA7\u54C1\u6807\u7B7E"
      - "\u4EA7\u54C1\u4E3B\u56FE"
      - "\u4EA7\u54C1\u771F\u5B9E"
      - "\u4E3B\u56FE"
      - "\u5356\u70B9\u4E3B\u56FE"
      - "\u7535\u5546\u4E3B\u56FE"
      - "\u8BE6\u60C5\u9875"
      - "\u8BE6\u60C5\u9875\u9996\u5C4F"
      - "\u9996\u5C4F"
      - "\u9996\u5C4F\u4EA7\u54C1"
      - "\u5957\u88C5\u7EC4\u5408"
      # --- \u5546\u4E1A\u5185\u5BB9\u7C7B\u578B ---
      - "\u6D77\u62A5"
      - "\u5C01\u9762"
      - "\u4E3B\u89C6\u89C9"
      - "\u89C6\u89C9"
      - "\u5E7F\u544A"
      - "\u5E7F\u544A\u6D77\u62A5"
      - "\u4FC3\u9500"
      - "\u4FC3\u9500\u6D77\u62A5"
      - "\u8282\u65E5\u4FC3\u9500"
      - "\u6D3B\u52A8"
      - "\u6587\u6848"
      - "\u6807\u9898"
      - "\u6807\u9898\u6587\u5B57"
      - "\u6807\u9898\u533A\u57DF"
      - "\u526F\u6807\u9898"
      - "\u77ED\u6807\u9898"
      - "\u5356\u70B9"
      - "\u4E8C\u7EF4\u7801"
      - "\u6309\u94AE"
      - "\u6309\u94AE\u533A\u57DF"
      - "\u56FE\u6807"
      - "\u5361\u7247"
      - "\u8D34\u7EB8"
      - "\u88C5\u9970"
      - "\u5206\u5272\u7EBF"
      - "\u6392\u7248"
      - "\u6784\u56FE"
      # --- \u5C0F\u7EA2\u4E66/\u793E\u5A92 ---
      - "\u5C0F\u7EA2\u4E66"
      - "\u79CD\u8349"
      - "\u63A2\u5E97"
      - "\u5408\u96C6"
      - "\u6559\u7A0B"
      - "\u77E5\u8BC6"
      - "\u5BB6\u5C45"
      - "\u6539\u9020"
      - "\u7A7F\u642D"
      - "\u7F8E\u98DF"
      - "\u7F8E\u98DF\u6444\u5F71"
      - "\u7F8E\u98DF\u5C01\u9762"
      - "\u63A2\u5E97\u5C01\u9762"
      - "\u5BB6\u5C45\u6539\u9020"
      - "\u5DE5\u5177\u63A8\u8350"
      # --- \u89C6\u89C9\u8D28\u91CF\u63CF\u8FF0 ---
      - "\u8D28\u611F"
      - "\u8D28\u611F\u771F\u5B9E"
      - "\u5C42\u6B21"
      - "\u7559\u767D"
      - "\u7559\u767D\u5145\u8DB3"
      - "\u753B\u9762"
      - "\u753B\u9762\u5305\u542B"
      - "\u753B\u9762\u53F3\u4FA7"
      - "\u753B\u9762\u4E2D\u5FC3"
      - "\u753B\u9762\u4E0B\u65B9"
      - "\u753B\u9762\u660E\u4EAE"
      - "\u753B\u9762\u6E05\u6670"
      - "\u89C6\u89C9\u91CD\u5FC3"
      - "\u5360\u6BD4"
      - "\u6BD4\u4F8B"
      # --- \u8D1F\u9762\u7EA6\u675F\u5BF9\u8C61 ---
      - "\u6C34\u5370"
      - "\u4E71\u7801"
      - "\u4E71\u7801\u6587\u5B57"
      - "\u865A\u5047"
      - "\u5938\u5F20"
      - "\u627F\u8BFA"
      - "\u5546\u6807"
      - "\u968F\u673A\u6587\u5B57"
      - "\u865A\u5047\u5730\u5740"
      - "\u5047\u8BA4\u8BC1"

  # ============================================================
  # 13. \u98CE\u683C\u6D41\u6D3E\u8BCD\u7EC4\uFF08v2.6.2 \u8BED\u6599\u8BAD\u7EC3\u65B0\u589E\uFF09
  # \u6536\u5F55\u827A\u672F\u98CE\u683C/\u521B\u4F5C\u6D41\u6D3E/\u573A\u666F\u7C7B\u578B\u8BCD
  # \u590D\u7528 dsl-narrative-term \u914D\u8272\uFF0Cpriority 39
  # ============================================================

  photography_phrase:
    cssClass: "dsl-tech-param"
    priority: 39
    words:
      # --- \u955C\u5934\u7C7B\u578B ---
      - "\u5E7F\u89D2"
      - "\u5E7F\u89D2\u955C\u5934"
      - "\u5E7F\u89D2\u6784\u56FE"
      - "\u957F\u7126"
      - "\u957F\u7126\u955C\u5934"
      - "\u5FAE\u8DDD"
      - "\u5FAE\u8DDD\u955C\u5934"
      - "\u6807\u51C6\u955C\u5934"
      - "\u5B9A\u7126"
      - "\u53D8\u7126"
      - "\u9C7C\u773C"
      - "\u79FB\u8F74"
      # --- \u5668\u6750\u914D\u4EF6 ---
      - "\u4E09\u811A\u67B6"
      - "\u4E09\u811A\u67B6\u7A33\u5B9A"
      - "\u7A33\u5B9A\u5668"
      - "\u67D4\u5149\u7BB1"
      - "\u53CD\u5149\u677F"
      - "\u95EA\u5149\u706F"
      - "\u906E\u5149\u7F69"
      - "\u6EE4\u955C"
      - "\u504F\u632F\u955C"
      # --- \u62CD\u6444\u53C2\u6570 ---
      - "\u7269\u7406\u76F8\u673A"
      - "\u89C6\u70B9"
      - "\u89C6\u573A\u89D2"
      - "\u8272\u6E29"
      - "\u767D\u5E73\u8861"
      - "\u611F\u5149\u5EA6"
      - "\u66DD\u5149"
      - "\u666F\u6DF1"
      - "\u6D45\u666F\u6DF1"
      - "\u6DF1\u666F\u6DF1"
      - "\u957F\u66DD\u5149"
      - "\u591A\u91CD\u66DD\u5149"
      - "\u5305\u56F4\u66DD\u5149"
      - "\u4F4E\u89D2\u5EA6"
      - "\u9AD8\u89D2\u5EA6"
      - "\u4FEF\u62CD"
      - "\u4EF0\u62CD"
      - "\u5E73\u89C6"
      - "\u9E1F\u77B0"
      # --- \u6E32\u67D3\u5668/\u8F6F\u4EF6 ---
      - "\u6E32\u67D3\u5668"
      - "\u6E32\u67D3\u56FE"
      - "\u6E32\u67D3"
      - "\u6750\u8D28"
      - "PBR"
      - "\u6B21\u8868\u9762\u6563\u5C04"
      - "\u5168\u5C40\u5149\u7167"
      - "\u5149\u7EBF\u8FFD\u8E2A"

  # ============================================================
  # 15. \u82F1\u6587\u8D28\u91CF\u4FEE\u9970\u8BCD\u7EC4\uFF08v2.6.3 \u56FD\u5916\u8BED\u6599\u8BAD\u7EC3\u65B0\u589E\uFF09
  # \u6536\u5F55 masterpiece/8k/ray tracing \u7B49\u9AD8\u9891\u8D28\u91CF\u8BCD
  # \u590D\u7528 dsl-tech-param \u914D\u8272\uFF0Cpriority 47
  # ============================================================

`,ho=`# ============================================================
# 07b-narrative-scene-phrase.yaml
# \u8BCD\u7EC4\u8BCD\u5178\xB7\u53D9\u4E8B\u573A\u666F\uFF08v2.7.0 \u4ECE 07-word-lexicon.yaml \u62C6\u5206\uFF09
# ------------------------------------------------------------
# \u5305\u542B\u5206\u7EC4\uFF088 \u4E2A\uFF09\uFF1A
#   chapter_title_phrase       (priority 45, dsl-cn-chapter)           \u7AE0\u8282\u6807\u9898\u8BCD\u7EC4
#   scene_description_phrase   (priority 42, dsl-narrative-term)       \u573A\u666F\u63CF\u8FF0\u8BCD\u7EC4
#   character_action_phrase    (priority 42, dsl-lexicon-performance)  \u4EBA\u7269\u52A8\u4F5C\u8BCD\u7EC4
#   atmosphere_phrase          (priority 41, dsl-light-word)           \u6C1B\u56F4\u8BCD\u7EC4
#   time_season_phrase         (priority 41, dsl-narrative-term)       \u65F6\u95F4\u5B63\u8282\u8BCD\u7EC4
#   costume_makeup_phrase      (priority 40, dsl-fashion-term)         \u670D\u9970\u5986\u5BB9\u8BCD\u7EC4
#   style_genre_phrase         (priority 39, dsl-narrative-term)       \u98CE\u683C\u6D41\u6D3E\u8BCD\u7EC4
#   emotion_phrase             (priority 43, dsl-emotion-word)         \u60C5\u7EEA\u8BCD\u7EC4
# ============================================================

wordLexicon:

  chapter_title_phrase:
    cssClass: "dsl-cn-chapter"
    priority: 45
    words:
      # --- \u5F71\u89C6\u5206\u96C6 ---
      - "\u7B2C\u4E00\u96C6"
      - "\u7B2C\u4E8C\u96C6"
      - "\u7B2C\u4E09\u96C6"
      - "\u7B2C\u56DB\u96C6"
      - "\u7B2C\u4E94\u96C6"
      - "\u7B2C\u516D\u96C6"
      - "\u7B2C\u4E03\u96C6"
      - "\u7B2C\u516B\u96C6"
      - "\u7B2C\u4E5D\u96C6"
      - "\u7B2C\u5341\u96C6"
      # --- \u7AE0\u8282\u6807\u9898 ---
      - "\u7B2C\u4E00\u7AE0"
      - "\u7B2C\u4E8C\u7AE0"
      - "\u7B2C\u4E09\u7AE0"
      - "\u7B2C\u56DB\u7AE0"
      - "\u7B2C\u4E94\u7AE0"
      - "\u7B2C\u516D\u7AE0"
      - "\u7B2C\u4E03\u7AE0"
      - "\u7B2C\u516B\u7AE0"
      - "\u7B2C\u4E5D\u7AE0"
      - "\u7B2C\u5341\u7AE0"
      # --- \u8282/\u6BB5\u843D ---
      - "\u7B2C\u4E00\u8282"
      - "\u7B2C\u4E8C\u8282"
      - "\u7B2C\u4E09\u8282"
      - "\u7B2C\u56DB\u8282"
      - "\u7B2C\u4E94\u8282"
      # --- \u573A\u6B21/\u955C\u5934\u5E8F ---
      - "\u7B2C\u4E00\u573A"
      - "\u7B2C\u4E8C\u573A"
      - "\u7B2C\u4E09\u573A"
      - "\u7B2C\u56DB\u573A"
      - "\u7B2C\u4E94\u573A"
      - "\u7B2C\u516D\u573A"
      - "\u7B2C\u4E03\u573A"
      - "\u7B2C\u516B\u573A"
      - "\u7B2C\u4E5D\u573A"
      - "\u7B2C\u5341\u573A"
      # --- \u5E8F\u53F7\u6269\u5C55\uFF08v2.6.1 \u7B2C\u5341\u4E00\u81F3\u7B2C\u4E8C\u5341\uFF09---
      - "\u7B2C\u5341\u4E00\u96C6"
      - "\u7B2C\u5341\u4E8C\u96C6"
      - "\u7B2C\u5341\u4E09\u96C6"
      - "\u7B2C\u5341\u56DB\u96C6"
      - "\u7B2C\u5341\u4E94\u96C6"
      - "\u7B2C\u5341\u516D\u96C6"
      - "\u7B2C\u5341\u4E03\u96C6"
      - "\u7B2C\u5341\u516B\u96C6"
      - "\u7B2C\u5341\u4E5D\u96C6"
      - "\u7B2C\u4E8C\u5341\u96C6"
      - "\u7B2C\u5341\u4E00\u7AE0"
      - "\u7B2C\u5341\u4E8C\u7AE0"
      - "\u7B2C\u5341\u4E09\u7AE0"
      - "\u7B2C\u5341\u56DB\u7AE0"
      - "\u7B2C\u5341\u4E94\u7AE0"
      - "\u7B2C\u5341\u516D\u7AE0"
      - "\u7B2C\u5341\u4E03\u7AE0"
      - "\u7B2C\u5341\u516B\u7AE0"
      - "\u7B2C\u5341\u4E5D\u7AE0"
      - "\u7B2C\u4E8C\u5341\u7AE0"
      - "\u7B2C\u5341\u4E00\u573A"
      - "\u7B2C\u5341\u4E8C\u573A"
      - "\u7B2C\u5341\u4E09\u573A"
      - "\u7B2C\u5341\u56DB\u573A"
      - "\u7B2C\u5341\u4E94\u573A"
      # --- \u7ED3\u6784\u6027\u6807\u9898\uFF08v2.6.1 \u65B0\u589E\uFF09---
      - "\u5E8F\u7AE0"
      - "\u5C3E\u58F0"
      - "\u6954\u5B50"
      - "\u756A\u5916"
      - "\u7EC8\u7AE0"
      - "\u9996\u7AE0"
      - "\u672B\u7AE0"
      - "\u5F15\u5B50"
      - "\u540E\u8BB0"
      - "\u8DCB\u6587"

  # ============================================================
  # 5. \u955C\u5934\u8FD0\u52A8\u8BCD\u7EC4\uFF08\u8865\u5145 03 camera_move \u8BCD\u8868\u5916\u7EC4\u5408\uFF09
  # \u8986\u76D6"\u4FEE\u9970\u8BCD + \u955C\u5934\u52A8\u4F5C"\u7684\u5E38\u89C1\u642D\u914D
  # ============================================================

  emotion_phrase:
    cssClass: "dsl-emotion-word"
    priority: 43
    words:
      # --- \u590D\u5408\u60C5\u7EEA ---
      - "\u60B2\u559C\u4EA4\u52A0"
      - "\u53C8\u60CA\u53C8\u559C"
      - "\u53C8\u7231\u53C8\u6068"
      - "\u534A\u4FE1\u534A\u7591"
      - "\u5C06\u4FE1\u5C06\u7591"
      - "\u82E5\u6709\u6240\u601D"
      - "\u82E5\u6709\u6240\u5931"
      - "\u5FC3\u795E\u4E0D\u5B81"
      - "\u5FC3\u70E6\u610F\u4E71"
      - "\u5FC3\u4E71\u5982\u9EBB"
      - "\u5FC3\u6025\u5982\u711A"
      - "\u5FC3\u82B1\u6012\u653E"
      - "\u5FC3\u65F7\u795E\u6021"
      - "\u5FC3\u9A70\u795E\u5F80"
      - "\u5FC3\u733F\u610F\u9A6C"
      # --- \u8868\u60C5\u72B6\u6001 ---
      - "\u7709\u5934\u7D27\u9501"
      - "\u7709\u5F00\u773C\u7B11"
      - "\u7709\u98DE\u8272\u821E"
      - "\u6101\u7709\u82E6\u8138"
      - "\u6101\u7709\u4E0D\u5C55"
      - "\u559C\u7B11\u989C\u5F00"
      - "\u5B09\u76AE\u7B11\u8138"
      - "\u51B7\u82E5\u51B0\u971C"
      - "\u9762\u5982\u6B7B\u7070"
      - "\u9762\u7EA2\u8033\u8D64"
      - "\u9762\u5E26\u5FAE\u7B11"
      - "\u9762\u65E0\u8868\u60C5"
      # --- \u773C\u795E\u72B6\u6001 ---
      - "\u76EE\u5149\u70AF\u70AF"
      - "\u76EE\u5149\u95EA\u70C1"
      - "\u76EE\u5149\u5446\u6EDE"
      - "\u76EE\u5149\u5982\u70AC"
      - "\u76EE\u5149\u5982\u8C46"
      - "\u773C\u542B\u79CB\u6C34"
      - "\u773C\u542B\u70ED\u6CEA"
      - "\u773C\u542B\u7B11\u610F"
      - "\u6012\u76EE\u800C\u89C6"
      - "\u6012\u76EE\u5706\u7741"
      - "\u6A2A\u7709\u51B7\u76EE"
      - "\u6324\u7709\u5F04\u773C"
      # --- \u590D\u5408\u60C5\u7EEA\uFF08v2.6.1 \u6269\u5C55\uFF09---
      - "\u767E\u611F\u4EA4\u96C6"
      - "\u767E\u65E0\u804A\u8D56"
      - "\u6005\u7136\u82E5\u5931"
      - "\u60B2\u75DB\u6B32\u7EDD"
      - "\u60B2\u75DB\u4E07\u5206"
      - "\u6B23\u559C\u82E5\u72C2"
      - "\u6B23\u559C\u4E07\u5206"
      - "\u60CA\u6050\u4E07\u5206"
      - "\u60CA\u6050\u5931\u8272"
      - "\u60F6\u6050\u4E0D\u5B89"
      - "\u60CA\u614C\u5931\u63AA"
      - "\u60CA\u9B42\u672A\u5B9A"
      - "\u5FC3\u60CA\u8089\u8DF3"
      - "\u5FC3\u60CA\u80C6\u6218"
      - "\u80C6\u6218\u5FC3\u60CA"
      - "\u63D0\u5FC3\u540A\u80C6"
      - "\u5FE7\u5FC3\u5FE1\u5FE1"
      - "\u6101\u80A0\u767E\u7ED3"
      - "\u6101\u80A0\u5BF8\u65AD"
      - "\u809D\u80A0\u5BF8\u65AD"
      - "\u75DB\u4E0D\u6B32\u751F"
      - "\u75DB\u5FC3\u75BE\u9996"
      - "\u6495\u5FC3\u88C2\u80BA"
      - "\u559C\u51FA\u671B\u5916"
      - "\u559C\u4E0D\u81EA\u80DC"
      - "\u559C\u4E0A\u7709\u68A2"
      - "\u559C\u5F62\u4E8E\u8272"
      - "\u7B11\u5BB9\u53EF\u63AC"
      - "\u7B11\u9010\u989C\u5F00"
      - "\u7834\u6D95\u4E3A\u7B11"
      # --- \u8868\u6F14\u6838\u5FC3\u8BCD\uFF08v2.6.2 \u8BED\u6599\u8BAD\u7EC3\u8865\u5145\uFF09---
      - "\u8868\u60C5"
      - "\u60C5\u7EEA"
      - "\u795E\u6001"
      - "\u773C\u795E"
      - "\u76EE\u5149"
      - "\u7B11\u5BB9"
      - "\u795E\u8272"

  # ============================================================
  # 7. \u573A\u666F\u63CF\u5199\u8BCD\u7EC4\uFF08v2.6.1 \u65B0\u589E\uFF09
  # \u8865\u5145 03 narrative_term \u672A\u8986\u76D6\u7684\u56DB\u5B57\u573A\u666F\u6210\u8BED
  # ============================================================

  scene_description_phrase:
    cssClass: "dsl-narrative-term"
    priority: 42
    words:
      # --- \u90FD\u5E02/\u5E02\u4E95\u573A\u666F ---
      - "\u534E\u706F\u521D\u4E0A"
      - "\u8F66\u6C34\u9A6C\u9F99"
      - "\u4EBA\u5C71\u4EBA\u6D77"
      - "\u706F\u706B\u901A\u660E"
      - "\u9713\u8679\u95EA\u70C1"
      - "\u9AD8\u697C\u6797\u7ACB"
      - "\u7199\u7199\u6518\u6518"
      - "\u6469\u80A9\u63A5\u8E35"
      - "\u5DDD\u6D41\u4E0D\u606F"
      - "\u4E07\u5BB6\u706F\u706B"
      # --- \u81EA\u7136/\u7530\u56ED\u573A\u666F ---
      - "\u5C71\u6E05\u6C34\u79C0"
      - "\u6E56\u5149\u5C71\u8272"
      - "\u9E1F\u8BED\u82B1\u9999"
      - "\u4E07\u7D2B\u5343\u7EA2"
      - "\u7E41\u82B1\u4F3C\u9526"
      - "\u7EFF\u6811\u6210\u836B"
      - "\u90C1\u90C1\u8471\u8471"
      - "\u5C42\u6797\u5C3D\u67D3"
      - "\u6F2B\u5C71\u904D\u91CE"
      - "\u4E00\u671B\u65E0\u9645"
      # --- \u8352\u51C9/\u5BC2\u5BE5\u573A\u666F ---
      - "\u4E07\u7C41\u4FF1\u5BC2"
      - "\u9E26\u96C0\u65E0\u58F0"
      - "\u8352\u65E0\u4EBA\u70DF"
      - "\u5BF8\u8349\u4E0D\u751F"
      - "\u6EE1\u76EE\u75AE\u75CD"
      - "\u65AD\u58C1\u6B8B\u57A3"
      - "\u6B8B\u57A3\u65AD\u58C1"
      - "\u4EBA\u8FF9\u7F55\u81F3"
      - "\u7A77\u5C71\u6076\u6C34"
      - "\u4E0D\u6BDB\u4E4B\u5730"
      # --- \u52A8\u6001/\u6C1B\u56F4\u573A\u666F ---
      - "\u98CE\u548C\u65E5\u4E3D"
      - "\u6708\u9ED1\u98CE\u9AD8"
      - "\u7535\u95EA\u96F7\u9E23"
      - "\u72C2\u98CE\u66B4\u96E8"
      - "\u503E\u76C6\u5927\u96E8"
      - "\u7EC6\u96E8\u7EF5\u7EF5"
      - "\u5FAE\u98CE\u62C2\u9762"
      - "\u98CE\u8D77\u4E91\u6D8C"
      - "\u4E91\u96FE\u7F2D\u7ED5"
      - "\u70DF\u6CE2\u6D69\u6E3A"
      # --- \u573A\u666F\u6838\u5FC3\u8BCD\uFF08v2.6.2 \u8BED\u6599\u8BAD\u7EC3\u8865\u5145\uFF09---
      - "\u80CC\u666F"
      - "\u80CC\u666F\u7B80\u6D01"
      - "\u80CC\u666F\u5E72\u51C0"
      - "\u80CC\u666F\u4E3A\u6DF1"
      - "\u80CC\u666F\u4E3A\u7EAF"
      - "\u573A\u666F"
      - "\u573A\u666F\u63CF\u8FF0"
      - "\u573A\u666F\u6982\u5FF5"
      - "\u573A\u666F\u6E32\u67D3"
      - "\u573A\u666F\u5316"
      - "\u7A7A\u95F4"
      - "\u7A7A\u95F4\u5C42\u6B21"
      - "\u7A7A\u95F4\u7C7B\u578B"
      - "\u7A7A\u95F4\u611F"
      - "\u73AF\u5883"
      - "\u68DA\u62CD"
      - "\u68DA\u62CD\u73AF\u5883"
      - "\u68DA\u62CD\u5149"
      - "\u5B9E\u666F"
      - "\u6237\u5916\u573A\u666F"
      - "\u5BA4\u5185"
      - "\u5BA4\u5185\u7A7A\u95F4"
      - "\u9713\u8679"
      - "\u9713\u8679\u706F"
      - "\u57CE\u5E02"
      - "\u57CE\u5E02\u591C\u666F"
      - "\u8857\u9053"
      - "\u53F0\u9762"
      - "\u6E05\u6668"
      - "\u672B\u65E5\u5E9F\u571F"

  # ============================================================
  # 8. \u4EBA\u7269\u52A8\u4F5C\u8BCD\u7EC4\uFF08v2.6.1 \u65B0\u589E\uFF09
  # \u8865\u5145 03 performance \u672A\u8986\u76D6\u7684\u52A8\u4F5C\u642D\u914D
  # ============================================================

  character_action_phrase:
    cssClass: "dsl-lexicon-performance"
    priority: 42
    words:
      # --- \u5934\u90E8/\u9762\u90E8\u52A8\u4F5C ---
      - "\u4F4E\u5934\u6C89\u601D"
      - "\u62AC\u5934\u4EF0\u671B"
      - "\u70B9\u5934\u793A\u610F"
      - "\u6447\u5934\u5426\u8BA4"
      - "\u8E59\u7709\u6DF1\u601D"
      - "\u6311\u7709\u8F7B\u7B11"
      - "\u95ED\u76EE\u517B\u795E"
      - "\u7741\u5927\u53CC\u773C"
      - "\u772F\u773C\u7EC6\u770B"
      - "\u4FA7\u8033\u503E\u542C"
      # --- \u624B\u90E8/\u80A2\u4F53\u52A8\u4F5C ---
      - "\u4F38\u624B\u89E6\u6478"
      - "\u6325\u624B\u544A\u522B"
      - "\u63E1\u624B\u8A00\u548C"
      - "\u62CD\u624B\u79F0\u5FEB"
      - "\u629A\u638C\u5927\u7B11"
      - "\u53CC\u624B\u5408\u5341"
      - "\u62F1\u624B\u4F5C\u63D6"
      - "\u53C9\u8170\u800C\u7ACB"
      - "\u62B1\u81C2\u65C1\u89C2"
      - "\u6413\u624B\u987F\u8DB3"
      # --- \u884C\u8D70/\u4F4D\u79FB\u52A8\u4F5C ---
      - "\u8F6C\u8EAB\u79BB\u53BB"
      - "\u8FC8\u6B65\u5411\u524D"
      - "\u540E\u9000\u4E00\u6B65"
      - "\u5927\u6B65\u6D41\u661F"
      - "\u6B65\u5C65\u8E52\u8DDA"
      - "\u8E09\u8E09\u8DC4\u8DC4"
      - "\u8DCC\u8DCC\u649E\u649E"
      - "\u6602\u9996\u9614\u6B65"
      - "\u8E51\u624B\u8E51\u811A"
      - "\u4E1C\u5012\u897F\u6B6A"
      # --- \u59FF\u6001/\u4F53\u6001\u52A8\u4F5C ---
      - "\u6B63\u895F\u5371\u5750"
      - "\u7FD8\u817F\u800C\u5750"
      - "\u501A\u5899\u800C\u7ACB"
      - "\u76D8\u817F\u800C\u5750"
      - "\u5E2D\u5730\u800C\u5750"
      - "\u633A\u76F4\u8170\u80CC"
      - "\u5F2F\u8170\u97A0\u8EAC"
      - "\u4F0F\u6848\u75BE\u4E66"
      - "\u63A9\u9762\u800C\u6CE3"
      - "\u6376\u80F8\u987F\u8DB3"
      # --- \u901A\u7528\u52A8\u4F5C\u8BCD\uFF08v2.6.2 \u8BED\u6599\u8BAD\u7EC3\u8865\u5145\uFF09---
      - "\u59FF\u52BF"
      - "\u624B\u6301"
      - "\u8EAB\u7740"
      - "\u7A7F\u6234"
      - "\u7AD9\u7ACB"
      - "\u5750\u59FF"
      - "\u52A8\u4F5C"
      - "\u80A2\u4F53"
      - "\u8EAB\u5F62"

  # ============================================================
  # 9. \u73AF\u5883\u6C1B\u56F4\u8BCD\u7EC4\uFF08v2.6.1 \u65B0\u589E\uFF09
  # \u8865\u5145 03 light_effect \u672A\u8986\u76D6\u7684\u6C1B\u56F4\u63CF\u5199\u8BCD\u7EC4
  # ============================================================

  atmosphere_phrase:
    cssClass: "dsl-light-word"
    priority: 41
    words:
      # --- \u5149\u5F71\u6C1B\u56F4 ---
      - "\u9633\u5149\u660E\u5A9A"
      - "\u70C8\u65E5\u5F53\u7A7A"
      - "\u661F\u5149\u7480\u74A8"
      - "\u6708\u8272\u6726\u80E7"
      - "\u6708\u534E\u5982\u6C34"
      - "\u65E5\u5149\u503E\u6D12"
      - "\u5149\u5F71\u6591\u9A73"
      - "\u6811\u5F71\u5A46\u5A11"
      - "\u6CE2\u5149\u7CBC\u7CBC"
      - "\u91D1\u5149\u95EA\u95EA"
      # --- \u96FE\u6C14/\u6C34\u6C7D\u6C1B\u56F4 ---
      - "\u96FE\u6C14\u5F25\u6F2B"
      - "\u70DF\u96FE\u7F2D\u7ED5"
      - "\u8584\u96FE\u7B3C\u7F69"
      - "\u70DF\u96E8\u6726\u80E7"
      - "\u9634\u96E8\u7EF5\u7EF5"
      - "\u7EC6\u96E8\u5982\u4E1D"
      - "\u96E8\u5E55\u4F4E\u5782"
      - "\u6C34\u6C7D\u6C24\u6C32"
      - "\u4E91\u96FE\u7FFB\u6D8C"
      - "\u6668\u96FE\u521D\u6563"
      # --- \u660E\u6697/\u8272\u8C03\u6C1B\u56F4 ---
      - "\u6F06\u9ED1\u4E00\u7247"
      - "\u660F\u6697\u5E7D\u6DF1"
      - "\u660E\u4EAE\u901A\u900F"
      - "\u5E7D\u5149\u95EA\u70C1"
      - "\u6696\u5149\u878D\u878D"
      - "\u51B7\u5149\u68EE\u68EE"
      - "\u70DB\u5149\u6447\u66F3"
      - "\u706B\u5149\u51B2\u5929"
      - "\u971E\u5149\u4E07\u4E08"
      - "\u66AE\u8272\u56DB\u5408"
      # --- \u89C6\u89C9\u8D28\u91CF/\u6C1B\u56F4\u8BCD\uFF08v2.6.2 \u8BED\u6599\u8BAD\u7EC3\u8865\u5145\uFF09---
      - "\u6E05\u6670"
      - "\u6E05\u6670\u53EF\u89C1"
      - "\u771F\u5B9E"
      - "\u771F\u5B9E\u6E05\u6670"
      - "\u5149\u7EBF"
      - "\u5149\u7EBF\u81EA\u7136"
      - "\u5149\u7EBF\u67D4\u548C"
      - "\u7B80\u6D01"
      - "\u6C1B\u56F4"
      - "\u6C1B\u56F4\u795E\u79D8"
      - "\u73B0\u4EE3"
      - "\u73B0\u4EE3\u79D1\u6280"
      - "\u5E72\u51C0"
      - "\u9AD8\u7EA7"
      - "\u9AD8\u7EA7\u68DA\u62CD"
      - "\u6E29\u6696"
      - "\u81EA\u7136\u5149"
      - "\u4E3B\u5149"
      - "\u8FB9\u7F18\u5149"
      - "\u4FA7\u5149"
      - "\u9876\u5149"
      - "\u9006\u5149"
      - "\u987A\u5149"
      - "\u6F2B\u5C04\u5149"
      - "\u73AF\u5883\u5149"
      - "\u6C1B\u56F4\u5149"
      - "\u5149\u5F71"
      - "\u9633\u5149"
      - "\u514B\u5236"
      - "\u660E\u4EAE"
      - "\u4E13\u4E1A"
      - "\u6696\u8272"
      - "\u51B7\u8272"
      - "\u79D1\u6280"
      - "\u8BF1\u4EBA"
      - "\u6CBB\u6108"
      - "\u5B81\u9759"
      - "\u6000\u65E7"

  # ============================================================
  # 10. \u65F6\u95F4\u8282\u4EE4\u8BCD\u7EC4\uFF08v2.6.1 \u65B0\u589E\uFF09
  # \u8865\u5145 03 narrative_term \u672A\u8986\u76D6\u7684\u65F6\u95F4\u8282\u4EE4\u642D\u914D
  # ============================================================

  time_season_phrase:
    cssClass: "dsl-narrative-term"
    priority: 41
    words:
      # --- \u65F6\u6BB5 ---
      - "\u6E05\u6668\u65F6\u5206"
      - "\u9ECE\u660E\u65F6\u5206"
      - "\u62C2\u6653\u65F6\u5206"
      - "\u6B63\u5348\u65F6\u5206"
      - "\u5348\u540E\u65F6\u5206"
      - "\u9EC4\u660F\u65F6\u5206"
      - "\u65E5\u843D\u65F6\u5206"
      - "\u508D\u665A\u65F6\u5206"
      - "\u5348\u591C\u65F6\u5206"
      - "\u6DF1\u591C\u65F6\u5206"
      # --- \u65F6\u8282 ---
      - "\u521D\u6625\u65F6\u8282"
      - "\u4EF2\u6625\u65F6\u8282"
      - "\u66AE\u6625\u65F6\u8282"
      - "\u76DB\u590F\u65F6\u8282"
      - "\u521D\u590F\u65F6\u8282"
      - "\u4EF2\u590F\u65F6\u8282"
      - "\u6DF1\u79CB\u65F6\u8282"
      - "\u521D\u79CB\u65F6\u8282"
      - "\u9686\u51AC\u65F6\u8282"
      - "\u4E25\u51AC\u65F6\u8282"
      # --- \u8282\u4EE4\u53D8\u5316 ---
      - "\u56DB\u5B63\u66F4\u66FF"
      - "\u663C\u591C\u4EA4\u66FF"
      - "\u6625\u53BB\u79CB\u6765"
      - "\u5BD2\u6765\u6691\u5F80"
      - "\u6597\u8F6C\u661F\u79FB"
      - "\u65E5\u590D\u4E00\u65E5"
      - "\u5E74\u590D\u4E00\u5E74"
      - "\u65F6\u5149\u834F\u82D2"
      - "\u5C81\u6708\u5982\u68AD"
      - "\u767D\u9A79\u8FC7\u9699"

  # ============================================================
  # 11. \u670D\u9970\u5986\u5BB9\u8BCD\u7EC4\uFF08v2.6.1 \u65B0\u589E\uFF09
  # \u8865\u5145 03 fashion_term \u672A\u8986\u76D6\u7684\u670D\u9970\u5986\u5BB9\u642D\u914D
  # ============================================================

  costume_makeup_phrase:
    cssClass: "dsl-fashion-term"
    priority: 40
    words:
      # --- \u670D\u9970\u98CE\u683C ---
      - "\u8863\u8882\u98D8\u98D8"
      - "\u8863\u51A0\u695A\u695A"
      - "\u73E0\u5149\u5B9D\u6C14"
      - "\u96CD\u5BB9\u534E\u8D35"
      - "\u6E05\u65B0\u8131\u4FD7"
      - "\u7AEF\u5E84\u79C0\u4E3D"
      - "\u98CE\u6D41\u501C\u50A5"
      - "\u7389\u6811\u4E34\u98CE"
      - "\u4EAD\u4EAD\u7389\u7ACB"
      - "\u695A\u695A\u52A8\u4EBA"
      # --- \u5986\u5BB9\u72B6\u6001 ---
      - "\u7D20\u989C\u6DE1\u5986"
      - "\u6D53\u5986\u8273\u62B9"
      - "\u7C89\u9EDB\u672A\u65BD"
      - "\u86FE\u7709\u6DE1\u626B"
      - "\u5507\u7EA2\u9F7F\u767D"
      - "\u9762\u82E5\u6843\u82B1"
      - "\u80A4\u82E5\u51DD\u8102"
      - "\u51B0\u808C\u7389\u9AA8"
      - "\u660E\u7738\u7693\u9F7F"
      - "\u7C89\u9762\u6843\u816E"
      # --- \u4EEA\u6001/\u5986\u626E ---
      - "\u62AB\u5934\u6563\u53D1"
      - "\u84EC\u5934\u57A2\u9762"
      - "\u8863\u886B\u8934\u891B"
      - "\u9526\u8863\u534E\u670D"
      - "\u5E03\u8863\u852C\u98DF"
      - "\u620E\u88C5\u5728\u8EAB"
      - "\u62AB\u575A\u6267\u9510"
      - "\u51E4\u51A0\u971E\u5E14"
      - "\u897F\u88C5\u9769\u5C65"
      - "\u957F\u888D\u9A6C\u8902"
      # --- \u6750\u8D28/\u54C1\u724C\uFF08v2.6.2 \u8BED\u6599\u8BAD\u7EC3\u8865\u5145\uFF09---
      - "\u6750\u8D28"
      - "\u54C1\u724C"
      - "\u6807\u7B7E"
      - "\u5305\u88C5"
      - "\u5546\u6807"
      - "\u7EB9\u7406"
      - "\u7A7F\u642D"
      - "\u73BB\u7483"
      - "\u91D1\u5C5E"
      - "\u670D\u88C5"
      - "\u914D\u9970"
      - "\u5305\u88C5\u76D2"
      - "\u54C1\u724C\u8272"
      - "\u6750\u8D28\u771F\u5B9E"
      - "\u6750\u8D28\u5FAE\u8DDD"
      - "\u670D\u88C5\u7EC6\u8282"
      - "\u73BB\u7483\u5E55\u5899"
      - "\u91D1\u5C5E\u914D\u4EF6"
      - "\u76AE\u8D28\u611F"
      - "\u5E03\u6599\u8936\u76B1"

  # ============================================================
  # 12. \u5546\u4E1A\u8BBE\u8BA1\u8BCD\u7EC4\uFF08v2.6.2 \u8BED\u6599\u8BAD\u7EC3\u65B0\u589E\uFF09
  # \u6536\u5F55\u7535\u5546/\u5C0F\u7EA2\u4E66/\u6D77\u62A5/\u5C01\u9762\u7B49\u5546\u4E1A\u8BBE\u8BA1\u573A\u666F\u7684\u9AD8\u9891\u6838\u5FC3\u8BCD
  # \u590D\u7528 dsl-tech-param \u914D\u8272\uFF0Cpriority 39
  # ============================================================

  style_genre_phrase:
    cssClass: "dsl-narrative-term"
    priority: 39
    words:
      # --- \u827A\u672F\u98CE\u683C ---
      - "\u5199\u5B9E"
      - "\u5199\u5B9E\u4EBA\u7269"
      - "\u5199\u5B9E\u98CE\u683C"
      - "\u5546\u4E1A"
      - "\u5546\u4E1A\u63D2\u753B"
      - "\u827A\u672F"
      - "\u6982\u5FF5"
      - "\u6982\u5FF5\u8BBE\u5B9A"
      - "\u6982\u5FF5\u8BBE\u5B9A\u56FE"
      - "\u8BBE\u5B9A"
      - "\u6781\u7B80"
      - "\u6241\u5E73"
      - "\u5361\u901A"
      - "\u5361\u901A\u89D2\u8272"
      - "\u4E8C\u6B21\u5143"
      - "\u52A8\u6F2B"
      - "\u56FD\u98CE"
      - "\u6C34\u58A8"
      - "\u6C34\u58A8\u56FD\u98CE"
      - "\u8D5B\u7490\u7490"
      - "\u7C89\u5F69"
      - "\u6CBB\u6108\u7CFB"
      - "\u7ED8\u672C"
      # --- \u6D41\u6D3E/\u4E3B\u9898 ---
      - "\u84B8\u6C7D\u670B\u514B"
      - "\u84B8\u6C7D\u670B\u514B\u573A\u666F"
      - "\u8D5B\u535A\u670B\u514B"
      - "\u8D5B\u535A\u670B\u514B\u573A\u666F"
      - "\u79D1\u5E7B"
      - "\u79D1\u5E7B\u573A\u666F"
      - "\u79D1\u5E7B\u673A\u7532"
      - "\u5947\u5E7B"
      - "\u5947\u5E7B\u4E16\u754C"
      - "\u672B\u65E5\u5E9F\u571F"
      - "\u7EF4\u591A\u5229\u4E9A"
      - "\u672A\u6765\u4E3B\u4E49"
      - "\u89E3\u6784\u4E3B\u4E49"
      - "\u5DE5\u4E1A\u8BBE\u8BA1"
      # --- \u6444\u5F71\u7C7B\u578B ---
      - "\u8857\u5934"
      - "\u8857\u5934\u4EBA\u50CF"
      - "\u8857\u5934\u5C0F\u5403"
      - "\u4EBA\u50CF"
      - "\u8096\u50CF"
      - "\u68DA\u62CD"
      - "\u5916\u62CD"
      - "\u7EAA\u5B9E"
      - "\u6781\u7B80\u5EFA\u7B51"
      - "\u6982\u5FF5\u5EFA\u7B51"
      # --- \u5149\u7EBF\u6280\u6CD5 ---
      - "\u4F26\u52C3\u6717\u5149"
      - "\u4E01\u8FBE\u5C14\u6548\u5E94"
      - "\u4E09\u70B9\u5E03\u5149"
      - "\u620F\u5267\u6027\u5149"

  # ============================================================
  # 14. \u6444\u5F71\u5668\u6750\u4E0E\u6280\u672F\u8BCD\u7EC4\uFF08v2.6.2 \u8BED\u6599\u8BAD\u7EC3\u65B0\u589E\uFF09
  # \u6536\u5F55\u955C\u5934/\u5668\u6750/\u6280\u672F\u53C2\u6570\u642D\u914D\u8BCD
  # \u590D\u7528 dsl-tech-param \u914D\u8272\uFF0Cpriority 39
  # ============================================================

`,mo=`# ============================================================
# 07c-camera-action-phrase.yaml
# \u8BCD\u7EC4\u8BCD\u5178\xB7\u955C\u5934\u8FD0\u52A8\uFF08v2.7.0 \u4ECE 07-word-lexicon.yaml \u62C6\u5206\uFF09
# ------------------------------------------------------------
# \u5305\u542B\u5206\u7EC4\uFF081 \u4E2A\uFF09\uFF1A
#   camera_action_phrase  (priority 44, dsl-camera-action)  \u955C\u5934\u8FD0\u52A8\u8BCD\u7EC4
# ============================================================

wordLexicon:

  camera_action_phrase:
    cssClass: "dsl-camera-action"
    priority: 44
    words:
      # --- \u901F\u5EA6\u4FEE\u9970 ---
      - "\u7F13\u63A8"
      - "\u6025\u63A8"
      - "\u731B\u63A8"
      - "\u7F13\u62C9"
      - "\u6025\u62C9"
      - "\u731B\u62C9"
      - "\u7F13\u6447"
      - "\u6025\u6447"
      - "\u5FEB\u7529"
      - "\u6162\u7529"
      # --- \u5E45\u5EA6\u4FEE\u9970 ---
      - "\u5FAE\u63A8"
      - "\u5FAE\u62C9"
      - "\u5FAE\u6447"
      - "\u5FAE\u79FB"
      - "\u5C0F\u5E45\u63A8"
      - "\u5C0F\u5E45\u62C9"
      - "\u5927\u5E45\u63A8"
      - "\u5927\u5E45\u62C9"
      # --- \u65B9\u5411\u4FEE\u9970 ---
      - "\u5DE6\u6447"
      - "\u53F3\u6447"
      - "\u4E0A\u6447"
      - "\u4E0B\u6447"
      - "\u5DE6\u79FB"
      - "\u53F3\u79FB"
      - "\u524D\u63A8"
      - "\u540E\u62C9"
      - "\u6A2A\u79FB"
      - "\u7EB5\u79FB"
      # --- \u590D\u5408\u8FD0\u52A8 ---
      - "\u73AF\u7ED5\u8DDF\u62CD"
      - "\u5F27\u5F62\u63A8\u79FB"
      - "\u87BA\u65CB\u4E0A\u5347"
      - "\u87BA\u65CB\u4E0B\u964D"
      - "\u5BF9\u89D2\u63A8\u79FB"
      - "\u4E4B\u5B57\u5F62\u79FB\u52A8"
      - "\u6CE2\u6D6A\u5F0F\u63A8\u8FDB"
      # --- \u8FD0\u955C\u72B6\u6001 ---
      - "\u624B\u6301\u8DDF\u62CD"
      - "\u7A33\u5B9A\u5668\u8DDF\u62CD"
      - "\u80A9\u625B\u8DDF\u62CD"
      - "\u80F8\u6258\u8DDF\u62CD"
      - "\u4F4E\u89D2\u5EA6\u8DDF\u62CD"
      - "\u9AD8\u89D2\u5EA6\u8DDF\u62CD"
      # --- \u590D\u5408\u8FD0\u52A8\uFF08v2.6.1 \u6269\u5C55\uFF09---
      - "\u7F13\u63A8\u6025\u62C9"
      - "\u6025\u63A8\u7F13\u62C9"
      - "\u5FEB\u901F\u6A2A\u79FB"
      - "\u7F13\u6162\u6A2A\u79FB"
      - "\u5FEB\u901F\u7EB5\u79FB"
      - "\u7F13\u6162\u7EB5\u79FB"
      - "\u5927\u5E45\u6447\u6444"
      - "\u5C0F\u5E45\u6447\u6444"
      - "\u8FDE\u7EED\u8DDF\u62CD"
      - "\u65AD\u7EED\u8DDF\u62CD"
      - "\u5300\u901F\u63A8\u8FDB"
      - "\u5300\u901F\u540E\u62C9"
      - "\u53D8\u901F\u63A8\u62C9"
      - "\u6025\u505C\u5B9A\u683C"
      - "\u7F13\u505C\u5B9A\u683C"
      - "\u5FEB\u901F\u53D8\u7126"
      - "\u7F13\u6162\u53D8\u7126"
      - "\u7126\u70B9\u8F6C\u6362"
      - "\u7126\u70B9\u62C9\u79FB"
      - "\u7126\u70B9\u7529\u52A8"
      # --- \u955C\u5934\u52A8\u8BCD\u642D\u914D\uFF08v2.6.1 \u5B9E\u6D4B\u8865\u5145\uFF09---
      - "\u9760\u8FD1\u4E3B\u4F53"
      - "\u62C9\u5F00\u89C6\u91CE"
      - "\u8DDF\u968F\u52A8\u4F5C"
      - "\u805A\u7126\u773C\u795E"
      - "\u5B8C\u6210\u8F6C\u573A"
      - "\u9501\u5B9A\u4E3B\u4F53"
      - "\u8FFD\u8E2A\u4E3B\u4F53"
      - "\u73AF\u7ED5\u4E3B\u4F53"
      - "\u63A8\u8FDB\u753B\u9762"
      - "\u62C9\u8FDC\u5168\u666F"

  # ============================================================
  # 6. \u60C5\u7EEA/\u8868\u6F14\u8BCD\u7EC4\uFF08\u8865\u5145 03 emotion_word/performance\uFF09
  # ============================================================

`,fo=`# ============================================================
# 07d-english-core-phrase.yaml
# \u8BCD\u7EC4\u8BCD\u5178\xB7\u82F1\u6587\u6838\u5FC3\u672F\u8BED\uFF08v2.7.0 \u4ECE 07-word-lexicon.yaml \u62C6\u5206\uFF09
# ------------------------------------------------------------
# \u5305\u542B\u5206\u7EC4\uFF0810 \u4E2A\uFF09\uFF1A
#   english_quality_phrase    (priority 47, dsl-tech-param)     \u8D28\u91CF\u4FEE\u9970\u8BCD
#   english_shot_phrase       (priority 44, dsl-camera-action)  \u955C\u5934\u666F\u522B
#   english_light_phrase      (priority 41, dsl-light-word)     \u5149\u5F71\u672F\u8BED
#   english_style_phrase      (priority 39, dsl-narrative-term) \u827A\u672F\u98CE\u683C
#   english_render_phrase     (priority 39, dsl-tech-param)     \u6E32\u67D3\u6280\u672F
#   english_material_phrase   (priority 39, dsl-tech-param)     \u6750\u8D28\u672F\u8BED
#   english_artist_phrase     (priority 39, dsl-narrative-term) \u827A\u672F\u5BB6
#   english_negative_phrase   (priority 48, dsl-constraint)     \u8D1F\u9762\u672F\u8BED
#   english_mj_param_phrase   (priority 46, dsl-param-key)      MJ \u53C2\u6570
#   english_prompt_eng_phrase (priority 45, dsl-cn-chapter)     \u63D0\u793A\u5DE5\u7A0B
# ============================================================

wordLexicon:

  english_quality_phrase:
    cssClass: "dsl-tech-param"
    priority: 47
    words:
      # --- \u753B\u8D28\u6838\u5FC3\u8BCD ---
      - "masterpiece"
      - "best quality"
      - "ultra detailed"
      - "highly detailed"
      - "intricate details"
      - "hyperdetailed"
      - "hyper-realistic"
      - "ultra-realistic"
      - "photorealistic"
      - "sharp focus"
      - "professional lighting"
      - "professional color grading"
      # --- \u5206\u8FA8\u7387\u4FEE\u9970 ---
      - "8k"
      - "4k"
      - "16k"
      - "absurdres"
      - "highres"
      - "8k resolution"
      - "absurd resolution"
      # --- \u6E32\u67D3\u6280\u672F ---
      - "ray tracing"
      - "global illumination"
      - "subsurface scattering"
      - "pbr"
      - "pbr materials"
      - "physically based rendering"
      - "ambient occlusion"
      - "tone mapping"
      - "hdr"
      - "hdri"
      - "high dynamic range"
      # --- \u8D34\u56FE\u4E0E\u6750\u8D28\u901A\u9053 ---
      - "normal map"
      - "displacement map"
      - "bump map"
      - "roughness map"
      - "metallic map"
      - "albedo"
      - "diffuse"
      - "specular"
      - "reflection"
      - "refraction"
      - "fresnel"
      - "caustics"
      # --- \u955C\u5934\u7279\u6548 ---
      - "depth of field"
      - "shallow depth of field"
      - "deep depth of field"
      - "bokeh"
      - "motion blur"
      - "lens flare"
      - "chromatic aberration"
      - "film grain"
      # --- \u5E73\u53F0\u6807\u7B7E ---
      - "trending on artstation"
      - "concept art"
      - "artstation winner"
      - "artstation hall of fame"
      - "artstation featured"
      - "artstation top"
      - "artstation trending"
      - "artstation popular"
      - "artstation pick of the day"
      - "behance featured"
      - "behance curated"
      - "awwwards winner"
      - "awwwards site of the day"
      # --- \u9AD8\u8D28\u91CF\u753B\u8D28\u8BCD\uFF08v2.6.4 \u56FD\u5916\u8BED\u6599\u6269\u5C55\uFF09---
      - "highest quality"
      - "ultra quality"
      - "premium quality"
      - "professional quality"
      - "studio quality"
      - "commercial quality"
      - "broadcast quality"
      - "cinema quality"
      - "theatrical quality"
      - "imax quality"
      - "ultra hd"
      - "uhd"
      - "super hd"
      - "full hd"
      - "4k uhd"
      - "8k uhd"
      - "4k hdr"
      - "8k hdr"
      - "hdr10"
      - "hdr10+"
      - "dolby vision"
      - "wide color gamut"
      - "deep color"
      - "10-bit color"
      - "12-bit color"
      - "16-bit color"
      - "high dynamic range"
      - "extended dynamic range"
      - "standard dynamic range"
      # --- \u6E32\u67D3\u6750\u8D28\u901A\u9053\uFF08v2.6.4 \u56FD\u5916\u8BED\u6599\u6269\u5C55\uFF09---
      - "transmission"
      - "absorption"
      - "scattering"
      - "occlusion"
      - "ambient occlusion"
      - "bloom"
      - "glow"
      - "glare"
      - "halation"
      - "iridescence"
      - "noise"
      - "dithering"
      - "posterization"
      - "banding"
      - "aliasing"
      - "moire"
      - "jaggies"
      - "edge enhancement"
      - "sharpening"
      - "blurring"
      - "gaussian blur"
      - "anti-aliasing"
      - "displacement"

  # ============================================================
  # 16. \u82F1\u6587\u955C\u5934\u666F\u522B\u8BCD\u7EC4\uFF08v2.6.3 \u56FD\u5916\u8BED\u6599\u8BAD\u7EC3\u65B0\u589E\uFF09
  # \u6536\u5F55 shot \u7C7B\u578B\u3001\u8FD0\u955C\u3001\u89C6\u89D2\u672F\u8BED
  # \u590D\u7528 dsl-camera-action \u914D\u8272\uFF0Cpriority 44
  # ============================================================

  english_shot_phrase:
    cssClass: "dsl-camera-action"
    priority: 44
    words:
      # --- \u666F\u522B ---
      - "extreme wide shot"
      - "wide shot"
      - "long shot"
      - "full shot"
      - "medium shot"
      - "medium close-up"
      - "close-up"
      - "extreme close-up"
      - "establishing shot"
      - "cowboy shot"
      - "american shot"
      - "italian shot"
      - "over the shoulder"
      # --- \u89C6\u89D2 ---
      - "point of view"
      - "pov"
      - "first person view"
      - "aerial view"
      - "bird's eye view"
      - "worm's eye view"
      - "high angle"
      - "low angle"
      - "dutch angle"
      - "canted angle"
      - "eye level"
      - "top-down"
      - "bottom-up"
      - "side view"
      - "front view"
      - "back view"
      - "three-quarter view"
      - "profile"
      # --- \u8FD0\u955C ---
      - "zoom in"
      - "zoom out"
      - "dolly in"
      - "dolly out"
      - "tracking shot"
      - "panning"
      - "tilting"
      - "rolling"
      - "crane shot"
      - "jib shot"
      - "steadicam"
      - "handheld"
      - "drone shot"
      - "helicopter shot"
      - "underwater"
      - "rack focus"
      - "pull focus"
      - "dolly zoom"
      # --- \u6444\u5F71\u53C2\u6570 ---
      - "focal length"
      - "aperture"
      - "f-stop"
      - "shutter speed"
      - "iso"
      - "exposure"
      - "white balance"
      - "color temperature"
      - "kelvin"
      - "hyperfocal distance"
      - "circle of confusion"
      # --- \u6784\u56FE\u6CD5\u5219\uFF08v2.6.4 \u56FD\u5916\u8BED\u6599\u6269\u5C55\uFF09---
      - "rule of thirds"
      - "golden ratio"
      - "golden spiral"
      - "fibonacci spiral"
      - "phi grid"
      - "leading lines"
      - "diagonal lines"
      - "converging lines"
      - "symmetrical composition"
      - "asymmetrical composition"
      - "balanced composition"
      - "centered composition"
      - "off-center composition"
      - "dynamic composition"
      - "static composition"
      # --- \u900F\u89C6\u6CD5 ---
      - "linear perspective"
      - "one-point perspective"
      - "two-point perspective"
      - "three-point perspective"
      - "four-point perspective"
      - "five-point perspective"
      - "aerial perspective"
      - "atmospheric perspective"
      - "isometric perspective"
      - "dimetric perspective"
      - "trimetric perspective"
      - "oblique projection"
      - "orthographic projection"
      # --- \u5168\u666F\u89C6\u89D2 ---
      - "panoramic view"
      - "360 degree view"
      - "spherical view"
      - "fisheye view"
      - "ultrawide view"
      - "macro view"
      - "micro view"
      - "telephoto view"
      - "wide-angle view"
      - "human eye view"
      - "top-down view"
      - "bottom-up view"
      # --- \u5C42\u6B21 ---
      - "foreground"
      - "middleground"
      - "background"
      - "depth layering"
      # --- \u5BF9\u7126\u6A21\u5F0F ---
      - "manual focus"
      - "auto focus"
      - "continuous focus"
      - "face detection"
      - "eye detection"
      - "subject tracking"
      - "zone focus"
      - "infinity focus"

  # ============================================================
  # 17. \u82F1\u6587\u5149\u5F71\u672F\u8BED\u8BCD\u7EC4\uFF08v2.6.3 \u56FD\u5916\u8BED\u6599\u8BAD\u7EC3\u65B0\u589E\uFF09
  # \u6536\u5F55 lighting/cinematic/golden hour \u7B49\u5149\u5F71\u8BCD
  # \u590D\u7528 dsl-light-word \u914D\u8272\uFF0Cpriority 41
  # ============================================================

  english_light_phrase:
    cssClass: "dsl-light-word"
    priority: 41
    words:
      # --- \u5149\u4F4D ---
      - "rim light"
      - "key light"
      - "fill light"
      - "back light"
      - "backlight"
      - "backlit"
      - "side light"
      - "top light"
      - "overhead lighting"
      - "practical lighting"
      # --- \u5149\u8D28 ---
      - "ambient lighting"
      - "natural lighting"
      - "artificial lighting"
      - "soft lighting"
      - "hard lighting"
      - "diffused lighting"
      - "directional lighting"
      # --- \u65F6\u6BB5\u5149 ---
      - "golden hour"
      - "blue hour"
      - "magic hour"
      - "sunset glow"
      - "sunrise"
      - "dawn"
      - "dusk"
      - "twilight"
      # --- \u7535\u5F71\u611F\u5149\u5F71 ---
      - "cinematic lighting"
      - "cinematic color grading"
      - "dramatic shadows"
      - "high contrast"
      - "low contrast"
      - "rembrandt lighting"
      - "three-point lighting"
      - "beauty dish"
      - "softbox"
      - "catchlight"
      # --- \u4F53\u79EF\u5149 ---
      - "volumetric lighting"
      - "volumetric fog"
      - "volumetric atmosphere"
      - "god rays"
      - "tyndall effect"
      - "crepuscular rays"
      - "atmospheric perspective"
      # --- \u6C1B\u56F4\u5149 ---
      - "neon noir"
      - "neon-drenched"
      - "amber-teal split"
      - "warm amber"
      - "cool teal"
      - "complementary color contrast"
      - "desolate atmosphere"
      - "tense atmosphere"
      - "noir mood"
      - "film noir style"

  # ============================================================
  # 18. \u82F1\u6587\u827A\u672F\u98CE\u683C\u8BCD\u7EC4\uFF08v2.6.3 \u56FD\u5916\u8BED\u6599\u8BAD\u7EC3\u65B0\u589E\uFF09
  # \u6536\u5F55 anime/cyberpunk/steampunk \u7B49\u98CE\u683C\u6D41\u6D3E
  # \u590D\u7528 dsl-narrative-term \u914D\u8272\uFF0Cpriority 39
  # ============================================================

  english_style_phrase:
    cssClass: "dsl-narrative-term"
    priority: 39
    words:
      # --- \u52A8\u6F2B\u98CE\u683C ---
      - "anime style"
      - "studio ghibli"
      - "pixar style"
      - "disney style"
      - "cel shading"
      - "manga"
      - "manhwa"
      - "webtoon"
      # --- \u7ED8\u753B\u5A92\u4ECB ---
      - "watercolor"
      - "oil painting"
      - "ink painting"
      - "sumi-e"
      - "ukiyo-e"
      - "matte painting"
      - "digital painting"
      - "digital art"
      - "illustration"
      - "concept art"
      - "character design"
      # --- \u827A\u672F\u6D41\u6D3E ---
      - "baroque"
      - "impressionism"
      - "surrealism"
      - "minimalism"
      - "art nouveau"
      - "art deco"
      - "bauhaus"
      - "pop art"
      - "expressionism"
      - "cubism"
      - "futurism"
      - "constructivism"
      - "deconstructivism"
      - "brutalism"
      # --- \u590D\u53E4\u4E0E\u50CF\u7D20 ---
      - "retro artstyle"
      - "pixel art"
      - "ascii art"
      - "vaporwave"
      - "synthwave"
      - "lofi"
      # --- \u79D1\u5E7B\u4E0E\u5947\u5E7B ---
      - "fantasy art"
      - "sci-fi art"
      - "dark fantasy"
      - "gothic"
      - "steampunk"
      - "cyberpunk"
      - "dieselpunk"
      - "biopunk"
      - "post apocalyptic"
      # --- 3D \u98CE\u683C ---
      - "3d render"
      - "isometric"
      - "low poly"
      - "voxel"
      - "comic book style"
      # --- \u52A8\u6F2B\u5DE5\u4F5C\u5BA4\u4E0E\u5BFC\u6F14\uFF08v2.6.4 \u56FD\u5916\u8BED\u6599\u6269\u5C55\uFF09---
      - "dreamworks style"
      - "otomo katsuhiro"
      - "akira toriyama"
      - "hayao miyazaki"
      - "ghibli"
      # --- \u827A\u672F\u6D41\u6D3E\u6269\u5C55 ---
      - "romanticism"
      - "realism"
      - "neoclassicism"
      - "rococo"
      - "mannerism"
      - "byzantine"
      - "gothic art"
      - "renaissance"
      - "mannerism"
      - "pre-raphaelite"
      - "post-impressionism"
      - "neo-impressionism"
      - "pointillism"
      - "fauvism"
      - "dadaism"
      - "suprematism"
      - "de stijl"
      - "fluxus"
      - "kinetic art"
      - "op art"
      - "outsider art"
      - "naive art"
      - "folk art"
      - "street art"
      - "graffiti art"
      - "sticker art"
      - "paste-up art"
      - "mural art"
      # --- \u5A92\u4ECB\u6269\u5C55 ---
      - "gouache"
      - "acrylic"
      - "tempera"
      - "fresco"
      - "encaustic"
      - "pastel"
      - "charcoal"
      - "pencil sketch"
      - "pen and ink"
      - "etching"
      - "lithograph"
      - "woodcut"
      - "screen print"
      - "linocut"
      - "collage"
      - "mixed media"
      - "assemblage"
      - "installation art"
      - "performance art"
      - "video art"
      - "new media art"
      - "digital illustration"
      - "vector art"
      - "fractal art"
      - "generative art"
      - "algorithmic art"
      - "glitch art"
      - "datamoshing"
      - "circuit bending"
      # --- \u65F6\u5C1A\u6444\u5F71\u98CE\u683C ---
      - "fashion editorial"
      - "beauty photography"
      - "editorial portrait"
      - "fashion portrait"
      - "beauty portrait"
      - "glamour shot"
      - "fashion photography"
      # --- \u590D\u53E4\u4E0E\u73B0\u4EE3 ---
      - "vintage look"
      - "retro look"
      - "analog film"
      - "toy camera effect"
      - "diorama effect"
      - "miniature effect"
      - "lomography"

  # ============================================================
  # 19. \u82F1\u6587\u6E32\u67D3\u5F15\u64CE\u8BCD\u7EC4\uFF08v2.6.3 \u56FD\u5916\u8BED\u6599\u8BAD\u7EC3\u65B0\u589E\uFF09
  # \u6536\u5F55 octane/unreal/blender \u7B49\u6E32\u67D3\u5668\u4E0E\u8F6F\u4EF6\u540D
  # \u590D\u7528 dsl-tech-param \u914D\u8272\uFF0Cpriority 46
  # ============================================================

  english_render_phrase:
    cssClass: "dsl-tech-param"
    priority: 46
    words:
      # --- \u6E32\u67D3\u5668 ---
      - "octane render"
      - "redshift"
      - "arnold"
      - "vray"
      - "v-ray"
      - "cycles"
      - "eevee"
      - "renderman"
      - "keyshot"
      - "marmoset toolbag"
      # --- 3D \u8F6F\u4EF6 ---
      - "blender"
      - "maya"
      - "3ds max"
      - "cinema 4d"
      - "c4d"
      - "houdini"
      - "zbrush"
      - "substance painter"
      - "substance designer"
      - "mari"
      - "mudbox"
      - "katana"
      - "nuke"
      # --- \u6E38\u620F\u5F15\u64CE ---
      - "unreal engine"
      - "unreal engine 5"
      - "unity"
      - "godot"
      - "cryengine"
      # --- \u56FE\u5F62 API ---
      - "webgl"
      - "opengl"
      - "vulkan"
      - "directx"
      - "metal"
      - "cuda"
      - "optix"
      - "rtx"
      - "dxr"
      # --- \u6E32\u67D3\u6280\u672F ---
      - "raytracing"
      - "pathtracing"
      - "real-time rendering"
      - "denoising"
      - "dlss"
      - "fsr"
      - "xess"
      # --- \u6E32\u67D3\u5668\u4E0E\u540E\u671F\u8F6F\u4EF6\uFF08v2.6.4 \u56FD\u5916\u8BED\u6599\u6269\u5C55\uFF09---
      - "redshift render"
      - "arnold render"
      - "v-ray render"
      - "corona render"
      - "cycles render"
      - "eevee render"
      - "luxcore render"
      - "mitsuba render"
      - "unreal engine 5"
      - "unity 2022"
      - "godot engine"
      - "source engine"
      - "blender cycles"
      - "blender eevee"
      - "marvelous designer"
      - "modo"
      - "lightwave"
      - "softimage"
      - "after effects"
      - "premiere pro"
      - "davinci resolve"
      - "fusion"
      - "houdini fx"
      - "realflow"
      - "phoenix fd"
      - "fumefx"
      - "thinking particles"
      - "x-particles"
      - "tyflow"
      - "bifrost"
      - "particle flow"
      # --- \u7F16\u7801\u4E0E\u538B\u7F29 ---
      - "redcode"
      - "prores"
      - "prores 4444"
      - "prores 422"
      - "prores 422 hq"
      - "prores 422 lt"
      - "prores 422 proxy"
      - "dnxhr"
      - "h.264"
      - "h.265"
      - "av1"
      - "vp9"
      - "vp8"

  # ============================================================
  # 20. \u82F1\u6587\u6750\u8D28\u8BCD\u7EC4\uFF08v2.6.3 \u56FD\u5916\u8BED\u6599\u8BAD\u7EC3\u65B0\u589E\uFF09
  # \u6536\u5F55 velvet/metallic/marble \u7B49\u6750\u8D28\u672F\u8BED
  # \u590D\u7528 dsl-tech-param \u914D\u8272\uFF0Cpriority 39
  # ============================================================

  english_material_phrase:
    cssClass: "dsl-tech-param"
    priority: 39
    words:
      # --- \u89C6\u89C9\u5C5E\u6027 ---
      - "velvet"
      - "metallic"
      - "translucent"
      - "glowing"
      - "iridescent"
      - "holographic"
      - "glossy"
      - "matte"
      - "rough"
      - "smooth"
      - "bumpy"
      - "porous"
      - "crystalline"
      - "glassy"
      # --- \u7EC7\u7269 ---
      - "fabric"
      - "silk"
      - "cotton"
      - "linen"
      - "wool"
      - "denim"
      - "leather"
      - "fur"
      - "feather"
      - "satin"
      - "lace"
      - "chiffon"
      - "taffeta"
      - "organza"
      - "tulle"
      - "cashmere"
      - "tweed"
      - "flannel"
      - "corduroy"
      - "canvas"
      - "fleece"
      - "felt"
      - "suede"
      - "pleather"
      - "pvc"
      - "latex"
      - "rubber"
      - "neoprene"
      - "spandex"
      - "nylon"
      - "polyester"
      # --- \u91D1\u5C5E ---
      - "metal"
      - "steel"
      - "iron"
      - "copper"
      - "brass"
      - "bronze"
      - "gold"
      - "silver"
      - "platinum"
      - "titanium"
      - "aluminum"
      - "chrome"
      - "nickel"
      # --- \u6728\u6750 ---
      - "wooden"
      - "oak"
      - "pine"
      - "cedar"
      - "mahogany"
      - "walnut"
      - "cherry"
      - "maple"
      - "birch"
      - "beech"
      - "teak"
      - "rosewood"
      - "sandalwood"
      - "ebony"
      - "bamboo"
      - "rattan"
      - "wicker"
      # --- \u77F3\u6750\u4E0E\u9676\u74F7 ---
      - "stone"
      - "marble"
      - "granite"
      - "sandstone"
      - "concrete"
      - "brick"
      - "slate"
      - "limestone"
      - "ceramic"
      - "porcelain"
      - "clay"
      - "terracotta"
      # --- \u5176\u4ED6 ---
      - "plastic"
      - "silicone"
      - "paper"
      - "cardboard"
      - "parchment"
      - "vellum"
      - "wax"
      - "glass"
      - "crystal"
      - "ivory"
      - "bone"
      - "horn"
      - "shell"
      - "coral"
      - "pearl"
      - "jade"
      - "turquoise"
      - "quartz"
      - "diamond"
      - "ruby"
      - "sapphire"
      - "emerald"
      - "topaz"
      - "opal"

  # ============================================================
  # 21. \u82F1\u6587\u827A\u672F\u5BB6\u53C2\u8003\u8BCD\u7EC4\uFF08v2.6.3 \u56FD\u5916\u8BED\u6599\u8BAD\u7EC3\u65B0\u589E\uFF09
  # \u6536\u5F55 greg rutkowski/artgerm/wlop \u7B49\u827A\u672F\u5BB6\u540D
  # \u590D\u7528 dsl-narrative-term \u914D\u8272\uFF0Cpriority 38
  # ============================================================

  english_artist_phrase:
    cssClass: "dsl-narrative-term"
    priority: 38
    words:
      # --- \u77E5\u540D\u6570\u5B57\u827A\u672F\u5BB6 ---
      - "greg rutkowski"
      - "alphonse mucha"
      - "artgerm"
      - "stanley artgerm lau"
      - "wlop"
      - "rossdraws"
      - "ross tran"
      - "makoto shinkai"
      - "studio ghibli"
      - "james jean"
      - "andrei riabovitchev"
      - "marc simonetti"
      - "sakimi chan"
      - "donato giancola"
      - "greg manchess"
      - "craig mullins"
      - "kilian eng"
      - "jake parker"
      - "syd mead"
      - "luis royo"
      - "masamune shirow"
      - "kuvshinov"
      - "peter mohrbacher"
      - "joseph christian leyendecker"
      - "drew struzan"
      - "ilya kuvshinov"
      - "ruan jia"
      - "huang guangjian"
      - "gil elvgren"
      - "sachin teng"
      - "thomas kinkade"
      # --- \u53E4\u5178\u5927\u5E08 ---
      - "van gogh"
      - "picasso"
      - "monet"
      - "rembrandt"
      - "davinci"
      - "da vinci"
      - "michelangelo"
      - "raphael"
      - "vermeer"
      - "caravaggio"
      # --- \u53E4\u5178\u5927\u5E08\u6269\u5C55\uFF08v2.6.4 \u56FD\u5916\u8BED\u6599\u6269\u5C55\uFF09---
      - "h.r. giger"
      - "zdzislaw beksinski"
      - "frank frazetta"
      - "moebius"
      - "jean giraud"
      - "frank miller"
      - "mike mignola"
      - "todd mcfarlane"
      - "jim lee"
      - "frank cho"
      - "adam hughes"
      - "alex ross"
      - "norman rockwell"
      - "n.c. wyeth"
      - "maxfield parrish"
      - "gustav klimt"
      - "alfons mucha"
      - "aubrey beardsley"
      - "edward burne-jones"
      - "dante gabriel rossetti"
      - "john everett millais"
      - "william holman hunt"
      - "john william waterhouse"
      - "lawrence alma-tadema"
      - "frederic leighton"
      - "albert moore"
      - "john singer sargent"
      - "joaquin sorolla"
      - "anders zorn"
      - "peder sever kroyer"
      - "edward hopper"
      - "andrew wyeth"
      - "jamie wyeth"
      - "newell convers wyeth"
      - "howard pyle"
      - "jc leyendecker"
      # --- "by" \u524D\u7F00\u827A\u672F\u5BB6 ---
      - "by greg rutkowski"
      - "by alphonse mucha"
      - "by artgerm"
      - "by wlop"
      - "by rossdraws"
      - "by stanley artgerm lau"
      - "by james jean"
      - "by andrei riabovitchev"
      - "by marc simonetti"
      - "by sakimi chan"
      - "by donato giancola"
      - "by greg manchess"
      - "by craig mullins"
      - "by kilian eng"
      - "by jake parker"
      - "by syd mead"
      - "by luis royo"
      - "by masamune shirow"
      - "by kuvshinov"
      - "by alena kopera"
      - "by peter mohrbacher"
      - "by joseph christian leyendecker"
      - "by drew struzan"
      - "by ilya kuvshinov"
      - "by ruan jia"
      - "by huang guangjian"
      - "by gil elvgren"
      - "by sachin teng"
      - "by thomas kinkade"
      - "by makoto shinkai"
      - "by studio ghibli"
      - "by pixar"
      - "by disney"

  # ============================================================
  # 22. \u82F1\u6587\u8D1F\u9762\u63D0\u793A\u8BCD\u7EC4\uFF08v2.6.3 \u56FD\u5916\u8BED\u6599\u8BAD\u7EC3\u65B0\u589E\uFF09
  # \u6536\u5F55 worst quality/deformed/blurry \u7B49\u8D1F\u9762\u8BCD
  # \u590D\u7528 dsl-constraint \u914D\u8272\uFF0Cpriority 48
  # ============================================================

  english_negative_phrase:
    cssClass: "dsl-constraint"
    priority: 48
    words:
      # --- \u753B\u8D28\u8D1F\u9762 ---
      - "worst quality"
      - "low quality"
      - "normal quality"
      - "lowres"
      - "jpeg artifacts"
      - "blurry"
      - "text"
      - "error"
      - "cropped"
      # --- \u4EBA\u4F53\u7ED3\u6784\u8D1F\u9762 ---
      - "deformed"
      - "distorted"
      - "disfigured"
      - "poorly drawn"
      - "bad anatomy"
      - "wrong anatomy"
      - "extra limb"
      - "missing limb"
      - "floating limbs"
      - "mutated hands"
      - "mutated fingers"
      - "disconnected limbs"
      - "mutation"
      - "mutated"
      - "ugly"
      - "disgusting"
      - "amputation"
      - "bad face"
      - "bad hands"
      - "missing fingers"
      - "extra fingers"
      - "fused fingers"
      - "too many fingers"
      - "malformed limbs"
      - "extra arms"
      - "extra legs"
      - "long neck"
      - "cloned face"
      - "fused face"
      # --- \u98CE\u683C\u9694\u79BB\u8D1F\u9762 ---
      - "cartoon"
      - "anime"
      - "3d"
      - "render"
      - "drawing"
      - "sketch"
      - "illustration"
      - "painting"
      - "monochrome"
      - "grayscale"
      - "flat color"
      - "photorealistic"
      - "photograph"
      - "realistic photo"
      - "dslr"
      - "bokeh"
      - "film grain"
      - "studio lighting"
      # --- \u5185\u5BB9\u9694\u79BB\u8D1F\u9762 ---
      - "letters"
      - "words"
      - "logo"
      - "signature"
      - "watermark"
      - "chart"
      - "graph"
      - "diagram"
      - "map"
      - "nsfw"
      # --- \u5D4C\u5165\u5411\u91CF\u8D1F\u9762 ---
      - "easynegative"
      - "ng_deepnegative_v1_75t"
      - "bad_prompt_version2"
      - "bad-hands-5"
      - "bad-artist-anime"
      - "bad-image-v2-39000"
      - "bad_quality"
      - "verybadimagenegative_v1"
      - "vile_prompt3"

  # ============================================================
  # 23. \u82F1\u6587 Midjourney \u53C2\u6570\u8BCD\u7EC4\uFF08v2.6.3 \u56FD\u5916\u8BED\u6599\u8BAD\u7EC3\u65B0\u589E\uFF09
  # \u6536\u5F55 --ar/--v/--seed \u7B49 MJ \u53C2\u6570
  # \u590D\u7528 dsl-param-key \u914D\u8272\uFF0Cpriority 46
  # ============================================================

  english_mj_param_phrase:
    cssClass: "dsl-param-key"
    priority: 46
    words:
      - "--ar"
      - "--ar 16:9"
      - "--ar 21:9"
      - "--ar 2:3"
      - "--ar 9:16"
      - "--ar 1:1"
      - "--ar 4:3"
      - "--ar 3:2"
      - "--ar 3:4"
      - "--c"
      - "--chaos"
      - "--q"
      - "--quality"
      - "--r"
      - "--repeat"
      - "--seed"
      - "--s"
      - "--stylize"
      - "--w"
      - "--weird"
      - "--tile"
      - "--niji"
      - "--v"
      - "--v 6"
      - "--v 6.1"
      - "--v 6.2"
      - "--v 7"
      - "--v 7.0"
      - "--fast"
      - "--turbo"
      - "--relax"
      - "--raw"
      - "--style raw"
      - "--style cute"
      - "--style scenic"
      - "--style expressive"
      - "--draft"
      - "--no"
      - "--iw"
      - "--sref"
      - "--oref"
      - "--cref"
      - "--cw"
      - "--ss"
      - "--sv"
      - "--p"
      - "--profile"
      - "--stealth"
      - "--public"
      - "--video"

  # ============================================================
  # 24. \u82F1\u6587\u63D0\u793A\u8BCD\u5DE5\u7A0B\u8BCD\u7EC4\uFF08v2.6.3 \u56FD\u5916\u8BED\u6599\u8BAD\u7EC3\u65B0\u589E\uFF09
  # \u6536\u5F55 lora/controlnet/cfg scale \u7B49\u5DE5\u7A0B\u672F\u8BED
  # \u590D\u7528 dsl-tech-param \u914D\u8272\uFF0Cpriority 46
  # ============================================================

  english_prompt_eng_phrase:
    cssClass: "dsl-tech-param"
    priority: 46
    words:
      # --- \u6743\u91CD\u4E0E\u8BED\u6CD5 ---
      - "prompt weighting"
      - "BREAK"
      - "AND"
      - "AT STEP"
      - "alternating sampling"
      - "dynamic prompt"
      - "wildcard"
      # --- \u6A21\u578B\u4E0E\u5FAE\u8C03 ---
      - "embedding"
      - "textual inversion"
      - "hypernetwork"
      - "lora"
      - "lyco"
      - "checkpoint"
      - "vae"
      - "dreambooth"
      - "locon"
      - "lokr"
      - "loha"
      - "dylora"
      - "ia3"
      # --- ControlNet ---
      - "controlnet"
      - "openpose"
      - "canny edge"
      - "depth map"
      - "lineart"
      - "softedge"
      - "scribble"
      - "mlsd"
      - "normal map"
      - "segmentation"
      - "tile"
      - "ip-adapter"
      - "reference only"
      - "t2i adapter"
      - "instruct pix2pix"
      # --- \u91C7\u6837\u53C2\u6570 ---
      - "steps"
      - "sampler"
      - "cfg scale"
      - "denoising strength"
      - "clip skip"
      - "ensd"
      - "eta"
      # --- \u9AD8\u6E05\u4FEE\u590D ---
      - "highres fix"
      - "upscale"
      - "latent upscale"
      - "tiling diffusion"
      - "multidiffusion"
      - "regional prompter"
      - "latent couple"
      # --- \u6A21\u578B\u683C\u5F0F ---
      - "safetensors"
      - "ckpt"
      - "pruned"
      - "fp16"
      - "fp32"
      - "bf16"
      - "fp8"
      # --- \u52A0\u901F\u540E\u7AEF ---
      - "cuda"
      - "optix"
      - "rtx"
      - "dlss"
      - "fsr"
      - "xess"

  # ============================================================
  # 25. \u82F1\u6587\u6444\u5F71\u5668\u6750\u8BCD\u7EC4\uFF08v2.6.3 \u56FD\u5916\u8BED\u6599\u8BAD\u7EC3\u65B0\u589E\uFF09
  # \u6536\u5F55\u76F8\u673A\u578B\u53F7\u3001\u955C\u5934\u54C1\u724C\u3001\u5E03\u5149\u5668\u6750
  # \u590D\u7528 dsl-tech-param \u914D\u8272\uFF0Cpriority 45
  # ============================================================

`,yo=`# ============================================================
# 07e-english-extended-phrase.yaml
# \u8BCD\u7EC4\u8BCD\u5178\xB7\u82F1\u6587\u6269\u5C55\u672F\u8BED\uFF08v2.7.0 \u4ECE 07-word-lexicon.yaml \u62C6\u5206\uFF09
# ------------------------------------------------------------
# \u5305\u542B\u5206\u7EC4\uFF089 \u4E2A\uFF09\uFF1A
#   english_photo_gear_phrase            (priority 47, dsl-tech-param)     \u6444\u5F71\u5668\u6750
#   english_color_grading_phrase         (priority 46, dsl-tech-param)     \u8C03\u8272\u672F\u8BED
#   english_lens_effect_phrase           (priority 45, dsl-tech-param)     \u955C\u5934\u7279\u6548
#   english_mood_phrase                  (priority 43, dsl-emotion-word)   \u60C5\u7EEA\u6C1B\u56F4
#   english_composition_extended_phrase  (priority 42, dsl-narrative-term) \u6784\u56FE\u6269\u5C55
#   english_style_extended_phrase        (priority 39, dsl-narrative-term) \u98CE\u683C\u6269\u5C55
#   english_render_extended_phrase       (priority 39, dsl-tech-param)     \u6E32\u67D3\u6269\u5C55
#   english_material_extended_phrase     (priority 39, dsl-tech-param)     \u6750\u8D28\u6269\u5C55
#   english_vfx_extended_phrase          (priority 39, dsl-tech-param)     VFX \u6269\u5C55
# ============================================================

wordLexicon:

  english_photo_gear_phrase:
    cssClass: "dsl-tech-param"
    priority: 45
    words:
      # --- \u76F8\u673A\u54C1\u724C ---
      - "canon"
      - "nikon"
      - "sony"
      - "fujifilm"
      - "leica"
      - "hasselblad"
      - "phase one"
      - "pentax"
      - "olympus"
      - "panasonic"
      # --- \u76F8\u673A\u578B\u53F7 ---
      - "canon eos r5"
      - "canon eos r6"
      - "sony a7"
      - "sony a7iv"
      - "nikon z9"
      - "fujifilm x-t5"
      # --- \u7535\u5F71\u673A ---
      - "arri alexa mini"
      - "red weapon dragon"
      - "sony cinealta f65"
      - "arri"
      - "arriraw"
      - "redcode raw"
      # --- \u955C\u5934\u54C1\u724C ---
      - "zeiss"
      - "zeiss master prime"
      - "panavision"
      - "panavision g series"
      - "panavision primo prime"
      - "sigma art"
      - "tamron"
      - "tokina"
      # --- \u955C\u5934\u53C2\u6570 ---
      - "35mm"
      - "50mm"
      - "85mm"
      - "135mm"
      - "16-35mm"
      - "24-70mm"
      - "70-200mm"
      - "anamorphic"
      - "anamorphic lens"
      - "f/1.2"
      - "f/1.4"
      - "f/2.8"
      - "f/4"
      - "f/8"
      - "f/11"
      # --- \u5E03\u5149\u5668\u6750 ---
      - "softbox"
      - "octabox"
      - "beauty dish"
      - "snoot"
      - "grid"
      - "reflector"
      - "diffuser"
      - "filter"
      - "nd filter"
      - "cpl"
      - "polarizer"
      - "hotshoe"
      - "flash"
      - "strobe"
      - "trigger"
      - "light stand"
      - "boom arm"
      - "c-stand"
      # --- \u80F6\u7247\u7C7B\u578B\uFF08v2.6.4 \u56FD\u5916\u8BED\u6599\u6269\u5C55\uFF09---
      - "kodak portra"
      - "fuji velvia"
      - "ilford hp5"
      - "cinestill 800t"
      - "kodak vision3"
      - "kodak ektar"
      - "kodak gold"
      - "fuji superia"
      - "agfa vista"
      - "lomography color"
      - "black and white film"
      - "sepia tone"
      - "cyanotype"
      - "platinum print"
      - "silver gelatin"
      - "wet plate"
      - "daguerreotype"
      - "calotype"
      - "tintype"
      - "ambrotype"
      # --- \u753B\u5E45 ---
      - "35mm film"
      - "120 film"
      - "4x5 large format"
      - "8x10 large format"
      - "instant film"
      - "holga"
      - "diana"
      - "medium format camera"
      - "large format camera"
      # --- \u955C\u5934\u7C7B\u578B ---
      - "tilt-shift lens"
      - "fisheye lens"
      - "wide angle lens"
      - "telephoto lens"
      - "macro lens"
      - "prime lens"
      - "zoom lens"
      - "fast lens"
      - "slow lens"
      - "full frame"
      - "aps-c"
      - "micro four thirds"
      # --- \u6444\u5F71\u98CE\u683C ---
      - "fashion editorial photography"
      - "beauty photography"
      - "editorial portrait"
      - "fashion portrait"
      - "beauty portrait"
      - "glamour shot"
      - "polaroid"
      - "polaroid camera"
      - "double eyelid"
      - "sony a7iii"
      - "high quality portrait"
      - "professional female model"
      - "shot on hasselblad"

# ============================================================
# 24. \u82F1\u6587\u8C03\u8272\u4E0E\u8272\u5F69\u79D1\u5B66\u8BCD\u7EC4\uFF08v2.6.4 \u56FD\u5916\u8BED\u6599\u6269\u5C55\u65B0\u589E\uFF09
# \u6536\u5F55 cinematic color grading/orange and teal \u7B49\u8C03\u8272\u8BCD
# \u590D\u7528 dsl-tech-param \u914D\u8272\uFF0Cpriority 46
# ============================================================

  english_color_grading_phrase:
    cssClass: "dsl-tech-param"
    priority: 46
    words:
      # --- \u7535\u5F71\u8C03\u8272 ---
      - "cinematic color grading"
      - "amber-teal split"
      - "warm amber key light"
      - "cool teal fill light"
      - "complementary color contrast"
      - "cinematic color separation"
      - "orange and teal"
      - "blockbuster look"
      - "hollywood look"
      - "netflix look"
      - "music video look"
      - "commercial look"
      - "fashion look"
      - "beauty look"
      - "product look"
      - "automotive look"
      - "food look"
      - "interior look"
      - "architectural look"
      - "travel look"
      - "documentary look"
      - "wedding look"
      - "portrait look"
      - "landscape look"
      # --- \u8272\u5F69\u5904\u7406 ---
      - "black and white"
      - "high contrast black and white"
      - "low contrast black and white"
      - "sepia"
      - "vintage color"
      - "faded color"
      - "desaturated"
      - "hyper saturated"
      - "pastel"
      - "monochrome"
      - "duotone"
      - "tritone"
      - "quadtone"
      - "split toning"
      - "color balance"
      - "color harmony"
      - "color theory"
      - "complementary colors"
      - "analogous colors"
      - "triadic colors"
      - "tetradic colors"
      - "monochromatic colors"
      - "warm colors"
      - "cool colors"
      - "neutral colors"
      - "earth tones"
      - "jewel tones"
      - "pastel colors"
      - "neon colors"
      - "vibrant colors"
      - "muted colors"
      - "subtle colors"
      - "rich colors"
      - "deep colors"
      # --- \u8272\u5F69\u79D1\u5B66 ---
      - "primary colors"
      - "secondary colors"
      - "tertiary colors"
      - "rgb"
      - "cmyk"
      - "hsl"
      - "hsv"
      - "lab"
      - "xyz"
      - "yuv"
      - "ycbcr"
      - "srgb"
      - "adobe rgb"
      - "dci-p3"
      - "rec.709"
      - "rec.2020"
      - "prophoto rgb"
      - "wide gamut"
      - "narrow gamut"
      - "color space"
      - "color profile"
      - "icc profile"
      - "color management"
      - "color calibration"
      - "color accuracy"
      - "color reproduction"
      - "color fidelity"
      - "color gamut"
      - "color depth"
      - "8-bit color"
      - "10-bit color"
      - "12-bit color"
      - "14-bit color"
      - "16-bit color"
      - "32-bit color"
      - "hdr"
      - "sdr"
      - "pq"
      - "hlg"
      - "dolby vision"
      - "hdr10"
      - "hdr10+"
      - "dolby atmos"
      # --- Log \u66F2\u7EBF ---
      - "log"
      - "s-log"
      - "s-log3"
      - "c-log"
      - "c-log2"
      - "c-log3"
      - "v-log"
      - "n-log"

# ============================================================
# 25. \u82F1\u6587\u955C\u5934\u5149\u6655\u4E0E\u7279\u6548\u8BCD\u7EC4\uFF08v2.6.4 \u56FD\u5916\u8BED\u6599\u6269\u5C55\u65B0\u589E\uFF09
# \u6536\u5F55 lens flare/anamorphic flare/bloom \u7B49\u7279\u6548\u672F\u8BED
# \u590D\u7528 dsl-light-word \u914D\u8272\uFF0Cpriority 40
# ============================================================

  english_lens_effect_phrase:
    cssClass: "dsl-light-word"
    priority: 40
    words:
      # --- \u955C\u5934\u5149\u6655 ---
      - "lens flare"
      - "anamorphic flare"
      - "horizontal flare"
      - "blue streak"
      - "blue streak flare"
      - "star burst"
      - "sun flare"
      - "light leak"
      - "film burn"
      - "light bleed"
      # --- \u540E\u671F\u7279\u6548 ---
      - "bloom"
      - "glow"
      - "glare"
      - "halation"
      - "iridescence"
      - "chromatic aberration"
      - "purple fringing"
      - "spherical aberration"
      - "coma"
      - "distortion"
      - "vignette"
      - "dark corners"
      - "grain"
      - "noise"
      - "dithering"
      - "posterization"
      - "banding"
      - "aliasing"
      - "moire"
      - "jaggies"
      - "stair-stepping"
      - "edge enhancement"
      - "sharpening"
      - "blurring"
      - "gaussian blur"
      - "motion blur"
      - "radial blur"
      - "zoom blur"
      - "tilt-shift blur"
      # --- \u666F\u6DF1\u7279\u6548 ---
      - "depth of field"
      - "bokeh"
      - "circle of confusion"
      - "depth blur"
      - "background blur"
      - "foreground blur"
      - "tilt blur"
      - "shift blur"
      - "swing blur"
      - "rack focus"
      - "pull focus"
      - "follow focus"
      - "manual focus"
      - "auto focus"
      - "continuous focus"
      - "single focus"
      - "touch focus"
      - "face detection"
      - "eye detection"
      - "subject tracking"
      - "zone focus"
      - "hyperfocal"
      - "infinity focus"
      - "close focus"
      - "minimum focus distance"
      # --- \u6563\u666F\u7C7B\u578B ---
      - "creamy bokeh"
      - "swirly bokeh"
      - "busy bokeh"
      - "smooth bokeh"
      - "circular bokeh"
      - "hexagonal bokeh"
      - "octagonal bokeh"
      - "specular highlights"
      - "catchlights"
      - "starburst effect"
      # --- \u66DD\u5149\u6280\u6CD5 ---
      - "double exposure"
      - "multiple exposure"
      - "long exposure"
      - "time lapse"
      - "motion blur"
      - "panning blur"
      - "zoom blur"
      - "radial blur"
      - "tilt-shift blur"
      - "miniature effect"
      - "diorama effect"
      - "toy camera effect"
      # --- \u653E\u5927\u500D\u7387 ---
      - "magnification ratio"
      - "reproduction ratio"
      - "macro ratio"
      - "micro ratio"
      - "life size"
      - "1:1 magnification"
      - "1:2 magnification"
      - "2:1 magnification"
      - "5:1 magnification"
      - "10:1 magnification"

# ============================================================
# 26. \u82F1\u6587\u60C5\u7EEA\u6C1B\u56F4\u8BCD\u7EC4\uFF08v2.6.4 \u56FD\u5916\u8BED\u6599\u6269\u5C55\u65B0\u589E\uFF09
# \u6536\u5F55 ethereal/dreamy/mysterious \u7B49\u60C5\u7EEA\u6C1B\u56F4\u8BCD
# \u590D\u7528 dsl-emotion-word \u914D\u8272\uFF0Cpriority 40
# ============================================================

  english_mood_phrase:
    cssClass: "dsl-emotion-word"
    priority: 40
    words:
      # --- \u8D85\u73B0\u5B9E\u4E0E\u68A6\u5E7B ---
      - "ethereal"
      - "dreamy"
      - "surreal"
      - "mysterious"
      - "enigmatic"
      - "mystical"
      - "magical"
      - "fantasy"
      - "fairytale"
      - "folklore"
      - "mythological"
      - "legendary"
      # --- \u53F2\u8BD7\u4E0E\u82F1\u96C4 ---
      - "epic"
      - "heroic"
      - "majestic"
      - "grand"
      - "magnificent"
      - "splendid"
      - "glorious"
      - "divine"
      - "sacred"
      - "holy"
      - "blessed"
      - "angelic"
      - "celestial"
      - "heavenly"
      - "cosmic"
      - "galactic"
      - "interstellar"
      - "astral"
      - "spiritual"
      - "transcendent"
      - "sublime"
      # --- \u60CA\u8273\u4E0E\u7F8E\u4E3D ---
      - "awesome"
      - "breathtaking"
      - "stunning"
      - "gorgeous"
      - "beautiful"
      - "pretty"
      - "lovely"
      - "charming"
      - "delightful"
      - "enchanting"
      - "captivating"
      - "alluring"
      - "fascinating"
      - "intriguing"
      # --- \u60C5\u7EEA ---
      - "interesting"
      - "engaging"
      - "compelling"
      - "gripping"
      - "enthralling"
      - "mesmerizing"
      - "hypnotic"
      - "trance-like"
      - "meditative"
      - "contemplative"
      - "reflective"
      - "introspective"
      - "pensive"
      - "thoughtful"
      - "wistful"
      - "melancholic"
      - "nostalgic"
      - "sentimental"
      - "romantic"
      - "passionate"
      - "ardent"
      - "fervent"
      - "zealous"
      - "enthusiastic"
      - "eager"
      - "excited"
      - "thrilled"
      - "exhilarated"
      - "euphoric"
      - "ecstatic"
      - "rapturous"
      - "blissful"
      - "joyful"
      - "happy"
      - "cheerful"
      - "glad"
      - "delighted"
      - "pleased"
      - "satisfied"
      - "contented"
      - "content"
      - "peaceful"
      - "calm"
      - "serene"
      - "tranquil"
      - "placid"
      - "quiet"
      - "still"
      - "silent"
      - "hushed"
      - "muted"
      - "soft"
      - "gentle"
      - "mild"
      - "tender"
      - "loving"
      - "affectionate"
      - "caring"
      - "warm"
      - "cozy"
      - "comfortable"
      - "snug"
      - "safe"
      - "secure"
      # --- \u795E\u79D8\u4E0E\u9ED1\u6697 ---
      - "dark"
      - "gloomy"
      - "somber"
      - "ominous"
      - "foreboding"
      - "eerie"
      - "creepy"
      - "spooky"
      - "haunting"
      - "ghostly"
      - "shadowy"
      - "murky"
      - "dim"
      - "faint"
      - "obscure"
      - "vague"
      - "ambiguous"
      - "uncertain"
      - "doubtful"
      - "suspicious"
      # --- \u6C1B\u56F4\u573A\u666F ---
      - "noir mood"
      - "neon-drenched atmosphere"
      - "desolate atmosphere"
      - "tense atmosphere"
      - "atmospheric light"

# ============================================================
# \u56FD\u5916\u8BED\u6599\u6269\u5C55\uFF08v2.6.5 \u7B2C\u4E8C\u6279\uFF09
# \u6765\u6E90\uFF1ALexica / PromptHero / Civitai / OpenArt / PromptBase / Midlibrary
# \u65B0\u589E 880+ \u82F1\u6587\u4E13\u4E1A\u672F\u8BED\uFF0C\u8986\u76D6 12 \u4E2A\u7C7B\u522B
# ============================================================

  # ============================================================
  # 25. \u6444\u5F71\u6784\u56FE\u6269\u5C55\u8BCD\u7EC4\uFF08v2.6.5 \u56FD\u5916\u8BED\u6599\u6269\u5C55\u65B0\u589E\uFF09
  # \u6536\u5F55 rule of space / negative space / fibonacci spiral \u7B49
  # \u590D\u7528 dsl-camera-action \u914D\u8272\uFF0Cpriority 45
  # ============================================================

  english_composition_extended_phrase:
    cssClass: "dsl-camera-action"
    priority: 45
    words:
      - "rule of space"
      - "negative space"
      - "leading lines composition"
      - "golden spiral"
      - "golden triangle composition"
      - "fibonacci spiral"
      - "framing composition"
      - "symmetrical balance"
      - "asymmetrical balance"
      - "radial composition"
      - "diagonal composition"
      - "triangular composition"
      - "centered composition"
      - "foreground interest"
      - "middle ground"
      - "background separation"
      - "layering composition"
      - "visual weight"
      - "focal point"
      - "vanishing point"
      - "three-point perspective"
      - "isometric view"
      - "telephoto compression"
      - "wide angle distortion"
      - "deep depth of field"
      - "panning shot"
      - "hdr photography"
      - "low key lighting"
      - "high key lighting"
      - "chiaroscuro"
      - "split lighting"
      - "butterfly lighting"
      - "loop lighting"

  # ============================================================
  # 26. \u827A\u672F\u98CE\u683C\u4E0E\u6D41\u6D3E\u6269\u5C55\u8BCD\u7EC4\uFF08v2.6.5 \u56FD\u5916\u8BED\u6599\u6269\u5C55\u65B0\u589E\uFF09
  # \u6536\u5F55 abstract expressionism / pointillism / art brut \u7B49
  # \u590D\u7528 dsl-narrative-term \u914D\u8272\uFF0Cpriority 45
  # ============================================================

  english_style_extended_phrase:
    cssClass: "dsl-narrative-term"
    priority: 45
    words:
      - "abstract expressionism"
      - "action painting"
      - "color field painting"
      - "brutalism"
      - "cartoon style"
      - "chibi"
      - "cinematic style"
      - "collage"
      - "comic book art"
      - "constructivism"
      - "cross-hatching"
      - "cubism"
      - "dark fantasy"
      - "expressionism"
      - "fantasy art"
      - "flat design"
      - "futurism"
      - "glitch art"
      - "gothic"
      - "graffiti"
      - "hyperrealism"
      - "japanese woodblock"
      - "kawaii"
      - "line art"
      - "linocut"
      - "mosaic"
      - "neon style"
      - "pastel"
      - "pencil sketch"
      - "pixel art"
      - "pointillism"
      - "psychedelic"
      - "retro vintage"
      - "storybook illustration"
      - "rococo"
      - "mannerism"
      - "suprematism"
      - "de stijl"
      - "dadaism"
      - "orphism"
      - "fauvism"
      - "post-impressionism"
      - "neo-classicism"
      - "romanticism"
      - "realism movement"
      - "pre-raphaelite"
      - "art brut"
      - "outsider art"
      - "nouveau realisme"
      - "fluxus"

  # ============================================================
  # 27. \u6E32\u67D3\u6280\u672F\u6269\u5C55\u8BCD\u7EC4\uFF08v2.6.5 \u56FD\u5916\u8BED\u6599\u6269\u5C55\u65B0\u589E\uFF09
  # \u6536\u5F55 path tracing / photon mapping / fresnel effect \u7B49
  # \u590D\u7528 dsl-tech-param \u914D\u8272\uFF0Cpriority 46
  # ============================================================

  english_render_extended_phrase:
    cssClass: "dsl-tech-param"
    priority: 46
    words:
      - "path tracing"
      - "real-time ray tracing"
      - "caustics"
      - "photon mapping"
      - "bidirectional path tracing"
      - "metropolis light transport"
      - "diffuse interreflection"
      - "color bleeding"
      - "final gather"
      - "irradiance caching"
      - "light caching"
      - "brute force gi"
      - "radiosity"
      - "monte carlo integration"
      - "russian roulette"
      - "importance sampling"
      - "temporal accumulation"
      - "progressive rendering"
      - "bucket rendering"
      - "gpu acceleration"
      - "pbr workflow"
      - "metallic workflow"
      - "specular workflow"
      - "albedo map"
      - "normal map"
      - "roughness map"
      - "metallic map"
      - "ambient occlusion map"
      - "height map"
      - "displacement map"
      - "bump map"
      - "emission map"
      - "subsurface map"
      - "refraction index"
      - "fresnel effect"
      - "dielectric material"
      - "conductor material"
      - "anisotropic reflection"
      - "microfacet theory"
      - "energy conservation"
      - "albedo"
      - "fresnel"
      - "brdf"
      - "bsdf"
      - "bssrdf"
      - "shader"
      - "node-based material"
      - "procedural texture"
      - "noise pattern"
      - "voronoi"
      - "perlin noise"
      - "fractal noise"
      - "wireframe render"
      - "clay render"
      - "toon shader"
      - "flat shading"
      - "phong shading"
      - "gouraud shading"

  # ============================================================
  # 28. \u6750\u8D28\u7EB9\u7406\u6269\u5C55\u8BCD\u7EC4\uFF08v2.6.5 \u56FD\u5916\u8BED\u6599\u6269\u5C55\u65B0\u589E\uFF09
  # \u6536\u5F55 brushed metal / polished marble / velvet fabric \u7B49
  # \u590D\u7528 dsl-tech-param \u914D\u8272\uFF0Cpriority 45
  # ============================================================

  english_material_extended_phrase:
    cssClass: "dsl-tech-param"
    priority: 45
    words:
      - "brushed metal"
      - "polished chrome"
      - "oxidized copper"
      - "weathered steel"
      - "rust texture"
      - "patina"
      - "anodized aluminum"
      - "liquid metal"
      - "molten metal"
      - "forged iron"
      - "cast iron"
      - "wrought iron"
      - "gunmetal"
      - "brass fitting"
      - "bronze patina"
      - "titanium alloy"
      - "carbon fiber"
      - "kevlar weave"
      - "fiberglass"
      - "carbon composite"
      - "oak grain"
      - "mahogany"
      - "walnut burl"
      - "bamboo weave"
      - "rattan"
      - "weathered barn wood"
      - "reclaimed timber"
      - "polished marble"
      - "travertine"
      - "granite surface"
      - "slate tile"
      - "sandstone"
      - "basalt rock"
      - "limestone"
      - "concrete texture"
      - "exposed aggregate"
      - "polished concrete"
      - "terrazzo"
      - "stucco wall"
      - "plaster texture"
      - "brick wall"
      - "cobblestone"
      - "fieldstone"
      - "river rock"
      - "jade stone"
      - "onyx"
      - "quartz crystal"
      - "amethyst geode"
      - "velvet fabric"
      - "silk fabric"
      - "satin finish"
      - "brocade"
      - "damask pattern"
      - "lace fabric"
      - "chiffon"
      - "organza"
      - "tweed weave"
      - "linen texture"
      - "burlap"
      - "canvas fabric"
      - "denim"
      - "leather grain"
      - "suede"
      - "distressed leather"
      - "reptile skin"
      - "snake scale"
      - "crocodile leather"
      - "shagreen"
      - "mother of pearl"
      - "tortoiseshell"
      - "abalone shell"
      - "frosted glass"
      - "smoked glass"
      - "stained glass"
      - "leaded glass"

  # ============================================================
  # 29. \u540E\u671F\u7279\u6548\u6269\u5C55\u8BCD\u7EC4\uFF08v2.6.5 \u56FD\u5916\u8BED\u6599\u6269\u5C55\u65B0\u589E\uFF09
  # \u6536\u5F55 bleach bypass / volumetric fog / god rays \u7B49
  # \u590D\u7528 dsl-tech-param \u914D\u8272\uFF0Cpriority 46
  # ============================================================

  english_vfx_extended_phrase:
    cssClass: "dsl-tech-param"
    priority: 46
    words:
      - "color correction"
      - "teal and orange"
      - "bleach bypass"
      - "cross processing"
      - "sepia tone"
      - "vintage film look"
      - "film grain"
      - "digital noise"
      - "ghosting flare"
      - "bloom effect"
      - "glow effect"
      - "glare effect"
      - "god rays"
      - "volumetric light"
      - "volumetric fog"
      - "volumetric cloud"
      - "atmospheric haze"
      - "depth haze"
      - "fog effect"
      - "mist effect"
      - "smoke simulation"
      - "dust particles"
      - "floating particles"
      - "light particles"
      - "particle system"
      - "particle simulation"
      - "bokeh particles"
      - "snow particles"
      - "rain effect"
      - "splash effect"
      - "water droplet"
      - "water ripples"
      - "water caustics"
      - "foam texture"
      - "bubble effect"
      - "tilt-shift blur"
      - "depth of field blur"
      - "z-depth blur"
      - "optical flow"
      - "distortion effect"
      - "warp effect"
      - "displacement"
      - "refraction distortion"
      - "heat haze"
      - "mirage effect"
      - "glitch effect"
      - "datamosh"
      - "pixel sort"
      - "rgb split"
      - "scan lines"
      - "crt effect"
      - "vhs effect"
      - "retro filter"
      - "infrared photography"
      - "thermal imaging"
      - "x-ray effect"
      - "night vision"
      - "crushed blacks"
      - "lifted shadows"
      - "blown highlights"
      - "hdr toning"
      - "dodge and burn"
      - "frequency separation"
      - "sharpening"
      - "edge enhancement"
      - "filmic tonemapping"
      - "aces color space"
      - "lut"
      - "log footage"

  # ============================================================
  # 30. \u4EBA\u7269\u59FF\u6001\u4E0E\u8868\u60C5\u8BCD\u7EC4\uFF08v2.6.5 \u56FD\u5916\u8BED\u6599\u6269\u5C55\u65B0\u589E\uFF09
  # \u6536\u5F55 contrapposto / dynamic pose / heroic pose \u7B49
  # \u590D\u7528 dsl-emotion-word \u914D\u8272\uFF0Cpriority 45
  # ============================================================

`,vo=`# ============================================================
# 07f-english-subject-phrase.yaml
# \u8BCD\u7EC4\u8BCD\u5178\xB7\u82F1\u6587\u4E3B\u9898\u672F\u8BED\uFF08v2.7.0 \u4ECE 07-word-lexicon.yaml \u62C6\u5206\uFF09
# ------------------------------------------------------------
# \u5305\u542B\u5206\u7EC4\uFF087 \u4E2A\uFF09\uFF1A
#   english_pose_expression_phrase       (priority 43, dsl-emotion-word)   \u59FF\u52BF\u8868\u60C5
#   english_costume_fashion_phrase       (priority 40, dsl-fashion-term)   \u670D\u9970\u65F6\u5C1A
#   english_architecture_scene_phrase    (priority 39, dsl-narrative-term) \u5EFA\u7B51\u573A\u666F
#   english_scifi_cyberpunk_phrase       (priority 39, dsl-narrative-term) \u79D1\u5E7B\u8D5B\u535A\u670B\u514B
#   english_fantasy_myth_phrase          (priority 39, dsl-narrative-term) \u5947\u5E7B\u795E\u8BDD
#   english_creature_race_phrase         (priority 39, dsl-narrative-term) \u751F\u7269\u79CD\u65CF
#   english_weapon_gear_phrase           (priority 39, dsl-tech-param)     \u6B66\u5668\u88C5\u5907
# ============================================================

wordLexicon:

  english_pose_expression_phrase:
    cssClass: "dsl-emotion-word"
    priority: 45
    words:
      - "contrapposto"
      - "dynamic pose"
      - "heroic pose"
      - "power pose"
      - "action pose"
      - "fighting stance"
      - "battle ready stance"
      - "casual pose"
      - "relaxed stance"
      - "seated pose"
      - "kneeling position"
      - "crouching stance"
      - "leaping pose"
      - "jumping pose"
      - "running pose"
      - "walking pose"
      - "sprinting"
      - "lunging"
      - "kicking"
      - "punching"
      - "sword drawing"
      - "aiming pose"
      - "thinking pose"
      - "looking away"
      - "looking back"
      - "profile view"
      - "three-quarter view"
      - "frontal view"
      - "back view"
      - "bashful expression"
      - "shy expression"
      - "embarrassed look"
      - "sleepy expression"
      - "relaxed expression"
      - "distracted look"
      - "intense gaze"
      - "fierce gaze"
      - "frowning"
      - "blushing"
      - "laughing"
      - "light smile"
      - "tearing up"
      - "kubrick stare"
      - "pout"
      - "symmetrical face"
      - "expressive face"
      - "bright eyes"
      - "straight nose"
      - "pronounced nose"
      - "heterochromia"
      - "freckles"
      - "sharp jawline"
      - "high cheekbones"
      - "full lips"
      - "thin lips"
      - "arched eyebrows"
      - "furrowed brow"
      - "piercing eyes"
      - "seductive gaze"
      - "menacing glare"
      - "contemplative expression"
      - "melancholic expression"
      - "joyful expression"
      - "surprised look"
      - "shocked expression"
      - "fearful expression"
      - "stoic expression"
      - "serene expression"
      - "mischievous grin"
      - "sly smile"
      - "wry smile"
      - "smirk"
      - "gritted teeth"
      - "clenched jaw"
      - "flared nostrils"
      - "raised eyebrow"

  # ============================================================
  # 31. \u670D\u88C5\u4E0E\u65F6\u5C1A\u8BCD\u7EC4\uFF08v2.6.5 \u56FD\u5916\u8BED\u6599\u6269\u5C55\u65B0\u589E\uFF09
  # \u6536\u5F55 haute couture / plate armor / kimono \u7B49
  # \u590D\u7528 dsl-fashion-term \u914D\u8272\uFF0Cpriority 45
  # ============================================================

  english_costume_fashion_phrase:
    cssClass: "dsl-fashion-term"
    priority: 45
    words:
      - "haute couture"
      - "runway fashion"
      - "avant-garde fashion"
      - "streetwear"
      - "techwear"
      - "victorian lace gown"
      - "edwardian dress"
      - "corset bodice"
      - "bustle skirt"
      - "crinoline"
      - "chemise"
      - "petticoat"
      - "bodice"
      - "train dress"
      - "ball gown"
      - "evening gown"
      - "cocktail dress"
      - "slip dress"
      - "wrap dress"
      - "kimono"
      - "yukata"
      - "hakama"
      - "haori"
      - "obi sash"
      - "hanfu"
      - "cheongsam"
      - "qipao"
      - "tang suit"
      - "mandarin collar"
      - "frog buttons"
      - "dragon embroidery"
      - "phoenix embroidery"
      - "silk robe"
      - "military uniform"
      - "tactical vest"
      - "combat gear"
      - "plate carrier"
      - "load bearing vest"
      - "duty belt"
      - "epaulets"
      - "brass buttons"
      - "peaked cap"
      - "trench coat"
      - "bomber jacket"
      - "flight jacket"
      - "leather jacket"
      - "moto jacket"
      - "biker jacket"
      - "denim jacket"
      - "parka coat"
      - "pea coat"
      - "duster coat"
      - "cape"
      - "cloak"
      - "mantle"
      - "cowl"
      - "hooded robe"
      - "wizard robe"
      - "battle mage attire"
      - "ceremonial robe"
      - "monastic habit"
      - "vestments"
      - "liturgical garments"
      - "plate armor"
      - "chainmail"
      - "brigandine"
      - "gambeson"
      - "spaulders"
      - "vambraces"
      - "greaves"
      - "sabatons"
      - "gauntlets"
      - "gorget"
      - "breastplate"
      - "cuirass"
      - "sallet helmet"
      - "great helm"
      - "armet"
      - "burgonet"
      - "barbuta"
      - "kettle hat"

  # ============================================================
  # 32. \u5EFA\u7B51\u4E0E\u573A\u666F\u8BCD\u7EC4\uFF08v2.6.5 \u56FD\u5916\u8BED\u6599\u6269\u5C55\u65B0\u589E\uFF09
  # \u6536\u5F55 gothic architecture / flying buttress / nave \u7B49
  # \u590D\u7528 dsl-narrative-term \u914D\u8272\uFF0Cpriority 44
  # ============================================================

  english_architecture_scene_phrase:
    cssClass: "dsl-narrative-term"
    priority: 44
    words:
      - "brutalist architecture"
      - "gothic architecture"
      - "gothic revival"
      - "romanesque architecture"
      - "byzantine architecture"
      - "renaissance architecture"
      - "baroque architecture"
      - "rococo architecture"
      - "neoclassical architecture"
      - "art deco architecture"
      - "modernist architecture"
      - "postmodern architecture"
      - "deconstructivism"
      - "international style"
      - "bauhaus architecture"
      - "prairie style"
      - "victorian architecture"
      - "queen anne style"
      - "tudor style"
      - "colonial architecture"
      - "georgian architecture"
      - "federal style"
      - "greek revival"
      - "craftsman style"
      - "streamliner moderne"
      - "cathedral interior"
      - "basilica"
      - "nave"
      - "transept"
      - "apse"
      - "choir"
      - "ambulatory"
      - "flying buttress"
      - "ribbed vault"
      - "groin vault"
      - "barrel vault"
      - "dome"
      - "cupola"
      - "clerestory"
      - "rose window"
      - "tracery"
      - "pinnacle"
      - "gargoyle"
      - "grotesque"
      - "machicolation"
      - "crenellation"
      - "battlement"
      - "parapet"
      - "keep tower"
      - "moat"
      - "drawbridge"
      - "portcullis"
      - "barbican"
      - "bailey"
      - "great hall"
      - "throne room"
      - "courtyard"
      - "cloister"
      - "colonnade"
      - "peristyle"
      - "atrium"
      - "rotunda"
      - "portico"
      - "pediment"
      - "entablature"
      - "frieze"
      - "cornice"
      - "architrave"
      - "capital"
      - "fluted column"
      - "doric order"
      - "ionic order"
      - "corinthian order"
      - "composite order"
      - "tuscan order"
      - "rustication"
      - "quoins"
      - "string course"
      - "bay window"
      - "oriel window"
      - "dormer window"
      - "mansard roof"
      - "gable roof"
      - "hip roof"
      - "vaulted ceiling"
      - "coffered ceiling"
      - "tray ceiling"

  # ============================================================
  # 33. \u79D1\u5E7B/\u8D5B\u535A\u670B\u514B\u8BCD\u7EC4\uFF08v2.6.5 \u56FD\u5916\u8BED\u6599\u6269\u5C55\u65B0\u589E\uFF09
  # \u6536\u5F55 holographic display / cybernetic implant / megacity \u7B49
  # \u590D\u7528 dsl-tech-param \u914D\u8272\uFF0Cpriority 45
  # ============================================================

  english_scifi_cyberpunk_phrase:
    cssClass: "dsl-tech-param"
    priority: 45
    words:
      - "neon lights"
      - "holographic display"
      - "hologram projection"
      - "augmented reality"
      - "virtual reality"
      - "cybernetic implant"
      - "cybernetic enhancement"
      - "prosthetic limb"
      - "bionic eye"
      - "neural interface"
      - "brain computer interface"
      - "data jack"
      - "cortex chip"
      - "optical implant"
      - "synthetic skin"
      - "bionic arm"
      - "mechanical prosthetic"
      - "hydraulic joint"
      - "servo motor"
      - "circuit pattern"
      - "led accent"
      - "fiber optic hair"
      - "data stream"
      - "digital rain"
      - "glitch artifact"
      - "pixelated distortion"
      - "rgb channel split"
      - "scan line"
      - "crt monitor"
      - "vhs distortion"
      - "megacity"
      - "arcology"
      - "skyscraper forest"
      - "neon sign"
      - "holographic advertisement"
      - "flying car"
      - "hover vehicle"
      - "maglev train"
      - "space elevator"
      - "orbital station"
      - "rain slicked street"
      - "dystopian slum"
      - "corporate tower"
      - "neon district"
      - "black market alley"
      - "underground bunker"
      - "data center"
      - "server room"
      - "control room"
      - "command bridge"
      - "cockpit interior"
      - "cryo chamber"
      - "stasis pod"
      - "cloning vat"
      - "medical bay"
      - "laboratory interior"
      - "research facility"
      - "containment cell"
      - "force field"
      - "energy shield"
      - "plasma window"
      - "tractor beam"
      - "anti gravity"
      - "maglev platform"
      - "hover bike"
      - "power armor"
      - "exoskeleton"
      - "mech suit"
      - "giant robot"
      - "bipedal mech"
      - "quadruped drone"
      - "surveillance drone"
      - "combat drone"
      - "security bot"
      - "android"
      - "gynoid"
      - "replicant"
      - "cyborg"
      - "synthetic human"
      - "artificial intelligence"
      - "neural network"
      - "quantum computer"
      - "touch interface"
      - "heads up display"
      - "augmented visor"
      - "cyber visor"
      - "tech goggles"
      - "rebreather mask"
      - "oxygen mask"
      - "environment suit"
      - "hazard suit"
      - "spacesuit"
      - "eva suit"

  # ============================================================
  # 34. \u5947\u5E7B/\u795E\u8BDD\u8BCD\u7EC4\uFF08v2.6.5 \u56FD\u5916\u8BED\u6599\u6269\u5C55\u65B0\u589E\uFF09
  # \u6536\u5F55 enchanted forest / magic circle / yggdrasil \u7B49
  # \u590D\u7528 dsl-narrative-term \u914D\u8272\uFF0Cpriority 44
  # ============================================================

  english_fantasy_myth_phrase:
    cssClass: "dsl-narrative-term"
    priority: 44
    words:
      - "enchanted forest"
      - "mystical glade"
      - "ancient ruins"
      - "forgotten temple"
      - "sacred grove"
      - "celestial realm"
      - "astral plane"
      - "spirit world"
      - "fairy realm"
      - "elven kingdom"
      - "dwarven stronghold"
      - "dragon lair"
      - "wizard tower"
      - "magic circle"
      - "summoning circle"
      - "runic inscription"
      - "ancient runes"
      - "mystical symbol"
      - "arcane glyph"
      - "enchanted artifact"
      - "magical artifact"
      - "holy relic"
      - "cursed object"
      - "ancient scroll"
      - "spellbook"
      - "grimoire"
      - "tome of knowledge"
      - "magic staff"
      - "wizard staff"
      - "sorcerer wand"
      - "crystal ball"
      - "scrying mirror"
      - "alchemical apparatus"
      - "potion bottle"
      - "elixir flask"
      - "magical aura"
      - "mystical energy"
      - "arcane particle"
      - "glowing rune"
      - "floating island"
      - "celestial castle"
      - "crystal palace"
      - "obsidian fortress"
      - "marble sanctuary"
      - "golden temple"
      - "jade pagoda"
      - "bonsai garden"
      - "zen garden"
      - "cherry blossom"
      - "spirit tree"
      - "world tree"
      - "yggdrasil"
      - "sacred flame"
      - "eternal flame"
      - "magical mist"
      - "spectral fog"
      - "ghostly apparition"
      - "spectral being"
      - "wraith"
      - "banshee"
      - "will-o-wisp"
      - "fairy light"
      - "pixie dust"
      - "magical spark"
      - "eldritch energy"
      - "cosmic energy"
      - "divine light"
      - "holy radiance"
      - "cursed aura"
      - "demonic aura"
      - "angelic halo"
      - "celestial wings"
      - "feathered wing"
      - "leathery wing"
      - "bat wing"
      - "dragon wing"
      - "fairy wing"
      - "butterfly wing"
      - "moth wing"
      - "unicorn horn"
      - "phoenix feather"
      - "dragon scale"
      - "basilisk eye"
      - "hydra head"
      - "griffin feather"
      - "kirin"
      - "qilin"
      - "thunderbird"
      - "roc bird"
      - "sphinx"
      - "centaur"
      - "minotaur"
      - "satyr"
      - "faun"
      - "nymph"
      - "dryad"
      - "nereid"
      - "siren"

  # ============================================================
  # 35. \u751F\u7269\u4E0E\u89D2\u8272\u79CD\u65CF\u8BCD\u7EC4\uFF08v2.6.5 \u56FD\u5916\u8BED\u6599\u6269\u5C55\u65B0\u589E\uFF09
  # \u6536\u5F55 anthropomorphic / high elf / dragonborn / lich \u7B49
  # \u590D\u7528 dsl-narrative-term \u914D\u8272\uFF0Cpriority 44
  # ============================================================

  english_creature_race_phrase:
    cssClass: "dsl-narrative-term"
    priority: 44
    words:
      - "anthropomorphic"
      - "humanoid race"
      - "elf race"
      - "high elf"
      - "wood elf"
      - "dark elf"
      - "drow"
      - "blood elf"
      - "dwarf race"
      - "mountain dwarf"
      - "hill dwarf"
      - "halfling"
      - "gnome"
      - "orc"
      - "goblin"
      - "hobgoblin"
      - "bugbear"
      - "ogre"
      - "troll"
      - "giant kin"
      - "frost giant"
      - "fire giant"
      - "storm giant"
      - "cloud giant"
      - "dragonborn"
      - "tiefling"
      - "aasimar"
      - "genasi"
      - "goliath"
      - "tabaxi"
      - "dragonkin"
      - "lizardfolk"
      - "kobold"
      - "draconian"
      - "saurian"
      - "arachnid"
      - "insectoid"
      - "mantis warrior"
      - "beetle warrior"
      - "mothman"
      - "arachne"
      - "merfolk"
      - "triton"
      - "naga"
      - "lamia"
      - "gorgon"
      - "medusa"
      - "basilisk"
      - "cockatrice"
      - "chimera"
      - "manticore"
      - "griffin"
      - "hippogriff"
      - "pegasus"
      - "unicorn"
      - "alicorn"
      - "phoenix"
      - "wyvern"
      - "hydra"
      - "western dragon"
      - "eastern dragon"
      - "wyrm"
      - "lindwurm"
      - "amphiptere"
      - "lich"
      - "vampire"
      - "werewolf"
      - "lycanthrope"
      - "zombie"
      - "ghoul"
      - "wight"
      - "specter"
      - "ghost"
      - "revenant"
      - "reaper"
      - "demon"
      - "devil"
      - "imp"
      - "gargoyle"
      - "angel"
      - "archangel"
      - "seraph"
      - "cherub"
      - "valkyrie"
      - "deity"
      - "demigod"
      - "titan"
      - "primordial"

  # ============================================================
  # 36. \u6B66\u5668\u4E0E\u88C5\u5907\u8BCD\u7EC4\uFF08v2.6.5 \u56FD\u5916\u8BED\u6599\u6269\u5C55\u65B0\u589E\uFF09
  # \u6536\u5F55 longsword / katana / plasma rifle / lightsaber \u7B49
  # \u590D\u7528 dsl-tech-param \u914D\u8272\uFF0Cpriority 44
  # ============================================================

  english_weapon_gear_phrase:
    cssClass: "dsl-tech-param"
    priority: 44
    words:
      - "longsword"
      - "bastard sword"
      - "greatsword"
      - "arming sword"
      - "rapier"
      - "foil"
      - "sabre"
      - "cutlass"
      - "katana"
      - "wakizashi"
      - "nodachi"
      - "odachi"
      - "tanto"
      - "ninjato"
      - "scimitar"
      - "shamshir"
      - "falchion"
      - "gladius"
      - "spatha"
      - "viking sword"
      - "claymore"
      - "zweihander"
      - "battle axe"
      - "war axe"
      - "hand axe"
      - "throwing axe"
      - "bearded axe"
      - "double bladed axe"
      - "greataxe"
      - "halberd"
      - "glaive"
      - "guisarme"
      - "bardiche"
      - "voulge"
      - "ranseur"
      - "spetum"
      - "partisan"
      - "spear"
      - "pike"
      - "lance"
      - "javelin"
      - "trident"
      - "harpoon"
      - "bo staff"
      - "quarterstaff"
      - "war hammer"
      - "battle hammer"
      - "maul"
      - "morning star"
      - "flail"
      - "mace"
      - "club"
      - "cudgel"
      - "bludgeon"
      - "dagger"
      - "stiletto"
      - "dirk"
      - "kris"
      - "main gauche"
      - "throwing knife"
      - "shuriken"
      - "kunai"
      - "chakram"
      - "sling"
      - "blowgun"
      - "short bow"
      - "longbow"
      - "recurve bow"
      - "compound bow"
      - "crossbow"
      - "arbalest"
      - "hand cannon"
      - "flintlock pistol"
      - "musket"
      - "blunderbuss"
      - "arquebus"
      - "matchlock"
      - "wheellock"
      - "sniper rifle"
      - "assault rifle"
      - "plasma rifle"
      - "laser rifle"
      - "beam weapon"
      - "pulse weapon"
      - "railgun"
      - "gauss rifle"
      - "energy blade"
      - "plasma sword"
      - "lightsaber"
      - "vibro blade"
      - "power sword"
      - "chain sword"
      - "thunder hammer"
      - "power fist"
      - "shield generator"
      - "energy shield"
      - "force field"
      - "bulletproof vest"
      - "flak jacket"
      - "ballistic plate"
      - "riot gear"
      - "swat gear"
      - "tactical helmet"
      - "ballistic helmet"
      - "night vision goggle"
      - "gas mask"
      - "rebreather"
      - "bandolier"
      - "ammunition pouch"
      - "scabbard"
      - "sheath"
      - "holster"
      - "quiver"
      - "grappling hook"
      - "glowstick"

# ============================================================
# \u5206\u8BCD\u5668\u914D\u7F6E\uFF08\u53EF\u9009\uFF0C\u672A\u914D\u7F6E\u65F6\u4F7F\u7528\u9ED8\u8BA4\u503C\uFF09
# ============================================================
segmenterConfig:
  # \u6700\u5927\u8BCD\u957F\uFF08\u5B57\u7B26\u6570\uFF09\uFF0C\u8D85\u8FC7\u6B64\u957F\u5EA6\u7684\u8BCD\u4E0D\u4F1A\u88AB\u5339\u914D
  # \u5EFA\u8BAE\u503C 4-8\uFF0C\u8FC7\u5927\u589E\u52A0\u626B\u63CF\u6210\u672C\uFF0C\u8FC7\u5C0F\u6F0F\u5339\u914D\u957F\u8BCD
  maxWordLength: 6
  # \u6700\u5C0F\u8BCD\u957F\uFF08\u5B57\u7B26\u6570\uFF09\uFF0C\u5C0F\u4E8E\u6B64\u957F\u5EA6\u7684\u8FDE\u7EED\u6BB5\u4E0D\u8FDB\u5165\u5206\u8BCD
  # \u8BBE\u4E3A 2 \u8868\u793A\u5355\u5B57\u76F4\u63A5\u4EA4\u7531 06 \u5B57\u7EA7\u89C4\u5219\u5904\u7406
  minWordLength: 2

`,bo=`# ============================================================
# 07g-director-cinematography.yaml
# \u8BCD\u7EC4\u8BCD\u5178\xB7\u5BFC\u6F14\u5FC5\u5B66\xB7\u6444\u5F71\u4E0E\u955C\u5934\u8BED\u8A00\uFF08v2.7.0 \u65B0\u589E\uFF09
# ------------------------------------------------------------
# \u5305\u542B\u5206\u7EC4\uFF087 \u4E2A\uFF09\uFF1A
#   cinematography_basic       (priority 46, dsl-tech-param)     \u6444\u5F71\u57FA\u7840
#   shot_size_extended         (priority 44, dsl-camera-action)  \u666F\u522B\u6269\u5C55
#   camera_angle_extended      (priority 44, dsl-camera-action)  \u673A\u4F4D\u89D2\u5EA6
#   camera_movement_extended   (priority 44, dsl-camera-action)  \u8FD0\u955C\u6269\u5C55
#   focal_length_phrase        (priority 47, dsl-tech-param)     \u7126\u8DDD\u955C\u5934
#   composition_phrase         (priority 46, dsl-tech-param)     \u6784\u56FE\u65B9\u6CD5
#   depth_of_field_phrase      (priority 47, dsl-tech-param)     \u666F\u6DF1\u63A7\u5236
# ============================================================

wordLexicon:

  cinematography_basic:
    cssClass: "dsl-tech-param"
    priority: 46
    words:
      # --- \u66DD\u5149\u4E09\u89D2\u4E0E\u62CD\u6444\u6A21\u5F0F ---
      - "\u66DD\u5149\u4E09\u89D2"
      - "\u5149\u5708\u4F18\u5148"
      - "\u5FEB\u95E8\u4F18\u5148"
      - "\u624B\u52A8\u6A21\u5F0F"
      - "\u7A0B\u5E8F\u81EA\u52A8"
      - "\u5168\u81EA\u52A8\u6A21\u5F0F"
      - "\u60C5\u666F\u6A21\u5F0F"
      - "\u5149\u5708\u503C"
      - "f\u503C"
      - "\u5FEB\u95E8\u901F\u5EA6"
      - "\u611F\u5149\u5EA6"
      - "ISO"
      - "\u66DD\u5149\u8865\u507F"
      - "\u8FC7\u66DD"
      - "\u6B20\u66DD"
      - "\u6B63\u786E\u66DD\u5149"
      - "\u66DD\u5149\u91CF"
      - "\u66DD\u5149\u7EC4\u5408"
      # --- \u6D4B\u5149\u4E0E\u5BF9\u7126 ---
      - "\u8BC4\u4EF7\u6D4B\u5149"
      - "\u4E2D\u592E\u91CD\u70B9\u6D4B\u5149"
      - "\u70B9\u6D4B\u5149"
      - "\u5C40\u90E8\u6D4B\u5149"
      - "\u77E9\u9635\u6D4B\u5149"
      - "\u81EA\u52A8\u5BF9\u7126"
      - "\u5355\u6B21\u81EA\u52A8\u5BF9\u7126"
      - "\u8FDE\u7EED\u81EA\u52A8\u5BF9\u7126"
      - "\u624B\u52A8\u5BF9\u7126"
      - "AF-S"
      - "AF-C"
      - "AF-F"
      - "\u5BF9\u7126\u8DDD\u79BB"
      - "\u6700\u8FD1\u5BF9\u7126"
      # --- \u767D\u5E73\u8861\u4E0E\u753B\u5E45 ---
      - "\u767D\u5E73\u8861"
      - "\u81EA\u52A8\u767D\u5E73\u8861"
      - "\u8272\u6E29"
      - "\u753B\u5E45"
      - "APS-C\u753B\u5E45"
      - "\u5168\u753B\u5E45"
      - "\u4E2D\u753B\u5E45"
      - "\u5927\u753B\u5E45"
      - "\u753B\u5E45\u6BD4"
      - "\u5BBD\u9AD8\u6BD4"
      - "\u89C6\u89D2"
      - "\u900F\u89C6"
      - "\u653E\u5927\u500D\u7387"
      - "\u7126\u8DDD\u8F6C\u6362\u7CFB\u6570"

  shot_size_extended:
    cssClass: "dsl-camera-action"
    priority: 44
    words:
      # --- \u57FA\u7840\u666F\u522B ---
      - "\u5927\u8FDC\u666F"
      - "\u8FDC\u666F"
      - "\u5168\u666F"
      - "\u4E2D\u5168\u666F"
      - "\u4E2D\u666F"
      - "\u4E2D\u8FD1\u666F"
      - "\u8FD1\u666F"
      - "\u7279\u5199"
      - "\u5927\u7279\u5199"
      # --- \u4EBA\u7269\u666F\u522B ---
      - "\u819D\u50CF"
      - "\u80F8\u50CF"
      - "\u5168\u8EAB"
      - "\u534A\u8EAB"
      - "\u4E03\u5206\u8EAB"
      - "\u5934\u80A9\u50CF"
      - "\u9762\u90E8\u7279\u5199"
      - "\u773C\u90E8\u7279\u5199"
      - "\u624B\u90E8\u7279\u5199"
      # --- \u7279\u6B8A\u666F\u522B ---
      - "\u6781\u8FDC\u666F"
      - "\u8D85\u8FDC\u666F"
      - "\u6781\u7279\u5199"
      - "\u5FAE\u8DDD\u666F\u522B"
      - "\u73AF\u5883\u666F\u522B"
      - "\u7EC6\u8282\u666F\u522B"

  camera_angle_extended:
    cssClass: "dsl-camera-action"
    priority: 44
    words:
      # --- \u6C34\u5E73\u89D2\u5EA6 ---
      - "\u6B63\u9762\u89D2\u5EA6"
      - "\u4FA7\u9762\u89D2\u5EA6"
      - "\u80CC\u9762\u89D2\u5EA6"
      - "\u524D\u4FA7\u9762"
      - "\u540E\u4FA7\u9762"
      # --- \u5782\u76F4\u89D2\u5EA6 ---
      - "\u4EF0\u62CD"
      - "\u4FEF\u62CD"
      - "\u5E73\u89C6"
      - "\u9E1F\u77B0"
      - "\u866B\u773C\u89C6\u89D2"
      # --- \u7279\u6B8A\u89D2\u5EA6 ---
      - "\u8377\u5170\u89D2"
      - "\u503E\u659C\u89D2\u5EA6"
      - "\u8FC7\u80A9\u955C\u5934"
      - "\u4E3B\u89C2\u89C6\u89D2"
      - "\u5BA2\u89C2\u89C6\u89D2"
      - "\u4E0A\u5E1D\u89C6\u89D2"
      - "\u5168\u77E5\u89C6\u89D2"
      # --- \u89C6\u70B9\u7C7B\u578B ---
      - "\u4E3B\u89C2\u89C6\u70B9"
      - "\u5BA2\u89C2\u89C6\u70B9"
      - "\u5168\u77E5\u89C6\u70B9"
      - "\u65C1\u89C2\u8005\u89C6\u70B9"
      - "\u7B2C\u4E00\u4EBA\u79F0\u89C6\u89D2"
      - "\u7B2C\u4E09\u4EBA\u79F0\u89C6\u89D2"

  camera_movement_extended:
    cssClass: "dsl-camera-action"
    priority: 44
    words:
      # --- \u57FA\u7840\u8FD0\u955C ---
      - "\u63A8\u955C\u5934"
      - "\u62C9\u955C\u5934"
      - "\u6447\u955C\u5934"
      - "\u79FB\u955C\u5934"
      - "\u8DDF\u955C\u5934"
      - "\u5347\u964D\u955C\u5934"
      - "\u53D8\u7126\u955C\u5934"
      # --- \u590D\u5408\u8FD0\u955C ---
      - "\u7EFC\u5408\u8FD0\u955C"
      - "\u5F27\u5F62\u8FD0\u955C"
      - "\u87BA\u65CB\u8FD0\u955C"
      - "\u4E4B\u5B57\u5F62\u8FD0\u955C"
      - "\u6CE2\u6D6A\u5F0F\u8FD0\u955C"
      - "\u5BF9\u89D2\u63A8\u79FB"
      # --- \u8FD0\u955C\u65B9\u5F0F ---
      - "\u624B\u6301\u6444\u5F71"
      - "\u7A33\u5B9A\u5668"
      - "\u80A9\u625B"
      - "\u80F8\u6258"
      - "\u4F4E\u89D2\u5EA6\u8DDF\u62CD"
      - "\u9AD8\u89D2\u5EA6\u8DDF\u62CD"
      - "\u65AF\u5766\u5C3C\u5EB7"
      - "\u822A\u62CD"
      - "\u65E0\u4EBA\u673A\u62CD\u6444"
      # --- \u957F\u955C\u5934 ---
      - "\u957F\u955C\u5934"
      - "\u5185\u90E8\u8499\u592A\u5947"
      - "\u4E00\u955C\u5230\u5E95"
      - "\u8C03\u5EA6\u957F\u955C\u5934"
      - "\u6DF1\u7126\u957F\u955C\u5934"

  focal_length_phrase:
    cssClass: "dsl-tech-param"
    priority: 47
    words:
      # --- \u955C\u5934\u7C7B\u578B ---
      - "\u6807\u51C6\u955C\u5934"
      - "\u5E7F\u89D2\u955C\u5934"
      - "\u957F\u7126\u955C\u5934"
      - "\u9C7C\u773C\u955C\u5934"
      - "\u5FAE\u8DDD\u955C\u5934"
      - "\u5B9A\u7126\u955C\u5934"
      - "\u53D8\u7126\u955C\u5934"
      - "\u79FB\u8F74\u955C\u5934"
      - "\u6298\u8FD4\u955C\u5934"
      - "\u8F6F\u7126\u955C\u5934"
      # --- \u7126\u6BB5\u5206\u7C7B ---
      - "\u8D85\u5E7F\u89D2"
      - "\u5E7F\u89D2"
      - "\u6807\u51C6\u7126\u6BB5"
      - "\u4E2D\u957F\u7126"
      - "\u957F\u7126"
      - "\u8D85\u957F\u7126"
      - "\u671B\u8FDC\u955C\u5934"
      # --- \u5149\u5708\u7279\u6027 ---
      - "\u5927\u5149\u5708"
      - "\u5C0F\u5149\u5708"
      - "\u6052\u5B9A\u5149\u5708"
      - "\u975E\u6052\u5B9A\u5149\u5708"
      - "\u6700\u5927\u5149\u5708"
      - "\u6700\u5C0F\u5149\u5708"
      # --- \u955C\u5934\u53C2\u6570 ---
      - "\u7126\u8DDD"
      - "\u7126\u6BB5"
      - "\u7126\u6BB5\u8303\u56F4"
      - "\u89C6\u89D2\u8303\u56F4"
      - "\u6700\u8FD1\u5BF9\u7126\u8DDD\u79BB"
      - "\u653E\u5927\u500D\u7387"

  composition_phrase:
    cssClass: "dsl-tech-param"
    priority: 46
    words:
      # --- \u57FA\u7840\u6784\u56FE ---
      - "\u4E09\u5206\u6CD5"
      - "\u9EC4\u91D1\u5206\u5272"
      - "\u5BF9\u79F0\u6784\u56FE"
      - "\u5F15\u5BFC\u7EBF\u6784\u56FE"
      - "\u6846\u4E2D\u6846"
      - "\u5BF9\u89D2\u7EBF\u6784\u56FE"
      - "\u87BA\u65CB\u6784\u56FE"
      - "\u5706\u5F62\u6784\u56FE"
      # --- \u51E0\u4F55\u6784\u56FE ---
      - "\u4E09\u89D2\u5F62\u6784\u56FE"
      - "L\u5F62\u6784\u56FE"
      - "S\u5F62\u6784\u56FE"
      - "\u5341\u5B57\u5F62\u6784\u56FE"
      - "\u653E\u5C04\u5F62\u6784\u56FE"
      - "\u5BF9\u5206\u6784\u56FE"
      # --- \u6784\u56FE\u5143\u7D20 ---
      - "\u7559\u767D"
      - "\u753B\u6846"
      - "\u89C6\u89C9\u4E2D\u5FC3"
      - "\u753B\u9762\u4E3B\u4F53"
      - "\u524D\u666F"
      - "\u4E2D\u666F"
      - "\u80CC\u666F"
      - "\u5C42\u6B21\u611F"
      - "\u7EB5\u6DF1\u611F"
      - "\u89C6\u89C9\u5F15\u5BFC"
      # --- \u6784\u56FE\u539F\u5219 ---
      - "\u5E73\u8861\u6784\u56FE"
      - "\u4E0D\u5E73\u8861\u6784\u56FE"
      - "\u52A8\u6001\u6784\u56FE"
      - "\u9759\u6001\u6784\u56FE"
      - "\u5C01\u95ED\u5F0F\u6784\u56FE"
      - "\u5F00\u653E\u5F0F\u6784\u56FE"

  depth_of_field_phrase:
    cssClass: "dsl-tech-param"
    priority: 47
    words:
      # --- \u666F\u6DF1\u7C7B\u578B ---
      - "\u6D45\u666F\u6DF1"
      - "\u6DF1\u666F\u6DF1"
      - "\u4E2D\u7B49\u666F\u6DF1"
      - "\u6781\u6D45\u666F\u6DF1"
      - "\u8D85\u7126\u8DDD"
      # --- \u666F\u6DF1\u8981\u7D20 ---
      - "\u7126\u5E73\u9762"
      - "\u5F25\u6563\u5706"
      - "\u666F\u6DF1\u9884\u89C8"
      - "\u666F\u6DF1\u8303\u56F4"
      - "\u6E05\u6670\u8303\u56F4"
      # --- \u666F\u6DF1\u63A7\u5236 ---
      - "\u5149\u5708\u4E0E\u666F\u6DF1"
      - "\u7126\u8DDD\u4E0E\u666F\u6DF1"
      - "\u62CD\u6444\u8DDD\u79BB\u4E0E\u666F\u6DF1"
      - "\u80CC\u666F\u865A\u5316"
      - "\u524D\u666F\u865A\u5316"
      - "\u7126\u5916\u6210\u50CF"
`,ko=`# ============================================================
# 07h-director-lighting-color.yaml
# \u8BCD\u7EC4\u8BCD\u5178\xB7\u5BFC\u6F14\u5FC5\u5B66\xB7\u5149\u5F71\u4E0E\u8272\u5F69\uFF08v2.7.0 \u65B0\u589E\uFF09
# ------------------------------------------------------------
# \u5305\u542B\u5206\u7EC4\uFF086 \u4E2A\uFF09\uFF1A
#   lighting_basic       (priority 41, dsl-light-word)       \u5E03\u5149\u57FA\u7840
#   light_quality        (priority 41, dsl-light-word)       \u5149\u8D28\u5149\u4F4D
#   light_ratio          (priority 41, dsl-light-word)       \u5149\u6BD4\u53CD\u5DEE
#   color_theory         (priority 46, dsl-tech-param)       \u8272\u5F69\u7406\u8BBA
#   color_psychology     (priority 42, dsl-narrative-term)   \u8272\u5F69\u5FC3\u7406
#   color_grading_style  (priority 39, dsl-tech-param)       \u8C03\u8272\u98CE\u683C
# ============================================================

wordLexicon:

  lighting_basic:
    cssClass: "dsl-light-word"
    priority: 41
    words:
      # --- \u4E09\u70B9\u5E03\u5149 ---
      - "\u4E3B\u5149"
      - "\u8F85\u5149"
      - "\u8F6E\u5ED3\u5149"
      - "\u80CC\u666F\u5149"
      - "\u773C\u795E\u5149"
      - "\u53D1\u4E1D\u5149"
      - "\u4FA7\u5149"
      - "\u9876\u5149"
      - "\u5E95\u5149"
      # --- \u5149\u4F4D ---
      - "\u987A\u5149"
      - "\u9006\u5149"
      - "\u4FA7\u9006\u5149"
      - "\u524D\u4FA7\u5149"
      - "\u6B63\u4FA7\u5149"
      - "\u540E\u4FA7\u5149"
      - "\u9876\u5149"
      - "\u5E95\u5149"
      - "\u80CC\u666F\u5149"
      # --- \u7279\u6B8A\u5E03\u5149 ---
      - "\u4F26\u52C3\u6717\u5149"
      - "\u8774\u8776\u5149"
      - "\u73AF\u5F62\u5149"
      - "\u5206\u5272\u5149"
      - "\u4FEE\u9970\u5149"
      - "\u6548\u679C\u5149"
      - "\u73AF\u5883\u5149"

  light_quality:
    cssClass: "dsl-light-word"
    priority: 41
    words:
      # --- \u5149\u8D28 ---
      - "\u786C\u5149"
      - "\u8F6F\u5149"
      - "\u67D4\u5149"
      - "\u6563\u5C04\u5149"
      - "\u76F4\u5C04\u5149"
      - "\u53CD\u5C04\u5149"
      # --- \u5149\u6E90\u7C7B\u578B ---
      - "\u81EA\u7136\u5149"
      - "\u4EBA\u9020\u5149"
      - "\u6DF7\u5408\u5149"
      - "\u8FDE\u7EED\u5149"
      - "\u95EA\u5149\u5149"
      - "\u94A8\u4E1D\u706F"
      - "\u65E5\u5149\u706F"
      - "LED\u706F"
      - "HMI\u706F"
      # --- \u5149\u4F4D\u53D8\u5316 ---
      - "\u9AD8\u4F4D\u5149"
      - "\u4E2D\u4F4D\u5149"
      - "\u4F4E\u4F4D\u5149"
      - "\u6C34\u5E73\u5149"
      - "\u5782\u76F4\u5149"
      - "\u659C\u5C04\u5149"

  light_ratio:
    cssClass: "dsl-light-word"
    priority: 41
    words:
      # --- \u5F71\u8C03 ---
      - "\u9AD8\u8C03"
      - "\u4F4E\u8C03"
      - "\u4E2D\u8C03"
      - "\u9AD8\u53CD\u5DEE"
      - "\u4F4E\u53CD\u5DEE"
      - "\u660E\u6697\u5BF9\u6BD4"
      - "\u4E2D\u95F4\u8C03"
      # --- \u5149\u6BD4 ---
      - "\u5927\u5149\u6BD4"
      - "\u5C0F\u5149\u6BD4"
      - "\u5149\u6BD4\u63A7\u5236"
      - "\u660E\u6697\u5206\u5E03"
      - "\u9634\u5F71\u5904\u7406"
      - "\u9AD8\u5149\u4FDD\u7559"
      # --- \u53CD\u5DEE\u63A7\u5236 ---
      - "\u5BF9\u6BD4\u5EA6"
      - "\u5C42\u6B21\u611F"
      - "\u7ACB\u4F53\u611F"
      - "\u5E73\u9762\u611F"
      - "\u7A7A\u95F4\u611F"

  color_theory:
    cssClass: "dsl-tech-param"
    priority: 46
    words:
      # --- \u8272\u5F69\u4E09\u8981\u7D20 ---
      - "\u8272\u76F8"
      - "\u9971\u548C\u5EA6"
      - "\u660E\u5EA6"
      - "HSL"
      - "HSV"
      - "RGB"
      - "CMYK"
      # --- \u8272\u5F69\u7CFB\u7EDF ---
      - "\u8272\u6E29"
      - "\u8272\u8C03"
      - "\u8272\u57DF"
      - "\u8272\u76F8\u73AF"
      - "\u8272\u8F6E"
      - "\u4E09\u539F\u8272"
      - "\u4E09\u95F4\u8272"
      - "\u518D\u95F4\u8272"
      # --- \u8272\u5F69\u5173\u7CFB ---
      - "\u4E92\u8865\u8272"
      - "\u76F8\u90BB\u8272"
      - "\u5BF9\u6BD4\u8272"
      - "\u540C\u7C7B\u8272"
      - "\u6D88\u8272"

  color_psychology:
    cssClass: "dsl-narrative-term"
    priority: 42
    words:
      # --- \u8272\u5F69\u6E29\u5EA6 ---
      - "\u6696\u8272"
      - "\u51B7\u8272"
      - "\u4E2D\u6027\u8272"
      - "\u6696\u8272\u8C03"
      - "\u51B7\u8272\u8C03"
      # --- \u914D\u8272\u65B9\u6848 ---
      - "\u5355\u8272\u914D\u8272"
      - "\u7C7B\u6BD4\u914D\u8272"
      - "\u4E92\u8865\u914D\u8272"
      - "\u4E09\u89D2\u914D\u8272"
      - "\u5206\u88C2\u4E92\u8865"
      - "\u77E9\u5F62\u914D\u8272"
      # --- \u8272\u5F69\u8C61\u5F81 ---
      - "\u7EA2\u8272\u8C61\u5F81"
      - "\u84DD\u8272\u8C61\u5F81"
      - "\u9EC4\u8272\u8C61\u5F81"
      - "\u7EFF\u8272\u8C61\u5F81"
      - "\u7D2B\u8272\u8C61\u5F81"
      - "\u9ED1\u8272\u8C61\u5F81"
      - "\u767D\u8272\u8C61\u5F81"
      # --- \u8272\u5F69\u60C5\u7EEA ---
      - "\u70ED\u60C5\u8272\u5F69"
      - "\u5FE7\u90C1\u8272\u5F69"
      - "\u5B81\u9759\u8272\u5F69"
      - "\u7D27\u5F20\u8272\u5F69"
      - "\u6E29\u6696\u8272\u5F69"
      - "\u51B7\u6F20\u8272\u5F69"

  color_grading_style:
    cssClass: "dsl-tech-param"
    priority: 39
    words:
      # --- \u8C03\u8272\u98CE\u683C ---
      - "\u9752\u6A59\u8C03"
      - "\u9ED1\u767D\u8C03"
      - "\u590D\u53E4\u8C03"
      - "\u65E5\u7CFB\u8C03"
      - "\u7535\u5F71\u611F\u8C03\u8272"
      - "\u9AD8\u9971\u548C"
      - "\u4F4E\u9971\u548C"
      - "\u9AD8\u7EA7\u7070"
      # --- \u8272\u8C03\u503E\u5411 ---
      - "\u6696\u8272\u8C03"
      - "\u51B7\u8272\u8C03"
      - "\u4E2D\u6027\u8272\u8C03"
      - "\u4F4E\u5BF9\u6BD4"
      - "\u9AD8\u5BF9\u6BD4"
      - "\u68D5\u8910\u8272\u8C03"
      - "\u84DD\u8272\u8C03"
      # --- \u8C03\u8272\u7C7B\u578B ---
      - "\u4E00\u7EA7\u8C03\u8272"
      - "\u4E8C\u7EA7\u8C03\u8272"
      - "\u98CE\u683C\u5316\u8C03\u8272"
      - "LUT\u5E94\u7528"
      - "\u8272\u5F69\u5339\u914D"
`,xo=`# ============================================================
# 07i-director-editing-sound.yaml
# \u8BCD\u7EC4\u8BCD\u5178\xB7\u5BFC\u6F14\u5FC5\u5B66\xB7\u526A\u8F91\u4E0E\u58F0\u97F3\uFF08v2.7.0 \u65B0\u589E\uFF09
# ------------------------------------------------------------
# \u5305\u542B\u5206\u7EC4\uFF085 \u4E2A\uFF09\uFF1A
#   editing_basic      (priority 39, dsl-narrative-term)  \u526A\u8F91\u57FA\u7840
#   montage_theory     (priority 39, dsl-narrative-term)  \u8499\u592A\u5947\u7406\u8BBA
#   editing_rhythm     (priority 39, dsl-narrative-term)  \u526A\u8F91\u8282\u594F
#   sound_design       (priority 39, dsl-tech-param)      \u58F0\u97F3\u8BBE\u8BA1
#   music_score        (priority 39, dsl-narrative-term)  \u914D\u4E50\u97F3\u4E50
# ============================================================

wordLexicon:

  editing_basic:
    cssClass: "dsl-narrative-term"
    priority: 39
    words:
      # --- \u57FA\u7840\u526A\u8F91 ---
      - "\u5207"
      - "\u53E0\u5316"
      - "\u6DE1\u5165\u6DE1\u51FA"
      - "\u5212\u50CF"
      - "\u5B9A\u683C"
      - "\u5012\u653E"
      - "\u9ED1\u573A"
      - "\u767D\u573A"
      # --- \u526A\u8F91\u7C7B\u578B ---
      - "\u8FDE\u8D2F\u6027\u526A\u8F91"
      - "\u975E\u8FDE\u8D2F\u6027\u526A\u8F91"
      - "\u8DF3\u5207"
      - "\u5339\u914D\u526A\u8F91"
      - "\u52A8\u4F5C\u526A\u8F91"
      - "L\u5207"
      - "J\u5207"
      # --- \u8F6C\u573A\u6280\u5DE7 ---
      - "\u6280\u5DE7\u8F6C\u573A"
      - "\u65E0\u6280\u5DE7\u8F6C\u573A"
      - "\u76F4\u63A5\u5207"
      - "\u6DE1\u5165"
      - "\u6DE1\u51FA"
      - "\u6EB6\u89E3"
      - "\u5212\u53D8"

  montage_theory:
    cssClass: "dsl-narrative-term"
    priority: 39
    words:
      # --- \u53D9\u4E8B\u8499\u592A\u5947 ---
      - "\u53D9\u4E8B\u8499\u592A\u5947"
      - "\u5E73\u884C\u8499\u592A\u5947"
      - "\u4EA4\u53C9\u8499\u592A\u5947"
      - "\u8FDE\u7EED\u8499\u592A\u5947"
      - "\u91CD\u590D\u8499\u592A\u5947"
      - "\u7EBF\u5F62\u8499\u592A\u5947"
      # --- \u8868\u73B0\u8499\u592A\u5947 ---
      - "\u8868\u73B0\u8499\u592A\u5947"
      - "\u9690\u55BB\u8499\u592A\u5947"
      - "\u5BF9\u6BD4\u8499\u592A\u5947"
      - "\u5FC3\u7406\u8499\u592A\u5947"
      - "\u6292\u60C5\u8499\u592A\u5947"
      - "\u8C61\u5F81\u8499\u592A\u5947"
      - "\u8054\u60F3\u8499\u592A\u5947"
      # --- \u7406\u6027\u8499\u592A\u5947 ---
      - "\u7406\u6027\u8499\u592A\u5947"
      - "\u6742\u800D\u8499\u592A\u5947"
      - "\u53CD\u5C04\u8499\u592A\u5947"
      - "\u601D\u60F3\u8499\u592A\u5947"
      - "\u8282\u594F\u8499\u592A\u5947"
      # --- \u7ECF\u5178\u7406\u8BBA ---
      - "\u7231\u68EE\u65AF\u5766\u8499\u592A\u5947"
      - "\u5E93\u91CC\u8096\u592B\u6548\u5E94"
      - "\u6556\u5FB7\u8428\u9636\u68AF"
      - "\u5438\u5F15\u529B\u8499\u592A\u5947"

  editing_rhythm:
    cssClass: "dsl-narrative-term"
    priority: 39
    words:
      # --- \u8282\u594F\u7C7B\u578B ---
      - "\u5FEB\u526A"
      - "\u6162\u526A"
      - "\u8DF3\u5207"
      - "\u957F\u955C\u5934"
      - "\u8282\u594F\u70B9"
      - "\u60C5\u7EEA\u526A\u8F91"
      - "\u5185\u90E8\u8282\u594F"
      - "\u5916\u90E8\u8282\u594F"
      # --- \u8282\u594F\u63A7\u5236 ---
      - "\u526A\u8F91\u8282\u594F"
      - "\u955C\u5934\u957F\u5EA6"
      - "\u8282\u594F\u53D8\u5316"
      - "\u8282\u594F\u5BF9\u6BD4"
      - "\u8282\u594F\u9012\u8FDB"
      - "\u8282\u594F\u9AD8\u6F6E"
      # --- \u60C5\u7EEA\u526A\u8F91 ---
      - "\u60C5\u7EEA\u526A\u8F91"
      - "\u5FC3\u7406\u526A\u8F91"
      - "\u610F\u8BC6\u6D41\u526A\u8F91"
      - "\u56DE\u5FC6\u526A\u8F91"
      - "\u68A6\u5883\u526A\u8F91"
      - "\u5E7B\u89C9\u526A\u8F91"

  sound_design:
    cssClass: "dsl-tech-param"
    priority: 39
    words:
      # --- \u58F0\u97F3\u5143\u7D20 ---
      - "\u5BF9\u767D"
      - "\u97F3\u6548"
      - "\u73AF\u5883\u97F3"
      - "\u753B\u5185\u97F3"
      - "\u753B\u5916\u97F3"
      - "\u9759\u97F3"
      - "\u62DF\u97F3"
      - "\u6DF7\u97F3"
      # --- \u540C\u671F\u58F0 ---
      - "\u540C\u671F\u58F0"
      - "\u540C\u671F\u5F55\u97F3"
      - "\u73B0\u573A\u58F0"
      - "Room Tone"
      - "\u623F\u95F4\u58F0"
      - "\u5E95\u566A"
      # --- \u540E\u671F\u58F0\u97F3 ---
      - "ADR"
      - "\u81EA\u52A8\u5BF9\u767D\u66FF\u6362"
      - "\u914D\u97F3"
      - "\u65C1\u767D"
      - "\u7FA4\u6742"
      - "Walla"
      - "Foley"
      - "\u62DF\u97F3"
      - "SFX"
      - "\u97F3\u6548"
      - "SPFX"
      - "\u7279\u6B8A\u97F3\u6548"
      # --- \u58F0\u97F3\u6280\u672F ---
      - "\u58F0\u50CF"
      - "\u7ACB\u4F53\u58F0"
      - "\u73AF\u7ED5\u58F0"
      - "\u5168\u666F\u58F0"
      - "Dolby Atmos"
      - "\u6DF7\u5F55"
      - "M&E"
      - "\u56FD\u9645\u58F0\u8F68"

  music_score:
    cssClass: "dsl-narrative-term"
    priority: 39
    words:
      # --- \u97F3\u4E50\u7C7B\u578B ---
      - "\u4E3B\u9898\u97F3\u4E50"
      - "\u573A\u666F\u97F3\u4E50"
      - "\u6E90\u97F3\u4E50"
      - "\u914D\u4E50"
      - "\u539F\u58F0\u5E26"
      - "Leitmotif"
      - "\u4E3B\u5BFC\u52A8\u673A"
      # --- \u58F0\u6E90\u7C7B\u578B ---
      - "\u6709\u58F0\u6E90\u97F3\u4E50"
      - "\u65E0\u58F0\u6E90\u97F3\u4E50"
      - "\u753B\u5185\u97F3\u4E50"
      - "\u753B\u5916\u97F3\u4E50"
      # --- \u58F0\u753B\u5173\u7CFB ---
      - "\u58F0\u753B\u540C\u6B65"
      - "\u58F0\u753B\u5BF9\u7ACB"
      - "\u58F0\u753B\u5BF9\u4F4D"
      - "\u58F0\u753B\u5206\u79BB"
`,Co=`# ============================================================
# 07j-director-performance-screenplay.yaml
# \u8BCD\u7EC4\u8BCD\u5178\xB7\u5BFC\u6F14\u5FC5\u5B66\xB7\u8868\u6F14\u4E0E\u5267\u4F5C\uFF08v2.7.0 \u65B0\u589E\uFF09
# ------------------------------------------------------------
# \u5305\u542B\u5206\u7EC4\uFF086 \u4E2A\uFF09\uFF1A
#   performance_theory     (priority 43, dsl-emotion-word)        \u8868\u6F14\u7406\u8BBA
#   emotion_expression     (priority 43, dsl-emotion-word)        \u60C5\u7EEA\u8868\u8FBE
#   body_language          (priority 42, dsl-lexicon-performance) \u80A2\u4F53\u8BED\u8A00
#   screenplay_structure   (priority 39, dsl-narrative-term)      \u5267\u4F5C\u7ED3\u6784
#   story_element          (priority 39, dsl-narrative-term)      \u6545\u4E8B\u5143\u7D20
#   dialogue_craft         (priority 39, dsl-narrative-term)      \u5BF9\u767D\u6280\u5DE7
# ============================================================

wordLexicon:

  performance_theory:
    cssClass: "dsl-emotion-word"
    priority: 43
    words:
      # --- \u4E09\u5927\u4F53\u7CFB ---
      - "\u4F53\u9A8C\u6D3E"
      - "\u8868\u73B0\u6D3E"
      - "\u65B9\u6CD5\u6D3E"
      - "\u65AF\u5766\u5C3C\u65AF\u62C9\u592B\u65AF\u57FA"
      - "\u5E03\u83B1\u5E0C\u7279"
      - "\u6885\u5170\u82B3"
      # --- \u8868\u6F14\u6D41\u6D3E ---
      - "\u65AF\u6D3E"
      - "\u5E03\u6D3E"
      - "\u6885\u6D3E"
      - "\u5373\u5174\u8868\u6F14"
      - "\u793E\u4F1A\u8868\u6F14"
      - "\u4EBA\u7C7B\u8868\u6F14\u5B66"
      # --- \u7406\u8BBA\u6982\u5FF5 ---
      - "\u95F4\u79BB\u6548\u679C"
      - "\u964C\u751F\u5316\u6548\u679C"
      - "\u60C5\u7EEA\u8BB0\u5FC6"
      - "\u89C4\u5B9A\u60C5\u5883"
      - "\u771F\u5B9E\u4FE1\u5FF5"
      - "\u89E3\u653E\u5929\u6027"
      # --- \u8BAD\u7EC3\u65B9\u6CD5 ---
      - "\u52A8\u7269\u6A21\u62DF"
      - "\u65E0\u5B9E\u7269\u7EC3\u4E60"
      - "\u89C2\u5BDF\u751F\u6D3B\u7EC3\u4E60"
      - "\u5373\u5174\u521B\u4F5C"

  emotion_expression:
    cssClass: "dsl-emotion-word"
    priority: 43
    words:
      # --- \u57FA\u7840\u60C5\u7EEA ---
      - "\u559C"
      - "\u6012"
      - "\u54C0"
      - "\u60E7"
      - "\u60CA\u8BB6"
      - "\u538C\u6076"
      - "\u8F7B\u8511"
      - "\u7F9E\u6127"
      # --- \u590D\u5408\u60C5\u7EEA ---
      - "\u60B2\u559C\u4EA4\u52A0"
      - "\u767E\u611F\u4EA4\u96C6"
      - "\u5FC3\u65F7\u795E\u6021"
      - "\u5FC3\u733F\u610F\u9A6C"
      - "\u82E5\u6709\u6240\u601D"
      - "\u82E5\u6709\u6240\u5931"
      # --- \u60C5\u7EEA\u72B6\u6001 ---
      - "\u6FC0\u52A8"
      - "\u5E73\u9759"
      - "\u7D27\u5F20"
      - "\u653E\u677E"
      - "\u7126\u8651"
      - "\u5B89\u5FC3"
      - "\u5174\u594B"
      - "\u6CAE\u4E27"

  body_language:
    cssClass: "dsl-lexicon-performance"
    priority: 42
    words:
      # --- \u8868\u60C5 ---
      - "\u773C\u795E"
      - "\u76EE\u5149"
      - "\u7B11\u5BB9"
      - "\u795E\u8272"
      - "\u8868\u60C5"
      - "\u9762\u90E8\u8868\u60C5"
      - "\u5FAE\u8868\u60C5"
      # --- \u52A8\u4F5C ---
      - "\u624B\u52BF"
      - "\u4F53\u6001"
      - "\u8D70\u4F4D"
      - "\u59FF\u6001"
      - "\u80A2\u4F53\u52A8\u4F5C"
      - "\u5F62\u4F53\u52A8\u4F5C"
      - "\u5FC3\u7406\u52A8\u4F5C"
      - "\u8BED\u8A00\u52A8\u4F5C"
      # --- \u7A0B\u5F0F\u5316 ---
      - "\u53F0\u6B65"
      - "\u624B\u52BF"
      - "\u8EAB\u6BB5"
      - "\u5531\u5FF5\u505A\u6253"
      - "\u624B\u773C\u8EAB\u6CD5\u6B65"
      - "\u751F\u65E6\u51C0\u4E11"

  screenplay_structure:
    cssClass: "dsl-narrative-term"
    priority: 39
    words:
      # --- \u7ED3\u6784\u7C7B\u578B ---
      - "\u4E09\u5E55\u7ED3\u6784"
      - "\u4E94\u5E55\u7ED3\u6784"
      - "\u82F1\u96C4\u4E4B\u65C5"
      - "\u8D77\u627F\u8F6C\u5408"
      - "\u6089\u5FB7\u83F2\u5C14\u5FB7\u8303\u5F0F"
      # --- \u7ED3\u6784\u8981\u7D20 ---
      - "\u6FC0\u52B1\u4E8B\u4EF6"
      - "\u6545\u4E8B\u4E2D\u70B9"
      - "\u7075\u9B42\u9ED1\u591C"
      - "\u9AD8\u6F6E"
      - "\u7ED3\u5C40"
      - "\u60C5\u8282\u70B9\u4E00"
      - "\u60C5\u8282\u70B9\u4E8C"
      # --- \u7ED3\u6784\u5C42\u7EA7 ---
      - "\u5E55"
      - "\u5E8F\u5217"
      - "\u573A\u666F"
      - "\u8282\u62CD"
      - "\u6BB5\u843D"
      - "\u573A\u6B21"
      # --- \u53D9\u4E8B\u65B9\u5F0F ---
      - "\u7EBF\u6027\u53D9\u4E8B"
      - "\u975E\u7EBF\u6027\u53D9\u4E8B"
      - "\u73AF\u5F62\u53D9\u4E8B"
      - "\u5012\u53D9"
      - "\u63D2\u53D9"
      - "\u591A\u7EBF\u53D9\u4E8B"
      - "\u91CD\u590D\u7EBF\u6027\u53D9\u4E8B"

  story_element:
    cssClass: "dsl-narrative-term"
    priority: 39
    words:
      # --- \u4EBA\u7269\u5143\u7D20 ---
      - "\u4EBA\u7269\u5F27\u5149"
      - "\u6B63\u5411\u5F27\u5149"
      - "\u8D1F\u5411\u5F27\u5149"
      - "\u9759\u6001\u5F27\u5149"
      - "\u4EBA\u7269\u52A8\u673A"
      - "\u4EBA\u7269\u76EE\u6807"
      # --- \u51B2\u7A81\u5143\u7D20 ---
      - "\u51B2\u7A81"
      - "\u963B\u788D"
      - "\u8F6C\u6298"
      - "\u4F0F\u7B14"
      - "\u60AC\u5FF5"
      - "\u94FA\u57AB"
      - "\u547C\u5E94"
      # --- \u6545\u4E8B\u6838\u5FC3 ---
      - "\u4E3B\u9898"
      - "\u9898\u6750"
      - "\u7C7B\u578B"
      - "\u6545\u4E8B\u6838\u5FC3"
      - "\u6545\u4E8B\u6897\u6982"
      - "\u4EBA\u7269\u5C0F\u4F20"

  dialogue_craft:
    cssClass: "dsl-narrative-term"
    priority: 39
    words:
      # --- \u5BF9\u767D\u5F62\u5F0F ---
      - "\u6F5C\u53F0\u8BCD"
      - "\u72EC\u767D"
      - "\u65C1\u767D"
      - "\u5BF9\u767D\u8282\u594F"
      - "\u753B\u5916\u97F3"
      - "\u72EC\u89D2\u620F"
      # --- \u5BF9\u767D\u6280\u5DE7 ---
      - "\u4EBA\u7269\u8BED\u8A00"
      - "\u52A8\u4F5C\u8BED\u8A00"
      - "\u5BF9\u767D\u94FA\u57AB"
      - "\u5BF9\u767D\u547C\u5E94"
      - "\u5BF9\u767D\u51B2\u7A81"
`,wo=`# ============================================================
# 07k-director-genre-production.yaml
# \u8BCD\u7EC4\u8BCD\u5178\xB7\u5BFC\u6F14\u5FC5\u5B66\xB7\u7C7B\u578B/\u5236\u7247/\u7535\u5F71\u53F2\uFF08v2.7.0 \u65B0\u589E\uFF09
# ------------------------------------------------------------
# \u5305\u542B\u5206\u7EC4\uFF085 \u4E2A\uFF09\uFF1A
#   genre_film             (priority 39, dsl-narrative-term) \u7C7B\u578B\u7247
#   film_movement          (priority 39, dsl-narrative-term) \u7535\u5F71\u6D41\u6D3E
#   production_management  (priority 38, dsl-param-key)      \u5236\u7247\u7BA1\u7406
#   post_production        (priority 39, dsl-tech-param)     \u540E\u671F\u5236\u4F5C
#   film_theory            (priority 39, dsl-narrative-term) \u7535\u5F71\u7406\u8BBA
# ============================================================

wordLexicon:

  genre_film:
    cssClass: "dsl-narrative-term"
    priority: 39
    words:
      # --- \u57FA\u7840\u7C7B\u578B ---
      - "\u5267\u60C5\u7247"
      - "\u559C\u5267\u7247"
      - "\u60AC\u7591\u7247"
      - "\u6050\u6016\u7247"
      - "\u52A8\u4F5C\u7247"
      - "\u79D1\u5E7B\u7247"
      - "\u5947\u5E7B\u7247"
      - "\u7EAA\u5F55\u7247"
      - "\u52A8\u753B\u7247"
      # --- \u7ECF\u5178\u7C7B\u578B ---
      - "\u9ED1\u8272\u7535\u5F71"
      - "\u897F\u90E8\u7247"
      - "\u6B4C\u821E\u7247"
      - "\u7231\u60C5\u7247"
      - "\u72AF\u7F6A\u7247"
      - "\u60CA\u609A\u7247"
      - "\u5192\u9669\u7247"
      - "\u6218\u4E89\u7247"
      # --- \u6269\u5C55\u7C7B\u578B ---
      - "\u4F20\u8BB0\u7247"
      - "\u5386\u53F2\u7247"
      - "\u707E\u96BE\u7247"
      - "\u6B66\u4FA0\u7247"
      - "\u795E\u8BDD\u7247"
      - "\u97F3\u4E50\u7247"
      - "\u5BB6\u5EAD\u7247"
      - "\u53F2\u8BD7\u7247"
      - "\u8B66\u532A\u7247"
      # --- \u5B50\u7C7B\u578B ---
      - "\u795E\u7ECF\u559C\u5267"
      - "\u9ED1\u5E2E\u7247"
      - "\u592A\u7A7A\u6B4C\u5267"
      - "\u8D85\u7EA7\u82F1\u96C4\u7247"
      - "B\u7EA7\u7247"
      - "\u72EC\u7ACB\u7535\u5F71"
      - "\u827A\u672F\u7247"
      - "\u5546\u4E1A\u7247"

  film_movement:
    cssClass: "dsl-narrative-term"
    priority: 39
    words:
      # --- \u7ECF\u5178\u6D41\u6D3E ---
      - "\u5FB7\u56FD\u8868\u73B0\u4E3B\u4E49"
      - "\u610F\u5927\u5229\u65B0\u73B0\u5B9E\u4E3B\u4E49"
      - "\u6CD5\u56FD\u65B0\u6D6A\u6F6E"
      - "\u65B0\u597D\u83B1\u575E"
      - "\u82CF\u8054\u8499\u592A\u5947\u5B66\u6D3E"
      # --- \u6B27\u6D32\u6D41\u6D3E ---
      - "\u6CD5\u56FD\u8BD7\u610F\u73B0\u5B9E\u4E3B\u4E49"
      - "\u82F1\u56FD\u81EA\u7531\u7535\u5F71"
      - "\u65B0\u5FB7\u56FD\u7535\u5F71"
      - "Dogme 95"
      # --- \u5148\u950B\u6D3E ---
      - "\u8D85\u73B0\u5B9E\u4E3B\u4E49"
      - "\u5370\u8C61\u6D3E\u7535\u5F71"
      - "\u8FBE\u8FBE\u4E3B\u4E49"
      - "\u8868\u73B0\u4E3B\u4E49\u7535\u5F71"
      # --- \u4E9A\u6D32\u6D41\u6D3E ---
      - "\u65E5\u672C\u7535\u5F71\u65B0\u6D6A\u6F6E"
      - "\u4E2D\u56FD\u7B2C\u4E94\u4EE3\u5BFC\u6F14"
      - "\u4E2D\u56FD\u7B2C\u516D\u4EE3\u5BFC\u6F14"
      - "\u9999\u6E2F\u65B0\u6D6A\u6F6E"
      - "\u53F0\u6E7E\u65B0\u7535\u5F71"

  production_management:
    cssClass: "dsl-param-key"
    priority: 38
    words:
      # --- \u5236\u7247\u6D41\u7A0B ---
      - "\u524D\u671F\u5236\u4F5C"
      - "\u62CD\u6444\u671F\u95F4"
      - "\u540E\u671F\u5236\u4F5C"
      - "\u8BD5\u6620"
      - "\u9996\u6620"
      - "\u53D1\u884C"
      # --- \u5236\u7247\u7BA1\u7406 ---
      - "\u62CD\u6444\u8BA1\u5212"
      - "\u9884\u7B97\u63A7\u5236"
      - "\u573A\u666F\u7BA1\u7406"
      - "\u6F14\u5458\u8C03\u5EA6"
      - "\u901A\u544A\u5355"
      - "\u5206\u955C\u8868"
      - "\u5267\u672C\u62C6\u89E3"
      # --- \u5236\u7247\u89D2\u8272 ---
      - "\u5236\u7247\u4EBA"
      - "\u6267\u884C\u5236\u7247\u4EBA"
      - "\u5236\u7247\u4E3B\u4EFB"
      - "\u573A\u8BB0"
      - "\u5267\u52A1"
      - "\u7EDF\u7B79"
      - "\u5916\u8054\u5236\u7247"
      # --- \u62CD\u6444\u7BA1\u7406 ---
      - "\u62CD\u6444\u65E5\u7A0B"
      - "\u573A\u666F\u8C03\u5EA6"
      - "\u901A\u544A\u65F6\u95F4"
      - "\u62CD\u6444\u5730\u70B9"
      - "\u6F14\u5458\u6863\u671F"
      - "\u8BBE\u5907\u79DF\u8D41"

  post_production:
    cssClass: "dsl-tech-param"
    priority: 39
    words:
      # --- \u526A\u8F91\u6D41\u7A0B ---
      - "\u7C97\u526A"
      - "\u7CBE\u526A"
      - "\u753B\u9762\u9501\u5B9A"
      - "EDL"
      - "\u6570\u5B57\u4E2D\u95F4\u7247"
      - "\u526A\u8F91\u51B3\u7B56\u6E05\u5355"
      # --- \u540E\u671F\u73AF\u8282 ---
      - "\u526A\u8F91"
      - "\u7279\u6548"
      - "\u8C03\u8272"
      - "\u6DF7\u97F3"
      - "\u5B57\u5E55"
      - "\u8F93\u51FA\u683C\u5F0F"
      - "\u5408\u6210"
      - "\u89C6\u89C9\u7279\u6548"
      - "VFX"
      - "CGI"
      # --- \u540E\u671F\u89D2\u8272 ---
      - "\u526A\u8F91\u5E08"
      - "\u8C03\u8272\u5E08"
      - "\u6DF7\u97F3\u5E08"
      - "\u7279\u6548\u5E08"
      - "\u5408\u6210\u5E08"
      - "\u5B57\u5E55\u5E08"
      # --- \u540E\u671F\u8F6F\u4EF6 ---
      - "Premiere"
      - "Final Cut"
      - "Avid"
      - "DaVinci Resolve"
      - "After Effects"
      - "Nuke"
      # --- \u8F93\u51FA\u683C\u5F0F ---
      - "\u9662\u7EBF\u7248\u672C"
      - "\u6D41\u5A92\u4F53\u7248\u672C"
      - "\u7535\u89C6\u7248\u672C"
      - "IMAX\u7248\u672C"
      - "3D\u7248\u672C"
      - "4K\u7248\u672C"

  film_theory:
    cssClass: "dsl-narrative-term"
    priority: 39
    words:
      # --- \u7ECF\u5178\u7406\u8BBA ---
      - "\u4F5C\u8005\u8BBA"
      - "\u7C7B\u578B\u8BBA"
      - "\u5F62\u5F0F\u4E3B\u4E49"
      - "\u5199\u5B9E\u4E3B\u4E49"
      - "\u73B0\u5B9E\u4E3B\u4E49"
      - "\u73B0\u8C61\u5B66"
      # --- \u73B0\u4EE3\u7406\u8BBA ---
      - "\u7B26\u53F7\u5B66"
      - "\u7CBE\u795E\u5206\u6790"
      - "\u5973\u6027\u4E3B\u4E49"
      - "\u610F\u8BC6\u5F62\u6001\u6279\u8BC4"
      - "\u6587\u5316\u7814\u7A76"
      - "\u7ED3\u6784\u4E3B\u4E49"
      - "\u540E\u73B0\u4EE3\u4E3B\u4E49"
      # --- \u7406\u8BBA\u5BB6 ---
      - "\u5DF4\u8D5E"
      - "\u7231\u68EE\u65AF\u5766"
      - "\u9EA6\u8328"
      - "\u7C73\u7279\u91CC"
      - "\u5FB7\u52D2\u5179"
      - "\u62C9\u5EB7"
      - "\u963F\u5C14\u90FD\u585E"
      # --- \u7406\u8BBA\u6982\u5FF5 ---
      - "\u573A\u9762\u8C03\u5EA6"
      - "\u957F\u955C\u5934\u7406\u8BBA"
      - "\u666F\u6DF1\u955C\u5934"
      - "\u8499\u592A\u5947\u7406\u8BBA"
      - "\u955C\u50CF\u7406\u8BBA"
      - "\u51DD\u89C6\u7406\u8BBA"
`;function Er(){return{"01-base-patterns.yaml":oo,"02-semantic-context.yaml":ao,"03-lexicon-optional.yaml":no,"04-theme-color.yaml":lo,"05-priority.yaml":co,"06-char-lexicon.yaml":po,"07-word-lexicon.yaml":go,"07a-constraint-tech-phrase.yaml":uo,"07b-narrative-scene-phrase.yaml":ho,"07c-camera-action-phrase.yaml":mo,"07d-english-core-phrase.yaml":fo,"07e-english-extended-phrase.yaml":yo,"07f-english-subject-phrase.yaml":vo,"07g-director-cinematography.yaml":bo,"07h-director-lighting-color.yaml":ko,"07i-director-editing-sound.yaml":xo,"07j-director-performance-screenplay.yaml":Co,"07k-director-genre-production.yaml":wo}}var Pr=new Set;function So(a){let o=new Set,t=/[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/;for(let e of a)t.test(e.regex.source)&&o.add(e.cssClass);return o}function He(a,o="",t=""){var e,s,r,i,n;try{let l=xt(a["01-base-patterns.yaml"]),c=xt(a["02-semantic-context.yaml"]),d=xt(a["04-theme-color.yaml"]),p=xt(a["05-priority.yaml"]);if(!l)return console.error("[PromptColorizer] \u57FA\u7840\u6A21\u5F0F\u914D\u7F6E\u89E3\u6790\u5931\u8D25"),null;let g=(e=p==null?void 0:p.defaultPatternPriority)!=null?e:30,u=Eo(l.patterns,g),h=To(c),y=(s=d==null?void 0:d.styleRules)!=null?s:{},m=(r=d==null?void 0:d.colors)!=null?r:{},b=(i=c==null?void 0:c.scanStateEnum)!=null?i:{Normal:0,InQuoteDialogue:1,InBlockWrapper:2};return Pr=So(u),{rules:u,contextRules:h,colorTokens:m,palettes:(n=d==null?void 0:d.palettes)!=null?n:{},styleRules:y,scanStateEnum:b,version:o,updateTime:t}}catch(l){return console.error("[PromptColorizer] \u89C4\u5219\u96C6\u7F16\u8BD1\u5931\u8D25:",l),null}}function xt(a){if(!a)return null;try{return Cr(a)}catch(o){return console.error("[PromptColorizer] \u914D\u7F6E\u89E3\u6790\u5931\u8D25:",o),null}}function Eo(a,o){var e,s,r;if(!a)return[];let t=[];for(let[i,n]of Object.entries(a))try{let l=n.flags||"g",c=new RegExp(n.regex,l);t.push({id:i,regex:c,cssClass:n.cssClass,priority:(e=n.priority)!=null?e:o,blockLevel:(s=n.blockLevel)!=null?s:!1,captureGroup:(r=n.captureGroup)!=null?r:0,subClass:n.subClass})}catch(l){console.warn(`[PromptColorizer] \u6B63\u5219\u7F16\u8BD1\u5931\u8D25: ${i}`,l)}return t.sort((i,n)=>n.priority-i.priority),t}function To(a){if(!(a!=null&&a.contextMap))return[];let o=[];for(let[t,e]of Object.entries(a.contextMap))e!=null&&e.allowPatterns&&o.push({blockMarker:t,allowPatterns:e.allowPatterns});return o}function cs(){let a=Er();return He(a,wr,Sr)}function G(a,o){let t=a.replace("#",""),e=parseInt(t.substring(0,2),16),s=parseInt(t.substring(2,4),16),r=parseInt(t.substring(4,6),16);return`rgba(${e}, ${s}, ${r}, ${o})`}function _o(a){let o=a.replace("#",""),t=parseInt(o.substring(0,2),16)/255,e=parseInt(o.substring(2,4),16)/255,s=parseInt(o.substring(4,6),16)/255,r=Math.max(t,e,s),i=Math.min(t,e,s),n=(r+i)/2;if(r===i)return{h:0,s:0,l:n};let l=r-i,c=n>.5?l/(2-r-i):l/(r+i),d;return r===t?d=((e-s)/l+(e<s?6:0))/6:r===e?d=((s-t)/l+2)/6:d=((t-e)/l+4)/6,{h:d*360,s:c,l:n}}function Ct(a,o,t){a=(a%360+360)%360,o=Math.min(1,Math.max(0,o)),t=Math.min(1,Math.max(0,t));let e=(1-Math.abs(2*t-1))*o,s=e*(1-Math.abs(a/60%2-1)),r=t-e/2,i=0,n=0,l=0;a<60?(i=e,n=s):a<120?(i=s,n=e):a<180?(n=e,l=s):a<240?(n=s,l=e):a<300?(i=s,l=e):(i=e,l=s);let c=d=>Math.round((d+r)*255).toString(16).padStart(2,"0");return`#${c(i)}${c(n)}${c(l)}`}function Tr(a,o){if(!a||!a.startsWith("#")||o==="default")return a;let{h:t,s:e,l:s}=_o(a);if(e<.02)return a;switch(o){case"soft":return Ct(t,e*.6,s);case"mono":return Ct(t,e*.12,s);case"vivid":return Ct(t,Math.min(1,e*1.2),s);case"contrast":{let r=s>.5?Math.max(.06,s-.15):Math.min(.94,s+.15);return Ct(t,Math.min(1,e*1.1),r)}default:return a}}var Po={softLight:.06,softDark:.1,softCnBoost:.02,borderLight:.15,borderDark:.2,borderCnBoost:.03},ue=a=>Math.min(.6,Math.max(.01,a));function ds(a,o="default",t={}){if(Object.keys(a).length===0)return"";let e={...Po,...t},s=`/* \u52A8\u6001\u989C\u8272\u4EE4\u724C \u2014 \u7531 YAML colors \u533A\u5757\u81EA\u52A8\u751F\u6210 */

`;s+=`:root {
`;for(let[r,i]of Object.entries(a)){let n=Tr(i.light||"#888888",o);s+=`  --dsl-${r}: ${n};
`,s+=`  --dsl-${r}-soft: ${G(n,ue(e.softLight))};
`,s+=`  --dsl-${r}-soft-cn: ${G(n,ue(e.softLight+e.softCnBoost))};
`,s+=`  --dsl-${r}-border: ${G(n,ue(e.borderLight))};
`,s+=`  --dsl-${r}-border-cn: ${G(n,ue(e.borderLight+e.borderCnBoost))};
`,s+=`  --dsl-${r}-glow: 0 0 2px ${G(n,.55)}, 0 0 6px ${G(n,.3)}, 0 0 14px ${G(n,.12)};
`}s+=`}

`,s+=`body.theme-dark {
`;for(let[r,i]of Object.entries(a)){let n=Tr(i.dark||i.light||"#888888",o);s+=`  --dsl-${r}: ${n};
`,s+=`  --dsl-${r}-soft: ${G(n,ue(e.softDark))};
`,s+=`  --dsl-${r}-soft-cn: ${G(n,ue(e.softDark+e.softCnBoost))};
`,s+=`  --dsl-${r}-border: ${G(n,ue(e.borderDark))};
`,s+=`  --dsl-${r}-border-cn: ${G(n,ue(e.borderDark+e.borderCnBoost))};
`,s+=`  --dsl-${r}-glow: 0 0 2px ${G(n,.75)}, 0 0 8px ${G(n,.45)}, 0 0 18px ${G(n,.18)};
`}return s+=`}

`,s}function U(a,o,t){if(!a||typeof a!="string")return a;let e=a.trim();if(/^var\(--[\w-]+\)$/.test(e)||/^#[0-9a-fA-F]{3,8}$/.test(e)||/^(rgba?|hsla?)\(/i.test(e)||/^(transparent|none|inherit|initial|unset)$/i.test(e))return e;let s=e.match(/^([a-zA-Z_][\w-]*)$/);if(s){let n=s[1];return o[n]?`var(--dsl-${n})`:e}let r=e.match(/^([a-zA-Z_][\w-]*)\.(soft|border|glow)$/);if(r){let n=r[1],l=r[2];if(o[n]){let c=l==="glow"?l:t?`${l}-cn`:l;return`var(--dsl-${n}-${c})`}return e}let i=e.match(/^mix\(\s*([\w#-]+)\s*,\s*([\w#-]+)\s*(?:,\s*([\d.]+)\s*)?\)$/);if(i){let n=d=>o[d]?`var(--dsl-${d})`:/^#[0-9a-fA-F]{3,8}$/.test(d)?d:null,l=n(i[1]),c=n(i[2]);if(l&&c){let d=i[3]?parseInt(i[3],10):50;return`color-mix(in oklab, ${l}, ${c} ${d}%)`}return e}return e.replace(/\b([a-zA-Z_][\w-]*(?:\.(?:soft|border|glow))?)\b/g,n=>{if(/^(solid|dashed|dotted|none|hidden|medium|thick|thin|px|em|rem|vh|vw|%|auto|center|left|right|top|bottom|bold|normal|italic|underline|none|block|inline|flex|grid)$/i.test(n))return n;let l=n.split("."),c=l[0],d=l[1];if(o[c]){if(d==="glow")return`var(--dsl-${c}-glow)`;if(d==="soft"||d==="border"){let p=t?`${d}-cn`:d;return`var(--dsl-${c}-${p})`}return`var(--dsl-${c})`}return n})}function ls(a,o,t){let e=[];return a.color&&e.push(`  color: ${U(a.color,o,t)};`),a.fontWeight&&(t&&a.fontWeight==="bold"?e.push("  font-weight: var(--pc-weight-bold-cn);"):e.push(`  font-weight: ${a.fontWeight};`)),a.fontStyle&&e.push(`  font-style: ${a.fontStyle};`),a.fontFamily&&(a.fontFamily==="monospace"?e.push("  font-family: var(--pc-font-mono);"):e.push(`  font-family: ${a.fontFamily};`)),a.fontSize&&e.push(`  font-size: ${a.fontSize};`),a.textDecoration&&e.push(`  text-decoration: ${a.textDecoration};`),a.background&&e.push(`  background: ${U(a.background,o,t)};`),a.border&&e.push(`  border: ${U(a.border,o,t)};`),a.borderBottom&&e.push(`  border-bottom: ${U(a.borderBottom,o,t)};`),a.borderLeft&&e.push(`  border-left: ${U(a.borderLeft,o,t)};`),a.borderRadius&&e.push(`  border-radius: ${a.borderRadius};`),a.padding&&e.push(`  padding: ${a.padding};`),a.paddingLeft&&e.push(`  padding-left: ${a.paddingLeft};`),a.opacity&&e.push(`  opacity: ${a.opacity};`),a.textShadow&&e.push(`  text-shadow: ${U(a.textShadow,o,t)};`),a.textStroke&&e.push(`  -webkit-text-stroke: ${U(a.textStroke,o,t)};`),a.textFillColor&&e.push(`  -webkit-text-fill-color: ${U(a.textFillColor,o,t)};`),a.boxShadow&&e.push(`  box-shadow: ${U(a.boxShadow,o,t)};`),a.letterSpacing&&e.push(`  letter-spacing: ${a.letterSpacing};`),a.verticalAlign&&e.push(`  vertical-align: ${a.verticalAlign};`),a.textTransform&&e.push(`  text-transform: ${a.textTransform};`),a.filter&&e.push(`  filter: ${a.filter};`),a.animation&&e.push(`  animation: ${a.animation};`),a.backgroundImage&&e.push(`  background-image: ${U(a.backgroundImage,o,t)};`),a.backgroundSize&&e.push(`  background-size: ${a.backgroundSize};`),a.backgroundClip&&(e.push(`  -webkit-background-clip: ${a.backgroundClip};`),e.push(`  background-clip: ${a.backgroundClip};`),a.backgroundClip==="text"&&e.push("  -webkit-text-fill-color: transparent;")),e}function _r(a,o,t){let e={content:"content",color:"color",fontSize:"font-size",fontWeight:"font-weight",fontStyle:"font-style",fontFamily:"font-family",opacity:"opacity",verticalAlign:"vertical-align",letterSpacing:"letter-spacing",textShadow:"text-shadow",marginLeft:"margin-left",marginRight:"margin-right",padding:"padding"},s=[];for(let[r,i]of Object.entries(a)){let n=r==="content"?i:U(i,o,t),l=e[r];l&&s.push(`  ${l}: ${n};`)}return s}function wt(a,o,t,e){return e.length===0||(a+=`.cm-line .${o}${t} {
${e.join(`
`)}
}

`,a+=`.${o}${t} {
${e.join(`
`)}
}

`),a}var Rr={"pc-rainbow-flow":`@keyframes pc-rainbow-flow {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}`,"pc-glow-pulse":`@keyframes pc-glow-pulse {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.35); }
}`,"pc-fade-blink":`@keyframes pc-fade-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.72; }
}`};function Ro(a){var e;let o=new Set,t=s=>{if(!s)return;let r=s.match(/(pc-[\w-]+)/);r&&Rr[r[1]]&&o.add(r[1])};for(let s of Object.values(a))t(s.animation),t((e=s.hover)==null?void 0:e.animation);return o}function Dr(a,o={},t){let e=`/* \u81EA\u52A8\u751F\u6210\u7684 DSL \u6837\u5F0F\u89C4\u5219 */

`,s=t!=null?t:Pr;for(let[r,i]of Object.entries(a)){let n=s.has(r);if(e=wt(e,r,"",ls(i,o,n)),i.hover&&(e=wt(e,r,":hover",ls(i.hover,o,n))),i.before&&(e=wt(e,r,"::before",_r(i.before,o,n))),i.after&&(e=wt(e,r,"::after",_r(i.after,o,n))),i.editor){let l=ls(i.editor,o,n);l.length>0&&(e+=`.cm-line.${r} {
${l.join(`
`)}
}

`)}}for(let r of Ro(a))e+=Rr[r]+`

`;return e}var Do=["dsl-constraint","dsl-sd-negative-header","dsl-negative-tag","dsl-role-tag","dsl-md-strikethrough"],Mo=["dsl-dialogue","dsl-quality-tag","dsl-quality-tag-ext","dsl-md-task"];function Mr(){let a=`/* \u8272\u76F2\u8F85\u52A9 \u2014 \u7EA2/\u7EFF\u7CFB\u4EE4\u724C\u5197\u4F59\u4E0B\u5212\u7EBF\uFF08\u975E\u8272\u76F8\u7F16\u7801\uFF09 */
`;a+=`body.pc-colorblind-assist .cm-line, body.pc-colorblind-assist .markdown-preview-view { /* scope */ }
`;for(let o of Do)a+=`body.pc-colorblind-assist .cm-line .${o} { text-decoration: underline wavy currentColor; text-decoration-thickness: 1px; }
`,a+=`body.pc-colorblind-assist .${o} { text-decoration: underline wavy currentColor; text-decoration-thickness: 1px; }
`;for(let o of Mo)a+=`body.pc-colorblind-assist .cm-line .${o} { text-decoration: underline currentColor; text-decoration-thickness: 2px; }
`,a+=`body.pc-colorblind-assist .${o} { text-decoration: underline currentColor; text-decoration-thickness: 2px; }
`;return a}var Lo={md_frontmatter:"\u5143\u6570\u636E\u8D77\u59CB\u7EBF",md_heading:"\u6807\u9898",md_bold:"\u7C97\u4F53",md_italic:"\u659C\u4F53",md_strikethrough:"\u5220\u9664\u7EBF",md_highlight:"\u9AD8\u4EAE",md_subscript:"\u4E0B\u6807",md_superscript:"\u4E0A\u6807",md_code_fence:"\u4EE3\u7801\u5757\u56F4\u680F",md_inline_code:"\u884C\u5185\u4EE3\u7801",md_mermaid:"\u56FE\u8868\u4EE3\u7801\u5757",md_link:"\u5916\u90E8\u94FE\u63A5",md_image:"\u56FE\u7247\u5F15\u7528",md_wiki_link:"\u53CC\u94FE",md_anchor_link:"\u951A\u70B9\u94FE\u63A5",md_tag:"\u6807\u7B7E",md_emoji_shortcode:"\u8868\u60C5\u4EE3\u7801",md_task_list:"\u4EFB\u52A1\u5217\u8868",md_list_item:"\u5217\u8868\u9879",md_footnote_ref:"\u811A\u6CE8\u5F15\u7528",md_footnote_def:"\u811A\u6CE8\u5B9A\u4E49",md_math_inline:"\u884C\u5185\u516C\u5F0F",md_math_block:"\u5757\u7EA7\u516C\u5F0F",md_blockquote:"\u5F15\u7528\u5757",md_nested_quote:"\u5D4C\u5957\u5F15\u7528",md_callout:"\u6807\u6CE8\u6846",md_callout_meta:"\u6807\u6CE8\u5143\u6570\u636E",md_admonition:"\u8B66\u793A\u5757",md_hr:"\u6C34\u5E73\u5206\u5272\u7EBF",md_table_sep:"\u8868\u683C\u5206\u9694\u884C",md_table_row:"\u8868\u683C\u884C",md_definition:"\u5B9A\u4E49\u5217\u8868",md_block_id:"\u5757 ID",md_comment:"\u6CE8\u91CA",md_yaml_key:"YAML \u5C5E\u6027\u952E",kbd_tag:"\u952E\u76D8\u952E\u6807\u7B7E",html_tag:"HTML \u6807\u7B7E",block_wrapper:"\u533A\u5757\u6807\u8BB0",shot_header:"\u5206\u955C\u5934\u5934",asset_ref:"\u8D44\u6E90\u5F15\u7528",asset_bracket:"\u8D44\u6E90\u65B9\u62EC\u53F7",param_key:"\u53C2\u6570\u952E",dialogue_cn:"\u4E2D\u6587\u53F0\u8BCD",dialogue_en:"\u82F1\u6587\u53F0\u8BCD",constraint:"\u7EA6\u675F\u5173\u952E\u5B57",tech_param:"\u6280\u672F\u53C2\u6570",parenthetical:"\u62EC\u53F7\u8865\u5145",variable:"\u53D8\u91CF\u5360\u4F4D",role_tag:"\u89D2\u8272\u6807\u7B7E",instruction:"\u6307\u4EE4\u6807\u8BB0",emphasis_weight:"\u6743\u91CD\u5F3A\u8C03",lora_ref:"LoRA \u5F15\u7528",bracket_strong:"\u5F3A\u62EC\u53F7",bracket_weak:"\u5F31\u62EC\u53F7",quality_tag:"\u8D28\u91CF\u6807\u7B7E",sd_negative_header:"SD \u8D1F\u9762\u76EE\u7709",audio_ref:"\u97F3\u9891\u5F15\u7528",audio_tone:"\u97F3\u9891\u97F3\u8C03",audio_sfx:"\u97F3\u6548\u6807\u8BB0",sd_parameter:"SD \u53C2\u6570",timestamp:"\u65F6\u95F4\u6233",version_number:"\u7248\u672C\u53F7",url_link:"URL \u94FE\u63A5",file_path:"\u6587\u4EF6\u8DEF\u5F84",cli_command:"\u547D\u4EE4\u884C",key_value:"\u952E\u503C\u5BF9",reference_marker:"\u5F15\u7528\u6807\u8BB0",separator:"\u5206\u9694\u7B26",antml_tag:"ANTML \u6807\u7B7E",function_results_tag:"\u51FD\u6570\u7ED3\u679C\u6807\u7B7E",xml_block:"XML \u5757",chat_token:"\u5BF9\u8BDD\u4EE4\u724C",llama3_token:"Llama3 \u4EE4\u724C",gemma_token:"Gemma \u4EE4\u724C",llama2_sys:"Llama2 \u7CFB\u7EDF\u6BB5",workflow_sep:"\u5DE5\u4F5C\u6D41\u5206\u9694",json_schema_key:"JSON Schema \u952E",jinja_control:"Jinja \u63A7\u5236\u7B26",workflow_node:"\u5DE5\u4F5C\u6D41\u8282\u70B9",email:"\u90AE\u7BB1",ip_address:"IP \u5730\u5740",mac_address:"MAC \u5730\u5740",uuid:"UUID",hex_color:"\u5341\u516D\u8FDB\u5236\u8272\u503C",css_color_func:"CSS \u989C\u8272\u51FD\u6570",geo_coord:"\u5730\u7406\u5750\u6807",currency:"\u8D27\u5E01\u91D1\u989D",percentage:"\u767E\u5206\u6BD4",measurement:"\u5EA6\u91CF\u6570\u503C",shot_id:"\u955C\u5934\u7F16\u53F7",segment_header:"\u6BB5\u843D\u5934",module_header:"\u6A21\u5757\u5934",dialogue_speaker:"\u8BF4\u8BDD\u4EBA\u6807\u8BB0",character_def:"\u89D2\u8272\u5B9A\u4E49",book_title:"\u4E66\u540D\u53F7",cn_chapter:"\u4E2D\u6587\u7AE0\u8282",time_range:"\u65F6\u95F4\u8303\u56F4",section_note:"\u5C0F\u8282\u6CE8\u91CA",ssml_tag:"SSML \u6807\u7B7E",lyric_section:"\u6B4C\u8BCD\u6BB5\u843D",suno_meta:"Suno \u5143\u6807\u8BB0",avatar_directive:"\u6570\u5B57\u4EBA\u6307\u4EE4",copilot_formula:"\u516C\u5F0F\u5757",react_marker:"React \u6807\u8BB0",cot_trigger:"\u601D\u7EF4\u94FE\u89E6\u53D1",model_identifier:"\u6A21\u578B\u6807\u8BC6",comfyui_node:"ComfyUI \u8282\u70B9",pika_parameter:"Pika \u53C2\u6570",runway_parameter:"Runway \u53C2\u6570",translation_marker:"\u7FFB\u8BD1\u6807\u8BB0",fewshot_marker:"\u5C11\u6837\u672C\u6807\u8BB0",gen3d_platform:"3D \u751F\u6210\u5E73\u53F0",explicit_identifier:"\u663E\u5F0F\u6807\u8BC6\u7B26",explicit_string:"\u663E\u5F0F\u5B57\u7B26\u4E32",constraint_absolute:"\u7EDD\u5BF9\u7EA6\u675F\u8BCD",constraint_soft:"\u8F6F\u7EA6\u675F\u8BCD",param_key_strict:"\u4E25\u683C\u53C2\u6570\u952E",dialogue_cn_strict:"\u4E25\u683C\u4E2D\u6587\u53F0\u8BCD",parenthetical_strict:"\u4E25\u683C\u62EC\u53F7\u8865\u5145",parenthetical_half:"\u534A\u89D2\u62EC\u53F7\u8865\u5145",custom_inline_rule:"\u5185\u8054\u81EA\u5B9A\u4E49\u89C4\u5219"};function Lr(a){var o;return(o=Lo[a])!=null?o:a}var F=require("obsidian"),St=class{constructor(o,t){this.app=o;this.pluginId=t}getCacheDir(){return(0,F.normalizePath)(`.obsidian/plugins/${this.pluginId}/cache`)}getVersionFilePath(){return(0,F.normalizePath)(`${this.getCacheDir()}/version.json`)}getRulesDir(){return(0,F.normalizePath)(`${this.getCacheDir()}/rules`)}async ensureFolder(o){let t=o.split("/"),e="";for(let s of t){if(!s)continue;if(e=e?`${e}/${s}`:s,!await this.app.vault.adapter.exists(e))try{await this.app.vault.createFolder(e)}catch(i){}}}async writeFile(o,t){let e=this.app.vault.getAbstractFileByPath(o);if(e instanceof F.TFile){await this.app.vault.modify(e,t);return}await this.app.vault.adapter.write(o,t)}async saveVersion(o){await this.ensureFolder(this.getCacheDir());let t=this.getVersionFilePath(),e=JSON.stringify(o,null,2);await this.writeFile(t,e)}async loadVersion(){let o=this.getVersionFilePath();if(!await this.app.vault.adapter.exists(o))return null;let e=this.app.vault.getAbstractFileByPath(o);if(!(e instanceof F.TFile))return null;try{let s=await this.app.vault.read(e),r=JSON.parse(s);return!r.version||!r.updateTime||!r.hash||typeof r.fetchedAt!="number"?null:r}catch(s){return null}}async saveRuleFiles(o){let t=this.getRulesDir();await this.ensureFolder(t);for(let[e,s]of Object.entries(o)){let r=(0,F.normalizePath)(`${t}/${e}`);await this.writeFile(r,s)}}async loadRuleFiles(){let o=this.getRulesDir();if(!await this.app.vault.adapter.exists(o))return null;let e=this.app.vault.getAbstractFileByPath(o);if(!(e instanceof F.TFolder))return null;let s={};for(let r of e.children)if(r instanceof F.TFile)try{let i=await this.app.vault.read(r);s[r.name]=i}catch(i){}return Object.keys(s).length>0?s:null}async getRuleFile(o){let t=(0,F.normalizePath)(`${this.getRulesDir()}/${o}`);if(!await this.app.vault.adapter.exists(t))return null;let s=this.app.vault.getAbstractFileByPath(t);if(!(s instanceof F.TFile))return null;try{return await this.app.vault.read(s)}catch(r){return null}}async clearCache(){let o=this.getCacheDir();if(!await this.app.vault.adapter.exists(o))return;let e=this.app.vault.getAbstractFileByPath(o);if(!(e instanceof F.TFolder))return;let s=[...e.children];for(let r of s)try{await this.app.vault.delete(r,!0)}catch(i){}}getPrevDir(){return(0,F.normalizePath)(`${this.getCacheDir()}/prev`)}async backupCurrentCache(){let o=this.getRulesDir(),t=this.getVersionFilePath(),e=this.getPrevDir(),s=(0,F.normalizePath)(`${e}/rules`),r=await this.app.vault.adapter.exists(o),i=await this.app.vault.adapter.exists(t);if(!r&&!i)return!1;if(await this.clearPrevBackup(),await this.ensureFolder(s),i)try{let n=await this.app.vault.adapter.read(t);await this.app.vault.adapter.write((0,F.normalizePath)(`${e}/version.json`),n)}catch(n){}if(r){let n=this.app.vault.getAbstractFileByPath(o);if(n instanceof F.TFolder){for(let l of n.children)if(l instanceof F.TFile)try{let c=await this.app.vault.read(l);await this.app.vault.adapter.write((0,F.normalizePath)(`${s}/${l.name}`),c)}catch(c){}}}return!0}async rollbackToPrevCache(){let o=this.getPrevDir(),t=(0,F.normalizePath)(`${o}/rules`),e=(0,F.normalizePath)(`${o}/version.json`);if(!await this.app.vault.adapter.exists(o))return!1;let r=this.getRulesDir();if(await this.app.vault.adapter.exists(r)){let c=this.app.vault.getAbstractFileByPath(r);if(c instanceof F.TFolder){let d=[...c.children];for(let p of d)try{await this.app.vault.delete(p,!0)}catch(g){}}}else await this.ensureFolder(r);if(await this.app.vault.adapter.exists(e))try{let c=await this.app.vault.adapter.read(e);await this.app.vault.adapter.write(this.getVersionFilePath(),c)}catch(c){}if(await this.app.vault.adapter.exists(t)){let c=this.app.vault.getAbstractFileByPath(t);if(c instanceof F.TFolder){let d=0;for(let p of c.children)if(p instanceof F.TFile)try{let g=await this.app.vault.read(p);await this.app.vault.adapter.write((0,F.normalizePath)(`${r}/${p.name}`),g),d++}catch(g){}if(d===0)return!1}}return!0}async clearPrevBackup(){let o=this.getPrevDir();if(!await this.app.vault.adapter.exists(o))return;let e=this.app.vault.getAbstractFileByPath(o);if(!(e instanceof F.TFolder))return;let s=[...e.children];for(let r of s)try{await this.app.vault.delete(r,!0)}catch(i){}}};var Ir=require("obsidian"),Ao=["01-base-patterns.yaml","02-semantic-context.yaml","04-theme-color.yaml","05-priority.yaml"],Io=1e4;function Fo(a){let o=a.match(/^https?:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)$/);if(!o)return a;let[,t,e,s,r]=o;return`https://cdn.jsdelivr.net/gh/${t}/${e}@${s}/${r}`}async function Fr(a,o){let t=await Ar(a,o);if(t!==null)return t;let e=Fo(a);return e!==a?await Ar(e):null}async function Ar(a,o){try{let t=new Promise((r,i)=>{setTimeout(()=>i(new Error("\u8BF7\u6C42\u8D85\u65F6")),Io)}),e={url:a,method:"GET",throw:!1};o&&(e.headers={Authorization:`Bearer ${o}`});let s=await Promise.race([(0,Ir.requestUrl)(e),t]);return s.status<200||s.status>=300?null:s.text}catch(t){return null}}async function Br(a,o){var e,s,r;let t=await Fr(`${a}/version.json`,o);if(t===null)return null;try{let i=JSON.parse(t);return!i.version||!i.updateTime?null:{version:i.version,updateTime:i.updateTime,hash:(e=i.hash)!=null?e:"",mainBranch:(s=i.mainBranch)!=null?s:"main",rawBaseUrl:(r=i.rawBaseUrl)!=null?r:a}}catch(i){return null}}function Or(a,o){return!!(!a||a.version!==o.version||o.hash&&a.hash&&a.hash!==o.hash)}function $r(a){let o=5381;for(let t=0;t<a.length;t++)o=(o<<5)+o+a.charCodeAt(t),o=o&o;return(o>>>0).toString(16)}async function Nr(a,o){let t=[],e={};for(let r of Ao){let i=await Fr(`${a}/${r}`,o);i!==null?(e[r]=i,t.push({fileName:r,success:!0,size:new Blob([i]).size})):t.push({fileName:r,success:!1,size:0,error:"\u7F51\u7EDC\u8BF7\u6C42\u5931\u8D25\u6216\u8D85\u65F6"})}return{files:t.every(r=>r.success)?e:null,results:t}}function zr(a){let o=[];for(let[t,e]of Object.entries(a)){let s=!0,r=0,i="";try{if(t==="01-base-patterns.yaml"){i="\u57FA\u7840\u6B63\u5219\u89C4\u5219";let n=e.match(/^  \w+:\s*$/gm);r=n?n.length:0}else if(t==="02-semantic-context.yaml"){i="\u4E0A\u4E0B\u6587\u6620\u5C04";let n=e.match(/^  "[^"]+":\s*$/gm);r=n?n.length:0}else if(t==="04-theme-color.yaml"){i="\u914D\u8272\u5B9A\u4E49";let n=e.match(/^  dsl-[\w-]+:\s*$/gm);r=n?n.length:0}else if(t==="05-priority.yaml"){i="\u4F18\u5148\u7EA7\u5C42\u7EA7";let n=e.match(/^  \w+:\s*\d+/gm);r=n?n.length:0}}catch(n){s=!1}o.push({name:i||t,file:t,count:r,parsed:s})}return o}var Tt=class Tt extends M.Plugin{constructor(){super(...arguments);this.editorExtensions=[];this.currentRuleSet=null;this.baseRuleSet=null;this.autoUpdateTimerId=null;this.dslStyleEl=null;this.dslColorVarEl=null;this.customTextStyleEl=null;this.loadedPackages=[];this.pkgOverrideStyleEl=null;this.integrationManager=null;this.popoverTimerId=null;this.colorBlindAssistEl=null;this.lastPaletteSignature=""}async onload(){await this.loadSettings(),this.settings.language,this.applyColorMode(),this.applyCustomColors(),this.applyCustomTextColorsStyles(),this.matcher=new yt,this.cache=new St(this.app,this.manifest.id),await this.initRules(),this.pkgManager=new ht(this.app,()=>this.settings,t=>te(this,t),()=>{var t,e;return new Set(((e=(t=this.currentRuleSet)==null?void 0:t.rules)!=null?e:[]).map(s=>s.id))}),await this.migrateLegacyGlobalResources(),await this.reloadPackages(),this.editorExtensions=Jt(this.settings,this.matcher,this),this.registerEditorExtension(this.editorExtensions),this.registerMarkdownPostProcessor(lr(this.settings,this.matcher)),this.addSettingTab(new at(this.app,this)),this.registerView($e,t=>new ot(t,this)),this.registerCommands(),this.addRibbonIcon("palette",f("command.refresh"),()=>{this.refreshAll()}),this.addRibbonIcon("map",f("colorMap.title"),()=>{Te(this.app)}),this.registerEvent(this.app.workspace.on("active-leaf-change",t=>{this.onActiveLeafChange(t)})),this.registerEvent(this.app.vault.on("create",()=>{this.refreshFileColorizer()})),this.registerEvent(this.app.vault.on("rename",()=>{this.refreshFileColorizer()})),this.registerEvent(this.app.metadataCache.on("changed",()=>{this.refreshFileColorizer()})),this.registerEvent(this.app.workspace.on("editor-menu",(t,e)=>{this.onEditorMenu(t,e)})),this.registerEvent(this.app.workspace.on("editor-selection-change",t=>{this.onEditorSelectionChange(t)})),this.app.workspace.onLayoutReady(()=>{this.refreshFileColorizer(),this.settings.ruleSource==="remote"&&this.settings.autoUpdateRules&&this.checkForUpdates(!1),this.setupAutoUpdateTimer(),this.initIntegrations()})}async onunload(){es(),Zt(this.app),this.cleanupIntegrations(),document.body.removeClass("prompt-colorizer-light","prompt-colorizer-dark"),document.body.removeClass("pc-light","pc-dark"),this.resetCustomColors(),this.autoUpdateTimerId!==null&&(window.clearInterval(this.autoUpdateTimerId),this.autoUpdateTimerId=null),this.dslStyleEl&&(this.dslStyleEl.remove(),this.dslStyleEl=null),this.dslColorVarEl&&(this.dslColorVarEl.remove(),this.dslColorVarEl=null),this.customTextStyleEl&&(this.customTextStyleEl.remove(),this.customTextStyleEl=null),this.pkgOverrideStyleEl&&(this.pkgOverrideStyleEl.remove(),this.pkgOverrideStyleEl=null),ze(),this.popoverTimerId!==null&&(window.clearTimeout(this.popoverTimerId),this.popoverTimerId=null)}applyRuleSetAndRefresh(t,e=!0){this.baseRuleSet=t,this.currentRuleSet={...t,rules:[...t.rules],styleRules:{...t.styleRules}},this.appendCustomRules(),this.matcher.setRuleSet(this.currentRuleSet),this.applyDynamicColorVariables(t.colorTokens),this.applyDynamicStyles(t.styleRules,t.colorTokens),e&&this.refreshEditorExtensions()}async initRules(){var e,s;let t=null;if(this.settings.ruleSource!=="builtin"){let r=await this.cache.loadRuleFiles();if(r){let i=await this.cache.loadVersion();t=He(r,(e=i==null?void 0:i.version)!=null?e:"",(s=i==null?void 0:i.updateTime)!=null?s:"")}}t||(t=cs()),t&&this.applyRuleSetAndRefresh(t,!1)}appendCustomRules(){var e,s,r,i,n;if(!this.baseRuleSet||!this.currentRuleSet)return;let t=(e=this.settings.customRules)!=null?e:[];this.currentRuleSet.rules=[...this.baseRuleSet.rules];for(let l of t){if(!(l!=null&&l.id)||!l.regex||!l.cssClass||this.baseRuleSet.rules.some(d=>d.id===l.id))continue;let c;try{c=new RegExp(l.regex,(s=l.flags)!=null?s:"")}catch(d){continue}this.currentRuleSet.rules.push({id:l.id,regex:c,cssClass:l.cssClass,priority:(r=l.priority)!=null?r:20,blockLevel:!1,captureGroup:(i=l.captureGroup)!=null?i:0}),l.style&&(this.currentRuleSet.styleRules[l.cssClass]={...(n=this.baseRuleSet.styleRules[l.cssClass])!=null?n:{},...l.style})}}applyDynamicColorVariables(t){var s;if(this.currentRuleSet){this.applyDynamicColorVariablesWith(t,this.currentRuleSet.styleRules);return}this.dslColorVarEl&&this.dslColorVarEl.remove();let e=ds(t,this.settings.colorScheme,(s=this.settings.tokenDeriveAlphas)!=null?s:{});e&&(this.dslColorVarEl=document.createElement("style"),this.dslColorVarEl.id="prompt-colorizer-color-vars",this.dslColorVarEl.textContent=e,document.head.appendChild(this.dslColorVarEl),this.applyCustomColors())}applyDynamicStyles(t,e={}){this.dslStyleEl&&this.dslStyleEl.remove();let s=this.filterStyleRulesByTokenEnabled(t),r=Dr(s,e);this.dslStyleEl=document.createElement("style"),this.dslStyleEl.id="prompt-colorizer-dsl-styles",this.dslStyleEl.textContent=r,document.head.appendChild(this.dslStyleEl)}filterStyleRulesByTokenEnabled(t){var i;let e=(i=this.settings.tokenEnabled)!=null?i:{},s=Object.entries(e).filter(([,n])=>!n).map(([n])=>n);if(s.length===0)return t;let r={};for(let[n,l]of Object.entries(t)){let c=JSON.stringify(l);s.some(p=>new RegExp(`\\b${p}\\b`).test(c))||(r[n]=l)}return r}getActiveRuleSource(){var n,l;let t=(n=this.settings.ruleSources)!=null?n:[],e=this.settings.activeRuleSourceId,s=t.find(c=>c.id===e&&c.enabled),r=(l=s==null?void 0:s.rawBaseUrl)!=null?l:this.settings.gitRawBaseUrl,i=this.settings.gitTokenEnabled&&this.settings.gitToken?this.settings.gitToken:void 0;return{url:r,token:i}}async checkForUpdates(t=!0){var i,n,l,c,d,p,g,u,h,y,m,b;let{url:e,token:s}=this.getActiveRuleSource();if(!e){t&&new M.Notice(f("notice.noGitUrl"));return}let r=Date.now();try{t&&new M.Notice(f("notice.checkingUpdates"));let v=await Br(e,s);if(!v){await this.savePullReport({timestamp:Date.now(),success:!1,remoteVersion:"",remoteUpdateTime:"",remoteHash:"",localVersion:(n=(i=await this.cache.loadVersion())==null?void 0:i.version)!=null?n:null,hasUpdate:!1,files:[],categories:[],totalFiles:5,successFiles:0,totalRules:0,duration:Date.now()-r,error:"\u65E0\u6CD5\u83B7\u53D6\u8FDC\u7A0B\u7248\u672C\u4FE1\u606F"}),t&&new M.Notice(f("notice.fetchFailed"));return}let k=await this.cache.loadVersion();if(!Or(k,v)){await this.savePullReport({timestamp:Date.now(),success:!0,remoteVersion:v.version,remoteUpdateTime:v.updateTime,remoteHash:(l=v.hash)!=null?l:"",localVersion:(c=k==null?void 0:k.version)!=null?c:null,hasUpdate:!1,files:[],categories:[],totalFiles:5,successFiles:5,totalRules:0,duration:Date.now()-r}),t&&new M.Notice(f("notice.alreadyLatest")),this.settings.lastCheckTime=Date.now(),await this.saveSettings();return}t&&new M.Notice(f("notice.downloading"));let R=await this.cache.backupCurrentCache(),{files:T,results:D}=await Nr(e,s),I=T?zr(T):[];if(!T){let x=D.filter(P=>P.success).length;await this.savePullReport({timestamp:Date.now(),success:!1,remoteVersion:v.version,remoteUpdateTime:v.updateTime,remoteHash:(d=v.hash)!=null?d:"",localVersion:(p=k==null?void 0:k.version)!=null?p:null,hasUpdate:!0,files:D,categories:I,totalFiles:5,successFiles:x,totalRules:0,duration:Date.now()-r,error:`${x}/5 \u4E2A\u6587\u4EF6\u62C9\u53D6\u6210\u529F`}),t&&new M.Notice(f("notice.downloadFailed"));return}let S={version:v.version,updateTime:v.updateTime,hash:v.hash||$r(Object.values(T).join("")),fetchedAt:Date.now()};this.settings.downloadToCache&&(await this.cache.saveRuleFiles(T),await this.cache.saveVersion(S));let C=He(T,S.version,S.updateTime);if(C){this.applyRuleSetAndRefresh(C),this.settings.lastCheckTime=Date.now();let x=C.rules.length+C.contextRules.length;await this.savePullReport({timestamp:Date.now(),success:!0,remoteVersion:v.version,remoteUpdateTime:v.updateTime,remoteHash:(g=v.hash)!=null?g:"",localVersion:(u=k==null?void 0:k.version)!=null?u:null,hasUpdate:!0,files:D,categories:I,totalFiles:5,successFiles:5,totalRules:x,duration:Date.now()-r}),await this.saveSettings(),t&&new M.Notice(f("notice.updateSuccess")+` v${S.version}`)}else{if(R)if(await this.cache.rollbackToPrevCache()){let P=await this.cache.loadRuleFiles(),A=await this.cache.loadVersion();if(P&&A){let O=He(P,A.version,A.updateTime);O&&this.applyRuleSetAndRefresh(O)}t&&new M.Notice(f("notice.compileFailed")+"(\u5DF2\u56DE\u6EDA\u5230\u4E0A\u4E00\u7248\u672C)",5e3)}else t&&new M.Notice(f("notice.compileFailed"));else t&&new M.Notice(f("notice.compileFailed"));await this.savePullReport({timestamp:Date.now(),success:!1,remoteVersion:v.version,remoteUpdateTime:v.updateTime,remoteHash:(h=v.hash)!=null?h:"",localVersion:(y=k==null?void 0:k.version)!=null?y:null,hasUpdate:!0,files:D,categories:I,totalFiles:5,successFiles:5,totalRules:0,duration:Date.now()-r,error:"\u89C4\u5219\u7F16\u8BD1\u5931\u8D25"})}}catch(v){if(console.error("[PromptColorizer] \u89C4\u5219\u66F4\u65B0\u5931\u8D25:",v),await this.savePullReport({timestamp:Date.now(),success:!1,remoteVersion:"",remoteUpdateTime:"",remoteHash:"",localVersion:(b=(m=await this.cache.loadVersion())==null?void 0:m.version)!=null?b:null,hasUpdate:!1,files:[],categories:[],totalFiles:5,successFiles:0,totalRules:0,duration:Date.now()-r,error:v instanceof Error?v.message:String(v)}),t){let k=v instanceof Error?v.message:String(v);new M.Notice(f("notice.updateError")+`: ${k}`,8e3)}}}async savePullReport(t){this.settings.gitReportEnabled&&(this.settings.lastPullReport=JSON.stringify(t),await this.saveSettings())}getPullReport(){if(!this.settings.lastPullReport)return null;try{return JSON.parse(this.settings.lastPullReport)}catch(t){return null}}async reloadRules(){await this.initRules(),this.refreshEditorExtensions()}async clearRuleCache(){await this.cache.clearCache();let t=cs();t&&this.applyRuleSetAndRefresh(t)}setupAutoUpdateTimer(){if(this.autoUpdateTimerId!==null&&(window.clearInterval(this.autoUpdateTimerId),this.autoUpdateTimerId=null),this.settings.autoUpdateRules&&this.settings.ruleSource==="remote"){let t=this.settings.autoUpdateInterval*3600*1e3;this.autoUpdateTimerId=window.setInterval(()=>{this.checkForUpdates(!1)},t),this.registerInterval(this.autoUpdateTimerId)}}async loadSettings(){this.settings=us(qe,await this.loadData())}async saveSettings(){await this.saveData(this.settings)}t(t){return f(t)}async initIntegrations(){this.integrationManager=new ft(this.app,this.settings),await this.integrationManager.initIntegrations()}cleanupIntegrations(){var t;(t=this.integrationManager)==null||t.cleanup(),this.integrationManager=null}registerCommands(){let t=f("command.groupPrefix");this.addCommand({id:"refresh-coloring",name:t+f("command.refresh"),callback:()=>{this.refreshAll(),new M.Notice(f("notice.refreshed"))}}),this.addCommand({id:"toggle-editor-highlight",name:t+f("command.toggleHighlight"),callback:()=>{this.settings.editorHighlightEnabled=!this.settings.editorHighlightEnabled,this.saveSettings(),this.refreshEditorExtensions(),new M.Notice(this.settings.editorHighlightEnabled?f("notice.enabled"):f("notice.disabled"))}}),this.addCommand({id:"update-rules",name:t+f("command.updateRules"),callback:()=>{this.checkForUpdates(!0)}}),this.addCommand({id:"reload-rules",name:t+f("command.reloadRules"),callback:()=>{this.reloadRules(),new M.Notice(f("notice.rulesReloaded"))}}),this.addCommand({id:"apply-color-to-selection",name:t+f("customText.cmdApply"),editorCallback:e=>{this.applyColorToSelection(e)}}),this.addCommand({id:"remove-color-from-selection",name:t+f("customText.cmdRemove"),editorCallback:e=>{this.removeColorFromSelection(e)}}),this.addCommand({id:"export-full-settings",name:t+f("command.exportFull"),callback:async()=>{try{await yr(this.settings,this.manifest.version,this.app)}catch(e){new M.Notice(`${f("notice.exportFailed")}: ${e instanceof Error?e.message:String(e)}`)}}}),this.addCommand({id:"import-full-settings",name:t+f("command.importFull"),editorCallback:async e=>{try{await this.importSettingsFromCurrentFile(e)}catch(s){new M.Notice(`${f("notice.importFailed")}: ${s instanceof Error?s.message:String(s)}`)}}}),this.addCommand({id:"export-custom-text-colors",name:t+f("command.exportCustomTextColors"),callback:async()=>{var e;try{await vr((e=this.settings.customTextColors)!=null?e:[],this.manifest.version,this.app)}catch(s){new M.Notice(`${f("notice.exportFailed")}: ${s instanceof Error?s.message:String(s)}`)}}}),this.addCommand({id:"export-folder-mappings",name:t+f("command.exportFolderMappings"),callback:async()=>{var e;try{await br((e=this.settings.folderMappings)!=null?e:[],this.manifest.version,this.app)}catch(s){new M.Notice(`${f("notice.exportFailed")}: ${s instanceof Error?s.message:String(s)}`)}}}),this.addCommand({id:"open-color-map-panel",name:t+f("colorMap.openPanel"),callback:()=>{Te(this.app)}})}async importSettingsFromCurrentFile(t){let e=this.app.workspace.getActiveFile();if(!e){new M.Notice(f("notice.importFileError"));return}let s;try{s=await this.app.vault.read(e)}catch(i){new M.Notice(f("notice.importFileError"));return}let r=kr(s);if(!r){new M.Notice(f("notice.importInvalidFormat"));return}try{let i=xr(r,this.settings);this.settings=i,await this.saveSettings(),this.applyColorMode(),this.applyCustomColors(),this.applyCustomTextColorsStyles(),await this.initRules(),this.refreshEditorExtensions(),this.refreshAll(),new M.Notice(f("notice.importSuccess"),4e3)}catch(i){new M.Notice(`${f("notice.importFailed")}: ${i instanceof Error?i.message:String(i)}`)}}async syncTokensToActivePackage(){var e;if(!this.pkgManager)return;let t=this.pkgManager.getEnabledPackages(this.loadedPackages);if(t.length===1){let s=t[0];if(!s.manifest)return;await this.pkgManager.writePackage(s.dirName,s.manifest,this.settings.customTextColors,(e=s.embeddedRules)!=null?e:[])}await this.saveSettings(),await this.reloadPackages()}async migrateLegacyGlobalResources(){var s,r;if(this.settings.legacyResourcesMigrated)return;let t=(s=this.settings.customTextColors)!=null?s:[],e=(r=this.settings.customRules)!=null?r:[];if(t.length===0&&e.length===0){this.settings.legacyResourcesMigrated=!0,await this.saveSettings();return}try{let i={packageId:"__migrated__",name:"\u65E7\u6570\u636E\u8FC1\u79FB\u5305",tagColor:"#44AAFF",description:`\u5347\u7EA7\u65F6\u81EA\u52A8\u8FC1\u79FB\u7684\u65E7\u4EE4\u724C\uFF08${t.length}\uFF09\u4E0E\u89C4\u5219\uFF08${e.length}\uFF09`,version:"1.0.0",specVersion:z,type:"user",usageTag:"\u65E7\u6570\u636E\u8FC1\u79FB",previewSampleText:"",ruleOverrides:{}};await this.pkgManager.createPackage(i,t,e),this.settings.enabledPackageIds=["__migrated__"],this.settings.legacyResourcesMigrated=!0,await this.saveSettings(),new M.Notice("\u5DF2\u5C06\u65E7\u4EE4\u724C/\u89C4\u5219\u8FC1\u79FB\u5230\u300C\u65E7\u6570\u636E\u8FC1\u79FB\u5305\u300D\u5E76\u81EA\u52A8\u542F\u7528")}catch(i){console.error("[PromptColorizer] \u65E7\u6570\u636E\u8FC1\u79FB\u5931\u8D25\uFF0C\u4E0B\u6B21\u542F\u52A8\u5C06\u91CD\u8BD5:",i),new M.Notice("\u65E7\u6570\u636E\u8FC1\u79FB\u5931\u8D25\uFF0C\u5C06\u5728\u4E0B\u6B21\u542F\u52A8\u91CD\u8BD5\uFF08\u6570\u636E\u672A\u4E22\u5931\uFF09",5e3)}}async reloadPackages(){try{let{packages:t}=await this.pkgManager.loadAll();this.loadedPackages=t}catch(t){this.loadedPackages=[]}this.rebuildCacheFromEnabledPackages(),this.applyCustomTextColorsStyles(),this.refreshEditorExtensions(),this.applyPackageScopes(),this.applyPackageOverrideStyles()}rebuildCacheFromEnabledPackages(){var c,d,p,g,u;let t=(d=(c=this.pkgManager)==null?void 0:c.getEnabledPackages(this.loadedPackages))!=null?d:[],e=[],s=new Set;for(let h of t)for(let y of(p=h.embeddedRules)!=null?p:[])y!=null&&y.id&&!s.has(y.id)&&(e.push(structuredClone(y)),s.add(y.id));let r=new Set,i=[],n=new Set;for(let h of t)for(let y of(g=h.embeddedTokens)!=null?g:[])y!=null&&y.id&&!n.has(y.id)&&(i.push(structuredClone(y)),n.add(y.id),r.add(y.id));let l=((u=this.settings.customTextColors)!=null?u:[]).filter(h=>(h==null?void 0:h.id)&&!r.has(h.id));this.settings.customTextColors=[...i,...l],this.settings.customRules=e,this.appendCustomRules(),this.matcher&&this.currentRuleSet&&this.matcher.setRuleSet(this.currentRuleSet)}applyPackageScopes(){var n,l,c;if(!this.matcher||!this.pkgManager)return;let t=this.pkgManager.getEnabledPackages(this.loadedPackages);if(t.length===0){this.matcher.setRuleIdScope(null),this.matcher.setTokenIdScope(null);return}let{tokenIds:e,ruleIds:s}=this.pkgManager.collectEnabledRefIds(t),r=new Set(((l=(n=this.baseRuleSet)==null?void 0:n.rules)!=null?l:[]).map(d=>d.id));for(let d of r)s.add(d);let i=new Set(((c=this.settings.customTextColors)!=null?c:[]).map(d=>d.id));for(let d of i)e.add(d);this.matcher.setRuleIdScope(s),this.matcher.setTokenIdScope(e)}getRuleIdToCssClassMap(){var s,r,i,n;let t={},e=(r=(s=this.currentRuleSet)==null?void 0:s.rules)!=null?r:[];for(let l of e)l!=null&&l.id&&(l!=null&&l.cssClass)&&(t[l.id]=l.cssClass);for(let l of(i=this.loadedPackages)!=null?i:[])for(let c of(n=l.embeddedRules)!=null?n:[])c!=null&&c.id&&(c!=null&&c.cssClass)&&!(c.id in t)&&(t[c.id]=c.cssClass);return t}getRuleDisplayName(t){var e,s;for(let r of(e=this.loadedPackages)!=null?e:[])for(let i of(s=r.embeddedRules)!=null?s:[])if((i==null?void 0:i.id)===t&&i.name&&i.name!==i.id)return i.name;return Lr(t)}applyPackageOverrideStyles(){var l;if(this.pkgOverrideStyleEl&&(this.pkgOverrideStyleEl.remove(),this.pkgOverrideStyleEl=null),!this.pkgManager)return;let t=this.pkgManager.getEnabledPackages(this.loadedPackages);if(t.length===0)return;let e=this.pkgManager.mergeTokenOverrides(t),s=this.pkgManager.mergeRuleOverrides(t);if(Object.keys(e).length===0&&Object.keys(s).length===0)return;let r=new Set(((l=this.settings.customTextColors)!=null?l:[]).map(c=>c.id)),i=this.getRuleIdToCssClassMap(),n=fr(e,s,r,i);n&&(this.pkgOverrideStyleEl=document.createElement("style"),this.pkgOverrideStyleEl.id="prompt-colorizer-package-overrides",this.pkgOverrideStyleEl.textContent=n,document.head.appendChild(this.pkgOverrideStyleEl))}getEnabledPackageRefIds(){return this.pkgManager?this.pkgManager.collectEnabledRefIds(this.pkgManager.getEnabledPackages(this.loadedPackages)):{tokenIds:new Set,ruleIds:new Set}}applyCustomTextColorsStyles(){if(this.customTextStyleEl&&this.customTextStyleEl.remove(),!this.settings.customTextColors||this.settings.customTextColors.length===0)return;let t=tr(this.settings.customTextColors);t&&(this.customTextStyleEl=document.createElement("style"),this.customTextStyleEl.id="prompt-colorizer-custom-text-colors",this.customTextStyleEl.textContent=t,document.head.appendChild(this.customTextStyleEl),this.app.workspace.trigger("prompt-colorizer:custom-colors-changed"))}applyColorToSelection(t){var r;let e=t.getSelection();if(!e||e.trim().length===0){new M.Notice(f("customText.noticeNoSelection"));return}let s=(r=this.settings.customTextColors.find(i=>i.text===e))!=null?r:null;ss(this.app,e,s,i=>{var n;if(s)s.color=i.color,s.color2=i.color2||"",s.gradientStops=i.gradientStops.map(l=>({...l})),s.gradientAngle=i.gradientAngle,s.caseSensitive=i.caseSensitive,s.wholeWord=i.wholeWord,s.effect=i.effect,s.effects=[...i.effects],s.effectParams=(n=i.effectParams)!=null?n:{},s.enabled=!0;else{let l=cr(i);this.settings.customTextColors.push(l)}this.saveSettings().then(()=>{this.applyCustomTextColorsStyles(),this.refreshEditorExtensions(),new M.Notice(f("customText.noticeApplied")),this.syncTokensToActivePackage()})})}removeColorFromSelection(t){let e=t.getSelection();if(!e||e.trim().length===0){new M.Notice(f("customText.noticeNoSelection"));return}let s=sr(e,this.settings.customTextColors);if(s.length===0){new M.Notice(f("customText.noticeNotFound"));return}this.settings.customTextColors=this.settings.customTextColors.filter(r=>!s.includes(r.id)),this.saveSettings().then(()=>{this.applyCustomTextColorsStyles(),this.refreshEditorExtensions(),new M.Notice(f("customText.noticeApplied")),this.syncTokensToActivePackage()})}async deleteCustomTextColor(t){this.settings.customTextColors=this.settings.customTextColors.filter(e=>e.id!==t),await this.saveSettings(),this.applyCustomTextColorsStyles(),this.refreshEditorExtensions(),this.syncTokensToActivePackage()}async updateCustomTextColor(t,e){let s=this.settings.customTextColors.find(r=>r.id===t);s&&(Object.assign(s,e),await this.saveSettings(),this.applyCustomTextColorsStyles(),this.refreshEditorExtensions(),this.syncTokensToActivePackage())}editCustomTextColor(t){let e=this.settings.customTextColors.find(s=>s.id===t);e&&ss(this.app,e.text,e,s=>{var r;e.text=s.text,e.color=s.color,e.color2=s.color2||"",e.gradientStops=s.gradientStops.map(i=>({...i})),e.gradientAngle=s.gradientAngle,e.caseSensitive=s.caseSensitive,e.wholeWord=s.wholeWord,e.effect=s.effect,e.effects=[...s.effects],e.effectParams=(r=s.effectParams)!=null?r:{},e.category=s.category,this.saveSettings().then(()=>{this.applyCustomTextColorsStyles(),this.refreshEditorExtensions(),new M.Notice(f("customText.noticeApplied"))})})}onEditorMenu(t,e){pr(t,e,{onApply:()=>{this.showPopoverForSelection(e)},onRemove:()=>{this.removeColorFromSelection(e)},onOpenPicker:()=>{this.applyColorToSelection(e)}})}onEditorSelectionChange(t){var r;if(this.popoverTimerId!==null&&(window.clearTimeout(this.popoverTimerId),this.popoverTimerId=null),!this.settings.customTextPopoverAutoShow)return;let e=t.getSelection();if(!e||e.trim().length===0){ze();return}if(e.length>200){ze();return}let s=Math.max(0,Math.min(2e3,(r=this.settings.customTextPopoverDelay)!=null?r:350));this.popoverTimerId=window.setTimeout(()=>{this.showPopoverForSelection(t)},s)}showPopoverForSelection(t){var r;let e=t.getSelection();if(!e||e.trim().length===0){new M.Notice(f("customText.noticeNoSelection"));return}let s=(r=this.settings.customTextColors.find(i=>i.text===e))!=null?r:null;dr(this.app,t,{selectedText:e,existing:s,onApplyColor:i=>{this.applyQuickColor(e,i,s)},onOpenAdvanced:()=>{this.applyColorToSelection(t)},onRemove:()=>{this.removeColorFromSelection(t)}})}async applyQuickColor(t,e,s){if(s)s.color=e;else{let r={id:"c"+Date.now().toString(36)+Math.random().toString(36).slice(2,8),text:t,color:e,color2:"",gradientStops:[],gradientAngle:135,enabled:!0,caseSensitive:!1,wholeWord:!1,effect:"none",effects:[]};this.settings.customTextColors.push(r)}await this.saveSettings(),this.applyCustomTextColorsStyles(),this.refreshEditorExtensions(),new M.Notice(f("customText.noticeColorApplied")+" "+e)}resolveActiveColorTokens(){var i,n,l,c,d;let t=(n=(i=this.currentRuleSet)==null?void 0:i.colorTokens)!=null?n:{},e=(c=(l=this.currentRuleSet)==null?void 0:l.palettes)!=null?c:{},s=this.settings.palettePreset||"";if(this.settings.folderPalettesEnabled&&((d=this.settings.folderPalettes)!=null&&d.length)){let p=this.app.workspace.getActiveFile();if(p){let u=this.settings.folderPalettes.filter(h=>p.path.startsWith(h.path+"/")).sort((h,y)=>y.path.length-h.path.length).find(h=>e[h.palette]);u&&(s=u.palette)}}let r=this.app.workspace.getActiveFile();if(r&&r.extension==="md"){let p=this.app.metadataCache.getFileCache(r),g=p==null?void 0:p.frontmatter;g&&typeof g["theme-palette"]=="string"&&g["theme-palette"]&&(s=g["theme-palette"])}return!s||!e[s]?t:{...t,...e[s].tokens}}applyColorMode(){var r,i,n,l,c;if(document.body.removeClass("prompt-colorizer-light","prompt-colorizer-dark","pc-light","pc-dark"),this.settings.colorMode==="light"?document.body.addClass("prompt-colorizer-light","pc-light"):this.settings.colorMode==="dark"&&document.body.addClass("prompt-colorizer-dark","pc-dark"),this.currentRuleSet){let d=this.resolveActiveColorTokens();this.applyDynamicColorVariablesWith(d,this.currentRuleSet.styleRules)}document.body.classList.toggle("pc-colorblind-assist",!!this.settings.colorBlindAssist),this.applyColorBlindAssistStyles();let t=(r=this.settings.embedCardStyle)!=null?r:"tech";document.body.getAttribute("data-embed-style")!==t&&document.body.setAttribute("data-embed-style",t);let e=!!this.settings.readerTableBlockEnabled;document.body.classList.toggle("pc-table-block",e),document.body.classList.toggle("pc-table-rounded",e&&!!this.settings.readerTableRounded),document.body.classList.toggle("pc-table-header-bg",e&&!!this.settings.readerTableHeaderBg),document.body.classList.toggle("pc-table-sticky-header",e&&!!this.settings.readerTableStickyHeader),document.body.classList.toggle("pc-table-first-col",e&&!!this.settings.readerTableFirstCol),document.body.classList.toggle("pc-table-zebra",e&&!!this.settings.readerTableZebra),document.body.classList.toggle("pc-table-hover",e&&!!this.settings.readerTableHover),document.body.setAttribute("data-table-density",e&&(i=this.settings.readerTableDensity)!=null?i:"normal"),document.body.style.setProperty("--pc-table-zebra-alpha",String((n=this.settings.readerTableZebraAlpha)!=null?n:4)),document.body.style.setProperty("--pc-table-hover-alpha",String((l=this.settings.readerTableHoverAlpha)!=null?l:8));let s=!!this.settings.readerMetadataBlockEnabled;document.body.classList.toggle("pc-metadata-block",s),document.body.classList.toggle("pc-metadata-key-bold",s&&!!this.settings.readerMetadataKeyBold),document.body.classList.toggle("pc-metadata-row-hover",s&&!!this.settings.readerMetadataRowHover),document.body.setAttribute("data-metadata-density",s&&(c=this.settings.readerMetadataDensity)!=null?c:"normal")}applyColorBlindAssistStyles(){if(this.colorBlindAssistEl&&(this.colorBlindAssistEl.remove(),this.colorBlindAssistEl=null),!this.settings.colorBlindAssist)return;let t=Mr();t&&(this.colorBlindAssistEl=document.createElement("style"),this.colorBlindAssistEl.id="prompt-colorizer-colorblind-assist",this.colorBlindAssistEl.textContent=t,document.head.appendChild(this.colorBlindAssistEl))}applyDynamicColorVariablesWith(t,e){var r;this.dslColorVarEl&&this.dslColorVarEl.remove();let s=ds(t,this.settings.colorScheme,(r=this.settings.tokenDeriveAlphas)!=null?r:{});s&&(this.dslColorVarEl=document.createElement("style"),this.dslColorVarEl.id="prompt-colorizer-color-vars",this.dslColorVarEl.textContent=s,document.head.appendChild(this.dslColorVarEl)),this.applyDynamicStyles(e,t),this.applyCustomColors()}applyCustomColors(){let t=document.documentElement;if(this.settings.customColors)for(let[e,s]of Object.entries(this.settings.customColors))s&&t.style.setProperty(e,s)}resetCustomColors(){let t=document.documentElement;if(this.settings.customColors)for(let e of Object.keys(this.settings.customColors))t.style.removeProperty(e);this.settings.customColors={}}refreshEditorExtensions(){let t=Jt(this.settings,this.matcher,this);this.editorExtensions.length=0,this.editorExtensions.push(...t),this.app.workspace.updateOptions()}refreshDynamicStyles(){let t=this.matcher.getStyleRules(),e=this.matcher.getColorTokens();this.applyDynamicStyles(t,e)}observeFileExplorerRedraw(){nr(this.app,()=>{Xt(this.app,this.settings)})}refreshFileColorizer(){Zt(this.app);for(let t of Tt.FILE_COLORIZE_DELAYS)setTimeout(()=>{Xt(this.app,this.settings)},t);this.observeFileExplorerRedraw()}refreshAll(){this.refreshEditorExtensions(),this.refreshFileColorizer(),this.applyColorMode(),this.applyCustomTextColorsStyles()}getRuleVersion(){return this.matcher.getVersion()}getColorTokens(){return this.matcher.getColorTokens()}getStyleRules(){return this.matcher.getStyleRules()}getColorByCssClass(t){return this.matcher.getColorByCssClass(t)}getCustomTextColorByCssClass(t){var s,r;let e=t.match(/^dsl-custom-text-(.+)$/);return e&&(r=(s=this.settings.customTextColors)==null?void 0:s.find(i=>i&&i.id===e[1]))!=null?r:null}getStyleRuleByCssClass(t){var e,s;return(s=(e=this.matcher.getStyleRules())==null?void 0:e[t])!=null?s:null}getAllMatches(t){return ct(t,this.matcher,this.settings)}highlightTextToHtml(t){let e=this.matcher.match(t,null).filter(n=>!n.block),s=n=>n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),r="",i=0;for(let n of e){if(n.from<i)continue;let l=Ze[n.cssClass];if(l&&this.settings[l]===!1)continue;r+=s(t.slice(i,n.from));let c=s(n.cssClass);r+=`<span class="${c}">${s(t.slice(n.from,n.to))}</span>`,i=n.to}return r+=s(t.slice(i)),r}onActiveLeafChange(t){if(!t)return;let e=this.app.workspace.getActiveFile();e&&e.extension==="md"&&ar(this.app,e,this.settings);let s=this.computeActivePaletteSignature(e);s!==this.lastPaletteSignature&&(this.lastPaletteSignature=s,this.applyColorMode()),setTimeout(()=>{this.refreshFileColorizer()},200)}computeActivePaletteSignature(t){var s;let e=this.settings.palettePreset||"-";if(this.settings.folderPalettesEnabled&&t&&((s=this.settings.folderPalettes)!=null&&s.length)){let r=this.settings.folderPalettes.filter(i=>t.path.startsWith(i.path+"/")).sort((i,n)=>n.path.length-i.path.length)[0];r&&(e=r.palette)}if(t&&t.extension==="md"){let r=this.app.metadataCache.getFileCache(t),i=r==null?void 0:r.frontmatter;i&&typeof i["theme-palette"]=="string"&&i["theme-palette"]&&(e=i["theme-palette"])}return e}};Tt.FILE_COLORIZE_DELAYS=[0,100,300,800,2e3];var Et=Tt;
