import { useEffect } from "react";

export default function SiteTitle({ title }) {
    useEffect(() => {
        document.title = title + ' | QuickBook';
    }, [title]);

    return null;
}
