const nam = document.getElementById('name');
const pass = document.getElementById('pass');
const form = document.getElementById('form');
const errormsg = document.getElementById('error');
form.addEventListener ('submit',(e) =>{

    let messages=[]
    if(nam.value.length>20) {
        messages.push('Username only 20 characters')
    }

    if(pass.value.length<8) {
        messages.push('Password minimum 8 characters')
    }

    if(messages.length>0)
    {
        e.preventDefault();
        errormsg.innerText=messages.join(', ')
    }
})