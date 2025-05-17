import { z as zod } from "zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import SecondButton from "@/components/button/second-button";
import { useTranslate } from "@/locales";
import { useRouter } from "@/routes/hooks/use-router";
import { useMutation } from "@tanstack/react-query";
import { AxiosErrorResponse } from "@/axios";
import { Field, Form } from "@/components/hook-form";
import { login } from "@/hooks/actions/useAuth";
import { useToastStore } from "@/zustand/useToastStore";
import { paths } from "@/routes/paths";
import { ACCESS_TOKEN } from "@/utils/constants";
// ----------------------------------------------------------------------

export type NewSchemaType = zod.infer<typeof NewSchema>;
export const NewSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email !" }),
  password: zod.string().min(1, { message: "Password is required !" }),
});

export function LoginView() {
  const { t } = useTranslate("home");
  const { showToast } = useToastStore();
  const router = useRouter();
  const defaultValues = useMemo(
    () => ({
      email: "",
      password: "",
    }),
    []
  );

  // ============= react-query ===========================

  const { mutate: loginApi, isPending: isLoading } = useMutation({
    mutationFn: login,
  });

  /// ==================== handle ==========================

  const methods = useForm<NewSchemaType>({
    resolver: zodResolver(NewSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const body = { email: data.email, password: data.password };
    loginApi(body, {
      onSuccess: (res) => {
        const  token  = res.token;
        localStorage.setItem(ACCESS_TOKEN, token);
        router.push(paths.topic.list);
        showToast("success", t("Login successful!"));
      },
      onError: (error: AxiosErrorResponse) => {
        showToast("error", error.response?.data?.message ?? t("Login fail!"));
      },
    });
  });

  const renderForm = (
    <Form methods={methods} onSubmit={onSubmit}>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="font-bold text-2xl">Login</div>
        <Field.Text
          name="email"
          placeholder={t("Enter your email")}
          InputLabelProps={{ shrink: true }}
        />
        <Field.Text name="password" placeholder={t("Enter your password")} />
        <SecondButton
          text={t("Submit")}
          isLoading={isLoading}
          onClick={() => {}}
        />
      </div>
    </Form>
  );

  return (
    <div className=" h-screen flex justify-center items-center">
      <div className="w-[400px] p-4 gap-4 rounded-[20px] border border-[#D8D8D8] dark:border-main-dark-color bg-white dark:bg-main-dark-color">
        {renderForm}
      </div>
    </div>
  );
}
