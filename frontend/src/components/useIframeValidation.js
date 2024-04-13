import { useEffect, useRef } from 'react';
import { extractIFrameSrc } from './UserHelper';

// TODO: more strict validation for iframe structure
const allowedDomains = ['youtube.com', 'sketchfab.com', 'google.com'];

const isDomainAllowed = (url) => {
    const hostname = new URL(url).hostname;
    return allowedDomains.includes(hostname);
};

const useIframeValidation = (content, isChecking, setIsChecking) => {
    const timeoutRef = useRef(null);

    useEffect(() => { 
        const validateIframeSrc = () => {
            const iframeSrc = extractIFrameSrc(content);
            if (iframeSrc && !isDomainAllowed(iframeSrc)) {
                console.warn(`Iframe src not allowed: ${iframeSrc}`);
            }
            setIsChecking(false);
        };

        if (isChecking) { // check every 3 seconds
            timeoutRef.current = setTimeout(validateIframeSrc, 3000);
        }

        return () => clearTimeout(timeoutRef.current);
    }, [content, isChecking, setIsChecking]);
};

export default useIframeValidation;
