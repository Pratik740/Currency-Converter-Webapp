
// Open the popup and populate options
function openPopup(selectType) {
    const popList = document.querySelector('#popup-options') ;
    popList.textContent = '';
    for(let country in countryList){
        const li = document.createElement('li');
        li.textContent = country ;
        li.addEventListener('click',(event)=>{
            document.querySelector(`#selected-${selectType}`).textContent = event.target.textContent;
            let img = '';
            if(selectType === 'from') img = document.querySelector('.first img');
            else img = document.querySelector('.second img');
            img.src = `https://flagsapi.com/${countryList[event.target.textContent]}/flat/64.png`;
            updateAmount();
            closePopup();
        });
        popList.appendChild(li);
    }
    document.querySelector('#popup').classList.add('show');
}

function closePopup() {
    document.getElementById('popup').classList.remove('show');
}

let current = '';
let inp = document.querySelectorAll('.input');

let currSelect = document.querySelector('#pre');
currSelect.style.color = "darkorange";

// Changing the font colour on click to decide which input is chosen
inp.forEach((input,index) => {
    input.addEventListener('click', () => {
        input.style.color = "darkorange"; 
        currSelect = input ;
        inp[0].textContent = "0";
        inp[1].textContent = "0"; 
        (index == 0 ? inp[1] : inp[0]).style.color = "white";      
    })
})
     



const nums = document.querySelectorAll('.num')

nums.forEach((num)=>{
    num.addEventListener('click',(event)=>{
        event.preventDefault();
        let no = num.getAttribute("data-value");
        updateValue(no);
        updateAmount();
    })
})

const popup = document.getElementById("popup-message");
function updateValue(no){
    let val = currSelect.textContent;
    console.log(currSelect)
    if(val.length >= 15 && (no != 'AC' && no != 'C')){
        showPopupMessage("Maximum Digits (15) reached");
        return ;
    }
    if(val == '0' && no != '00' && no != '0') val = '';
    if(no == 'AC'){ 
        val = '0';
        toChange.textContent = '0';
    }
    else if(no == 'C'){
        val = val.slice(0,-1); 
        if(val.length == 0) val = '0';
    }
    else if( val =='0' && (no == '0' || no == '00')){
        showPopupMessage("Please Enter a Valid Input");
    }
    else val += no;
    
    if(val.length >= 12)  currSelect.style.fontSize = "25px";
    else currSelect.style.fontSize = "30px";
    currSelect.textContent = val;
}

let toChange = '';
function updateAmount(){
    if(currSelect.id == "pre") toChange = document.querySelector('#pro');
    else toChange = document.querySelector('#pre'); 
    let fromCurr = currSelect.parentElement.querySelector('.custom-select span').textContent.slice(-3).toLowerCase();
    let toCurr = toChange.parentElement.querySelector('.custom-select span').textContent.slice(-3).toLowerCase();
    ActualUpdate(fromCurr,toCurr);        
}

const date = new Date().toISOString().split('T')[0];
const baseURL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies` ;
// https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{date}/v1/{endpoint} then json[fromCurr][toCurr]
console.log(date);


async function ActualUpdate(fromCurr,toCurr){
    let amount = Number(currSelect.textContent);
    const URL = `${baseURL}/${fromCurr}.json`;
    try{
        let response = await fetch(URL);    
        let json = await response.json();
        let rate = json[fromCurr][toCurr];
        rate = rate*amount;
        if(rate >= 1e8){
            toChange.style.fontSize = "25px";
        }
        else{
            toChange.style.fontSize = "30px";
        }
        toChange.textContent = rate.toFixed(2);
    }
    catch(error){
        console.error('Error fetching exchange rate:', error);
        throw error;
    }
}

document.querySelector('.last').textContent = `Last updated: ${date} 00:00 am`;
document.querySelector('#Exchange').addEventListener('click',(event)=>{
    event.preventDefault();
    let e1 = document.querySelector('#selected-from');
    let e2 = document.querySelector('#selected-to');
    console.log(e1,e2);
    [e1.textContent , e2.textContent] = [e2.textContent , e1.textContent] ;
    let img1 = document.querySelector('.first img');
    let img2 = document.querySelector('.second img');
    [img1.src , img2.src] = [img2.src , img1.src];
    updateAmount();        
})


function showPopupMessage(message) {
popup.style.display ="block";
popup.textContent = message ;

setTimeout(() => {
    popup.style.display = "none";
}, 1500); 
}

  













