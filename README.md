<div align="center">
	<br/>
	<p>
		<a href="https://discord.js.org"><img src="https://beniiplayz.hu/glogger/emblem.svg" width="192" alt="glogger" /></a>
	</p>
	<p>
		<a href="https://discord.gg/QteMdzVXBy"><img src="https://img.shields.io/discord/1244158286153121883?label=discord&color=5865F2&logo=discord&logoColor=white" alt="discord server" /></a>
		<a href="https://www.npmjs.com/package/discord.js"><img src="https://img.shields.io/badge/npm-v1.3-violet" alt="npm version" /></a>
	</p>
</div>

# **Telepítés**
* ### Töltsd le a fájlokat az alábbi paranccsal
  ```
  git clone https://github.com/gondaoliver/GLogger.git
  ```
  #### Vagy akár a Releases oldalon is elérheted a forráskódot, ahogyan a kép is mutatja:

  ![image](https://github.com/gondaoliver/GLogger/assets/93977071/e66d7429-1452-42fa-bd55-370201bdeb2d)

* ### [Telepítsd a Node.js szoftverrendszert](https://nodejs.org/en)

  #### Nyiss egy terminált, és rakd fel a következő könyvtárakat, függőségeket:
  ```
  npm install discord.js dotenv moment-timezone winston
  ```
# **Használat**
* ### Hozz létre egy új applikációt a Discord Developer Portalon 
  * #### Fontos, hogy az úgynevezett "Privileged Gateway Intents"-nél az összes intent be legyen állítva

    ![image](https://github.com/gondaoliver/GLogger/assets/93977071/0706e79b-d63f-451d-bf16-9ad674c60899)
* ### Hívd meg a botodat azáltal, hogy egy meghívót készítesz
  ![image](https://github.com/gondaoliver/GLogger/assets/93977071/59e2c750-4230-447e-8203-89fea2b15278)
  * #### Majd másold be a böngésződbe, és válaszd ki a szerveredet
    ![image](https://github.com/gondaoliver/GLogger/assets/93977071/9b8eaa46-0f3a-443e-bf8a-62504c6c6646)
    * #### Megjegyzendő: Ha akarsz, külön rangot is fenntarthatsz a botod számára, azonban elegendő, ha az automatikusan generált jogosultságaival meghagyva helyezed el megfelelően a rangok listájában
* ### Módosítsd a projekt környezeti változóit tartalmazó (dotenv) fájlt
  * #### TOKEN - Add meg a botod tokenjét
  * #### ?CHANNEL_ID - Helyettesítsd ezen változók értékeit a csatornák azonosítójával, melyeket így kaphatsz meg:
    ![image](https://github.com/gondaoliver/GLogger/assets/93977071/6b3b6d9e-613d-4282-83fd-61c33e2a44e8)
    ![image](https://github.com/gondaoliver/GLogger/assets/93977071/6a0a261e-b5bb-4c25-abf0-e6500587c62c)
* ### Végül futtasd a GLoggert egy parancssorban, és már készen is vagy:
  ```
  node main.js
  ```