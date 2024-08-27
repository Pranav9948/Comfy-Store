import React from "react";

import {
  Form,
  Link,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { SubmitBtn, FormInput } from "../components";
import { toast } from "react-toastify";
import { loginUser } from "../features/userSlice";
import { authFetch } from "../utils";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();

    const formdataValues = Object.fromEntries(formData);

    try {
      const response = await authFetch.post("/auth/local", formdataValues);

      if (response.status === 200) {
        store.dispatch(loginUser(response?.data));
        toast.success("user login successfully");
        return redirect("/");
      } else {
        // Handle other status codes
        console.log("Unexpected status code:", response.status);
      }
    } catch (err) {
      console.log(err);
      console.log(err?.response?.data?.error.message);

      toast.error(err?.response?.data?.error.message);
    }

    return "something";
  };

const Login = () => {
  const navigation = useNavigation();

  const navigate = useNavigate();

  const isSubmitting = navigation.state === "submitting" ? true : false;

  const loginAsGuest = async () => {
    try {
      const credentials = {
        identifier: "james@gmail.com",
        password: "secret",
      };

      const { data } = await authFetch.post("/login", credentials);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-black text-white py-12">
      <div className="section-container flex flex-col items-center h-[100vh] justify-center">
        <div className=" bg-black smallTablet:border-2 smallTablet:border-white shadow-lg py-12  w-full md:max-w-lg md:mx-auto  px-7  rounded-lg ">
          <h3 className="font-serif text-4xl font-semibold my-4 text-center text-white">
            Login
          </h3>
          <div className="form-section  mx-auto w-full md:w-2/3">
            <Form method="Post">
              <div className="my-1  ">
                <FormInput
                  label={"Email"}
                  name={"identifier"}
                  type={"email"}
                  defaultValue={"test@test.com"}
                />
              </div>
              <div className="my-1">
                <FormInput
                  label={"Password"}
                  name={"password"}
                  type={"password"}
                  defaultValue={"secret"}
                />
              </div>

              <div className="login-btn mt-4 mb-2 ">
                <SubmitBtn text={"Login"} />
              </div>
              <div className="guest-user-btn mb-3">
                <button
                  className="btn btn-success w-full"
                  onClick={() => loginAsGuest()}
                >
                  Guest User
                </button>
              </div>

              <div>
                <p className="text-sm font-medium text-center text-blue-700">
                  Not a member yet
                  <span>
                    <Link to={"/register"} className="link link-secondary ps-3">
                      Register
                    </Link>
                  </span>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
