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
       
        await signIn('credentials');

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

                <button type="submit" disabled={loginInProgress}>Login</button>

                <div className="my-4 text-center text-gray-500">
                    or login with provider
                </div>

                <button className="flex gap-4 justify-center" disabled={loginInProgress}>
                    <Image src={'/google.png'} alt="Google" width={32} height={32} />
                    Login with Google
                </button>

            </form>

        </section>
    )

}