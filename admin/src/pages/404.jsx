import { Link } from "react-router";
import SiteTitle from "./siteTitle";
export default function ErrorPage() {
    return (<div className="main-wrapper">
        <SiteTitle title="Page Not Found" />
        <main className="main-content-wrapper">
            <div className="d-flex flex-column justify-content-center align-items-center text-center">
                <h1 className="display-1 text-danger">404</h1>
                <h2 className="mb-4">Page Not Found</h2>
                <p className="text-muted mb-4">The page you are looking for might have been removed or is temporarily unavailable.</p>
                <Link to="/dashboard" className="btn btn-primary">Go Home</Link>
            </div>
        </main>
    </div>)
}