const gameContainer = document.querySelector('#game-container');
const resetBtn = document.getElementById('reset-btn');
const resizeBtn = document.getElementById('resize-btn');
const blackBtn = document.getElementById('black-btn');
const rainbowBtn = document.getElementById('rainbow-btn');
const darkenBtn = document.getElementById('darken-btn');
const eraserBtn = document.getElementById('eraser-btn');
const colorPicker = document.getElementById('color-picker');
const baseColor = document.getElementById('base-color');
let smallWindow = window.matchMedia('(max-width: 500px)');
let mediumWindow = window.matchMedia('(max-width: 1000px)');
let largeWindow = window.matchMedia('(max-width: 2000px)');


let squares = [];
let brushColor = '#b6b4b1';
let gameHeight = 650;
let gameWidth = 550;
let squareColor = '#bab6b3';
let colorPicked;


widthSquares = (columns) => {
    squareWidth = gameHeight / columns;
    return (squareWidth + 1) + 'px';
};

heightSquares = (rows) => {
    squareHeight = gameWidth / rows;
    return (squareHeight + 1) + 'px';
};

getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
  };

recolorSquares = () => {
    squares.forEach(square => {
        square.style.backgroundColor = baseColor.value;
    });
};

brushEvent = (color) => {
    squares.forEach(square => {
        square.className = 'square';
        switch (color) {
            case 'colorPicker':
                square.addEventListener('mouseenter', () => {
                    colorPicked = colorPicker.value;
                    square.style.backgroundColor = colorPicked;
                });
                break;    
            case 'darken':
                square.addEventListener('mouseenter', () => {
                    square.style.backgroundColor = pSBC(-0.1, square.style.backgroundColor);
                });
                break;
            case 'rainbow': 
                square.addEventListener('mouseenter', () => {
                    square.style.backgroundColor = getRandomColor();
                });
                break;  
            case 'black':
                square.addEventListener('mouseenter', () => {
                    square.style.backgroundColor = '#000000';
                });
                break;
            default:
                square.addEventListener('mouseenter', () => {
                    square.style.backgroundColor = brushColor;
                });
        };
    });    
};    

createGrid = (rows, columns) => {
    gameContainer.style.gridAutoRows = widthSquares(rows);
    gameContainer.style.gridAutoColumns = heightSquares(columns);
    size = rows * columns; 
    let row = 1;
    let column = 1;
    for (let i = 0; i < size - 1; i++) {
        const newSquare = document.createElement('div');
        gameContainer.appendChild(newSquare);
        newSquare.className = 'square';
        newSquare.style.backgroundColor = baseColor.value;
        newSquare.style.gridRow = row;
        newSquare.style.gridColumn = column;
        squares.push(newSquare);
        column += 1;
        if (column == columns) {
            row += 1;
            column = 1;
        };
        console.log('square created');
    };
};

createGrid(16, 16);

resizeBtn.addEventListener('click', () => {
    var elements = document.getElementsByClassName('square');
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    };
    squares = [];
    createGrid(prompt('Number of rows?', 16), prompt('Number of columns?', 16));
});

baseColor.addEventListener('input', () => {
    recolorSquares();
});

colorPicker.addEventListener('click', () => {
    brushEvent('colorPicker')
});

blackBtn.addEventListener('click', () => {
    brushEvent('black');
});

rainbowBtn.addEventListener('click', () => {
    brushEvent('rainbow');
});

darkenBtn.addEventListener('click', () => {
    brushEvent('darken');
});

eraserBtn.addEventListener('click', () => {
    brushEvent(squareColor);
});

resetBtn.addEventListener('click', () => {
    squares.forEach(square => {
        square.style.backgroundColor = squareColor;
    })
})

