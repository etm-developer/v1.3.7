"use strict";var _stringify=require("babel-runtime/core-js/json/stringify"),_stringify2=_interopRequireDefault(_stringify);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var result,fs=require("fs"),NodeVM=require("vm2").NodeVM,code="",stdin=process.openStdin(),console=[];function getSafeRunner(){var e=this;return function(s,n){var t,o=function(e){s.send(e,(0,_stringify2.default)([].slice.call(arguments,1)))};e.print=o.bind(e,"stdout"),e.console={log:o.bind(e,"stdout")},e.process={stdout:{write:o.bind(e,"stdout")}},e.postMessage=o.bind(e,"message"),o("end",(t=n,Function("return eval("+(0,_stringify2.default)(t+"")+")"))())}}function run(){var e=vm.createContext();e.setTimeout=function(e,s){"string"==typeof e?setTimeout(new Function(e),s):setTimeout(e,s)},e.clearTimeout=clearTimeout;var s=vm.runInContext("("+getSafeRunner.toString()+")()",e);try{s({send:function(e,s){switch(e){case"stdout":case"end":process.stdout.write(JSON.parse(s)[0]);break;case"message":process.send(JSON.parse(s)[0]);break;default:throw new Error("Unknown event type")}},exit:function(){processExit()}},code)}catch(e){result=e.name+": "+e.message}process.on("message",processMessageListener.bind(null,e)),process.send("__sandbox_inner_ready__"),checkIfProcessFinished(e)}function processMessageListener(e,s){vm.runInContext('if (typeof onmessage === "function") { onmessage('+(0,_stringify2.default)(String(s))+"); }",e),checkIfProcessFinished(e)}function checkIfProcessFinished(e){"function"!==vm.runInContext("typeof onmessage",e)&&processExit()}function processExit(){process.removeListener("message",processMessageListener),process.stdout.on("finish",function(){process.exit(0)})}stdin.on("data",function(e){code+=e}),stdin.on("end",run);