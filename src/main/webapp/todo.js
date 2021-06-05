var summaryObj={
    yesterday:0,
    today:0,
    tomorrow:0
}

var taskObj={
    task:[],
    date:[],
    time:[],
    dateObj:[],
    delayStatus:[],
    timerClear:[],
    dbid:[]
};

        function addTask(){
            getObjData();
            addToDB();
            appendData();
            summaryData();
        }

        function deleteTask(deleteValue){
            if(deleteValue==undefined){

                deleteValue=document.querySelector("#taskDelete");
            }
            else 
                deleteValue--;

            var list = document.getElementById("taskList");   
            list.removeChild(list.childNodes[deleteValue]);
            deleteObjData(deleteValue);  
                               
        }
        
       function deleteObjData(deleteID)
        {
            deleteDB(taskObj.dbid[deleteID]); 
            if(typeof deleteID !='number')
                prompt("Enter proper ID");
            else {
                taskObj.task.splice(deleteID,1);
                taskObj.date.splice(deleteID,1);
                taskObj.time.splice(deleteID,1);
                taskObj.dateObj.splice(deleteID,1);
                if(taskObj.delayStatus)
                    clearTimeout(taskObj.timerClear[deleteID]);                  
                taskObj.delayStatus.splice(deleteID,1);
                taskObj.timerClear.splice(deleteID,1);

                let stringData=getDate(taskObj.task.length-1);
                switch(stringData) {
                    case "Today":
                      summaryObj.today--;
                      break;
                    case "Yesterday":
                      summaryObj.yesterday--;
                      break;
                    case "Tomorrow":
                        summaryObj.tomorrow--;
                      break;
                    default: displaySummary();
                    break;
                  }
                  displaySummary(); 
        }     
    }
        

        function getObjData(){
            taskObj.task.push(document.getElementsByName("task")[0].value);
            taskObj.date.push(document.getElementsByName("taskDate")[0].value);
            taskObj.time.push(document.getElementsByName("taskTime")[0].value);
            var taskNewTime=convertDate();
            taskObj.dateObj.push(taskNewTime);
            updateDelayStatus(taskNewTime);
            setTimmer(taskNewTime);
            
        }

        function appendData(){  
            var taskString="",len=taskObj.task.length-1,delayString=" ";
            var node = document.createElement("li");
            var nodeButton = document.createElement("button");
            node.addEventListener("mouseover",mouseOver);
            node.addEventListener("mouseout",mouseOut);
            nodeButton.addEventListener("mouseover",mouseOver);
            nodeButton.addEventListener("mouseout",mouseOut);
            nodeButton.addEventListener("click",listDelete);
            nodeButton.innerText="delete";
            nodeButton.style.visibility="hidden";

            if(taskObj.delayStatus[len]){ 
                 node.style.color="red"; 
                 delayString=" DELAYED ";
            }
            
            taskString=taskObj.task[len]+"  "+getDate(len)+"  "+taskObj.time[len]+delayString+" ";
            var textnode = document.createTextNode(taskString); 
            node.appendChild(textnode);
            node.appendChild(nodeButton);
            document.getElementById("taskList").appendChild(node);
        }      

        function convertDate(){
            var dateString =document.getElementsByName("taskDate")[0].value+'T'+document.getElementsByName("taskTime")[0].value+':00';
            var convertDate= new Date(dateString);
            return convertDate;
        }

        function updateDelayStatus(convertDate){
            var currentTime =new Date().getTime();
            if(currentTime>convertDate.getTime())
                taskObj.delayStatus.push(true);
            else     
                taskObj.delayStatus.push(false);

        }
        

        function setTimmer(userTime){
            var len=taskObj.task.length-1;

            if (!taskObj.delayStatus[len]){
                var TimeInSeconds=userTime.getTime()-(new Date()).getTime();
                let taskName=taskObj.task[len];
               taskObj.timerClear[len]=setTimeout(function passIsDue(){
                    prompt(taskName+" is due now");
                },TimeInSeconds);
                

            }
        }

        function getDate(id)
        {
            var current =new Date();
            var currentDate=current.getDate();
            var taskDateVar=new Date(taskObj.date[id]);
            var n=taskDateVar.getDate();
            var lastDayOfMonth = new Date(taskDateVar.getFullYear(),taskDateVar.getMonth()+1,0);
            var lastDayOfMonthc = new Date(current.getFullYear(),current.getMonth()+1,0);
            if(currentDate==lastDayOfMonthc)
            {
                if(taskDateVar==0&&taskDateVar.getMonth()==current.getMonth()-1)
                return "yesterday";                
            }
            if(n==lastDayOfMonth)
            {
                if(currentDate==0&&taskDateVar.getMonth()==current.getMonth()+1)
                return "tomorrow";                
            }
            if(taskDateVar.getMonth()==current.getMonth()&&taskDateVar.getFullYear()==current.getFullYear()){
                if(currentDate==n)
                return "Today"; 
            if(currentDate-1==n&&taskDateVar)
                return "Yesterday";
            else if(currentDate+1==n)
                return "Tomorrow";
            }     
            if(taskDateVar.getFullYear()==current.getFullYear())
                return taskDateVar.toDateString().slice(0, -7);
            else
                return taskDateVar.toDateString();                
            }
            function summaryData(){
                let stringData=getDate(taskObj.task.length-1);
                switch(stringData) {
                    case "Today":
                      summaryObj.today++;
                      break;
                    case "Yesterday":
                      summaryObj.yesterday++;
                      break;
                    case "Tomorrow":
                        summaryObj.tomorrow++;
                      break;
                  } 
                    displaySummary();       
            }
            function displaySummary(){
                document.getElementById("pendingToday").innerHTML="Today: "+summaryObj.today;
                document.getElementById("pendingTomorrow").innerHTML="Tomorrow: "+summaryObj.tomorrow;
                document.getElementById("pendingYesterday").innerHTML="Yesterday: "+summaryObj.yesterday;
                document.getElementById("pendingDealyed").innerHTML="Delayed Task: "+delayedTask();
            }
            function delayedTask(){
                let result=0;
                for(let i=0;i<taskObj.delayStatus.length;i++)
                    if(taskObj.delayStatus[i]) result ++;
                return result;    
            }
            function mouseOver(e){
                if(e.target.tagName == "LI"){
                    let node=e.target;
                    let buttonShow=node.childNodes[1];
                    buttonShow.style.visibility="visible";
                }
                else if(e.target.tagName == "BUTTON")
                {
                    let node=e.target;
                    node.style.visibility="visible";
                }
                    
            }

            function mouseOut(e){
                if(e.target.tagName == "LI"){
                    let node=e.target;
                    buttonShow=node.childNodes[1];
                    buttonShow.style.visibility="hidden";
                }
                else if(e.target.tagName == "BUTTON"){
                    let node=e.target;
                    node.style.visibility="hidden";
                    
                }
                    
            }
            function listDelete(e){
                if(e.target.tagName == "BUTTON"){
                    let node=e.target.parentElement;
                    //console.log(node);
                    let index=1;
                    while(node.previousElementSibling){
                        node=node.previousElementSibling;
                        index++;
                    }
                    
                    deleteTask(index);                    
                }
            }
            function addToDB(){
                var size=taskObj.task.length-1;
                var xhttp = new XMLHttpRequest();
                xhttp.open("POST", "/task", true);
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                      var map=JSON.parse(this.responseText);
                      taskObj.dbid[size]=map.id;
                    }
                  };
                xhttp.setRequestHeader('Content-Type', 'application/json');
                var size=taskObj.task.length-1;
                var taskObjJSON={
                    id:size,
                    task:taskObj.task[size],
                    date:taskObj.date[size],
                    time:taskObj.time[size]
                };

                xhttp.send(JSON.stringify(taskObjJSON));
                //console.log('add db ran');
                
            }
            function deleteDB(deleteDBID){
                var xhttp = new XMLHttpRequest();
                xhttp.open("DELETE", "/task/"+deleteDBID, true);
                xhttp.send();
            }
                
                    
