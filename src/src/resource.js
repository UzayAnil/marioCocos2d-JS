var res = [
    "res/tmx/tiles.png"
];

function AddMapsToRes(levels, subLevels){
    for(var i = 1; i <= levels; i++)
        for(var j = 1; j<= subLevels; j++)
            res.push("res/tmx/" + i + "_" + j + ".tmx");
}

AddMapsToRes(1,1);