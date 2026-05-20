// api.js

const API_URL_REGISTER = "http://localhost:3000/register";
const API_URL_LOGIN = "http://localhost:3000/login";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InRlc3QtMTIzIiwiaWF0IjoxNzc5MjI4NDA4LCJleHAiOjE3NzkyMzIwMDh9._p4qJiNEB-6D8VMIlq8AKpzxNbi_aCzHvHk5fZooZVs";

// CREATE user
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

async function signInUser(name, password) {
    const response = await fetch(API_URL_LOGIN, {
        method: "POST",
        
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${TOKEN}`
        },
        
        body: JSON.stringify({
            name,
            password
        })
    })

    const data = response.json();
    return data;
}

// Example usage
(async () => {
    // await createUser("Alice", "AliceC@gmail.com", "Pass1234");
    console.log(await signInUser("test-123", "HelloWorld"));
})();