import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Control } from "react-hook-form";
import { z } from "zod";
import { authFormSchema } from "@/lib/utils";

interface CustomInputPropsExtended extends CustomInputProps {
    control: Control<z.infer<typeof authFormSchema>>;
}

const CustomInput: React.FC<CustomInputPropsExtended> = ({
    control,
    name,
    label,
    placeholder,
    id,
}) => {
    const inputType =
        name === "password" ? "password" : name === "email" ? "email" : "text";

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className="form-item">
                    <FormLabel className="form-label">{label}</FormLabel>
                    <div className="flex w-full flex-col">
                        <FormControl>
                            <Input
                                id={id}
                                placeholder={placeholder}
                                className="input-class"
                                type={inputType}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage className="form-message mt-2" />
                    </div>
                </div>
            )}
        />
    );
};

export default CustomInput;
