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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterInput } from "@/@types/auth/register.types";
import { useState } from "react";
import { UserRole } from "@/config/constants";
import { useUserRegisterMutation } from "@/features/auth/registerApiSlice";
import { ErrorType } from "@/@types/error/error.types";
import Loader from "@/components/common/Loader";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterInput>();

    const [role, setRole] = useState(UserRole.STUDENT);

    const [userRegister, { isLoading }] = useUserRegisterMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
        try {
            const credentials = { ...data, role };
            const response = await userRegister(credentials).unwrap();
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
                            Create an Account
                        </CardTitle>
                        <CardDescription className="text-center">
                            Enter your credentials below to create your account
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

                        {/* Role  */}
                        <Tabs
                            defaultValue={UserRole.STUDENT}
                            className="w-[400px]"
                            onValueChange={(value) => setRole(value)}
                        >
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value={UserRole.STUDENT}>
                                    Student
                                </TabsTrigger>
                                <TabsTrigger value={UserRole.ORGANIZATION}>
                                    Organization
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>

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
                                    {errors.email.message}
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
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 characters long",
                                    },
                                })}
                            />
                        </div>
                        {errors.password && (
                            <span className="text-red-500">
                                {errors.password.message}
                            </span>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-2 text-sm">
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader /> : "Register"}
                        </Button>
                        <p>
                            Already have an account? please{" "}
                            <Link
                                to="/auth/login"
                                className="underline font-semibold"
                            >
                                login
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}

export default Register;
