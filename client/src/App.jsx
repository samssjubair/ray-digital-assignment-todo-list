import React, { useEffect, useState } from 'react';
import {auth, provider } from './config';
import {signInWithPopup} from 'firebase/auth';
import Todo from './components/Todo/Todo';
import Homepage from './components/Home/Homepage';

const App = () => {
    const [userName,setUserName]=useState('');
    const [email,setEmail]=useState('');
    const handleClick=()=>{
        signInWithPopup(auth, provider)
        .then((result)=>{
            console.log(result.user);
            setUserName(result.user.email);
            setEmail(result.user.email);
            localStorage.setItem('user',result.user.displayName);
            localStorage.setItem('email',result.user.email);
        })
    }

    useEffect(()=>{
        setUserName(localStorage.getItem('user'));
        setEmail(localStorage.getItem('email'));
    });

    return (
        <>
        {
            userName ? <Todo userName={userName} email={email} /> : <Homepage handleClick={handleClick}/>
        }
        </>
    );
};

export default App;