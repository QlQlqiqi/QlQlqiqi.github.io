(function(e){function t(t){for(var o,r,a=t[0],s=t[1],l=t[2],h=0,p=[];h<a.length;h++)r=a[h],Object.prototype.hasOwnProperty.call(c,r)&&c[r]&&p.push(c[r][0]),c[r]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);u&&u(t);while(p.length)p.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,a=1;a<n.length;a++){var s=n[a];0!==c[s]&&(o=!1)}o&&(i.splice(t--,1),e=r(r.s=n[0]))}return e}var o={},c={app:0},i=[];function r(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=o,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],s=a.push.bind(a);a.push=t,a=a.slice();for(var l=0;l<a.length;l++)t(a[l]);var u=s;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"131a":function(e,t,n){},"55e3":function(e,t,n){"use strict";n("131a")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("VueAMap")],1)},i=[],r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"bmap-page-container",attrs:{id:"container"}},[n("el-amap",{ref:"map",staticClass:"bmap-demo",attrs:{center:e.center,zoom:e.zoom},on:{init:e.init,click:e.click}},[n("el-amap-marker",{attrs:{position:e.marker.position}}),n("el-amap-polyline",{attrs:{path:e.polyline.path}})],1)],1),n("div",[e._v("now_x: "+e._s(e.center[0])+" now_y: "+e._s(e.center[1]))]),n("br"),n("div",[e._v("上行数据")]),n("div",[n("div",[n("input",{ref:"loc_x",domProps:{value:e.center[0]}}),n("input",{ref:"loc_y",domProps:{value:e.center[1]}}),n("button",{on:{click:e.handleUpdateLoc}},[e._v("enter")])]),n("div",[n("button",{attrs:{disabled:!e.zoom},on:{click:e.handleDecreaseZoom}},[e._v("-")]),n("span",[e._v(" "+e._s(e.zoom)+" ")]),n("button",{attrs:{disabled:20===e.zoom},on:{click:e.handleIncreaseZoom}},[e._v("+")])])]),n("div",[e._v("行程："+e._s(e.distance)+"（m）")]),n("div",[e._v("历史记录")]),n("div",e._l(e.historyLoc,(function(t,o){return n("div",{key:o},[e._v(" (x, y): ("+e._s(t[0])+", "+e._s(t[1])+") ")])})),0)])},a=[],s=n("2909");n("d81d"),n("99af");function l(e){return e*Math.PI/180}function u(e,t,n,o){var c=l(t),i=l(o),r=c-i,a=l(e)-l(n),s=2*Math.asin(Math.sqrt(Math.pow(Math.sin(r/2),2)+Math.cos(c)*Math.cos(i)*Math.pow(Math.sin(a/2),2)));return s*=6378137,s=Math.round(1e4*s)/1e4,s}var h={calcDistance:u},p={data:function(){return{map:null,zoom:16,resizeEnable:!0,center:[108.828811,34.124211],historyLoc:[],distance:0}},computed:{marker:function(){return{position:this.center}},polyline:function(){return{path:this.historyLoc}}},mounted:function(){},methods:{init:function(e){this.map=e,this.historyLoc.push(Object(s["a"])(this.center))},click:function(){console.log("click map"),console.log(this.center),console.log(this.map.getScale("1"))},handleUpdateLoc:function(){this.distance+=h.calcDistance.apply(h,[this.$refs.loc_x.value,this.$refs.loc_y.value].concat(Object(s["a"])(this.center))),this.center=[this.$refs.loc_x.value,this.$refs.loc_y.value],this.historyLoc.push(Object(s["a"])(this.center))},handleDecreaseZoom:function(){this.zoom--},handleIncreaseZoom:function(){this.zoom++}}},d=p,f=(n("55e3"),n("2877")),v=Object(f["a"])(d,r,a,!1,null,null,null),m=v.exports,b={components:{VueAMap:m},name:"App",data:function(){return{deviceSwitch:1,color:0,brightness:1}},methods:{handleDeviceBlink:function(){var e="blink",t={period:5,interval:.2};console.log("call the device's action named ",e),this.sdk.callDeviceAction(t,e).then((function(e){console.log("callDeviceAction",e)})).catch((function(e){console.log("callDeviceAction",e)}))},handleControlDeviceData:function(){this.color=++this.color%3,this.brightness=++this.brightness%101;var e={switch:this.switch,color:this.color,brightness:this.brightness};this.sdk.controlDeviceData(e).then((function(e){console.log("handleControlDeviceData res",e)})).catch((function(e){console.log("handleControlDeviceData err",e)}))}}},y=b,_=(n("e424"),Object(f["a"])(y,c,i,!1,null,"5351bc92",null)),g=_.exports,k=n("544d"),w=n.n(k);n("9466");o["default"].prototype.sdk=window.h5PanelSdk,o["default"].config.productionTip=!1,w.a.initAMapApiLoader({key:"8a976c59e1e70a3b1c805b1ce55e32cc"}),o["default"].use(w.a),new o["default"]({render:function(e){return e(g)}}).$mount("#app")},c8d9:function(e,t,n){},e424:function(e,t,n){"use strict";n("c8d9")}});
//# sourceMappingURL=app.8293675d.js.map