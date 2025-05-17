import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslate } from "@/locales";
import { Field, Form } from "@/components/hook-form";
import { Popup } from "@/components/popup/popup";
import SecondButton from "@/components/button/second-button";
import { createTopic, updateTopic } from "@/hooks/actions/useTopic";
import { useToastStore } from "@/zustand/useToastStore";
import { AxiosErrorResponse } from "@/axios";
import { ITopic } from "@/hooks/interfaces/topic";

interface Props {
  open: boolean;
  onClose: () => void;
  item?: ITopic;
}

const FormPopup = ({ open, item, onClose }: Props) => {
  const { t } = useTranslate("home");

  const queryClient = useQueryClient();
  const { showToast } = useToastStore();
  const defaultValues = { title: item?.title ?? "" };
  const schema = zod.object({
    title: zod.string().nonempty("Title is required"),
  });
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;
  const { mutate: updateTopicApi, isPending: updateLoading } = useMutation({
    mutationFn: updateTopic,
  });
  const { mutate: createTopicApi, isPending: createLoading } = useMutation({
    mutationFn: createTopic,
  });

  const onSubmit = handleSubmit(async (data) => {
    if (item) {
      const body = { title: data?.title, topicId: item?._id ?? "" };
      updateTopicApi(body, {
        onSuccess: () => {
          showToast("success", t("Update successful!"));
          queryClient.invalidateQueries({ queryKey: ["get-topic"] });
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
      createTopicApi(data?.title, {
        onSuccess: () => {
          showToast("success", t("Create successful!"));
          queryClient.invalidateQueries({ queryKey: ["get-topic"] });
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

  return (
    <Popup
      open={open}
      title={item ? "Update Topic" : "Create Topic"}
      onClose={() => {
        onClose();
        reset();
      }}
    >
      <Form methods={methods} onSubmit={onSubmit}>
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
