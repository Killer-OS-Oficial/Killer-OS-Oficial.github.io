(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"/+cc":function(e,a,t){
/*!
 * Fuse.js v3.6.1 - Lightweight fuzzy-search (http://fusejs.io)
 * 
 * Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 */
e.exports=function(e){var a={};function t(n){if(a[n])return a[n].exports;var i=a[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=e,t.c=a,t.d=function(e,a,n){t.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,a){if(1&a&&(e=t(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var i in e)t.d(n,i,function(a){return e[a]}.bind(null,i));return n},t.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(a,"a",a),a},t.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},t.p="",t(t.s=0)}([function(e,a,t){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,a){for(var t=0;t<a.length;t++){var n=a[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var r=t(1),o=t(7),s=o.get,c=(o.deepValue,o.isArray),d=function(){function e(a,t){var n=t.location,i=void 0===n?0:n,r=t.distance,o=void 0===r?100:r,c=t.threshold,d=void 0===c?.6:c,l=t.maxPatternLength,h=void 0===l?32:l,u=t.caseSensitive,p=void 0!==u&&u,f=t.tokenSeparator,b=void 0===f?/ +/g:f,v=t.findAllMatches,g=void 0!==v&&v,m=t.minMatchCharLength,y=void 0===m?1:m,w=t.id,k=void 0===w?null:w,x=t.keys,q=void 0===x?[]:x,j=t.shouldSort,z=void 0===j||j,S=t.getFn,_=void 0===S?s:S,M=t.sortFn,C=void 0===M?function(e,a){return e.score-a.score}:M,I=t.tokenize,O=void 0!==I&&I,A=t.matchAllTokens,L=void 0!==A&&A,P=t.includeMatches,B=void 0!==P&&P,T=t.includeScore,K=void 0!==T&&T,D=t.verbose,E=void 0!==D&&D;!function(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}(this,e),this.options={location:i,distance:o,threshold:d,maxPatternLength:h,isCaseSensitive:p,tokenSeparator:b,findAllMatches:g,minMatchCharLength:y,id:k,keys:q,includeMatches:B,includeScore:K,shouldSort:z,getFn:_,sortFn:C,verbose:E,tokenize:O,matchAllTokens:L},this.setCollection(a),this._processKeys(q)}var a,t;return a=e,(t=[{key:"setCollection",value:function(e){return this.list=e,e}},{key:"_processKeys",value:function(e){if(this._keyWeights={},this._keyNames=[],e.length&&"string"==typeof e[0])for(var a=0,t=e.length;a<t;a+=1){var n=e[a];this._keyWeights[n]=1,this._keyNames.push(n)}else{for(var i=null,r=null,o=0,s=0,c=e.length;s<c;s+=1){var d=e[s];if(!d.hasOwnProperty("name"))throw new Error('Missing "name" property in key object');var l=d.name;if(this._keyNames.push(l),!d.hasOwnProperty("weight"))throw new Error('Missing "weight" property in key object');var h=d.weight;if(h<0||h>1)throw new Error('"weight" property in key must bein the range of [0, 1)');r=null==r?h:Math.max(r,h),i=null==i?h:Math.min(i,h),this._keyWeights[l]=h,o+=h}if(o>1)throw new Error("Total of weights cannot exceed 1")}}},{key:"search",value:function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{limit:!1};this._log('---------\nSearch pattern: "'.concat(e,'"'));var t=this._prepareSearchers(e),n=t.tokenSearchers,i=t.fullSearcher,r=this._search(n,i);return this._computeScore(r),this.options.shouldSort&&this._sort(r),a.limit&&"number"==typeof a.limit&&(r=r.slice(0,a.limit)),this._format(r)}},{key:"_prepareSearchers",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",a=[];if(this.options.tokenize)for(var t=e.split(this.options.tokenSeparator),n=0,i=t.length;n<i;n+=1)a.push(new r(t[n],this.options));return{tokenSearchers:a,fullSearcher:new r(e,this.options)}}},{key:"_search",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],a=arguments.length>1?arguments[1]:void 0,t=this.list,n={},i=[];if("string"==typeof t[0]){for(var r=0,o=t.length;r<o;r+=1)this._analyze({key:"",value:t[r],record:r,index:r},{resultMap:n,results:i,tokenSearchers:e,fullSearcher:a});return i}for(var s=0,c=t.length;s<c;s+=1)for(var d=t[s],l=0,h=this._keyNames.length;l<h;l+=1){var u=this._keyNames[l];this._analyze({key:u,value:this.options.getFn(d,u),record:d,index:s},{resultMap:n,results:i,tokenSearchers:e,fullSearcher:a})}return i}},{key:"_analyze",value:function(e,a){var t=this,n=e.key,i=e.arrayIndex,r=void 0===i?-1:i,o=e.value,s=e.record,d=e.index,l=a.tokenSearchers,h=void 0===l?[]:l,u=a.fullSearcher,p=a.resultMap,f=void 0===p?{}:p,b=a.results,v=void 0===b?[]:b;!function e(a,i,r,o){if(null!=i)if("string"==typeof i){var s=!1,d=-1,l=0;t._log("\nKey: ".concat(""===n?"--":n));var p=u.search(i);if(t._log('Full text: "'.concat(i,'", score: ').concat(p.score)),t.options.tokenize){for(var b=i.split(t.options.tokenSeparator),g=b.length,m=[],y=0,w=h.length;y<w;y+=1){var k=h[y];t._log('\nPattern: "'.concat(k.pattern,'"'));for(var x=!1,q=0;q<g;q+=1){var j=b[q],z=k.search(j),S={};z.isMatch?(S[j]=z.score,s=!0,x=!0,m.push(z.score)):(S[j]=1,t.options.matchAllTokens||m.push(1)),t._log('Token: "'.concat(j,'", score: ').concat(S[j]))}x&&(l+=1)}d=m[0];for(var _=m.length,M=1;M<_;M+=1)d+=m[M];d/=_,t._log("Token score average:",d)}var C=p.score;d>-1&&(C=(C+d)/2),t._log("Score average:",C);var I=!t.options.tokenize||!t.options.matchAllTokens||l>=h.length;if(t._log("\nCheck Matches: ".concat(I)),(s||p.isMatch)&&I){var O={key:n,arrayIndex:a,value:i,score:C};t.options.includeMatches&&(O.matchedIndices=p.matchedIndices);var A=f[o];A?A.output.push(O):(f[o]={item:r,output:[O]},v.push(f[o]))}}else if(c(i))for(var L=0,P=i.length;L<P;L+=1)e(L,i[L],r,o)}(r,o,s,d)}},{key:"_computeScore",value:function(e){this._log("\n\nComputing score:\n");for(var a=this._keyWeights,t=!!Object.keys(a).length,n=0,i=e.length;n<i;n+=1){for(var r=e[n],o=r.output,s=o.length,c=1,d=0;d<s;d+=1){var l=o[d],h=l.key,u=t?a[h]:1,p=0===l.score&&a&&a[h]>0?Number.EPSILON:l.score;c*=Math.pow(p,u)}r.score=c,this._log(r)}}},{key:"_sort",value:function(e){this._log("\n\nSorting...."),e.sort(this.options.sortFn)}},{key:"_format",value:function(e){var a=[];if(this.options.verbose){var t=[];this._log("\n\nOutput:\n\n",JSON.stringify(e,(function(e,a){if("object"===n(a)&&null!==a){if(-1!==t.indexOf(a))return;t.push(a)}return a}),2)),t=null}var i=[];this.options.includeMatches&&i.push((function(e,a){var t=e.output;a.matches=[];for(var n=0,i=t.length;n<i;n+=1){var r=t[n];if(0!==r.matchedIndices.length){var o={indices:r.matchedIndices,value:r.value};r.key&&(o.key=r.key),r.hasOwnProperty("arrayIndex")&&r.arrayIndex>-1&&(o.arrayIndex=r.arrayIndex),a.matches.push(o)}}})),this.options.includeScore&&i.push((function(e,a){a.score=e.score}));for(var r=0,o=e.length;r<o;r+=1){var s=e[r];if(this.options.id&&(s.item=this.options.getFn(s.item,this.options.id)[0]),i.length){for(var c={item:s.item},d=0,l=i.length;d<l;d+=1)i[d](s,c);a.push(c)}else a.push(s.item)}return a}},{key:"_log",value:function(){var e;this.options.verbose&&(e=console).log.apply(e,arguments)}}])&&i(a.prototype,t),e}();e.exports=d},function(e,a,t){function n(e,a){for(var t=0;t<a.length;t++){var n=a[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var i=t(2),r=t(3),o=t(6),s=function(){function e(a,t){var n=t.location,i=void 0===n?0:n,r=t.distance,s=void 0===r?100:r,c=t.threshold,d=void 0===c?.6:c,l=t.maxPatternLength,h=void 0===l?32:l,u=t.isCaseSensitive,p=void 0!==u&&u,f=t.tokenSeparator,b=void 0===f?/ +/g:f,v=t.findAllMatches,g=void 0!==v&&v,m=t.minMatchCharLength,y=void 0===m?1:m,w=t.includeMatches,k=void 0!==w&&w;!function(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}(this,e),this.options={location:i,distance:s,threshold:d,maxPatternLength:h,isCaseSensitive:p,tokenSeparator:b,findAllMatches:g,includeMatches:k,minMatchCharLength:y},this.pattern=p?a:a.toLowerCase(),this.pattern.length<=h&&(this.patternAlphabet=o(this.pattern))}var a,t;return a=e,(t=[{key:"search",value:function(e){var a=this.options,t=a.isCaseSensitive,n=a.includeMatches;if(t||(e=e.toLowerCase()),this.pattern===e){var o={isMatch:!0,score:0};return n&&(o.matchedIndices=[[0,e.length-1]]),o}var s=this.options,c=s.maxPatternLength,d=s.tokenSeparator;if(this.pattern.length>c)return i(e,this.pattern,d);var l=this.options,h=l.location,u=l.distance,p=l.threshold,f=l.findAllMatches,b=l.minMatchCharLength;return r(e,this.pattern,this.patternAlphabet,{location:h,distance:u,threshold:p,findAllMatches:f,minMatchCharLength:b,includeMatches:n})}}])&&n(a.prototype,t),e}();e.exports=s},function(e,a){var t=/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;e.exports=function(e,a){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:/ +/g,i=new RegExp(a.replace(t,"\\$&").replace(n,"|")),r=e.match(i),o=!!r,s=[];if(o)for(var c=0,d=r.length;c<d;c+=1){var l=r[c];s.push([e.indexOf(l),l.length-1])}return{score:o?.5:1,isMatch:o,matchedIndices:s}}},function(e,a,t){var n=t(4),i=t(5);e.exports=function(e,a,t,r){for(var o=r.location,s=void 0===o?0:o,c=r.distance,d=void 0===c?100:c,l=r.threshold,h=void 0===l?.6:l,u=r.findAllMatches,p=void 0!==u&&u,f=r.minMatchCharLength,b=void 0===f?1:f,v=r.includeMatches,g=void 0!==v&&v,m=s,y=e.length,w=h,k=e.indexOf(a,m),x=a.length,q=[],j=0;j<y;j+=1)q[j]=0;if(-1!==k){var z=n(a,{errors:0,currentLocation:k,expectedLocation:m,distance:d});if(w=Math.min(z,w),-1!==(k=e.lastIndexOf(a,m+x))){var S=n(a,{errors:0,currentLocation:k,expectedLocation:m,distance:d});w=Math.min(S,w)}}k=-1;for(var _=[],M=1,C=x+y,I=1<<(x<=31?x-1:30),O=0;O<x;O+=1){for(var A=0,L=C;A<L;)n(a,{errors:O,currentLocation:m+L,expectedLocation:m,distance:d})<=w?A=L:C=L,L=Math.floor((C-A)/2+A);C=L;var P=Math.max(1,m-L+1),B=p?y:Math.min(m+L,y)+x,T=Array(B+2);T[B+1]=(1<<O)-1;for(var K=B;K>=P;K-=1){var D=K-1,E=t[e.charAt(D)];if(E&&(q[D]=1),T[K]=(T[K+1]<<1|1)&E,0!==O&&(T[K]|=(_[K+1]|_[K])<<1|1|_[K+1]),T[K]&I&&(M=n(a,{errors:O,currentLocation:D,expectedLocation:m,distance:d}))<=w){if(w=M,(k=D)<=m)break;P=Math.max(1,2*m-k)}}if(n(a,{errors:O+1,currentLocation:m,expectedLocation:m,distance:d})>w)break;_=T}var F={isMatch:k>=0,score:0===M?.001:M};return g&&(F.matchedIndices=i(q,b)),F}},function(e,a){e.exports=function(e,a){var t=a.errors,n=void 0===t?0:t,i=a.currentLocation,r=void 0===i?0:i,o=a.expectedLocation,s=void 0===o?0:o,c=a.distance,d=void 0===c?100:c,l=n/e.length,h=Math.abs(s-r);return d?l+h/d:h?1:l}},function(e,a){e.exports=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,t=[],n=-1,i=-1,r=0,o=e.length;r<o;r+=1){var s=e[r];s&&-1===n?n=r:s||-1===n||((i=r-1)-n+1>=a&&t.push([n,i]),n=-1)}return e[r-1]&&r-n>=a&&t.push([n,r-1]),t}},function(e,a){e.exports=function(e){for(var a={},t=e.length,n=0;n<t;n+=1)a[e.charAt(n)]=0;for(var i=0;i<t;i+=1)a[e.charAt(i)]|=1<<t-i-1;return a}},function(e,a){var t=function(e){return Array.isArray?Array.isArray(e):"[object Array]"===Object.prototype.toString.call(e)},n=function(e){return null==e?"":function(e){if("string"==typeof e)return e;var a=e+"";return"0"==a&&1/e==-1/0?"-0":a}(e)},i=function(e){return"string"==typeof e},r=function(e){return"number"==typeof e};e.exports={get:function(e,a){var o=[];return function e(a,s){if(s){var c=s.indexOf("."),d=s,l=null;-1!==c&&(d=s.slice(0,c),l=s.slice(c+1));var h=a[d];if(null!=h)if(l||!i(h)&&!r(h))if(t(h))for(var u=0,p=h.length;u<p;u+=1)e(h[u],l);else l&&e(h,l);else o.push(n(h))}else o.push(a)}(e,a),o},isArray:t,isString:i,isNum:r,toString:n}}])},GKVU:function(e,a,t){"use strict";var n=t("I+eb"),i=t("hXpO");n({target:"String",proto:!0,forced:t("rwPt")("anchor")},{anchor:function(e){return i(this,"a","name",e)}})},wQbG:function(e,a,t){"use strict";t.r(a);t("QWBl"),t("2B1R"),t("+2oP"),t("rB9j"),t("hByQ"),t("GKVU"),t("FZtP");var n=t("VTBJ"),i=t("/+cc"),r=t.n(i),o=t("CjXH"),s={components:{ChevronRightIcon:o.d,SearchIcon:o.h},data:function(){return{query:"",focusIndex:-1,focused:!1}},computed:{results:function(){return new r.a(this.headings,{keys:["value"],threshold:.25}).search(this.query).slice(0,15)},headings:function(){var e=[];return this.$static.allMarkdownPage.edges.map((function(e){return e.node})).forEach((function(a){a.headings.forEach((function(t){e.push(Object(n.a)(Object(n.a)({},t),{},{path:a.path,title:a.title}))}))})),e},showResult:function(){return this.focused&&this.query.length>0}},methods:{increment:function(){this.focusIndex<this.results.length-1&&this.focusIndex++},decrement:function(){this.focusIndex>=0&&this.focusIndex--},go:function(){var e;0!==this.results.length&&(e=-1===this.focusIndex?this.results[0]:this.results[this.focusIndex],this.$router.push(e.path+e.anchor),this.$refs.input.blur(),this.query="")}}},c=t("KHd+"),d=t("Kw5r"),l=d.a.config.optionMergeStrategies.computed,h={allMarkdownPage:{edges:[{node:{id:"521f361d0648ad6449bfff30629e6f7e",path:"/wiki/changelog/bspwm-1-0/",title:"Bspwm 1.0B",headings:[{depth:1,value:"Lanzamiento Killer-OS Linux - Bspwm 1.0B",anchor:"#lanzamiento-killer-os-linux---bspwm-10b"},{depth:2,value:"Agregado",anchor:"#agregado"},{depth:2,value:"Fix Errores",anchor:"#fix-errores"},{depth:2,value:"Actualizado (actualización)",anchor:"#actualizado-actualización"}]}},{node:{id:"9202fb330b997618c3b52dd479bc1c2f",path:"/wiki/other/screencast/",title:"Screencast",headings:[{depth:1,value:"Screencast, trabajar con video/audio",anchor:"#screencast-trabajar-con-videoaudio"},{depth:2,value:"Opciones de grabación",anchor:"#opciones-de-grabación"},{depth:2,value:"Audacity",anchor:"#audacity"},{depth:3,value:"Cambiar la voz",anchor:"#cambiar-la-voz"},{depth:2,value:"Reemplazar ffmpeg de audio",anchor:"#reemplazar-ffmpeg-de-audio"},{depth:2,value:"Ffmpeg",anchor:"#ffmpeg"},{depth:3,value:"Sobregrabación de audio",anchor:"#sobregrabación-de-audio"},{depth:2,value:"Stream. restream.io",anchor:"#stream-restreamio"},{depth:2,value:"Scripts ~/.bin",anchor:"#scripts-bin"},{depth:2,value:"Kdenlive",anchor:"#kdenlive"}]}},{node:{id:"e0460b2586e81605133fd739d7b305fe",path:"/wiki/wm/bspwm/",title:"Killer-OS Bspwm",headings:[{depth:1,value:"Killer-OS Linux Bspwm 1.0 Beta",anchor:"#killer-os-linux-bspwm-10-beta"},{depth:2,value:"Descargar imagen iso",anchor:"#descargar-imagen-iso"},{depth:2,value:"Registro",anchor:"#registro"},{depth:2,value:"Paneles",anchor:"#paneles"},{depth:3,value:"Barra superior, polybar",anchor:"#barra-superior-polybar"},{depth:3,value:"Barra inferior: bandeja, tinte2",anchor:"#barra-inferior-bandeja-tinte2"},{depth:2,value:"Teclas de acceso rápido",anchor:"#teclas-de-acceso-rápido"},{depth:2,value:"Gestión de modos y ventanas",anchor:"#gestión-de-modos-y-ventanas"},{depth:2,value:"Utilidades en ejecución",anchor:"#utilidades-en-ejecución"},{depth:2,value:"Archivos de configuración",anchor:"#archivos-de-configuración"},{depth:2,value:"Utilidades",anchor:"#utilidades"}]}},{node:{id:"64c4d4c5c5c91efdb894fa431d4127fa",path:"/wiki/packages/other-pkg/",title:"Añadir. programas",headings:[{depth:1,value:"Instalación adicional programas",anchor:"#instalación-adicional-programas"},{depth:2,value:"Construyendo paquetes desde la fuente.",anchor:"#construyendo-paquetes-desde-la-fuente"},{depth:2,value:"Virtualbox",anchor:"#virtualbox"},{depth:2,value:"Steam",anchor:"#steam"},{depth:2,value:"Instalar y ejecutar Tor",anchor:"#instalar-y-ejecutar-tor"},{depth:2,value:"Bluetooth",anchor:"#bluetooth"},{depth:2,value:"Paquetes de Office",anchor:"#paquetes-de-office"},{depth:2,value:"Impresoras",anchor:"#impresoras"}]}},{node:{id:"b8a40f578bd572a1cc3078745013d7d0",path:"/wiki/packages/iwd/",title:"Iwd wifi",headings:[{depth:1,value:"Configuración de wifi iwd",anchor:"#configuración-de-wifi-iwd"},{depth:2,value:"Instalación y uso de iwd",anchor:"#instalación-y-uso-de-iwd"},{depth:2,value:"Enciende automáticamente el wifi en el arranque",anchor:"#enciende-automáticamente-el-wifi-en-el-arranque"},{depth:2,value:"Asignar derechos y habilitar el servicio",anchor:"#asignar-derechos-y-habilitar-el-servicio"}]}},{node:{id:"e0e15421849ccd3a0b9831883c6c2254",path:"/wiki/",title:"Killer-OS Linux Wiki",headings:[{depth:1,value:"Documentación de Killer-OS Linux",anchor:"#documentación-de-killer-os-linux"},{depth:2,value:"¿Qué es Killer-OS Linux?",anchor:"#¿qué-es-killer-os-linux"},{depth:2,value:"Descargar distribución",anchor:"#descargar-distribución"},{depth:2,value:"Cambia la historia",anchor:"#cambia-la-historia"},{depth:2,value:"¿Tienes preguntas?",anchor:"#¿tienes-preguntas"},{depth:2,value:"Apóyanos financieramente",anchor:"#apóyanos-financieramente"}]}},{node:{id:"94d6d9f9e9141c87e1f070367679a4c0",path:"/wiki/other/notes/",title:"Notas",headings:[{depth:1,value:"Notas",anchor:"#notas"},{depth:2,value:"Descarga y escribe en usb",anchor:"#descarga-y-escribe-en-usb"},{depth:2,value:"Arch instalar sin medios (usb)",anchor:"#arch-instalar-sin-medios-usb"}]}},{node:{id:"6792e78372d5097ebbc51b6465cd8117",path:"/wiki/other/grub-uefi/",title:"Grub UEFI",headings:[{depth:1,value:"Instalación Grub UEFI",anchor:"#instalación-grub-uefi"},{depth:2,value:"Formación",anchor:"#formación"},{depth:2,value:"Instalación",anchor:"#instalación"}]}},{node:{id:"2fd92148a50ae108f728b3519417cfb6",path:"/wiki/other/gnupg/",title:"Gnupg",headings:[{depth:1,value:"Uso de GnuPG",anchor:"#uso-de-gnupg"},{depth:2,value:"Firmas digitales",anchor:"#firmas-digitales"}]}},{node:{id:"d2bfd4a0e696b9530700e23596c5e579",path:"/wiki/other/git-start/",title:"Git Start",headings:[{depth:1,value:"Configurando git y usando",anchor:"#configurando-git-y-usando"},{depth:2,value:"Configurar",anchor:"#configurar"},{depth:2,value:"Utilizando",anchor:"#utilizando"},{depth:2,value:"Trabajando con github",anchor:"#trabajando-con-github"}]}},{node:{id:"4afab9a63bedcf866507c2f2d3820c19",path:"/wiki/config/ssh/",title:"Настройка ssh",headings:[{depth:1,value:"Установка и настройка ssh",anchor:"#установка-и-настройка-ssh"},{depth:2,value:"Установка клиент - сервер",anchor:"#установка-клиент---сервер"},{depth:2,value:"Настройка на клиенте",anchor:"#настройка-на-клиенте"},{depth:3,value:"Генерация ключей",anchor:"#генерация-ключей"},{depth:3,value:"Отправка ключа на сервер",anchor:"#отправка-ключа-на-сервер"},{depth:3,value:"Настройка конфига на клиенте",anchor:"#настройка-конфига-на-клиенте"},{depth:2,value:"Настройка на сервере",anchor:"#настройка-на-сервере"},{depth:3,value:"X11Forwarding на сервере",anchor:"#x11forwarding-на-сервере"}]}},{node:{id:"42995c40ab38ea8746e3b4dc2b87e672",path:"/wiki/config/videocfg/",title:"Видео драйвера",headings:[{depth:1,value:"Видео драйвера",anchor:"#видео-драйвера"},{depth:2,value:"Intel",anchor:"#intel"},{depth:2,value:"Nvidia",anchor:"#nvidia"},{depth:2,value:"AMD",anchor:"#amd"},{depth:2,value:"Для виртуальной машины",anchor:"#для-виртуальной-машины"}]}},{node:{id:"1bbc2c48b4b5ff8a9382e14a5c1499a6",path:"/wiki/config/trouble/",title:"Решение проблем",headings:[{depth:1,value:"Решение проблем",anchor:"#решение-проблем"},{depth:2,value:"Изменить размер /tmp",anchor:"#изменить-размер-tmp"},{depth:2,value:"Ассоциации файлов",anchor:"#ассоциации-файлов"},{depth:2,value:"Проблема с win кодировкой",anchor:"#проблема-с-win-кодировкой"},{depth:2,value:"Проблема с windows time (сброс системного времени)",anchor:"#проблема-с-windows-time-сброс-системного-времени"},{depth:2,value:"Расширяем контекстное меню thunar",anchor:"#расширяем-контекстное-меню-thunar"},{depth:2,value:"Сброс пароля, root .",anchor:"https://wiki.archlinux.org/index.php/Reset_root_password_(%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9)"}]}},{node:{id:"2880d231c9e682004380f937ccd1366b",path:"/wiki/config/recomend/",title:"Рекомендации",headings:[{depth:1,value:"Рекомендации",anchor:"#рекомендации"},{depth:2,value:"Установка ядра Linux-zen ",anchor:"https://wiki.archlinux.org/index.php/Kernels"},{depth:2,value:"Уменьшение размера журнала логов Systemd",anchor:"#уменьшение-размера-журнала-логов-systemd"},{depth:2,value:"Отключаем переодическое увеличение загрузки из-за man-db.service",anchor:"#отключаем-переодическое-увеличение-загрузки-из-за-man-dbservice"},{depth:2,value:"Удаление особых скриптов live-среды",anchor:"#удаление-особых-скриптов-live-среды"},{depth:2,value:"Подробнее",anchor:"#подробнее"}]}},{node:{id:"b4386e4a7348f95d437b0107828bafe9",path:"/wiki/config/autologin/",title:"Автологин",headings:[{depth:1,value:"Автологин",anchor:"#автологин"},{depth:2,value:"Автологин с помощью .xinitrc и автозапуск Х после логина.",anchor:"#автологин-с-помощью-xinitrc-и-автозапуск-х-после-логина"},{depth:3,value:"Автологин через Lightdm.",anchor:"#автологин-через-lightdm"}]}},{node:{id:"d54f25d946f3d3c562f9d45cfed6d90c",path:"/wiki/whois/",title:"Brevemente sobre Killer-OS Linux",headings:[{depth:1,value:"Brevemente sobre Killer-OS Linux",anchor:"#brevemente-sobre-killer-os-linux"},{depth:2,value:"¿Qué tienen de especial Killer-OS?",anchor:"#¿qué-tienen-de-especial-killer-os"}]}},{node:{id:"d0db7bc7288436c77ffc9962eb984f7c",path:"/wiki/changelog/",title:"Changelog",headings:[{depth:1,value:"Changelog: historial de cambios",anchor:"#changelog-historial-de-cambiosimg-classg-image-g-image--lazy-g-image--loading-srcdataimagesvgxml3csvg-fillnone-viewbox0-0-1038-693-xmlnshttpwwww3org2000svg-xmlnsxlinkhttpwwww3org1999xlink3e3cdefs3e3cfilter-id__svg-blur-fbb2d29b4c84f8d580daa39543fa3f4a3e3cfegaussianblur-insourcegraphic-stddeviation403e3cfilter3e3cdefs3e3cimage-x0-y0-filterurl23__svg-blur-fbb2d29b4c84f8d580daa39543fa3f4a-width1038-height693-xlinkhrefdataimagesvg2bxml3bbase642civborw0kggoaaaansuheugaaaeaaaaarcayaaadiwo5haaaacxbiwxmaaastaaaleweampwyaaasreleqvro3s1acxguvbzo2atjstburthxcsoiowaykkwz753uzp6qpzfq7nr6y8isfhgqrbyjg46adokc4nmuhfal0bybhcc9m03jxlf1kfinuohcafcurvoo6ew7uqqmmo3i9pf9etqlt1657nnpuofdwujdwcxiak2b1gnqin4y2bddixdhdkznhorj8eeoeqmigixga9pwgecgyqlwnwwtbige049bdu0ygleyl2bft87tu3atunxamcdnhjezh69bb4vfh27gbg2bjfhb4iigo3bwarafz68mgv0myler2qiq4z0ikgezi2u44iqej4xlvr6dpbmsscqsfhlk2ix8e9yaytttjn872o4yxhispz5mqixtnuaaetajb2adg7ai4hon4e22btk50cokzmn7kfamvarupjyoqcceyifbqmvejjqtbieliq579scltm21mp4mrlb42snhiff8c934t1wez0euxahfsszygkdayxtaka4ccs6yqupmqvdcc4kscpfov6ayf8odiu2buvxkijobuyirsfnjriodybu6yx82mlzu8yuoaiqav13usbrd6x3epnce7m2buar95qegylma0qwpwkbzun0270w2bgfcxy9ibjjre6taiekevvzsajnibnsw9se7ddgbhpjadqypdomdo7hbyimelq3utbncpk3cyjljhtdzpek2hqs1w4u2yszdjh8b4ulhpckmijzibohpfouecuw896y99byspe3evkvr1dvu2q2dss4jhdlm7fwoyc5tiexpximuyjeynahdbfzybyg2boxn2bii55sbxycmindpiaiwvizd4oibmjjmo0t1v9tic6bgzeifoxdyiaszbukprocujcllhjyh2yocippdeirsvqpcn8dyqrpi8lrc5fcxkatkqp6tupize4iktlt8dthnqhz8fxgcdo4k4gj9k9zdyrwdax4c4awl6iyv82bjxjia6gwjaznacqsetojqdfha7azicnjoxywtg5jsbu2bmzpatnmw9vkax2bfkrh782btuwl0i0agjvs4kzddbueb0jyrcxf7nxk2bbr5q2bzjfpvma3md5mni0tmeloquaaieiojjogf9dm2buavyismsqm7kzxgb79cevibcf841rkbrr6ftvh18gthi1bff47nouvylsa1yifduudurk79epihxxesv8p2brwf2b0xmgfe1civhb2bcxmwfltjoh8l9mz4ma6j7in3r94jgu2bhddevynidcf3m6cuerumvvwudzvoass7ct4mqkuzgk4by4rpzyeo3tagt2bq2bv7q0fzfvzvgrhakdrjjreayjtokfxtlw1h2bgmwjdemx4y9mg8jm3stbufiput5xhk42bzp842b9v7a58ihtcrkypan0jlmhpy25gad5hdsunmz2heyarx84wvy8gaaermb8vopp7iuipd9aiqrabyt4cugin8u9degoms3bunv1p2bxixrd23hkje3aytuxddhm1wdhtw2b0hakmjr5wehgrqj8m0gtgrtbkazzsh2uq3elm966bb8neukc178xx7eznul1qvvnlrncq6lg6zsachnfhidcai28b8fp0hzlb8d5hnco4yw4spmtuta9eeovl3yi5p2boemanxsij1spz42hfjceveswqxt6io3jxblo9sl82xlktt35xz3qztdgj3hdoskob2bi6bbaockcsrwewztbt2xzguqecterm6cqhuzikkrgpygm52bvh3ntdtqubkmqmsaidhfqgvbue0xbyc73jh3ewdyeudamegidjm7h4camanlstwr3ucw5hiptwde8ukv2iu6dxnmjnqgidhkjdtvvfzryduph2bqmapvdzggyec7ukt1lokznqi2xqhyw16blqu03uafakguehfbrkwmgokzrzokbyz52bw87bkxlfywmrp2bvj2bcpr8yxbqkanv7abw3d38nwaqipzxk9jofsjjhq93ktcppjhja5ww5ltu6lrdeqj8lcjuc0hknk0qf18vrgq37jqnm0blzbp9ny2uwve1dauk2b2bcx2b0vigocegdicttld9gt2btocc1bmqemy0iqz8yohcrerfuobbwkjgth7ly1g0mbzpt6acsgkg75w8ctedooxsvxqbxrtsn19be8mytaa93bk42bbluq0b2b8cx1gkocahurk8uyowzyvhpe9aysoocag8vbpb2bmorfcjijhnwwdouqh6agjedmmm4xtlgrmpfbhpq5vkcdwcqwtihfqxi39uyld268n4pmufgwuotg7sh3kbus52gqylfdqkhcdifrzcrkrswtrd4qhrc1u1eas8gthcxuyv2zcvkt1qmh5cxsgdpzhcyqdeuzw4il8qjzf0twddh2753cpf67hutnqujijfimymy54wjmpuolg2b3jjyazk1u7lb2wlevf1d8ozbginavjzoafdvrsgmal5nxwme63n30wvzgjoxewg9taofohdbidondgmvguen9vq09fwihbeezzli3aj2gc2kw2lnoteezu2gpeyk77bbdwoaeadypfs2blwotrmago7yzmnqmweiive2bstxk8afvyruj7pupsxi02bzltbpgfosy5wrcliejs2do5unfdrko3frnaw2c2bb7d3vn9fsz86qb8sf2p55tpdt1dqydcbubugwmbfomhtg3n08tzqp2svxj1zxvvd1dxbi2bvscnc47v4f1s1bofwnqwjulvqp9yfz8n6dvp13v1pnu7nry3dnr6su6lgu2mmht9sxn6jpqkv28i1ffz2xdzlfqp61qab1fgcx9zmn5kksq2tkuv3h0lx8g1m2b9rku3ubzrj1matpuwd9nqy12baoa7exl2bq9efxh7milbsmh03y6ufadwyyhwzcmeeg1l84mxijhb126rhnqz7ys7by2b42bvdcpagfl3zbru6yberngevetz2bvd4azdux4ynjscwlbb1zkwoeypbq3osuarg5c3yovxucvpjd20fez3tg6rfyrmielm2jvkteng2h2bozqlgxil8pzqq8oev7o27leeqrlqy53uvmnr2pkttad7bera47eo0sj78b1b5d1tyaoiu6fawo8cs2b2e9tu2bd3wr7lfq9p8z235g0kynb6g13fh2byalbehhnxytcdgbsgfoesentcfg7fvn25b4mdbxryfftrcrccoaapdk3kec5u9nlgw9fbiyuxjlplxcyrn4e3otelc3r0wzxkbrgmzrccyg2cdzw6p5op2ilqrnbshvrvjn4h1ecvqlnbkik1nx62bpuw9tauhqm5cacezl0di8guwzrxifns6ffi8rg2bzbnzc6co8xyxuuzsbuig0seatgq3vbxet7irianp1aj7iq4fjciailxjecaixwiwqzjz8htso9t9qw2bnpopzexw7agd0wulufhdy9f2bcdpbdt3i9ondbdqwutjwvbw85eyyauqv4dhdauihltxvnybocm2bznce9ooseqoydhr8clueg7mdmbljmzrb8ru6d5dnzw0fq5f9cmfum8f7ff2n82fvyw2b5o2bgv12bfwfat4vb8zwc30bpzsun6cvndczm04cp1xgftmiapr7u0fxvnlea5w0slu2bcsskestteyxe3745ktqwlldrwtwimjyawqakwr5yw7250mqy3m00a2x84ix7gndbdvwfyfbtzqpquhgcraqdnuraz3a84twftukaomgfrky48pfhnqv2w6yyv3w22bip9v4y7pr9uoanmzzkzhp72bwtwjitwqdcmynts1sggxhtehzxl6hkpr2ttnewlg5lkszcmaghoptrszxpmtcevrbjxfnbp5hcgaqoxpepfjxgii3g2efvsbkvrevpcfgg4i0spuzzueodly2bjz392ghy0fsza24cl6qwb2b3r296cjbi8x2boumxofodvjuuusmf6mbe1guwa75h73wqyuxxof1r1hjsnd4ntmg3kjzgqp8x8fh2mycb3me3pdh2racgxdnfuigofjsam5544vd5g9pydlzdylezxas2bm4vegzt6m0wwln6pw3qfwvzu16jzanllscvsa29v6doynwlbqpqqqygsywodxetsz39dkfmpktpp2dqvogntcteqbxlglmwo2bw04rxpibljk9njnhbkgtbennpputmusgqx7zaouo5coxokbxguucrsojcswo2brsozj50jpchprdbhdraj2icvg49bqojegogo8jtzr6v7qihpjgyepdxsc3gi4fmbywpegyqfuyk4ruphzcn7xg09lkwok61x2b4lseachdzcpfdnfraeetlytanbhknm2brv8poernvhroqrqkplslyc2vfd4gq6ldy8lafgiwuff8oivnxfzulbhimtnzhlapcybfexvzok2bcsehlj44sshwqx2smcsmbtdfgqjg1i9cgr6br9a3np2bknw8fkundeavzutnkjcwkziuf1jti0cbsos2blyjueqgbke0ole3jyyvkjxx9mtnepkf7wqjjl5fpsiyuph7uvs4no9nsdid68enlo8fg6z7v2vpnd5usxizc1whsx2bodkpbek73g8qacoeqsqvc2brn67iiiyxv2bagofpr0oiwkmeoplryidio2fuwr8cld3wwbv7jspbe3da6cumy2beo2beoiznlfqoakyoute2pgjqkje9aemovcs2bbrg2qctdmxykcxpvcvygvp0n2bb02bk132b82ejgxb2hvab6452b8bei3aak5792b71lturamy8aqnkibqorw6gjbtukzvwd0l3h0oaznun3p9oq4s4psbnbhelgynog2bholoqdrervmfz2b92bzwj9f5swn5aagv2cvebqasx4xo67p9cqmbovedehrdrw4bagtywg2bxdfca4q3uoo50ihl3h3wz3j8m8ozbbiqaekqn4fsdn4e0zgs0ehoodcaaq9fcjmwjrlptjvgeb8wefhdhkj4lbe29sf7vou6ln7xy2bxnpmkgng9x5fduy57xb82b4vuzezf7hateekyfiwlaepsjaaygy2bmsxnoyk8gcringekbbnqvlnv4lmpqkhpobujl7vcoy2b1hc3oq2jl82bezppj2biyxrfua7tpnqqkunl7vhcvwrq0lx1zedsjtavi5keev4bs4twg1cxutjduvzmzpqfy2ilcscniqpdlzwshsandku0h6vbieqauoccdsofd1ec2bblagg3cwn5gvrisdt2b39v6kcskr22oyzcsqikwq2bxsvbc7h0oagot1dxmedl3uvubjusizeiymbyik0ebs5cqqnb1zjsi7g2bgivxqbzsxwyryzyiwfwcaqd2b045nmnmq2b05xpbugceovnwl0recasisdpflfk4fjmc5f8ejl5dbisdtayqkcuzitclznnby0qgewvegjcnu43nmk2bn882zw44l6o1gcvlc6soufr9grhdfjscvjnwma55oyc3itqx7vgreudtbokxl5yae3oyaaqfvgibgshrlr97acdmum8zrfqbf1bcayfoe9gzocoqd4hu0qlxqeqsajufssr0sne2koqsh3wunlop9mrmqfgycg8k7ixqmtllkqwem6vus5kzklazthpr5uxj0x6nklqizc9zwflsscb7sv4isxnoxrzdhp45zmhwjfsfsocxluixk2bnf4w9lssojl2b7bsjbgrskw1llztqzorjrcbjygqjydrkcw8kai9acduzpsyzz2bqv38xd2uj2nljyxecngps7qk5gzfmphkcokxwbytbbcrlotnca4cmjeww0adn44bmulj00bwrvhhyf6otl3yqmda3o5w4pj2thnlogl1qdtblnflkesglbuaxi3td620dlgy0krmpupoy4epo87irdedmvnxerpyw1mc9vbs2bsxqfwyuewb0wmdnx48yq2s1mj0te2bftucirbfcympzm1jv2bukvn7g5x3vujzoxeyboixifejeekejb7fc9a8k3juohhmpfdslybo7sy5ysxgyemiujokgs39q1ndgjrtgwvx6etvjzssufjvdc7hitmsk2vp8phy3o38b773d2nlefs02tqtlrobijmen8pmpyyhlmigf1t1fo0qny1eg2kgoqrjihe5kesxbfagrwudwecihv2hcv2iewtkn7xoncd8qjqdrpu8dzlraffiagbab8n3ioe3pbo81nw2b9ll3wormxcoxufw7pttbmva1balcgeheb6jtuwg0hal93txp9omfnnljdwaa3y1zumhgf5fkwkylnn5vrmq9jlfkarlwpomowdgbgoqaaaaabjru5erkjggg-3e3csvg3e-width1038-altchangelog-ctlos-linux-data-srcsetassetsstaticversion82a2fbdfadfa6bf032d7344f9f78506a8b365dbsvg-480w-assetsstaticversion4211159fadfa6bf032d7344f9f78506a8b365dbsvg-1038w-data-sizesmax-width-1038px-100vw-1038px-data-srcassetsstaticversion4211159fadfa6bf032d7344f9f78506a8b365dbsvgnoscriptimg-classg-image-g-image--lazy-g-image--loaded-srcassetsstaticversion4211159fadfa6bf032d7344f9f78506a8b365dbsvg-width1038-altchangelog-ctlos-linuxnoscript"},{depth:2,value:"Versiones",anchor:"#versiones"},{depth:2,value:"Contactos",anchor:"#contactos"}]}},{node:{id:"e38deb84d481f0a4d28f881f87c6fc3f",path:"/wiki/btrfs/btrfs-part2/",title:"Btrfs Continuar",headings:[{depth:1,value:"Transferencia Btrfs, recuperación",anchor:"#transferencia-btrfs-recuperación"},{depth:2,value:"Transferir a la partición btrfs, rsync",anchor:"#transferir-a-la-partición-btrfs-rsync"},{depth:2,value:"Instantánea a otra partición/disco",anchor:"#instantánea-a-otra-particióndisco"},{depth:3,value:"Envío de SSH",anchor:"#envío-de-ssh"}]}},{node:{id:"25bc1a47c783d36c0b02a08d48cbe76b",path:"/wiki/btrfs/btrfs-part1/",title:"Instalación de btrfs",headings:[{depth:1,value:"Instalación y uso de Btrfs",anchor:"#instalación-y-uso-de-btrfs"},{depth:2,value:"comenzando",anchor:"#comenzando"},{depth:2,value:"Usando btrfs",anchor:"#usando-btrfs"},{depth:2,value:"Instalar desde un sistema existente o desde un usb en vivo",anchor:"#instalar-desde-un-sistema-existente-o-desde-un-usb-en-vivo"}]}},{node:{id:"b50e8c711c48bf7be135303c62da955e",path:"/wiki/backup/timeshift-rsync/",title:"Timeshift, rsync",headings:[{depth:1,value:"Apoyo",anchor:"#apoyo"},{depth:2,value:"Timeshift",anchor:"#timeshift"},{depth:2,value:"Rsync",anchor:"#rsync"},{depth:2,value:"Recuperación",anchor:"#recuperación"}]}},{node:{id:"9939e82a15a61c1343f9631b019f42f9",path:"/wiki/backup/squashfs/",title:"Squashfs",headings:[{depth:1,value:"Copia de seguridad de Squashfs",anchor:"#copia-de-seguridad-de-squashfs"},{depth:2,value:"Reducir una partición con mksquashfs",anchor:"#reducir-una-partición-con-mksquashfs"},{depth:2,value:"Recuperación",anchor:"#recuperación"},{depth:2,value:"Montar una imagen",anchor:"#montar-una-imagen"}]}},{node:{id:"6758607a6e5a3f87f5060612489a9e39",path:"/wiki/backup/netcat/",title:"Netcat, ssh, rsync",headings:[{depth:2,value:"Trabajando con Netcat, ssh, rsync",anchor:"#trabajando-con-netcat-ssh-rsync"},{depth:2,value:"Un ejemplo de cómo obtener un túnel ssh",anchor:"#un-ejemplo-de-cómo-obtener-un-túnel-ssh"},{depth:2,value:"SSH ",anchor:"#ssh-scp"},{depth:2,value:"Sincronización Rsync",anchor:"#sincronización-rsync"}]}}]}},u=function(e){var a=e.options;a.__staticData?a.__staticData.data=h:(a.__staticData=d.a.observable({data:h}),a.computed=l({$static:function(){return a.__staticData.data}},a.computed))},p=Object(c.a)(s,(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"relative",on:{keydown:[function(a){return!a.type.indexOf("key")&&e._k(a.keyCode,"down",40,a.key,["Down","ArrowDown"])?null:e.increment(a)},function(a){return!a.type.indexOf("key")&&e._k(a.keyCode,"up",38,a.key,["Up","ArrowUp"])?null:e.decrement(a)},function(a){return!a.type.indexOf("key")&&e._k(a.keyCode,"enter",13,a.key,"Enter")?null:e.go(a)}]}},[t("label",{staticClass:"relative block"},[t("span",{staticClass:"sr-only"},[e._v("Buscar en Killer-OS Wiki")]),t("div",{staticClass:"absolute inset-y-0 left-0 flex items-center justify-center px-3 py-2 opacity-50"},[t("SearchIcon",{staticClass:"text-ui-typo",attrs:{size:"1.25x"}})],1),t("input",{ref:"input",staticClass:"block w-full py-2 pl-10 pr-4 border-2 rounded-lg bg-ui-sidebar border-ui-sidebar focus:bg-ui-background",class:{"rounded-b-none":e.showResult},attrs:{type:"search",placeholder:"Buscar en Killer-OS Wiki..."},domProps:{value:e.query},on:{focus:function(a){e.focused=!0},blur:function(a){e.focused=!1},input:function(a){e.focusIndex=-1,e.query=a.target.value},change:function(a){e.query=a.target.value}}})]),e.showResult?t("div",{staticClass:"fixed inset-x-0 z-50 overflow-y-auto border-2 border-t-0 rounded-lg rounded-t-none shadow-lg results bg-ui-background bottom:0 sm:bottom-auto sm:absolute border-ui-sidebar",staticStyle:{"max-height":"calc(100vh - 120px)"}},[t("ul",{staticClass:"px-4 py-2 m-0"},[0===e.results.length?t("li",{staticClass:"px-2"},[e._v("\n        No hay resultados para "),t("span",{staticClass:"font-bold"},[e._v(e._s(e.query))]),e._v(".\n      ")]):e._l(e.results,(function(a,n){return t("li",{key:a.path+a.anchor,staticClass:"border-ui-sidebar",class:{"border-b":n+1!==e.results.length},on:{mouseenter:function(a){e.focusIndex=n},mousedown:e.go}},[t("g-link",{staticClass:"block p-2 -mx-2 text-base font-bold rounded-lg",class:{"bg-ui-sidebar text-ui-primary":e.focusIndex===n},attrs:{to:a.path+a.anchor}},[a.value===a.title?t("span",[e._v("\n            "+e._s(a.value)+"\n          ")]):t("span",{staticClass:"flex items-center"},[e._v("\n            "+e._s(a.title)+"\n            "),t("ChevronRightIcon",{staticClass:"mx-1",attrs:{size:"1x"}}),t("span",{staticClass:"font-normal opacity-75"},[e._v(e._s(a.value))])],1)])],1)}))],2)]):e._e()])}),[],!1,null,null,null);"function"==typeof u&&u(p);a.default=p.exports}}]);