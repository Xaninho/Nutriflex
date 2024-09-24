"use client";
import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);

    async function handleFormSubmit(event : any) {
        event.preventDefault();

        setLoginInProgress(true);
       
        await signIn('credentials', {email, password, callbackUrl: '/'});

        setLoginInProgress(false);

    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Login
            </h1>

            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>

                <input
                    type="text"
                    placeholder="email"
                    disabled={loginInProgress}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="password"
                    disabled={loginInProgress}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" disabled={loginInProgress} className="w-full bg-primary h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg
                  after:absolute after:top-0 after:-left-full after:w-full after:h-full after:bg-gradient-to-r after:from-red-900 after:to-[rgba(241, 58, 1, 0.5)] after:transition-all after:duration-500 after:ease-in-out after:z-[-1] after:rounded-xl hover:after:left-0 text-[#fff]">Login</button>

                <div className="my-4 text-center text-gray-500">
                    or login with provider
                </div>


                <button type="button" onClick={() => signIn('google', {callbackUrl: '/'})}
                    className="flex gap-4 justify-center">
                    <Image src={'/google.png'} alt={''} width={24} height={24} />
                    Login with google
                </button>

            </form>

        </section>
    )

}