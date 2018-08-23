"use strict";var _regenerator=require("babel-runtime/regenerator"),_regenerator2=_interopRequireDefault(_regenerator),_typeof2=require("babel-runtime/helpers/typeof"),_typeof3=_interopRequireDefault(_typeof2),_asyncToGenerator2=require("babel-runtime/helpers/asyncToGenerator"),_asyncToGenerator3=_interopRequireDefault(_asyncToGenerator2),_getIterator2=require("babel-runtime/core-js/get-iterator"),_getIterator3=_interopRequireDefault(_getIterator2),_classCallCheck2=require("babel-runtime/helpers/classCallCheck"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=require("babel-runtime/helpers/createClass"),_createClass3=_interopRequireDefault(_createClass2);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var extend=require("util")._extend,jsonSql=require("json-sql")({separatedValues:!1}),dblite=require("./dblite"),PIFY=require("./index").PIFY,JOIN_TRS_FIELDS=["t.timestamp","t.type","t.height"],JOIN_FIELDS_TYPE={"t.timestamp":Number,"t.type":Number,"t.height":Number},Model=function(){function e(t,r){for(var n in(0,_classCallCheck3.default)(this,e),this.schema=t,this.db=r,this.fieldsType={},this.allFields=[],this.index=["_deleted_"],!t.tableFields&&t.fields&&(t.tableFields=t.fields),!t.table&&t.name&&(t.table=t.name),t.tableFields){var a=t.tableFields[n];switch(this.allFields.push(a.name),a.type){case"Number":case"BigInt":this.fieldsType[a.name]=Number;break;default:this.fieldsType[a.name]=String}a.index&&this.index.push(a.name)}}return(0,_createClass3.default)(e,[{key:"fields",value:function(){return this.allFields}},{key:"sync",value:function(){app.logger.debug("sync schema",this.schema);var e=[];this.schema.tableFields.push({name:"_deleted_",type:"Number",default:0}),e.push(jsonSql.build(this.schema).query);var t=!0,r=!1,n=void 0;try{for(var a,i=(0,_getIterator3.default)(this.index);!(t=(a=i.next()).done);t=!0){var s=a.value;e.push(jsonSql.build({type:"index",table:this.schema.table,name:this.schema.table+"_"+s,indexOn:s}).query)}}catch(e){r=!0,n=e}finally{try{!t&&i.return&&i.return()}finally{if(r)throw n}}return this.db.query(e.join(";"))}},{key:"parseRows",value:function(e,t){var r=this;return t.map(function(t){for(var n={},a=0;a<t.length;++a){var i=e[a];JOIN_FIELDS_TYPE[i]?n[i.split(".").join("_")]=JOIN_FIELDS_TYPE[i](t[a]):n[i=i.split(".")[1]]=r.fieldsType[i](t[a])}return n})}},{key:"findAll",value:function(){var e=(0,_asyncToGenerator3.default)(_regenerator2.default.mark(function e(t){var r,n,a,i,s,l,u,o,c,d,f,h=this;return _regenerator2.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r=(r=(t=t||{}).fields||this.allFields).map(function(e){return h.schema.table+"."+e}),"string"==typeof(n=t.sort))n="timestamp"===n?"t."+n:this.schema.table+"."+n;else if("object"===(void 0===n?"undefined":(0,_typeof3.default)(n)))for(a in n)"timestamp"===a?n["t."+a]=n[a]:n[this.schema.table+"."+a]=n[a],delete n[a];if(i={},Array.isArray(t.condition))for(s in i=t.condition.slice())for(l in i[s])i[s][this.schema.table+"."+l]=i[s][l],delete i[s][l];else if("object"===(0,_typeof3.default)(t.condition))for(u in i=extend({},t.condition))i[this.schema.table+"."+u]=i[u],delete i[u];return i[this.schema.table+"._deleted_"]=0,o={type:"select",table:this.schema.table,condition:i,fields:r,limit:t.limit,offset:t.offset,sort:n},-1!==this.allFields.indexOf("tid")&&(o.fields=r.concat(JOIN_TRS_FIELDS),(c={})[this.schema.table+".tid"]="t.id",o.join=[{type:"inner",table:"transactions",alias:"t",on:c}]),d=jsonSql.build(o).query,e.next=13,this.db.query(d);case 13:return f=e.sent,app.logger.debug("Model#findAll",d),e.abrupt("return",this.parseRows(o.fields,f));case 16:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"findOne",value:function(){var e=(0,_asyncToGenerator3.default)(_regenerator2.default.mark(function e(t){var r,n,a,i,s,l,u,o,c,d=this;return _regenerator2.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r=(r=t.fields||this.allFields).map(function(e){return d.schema.table+"."+e}),n={},Array.isArray(t.condition))for(a in n=t.condition.slice())for(i in n[a])n[a][this.schema.table+"."+i]=n[a][i],delete n[a][i];else if("object"===(0,_typeof3.default)(t.condition))for(s in n=extend({},t.condition))n[this.schema.table+"."+s]=n[s],delete n[s];return n[this.schema.table+"._deleted_"]=0,l={type:"select",table:this.schema.table,fields:r,condition:n},-1!==this.allFields.indexOf("tid")&&(l.fields=r.concat(JOIN_TRS_FIELDS),(u={})[this.schema.table+".tid"]="t.id",l.join=[{type:"inner",table:"transactions",alias:"t",on:u}]),o=jsonSql.build(l).query,e.next=10,this.db.query(o);case 10:if(c=e.sent,app.logger.debug("Model#findOne",o,c),c&&0!==c.length){e.next=14;break}return e.abrupt("return",null);case 14:return e.abrupt("return",this.parseRows(l.fields,c)[0]);case 15:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"create",value:function(e){var t=jsonSql.build({type:"insert",table:this.schema.table,values:e}).query;return this.db.query(t)}},{key:"exists",value:function(){var e=(0,_asyncToGenerator3.default)(_regenerator2.default.mark(function e(t){var r;return _regenerator2.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t&&"object"===(void 0===t?"undefined":(0,_typeof3.default)(t))&&(t._deleted_=0),e.next=3,this.count(t);case 3:return r=e.sent,e.abrupt("return",r>0);case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"count",value:function(){var e=(0,_asyncToGenerator3.default)(_regenerator2.default.mark(function e(t){var r,n;return _regenerator2.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t&&"object"===(void 0===t?"undefined":(0,_typeof3.default)(t))&&(t._deleted_=0),r=(r=jsonSql.build({type:"select",table:this.schema.table,fields:["count(*)"],condition:t}).query).replace(/"/g,""),e.next=5,this.db.query(r);case 5:return n=e.sent,e.abrupt("return",Number(n[0][0]));case 7:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()}]),e}(),Transaction=function(){function e(t){(0,_classCallCheck3.default)(this,e),this.db=t}return(0,_createClass3.default)(e,[{key:"commit",value:function(){return this.db.query("RELEASE SAVEPOINT tmp")}},{key:"rollback",value:function(){return this.db.query("ROLLBACK TO SAVEPOINT tmp")}}]),e}(),Orm=function(){function e(t,r,n,a){(0,_classCallCheck3.default)(this,e),this.options=a,this.dblite=dblite(a.storage)}return(0,_createClass3.default)(e,[{key:"define",value:function(e,t){return t.type="create",new Model(t,this)}},{key:"query",value:function(e){return PIFY(this.dblite.query)(e)}},{key:"transaction",value:function(){var e=(0,_asyncToGenerator3.default)(_regenerator2.default.mark(function e(){return _regenerator2.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.query("SAVEPOINT tmp");case 2:return e.abrupt("return",new Transaction(this));case 3:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"close",value:function(){var e=(0,_asyncToGenerator3.default)(_regenerator2.default.mark(function e(){return _regenerator2.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.dblite.close(),e.next=3,PIFY(function(e){setTimeout(e,1e3)})();case 3:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}]),e}();module.exports=Orm;