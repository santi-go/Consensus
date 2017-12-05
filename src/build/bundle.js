!function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),r=n(2),a=n(3);i.a.initialize("guests-email"),r.a.initialize("proposer-email"),a.a.initialize("proposal")},function(t,e,n){"use strict";n.d(e,"a",function(){return i});var i={container:null,EMAIL_PATTERN:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,initialize:function(t){this.container=document.getElementById(t),this.prepareEvents()},prepareEvents:function(){this.container.querySelector("input").addEventListener("blur",this.extractMail.bind(this))},extractMail:function(){for(var t=this.parseMail(),e=0;e<t.length;e++)this.createEmailBox(t[e]);this.cleanInput()},createEmailBox:function(t){var e=document.createElement("div");this.container.querySelector("div").appendChild(e),e.innerText=t.email;var n="invalidBox";t.valid&&(n="validBox"),e.classList.add(n),this.createRemoveButton(e)},cleanInput:function(){this.container.querySelector("input").value=""},validateEmail:function(t){return this.EMAIL_PATTERN.test(t)},parseMail:function(){var t=this.container.querySelector("input").value;if(""==t.trim())return[];for(var e=this.tokenize(t),n=[],i=0;i<e.length;i++)n.push({email:e[i],valid:this.validateEmail(e[i])});return n},tokenize:function(t){var e=t.split(","),n=[],i=!0,r=!1,a=void 0;try{for(var o,u=e[Symbol.iterator]();!(i=(o=u.next()).done);i=!0){var l=o.value,s=l.trim();""!=s&&n.push(s)}}catch(t){r=!0,a=t}finally{try{!i&&u.return&&u.return()}finally{if(r)throw a}}return n},removeEmailBox:function(t){var e=t.target.parentElement;e.parentElement.removeChild(e)},createRemoveButton:function(t){var e=document.createElement("div");t.appendChild(e),e.classList.add("close"),e.textContent="x",e.addEventListener("click",this.removeEmailBox)}}},function(t,e,n){"use strict";n.d(e,"a",function(){return i});var i={container:null,EMAIL_PATTERN:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,initialize:function(t){this.container=document.getElementById(t),this.prepareEvents()},prepareEvents:function(){var t=this.container.querySelector("input");t.addEventListener("blur",this.checkForMail.bind(this)),t.addEventListener("keypress",this.maskInput.bind(this))},checkForMail:function(t){var e=t.target.value,n=this.validateEmail(e);this.markValidity(n)},maskInput:function(t){var e=t.target.value,n=t.which,i=String.fromCharCode(n);this.isAllowedIn(e,i)||t.preventDefault()},isAllowedIn:function(t,e){var n=this.selectPattern(t);return this.matches(n,e)},markValidity:function(t){t?this.container.classList.remove("invalid"):this.container.classList.add("invalid")},validateEmail:function(t){return""==t.trim()||this.EMAIL_PATTERN.test(t)},matches:function(t,e){return new RegExp(t).exec(e)},selectPattern:function(t){var e={local:/[@!#$%&'*+\/=?^_`{|}~.-]|[a-z]|[0-9]/gi,domain:/[.-]|[a-z]|[0-9]/gi},n=e.local;return t.includes("@")&&(n=e.domain),n}}},function(t,e,n){"use strict";n.d(e,"a",function(){return i});var i={inputContainer:null,outputContainer:null,initialize:function(t){var e=document.getElementById(t);this.inputContainer=e.querySelector("pre"),this.inputContainer.textContent="Insert your proposal here...",this.outputContainer=e.querySelector("output"),this.prepareEvents()},prepareEvents:function(){this.inputContainer.addEventListener("paste",this.pasteProposal.bind(this))},pasteProposal:function(t){var e=t.clipboardData.getData("text"),n=this.sanitize(e),i=this.addBlockTags(n);this.outputContainer.innerHTML=i},sanitize:function(t){return t.replace(/<(?:.|\n)*?>/gm,"")},addBlockTags:function(t){var e="",n=t.split("\n"),i=!0,r=!1,a=void 0;try{for(var o,u=n[Symbol.iterator]();!(i=(o=u.next()).done);i=!0){var l=o.value;e+=this.addTag(l)}}catch(t){r=!0,a=t}finally{try{!i&&u.return&&u.return()}finally{if(r)throw a}}return e},addTag:function(t){var e=t.trim();return""==e?this.addBrTag():this.addParagraphTag(e)},addBrTag:function(){return"<br>\n"},addParagraphTag:function(t){return"<p>"+t+"</p>\n"}}}]);
//# sourceMappingURL=bundle.js.map