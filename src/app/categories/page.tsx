'use client'
import Tabs from "@/components/layout/Tabs"
import { useEffect, useState } from "react"

export default function CategoriesPage() {

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetch('/api/profile').then(response => {
            response.json().then(data => {
                setIsAdmin(data.admin);
            })
        })
    }, [])

    if (!isAdmin) {
        return (
            <section className="mt-8 max-w-lg mx-auto">
                <h1>Access Denied</h1>
            </section>
        )
    }

    useEffect(() => {
        fetch('/api/categories').then(response => {
            response.json().then(data => {
                console.log(data);
            })
        })
    }, [])

    return (
        <section className="mt-8 max-w-lg mx-auto">
            <Tabs isAdmin={true} />
            <h1>Categories</h1>
        </section>
    )
}