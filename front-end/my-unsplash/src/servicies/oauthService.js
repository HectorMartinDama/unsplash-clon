import { auth } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, getAuth } from 'firebase/auth';
import { user, isLoggedIn } from '../lib/stores';
import toast, { Toaster } from 'svelte-french-toast';


const login= async () =>{
    const provider= new GoogleAuthProvider();
    const response= await signInWithPopup(auth, provider);
    const { displayName, email, photoURL } = response.user;
    await isLoggedIn.set(true);
    await user.set(response.user);
    await register_user(displayName, email, photoURL);
}

const register_user= async (displayName, email, profileImg) =>{
    return await fetch('http://localhost:4000/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({ username: displayName, email: email, profileImg: profileImg })
    });
}

const logout= async () =>{
    await signOut(auth).then(() => {
        isLoggedIn.set(false);
        user.set({email: 'hola a todos'});
    });
}

const notificationLogin= () =>{
    toast.promise(login(), { loading: 'Iniciando sesión...', success: 'Sesión iniciada', error: 'No se ha podido iniciar sesión' }, { position: 'bottom-center' });
}


const notificationLogout= () =>{
    toast.promise(logout(), { loading: 'Cerrando sesión...', success: 'Sesión cerrada', error: 'No se ha podido cerrar sesión'}, { position: 'bottom-center' });
}

onAuthStateChanged(auth, (authUser) =>{
    user.set(authUser);
    isLoggedIn.set(!!authUser);
})

const currentUser= async () =>{
   const auth= await getAuth();
   const user= await auth.currentUser;
   if(user !== null) return user;
   return null;
}   





export {
    login,
    logout,
    notificationLogout,
    notificationLogin,
    currentUser
}


// toast.promise(
//     new Promise((resolve, reject) => {
//         setTimeout(Math.random() < 0.8 ? resolve : reject, 1000);
//     }),
//     { loading: 'Cerrando sesión...', success: 'Se ha cerrado sesión correctamente', error: 'No se ha podido cerrar sesión' }
// );