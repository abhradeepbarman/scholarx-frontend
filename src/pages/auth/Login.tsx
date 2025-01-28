import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-2xl">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">
                        Login to your account
                    </CardTitle>
                    <CardDescription>
                        Enter your credentials below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-2 text-sm">
                    <Button className="w-full">Login</Button>
                    <p>
                        Don&apos;t have an account? please{" "}
                        <Link
                            to="/auth/register"
                            className="underline font-semibold"
                        >
                            register
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}

export default Login;
