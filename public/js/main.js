// Defining selected day variables
var clickedID=0
var clickedDayWeek=""

// Show addition form
function add(){
    document.querySelector(".main").style.filter = "blur(5px)"
    document.querySelector(".efect").style.display ="flex"
    document.querySelector(".addForm").style.display ="flex"
}

// Close add or description window
function closeWindow(){
    document.querySelector(".efect").style.display ="none"
    document.querySelector(".descForm").style.display ="none"
    document.querySelector(".addForm").style.display ="none"
    document.querySelector(".main").style.filter = "blur(0px)"
    
    document.querySelector('#daySelectionDesc').value = "disabled"
    document.querySelector('#startDesc').value= null
    document.querySelector('#endDesc').value= null
    document.querySelector('#activityDesc').value = null
    document.querySelector('#descDesc').value = null

    document.querySelector('#daySelectionAdd').value = "disabled"
    document.querySelector('#start').value= null
    document.querySelector('#end').value= null
    document.querySelector('#activity').value = null
    document.querySelector('#desc').value = null
}

// Fill data and show description form
function describe(list){
    clickedDayWeek= convertToEnglish(list[0])
    clickedID=list[5]
    document.querySelector(".main").style.filter = "blur(5px)"
    document.querySelector(".efect").style.display ="flex"
    document.querySelector(".descForm").style.display ="flex"
    document.querySelector('#daySelectionDesc').value = list[0]
    document.querySelector('#startDesc').value= list[1]
    document.querySelector('#endDesc').value= list[2]
    document.querySelector('#activityDesc').value = list[3]
    document.querySelector('#descDesc').value = list[4]
}

// Close status message
function closeMsg(){
    document.querySelector(".status").style.display = "none"
}

// Animation msgDialog
window.onload = function () {
    var status = document.querySelector('.status')
    setTimeout(() => {
        status.classList.add('hidden'); 
    }, 4000); 

    setTimeout(() => {
        status.style.display = 'none';
        status.classList.remove('hidden');
    }, 5500);
} 

// Convert day in Portuguese to English
function convertToEnglish(day){
    switch(day) {
        case 'Segunda-Feira':
            return 'monday'           
        case 'Terça-Feira':
            return 'tuesday'  
        case 'Quarta-Feira':
            return 'wednesday' 
        case 'Quinta-Feira':
            return 'thursday' 
        case 'Sexta-Feira':
            return 'friday' 
        case 'Sábado':
            return 'saturday' 
        case 'Domingo':
            return 'sunday' 
        default:
    }
}

// Access remove element route
function removeElement(){
    window.location.href = `/removerElemento/${clickedDayWeek}/${clickedID}`;
}

// Dark-mode
    // Elements
    var btnDarkMode = document.getElementById('dark-mode-btn')
    var isEnabled = localStorage.getItem('dark-mode')
    var daysDiv = document.querySelector('.days')
    var titleh1 = document.querySelectorAll('.title h1')
    var appointmentsDivs = document.querySelectorAll('.appointments')
    var titleDivs = document.querySelectorAll('.title')
    var updateFormDiv = document.querySelector('.updateForm')
    var selects = document.querySelectorAll('select')
    var textarea = document.querySelectorAll('textarea')
    var addFormBtn = document.querySelector('#addFormBtn')
    var inputs = document.querySelectorAll('input')

    function turningElementsDark(){
        // Turning elements in dark-mode
        document.body.classList.toggle('dark-mode')
        daysDiv.classList.toggle('dark-mode')
        updateFormDiv.classList.toggle('dark-mode')
        addFormBtn.classList.toggle('dark-mode')
        inputs.forEach(item => {
            item.classList.toggle('dark-mode')
        });
        textarea.forEach(item => {
            item.classList.toggle('dark-mode')
        });
        selects.forEach(item => {
            item.classList.toggle('dark-mode')
        });
        titleh1.forEach(item => {
            item.classList.toggle('dark-mode')
        });
        appointmentsDivs.forEach(item => {
            item.classList.toggle('dark-mode')
        });

        titleDivs.forEach(div => {
            div.classList.toggle('dark-mode')
        });
    }

    function darkMode() {
        turningElementsDark()
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'true')
        } else {
            localStorage.setItem('dark-mode', 'false')
        }
    }

    if (isEnabled=='true') {
        btnDarkMode.click()
        turningElementsDark()
    }

    btnDarkMode.addEventListener('click', darkMode)

