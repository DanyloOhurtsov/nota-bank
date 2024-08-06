"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { use, useState } from "react";
import PlaidLink from "./PlaidLink";
import { Loader2 } from "lucide-react";
import CustomInput from "./CustomInput";
import { authInputs } from "@/constants";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { authFormSchema } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp, signIn } from "@/lib/actions/user.actions";

const AuthForm = ({ type }: AuthFormProps) => {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = authFormSchema(type);
    const defaultValues =
        type === "sign-up"
            ? {
                  firstName: "",
                  lastName: "",
                  address1: "",
                  city: "",
                  state: "",
                  postalCode: "",
                  dateOfBirth: "",
                  ssn: "",
                  email: "",
                  password: "",
              }
            : {
                  email: "",
                  password: "",
              };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const { handleSubmit, control } = form;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        try {
            if (type === "sign-up") {
                const userData = {
                    firstName: values.firstName!,
                    lastName: values.lastName!,
                    address1: values.address1!,
                    city: values.city!,
                    state: values.state!,
                    postalCode: values.postalCode!,
                    dateOfBirth: values.dateOfBirth!,
                    ssn: values.ssn!,
                    email: values.email!,
                    password: values.password!,
                };

                const newUser = await signUp(userData);

                setUser(newUser);
            }

            if (type === "sign-in") {
                const response = await signIn({
                    email: values.email,
                    password: values.password,
                });

                if (response) router.push("/");
            }
        } catch (error) {
            console.log("!!! ERROR !!!", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="auth-form">
            <header className="flex flex-col gap-5 md:gap-8">
                <Link
                    href="/"
                    className="cursor-pointer flex items-center gap-1"
                >
                    <Image
                        src="/icons/logo.svg"
                        alt="Logo"
                        width={34}
                        height={34}
                    />
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                        NotA
                    </h1>
                </Link>
                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                        {user
                            ? "Link Account"
                            : type === "sign-in"
                            ? "Sign In"
                            : "Sign Up"}
                    </h1>
                    <p className="text-16 font-normal text-gray-600">
                        {user
                            ? "Link your account to continue"
                            : "Enter your details below to continue"}
                    </p>
                </div>
            </header>

            {user ? (
                <div className="flex flex-col gap-4">
                    <PlaidLink user={user} variant="primary" />
                </div>
            ) : (
                <Form {...form}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {type === "sign-up" && (
                            <>
                                <div className="flex gap-4 max-sm:flex-col">
                                    <CustomInput
                                        label="First Name"
                                        control={control}
                                        name="firstName"
                                        placeholder="ex. John"
                                        id="firstName"
                                    />
                                    <CustomInput
                                        label="Last Name"
                                        control={control}
                                        name="lastName"
                                        placeholder="ex. Doe"
                                        id="lastName"
                                    />
                                </div>
                                <CustomInput
                                    label="Address"
                                    control={control}
                                    name="address1"
                                    placeholder="Enter your address"
                                    id="address1"
                                />
                                <CustomInput
                                    label="City"
                                    control={control}
                                    name="city"
                                    placeholder="ex. New York"
                                    id="city"
                                />
                                <div className="flex gap-4">
                                    <CustomInput
                                        label="State"
                                        control={control}
                                        name="state"
                                        placeholder="ex. NY"
                                        id="state"
                                    />
                                    <CustomInput
                                        label="Postal Code"
                                        control={control}
                                        name="postalCode"
                                        placeholder="ex. 10001"
                                        id="postalCode"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <CustomInput
                                        label="Date of Birth"
                                        control={control}
                                        name="dateOfBirth"
                                        placeholder="yyyy-mm-dd"
                                        id="dateOfBirth"
                                    />
                                    <CustomInput
                                        label="SSN"
                                        control={control}
                                        name="ssn"
                                        placeholder="ex. 123-45-6789"
                                        id="ssn"
                                    />
                                </div>
                            </>
                        )}

                        {authInputs.map((input) => (
                            <CustomInput
                                key={input.id}
                                name={input.name}
                                control={control}
                                label={input.label}
                                placeholder={input.placeholder}
                                id={input.id}
                            />
                        ))}

                        <div className="flex flex-col gap-4">
                            <Button
                                type="submit"
                                className="form-btn"
                                disabled={isLoading}
                                aria-label={
                                    isLoading
                                        ? "Loading..."
                                        : type === "sign-in"
                                        ? "Sign In"
                                        : "Sign Up"
                                }
                            >
                                {isLoading ? (
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
                        </div>
                    </form>
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
                </Form>
            )}
        </section>
    );
};

export default AuthForm;
