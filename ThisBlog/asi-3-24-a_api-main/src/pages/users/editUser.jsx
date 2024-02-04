import { nameValidator, emailValidator, lastNameValidator, passwordValidator} from "@/utils/validators"
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
  name: nameValidator.required().label("User name"),
  mail: emailValidator.required().label("User mail"),
  lastName: lastNameValidator.required().label("user lastName"),
  password: passwordValidator.required.label("user password")
})
const initialValues = {
  name: "",
  lastName: "",
  mail: "",
  password:"",
  idUser: 1,
}
const CreateUsers = () => {
  const router = useRouter()
  const { mutateAsync: saveUser } = useMutation({
    mutationFn: (user) => createResource("user", user),
  })
  const handleSubmit = useCallback(
    async ({name, idUser}) => {
      const { data: user} = await saveUser({

        name,
        idUser,
      })
    },
    [saveUser, router],
  )

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField
          name="name"
          label="user name"
          placeholder="Enter your name"
        />
         <FormField
          name="lastName"
          label="lastName"
          placeholder="Enter user lastName"
        />
         <FormField
          name="email"
          label="email"
          placeholder="Enter user mail"
        />
         <FormField
          name="password"
          label="password"
          placeholder="Enter user password"
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Formik>
  )
}

export default CreateUsers