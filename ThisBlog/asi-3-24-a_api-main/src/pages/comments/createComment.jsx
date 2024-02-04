import { descriptionValidator} from "@/utils/validators"
import Button from "@/web/components/ui/Button"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import { createResource } from "@/web/services/apiClient"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"
import { useRouter } from "next/router"
import { useCallback } from "react"
import { object } from "yup"

const validationSchema = object({
  description: descriptionValidator.required().label("comment description"),
})
const initialValues = {
  descritpionComments: "",
  commentPostId: 1,
}
const CreatePage = () => {
  const router = useRouter()
  const { mutateAsync: saveComments } = useMutation({
    mutationFn: (comments) => createResource("comments", comments),
  })
  const handleSubmit = useCallback(
    async ({ descritpionComments, commentPostId }) => {
      const { data: comments } = await saveComments({
        descritpionComments,
       commentPostId,
      })
    },
    [saveComments, router],
  )

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField
          name="description"
          label="comment description"
          placeholder="Enter a comment"
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Formik>
  )
}

export default CreatePage
