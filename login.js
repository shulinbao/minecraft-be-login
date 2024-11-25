// 初始化登录数据文件
let loginData = File.readFrom('plugins/Login/Logininterval.json');
if (loginData == null) {
    // 初始化数据结构
    const initialData = { "lgt": { "sz": [{ "id": "player", "logout": 0 }] } };
    const jsonData = JSON.stringify(initialData);

    // 创建插件目录并保存初始数据文件
    File.mkdir('.\\plugins\\Login');
    File.writeTo('plugins/Login/Logininterval.json', jsonData);
    log('首次加载Login插件，数据文件已保存至 BDS 根目录/plugins/Login/Logininterval.json');
}

// 玩家加入事件监听
mc.listen('onJoin', (player) => {
    const loginData = File.readFrom('plugins/Login/Logininterval.json');
    const loginJson = JSON.parse(loginData); // 将 JSON 数据解析为对象
    const playerList = loginJson.lgt.sz;    // 玩家数据数组
    const lastIndex = playerList.length - 1;
    let playerExists = false;

    for (let i in playerList) {
        const record = playerList[i];

        // 检查玩家是否存在于白名单
        if (i <= lastIndex && record.id === player.realName) {
            const playerName = `"${player.realName}"`;
            const currentTime = new Date().getTime(); // 当前时间戳
            const lastLogoutTime = record.logout;
            const interval = currentTime - lastLogoutTime;

            // 计算时间间隔（天、小时、分钟）
            const days = Math.floor(interval / (24 * 3600 * 1000));
            const leftoverDay = interval % (24 * 3600 * 1000);
            const hours = Math.floor(leftoverDay / (3600 * 1000));
            const leftoverHour = leftoverDay % (3600 * 1000);
            const minutes = Math.floor(leftoverHour / (60 * 1000));

            // 延时提示玩家登录信息
            setTimeout(() => {
                log(`时隔 ${days} 天 ${hours} 时 ${minutes} 分，玩家 ${player.realName} 再次进入了服务器`);

                setTimeout(() => {
                    // 播放欢迎音效并发送欢迎消息
                    mc.runcmd('playsound firework.large_blast @a');
                    const welcomeMessage = `欢迎进入我们的世界，现在距离您上次登出服务器 ${days} 天 ${hours} 时 ${minutes} 分，要常回来看看哦！`;
                    mc.runcmd(`tellraw "${player.realName}" {"rawtext":[{"text":"${welcomeMessage}"}]}`);
                }, 25000);

                // 根据登录间隔分发奖励
                if (hours >= 4 || days >= 1) {
                    mc.runcmd(`tellraw ${playerName} {"rawtext":[{"text":"距上次上线超过4小时，获得了1金币登录奖励！请前往各大城市的NPC处领取！"}]}`);
                    mc.runcmd(`scoreboard players set ${playerName} daily 1`);
                    for (let i = 0; i < 3; i++) {
                        mc.runcmd(`playsound random.orb ${playerName}`);
                    }
                } else if (hours <= 3 && days === 0) {
                    mc.runcmd(`scoreboard players set ${playerName} daily 0`);
                }

                // 更新玩家登出时间
                record.logout = new Date().getTime();
                const updatedData = JSON.stringify(loginJson);
                File.writeTo('plugins/Login/Logininterval.json', updatedData);
            }, 16000);

            playerExists = true;
            break;
        }
        // 如果玩家不在白名单，踢出玩家
        if (i == lastIndex && record.id !== player.realName && !playerExists) {
            log(`玩家 ${player.realName} 由于没有白名单被踢出`);
            setTimeout(() => {
                mc.runcmd(`kick ${player.realName} 您尚未获得白名单！请加QQ群 xxxxxxx 获取白名单！`);
            }, 10000);
        }
    }
});

log('Login interval >> 登录插件 by shulinbao');
