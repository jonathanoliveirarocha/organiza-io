var monday = []
var tuesday = []
var wednesday = []
var thursday = []
var friday = []
var saturday = []
var sunday = []
var currentID = 0


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

function describe(id){
    document.querySelector(".main").style.filter = "blur(5px)"
    document.querySelector(".efect").style.display ="flex"
    document.querySelector(".descForm").style.display ="flex"

    descSelection(id)
    

    


}

function addItem(){
    var select = document.querySelector('#daySelectionAdd')
    var day = select.options[select.selectedIndex].value
        
    var start = document.querySelector('#start').value
    var end = document.querySelector('#end').value
    
    var input = document.querySelector('#activity')
    var activity = input.value

    input = document.querySelector('#desc')
    var desc = input.value

    
    
    

    if(day=='disabled' || start==0 || end==0 || activity==0 || desc==0){
        alert("Por favor Preencha Todos os Campos!")
    }else{

        switch(day) {
            case 'Segunda-Feira':
                addArray('monday',monday, start, end, activity, desc)
                break
            case 'Terça-Feira':
                addArray('tuesday',tuesday, start, end, activity, desc)
                break
            case 'Quarta-Feira':
                addArray('wednesday',wednesday, start, end, activity, desc)
                break
            case 'Quinta-Feira':
                addArray('thursday',thursday, start, end, activity, desc)
                break
            case 'Sexta-Feira':
                addArray('friday',friday, start, end, activity, desc)
                break
            case 'Sábado':
                addArray('saturday',saturday, start, end, activity, desc)
                break
            case 'Domingo':
                addArray('sunday',sunday, start, end, activity, desc)
                break
            default:
    
        }
    
    }
        

 
}


function addArray(element, dayName, start, end, activity, desc){
    dayName.push([currentID,start,end,activity, desc])
    document.querySelector(`#appointments${element}`).innerHTML+=`<div class="appointmentItem" id=${currentID} onclick="describe(id)">`+"\n"+
    `<div class="hour">`+"\n"+
        `<p>${start}</p>` +"\n"+
    `</div>` +"\n"+
    `<div class="appointmentDesc">` +"\n"+
        `<p>${activity}</p>` +"\n"+
    `</div>` +"\n"+
    `<div class="hourEnd">`+"\n"+
    `<p>${end}</p>` +"\n"+
    `</div>` +"\n"+
    `</div>`
    currentID++
    alert("Acicionado Com Sucesso")
}


function descSelection(id){
    for(var x=0; x<monday.length;x++){
        if(monday[x][0]==id){
            document.querySelector('#daySelectionDesc').value = "Segunda-Feira"
            document.querySelector('#startDesc').value= monday[x][1]
            document.querySelector('#endDesc').value= monday[x][2]
            document.querySelector('#activityDesc').value = monday[x][3]
            document.querySelector('#descDesc').value = monday[x][4]
            return 0
           
        }
        
    }
    for(var x=0; x<tuesday.length;x++){
        if(tuesday[x][0]==id){
            document.querySelector('#daySelectionDesc').value = "Terça-Feira"
            document.querySelector('#startDesc').value= tuesday[x][1]
            document.querySelector('#endDesc').value= tuesday[x][2]
            document.querySelector('#activityDesc').value = tuesday[x][3]
            document.querySelector('#descDesc').value = tuesday[x][4]
            return 0
        }
        
    }
    for(var x=0; x<wednesday.length;x++){
        if(wednesday[x][0]==id){
            document.querySelector('#daySelectionDesc').value = "Quarta-Feira"
            document.querySelector('#startDesc').value= wednesday[x][1]
            document.querySelector('#endDesc').value= wednesday[x][2]
            document.querySelector('#activityDesc').value = wednesday[x][3]
            document.querySelector('#descDesc').value = wednesday[x][4]
            return 0
        }
        
    }
    for(var x=0; x<thursday.length;x++){
        if(thursday[x][0]==id){
            document.querySelector('#daySelectionDesc').value = "Quinta-Feira"
            document.querySelector('#startDesc').value= thursday[x][1]
            document.querySelector('#endDesc').value= thursday[x][2]
            document.querySelector('#activityDesc').value = thursday[x][3]
            document.querySelector('#descDesc').value = thursday[x][4]
            return 0
        }
        
    }
    for(var x=0; x<friday.length;x++){
        if(friday[x][0]==id){
            document.querySelector('#daySelectionDesc').value = "Sexta-Feira"
            document.querySelector('#startDesc').value= friday[x][1]
            document.querySelector('#endDesc').value= friday[x][2]
            document.querySelector('#activityDesc').value = friday[x][3]
            document.querySelector('#descDesc').value = friday[x][4]
            return 0
        }
        
    }
    for(var x=0; x<saturday.length;x++){
        if(saturday[x][0]==id){
            document.querySelector('#daySelectionDesc').value = "Sábado"
            document.querySelector('#startDesc').value= saturday[x][1]
            document.querySelector('#endDesc').value= saturday[x][2]
            document.querySelector('#activityDesc').value = saturday[x][3]
            document.querySelector('#descDesc').value = saturday[x][4]
            return 0
        }
        
    }
    for(var x=0; x<sunday.length;x++){
        if(sunday[x][0]==id){
            document.querySelector('#daySelectionDesc').value = "Domingo"
            document.querySelector('#startDesc').value= sunday[x][1]
            document.querySelector('#endDesc').value= sunday[x][2]
            document.querySelector('#activityDesc').value = sunday[x][3]
            document.querySelector('#descDesc').value = sunday[x][4]
            return 0
        }
        
    }



}