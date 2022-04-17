let userAccuont=document.getElementById('userAccuont'),
    userPass=document.getElementById('userPass'),
    userPass_=document.getElementById('userPass_'),
    userName=document.getElementById('userName'),
    info=document.getElementById('information'),
    email=document.getElementById('email'),
    tel=document.getElementById('telephone'),
    choose=document.getElementById('choose'),
    submit=document.getElementById('submit'),
    items=document.querySelectorAll('.item_');

    let test1=false;
userAccuont.onfocus=function(){
    items[0].innerHTML='6-30位数字，或字符';
    items[0].style.color='red';
}    
userAccuont.onblur=function(){
    let reg=/^\w{6,30}$/;
    if(this.value==''){
        items[0].innerHTML='不可以为空哦';
        items[0].style.color='red';
    }else{
        if(!reg.test(userAccuont.value)){
            items[0].innerHTML='6-30位数字，或字符';
            items[0].style.color='red';
        }else{
            items[0].innerHTML='格式正确';
            items[0].style.color='green'; 
            test1=true;
        }
    }
}
submit.onclick=function(){
    if(choose.checked==false||test1==false){
        alert('err');
    }else{
        alert('ok');
    }
}