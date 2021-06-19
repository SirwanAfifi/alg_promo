import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { Input } from "../components/Input";
import { publicFetch } from "../utils/publicFetch";

interface User {
  username: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const history = useHistory();
  const { values, errors, touched, handleChange, handleSubmit } =
    useFormik<User>({
      initialValues: {
        username: "",
        password: "",
      },
      //   validationSchema: UserSchema,
      onSubmit: async (values: User, { resetForm }) => {
        const result = await publicFetch.post("/auth/login", {
          username: values.username,
          password: values.password,
        });
        if (!result.data.ok) {
          alert(result.data.error);
          return;
        }
        const { token } = result.data;
        localStorage.setItem("token", token);
        history.push("/");
      },
      enableReinitialize: true,
    });
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="username"
              name="username"
              value={values.username}
              onChange={handleChange}
            />

            <Input
              label="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
            />

            <div className="mt-5">
              <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
