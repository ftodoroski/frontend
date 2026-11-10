import { useEffect, useRef, useState } from 'react';


export function usePixelScrollTrigger(triggerPixels = 0, animationDuration = 1000) {
    const [isPastBoundary, setIsPastBoundary] = useState(false);

    useEffect(() => {
        let isReadyToTrack = false;

        const animationTimer = setTimeout(() => {
            isReadyToTrack = true;
        }, animationDuration);

        let ticking = false;

        const evaluateScrollZone = () => {
            if (!isReadyToTrack) return;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY || document.documentElement.scrollTop;

                    if (currentScrollY >= triggerPixels) {
                        setIsPastBoundary(true); 
                    } else {
                        setIsPastBoundary(false);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', evaluateScrollZone, { passive: true });

        return () => {
            clearTimeout(animationTimer);
            window.removeEventListener('scroll', evaluateScrollZone);
        };
    }, [triggerPixels, animationDuration]); 

    return [null, isPastBoundary];
}