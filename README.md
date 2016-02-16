#It's an ongoing project it's not finished yet. If you wanna help me, you are welcome :D

Mario Cocos2d-JS
====================

A clone of Mario NES using Coco2d Javascript engine. 

#Todo:
- Add Physics
- Create others maps using tiled map.
- Add colissions
- Add level manager
- Add 
- Add game over logic
- Add lost hero power.

###Tools:
- [Python 2.7.10](https://www.python.org/downloads/release/python-2710/)
- [Cocos2d](http://www.cocos2d-x.org/download)
- [Brackets](http://brackets.io/)
- [Tiled](http://www.mapeditor.org/download.html)
- [Photoshop CS6](http://www.adobe.com/products/photoshop.html)

###Sprites:
I took the sprites from: [http://www.spriters-resource.com/nes/supermariobros/](http://www.spriters-resource.com/nes/supermariobros/).
I edited these tiles using photoshop but you could use other graphics editing software. Be careful with the image compression, some compression are not supported by Cocos2D

###Audio: 

TODO

###Limitations:
- We can have just one `Tileset` in tiled map editor. This is because cocos2d limit you to have just one `Tileset` in tmx files.

###Tiles
I was looking an error in tile redering just for that, it tooks me  hours; from lastest commit until now :/.
It's weird but in resume I'm not using tsx files.
I had to use render mode 1 (canvas), if I use 0 or 2(webGl) some weird lines are shown when redering the game :/

###Things I learnt
- First commit or pull can take several time depending on your internet connection speed.
