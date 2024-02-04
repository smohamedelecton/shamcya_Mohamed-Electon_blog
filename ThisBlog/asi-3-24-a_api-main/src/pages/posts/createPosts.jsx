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
  descriptionPosts: descriptionValidator.required().label("Product description"),
})
const initialValues = {
  descriptionPosts: "",
  idPosts: 1,
}
const CreatePosts = () => {
  const router = useRouter()
  const { mutateAsync: savePosts } = useMutation({
    mutationFn: (posts) => createResource("posts", posts),
  })
  const handleSubmit = useCallback(
    async ({descriptionPosts, idPosts }) => {
      const { data: posts} = await savePosts({

        descriptionPosts,
        idPosts,
      })
    },
    [savePosts, router],
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
          label="Post description"
          placeholder="write a post"
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Formik>
  )
}

export default CreatePosts
