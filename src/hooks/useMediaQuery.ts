import { useState, useEffect } from 'react';

const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        const updateMatch = () => {
            // Cek untuk menghindari pembaruan state yang tidak perlu
            if (media.matches !== matches) {
                setMatches(media.matches);
            }
        };
        updateMatch(); // Pengecekan awal
        media.addEventListener('change', updateMatch);
        return () => media.removeEventListener('change', updateMatch);
    }, [query, matches]); // `matches` di sini membantu re-evaluasi jika definisi `query` berubah dan state awal perlu disesuaikan.

    return matches;
};

export default useMediaQuery;