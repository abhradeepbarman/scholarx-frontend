import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <Link to={"/auth/login"}>
                <Button>Login</Button>
            </Link>
        </div>
    );
}

export default Home;
