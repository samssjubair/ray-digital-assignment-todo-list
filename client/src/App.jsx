import React, { useEffect, useState } from 'react';
import {auth, provider } from './config';
import {signInWithPopup} from 'firebase/auth';
import Todo from './components/Todo/Todo';
import Homepage from './components/Home/Homepage';

const App = () => {
    const [value,setValue]=useState('');
    const handleClick=()=>{
        signInWithPopup(auth, provider)
        .then((result)=>{
            console.log(result.user);
            setValue(result.user.email);
            localStorage.setItem('user',result.user.displayName);
        })
    }

    useEffect(()=>{
        setValue(localStorage.getItem('user'));
    });

    return (
        <>
        {
            value ? <Todo user={value}/> : <Homepage handleClick={handleClick}/>
        }
        </>
    );
};

export default App;