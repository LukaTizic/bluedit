"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z, ZodType } from "zod";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<ActionResponse>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = (await onSubmit(data)) as ActionResponse;

    if (result?.success) {
      toast("Success", {
        description:
          formType === "SIGN_IN"
            ? "Signed in successfully"
            : "Signed up successfully",
      });

      router.push(ROUTES.HOME);
    } else {
      toast(`Error ${result?.status}`, {
        description: result?.error?.message,
      });
    }
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 mt-10"
      >
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2.5">
                <FormLabel className="text-primary-500 paragraph-medium">
                  {field.name === "email"
                    ? "Email Address:"
                    : field.name.charAt(0).toUpperCase() +
                      field.name.slice(1) +
                      ":"}
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type={field.name === "password" ? "password" : "text"}
                    {...field}
                    className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900 cursor-pointer hover:primary-gradient-hover"
        >
          {form.formState.isSubmitting
            ? buttonText === "Sign In"
              ? "Signing In..."
              : "Signing Up"
            : buttonText}
        </Button>
        {formType === "SIGN_IN" ? (
          <p className="text-center">
            Don't have an account?{" "}
            <Link
              href={ROUTES.SIGN_UP}
              className="paragraph-semibold primary-text-gradient"
            >
              Sign Up
            </Link>{" "}
          </p>
        ) : (
          <p className="text-center">
            Already a member?{" "}
            <Link
              href={ROUTES.SIGN_IN}
              className="paragraph-semibold primary-text-gradient "
            >
              Sign In
            </Link>{" "}
          </p>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
