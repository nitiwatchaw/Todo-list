import { useEffect, useState } from "react";

export default function ButtonNone() {
    const [buttonNone, setButtonNone] = useState(false)
    const [pointer, setPointer] = useState(false)
    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 600) {
                setButtonNone("1")
                setPointer('all')
            } else {
                setButtonNone("0");
                setPointer('none')
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return { buttonNone, pointer }
};





