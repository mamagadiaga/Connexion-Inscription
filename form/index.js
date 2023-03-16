import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
getFirestore,
addDoc,
collection,
getDocs,
query,
where,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    // TODO: Add your Firebase project configuration object here
    apiKey: "AIzaSyDaoghPcdJvRKwZOoE4tWG_zMKmjqZaUlo",
    authDomain: "users-20e5c.firebaseapp.com",
    projectId: "users-20e5c",
    storageBucket: "users-20e5c.appspot.com",
    messagingSenderId: "22385829393",
    appId: "1:22385829393:web:698c4f84745dc92c29f3b0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Vider les champs
function vider() {
  document.getElementById("nom1").value = "";
  let email1 = document.getElementById("email1").value;
  let mdp1 = document.getElementById("mdp1").value;
  let status1 = document.getElementById("status1").value; 
}

connectbtn1.addEventListener("click", (e) => {
  e.preventDefault();
  let nom1 = document.getElementById("nom1").value;
  let email1 = document.getElementById("email1").value;
  let mdp1 = document.getElementById("mdp1").value;
  let status1 = document.getElementById("status1").value; 
    
   // vérifier si les champs sont vides
   if(nom1 == "" || email1 == "" || mdp1 == "" || status1 == "") {
    alert("Veuillez remplir tous les champs !");
  } 
  else{
    addDoc(collection(db, "users"), {
    nom1: nom1,
    email1: email1,
    mdp1: mdp1,
    status1: status1
  }); 
  alert("Utilisateur ajouté avec succes");
  window.location.href = "./index.html";
  }  
});


connectbtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let userstableau = [];
    let email = document.getElementById("email").value;
    let mdp = document.getElementById("mdp").value;

    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.forEach((doc) => {
        userstableau.push(doc.data())
    });

    // Vérifier l'existence de l'utilisateur
    const user = userstableau.find((user) => user.email1 === email && user.mdp1 === mdp);
      //vérifier si les champs sont vides
      if(email == "" || mdp == "") {
      alert("Veuillez remplir tous les champs !");
    }
    else{
      if (user) {
        // Utilisateur trouvé
        // alert("Connexion réussie !");
        // Vérifier le statut de l'utilisateur
        const userStatus = user.status1;
        switch (userStatus) {
            case "Admin":
              // Rediriger l'utilisateur vers la page admin.html
                window.location.href = "./form/admin.html";
                // alert('Admin');
                break;
            case "User":
                // Rediriger l'utilisateur vers la page user.html
                window.location.href = "./form/user.html";
                // alert('User');
                break;
            case "Guest":
                // Rediriger l'utilisateur vers la page guest.html
                window.location.href = "./form/guest.html";
                // alert('Guest');
                break;
            default:
                alert("Le statut de l'utilisateur n'est pas reconnu.");
        }
    } else {
        // Utilisateur non trouvé
        alert("Email ou mot de passe incorrect !");
    }
    }
});
