"use client";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Login
            </h1>

            <form className="block max-w-xs mx-auto">

                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>

                <div className="my-4 text-center text-gray-500">
                    or login with provider
                </div>

                <button className="flex gap-4 justify-center">
                    <Image src={'/google.png'} alt="Google" width={32} height={32} />
                    Login with Google
                </button>

            </form>

        </section>
    )

}