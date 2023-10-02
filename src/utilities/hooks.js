import { useEffect, useRef } from "react";

export const useFetchInitialData = (loading, data, fetchData, container) => {
    const clientRef = useRef(null);

    useEffect(() => {
        if (clientRef.current && container && !loading && ((clientRef.current.clientHeight + 150) < container.innerHeight)) {
            fetchData();  
        }
    }, [loading, data, fetchData, container]);

};



