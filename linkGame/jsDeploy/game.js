var $kyodai={mapX:19,mapY:11,mapLength:14};$kyodai.cross=function(a,f){for(var c=a-1;c>-1;c--){if($kyodai.block[c+","+f]){break}}for(var b=a+1;b<$kyodai.mapX;b++){if($kyodai.block[b+","+f]){break}}for(var e=f-1;e>-1;e--){if($kyodai.block[a+","+e]){break}}for(var d=f+1;d<$kyodai.mapY;d++){if($kyodai.block[a+","+d]){break}}return{x1:c,x2:b,y1:e,y2:d}};$kyodai.passx=function(b,a,c){if(b<a){while(++b<a){if($kyodai.block[b+","+c]){return false}}}else{while(++a<b){if($kyodai.block[a+","+c]){return false}}}return true};$kyodai.passy=function(c,b,a){if(c<b){while(++c<b){if($kyodai.block[a+","+c]){return false}}}else{while(++b<c){if($kyodai.block[a+","+b]){return false}}}return true};$kyodai.linex=function(b,a,d){var c=[];if(b<a){while(b++<a){c.push('<img src="'+$kyodai_images_url.value+'/linex.gif" style="position:absolute;left:'+(b*31-16)+"px;top:"+d*35+'px">')}}else{while(a++<b){c.push('<img src="'+$kyodai_images_url.value+'/linex.gif" style="position:absolute;left:'+(a*31-16)+"px;top:"+d*35+'px">')}}return c};$kyodai.liney=function(c,b,a){var d=[];if(c<b){while(c++<b){d.push('<img src="'+$kyodai_images_url.value+'/liney.gif" style="position:absolute;left:'+a*31+"px;top:"+(c*35-18)+'px">')}}else{while(b++<c){d.push('<img src="'+$kyodai_images_url.value+'/liney.gif" style="position:absolute;left:'+a*31+"px;top:"+(b*35-18)+'px">')}}return d};$kyodai.find=function(n,m,u,r){var l=$kyodai.cross(n,m);if(m==r&&l.x1<u&&u<l.x2){return $kyodai.linex(n,u,m)}if(n==u&&l.y1<r&&r<l.y2){return $kyodai.liney(m,r,n)}var v=$kyodai.cross(u,r);var t=l.x1<v.x1?v.x1:l.x1;var q=l.x2>v.x2?v.x2:l.x2;var g=l.y1<v.y1?v.y1:l.y1;var f=l.y2>v.y2?v.y2:l.y2;if(t<n&&n<q&&g<r&&r<f){return $kyodai.liney(m,r,n).concat($kyodai.linex(n,u,r))}if(t<u&&u<q&&g<m&&m<f){return $kyodai.liney(m,r,u).concat($kyodai.linex(n,u,m))}if(n<u){var p=n;var o=u;var c=m;var i=r}else{var p=u;var o=n;var c=r;var i=m}for(var k=p+1;k<o;k++){if(t<k&&k<q&&$kyodai.passy(c,i,k)){return $kyodai.liney(c,i,k).concat($kyodai.linex(p,k,c),$kyodai.linex(k,o,i))}}if(m<r){var d=m;var b=r;var a=n;var h=u}else{var d=r;var b=m;var a=u;var h=n}for(var j=d+1;j<b;j++){if(g<j&&j<f&&$kyodai.passx(a,h,j)){return $kyodai.linex(a,h,j).concat($kyodai.liney(d,j,a),$kyodai.liney(j,b,h))}}c=true;i=true;a=true;h=true;while(c||i||a||h){if(c){if(t<--p&&p<q){if($kyodai.passy(m,r,p)){return $kyodai.liney(m,r,p).concat($kyodai.linex(p,n,m),$kyodai.linex(p,u,r))}}else{c=false}}if(i){if(t<++o&&o<q){if($kyodai.passy(m,r,o)){return $kyodai.liney(m,r,o).concat($kyodai.linex(o,n,m),$kyodai.linex(o,u,r))}}else{i=false}}if(a){if(g<--d&&d<f){if($kyodai.passx(n,u,d)){return $kyodai.linex(n,u,d).concat($kyodai.liney(d,m,n),$kyodai.liney(d,r,u))}}else{a=false}}if(h){if(g<++b&&b<f){if($kyodai.passx(n,u,b)){return $kyodai.linex(n,u,b).concat($kyodai.liney(b,m,n),$kyodai.liney(b,r,u))}}else{h=false}}}return false};var _getMapByUrl=function(){var c="map/"+Math.floor(Math.random()*$kyodai.mapLength)+".xml";var b=new ActiveXObject("Microsoft.XMLDOM");b.async=false;b.load(c);var a=b.selectSingleNode("map").text.split("\n");a.shift();return a};var _getMapFromServer=function(){return eval("("+_getMapFromServer.map+")")};$kyodai.loadmap=function(){$kyodai.block={};$kyodai.shape=[];var a=_getMapFromServer();for(var k=0;k<a.length;k++){for(var h=0;h<a[0].length;h++){if(a[k].charAt(h)=="1"){$kyodai.shape.push({x:h,y:k})}}}var g=[];var f=$kyodai.random([1,2,3,4,5,6,7,8]);var b=2;var e=$kyodai.shape.length;for(var d=0;d<5;d++){if(g.length==8){b=1}if(g.length==10){break}for(var c=Math.floor(Math.random()*b)*2+2;c>0;c--){g.push(f[d])}}for(b=9;b<42;b++){if(e-g.length<3){if(e==g.length){break}else{g.push(b);g.push(b);break}}g.push(b);g.push(b);g.push(b);g.push(b)}kyodai_remain.innerText=e;$kyodai.remain=e;$kyodai.setting(g);$kyodai.count()};$kyodai.setting=function(a){var c=[];$kyodai.shapeOld=[];for(var b=0;b<$kyodai.shape.length;b++){$kyodai.shapeOld.push($kyodai.shape[b])}$kyodai.shape=$kyodai.random($kyodai.shape);for(b=0;b<$kyodai.shape.length;b++){var d=a[b];x=$kyodai.shape[b].x;y=$kyodai.shape[b].y;$kyodai.block[x+","+y]=d;if(d){c.push("<img id=Item_"+x+"_"+y+' src="'+$kyodai_images_url.value+"/"+d+'.gif" style="z-index:'+(100-x+y)+";position:absolute;left:"+x*31+"px;top:"+y*35+'px">')}}kyodai_items.innerHTML=c.join("")};$kyodai.choose=function(a,b){kyodai_cuechoose.innerText="";$kyodai.point={x:a,y:b};kyodai_choose.style.pixelLeft=a*31+4;kyodai_choose.style.pixelTop=b*35};$kyodai.cancel=function(){kyodai_cuechoose.innerText="";$kyodai.point=false;kyodai_choose.style.pixelLeft=-2000};$kyodai.click=function(){var d=Math.floor((event.x-10)/31);var c=Math.floor((event.y-180)/35);if(!$kyodai.block[d+","+c]){return}$kyodai.sound(2);if(!$kyodai.point){$kyodai.choose(d,c);return}var g=$kyodai.point.x;var f=$kyodai.point.y;var i=g+","+f;var b=d+","+c;if(i==b){$kyodai.cancel();return}var j=$kyodai.block[i];var a=$kyodai.block[b];if(j!=a){$kyodai.choose(d,c);return}$kyodai.cancel();$kyodai.block[i]=0;$kyodai.block[b]=0;var h=$kyodai.find(g,f,d,c);if(!h){$kyodai.block[i]=j;$kyodai.block[b]=a;return}if(a<3){$kyodai.add(a)}kyodai_lines.innerHTML=h.join("");$kyodai.del(g,f,d,c)};$kyodai.del=function(g,e,b,a){kyodai_iframe.window.location.reload();if(!$kyodai.practice){sendClickData({sx:g,sy:e,ex:b,ey:a})}$kyodai.sound(3);$kyodai.count();$kyodai.remain-=2;kyodai_remain.innerText=$kyodai.remain;$("#Item_"+g+"_"+e).remove();$("#Item_"+b+"_"+a).remove();$("#kyodai_del_1").remove();$("#kyodai_del_2").remove();var d=$("<img id=kyodai_del_1 style='position:absolute;z-index:999;' width='35' height='39'/>");var c=$("<img id=kyodai_del_2 style='position:absolute;z-index:999;' width='35' height='39'/>");d.css("pixelLeft",(g*31+10)+"");d.css("pixelTop",(e*35+180)+"");c.css("pixelLeft",(b*31+10)+"");c.css("pixelTop",(a*35+180)+"");d.attr("src",$kyodai_images_url.value+"/del.gif");c.attr("src",$kyodai_images_url.value+"/del.gif");var f=$("#kyodai_map");d.insertAfter(f);c.insertAfter(f);if(!$kyodai.remain){clearInterval($kyodai.timeid);setTimeout("$kyodai.over('win')",600);if(!$kyodai.practice){setTimeout("sendEndData('win')",600);$("#unitId").hide()}clearInterval($kyodai.timeClockId)}};$kyodai.count=function(){clearInterval($kyodai.timeid);kyodai_count.src=$kyodai_images_url.value+"/count1.gif";kyodai_count.style.pixelWidth=330;$kyodai.timeid=setInterval(function(){var a=kyodai_count.style.pixelWidth;kyodai_count.style.pixelWidth=a-1;switch(a){case 270:kyodai_count.src=$kyodai_images_url.value+"/count2.gif";break;case 180:kyodai_count.src=$kyodai_images_url.value+"/count3.gif";break;case 100:kyodai_count.src=$kyodai_images_url.value+"/count4.gif";break;case 65:kyodai_count.src=$kyodai_images_url.value+"/count5.gif";break;case 30:kyodai_count.src=$kyodai_images_url.value+"/count6.gif"}if(a<2){$kyodai.over("timeover");if(!$kyodai.practice){sendEndData("timeover");$("#unitId").hide()}clearInterval($kyodai.timeClockId)}},80)};$kyodai.random=function(a){var b=[];while(a.length){b=b.splice(0,Math.floor(Math.random()*(b.length+1))).concat(a.splice(Math.floor(Math.random()*a.length),1),b)}return b};$kyodai.add=function(a){if($kyodai.pptnum[a]){document.getElementById("kyodai_ppt_"+a+"_num").src=$kyodai_images_url.value+"/ppt_num_"+ ++$kyodai.pptnum[a]+".gif"}else{$kyodai.pptnum[a]=1;kyodai_ppt.insertAdjacentHTML("beforeEnd","<img id=kyodai_ppt_"+a+' src="'+$kyodai_images_url.value+"/ppt_"+a+'.gif">');kyodai_ppt_num.insertAdjacentHTML("beforeEnd","<img id=kyodai_ppt_"+a+'_num src="'+$kyodai_images_url.value+'/ppt_num_1.gif" onclick="$kyodai.use('+a+')">')}};$kyodai.use=function(a){$kyodai.sound(4);$kyodai.cancel();if(--$kyodai.pptnum[a]){document.getElementById("kyodai_ppt_"+a+"_num").src=$kyodai_images_url.value+"/ppt_num_"+$kyodai.pptnum[a]+".gif"}else{document.getElementById("kyodai_ppt_"+a).removeNode();document.getElementById("kyodai_ppt_"+a+"_num").removeNode()}switch(a){case 1:$kyodai.cue(false);break;case 2:$kyodai.reset()}};$kyodai.cue=function(e){var l=$kyodai.shape;var a=$kyodai.pptnum[1];for(var c=0;c<l.length;c++){a=$kyodai.block[l[c].x+","+l[c].y];if(a){for(var b=c+1;b<l.length;b++){if(a==$kyodai.block[l[b].x+","+l[b].y]){var h=l[c].x;var g=l[c].y;var f=l[b].x;var d=l[b].y;var k=$kyodai.find(h,g,f,d);if(k){kyodai_cuechoose.innerHTML='<img src = "'+$kyodai_images_url.value+'/choose.gif" onmouseup="$kyodai.click('+h+","+g+')" style="position:absolute;left:'+(h*31+4)+"px;top:"+g*35+'px"><img src = "'+$kyodai_images_url.value+'/choose.gif" onmouseup="$kyodai.click('+f+","+d+')" style="position:absolute;left:'+(f*31+4)+"px;top:"+d*35+'px">';kyodai_lines.innerHTML=k.join("");if(e){kyodai_cuechoose.innerText="";$kyodai.block[h+","+g]=0;$kyodai.block[f+","+d]=0;$kyodai.del(h,g,f,d)}return}}}}}};$kyodai.reset=function(){var b=[];for(var a in $kyodai.block){b.push($kyodai.block[a])}$kyodai.setting(b)};$kyodai.sound=function(b){try{au_sound.GotoFrame(0);au_sound.GotoFrame(b);au_sound.Play()}catch(a){}};$kyodai.over=function(a){$kyodai.cancel();clearInterval($kyodai.timeid);kyodai_count.style.pixelWidth=0;kyodai_center.src=$kyodai_images_url.value+"/"+a+".gif";kyodai_center.style.display="";kyodai_items.innerText="";kyodai_ppt_num.innerText="";kyodai_ppt.innerHTML='<img src="'+$kyodai_images_url.value+'/ppt.gif">';document.onkeydown=null};$kyodai.start=function(a){$("#kyodai_del_1").remove();$("#kyodai_del_2").remove();$kyodai.timeClock();kyodai_center.style.display="none";$kyodai.sound(1);$kyodai.cancel();$kyodai.pptnum={1:3,2:3};kyodai_ppt.innerHTML='<img id=kyodai_ppt_1 src="'+$kyodai_images_url.value+'/ppt_1.gif"><img id=kyodai_ppt_2 src="'+$kyodai_images_url.value+'/ppt_2.gif">';kyodai_ppt_num.innerHTML='<img id=kyodai_ppt_1_num src="'+$kyodai_images_url.value+'/ppt_num_3.gif" onmouseup="$kyodai.use(1)"><img id=kyodai_ppt_2_num src="'+$kyodai_images_url.value+'/ppt_num_3.gif" onmouseup="$kyodai.use(2)">';document.onkeydown=function(){if(event.keyCode==49&&$kyodai.pptnum[1]){$kyodai.use(1)}if(event.d==50&&$kyodai.pptnum[2]){$kyodai.use(2)}};getMap(a)};var getMap=function(b){var a={getMap:b,passport:_getPassport(),activeId:_getActiveId()};_sendAjaxLinkGame(a,function(c){if(c.msg){alert(c.msg);window.location.reload();return}_getMapFromServer.map=c.map;$kyodai.loadmap();if(!$kyodai.practice){var j=$kyodai.block;var h=$kyodai.shapeOld;var g={};for(var e=0;e<h.length;e++){x=h[e].x;y=h[e].y;var d=x+","+y;var f=j[x+","+y];g[d]=f}sendStartData(g)}})};var sendStartData=function(c){var b=JSON.stringify(c);var a={startData:b,passport:_getPassport(),activeId:_getActiveId()};_sendAjaxLinkGame(a,function(d){if(d.msg){alert(d.msg)}if(d.gameId.length<1){alert("�������쳣�������¿�ʼ��Ϸ��")}sendStartData.gameId=d.gameId})};var sendClickData=function(b){var a={clickData:b,gameId:sendStartData.gameId};_sendAjaxLinkGame(a,function(c){if(c.msg){alert(c.msg)}})};var sendEndData=function(b){var a={endData:b,gameId:sendStartData.gameId,encrypt:1};_sendAjaxLinkGame(a,function(c){var d=$("#kyodai_time");d.text(c.time/1000+"��");d.show();if(c.msg){alert(c.msg)}});$("#kyodai_start").attr("src",$kyodai_images_url.value+"/anniu1.gif");$("#kyodai_start").bind("click",_startClick);$("#kyodai_test").attr("src",$kyodai_images_url.value+"/anniu.gif");$("#kyodai_test").bind("click",_testClick);kyodai_iframe.window.location.reload()};var _encryptStr=function(b){var a=function(){var c=$("#rkeyM").val();var d=$("#rkeyE").val();setMaxDigits(130);return new RSAKeyPair(d,"",c)};return encryptedString(a(),encodeURIComponent(b))};function bodyRSA(){setMaxDigits(130);return new RSAKeyPair("10001","","8246a46f44fc4d961e139fd70f4787d272d374532f4d2d9b7cbaad6a15a8c1301319aa6b3f30413b859351c71938aec516fa7147b69168b195e81df46b6bed7950cf3a1c719d42175f73d7c97a85d7d20a9e83688b92f05b3059bb2ff75cd7190a042cd2db97ebc2ab4da366f2a7085556ed613b5a39c9fdd2bb2595d1dc23b5")}var _sendAjaxLinkGame=function(a,e){var b={url:webAppId.value+"/2011SHshow/linkGame/gameData.at",parameters:{},method:"post"};var d=JSON.stringify(a);if(a.encrypt==1){d=_encryptStr(d)}b.parameters.queryTypeStr=encodeURI(d);var c=new Haley.Ajax(b);c.onLoading=function(){};c.onComplete=function(g){var f=g.textString;var h=$.parseJSON(f);e(h)};c.start()};var _startClick=function(){$("#kyodai_time").hide();$kyodai.practice=0;this.src=$kyodai_images_url.value+"/anniu2.gif";$("#kyodai_start").unbind();$("#kyodai_test").attr("src",$kyodai_images_url.value+"/anniu0.gif");$("#kyodai_test").unbind();$kyodai.start("start")};var _testClick=function(){$("#kyodai_time").hide();$kyodai.practice=1;$kyodai.start("test")};$kyodai.timeClock=function(){clearInterval($kyodai.timeClockId);var a=$("#timeClockId");a.html("");$("#unitId").show();$kyodai.timeClockId=setInterval(function(){var c=a.html()-0;var b=c*10+1;if(b%10==0){b=(b/10)+".0"}else{b=b/10}a.html(b)},100)};var _getPassport=function(){var a=PassportSC.cookieHandle();if(!a){a="saatest@sohu.com"}return a};var _getActiveId=function(){return"8a8104583d67adc6013d67d111630005"};var _openUrl=function(){var a="http://127.0.0.1:8080/2011ShowSH/2011SHshow/linkGame/game.at";var b=800;var e=600;var d=(window.screen.height-e)/2;var c=(window.screen.width-b)/2;window.open(a,"Detail","location=yes,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no,     Width="+b+" ,Height="+e+",top="+d+",left="+c)};$(function(){$("#kyodai_start").bind("click",_startClick);$("#kyodai_test").bind("click",_testClick);$("#kyodai_map").bind("click",$kyodai.click);$(".userLink").bind("click",function(){var d=$(this).attr("data");var c="http://i.auto.sohu.com/user/show/"+d+".shtml";window.open(c)});var a={};a.activeId=_getActiveId();var b="2011SHshow/linkGame/rankList.at?queryTypeStr="+encodeURI(JSON.stringify(a));$("#kyodai_iframe").attr("src",b)});