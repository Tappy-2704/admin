import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslate } from "@/locales";
import { Field, Form } from "@/components/hook-form";
import { Popup } from "@/components/popup/popup";
import SecondButton from "@/components/button/second-button";
import { useToastStore } from "@/zustand/useToastStore";
import { AxiosErrorResponse } from "@/axios";
import { createCategory, updateCategory } from "@/hooks/actions/useCategory";
import { ICategory, IOption } from "@/hooks/interfaces/category";
import { useTopic } from "@/hooks/actions/useTopic";
import { useMemo } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  item?: ICategory;
}

const FormPopup = ({ open, item, onClose }: Props) => {
  const { t } = useTranslate("home");
  const { topic } = useTopic();
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();
  const defaultValues = {
    topicId: item?.topicId._id ?? "",
    title: item?.title ?? "",
  };
  const schema = zod.object({
    title: zod.string().nonempty("Title is required"),
    topicId: zod.string().nonempty("Topic ID is required"),
  });
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;
  const { mutate: updateCatApi, isPending: updateLoading } = useMutation({
    mutationFn: updateCategory,
  });
  const { mutate: createCatApi, isPending: createLoading } = useMutation({
    mutationFn: createCategory,
  });

  const onSubmit = handleSubmit(async (data) => {
    if (item) {
      const body = { title: data?.title, catId: item._id ?? "" ,topicId:data.topicId};
      updateCatApi(body, {
        onSuccess: () => {
          showToast("success", t("Update successful!"));
          queryClient.invalidateQueries({ queryKey: ["get-categories"] });
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
      const body = { topicId: data.topicId, title: data.title };
      createCatApi(body, {
        onSuccess: () => {
          showToast("success", t("Create successful!"));
          queryClient.invalidateQueries({ queryKey: ["get-categories"] });
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
      topic?.results?.map((item) => ({
        value: item._id,
        label: item.title,
      })) || []
    );
  }, [topic]);
  return (
    <Popup
      open={open}
      title={item ? "Update Category" : "Create Category"}
      onClose={() => {
        onClose();
        reset();
      }}
    >
      <Form methods={methods} onSubmit={onSubmit}>
        <Field.Select name="topicId" options={options} />
        <Field.Text
          name="title"
          placeholder={t("Enter your title")}
          InputLabelProps={{ shrink: true }}
        />

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
