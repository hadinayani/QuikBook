import { useEffect } from "react";

export default function SiteTitle({ title }) {
    useEffect(() => {
        document.title = title + ' | QuikBook';
    }, [title]);

    return null;
}
