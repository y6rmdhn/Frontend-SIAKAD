// src/components/form/FormFieldInputFile.tsx (or wherever you prefer to place it)

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"; // Assuming you have shadcn/ui form components
import { Input } from "@/components/ui/input"; // Assuming you have shadcn/ui input component
import { Button } from "@/components/ui/button"; // Assuming you have shadcn/ui button component
import { useRef } from "react";
import { useFormContext } from "react-hook-form"; // Import useFormContext

// Define the props for your component
type FormFieldInputFileProps = {
    name: string; // The name of the form field, e.g., "profilePicture"
    label: string; // The label displayed next to the input, e.g., "Profile Picture"
    labelStyle?: string; // Optional: custom CSS classes for the label
    classname?: string; // Optional: custom CSS classes for the FormItem wrapper
    required?: boolean; // Optional: if the field is required, adds a red asterisk
    // You might want to add props for accepted file types, max size, etc.
    accept?: string; // e.g., "image/jpeg,image/png,application/pdf"
    description?: string; // Additional descriptive text
};

export const FormFieldInputFile = ({
                                       name,
                                       label,
                                       classname,
                                       labelStyle,
                                       required,
                                       accept = "image/jpeg,image/png,application/pdf", // Default accepted types
                                       description = "jpg, jpeg, png, pdf (maks. 2 MB)", // Default description
                                   }: FormFieldInputFileProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const form = useFormContext(); // Get the form instance from the context

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem
                    className={`flex items-start gap-2 flex-col lg:flex-row ${classname || ''}`}
                >
                    <FormLabel
                        className={`w-full text-xs sm:text-sm mt-0 lg:mt-2 ${labelStyle || ''}`}
                    >
                        {label}
                        {required && <span className="text-red-500">*</span>}
                    </FormLabel>

                    <div className="w-full flex flex-col gap-1">
                        <FormControl>
                            <div className="flex w-full flex-col gap-1">
                                <div className="flex w-full items-center gap-3">
                                    <Button
                                        type="button" // Important: set type to button to prevent form submission
                                        size="sm"
                                        className="bg-zinc-300 text-xs lg:text-sm hover:bg-zinc-200 text-black cursor-pointer"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        Choose File
                                    </Button>
                                    <span
                                        className="text-xs lg:text-sm text-muted-foreground truncate max-w-[200px]"
                                        title={field.value?.name || "No file chosen"} // Ensure title is set
                                    >
                                        {/* Display the file name if available, otherwise "No file chosen" */}
                                        {field.value instanceof File ? field.value.name : "No file chosen"}
                                    </span>

                                    {/* The actual hidden file input */}
                                    <Input
                                        ref={fileInputRef}
                                        type="file"
                                        className="hidden" // Hide the native file input
                                        accept={accept} // Use the accept prop
                                        // This is the crucial part for handling file selection
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]; // Get the first selected file
                                            field.onChange(file || null); // Set the file object or null if no file
                                            form.trigger(name); // Manually trigger validation for this field
                                        }}
                                        // It's good practice to spread field.onBlur to handle blur events
                                        onBlur={field.onBlur}
                                    />
                                </div>
                                <FormDescription className="text-xs text-blue-500 whitespace-pre-line">
                                    {description}
                                </FormDescription>
                            </div>
                        </FormControl>
                        {/* Displays validation messages */}
                        <FormMessage />
                    </div>
                </FormItem>
            )}
        />
    );
};