# **Telepítés**
-Töltsd le a fájlokat.
```
git clone https://github.com/gondaoliver/GLogger.git
```
Vagy pedig a Releases oldalon a source code letöltése opció.

![image](https://github.com/gondaoliver/GLogger/assets/93977071/e66d7429-1452-42fa-bd55-370201bdeb2d)

-Telepítsd a node.js-t [innen](https://nodejs.org/en)

-Egy parancssorba (cmd-be) futtasd a következőt:
```
npm install discord.js dotenv moment-timezone winston
```
# Használat
* A Discord Developer Portalon hozz létre egy új applicationt
  * A Bot részen a következő dolgok legyenek így
    
  ![image](https://github.com/gondaoliver/GLogger/assets/93977071/0706e79b-d63f-451d-bf16-9ad674c60899)
* Hívd be a botot így:
 * Készíts egy meghívót: 
  ![image](https://github.com/gondaoliver/GLogger/assets/93977071/59e2c750-4230-447e-8203-89fea2b15278)
 * Majd másold be a böngésződbe, és válaszd ki a szerveredet.

   ![image](https://github.com/gondaoliver/GLogger/assets/93977071/9b8eaa46-0f3a-443e-bf8a-62504c6c6646)
* A .env fájlt módosítsd a következők szerint:
  * A TOKEN részt helyettesítsd a bot tokenjével
  * A ..._CHANNEL_ID részeket helyettesítsd a csatornák ID-val, amiket így kaphatsz meg:
  
  ![image](https://github.com/gondaoliver/GLogger/assets/93977071/6b3b6d9e-613d-4282-83fd-61c33e2a44e8)
  ![image](https://github.com/gondaoliver/GLogger/assets/93977071/6a0a261e-b5bb-4c25-abf0-e6500587c62c)
* Készíts egy rangot a botnak, amivel látja ezeket a szobákat, és tud oda üzenetet küldeni.
* Majd nyisd meg a parancssort (cmd-t), és futtasd a következővel:
```
node main.js
```
