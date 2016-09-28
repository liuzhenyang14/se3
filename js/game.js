var grid_size = 30;
var canvas_size = 450;

var map = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,0,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,0,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

var can = document.getElementById('my_map');
var cans = can.getContext('2d');

paint();
start();
 
function paint() {
    var i = 0, j = 0;
    cans.clearRect(0,0,canvas_size,canvas_size);
    //显示活细胞
    for (i = 0; i < canvas_size / grid_size; i++){
        for (j = 0; j < canvas_size / grid_size; j++){
            if (map[i][j] == 1){
                cans.fillStyle = 'blue';
                //注意，数组下标i对应y轴，下标j对应x轴
                cans.fillRect(j * grid_size, i * grid_size, grid_size, grid_size);
            }
        }
    }
}

function sur_or_die() {
    //判断该细胞的状态
    var i, j;
    var a = 0, b = 0;
    var num;
    var temp = new Array();
    for (a = 0; a < canvas_size/grid_size; a++){
        temp[a] = new Array();
        for (b = 0; b < canvas_size/grid_size; b++){
            temp[a][b] = map[a][b];
        }
    }
    for (i = 0; i < canvas_size / grid_size; i++){
        for (j = 0; j < canvas_size / grid_size; j++){
            //需要计算该细胞周围活细胞个数
            num = sur_num(i, j);
            if (num == 3){
                temp[i][j] = 1;
            } else if (num == 2){
                continue;
            }
            else if (num >= 0){
                temp[i][j] = 0;
            }
        }
    }
    for (a = 0; a < canvas_size/grid_size; a++){
        for (b = 0; b < canvas_size/grid_size; b++){
            map[a][b] = temp[a][b];
        }
    }
}

function sur_num(x, y){
    //计算给定行列的细胞周围八个细胞的活细胞数，边界考虑循环
    if (typeof x != 'number' || typeof y != 'number'){
        return -1;
    }
    if (x < 0 || x > 14 || y < 0 || y > 14){
        return -1;
    }
    var num = 0;
    var i, j;
    for (i = x -  1; i <= x + 1; i++){
        for (j = y - 1; j <= y + 1; j++){
            //考虑边界情况
            if (map[(i + 15) % 15][(j + 15) % 15] == 1){
                num ++;
            }
        }
    }
    //考虑自身
    if (map[x][y] == 1){
        num--;
    }
    return num;
}

function start(){
    setInterval(function(){
        sur_or_die();
        paint();

    }, 100);
}