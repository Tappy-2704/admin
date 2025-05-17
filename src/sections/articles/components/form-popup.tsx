import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslate } from "@/locales";
import { Field, Form } from "@/components/hook-form";
import { Popup } from "@/components/popup/popup";
import SecondButton from "@/components/button/second-button";
import { useCategory } from "@/hooks/actions/useCategory";
import { IOption } from "@/hooks/interfaces/category";
import { useMemo } from "react";
import { IArticle } from "@/hooks/interfaces/article";
import { createArticle, updateArticle } from "@/hooks/actions/useArticle";
import { useToastStore } from "@/zustand/useToastStore";
import { AxiosErrorResponse } from "@/axios";

interface Props {
  open: boolean;
  onClose: () => void;
  item?: IArticle;
}

const FormPopup = ({ open, item, onClose }: Props) => {
  const queryClient = useQueryClient();
  const { t } = useTranslate("home");
  const { categories } = useCategory();
  const { showToast } = useToastStore();
  const defaultValues = {
    catId: item?.catId._id ?? "",
    name: item?.name ?? "",
    vn: item?.vn.toString() ?? "",
    en: item?.en.toString() ?? "",
  };
  const schema = zod.object({
    name: zod.string().nonempty("Name is required"),
    catId: zod.string().nonempty("Category is required"),
    vn: zod.string().nonempty("Vn is required"),
    en: zod.string().nonempty("En is required"),
  });
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;
  const { mutate: updateCatApi, isPending: updateLoading } = useMutation({
    mutationFn: updateArticle,
  });
  const { mutate: createArticleApi, isPending: createLoading } = useMutation({
    mutationFn: createArticle,
  });

  const onSubmit = handleSubmit(async (data) => {
    if (item) {
      const body = {
        name: data?.name,
        catId: data.catId ?? "",
        articleId: item._id,
        vn: data.vn,
        en: data.en,
      };
      updateCatApi(body, {
        onSuccess: () => {
          showToast("success", t("Update successful!"));
          queryClient.invalidateQueries({ queryKey: ["get-articles"] });
          onClose();
        },
        onError: (error: AxiosErrorResponse) => {
          showToast(
            "error",
            error.response?.data?.message ?? t("Update fail!")
          );
        },
      });
    } else {
      const body = {
        catId: data.catId,
        name: data.name,
        vn: data.vn,
        en: data.en,
      };
      createArticleApi(body, {
        onSuccess: () => {
          showToast("success", t("Create successful!"));
          queryClient.invalidateQueries({ queryKey: ["get-articles"] });
          onClose();
        },
        onError: (error: AxiosErrorResponse) => {
          showToast(
            "error",
            error.response?.data?.message ?? t("Create fail!")
          );
        },
      });
    }
  });

  const options: IOption[] = useMemo(() => {
    return (
      categories?.results?.map((item) => ({
        value: item._id,
        label: item.title,
      })) || []
    );
  }, [categories]);
  return (
    <Popup
      open={open}
      title={item ? "Update Article" : "Create Article"}
      onClose={() => {
        onClose();
        reset();
      }}
    >
      <Form methods={methods} onSubmit={onSubmit}>
        <div className="flex flex-col gap-3">
          <Field.Select name="catId" options={options} />
          <Field.Text
            name="name"
            placeholder={t("Enter your name")}
            InputLabelProps={{ shrink: true }}
          />
          <Field.Textarea
            name="vn"
            placeholder={t("Enter VN")}
            InputLabelProps={{ shrink: true }}
          />
          <Field.Textarea
            name="en"
            placeholder={t("Enter EN")}
            InputLabelProps={{ shrink: true }}
          />
        </div>

        <SecondButton
          text={t("submit")}
          isLoading={item ? updateLoading : createLoading}
          onClick={() => {}}
        />
      </Form>
    </Popup>
  );
};

export default FormPopup;
