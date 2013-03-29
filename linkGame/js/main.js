var $kyodai = {mapX:19, mapY:11, mapLength:14}

// 一个点(x,y)向4面延伸直到遇到障碍或出界 (画十字)
$kyodai.cross = function(x, y){
    for (var x1=x-1; x1>-1; x1--)
        if ($kyodai.block[x1+ "," +y]) break

    for (var x2=x+1; x2<$kyodai.mapX; x2++)
        if ($kyodai.block[x2+ "," +y]) break

    for (var y1=y-1; y1>-1; y1--)
        if ($kyodai.block[x+ "," +y1]) break

    for (var y2=y+1; y2<$kyodai.mapY; y2++)
        if ($kyodai.block[x+ "," +y2]) break

    return {x1:x1, x2:x2, y1:y1, y2:y2}
}

// x 方向2点间是否连通
$kyodai.passx = function(x1,x2,y){
    if (x1 < x2){
        while (++x1 < x2)
            if ($kyodai.block[x1+ "," +y]) return false
    }
    else{
        while (++x2 < x1)
            if ($kyodai.block[x2+ "," +y]) return false
    }
    return true
}
// y 方向
$kyodai.passy = function(y1,y2,x){
    if (y1 < y2){
        while (++y1 < y2)
            if ($kyodai.block[x+ "," +y1]) return false
    }
    else{
        while (++y2 < y1)
            if ($kyodai.block[x+ "," +y2]) return false
    }
    return true
}

// x 方向2点间画一条线 (连通情况下)
$kyodai.linex = function(x1, x2, y){
    var path = []
    if (x1 < x2){
        while (x1++ < x2)
        path.push('<img src="'+$kyodai_images_url.value+'/linex.gif" style="position:absolute;left:'+(x1*31-16)+'px;top:'+y*35+'px">')
    }
    else{
        while (x2++ < x1)
        path.push('<img src="'+$kyodai_images_url.value+'/linex.gif" style="position:absolute;left:'+(x2*31-16)+'px;top:'+y*35+'px">')
    }
    return path
}
// y 方向
$kyodai.liney = function(y1, y2, x){
    var path = []
    if (y1 < y2){
        while (y1++ < y2)
        path.push('<img src="'+$kyodai_images_url.value+'/liney.gif" style="position:absolute;left:'+x*31+'px;top:'+(y1*35-18)+'px">')
    }
    else{
        while (y2++ < y1)
        path.push('<img src="'+$kyodai_images_url.value+'/liney.gif" style="position:absolute;left:'+x*31+'px;top:'+(y2*35-18)+'px">')
    }
    return path
}

// 寻找2点间的连线
$kyodai.find = function(sx,sy,ex,ey){
    // 开始点画十字
    var s = $kyodai.cross(sx, sy)
    // 如果开始点十字穿过结束点
    if (sy==ey && s.x1<ex && ex<s.x2) return $kyodai.linex(sx, ex, sy)
    if (sx==ex && s.y1<ey && ey<s.y2) return $kyodai.liney(sy, ey, sx)
    // 结束点画十字
    var e = $kyodai.cross(ex, ey)
    // 开始点与结束点十字重叠部分
    var x1 = s.x1 < e.x1 ? e.x1 : s.x1
    var x2 = s.x2 > e.x2 ? e.x2 : s.x2
    var y1 = s.y1 < e.y1 ? e.y1 : s.y1
    var y2 = s.y2 > e.y2 ? e.y2 : s.y2
    // 如果结束点十字穿过开始点十字
    if (x1<sx && sx<x2 && y1<ey && ey<y2)
        return $kyodai.liney(sy, ey, sx).concat($kyodai.linex(sx, ex, ey))
    if (x1<ex && ex<x2 && y1<sy && sy<y2)
        return $kyodai.liney(sy, ey, ex).concat($kyodai.linex(sx, ex, sy))
    // 两点之内 x 方向十字重叠部分 y 方向是否能连通
    if (sx < ex){
        var x3 = sx
        var x4 = ex
        var s1 = sy
        var e1 = ey
    }
    else{
        var x3 = ex
        var x4 = sx
        var s1 = ey
        var e1 = sy
    }
    for (var x=x3+1; x<x4; x++){
        if (x1<x && x<x2 && $kyodai.passy(s1, e1, x)){
            return $kyodai.liney(s1, e1, x).concat($kyodai.linex(x3, x, s1), $kyodai.linex(x, x4, e1))
        }
    }
    // y 方向
    if (sy < ey){
        var y3 = sy
        var y4 = ey
        var s2 = sx
        var e2 = ex
    }
    else{
        var y3 = ey
        var y4 = sy
        var s2 = ex
        var e2 = sx
    }
    for (var y=y3+1; y<y4; y++){
        if (y1<y && y<y2 && $kyodai.passx(s2, e2, y)){
            return $kyodai.linex(s2, e2, y).concat($kyodai.liney(y3, y, s2), $kyodai.liney(y, y4, e2))
        }
    }
    s1 = true
    e1 = true
    s2 = true
    e2 = true
    // 两点围成的矩形四顶点向外扩散
    while (s1 || e1 || s2 || e2){
        if (s1){
            if (x1 < --x3 && x3 < x2){
                if ($kyodai.passy(sy, ey, x3)){
                    return $kyodai.liney(sy, ey, x3).concat($kyodai.linex(x3, sx, sy), $kyodai.linex(x3, ex, ey))
                }
            }
            else s1 = false
        }
        if (e1){
            if (x1 < ++x4 && x4 < x2){
                if ($kyodai.passy(sy, ey, x4)){
                    return $kyodai.liney(sy, ey, x4).concat($kyodai.linex(x4, sx, sy), $kyodai.linex(x4, ex, ey))
                }
            }
            else e1 = false
        }
        if (s2){
            if (y1 < --y3 && y3 < y2){
                if ($kyodai.passx(sx, ex, y3)){
                    return $kyodai.linex(sx, ex, y3).concat($kyodai.liney(y3, sy, sx), $kyodai.liney(y3, ey, ex))
                }
            }
            else s2 = false
        }
        if (e2){
            if (y1 < ++y4 && y4 < y2){
                if ($kyodai.passx(sx, ex, y4)){
                    return $kyodai.linex(sx, ex, y4).concat($kyodai.liney(y4, sy, sx), $kyodai.liney(y4, ey, ex))
                }
            }
            else e2 = false
        }
    }
    return false
}


/**
 * 从本地xml中载入map
 * @return {}
 */
var _getMapByUrl=function(){
    var mapurl="map/"+ Math.floor(Math.random()*$kyodai.mapLength) +".xml"
    var dom = new ActiveXObject("Microsoft.XMLDOM")
    dom.async = false
    // 随机地图
    dom.load(mapurl)
    var blocks = dom.selectSingleNode("map").text.split("\n")
    blocks.shift()
    return blocks;
}

/**
 * 从服务器端获取map
 * @return {}
 */
var _getMapFromServer=function(){
    return eval('('+_getMapFromServer.map+')');
}

// 读取关卡
$kyodai.loadmap = function(){
    $kyodai.block = {}
    $kyodai.shape = []
    
    var blocks=_getMapFromServer();
    for(var x=0; x<blocks.length; x++){
        for(var y=0; y<blocks[0].length; y++){
            if (blocks[x].charAt(y) == "1"){
                $kyodai.shape.push({x:y, y:x})
            }
        }
    }
    // 随机填充
    var items = []
    var itemppt = $kyodai.random([1, 2, 3, 4, 5, 6, 7, 8])
    var n = 2
    var num = $kyodai.shape.length
    for (var i=0; i<5; i++){
        if (items.length==8) n=1
        if (items.length==10) break
        for (var j=Math.floor(Math.random()*n)*2+2; j>0; j--){
            items.push(itemppt[i])
        }
    }
    for (n=9; n<42; n++){
        if (num-items.length < 3){
            if (num == items.length) break
            else{
                items.push(n)
                items.push(n)
                break
            }
        }
        items.push(n)
        items.push(n)
        items.push(n)
        items.push(n)
    }
    kyodai_remain.innerText = num
    $kyodai.remain = num
    $kyodai.setting(items)
    $kyodai.count()
}

// 布置图片
$kyodai.setting = function(arr){
    var itemImg = []
    $kyodai.shapeOld=[];
    for(var i=0;i<$kyodai.shape.length;i++){
        $kyodai.shapeOld.push($kyodai.shape[i]);
    }
    $kyodai.shape = $kyodai.random($kyodai.shape)
    for (i=0; i<$kyodai.shape.length; i++){
        var Img = arr[i]
        x = $kyodai.shape[i].x
        y = $kyodai.shape[i].y
        $kyodai.block[x+","+y] = Img
        if (Img){
            itemImg.push('<img id=Item_'+x+'_'+y+' src="'+$kyodai_images_url.value+'/'+ Img + '.gif" style="z-index:'+ (100-x+y) +';position:absolute;left:'+ x*31 +'px;top:'+ y*35 +'px">')
        }
    }
    kyodai_items.innerHTML = itemImg.join("")
}

// 选中一个
$kyodai.choose = function(x, y){
    kyodai_cuechoose.innerText = ''
    $kyodai.point = {x:x, y:y}
    kyodai_choose.style.pixelLeft = x * 31 + 4
    kyodai_choose.style.pixelTop = y * 35
}

// 取消选中
$kyodai.cancel = function(){
    kyodai_cuechoose.innerText = ''
    $kyodai.point = false
    kyodai_choose.style.pixelLeft = -2000
}

// 点击事件
$kyodai.click = function(){
    var ex = Math.floor((event.x-10) / 31)
    var ey = Math.floor((event.y-180) / 35)
    if (!$kyodai.block[ex+","+ey]) return
    $kyodai.sound(2)
    if (!$kyodai.point){
        // 第一次点中
        $kyodai.choose(ex, ey)
        return
    }
    var sx = $kyodai.point.x
    var sy = $kyodai.point.y
    var s = sx+","+sy
    var e = ex+","+ey
    if (s == e){
        // 点中同一个
        $kyodai.cancel()
        return
    }
    var ss = $kyodai.block[s]
    var ee = $kyodai.block[e]
    if (ss != ee){
        // 不同类型
        $kyodai.choose(ex, ey)
        return
    }
    $kyodai.cancel()
    $kyodai.block[s] = 0
    $kyodai.block[e] = 0
    var line = $kyodai.find(sx, sy, ex, ey)
    if (!line){
        // 不能连通
        $kyodai.block[s] = ss
        $kyodai.block[e] = ee
        return
    }
    if (ee < 3) $kyodai.add(ee)
    kyodai_lines.innerHTML = line.join("")
    $kyodai.del(sx, sy, ex, ey)
}

// 消除一组
$kyodai.del = function(sx,sy,ex,ey){
    kyodai_iframe.window.location.reload();
    if(!$kyodai.practice){
        sendClickData({sx:sx,sy:sy,ex:ex,ey:ey});
    }
    $kyodai.sound(3)
    $kyodai.count()
    $kyodai.remain -= 2
    kyodai_remain.innerText = $kyodai.remain
//    document.getElementById("Item_"+sx+"_"+sy).removeNode()
//    document.getElementById("Item_"+ex+"_"+ey).removeNode()
    $("#Item_"+sx+"_"+sy).remove()
    $("#Item_"+ex+"_"+ey).remove()
    
//    kyodai_del_1.style.pixelLeft = sx * 31 - 15
//    kyodai_del_1.style.pixelTop  = sy * 35 - 15
//    kyodai_del_2.style.pixelLeft = ex * 31 - 15
//    kyodai_del_2.style.pixelTop  = ey * 35 - 15
//    kyodai_del_1.src = $kyodai_images_url.value+"/del.gif"
//    kyodai_del_2.src = $kyodai_images_url.value+"/del.gif"
//        <img id=kyodai_del_1 src="${_res}/images/del.gif" style="position:absolute;left:-999px"> 
//        <img id=kyodai_del_2 src="${_res}/images/del.gif" style="position:absolute;left:-999px"> 
    $('#kyodai_del_1').remove();
    $('#kyodai_del_2').remove();
    var obj1=$("<img id=kyodai_del_1 style='position:absolute;z-index:999;' width='35' height='39'/>")
    var obj2=$("<img id=kyodai_del_2 style='position:absolute;z-index:999;' width='35' height='39'/>")
    obj1.css('pixelLeft',(sx * 31 +10)+'');
    obj1.css('pixelTop',(sy * 35 +180)+'');
    obj2.css('pixelLeft',(ex * 31 +10)+'');
    obj2.css('pixelTop',(ey * 35 +180)+'');
    obj1.attr('src',$kyodai_images_url.value+'/del.gif');
    obj2.attr('src',$kyodai_images_url.value+'/del.gif');
    var objContain=$('#kyodai_map');
    obj1.insertAfter(objContain);
    obj2.insertAfter(objContain);
    
    // 全部消除
    if (!$kyodai.remain){
        clearInterval($kyodai.timeid)
        setTimeout("$kyodai.over('win')",600)
        if(!$kyodai.practice){
            setTimeout("sendEndData('win')",600)
        }
    }
}

// 倒计时
$kyodai.count = function(){
    clearInterval($kyodai.timeid)
    kyodai_count.src = $kyodai_images_url.value+"/count1.gif"
    kyodai_count.style.pixelWidth = 330
    $kyodai.timeid = setInterval(function(){
        var counts = kyodai_count.style.pixelWidth
        kyodai_count.style.pixelWidth = counts-1
        switch (counts){
            // 颜色棒
            case 270 : kyodai_count.src = $kyodai_images_url.value+"/count2.gif"
            break
            case 180 : kyodai_count.src = $kyodai_images_url.value+"/count3.gif"
            break
            case 100 : kyodai_count.src = $kyodai_images_url.value+"/count4.gif"
            break
            case  65 : kyodai_count.src = $kyodai_images_url.value+"/count5.gif"
            break
            case  30 : kyodai_count.src = $kyodai_images_url.value+"/count6.gif"
        }
        if (counts < 2){
            // 时间耗尽
            $kyodai.over('timeover')
            if(!$kyodai.practice){
                sendEndData('timeover');
            }
        }
    }
    , 80)
}

// 打乱数组
$kyodai.random = function(arr){
    var rnd = []
    while (arr.length){
        rnd=rnd.splice(0,Math.floor(Math.random()*(rnd.length+1))).concat(arr.splice(Math.floor(Math.random()*arr.length),1),rnd)
    }
    return rnd
}

// 添加道具
$kyodai.add = function(id){
    if ($kyodai.pptnum[id]){
        document.getElementById("kyodai_ppt_"+id+"_num").src = $kyodai_images_url.value+"/ppt_num_"+ ++$kyodai.pptnum[id] +".gif"
    }
    else{
        $kyodai.pptnum[id] = 1
        kyodai_ppt.insertAdjacentHTML('beforeEnd', '<img id=kyodai_ppt_'+id+' src="'+$kyodai_images_url.value+'/ppt_'+id+'.gif">')
        kyodai_ppt_num.insertAdjacentHTML('beforeEnd', '<img id=kyodai_ppt_'+id+'_num src="'+$kyodai_images_url.value+'/ppt_num_1.gif" onclick="$kyodai.use('+id+')">')
    }
}

// 使用道具
$kyodai.use = function(id){
    $kyodai.sound(4)
    $kyodai.cancel()
    if (--$kyodai.pptnum[id]){
        document.getElementById("kyodai_ppt_"+id+"_num").src = $kyodai_images_url.value+"/ppt_num_"+ $kyodai.pptnum[id] +".gif"
    }
    else{
        document.getElementById("kyodai_ppt_"+id).removeNode()
        document.getElementById("kyodai_ppt_"+id+"_num").removeNode()
    }
    switch (id){
        // 提示
        case 1 : $kyodai.cue(false)
        break
        // 重列
        case 2 : $kyodai.reset()
//        break
//        // 炸弹
//        case 3 : $kyodai.cue(true)
    }
}

// 自动寻找
$kyodai.cue = function(isbomb){
    var s = $kyodai.shape
    var n = $kyodai.pptnum[1]
    for (var i=0; i<s.length; i++){
        n = $kyodai.block[s[i].x+","+s[i].y]
        if (n){
            for (var j=i+1; j<s.length; j++){
                if (n == $kyodai.block[s[j].x+","+s[j].y]){
                    var sx = s[i].x
                    var sy = s[i].y
                    var ex = s[j].x
                    var ey = s[j].y
                    var line = $kyodai.find(sx, sy, ex, ey)
                    if (line){
                        kyodai_cuechoose.innerHTML = 
                        '<img src = "'+$kyodai_images_url.value+'/choose.gif" onmouseup="$kyodai.click('+sx+','+sy+')" style="position:absolute;left:'+ (sx*31+4) +'px;top:'+ sy*35 +'px">'
                        + '<img src = "'+$kyodai_images_url.value+'/choose.gif" onmouseup="$kyodai.click('+ex+','+ey+')" style="position:absolute;left:'+ (ex*31+4) +'px;top:'+ ey*35 +'px">'
                        kyodai_lines.innerHTML = line.join("")
                        if (isbomb){
                            kyodai_cuechoose.innerText = ''
                            $kyodai.block[sx+","+sy] = 0
                            $kyodai.block[ex+","+ey] = 0
                            $kyodai.del(sx, sy, ex, ey)
                        }
                        return
                    }
                }
            }
        }
    }
}

// 重新排列
$kyodai.reset = function(){
    var blocks = []
    for (var i in $kyodai.block){
        blocks.push($kyodai.block[i])
    }
    $kyodai.setting(blocks)
}

// 播放音效
$kyodai.sound = function(id){
    try{
        au_sound.GotoFrame(0)
        au_sound.GotoFrame(id)
        au_sound.Play()
    }
    catch(err){}
}

// 游戏结束
$kyodai.over = function(type){
    $kyodai.cancel()
    clearInterval($kyodai.timeid)
    kyodai_count.style.pixelWidth = 0
    kyodai_center.src = $kyodai_images_url.value+"/" + type + ".gif"
    kyodai_center.style.display = ''
    kyodai_items.innerText = ''
    kyodai_ppt_num.innerText = ''
    kyodai_ppt.innerHTML = '<img src="'+$kyodai_images_url.value+'/ppt.gif">'
    document.onkeydown = null
}

// 开始练习
$kyodai.start = function(flag){
    kyodai_center.style.display = 'none'
    $kyodai.sound(1)
    $kyodai.cancel()
    $kyodai.pptnum = {1:3, 2:3}
    // 道具图片
    kyodai_ppt.innerHTML = 
        '<img id=kyodai_ppt_1 src="'+$kyodai_images_url.value+'/ppt_1.gif">'
    +   '<img id=kyodai_ppt_2 src="'+$kyodai_images_url.value+'/ppt_2.gif">'
    kyodai_ppt_num.innerHTML = 
        '<img id=kyodai_ppt_1_num src="'+$kyodai_images_url.value+'/ppt_num_3.gif" onmouseup="$kyodai.use(1)">'
    +   '<img id=kyodai_ppt_2_num src="'+$kyodai_images_url.value+'/ppt_num_3.gif" onmouseup="$kyodai.use(2)">'
    // 快捷键
    document.onkeydown = function(){
        if (event.keyCode==49 && $kyodai.pptnum[1]) $kyodai.use(1)
        if (event.d==50 && $kyodai.pptnum[2]) $kyodai.use(2)
    }
    getMap(flag);
}

var _getPassport=function(){
//    return 10000+Math.floor(Math.random()*1000%11);
    return "saatest@sohu.com";
}

var _getActiveId=function(){
    return "8a8104583d67adc6013d67d111630005";
}


/**
 * 从服务器获取地图
 */
var getMap=function(flag){
    var queryType={
       getMap:flag,
       passport:_getPassport(),
       activeId:_getActiveId()
    }
    _sendAjaxLinkGame(queryType,function(rstObj){
        if(rstObj.msg){
            alert(rstObj.msg);
            window.location.reload();//简单处理，刷页面 TODO 可以做成是停止游戏
        }
        _getMapFromServer.map=rstObj.map;
        $kyodai.loadmap()
        if(!$kyodai.practice){
            //整理地图的数据格式
            var mapDic=$kyodai.block;
            var mapList=$kyodai.shapeOld;
            var data={};
            for(var i=0;i<mapList.length;i++){
                x = mapList[i].x
                y = mapList[i].y
                var key=x+","+y;
                var value=mapDic[x+","+y];
                data[key]=value;
            }
            sendStartData(data);
        }
    });
}

/**
 * 第一次与服务器通信
 */
var sendStartData=function(data){
    var dataStr=JSON.stringify(data);
    var queryType={
       startData:dataStr,
       passport:_getPassport(),
       activeId:_getActiveId()
    }
    _sendAjaxLinkGame(queryType,function(rstObj){
        if(rstObj.msg){
            alert(rstObj.msg);
        }
        if(rstObj.gameId.length<1){
            alert('服务器异常，请重新开始游戏！');
        }
        sendStartData.gameId=rstObj.gameId;
    });
}

/**
 * 点击
 * @param {} data
 */
var sendClickData=function(data){
    var queryType={
       clickData:data,
       gameId:sendStartData.gameId
    }
    _sendAjaxLinkGame(queryType,function(rstObj){
        if(rstObj.msg){
            alert(rstObj.msg);
        }
    });
}

/**
 * 游戏结果
 * @param {} data
 */
var sendEndData=function(data){
    var queryType={
       endData:data,
       gameId:sendStartData.gameId
    }
    _sendAjaxLinkGame(queryType,function(rstObj){
//        alert(rstObj.gameId);
        var timeObj=$('#kyodai_time');
        timeObj.text(rstObj.time/1000.000+'秒');
        timeObj.show();
        if(rstObj.msg){
            alert(rstObj.msg);
        }
    });
    $('#kyodai_start').attr('src',$kyodai_images_url.value+'/anniu1.gif');
    $('#kyodai_start').bind('click', _startClick);
    $('#kyodai_test').attr('src',$kyodai_images_url.value+'/anniu.gif');
    $('#kyodai_test').bind('click', _testClick);
    kyodai_iframe.window.location.reload();
}

var _sendAjaxLinkGame=function(queryType,callback){
    var ajaxOptions={
       url:webAppId.value+'/2011SHshow/linkGame/gameData.at',
       parameters:{},
       method:'post'
    }
    ajaxOptions.parameters['queryTypeStr'] = encodeURI(JSON.stringify(queryType));
    var searchAjax = new Haley.Ajax(ajaxOptions);
    searchAjax.onLoading = function(){};
    searchAjax.onComplete = function(responseObject){
        var result=responseObject.textString;
        var retObj=$.parseJSON(result);
        callback(retObj);
    };
    searchAjax.start();
}



//var _sendAjaxLinkGame=function(queryType,callback){
//    var settings = {
//        type: "POST",
//        url:webAppId.value+'/2011SHshow/linkGame/gameData.at',
//        timeout: 1000,
//        error: function(XHR,textStatus,errorThrown) {
//            alert("XHR="+XHR+"\ntextStatus="+textStatus+"\nerrorThrown=" + errorThrown);
//        },
//        success: function(data,textStatus) {
//            var retObj=$.parseJSON(data);
//            callback(retObj);
//        },
//        data: {queryTypeStr:encodeURI(JSON.stringify(queryType))}
//    };
//    $.ajax(settings);
//}


var _startClick=function(){
    $('#kyodai_time').hide();
    $kyodai.practice=0;// 是否是练习
    this.src=$kyodai_images_url.value+'/anniu2.gif';
    $('#kyodai_start').unbind();
    $('#kyodai_test').attr('src',$kyodai_images_url.value+'/anniu0.gif')
    $('#kyodai_test').unbind();
    $kyodai.start('start');//开始
//    kyodai_iframe.window.location.reload();
}

var _testClick=function(){
    $('#kyodai_time').hide();
    $kyodai.practice=1;// 是否是练习
    $kyodai.start('test');//练习
//    kyodai_iframe.window.location.reload();
}

$(function(){
    $('#kyodai_start').bind('click', _startClick);
    $('#kyodai_test').bind('click', _testClick);
    $('#kyodai_map').bind('click', $kyodai.click);
})
