var Ue=Object.defineProperty;var vo=Object.getOwnPropertyDescriptor;var xo=Object.getOwnPropertyNames;var Co=Object.prototype.hasOwnProperty;var wo=(a,i)=>{for(var t in i)Ue(a,t,{get:i[t],enumerable:!0})},ko=(a,i,t,e)=>{if(i&&typeof i=="object"||typeof i=="function")for(let o of xo(i))!Co.call(a,o)&&o!==t&&Ue(a,o,{get:()=>i[o],enumerable:!(e=vo(i,o))||e.enumerable});return a};var So=a=>ko(Ue({},"__esModule",{value:!0}),a);var Xs={};wo(Xs,{default:()=>qe});module.exports=So(Xs);var _=require("obsidian");var xt=["danger","success","warning","info","purple","cyan","pink","amber","orange","paren"],To=["indigo","emerald","slate","darkslate","yellow","music"];function Eo(){let a={};for(let i of To)a[i]=!1;return a}var _o=["highlightVariables","highlightRoleTags","highlightRoleHeaders","highlightInstructionMarkers","highlightComments","highlightCodeBlocks","highlightJsonBlocks","highlightInlineCode","highlightSectionMarkers","highlightShotHeaders","highlightAssetRefs","highlightFieldLabels","highlightDialogue","highlightAudioRefs","highlightNegativePrompts","highlightTechParams","highlightParentheticals","highlightEmphasisWeights","highlightLoraRefs","highlightBracketEmphasis","highlightQualityTags","highlightSdNegativeHeader","highlightCameraMoves","highlightSceneTransitions"],se=["highlightVariables","highlightRoleTags","highlightRoleHeaders","highlightInstructionMarkers","highlightComments","highlightCodeBlocks","highlightJsonBlocks","highlightInlineCode"],Ce=["highlightSectionMarkers","highlightShotHeaders","highlightAssetRefs","highlightFieldLabels","highlightDialogue","highlightAudioRefs","highlightNegativePrompts","highlightTechParams","highlightParentheticals","highlightCameraMoves","highlightSceneTransitions"],Po=[{id:"agent-all",name:"\u5168\u80FD\u7740\u8272\u8C03\u6821\u5E08",description:"\u542F\u7528\u6240\u6709\u9AD8\u4EAE\u89C4\u5219\uFF0C\u9002\u914D\u4EFB\u4F55\u63D0\u793A\u8BCD\u573A\u666F",icon:"\u2726",enabledKeys:[..._o]},{id:"agent-basic",name:"\u63D0\u793A\u8BCD\u5DE5\u7A0B\u5E08",description:"\u4EC5\u542F\u7528\u57FA\u7840\u9AD8\u4EAE\uFF1A\u53D8\u91CF\u3001\u89D2\u8272\u6807\u7B7E\u3001\u4EE3\u7801\u5757\u7B49",icon:"\u25A3",enabledKeys:[...se]},{id:"agent-video",name:"\u89C6\u9891\u5206\u955C\u5E08",description:"\u89C6\u9891/\u5206\u955C\u63D0\u793A\u8BCD\u4E13\u7528\uFF1A\u533A\u6BB5\u3001\u5206\u955C\u3001\u53F0\u8BCD\u3001\u8FD0\u955C\u7B49",icon:"\u25B6",enabledKeys:[...Ce]},{id:"agent-minimal",name:"\u6781\u7B80\u6807\u6CE8\u5E08",description:"\u4EC5\u533A\u6BB5\u6807\u8BB0\u4E0E\u5206\u955C\u6807\u9898\uFF0C\u964D\u4F4E\u89C6\u89C9\u566A\u97F3",icon:"\u25CB",enabledKeys:["highlightSectionMarkers","highlightShotHeaders"]}],Do=["highlightEmphasisWeights","highlightLoraRefs","highlightBracketEmphasis","highlightQualityTags","highlightSdNegativeHeader"];var Ye=[{id:"pack-video",name:"\u89C6\u9891\u5206\u955C\u5305",description:"\u5206\u955C\u811A\u672C/\u89C6\u9891\u63D0\u793A\u8BCD\uFF1A\u533A\u6BB5\u3001\u5206\u955C\u3001\u53F0\u8BCD\u3001\u8FD0\u955C\u3001\u5149\u5F71\u8BCD\u6C47\u5168\u5F00",icon:"\u{1F3AC}",direction:"video",enabledKeys:[...se,...Ce],vocabTokens:["camera","light","emotion","audio"],colorScheme:"default",palettePreset:"",builtin:!0},{id:"pack-image",name:"\u56FE\u50CF\u751F\u6210\u5305",description:"SD/MJ/\u901A\u7528\u56FE\u50CF\u63D0\u793A\u8BCD\uFF1A\u6743\u91CD\u3001LoRA\u3001\u8D28\u91CF\u6807\u7B7E\u3001\u6444\u5F71\u98CE\u683C",icon:"\u{1F3A8}",direction:"image",enabledKeys:[...se,...Do],vocabTokens:["photography","quality","light"],colorScheme:"vivid",palettePreset:"",builtin:!0},{id:"pack-writing",name:"\u5199\u4F5C\u53D9\u4E8B\u5305",description:"\u5C0F\u8BF4/\u5267\u672C/\u6587\u6848\uFF1A\u57FA\u7840\u8BED\u6CD5 + \u53D9\u4E8B\u4E0E\u60C5\u7EEA\u8BCD\u6C47",icon:"\u270D\uFE0F",direction:"writing",enabledKeys:[...se],vocabTokens:["narrative","emotion"],colorScheme:"soft",palettePreset:"",builtin:!0},{id:"pack-code",name:"\u7F16\u7A0B\u63D0\u793A\u5305",description:"Agent/CoT/\u4EE3\u7801\u751F\u6210\uFF1A\u53D8\u91CF\u3001\u4EE3\u7801\u5757 + AI/\u7F16\u7A0B\u672F\u8BED",icon:"\u{1F4BB}",direction:"code",enabledKeys:[...se],vocabTokens:["tech"],colorScheme:"default",palettePreset:"",builtin:!0},{id:"pack-minimal",name:"\u6781\u7B80\u6807\u6CE8\u5305",description:"\u4EC5\u533A\u6BB5\u4E0E\u5206\u955C\u6807\u9898\u7ED3\u6784\u6807\u6CE8\uFF0C\u96F6\u8BCD\u6C47\u5E72\u6270",icon:"\u25CB",direction:"minimal",enabledKeys:["highlightSectionMarkers","highlightShotHeaders"],vocabTokens:[],colorScheme:"mono",palettePreset:"",builtin:!0},{id:"pack-seed",name:"Seed \u4E13\u5C5E\u5305",description:"\u5B57\u8282 Seedance 2.0/2.5 \u89C6\u9891\u63D0\u793A\u8BCD\uFF1A\u955C\u5934\u8BED\u8A00 + \u753B\u8D28 + \u53C2\u6570\u5F3A\u5316",icon:"\u{1F331}",direction:"video",enabledKeys:[...se,...Ce,"highlightTechParams","highlightEmphasisWeights"],vocabTokens:["camera","light","quality"],colorScheme:"vivid",palettePreset:"neon",builtin:!0},{id:"pack-h3",name:"H3 \u4E13\u5C5E\u5305",description:"MiniMax H3 \u89C6\u9891\u63D0\u793A\u8BCD\uFF1A\u533A\u6BB5/\u5206\u955C\u5F3A\u5316 + \u8FD0\u955C\u5149\u5F71\u8BCD\u6C47\u805A\u7126",icon:"\u{1F40B}",direction:"video",enabledKeys:[...se,...Ce],vocabTokens:["camera","light","quality","emotion"],colorScheme:"default",palettePreset:"macaron",builtin:!0}],Je=[{type:"system",label:"System \u63D0\u793A\u8BCD",color:"#ef4444",icon:"shield"},{type:"user",label:"User \u63D0\u793A\u8BCD",color:"#3b82f6",icon:"user"},{type:"assistant",label:"Assistant \u63D0\u793A\u8BCD",color:"#10b981",icon:"bot"},{type:"tool",label:"Tool \u63D0\u793A\u8BCD",color:"#ea580c",icon:"wrench"},{type:"example",label:"\u793A\u4F8B/Few-shot",color:"#0891b2",icon:"list"},{type:"variable",label:"\u53D8\u91CF\u5B9A\u4E49",color:"#f59e0b",icon:"braces"},{type:"template",label:"\u6A21\u677F\u6587\u4EF6",color:"#8b5cf6",icon:"file-code"},{type:"video",label:"\u89C6\u9891\u63D0\u793A\u8BCD",color:"#db2777",icon:"video"},{type:"none",label:"\u666E\u901A\u6587\u4EF6",color:"#6b7280",icon:"file"}],Ro=[{path:"prompts/system",type:"system"},{path:"prompts/user",type:"user"},{path:"prompts/assistant",type:"assistant"},{path:"prompts/tool",type:"tool"},{path:"prompts/examples",type:"example"},{path:"prompts/variables",type:"variable"},{path:"prompts/templates",type:"template"},{path:"prompts/video",type:"video"}],we={editorHighlightEnabled:!0,fileColorizerEnabled:!0,readerModeEnabled:!0,colorMode:"auto",colorScheme:"default",palettePreset:"",tokenDeriveAlphas:{},colorBlindAssist:!1,folderPalettes:[],folderPalettesEnabled:!1,highlightVariables:!0,highlightRoleTags:!0,highlightRoleHeaders:!0,highlightInstructionMarkers:!0,highlightComments:!0,highlightCodeBlocks:!0,highlightJsonBlocks:!0,highlightInlineCode:!0,highlightSectionMarkers:!0,highlightShotHeaders:!0,highlightAssetRefs:!0,highlightFieldLabels:!0,highlightDialogue:!0,highlightAudioRefs:!0,highlightNegativePrompts:!0,highlightTechParams:!0,highlightParentheticals:!0,highlightEmphasisWeights:!0,highlightLoraRefs:!0,highlightBracketEmphasis:!0,highlightQualityTags:!0,highlightSdNegativeHeader:!0,highlightCameraMoves:!0,highlightSceneTransitions:!0,fileTypeColors:Je,detectByFrontmatter:!0,detectByFolder:!0,detectByFilename:!1,folderMappings:Ro,language:"zh",ruleSource:"builtin",gitRawBaseUrl:"https://raw.githubusercontent.com/xiongmiaozai/prompt-dsl-highlight-rules/main/rules",gitBranch:"main",autoUpdateRules:!1,autoUpdateInterval:24,lastCheckTime:0,contextSemanticEnabled:!0,lexiconEnabled:!0,enabledRuleIds:[],ruleSources:[{id:"github-official",name:"GitHub \u5B98\u65B9\u6E90",type:"github",rawBaseUrl:"https://raw.githubusercontent.com/xiongmiaozai/prompt-dsl-highlight-rules/main/rules",needsToken:!1,enabled:!0},{id:"gitee-mirror",name:"Gitee \u955C\u50CF\u6E90(\u56FD\u5185\u63A8\u8350)",type:"gitee",rawBaseUrl:"https://gitee.com/xiongmiaozai/prompt-dsl-highlight-rules/raw/main/rules",needsToken:!1,enabled:!0},{id:"jsdelivr-cdn",name:"jsDelivr CDN \u6E90",type:"custom",rawBaseUrl:"https://cdn.jsdelivr.net/gh/xiongmiaozai/prompt-dsl-highlight-rules@main/rules",needsToken:!1,enabled:!0}],activeRuleSourceId:"github-official",agentPresets:Po,activeAgentPresetId:"",promptPacks:Ye,activePackId:"",gitTokenEnabled:!1,gitToken:"",gitReportEnabled:!0,downloadToCache:!0,lastPullReport:null,customColors:{},tokenEnabled:Eo(),vocabTokenEnabled:{},vocabColors:{},vocabCustomWords:{},customTextColors:[],customTextColorsEnabled:!0,customTextPopoverAutoShow:!0,customTextPopoverDelay:350};function Ct(a,i){let t={...a};for(let e in i){let o=e,s=i[o],r=a[o];(Array.isArray(s)&&Array.isArray(r)||s!=null)&&(t[o]=s)}return t}var C=require("obsidian");function ue(a,i){let t=a.trim();if(/^#[0-9a-fA-F]{6}$/.test(t)){let e=Math.round(i*255).toString(16).padStart(2,"0");return t+e}if(/^#[0-9a-fA-F]{3}$/.test(t)){let e="#"+t.slice(1).split("").map(o=>o+o).join("");return ue(e,i)}return t}function ge(a){let i=a.trim();return/^#[0-9a-fA-F]{3,4}$/.test(i)||/^#[0-9a-fA-F]{6}$/.test(i)||/^#[0-9a-fA-F]{8}$/.test(i)}function Lo(a,i){let t=e=>{let o=e.trim().toLowerCase();return/^#[0-9a-f]{3}$/.test(o)?"#"+o.slice(1).split("").map(s=>s+s).join(""):o};return t(a)===t(i)}var wt=[{value:"glow",labelKey:"customText.effectGlow",declarations:{"text-shadow":"0 0 {param:radius}px {color55}, 0 0 {param:spread}px {color30}, 0 0 {param:halo}px {color12}"},params:[{id:"radius",labelKey:"customText.paramCoreRadius",min:1,max:8,step:1,def:2,unit:"px"},{id:"spread",labelKey:"customText.paramSpread",min:2,max:20,step:1,def:6,unit:"px"},{id:"halo",labelKey:"customText.paramHalo",min:4,max:40,step:1,def:14,unit:"px"}]},{value:"shadow",labelKey:"customText.effectShadow",declarations:{"text-shadow":"{param:offset}px {param:offset}px {param:blur}px rgba(0, 0, 0, {param:opacity})"},params:[{id:"offset",labelKey:"customText.paramOffset",min:1,max:6,step:1,def:1,unit:"px"},{id:"blur",labelKey:"customText.paramBlur",min:0,max:12,step:1,def:3,unit:"px"},{id:"opacity",labelKey:"customText.paramOpacity",min:.05,max:.9,step:.05,def:.45}]},{value:"bold",labelKey:"customText.effectBold",declarations:{"font-weight":"{param:weight}"},params:[{id:"weight",labelKey:"customText.paramWeight",min:100,max:900,step:100,def:700}]},{value:"italic",labelKey:"customText.effectItalic",declarations:{"font-style":"oblique {param:skew}deg"},params:[{id:"skew",labelKey:"customText.paramSkew",min:8,max:20,step:1,def:14,unit:"\xB0"}]},{value:"underline",labelKey:"customText.effectUnderline",declarations:{"text-decoration":"underline","text-decoration-thickness":"{param:thickness}px"},params:[{id:"thickness",labelKey:"customText.paramThickness",min:1,max:5,step:1,def:1,unit:"px"}]},{value:"wavy",labelKey:"customText.effectWavy",declarations:{"text-decoration":"underline wavy {color}","text-decoration-thickness":"{param:thickness}px"},params:[{id:"thickness",labelKey:"customText.paramThickness",min:1,max:5,step:1,def:1,unit:"px"}]},{value:"dashed",labelKey:"customText.effectDashed",declarations:{"text-decoration":"underline dashed {color}","text-decoration-thickness":"{param:thickness}px"},params:[{id:"thickness",labelKey:"customText.paramThickness",min:1,max:5,step:1,def:1,unit:"px"}]},{value:"strikethrough",labelKey:"customText.effectStrikethrough",declarations:{"text-decoration":"line-through","text-decoration-thickness":"{param:thickness}px"},params:[{id:"thickness",labelKey:"customText.paramThickness",min:1,max:5,step:1,def:1,unit:"px"}]},{value:"highlight",labelKey:"customText.effectHighlight",declarations:{background:"{color}{param:alpha}","border-radius":"{param:radius}px",padding:"0 2px"},params:[{id:"alpha",labelKey:"customText.paramOpacity",min:5,max:60,step:1,def:26,unit:"hex2"},{id:"radius",labelKey:"customText.paramRadius",min:0,max:12,step:1,def:3,unit:"px"}]},{value:"marker",labelKey:"customText.effectMarker",declarations:{background:"linear-gradient(to top, {color}33 0%, transparent {param:height}%)","border-radius":"2px",padding:"0 1px"},params:[{id:"height",labelKey:"customText.paramHeight",min:20,max:100,step:5,def:45,unit:"%"}]},{value:"mono",labelKey:"customText.effectMono",declarations:{"font-family":"var(--pc-font-mono)"}},{value:"smallcaps",labelKey:"customText.effectSmallcaps",declarations:{"font-variant":"small-caps","letter-spacing":"{param:spacing}em"},params:[{id:"spacing",labelKey:"customText.paramSpacing",min:0,max:.2,step:.01,def:.03,unit:"em"}]},{value:"outline",labelKey:"customText.effectOutline",declarations:{"-webkit-text-stroke":"{param:width}px {color}","-webkit-text-fill-color":"transparent"},params:[{id:"width",labelKey:"customText.paramStrokeWidth",min:.5,max:4,step:.5,def:1,unit:"px"}]},{value:"superscript",labelKey:"customText.effectSuperscript",declarations:{"vertical-align":"super","font-size":"{param:scale}em"},params:[{id:"scale",labelKey:"customText.paramScale",min:.5,max:1,step:.05,def:.8,unit:"em"}]},{value:"uppercase",labelKey:"customText.effectUppercase",declarations:{"text-transform":"uppercase","letter-spacing":"{param:spacing}em"},params:[{id:"spacing",labelKey:"customText.paramSpacing",min:0,max:.3,step:.01,def:.05,unit:"em"}]}],ke=new Map(wt.map(a=>[a.value,a])),kt=wt.filter(a=>a.value!=="none");function Mo(a,i){return a.replace(/\{color(\d*)\}/g,(t,e)=>e===""?i:ue(i,parseInt(e,10)/100))}function Ao(a){return Math.min(100,Math.max(0,Math.round(a))).toString(16).padStart(2,"0")}function Io(a,i,t){return!i||!i.params||i.params.length===0?a:a.replace(/\{param:([\w-]+)\}/g,(e,o)=>{let s=i.params.find(l=>l.id===o);if(!s)return e;let r=t&&Number.isFinite(t[o])?t[o]:s.def;return r=Math.min(s.max,Math.max(s.min,r)),s.unit==="hex2"?Ao(r):Number.isInteger(s.step)?String(Math.round(r)):String(Math.round(r*100)/100)})}function St(a){let i={};if(!a.params)return i;for(let t of a.params)i[t.id]=t.def;return i}function Se(a,i,t){let e={};for(let o of a){if(o==="none")continue;let s=ke.get(o);if(!s)continue;let r=t==null?void 0:t[o];for(let[n,l]of Object.entries(s.declarations)){let c=Io(l,s,r);c=Mo(c,i),n==="text-decoration"?e[n]=Fo(e[n],c):n==="text-shadow"?e[n]=e[n]?`${e[n]}, ${c}`:c:e[n]=c}}return e}function Fo(a,i){if(!a)return i;let t=m=>m.trim().split(/\s+/).filter(Boolean),e=["underline","overline","line-through"],o=["wavy","dashed","dotted","solid","double"],s=t(a),r=t(i),n=[];for(let m of[...s,...r])e.includes(m)&&!n.includes(m)&&n.push(m);let l=s.filter(m=>o.includes(m)),c=r.filter(m=>o.includes(m));c.length>0&&(l=c);let p=m=>!e.includes(m)&&!o.includes(m),d=s.filter(p),u=r.filter(p),g=u.length>0?u:d;return[...n,...l,...g].join(" ")}function Te(a,i,t){if(!i.includes("outline"))return;i.filter(s=>s!=="outline"&&s!=="none").length>0&&a["-webkit-text-fill-color"]==="transparent"&&(a["-webkit-text-fill-color"]=t)}function Tt(a,i){let t=Object.entries(i).map(([e,o])=>`  ${e}: ${o} !important;`).join(`
`);return`.cm-line .${a} {
${t}
}
.${a} {
${t}
}`}function X(a){return a.effects&&a.effects.length>0?a.effects:a.effect&&a.effect!=="none"?[a.effect]:[]}function q(a){if(!a||a.length===0)return[];let i=a.filter(t=>t&&ge(t.color)).map(t=>({color:t.color.trim(),position:Math.min(100,Math.max(0,Number(t.position)||0))})).sort((t,e)=>t.position-e.position);return i.length<2?[]:(i[0].position>0&&i.unshift({...i[0],position:0}),i[i.length-1].position<100&&i.push({...i[i.length-1],position:100}),i)}function K(a){return!a||a.length<2?null:a.map(i=>`${i.color} ${i.position}%`).join(", ")}function Ee(a,i,t,e,o){let s=Math.min(360,Math.max(0,Number(o!=null?o:135)||0)),r=a["background-image"],n=a.background,l=q(e),c=K(l),p=null;if(c)p=`linear-gradient(${s}deg, ${c})`;else if(t&&ge(t)&&ge(i)&&!Lo(i,t))p=`linear-gradient(${s}deg, ${i}, ${t})`;else return;let d=[];if(r&&d.push(r),n){let g=n.trim();d.push(/^linear-gradient\(/i.test(g)?g:`linear-gradient(${g}, ${g})`),delete a.background}d.push(p),a["background-image"]=d.join(", "),a["-webkit-background-clip"]="text",a["background-clip"]="text",a["-webkit-text-fill-color"]="transparent";let u=c?l[0].color:i;a["text-shadow"]&&(a.filter=`drop-shadow(0 0 2px ${ue(u,.55)}), drop-shadow(0 0 6px ${ue(u,.3)}), drop-shadow(0 0 14px ${ue(u,.12)})`,delete a["text-shadow"])}var V=[{id:"camera",nameKey:"vocabToken.camera",descKey:"vocabToken.cameraDesc",cssClasses:["dsl-camera-word","dsl-scene-transition","dsl-lexicon-shot-size","dsl-lexicon-camera-fixed","dsl-lexicon-blocking","dsl-lexicon-focal-length","dsl-lexicon-performance","dsl-camera-action"]},{id:"light",nameKey:"vocabToken.light",descKey:"vocabToken.lightDesc",cssClasses:["dsl-light-word","dsl-color-term"]},{id:"emotion",nameKey:"vocabToken.emotion",descKey:"vocabToken.emotionDesc",cssClasses:["dsl-emotion-word","dsl-lexicon-avatar-emotion","dsl-lexicon-avatar-gesture","dsl-lexicon-tts-emotion"]},{id:"photography",nameKey:"vocabToken.photography",descKey:"vocabToken.photographyDesc",cssClasses:["dsl-photography-term","dsl-composition-term","dsl-art-style","dsl-lexicon-interior-style","dsl-lexicon-logo-style"]},{id:"audio",nameKey:"vocabToken.audio",descKey:"vocabToken.audioDesc",cssClasses:["dsl-music-audio-term","dsl-lexicon-music-structure"]},{id:"quality",nameKey:"vocabToken.quality",descKey:"vocabToken.qualityDesc",cssClasses:["dsl-quality-tag","dsl-quality-tag-ext","dsl-negative-tag","dsl-sd-image-term"]},{id:"tech",nameKey:"vocabToken.tech",descKey:"vocabToken.techDesc",cssClasses:["dsl-ai-ml-term","dsl-programming-term","dsl-data-science-term"]},{id:"design",nameKey:"vocabToken.design",descKey:"vocabToken.designDesc",cssClasses:["dsl-ui-ux-term","dsl-cg-term","dsl-vfx-term","dsl-motion-term","dsl-game-dev-term"]},{id:"narrative",nameKey:"vocabToken.narrative",descKey:"vocabToken.narrativeDesc",cssClasses:["dsl-narrative-term","dsl-marketing-term","dsl-cn-chapter"]},{id:"domains",nameKey:"vocabToken.domains",descKey:"vocabToken.domainsDesc",cssClasses:["dsl-medical-term","dsl-legal-term","dsl-finance-term","dsl-architecture-term","dsl-fashion-term","dsl-food-term","dsl-physics-term","dsl-chemistry-term","dsl-biology-term","dsl-geography-term","dsl-aerospace-term","dsl-military-term","dsl-sports-term","dsl-agriculture-term","dsl-education-term","dsl-psychology-term","dsl-ecommerce-term"]}],_e=[{id:"visual",nameKey:"vocabCategory.visual",descKey:"vocabCategory.visualDesc",groups:["camera","light","photography"]},{id:"performance",nameKey:"vocabCategory.performance",descKey:"vocabCategory.performanceDesc",groups:["emotion","audio","narrative"]},{id:"output",nameKey:"vocabCategory.output",descKey:"vocabCategory.outputDesc",groups:["quality"]},{id:"tech",nameKey:"vocabCategory.tech",descKey:"vocabCategory.techDesc",groups:["tech","design"]},{id:"domains",nameKey:"vocabCategory.domains",descKey:"vocabCategory.domainsDesc",groups:["domains"]}],Xe=Object.fromEntries(V.map(a=>[a.id,a])),tr=Object.fromEntries(_e.map(a=>[a.id,a])),Et=(()=>{let a={};for(let i of _e)for(let t of i.groups)a[t]=i.id;return a})(),Pe=(()=>{let a={};for(let i of V)for(let t of i.cssClasses)t in a||(a[t]=i.id);return a})(),or=V.map(a=>a.id);function Qe(a,i){var s,r;let t=Xe[i];if(!t||!a)return[];let e=new Set(t.cssClasses),o=new Set;for(let n of(s=a.lexicons)!=null?s:[])if(e.has(n.cssClass)&&n.words)for(let l of n.words)o.add(l);for(let n of(r=a.wordLexiconGroups)!=null?r:[])if(e.has(n.cssClass))for(let l of n.wordSet)o.add(l);return[...o].sort((n,l)=>n.localeCompare(l,"zh-Hans-CN"))}var he={global:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',editor:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>',video:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',display:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',detection:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',colors:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',sd:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',videoExt:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/><line x1="3" y1="11" x2="13" y2="11"/></svg>',cloud:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>'};function $(a,i,t,e,o){let s=a.createDiv({cls:"pc-setting-card"}),r=s.createDiv({cls:"pc-setting-card-title"});if(he[e]){let n=r.createSpan({cls:"pc-setting-card-title-icon"});n.innerHTML=he[e]}r.createSpan({text:i}),t&&s.createDiv({cls:"pc-setting-card-desc",text:t}),o(s)}function re(a,i,t,e,o){let s=a.createDiv({cls:"pc-confirm-backdrop"}),r=a.createDiv({cls:"pc-confirm-dialog"});r.createDiv({cls:"pc-confirm-dialog-title",text:t}),r.createDiv({cls:"pc-confirm-dialog-desc",text:e});let n=r.createDiv({cls:"pc-confirm-dialog-actions"});n.createEl("button",{text:i("confirm.cancel"),attr:{cls:"pc-confirm-cancel-btn"}}).addEventListener("click",()=>{s.remove(),r.remove()}),n.createEl("button",{text:i("confirm.confirm"),attr:{cls:"pc-confirm-confirm-btn mod-warning"}}).addEventListener("click",async()=>{s.remove(),r.remove(),await o()})}var _t=require("obsidian");var Bo={"status.title":"\u63D2\u4EF6\u72B6\u6001","status.editor":"\u7F16\u8F91\u5668\u9AD8\u4EAE","status.fileColorizer":"\u6587\u4EF6\u6807\u8BB0","status.readerMode":"\u9605\u8BFB\u6A21\u5F0F","status.enabled":"\u5DF2\u542F\u7528","status.disabled":"\u5DF2\u7981\u7528","status.activeRules":"\u5DF2\u542F\u7528\u89C4\u5219","status.activeVocabTokens":"\u5DF2\u542F\u7528\u8BCD\u6C47\u4EE4\u724C","status.ruleSource":"\u89C4\u5219\u6E90","status.tokenCount":"\u4EE4\u724C","tab.overview":"\u6982\u89C8","tab.rules":"\u7740\u8272\u89C4\u5219","tab.colors":"\u989C\u8272\u7BA1\u7406","tab.engine":"\u89C4\u5219\u5F15\u64CE","tab.files":"\u6587\u4EF6\u4E0E\u663E\u793A","preset.title":"\u5FEB\u901F\u9884\u8BBE","preset.all":"\u5168\u90E8\u542F\u7528","preset.basic":"\u57FA\u7840\u6A21\u5F0F","preset.video":"\u89C6\u9891\u63D0\u793A\u8BCD\u6A21\u5F0F","preset.minimal":"\u6781\u7B80\u6A21\u5F0F","preset.custom":"\u81EA\u5B9A\u4E49","preset.allDesc":"\u542F\u7528\u6240\u6709\u9AD8\u4EAE\u89C4\u5219","preset.basicDesc":"\u4EC5\u542F\u7528\u57FA\u7840\u63D0\u793A\u8BCD\u9AD8\u4EAE","preset.videoDesc":"\u542F\u7528\u89C6\u9891/\u5206\u955C\u63D0\u793A\u8BCD\u9AD8\u4EAE","preset.minimalDesc":"\u4EC5\u542F\u7528\u533A\u6BB5\u6807\u8BB0\u4E0E\u5206\u955C\u6807\u9898","agent.title":"\u667A\u80FD\u4F53\u9884\u8BBE","agent.desc":"\u5C06\u4E00\u7EC4\u9AD8\u4EAE\u89C4\u5219\u5C01\u88C5\u4E3A\u53EF\u547D\u540D\u3001\u53EF\u590D\u7528\u7684\u667A\u80FD\u4F53\u9884\u8BBE","agent.new":"\u65B0\u5EFA\u9884\u8BBE","agent.apply":"\u5E94\u7528","agent.rename":"\u91CD\u547D\u540D","agent.delete":"\u5220\u9664","agent.active":"\u4F7F\u7528\u4E2D","agent.rulesCount":"\u6761\u89C4\u5219","agent.namePrompt":"\u8F93\u5165\u9884\u8BBE\u540D\u79F0\uFF08\u5982\uFF1A\u63D0\u793A\u8BCD\u5DE5\u7A0B\u5E08\uFF09","agent.descPrompt":"\u8F93\u5165\u7B80\u77ED\u63CF\u8FF0\uFF08\u53EF\u7559\u7A7A\uFF09","agent.created":"\u667A\u80FD\u4F53\u9884\u8BBE\u5DF2\u521B\u5EFA","agent.applied":"\u667A\u80FD\u4F53\u9884\u8BBE\u5DF2\u5E94\u7528","agent.renamed":"\u667A\u80FD\u4F53\u9884\u8BBE\u5DF2\u91CD\u547D\u540D","agent.deleted":"\u667A\u80FD\u4F53\u9884\u8BBE\u5DF2\u5220\u9664","agent.nameRequired":"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A","agent.confirmDeleteTitle":"\u786E\u8BA4\u5220\u9664\u667A\u80FD\u4F53\u9884\u8BBE","agent.confirmDeleteDesc":"\u5220\u9664\u540E\u4E0D\u53EF\u6062\u590D\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F","agent.custom":"\u81EA\u5B9A\u4E49\u7EC4\u5408","pack.title":"\u63D0\u793A\u8BCD\u5305","pack.desc":"\u65B9\u5411\u5316\u914D\u7F6E\u5FEB\u7167\uFF1A\u8BED\u6CD5\u89C4\u5219 + \u8BCD\u6C47\u4EE4\u724C + \u989C\u8272\u65B9\u6848\u4E00\u952E\u5207\u6362\uFF08\u5982\u89C6\u9891\u5206\u955C\u3001\u56FE\u50CF\u751F\u6210\u3001Seedance/H3 \u4E13\u5C5E\uFF09","pack.new":"\u65B0\u5EFA\u5305","pack.rename":"\u91CD\u547D\u540D","pack.delete":"\u5220\u9664","pack.reset":"\u6062\u590D\u9ED8\u8BA4","pack.active":"\u4F7F\u7528\u4E2D","pack.rulesVocabCount":"\u89C4\u5219+\u8BCD\u6C47","pack.namePrompt":"\u8F93\u5165\u5305\u540D\u79F0\uFF08\u5982\uFF1AH3 \u4E13\u5C5E\u5305\uFF09","pack.descPrompt":"\u8F93\u5165\u7B80\u77ED\u63CF\u8FF0\uFF08\u53EF\u7559\u7A7A\uFF09","pack.created":"\u63D0\u793A\u8BCD\u5305\u5DF2\u521B\u5EFA","pack.applied":"\u63D0\u793A\u8BCD\u5305\u5DF2\u5E94\u7528","pack.renamed":"\u63D0\u793A\u8BCD\u5305\u5DF2\u91CD\u547D\u540D","pack.deleted":"\u63D0\u793A\u8BCD\u5305\u5DF2\u5220\u9664","pack.nameRequired":"\u5305\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A","pack.confirmDeleteTitle":"\u786E\u8BA4\u5220\u9664\u63D0\u793A\u8BCD\u5305","pack.confirmDeleteDesc":"\u5220\u9664\u540E\u4E0D\u53EF\u6062\u590D\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F","pack.resetDone":"\u5185\u7F6E\u5305\u5DF2\u6062\u590D\u9ED8\u8BA4\u914D\u7F6E","preview.title":"\u5B9E\u65F6\u6548\u679C\u9884\u89C8","preview.desc":"\u53EF\u7F16\u8F91\u9884\u89C8\u6587\u672C\uFF0C\u5B9E\u65F6\u7740\u8272\u8F93\u51FA\uFF0C\u968F\u89C4\u5219\u5207\u6362\u5373\u65F6\u66F4\u65B0","preview.empty":"\u89C4\u5219\u96C6\u5C1A\u672A\u52A0\u8F7D\uFF0C\u6682\u65E0\u9884\u89C8","preview.inputLabel":"\u9884\u89C8\u8F93\u5165","preview.outputLabel":"\u7740\u8272\u8F93\u51FA","preview.placeholder":"\u8F93\u5165\u63D0\u793A\u8BCD\u6587\u672C\u4EE5\u9884\u89C8\u7740\u8272\u6548\u679C\u2026","settings.global":"\u5168\u5C40\u8BBE\u7F6E","settings.globalDesc":"\u63D2\u4EF6\u6838\u5FC3\u5F00\u5173\u4E0E\u57FA\u7840\u914D\u7F6E","settings.editorHighlight":"\u7F16\u8F91\u5668\u9AD8\u4EAE","settings.editorHighlightDesc":"\u5728\u7F16\u8F91\u6A21\u5F0F\u4E0B\u4E3A\u63D0\u793A\u8BCD\u8BED\u6CD5\u7740\u8272","settings.fileColorizer":"\u6587\u4EF6\u6D4F\u89C8\u5668\u7740\u8272","settings.fileColorizerDesc":"\u5728\u6587\u4EF6\u6D4F\u89C8\u5668\u4E2D\u4E3A\u4E0D\u540C\u7C7B\u578B\u7684\u6587\u4EF6\u663E\u793A\u989C\u8272\u6807\u8BB0","settings.readerMode":"\u9605\u8BFB\u6A21\u5F0F\u6E32\u67D3","settings.readerModeDesc":"\u5728\u9605\u8BFB\u6A21\u5F0F\u4E0B\u6E32\u67D3\u5F69\u8272\u63D0\u793A\u8BCD\u5757","settings.colorMode":"\u989C\u8272\u6A21\u5F0F","settings.colorModeDesc":"\u9009\u62E9\u989C\u8272\u65B9\u6848\uFF1A\u81EA\u52A8\u8DDF\u968F\u4E3B\u9898\u6216\u5F3A\u5236\u660E\u6697\u6A21\u5F0F","settings.colorModeAuto":"\u8DDF\u968F Obsidian \u4E3B\u9898","settings.colorModeLight":"\u5F3A\u5236\u6D45\u8272\u6A21\u5F0F","settings.colorModeDark":"\u5F3A\u5236\u6DF1\u8272\u6A21\u5F0F","settings.colorScheme":"\u914D\u8272\u65B9\u6848","settings.colorSchemeDesc":"\u5BF9\u5168\u90E8\u989C\u8272\u4EE4\u724C\u505A\u6574\u4F53\u53D8\u6362\uFF1A\u67D4\u548C\u964D\u4F4E\u9971\u548C\u5EA6\u3001\u5355\u8272\u5F3A\u8C03\u8FD1\u4E4E\u7070\u5EA6\uFF08\u53EF\u81EA\u5B9A\u4E49\u4E2A\u522B\u4EE4\u724C\u4E0A\u8272\uFF09\u3001\u9C9C\u660E\u589E\u5F3A\u5BF9\u6BD4\u3001\u9AD8\u5BF9\u6BD4\u660E\u5EA6\u62C9\u4F38\u9002\u914D\u6295\u5F71","settings.schemeContrast":"\u9AD8\u5BF9\u6BD4\uFF08\u660E\u5EA6\u62C9\u4F38\uFF09","settings.palettePreset":"\u8272\u677F\u9884\u8BBE","settings.palettePresetDesc":"\u4E00\u952E\u5207\u6362\u6574\u5957\u4EE4\u724C\u914D\u8272\uFF08\u6765\u81EA\u89C4\u5219\u6587\u4EF6 palettes \u533A\u5757\uFF1A\u9A6C\u5361\u9F99/\u8367\u5149\u9713\u8679/\u83AB\u5170\u8FEA/\u843D\u65E5\uFF09","settings.paletteDefault":"\u9ED8\u8BA4\u914D\u8272","settings.colorBlindAssist":"\u8272\u76F2\u8F85\u52A9","settings.colorBlindAssistDesc":"\u7EA2/\u7EFF\u7CFB\u4EE4\u724C\u8FFD\u52A0\u5197\u4F59\u4E0B\u5212\u7EBF\uFF08\u6CE2\u6D6A/\u5B9E\u7EBF\uFF09\uFF0C\u4E0D\u4F9D\u8D56\u8272\u76F8\u5373\u53EF\u533A\u5206","settings.alphaSoft":"\u80CC\u666F\u884D\u751F\u900F\u660E\u5EA6","settings.alphaSoftDesc":"soft \u80CC\u666F\u7684\u4E0D\u900F\u660E\u5EA6\uFF1A\u5DE6\u6846\u6D45\u8272\u6A21\u5F0F\uFF08\u9ED8\u8BA4 0.06\uFF09\uFF0C\u53F3\u6846\u6DF1\u8272\u6A21\u5F0F\uFF08\u9ED8\u8BA4 0.10\uFF09\uFF0C\u8303\u56F4 0.01\u20130.6","settings.alphaBorder":"\u8FB9\u6846\u884D\u751F\u900F\u660E\u5EA6","settings.alphaBorderDesc":"border \u8FB9\u6846\u7684\u4E0D\u900F\u660E\u5EA6\uFF1A\u5DE6\u6846\u6D45\u8272\u6A21\u5F0F\uFF08\u9ED8\u8BA4 0.15\uFF09\uFF0C\u53F3\u6846\u6DF1\u8272\u6A21\u5F0F\uFF08\u9ED8\u8BA4 0.20\uFF09\uFF0C\u8303\u56F4 0.01\u20130.6","settings.folderPalettes":"\u6587\u4EF6\u5939\u8272\u677F","settings.folderPalettesDesc":"\u4E0D\u540C\u6587\u4EF6\u5939\u6302\u4E0D\u540C\u8272\u677F\u9884\u8BBE\uFF08\u6700\u957F\u8DEF\u5F84\u4F18\u5148\uFF0C\u7B14\u8BB0 frontmatter theme-palette \u53EF\u518D\u8986\u76D6\uFF09","settings.folderPaletteAdd":"\u6DFB\u52A0\u6620\u5C04","customText.secondaryColor":"\u8F85\u52A9\u8272\uFF08\u53CC\u8272\u6E10\u53D8\uFF09","customText.secondaryColorDesc":"\u8BBE\u7F6E\u540E\u6587\u5B57\u5448\u4E3B\u8272\u2192\u8F85\u52A9\u8272\u6E10\u53D8\uFF1B\u7559\u7A7A\u4E3A\u7EAF\u8272","customText.secondaryColorOff":"\u7559\u7A7A = \u7EAF\u8272","customText.secondaryColorPick":"\u9009\u53D6\u8F85\u52A9\u8272","customText.gradientTitle":"\u591A\u8272\u6E10\u53D8","customText.gradientDesc":"\u5F00\u542F\u540E\u81EA\u5B9A\u4E49\u8272\u70B9\uFF1A\u70B9\u51FB\u6D6E\u5757\u5728\u4E0B\u65B9\u9009\u8272\uFF0C\u62D6\u52A8\u6D6E\u5757\u6539\u4F4D\u7F6E\uFF0C+ \u6DFB\u52A0\u8272\u70B9\uFF0C\u2212 \u5220\u9664\u9009\u4E2D\u8272\u70B9\uFF08\u81F3\u5C11\u4FDD\u7559 2 \u4E2A\uFF09","customText.gradientToggle":"\u542F\u7528\u591A\u8272\u6E10\u53D8","customText.gradientAngle":"\u89D2\u5EA6","customText.gradientAddStop":"\u6DFB\u52A0\u8272\u70B9","customText.gradientDeleteStop":"\u5220\u9664\u9009\u4E2D\u8272\u70B9","customText.gradientReset":"\u91CD\u7F6E\u4E3A\u9ED8\u8BA4\uFF08\u53CC\u7AEF\u70B9 + 135\xB0\uFF09","customText.gradientStopAria":"\u6E10\u53D8\u8272\u70B9\uFF08\u70B9\u51FB\u6539\u8272\uFF0C\u62D6\u52A8\u6539\u4F4D\u7F6E\uFF09","customText.gradientNoSelection":"\u672A\u9009\u4E2D\u8272\u70B9","customText.gradientStopCount":"\u8272\u70B9","customText.gradientStopPalette":"\u8272\u70B9\u989C\u8272","settings.schemeDefault":"\u9ED8\u8BA4\uFF08\u539F\u8272\uFF09","settings.schemeSoft":"\u67D4\u548C\uFF08\u964D\u9971\u548C\uFF09","settings.schemeMono":"\u5355\u8272\u5F3A\u8C03\uFF08\u8FD1\u7070\u5EA6\uFF09","settings.schemeVivid":"\u9C9C\u660E\uFF08\u589E\u9971\u548C\uFF09","settings.editorRules":"\u57FA\u7840\u9AD8\u4EAE\u89C4\u5219","settings.editorRulesDesc":"\u901A\u7528\u63D0\u793A\u8BCD\u8BED\u6CD5\u7740\u8272\uFF1A\u53D8\u91CF\u3001\u89D2\u8272\u6807\u7B7E\u3001\u4EE3\u7801\u5757\u7B49","settings.highlightVariables":"\u53D8\u91CF\u5360\u4F4D\u7B26","settings.highlightVariablesDesc":"\u9AD8\u4EAE {{variable}}\u3001${variable}\u3001<|variable|> \u7B49\u5360\u4F4D\u7B26","settings.highlightRoleTags":"\u89D2\u8272\u6807\u7B7E","settings.highlightRoleTagsDesc":"\u9AD8\u4EAE <system>\u3001<user>\u3001<assistant> \u7B49 XML \u6807\u7B7E","settings.highlightRoleHeaders":"\u89D2\u8272\u6807\u9898","settings.highlightRoleHeadersDesc":"\u9AD8\u4EAE ### System\u3001### User \u7B49 Markdown \u6807\u9898","settings.highlightInstructions":"\u6307\u4EE4\u6807\u8BB0","settings.highlightInstructionsDesc":"\u9AD8\u4EAE [INST]\u3001[/INST]\u3001[SYS] \u7B49\u6307\u4EE4\u6807\u8BB0","settings.highlightComments":"\u6CE8\u91CA","settings.highlightCommentsDesc":"\u9AD8\u4EAE <!-- --> \u548C %%...%% \u6CE8\u91CA","settings.highlightCodeBlocks":"\u4EE3\u7801\u5757","settings.highlightCodeBlocksDesc":"\u4E3A\u56F4\u680F\u4EE3\u7801\u5757\u6DFB\u52A0\u80CC\u666F\u8272","settings.highlightJsonBlocks":"JSON \u4EE3\u7801\u5757","settings.highlightJsonBlocksDesc":"\u4E3A JSON \u4EE3\u7801\u5757\u6DFB\u52A0\u7279\u6B8A\u9AD8\u4EAE","settings.highlightInlineCode":"\u884C\u5185\u4EE3\u7801","settings.highlightInlineCodeDesc":"\u9AD8\u4EAE `code` \u683C\u5F0F\u7684\u884C\u5185\u4EE3\u7801","settings.videoPromptRules":"\u89C6\u9891\u63D0\u793A\u8BCD\u9AD8\u4EAE\u89C4\u5219","settings.videoPromptRulesDesc":"\u89C6\u9891/\u5206\u955C\u63D0\u793A\u8BCD\u4E13\u7528\u7740\u8272\uFF1A\u533A\u6BB5\u3001\u5206\u955C\u3001\u8D44\u6E90\u5F15\u7528\u3001\u53F0\u8BCD\u7B49","settings.highlightSectionMarkers":"\u533A\u6BB5\u6807\u8BB0","settings.highlightSectionMarkersDesc":"\u9AD8\u4EAE \u3010\u6574\u4F53\u8BBE\u5B9A\u3011\u3010\u5206\u955C\u8BBE\u8BA1\u3011 \u7B49\u533A\u6BB5\u6807\u8BB0","settings.highlightShotHeaders":"\u5206\u955C\u6807\u9898","settings.highlightShotHeadersDesc":"\u9AD8\u4EAE \u955C\u59341\uFF083\u79D2\uFF09\u3001Shot 1 \u7B49\u5206\u955C\u6807\u9898","settings.highlightAssetRefs":"\u8D44\u6E90\u5F15\u7528","settings.highlightAssetRefsDesc":"\u9AD8\u4EAE @\u56FE1(\u5B89\u5FB7\u70C8)\u3001@\u56FE2(\u7B80)-\u53C2\u8003\u56FE\u670D\u88C5 \u7B49\u8D44\u6E90\u5F15\u7528","settings.highlightFieldLabels":"\u5B57\u6BB5\u6807\u7B7E","settings.highlightFieldLabelsDesc":"\u9AD8\u4EAE \u666F\u522B\uFF1A\u8FD0\u955C\uFF1A\u5149\u5F71\uFF1A \u7B49\u5B57\u6BB5\u6807\u7B7E","settings.highlightDialogue":"\u53F0\u8BCD\u5185\u5BB9","settings.highlightDialogueDesc":"\u9AD8\u4EAE\u5F15\u53F7\u5185\u7684\u53F0\u8BCD\u5185\u5BB9","settings.highlightAudioRefs":"\u97F3\u9891\u5F15\u7528","settings.highlightAudioRefsDesc":"\u9AD8\u4EAE @\u97F3\u98911\u3001\u97F3\u8272 @\u97F3\u98912 \u7B49\u97F3\u9891\u5F15\u7528","settings.highlightNegativePrompts":"\u6392\u9664/\u7981\u6B62\u89C4\u5219","settings.highlightNegativePromptsDesc":"\u9AD8\u4EAE \u6392\u9664\u3001\u7981\u6B62\u3001\u675C\u7EDD \u7B49\u6392\u9664\u6027\u6307\u4EE4","settings.highlightTechParams":"\u6280\u672F\u53C2\u6570","settings.highlightTechParamsDesc":"\u9AD8\u4EAE 3200K\u30013\u79D2 \u7B49\u6280\u672F\u53C2\u6570","settings.highlightParentheticals":"\u62EC\u53F7\u6CE8\u91CA","settings.highlightParentheticalsDesc":"\u9AD8\u4EAE \uFF08\u7C97\u4FD7\u3001\u620F\u8C11\uFF09\uFF08\u6C14\u573A\u793A\u5A01\uFF09 \u7B49\u62EC\u53F7\u6CE8\u91CA","settings.sdPromptRules":"SD/ComfyUI \u6269\u5C55\u89C4\u5219","settings.sdPromptRulesDesc":"\u56FE\u50CF\u751F\u6210\u63D0\u793A\u8BCD\u4E13\u7528\u7740\u8272\uFF1A\u6743\u91CD\u3001Lora\u3001\u8D28\u91CF\u6807\u7B7E\u7B49","settings.highlightEmphasisWeights":"\u6743\u91CD\u6807\u8BB0","settings.highlightEmphasisWeightsDesc":"\u9AD8\u4EAE (text:1.3) \u683C\u5F0F\u7684\u6743\u91CD\u8C03\u6574\u8BED\u6CD5","settings.highlightLoraRefs":"Lora/\u6A21\u578B\u5F15\u7528","settings.highlightLoraRefsDesc":"\u9AD8\u4EAE <lora:name:0.8>\u3001<model:name> \u7B49\u6A21\u578B\u5F15\u7528","settings.highlightBracketEmphasis":"\u62EC\u53F7\u5F3A\u8C03","settings.highlightBracketEmphasisDesc":"\u9AD8\u4EAE ((text)) \u5F3A\u8C03\u548C [text] \u5F31\u5316\u8BED\u6CD5","settings.highlightQualityTags":"\u8D28\u91CF\u6807\u7B7E","settings.highlightQualityTagsDesc":"\u9AD8\u4EAE masterpiece\u3001best quality \u7B49\u8D28\u91CF\u589E\u5F3A\u6807\u7B7E","settings.highlightSdNegativeHeader":"SD \u8D1F\u9762\u63D0\u793A\u8BCD\u5934","settings.highlightSdNegativeHeaderDesc":"\u9AD8\u4EAE Negative prompt: \u8D1F\u9762\u63D0\u793A\u8BCD\u5206\u9694\u6807\u8BB0","settings.videoExtRules":"\u89C6\u9891\u63D0\u793A\u8BCD\u6269\u5C55\u89C4\u5219","settings.videoExtRulesDesc":"\u955C\u5934\u8FD0\u52A8\u3001\u8F6C\u573A\u6807\u8BB0\u7B49\u7740\u8272","settings.highlightCameraMoves":"\u955C\u5934\u8FD0\u52A8\u672F\u8BED","settings.highlightCameraMovesDesc":"\u9AD8\u4EAE \u63A8\u955C\u5934\u3001\u62C9\u955C\u5934\u3001\u6447\u955C\u5934 \u7B49\u8FD0\u955C\u672F\u8BED","settings.highlightSceneTransitions":"\u8F6C\u573A\u6807\u8BB0","settings.highlightSceneTransitionsDesc":"\u9AD8\u4EAE \u8F6C\u573A\u3001\u6DE1\u5165\u3001\u6DE1\u51FA \u7B49\u8F6C\u573A\u6807\u8BB0","batch.enableAll":"\u5168\u90E8\u542F\u7528","batch.disableAll":"\u5168\u90E8\u7981\u7528","batch.reset":"\u91CD\u7F6E","search.placeholder":"\u641C\u7D22\u5F00\u5173\u6216\u4EE4\u724C\u2026","search.noMatch":"\u65E0\u5339\u914D\u9879","search.matchCount":"\u5339\u914D {count} \u9879","settings.fileDetection":"\u6587\u4EF6\u7C7B\u578B\u68C0\u6D4B","settings.fileDetectionDesc":"\u914D\u7F6E\u81EA\u52A8\u8BC6\u522B\u63D0\u793A\u8BCD\u6587\u4EF6\u7C7B\u578B\u7684\u7B56\u7565","settings.detectByFrontmatter":"\u901A\u8FC7 Frontmatter \u68C0\u6D4B","settings.detectByFrontmatterDesc":"\u6839\u636E frontmatter \u4E2D\u7684 type \u5B57\u6BB5\u6216 tags \u5224\u65AD\u6587\u4EF6\u7C7B\u578B","settings.detectByFolder":"\u901A\u8FC7\u6587\u4EF6\u5939\u68C0\u6D4B","settings.detectByFolderDesc":"\u6839\u636E\u6587\u4EF6\u6240\u5728\u6587\u4EF6\u5939\u8DEF\u5F84\u5224\u65AD\u6587\u4EF6\u7C7B\u578B","settings.detectByFilename":"\u901A\u8FC7\u6587\u4EF6\u540D\u68C0\u6D4B","settings.detectByFilenameDesc":"\u6839\u636E\u6587\u4EF6\u540D\u524D\u7F00\uFF08\u5982 sys-\u3001user-\uFF09\u5224\u65AD\u6587\u4EF6\u7C7B\u578B","settings.displayOptions":"\u663E\u793A\u9009\u9879","settings.displayOptionsDesc":"\u63A7\u5236\u63D2\u4EF6\u5728\u6587\u4EF6\u6D4F\u89C8\u5668\u7B49\u89C6\u56FE\u4E2D\u7684\u7740\u8272\u663E\u793A","settings.fileTypeColors":"\u6587\u4EF6\u7C7B\u578B\u989C\u8272","settings.fileTypeColorsDesc":"\u81EA\u5B9A\u4E49\u5404\u6587\u4EF6\u7C7B\u578B\u5728\u6587\u4EF6\u6D4F\u89C8\u5668\u4E2D\u7684\u6807\u8BB0\u989C\u8272","settings.resetColors":"\u91CD\u7F6E\u989C\u8272","settings.resetColorsDesc":"\u5C06\u6240\u6709\u6587\u4EF6\u7C7B\u578B\u989C\u8272\u6062\u590D\u4E3A\u9ED8\u8BA4\u503C","settings.reset":"\u91CD\u7F6E","confirm.resetTitle":"\u786E\u8BA4\u91CD\u7F6E\u989C\u8272","confirm.resetDesc":"\u6B64\u64CD\u4F5C\u5C06\u628A\u6240\u6709\u6587\u4EF6\u7C7B\u578B\u989C\u8272\u6062\u590D\u4E3A\u9ED8\u8BA4\u503C\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F","confirm.cancel":"\u53D6\u6D88","confirm.ok":"\u786E\u5B9A","confirm.confirm":"\u786E\u8BA4\u91CD\u7F6E","confirm.importTitle":"\u786E\u8BA4\u5BFC\u5165\u914D\u7F6E","confirm.importDesc":"\u5C06\u5408\u5E76 {count} \u4E2A\u914D\u7F6E\u6587\u4EF6\uFF0C\u76F8\u540C\u9879\u5C06\u88AB\u8986\u76D6\u3002\u662F\u5426\u7EE7\u7EED\uFF1F","settings.configManagement":"\u914D\u7F6E\u7BA1\u7406","settings.configManagementDesc":"\u5BFC\u51FA\u5F53\u524D\u914D\u7F6E\u6216\u5BFC\u5165\u5176\u4ED6\u914D\u7F6E\u6587\u4EF6\uFF08\u652F\u6301\u591A\u6587\u4EF6\u5408\u5E76\uFF09","settings.exportConfig":"\u5BFC\u51FA\u914D\u7F6E","settings.exportConfigDesc":"\u5C06\u5F53\u524D\u6240\u6709\u7740\u8272\u914D\u7F6E\u5BFC\u51FA\u4E3A JSON \u6587\u4EF6","settings.export":"\u5BFC\u51FA","settings.importConfig":"\u5BFC\u5165\u914D\u7F6E","settings.importConfigDesc":"\u4ECE JSON \u6587\u4EF6\u5BFC\u5165\u914D\u7F6E\uFF0C\u652F\u6301\u9009\u62E9\u591A\u4E2A\u6587\u4EF6\u4F9D\u6B21\u5408\u5E76","settings.import":"\u5BFC\u5165","notice.refreshed":"\u5DF2\u5237\u65B0\u7740\u8272","notice.enabled":"\u63D0\u793A\u8BCD\u7740\u8272\u5DF2\u542F\u7528","notice.disabled":"\u63D0\u793A\u8BCD\u7740\u8272\u5DF2\u7981\u7528","notice.presetApplied":"\u9884\u8BBE\u65B9\u6848\u5DF2\u5E94\u7528","notice.colorsReset":"\u989C\u8272\u5DF2\u91CD\u7F6E\u4E3A\u9ED8\u8BA4\u503C","notice.configExported":"\u914D\u7F6E\u5DF2\u5BFC\u51FA","notice.configImported":"\u5DF2\u5BFC\u5165\u5E76\u5408\u5E76 {count} \u4E2A\u914D\u7F6E\u6587\u4EF6","notice.noGitUrl":"\u8BF7\u5148\u5728\u8BBE\u7F6E\u4E2D\u914D\u7F6E Git \u89C4\u5219\u4ED3\u5E93\u5730\u5740","notice.checkingUpdates":"\u6B63\u5728\u68C0\u67E5\u89C4\u5219\u66F4\u65B0\u2026","notice.fetchFailed":"\u65E0\u6CD5\u8FDE\u63A5\u5230\u8FDC\u7A0B\u89C4\u5219\u4ED3\u5E93","notice.alreadyLatest":"\u89C4\u5219\u5DF2\u662F\u6700\u65B0\u7248\u672C","notice.downloading":"\u6B63\u5728\u4E0B\u8F7D\u6700\u65B0\u89C4\u5219\u2026","notice.downloadFailed":"\u89C4\u5219\u6587\u4EF6\u4E0B\u8F7D\u5931\u8D25","notice.updateSuccess":"\u89C4\u5219\u66F4\u65B0\u6210\u529F","notice.compileFailed":"\u89C4\u5219\u7F16\u8BD1\u5931\u8D25\uFF0C\u5DF2\u56DE\u9000\u5230\u4E0A\u4E00\u7248\u672C","notice.updateError":"\u89C4\u5219\u66F4\u65B0\u51FA\u9519","notice.rulesReloaded":"\u89C4\u5219\u5DF2\u91CD\u65B0\u52A0\u8F7D","notice.cacheCleared":"\u672C\u5730\u7F13\u5B58\u5DF2\u6E05\u7A7A","notice.gitParsed":"Git \u5730\u5740\u5DF2\u81EA\u52A8\u89E3\u6790","command.groupPrefix":"\u63D0\u793A\u8BCD\u7740\u8272 \u203A ","command.refresh":"\u5237\u65B0\u7740\u8272","command.refreshDesc":"\u91CD\u65B0\u5E94\u7528\u6240\u6709\u7740\u8272\u89C4\u5219","command.toggleHighlight":"\u5207\u6362\u7F16\u8F91\u5668\u9AD8\u4EAE","command.toggleHighlightDesc":"\u542F\u7528\u6216\u7981\u7528\u7F16\u8F91\u5668\u9AD8\u4EAE","command.updateRules":"\u68C0\u67E5\u89C4\u5219\u66F4\u65B0","command.updateRulesDesc":"\u4ECE Git \u8FDC\u7A0B\u4ED3\u5E93\u62C9\u53D6\u6700\u65B0\u7740\u8272\u89C4\u5219","command.reloadRules":"\u91CD\u65B0\u52A0\u8F7D\u89C4\u5219","command.reloadRulesDesc":"\u4ECE\u672C\u5730\u7F13\u5B58\u91CD\u65B0\u7F16\u8BD1\u7740\u8272\u89C4\u5219","command.exportFull":"\u5BFC\u51FA\u5168\u91CF\u8BBE\u7F6E","command.exportFullDesc":"\u5C06\u5F53\u524D\u6240\u6709\u8BBE\u7F6E\u5BFC\u51FA\u4E3A JSON \u6587\u4EF6\u5230 Vault \u6839\u76EE\u5F55","command.importFull":"\u5BFC\u5165\u5168\u91CF\u8BBE\u7F6E","command.importFullDesc":"\u4ECE\u5F53\u524D\u6253\u5F00\u7684 JSON \u6587\u4EF6\u5BFC\u5165\u8BBE\u7F6E(\u8986\u76D6\u5F53\u524D)","command.exportCustomTextColors":"\u5BFC\u51FA\u81EA\u5B9A\u4E49\u6587\u672C\u989C\u8272","command.exportCustomTextColorsDesc":"\u5BFC\u51FA\u6240\u6709\u81EA\u5B9A\u4E49\u6587\u672C\u989C\u8272\u89C4\u5219\u4E3A JSON \u6587\u4EF6","command.exportFolderMappings":"\u5BFC\u51FA\u6587\u4EF6\u5939\u6620\u5C04","command.exportFolderMappingsDesc":"\u5BFC\u51FA\u6240\u6709\u6587\u4EF6\u5939\u6620\u5C04\u89C4\u5219\u4E3A JSON \u6587\u4EF6","notice.exportSuccess":"\u5BFC\u51FA\u6210\u529F","notice.exportFailed":"\u5BFC\u51FA\u5931\u8D25","notice.importSuccess":"\u5BFC\u5165\u6210\u529F","notice.importFailed":"\u5BFC\u5165\u5931\u8D25","notice.importInvalidFormat":"\u5BFC\u5165\u6587\u4EF6\u683C\u5F0F\u65E0\u6548","notice.importFileError":"\u65E0\u6CD5\u8BFB\u53D6\u5F53\u524D\u6587\u4EF6,\u8BF7\u6253\u5F00\u6709\u6548\u7684 JSON \u5BFC\u51FA\u6587\u4EF6\u540E\u91CD\u8BD5","settings.ruleEngine":"\u89C4\u5219\u5F15\u64CE","settings.ruleEngineDesc":"DSL \u7740\u8272\u89C4\u5219\u7684\u6765\u6E90\u4E0E\u7BA1\u7406","settings.ruleSource":"\u89C4\u5219\u6765\u6E90","settings.ruleSourceDesc":"\u9009\u62E9\u7740\u8272\u89C4\u5219\u7684\u52A0\u8F7D\u65B9\u5F0F","settings.ruleSourceBuiltin":"\u5185\u7F6E\u89C4\u5219","settings.ruleSourceLocal":"\u672C\u5730\u7F13\u5B58","settings.ruleSourceRemote":"Git \u8FDC\u7A0B","settings.gitRawBaseUrl":"Git Raw \u5730\u5740","settings.gitRawBaseUrlDesc":"\u6307\u5411 rules/ \u76EE\u5F55\u7684 Git Raw \u57FA\u7840 URL","settings.gitRawBaseUrlPh":"https://raw.githubusercontent.com/user/repo/branch/rules","settings.gitBranch":"Git \u5206\u652F","settings.gitBranchDesc":"\u89C4\u5219\u4ED3\u5E93\u7684\u5206\u652F\u540D\u79F0\uFF08\u533A\u5206\u5927\u5C0F\u5199\uFF09","settings.autoUpdateRules":"\u81EA\u52A8\u68C0\u67E5\u66F4\u65B0","settings.autoUpdateRulesDesc":"\u5B9A\u671F\u68C0\u67E5\u8FDC\u7A0B\u89C4\u5219\u662F\u5426\u6709\u65B0\u7248\u672C","settings.autoUpdateInterval":"\u68C0\u67E5\u95F4\u9694\uFF08\u5C0F\u65F6\uFF09","settings.autoUpdateIntervalDesc":"\u81EA\u52A8\u68C0\u67E5\u89C4\u5219\u66F4\u65B0\u7684\u65F6\u95F4\u95F4\u9694","settings.contextSemantic":"\u4E0A\u4E0B\u6587\u8BED\u4E49\u8FC7\u6EE4","settings.contextSemanticDesc":"\u6839\u636E\u6240\u5904\u533A\u5757\u51B3\u5B9A\u5B50\u5185\u5BB9\u7740\u8272\u89C4\u5219\u662F\u5426\u751F\u6548","settings.lexiconEnabled":"\u8BCD\u5178\u7CBE\u7EC6\u5316\u7740\u8272","settings.lexiconEnabledDesc":"\u542F\u7528\u4E1A\u52A1\u8BCD\u5178\u8FDB\u884C\u6700\u9AD8\u4F18\u5148\u7EA7\u7684\u5173\u952E\u8BCD\u7CBE\u7EC6\u5316\u7740\u8272","settings.ruleVersion":"\u5F53\u524D\u89C4\u5219\u7248\u672C","settings.ruleVersionDesc":"\u5F53\u524D\u52A0\u8F7D\u7684\u89C4\u5219\u96C6\u7248\u672C\u53F7","settings.checkUpdate":"\u68C0\u67E5\u66F4\u65B0","settings.reloadRules":"\u91CD\u65B0\u52A0\u8F7D","settings.clearCache":"\u6E05\u7A7A\u7F13\u5B58","settings.ruleEngineIcon":"cloud","settings.pullReport":"\u62C9\u53D6\u62A5\u544A","settings.pullReportDesc":"\u4E0A\u6B21 Git \u89C4\u5219\u62C9\u53D6\u7684\u8BE6\u7EC6\u62A5\u544A","settings.gitReportEnabled":"\u542F\u7528\u62C9\u53D6\u62A5\u544A","settings.gitReportEnabledDesc":"\u8BB0\u5F55\u6BCF\u6B21 Git \u62C9\u53D6\u64CD\u4F5C\u7684\u8BE6\u7EC6\u7ED3\u679C","settings.downloadToCache":"\u4E0B\u8F7D\u5230\u672C\u5730\u7F13\u5B58","settings.downloadToCacheDesc":"\u62C9\u53D6\u6210\u529F\u540E\u81EA\u52A8\u4FDD\u5B58\u89C4\u5219\u6587\u4EF6\u5230\u672C\u5730\u7F13\u5B58","settings.reportStatus":"\u72B6\u6001","settings.reportStatusSuccess":"\u6210\u529F","settings.reportStatusFailed":"\u5931\u8D25","settings.reportNoUpdate":"\u65E0\u9700\u66F4\u65B0","settings.reportRemoteVersion":"\u8FDC\u7A0B\u7248\u672C","settings.reportLocalVersion":"\u672C\u5730\u7248\u672C","settings.reportUpdateTime":"\u66F4\u65B0\u65F6\u95F4","settings.reportDuration":"\u8017\u65F6","settings.reportFiles":"\u6587\u4EF6\u5217\u8868","settings.reportCategories":"\u5206\u7C7B\u7EDF\u8BA1","settings.reportTotalFiles":"\u603B\u6587\u4EF6\u6570","settings.reportSuccessFiles":"\u6210\u529F\u6587\u4EF6\u6570","settings.reportTotalRules":"\u603B\u89C4\u5219\u6570","settings.reportTotalTerms":"\u603B\u672F\u8BED\u6570","settings.reportError":"\u9519\u8BEF\u4FE1\u606F","settings.reportNoReport":"\u6682\u65E0\u62C9\u53D6\u62A5\u544A\uFF0C\u8BF7\u5148\u68C0\u67E5\u66F4\u65B0","settings.reportFile":"\u6587\u4EF6","settings.reportSize":"\u5927\u5C0F","settings.reportCategory":"\u5206\u7C7B","settings.reportCount":"\u6761\u76EE\u6570","settings.reportParsed":"\u89E3\u6790","settings.reportYes":"\u662F","settings.reportNo":"\u5426","settings.gitRepoUrl":"Git \u4ED3\u5E93\u5730\u5740","settings.gitRepoUrlDesc":"\u7C98\u8D34\u5B8C\u6574 GitHub URL\uFF0C\u81EA\u52A8\u89E3\u6790\u4E3A Raw \u5730\u5740\u548C\u5206\u652F","settings.gitRepoUrlPh":"https://github.com/user/repo/tree/branch/rules","settings.colorCustom":"\u7740\u8272\u989C\u8272\u81EA\u5B9A\u4E49","settings.colorCustomDesc":"\u989C\u8272\u4EE4\u724C\u7531 YAML \u89C4\u5219\u6587\u4EF6\u5B9A\u4E49\uFF0C\u53EF\u65E0\u9650\u6269\u5C55\u3002\u8C03\u6574\u989C\u8272\u540E\u5B9E\u65F6\u9884\u89C8\u6548\u679C","settings.noColorTokens":"\u5F53\u524D\u89C4\u5219\u96C6\u672A\u5B9A\u4E49\u989C\u8272\u4EE4\u724C\u3002\u8BF7\u5728\u89C4\u5219\u5F15\u64CE\u4E2D\u9009\u62E9\u89C4\u5219\u6765\u6E90\u5E76\u52A0\u8F7D\u89C4\u5219","settings.resetCustomColorsDesc":"\u5C06\u6240\u6709\u81EA\u5B9A\u4E49\u989C\u8272\u6062\u590D\u4E3A YAML \u9ED8\u8BA4\u503C","settings.tokenGroupBasic":"\u57FA\u7840\u4EE4\u724C","settings.tokenGroupBasicDesc":"\u6392\u9664/\u6210\u529F/\u8B66\u544A\u7B49\u6838\u5FC3\u8BED\u4E49\u8272\uFF0C\u88AB\u9AD8\u4EAE\u89C4\u5219\u5F15\u7528","settings.tokenGroupExtended":"\u6269\u5C55\u4EE4\u724C","settings.tokenGroupExtendedDesc":"ANTML/Markdown/\u94FE\u63A5\u7B49\u6269\u5C55\u8BED\u6CD5\u8272","settings.tokenGroupShot":"\u5206\u955C\u6269\u5C55\u4EE4\u724C","settings.tokenGroupShotDesc":"\u5206\u955C\u6BB5\u843D/\u6A21\u5757/\u5F15\u7528\u6807\u8BB0\u8272","settings.tokenGroupMultimodal":"\u591A\u6A21\u6001\u6269\u5C55\u4EE4\u724C","settings.tokenGroupMultimodalDesc":"\u97F3\u4E50/\u6B4C\u8BCD\u7B49\u591A\u6A21\u6001\u8272","settings.tokenNoiseWarning":"\u5F53\u524D\u5DF2\u542F\u7528 {count} \u4E2A\u989C\u8272\u4EE4\u724C\uFF0C\u540C\u5C4F\u989C\u8272\u8FC7\u591A\u4F1A\u964D\u4F4E\u53EF\u8BFB\u6027","settings.tokenNoiseAction":"\u4E00\u952E\u964D\u566A\uFF08\u4EC5\u4FDD\u7559\u57FA\u7840\u4EE4\u724C\uFF09","settings.tokenNoiseDone":"\u5DF2\u964D\u566A\uFF1A\u4EC5\u4FDD\u7559\u57FA\u7840 10 \u4EE4\u724C\uFF0C\u5176\u4F59\u53EF\u5728\u4EE4\u724C\u5361\u7247\u4E2D\u624B\u52A8\u5F00\u542F","settings.tokenRelatedRules":"\u5173\u8054\u89C4\u5219","settings.tokenRelatedRulesCount":"\u5173\u8054\u89C4\u5219\uFF08{count}\uFF09\uFF1A","settings.tokenGroupCount":"\uFF08{count}\uFF09","confirm.resetCustomColorsDesc":"\u6B64\u64CD\u4F5C\u5C06\u6E05\u9664\u6240\u6709\u81EA\u5B9A\u4E49\u989C\u8272\u8986\u76D6\uFF0C\u6062\u590D YAML \u89C4\u5219\u5B9A\u4E49\u7684\u9ED8\u8BA4\u989C\u8272\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F","notice.tokenGroupColorsReset":"\u5DF2\u91CD\u7F6E\u8BE5\u5206\u7EC4\u7684\u81EA\u5B9A\u4E49\u989C\u8272","color.danger":"\u7EA2\u8272\uFF08\u6392\u9664/\u7981\u6B62\uFF09","color.dangerDesc":"\u6392\u9664\u89C4\u5219\u3001SD \u8D1F\u9762\u63D0\u793A\u8BCD\u5934","color.success":"\u7EFF\u8272\uFF08\u6210\u529F/\u53F0\u8BCD\uFF09","color.successDesc":"\u53F0\u8BCD\u5185\u5BB9\u3001\u8D28\u91CF\u6807\u7B7E","color.warning":"\u9EC4\u8272\uFF08\u8B66\u544A/\u53C2\u6570\uFF09","color.warningDesc":"\u6280\u672F\u53C2\u6570\u3001\u53D8\u91CF\u3001\u6743\u91CD\u6807\u8BB0","color.info":"\u84DD\u8272\uFF08\u4FE1\u606F/\u6807\u7B7E\uFF09","color.infoDesc":"\u5B57\u6BB5\u6807\u7B7E\u3001\u62EC\u53F7\u5F3A\u8C03","color.purple":"\u7D2B\u8272\uFF08\u533A\u6BB5/\u6307\u4EE4\uFF09","color.purpleDesc":"\u533A\u6BB5\u6807\u8BB0\u3001\u89D2\u8272\u6807\u7B7E\u3001\u6307\u4EE4\u6807\u8BB0","color.cyan":"\u9752\u8272\uFF08\u5206\u955C/\u8FD0\u955C\uFF09","color.cyanDesc":"\u5206\u955C\u6807\u9898\u3001\u955C\u5934\u8FD0\u52A8\u672F\u8BED","color.pink":"\u7C89\u8272\uFF08\u97F3\u9891\uFF09","color.pinkDesc":"\u97F3\u9891\u5F15\u7528\u3001\u97F3\u8272\u6807\u7B7E","color.amber":"\u68D5\u8272\uFF08\u8D44\u6E90\u5F15\u7528\uFF09","color.amberDesc":"\u8D44\u6E90\u5F15\u7528\u3001Lora \u6A21\u578B\u5F15\u7528","color.orange":"\u6A59\u8272\uFF08\u5149\u6548\uFF09","color.orangeDesc":"\u5149\u6548\u672F\u8BED","customText.section":"\u81EA\u5B9A\u4E49\u6587\u672C\u989C\u8272","customText.sectionDesc":"\u4E3A\u4EFB\u610F\u6587\u672C\u5E94\u7528\u81EA\u5B9A\u4E49\u989C\u8272\uFF08\u6309\u6587\u672C\u5185\u5BB9\u5168\u5C40\u5339\u914D\uFF0C\u4E0D\u5199\u5165 md \u6587\u4EF6\uFF0C\u4FDD\u6301\u539F\u6587\u7EAF\u51C0\uFF09","customText.enabled":"\u542F\u7528\u81EA\u5B9A\u4E49\u6587\u672C\u989C\u8272","customText.enabledDesc":"\u5173\u95ED\u540E\u6240\u6709\u81EA\u5B9A\u4E49\u6587\u672C\u989C\u8272\u89C4\u5219\u5C06\u4E0D\u518D\u751F\u6548","customText.modalTitle":"\u4E3A\u9009\u4E2D\u6587\u672C\u5E94\u7528\u989C\u8272","customText.preview":"\u9009\u4E2D\u6587\u672C\u9884\u89C8","customText.noSelection":"\u672A\u9009\u4E2D\u6587\u672C","customText.presetPalette":"\u6807\u51C6\u9884\u8BBE\u8272\u677F","customText.colorSection":"\u989C\u8272","customText.matchOptions":"\u5339\u914D\u9009\u9879","customText.copyHex":"\u70B9\u51FB\u590D\u5236\u8272\u503C","customText.copied":"\u5DF2\u590D\u5236","customText.customColor":"\u81EA\u5B9A\u4E49\u989C\u8272","customText.hexValue":"\u5341\u516D\u8FDB\u5236\u989C\u8272\u503C","customText.caseSensitive":"\u533A\u5206\u5927\u5C0F\u5199","customText.caseSensitiveDesc":"\u5339\u914D\u65F6\u662F\u5426\u533A\u5206\u5927\u5C0F\u5199\uFF08\u9ED8\u8BA4\u4E0D\u533A\u5206\uFF09","customText.wholeWord":"\u5168\u5B57\u5339\u914D","customText.wholeWordDesc":'\u4EC5\u5339\u914D\u5B8C\u6574\u5355\u8BCD\uFF0C\u907F\u514D\u90E8\u5206\u5339\u914D\uFF08\u5982 "Cat" \u4E0D\u5339\u914D "Category"\uFF09',"customText.effect":"\u6587\u5B57\u6548\u679C","customText.effectDesc":"\u5728\u989C\u8272\u57FA\u7840\u4E0A\u53E0\u52A0\u6587\u5B57\u6548\u679C\uFF08\u53EF\u591A\u9009\u81EA\u7531\u7EC4\u5408\uFF09","customText.effectComposableHint":"\u70B9\u51FB\u53EF\u52FE\u9009/\u53D6\u6D88\uFF0C\u591A\u4E2A\u6548\u679C\u53EF\u81EA\u7531\u53E0\u52A0\u7EC4\u5408","customText.effectNone":"\u65E0","customText.effectGlow":"\u53D1\u5149","customText.paramCoreRadius":"\u6838\u5FC3\u534A\u5F84","customText.paramSpread":"\u6269\u6563","customText.paramHalo":"\u5149\u6655","customText.paramOffset":"\u504F\u79FB","customText.paramBlur":"\u6A21\u7CCA","customText.paramOpacity":"\u4E0D\u900F\u660E\u5EA6","customText.paramWeight":"\u5B57\u91CD","customText.paramSkew":"\u503E\u659C","customText.paramThickness":"\u7EBF\u6761\u7C97\u7EC6","customText.paramRadius":"\u5706\u89D2","customText.paramHeight":"\u8986\u76D6\u9AD8\u5EA6","customText.paramSpacing":"\u5B57\u8DDD","customText.paramStrokeWidth":"\u63CF\u8FB9\u5BBD\u5EA6","customText.paramScale":"\u5B57\u53F7\u7F29\u653E","customText.effectShadow":"\u6295\u5F71","customText.effectBold":"\u52A0\u7C97","customText.effectItalic":"\u659C\u4F53","customText.effectUnderline":"\u4E0B\u5212\u7EBF","customText.effectWavy":"\u6CE2\u6D6A\u7EBF","customText.effectDashed":"\u865A\u7EBF\u4E0B\u5212","customText.effectStrikethrough":"\u5220\u9664\u7EBF","customText.effectHighlight":"\u80CC\u666F\u9AD8\u4EAE","customText.effectMarker":"\u8367\u5149\u7B14","customText.effectMono":"\u7B49\u5BBD\u5B57\u4F53","customText.effectSmallcaps":"\u5C0F\u578B\u5927\u5199","customText.effectOutline":"\u7A7A\u5FC3\u63CF\u8FB9","customText.effectSuperscript":"\u4E0A\u6807","customText.effectUppercase":"\u5168\u5927\u5199","customText.effectName_glow":"\u53D1\u5149","customText.effectName_shadow":"\u6295\u5F71","customText.effectName_bold":"\u52A0\u7C97","customText.effectName_italic":"\u659C\u4F53","customText.effectName_underline":"\u4E0B\u5212\u7EBF","customText.effectName_wavy":"\u6CE2\u6D6A\u7EBF","customText.effectName_dashed":"\u865A\u7EBF\u4E0B\u5212","customText.effectName_strikethrough":"\u5220\u9664\u7EBF","customText.effectName_highlight":"\u80CC\u666F\u9AD8\u4EAE","customText.effectName_marker":"\u8367\u5149\u7B14","customText.effectName_mono":"\u7B49\u5BBD","customText.effectName_smallcaps":"\u5C0F\u578B\u5927\u5199","customText.effectName_outline":"\u7A7A\u5FC3\u63CF\u8FB9","customText.effectName_superscript":"\u4E0A\u6807","customText.effectName_uppercase":"\u5168\u5927\u5199","customText.cancel":"\u53D6\u6D88","customText.confirm":"\u5E94\u7528\u989C\u8272","customText.add":"\u4E3A\u9009\u4E2D\u6587\u672C\u6DFB\u52A0\u989C\u8272","customText.addDesc":"\u5728\u7F16\u8F91\u5668\u4E2D\u9009\u4E2D\u6587\u672C\u540E\uFF0C\u70B9\u51FB\u6B64\u6309\u94AE\u6216\u4F7F\u7528\u547D\u4EE4\u4E3A\u5176\u5E94\u7528\u81EA\u5B9A\u4E49\u989C\u8272","customText.empty":"\u6682\u65E0\u81EA\u5B9A\u4E49\u6587\u672C\u989C\u8272\uFF0C\u8BF7\u5728\u7F16\u8F91\u5668\u4E2D\u9009\u4E2D\u6587\u672C\u540E\u901A\u8FC7\u547D\u4EE4\u6DFB\u52A0","customText.detailEmpty":"\u672A\u9009\u62E9\u89C4\u5219","customText.gradientStopsLabel":"\u8272\u70B9\u4E32","customText.gradientPreview":"\u6E10\u53D8\u9884\u89C8","customText.enableAction":"\u542F\u7528","customText.disableAction":"\u7981\u7528","customText.disabled":"\u5DF2\u7981\u7528","customText.textCol":"\u6587\u672C","customText.colorCol":"\u989C\u8272","customText.optionsCol":"\u5339\u914D\u9009\u9879","customText.enabledCol":"\u542F\u7528","customText.actionsCol":"\u64CD\u4F5C","customText.edit":"\u7F16\u8F91","customText.delete":"\u5220\u9664","customText.caseShort":"\u533A\u5206\u5927\u5C0F\u5199","customText.wholeShort":"\u5168\u5B57\u5339\u914D","customText.caseInsensitive":"\u4E0D\u533A\u5206\u5927\u5C0F\u5199","customText.wholeWordOff":"\u90E8\u5206\u5339\u914D","customText.cmdApply":"\u4E3A\u9009\u4E2D\u6587\u672C\u5E94\u7528\u989C\u8272","customText.cmdApplyDesc":"\u5728\u7F16\u8F91\u5668\u4E2D\u9009\u4E2D\u6587\u672C\u540E\u8C03\u7528\u6B64\u547D\u4EE4\uFF0C\u4E3A\u5176\u6307\u5B9A\u989C\u8272","customText.cmdRemove":"\u79FB\u9664\u9009\u4E2D\u6587\u672C\u7684\u989C\u8272","customText.cmdRemoveDesc":"\u79FB\u9664\u4E0E\u5F53\u524D\u9009\u4E2D\u6587\u672C\u5339\u914D\u7684\u81EA\u5B9A\u4E49\u989C\u8272\u89C4\u5219","customText.noticeApplied":"\u5DF2\u4E3A\u6587\u672C\u5E94\u7528\u989C\u8272","customText.noticeRemoved":"\u5DF2\u79FB\u9664\u6587\u672C\u989C\u8272\u89C4\u5219","customText.noticeNotFound":"\u672A\u627E\u5230\u5339\u914D\u7684\u989C\u8272\u89C4\u5219","customText.noticeNoSelection":"\u8BF7\u5148\u5728\u7F16\u8F91\u5668\u4E2D\u9009\u4E2D\u6587\u672C","customText.noticeNoText":"\u9009\u4E2D\u6587\u672C\u4E3A\u7A7A","customText.confirmDelete":"\u786E\u5B9A\u5220\u9664\u6B64\u989C\u8272\u89C4\u5219\uFF1F","customText.tip":"\u63D0\u793A\uFF1A\u989C\u8272\u4FE1\u606F\u4EC5\u4FDD\u5B58\u5728\u63D2\u4EF6\u672C\u5730\u6570\u636E\u4E2D\uFF0C\u4E0D\u4F1A\u5199\u5165 md \u6587\u4EF6","customText.menuApply":"\u4E3A\u9009\u4E2D\u6587\u672C\u5E94\u7528\u989C\u8272\u2026","customText.menuRemove":"\u79FB\u9664\u9009\u4E2D\u6587\u672C\u7684\u989C\u8272","customText.menuOpenPicker":"\u6253\u5F00\u9AD8\u7EA7\u989C\u8272\u9009\u62E9\u5668\u2026","customText.menuSeparator":"\u63D0\u793A\u8BCD\u7740\u8272","customText.popoverTitle":"\u5FEB\u901F\u7740\u8272","customText.popoverMore":"\u9AD8\u7EA7\u9009\u9879\u2026","customText.popoverMoreDesc":"\u6253\u5F00\u5B8C\u6574\u989C\u8272\u9009\u62E9\u5668\uFF08\u81EA\u5B9A\u4E49\u989C\u8272\u3001\u5339\u914D\u9009\u9879\uFF09","customText.popoverRemove":"\u79FB\u9664\u989C\u8272","customText.popoverRemoveDesc":"\u79FB\u9664\u4E0E\u5F53\u524D\u9009\u4E2D\u6587\u672C\u5339\u914D\u7684\u989C\u8272\u89C4\u5219","customText.popoverExisting":"\u5F53\u524D\u6587\u672C\u5DF2\u8BBE\u7F6E\u989C\u8272","customText.popoverAutoShow":"\u9009\u4E2D\u6587\u672C\u81EA\u52A8\u663E\u793A\u6D6E\u52A8\u9762\u677F","customText.popoverAutoShowDesc":"\u5728\u7F16\u8F91\u5668\u4E2D\u9009\u4E2D\u6587\u672C\u65F6\u81EA\u52A8\u5F39\u51FA\u5FEB\u901F\u7740\u8272\u9762\u677F","customText.popoverDelay":"\u6D6E\u52A8\u9762\u677F\u663E\u793A\u5EF6\u8FDF\uFF08\u6BEB\u79D2\uFF09","customText.popoverDelayDesc":"\u9009\u4E2D\u540E\u5EF6\u8FDF\u591A\u5C11\u6BEB\u79D2\u663E\u793A\u6D6E\u52A8\u9762\u677F\uFF08\u907F\u514D\u8BEF\u89E6\u53D1\uFF09","customText.noticeColorApplied":"\u5DF2\u4E3A\u6587\u672C\u5E94\u7528\u989C\u8272\uFF1A","settings.vocabTokens":"\u8BCD\u6C47\u4EE4\u724C","settings.vocabTokensDesc":"\u6309\u8BED\u4E49\u9886\u57DF\u5206\u7EC4\u7684\u8BCD\u6C47\u7740\u8272\uFF0C\u6BCF\u7EC4\u53EF\u72EC\u7ACB\u5F00\u5173\u4E0E\u914D\u8272","settings.vocabWordCount":"{count} \u4E2A\u8BCD\u6C47","settings.vocabHitCount":"\u547D\u4E2D {count} \u5904","settings.vocabPreview":"\u8BCD\u6C47\u9884\u89C8","settings.vocabSearchWords":"\u641C\u7D22\u8BCD\u6C47\u2026","settings.vocabAdd":"\u6DFB\u52A0","settings.vocabAddPlaceholder":"\u8F93\u5165\u81EA\u5B9A\u4E49\u8BCD\u6C47\uFF0C\u56DE\u8F66\u6DFB\u52A0","settings.vocabMoreWords":"\u8FD8\u6709 {count} \u4E2A\u8BCD\u6C47\u672A\u663E\u793A\uFF0C\u8BF7\u641C\u7D22\u67E5\u770B","vocabCategory.visual":"\u89C6\u89C9\u5F71\u50CF","vocabCategory.visualDesc":"\u8FD0\u955C\u3001\u5149\u5F71\u3001\u6444\u5F71\u7B49\u89C6\u89C9\u521B\u4F5C\u8BCD\u6C47","vocabCategory.performance":"\u58F0\u97F3\u4E0E\u53D9\u4E8B","vocabCategory.performanceDesc":"\u60C5\u7EEA\u8868\u6F14\u3001\u97F3\u9891\u97F3\u4E50\u3001\u53D9\u4E8B\u8425\u9500\u8BCD\u6C47","vocabCategory.output":"\u753B\u8D28\u8F93\u51FA","vocabCategory.outputDesc":"\u753B\u8D28\u8BCD\u3001\u8D28\u91CF\u6807\u7B7E\u3001\u8D1F\u9762\u6807\u7B7E","vocabCategory.tech":"\u6280\u672F\u5B9E\u73B0","vocabCategory.techDesc":"AI/\u7F16\u7A0B\u3001\u8BBE\u8BA1\u52A8\u6548\u7B49\u5DE5\u7A0B\u8BCD\u6C47","vocabCategory.domains":"\u4E13\u4E1A\u9886\u57DF","vocabCategory.domainsDesc":"\u533B\u5B66\u3001\u6CD5\u5F8B\u3001\u91D1\u878D\u7B49 17 \u4E2A\u4E13\u4E1A\u9886\u57DF","vocabToken.camera":"\u8FD0\u955C\u4E0E\u5206\u955C","vocabToken.cameraDesc":"\u63A8\u62C9\u6447\u79FB\u3001\u666F\u522B\u3001\u8FD0\u955C\u65B9\u5F0F\u3001\u8F6C\u573A\u7B49\u5206\u955C\u8BCD\u6C47","vocabToken.light":"\u5149\u5F71\u4E0E\u8272\u5F69","vocabToken.lightDesc":"\u5149\u7EBF\u6548\u679C\u3001\u8272\u5F69\u672F\u8BED","vocabToken.emotion":"\u60C5\u7EEA\u4E0E\u8868\u6F14","vocabToken.emotionDesc":"\u60C5\u7EEA\u8BCD\u3001\u8868\u60C5\u52A8\u4F5C\u3001\u914D\u97F3\u60C5\u7EEA","vocabToken.photography":"\u6444\u5F71\u4E0E\u98CE\u683C","vocabToken.photographyDesc":"\u6444\u5F71\u672F\u8BED\u3001\u6784\u56FE\u3001\u827A\u672F\u98CE\u683C","vocabToken.audio":"\u97F3\u9891\u4E0E\u97F3\u4E50","vocabToken.audioDesc":"\u97F3\u4E50\u3001\u97F3\u6548\u3001\u97F3\u9891\u7ED3\u6784","vocabToken.quality":"\u8D28\u91CF\u4E0E\u6807\u7B7E","vocabToken.qualityDesc":"\u753B\u8D28\u8BCD\u3001SD \u8D28\u91CF\u6807\u7B7E\u3001\u8D1F\u9762\u6807\u7B7E","vocabToken.tech":"AI \u4E0E\u7F16\u7A0B","vocabToken.techDesc":"AI/ML\u3001\u7F16\u7A0B\u3001\u6570\u636E\u79D1\u5B66\u672F\u8BED","vocabToken.design":"\u8BBE\u8BA1\u4E0E\u52A8\u6548","vocabToken.designDesc":"UI/UX\u3001CG\u3001VFX\u3001\u52A8\u6548\u3001\u6E38\u620F\u5F00\u53D1","vocabToken.narrative":"\u53D9\u4E8B\u4E0E\u8425\u9500","vocabToken.narrativeDesc":"\u53D9\u4E8B\u672F\u8BED\u3001\u8425\u9500\u8BCD\u6C47\u3001\u4E2D\u6587\u7BC7\u7AE0\u8BCD\u7EC4","vocabToken.domains":"\u4E13\u4E1A\u9886\u57DF","vocabToken.domainsDesc":"\u533B\u5B66\u3001\u6CD5\u5F8B\u3001\u91D1\u878D\u3001\u5EFA\u7B51\u7B49 17 \u4E2A\u4E13\u4E1A\u9886\u57DF\u8BCD\u6C47","colorMap.title":"\u989C\u8272\u5BFC\u56FE","colorMap.refresh":"\u5237\u65B0","colorMap.expandAll":"\u5C55\u5F00","colorMap.collapseAll":"\u6298\u53E0","colorMap.searchPlaceholder":"\u641C\u7D22\u7740\u8272\u5185\u5BB9\u2026","colorMap.noDocument":"\u8BF7\u6253\u5F00 Markdown \u6587\u4EF6","colorMap.noMatches":"\u672A\u68C0\u6D4B\u5230\u7740\u8272\u5185\u5BB9","colorMap.highlightDisabled":"\u7F16\u8F91\u5668\u9AD8\u4EAE\u5DF2\u7981\u7528","colorMap.noResults":"\u65E0\u5339\u914D\u7ED3\u679C","colorMap.totalMatches":"\u5171 {n} \u5904\u7740\u8272","colorMap.openPanel":"\u6253\u5F00\u989C\u8272\u5BFC\u56FE\u9762\u677F","colorMap.gradientLabel":"\u6E10\u53D8","colorMap.animationLabel":"\u52A8\u753B","colorMap.hoverLabel":"\u60AC\u505C","colorMap.glowLabel":"\u53D1\u5149","colorMap.multiColorLabel":"\u591A\u8272","colorMap.dragHint":"\u62D6\u62FD\u5339\u914D\u9879\u5230\u7F16\u8F91\u5668\u4F7F\u7528","colorMap.scopeCurrent":"\u5F53\u524D\u6587\u4EF6","colorMap.scopeGlobal":"\u5168\u5C40\u68C0\u6D4B","colorMap.scanning":"\u6B63\u5728\u626B\u63CF\u5168\u90E8\u6587\u4EF6\u2026","colorMap.searchPlaceholderCurrent":"\u641C\u7D22\u5F53\u524D\u6587\u4EF6\u7740\u8272\u2026","colorMap.searchPlaceholderGlobal":"\u641C\u7D22\u5168\u90E8\u6587\u4EF6\u7740\u8272\u2026","colorMap.fileLabel":"\u6587\u4EF6","colorMap.fileBadge":"\u6587\u4EF6\uFF1A{name}","colorMap.lock":"\u9501\u5B9A","colorMap.unlock":"\u89E3\u9501","colorMap.lockHint":"\u9501\u5B9A\u540E\u5207\u6362\u6587\u6863\u4E0D\u518D\u8DDF\u968F\uFF0C\u6301\u7EED\u626B\u63CF\u8BE5\u6587\u4EF6","colorMap.filesCount":"{n} \u4E2A\u6587\u4EF6","colorMap.truncatedTip":"\u4EC5\u663E\u793A\u524D {n} \u9879","colorMap.globalEmptyTitle":"\u672A\u53D1\u73B0\u7740\u8272\u5185\u5BB9","colorMap.globalEmptyDesc":"\u5168\u5E93\u6240\u6709 Markdown \u6587\u4EF6\u5747\u65E0\u7740\u8272\u5339\u914D","colorMap.jumpFileHint":"\u70B9\u51FB\u6253\u5F00\u6587\u4EF6\u5E76\u8DF3\u8F6C","colorMap.rulesCount":"{n} \u6761\u89C4\u5219","colorMap.lineLabel":"L","colorMap.customTag":"\u81EA\u5B9A\u4E49","colorMap.builtinTag":"\u5185\u7F6E","colorMap.emptyTitle":"\u6682\u65E0\u7740\u8272\u89C4\u5219","colorMap.emptyDesc":"\u9009\u4E2D\u6587\u672C\u5373\u53EF\u521B\u5EFA\u7740\u8272\u89C4\u5219","colorMap.noDocTitle":"\u672A\u6253\u5F00\u6587\u6863","colorMap.noDocDesc":"\u6253\u5F00 Markdown \u6587\u4EF6\u67E5\u770B\u5339\u914D","colorMap.noMatchTitle":"\u65E0\u5339\u914D","colorMap.noMatchDesc":"\u5F53\u524D\u6587\u6863\u672A\u547D\u4E2D\u6B64\u89C4\u5219","colorMap.collapse":"\u6536\u8D77","colorMap.expand":"\u5C55\u5F00","guide.quickStart":"\u5FEB\u901F\u4E0A\u624B","guide.step1Title":"\u2460 \u7F16\u8F91\u5668\u81EA\u52A8\u7740\u8272","guide.step1Desc":"\u6253\u5F00\u4EFB\u610F Markdown \u6587\u4EF6\uFF0C\u63D0\u793A\u8BCD\u4E2D\u7684\u89D2\u8272\u6807\u7B7E\u3001\u53C2\u6570\u3001\u53D8\u91CF\u7B49\u4F1A\u81EA\u52A8\u7740\u8272\uFF0C\u65E0\u9700\u624B\u52A8\u64CD\u4F5C","guide.step2Title":"\u2461 \u9009\u4E2D\u6587\u672C\u5FEB\u901F\u7740\u8272","guide.step2Desc":"\u5728\u7F16\u8F91\u5668\u4E2D\u9009\u4E2D\u6587\u672C\uFF0C\u81EA\u52A8\u5F39\u51FA\u9009\u8272\u9762\u677F\uFF1B\u6216\u53F3\u952E\u83DC\u5355 \u2192 \u63D0\u793A\u8BCD\u7740\u8272 \u2192 \u4E3A\u9009\u4E2D\u6587\u672C\u5E94\u7528\u989C\u8272","guide.step3Title":"\u2462 \u989C\u8272\u5BFC\u56FE\u8DF3\u8F6C","guide.step3Desc":"\u70B9\u51FB\u5DE6\u4FA7\u680F\u5730\u56FE\u56FE\u6807\uFF0C\u6309\u989C\u8272\u5206\u7EC4\u6D4F\u89C8\u5168\u6587\u7740\u8272\u7247\u6BB5\uFF0C\u70B9\u51FB\u8DF3\u8F6C\u5230\u5BF9\u5E94\u4F4D\u7F6E","guide.commands":"\u547D\u4EE4\u6E05\u5355","guide.commandsDesc":"\u5728\u547D\u4EE4\u9762\u677F\uFF08Ctrl/Cmd + P\uFF09\u641C\u7D22\u4EE5\u4E0B\u547D\u4EE4\u4F7F\u7528","guide.openColorMap":"\u6253\u5F00\u989C\u8272\u5BFC\u56FE","guide.tip":"\u63D0\u793A\uFF1A\u5728\u7F16\u8F91\u5668\u4E2D\u9009\u4E2D\u4E00\u6BB5\u6587\u672C\u8BD5\u8BD5\uFF0C\u4F1A\u81EA\u52A8\u5F39\u51FA\u9009\u8272\u9762\u677F","tab.overviewTip":"\u63D2\u4EF6\u72B6\u6001\u603B\u89C8\u3001\u5B9E\u65F6\u9884\u89C8\u4E0E\u5168\u5C40\u8BBE\u7F6E","tab.rulesTip":"\u7740\u8272\u89C4\u5219\u5F00\u5173\uFF1A\u57FA\u7840\u7B26\u53F7\u3001\u89C6\u9891/\u5206\u955C\u3001SD \u6269\u5C55","tab.colorsTip":"\u8BCD\u6C47\u4EE4\u724C\u7BA1\u7406\u3001\u57FA\u7840\u8272\u677F\u3001\u81EA\u5B9A\u4E49\u6587\u672C\u989C\u8272","tab.engineTip":"\u89C4\u5219\u6E90\u914D\u7F6E\u3001Git \u62C9\u53D6\u3001\u89C4\u5219\u66F4\u65B0","tab.filesTip":"\u6587\u4EF6\u7C7B\u578B\u68C0\u6D4B\u3001\u663E\u793A\u9009\u9879"};function h(a){var i;return(i=Bo[a])!=null?i:a}var ie=class extends _t.Modal{constructor(i,t,e,o,s,r,n){super(i),this.titleText=t,this.namePlaceholder=e,this.descPlaceholder=o,this.initialName=s,this.initialDesc=r,this.onSubmit=n}onOpen(){let{contentEl:i,titleEl:t}=this;t.setText(this.titleText);let e=i.createDiv({cls:"pc-agent-form"}),o=e.createEl("input",{type:"text",cls:"pc-agent-input",attr:{placeholder:this.namePlaceholder,value:this.initialName}}),s=e.createEl("input",{type:"text",cls:"pc-agent-input",attr:{placeholder:this.descPlaceholder,value:this.initialDesc}}),r=e.createDiv({cls:"pc-agent-form-actions"}),n=r.createEl("button",{text:h("confirm.cancel"),cls:"pc-agent-form-cancel"}),l=r.createEl("button",{text:h("confirm.ok"),cls:"pc-agent-form-confirm mod-cta"}),c=()=>{let p=o.value.trim();p&&(this.onSubmit(p,s.value.trim()),this.close())};l.addEventListener("click",c),n.addEventListener("click",()=>this.close()),o.addEventListener("keydown",p=>{p.key==="Enter"&&c()}),setTimeout(()=>o.focus(),50)}onClose(){this.contentEl.empty()}};var Go=new Set(["ruleSource","gitRawBaseUrl","gitBranch","autoUpdateRules","autoUpdateInterval","lastCheckTime","ruleSources","activeRuleSourceId","gitTokenEnabled","gitToken","gitReportEnabled","downloadToCache","lastPullReport","enabledRuleIds"]);function Pt(a,i){let t={};for(let e of Object.keys(a))Go.has(e)||(t[e]=a[e]);return{version:i,exportedAt:new Date().toISOString(),plugin:"prompt-colorizer",settings:t}}function Ho(a,i){let t={...a};for(let[e,o]of Object.entries(i)){if(o===void 0)continue;let s=t[e];if(Array.isArray(o)&&Array.isArray(s))if(o.length>0&&typeof o[0].id!="undefined"){let r=new Map;for(let n of s)r.set(n.id,n);for(let n of o)r.set(n.id,n);t[e]=[...r.values()]}else t[e]=o;else typeof o=="object"&&o!==null&&!Array.isArray(o)&&typeof s=="object"&&s!==null?t[e]={...s,...o}:t[e]=o}return t}function Dt(a,i){let t={...a};for(let e of i)t=Ho(t,e);return t}function Rt(a){let i=JSON.parse(a);if(i&&typeof i=="object"&&"settings"in i&&i.settings)return i.settings;if(i&&typeof i=="object")return i;throw new Error("Invalid config format")}function Lt(a,i){let t=i||`prompt-colorizer-config-${new Date().toISOString().slice(0,10)}.json`,e=JSON.stringify(a,null,2),o=new Blob([e],{type:"application/json"}),s=URL.createObjectURL(o),r=document.createElement("a");r.href=s,r.download=t,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(s)}var H=require("obsidian");var me="prompt-colorizer-color-map",Mt=80,Ze=50,No=20,De=class extends H.ItemView{constructor(t,e){super(t);this.colorListEl=null;this.detailEl=null;this.searchInputEl=null;this.scanScope="current";this.searchQuery="";this.selectedCssClass=null;this.cachedGroups=[];this.refreshTimer=null;this.isScanning=!1;this.scanGen=0;this.scannedFileCount=0;this.targetFile=null;this.isLocked=!1;this.lockBtnEl=null;this.plugin=e}getViewType(){return me}getDisplayText(){return h("colorMap.title")}getIcon(){return"palette"}async onOpen(){this.render(),this.registerEvent(this.app.workspace.on("active-leaf-change",t=>{if(this.scanScope!=="current"||this.isLocked)return;let e=t==null?void 0:t.view;e instanceof H.MarkdownView&&e.file&&(this.targetFile=e.file,this.scheduleRefresh())})),this.registerEvent(this.app.workspace.on("prompt-colorizer:custom-colors-changed",()=>this.scheduleRefresh()))}async onClose(){this.refreshTimer!==null&&(window.clearTimeout(this.refreshTimer),this.refreshTimer=null)}scheduleRefresh(){this.refreshTimer!==null&&window.clearTimeout(this.refreshTimer),this.refreshTimer=window.setTimeout(()=>{this.refreshTimer=null,this.refreshAll()},200)}analyzeDslEffect(t){let e=this.plugin.getStyleRuleByCssClass(t),o={tags:[],gradientCss:null};if(!e)return o;if(e.backgroundImage&&/gradient\(/.test(e.backgroundImage)){o.gradientCss=e.backgroundImage;let s=(e.backgroundImage.match(/\d+%/g)||[]).length>=3;o.tags.push(s?h("colorMap.multiColorLabel"):h("colorMap.gradientLabel"))}return(e.textShadow||e.boxShadow)&&o.tags.push(h("colorMap.glowLabel")),e.animation&&o.tags.push(h("colorMap.animationLabel")),e.hover&&o.tags.push(h("colorMap.hoverLabel")),(e.textStroke||e.textFillColor)&&o.tags.push(h("customText.effectName_outline")),e.textDecoration&&o.tags.push(h("customText.effectName_"+this.textDecorationToEffect(e.textDecoration))),(e.fontWeight==="bold"||e.fontWeight==="700"||e.fontWeight==="800")&&o.tags.push(h("customText.effectName_bold")),e.fontStyle==="italic"&&o.tags.push(h("customText.effectName_italic")),e.fontFamily&&/mono/i.test(e.fontFamily)&&o.tags.push(h("customText.effectName_mono")),o}textDecorationToEffect(t){return t.includes("line-through")?"strikethrough":t.includes("wavy")?"wavy":t.includes("dashed")||t.includes("dotted")?"dashed":(t.includes("underline"),"underline")}paintColorDot(t,e){let o=this.plugin.getCustomTextColorByCssClass(e);if(o){let n=q(o.gradientStops),l=K(n);l?t.style.background=`linear-gradient(135deg, ${l})`:o.color2&&o.color2!==o.color?t.style.background=`linear-gradient(135deg, ${o.color}, ${o.color2})`:t.style.background=o.color;return}let s=this.analyzeDslEffect(e);if(s.gradientCss){t.style.background=s.gradientCss;return}let r=this.plugin.getColorByCssClass(e);r?t.style.background=r:t.addClass("is-empty")}getDisplayLabel(t){let e=this.plugin.getCustomTextColorByCssClass(t);if(e&&e.text){let o=e.text;return o.length>24?o.slice(0,24)+"\u2026":o}return t}renderEffectTags(t,e){let o=this.plugin.getCustomTextColorByCssClass(e),s=[];if(o?s=X(o).map(n=>h(`customText.effectName_${n}`)):s=this.analyzeDslEffect(e).tags,s.length===0)return;let r=t.createDiv({cls:"pc-cm-effect-tags"});for(let n of s)r.createSpan({cls:"pc-cm-effect-tag",text:n})}render(){let t=this.contentEl;t.empty(),t.addClass("pc-color-map-panel"),this.renderToolbar(t),this.renderSearchBox(t);let e=t.createDiv({cls:"pc-cm-split"});this.colorListEl=e.createDiv({cls:"pc-cm-color-list"}),this.detailEl=e.createDiv({cls:"pc-cm-detail"}),this.refreshAll()}renderToolbar(t){let e=t.createDiv({cls:"pc-cm-toolbar"}),o=e.createEl("button",{cls:"pc-cm-btn"});o.setAttribute("aria-label",h("colorMap.lockHint")),o.addEventListener("click",()=>{this.scanScope==="current"&&(!this.isLocked&&!this.targetFile||(this.isLocked=!this.isLocked,this.syncLockBtn()))}),this.lockBtnEl=o,this.syncLockBtn();let s=e.createEl("button",{cls:"pc-cm-btn"});s.setAttribute("aria-label",h("colorMap.refresh")),(0,H.setIcon)(s,"refresh-cw"),s.addEventListener("click",()=>void this.refreshAll())}syncLockBtn(){this.lockBtnEl&&((0,H.setIcon)(this.lockBtnEl,this.isLocked?"lock":"lock-open"),this.lockBtnEl.toggleClass("is-active",this.isLocked),this.lockBtnEl.setAttribute("aria-label",this.isLocked?h("colorMap.unlock"):h("colorMap.lockHint")))}renderSearchBox(t){let e=t.createDiv({cls:"pc-cm-search"}),o=e.createDiv({cls:"pc-cm-mode-toggle"}),s=o.createEl("button",{cls:"pc-cm-mode-btn"});s.setText(h("colorMap.scopeCurrent"));let r=o.createEl("button",{cls:"pc-cm-mode-btn"});r.setText(h("colorMap.scopeGlobal"));let n=()=>{s.classList.toggle("is-active",this.scanScope==="current"),r.classList.toggle("is-active",this.scanScope==="global"),this.searchInputEl&&this.searchInputEl.setAttribute("placeholder",this.scanScope==="global"?h("colorMap.searchPlaceholderGlobal"):h("colorMap.searchPlaceholderCurrent"))};n(),s.addEventListener("click",()=>{this.scanScope!=="current"&&(this.scanScope="current",n(),this.refreshAll())}),r.addEventListener("click",()=>{this.scanScope!=="global"&&(this.scanScope="global",this.isLocked=!1,this.syncLockBtn(),n(),this.refreshAll())});let l=e.createDiv({cls:"pc-cm-search-wrap"}),c=l.createDiv({cls:"pc-cm-search-icon"});(0,H.setIcon)(c,"search");let p=l.createEl("input",{cls:"pc-cm-search-input",attr:{type:"text"}});this.searchInputEl=p,p.value=this.searchQuery,p.addEventListener("input",()=>{this.searchQuery=p.value,this.refreshColorList(),this.refreshDetail()})}async collectCurrentGroups(){var n;let t=(n=this.plugin.settings.customTextColors)!=null?n:[],e=this.resolveTargetFile();if(!e)return this.targetFile=null,this.buildGroups(t,new Map);this.targetFile=e;let o=await this.readTargetText(e),s=o?this.plugin.getAllMatches(o):[],r=this.groupMatches(s,l=>({file:e,text:o,match:l}));return this.buildGroups(t,r)}resolveTargetFile(){if(this.isLocked&&this.targetFile)return this.targetFile;let t=this.app.workspace.getActiveViewOfType(H.MarkdownView);if(t!=null&&t.file)return t.file;if(this.targetFile){let e=this.app.vault.getAbstractFileByPath(this.targetFile.path);if(e instanceof H.TFile&&e.extension==="md")return e}for(let e of this.app.workspace.getLeavesOfType("markdown")){let o=e.view;if(o instanceof H.MarkdownView&&o.file)return o.file}return null}async readTargetText(t){var e;for(let o of this.app.workspace.getLeavesOfType("markdown")){let s=o.view;if(s instanceof H.MarkdownView&&((e=s.file)==null?void 0:e.path)===t.path)try{return s.editor.getValue()}catch(r){break}}try{return await this.app.vault.cachedRead(t)}catch(o){return""}}async collectGlobalGroups(){var r;let t=(r=this.plugin.settings.customTextColors)!=null?r:[],e=this.app.vault.getMarkdownFiles(),o=new Map,s=new Set;for(let n=0;n<e.length;n++){let l=e[n];try{let c=await this.app.vault.cachedRead(l);for(let p of this.plugin.getAllMatches(c)){let d=o.get(p.cssClass);d||(d=[],o.set(p.cssClass,d)),d.push({file:l,text:c,match:p}),s.add(l.path)}}catch(c){}(n+1)%No===0&&await new Promise(c=>setTimeout(c,0))}return this.scannedFileCount=s.size,this.buildGroups(t,o)}groupMatches(t,e){let o=new Map;for(let s of t){let r=o.get(s.cssClass);r||(r=[],o.set(s.cssClass,r)),r.push(e(s))}return o}buildGroups(t,e){var s;let o=[];for(let r of t){if(!r.enabled)continue;let n=`dsl-custom-text-${r.id}`;o.push({cssClass:n,items:(s=e.get(n))!=null?s:[],isCustom:!0})}for(let[r,n]of e.entries())r.startsWith("dsl-custom-text-")||o.push({cssClass:r,items:n,isCustom:!1});return o.sort((r,n)=>n.items.length-r.items.length)}getFilteredGroups(){let t=this.searchQuery.trim().toLowerCase();return t?this.cachedGroups.filter(({items:e})=>e.some(o=>o.text.slice(o.match.from,o.match.to).toLowerCase().includes(t))):this.cachedGroups}async refreshAll(){if(!this.plugin.settings.editorHighlightEnabled){this.renderRichEmpty(this.colorListEl,"alert-circle",h("colorMap.highlightDisabled"),""),this.renderRichEmpty(this.detailEl,"","",""),this.cachedGroups=[],this.scannedFileCount=0;return}if(this.scanScope==="global"){let t=++this.scanGen;this.isScanning=!0,this.renderScanningState();try{let e=await this.collectGlobalGroups();if(t!==this.scanGen)return;this.cachedGroups=e}catch(e){if(t!==this.scanGen)return;this.cachedGroups=[]}finally{t===this.scanGen&&(this.isScanning=!1)}}else{let t=++this.scanGen;try{let e=await this.collectCurrentGroups();if(t!==this.scanGen)return;this.cachedGroups=e}catch(e){if(t!==this.scanGen)return;this.cachedGroups=[]}this.scannedFileCount=0}if(this.cachedGroups.length===0){this.scanScope==="global"?this.renderRichEmpty(this.colorListEl,"palette",h("colorMap.globalEmptyTitle"),h("colorMap.globalEmptyDesc")):this.targetFile?this.renderRichEmpty(this.colorListEl,"palette",h("colorMap.emptyTitle"),h("colorMap.emptyDesc")):this.renderRichEmpty(this.colorListEl,"file-text",h("colorMap.noDocTitle"),h("colorMap.noDocDesc")),this.renderRichEmpty(this.detailEl,"","","");return}this.selectedCssClass&&!this.cachedGroups.some(t=>t.cssClass===this.selectedCssClass)&&(this.selectedCssClass=null),this.selectedCssClass||(this.selectedCssClass=this.cachedGroups[0].cssClass),this.refreshColorList(),this.refreshDetail()}renderScanningState(){this.renderRichEmpty(this.colorListEl,"loader",h("colorMap.scanning"),"",!0),this.renderRichEmpty(this.detailEl,"","","")}refreshColorList(){if(!this.colorListEl)return;let t=this.colorListEl;t.empty();let e=this.getFilteredGroups(),o=this.cachedGroups.reduce((n,l)=>n+l.items.length,0),s=this.cachedGroups.length,r=t.createDiv({cls:"pc-cm-status"});if(this.scanScope==="current"&&this.targetFile){let n=r.createSpan({cls:"pc-cm-status-file"});(0,H.setIcon)(n,"file-text");let l=this.targetFile.basename,c=l.length>14?l.slice(0,14)+"\u2026":l;n.createSpan({text:c}),n.setAttribute("title",this.targetFile.path),r.createSpan({cls:"pc-cm-status-sep",text:"\xB7"})}if(r.createSpan({cls:"pc-cm-status-rules",text:h("colorMap.rulesCount").replace("{n}",String(s))}),r.createSpan({cls:"pc-cm-status-sep",text:"\xB7"}),r.createSpan({cls:"pc-cm-status-matches",text:h("colorMap.totalMatches").replace("{n}",String(o))}),this.scanScope==="global"&&this.scannedFileCount>0&&(r.createSpan({cls:"pc-cm-status-sep",text:"\xB7"}),r.createSpan({cls:"pc-cm-status-files",text:h("colorMap.filesCount").replace("{n}",String(this.scannedFileCount))})),e.length===0){this.renderRichEmpty(t,"search",h("colorMap.noResults"),"");return}for(let n of e)this.renderColorItem(t,n.cssClass,n.items.length,n.isCustom)}renderColorItem(t,e,o,s){let r=e===this.selectedCssClass,n=o>0,l=t.createDiv({cls:"pc-cm-color-item"});r&&l.addClass("is-selected"),n||l.addClass("is-dim"),l.createDiv({cls:"pc-cm-color-bar"});let c=l.createDiv({cls:"pc-cm-color-dot"});this.paintColorDot(c,e);let p=l.createDiv({cls:"pc-cm-color-name-col"}),d=p.createDiv({cls:"pc-cm-color-name-row"});d.createDiv({cls:"pc-cm-color-name"}).setText(this.getDisplayLabel(e)),d.createSpan({cls:"pc-cm-type-tag"}).setText(s?h("colorMap.customTag"):h("colorMap.builtinTag")),this.renderEffectTags(p,e);let g=l.createDiv({cls:"pc-cm-count"});g.setText(String(o)),n&&g.addClass("has-match"),l.addEventListener("click",()=>{this.selectedCssClass=e,this.refreshColorList(),this.refreshDetail()})}refreshDetail(){var v;if(!this.detailEl)return;let t=this.detailEl;if(t.empty(),!this.selectedCssClass){this.renderRichEmpty(t,"","","");return}let e=this.cachedGroups.find(y=>y.cssClass===this.selectedCssClass);if(!e){this.renderRichEmpty(t,"","","");return}if(this.scanScope==="current"&&!this.resolveTargetFile()){this.renderRichEmpty(t,"file-text",h("colorMap.noDocTitle"),h("colorMap.noDocDesc"));return}let o=t.createDiv({cls:"pc-cm-detail-header"}),s=o.createDiv({cls:"pc-cm-color-dot"});this.paintColorDot(s,e.cssClass);let r=o.createDiv({cls:"pc-cm-color-name-col"}),n=r.createDiv({cls:"pc-cm-color-name-row"});n.createDiv({cls:"pc-cm-detail-title"}).setText(this.getDisplayLabel(e.cssClass)),n.createSpan({cls:"pc-cm-type-tag"}).setText(e.isCustom?h("colorMap.customTag"):h("colorMap.builtinTag")),this.renderEffectTags(r,e.cssClass);let c=o.createDiv({cls:"pc-cm-count"});c.setText(String(e.items.length)),e.items.length>0&&c.addClass("has-match");let p=this.plugin.getCustomTextColorByCssClass(e.cssClass);if(p){let y=q(p.gradientStops),x=K(y);if(x){let S=t.createDiv({cls:"pc-cm-gradient-band-wrap"}),R=S.createDiv({cls:"pc-cm-gradient-band"}),w=(v=p.gradientAngle)!=null?v:135;R.style.background=`linear-gradient(${w}deg, ${x})`,S.createSpan({cls:"pc-cm-gradient-meta"}).setText(`${y.length} ${h("customText.gradientStopCount")} \xB7 ${w}\xB0`)}}else{let y=this.analyzeDslEffect(e.cssClass);if(y.gradientCss){let x=t.createDiv({cls:"pc-cm-gradient-band-wrap"});x.createDiv({cls:"pc-cm-gradient-band"}).style.background=y.gradientCss,x.createSpan({cls:"pc-cm-gradient-meta"}).setText(h("colorMap.gradientLabel"))}}let d=this.searchQuery.trim().toLowerCase(),u=d?e.items.filter(y=>y.text.slice(y.match.from,y.match.to).toLowerCase().includes(d)):e.items,g=t.createDiv({cls:"pc-cm-detail-list"});if(u.length===0){this.renderRichEmpty(g,"circle-slash",h("colorMap.noMatchTitle"),h("colorMap.noMatchDesc"));return}let m=u.slice(0,Ze);for(let y=0;y<m.length;y++)this.renderMatchItem(g,m[y],y+1);u.length>Ze&&g.createDiv({cls:"pc-cm-truncated-tip"}).setText(h("colorMap.truncatedTip").replace("{n}",String(Ze)));let b=t.createDiv({cls:"pc-cm-drag-hint"}),f=b.createDiv({cls:"pc-cm-drag-hint-icon"});(0,H.setIcon)(f,"grab-horizontal"),b.createSpan({text:h("colorMap.dragHint")})}renderMatchItem(t,e,o){let s=e.text.slice(e.match.from,e.match.to),r=s.length>Mt?s.slice(0,Mt)+"\u2026":s,n=this.scanScope==="global"&&!!e.file,l=t.createDiv({cls:"pc-cm-item"});n&&l.addClass("has-file"),l.createSpan({cls:"pc-cm-item-idx"}).setText(String(o));let d=l.createDiv({cls:"pc-cm-item-text"}).createSpan({cls:e.match.cssClass});if(d.setText(r),d.setAttribute("title",s),n&&e.file){let m=l.createSpan({cls:"pc-cm-item-file"});m.setText(e.file.basename),m.setAttribute("title",e.file.path),l.setAttribute("title",h("colorMap.jumpFileHint"))}let u=this.lineOf(e.text,e.match.from);l.createSpan({cls:"pc-cm-item-line"}).setText(`${h("colorMap.lineLabel")}${u}`),l.draggable=!0,l.addEventListener("dragstart",m=>{var b,f;(b=m.dataTransfer)==null||b.setData("text/plain",s),(f=m.dataTransfer)==null||f.setDragImage(l,0,0),l.addClass("is-dragging")}),l.addEventListener("dragend",()=>l.removeClass("is-dragging")),l.addEventListener("click",()=>void this.jumpToMatch(e))}lineOf(t,e){let o=Math.min(e,t.length),s=1;for(let r=0;r<o;r++)t.charCodeAt(r)===10&&s++;return s}async jumpToMatch(t){var c;let e=this.scanScope==="current"?this.resolveTargetFile():t.file;if(!e)return;let o=this.app.workspace.getActiveViewOfType(H.MarkdownView);if(!o||((c=o.file)==null?void 0:c.path)!==e.path){let p=this.app.workspace.getLeaf(!1);try{await p.openFile(e)}catch(d){return}await new Promise(d=>setTimeout(d,30))}let s=this.app.workspace.getActiveViewOfType(H.MarkdownView);if(!s)return;let r=s.editor,n=r.offsetToPos(t.match.from),l=r.offsetToPos(t.match.to);r.setSelection(n,l),r.scrollIntoView({from:n,to:l},!0),s.editor.focus()}renderRichEmpty(t,e,o,s,r=!1){if(!t||(t.empty(),!o&&!s))return;let n=t.createDiv({cls:"pc-cm-rich-empty"});if(e){let l=n.createDiv({cls:"pc-cm-rich-empty-icon"});r&&l.addClass("is-spin"),(0,H.setIcon)(l,e)}o&&n.createDiv({cls:"pc-cm-rich-empty-title"}).setText(o),s&&n.createDiv({cls:"pc-cm-rich-empty-desc"}).setText(s)}refresh(){this.refreshAll()}};async function fe(a){let{workspace:i}=a,t=i.getLeavesOfType(me)[0];if(!t){let e=i.getRightLeaf(!1);if(!e)return;t=e,await t.setViewState({type:me,active:!0})}i.revealLeaf(t)}var Oo=12,j=["highlightVariables","highlightRoleTags","highlightRoleHeaders","highlightInstructionMarkers","highlightComments","highlightCodeBlocks","highlightJsonBlocks","highlightInlineCode","highlightSectionMarkers","highlightShotHeaders","highlightAssetRefs","highlightFieldLabels","highlightDialogue","highlightAudioRefs","highlightNegativePrompts","highlightTechParams","highlightParentheticals","highlightEmphasisWeights","highlightLoraRefs","highlightBracketEmphasis","highlightSdNegativeHeader"],Wo=["highlightVariables","highlightRoleTags","highlightRoleHeaders","highlightInstructionMarkers","highlightComments","highlightCodeBlocks","highlightJsonBlocks","highlightInlineCode"],$o=["highlightSectionMarkers","highlightShotHeaders","highlightAssetRefs","highlightFieldLabels","highlightDialogue","highlightAudioRefs","highlightNegativePrompts","highlightTechParams","highlightParentheticals"],zo=["highlightEmphasisWeights","highlightLoraRefs","highlightBracketEmphasis","highlightSdNegativeHeader"],At={highlightVariables:"dsl-variable",highlightRoleTags:"dsl-role-tag",highlightInstructionMarkers:"dsl-instruction",highlightSectionMarkers:"dsl-block-wrapper",highlightShotHeaders:"dsl-shot-header",highlightAssetRefs:"dsl-asset",highlightFieldLabels:"dsl-param-key",highlightDialogue:"dsl-dialogue",highlightAudioRefs:"dsl-audio-ref",highlightNegativePrompts:"dsl-constraint",highlightTechParams:"dsl-tech-param",highlightParentheticals:"dsl-parenthetical",highlightEmphasisWeights:"dsl-emphasis-weight",highlightLoraRefs:"dsl-lora-ref",highlightBracketEmphasis:"dsl-bracket-strong",highlightQualityTags:"dsl-quality-tag",highlightSdNegativeHeader:"dsl-sd-negative-header",highlightCameraMoves:"dsl-camera-word",highlightSceneTransitions:"dsl-scene-transition"};function Vo(a){let i=a.trim();if(!i)return null;if(/raw\.githubusercontent\.com/.test(i)){let o=i.match(/^https?:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)$/);return o?{rawBaseUrl:i.replace(/\/$/,""),branch:o[3]}:null}let t=i.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)(?:\/(tree|blob)\/([^/]+)(\/(.*))?)?/);if(t){let o=t[1],s=t[2].replace(/\.git$/,""),r=t[4]||"main",l=t[6]||"";return l&&l.startsWith("rules")||(l="rules"),{rawBaseUrl:`https://raw.githubusercontent.com/${o}/${s}/${r}/${l}`,branch:r}}let e=i.match(/^([^/\s]+)\/([^/\s]+)$/);if(e){let o=e[1],s=e[2].replace(/\.git$/,"");return{rawBaseUrl:`https://raw.githubusercontent.com/${o}/${s}/main/rules`,branch:"main"}}return null}var jo={overview:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>',rules:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',engine:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',files:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',colors:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>'},qo=[{id:"overview",labelKey:"tab.overview",icon:"overview"},{id:"rules",labelKey:"tab.rules",icon:"rules"},{id:"colors",labelKey:"tab.colors",icon:"colors"},{id:"engine",labelKey:"tab.engine",icon:"engine"},{id:"files",labelKey:"tab.files",icon:"files"}],ne=class ne extends C.PluginSettingTab{constructor(t,e){super(t,e);this.currentTab="overview";this.rulesSearchQuery="";this.previewText="";this.tabScrollPositions={};this.tokenGroupOpenStates=new Map;this.selectedCustomTextId=null;this.plugin=e}registerColorsChangedListener(){if(this.colorsChangedRef)return;let t=()=>{this.containerEl.children.length>0&&this.display()};this.colorsChangedRef=t,this.plugin.registerEvent(this.app.workspace.on("prompt-colorizer:custom-colors-changed",t))}display(){let{containerEl:t}=this;this.registerColorsChangedListener();let e=t.querySelector(".pc-tab-content");e&&(this.tabScrollPositions[this.currentTab]=e.scrollTop),t.empty(),t.addClass("prompt-colorizer-setting-tab");let o=this.plugin.t.bind(this.plugin),s=t.createDiv({cls:"pc-layout"});this.renderTabNav(s,o);let r=s.createDiv({cls:"pc-tab-content"});switch(this.currentTab){case"overview":this.renderOverviewTab(r,o);break;case"rules":this.renderRulesTab(r,o);break;case"colors":this.renderColorsTab(r,o);break;case"engine":this.renderEngineTab(r,o);break;case"files":this.renderFilesTab(r,o);break}let n=this.tabScrollPositions[this.currentTab];n!==void 0&&requestAnimationFrame(()=>{r.scrollTop=n})}renderTabNav(t,e){let o=t.createDiv({cls:"pc-tab-nav"});for(let s of qo){let r=this.currentTab===s.id,n=`tab.${s.id}Tip`,l=o.createDiv({cls:`pc-tab-item ${r?"active":""}`,attr:{"data-tab":s.id,role:"tab",tabindex:"0","aria-selected":String(r),title:e(n)}}),c=l.createSpan({cls:"pc-tab-icon"});c.innerHTML=jo[s.icon]||"",l.createSpan({cls:"pc-tab-label",text:e(s.labelKey)});let p=()=>{this.currentTab!==s.id&&(this.currentTab=s.id,this.display())};l.addEventListener("click",p),l.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),p())})}}renderOverviewTab(t,e){this.renderStatusBar(t,e),this.renderPreviewCard(t,e),this.renderPromptPackBar(t,e),this.renderQuickStartCard(t,e),this.renderCommandListCard(t,e),$(t,e("settings.global"),e("settings.globalDesc"),"global",o=>{var n,l;new C.Setting(o).setName(e("settings.editorHighlight")).setDesc(e("settings.editorHighlightDesc")).addToggle(c=>c.setValue(this.plugin.settings.editorHighlightEnabled).onChange(async p=>{this.plugin.settings.editorHighlightEnabled=p,await this.plugin.saveSettings(),this.plugin.refreshEditorExtensions(),this.updateStatusBar()})),new C.Setting(o).setName(e("settings.readerMode")).setDesc(e("settings.readerModeDesc")).addToggle(c=>c.setValue(this.plugin.settings.readerModeEnabled).onChange(async p=>{this.plugin.settings.readerModeEnabled=p,await this.plugin.saveSettings(),this.updateStatusBar()})),new C.Setting(o).setName(e("settings.colorMode")).setDesc(e("settings.colorModeDesc")).addDropdown(c=>c.addOption("auto",e("settings.colorModeAuto")).addOption("light",e("settings.colorModeLight")).addOption("dark",e("settings.colorModeDark")).setValue(this.plugin.settings.colorMode).onChange(async p=>{this.plugin.settings.colorMode=p,await this.plugin.saveSettings(),this.plugin.applyColorMode()})),new C.Setting(o).setName(e("settings.colorScheme")).setDesc(e("settings.colorSchemeDesc")).addDropdown(c=>{var p;return c.addOption("default",e("settings.schemeDefault")).addOption("soft",e("settings.schemeSoft")).addOption("mono",e("settings.schemeMono")).addOption("vivid",e("settings.schemeVivid")).addOption("contrast",e("settings.schemeContrast")).setValue((p=this.plugin.settings.colorScheme)!=null?p:"default").onChange(async d=>{this.plugin.settings.colorScheme=d,await this.plugin.saveSettings(),this.plugin.applyColorMode()})});let s=(l=(n=this.plugin.currentRuleSet)==null?void 0:n.palettes)!=null?l:{},r=new C.Setting(o).setName(e("settings.palettePreset")).setDesc(e("settings.palettePresetDesc")).addDropdown(c=>{var p,d,u;c.addOption("",e("settings.paletteDefault"));for(let[g,m]of Object.entries(s)){let b=typeof m.name=="string"?m.name:(d=(p=m.name)==null?void 0:p.zh)!=null?d:g;c.addOption(g,`${b} (${g})`)}c.setValue((u=this.plugin.settings.palettePreset)!=null?u:"").onChange(async g=>{this.plugin.settings.palettePreset=g,await this.plugin.saveSettings(),this.plugin.applyColorMode(),this.display()})});new C.Setting(o).setName(e("settings.colorBlindAssist")).setDesc(e("settings.colorBlindAssistDesc")).addToggle(c=>c.setValue(!!this.plugin.settings.colorBlindAssist).onChange(async p=>{this.plugin.settings.colorBlindAssist=p,await this.plugin.saveSettings(),this.plugin.applyColorMode()})),this.renderDeriveAlphaSettings(o,e),this.renderFolderPalettes(o,e,s)})}renderQuickStartCard(t,e){$(t,e("guide.quickStart"),"","global",o=>{let s=[{title:e("guide.step1Title"),desc:e("guide.step1Desc")},{title:e("guide.step2Title"),desc:e("guide.step2Desc")},{title:e("guide.step3Title"),desc:e("guide.step3Desc")}];for(let n of s){let l=o.createDiv({cls:"pc-guide-step"});l.createDiv({cls:"pc-guide-step-title",text:n.title}),l.createDiv({cls:"pc-guide-step-desc",text:n.desc})}o.createDiv({cls:"pc-guide-actions"}).createEl("button",{cls:"pc-guide-btn",text:e("guide.openColorMap")}).addEventListener("click",()=>{fe(this.plugin.app)}),o.createDiv({cls:"pc-guide-tip",text:e("guide.tip")})})}renderCommandListCard(t,e){let o=[{name:"\u5237\u65B0\u7740\u8272",desc:"\u91CD\u65B0\u626B\u63CF\u5F53\u524D\u6587\u6863\u5E76\u5E94\u7528\u7740\u8272"},{name:"\u5207\u6362\u7F16\u8F91\u5668\u9AD8\u4EAE",desc:"\u5F00/\u5173\u7F16\u8F91\u5668\u5B9E\u65F6\u7740\u8272"},{name:"\u4E3A\u9009\u4E2D\u6587\u672C\u5E94\u7528\u989C\u8272",desc:"\u5F39\u51FA\u9009\u8272\u9762\u677F\u4E3A\u9009\u4E2D\u6587\u672C\u7740\u8272"},{name:"\u79FB\u9664\u9009\u4E2D\u6587\u672C\u7684\u989C\u8272",desc:"\u6E05\u9664\u9009\u4E2D\u6587\u672C\u7684\u81EA\u5B9A\u4E49\u989C\u8272"},{name:"\u6253\u5F00\u989C\u8272\u5BFC\u56FE\u9762\u677F",desc:"\u6253\u5F00\u4FA7\u8FB9\u680F\u989C\u8272\u5BFC\u56FE"},{name:"\u68C0\u67E5\u89C4\u5219\u66F4\u65B0",desc:"\u4ECE\u8FDC\u7A0B Git \u62C9\u53D6\u6700\u65B0\u89C4\u5219"},{name:"\u91CD\u65B0\u52A0\u8F7D\u89C4\u5219",desc:"\u91CD\u65B0\u7F16\u8BD1\u672C\u5730\u89C4\u5219\u96C6"},{name:"\u5BFC\u51FA\u5168\u91CF\u8BBE\u7F6E",desc:"\u5BFC\u51FA\u6240\u6709\u8BBE\u7F6E\u4E3A JSON"},{name:"\u5BFC\u51FA\u81EA\u5B9A\u4E49\u6587\u672C\u989C\u8272",desc:"\u4EC5\u5BFC\u51FA\u81EA\u5B9A\u4E49\u989C\u8272\u89C4\u5219"},{name:"\u5BFC\u51FA\u6587\u4EF6\u5939\u6620\u5C04",desc:"\u5BFC\u51FA\u6587\u4EF6\u5939\u2192\u6587\u4EF6\u7C7B\u578B\u6620\u5C04"}];$(t,e("guide.commands"),e("guide.commandsDesc"),"global",s=>{let r=s.createDiv({cls:"pc-cmd-list"});for(let n of o){let l=r.createDiv({cls:"pc-cmd-row"});l.createDiv({cls:"pc-cmd-name",text:n.name}),l.createDiv({cls:"pc-cmd-desc",text:n.desc})}})}renderHighlightRulesSection(t,e){let o=[{title:e("settings.editorRules"),desc:e("settings.editorRulesDesc"),iconKey:"editor",keys:Wo,defaultExpanded:!0,toggles:[{key:"highlightVariables",label:e("settings.highlightVariables"),desc:e("settings.highlightVariablesDesc")},{key:"highlightRoleTags",label:e("settings.highlightRoleTags"),desc:e("settings.highlightRoleTagsDesc")},{key:"highlightRoleHeaders",label:e("settings.highlightRoleHeaders"),desc:e("settings.highlightRoleHeadersDesc")},{key:"highlightInstructionMarkers",label:e("settings.highlightInstructions"),desc:e("settings.highlightInstructionsDesc")},{key:"highlightComments",label:e("settings.highlightComments"),desc:e("settings.highlightCommentsDesc")},{key:"highlightCodeBlocks",label:e("settings.highlightCodeBlocks"),desc:e("settings.highlightCodeBlocksDesc")},{key:"highlightJsonBlocks",label:e("settings.highlightJsonBlocks"),desc:e("settings.highlightJsonBlocksDesc")},{key:"highlightInlineCode",label:e("settings.highlightInlineCode"),desc:e("settings.highlightInlineCodeDesc")}]},{title:e("settings.videoPromptRules"),desc:e("settings.videoPromptRulesDesc"),iconKey:"video",keys:$o,defaultExpanded:!1,toggles:[{key:"highlightSectionMarkers",label:e("settings.highlightSectionMarkers"),desc:e("settings.highlightSectionMarkersDesc")},{key:"highlightShotHeaders",label:e("settings.highlightShotHeaders"),desc:e("settings.highlightShotHeadersDesc")},{key:"highlightAssetRefs",label:e("settings.highlightAssetRefs"),desc:e("settings.highlightAssetRefsDesc")},{key:"highlightFieldLabels",label:e("settings.highlightFieldLabels"),desc:e("settings.highlightFieldLabelsDesc")},{key:"highlightDialogue",label:e("settings.highlightDialogue"),desc:e("settings.highlightDialogueDesc")},{key:"highlightAudioRefs",label:e("settings.highlightAudioRefs"),desc:e("settings.highlightAudioRefsDesc")},{key:"highlightNegativePrompts",label:e("settings.highlightNegativePrompts"),desc:e("settings.highlightNegativePromptsDesc")},{key:"highlightTechParams",label:e("settings.highlightTechParams"),desc:e("settings.highlightTechParamsDesc")},{key:"highlightParentheticals",label:e("settings.highlightParentheticals"),desc:e("settings.highlightParentheticalsDesc")}]},{title:e("settings.sdPromptRules"),desc:e("settings.sdPromptRulesDesc"),iconKey:"sd",keys:zo,defaultExpanded:!1,toggles:[{key:"highlightEmphasisWeights",label:e("settings.highlightEmphasisWeights"),desc:e("settings.highlightEmphasisWeightsDesc")},{key:"highlightLoraRefs",label:e("settings.highlightLoraRefs"),desc:e("settings.highlightLoraRefsDesc")},{key:"highlightBracketEmphasis",label:e("settings.highlightBracketEmphasis"),desc:e("settings.highlightBracketEmphasisDesc")},{key:"highlightSdNegativeHeader",label:e("settings.highlightSdNegativeHeader"),desc:e("settings.highlightSdNegativeHeaderDesc")}]}];for(let s of o)this.renderCollapsibleSection(t,s.title,s.desc,s.iconKey,s.keys,s.toggles,s.defaultExpanded,e)}renderEngineTab(t,e){$(t,e("settings.ruleEngine"),e("settings.ruleEngineDesc"),"cloud",o=>{new C.Setting(o).setName(e("settings.ruleSource")).setDesc(e("settings.ruleSourceDesc")).addDropdown(d=>d.addOption("builtin",e("settings.ruleSourceBuiltin")).addOption("local",e("settings.ruleSourceLocal")).addOption("remote",e("settings.ruleSourceRemote")).setValue(this.plugin.settings.ruleSource).onChange(async u=>{this.plugin.settings.ruleSource=u,await this.plugin.saveSettings(),await this.plugin.reloadRules(),this.display()})),this.plugin.settings.ruleSource==="remote"&&(new C.Setting(o).setName(e("settings.gitRepoUrl")).setDesc(e("settings.gitRepoUrlDesc")).addText(u=>u.setPlaceholder(e("settings.gitRepoUrlPh")).setValue("").onChange(async g=>{let m=Vo(g);m&&(this.plugin.settings.gitRawBaseUrl=m.rawBaseUrl,this.plugin.settings.gitBranch=m.branch,await this.plugin.saveSettings(),new C.Notice(e("notice.gitParsed")),this.display())})),o.createDiv({cls:"pc-git-parse-hint"}).createSpan({cls:"pc-git-parse-status",text:`${e("settings.gitRawBaseUrl")}: ${this.plugin.settings.gitRawBaseUrl}`}),new C.Setting(o).setName(e("settings.gitRawBaseUrl")).setDesc(e("settings.gitRawBaseUrlDesc")).addText(u=>u.setPlaceholder(e("settings.gitRawBaseUrlPh")).setValue(this.plugin.settings.gitRawBaseUrl).onChange(async g=>{this.plugin.settings.gitRawBaseUrl=g.trim(),await this.plugin.saveSettings()})),new C.Setting(o).setName(e("settings.gitBranch")).setDesc(e("settings.gitBranchDesc")).addText(u=>u.setPlaceholder("main").setValue(this.plugin.settings.gitBranch).onChange(async g=>{this.plugin.settings.gitBranch=g.trim()||"main",await this.plugin.saveSettings()})),new C.Setting(o).setName(e("settings.autoUpdateRules")).setDesc(e("settings.autoUpdateRulesDesc")).addToggle(u=>u.setValue(this.plugin.settings.autoUpdateRules).onChange(async g=>{this.plugin.settings.autoUpdateRules=g,await this.plugin.saveSettings(),this.display()})),this.plugin.settings.autoUpdateRules&&new C.Setting(o).setName(e("settings.autoUpdateInterval")).setDesc(e("settings.autoUpdateIntervalDesc")).addSlider(u=>u.setLimits(1,72,1).setValue(this.plugin.settings.autoUpdateInterval).setDynamicTooltip().onChange(async g=>{this.plugin.settings.autoUpdateInterval=g,await this.plugin.saveSettings()}))),new C.Setting(o).setName(e("settings.contextSemantic")).setDesc(e("settings.contextSemanticDesc")).addToggle(d=>d.setValue(this.plugin.settings.contextSemanticEnabled).onChange(async u=>{this.plugin.settings.contextSemanticEnabled=u,await this.plugin.saveSettings(),this.plugin.refreshEditorExtensions()})),new C.Setting(o).setName(e("settings.lexiconEnabled")).setDesc(e("settings.lexiconEnabledDesc")).addToggle(d=>d.setValue(this.plugin.settings.lexiconEnabled).onChange(async u=>{this.plugin.settings.lexiconEnabled=u,await this.plugin.saveSettings(),this.plugin.refreshEditorExtensions()}));let s=this.plugin.getRuleVersion();new C.Setting(o).setName(e("settings.ruleVersion")).setDesc(e("settings.ruleVersionDesc")).addText(d=>d.setValue(s).setDisabled(!0));let r=o.createDiv({cls:"pc-batch-row"});r.createSpan({text:""});let n=r.createDiv({cls:"pc-batch-actions",attr:{style:"display: flex; gap: 4px;"}}),l=n.createEl("button",{cls:"pc-batch-btn",text:e("settings.checkUpdate")});l.addEventListener("click",async()=>{await this.plugin.checkForUpdates(!0),this.display()}),this.plugin.settings.ruleSource!=="remote"&&(l.setAttribute("disabled","true"),l.style.opacity="0.5"),n.createEl("button",{cls:"pc-batch-btn",text:e("settings.reloadRules")}).addEventListener("click",async()=>{await this.plugin.reloadRules(),new C.Notice(this.plugin.t("notice.rulesReloaded")),this.display()}),n.createEl("button",{cls:"pc-batch-btn mod-warning",text:e("settings.clearCache")}).addEventListener("click",async()=>{await this.plugin.clearRuleCache(),new C.Notice(this.plugin.t("notice.cacheCleared")),this.display()}),o.createDiv({cls:"pc-setting-divider"}),new C.Setting(o).setName(e("settings.gitReportEnabled")).setDesc(e("settings.gitReportEnabledDesc")).addToggle(d=>d.setValue(this.plugin.settings.gitReportEnabled).onChange(async u=>{this.plugin.settings.gitReportEnabled=u,await this.plugin.saveSettings(),this.display()})),new C.Setting(o).setName(e("settings.downloadToCache")).setDesc(e("settings.downloadToCacheDesc")).addToggle(d=>d.setValue(this.plugin.settings.downloadToCache).onChange(async u=>{this.plugin.settings.downloadToCache=u,await this.plugin.saveSettings()})),this.plugin.settings.gitReportEnabled&&this.renderPullReport(o,e)})}renderFilesTab(t,e){$(t,e("settings.fileDetection"),e("settings.fileDetectionDesc"),"detection",o=>{new C.Setting(o).setName(e("settings.detectByFrontmatter")).setDesc(e("settings.detectByFrontmatterDesc")).addToggle(s=>s.setValue(this.plugin.settings.detectByFrontmatter).onChange(async r=>{this.plugin.settings.detectByFrontmatter=r,await this.plugin.saveSettings(),this.plugin.refreshFileColorizer()})),new C.Setting(o).setName(e("settings.detectByFolder")).setDesc(e("settings.detectByFolderDesc")).addToggle(s=>s.setValue(this.plugin.settings.detectByFolder).onChange(async r=>{this.plugin.settings.detectByFolder=r,await this.plugin.saveSettings(),this.plugin.refreshFileColorizer()})),new C.Setting(o).setName(e("settings.detectByFilename")).setDesc(e("settings.detectByFilenameDesc")).addToggle(s=>s.setValue(this.plugin.settings.detectByFilename).onChange(async r=>{this.plugin.settings.detectByFilename=r,await this.plugin.saveSettings(),this.plugin.refreshFileColorizer()}))}),$(t,e("settings.displayOptions"),e("settings.displayOptionsDesc"),"display",o=>{new C.Setting(o).setName(e("settings.fileColorizer")).setDesc(e("settings.fileColorizerDesc")).addToggle(s=>s.setValue(this.plugin.settings.fileColorizerEnabled).onChange(async r=>{this.plugin.settings.fileColorizerEnabled=r,await this.plugin.saveSettings(),this.plugin.refreshFileColorizer(),this.updateStatusBar()}))})}renderRulesTab(t,e){this.renderRulesSearchBox(t,e),this.renderHighlightRulesSection(t,e)}renderRulesSearchBox(t,e){let o=t.createDiv({cls:"pc-search-box"}),s=o.createSpan({cls:"pc-search-icon"});s.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';let r=o.createEl("input",{cls:"pc-search-input",attr:{type:"text",placeholder:e("search.placeholder")}});r.value=this.rulesSearchQuery;let n=o.createSpan({cls:"pc-search-hint"}),l=()=>{let c=this.rulesSearchQuery.trim().toLowerCase(),p=this.containerEl.querySelector(".pc-tab-content");if(!p)return;let d=p.querySelectorAll(".pc-collapsible-content .setting-item"),u=0;d.forEach(m=>{let b=(m.textContent||"").toLowerCase(),f=c===""||b.includes(c);m.classList.toggle("pc-search-hidden",!f),f&&u++}),p.querySelectorAll(".pc-collapsible").forEach(m=>{let b=m.querySelectorAll(".setting-item:not(.pc-search-hidden)").length;m.classList.toggle("pc-search-group-hidden",c!==""&&b===0)}),n.textContent=c===""?"":u===0?e("search.noMatch"):e("search.matchCount").replace("{count}",String(u))};r.addEventListener("input",()=>{this.rulesSearchQuery=r.value,l()}),setTimeout(l,0)}renderColorsTab(t,e){this.renderVocabTokenCards(t,e),this.renderTokenCards(t,e),$(t,e("settings.fileTypeColors"),e("settings.fileTypeColorsDesc"),"colors",o=>{for(let s of this.plugin.settings.fileTypeColors)new C.Setting(o).setName(s.label).addColorPicker(r=>r.setValue(s.color).onChange(async n=>{s.color=n,await this.plugin.saveSettings(),this.plugin.refreshFileColorizer(),this.plugin.applyColorMode()})).addText(r=>r.setValue(s.color).onChange(async n=>{/^#[0-9a-fA-F]{6}$/.test(n)&&(s.color=n,await this.plugin.saveSettings(),this.plugin.refreshFileColorizer(),this.plugin.applyColorMode())}));new C.Setting(o).setName(e("settings.resetColors")).setDesc(e("settings.resetColorsDesc")).addButton(s=>s.setButtonText(e("settings.reset")).setWarning().onClick(async()=>{re(this.containerEl,this.plugin.t.bind(this.plugin),e("confirm.resetTitle"),e("confirm.resetDesc"),async()=>{this.plugin.settings.fileTypeColors=[...Je],await this.plugin.saveSettings(),this.plugin.refreshFileColorizer(),this.display(),new C.Notice(this.plugin.t("notice.colorsReset"))})}))}),this.renderCustomTextColors(t,e),this.renderConfigManagement(t,e)}renderConfigManagement(t,e){$(t,e("settings.configManagement"),e("settings.configManagementDesc"),"global",o=>{new C.Setting(o).setName(e("settings.exportConfig")).setDesc(e("settings.exportConfigDesc")).addButton(n=>n.setButtonText(e("settings.export")).setCta().onClick(()=>{let l=Pt(this.plugin.settings,this.plugin.manifest.version);Lt(l),new C.Notice(e("notice.configExported"))}));let s=new C.Setting(o).setName(e("settings.importConfig")).setDesc(e("settings.importConfigDesc")),r=o.createEl("input",{attr:{type:"file",accept:"application/json,.json",multiple:"multiple"}});r.style.display="none",r.addEventListener("change",async()=>{let n=r.files;if(!n||n.length===0)return;let l=[];for(let p of Array.from(n))try{let d=await p.text();l.push(Rt(d))}catch(d){new C.Notice(`${e("notice.importFailed")}: ${p.name}`)}if(l.length===0)return;let c=String(l.length);re(this.containerEl,this.plugin.t.bind(this.plugin),e("confirm.importTitle"),e("confirm.importDesc").replace("{count}",c),async()=>{this.plugin.settings=Dt(this.plugin.settings,l),await this.plugin.saveSettings(),this.plugin.refreshDynamicStyles(),this.plugin.refreshEditorExtensions(),this.plugin.refreshFileColorizer(),this.display(),new C.Notice(e("notice.configImported").replace("{count}",c))}),r.value=""}),s.addButton(n=>n.setButtonText(e("settings.import")).onClick(()=>r.click()))})}renderDeriveAlphaSettings(t,e){var l;let o=(l=this.plugin.settings.tokenDeriveAlphas)!=null?l:{},s=(c,p,d)=>{c.addText(u=>u.setPlaceholder(String(d)).setValue(o[p]!==void 0?String(o[p]):"").onChange(async g=>{let m=parseFloat(g),b=Math.min(.6,Math.max(.01,isNaN(m)?d:m));this.plugin.settings.tokenDeriveAlphas||(this.plugin.settings.tokenDeriveAlphas={}),isNaN(m)?delete this.plugin.settings.tokenDeriveAlphas[p]:this.plugin.settings.tokenDeriveAlphas[p]=b,await this.plugin.saveSettings(),this.plugin.applyColorMode()}))},r=new C.Setting(t).setName(e("settings.alphaSoft")).setDesc(e("settings.alphaSoftDesc"));s(r,"softLight",.06),s(r,"softDark",.1);let n=new C.Setting(t).setName(e("settings.alphaBorder")).setDesc(e("settings.alphaBorderDesc"));s(n,"borderLight",.15),s(n,"borderDark",.2)}renderFolderPalettes(t,e,o){let s=new C.Setting(t).setName(e("settings.folderPalettes")).setDesc(e("settings.folderPalettesDesc")).addToggle(l=>l.setValue(!!this.plugin.settings.folderPalettesEnabled).onChange(async c=>{this.plugin.settings.folderPalettesEnabled=c,await this.plugin.saveSettings(),this.plugin.applyColorMode()})),r=t.createDiv({cls:"pc-folder-palette-list"}),n=()=>{var c,p,d;r.empty();let l=(c=this.plugin.settings.folderPalettes)!=null?c:[];for(let u=0;u<l.length;u++){let g=r.createDiv({cls:"pc-folder-palette-row"});g.createEl("input",{cls:"pc-folder-palette-path",attr:{type:"text",placeholder:"projects/tech"}});let m=g.querySelector("input");m.value=l[u].path;let b=g.createEl("select",{cls:"pc-folder-palette-select dropdown"});b.createEl("option",{text:e("settings.paletteDefault"),attr:{value:""}});for(let[v,y]of Object.entries(o)){let x=typeof y.name=="string"?y.name:(d=(p=y.name)==null?void 0:p.zh)!=null?d:v;b.createEl("option",{text:`${x} (${v})`,attr:{value:v}})}b.value=l[u].palette,g.createEl("button",{cls:"pc-folder-palette-remove",text:"\u2715",attr:{"aria-label":e("customText.delete"),title:e("customText.delete")}}).addEventListener("click",async()=>{this.plugin.settings.folderPalettes.splice(u,1),await this.plugin.saveSettings(),this.plugin.applyColorMode(),n()}),m.addEventListener("change",async()=>{l[u].path=m.value.trim().replace(/^\/+|\/+$/g,""),await this.plugin.saveSettings(),this.plugin.applyColorMode()}),b.addEventListener("change",async()=>{l[u].palette=b.value,await this.plugin.saveSettings(),this.plugin.applyColorMode()})}};n(),s.addButton(l=>l.setButtonText(e("settings.folderPaletteAdd")).setCta().onClick(async()=>{this.plugin.settings.folderPalettes||(this.plugin.settings.folderPalettes=[]),this.plugin.settings.folderPalettes.push({path:"",palette:""}),this.plugin.settings.folderPalettesEnabled=!0,await this.plugin.saveSettings(),n()}))}renderCustomTextColors(t,e){$(t,e("customText.section"),e("customText.sectionDesc"),"colors",o=>{var p,d,u;o.addClass("pc-custom-text"),new C.Setting(o).setName(e("customText.enabled")).setDesc(e("customText.enabledDesc")).addToggle(g=>g.setValue(this.plugin.settings.customTextColorsEnabled!==!1).onChange(async m=>{this.plugin.settings.customTextColorsEnabled=m,await this.plugin.saveSettings(),this.plugin.applyCustomTextColorsStyles(),this.plugin.refreshEditorExtensions(),this.display()})),new C.Setting(o).setName(e("customText.popoverAutoShow")).setDesc(e("customText.popoverAutoShowDesc")).addToggle(g=>g.setValue(this.plugin.settings.customTextPopoverAutoShow!==!1).onChange(async m=>{this.plugin.settings.customTextPopoverAutoShow=m,await this.plugin.saveSettings(),this.display()})),new C.Setting(o).setName(e("customText.popoverDelay")).setDesc(e("customText.popoverDelayDesc")).addText(g=>{var m;return g.setPlaceholder("350").setValue(String((m=this.plugin.settings.customTextPopoverDelay)!=null?m:350)).onChange(async b=>{let f=parseInt(b,10);!isNaN(f)&&f>=0&&f<=2e3&&(this.plugin.settings.customTextPopoverDelay=f,await this.plugin.saveSettings())})});let s=o.createDiv({cls:"pc-custom-text-tip"});s.createEl("span",{cls:"pc-custom-text-tip-icon",text:"\u24D8"}),s.createEl("span",{cls:"pc-custom-text-tip-text",text:e("customText.tip")}),new C.Setting(o).setName(e("customText.add")).setDesc(e("customText.addDesc")).addButton(g=>g.setButtonText(e("customText.cmdApply")).setCta().onClick(()=>{new C.Notice(e("customText.noticeNoSelection"))})),o.createDiv({cls:"pc-custom-text-divider"});let r=(p=this.plugin.settings.customTextColors)!=null?p:[];if(r.length===0){o.createDiv({cls:"pc-custom-text-empty",text:e("customText.empty")});return}r.some(g=>g.id===this.selectedCustomTextId)||(this.selectedCustomTextId=(u=(d=r[0])==null?void 0:d.id)!=null?u:null);let n=o.createDiv({cls:"pc-custom-text-md"}),l=n.createDiv({cls:"pc-custom-text-md-list"}),c=n.createDiv({cls:"pc-custom-text-md-detail"});for(let g of r)this.renderCustomTextListItem(l,g,e);this.renderCustomTextDetail(c,e)})}renderCustomTextListItem(t,e,o){let s=e.id===this.selectedCustomTextId,r=t.createDiv({cls:`pc-custom-text-md-item ${s?"selected":""} ${e.enabled?"":"disabled"}`,attr:{role:"button",tabindex:"0"}}),n=r.createDiv({cls:"pc-custom-text-md-item-text"});n.setText(e.text.length>40?e.text.slice(0,40)+"\u2026":e.text),n.setAttribute("title",e.text);let l=r.createDiv({cls:"pc-custom-text-md-item-badge"}),c=K(q(e.gradientStops));if(c){let d=l.createDiv({cls:"pc-custom-text-md-item-grad"});d.style.background=`linear-gradient(90deg, ${c})`}else{let d=l.createDiv({cls:"pc-custom-text-md-item-dot"});d.style.background=e.color}let p=()=>{if(this.selectedCustomTextId===e.id)return;this.selectedCustomTextId=e.id;let d=r.closest(".pc-custom-text-md");if(d){let u=d.querySelector(".pc-custom-text-md-list"),g=d.querySelector(".pc-custom-text-md-detail");u==null||u.querySelectorAll(".pc-custom-text-md-item").forEach(m=>m.classList.remove("selected")),r.addClass("selected"),g&&(g.empty(),this.renderCustomTextDetail(g,this.plugin.t.bind(this.plugin)))}};r.addEventListener("click",p),r.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),p())})}renderCustomTextDetail(t,e){var x,S,R;let o=((x=this.plugin.settings.customTextColors)!=null?x:[]).find(w=>w.id===this.selectedCustomTextId);if(!o){t.createDiv({cls:"pc-custom-text-md-empty",text:e("customText.detailEmpty")});return}let r=t.createDiv({cls:"pc-custom-text-md-preview"}).createSpan({cls:`dsl-custom-text-${o.id}`,text:o.text.length>60?o.text.slice(0,60)+"\u2026":o.text}),n=t.createDiv({cls:"pc-custom-text-md-actions"});n.createEl("button",{cls:"pc-custom-text-action-btn pc-custom-text-edit-btn",text:e("customText.edit")}).addEventListener("click",()=>this.plugin.editCustomTextColor(o.id)),n.createEl("button",{cls:"pc-custom-text-action-btn",text:o.enabled?e("customText.disableAction"):e("customText.enableAction")}).addEventListener("click",async()=>{await this.plugin.updateCustomTextColor(o.id,{enabled:!o.enabled});let w=t.closest(".pc-custom-text-md"),T=w==null?void 0:w.querySelector(".pc-custom-text-md-detail");T&&(T.empty(),this.renderCustomTextDetail(T,this.plugin.t.bind(this.plugin)))}),n.createEl("button",{cls:"pc-custom-text-action-btn pc-custom-text-delete-btn",text:e("customText.delete")}).addEventListener("click",()=>{re(this.containerEl,this.plugin.t.bind(this.plugin),e("customText.delete"),e("customText.confirmDelete"),async()=>{await this.plugin.deleteCustomTextColor(o.id),this.display()})});let d=t.createDiv({cls:"pc-custom-text-md-props"}),u=(w,T)=>{let L=d.createDiv({cls:"pc-custom-text-md-prop-row"});return L.createSpan({cls:"pc-custom-text-md-prop-label",text:e(w)}),typeof T=="string"?L.createSpan({cls:"pc-custom-text-md-prop-value",text:T}):L.createDiv({cls:"pc-custom-text-md-prop-value"}).appendChild(T),L},g=document.createElement("span"),m=document.createElement("span");m.className="pc-custom-text-md-swatch",m.style.background=o.color,g.appendChild(m),g.appendChild(document.createTextNode(o.color)),u("customText.colorCol",g);let b=K(q(o.gradientStops));if(b){let w=document.createElement("span");w.className="pc-custom-text-md-gradbar",w.style.background=`linear-gradient(90deg, ${b})`,u("customText.gradientTitle",`${o.gradientStops.length} ${e("customText.gradientStopCount")}`),u("customText.gradientAngle",`${(S=o.gradientAngle)!=null?S:135}\xB0`);let T=document.createElement("span");T.className="pc-custom-text-md-gradtext",T.setText(b),u("customText.gradientStopsLabel",T),u("customText.gradientPreview",w)}else o.color2&&u("customText.secondaryColor",o.color2);let f=X(o);if(f.length>0){let w=document.createElement("span");w.className="pc-custom-text-md-fxlist";for(let T of f){let L=document.createElement("span");L.className="pc-custom-text-md-fxtag";let G=e(`customText.effectName_${T}`),E=(R=o.effectParams)==null?void 0:R[T];if(E){let k=Object.entries(E).map(([P,A])=>`${P}=${A}`);k.length>0&&(G+=` (${k.join(", ")})`)}L.setText(G),w.appendChild(L)}u("customText.effect",w)}else u("customText.effect",e("customText.effectNone"));let v=[o.caseSensitive?e("customText.caseShort"):e("customText.caseInsensitive"),o.wholeWord?e("customText.wholeShort"):e("customText.wholeWordOff")].join(" \xB7 ");u("customText.matchOptions",v),u("customText.enabledCol",o.enabled?e("customText.enabled"):e("customText.disabled"));let y=document.createElement("span");y.className="pc-custom-text-md-fulltext",y.setText(o.text),u("customText.textCol",y)}renderVocabTokenCards(t,e){var m,b,f;let o=this.plugin.getVocabTokens(),s=this.plugin.getVocabCategories();if(o.length===0)return;let r=this.plugin.getVocabHitCounts(),n=new Map(o.map(v=>[v.id,v])),l=t.createEl("details",{cls:"pc-token-group-details pc-vocab-group"}),c="settings.vocabTokens";((m=this.tokenGroupOpenStates.get(c))!=null?m:!0)&&l.setAttribute("open",""),l.addEventListener("toggle",()=>{this.tokenGroupOpenStates.set(c,l.open)});let d=l.createEl("summary",{cls:"pc-token-group-summary"});d.createSpan({text:e("settings.vocabTokens")}),d.createSpan({cls:"pc-token-group-count",text:e("settings.tokenGroupCount").replace("{count}",String(o.length))});let u=getComputedStyle(document.documentElement),g=v=>{if(v.startsWith("#"))return v;let y=v.match(/var\((--[\w-]+)\)/);return y?u.getPropertyValue(y[1]).trim():""};for(let v of s){let y=v.tokenIds.map(k=>n.get(k)).filter(k=>!!k);if(y.length===0)continue;let x=l.createEl("details",{cls:"pc-vocab-category"}),S=`vocab-cat-${v.id}`;((b=this.tokenGroupOpenStates.get(S))!=null?b:!1)&&x.setAttribute("open",""),x.addEventListener("toggle",()=>{this.tokenGroupOpenStates.set(S,x.open)});let w=x.createEl("summary",{cls:"pc-vocab-category-summary"});w.createSpan({text:v.name}),w.createSpan({cls:"pc-token-group-count",text:e("settings.tokenGroupCount").replace("{count}",String(y.length))});let T=w.createDiv({cls:"pc-token-group-batch"});T.createEl("button",{cls:"pc-batch-btn pc-batch-btn-sm",text:e("batch.enableAll")}).addEventListener("click",k=>{k.stopPropagation(),this.plugin.settings.vocabTokenEnabled||(this.plugin.settings.vocabTokenEnabled={});for(let P of y)this.plugin.settings.vocabTokenEnabled[P.id]=!0;this.plugin.saveSettings().then(()=>{this.plugin.refreshEditorExtensions(),this.display()})}),T.createEl("button",{cls:"pc-batch-btn pc-batch-btn-sm",text:e("batch.disableAll")}).addEventListener("click",k=>{k.stopPropagation(),this.plugin.settings.vocabTokenEnabled||(this.plugin.settings.vocabTokenEnabled={});for(let P of y)this.plugin.settings.vocabTokenEnabled[P.id]=!1;this.plugin.saveSettings().then(()=>{this.plugin.refreshEditorExtensions(),this.display()})}),T.createEl("button",{cls:"pc-batch-btn pc-batch-btn-sm",text:e("batch.reset")}).addEventListener("click",k=>{if(k.stopPropagation(),this.plugin.settings.vocabColors)for(let P of y)delete this.plugin.settings.vocabColors[P.id];this.plugin.saveSettings().then(()=>{this.plugin.refreshDynamicStyles(),this.display(),new C.Notice(e("notice.tokenGroupColorsReset"))})});for(let k of y)this.renderVocabTokenItem(x,k,(f=r[k.id])!=null?f:0,g,e)}}renderVocabTokenItem(t,e,o,s,r){let n=s(e.color)||e.defaultColor||"#8b5cf6",l=r("settings.vocabWordCount").replace("{count}",String(e.wordCount)),c=r("settings.vocabHitCount").replace("{count}",String(o)),p=new C.Setting(t).setName(e.name).setDesc(`${e.desc} \xB7 ${l} \xB7 ${c}`),d=null,u=null;p.settingEl.classList.toggle("is-token-disabled",!e.enabled),p.addToggle(x=>x.setValue(e.enabled).onChange(async S=>{this.plugin.settings.vocabTokenEnabled||(this.plugin.settings.vocabTokenEnabled={}),this.plugin.settings.vocabTokenEnabled[e.id]=S,await this.plugin.saveSettings(),this.plugin.refreshEditorExtensions(),d&&d.setDisabled(!S),u&&u.setDisabled(!S),p.settingEl.classList.toggle("is-token-disabled",!S),this.updateStatusBar()}));let g=p.controlEl.createEl("span",{cls:"pc-color-preview",attr:{style:`background-color: ${n};`}});p.addColorPicker(x=>{d=x,x.setValue(n).setDisabled(!e.enabled),x.onChange(async S=>{this.plugin.settings.vocabColors||(this.plugin.settings.vocabColors={}),this.plugin.settings.vocabColors[e.id]=S,await this.plugin.saveSettings(),this.plugin.refreshDynamicStyles(),g.style.backgroundColor=S})}),p.addText(x=>{u=x,x.setValue(n).setDisabled(!e.enabled),x.inputEl.addEventListener("change",async()=>{let S=x.getValue().trim();/^#[0-9a-fA-F]{6}$/.test(S)&&(this.plugin.settings.vocabColors||(this.plugin.settings.vocabColors={}),this.plugin.settings.vocabColors[e.id]=S,await this.plugin.saveSettings(),this.plugin.refreshDynamicStyles(),g.style.backgroundColor=S)})});let m=p.settingEl;m.classList.add("pc-vocab-token-item");let b=m.createDiv({cls:"pc-vocab-words-toggle"});b.setText(r("settings.vocabPreview"));let f=m.createDiv({cls:"pc-vocab-words-panel"}),v=!1,y=()=>{if(f.empty(),!v){f.classList.remove("is-open");return}f.classList.add("is-open");let{builtin:x,custom:S}=this.plugin.getVocabWords(e.id),w=f.createDiv({cls:"pc-vocab-words-search"}).createEl("input",{cls:"pc-vocab-words-search-input",attr:{type:"text",placeholder:r("settings.vocabSearchWords")}}),T=f.createDiv({cls:"pc-vocab-words-chips"}),L=()=>{T.empty();let A=w.value.trim().toLowerCase(),M=[...S.map(F=>({w:F,custom:!0})),...x.filter(F=>!S.includes(F)).map(F=>({w:F,custom:!1}))],I=A?M.filter(F=>F.w.toLowerCase().includes(A)):M;if(I.length===0){T.createDiv({cls:"pc-vocab-words-empty",text:r("colorMap.noResults")});return}let W=200;for(let F of I.slice(0,W)){let ee=T.createSpan({cls:`pc-vocab-chip${F.custom?" is-custom":""}`,text:F.w});F.custom&&(ee.createSpan({cls:"pc-vocab-chip-remove",text:" \xD7"}),ee.addEventListener("click",async te=>{var de,ce;if(!te.target.classList.contains("pc-vocab-chip-remove"))return;let oe=(ce=(de=this.plugin.settings.vocabCustomWords)==null?void 0:de[e.id])!=null?ce:[];this.plugin.settings.vocabCustomWords[e.id]=oe.filter(N=>N!==F.w),await this.plugin.saveSettings(),this.plugin.refreshEditorExtensions(),L()}))}I.length>W&&T.createDiv({cls:"pc-vocab-words-empty",text:r("settings.vocabMoreWords").replace("{count}",String(I.length-W))})};L(),w.addEventListener("input",L);let G=f.createDiv({cls:"pc-vocab-words-add"}),E=G.createEl("input",{cls:"pc-vocab-words-add-input",attr:{type:"text",placeholder:r("settings.vocabAddPlaceholder")}}),k=G.createEl("button",{cls:"pc-batch-btn pc-batch-btn-sm",text:r("settings.vocabAdd")}),P=async()=>{var I;let A=E.value.trim();if(!A)return;this.plugin.settings.vocabCustomWords||(this.plugin.settings.vocabCustomWords={});let M=(I=this.plugin.settings.vocabCustomWords[e.id])!=null?I:[];M.includes(A)||(M.push(A),this.plugin.settings.vocabCustomWords[e.id]=M,await this.plugin.saveSettings(),this.plugin.refreshEditorExtensions(),E.value="",L())};k.addEventListener("click",P),E.addEventListener("keydown",A=>{A.key==="Enter"&&P()})};b.addEventListener("click",x=>{x.stopPropagation(),v=!v,b.classList.toggle("is-open",v),y()}),y()}renderTokenCards(t,e){var p,d,u,g,m,b;let o=this.plugin.getColorTokens();if(Object.keys(o).length===0){$(t,e("settings.colorCustom"),e("settings.colorCustomDesc"),"colors",f=>{f.createDiv({cls:"pc-pull-report-empty",text:e("settings.noColorTokens")})});return}let s=getComputedStyle(document.documentElement),r=(p=this.plugin.settings.customColors)!=null?p:{},n=Object.keys(o),l=n.filter(f=>{var v,y;return(y=(v=this.plugin.settings.tokenEnabled)==null?void 0:v[f])!=null?y:!0}).length;if(l>Oo){let f=t.createDiv({cls:"pc-token-noise-warning"});f.createSpan({text:e("settings.tokenNoiseWarning").replace("{count}",String(l))}),f.createEl("button",{cls:"pc-batch-btn pc-batch-btn-sm",text:e("settings.tokenNoiseAction")}).addEventListener("click",async()=>{this.plugin.settings.tokenEnabled||(this.plugin.settings.tokenEnabled={});for(let y of n)this.plugin.settings.tokenEnabled[y]=xt.includes(y);await this.plugin.saveSettings(),this.plugin.refreshDynamicStyles(),this.updatePreviewCard(),this.display(),new C.Notice(e("settings.tokenNoiseDone"))})}let c=new Map;for(let[f,v]of Object.entries(At)){let x=this.plugin.getColorByCssClass(v).match(/--dsl-([a-zA-Z_][\w-]*)/);if(x){let S=x[1].replace(/-(?:soft|border)$/,"");c.has(S)||c.set(S,[]),c.get(S).push(f)}}for(let f of ne.TOKEN_GROUPS){let v=f.tokens.filter(E=>o[E]);if(v.length===0)continue;let y=t.createEl("details",{cls:"pc-token-group-details"}),x=f.titleKey,S=this.tokenGroupOpenStates.get(x);(S!=null?S:f.defaultExpanded)&&y.setAttribute("open",""),y.addEventListener("toggle",()=>{this.tokenGroupOpenStates.set(x,y.open)});let R=y.createEl("summary",{cls:"pc-token-group-summary"});R.createSpan({text:e(f.titleKey)}),R.createSpan({cls:"pc-token-group-count",text:e("settings.tokenGroupCount").replace("{count}",String(v.length))});let w=R.createDiv({cls:"pc-token-group-batch"});w.createEl("button",{cls:"pc-batch-btn pc-batch-btn-sm",text:e("batch.enableAll")}).addEventListener("click",E=>{E.stopPropagation(),this.plugin.settings.tokenEnabled||(this.plugin.settings.tokenEnabled={});for(let k of v)this.plugin.settings.tokenEnabled[k]=!0;this.plugin.saveSettings().then(()=>{this.plugin.refreshDynamicStyles(),this.display()})}),w.createEl("button",{cls:"pc-batch-btn pc-batch-btn-sm",text:e("batch.disableAll")}).addEventListener("click",E=>{E.stopPropagation(),this.plugin.settings.tokenEnabled||(this.plugin.settings.tokenEnabled={});for(let k of v)this.plugin.settings.tokenEnabled[k]=!1;this.plugin.saveSettings().then(()=>{this.plugin.refreshDynamicStyles(),this.display()})}),w.createEl("button",{cls:"pc-batch-btn pc-batch-btn-sm",text:e("batch.reset")}).addEventListener("click",E=>{if(E.stopPropagation(),this.plugin.settings.customColors)for(let k of v)delete this.plugin.settings.customColors[`--dsl-${k}`];this.plugin.saveSettings().then(()=>{this.plugin.refreshDynamicStyles(),this.display(),new C.Notice(e("notice.tokenGroupColorsReset"))})});for(let E of v){let k=o[E],P=`--dsl-${E}`,A=E;typeof k.name=="object"?A=(d=k.name.zh)!=null?d:k.name.en:typeof k.name=="string"&&(A=k.name);let M="";k.desc&&(typeof k.desc=="object"?M=(u=k.desc.zh)!=null?u:k.desc.en:M=k.desc);let W=r[P]||s.getPropertyValue(P).trim()||k.light||"",F=new C.Setting(y).setName(A).setDesc(M||E),ee=(m=(g=this.plugin.settings.tokenEnabled)==null?void 0:g[E])!=null?m:!0,te=null,oe=null;F.settingEl.classList.toggle("is-token-disabled",!ee),F.addToggle(N=>N.setValue(ee).onChange(async B=>{this.plugin.settings.tokenEnabled||(this.plugin.settings.tokenEnabled={}),this.plugin.settings.tokenEnabled[E]=B,await this.plugin.saveSettings(),this.plugin.refreshDynamicStyles(),this.updatePreviewCard(),te&&te.setDisabled(!B),oe&&oe.setDisabled(!B),F.settingEl.classList.toggle("is-token-disabled",!B)}));let de=F.controlEl.createEl("span",{cls:"pc-color-preview",attr:{style:`background-color: var(${P});`}});F.addColorPicker(N=>{te=N,N.setValue(W.startsWith("#")?W:k.light||"#8b5cf6").setDisabled(!ee),N.onChange(async B=>{this.plugin.settings.customColors||(this.plugin.settings.customColors={}),this.plugin.settings.customColors[P]=B,await this.plugin.saveSettings(),document.documentElement.style.setProperty(P,B),de.style.backgroundColor=B,oe&&oe.setValue(B),this.updatePreviewCard()})}),F.addText(N=>{oe=N,N.setValue(W).setPlaceholder(k.light||"#8b5cf6").setDisabled(!ee),N.onChange(async B=>{/^#[0-9a-fA-F]{6}$/.test(B)&&(this.plugin.settings.customColors||(this.plugin.settings.customColors={}),this.plugin.settings.customColors[P]=B,await this.plugin.saveSettings(),document.documentElement.style.setProperty(P,B),de.style.backgroundColor=B,te&&te.setValue(B),this.updatePreviewCard())})});let ce=(b=c.get(E))!=null?b:[];if(ce.length>0){let N=F.settingEl.createDiv({cls:"pc-token-chips"});N.createSpan({cls:"pc-token-chips-label",text:e("settings.tokenRelatedRulesCount").replace("{count}",String(ce.length))});for(let B of ce){let bt=this.plugin.settings[B],pe=N.createEl("span",{cls:`pc-token-chip ${bt?"is-enabled":"is-disabled"}`,attr:{role:"button",tabindex:"0","aria-pressed":String(bt)}});pe.createSpan({text:e(`settings.${B}`)});let vt=async()=>{let J=!this.plugin.settings[B];this.plugin.settings[B]=J,await this.plugin.saveSettings(),this.plugin.refreshEditorExtensions(),this.detectActiveAgentPreset(),this.updatePreviewCard(),pe.classList.toggle("is-enabled",J),pe.classList.toggle("is-disabled",!J),pe.setAttribute("aria-pressed",String(J))};pe.addEventListener("click",vt),pe.addEventListener("keydown",J=>{(J.key==="Enter"||J.key===" ")&&(J.preventDefault(),vt())})}}}}$(t,e("settings.colorCustom"),e("settings.colorCustomDesc"),"colors",f=>{new C.Setting(f).setName(e("settings.resetColors")).setDesc(e("settings.resetCustomColorsDesc")).addButton(v=>v.setButtonText(e("settings.reset")).setWarning().onClick(async()=>{re(this.containerEl,this.plugin.t.bind(this.plugin),e("confirm.resetTitle"),e("confirm.resetCustomColorsDesc"),async()=>{this.plugin.resetCustomColors(),await this.plugin.saveSettings(),this.plugin.refreshEditorExtensions(),this.display(),new C.Notice(this.plugin.t("notice.colorsReset"))})}))})}renderCollapsibleSection(t,e,o,s,r,n,l,c){let p=t.createDiv({cls:`pc-collapsible ${l?"":"collapsed"}`}),d=p.createDiv({cls:"pc-collapsible-header"}),u=d.createDiv({cls:"pc-collapsible-header-left"});if(u.createSpan({cls:"pc-collapsible-chevron"}),he[s]){let w=u.createSpan({cls:"pc-collapsible-icon"});w.innerHTML=he[s]}let g=u.createDiv({cls:"pc-collapsible-title-wrap"});g.createSpan({cls:"pc-collapsible-title",text:e}),g.createSpan({cls:"pc-collapsible-desc",text:o});let m=d.createDiv({cls:"pc-collapsible-header-right"}),b=r.filter(w=>this.plugin.settings[w]===!0).length,f=m.createSpan({cls:"pc-rule-count-badge"});f.createSpan({cls:"pc-rule-count-active",text:String(b)}),f.createSpan({cls:"pc-rule-count-sep",text:"/"}),f.createSpan({cls:"pc-rule-count-total",text:String(r.length)});let v=m.createDiv({cls:"pc-collapsible-batch"});v.createEl("button",{cls:"pc-batch-btn pc-batch-btn-sm",text:c("batch.enableAll")}).addEventListener("click",async w=>{w.stopPropagation();for(let T of r)this.plugin.settings[T]=!0;await this.plugin.saveSettings(),this.plugin.refreshEditorExtensions(),this.detectActiveAgentPreset(),this.display()}),v.createEl("button",{cls:"pc-batch-btn pc-batch-btn-sm",text:c("batch.disableAll")}).addEventListener("click",async w=>{w.stopPropagation();for(let T of r)this.plugin.settings[T]=!1;await this.plugin.saveSettings(),this.plugin.refreshEditorExtensions(),this.detectActiveAgentPreset(),this.display()}),v.createEl("button",{cls:"pc-batch-btn pc-batch-btn-sm",text:c("batch.reset")}).addEventListener("click",async w=>{w.stopPropagation();for(let T of r)this.plugin.settings[T]=we[T];await this.plugin.saveSettings(),this.plugin.refreshEditorExtensions(),this.detectActiveAgentPreset(),this.display()}),d.addEventListener("click",()=>{p.toggleClass("collapsed",!p.hasClass("collapsed"))});let R=p.createDiv({cls:"pc-collapsible-content"});for(let w of n){let T=new C.Setting(R).setName(w.label).setDesc(w.desc),L=At[w.key],G=null;if(L){let E=this.plugin.getColorByCssClass(L);E&&(G=T.nameEl.createSpan({cls:"pc-rule-color-dot"}),G.style.backgroundColor=E);let k=E.match(/--dsl-([a-zA-Z_][\w-]*)/);if(k){let P=`--dsl-${k[1]}`,A=getComputedStyle(document.documentElement),M=E.startsWith("#")?E:A.getPropertyValue(P).trim()||"#8b5cf6";T.addColorPicker(I=>{I.setValue(M),I.onChange(async W=>{this.plugin.settings.customColors||(this.plugin.settings.customColors={}),this.plugin.settings.customColors[P]=W,await this.plugin.saveSettings(),document.documentElement.style.setProperty(P,W),this.plugin.refreshDynamicStyles(),G&&(G.style.backgroundColor=W),this.updatePreviewCard()})})}}else T.nameEl.createSpan({cls:"pc-rule-color-dot pc-rule-color-dot-none",text:"\u2014"});T.addToggle(E=>E.setValue(this.plugin.settings[w.key]).onChange(async k=>{this.plugin.settings[w.key]=k,await this.plugin.saveSettings(),this.plugin.refreshEditorExtensions(),this.detectActiveAgentPreset(),this.updatePreviewCard()}))}}renderPullReport(t,e){let o=this.plugin.getPullReport(),s=t.createDiv({cls:"pc-pull-report"});if(s.createDiv({cls:"pc-pull-report-header"}).createSpan({text:e("settings.pullReport")}),!o){s.createDiv({cls:"pc-pull-report-empty",text:e("settings.reportNoReport")});return}let n=s.createDiv({cls:"pc-pull-report-overview"}),l=n.createDiv({cls:"pc-report-status-badge"}),c="",p="";o.success?o.hasUpdate?(c=e("settings.reportStatusSuccess"),p="success"):(c=e("settings.reportNoUpdate"),p="no-update"):(c=e("settings.reportStatusFailed"),p="failed"),l.addClass(p),l.createSpan({text:c});let d=n.createDiv({cls:"pc-report-metrics"}),u=[{label:e("settings.reportRemoteVersion"),value:o.remoteVersion||"\u2014"},{label:e("settings.reportLocalVersion"),value:o.localVersion||"\u2014"},{label:e("settings.reportUpdateTime"),value:this.formatTime(o.timestamp)},{label:e("settings.reportDuration"),value:`${o.duration}ms`},{label:e("settings.reportTotalFiles"),value:`${o.successFiles}/${o.totalFiles}`},{label:e("settings.reportTotalRules"),value:String(o.totalRules)},{label:e("settings.reportTotalTerms"),value:String(o.totalTerms)}];for(let g of u){let m=d.createDiv({cls:"pc-report-metric-item"});m.createSpan({cls:"pc-report-metric-label",text:g.label}),m.createSpan({cls:"pc-report-metric-value",text:g.value})}if(o.error){let g=s.createDiv({cls:"pc-pull-report-error"});g.createSpan({text:`${e("settings.reportError")}: `}),g.createSpan({text:o.error})}if(o.files.length>0){let g=s.createDiv({cls:"pc-report-section"});g.createDiv({cls:"pc-report-section-title",text:e("settings.reportFiles")});let m=g.createEl("table",{cls:"pc-report-table"}),f=m.createEl("thead").createEl("tr");f.createEl("th",{text:e("settings.reportFile")}),f.createEl("th",{text:e("settings.reportStatus")}),f.createEl("th",{text:e("settings.reportSize")});let v=m.createEl("tbody");for(let y of o.files){let x=v.createEl("tr");x.createEl("td",{text:y.fileName}),x.createEl("td").createSpan({cls:`pc-file-status ${y.success?"success":"failed"}`,text:y.success?e("settings.reportYes"):e("settings.reportNo")}),x.createEl("td",{text:y.success?this.formatSize(y.size):y.error||"\u2014"})}}if(o.categories.length>0){let g=s.createDiv({cls:"pc-report-section"});g.createDiv({cls:"pc-report-section-title",text:e("settings.reportCategories")});let m=g.createEl("table",{cls:"pc-report-table"}),f=m.createEl("thead").createEl("tr");f.createEl("th",{text:e("settings.reportCategory")}),f.createEl("th",{text:e("settings.reportFile")}),f.createEl("th",{text:e("settings.reportCount")}),f.createEl("th",{text:e("settings.reportParsed")});let v=m.createEl("tbody");for(let y of o.categories){let x=v.createEl("tr");x.createEl("td",{text:y.name}),x.createEl("td",{text:y.file}),x.createEl("td",{text:String(y.count)}),x.createEl("td").createSpan({cls:`pc-file-status ${y.parsed?"success":"failed"}`,text:y.parsed?e("settings.reportYes"):e("settings.reportNo")})}}}formatSize(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KB`:`${(t/(1024*1024)).toFixed(1)} MB`}formatTime(t){let e=new Date(t),o=s=>String(s).padStart(2,"0");return`${e.getFullYear()}-${o(e.getMonth()+1)}-${o(e.getDate())} ${o(e.getHours())}:${o(e.getMinutes())}:${o(e.getSeconds())}`}renderStatusBar(t,e){let o=t.createDiv({cls:"pc-status-bar"}),s=this.getRuleStats(),r=this.getVocabTokenStats(),n=o.createDiv({cls:"pc-status-counts"}),l=n.createDiv({cls:"pc-status-count-card pc-status-count-card-rules"}),c=l.createDiv({cls:"pc-status-count-head"});c.createSpan({text:e("status.activeRules")}),c.createSpan({cls:"pc-status-count-num pc-status-count-rules",text:`${s.active}/${s.total}`}),l.createDiv({cls:"pc-status-progress"}).createDiv({cls:"pc-status-progress-fill",attr:{style:`width: ${s.percent}%;`}});let d=n.createDiv({cls:"pc-status-count-card pc-status-count-card-vocabs"}),u=d.createDiv({cls:"pc-status-count-head"});u.createSpan({text:e("status.activeVocabTokens")}),u.createSpan({cls:"pc-status-count-num pc-status-count-vocabs",text:`${r.active}/${r.total}`}),d.createDiv({cls:"pc-status-progress"}).createDiv({cls:"pc-status-progress-fill",attr:{style:`width: ${r.percent}%;`}});let m=o.createDiv({cls:"pc-status-item"});m.createSpan({text:e("status.ruleSource")+": "}),m.createSpan({text:this.plugin.settings.ruleSource,attr:{style:"font-weight: 500;"}});let b=Object.keys(this.plugin.getColorTokens()).length,f=o.createDiv({cls:"pc-status-item"});f.createSpan({text:e("status.tokenCount")+": "}),f.createSpan({text:String(b),attr:{style:"font-weight: 500;"}})}getRuleStats(){let t=j.filter(o=>this.plugin.settings[o]===!0).length,e=j.length;return{active:t,total:e,percent:e?Math.round(t/e*100):0}}getVocabTokenStats(){let t=this.plugin.getVocabTokens(),e=t.filter(s=>s.enabled).length,o=t.length;return{active:e,total:o,percent:o?Math.round(e/o*100):0}}updateStatusBar(){let t=document.querySelector(".pc-status-bar");if(!t)return;let e=this.getRuleStats(),o=this.getVocabTokenStats(),s=t.querySelector(".pc-status-count-rules");s&&(s.textContent=`${e.active}/${e.total}`);let r=t.querySelector(".pc-status-count-card-rules .pc-status-progress-fill");r&&(r.style.width=`${e.percent}%`);let n=t.querySelector(".pc-status-count-vocabs");n&&(n.textContent=`${o.active}/${o.total}`);let l=t.querySelector(".pc-status-count-card-vocabs .pc-status-progress-fill");l&&(l.style.width=`${o.percent}%`)}renderPromptPackBar(t,e){var p;let o=t.createDiv({cls:"pc-agent-section pc-pack-section"}),s=o.createDiv({cls:"pc-agent-header"}),r=s.createDiv({cls:"pc-agent-title-wrap"});r.createSpan({cls:"pc-agent-title",text:e("pack.title")}),r.createSpan({cls:"pc-agent-desc",text:e("pack.desc")}),s.createEl("button",{cls:"pc-agent-new-btn",text:"+ "+e("pack.new")}).addEventListener("click",()=>this.createPromptPackFromCurrent(e));let l=o.createDiv({cls:"pc-agent-grid"}),c=(p=this.plugin.settings.promptPacks)!=null?p:[];for(let d of c)this.renderPromptPackCard(l,d,e)}renderPromptPackCard(t,e,o){let s=this.plugin.settings.activePackId===e.id,r=t.createDiv({cls:`pc-agent-card ${s?"active":""}`,attr:{"data-pack":e.id}}),n=r.createDiv({cls:"pc-agent-card-body"});n.createSpan({cls:"pc-agent-card-icon",text:e.icon||"\u{1F4E6}"});let l=n.createDiv({cls:"pc-agent-card-info"});l.createDiv({cls:"pc-agent-card-name",text:e.name}),e.description&&l.createDiv({cls:"pc-agent-card-desc",text:e.description});let c=n.createSpan({cls:"pc-agent-card-badge"});c.createSpan({cls:"pc-agent-card-badge-num",text:`${e.enabledKeys.length}+${e.vocabTokens.length}`}),c.createSpan({cls:"pc-agent-card-badge-label",text:" "+o("pack.rulesVocabCount")}),s&&n.createSpan({cls:"pc-agent-card-active",text:o("pack.active")}),n.addEventListener("click",async()=>{await this.applyPromptPack(e.id),new C.Notice(this.plugin.t("pack.applied"))});let p=r.createDiv({cls:"pc-agent-card-actions"});p.createEl("button",{cls:"pc-agent-action-btn",text:o("pack.rename"),attr:{"aria-label":o("pack.rename")}}).addEventListener("click",u=>{u.stopPropagation(),this.renamePromptPack(e.id,o)}),e.builtin?p.createEl("button",{cls:"pc-agent-action-btn",text:o("pack.reset"),attr:{"aria-label":o("pack.reset")}}).addEventListener("click",g=>{g.stopPropagation(),this.resetPromptPack(e.id)}):p.createEl("button",{cls:"pc-agent-action-btn pc-agent-action-danger",text:o("pack.delete"),attr:{"aria-label":o("pack.delete")}}).addEventListener("click",g=>{g.stopPropagation(),this.deletePromptPack(e.id,o)})}async applyPromptPack(t){var p,d,u;let e=this.plugin.settings.promptPacks.find(g=>g.id===t);if(!e)return;let o=this.plugin.settings;for(let g of j)o[g]=!1;for(let g of e.enabledKeys)j.includes(g)&&(o[g]=!0);let s=new Set(e.vocabTokens),r={};for(let g of V)r[g.id]=s.has(g.id);o.vocabTokenEnabled=r,o.colorScheme=e.colorScheme,o.palettePreset=(p=e.palettePreset)!=null?p:"",o.activePackId=t;let n=j.filter(g=>o[g]===!0).map(String),l=new Set(n),c=((d=o.agentPresets)!=null?d:[]).find(g=>g.enabledKeys.length===l.size&&g.enabledKeys.every(m=>l.has(m)));o.activeAgentPresetId=(u=c==null?void 0:c.id)!=null?u:"",await this.plugin.saveSettings(),this.plugin.refreshEditorExtensions(),this.plugin.applyColorMode(),this.display()}resetPromptPack(t){let e=Ye.find(s=>s.id===t);if(!e)return;let o=this.plugin.settings.promptPacks.findIndex(s=>s.id===t);o<0||(this.plugin.settings.promptPacks[o]={...e},this.plugin.saveSettings().then(()=>{this.display(),new C.Notice(this.plugin.t("pack.resetDone"))}))}createPromptPackFromCurrent(t){new ie(this.app,t("pack.new"),t("pack.namePrompt"),t("pack.descPrompt"),"","",(e,o)=>{var c,p;if(!e){new C.Notice(this.plugin.t("pack.nameRequired"));return}let s=this.plugin.settings,r=j.filter(d=>s[d]===!0).map(String),n=V.filter(d=>{var u;return((u=s.vocabTokenEnabled)==null?void 0:u[d.id])!==!1}).map(d=>d.id),l={id:`pack-${Date.now()}`,name:e,description:o,icon:"\u{1F4E6}",direction:"image",enabledKeys:r,vocabTokens:n,colorScheme:(c=s.colorScheme)!=null?c:"default",palettePreset:(p=s.palettePreset)!=null?p:"",builtin:!1};s.promptPacks.push(l),s.activePackId=l.id,this.plugin.saveSettings().then(()=>{this.display(),new C.Notice(this.plugin.t("pack.created"))})}).open()}renamePromptPack(t,e){let o=this.plugin.settings.promptPacks.find(s=>s.id===t);o&&new ie(this.app,e("pack.rename"),e("pack.namePrompt"),e("pack.descPrompt"),o.name,o.description,(s,r)=>{if(!s){new C.Notice(this.plugin.t("pack.nameRequired"));return}o.name=s,o.description=r,this.plugin.saveSettings().then(()=>{this.display(),new C.Notice(this.plugin.t("pack.renamed"))})}).open()}deletePromptPack(t,e){let o=this.plugin.settings,s=o.promptPacks.find(r=>r.id===t);!s||s.builtin||re(this.containerEl,this.plugin.t.bind(this.plugin),e("pack.confirmDeleteTitle"),e("pack.confirmDeleteDesc"),async()=>{o.promptPacks=o.promptPacks.filter(r=>r.id!==t),o.activePackId===t&&(o.activePackId=""),await this.plugin.saveSettings(),this.display(),new C.Notice(this.plugin.t("pack.deleted"))})}renderAgentPresetBar(t,e){var p;let o=t.createDiv({cls:"pc-agent-section"}),s=o.createDiv({cls:"pc-agent-header"}),r=s.createDiv({cls:"pc-agent-title-wrap"});r.createSpan({cls:"pc-agent-title",text:e("agent.title")}),r.createSpan({cls:"pc-agent-desc",text:e("agent.desc")}),s.createEl("button",{cls:"pc-agent-new-btn",text:"+ "+e("agent.new")}).addEventListener("click",()=>this.createAgentPresetFromCurrent(e));let l=o.createDiv({cls:"pc-agent-grid"}),c=(p=this.plugin.settings.agentPresets)!=null?p:[];for(let d of c)this.renderAgentCard(l,d,e)}renderAgentCard(t,e,o){let s=this.plugin.settings.activeAgentPresetId===e.id,r=t.createDiv({cls:`pc-agent-card ${s?"active":""}`,attr:{"data-agent":e.id}}),n=r.createDiv({cls:"pc-agent-card-body"});n.createSpan({cls:"pc-agent-card-icon",text:e.icon||"\u2726"});let l=n.createDiv({cls:"pc-agent-card-info"});l.createDiv({cls:"pc-agent-card-name",text:e.name}),e.description&&l.createDiv({cls:"pc-agent-card-desc",text:e.description});let c=e.enabledKeys.length,p=n.createSpan({cls:"pc-agent-card-badge"});p.createSpan({cls:"pc-agent-card-badge-num",text:String(c)}),p.createSpan({cls:"pc-agent-card-badge-label",text:" "+o("agent.rulesCount")}),s&&n.createSpan({cls:"pc-agent-card-active",text:o("agent.active")}),n.addEventListener("click",async()=>{await this.applyAgentPreset(e.id),new C.Notice(this.plugin.t("agent.applied"))});let d=r.createDiv({cls:"pc-agent-card-actions"});d.createEl("button",{cls:"pc-agent-action-btn",text:o("agent.rename"),attr:{"aria-label":o("agent.rename")}}).addEventListener("click",m=>{m.stopPropagation(),this.renameAgentPreset(e.id,o)}),d.createEl("button",{cls:"pc-agent-action-btn pc-agent-action-danger",text:o("agent.delete"),attr:{"aria-label":o("agent.delete")}}).addEventListener("click",m=>{m.stopPropagation(),this.deleteAgentPreset(e.id,o)})}async applyAgentPreset(t){let e=this.plugin.settings.agentPresets.find(r=>r.id===t);if(!e)return;let o=this.plugin.settings;for(let r of j)o[r]=!1;let s=j;for(let r of e.enabledKeys)s.includes(r)&&(o[r]=!0);o.activeAgentPresetId=t,await this.plugin.saveSettings(),this.plugin.refreshEditorExtensions(),this.display()}detectActiveAgentPreset(){var n,l;let t=this.plugin.settings,e=j.filter(c=>t[c]===!0).map(c=>String(c)),o=new Set(e),s=((n=t.agentPresets)!=null?n:[]).find(c=>c.enabledKeys.length!==o.size?!1:c.enabledKeys.every(p=>o.has(p))),r=(l=s==null?void 0:s.id)!=null?l:"";r!==t.activeAgentPresetId&&(t.activeAgentPresetId=r,this.plugin.saveSettings(),document.querySelectorAll(".pc-agent-card").forEach(c=>{let p=c;p.toggleClass("active",p.dataset.agent===r)}))}createAgentPresetFromCurrent(t){new ie(this.app,t("agent.new"),t("agent.namePrompt"),t("agent.descPrompt"),"","",(e,o)=>{if(!e){new C.Notice(this.plugin.t("agent.nameRequired"));return}let s=j.filter(n=>this.plugin.settings[n]===!0).map(n=>String(n)),r={id:`agent-${Date.now()}`,name:e,description:o,icon:"\u2727",enabledKeys:s};this.plugin.settings.agentPresets.push(r),this.plugin.settings.activeAgentPresetId=r.id,this.plugin.saveSettings().then(()=>{this.display(),new C.Notice(this.plugin.t("agent.created"))})}).open()}renameAgentPreset(t,e){let o=this.plugin.settings.agentPresets.find(s=>s.id===t);o&&new ie(this.app,e("agent.rename"),e("agent.namePrompt"),e("agent.descPrompt"),o.name,o.description,(s,r)=>{if(!s){new C.Notice(this.plugin.t("agent.nameRequired"));return}o.name=s,o.description=r,this.plugin.saveSettings().then(()=>{this.display(),new C.Notice(this.plugin.t("agent.renamed"))})}).open()}deleteAgentPreset(t,e){this.plugin.settings.agentPresets.find(s=>s.id===t)&&re(this.containerEl,this.plugin.t.bind(this.plugin),e("agent.confirmDeleteTitle"),e("agent.confirmDeleteDesc"),async()=>{this.plugin.settings.agentPresets=this.plugin.settings.agentPresets.filter(s=>s.id!==t),this.plugin.settings.activeAgentPresetId===t&&(this.plugin.settings.activeAgentPresetId=""),await this.plugin.saveSettings(),this.display(),new C.Notice(this.plugin.t("agent.deleted"))})}renderPreviewCard(t,e){$(t,e("preview.title"),e("preview.desc"),"display",o=>{let s=o.createDiv({cls:"pc-preview-input-wrap"});s.createDiv({cls:"pc-preview-label",text:e("preview.inputLabel")});let r=s.createEl("textarea",{cls:"pc-preview-input",attr:{rows:"5",placeholder:e("preview.placeholder")}}),n=this.previewText||ne.PREVIEW_SAMPLE;r.value=n,this.previewText=n;let l=o.createDiv({cls:"pc-preview-output-wrap"});l.createDiv({cls:"pc-preview-label",text:e("preview.outputLabel")});let c=l.createDiv({cls:"pc-preview-sample"}),p=()=>{let d=r.value;this.previewText=d;let u=this.plugin.highlightTextToHtml(d);if(!u||u.trim().length===0){c.empty(),c.createDiv({cls:"pc-preview-empty",text:e("preview.empty")});return}c.innerHTML=u};r.addEventListener("input",p),p()})}updatePreviewCard(){let t=document.querySelector(".pc-preview-sample");if(!t)return;let e=this.previewText||ne.PREVIEW_SAMPLE,o=this.plugin.highlightTextToHtml(e);t.innerHTML=o||""}};ne.TOKEN_GROUPS=[{titleKey:"settings.tokenGroupBasic",descKey:"settings.tokenGroupBasicDesc",tokens:["danger","success","warning","info","purple","cyan","pink","amber","orange","paren"],defaultExpanded:!0},{titleKey:"settings.tokenGroupExtended",descKey:"settings.tokenGroupExtendedDesc",tokens:["indigo","emerald","slate","darkslate","yellow"],defaultExpanded:!1},{titleKey:"settings.tokenGroupMultimodal",descKey:"settings.tokenGroupMultimodalDesc",tokens:["music"],defaultExpanded:!1}],ne.PREVIEW_SAMPLE=["<system>\u4F60\u662F\u8D44\u6DF1\u63D0\u793A\u8BCD\u5DE5\u7A0B\u5E08</system>","<user>\u8BF7\u4E3A {{\u4E3B\u9898}} \u8BBE\u8BA1\u5206\u955C\uFF1A</user>","\u3010\u6574\u4F53\u8BBE\u5B9A\u3011\u955C\u59341\uFF083\u79D2\uFF09\u63A8\u955C\u5934\u5165\u573A\uFF0C\u300C\u5979\u8F6C\u8EAB\u5FAE\u7B11\u300D\u3002","\u666F\u522B\uFF1A\u7279\u5199  \u8FD0\u955C\uFF1A\u63A8  \u5149\u5F71\uFF1A3200K","\u6392\u9664\uFF1A\u4F4E\u4FD7\u3001\u6A21\u7CCA\uFF1B<lora:film-grain:0.8> (masterpiece:1.3)"].join(`
`);var Re=ne;var Ne=require("@codemirror/state"),be=require("@codemirror/view");function It(a){let i=a.replace(/^\uFEFF/,""),t=[];for(let o of i.split(`
`)){let s=o.replace(/\r$/,"");if(s.trim()===""||/^\s*#/.test(s))continue;let r=Ko(s);r.trim()!==""&&t.push(r)}return new et(t).parseObject(0)}function Ko(a){let i=!1,t=!1;for(let e=0;e<a.length;e++){let o=a[e];if(o==="'"&&!t)i=!i;else if(o==='"'&&!i)t=!t;else if(o==="#"&&!i&&!t&&(e===0||/\s/.test(a[e-1])))return a.slice(0,e)}return a}function Le(a){let i=a.match(/^(\s*)/);return i?i[1].length:0}function Uo(a){let i=a.trim();return i.startsWith("'")&&i.endsWith("'")?i.slice(1,-1).replace(/''/g,"'"):i.startsWith('"')&&i.endsWith('"')?i.slice(1,-1).replace(/\\"/g,'"').replace(/\\n/g,`
`).replace(/\\t/g,"	"):i}function Q(a){let i=a.trim();return i.startsWith("'")&&i.endsWith("'")||i.startsWith('"')&&i.endsWith('"')?Uo(i):i==="true"||i==="True"||i==="TRUE"?!0:i==="false"||i==="False"||i==="FALSE"?!1:i==="null"||i==="Null"||i==="~"?"":/^-?\d+$/.test(i)?parseInt(i,10):/^-?\d+\.\d+$/.test(i)?parseFloat(i):i}function Me(a){let i=a.trim();if(!i.startsWith("[")||!i.endsWith("]"))return[Q(i)];let t=i.slice(1,-1);if(t.trim()==="")return[];let e=[],o="",s=!1,r="";for(let n=0;n<t.length;n++){let l=t[n];!s&&(l==="'"||l==='"')?(s=!0,r=l,o+=l):s&&l===r?(s=!1,o+=l):l===","&&!s?(e.push(o),o=""):o+=l}return o.trim()&&e.push(o),e.map(n=>Q(n))}function Yo(a){let i=!1,t=!1;for(let e=0;e<a.length;e++){let o=a[e];if(o==="'"&&!t)i=!i;else if(o==='"'&&!i)t=!t;else if(o===":"&&!i&&!t&&(e===a.length-1||a[e+1]===" "||a[e+1]==="	"))return e}return-1}function Ae(a){let i=a.trim();if(!i.startsWith("{")||!i.endsWith("}"))return{};let t=i.slice(1,-1);if(t.trim()==="")return{};let e=[],o="",s=!1,r=!1;for(let l=0;l<t.length;l++){let c=t[l];c==="'"&&!r?(s=!s,o+=c):c==='"'&&!s?(r=!r,o+=c):c===","&&!s&&!r?(e.push(o),o=""):o+=c}o.trim()&&e.push(o);let n={};for(let l of e){let c=Yo(l);if(c>0){let p=l.slice(0,c).trim(),d=l.slice(c+1).trim();d.startsWith("[")?n[p]=Me(d):d.startsWith("{")?n[p]=Ae(d):n[p]=Q(d)}}return n}var et=class{constructor(i){this.pos=0;this.lines=i}parseObject(i){let t={};for(;this.pos<this.lines.length;){let e=this.lines[this.pos],o=Le(e);if(o<i)break;if(o>i){this.pos++;continue}let s=e.slice(o),r=this.findColon(s);if(r===-1){this.pos++;continue}let n=s.slice(0,r).trim(),l=s.slice(r+1).trim();if(l===""){this.pos++;let c=this.peekNextIndent();if(c>o){let p=this.lines[this.pos];p&&p.trim().startsWith("-")?t[n]=this.parseArray(c):t[n]=this.parseObject(c)}else t[n]=""}else l.startsWith("[")?(t[n]=Me(l),this.pos++):l.startsWith("{")?(t[n]=Ae(l),this.pos++):(t[n]=Q(l),this.pos++)}return t}parseArray(i){let t=[];for(;this.pos<this.lines.length;){let e=this.lines[this.pos],o=Le(e);if(o<i)break;if(o>i){this.pos++;continue}let s=e.slice(o);if(!s.startsWith("-"))break;let r=s.slice(1).trim();if(r===""){this.pos++;let n=this.peekNextIndent();n>o?t.push(this.parseObject(n)):t.push("")}else if(r.includes(":")&&!r.startsWith("'")&&!r.startsWith('"')){let n=this.findColon(r);if(n>0){let l=r.slice(0,n).trim(),c=r.slice(n+1).trim(),p={};if(c===""){this.pos++;let d=this.peekNextIndent();d>o+2?p[l]=this.parseObject(d):p[l]=""}else c.startsWith("[")?(p[l]=Me(c),this.pos++):c.startsWith("{")?(p[l]=Ae(c),this.pos++):(p[l]=Q(c),this.pos++);for(;this.pos<this.lines.length;){let d=this.lines[this.pos],u=Le(d);if(u<=o||d.trim().startsWith("-"))break;let g=d.slice(u),m=this.findColon(g);if(m>0){let b=g.slice(0,m).trim(),f=g.slice(m+1).trim();if(f===""){this.pos++;let v=this.peekNextIndent();v>u?p[b]=this.parseObject(v):p[b]=""}else f.startsWith("[")?(p[b]=Me(f),this.pos++):f.startsWith("{")?(p[b]=Ae(f),this.pos++):(p[b]=Q(f),this.pos++)}else this.pos++}t.push(p)}else t.push(Q(r)),this.pos++}else t.push(Q(r)),this.pos++}return t}findColon(i){let t=!1,e=!1;for(let o=0;o<i.length;o++){let s=i[o];if(s==="'"&&!e)t=!t;else if(s==='"'&&!t)e=!e;else if(s===":"&&!t&&!e&&(o===i.length-1||i[o+1]===" "||i[o+1]==="	"))return o}return-1}peekNextIndent(){return this.pos>=this.lines.length?-1:Le(this.lines[this.pos])}};var Ft="2.8.0",Bt="2026-09-03",Jo=`# \u57FA\u7840\u7ED3\u6784\u6B63\u5219\u89C4\u5219\uFF08\u6838\u5FC3\uFF0C\u65E0\u8BCD\u5178\u4F9D\u8D56\uFF09
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

  # \u4E2D\u6587\u5F15\u53F7\u53F0\u8BCD\uFF1A"..." \u300C...\u300D
  dialogue_cn:
    regex: '[""\u300C]([^""\u300D]+)[""\u300D]'
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

  # \u663E\u5F0F\u6807\u8BC6\u7B26\uFF1A\u300C\u6807\u8BC6\u7B26\u300D\u3001\u300E\u6807\u8BC6\u7B26\u300F\uFF08\u501F\u9274\u6587\u8A00\u7684\u6807\u8BC6\u7B26\u5305\u88F9\u673A\u5236\uFF09
  explicit_identifier:
    regex: '\u300C([^\u300D]+)\u300D|\u300E([^\u300F]+)\u300F'
    cssClass: "dsl-explicit-identifier"
    captureGroup: 0
    priority: 65
    flags: 'g'

  # \u663E\u5F0F\u5B57\u7B26\u4E32\uFF1A\u300C"\u5B57\u7B26\u4E32"\u300D\u3001\u300E"\u5B57\u7B26\u4E32"\u300F\uFF08\u53CC\u5C42\u5F15\u53F7\uFF0C\u501F\u9274\u6587\u8A00\u5B57\u9762\u91CF\u8BED\u6CD5\uFF09
  explicit_string:
    regex: '\u300C"([^"]+)"\u300D|\u300E"([^"]+)"\u300F'
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

  # \u4E25\u683C\u4E2D\u6587\u5F15\u53F7\u53F0\u8BCD\uFF1A\u524D\u4F4D\u4E3A\u884C\u9996/\u7A7A\u683C/\u6807\u70B9/\u8BF4\u5B57\uFF08\u540E\u4F4D\u4E0D\u9650\u5236\uFF0C\u5141\u8BB8\u53F0\u8BCD\u540E\u63A5\u52A8\u8BCD\uFF09
  dialogue_cn_strict:
    regex: '(?<=^|s|[\uFF0C\u3002\u3001\uFF1B\uFF1A]|\u8BF4)[""\u300C]([^""\u300D]+)[""\u300D]'
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
`,Xo=`# \u4E0A\u4E0B\u6587\u8BED\u4E49\u4F53\u7CFB\uFF08\u9AD8\u7EA7\u7740\u8272\u6838\u5FC3\uFF09
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
`,Qo=`# \u53EF\u9009\u4E1A\u52A1\u8BCD\u5178\uFF08\u8F7B\u91CF\u5316\uFF09
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
`,Zo=`# \u52A8\u6001\u989C\u8272\u914D\u7F6E \u2014 \u989C\u8272\u5B8C\u5168\u7531 YAML \u9A71\u52A8\uFF0C\u652F\u6301\u65E0\u9650\u6269\u5C55
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
    background: "purple.soft"
    border: "1px solid purple.border"
    borderRadius: "8px"
    padding: "1px 12px"

  dsl-shot-header:
    color: "cyan"
    fontWeight: "bold"

  dsl-asset:
    color: "amber"
    fontWeight: "600"

  dsl-asset-bracket:
    color: "amber"
    fontWeight: "500"

  dsl-param-key:
    color: "info"
    fontWeight: "600"

  dsl-dialogue:
    color: "success"
    fontStyle: "italic"
    background: "success.soft"
    borderRadius: "4px"
    padding: "0 2px"

  # \u4E2D\u6587\u5F15\u53F7\u300C\u300D\u300E\u300F\u5F31\u5316\uFF08v2.4.1 \u65B0\u589E\uFF0C\u7A81\u51FA\u5F15\u53F7\u5185\u53F0\u8BCD\uFF09
  dsl-dialogue-quote:
    color: "paren"
    opacity: "0.60"

  dsl-constraint:
    color: "danger"
    fontWeight: "600"
    background: "danger.soft"
    borderRadius: "4px"
    padding: "0 2px"

  dsl-tech-param:
    color: "warning"
    fontWeight: "600"

  dsl-parenthetical:
    color: "paren"
    fontStyle: "italic"
    opacity: "0.70"

  dsl-variable:
    color: "warning"
    fontWeight: "600"

  dsl-role-tag:
    color: "purple"
    fontWeight: "bold"

  dsl-instruction:
    color: "purple"
    fontWeight: "bold"

  # ============================================================
  # \u4E8C\u3001SD/ComfyUI \u6269\u5C55
  # ============================================================
  dsl-emphasis-weight:
    color: "warning"
    fontWeight: "600"
    background: "warning.soft"
    borderRadius: "4px"
    padding: "0 2px"

  dsl-lora-ref:
    color: "amber"
    fontWeight: "bold"
    background: "amber.soft"
    borderRadius: "4px"
    padding: "0 2px"

  dsl-bracket-strong:
    color: "info"
    fontWeight: "bold"

  dsl-bracket-weak:
    color: "paren"
    opacity: "0.75"

  dsl-quality-tag:
    color: "success"
    fontWeight: "600"

  dsl-sd-negative-header:
    color: "danger"
    fontWeight: "bold"
    background: "danger.soft"
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
    background: "warning.soft"
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

  # \u8868\u683C\u884C
  dsl-md-table-row:
    color: "slate"
    fontFamily: "monospace"

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

  # \u952E\u76D8\u5FEB\u6377\u952E
  dsl-kbd-tag:
    color: "slate"
    fontWeight: "600"
    fontFamily: "monospace"
    background: "slate.soft"
    borderRadius: "4px"
    padding: "1px 6px"
    border: "1px solid slate.border"

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
`,es=`# \u4F18\u5148\u7EA7\u63A7\u5236\uFF08\u89E3\u51B3\u591A\u5C42\u9AD8\u4EAE\u8986\u76D6\u51B2\u7A81\uFF09
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
`,ts=`# ============================================================
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
`,os=`# ============================================================
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
`,ss=`# ============================================================
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

`,rs=`# ============================================================
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

`,is=`# ============================================================
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

`,ns=`# ============================================================
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

`,as=`# ============================================================
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

`,ls=`# ============================================================
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

`,cs=`# ============================================================
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
`,ps=`# ============================================================
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
`,ds=`# ============================================================
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
`,us=`# ============================================================
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
`,gs=`# ============================================================
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
`;function Gt(){return{"01-base-patterns.yaml":Jo,"02-semantic-context.yaml":Xo,"03-lexicon-optional.yaml":Qo,"04-theme-color.yaml":Zo,"05-priority.yaml":es,"06-char-lexicon.yaml":ts,"07-word-lexicon.yaml":os,"07a-constraint-tech-phrase.yaml":ss,"07b-narrative-scene-phrase.yaml":rs,"07c-camera-action-phrase.yaml":is,"07d-english-core-phrase.yaml":ns,"07e-english-extended-phrase.yaml":as,"07f-english-subject-phrase.yaml":ls,"07g-director-cinematography.yaml":cs,"07h-director-lighting-color.yaml":ps,"07i-director-editing-sound.yaml":ds,"07j-director-performance-screenplay.yaml":us,"07k-director-genre-production.yaml":gs}}var Ht={maxWordLength:6,minWordLength:2},$t=new Set;function hs(a,i){let t=new Set,e=/[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/;for(let o of a)e.test(o.regex.source)&&t.add(o.cssClass);for(let o of i)e.test(o.regex.source)&&t.add(o.cssClass);return t}function ye(a,i="",t=""){var e,o,s,r,n,l,c,p,d,u;try{let g=U(a["01-base-patterns.yaml"]),m=U(a["02-semantic-context.yaml"]),b=U(a["03-lexicon-optional.yaml"]),f=U(a["04-theme-color.yaml"]),v=U(a["05-priority.yaml"]);if(!g)return console.error("[PromptColorizer] \u57FA\u7840\u6A21\u5F0F\u914D\u7F6E\u89E3\u6790\u5931\u8D25"),null;let y=(e=v==null?void 0:v.defaultPatternPriority)!=null?e:30,x=(o=v==null?void 0:v.lexiconPriority)!=null?o:80,S=ms(g.patterns,y),R=fs(b,x),w=ys(m),T=(s=f==null?void 0:f.styleRules)!=null?s:{},L=(r=f==null?void 0:f.colors)!=null?r:{},G=(n=m==null?void 0:m.scanStateEnum)!=null?n:{Normal:0,InQuoteDialogue:1,InBlockWrapper:2};$t=hs(S,R);let E=U(a["06-char-lexicon.yaml"]),k=U(a["06-char-lexicon.yaml"]),P=bs(E==null?void 0:E.charLexicon),A=vs(k==null?void 0:k.combinationRules),M=U(a["07-word-lexicon.yaml"]);M||console.warn("[PromptColorizer] 07-word-lexicon.yaml \u7D22\u5F15\u6587\u4EF6\u7F3A\u5931\uFF0C\u4F7F\u7528\u9ED8\u8BA4 segmenterConfig");let I={maxWordLength:(c=(l=M==null?void 0:M.segmenterConfig)==null?void 0:l.maxWordLength)!=null?c:Ht.maxWordLength,minWordLength:(d=(p=M==null?void 0:M.segmenterConfig)==null?void 0:p.minWordLength)!=null?d:Ht.minWordLength},W=Cs(xs(a));return{rules:S,lexicons:R,contextRules:w,colorTokens:L,palettes:(u=f==null?void 0:f.palettes)!=null?u:{},styleRules:T,scanStateEnum:G,version:i,updateTime:t,charLexicon:P,combinationRules:A,wordLexiconGroups:W,segmenterConfig:I}}catch(g){return console.error("[PromptColorizer] \u89C4\u5219\u96C6\u7F16\u8BD1\u5931\u8D25:",g),null}}function U(a){if(!a)return null;try{return It(a)}catch(i){return console.error("[PromptColorizer] \u914D\u7F6E\u89E3\u6790\u5931\u8D25:",i),null}}function ms(a,i){var e,o,s;if(!a)return[];let t=[];for(let[r,n]of Object.entries(a))try{let l=n.flags||"g",c=new RegExp(n.regex,l);t.push({id:r,regex:c,cssClass:n.cssClass,priority:(e=n.priority)!=null?e:i,blockLevel:(o=n.blockLevel)!=null?o:!1,captureGroup:(s=n.captureGroup)!=null?s:0,subClass:n.subClass})}catch(l){console.warn(`[PromptColorizer] \u6B63\u5219\u7F16\u8BD1\u5931\u8D25: ${r}`,l)}return t.sort((r,n)=>n.priority-r.priority),t}function fs(a,i){if(!(a!=null&&a.lexicon)||!(a!=null&&a.cssClassMap))return[];let t=[];for(let[e,o]of Object.entries(a.lexicon)){if(!o||o.length===0)continue;let s=a.cssClassMap[e];if(!s)continue;let n=o.map(l=>l.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).sort((l,c)=>c.length-l.length).join("|");try{let c=o.some(p=>/[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/.test(p))?new RegExp(`(${n})`,"gi"):new RegExp(`\\b(${n})\\b`,"gi");t.push({category:e,regex:c,cssClass:s,priority:i,words:[...o]})}catch(l){console.warn(`[PromptColorizer] \u8BCD\u5178\u6B63\u5219\u7F16\u8BD1\u5931\u8D25: ${e}`,l)}}return t}function ys(a){if(!(a!=null&&a.contextMap))return[];let i=[];for(let[t,e]of Object.entries(a.contextMap))e!=null&&e.allowPatterns&&i.push({blockMarker:t,allowPatterns:e.allowPatterns});return i}function bs(a){let i=new Map;if(!a)return i;for(let t of Object.values(a))if(!(!t||typeof t!="object"))for(let[e,o]of Object.entries(t))o&&typeof o.pos=="string"&&(i.has(e)||i.set(e,{pos:o.pos,category:o.category}));return i}function vs(a){if(!a||!Array.isArray(a))return[];let i=[];for(let t of a){if(!t.name||!t.cssClass||typeof t.priority!="number"){console.warn("[PromptColorizer] \u7EC4\u5408\u89C4\u5219\u7F3A\u5C11\u5FC5\u586B\u5B57\u6BB5\uFF0C\u5DF2\u8DF3\u8FC7:",t);continue}i.push({name:t.name,rule:t,followedByRegex:t.followedBy?new RegExp(t.followedBy):null,priority:t.priority,cssClass:t.cssClass})}return i.sort((t,e)=>e.priority-t.priority),i}function zt(a,i,t,e){var c,p,d,u,g;if(!a||!t||e.length===0)return null;let o=a.length,s=a[0],r=a[o-1],n=(c=t.get(s))!=null?c:{pos:"unknown"},l=(p=t.get(r))!=null?p:{pos:"unknown"};for(let m of e){let b=m.rule;if(!(o<b.length.min||o>b.length.max)&&!(b.firstCharPos&&n.pos!==b.firstCharPos)&&!(b.firstCharCategory&&n.category!==b.firstCharCategory)&&!(b.lastCharPos&&l.pos!==b.lastCharPos)){if(b.midCharPos&&o>=3){let f=a[1];if(((d=t.get(f))!=null?d:{pos:"unknown"}).pos!==b.midCharPos)continue}if(!(m.followedByRegex&&(!i||!m.followedByRegex.test(i)))){if(b.separator&&b.samePosRequired){let f=a.indexOf(b.separator);if(f===-1)continue;let v=a.substring(0,f),y=a.substring(f+b.separator.length);if(!v||!y)continue;let x=(u=t.get(v[v.length-1]))!=null?u:{pos:"unknown"},S=(g=t.get(y[0]))!=null?g:{pos:"unknown"};if(x.pos!==S.pos||b.lastCharPos&&l.pos!==b.lastCharPos)continue}return m.cssClass}}}return null}function xs(a){let i=Object.keys(a).filter(e=>e.startsWith("07")&&e.endsWith(".yaml")).sort();if(i.length===0)return;let t={};for(let e of i){let o=U(a[e]);if(o!=null&&o.wordLexicon)for(let[s,r]of Object.entries(o.wordLexicon)){if(s in t){console.warn("[PromptColorizer] wordLexicon \u5206\u7EC4\u91CD\u540D:",s,`(\u6765\u81EA ${e}\uFF0C\u5DF2\u4FDD\u7559\u5148\u52A0\u8F7D\u7684\u5B9A\u4E49)`);continue}t[s]=r}}return Object.keys(t).length>0?t:void 0}function Cs(a){if(!a||typeof a!="object")return[];let i=[];for(let[t,e]of Object.entries(a)){if(!e||typeof e!="object")continue;if(!e.cssClass||typeof e.priority!="number"||!Array.isArray(e.words)){console.warn("[PromptColorizer] \u8BCD\u7EC4\u8BCD\u5178\u5206\u7EC4\u7F3A\u5C11\u5FC5\u586B\u5B57\u6BB5\uFF0C\u5DF2\u8DF3\u8FC7:",t);continue}let o=new Set,s=0;for(let r of e.words){if(typeof r!="string"||r.length===0)continue;let n=/[a-zA-Z]/.test(r)?r.toLowerCase():r;o.add(n),r.length>s&&(s=r.length)}o.size!==0&&i.push({name:t,cssClass:e.cssClass,priority:e.priority,followedByRegex:e.followedBy?new RegExp(e.followedBy):null,wordSet:o,maxWordLength:s})}return i.sort((t,e)=>e.priority-t.priority),i}function tt(a,i,t,e,o){if(e.length===0||i>=t)return[];let s=[],r=Math.max(o.maxWordLength,...e.map(p=>p.maxWordLength)),n=o.minWordLength,l=a.length,c=i;for(;c<t;){let p=a.charAt(c),d=/[a-zA-Z]/.test(p),u=p==="-"&&c+1<t&&/[a-zA-Z\-]/.test(a.charAt(c+1)),g=!1;if(/\d/.test(p))for(let f=c+1;f<Math.min(c+4,t);f++){let v=a.charAt(f);if(/[a-zA-Z]/.test(v)){g=!0;break}if(!/\d/.test(v))break}if(d||u||g){let f=c+1;for(;f<t&&/[a-zA-Z\s\-\d.\/]/.test(a.charAt(f));)f++;for(;f>c+1&&/[\s.\-\/]/.test(a.charAt(f-1));)f--;let v=!1,y=Math.min(r,f-c);for(let x=y;x>=n;x--){let S=a.substring(c,c+x).toLowerCase();for(let R of e)if(!(x>R.maxWordLength)&&R.wordSet.has(S)){if(R.followedByRegex){let w=c+x<l?a.charAt(c+x):"";if(!w||!R.followedByRegex.test(w))continue}s.push({from:c,to:c+x,cssClass:R.cssClass,priority:R.priority,ruleId:`word-lexicon:${R.name}`}),c+=x,v=!0;break}if(v)break}v||(c=f);continue}if(!/[\u4e00-\u9fff]/.test(p)){c++;continue}let m=!1,b=Math.min(r,t-c);for(let f=b;f>=n;f--){let v=a.substring(c,c+f);for(let y of e)if(!(f>y.maxWordLength)&&y.wordSet.has(v)){if(y.followedByRegex){let x=c+f<l?a.charAt(c+f):"";if(!x||!y.followedByRegex.test(x))continue}s.push({from:c,to:c+f,cssClass:y.cssClass,priority:y.priority,ruleId:`word-lexicon:${y.name}`}),c+=f,m=!0;break}if(m)break}m||c++}return s}function ot(){let a=Gt();return ye(a,Ft,Bt)}function O(a,i){let t=a.replace("#",""),e=parseInt(t.substring(0,2),16),o=parseInt(t.substring(2,4),16),s=parseInt(t.substring(4,6),16);return`rgba(${e}, ${o}, ${s}, ${i})`}function ws(a){let i=a.replace("#",""),t=parseInt(i.substring(0,2),16)/255,e=parseInt(i.substring(2,4),16)/255,o=parseInt(i.substring(4,6),16)/255,s=Math.max(t,e,o),r=Math.min(t,e,o),n=(s+r)/2;if(s===r)return{h:0,s:0,l:n};let l=s-r,c=n>.5?l/(2-s-r):l/(s+r),p;return s===t?p=((e-o)/l+(e<o?6:0))/6:s===e?p=((o-t)/l+2)/6:p=((t-e)/l+4)/6,{h:p*360,s:c,l:n}}function Ie(a,i,t){a=(a%360+360)%360,i=Math.min(1,Math.max(0,i)),t=Math.min(1,Math.max(0,t));let e=(1-Math.abs(2*t-1))*i,o=e*(1-Math.abs(a/60%2-1)),s=t-e/2,r=0,n=0,l=0;a<60?(r=e,n=o):a<120?(r=o,n=e):a<180?(n=e,l=o):a<240?(n=o,l=e):a<300?(r=o,l=e):(r=e,l=o);let c=p=>Math.round((p+s)*255).toString(16).padStart(2,"0");return`#${c(r)}${c(n)}${c(l)}`}function Nt(a,i){if(!a||!a.startsWith("#")||i==="default")return a;let{h:t,s:e,l:o}=ws(a);if(e<.02)return a;switch(i){case"soft":return Ie(t,e*.6,o);case"mono":return Ie(t,e*.12,o);case"vivid":return Ie(t,Math.min(1,e*1.2),o);case"contrast":{let s=o>.5?Math.max(.06,o-.15):Math.min(.94,o+.15);return Ie(t,Math.min(1,e*1.1),s)}default:return a}}var ks={softLight:.06,softDark:.1,softCnBoost:.02,borderLight:.15,borderDark:.2,borderCnBoost:.03},Z=a=>Math.min(.6,Math.max(.01,a));function st(a,i="default",t={}){if(Object.keys(a).length===0)return"";let e={...ks,...t},o=`/* \u52A8\u6001\u989C\u8272\u4EE4\u724C \u2014 \u7531 YAML colors \u533A\u5757\u81EA\u52A8\u751F\u6210 */

`;o+=`:root {
`;for(let[s,r]of Object.entries(a)){let n=Nt(r.light||"#888888",i);o+=`  --dsl-${s}: ${n};
`,o+=`  --dsl-${s}-soft: ${O(n,Z(e.softLight))};
`,o+=`  --dsl-${s}-soft-cn: ${O(n,Z(e.softLight+e.softCnBoost))};
`,o+=`  --dsl-${s}-border: ${O(n,Z(e.borderLight))};
`,o+=`  --dsl-${s}-border-cn: ${O(n,Z(e.borderLight+e.borderCnBoost))};
`,o+=`  --dsl-${s}-glow: 0 0 2px ${O(n,.55)}, 0 0 6px ${O(n,.3)}, 0 0 14px ${O(n,.12)};
`}o+=`}

`,o+=`body.theme-dark {
`;for(let[s,r]of Object.entries(a)){let n=Nt(r.dark||r.light||"#888888",i);o+=`  --dsl-${s}: ${n};
`,o+=`  --dsl-${s}-soft: ${O(n,Z(e.softDark))};
`,o+=`  --dsl-${s}-soft-cn: ${O(n,Z(e.softDark+e.softCnBoost))};
`,o+=`  --dsl-${s}-border: ${O(n,Z(e.borderDark))};
`,o+=`  --dsl-${s}-border-cn: ${O(n,Z(e.borderDark+e.borderCnBoost))};
`,o+=`  --dsl-${s}-glow: 0 0 2px ${O(n,.75)}, 0 0 8px ${O(n,.45)}, 0 0 18px ${O(n,.18)};
`}return o+=`}

`,o}function z(a,i,t){if(!a||typeof a!="string")return a;let e=a.trim();if(/^var\(--[\w-]+\)$/.test(e)||/^#[0-9a-fA-F]{3,8}$/.test(e)||/^(rgba?|hsla?)\(/i.test(e)||/^(transparent|none|inherit|initial|unset)$/i.test(e))return e;let o=e.match(/^([a-zA-Z_][\w-]*)$/);if(o){let n=o[1];return i[n]?`var(--dsl-${n})`:e}let s=e.match(/^([a-zA-Z_][\w-]*)\.(soft|border|glow)$/);if(s){let n=s[1],l=s[2];if(i[n]){let c=l==="glow"?l:t?`${l}-cn`:l;return`var(--dsl-${n}-${c})`}return e}let r=e.match(/^mix\(\s*([\w#-]+)\s*,\s*([\w#-]+)\s*(?:,\s*([\d.]+)\s*)?\)$/);if(r){let n=p=>i[p]?`var(--dsl-${p})`:/^#[0-9a-fA-F]{3,8}$/.test(p)?p:null,l=n(r[1]),c=n(r[2]);if(l&&c){let p=r[3]?parseInt(r[3],10):50;return`color-mix(in oklab, ${l}, ${c} ${p}%)`}return e}return e.replace(/\b([a-zA-Z_][\w-]*(?:\.(?:soft|border|glow))?)\b/g,n=>{if(/^(solid|dashed|dotted|none|hidden|medium|thick|thin|px|em|rem|vh|vw|%|auto|center|left|right|top|bottom|bold|normal|italic|underline|none|block|inline|flex|grid)$/i.test(n))return n;let l=n.split("."),c=l[0],p=l[1];if(i[c]){if(p==="glow")return`var(--dsl-${c}-glow)`;if(p==="soft"||p==="border"){let d=t?`${p}-cn`:p;return`var(--dsl-${c}-${d})`}return`var(--dsl-${c})`}return n})}function Ot(a,i,t){let e=[];return a.color&&e.push(`  color: ${z(a.color,i,t)};`),a.fontWeight&&(t&&a.fontWeight==="bold"?e.push("  font-weight: var(--pc-weight-bold-cn);"):e.push(`  font-weight: ${a.fontWeight};`)),a.fontStyle&&e.push(`  font-style: ${a.fontStyle};`),a.fontFamily&&(a.fontFamily==="monospace"?e.push("  font-family: var(--pc-font-mono);"):e.push(`  font-family: ${a.fontFamily};`)),a.fontSize&&e.push(`  font-size: ${a.fontSize};`),a.textDecoration&&e.push(`  text-decoration: ${a.textDecoration};`),a.background&&e.push(`  background: ${z(a.background,i,t)};`),a.border&&e.push(`  border: ${z(a.border,i,t)};`),a.borderBottom&&e.push(`  border-bottom: ${z(a.borderBottom,i,t)};`),a.borderLeft&&e.push(`  border-left: ${z(a.borderLeft,i,t)};`),a.borderRadius&&e.push(`  border-radius: ${a.borderRadius};`),a.padding&&e.push(`  padding: ${a.padding};`),a.paddingLeft&&e.push(`  padding-left: ${a.paddingLeft};`),a.opacity&&e.push(`  opacity: ${a.opacity};`),a.textShadow&&e.push(`  text-shadow: ${z(a.textShadow,i,t)};`),a.textStroke&&e.push(`  -webkit-text-stroke: ${z(a.textStroke,i,t)};`),a.textFillColor&&e.push(`  -webkit-text-fill-color: ${z(a.textFillColor,i,t)};`),a.boxShadow&&e.push(`  box-shadow: ${z(a.boxShadow,i,t)};`),a.letterSpacing&&e.push(`  letter-spacing: ${a.letterSpacing};`),a.verticalAlign&&e.push(`  vertical-align: ${a.verticalAlign};`),a.textTransform&&e.push(`  text-transform: ${a.textTransform};`),a.filter&&e.push(`  filter: ${a.filter};`),a.animation&&e.push(`  animation: ${a.animation};`),a.backgroundImage&&e.push(`  background-image: ${z(a.backgroundImage,i,t)};`),a.backgroundSize&&e.push(`  background-size: ${a.backgroundSize};`),a.backgroundClip&&(e.push(`  -webkit-background-clip: ${a.backgroundClip};`),e.push(`  background-clip: ${a.backgroundClip};`),a.backgroundClip==="text"&&e.push("  -webkit-text-fill-color: transparent;")),e}function Wt(a,i,t){let e={content:"content",color:"color",fontSize:"font-size",fontWeight:"font-weight",fontStyle:"font-style",fontFamily:"font-family",opacity:"opacity",verticalAlign:"vertical-align",letterSpacing:"letter-spacing",textShadow:"text-shadow",marginLeft:"margin-left",marginRight:"margin-right",padding:"padding"},o=[];for(let[s,r]of Object.entries(a)){let n=s==="content"?r:z(r,i,t),l=e[s];l&&o.push(`  ${l}: ${n};`)}return o}function Fe(a,i,t,e){return e.length===0||(a+=`.cm-line .${i}${t} {
${e.join(`
`)}
}

`,a+=`.${i}${t} {
${e.join(`
`)}
}

`),a}var Vt={"pc-rainbow-flow":`@keyframes pc-rainbow-flow {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}`,"pc-glow-pulse":`@keyframes pc-glow-pulse {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.35); }
}`,"pc-fade-blink":`@keyframes pc-fade-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.72; }
}`};function Ss(a){var e;let i=new Set,t=o=>{if(!o)return;let s=o.match(/(pc-[\w-]+)/);s&&Vt[s[1]]&&i.add(s[1])};for(let o of Object.values(a))t(o.animation),t((e=o.hover)==null?void 0:e.animation);return i}function jt(a,i={},t){let e=`/* \u81EA\u52A8\u751F\u6210\u7684 DSL \u6837\u5F0F\u89C4\u5219 */

`,o=t!=null?t:$t;for(let[s,r]of Object.entries(a)){let n=o.has(s);e=Fe(e,s,"",Ot(r,i,n)),r.hover&&(e=Fe(e,s,":hover",Ot(r.hover,i,n))),r.before&&(e=Fe(e,s,"::before",Wt(r.before,i,n))),r.after&&(e=Fe(e,s,"::after",Wt(r.after,i,n)))}for(let s of Ss(a))e+=Vt[s]+`

`;return e}var Ts=["dsl-constraint","dsl-sd-negative-header","dsl-negative-tag","dsl-role-tag","dsl-md-strikethrough"],Es=["dsl-dialogue","dsl-quality-tag","dsl-quality-tag-ext","dsl-md-task"];function qt(){let a=`/* \u8272\u76F2\u8F85\u52A9 \u2014 \u7EA2/\u7EFF\u7CFB\u4EE4\u724C\u5197\u4F59\u4E0B\u5212\u7EBF\uFF08\u975E\u8272\u76F8\u7F16\u7801\uFF09 */
`;a+=`body.pc-colorblind-assist .cm-line, body.pc-colorblind-assist .markdown-preview-view { /* scope */ }
`;for(let i of Ts)a+=`body.pc-colorblind-assist .cm-line .${i} { text-decoration: underline wavy currentColor; text-decoration-thickness: 1px; }
`,a+=`body.pc-colorblind-assist .${i} { text-decoration: underline wavy currentColor; text-decoration-thickness: 1px; }
`;for(let i of Es)a+=`body.pc-colorblind-assist .cm-line .${i} { text-decoration: underline currentColor; text-decoration-thickness: 2px; }
`,a+=`body.pc-colorblind-assist .${i} { text-decoration: underline currentColor; text-decoration-thickness: 2px; }
`;return a}function _s(a){return a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Ps(a){let i=a.text;if(!i)return null;let t=_s(i),e;a.wholeWord?e=`(?<![\\w\\u4e00-\\u9fff\\u3400-\\u4dbf])${t}(?![\\w\\u4e00-\\u9fff\\u3400-\\u4dbf])`:e=t;let o=a.caseSensitive?"g":"gi";try{return new RegExp(e,o)}catch(s){console.warn("[PromptColorizer] \u81EA\u5B9A\u4E49\u989C\u8272\u89C4\u5219\u6B63\u5219\u7F16\u8BD1\u5931\u8D25\uFF0C\u964D\u7EA7\u5904\u7406:",s);try{return new RegExp(t,o)}catch(r){return null}}}function Be(a,i,t){if(!t||!i||i.length===0)return[];let e=[],o=a.length;for(let r of i){if(!r.enabled||!r.text)continue;let n=Ps(r);if(!n)continue;let l;for(n.lastIndex=0;(l=n.exec(a))!==null;){let c=l.index,p=c+l[0].length;if(c===p||c>=o){l[0]===""&&n.lastIndex++;continue}e.push({from:Math.max(0,c),to:Math.min(o,p),cssClass:`dsl-custom-text-${r.id}`,priority:1e3,block:!1,ruleId:`custom-text-${r.id}`}),l[0]===""&&n.lastIndex++}}if(e.sort((r,n)=>r.from-n.from),e.length===0)return[];let s=[];for(let r of e){let n=s[s.length-1];if(n&&n.to>r.from&&n.from<=r.from){n.cssClass===r.cssClass&&n.to<r.to&&(n.to=r.to);continue}s.push({...r})}return s}function rt(a,i,t){for(let e of t)if(a<e.to&&e.from<i)return!0;return!1}function Kt(a){if(!a||a.length===0)return"";let i=[];for(let t of a){if(!t.id||!t.color)continue;let e=X(t),o={color:t.color,...Se(e,t.color,t.effectParams)};Te(o,e,t.color),Ee(o,t.color,t.color2,t.gradientStops,t.gradientAngle),i.push(Tt(`dsl-custom-text-${t.id}`,o))}return i.join(`
`)}function Ut(a,i){if(!a||!i||i.length===0)return[];let t=[];for(let e of i){if(!e.enabled||!e.text)continue;let o=e.text;e.caseSensitive?a===o&&t.push(e.id):a.toLowerCase()===o.toLowerCase()&&t.push(e.id)}return t}var Ds={highlightVariables:"dsl-variable",highlightRoleTags:"dsl-role-tag",highlightInstructionMarkers:"dsl-instruction",highlightSectionMarkers:"dsl-block-wrapper",highlightShotHeaders:"dsl-shot-header",highlightAssetRefs:"dsl-asset",highlightFieldLabels:"dsl-param-key",highlightDialogue:"dsl-dialogue",highlightAudioRefs:"dsl-audio-ref",highlightNegativePrompts:"dsl-constraint",highlightTechParams:"dsl-tech-param",highlightParentheticals:"dsl-parenthetical",highlightEmphasisWeights:"dsl-emphasis-weight",highlightLoraRefs:"dsl-lora-ref",highlightBracketEmphasis:"dsl-bracket-strong",highlightQualityTags:"dsl-quality-tag",highlightSdNegativeHeader:"dsl-sd-negative-header",highlightCameraMoves:"dsl-camera-word",highlightSceneTransitions:"dsl-scene-transition"},Ge=Object.fromEntries(Object.entries(Ds).map(([a,i])=>[i,a]));function Rs(a){let i=[...a].sort((o,s)=>o.from-s.from||s.priority-o.priority),t=[],e=-1;for(let o of i)o.from<e||(t.push(o),e=o.to);return t}function Ls(a,i){let t=i.vocabCustomWords;if(!t)return[];let e=[];for(let[o,s]of Object.entries(t)){if(!s||s.length===0)continue;let r=Xe[o];if(!r)continue;let n=r.cssClasses[0],l=s.filter(u=>u.trim().length>0).map(u=>u.trim().replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).sort((u,g)=>g.length-u.length);if(l.length===0)continue;let p=s.some(u=>/[\u4e00-\u9fff]/.test(u))?new RegExp(`(${l.join("|")})`,"gi"):new RegExp(`\\b(${l.join("|")})\\b`,"gi"),d;for(;(d=p.exec(a))!==null&&d[1].length!==0;)e.push({from:d.index,to:d.index+d[1].length,cssClass:n,priority:90,block:!1,ruleId:`vocab-custom-${o}`})}return e.sort((o,s)=>o.from-s.from)}function He(a,i,t,e,o,s){let r=a.substring(i,t),n=/[\u4e00-\u9fff]+/g,l;for(;(l=n.exec(r))!==null;){let c=l[0],p=i+l.index,d=p+c.length,u=d<a.length?a.charAt(d):"",g=zt(c,u,e,o);g&&s.push({from:p,to:d,cssClass:g,priority:0,block:!1,ruleId:"combination-rule"})}}function Ms(a,i,t){let e=t.getCharLexicon(),o=t.getCombinationRules(),s=t.getWordLexiconGroups(),r=t.getSegmenterConfig(),n=s.length>0,l=!!(e&&e.size>0&&o.length>0);if(!n&&!l)return[];let c=[],p=a.length,d=0;for(let u of i){let g=Math.max(0,Math.min(u.from,p)),m=Math.max(g,Math.min(u.to,p));if(g>d){let b=n?tt(a,d,g,s,r).map(f=>({from:f.from,to:f.to,cssClass:f.cssClass,priority:f.priority,block:!1,ruleId:f.ruleId})):[];if(c.push(...b),l){let f=d;for(let v of b)v.from>f&&He(a,f,v.from,e,o,c),f=Math.max(f,v.to);f<g&&He(a,f,g,e,o,c)}}d=Math.max(d,m)}if(d<p){let u=n?tt(a,d,p,s,r).map(g=>({from:g.from,to:g.to,cssClass:g.cssClass,priority:g.priority,block:!1,ruleId:g.ruleId})):[];if(c.push(...u),l){let g=d;for(let m of u)m.from>g&&He(a,g,m.from,e,o,c),g=Math.max(g,m.to);g<p&&He(a,g,p,e,o,c)}}return c}function it(a,i,t){var c;if(!i)return[];let e=null;t.enabledRuleIds&&t.enabledRuleIds.length>0&&(e=new Set(t.enabledRuleIds)),i.setContextEnabled(t.contextSemanticEnabled),i.setLexiconEnabled(t.lexiconEnabled);let o=i.match(a,e),s=Ms(a,o,i),r=Be(a,(c=t.customTextColors)!=null?c:[],t.customTextColorsEnabled!==!1),n=Ls(a,t),l;if(r.length>0){let p=o.filter(u=>!rt(u.from,u.to,r)),d=s.filter(u=>!rt(u.from,u.to,r));l=[...p,...d,...r,...n].sort((u,g)=>u.from-g.from)}else s.length>0||n.length>0?l=[...o,...s,...n].sort((p,d)=>p.from-d.from):l=o;return l=Rs(l),nt(l,t)}function nt(a,i){return a.filter(t=>{var s,r;let e=Pe[t.cssClass];if(e)return(r=(s=i.vocabTokenEnabled)==null?void 0:s[e])!=null?r:!0;let o=Ge[t.cssClass];return o?i[o]!==!1:!0})}function Yt(a,i,t){let e=new Ne.RangeSetBuilder;if(!t.editorHighlightEnabled||!i)return e.finish();let o=a.state.doc.toString(),s=it(o,i,t);for(let r of s){let n=o.length,l=Math.max(0,Math.min(r.from,n)),c=Math.max(l,Math.min(r.to,n));if(l!==c)try{if(r.block){let p=a.state.doc.lineAt(l).number,d=a.state.doc.lineAt(c).number;for(let u=p;u<=d;u++){let g=a.state.doc.line(u);e.add(g.from,g.from,be.Decoration.line({class:r.cssClass}))}}else e.add(l,c,be.Decoration.mark({class:r.cssClass,attributes:r.refIndex?{"data-ref":r.refIndex}:void 0}))}catch(p){continue}}return e.finish()}function As(a,i){return be.ViewPlugin.fromClass(class{constructor(t){this.decorations=Yt(t,i,a)}update(t){(t.docChanged||t.viewportChanged)&&(this.decorations=Yt(t.view,i,a))}},{decorations:t=>t.decorations})}function at(a,i=null){let t=[];return a.editorHighlightEnabled&&t.push(Ne.Prec.high(As(a,i))),t}var Xt=require("obsidian"),Is={system:{zh:"\u7CFB\u7EDF",en:"SYS"},user:{zh:"\u7528\u6237",en:"USR"},assistant:{zh:"\u52A9\u624B",en:"AST"},tool:{zh:"\u5DE5\u5177",en:"TOL"},example:{zh:"\u793A\u4F8B",en:"EX"},variable:{zh:"\u53D8\u91CF",en:"VAR"},template:{zh:"\u6A21\u677F",en:"TPL"},video:{zh:"\u89C6\u9891",en:"VID"},none:{zh:"",en:""}};function Oe(a,i,t){var e,o;if(t.detectByFrontmatter){let s=a.metadataCache.getFileCache(i),r=(e=s==null?void 0:s.frontmatter)==null?void 0:e.type;if(r){let l=r.toLowerCase().trim();if(Fs(l))return l}let n=(o=s==null?void 0:s.frontmatter)==null?void 0:o.tags;if(n){let l=Array.isArray(n)?n:[n];for(let c of l){let p=String(c).toLowerCase().replace(/^#/,"");if(p==="system-prompt"||p==="system")return"system";if(p==="user-prompt"||p==="user")return"user";if(p==="assistant-prompt"||p==="assistant")return"assistant";if(p==="tool-prompt"||p==="tool")return"tool";if(p==="example"||p==="few-shot")return"example";if(p==="variable"||p==="variables")return"variable";if(p==="template")return"template";if(p==="video-prompt"||p==="video"||p==="storyboard")return"video"}}}if(t.detectByFolder){let s=i.path.toLowerCase(),r=[...t.folderMappings].sort((n,l)=>l.path.length-n.path.length);for(let n of r){let l=n.path.toLowerCase();if(s===l||s.startsWith(l+"/"))return n.type}}if(t.detectByFilename){let s=i.basename.toLowerCase();if(s.startsWith("sys-")||s.startsWith("system-"))return"system";if(s.startsWith("user-"))return"user";if(s.startsWith("assistant-")||s.startsWith("ast-"))return"assistant";if(s.startsWith("tool-")||s.startsWith("tol-"))return"tool";if(s.startsWith("example-")||s.startsWith("few-shot-"))return"example";if(s.startsWith("var-")||s.startsWith("variable-"))return"variable";if(s.startsWith("template-")||s.startsWith("tpl-"))return"template";if(s.startsWith("video-")||s.startsWith("vid-")||s.startsWith("shot-"))return"video"}return"none"}function Fs(a){return["system","user","assistant","tool","example","variable","template","video","none"].includes(a)}function We(a,i){return i.fileTypeColors.find(t=>t.type===a)}function Bs(a,i){var e,o;let t=Is[a];return t&&(o=(e=t.zh)!=null?e:t.en)!=null?o:""}function Jt(a,i){let t=parseInt(a.slice(1,3),16),e=parseInt(a.slice(3,5),16),o=parseInt(a.slice(5,7),16);return`rgba(${t}, ${e}, ${o}, ${i})`}function ct(a,i){if(!i.fileColorizerEnabled)return;let t=a.workspace.getLeavesOfType("file-explorer");for(let e of t){let o=e.view.containerEl;if(!o)continue;o.querySelectorAll(".tree-item-self").forEach(r=>{var g,m,b;let n=r,l=n.dataset.pcProcessed==="true",c=!!n.querySelector(".pc-file-type-badge");if(l&&c)return;n.querySelectorAll(".pc-file-type-badge").forEach(f=>f.remove());let p=n.closest(".tree-item"),d=(g=p==null?void 0:p.dataset)==null?void 0:g.path,u=null;if(d){let f=a.vault.getAbstractFileByPath(d);f instanceof Xt.TFile&&(u=f)}if(!u){let f=n.querySelector(".tree-item-inner");if(!f)return;let v=f.textContent||"";u=(m=a.vault.getMarkdownFiles().find(x=>x.basename===v))!=null?m:null}if(u){let f=Oe(a,u,i),v=We(f,i);if(v&&f!=="none"){n.dataset.pcProcessed="true",n.dataset.pcType=f;let y=n.querySelector(".tree-item-inner");if(!y)return;let x=Bs(f,i.language);if(x){let S=n.createEl("span",{cls:"pc-file-type-badge",text:x});S.style.color=v.color,S.style.backgroundColor=Jt(v.color,.08),S.style.border=`1px solid ${Jt(v.color,.15)}`,(b=y.parentElement)==null||b.insertBefore(S,y.nextSibling)}}}})}}function pt(a){let i=a.workspace.getLeavesOfType("file-explorer");for(let t of i){let e=t.view.containerEl;e&&(e.querySelectorAll(".pc-file-type-badge").forEach(o=>o.remove()),e.querySelectorAll("[data-pc-processed]").forEach(o=>{let s=o;s.removeAttribute("data-pc-processed"),s.removeAttribute("data-pc-type")}))}}function Qt(a,i,t){var r;if(!i||!t.fileColorizerEnabled)return;let e=Oe(a,i,t),o=We(e,t);if(!o||e==="none")return;let s=a.workspace.getLeavesOfType("markdown");for(let n of s)if(((r=n.getViewState().state)==null?void 0:r.file)===i.path){let l=n.tabHeaderEl;if(!l)continue;if(!l.querySelector(".pc-tab-indicator")){let c=l.createEl("span",{cls:"pc-tab-indicator"});c.style.borderBottomColor=o.color}}}var lt=new Set,ae=null;function dt(){for(let a of lt)a.disconnect();lt.clear(),ae!==null&&(clearTimeout(ae),ae=null)}function Zt(a,i,t=80){var o;dt();let e=()=>{ae!==null&&clearTimeout(ae),ae=setTimeout(()=>{ae=null,i()},t)};for(let s of a.workspace.getLeavesOfType("file-explorer")){let r=s.view.containerEl;if(!r)continue;let n=(o=r.querySelector(".nav-files-container"))!=null?o:r,l=new MutationObserver(()=>e());l.observe(n,{childList:!0,subtree:!0}),lt.add(l)}}function eo(a,i=null){return(t,e)=>{a.readerModeEnabled&&(Gs(t,a),Hs(t,a),Ns(t,a),Os(t,a),Ws(t,a),$s(t,a),i&&zs(t,a,i),js(t,a),Vs(t,a))}}function Gs(a,i){if(!i.highlightCodeBlocks&&!i.highlightJsonBlocks)return;a.querySelectorAll("pre > code").forEach(e=>{var r,n,l,c;let o=e;((n=(r=o.className.match(/language-(\w+)/))==null?void 0:r[1])==null?void 0:n.toLowerCase())==="json"&&i.highlightJsonBlocks?(l=o.parentElement)==null||l.addClass("pc-reader-codeblock-json"):i.highlightCodeBlocks&&((c=o.parentElement)==null||c.addClass("pc-reader-codeblock"))})}function Hs(a,i){if(!i.highlightInlineCode)return;a.querySelectorAll("code:not(pre > code)").forEach(e=>{let o=e,s=o.textContent||"";/^\{\{[^}]+\}\}$/.test(s)||/^\$\{[^}]+\}$/.test(s)?o.addClass("pc-reader-variable"):o.addClass("pc-reader-inline-code")})}function Ns(a,i){if(!i.highlightRoleHeaders)return;a.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(e=>{var r;let o=e,s=((r=o.textContent)==null?void 0:r.toLowerCase().trim())||"";s==="system"||s==="\u7CFB\u7EDF"?o.addClass("pc-reader-role-system"):s==="user"||s==="\u7528\u6237"?o.addClass("pc-reader-role-user"):s==="assistant"||s==="\u52A9\u624B"||s==="ai"?o.addClass("pc-reader-role-assistant"):(s==="tool"||s==="\u5DE5\u5177")&&o.addClass("pc-reader-role-tool")})}function Os(a,i){if(!i.highlightRoleTags)return;let t=document.createTreeWalker(a,NodeFilter.SHOW_TEXT,{acceptNode:s=>{let r=s.textContent||"";return/<\/?(system|user|assistant|tool)>/i.test(r)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),e=[],o;for(;o=t.nextNode();)e.push(o);for(let s of e){let r=s.textContent||"",n=s.parentElement;if(!n)continue;let l=document.createDocumentFragment(),c=0,p=/<(\/?)(system|user|assistant|tool)>/gi,d;for(;(d=p.exec(r))!==null;){d.index>c&&l.appendChild(document.createTextNode(r.slice(c,d.index)));let u=document.createElement("span"),g=d[2].toLowerCase(),m=d[1]==="/";u.className=`pc-reader-role-tag pc-reader-role-${g}${m?"-close":"-open"}`,u.textContent=d[0],l.appendChild(u),c=d.index+d[0].length}c<r.length&&l.appendChild(document.createTextNode(r.slice(c))),n.replaceChild(l,s)}}function Ws(a,i){if(!i.highlightComments)return;let t=document.createTreeWalker(a,NodeFilter.SHOW_TEXT,{acceptNode:s=>{let r=s.textContent||"";return/%%[\s\S]*?%%/.test(r)||/<!--[\s\S]*?-->/.test(r)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),e=[],o;for(;o=t.nextNode();)e.push(o);for(let s of e){let r=s.textContent||"",n=s.parentElement;if(!n)continue;let l=document.createDocumentFragment(),c=0,p=/%%([\s\S]*?)%%/g,d;for(;(d=p.exec(r))!==null;){d.index>c&&l.appendChild(document.createTextNode(r.slice(c,d.index)));let u=document.createElement("span");u.className="pc-reader-comment",u.textContent=d[0],l.appendChild(u),c=d.index+d[0].length}c<r.length&&l.appendChild(document.createTextNode(r.slice(c))),n.replaceChild(l,s)}}function $s(a,i){if(!i.highlightInstructionMarkers)return;let t=document.createTreeWalker(a,NodeFilter.SHOW_TEXT,{acceptNode:s=>{let r=s.parentElement;if(!r||r.closest("code")||r.closest("pre"))return NodeFilter.FILTER_REJECT;let n=s.textContent||"";return/\[\/?(INST|SYS)\]/i.test(n)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),e=[],o;for(;o=t.nextNode();)e.push(o);for(let s of e){let r=s.textContent||"",n=s.parentElement;if(!n)continue;let l=document.createDocumentFragment(),c=0,p=/(\[\/?(?:INST|SYS)\])/gi,d;for(;(d=p.exec(r))!==null;){d.index>c&&l.appendChild(document.createTextNode(r.slice(c,d.index)));let u=document.createElement("span"),g=d[0].includes("/");u.className=g?"pc-reader-instruction-close":"pc-reader-instruction-open",u.textContent=d[0],l.appendChild(u),c=d.index+d[0].length}c<r.length&&l.appendChild(document.createTextNode(r.slice(c))),n.replaceChild(l,s)}}function zs(a,i,t){t.setContextEnabled(i.contextSemanticEnabled),t.setLexiconEnabled(i.lexiconEnabled);let e=document.createTreeWalker(a,NodeFilter.SHOW_TEXT,{acceptNode:r=>{let n=r.parentElement;return!n||n.closest("code")||n.closest("pre")||n.closest('[class*="pc-reader-"]')?NodeFilter.FILTER_REJECT:(r.textContent||"").trim().length===0?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT}}),o=[],s;for(;s=e.nextNode();)o.push(s);for(let r of o){let n=r.textContent||"",l=r.parentElement;if(!l)continue;let c=nt(t.match(n),i);if(c.length===0)continue;let p=document.createDocumentFragment(),d=0;for(let u of c){let g=Math.max(0,Math.min(u.from,n.length)),m=Math.max(g,Math.min(u.to,n.length));if(g===m)continue;g>d&&p.appendChild(document.createTextNode(n.slice(d,g)));let b=document.createElement("span");b.className=u.cssClass,u.refIndex&&b.setAttribute("data-ref",u.refIndex),b.textContent=n.slice(g,m),p.appendChild(b),d=m}d<n.length&&p.appendChild(document.createTextNode(n.slice(d))),l.replaceChild(p,r)}}function Vs(a,i){if(!i.highlightVariables)return;let t=document.createTreeWalker(a,NodeFilter.SHOW_TEXT,{acceptNode:s=>{let r=s.parentElement;if(!r||r.closest("code")||r.closest("pre"))return NodeFilter.FILTER_REJECT;let n=s.textContent||"";return/\{\{[^}]+\}\}|\$\{[^}]+\}|<\|[^|]+\|>/.test(n)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}}),e=[],o;for(;o=t.nextNode();)e.push(o);for(let s of e){let r=s.textContent||"",n=s.parentElement;if(!n)continue;let l=document.createDocumentFragment(),c=0,p=/(\{\{[^}]+\}\}|\$\{[^}]+\}|<\|[^|]+\|>)/g,d;for(;(d=p.exec(r))!==null;){d.index>c&&l.appendChild(document.createTextNode(r.slice(c,d.index)));let u=document.createElement("span");u.className="pc-reader-variable",u.textContent=d[0],l.appendChild(u),c=d.index+d[0].length}c<r.length&&l.appendChild(document.createTextNode(r.slice(c))),n.replaceChild(l,s)}}function js(a,i){if(i.customTextColorsEnabled===!1||!i.customTextColors||i.customTextColors.length===0)return;let t=document.createTreeWalker(a,NodeFilter.SHOW_TEXT,{acceptNode:s=>{let r=s.parentElement;return!r||r.closest("code")||r.closest("pre")||r.closest('[class*="pc-reader-"]')||r.closest('[class*="dsl-"]')?NodeFilter.FILTER_REJECT:(s.textContent||"").trim().length===0?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT}}),e=[],o;for(;o=t.nextNode();)e.push(o);for(let s of e){let r=s.textContent||"",n=s.parentElement;if(!n)continue;let l=Be(r,i.customTextColors,!0);if(l.length===0)continue;let c=document.createDocumentFragment(),p=0;for(let d of l){let u=Math.max(0,Math.min(d.from,r.length)),g=Math.max(u,Math.min(d.to,r.length));if(u===g)continue;u>p&&c.appendChild(document.createTextNode(r.slice(p,u)));let m=document.createElement("span");m.className=d.cssClass,m.textContent=r.slice(u,g),c.appendChild(m),p=g}p<r.length&&c.appendChild(document.createTextNode(r.slice(p))),n.replaceChild(c,s)}}var le=require("obsidian");var Y=[{name:"\u7EA2",value:"#ef4444"},{name:"\u6A59",value:"#f97316"},{name:"\u9EC4",value:"#eab308"},{name:"\u7EFF",value:"#10b981"},{name:"\u9752",value:"#06b6d4"},{name:"\u84DD",value:"#3b82f6"},{name:"\u7D2B",value:"#8b5cf6"},{name:"\u7C89",value:"#ec4899"},{name:"\u68D5",value:"#92400e"},{name:"\u7070",value:"#6b7280"},{name:"\u6DF1",value:"#1f2937"},{name:"\u6D45",value:"#9ca3af"}];function qs(){return"c"+Date.now().toString(36)+Math.random().toString(36).slice(2,8)}function gt(a,i,t,e){let o=new ut(a,i,t,s=>{e(s),o.close()});o.open()}var ut=class extends le.Modal{constructor(t,e,o,s){var r,n,l,c,p,d,u;super(t);this.gradientTrackEl=null;this.gradientThumbLayerEl=null;this.angleSliderEl=null;this.angleValueEl=null;this.previewEl=null;this.previewHexEl=null;this.colorInput=null;this.hexInput=null;this.selectedStopIndex=0;this.gradientSelectedInfoEl=null;this.gradientDeleteBtnEl=null;this.stopPaletteEl=null;this.stopSwatchEls=[];this.stopColorInput=null;this.stopHexInput=null;this.effectParamsEl=null;this.selectedText=e,this.existing=o,this.currentColor=(r=o==null?void 0:o.color)!=null?r:Y[5].value,this.currentColor2=(n=o==null?void 0:o.color2)!=null?n:"",this.gradientStops=(l=o==null?void 0:o.gradientStops)!=null&&l.length?o.gradientStops.map(g=>({...g})):this.currentColor2&&ge(this.currentColor2)?[{color:this.currentColor,position:0},{color:this.currentColor2,position:100}]:[],this.gradientAngle=(c=o==null?void 0:o.gradientAngle)!=null?c:135,this.currentEffects=X(o!=null?o:{}),this.effectParams=o!=null&&o.effectParams?JSON.parse(JSON.stringify(o.effectParams)):{},this.currentEffect=(p=this.currentEffects[0])!=null?p:"none",this.caseSensitive=(d=o==null?void 0:o.caseSensitive)!=null?d:!1,this.wholeWord=(u=o==null?void 0:o.wholeWord)!=null?u:!1,this.onConfirmCb=s}onOpen(){let{contentEl:t,titleEl:e}=this;t.empty(),t.addClass("pc-color-picker-modal"),e.setText(h("customText.modalTitle")),this.renderPreview(t);let o=this.renderPresetPalette(t);this.renderCustomColor(o),this.renderGradientEditor(t),this.renderEffectOptions(t),this.renderMatchOptions(t),this.renderActions(t),this.registerKeybindings(),setTimeout(()=>{let s=t.querySelector(".pc-cp-main-palette .pc-cp-swatch");s&&s.focus()},0)}registerKeybindings(){this.contentEl.addEventListener("keydown",t=>{var e;if(t.key==="Enter"&&!t.shiftKey){let o=t.target,s=((e=o.getAttribute)==null?void 0:e.call(o,"role"))||"",r=o.tagName||"";if(s==="button"||r==="BUTTON"||r==="INPUT"&&o.getAttribute("type")!=="text")return;t.preventDefault(),this.confirmApply();return}if(t.key==="Tab"){let o=Array.from(this.contentEl.querySelectorAll(".pc-cp-main-palette .pc-cp-swatch"));if(o.length===0)return;let s=o.findIndex(n=>n===document.activeElement);if(s===-1)return;t.preventDefault();let r=t.shiftKey?(s-1+o.length)%o.length:(s+1)%o.length;o[r].focus();return}if(t.key==="ArrowRight"||t.key==="ArrowLeft"){let o=Array.from(this.contentEl.querySelectorAll(".pc-cp-main-palette .pc-cp-swatch"));if(o.length===0)return;let s=o.findIndex(l=>l===document.activeElement);if(s===-1)return;t.preventDefault();let r=t.key==="ArrowRight"?(s+1)%o.length:(s-1+o.length)%o.length;o[r].focus();let n=o[r].getAttribute("data-color");n&&(this.currentColor=n,this.updatePreview(),this.updatePaletteSelection(),this.updateCustomColorInputs());return}})}confirmApply(){let t=this.selectedText.trim();t&&this.onConfirmCb({text:t,color:this.currentColor,color2:this.currentColor2,gradientStops:this.gradientStops.map(e=>({...e})),gradientAngle:this.gradientAngle,caseSensitive:this.caseSensitive,wholeWord:this.wholeWord,effect:this.currentEffect,effects:[...this.currentEffects],effectParams:this.snapshotEffectParams()})}renderPreview(t){let e=t.createDiv({cls:"pc-cp-section"});e.createEl("div",{cls:"pc-cp-label",text:h("customText.preview")});let o=e.createDiv({cls:"pc-cp-preview"});this.previewEl=o.createSpan({cls:"pc-cp-preview-text"}),this.previewEl.setText(this.selectedText||h("customText.noSelection"));let s=o.createDiv({cls:"pc-cp-preview-hex",attr:{role:"button",tabindex:"0",title:h("customText.copyHex")}});s.setText(this.currentColor),s.addEventListener("click",()=>this.copyHexBadge(s)),s.addEventListener("keydown",r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),r.stopPropagation(),this.copyHexBadge(s))}),this.previewHexEl=s,this.updatePreview()}copyHexBadge(t){var o;let e=this.currentColor;(o=navigator.clipboard)==null||o.writeText(e).then(()=>{t.setText(h("customText.copied")),t.addClass("copied"),window.setTimeout(()=>{t.setText(this.currentColor),t.removeClass("copied")},900)})}renderPresetPalette(t){let e=t.createDiv({cls:"pc-cp-section"});e.createEl("div",{cls:"pc-cp-label",text:h("customText.colorSection")});let o=e.createDiv({cls:"pc-cp-palette pc-cp-main-palette"});for(let s of Y){let r=o.createDiv({cls:`pc-cp-swatch ${this.currentColor.toLowerCase()===s.value.toLowerCase()?"active":""}`,attr:{"data-color":s.value,"aria-label":s.name,title:`${s.name} ${s.value}`,role:"button",tabindex:"0"}});r.style.backgroundColor=s.value,r.createEl("span",{cls:"pc-cp-swatch-check"}),r.addEventListener("click",()=>{this.currentColor=s.value,this.updatePreview(),this.updatePaletteSelection(),this.updateCustomColorInputs()}),r.addEventListener("keydown",n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),n.stopPropagation(),this.currentColor=s.value,this.updatePreview(),this.updatePaletteSelection(),this.updateCustomColorInputs())})}return e}renderCustomColor(t){let e=t.createDiv({cls:"pc-cp-custom-row"});this.colorInput=e.createEl("input",{cls:"pc-cp-color-input",attr:{type:"color","aria-label":h("customText.customColor")}}),this.colorInput.value=this.normalizeHex(this.currentColor),this.colorInput.addEventListener("input",()=>{this.currentColor=this.colorInput.value,this.updatePreview(),this.updatePaletteSelection(),this.hexInput&&(this.hexInput.value=this.currentColor)}),this.hexInput=e.createEl("input",{cls:"pc-cp-hex-input",attr:{type:"text",placeholder:"#3b82f6",spellcheck:"false","aria-label":h("customText.hexValue")}}),this.hexInput.value=this.currentColor,this.hexInput.addEventListener("input",()=>{let o=this.hexInput.value.trim();(/^#[0-9a-fA-F]{6}$/.test(o)||/^#[0-9a-fA-F]{3}$/.test(o))&&(this.currentColor=o,this.colorInput&&(this.colorInput.value=this.normalizeHex(o)),this.updatePreview(),this.updatePaletteSelection())})}renderGradientEditor(t){let e=t.createDiv({cls:"pc-cp-section pc-cp-gradient-section"});new le.Setting(e).setName(h("customText.gradientTitle")).setDesc(h("customText.gradientDesc")).addToggle(s=>s.setTooltip(h("customText.gradientToggle")).setValue(this.gradientStops.length>=2).onChange(r=>{r&&this.gradientStops.length<2?this.gradientStops=[{color:this.currentColor,position:0},{color:Y[6].value,position:100}]:r||(this.gradientStops=[]),this.updatePreview();let n=e.querySelector(".pc-cp-gradient-editor");this.gradientStops.length>=2&&n&&!this.gradientTrackEl?this.buildGradientEditorDom(n):this.gradientStops.length===0&&(n&&n.empty(),this.gradientTrackEl=null,this.gradientThumbLayerEl=null,this.angleSliderEl=null,this.angleValueEl=null,this.gradientSelectedInfoEl=null,this.gradientDeleteBtnEl=null,this.stopPaletteEl=null,this.stopSwatchEls=[],this.stopColorInput=null,this.stopHexInput=null)}));let o=e.createDiv({cls:"pc-cp-gradient-editor"});this.gradientStops.length!==0&&(this.gradientStops.length===1&&this.gradientStops.push({color:Y[6].value,position:100}),this.buildGradientEditorDom(o))}buildGradientEditorDom(t){t.empty();let e=t.createDiv({cls:"pc-cp-gradient-angle"});this.angleSliderEl=e.createEl("input",{cls:"pc-cp-gradient-angle-slider",attr:{type:"range",min:"0",max:"360",step:"1"}}),this.angleSliderEl.value=String(this.gradientAngle),this.angleValueEl=e.createSpan({cls:"pc-cp-gradient-angle-value"}),this.angleValueEl.setText(`${this.gradientAngle}\xB0`),this.angleSliderEl.addEventListener("input",()=>{var p;this.gradientAngle=parseInt(this.angleSliderEl.value,10)||0,(p=this.angleValueEl)==null||p.setText(`${this.gradientAngle}\xB0`),this.updatePreview()});let o=t.createDiv({cls:"pc-cp-gradient-track-wrap"});this.gradientTrackEl=o.createDiv({cls:"pc-cp-gradient-track"}),this.gradientThumbLayerEl=o.createDiv({cls:"pc-cp-gradient-thumbs"});let s=t.createDiv({cls:"pc-cp-gradient-ops"}),r=s.createEl("button",{cls:"pc-cp-gradient-add",attr:{type:"button"}});r.setText("+"),r.setAttribute("aria-label",h("customText.gradientAddStop")),r.addEventListener("click",()=>{let p=this.gradientStops.length===0?50:Math.round(this.nearestGapMiddle()*100)/100;this.gradientStops.push({color:Y[Math.floor(Math.random()*12)].value,position:Math.min(100,Math.max(0,p))}),this.syncStopsSorted(),this.updatePreview(),this.rerenderGradientEditor()});let n=s.createSpan({cls:"pc-cp-gradient-selected-info"}),l=s.createEl("button",{cls:"pc-cp-gradient-delete",attr:{type:"button"}});l.setText("\u2212"),l.setAttribute("aria-label",h("customText.gradientDeleteStop")),l.addEventListener("click",()=>{this.selectedStopIndex>=0&&this.gradientStops.length>2&&(this.gradientStops.splice(this.selectedStopIndex,1),this.selectedStopIndex=Math.min(this.selectedStopIndex,this.gradientStops.length-1),this.updatePreview(),this.rerenderGradientEditor())});let c=s.createEl("button",{cls:"pc-cp-gradient-reset",attr:{type:"button"}});c.setText("\u21BA"),c.setAttribute("aria-label",h("customText.gradientReset")),c.addEventListener("click",()=>this.resetGradient()),this.gradientSelectedInfoEl=n,this.gradientDeleteBtnEl=l,this.renderGradientTrack(),this.renderGradientThumbs(),this.updateGradientOpsState(),this.buildStopPaletteDom(t)}nearestGapMiddle(){let t=[...this.gradientStops].sort((r,n)=>r.position-n.position);if(t.length===0)return 50;let e=-1,o=50,s=0;for(let r of t){let n=r.position-s;n>e&&(e=n,o=s+n/2),s=r.position}return 100-s>e&&(o=s+(100-s)/2),o}syncStopsSorted(){let t=this.gradientStops[this.selectedStopIndex];this.gradientStops.sort((e,o)=>e.position-o.position),t?this.selectedStopIndex=Math.max(0,this.gradientStops.indexOf(t)):this.selectedStopIndex=0}resetGradient(){this.gradientStops=[{color:this.currentColor,position:0},{color:Y[6].value,position:100}],this.gradientAngle=135,this.selectedStopIndex=0,this.angleSliderEl&&(this.angleSliderEl.value="135"),this.angleValueEl&&this.angleValueEl.setText("135\xB0"),this.updatePreview(),this.rerenderGradientEditor()}renderGradientTrack(){if(!this.gradientTrackEl)return;let t=K(q(this.gradientStops));this.gradientTrackEl.style.background=t?`linear-gradient(90deg, ${t})`:"var(--background-modifier-border)"}renderGradientThumbs(){if(!this.gradientThumbLayerEl)return;this.gradientThumbLayerEl.empty();let t=[...this.gradientStops].sort((e,o)=>e.position-o.position);for(let e=0;e<t.length;e++){let o=t[e],s=e===this.selectedStopIndex,r=this.gradientThumbLayerEl.createDiv({cls:`pc-cp-gradient-thumb ${s?"selected":""}`,attr:{role:"slider",tabindex:"0","aria-label":h("customText.gradientStopAria"),"aria-valuenow":String(Math.round(o.position)),"data-index":String(e),title:`${o.color} \xB7 ${Math.round(o.position)}%`}});r.style.left=`${o.position}%`,r.style.background=o.color,r.addEventListener("pointerdown",n=>{n.preventDefault(),this.selectedStopIndex=e,this.refreshThumbSelection(),this.updateGradientOpsState();let l=n.clientX,c=!1,p=!1,d=g=>{if(!p){if(Math.abs(g.clientX-l)<3)return;p=!0,this.beginThumbDrag(r,o,n)}},u=g=>{window.removeEventListener("pointermove",d),window.removeEventListener("pointerup",u),p||this.showStopPalette()};window.addEventListener("pointermove",d),window.addEventListener("pointerup",u)}),r.addEventListener("keydown",n=>{let l=n.shiftKey?5:1;n.key==="ArrowLeft"||n.key==="ArrowRight"?(n.preventDefault(),o.position=Math.min(100,Math.max(0,o.position+(n.key==="ArrowLeft"?-l:l))),this.syncStopsSorted(),this.updatePreview(),this.rerenderGradientEditor()):(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),this.showStopPalette())})}}beginThumbDrag(t,e,o){let r=this.gradientThumbLayerEl.getBoundingClientRect();if(!r.width)return;t.setCssStyles({transition:"none"}),t.addClass("dragging");let n=c=>{let p=(c.clientX-r.left)/r.width;e.position=Math.round(Math.min(100,Math.max(0,p*100))*100)/100,t.style.left=`${e.position}%`,t.setAttribute("aria-valuenow",String(Math.round(e.position))),t.setAttribute("title",`${e.color} \xB7 ${Math.round(e.position)}%`),this.renderGradientTrack(),this.updatePreview()},l=()=>{t.removeClass("dragging"),t.setCssStyles({transition:""}),window.removeEventListener("pointermove",n),window.removeEventListener("pointerup",l),this.syncStopsSorted(),this.rerenderGradientEditor()};window.addEventListener("pointermove",n),window.addEventListener("pointerup",l)}buildStopPaletteDom(t){let e=t.createDiv({cls:"pc-cp-gradient-stop-palette"});e.setAttribute("hidden",""),e.createDiv({cls:"pc-cp-gradient-stop-palette-label",text:h("customText.gradientStopPalette")});let o=e.createDiv({cls:"pc-cp-palette"});this.stopSwatchEls=[];for(let r of Y){let n=o.createDiv({cls:"pc-cp-swatch",attr:{"data-color":r.value,"aria-label":r.name,title:`${r.name} ${r.value}`,role:"button",tabindex:"0"}});n.style.backgroundColor=r.value,n.createEl("span",{cls:"pc-cp-swatch-check"});let l=()=>this.applyColorToSelectedStop(r.value);n.addEventListener("click",l),n.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),c.stopPropagation(),l())}),this.stopSwatchEls.push(n)}let s=e.createDiv({cls:"pc-cp-custom-row"});this.stopColorInput=s.createEl("input",{cls:"pc-cp-color-input",attr:{type:"color","aria-label":h("customText.customColor")}}),this.stopColorInput.addEventListener("input",()=>{this.applyColorToSelectedStop(this.stopColorInput.value)}),this.stopHexInput=s.createEl("input",{cls:"pc-cp-hex-input",attr:{type:"text",placeholder:"#3b82f6",spellcheck:"false","aria-label":h("customText.hexValue")}}),this.stopHexInput.addEventListener("input",()=>{let r=this.stopHexInput.value.trim();(/^#[0-9a-fA-F]{6}$/.test(r)||/^#[0-9a-fA-F]{3}$/.test(r))&&this.applyColorToSelectedStop(r)}),this.stopPaletteEl=e,this.updateStopPalette()}showStopPalette(){this.stopPaletteEl&&(this.stopPaletteEl.removeAttribute("hidden"),this.updateStopPalette())}updateStopPalette(){let t=this.gradientStops[this.selectedStopIndex];if(!this.stopPaletteEl||!t)return;let e=t.color.toLowerCase();for(let o of this.stopSwatchEls){let s=(o.getAttribute("data-color")||"").toLowerCase();o.classList.toggle("active",s===e)}this.stopColorInput&&document.activeElement!==this.stopColorInput&&(this.stopColorInput.value=this.normalizeHex(t.color)),this.stopHexInput&&document.activeElement!==this.stopHexInput&&(this.stopHexInput.value=t.color)}applyColorToSelectedStop(t){let e=this.gradientStops[this.selectedStopIndex];e&&(e.color=t,this.updatePreview(),this.rerenderGradientEditor())}refreshThumbSelection(){this.gradientThumbLayerEl&&this.gradientThumbLayerEl.querySelectorAll(".pc-cp-gradient-thumb").forEach(t=>{let e=parseInt(t.getAttribute("data-index")||"-1",10);t.classList.toggle("selected",e===this.selectedStopIndex)})}updateGradientOpsState(){let t=this.selectedStopIndex,e=this.gradientStops[t];this.gradientSelectedInfoEl&&this.gradientSelectedInfoEl.setText(e?`${e.color} \xB7 ${Math.round(e.position)}%`:h("customText.gradientNoSelection")),this.gradientDeleteBtnEl&&(this.gradientDeleteBtnEl.disabled=this.gradientStops.length<=2)}rerenderGradientEditor(){this.renderGradientTrack(),this.renderGradientThumbs(),this.updateGradientOpsState(),this.updateStopPalette()}renderEffectOptions(t){let e=t.createDiv({cls:"pc-cp-section"});e.createEl("div",{cls:"pc-cp-label",text:h("customText.effect")}),e.createDiv({cls:"pc-cp-effects-hint"}).setText(h("customText.effectComposableHint"));let s=e.createDiv({cls:"pc-cp-effects-chips"});for(let r of kt){let n=this.currentEffects.includes(r.value),l=s.createDiv({cls:`pc-cp-effect-chip ${n?"active":""}`,attr:{role:"button",tabindex:"0","aria-pressed":String(n),"data-effect":r.value,title:h(r.labelKey)},text:h(r.labelKey)});l.addEventListener("click",()=>this.toggleEffect(r.value)),l.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),c.stopPropagation(),this.toggleEffect(r.value))})}this.effectParamsEl=e.createDiv({cls:"pc-cp-fx-panel"}),this.rerenderEffectParams()}toggleEffect(t){var o;let e=this.currentEffects.indexOf(t);if(e>=0)this.currentEffects.splice(e,1),delete this.effectParams[t];else{this.currentEffects.push(t);let s=ke.get(t);s&&s.params&&s.params.length>0&&!this.effectParams[t]&&(this.effectParams[t]=St(s))}this.currentEffect=(o=this.currentEffects[0])!=null?o:"none",this.refreshEffectChips(),this.rerenderEffectParams(),this.updatePreview()}snapshotEffectParams(){return JSON.parse(JSON.stringify(this.effectParams))}rerenderEffectParams(){if(!this.effectParamsEl)return;this.effectParamsEl.empty();let t=this.currentEffects.map(e=>ke.get(e)).filter(e=>!!e&&!!e.params&&e.params.length>0);if(t.length!==0)for(let e of t){let o=this.effectParamsEl.createDiv({cls:"pc-cp-fx-group"});o.createDiv({cls:"pc-cp-fx-group-title",text:h(e.labelKey)});for(let s of e.params)this.renderParamSlider(o,e.value,s)}}renderParamSlider(t,e,o){var d,u;let s=(u=((d=this.effectParams[e])!=null?d:{})[o.id])!=null?u:o.def,r=t.createDiv({cls:"pc-cp-fx-row"});r.createSpan({cls:"pc-cp-fx-label",text:h(o.labelKey)});let n=r.createEl("input",{cls:"pc-cp-fx-slider",attr:{type:"range",min:String(o.min),max:String(o.max),step:String(o.step)}});n.value=String(s);let l=r.createSpan({cls:"pc-cp-fx-value"}),c=g=>{var m;return l.setText(`${Number.isInteger(o.step)?Math.round(g):Math.round(g*100)/100}${(m=o.unit)!=null?m:""}`)};c(s);let p=g=>{this.effectParams[e]||(this.effectParams[e]={}),this.effectParams[e][o.id]=g,c(g),this.updatePreview()};n.addEventListener("input",()=>{let g=parseFloat(n.value);Number.isFinite(g)&&p(g)})}refreshEffectChips(){this.contentEl.querySelectorAll(".pc-cp-effect-chip").forEach(e=>{let o=e,s=this.currentEffects.includes(o.getAttribute("data-effect"));o.classList.toggle("active",s),o.setAttribute("aria-pressed",String(s))})}renderMatchOptions(t){let e=t.createDiv({cls:"pc-cp-section"});e.createEl("div",{cls:"pc-cp-label",text:h("customText.matchOptions")});let o=e.createDiv({cls:"pc-cp-match-row"});this.renderMatchCheckbox(o,h("customText.caseSensitive"),this.caseSensitive,s=>{this.caseSensitive=s}),this.renderMatchCheckbox(o,h("customText.wholeWord"),this.wholeWord,s=>{this.wholeWord=s})}renderMatchCheckbox(t,e,o,s){let r=t.createEl("label",{cls:"pc-cp-match-item"}),n=r.createEl("input",{cls:"pc-cp-match-checkbox",attr:{type:"checkbox"}});n.checked=o,n.addEventListener("change",()=>s(n.checked)),r.createSpan({cls:"pc-cp-match-label",text:e})}renderActions(t){let e=t.createDiv({cls:"pc-cp-actions"});new le.ButtonComponent(e).setButtonText(h("customText.cancel")).onClick(()=>{this.close()});let o=new le.ButtonComponent(e).setButtonText(h("customText.confirm")).setCta().onClick(()=>{let s=this.selectedText.trim();s&&this.onConfirmCb({text:s,color:this.currentColor,color2:this.currentColor2,gradientStops:this.gradientStops.map(r=>({...r})),gradientAngle:this.gradientAngle,caseSensitive:this.caseSensitive,wholeWord:this.wholeWord,effect:this.currentEffect,effects:[...this.currentEffects],effectParams:this.snapshotEffectParams()})});this.selectedText.trim()||o.setDisabled(!0)}updatePreview(){if(!this.previewEl)return;let t=this.previewEl,e=["text-shadow","font-weight","font-style","text-decoration","text-decoration-thickness","background","background-image","padding","border-radius","font-family","font-variant","letter-spacing","vertical-align","font-size","text-transform","-webkit-text-stroke","-webkit-text-fill-color","filter","background-clip","-webkit-background-clip"];for(let s of e)t.style.setProperty(s,"");let o=Se(this.currentEffects,this.currentColor,this.effectParams);Te(o,this.currentEffects,this.currentColor),Ee(o,this.currentColor,this.currentColor2,this.gradientStops,this.gradientAngle),t.style.color=this.currentColor;for(let[s,r]of Object.entries(o))t.style.setProperty(s,r);this.previewHexEl&&this.previewHexEl.setText(this.currentColor)}updatePaletteSelection(){this.contentEl.querySelectorAll(".pc-cp-swatch").forEach(e=>{if(e.closest(".pc-cp-gradient-stop-palette"))return;let o=e;(o.getAttribute("data-color")||"").toLowerCase()===this.currentColor.toLowerCase()?o.addClass("active"):o.removeClass("active")})}updateCustomColorInputs(){this.colorInput&&(this.colorInput.value=this.normalizeHex(this.currentColor)),this.hexInput&&(this.hexInput.value=this.currentColor)}normalizeHex(t){let e=t.trim().toLowerCase();return/^#[0-9a-f]{6}$/.test(e)?e:/^#[0-9a-f]{3}$/.test(e)?"#"+e.slice(1).split("").map(o=>o+o).join(""):"#3b82f6"}onClose(){this.contentEl.empty()}};function to(a){return{id:qs(),text:a.text,color:a.color,color2:a.color2||"",gradientStops:a.gradientStops.map(i=>({...i})),gradientAngle:a.gradientAngle,enabled:!0,caseSensitive:a.caseSensitive,wholeWord:a.wholeWord,effect:a.effect,effects:[...a.effects],effectParams:a.effectParams?JSON.parse(JSON.stringify(a.effectParams)):{}}}var ve=null;function oo(a,i,t){if(xe(),!t.selectedText||t.selectedText.trim().length===0)return;let e=i,o=e.coordsAtPos(i.getCursor("from")),s=e.coordsAtPos(i.getCursor("to"));if(!o||!s)return;let r=window.scrollX,n=window.scrollY,l={left:Math.min(o.left,s.left),right:Math.max(o.right,s.right),top:Math.min(o.top,s.top),bottom:Math.max(o.bottom,s.bottom)},c=(l.left+l.right)/2+r,p=l.bottom+n+8;ve=new ht(a,t,{x:c,y:p}),ve.show()}function xe(){ve&&(ve.hide(),ve=null)}var ht=class{constructor(i,t,e){this.el=null;this.hideHandlers=[];this.app=i,this.options=t,this.position=e}show(){if(this.el)return;let i=document.body.createDiv({cls:"pc-color-popover"});if(this.el=i,this.options.existing){let s=i.createDiv({cls:"pc-popover-hint"});s.createEl("span",{cls:"pc-popover-hint-dot",attr:{style:`background-color: ${this.options.existing.color}`}}),s.createSpan({text:h("customText.popoverExisting")})}let t=i.createDiv({cls:"pc-popover-palette"});for(let s of Y){let r=this.options.existing&&this.options.existing.color.toLowerCase()===s.value.toLowerCase(),n=t.createDiv({cls:`pc-popover-swatch ${r?"active":""}`,attr:{"data-color":s.value,"aria-label":s.name,title:`${s.name} ${s.value}`,role:"button",tabindex:"0"}});n.style.backgroundColor=s.value,n.createEl("span",{cls:"pc-popover-swatch-check"}),n.addEventListener("click",l=>{l.stopPropagation(),this.options.onApplyColor(s.value),this.hide()}),n.addEventListener("keydown",l=>{(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),l.stopPropagation(),this.options.onApplyColor(s.value),this.hide())})}i.createDiv({cls:"pc-popover-divider"});let e=i.createDiv({cls:"pc-popover-actions"}),o=e.createEl("button",{cls:"pc-popover-action pc-popover-advanced",attr:{"aria-label":h("customText.popoverMore"),title:h("customText.popoverMoreDesc")}});if(o.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',o.addEventListener("click",s=>{s.stopPropagation(),this.options.onOpenAdvanced(),this.hide()}),this.options.existing){let s=e.createEl("button",{cls:"pc-popover-action pc-popover-remove",attr:{"aria-label":h("customText.popoverRemove"),title:h("customText.popoverRemoveDesc")}});s.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',s.addEventListener("click",r=>{r.stopPropagation(),this.options.onRemove(),this.hide()})}this.positionEl(),requestAnimationFrame(()=>{i.addClass("pc-popover-visible")}),this.registerHideHandlers()}hide(){if(!this.el)return;for(let{event:t,handler:e,target:o}of this.hideHandlers)o.removeEventListener(t,e);this.hideHandlers=[],this.el.removeClass("pc-popover-visible"),this.el.addClass("pc-popover-hiding");let i=this.el;this.el=null,setTimeout(()=>{i.remove()},180)}positionEl(){if(!this.el)return;this.el.style.visibility="hidden",this.el.style.display="block";let i=this.el.getBoundingClientRect(),t=i.width,e=i.height,o=window.innerWidth,s=window.innerHeight,r=window.scrollX,n=window.scrollY,l=this.position.x-t/2,c=this.position.y,p=8;l<r+p&&(l=r+p),l+t>r+o-p&&(l=r+o-p-t);let d=s-(this.position.y-n),u=this.position.y-n-8,g=!1;d<e+p&&u>e+p&&(c=this.position.y-16-e,g=!0),this.el.style.left=`${l}px`,this.el.style.top=`${c}px`,this.el.style.visibility="",this.el.style.display="",g?this.el.addClass("pc-popover-above"):this.el.addClass("pc-popover-below")}registerHideHandlers(){let i=s=>{this.el&&!this.el.contains(s.target)&&this.hide()};document.addEventListener("pointerdown",i,!0),this.hideHandlers.push({event:"pointerdown",handler:i,target:document});let t=s=>{s.key==="Escape"&&(s.preventDefault(),s.stopPropagation(),this.hide())};document.addEventListener("keydown",t,!0),this.hideHandlers.push({event:"keydown",handler:t,target:document});let e=()=>this.hide();window.addEventListener("scroll",e,!0),this.hideHandlers.push({event:"scroll",handler:e,target:window});let o=()=>this.hide();window.addEventListener("resize",o),this.hideHandlers.push({event:"resize",handler:o,target:window})}};function so(a,i,t){let e=i.getSelection(),o=e&&e.trim().length>0;a.addItem(s=>{s.setTitle(h("customText.menuSeparator")).setIcon("palette").setSection("prompt-colorizer").setDisabled(!0)}),a.addItem(s=>{s.setTitle(h("customText.menuApply")).setIcon("droplet").setSection("prompt-colorizer").setDisabled(!o).onClick(()=>{t.onApply()})}),a.addItem(s=>{s.setTitle(h("customText.menuOpenPicker")).setIcon("settings-2").setSection("prompt-colorizer").setDisabled(!o).onClick(()=>{t.onOpenPicker()})}),a.addItem(s=>{s.setTitle(h("customText.menuRemove")).setIcon("trash").setSection("prompt-colorizer").setDisabled(!o).onClick(()=>{t.onRemove()})})}var $e=require("obsidian"),Ks=1;function mt(a,i,t){return{formatVersion:Ks,kind:a,exportedAt:new Date().toISOString(),pluginVersion:t,data:i}}function ft(a){let i=new Date,t=o=>String(o).padStart(2,"0"),e=`${i.getFullYear()}${t(i.getMonth()+1)}${t(i.getDate())}-${t(i.getHours())}${t(i.getMinutes())}${t(i.getSeconds())}`;return`prompt-colorizer-${a}-${e}.json`}async function ro(a,i,t){let e=mt("full",a,i),o=ft("full"),s=await yt(t,o,e);new $e.Notice(`\u5DF2\u5BFC\u51FA\u5168\u91CF\u8BBE\u7F6E\u5230 ${s}`,5e3)}async function io(a,i,t){let e=mt("customTextColors",a,i),o=ft("customTextColors"),s=await yt(t,o,e);new $e.Notice(`\u5DF2\u5BFC\u51FA ${a.length} \u6761\u81EA\u5B9A\u4E49\u6587\u672C\u989C\u8272\u5230 ${s}`,5e3)}async function no(a,i,t){let e=mt("folderMappings",a,i),o=ft("folderMappings"),s=await yt(t,o,e);new $e.Notice(`\u5DF2\u5BFC\u51FA ${a.length} \u6761\u6587\u4EF6\u5939\u6620\u5C04\u5230 ${s}`,5e3)}async function yt(a,i,t){let e=i.replace(/\.json$/,""),o=i,s=1;for(;await a.vault.adapter.exists(o);)o=`${e}-${s}.json`,s++;let r=JSON.stringify(t,null,2);return await a.vault.create(o,r),o}function ao(a){try{let i=JSON.parse(a);return typeof i.formatVersion!="number"||typeof i.kind!="string"||typeof i.exportedAt!="string"||i.data===void 0?null:i}catch(i){return null}}function lo(a,i){if(a.kind!=="full")throw new Error("\u5BFC\u51FA\u5305\u7C7B\u578B\u4E0D\u662F full");let t=a.data;return{...i,...t,lastCheckTime:i.lastCheckTime,lastPullReport:i.lastPullReport}}var ze=class{constructor(i,t){this.app=i;this.settings=t}isPluginEnabled(i){var e,o,s;let t=this.app.plugins;return t&&(s=(o=(e=t.enabledPlugins)==null?void 0:e.has)==null?void 0:o.call(e,i))!=null?s:!1}async initIntegrations(){this.isPluginEnabled("templater-obsidian")&&await this.registerTemplaterIntegration(),this.isPluginEnabled("dataview")&&this.registerDataviewIntegration()}async registerTemplaterIntegration(){var i,t;try{let e=(t=(i=this.app.plugins)==null?void 0:i.plugins)==null?void 0:t["templater-obsidian"];if(!e)return;let o={section:s=>`\u3010${s}\u3011`,shot:(s,r)=>`\u955C\u5934${s}\uFF08${r}\u79D2\uFF09`,role:s=>`<${s}>`,asset:(s,r)=>`@\u56FE${s}(${r})`,field:(s,r="")=>`${s}\uFF1A${r}`,storyboardSkeleton:(s=3)=>{let r=["\u3010\u6574\u4F53\u8BBE\u5B9A\u3011",""];for(let n=1;n<=s;n++)r.push(`\u955C\u5934${n}\uFF083\u79D2\uFF09`),r.push("\u666F\u522B\uFF1A"),r.push("\u8FD0\u955C\uFF1A"),r.push("\u5149\u5F71\uFF1A"),r.push("\u753B\u9762\uFF1A"),r.push("");return r.join(`
`)}};e.functions_parser&&(e.functions_parser.generated_user_functions=e.functions_parser.generated_user_functions||{},e.functions_parser.generated_user_functions.prompt=o),console.log("[PromptColorizer] Templater \u8054\u52A8\u5DF2\u6CE8\u518C")}catch(e){console.warn("[PromptColorizer] Templater \u8054\u52A8\u6CE8\u518C\u5931\u8D25:",e)}}registerDataviewIntegration(){this.app.workspace.on("layout-change",()=>{this.colorizeDataviewTables()}),this.app.workspace.on("dataview:refresh-views",()=>{setTimeout(()=>this.colorizeDataviewTables(),100)}),console.log("[PromptColorizer] Dataview \u8054\u52A8\u5DF2\u6CE8\u518C")}colorizeDataviewTables(){if(!this.settings.fileColorizerEnabled)return;document.querySelectorAll(".dataview-table").forEach(t=>{let e=t;if(e.dataset.pcDataviewProcessed==="true")return;e.querySelectorAll("tr").forEach((s,r)=>{if(r===0)return;let n=s.querySelector("td");if(!n)return;let l=n.querySelector("a.internal-link, a.data-link");if(!l)return;let c=l,p=c.dataset.href||c.getAttribute("data-href")||c.textContent;if(!p)return;let d=this.app.vault.getAbstractFileByPath(p);if(!d)return;let{TFile:u}=require("obsidian");if(!(d instanceof u))return;let g=Oe(this.app,d,this.settings);if(g==="none")return;let m=We(g,this.settings);if(m&&!n.querySelector(".pc-dataview-dot")){let b=n.createEl("span",{cls:"pc-dataview-dot"});b.style.display="inline-block",b.style.width="6px",b.style.height="6px",b.style.borderRadius="50%",b.style.backgroundColor=m.color,b.style.marginRight="6px",b.style.flexShrink="0",n.insertBefore(b,n.firstChild)}}),e.dataset.pcDataviewProcessed="true"})}cleanup(){var i,t,e,o;document.querySelectorAll(".pc-dataview-dot").forEach(s=>s.remove()),document.querySelectorAll("[data-pc-dataview-processed]").forEach(s=>{s.removeAttribute("data-pc-dataview-processed")});try{let s=(t=(i=this.app.plugins)==null?void 0:i.plugins)==null?void 0:t["templater-obsidian"];(o=(e=s==null?void 0:s.functions_parser)==null?void 0:e.generated_user_functions)!=null&&o.prompt&&delete s.functions_parser.generated_user_functions.prompt}catch(s){}}};var Ve=class{constructor(){this.ruleSet=null;this.contextEnabled=!0;this.lexiconEnabled=!0}setRuleSet(i){this.ruleSet=i}setContextEnabled(i){this.contextEnabled=i}setLexiconEnabled(i){this.lexiconEnabled=i}match(i,t=null){if(!this.ruleSet)return[];let e=this.parseBlockContexts(i),o=this.matchPatterns(i,t,e);if(this.lexiconEnabled){let r=this.matchLexicons(i);o.push(...r)}return o.sort((r,n)=>r.from!==n.from?r.from-n.from:n.priority-r.priority),this.removeOverlaps(o)}matchRange(i,t,e,o=null){return this.match(i,o).filter(r=>r.from<e&&r.to>t)}resetRegex(i){return i.lastIndex=0,i}parseBlockContexts(i){if(!this.contextEnabled||this.ruleSet.contextRules.length===0)return[];let t=[],e=/【([^】]+)】/g,o=[],s;for(;(s=e.exec(i))!==null;)o.push({marker:s[0],index:s.index});if(o.length===0)return[];for(let r=0;r<o.length;r++){let n=o[r].index,l=r+1<o.length?o[r+1].index:i.length,c=this.ruleSet.contextRules.find(p=>p.blockMarker===o[r].marker);c&&t.push({marker:o[r].marker,start:n,end:l,allowPatterns:new Set(c.allowPatterns)})}return t}matchPatterns(i,t,e){let o=[];for(let s of this.ruleSet.rules){if(t&&!t.has(s.id))continue;let r=this.resetRegex(s.regex),n;for(;(n=r.exec(i))!==null;){if(n[0].length===0){r.lastIndex++;continue}let l=n.index,c=n.index+n[0].length;if(this.contextEnabled&&e.length>0&&!this.isPatternAllowedInContext(s.id,l,e))continue;let p={from:l,to:c,cssClass:s.cssClass,priority:s.priority,block:s.blockLevel,ruleId:s.id};if(s.cssClass==="dsl-asset"&&n[1]){let d=n[1].match(/\d+/);d&&(p.refIndex=d[0])}o.push(p)}}return o}isPatternAllowedInContext(i,t,e){let o=e.find(s=>t>=s.start&&t<s.end);return o?o.allowPatterns.has(i):!0}matchLexicons(i){let t=[];for(let e of this.ruleSet.lexicons){let o=this.resetRegex(e.regex),s;for(;(s=o.exec(i))!==null;){if(s[0].length===0){o.lastIndex++;continue}t.push({from:s.index,to:s.index+s[0].length,cssClass:e.cssClass,priority:e.priority,block:!1,ruleId:`lexicon:${e.category}`})}}return t}removeOverlaps(i){if(i.length===0)return[];let t=[],e=-1;for(let o of i)o.from>=e&&(t.push(o),e=o.to);return t}getAllRuleIds(){return this.ruleSet?this.ruleSet.rules.map(i=>i.id):[]}getVersion(){var i,t;return(t=(i=this.ruleSet)==null?void 0:i.version)!=null?t:"unknown"}getLexiconCategories(){return this.ruleSet?this.ruleSet.lexicons.map(i=>i.category):[]}getCharLexicon(){return this.ruleSet?this.ruleSet.charLexicon:null}getCombinationRules(){return this.ruleSet?this.ruleSet.combinationRules:[]}getWordLexiconGroups(){return this.ruleSet?this.ruleSet.wordLexiconGroups:[]}getSegmenterConfig(){var i,t;return(t=(i=this.ruleSet)==null?void 0:i.segmenterConfig)!=null?t:{maxWordLength:6,minWordLength:2}}getColorTokens(){var i;return this.ruleSet?(i=this.ruleSet.colorTokens)!=null?i:{}:{}}getStyleRules(){var i;return this.ruleSet?(i=this.ruleSet.styleRules)!=null?i:{}:{}}getColorByCssClass(i){var n,l;if(!this.ruleSet)return"";let t=(n=this.ruleSet.styleRules)==null?void 0:n[i];if(!t||!t.color)return"";let e=(l=this.ruleSet.colorTokens)!=null?l:{},o=t.color.trim(),s=o.match(/^([a-zA-Z_][\w-]*)$/);if(s&&e[s[1]])return`var(--dsl-${s[1]})`;let r=o.match(/^([a-zA-Z_][\w-]*)\.(soft|border)$/);return r&&e[r[1]]?`var(--dsl-${r[1]}-${r[2]})`:o}};var D=require("obsidian"),je=class{constructor(i,t){this.app=i;this.pluginId=t}getCacheDir(){return(0,D.normalizePath)(`.obsidian/plugins/${this.pluginId}/cache`)}getVersionFilePath(){return(0,D.normalizePath)(`${this.getCacheDir()}/version.json`)}getRulesDir(){return(0,D.normalizePath)(`${this.getCacheDir()}/rules`)}async ensureFolder(i){let t=i.split("/"),e="";for(let o of t){if(!o)continue;if(e=e?`${e}/${o}`:o,!await this.app.vault.adapter.exists(e))try{await this.app.vault.createFolder(e)}catch(r){}}}async writeFile(i,t){let e=this.app.vault.getAbstractFileByPath(i);if(e instanceof D.TFile){await this.app.vault.modify(e,t);return}await this.app.vault.adapter.write(i,t)}async saveVersion(i){await this.ensureFolder(this.getCacheDir());let t=this.getVersionFilePath(),e=JSON.stringify(i,null,2);await this.writeFile(t,e)}async loadVersion(){let i=this.getVersionFilePath();if(!await this.app.vault.adapter.exists(i))return null;let e=this.app.vault.getAbstractFileByPath(i);if(!(e instanceof D.TFile))return null;try{let o=await this.app.vault.read(e),s=JSON.parse(o);return!s.version||!s.updateTime||!s.hash||typeof s.fetchedAt!="number"?null:s}catch(o){return null}}async saveRuleFiles(i){let t=this.getRulesDir();await this.ensureFolder(t);for(let[e,o]of Object.entries(i)){let s=(0,D.normalizePath)(`${t}/${e}`);await this.writeFile(s,o)}}async loadRuleFiles(){let i=this.getRulesDir();if(!await this.app.vault.adapter.exists(i))return null;let e=this.app.vault.getAbstractFileByPath(i);if(!(e instanceof D.TFolder))return null;let o={};for(let s of e.children)if(s instanceof D.TFile)try{let r=await this.app.vault.read(s);o[s.name]=r}catch(r){}return Object.keys(o).length>0?o:null}async getRuleFile(i){let t=(0,D.normalizePath)(`${this.getRulesDir()}/${i}`);if(!await this.app.vault.adapter.exists(t))return null;let o=this.app.vault.getAbstractFileByPath(t);if(!(o instanceof D.TFile))return null;try{return await this.app.vault.read(o)}catch(s){return null}}async clearCache(){let i=this.getCacheDir();if(!await this.app.vault.adapter.exists(i))return;let e=this.app.vault.getAbstractFileByPath(i);if(!(e instanceof D.TFolder))return;let o=[...e.children];for(let s of o)try{await this.app.vault.delete(s,!0)}catch(r){}}getPrevDir(){return(0,D.normalizePath)(`${this.getCacheDir()}/prev`)}async backupCurrentCache(){let i=this.getRulesDir(),t=this.getVersionFilePath(),e=this.getPrevDir(),o=(0,D.normalizePath)(`${e}/rules`),s=await this.app.vault.adapter.exists(i),r=await this.app.vault.adapter.exists(t);if(!s&&!r)return!1;if(await this.clearPrevBackup(),await this.ensureFolder(o),r)try{let n=await this.app.vault.adapter.read(t);await this.app.vault.adapter.write((0,D.normalizePath)(`${e}/version.json`),n)}catch(n){}if(s){let n=this.app.vault.getAbstractFileByPath(i);if(n instanceof D.TFolder){for(let l of n.children)if(l instanceof D.TFile)try{let c=await this.app.vault.read(l);await this.app.vault.adapter.write((0,D.normalizePath)(`${o}/${l.name}`),c)}catch(c){}}}return!0}async rollbackToPrevCache(){let i=this.getPrevDir(),t=(0,D.normalizePath)(`${i}/rules`),e=(0,D.normalizePath)(`${i}/version.json`);if(!await this.app.vault.adapter.exists(i))return!1;let s=this.getRulesDir();if(await this.app.vault.adapter.exists(s)){let c=this.app.vault.getAbstractFileByPath(s);if(c instanceof D.TFolder){let p=[...c.children];for(let d of p)try{await this.app.vault.delete(d,!0)}catch(u){}}}else await this.ensureFolder(s);if(await this.app.vault.adapter.exists(e))try{let c=await this.app.vault.adapter.read(e);await this.app.vault.adapter.write(this.getVersionFilePath(),c)}catch(c){}if(await this.app.vault.adapter.exists(t)){let c=this.app.vault.getAbstractFileByPath(t);if(c instanceof D.TFolder){let p=0;for(let d of c.children)if(d instanceof D.TFile)try{let u=await this.app.vault.read(d);await this.app.vault.adapter.write((0,D.normalizePath)(`${s}/${d.name}`),u),p++}catch(u){}if(p===0)return!1}}return!0}async clearPrevBackup(){let i=this.getPrevDir();if(!await this.app.vault.adapter.exists(i))return;let e=this.app.vault.getAbstractFileByPath(i);if(!(e instanceof D.TFolder))return;let o=[...e.children];for(let s of o)try{await this.app.vault.delete(s,!0)}catch(r){}}};var po=require("obsidian"),Us=["01-base-patterns.yaml","02-semantic-context.yaml","03-lexicon-optional.yaml","04-theme-color.yaml","05-priority.yaml"],Ys=1e4;function Js(a){let i=a.match(/^https?:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)$/);if(!i)return a;let[,t,e,o,s]=i;return`https://cdn.jsdelivr.net/gh/${t}/${e}@${o}/${s}`}async function uo(a,i){let t=await co(a,i);if(t!==null)return t;let e=Js(a);return e!==a?await co(e):null}async function co(a,i){try{let t=new Promise((s,r)=>{setTimeout(()=>r(new Error("\u8BF7\u6C42\u8D85\u65F6")),Ys)}),e={url:a,method:"GET",throw:!1};i&&(e.headers={Authorization:`Bearer ${i}`});let o=await Promise.race([(0,po.requestUrl)(e),t]);return o.status<200||o.status>=300?null:o.text}catch(t){return null}}async function go(a,i){var e,o,s;let t=await uo(`${a}/version.json`,i);if(t===null)return null;try{let r=JSON.parse(t);return!r.version||!r.updateTime?null:{version:r.version,updateTime:r.updateTime,hash:(e=r.hash)!=null?e:"",mainBranch:(o=r.mainBranch)!=null?o:"main",rawBaseUrl:(s=r.rawBaseUrl)!=null?s:a}}catch(r){return null}}function ho(a,i){return!!(!a||a.version!==i.version||i.hash&&a.hash&&a.hash!==i.hash)}function mo(a){let i=5381;for(let t=0;t<a.length;t++)i=(i<<5)+i+a.charCodeAt(t),i=i&i;return(i>>>0).toString(16)}async function fo(a,i){let t=[],e={};for(let s of Us){let r=await uo(`${a}/${s}`,i);r!==null?(e[s]=r,t.push({fileName:s,success:!0,size:new Blob([r]).size})):t.push({fileName:s,success:!1,size:0,error:"\u7F51\u7EDC\u8BF7\u6C42\u5931\u8D25\u6216\u8D85\u65F6"})}return{files:t.every(s=>s.success)?e:null,results:t}}function yo(a){let i=[];for(let[t,e]of Object.entries(a)){let o=!0,s=0,r="";try{if(t==="01-base-patterns.yaml"){r="\u57FA\u7840\u6B63\u5219\u89C4\u5219";let n=e.match(/^  \w+:\s*$/gm);s=n?n.length:0}else if(t==="02-semantic-context.yaml"){r="\u4E0A\u4E0B\u6587\u6620\u5C04";let n=e.match(/^  "[^"]+":\s*$/gm);s=n?n.length:0}else if(t==="03-lexicon-optional.yaml"){r="\u884C\u4E1A\u8BCD\u5178";let n=e.match(/^  \w+:\s*$/gm);s=n?n.length:0;let l=e.indexOf("cssClassMap:");if(l>-1){let p=e.substring(0,l).match(/^  \w+:\s*$/gm);s=p?p.length:0}}else if(t==="04-theme-color.yaml"){r="\u914D\u8272\u5B9A\u4E49";let n=e.match(/^  dsl-[\w-]+:\s*$/gm);s=n?n.length:0}else if(t==="05-priority.yaml"){r="\u4F18\u5148\u7EA7\u5C42\u7EA7";let n=e.match(/^  \w+:\s*\d+/gm);s=n?n.length:0}}catch(n){o=!1}i.push({name:r||t,file:t,count:s,parsed:o})}return i}function bo(a){let i=a["03-lexicon-optional.yaml"];if(!i)return 0;let t=i.match(/^\s+- "[^"]+"/gm);return t?t.length:0}var Ke=class Ke extends _.Plugin{constructor(){super(...arguments);this.editorExtensions=[];this.currentRuleSet=null;this.autoUpdateTimerId=null;this.dslStyleEl=null;this.dslColorVarEl=null;this.customTextStyleEl=null;this.vocabColorStyleEl=null;this.integrationManager=null;this.popoverTimerId=null;this.colorBlindAssistEl=null;this.lastPaletteSignature=""}async onload(){await this.loadSettings(),this.settings.language,this.applyColorMode(),this.applyCustomColors(),this.applyCustomTextColorsStyles(),this.applyVocabColorStyles(),this.matcher=new Ve,this.cache=new je(this.app,this.manifest.id),await this.initRules(),this.editorExtensions=at(this.settings,this.matcher),this.registerEditorExtension(this.editorExtensions),this.registerMarkdownPostProcessor(eo(this.settings,this.matcher)),this.addSettingTab(new Re(this.app,this)),this.registerView(me,t=>new De(t,this)),this.registerCommands(),this.addRibbonIcon("palette",h("command.refresh"),()=>{this.refreshAll()}),this.addRibbonIcon("map",h("colorMap.title"),()=>{fe(this.app)}),this.registerEvent(this.app.workspace.on("active-leaf-change",t=>{this.onActiveLeafChange(t)})),this.registerEvent(this.app.vault.on("create",()=>{this.refreshFileColorizer()})),this.registerEvent(this.app.vault.on("rename",()=>{this.refreshFileColorizer()})),this.registerEvent(this.app.metadataCache.on("changed",()=>{this.refreshFileColorizer()})),this.registerEvent(this.app.workspace.on("editor-menu",(t,e)=>{this.onEditorMenu(t,e)})),this.registerEvent(this.app.workspace.on("editor-selection-change",t=>{this.onEditorSelectionChange(t)})),this.app.workspace.onLayoutReady(()=>{this.refreshFileColorizer(),this.settings.ruleSource==="remote"&&this.settings.autoUpdateRules&&this.checkForUpdates(!1),this.setupAutoUpdateTimer(),this.initIntegrations()})}async onunload(){dt(),pt(this.app),this.cleanupIntegrations(),document.body.removeClass("prompt-colorizer-light","prompt-colorizer-dark"),document.body.removeClass("pc-light","pc-dark"),this.resetCustomColors(),this.autoUpdateTimerId!==null&&(window.clearInterval(this.autoUpdateTimerId),this.autoUpdateTimerId=null),this.dslStyleEl&&(this.dslStyleEl.remove(),this.dslStyleEl=null),this.dslColorVarEl&&(this.dslColorVarEl.remove(),this.dslColorVarEl=null),this.customTextStyleEl&&(this.customTextStyleEl.remove(),this.customTextStyleEl=null),xe(),this.popoverTimerId!==null&&(window.clearTimeout(this.popoverTimerId),this.popoverTimerId=null)}async initRules(){var e,o;let t=null;if(this.settings.ruleSource!=="builtin"){let s=await this.cache.loadRuleFiles();if(s){let r=await this.cache.loadVersion();t=ye(s,(e=r==null?void 0:r.version)!=null?e:"",(o=r==null?void 0:r.updateTime)!=null?o:"")}}t||(t=ot()),t&&(this.currentRuleSet=t,this.matcher.setRuleSet(t),this.applyDynamicColorVariables(t.colorTokens),this.applyDynamicStyles(t.styleRules,t.colorTokens))}applyDynamicColorVariables(t){var o;if(this.currentRuleSet){this.applyDynamicColorVariablesWith(t,this.currentRuleSet.styleRules);return}this.dslColorVarEl&&this.dslColorVarEl.remove();let e=st(t,this.settings.colorScheme,(o=this.settings.tokenDeriveAlphas)!=null?o:{});e&&(this.dslColorVarEl=document.createElement("style"),this.dslColorVarEl.id="prompt-colorizer-color-vars",this.dslColorVarEl.textContent=e,document.head.appendChild(this.dslColorVarEl),this.applyCustomColors())}applyDynamicStyles(t,e={}){this.dslStyleEl&&this.dslStyleEl.remove();let o=this.filterStyleRulesByTokenEnabled(t),s=jt(o,e);this.dslStyleEl=document.createElement("style"),this.dslStyleEl.id="prompt-colorizer-dsl-styles",this.dslStyleEl.textContent=s,document.head.appendChild(this.dslStyleEl)}filterStyleRulesByTokenEnabled(t){var r;let e=(r=this.settings.tokenEnabled)!=null?r:{},o=Object.entries(e).filter(([,n])=>!n).map(([n])=>n);if(o.length===0)return t;let s={};for(let[n,l]of Object.entries(t)){let c=JSON.stringify(l);o.some(d=>new RegExp(`\\b${d}\\b`).test(c))||(s[n]=l)}return s}getActiveRuleSource(){var n,l;let t=(n=this.settings.ruleSources)!=null?n:[],e=this.settings.activeRuleSourceId,o=t.find(c=>c.id===e&&c.enabled),s=(l=o==null?void 0:o.rawBaseUrl)!=null?l:this.settings.gitRawBaseUrl,r=this.settings.gitTokenEnabled&&this.settings.gitToken?this.settings.gitToken:void 0;return{url:s,token:r}}async checkForUpdates(t=!0){var r,n,l,c,p,d,u,g,m,b,f,v;let{url:e,token:o}=this.getActiveRuleSource();if(!e){t&&new _.Notice(h("notice.noGitUrl"));return}let s=Date.now();try{t&&new _.Notice(h("notice.checkingUpdates"));let y=await go(e,o);if(!y){await this.savePullReport({timestamp:Date.now(),success:!1,remoteVersion:"",remoteUpdateTime:"",remoteHash:"",localVersion:(n=(r=await this.cache.loadVersion())==null?void 0:r.version)!=null?n:null,hasUpdate:!1,files:[],categories:[],totalFiles:5,successFiles:0,totalRules:0,totalTerms:0,duration:Date.now()-s,error:"\u65E0\u6CD5\u83B7\u53D6\u8FDC\u7A0B\u7248\u672C\u4FE1\u606F"}),t&&new _.Notice(h("notice.fetchFailed"));return}let x=await this.cache.loadVersion();if(!ho(x,y)){await this.savePullReport({timestamp:Date.now(),success:!0,remoteVersion:y.version,remoteUpdateTime:y.updateTime,remoteHash:(l=y.hash)!=null?l:"",localVersion:(c=x==null?void 0:x.version)!=null?c:null,hasUpdate:!1,files:[],categories:[],totalFiles:5,successFiles:5,totalRules:0,totalTerms:0,duration:Date.now()-s}),t&&new _.Notice(h("notice.alreadyLatest")),this.settings.lastCheckTime=Date.now(),await this.saveSettings();return}t&&new _.Notice(h("notice.downloading"));let R=await this.cache.backupCurrentCache(),{files:w,results:T}=await fo(e,o),L=w?yo(w):[],G=w?bo(w):0;if(!w){let P=T.filter(A=>A.success).length;await this.savePullReport({timestamp:Date.now(),success:!1,remoteVersion:y.version,remoteUpdateTime:y.updateTime,remoteHash:(p=y.hash)!=null?p:"",localVersion:(d=x==null?void 0:x.version)!=null?d:null,hasUpdate:!0,files:T,categories:L,totalFiles:5,successFiles:P,totalRules:0,totalTerms:G,duration:Date.now()-s,error:`${P}/5 \u4E2A\u6587\u4EF6\u62C9\u53D6\u6210\u529F`}),t&&new _.Notice(h("notice.downloadFailed"));return}let E={version:y.version,updateTime:y.updateTime,hash:y.hash||mo(Object.values(w).join("")),fetchedAt:Date.now()};this.settings.downloadToCache&&(await this.cache.saveRuleFiles(w),await this.cache.saveVersion(E));let k=ye(w,E.version,E.updateTime);if(k){this.currentRuleSet=k,this.matcher.setRuleSet(k),this.applyDynamicColorVariables(k.colorTokens),this.applyDynamicStyles(k.styleRules,k.colorTokens),this.refreshEditorExtensions(),this.settings.lastCheckTime=Date.now();let P=k.rules.length+k.lexicons.length+k.contextRules.length;await this.savePullReport({timestamp:Date.now(),success:!0,remoteVersion:y.version,remoteUpdateTime:y.updateTime,remoteHash:(u=y.hash)!=null?u:"",localVersion:(g=x==null?void 0:x.version)!=null?g:null,hasUpdate:!0,files:T,categories:L,totalFiles:5,successFiles:5,totalRules:P,totalTerms:G,duration:Date.now()-s}),await this.saveSettings(),t&&new _.Notice(h("notice.updateSuccess")+` v${E.version}`)}else{if(R)if(await this.cache.rollbackToPrevCache()){let A=await this.cache.loadRuleFiles(),M=await this.cache.loadVersion();if(A&&M){let I=ye(A,M.version,M.updateTime);I&&(this.currentRuleSet=I,this.matcher.setRuleSet(I),this.applyDynamicColorVariables(I.colorTokens),this.applyDynamicStyles(I.styleRules,I.colorTokens),this.refreshEditorExtensions())}t&&new _.Notice(h("notice.compileFailed")+"(\u5DF2\u56DE\u6EDA\u5230\u4E0A\u4E00\u7248\u672C)",5e3)}else t&&new _.Notice(h("notice.compileFailed"));else t&&new _.Notice(h("notice.compileFailed"));await this.savePullReport({timestamp:Date.now(),success:!1,remoteVersion:y.version,remoteUpdateTime:y.updateTime,remoteHash:(m=y.hash)!=null?m:"",localVersion:(b=x==null?void 0:x.version)!=null?b:null,hasUpdate:!0,files:T,categories:L,totalFiles:5,successFiles:5,totalRules:0,totalTerms:G,duration:Date.now()-s,error:"\u89C4\u5219\u7F16\u8BD1\u5931\u8D25"})}}catch(y){if(console.error("[PromptColorizer] \u89C4\u5219\u66F4\u65B0\u5931\u8D25:",y),await this.savePullReport({timestamp:Date.now(),success:!1,remoteVersion:"",remoteUpdateTime:"",remoteHash:"",localVersion:(v=(f=await this.cache.loadVersion())==null?void 0:f.version)!=null?v:null,hasUpdate:!1,files:[],categories:[],totalFiles:5,successFiles:0,totalRules:0,totalTerms:0,duration:Date.now()-s,error:y instanceof Error?y.message:String(y)}),t){let x=y instanceof Error?y.message:String(y);new _.Notice(h("notice.updateError")+`: ${x}`,8e3)}}}async savePullReport(t){this.settings.gitReportEnabled&&(this.settings.lastPullReport=JSON.stringify(t),await this.saveSettings())}getPullReport(){if(!this.settings.lastPullReport)return null;try{return JSON.parse(this.settings.lastPullReport)}catch(t){return null}}async reloadRules(){await this.initRules(),this.refreshEditorExtensions()}async clearRuleCache(){await this.cache.clearCache();let t=ot();t&&(this.currentRuleSet=t,this.matcher.setRuleSet(t),this.applyDynamicColorVariables(t.colorTokens),this.applyDynamicStyles(t.styleRules,t.colorTokens),this.refreshEditorExtensions())}setupAutoUpdateTimer(){if(this.autoUpdateTimerId!==null&&(window.clearInterval(this.autoUpdateTimerId),this.autoUpdateTimerId=null),this.settings.autoUpdateRules&&this.settings.ruleSource==="remote"){let t=this.settings.autoUpdateInterval*3600*1e3;this.autoUpdateTimerId=window.setInterval(()=>{this.checkForUpdates(!1)},t),this.registerInterval(this.autoUpdateTimerId)}}async loadSettings(){this.settings=Ct(we,await this.loadData())}async saveSettings(){await this.saveData(this.settings)}t(t){return h(t)}async initIntegrations(){this.integrationManager=new ze(this.app,this.settings),await this.integrationManager.initIntegrations()}cleanupIntegrations(){var t;(t=this.integrationManager)==null||t.cleanup(),this.integrationManager=null}registerCommands(){let t=h("command.groupPrefix");this.addCommand({id:"refresh-coloring",name:t+h("command.refresh"),callback:()=>{this.refreshAll(),new _.Notice(h("notice.refreshed"))}}),this.addCommand({id:"toggle-editor-highlight",name:t+h("command.toggleHighlight"),callback:()=>{this.settings.editorHighlightEnabled=!this.settings.editorHighlightEnabled,this.saveSettings(),this.refreshEditorExtensions(),new _.Notice(this.settings.editorHighlightEnabled?h("notice.enabled"):h("notice.disabled"))}}),this.addCommand({id:"update-rules",name:t+h("command.updateRules"),callback:()=>{this.checkForUpdates(!0)}}),this.addCommand({id:"reload-rules",name:t+h("command.reloadRules"),callback:()=>{this.reloadRules(),new _.Notice(h("notice.rulesReloaded"))}}),this.addCommand({id:"apply-color-to-selection",name:t+h("customText.cmdApply"),editorCallback:e=>{this.applyColorToSelection(e)}}),this.addCommand({id:"remove-color-from-selection",name:t+h("customText.cmdRemove"),editorCallback:e=>{this.removeColorFromSelection(e)}}),this.addCommand({id:"export-full-settings",name:t+h("command.exportFull"),callback:async()=>{try{await ro(this.settings,this.manifest.version,this.app)}catch(e){new _.Notice(`${h("notice.exportFailed")}: ${e instanceof Error?e.message:String(e)}`)}}}),this.addCommand({id:"import-full-settings",name:t+h("command.importFull"),editorCallback:async e=>{try{await this.importSettingsFromCurrentFile(e)}catch(o){new _.Notice(`${h("notice.importFailed")}: ${o instanceof Error?o.message:String(o)}`)}}}),this.addCommand({id:"export-custom-text-colors",name:t+h("command.exportCustomTextColors"),callback:async()=>{var e;try{await io((e=this.settings.customTextColors)!=null?e:[],this.manifest.version,this.app)}catch(o){new _.Notice(`${h("notice.exportFailed")}: ${o instanceof Error?o.message:String(o)}`)}}}),this.addCommand({id:"export-folder-mappings",name:t+h("command.exportFolderMappings"),callback:async()=>{var e;try{await no((e=this.settings.folderMappings)!=null?e:[],this.manifest.version,this.app)}catch(o){new _.Notice(`${h("notice.exportFailed")}: ${o instanceof Error?o.message:String(o)}`)}}}),this.addCommand({id:"open-color-map-panel",name:t+h("colorMap.openPanel"),callback:()=>{fe(this.app)}})}async importSettingsFromCurrentFile(t){let e=this.app.workspace.getActiveFile();if(!e){new _.Notice(h("notice.importFileError"));return}let o;try{o=await this.app.vault.read(e)}catch(r){new _.Notice(h("notice.importFileError"));return}let s=ao(o);if(!s){new _.Notice(h("notice.importInvalidFormat"));return}try{let r=lo(s,this.settings);this.settings=r,await this.saveSettings(),this.applyColorMode(),this.applyCustomColors(),this.applyCustomTextColorsStyles(),await this.initRules(),this.refreshEditorExtensions(),this.refreshAll(),new _.Notice(h("notice.importSuccess"),4e3)}catch(r){new _.Notice(`${h("notice.importFailed")}: ${r instanceof Error?r.message:String(r)}`)}}applyCustomTextColorsStyles(){if(this.customTextStyleEl&&this.customTextStyleEl.remove(),!this.settings.customTextColors||this.settings.customTextColors.length===0)return;let t=Kt(this.settings.customTextColors);t&&(this.customTextStyleEl=document.createElement("style"),this.customTextStyleEl.id="prompt-colorizer-custom-text-colors",this.customTextStyleEl.textContent=t,document.head.appendChild(this.customTextStyleEl),this.app.workspace.trigger("prompt-colorizer:custom-colors-changed"))}applyColorToSelection(t){var s;let e=t.getSelection();if(!e||e.trim().length===0){new _.Notice(h("customText.noticeNoSelection"));return}let o=(s=this.settings.customTextColors.find(r=>r.text===e))!=null?s:null;gt(this.app,e,o,r=>{var n;if(o)o.color=r.color,o.color2=r.color2||"",o.gradientStops=r.gradientStops.map(l=>({...l})),o.gradientAngle=r.gradientAngle,o.caseSensitive=r.caseSensitive,o.wholeWord=r.wholeWord,o.effect=r.effect,o.effects=[...r.effects],o.effectParams=(n=r.effectParams)!=null?n:{},o.enabled=!0;else{let l=to(r);this.settings.customTextColors.push(l)}this.settings.customTextColorsEnabled=!0,this.saveSettings().then(()=>{this.applyCustomTextColorsStyles(),this.refreshEditorExtensions(),new _.Notice(h("customText.noticeApplied"))})})}removeColorFromSelection(t){let e=t.getSelection();if(!e||e.trim().length===0){new _.Notice(h("customText.noticeNoSelection"));return}let o=Ut(e,this.settings.customTextColors);if(o.length===0){new _.Notice(h("customText.noticeNotFound"));return}this.settings.customTextColors=this.settings.customTextColors.filter(s=>!o.includes(s.id)),this.saveSettings().then(()=>{this.applyCustomTextColorsStyles(),this.refreshEditorExtensions(),new _.Notice(h("customText.noticeRemoved"))})}async deleteCustomTextColor(t){this.settings.customTextColors=this.settings.customTextColors.filter(e=>e.id!==t),await this.saveSettings(),this.applyCustomTextColorsStyles(),this.refreshEditorExtensions()}async updateCustomTextColor(t,e){let o=this.settings.customTextColors.find(s=>s.id===t);o&&(Object.assign(o,e),await this.saveSettings(),this.applyCustomTextColorsStyles(),this.refreshEditorExtensions())}editCustomTextColor(t){let e=this.settings.customTextColors.find(o=>o.id===t);e&&gt(this.app,e.text,e,o=>{var s;e.text=o.text,e.color=o.color,e.color2=o.color2||"",e.gradientStops=o.gradientStops.map(r=>({...r})),e.gradientAngle=o.gradientAngle,e.caseSensitive=o.caseSensitive,e.wholeWord=o.wholeWord,e.effect=o.effect,e.effects=[...o.effects],e.effectParams=(s=o.effectParams)!=null?s:{},this.saveSettings().then(()=>{this.applyCustomTextColorsStyles(),this.refreshEditorExtensions(),new _.Notice(h("customText.noticeApplied"))})})}onEditorMenu(t,e){so(t,e,{onApply:()=>{this.showPopoverForSelection(e)},onRemove:()=>{this.removeColorFromSelection(e)},onOpenPicker:()=>{this.applyColorToSelection(e)}})}onEditorSelectionChange(t){var s;if(this.popoverTimerId!==null&&(window.clearTimeout(this.popoverTimerId),this.popoverTimerId=null),!this.settings.customTextColorsEnabled||!this.settings.customTextPopoverAutoShow)return;let e=t.getSelection();if(!e||e.trim().length===0){xe();return}if(e.length>200){xe();return}let o=Math.max(0,Math.min(2e3,(s=this.settings.customTextPopoverDelay)!=null?s:350));this.popoverTimerId=window.setTimeout(()=>{this.showPopoverForSelection(t)},o)}showPopoverForSelection(t){var s;let e=t.getSelection();if(!e||e.trim().length===0){new _.Notice(h("customText.noticeNoSelection"));return}let o=(s=this.settings.customTextColors.find(r=>r.text===e))!=null?s:null;oo(this.app,t,{selectedText:e,existing:o,onApplyColor:r=>{this.applyQuickColor(e,r,o)},onOpenAdvanced:()=>{this.applyColorToSelection(t)},onRemove:()=>{this.removeColorFromSelection(t)}})}async applyQuickColor(t,e,o){if(o)o.color=e;else{let s={id:"c"+Date.now().toString(36)+Math.random().toString(36).slice(2,8),text:t,color:e,color2:"",gradientStops:[],gradientAngle:135,enabled:!0,caseSensitive:!1,wholeWord:!1,effect:"none",effects:[]};this.settings.customTextColors.push(s)}this.settings.customTextColorsEnabled=!0,await this.saveSettings(),this.applyCustomTextColorsStyles(),this.refreshEditorExtensions(),new _.Notice(h("customText.noticeColorApplied")+" "+e)}resolveActiveColorTokens(){var r,n,l,c,p;let t=(n=(r=this.currentRuleSet)==null?void 0:r.colorTokens)!=null?n:{},e=(c=(l=this.currentRuleSet)==null?void 0:l.palettes)!=null?c:{},o=this.settings.palettePreset||"";if(this.settings.folderPalettesEnabled&&((p=this.settings.folderPalettes)!=null&&p.length)){let d=this.app.workspace.getActiveFile();if(d){let g=this.settings.folderPalettes.filter(m=>d.path.startsWith(m.path+"/")).sort((m,b)=>b.path.length-m.path.length).find(m=>e[m.palette]);g&&(o=g.palette)}}let s=this.app.workspace.getActiveFile();if(s&&s.extension==="md"){let d=this.app.metadataCache.getFileCache(s),u=d==null?void 0:d.frontmatter;u&&typeof u["theme-palette"]=="string"&&u["theme-palette"]&&(o=u["theme-palette"])}return!o||!e[o]?t:{...t,...e[o].tokens}}applyColorMode(){if(document.body.removeClass("prompt-colorizer-light","prompt-colorizer-dark","pc-light","pc-dark"),this.settings.colorMode==="light"?document.body.addClass("prompt-colorizer-light","pc-light"):this.settings.colorMode==="dark"&&document.body.addClass("prompt-colorizer-dark","pc-dark"),this.currentRuleSet){let t=this.resolveActiveColorTokens();this.applyDynamicColorVariablesWith(t,this.currentRuleSet.styleRules)}document.body.classList.toggle("pc-colorblind-assist",!!this.settings.colorBlindAssist),this.applyColorBlindAssistStyles()}applyColorBlindAssistStyles(){if(this.colorBlindAssistEl&&(this.colorBlindAssistEl.remove(),this.colorBlindAssistEl=null),!this.settings.colorBlindAssist)return;let t=qt();t&&(this.colorBlindAssistEl=document.createElement("style"),this.colorBlindAssistEl.id="prompt-colorizer-colorblind-assist",this.colorBlindAssistEl.textContent=t,document.head.appendChild(this.colorBlindAssistEl))}applyDynamicColorVariablesWith(t,e){var s;this.dslColorVarEl&&this.dslColorVarEl.remove();let o=st(t,this.settings.colorScheme,(s=this.settings.tokenDeriveAlphas)!=null?s:{});o&&(this.dslColorVarEl=document.createElement("style"),this.dslColorVarEl.id="prompt-colorizer-color-vars",this.dslColorVarEl.textContent=o,document.head.appendChild(this.dslColorVarEl)),this.applyDynamicStyles(e,t),this.applyCustomColors()}applyCustomColors(){let t=document.documentElement;if(this.settings.customColors)for(let[e,o]of Object.entries(this.settings.customColors))o&&t.style.setProperty(e,o)}resetCustomColors(){let t=document.documentElement;if(this.settings.customColors)for(let e of Object.keys(this.settings.customColors))t.style.removeProperty(e);this.settings.customColors={}}refreshEditorExtensions(){let t=at(this.settings,this.matcher);this.editorExtensions.length=0,this.editorExtensions.push(...t),this.app.workspace.updateOptions()}refreshDynamicStyles(){let t=this.matcher.getStyleRules(),e=this.matcher.getColorTokens();this.applyDynamicStyles(t,e),this.applyVocabColorStyles()}getVocabTokens(){var e;let t=(e=this.settings.vocabCustomWords)!=null?e:{};return V.map(o=>{var u,g,m,b,f,v,y;let s=h(o.nameKey),r=h(o.descKey),n=this.matcher.getColorByCssClass(o.cssClasses[0]),l=(g=(u=this.settings.vocabColors)==null?void 0:u[o.id])!=null?g:"",c=(b=(m=this.settings.vocabTokenEnabled)==null?void 0:m[o.id])!=null?b:!0,p=Qe(this.currentRuleSet,o.id).length,d=(v=(f=t[o.id])==null?void 0:f.length)!=null?v:0;return{id:o.id,name:s,desc:r,categoryId:(y=Et[o.id])!=null?y:"",cssClasses:o.cssClasses,color:l||n||"var(--text-muted)",defaultColor:n,enabled:c,wordCount:p+d,builtinCount:p,customCount:d}})}getVocabCategories(){return _e.map(t=>({id:t.id,name:h(t.nameKey),desc:h(t.descKey),tokenIds:t.groups}))}getVocabWords(t){var s,r;let e=Qe(this.currentRuleSet,t),o=[...(r=(s=this.settings.vocabCustomWords)==null?void 0:s[t])!=null?r:[]];return{builtin:e,custom:o}}getVocabHitCounts(){var n;let t={};for(let l of V)t[l.id]=0;let e=this.app.workspace.getActiveViewOfType(_.MarkdownView);if(!e)return t;let o=e.editor.getValue();if(!o)return t;let s=this.settings.enabledRuleIds&&this.settings.enabledRuleIds.length>0?new Set(this.settings.enabledRuleIds):null,r=this.getAllMatches(o).length?this.getAllMatches(o):this.matcher.match(o,s);for(let l of r){let c=Pe[l.cssClass];c&&(t[c]=((n=t[c])!=null?n:0)+1)}return t}applyVocabColorStyles(){var s,r;this.vocabColorStyleEl&&(this.vocabColorStyleEl.remove(),this.vocabColorStyleEl=null);let t=(s=this.settings.vocabColors)!=null?s:{};if(Object.entries(t).filter(([n])=>n).length===0)return;let o="";for(let n of V){if(((r=this.settings.vocabTokenEnabled)==null?void 0:r[n.id])===!1)continue;let l=t[n.id];if(!l)continue;let c=n.cssClasses.map(p=>`.${p}`).join(", ");o+=`${c} { color: ${l} !important; }
`}o&&(this.vocabColorStyleEl=document.createElement("style"),this.vocabColorStyleEl.id="prompt-colorizer-vocab-colors",this.vocabColorStyleEl.textContent=o,document.head.appendChild(this.vocabColorStyleEl))}observeFileExplorerRedraw(){Zt(this.app,()=>{ct(this.app,this.settings)})}refreshFileColorizer(){pt(this.app);for(let t of Ke.FILE_COLORIZE_DELAYS)setTimeout(()=>{ct(this.app,this.settings)},t);this.observeFileExplorerRedraw()}refreshAll(){this.refreshEditorExtensions(),this.refreshFileColorizer(),this.applyColorMode(),this.applyCustomTextColorsStyles()}getRuleVersion(){return this.matcher.getVersion()}getColorTokens(){return this.matcher.getColorTokens()}getStyleRules(){return this.matcher.getStyleRules()}getColorByCssClass(t){return this.matcher.getColorByCssClass(t)}getCustomTextColorByCssClass(t){var o,s;let e=t.match(/^dsl-custom-text-(.+)$/);return e&&(s=(o=this.settings.customTextColors)==null?void 0:o.find(r=>r&&r.id===e[1]))!=null?s:null}getStyleRuleByCssClass(t){var e,o;return(o=(e=this.matcher.getStyleRules())==null?void 0:e[t])!=null?o:null}getAllMatches(t){return it(t,this.matcher,this.settings)}highlightTextToHtml(t){let e=this.settings.enabledRuleIds&&this.settings.enabledRuleIds.length>0?new Set(this.settings.enabledRuleIds):null,o=this.matcher.match(t,e).filter(l=>!l.block),s=l=>l.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),r="",n=0;for(let l of o){if(l.from<n)continue;let c=Ge[l.cssClass];if(c&&this.settings[c]===!1)continue;r+=s(t.slice(n,l.from));let p=s(l.cssClass);r+=`<span class="${p}">${s(t.slice(l.from,l.to))}</span>`,n=l.to}return r+=s(t.slice(n)),r}onActiveLeafChange(t){if(!t)return;let e=this.app.workspace.getActiveFile();e&&e.extension==="md"&&Qt(this.app,e,this.settings);let o=this.computeActivePaletteSignature(e);o!==this.lastPaletteSignature&&(this.lastPaletteSignature=o,this.applyColorMode()),setTimeout(()=>{this.refreshFileColorizer()},200)}computeActivePaletteSignature(t){var o;let e=this.settings.palettePreset||"-";if(this.settings.folderPalettesEnabled&&t&&((o=this.settings.folderPalettes)!=null&&o.length)){let s=this.settings.folderPalettes.filter(r=>t.path.startsWith(r.path+"/")).sort((r,n)=>n.path.length-r.path.length)[0];s&&(e=s.palette)}if(t&&t.extension==="md"){let s=this.app.metadataCache.getFileCache(t),r=s==null?void 0:s.frontmatter;r&&typeof r["theme-palette"]=="string"&&r["theme-palette"]&&(e=r["theme-palette"])}return e}};Ke.FILE_COLORIZE_DELAYS=[0,100,300,800,2e3];var qe=Ke;
