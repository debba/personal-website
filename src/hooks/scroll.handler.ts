import {useEffect, useState} from 'react';

const useScrollHandler = () => {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('.section');

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();

                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    setActiveSection(section.id);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return activeSection;
};

export default useScrollHandler;
