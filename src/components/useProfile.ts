import { useEffect, useState } from 'react';

export default function useProfile() {

    const [data, setData] = useState<any>();
    const [loading , setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch('/api/profile').then(response => {
            response.json().then(data => {
                console.log('use profile')
                console.log(data)
                setData(data);
                setLoading(false);
            })
        })
    }, [])

    return {data, loading};
  
}