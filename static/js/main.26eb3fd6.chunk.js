(this.webpackJsonptemplate_react=this.webpackJsonptemplate_react||[]).push([[0],{36:function(t,e,n){},38:function(t,e,n){},40:function(t,e,n){},49:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),c=n(20),o=n.n(c),s=(n(36),n(28)),i=n(4),u=n(1),p=n.n(u),l=n(3),f=n(6),d=n(7),b=n(22),v=n(21),h=n(9),j=n(55),x=n(53),g=function(){function t(){Object(f.a)(this,t)}return Object(d.a)(t,null,[{key:"get",value:function(){var t=Object(l.a)(p.a.mark((function t(e,n){var r,a;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(r=localStorage.getItem(e))){t.next=3;break}return t.abrupt("return",JSON.parse(r));case 3:return t.next=5,n();case 5:a=t.sent;try{localStorage.setItem(e,JSON.stringify(a))}catch(c){localStorage.clear()}return t.abrupt("return",a);case 8:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()}]),t}(),O={headers:{Accept:"application/json"}},m={headers:{Accept:"text/csv"}};function y(t){return k.apply(this,arguments)}function k(){return(k=Object(l.a)(p.a.mark((function t(e){var n,r;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch(e,O);case 2:return n=t.sent,t.next=5,n.json();case 5:return r=t.sent,t.abrupt("return",r);case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var w=function(){function t(){Object(f.a)(this,t)}return Object(d.a)(t,null,[{key:"json",value:function(){var t=Object(l.a)(p.a.mark((function t(e){return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",g.get("WWW.json.v3.".concat(e),Object(l.a)(p.a.mark((function t(){return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",y(e));case 1:case"end":return t.stop()}}),t)})))));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},{key:"tsv",value:function(){var t=Object(l.a)(p.a.mark((function t(e){var n,r,a,c,o;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch(e,m);case 2:return n=t.sent,t.next=5,n.text();case 5:return r=t.sent,a=r.split("\n"),c=a[0].split("\t").map((function(t){return t.replace("\r","")})),o=a.slice(1,-1).map((function(t){var e=t.split("\t");return c.reduce((function(t,n,r){return t[n]=e[r],t}),{})})),t.abrupt("return",o);case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}]),t}(),z=function(){function t(){Object(f.a)(this,t)}return Object(d.a)(t,null,[{key:"get",value:function(){var t=Object(l.a)(p.a.mark((function t(){return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w.tsv("https://raw.githubusercontent.com/nuuuwan/covid19/data/covid19.lk_vax_centers.latest.tsv");case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()}]),t}(),E=["province","district","dsd","gnd"],I=function(){function t(){Object(f.a)(this,t)}return Object(d.a)(t,null,[{key:"getEntsByType",value:function(){var t=Object(l.a)(p.a.mark((function t(e){var n;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n="data/ents/".concat(e,".tsv"),t.next=3,w.tsv(n);case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},{key:"getEntIndexByType",value:function(){var e=Object(l.a)(p.a.mark((function e(n){var r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getEntsByType(n);case 2:return r=e.sent,e.abrupt("return",r.reduce((function(t,e){return t[e.id]=e,t}),{}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"getAllEntIndex",value:function(){var e=Object(l.a)(p.a.mark((function e(){var n,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=E,e.next=3,Promise.all(n.map(function(){var e=Object(l.a)(p.a.mark((function e(n){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getEntIndexByType(n);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 3:return r=e.sent,e.abrupt("return",n.reduce((function(t,e,n){return t[e]=r[n],t}),{}));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}]),t}(),F=[6.9157,79.8636];function S(t,e){var n=Object(h.a)(t,2),r=n[0],a=n[1],c=0;for(var o in e){var s=(o-1+e.length)%e.length,i=Object(h.a)(e[o],2),u=i[0],p=i[1],l=Object(h.a)(e[s],2),f=l[0],d=l[1];p>r!==d>r&&a<(f-u)*(r-p)/(d-p)+u&&(c+=1)}return c%2===1}function C(t,e){for(var n in e){var r=e[n];for(var a in r){if(S(t,r[a]))return!0}}return!1}var R=function(){function t(){Object(f.a)(this,t)}return Object(d.a)(t,null,[{key:"getGeoForRegion",value:function(){var t=Object(l.a)(p.a.mark((function t(e,n){var r;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r="data/geo/".concat(e,"/").concat(n,".json"),t.next=3,w.json(r);case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()},{key:"getRegionTree",value:function(){var t=Object(l.a)(p.a.mark((function t(){return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"data/geo/region_tree.json",t.next=3,w.json("data/geo/region_tree.json");case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()},{key:"isPointInRegion",value:function(){var e=Object(l.a)(p.a.mark((function e(n,r,a){var c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getGeoForRegion(r,a);case 2:return c=e.sent,e.abrupt("return",C(n,c));case 4:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}()},{key:"getRegionsForPoint",value:function(){var e=Object(l.a)(p.a.mark((function e(n,r){var a,c,o,s,i,u,l,f;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getRegionTree();case 2:a=e.sent,c={},e.t0=p.a.keys(E);case 5:if((e.t1=e.t0()).done){e.next=29;break}o=e.t1.value,s=E[o],i=Object.keys(a),u=!1,e.t2=p.a.keys(i);case 11:if((e.t3=e.t2()).done){e.next=25;break}return l=e.t3.value,f=i[l],e.next=16,t.isPointInRegion(n,s,f);case 16:if(!e.sent){e.next=23;break}return c[s]=f,a=a[f],u=!0,r(n,c),e.abrupt("break",25);case 23:e.next=11;break;case 25:if(u){e.next=27;break}return e.abrupt("break",29);case 27:e.next=5;break;case 29:r(n,c);case 30:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()}]),t}();function _(t){var e=1e6;return t.map((function(t){return Math.round(parseFloat(t)*e)/e}))}var P=n(50),M=n(51),T=n(54),L=n(52),A=(n(38),n(2));function B(t){return Object(P.a)({moveend:function(e){t.onMoveEnd(e)}}),null}var N=function(t){Object(b.a)(n,t);var e=Object(v.a)(n);function n(){return Object(f.a)(this,n),e.apply(this,arguments)}return Object(d.a)(n,[{key:"render",value:function(){return Object(A.jsxs)(M.a,{center:this.props.center,zoom:this.props.zoom,zoomControl:!1,children:[Object(A.jsx)(T.a,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),Object(A.jsx)(B,{onMoveEnd:this.props.onMoveEnd}),Object(A.jsx)(L.a,{zoom:this.props.zoom,position:"bottomright"}),Object(A.jsx)("div",{className:"div-center-marker"}),this.props.children]})}}]),n}(r.Component),G=n.p+"static/media/geolocate.f5052489.png",J={zIndex:1e4,position:"absolute",top:24,left:60,background:"white",borderRadius:6},U={display:"table-row",padding:6},D={display:"table-cell",padding:6},W={fontSize:"40%",color:"black"},V={fontSize:"80%",color:"black"},Z={height:15,width:15,border:"none",background:"white",verticalAlign:"middle",padding:6,paddingTop:9,display:"table-cell",cursor:"pointer"};function q(t){return t.map((function(t){if(!t.lat)return null;var e=[parseFloat(t.lat),parseFloat(t.lng)],n="green";return t.tags&&(n="red"),Object(A.jsx)(j.a,{center:e,radius:500,pathOptions:{color:n},children:Object(A.jsxs)(x.a,{children:[Object(A.jsx)("h3",{children:t.center}),Object(A.jsx)("h3",{children:t.center_si}),Object(A.jsx)("h3",{children:t.center_ta}),Object(A.jsxs)("ul",{children:[Object(A.jsx)("li",{children:t.formatted_address}),Object(A.jsx)("li",{children:t.formatted_address_si}),Object(A.jsx)("li",{children:t.formatted_address_ta})]}),Object(A.jsx)("hr",{}),Object(A.jsxs)("div",{children:[t.police," Police Area,",t.district," District"]}),Object(A.jsx)("div",{children:t.tags})]})})}))}var H=function(t){Object(b.a)(n,t);var e=Object(v.a)(n);function n(t){var r;Object(f.a)(this,n);var a=function(t){var e=t.split(","),n=Object(h.a)(e,3),r=n[0],a=n[1],c=n[2];return{lat:parseFloat(r.replace("N","")),lng:parseFloat(a.replace("E","")),zoom:parseInt(c.replace("z",""))}}((r=e.call(this,t)).props.match.params.locationStr),c=a.lat,o=a.lng,s=a.zoom;return r.state={customerLayers:[],center:[c,o],zoom:s,regions:void 0,entIndex:{},allEntIndex:void 0,lkVaxCenters:void 0},r.onClickGeoLocate(),r}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var t=Object(l.a)(p.a.mark((function t(){var e,n;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,I.getAllEntIndex();case 2:return e=t.sent,t.next=5,z.get();case 5:return n=t.sent,t.next=8,R.getRegionsForPoint(this.state.center,this.onRegionsUpdate.bind(this));case 8:this.setState({allEntIndex:e,customerLayers:[n]});case 9:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"onRegionsUpdate",value:function(){var t=Object(l.a)(p.a.mark((function t(e,n){return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:this.setState({center:e,regions:n});case 1:case"end":return t.stop()}}),t,this)})));return function(e,n){return t.apply(this,arguments)}}()},{key:"onMoveEnd",value:function(){var t=Object(l.a)(p.a.mark((function t(e){var n,r,a,c,o,s;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.target.getCenter(),r=e.target.getZoom(),a=_([n.lat,n.lng]),c=Object(h.a)(a,2),o=c[0],s=c[1],this.props.history.push("/".concat(o,"N,").concat(s,"E,").concat(r,"z")),this.setState({zoom:r}),t.next=8,R.getRegionsForPoint(a,this.onRegionsUpdate.bind(this));case 8:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"onClickGeoLocate",value:function(t){var e;e=function(t){var e=Object(h.a)(t,2),n=e[0],r=e[1];console.debug([n,r]),this.setState({center:[n,r],zoom:16})}.bind(this),navigator.geolocation?navigator.geolocation.getCurrentPosition((function(t){e([t.coords.latitude,t.coords.longitude])})):e(F)}},{key:"render",value:function(){var t=this.state,e=t.customerLayers,n=t.center,r=t.zoom,a=t.regions,c=t.allEntIndex;if(!c)return"...";var o=e.map(q),s="...";if(a){var i=1;s=E.map((function(t){var e=a[t];if(e){var n=c[t][e].name,r=Object.assign({},D,{opacity:i});return i*=.8,Object(A.jsxs)("div",{style:r,children:[Object(A.jsx)("div",{style:V,children:n}),Object(A.jsx)("div",{style:W,children:t.toUpperCase()})]},"region-".concat(e))}return"..."}))}return Object(A.jsxs)(A.Fragment,{children:[Object(A.jsx)("div",{style:J,children:Object(A.jsxs)("div",{style:U,children:[Object(A.jsx)("img",{src:G,alt:"geolocate",onClick:this.onClickGeoLocate.bind(this),style:Z}),s]})}),Object(A.jsx)(N,{center:n,zoom:r,onMoveEnd:this.onMoveEnd.bind(this),children:o},n)]})}}]),n}(r.Component);n(40);var K=function(){return Object(A.jsx)(s.a,{basename:"/metaverse",children:Object(A.jsxs)(i.d,{children:[Object(A.jsx)(i.b,{path:"/:locationStr",component:H}),Object(A.jsx)(i.b,{children:Object(A.jsx)(i.a,{to:"/6.9157N,79.8636E,15z"})})]})})},Q=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,56)).then((function(e){var n=e.getCLS,r=e.getFID,a=e.getFCP,c=e.getLCP,o=e.getTTFB;n(t),r(t),a(t),c(t),o(t)}))};o.a.render(Object(A.jsx)(a.a.StrictMode,{children:Object(A.jsx)(K,{})}),document.getElementById("root")),Q()}},[[49,1,2]]]);
//# sourceMappingURL=main.26eb3fd6.chunk.js.map