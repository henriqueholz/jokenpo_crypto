import { useState, useEffect } from 'react';
import React from 'react';
import { useRouter } from 'next/router';
import { doLogin } from '../services/Web3Service';

function Login() {

    const router = useRouter();

    const [message, setMessage] = useState("");

    useEffect(() => {
        if (localStorage.getItem("account") !== null)
            redirectAfterLogin(localStorage.getItem("isAdmin") === "true");
    }, [])

    function redirectAfterLogin(isAdmin: boolean) {
        if (isAdmin)
            router.push("/admin");
        else
            router.push("/app");

    }

    function onBtnClick() {
        setMessage("Logging in...");
        doLogin()
            .then(result => redirectAfterLogin(result.isAdmin))
            .catch(err => setMessage(err.message));
    }

    return (
        <div className="flex flex-col h-screen w-full p-3 justify-between mx-auto">
            <header className="mb-auto">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">Dapp JoKenPo</h3>
                    <nav className="flex justify-center space-x-4">
                        <a className="text-gray-700 font-semibold hover:underline" aria-current="page" href="#">Home</a>
                        <a className="text-gray-700 font-semibold hover:underline" href="#">About</a>
                    </nav>
                </div>
            </header>

            <main className="flex flex-col items-center text-center space-y-4 px-3">
                <h1 className="text-3xl font-bold mb-4">Log in and play with us</h1>
                <p className="text-lg mb-4">Play Rock-Paper-Scissors and earn prizes.</p>
                <p>
                    <a href="#" onClick={onBtnClick} className="inline-flex items-center justify-center px-4 py-2 text-lg font-bold text-white bg-blue-500 hover:bg-blue-600 rounded focus:outline-none">
                        <img src="/metamask.svg" alt="MetaMask logo" width="48" className="mr-3"/>
                        Log in with MetaMask
                    </a>
                </p>
                <p className="text-lg text-red-500">
                    {message}
                </p>
            </main>

            <footer className="mt-auto text-gray-400 text-center py-3">
                <p>Built by <a href="https://www.luiztools.com.br" className="text-blue-400 hover:underline">LuizTools</a>.</p>
            </footer>
        </div>
    );
}

export default Login;
