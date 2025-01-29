import { LoginInput } from "@/@types/auth/login.types";
import { ErrorType } from "@/@types/error/error.types";
import Loader from "@/components/common/Loader";
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
import { setCredentials } from "@/features/auth/authSlice";
import { useUserLoginMutation } from "@/features/auth/loginApiSlice";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>();

    const [userLogin, { isLoading }] = useUserLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data: LoginInput) => {
        try {
            const response = await userLogin(data).unwrap();
            dispatch(setCredentials(response.data));
            toast.success(response.message as string);
            navigate("/");
        } catch (error) {
            console.log(error);
            const apiError = error as ErrorType;
            toast.error(apiError?.data.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="w-2xl">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-center">
                            Login to your account
                        </CardTitle>
                        <CardDescription>
                            Enter your credentials below to login to your
                            account
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
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is required",
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            {errors.email && (
                                <span className="text-red-500">
                                    {errors?.email.message}
                                </span>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is required",
                                    },
                                })}
                            />
                            {errors.password && (
                                <span className="text-red-500">
                                    {errors?.password.message}
                                </span>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-2 text-sm">
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader /> : "Login"}
                        </Button>
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
            </form>
        </div>
    );
}

export default Login;
