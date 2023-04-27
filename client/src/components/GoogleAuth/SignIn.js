import React, { useEffect, useState } from 'react';
import {auth, provider } from './config';
import {signInWithPopup} from 'firebase/auth';

const SignIn = () => {
    const [value,setValue]=useState('');
    const handleClick=()=>{
        signInWithPopup(auth, provider)
        .then((result)=>{
            console.log(result.user);
            setValue(result.user.email);
            localStorage.setItem('user',result.user.email);
        })
    }

    useEffect(()=>{
        setValue(localStorage.getItem('user'));
    });

    return (
        {
            value ? value : <button onClick={handleClick}>Sign In</button>
        }
    );
};

export default SignIn;