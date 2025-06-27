let users = []
let user = {}

const loginForm = () => {
    const str = `
    <div class="form-box">
        <h3>Login Form</h3>
        <p id="errormsg"></p>
        <input type="email" placeholder="Email" id="email">
        <input type="password" placeholder="Password" id="pss">
        <p><button onclick='validateUser()'>Submit</button></p>
        <p><button onclick='registerForm()'>Create Account</button></p>
    </div>
    <div class="users-box">
        ${showUsers()}
    </div>`;
    root.innerHTML = str;
};

const registerForm = () => {
    const str = `
    <div class="form-box">
        <h3>Registration Form</h3>
        <input type="text" placeholder="Name" id="name">
        <input type="email" placeholder="Email" id="email">
        <input type="password" placeholder="Password" id="pss">
        <p><button onclick='saveUser()'>Submit</button></p>
        <p>Already a member? <button onclick='loginForm()'>Login Here</button></p>
    </div>
    <div class="users-box">
        ${showUsers()}
    </div>`;
    root.innerHTML = str;
};


const showHome = () =>{
    const str = ` <div>
    <h3>Welcome</h3>
    <p><button onclick='loginForm()'> Logout</button></p>
    `
    root.innerHTML = str + "</div";
}

const saveUser = () =>{
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pss").value;
    users.push({
        name,
        email,
        pass
    });
    loginForm();
}

const validateUser = () =>{
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pss").value;
    const found = users.find(
        (value) => value.email === email && value.pass === pass
    );
    if(found){
        showHome();
    }
    else{
        document.getElementById("errormsg").innerHTML="Access Denied"
    }
}

const showUsers = () =>{
   let x= "<h4>Registered Users:</h4>";
    if(users.length==0){
        return "<p>No Users Registered</p>";

    }
    users.forEach(user => {
        x += `<p>${user.name}</p>`;
    });
    
    return x;
}
