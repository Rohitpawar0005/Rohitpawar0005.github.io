const loginForm = () =>{
    const str = ` <div>
    <h3>Login Form</h3>
    <input type="email" placeholder="Email"><br><br>
    <input type="password" placeholder="Password">
    <p><button onclick='showHome()'>Submit</button></p>
    <p><button onclick='registerForm()'>Create Account</button></p>
    `
    root.innerHTML = str + "</div";
}

const registerForm = () =>{
     const str = `<div>
    <h3>Registration Form</h3>
    <input type="text" placeholder="Name"><br><br>
    <input type="email" placeholder="Email"><br><br>
    <input type="password" placeholder="Password">
    <p><button onclick='loginForm()'>Submit</button></p>
    <p>Already a member? <button onclick='loginForm()'> Login Here</button></p>
    `
    root.innerHTML = str + "</div";
}

const showHome = () =>{
    const str = ` <div>
    <h3>Welcome</h3>
    <p><button onclick='loginForm()'> Logout</button></p>
    `
    root.innerHTML = str + "</div";
}