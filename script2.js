





let atributesId = ["str","ag","for","int","per","ch"];
let atributes =[];
let modifierId = ["strm","agm","form","intm","perm","chm"];
let modifiers = [];
let races=[];
let currentRace;






//класс рас
class Race {
  constructor(name,hdm) {
    this.name = name;
    this.hitDiceMax =  hdm;

  }

  hitDice(max) {
  let  hd=getRandomIntInclusive(1, max);
  return hd;
  }
}


//присвоене рас
for (let i = 0; i<5; i++){
  raceId = document.getElementById("o"+i);
  raceName = raceId.innerText;
  let hdm = 4+(i*2);
  let race = new Race(raceName, hdm);
  //console.log(race);
  races[i]=race;
}







//Присвоение атрибутов и модификаторов
  for (let i = 0; i<6; i++){
    atributes[i] = document.getElementById(atributesId[i]);
    atributes[i].value = getRandomIntInclusive(10, 18);

    //console.log(atributes[i]);  //вывод всех атрбутов в консоль

    modifiers[i] = document.getElementById(modifierId[i]);

    //console.log(modifiers[i]);  //вывод всех модификаторов в консоль
    if ((atributes[i].value - 10)==0){
    modifiers[i].textContent = 0;
    }
    else if ((atributes[i].value - 10) > 0 && (atributes[i].value % 2)==0){
      modifiers[i].textContent =  (atributes[i].value - 10)/2 ;
    }
    else {
      modifiers[i].textContent = ((atributes[i].value - 10)/2-0.5) ;
    }
    }


//Присвоение КЗ

let armorClass;
if (atributes[1].value < atributes[2].value){
  armorClass = (10 + parseInt(modifiers[2].textContent, 10));

}
else if (atributes[1].value > atributes[2].value){
  armorClass = (10 + parseInt(modifiers[1].textContent, 10));

}
else {
  armorClass = (10 + parseInt(modifiers[1].textContent, 10));
}

let ac = document.getElementById("ac");
ac.textContent = armorClass;


//для вычисления ХП
let hitDice
currentRace = document.getElementById("race").value;
for(let i=0;i<5;i++){
  if (races[i].name==currentRace){
    hitDice=races[i].hitDice(races[i].hitDiceMax);
    console.log("кость хитов:" + hitDice);
    break;
  }
}
let health = document.getElementById("health");
let totalHp = 10 + hitDice + parseInt(modifiers[0].textContent, 10)+ parseInt(modifiers[2].textContent, 10);
if (currentRace== "Ящер"){
  totalHp = totalHp +2;
}
health.textContent = totalHp;

//Мораль
let morale = document.getElementById("morale");
let totalMorale = 4;

for (let i=3;i<6;i++){
if (atributes[i].value >= 15){
  totalMorale++
}
}
morale.textContent = totalMorale;

//инициатива
let initiative = document.getElementById("initiative");
let totalInitiative;
if (atributes[3].value >= atributes[4].value){
totalInitiative = parseInt(modifiers[1].textContent, 10)+parseInt(modifiers[3].textContent, 10);
}
else {totalInitiative = parseInt(modifiers[1].textContent, 10)+parseInt(modifiers[4].textContent, 10);
}
initiative.textContent = totalInitiative;

//рандомисзатор
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
