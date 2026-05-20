const RegisterForm = document.getElementById('RegisterForm');
const RegisterButton = document.getElementById('SignIn');
const RegisterName = RegisterForm.querySelector('#Name');
const RegisterEmail = RegisterForm.querySelector('#Email');
const RegisterPass = RegisterForm.querySelector('#Password');
const Dialog = document.getElementById('Dialog');

const API_URL_REGISTER = "http://localhost:3000/register";

async function createUser(name, email, password) {
    const response = await fetch(API_URL_REGISTER, {
        method: "POST",
        
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({ 
            name, 
            email, 
            password 
        })
    });

    const user = await response.json();

    console.log("Created:", user);
    return user;
}

RegisterButton.addEventListener("click", async () => {

    let name = RegisterName.value;
    let email = RegisterEmail.value;
    let pass = RegisterPass.value;

    if (name && email && pass) {
        if (await createUser(name, email, pass))
            Dialog.classList.remove('hidden');
    }
});