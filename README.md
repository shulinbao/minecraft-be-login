# minecraft-be-login  
This is a JavaScript plugin for LiteLoaderBDS that supports basic external whitelists and login rewards.  

*The motivation for developing this plugin goes beyond implementing player sign-ins. It primarily addresses the instability of Xbox services in mainland China, providing an alternative method to verify whether a player has whitelist access without relying solely on Xbox accounts.*  

## Dependencies  
This plugin requires [LiteLDev/LiteLoaderBDS](https://github.com/LiteLDev/LiteLoaderBDS) to run.  

## Note:  
This plugin does not create the `daily` scoreboard. If new players join the game, make sure to manually create this scoreboard for them.  

## Important Notes  
- This plugin only checks if the player’s name is on the whitelist; it does not verify whether a player is impersonating someone else. If you need anti-impersonation functionality, consider adding a password feature to the code.  
- The delay for playing the welcome sound effect and sending the welcome message is set to 25,000 milliseconds. If your server has good performance and you find this delay too long, you can shorten it as needed. However, due to game mechanics, it is not recommended to set this delay too short.  
- This plugin creates a data file at `/plugins/Login/Logininterval.json` to store login data. The file format is as follows:  
```json
{"lgt":{"sz":[{"id":"player","logout":0},{"id":"player2","logout":1675482990716},{"id":"player3","logout":1674734705838}]}}
```

## Usage  
Place this plugin in the default plugin directory of LiteLDev/LiteLoaderBDS, usually `./plugins`.  

## Acknowledgments  
- [LiteLDev/LiteLoaderBDS](https://github.com/LiteLDev/LiteLoaderBDS), for the development of LiteLoaderBDS.  
