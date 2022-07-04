//объявляем переменные и массивы
let arr=[];
let races=[];
let hitDie = 0;
let currentRace;
let competent;
let master;
let totalSkillBonus = 0;
let armorClass;
let atributes = [];
let modifiers = [];
let morale = document.getElementById("morale");
let totalMorale = 4;
let initiative = document.getElementById("initiative");
let totalInitiative;

//skills block
class Skills {
  constructor(name,competent, master, keymod, totalBonus) {
    this.name = name;
    this.keymod = keymod;
    this.competence =  competent;
    this.mastery =  master;
    this.bonus =  totalBonus;

  }
}
//Get skills
let skillsArr = [];
let skillsBlaBla = [];

document.querySelectorAll('.cur-skill').forEach((el)=>{
  skillsArr.push(el);
});

for (let elem of skillsArr){
  let prom = new Skills(elem, 0, 0, elem.querySelector('b').innerHTML, 0);
  skillsBlaBla.push(prom);
}

//собираем Расы в массив в поряддке увеличения кости хитов
document.querySelectorAll('.race-option').forEach((el)=>{
  arr.push(el.textContent);
});

//класс рас
class Race {
  constructor(name,hdm) {
    this.name = name;
    this.hitDiceMax =  hdm;

  }
}

//присвоене рас
for (let i=0; i<arr.length; i++){
  let hdm = 4+(i*2);
  let race = new Race(arr[i], hdm);
  races[i]=race;
}
//get atribute
class Atribute {
  constructor(modKey, value) {
    
    this.modKey =  modKey;
    this.value =  value;

  }
}

let atrArr = [];
document.querySelectorAll('.atribute').forEach((el, i)=>{
  atrArr[i] = new Atribute(el.querySelector('.atr-title').innerHTML, el.querySelector('.modifier').innerHTML);
});







//Получаем расу и кость хитов

function getRace(){
  
  currentRace = document.querySelector('#race').value;
  
  for (r of races){
    if(r.name === currentRace){
      hitDie = hitDice(r.hitDiceMax);
      document.querySelector('.hit-die').textContent = hitDie;
    }
  };
  
  totalHp();
};


//расчет хп
function totalHp(){
  let totalHp = parseInt(document.querySelector('#strm').textContent,10)+parseInt(document.querySelector('#form').textContent,10)+10+hitDie;

  if(currentRace === 'Ящер') {
    totalHp += 2;
  }

  document.querySelector('#health').textContent = totalHp;
  
  return totalHp;
}

//расчет модификаторов
document.querySelectorAll('.inneratr').forEach((el, i) => {
  el.addEventListener('change',()=>{
    let modifier = Math.floor((el.value - 10)/2);
    document.querySelectorAll('.modifier')[i].textContent = modifier;
    totalHp();
    setArmorClass();
    setMorale ();
    setInitiative();
    inpt();
    inpt5();
    reCapAtr()
  });
}); 

//перерасчет модификаторов
function reCapAtr() {
  for (el of atrArr) {
    document.querySelectorAll('.atribute').forEach((elem) => {
      if (el.modKey === elem.querySelector('.atr-title').innerHTML) {
        el.value = elem.querySelector('.modifier').innerHTML;
      }


    }) 
      
  }
  totalSkillReCap();
}

//пересчет бонуса скиллов

 function totalSkillReCap() {
  for (el of skillsBlaBla) {
    for(elem of atrArr){
      if (el.keymod === elem.modKey) {
        el.bonus = parseInt(elem.value,10);
        el.bonus = el.bonus + el.mastery;
      }
    }
  }
  for(let i =1; i<23; i++) {
    document.querySelector('.skills').children[i].children[2].innerHTML =  skillsBlaBla[i-1].bonus
  }
} 


function inpt() {

  document.querySelectorAll('.input_check').forEach((elem, i)=>{
    elem.addEventListener('change', ()=>{
      if (skillsBlaBla[i].mastery !== 5) {
        if(elem.checked === true) {
          
        
          skillsBlaBla[i].mastery = 2;
          totalSkillReCap()
          
  
        } 
        else {
          skillsBlaBla[i].mastery = 0;
          totalSkillReCap()
          
        }
      }
    });
  });
  totalSkillReCap()
}

function inpt5() {
  document.querySelectorAll('.input_check_5').forEach((elem, i)=>{
    elem.addEventListener('change', ()=>{
      
        if(elem.checked === true) {
          
          document.querySelectorAll('.input_check')[i].checked = true;
          skillsBlaBla[i].mastery = 2;
          skillsBlaBla[i].mastery = 5;
          totalSkillReCap();
          
          document.querySelectorAll('.input_check')[i].disabled = true;
        } 
        else {
          skillsBlaBla[i].mastery = 2;
          totalSkillReCap();
          document.querySelectorAll('.input_check')[i].disabled = false;
        }
      
    });
  });
  totalSkillReCap()
}





//ролл дайса
function hitDice(max) {
  let  hd=getRandomIntInclusive(1, max);
  return hd;
}

//armor class


function setArmorClass(){

  atributes = [];
  modifiers = [];

  document.querySelectorAll('.inneratr').forEach((el)=>{
    atributes.push(el);
  });

  document.querySelectorAll('.modifier').forEach((el)=>{
    modifiers.push(el);
  });
  
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
  return armorClass;
}


//initiative


function setInitiative() {
  totalInitiative = 0;
  if (atributes[3].value >= atributes[4].value){
    totalInitiative = parseInt(modifiers[1].textContent, 10)+parseInt(modifiers[3].textContent, 10);
    }
    else {totalInitiative = parseInt(modifiers[1].textContent, 10)+parseInt(modifiers[4].textContent, 10);
    }
    initiative.textContent = totalInitiative;
    return totalInitiative;
}



//morale

function setMorale (){
  totalMorale = 4;
  for (let i=3;i<6;i++){
    if (atributes[i].value >= 15){
      totalMorale++
    }
  }
  morale.textContent = totalMorale;
  return totalMorale;
}

//рандомисзатор
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}




//подгружаем фото

document.getElementById('file').onchange = function (evt) {
  var tgt = evt.target || window.event.srcElement,
      files = tgt.files;

  // FileReader support
  if (FileReader && files && files.length) {
      var fr = new FileReader();
      fr.onload = function () {
          document.getElementById('displayImg').src = fr.result;
      }
      fr.readAsDataURL(files[0]);
  }

  // Not supported
  else {
      // fallback -- perhaps submit the input to an iframe and temporarily store
      // them on the server until the user's session ends.
  }
}











/* Скилы */
/* document.querySelectorAll('.input_check').forEach((elem, i)=>{
  elem.addEventListener('change', ()=>{
    if (skillsBlaBla[i].mastery !== 5) {
      if(elem.checked === true) {
        
      
        skillsBlaBla[i].competence = 2;
        document.querySelectorAll('.skill-bonus')[i].textContent = skillsBlaBla[i].competence;
        

      } 
      else {
        skillsBlaBla[i].competence = 0;
        document.querySelectorAll('.skill-bonus')[i].textContent = skillsBlaBla[i].competence;
        
      }
    }
  });
}); */

/* document.querySelectorAll('.input_check_5').forEach((elem, i)=>{
  elem.addEventListener('change', ()=>{
    
      if(elem.checked === true) {
        
        document.querySelectorAll('.input_check')[i].checked = true;
        skillsBlaBla[i].competence = 2;
        skillsBlaBla[i].mastery = 5;
        document.querySelectorAll('.skill-bonus')[i].textContent = skillsBlaBla[i].mastery;
        
        document.querySelectorAll('.input_check')[i].disabled = true;
      } 
      else {
        skillsBlaBla[i].mastery = 0;
        document.querySelectorAll('.skill-bonus')[i].textContent = 2;
        document.querySelectorAll('.input_check')[i].disabled = false;
      }
    
  });
}); */




