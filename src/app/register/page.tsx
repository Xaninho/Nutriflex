"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userCreated, setUserCreated] = useState(false);
    const [creatingUser, setCreatingUser] = useState(false);
    const [error, setError] = useState(false);

    async function handleFormSubmit(e : any) {
        e.preventDefault();

        setCreatingUser(true);
        setError(false);

        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {'Content-Type': 'application/json'}
        });
        
        if (response.ok) {
            setUserCreated(true);
        } else {
            setError(true);
        }
        setCreatingUser(false);
        
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">Register</h1>

            {userCreated && (
                <div className="my-4 text-center">
                    User created! Now you can
                    <Link className="underline" href={"/login"}>Login &raquo;</Link>
                </div>
            )}

            {error && (
                <div className="my-4 text-center text-red-500">
                    There was an error creating the user.
                </div>
            )}

            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>

                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={creatingUser}
                />

                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={creatingUser}
                />

                <button
                    type="submit"
                    disabled={creatingUser}
                    >Register</button>
                
                <div className="my-4 text-center text-gray-500">
                    or login with provider
                </div>
                
                <button className="flex gap-4 justify-center">
                    <Image src={'/google.png'} alt="Google" width={32} height={32} />
                    Login with Google
                </button>

                <div className="text-center my-4 text-gray-500">
                    Existing user? <Link href={"/login"}>Login</Link>
                </div>


            </form>
        
      
        
        </section>
    );
}