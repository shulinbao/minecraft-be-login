var have = File.readFrom('plugins/Login/Logininterval.json');
if (have == null) {
    var lg = {"lgt":{"sz":[{"id":"player","logout":0}]}}
    var jz = JSON.stringify(lg);
    File.mkdir('.\\plugins\\Login');
    File.readFrom('plugins/Login/Logininterval.json', jz);
    log('首次加载Login interval插件 数据json文件已保存于BDS根目录/plugins/Login/Logininterval.json')
}
mc.listen('onJoin', (pl) => {
//    var je = JSON.stringify(e);
    var lg = File.readFrom('plugins/Login/Logininterval.json');
    var lgj = JSON.parse(lg);
    var i;
    var ii = lgj.lgt.sz.length - 1;
    var havaplayer = false;

    for (i in lgj.lgt.sz) {

//        log('i=' + i + '。');
//	log('ii=' + ii + '。');
//	log('lgj.lgt.sz[i].id=' + lgj.lgt.sz[i].id + '。');

        if (i <= ii && lgj.lgt.sz[i].id == pl.realName) {

            var pll = '"' + pl.realName + '"';

            var d = new Date();
            var logint = d.getTime();
            var logout = lgj.lgt.sz[i].logout
            var interval = logint - logout
            let days = Math.floor(interval / (24 * 3600 * 1000));
            let leavel = interval % (24 * 3600 * 1000);
            let hours = Math.floor(leavel / (3600 * 1000));
            let leavel2 = leavel % (3600 * 1000);
            let minutes = Math.floor(leavel2 / (60 * 1000));
            setTimeout(function () {
                log('时隔' + days + '天' + hours + '时' + minutes + '分 玩家' + pl.realName + '再次进入了服务器');

            setTimeout(function () {
	        mc.runcmd('playsound firework.large_blast @a');

                var lgc = '欢迎进入我们的世界，现在距离您上次登出服务器' + days + '天' + hours + '时' + minutes + '分，要常回来看看哦！';
                mc.runcmd('tellraw "'+pl.realName+'" {"rawtext":[{"text":"'+lgc+'"}]}')
            }, 25000);

		if (hours >= 4 || days >= 1) {
			mc.runcmd('tellraw ' + pll + ' {"rawtext":[{"text":"距上次上线超过4小时，获得了1金币登录奖励！请前往各大城市的NPC处领取！"}]}');
//记得新增daily积分版
	     		mc.runcmd('scoreboard players set ' + pll + ' daily 1');
			mc.runcmd('playsound random.orb ' + pll + '');
			mc.runcmd('playsound random.orb ' + pll + '');
			mc.runcmd('playsound random.orb ' + pll + '');	
			}
		if (hours <= 3 && days == 0) {
			mc.runcmd('scoreboard players set ' + pll + ' daily 0');
			}

		for (i in lgj.lgt.sz) {
			if (i <= ii && lgj.lgt.sz[i].id == pl.realName) {
				var d = new Date();
				var logout = d.getTime();
				lgj.lgt.sz[i].logout = logout
				var jz = JSON.stringify(lgj);
				File.writeTo('plugins/Login/Logininterval.json', jz);
			}
		}

            }, 16000);
            havaplayer = true;
        } else if (i == ii && lgj.lgt.sz[i].id != pl.realName && havaplayer == false) {
                log('玩家' + pl.realName + '由于没有白名单被踢出');
                setTimeout(function () {
                mc.runcmd('kick ' + pl.realName + ' 您尚未获得白名单！请加qq群 864413624 获取白名单！');
            }, 10000);
        }
    }
});


log('Login interval >> 登陆插件 by shulinbao')