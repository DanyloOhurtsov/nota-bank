"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import CustomInput from "./CustomInput";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { authFormSchema } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { authInputs } from "@/constants";

const AuthForm = ({ type }: AuthFormProps) => {
    const [userData, setUserData] = useState(null);
    const [isloading, setIsloading] = useState(false);

    const form = useForm<z.infer<typeof authFormSchema>>({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof authFormSchema>) {
        setIsloading(true);

        console.log(values);

        setIsloading(false);
    }

    return (
        <section className="auth-form">
            <header className="flex flex-col gap-5 md:gap-8">
                {/* Logo */}
                <Link
                    href={"/"}
                    className="cursor-pointer flex items-center gap-1"
                >
                    <Image
                        src={"/icons/logo.svg"}
                        alt="Logo"
                        width={34}
                        height={34}
                    />
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                        NotA
                    </h1>
                </Link>
                <div className="flex flex-col gap-1 md:gap-3">
                    <div>
                        <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                            {userData
                                ? "Link Account"
                                : type === "sign-in"
                                ? "Sign In"
                                : "Sign Up"}
                        </h1>
                        <p className="text-16 font-normal text-gray-600">
                            {userData
                                ? "Link your account to continue"
                                : "Enter your details below to continue"}
                        </p>
                    </div>
                </div>
            </header>
            {/* Auth Form */}
            {userData ? (
                <div className="flex flex-col gap-4">{/* Plaid Link */}</div>
            ) : (
                <>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            {/* Inputs map */}
                            {authInputs.map((input) => (
                                <CustomInput
                                    key={input.id}
                                    name={input.name}
                                    control={form.control}
                                    label={input.label}
                                    placeholder={input.placeholder}
                                    id={input.id}
                                />
                            ))}
                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="form-btn"
                                disabled={isloading}
                            >
                                {isloading ? (
                                    <>
                                        <Loader2
                                            size={20}
                                            className="animate-spin"
                                        />
                                        &nbsp; Loading...
                                    </>
                                ) : type === "sign-in" ? (
                                    "Sign In"
                                ) : (
                                    "Sign Up"
                                )}
                            </Button>
                        </form>
                    </Form>
                    {/* Footer */}
                    <footer className="flex justify-center gap-1">
                        <p className="text-14 font-normal text-gray-600">
                            {type === "sign-in"
                                ? "Don't have an account?"
                                : "Already have an account?"}
                        </p>
                        <Link
                            href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                            className="form-link"
                        >
                            {type === "sign-in" ? "Sign Up" : "Sign In"}
                        </Link>
                    </footer>
                </>
            )}
        </section>
    );
};

export default AuthForm;
