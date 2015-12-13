google.maps.__gjsload__('geometry', '\'use strict\';function Ky(a,b){return Math.abs(Ma(b-a,-180,180))}\nfunction Ly(a,b,c,d,e){if(!d){c=Ky(a.lng(),c)/Ky(a.lng(),b.lng());if(!e)return e=Math.sin(z(a.lat())),e=Math.log((1+e)/(1-e))/2,b=Math.sin(z(b.lat())),Oa(2*Math.atan(Math.exp(e+c*(Math.log((1+b)/(1-b))/2-e)))-Math.PI/2);a=e.fromLatLngToPoint(a);b=e.fromLatLngToPoint(b);return e.fromPointToLatLng(new O(a.x+c*(b.x-a.x),a.y+c*(b.y-a.y))).lat()}e=z(a.lat());a=z(a.lng());d=z(b.lat());b=z(b.lng());c=z(c);return Ma(Oa(Math.atan2(Math.sin(e)*Math.cos(d)*Math.sin(c-b)-Math.sin(d)*Math.cos(e)*Math.sin(c-a),\nMath.cos(e)*Math.cos(d)*Math.sin(a-b))),-90,90)}\nvar My={containsLocation:function(a,b){for(var c=Ma(a.lng(),-180,180),d=!!b.get("geodesic"),e=b.get("latLngs"),f=b.get("map"),f=!d&&f?f.getProjection():null,g=!1,h=0,k=e.getLength();h<k;++h)for(var n=e.getAt(h),p=0,q=n.getLength();p<q;++p){var r=n.getAt(p),v=n.getAt((p+1)%q),w=Ma(r.lng(),-180,180),y=Ma(v.lng(),-180,180),A=Math.max(w,y),w=Math.min(w,y);(180<A-w?c>=A||c<w:c<A&&c>=w)&&Ly(r,v,c,d,f)<a.lat()&&(g=!g)}return g||My.isLocationOnEdge(a,b)},isLocationOnEdge:function(a,b,c){c=c||1E-9;var d=Ma(a.lng(),\n-180,180),e=b instanceof Fe,f=!!b.get("geodesic"),g=b.get("latLngs");b=b.get("map");b=!f&&b?b.getProjection():null;for(var h=0,k=g.getLength();h<k;++h)for(var n=g.getAt(h),p=n.getLength(),q=e?p:p-1,r=0;r<q;++r){var v=n.getAt(r),w=n.getAt((r+1)%p),y=Ma(v.lng(),-180,180),A=Ma(w.lng(),-180,180),H=Math.max(y,A),E=Math.min(y,A);if(y=1E-9>=Math.abs(Ma(y-A,-180,180))&&(Math.abs(Ma(y-d,-180,180))<=c||Math.abs(Ma(A-d,-180,180))<=c))var y=a.lat(),A=Math.min(v.lat(),w.lat())-c,C=Math.max(v.lat(),w.lat())+c,\ny=y>=A&&y<=C;if(y)return!0;if(180<H-E?d+c>=H||d-c<=E:d+c>=E&&d-c<=H)if(v=Ly(v,w,d,f,b),Math.abs(v-a.lat())<c)return!0}return!1}};var Ny={computeHeading:function(a,b){var c=bc(a),d=cc(a),e=bc(b),d=cc(b)-d;return Ma(Oa(Math.atan2(Math.sin(d)*Math.cos(e),Math.cos(c)*Math.sin(e)-Math.sin(c)*Math.cos(e)*Math.cos(d))),-180,180)},computeOffset:function(a,b,c,d){b/=d||6378137;c=z(c);var e=bc(a);a=cc(a);d=Math.cos(b);b=Math.sin(b);var f=Math.sin(e),e=Math.cos(e),g=d*f+b*e*Math.cos(c);return new M(Oa(Math.asin(g)),Oa(a+Math.atan2(b*e*Math.sin(c),d-f*g)))},computeOffsetOrigin:function(a,b,c,d){c=z(c);b/=d||6378137;d=Math.cos(b);var e=\nMath.sin(b)*Math.cos(c);b=Math.sin(b)*Math.sin(c);c=Math.sin(bc(a));var f=e*e*d*d+d*d*d*d-d*d*c*c;if(0>f)return null;var g=e*c+Math.sqrt(f),g=g/(d*d+e*e),h=(c-e*g)/d,g=Math.atan2(h,g);if(g<-Math.PI/2||g>Math.PI/2)g=e*c-Math.sqrt(f),g=Math.atan2(h,g/(d*d+e*e));if(g<-Math.PI/2||g>Math.PI/2)return null;a=cc(a)-Math.atan2(b,d*Math.cos(g)-e*Math.sin(g));return new M(Oa(g),Oa(a))},interpolate:function(a,b,c){var d=bc(a),e=cc(a),f=bc(b),g=cc(b),h=Math.cos(d),k=Math.cos(f);b=Ny.Lg(a,b);var n=Math.sin(b);\nif(1E-6>n)return new M(a.lat(),a.lng());a=Math.sin((1-c)*b)/n;c=Math.sin(c*b)/n;b=a*h*Math.cos(e)+c*k*Math.cos(g);e=a*h*Math.sin(e)+c*k*Math.sin(g);return new M(Oa(Math.atan2(a*Math.sin(d)+c*Math.sin(f),Math.sqrt(b*b+e*e))),Oa(Math.atan2(e,b)))},Lg:function(a,b){var c=bc(a),d=cc(a),e=bc(b),f=cc(b);return 2*Math.asin(Math.sqrt(Math.pow(Math.sin((c-e)/2),2)+Math.cos(c)*Math.cos(e)*Math.pow(Math.sin((d-f)/2),2)))},computeDistanceBetween:function(a,b,c){c=c||6378137;return Ny.Lg(a,b)*c},computeLength:function(a,\nb){var c=b||6378137,d=0;a instanceof Rb&&(a=a.getArray());for(var e=0,f=a.length-1;e<f;++e)d+=Ny.computeDistanceBetween(a[e],a[e+1],c);return d},computeArea:function(a,b){return Math.abs(Ny.computeSignedArea(a,b))},computeSignedArea:function(a,b){var c=b||6378137;a instanceof Rb&&(a=a.getArray());for(var d=a[0],e=0,f=1,g=a.length-1;f<g;++f)e+=Ny.Qn(d,a[f],a[f+1]);return e*c*c},Qn:function(a,b,c){return Ny.Rn(a,b,c)*Ny.ep(a,b,c)},Rn:function(a,b,c){var d=[a,b,c,a];a=[];for(c=b=0;3>c;++c)a[c]=Ny.Lg(d[c],\nd[c+1]),b+=a[c];b/=2;d=Math.tan(b/2);for(c=0;3>c;++c)d*=Math.tan((b-a[c])/2);return 4*Math.atan(Math.sqrt(Math.abs(d)))},ep:function(a,b,c){a=[a,b,c];b=[];for(c=0;3>c;++c){var d=a[c],e=bc(d),d=cc(d),f=b[c]=[];f[0]=Math.cos(e)*Math.cos(d);f[1]=Math.cos(e)*Math.sin(d);f[2]=Math.sin(e)}return 0<b[0][0]*b[1][1]*b[2][2]+b[1][0]*b[2][1]*b[0][2]+b[2][0]*b[0][1]*b[1][2]-b[0][0]*b[2][1]*b[1][2]-b[1][0]*b[0][1]*b[2][2]-b[2][0]*b[1][1]*b[0][2]?1:-1}};var Oy={decodePath:function(a){for(var b=u(a),c=Array(Math.floor(a.length/2)),d=0,e=0,f=0,g=0;d<b;++g){var h=1,k=0,n;do n=a.charCodeAt(d++)-63-1,h+=n<<k,k+=5;while(31<=n);e+=h&1?~(h>>1):h>>1;h=1;k=0;do n=a.charCodeAt(d++)-63-1,h+=n<<k,k+=5;while(31<=n);f+=h&1?~(h>>1):h>>1;c[g]=new M(1E-5*e,1E-5*f,!0)}c.length=g;return c},encodePath:function(a){a instanceof Rb&&(a=a.getArray());return Oy.Bq(a,function(a){return[Math.round(1E5*a.lat()),Math.round(1E5*a.lng())]})},Bq:function(a,b){for(var c=[],d=[0,\n0],e,f=0,g=u(a);f<g;++f)e=b?b(a[f]):a[f],Oy.ik(e[0]-d[0],c),Oy.ik(e[1]-d[1],c),d=e;return c.join("")},ik:function(a,b){return Oy.Cq(0>a?~(a<<1):a<<1,b)},Cq:function(a,b){for(;32<=a;)b.push(String.fromCharCode((32|a&31)+63)),a>>=5;b.push(String.fromCharCode(a+63));return b}};me.geometry=function(a){eval(a)};sa.google.maps.geometry={encoding:Oy,spherical:Ny,poly:My};function Py(){}m=Py.prototype;m.decodePath=Oy.decodePath;m.encodePath=Oy.encodePath;m.computeDistanceBetween=Ny.computeDistanceBetween;m.interpolate=Ny.interpolate;m.computeHeading=Ny.computeHeading;m.computeOffset=Ny.computeOffset;m.computeOffsetOrigin=Ny.computeOffsetOrigin;Ec("geometry",new Py);\n')