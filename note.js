var title=document.querySelector("#title");
var todocount=document.querySelector("#todocount");
var donecount=document.querySelector("#donecount");
var todolist=document.getElementById("todolist");
var donelist=document.getElementById("donelist");


title.onkeydown=function(e){
	if(e.keyCode==13){
		var val=this.value;
		//console.log(val);
		if(val.length==0){
	       alert("内容不能为空");
	       return;
	    }
        var data=getData();
	    var todos={"title":val,"status":false}
	    data.push(todos);
	    savaData(data);
	    title.value="";
	    reload();
	}    
}


function getData(){
	var data= JSON.parse(localStorage.getItem("todos"));
	return data||[];
}

function savaData(data){
     localStorage.setItem("todos",JSON.stringify(data));
    
}

function changeStatus(i,str){
	var data=getData();
	data[i].status=str;
	savaData(data);
	reload();
} 

function changeContent(i,con){
	var data=getData();
	data[i].title=con;
	savaData(data);
	reload();
} 

function del (i) {
	var data=getData();
	data.splice(i,1);
	savaData(data);
	reload();
}
reload();
function reload(){
	var data=getData();
	var nowStr="";
	var comStr="";
	var nowNum=0;
	var comNum=0;
    for(var i=0;i<data.length;i++){
       if(data[i].status==false){
       	nowStr+='<li><input type="checkbox" onclick=changeStatus('+i+',true)><p contenteditable onblur=changeContent('+i+',this.innerHTML)>'+data[i].title+'</p><a href="javascript:;" onclick=del('+i+')>-</a></li>';
        nowNum++;
       }else{ 
       	comStr+='<li><input type="checkbox" onclick=changeStatus('+i+',false) checked><p contenteditable onblur=changeContent('+i+',this.innerHTML)>'+data[i].title+'</p><a href="javascript:;" onclick=del('+i+')>-</a></li>';
       	comNum++;
       }
    }

    todocount.innerHTML=nowNum;
    donecount.innerHTML=comNum;
    todolist.innerHTML=nowStr;
    donelist.innerHTML=comStr;

}