var clickedID=0;
var clickedDayWeek="";

function add(){
    document.querySelector(".main").style.filter = "blur(5px)"
    document.querySelector(".efect").style.display ="flex"
    document.querySelector(".addForm").style.display ="flex"
    
}

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

function closeMsg(){
    document.querySelector(".status").style.display = "none"
}

// function msgDialog(status, msg){
//     if(status){
//         document.querySelector(".msgDialog").style.color = "rgb(20, 161, 46)"
//         document.querySelector(".statusMsg").style.backgroundColor = "#afc8a0"
//     }else{
//         document.querySelector(".msgDialog").style.color = "rgb(161, 20, 20)"
//         document.querySelector(".statusMsg").style.backgroundColor = "#b67777"
//     }
//     document.querySelector(".msgDialog").innerHTML = `${msg}`
//     document.querySelector(".status").style.display = "flex"
// }


function convertToEnglish(day){
    switch(day) {
        case 'Segunda-Feira':
            return 'monday'           
            break
        case 'Terça-Feira':
            return 'tuesday'  
            break
        case 'Quarta-Feira':
            return 'wednesday' 
            break
        case 'Quinta-Feira':
            return 'thursday' 
            break
        case 'Sexta-Feira':
            return 'friday' 
            break
        case 'Sábado':
            return 'saturday' 
            break
        case 'Domingo':
            return 'sunday' 
            break
        default:

    }

}


function removeElement(){
    window.location.href = `/removerElemento/${clickedDayWeek}/${clickedID}`;
}
