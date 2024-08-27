import React from "react";
import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { authFetch } from "../utils";
import { toast } from "react-toastify";

// import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();

  const formdataValues = Object.fromEntries(formData);

  try {
    const response = await authFetch.post(
      "/auth/local/register",
      formdataValues
    );

    if (response.status === 200) {
      toast.success("user registered successfully");
      return redirect("/login");
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

const Register = () => {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting" ? true : false;

  return (
    <div className="bg-black py-32">
      <div className="section-container  flex flex-col items-center h-[100vh] justify-center">
        <div className="  shadow-lg  smallTablet:border-2 smallTablet:border-white py-12  w-full md:max-w-lg md:mx-auto  px-7 ">
          <h3 className="font-serif text-4xl font-semibold my-4 text-center text-white ">
            Register
          </h3>
          <div className="form-section  mx-auto w-full md:w-2/3">
            <Form method="post">
              <div className="my-1  ">
                <FormInput
                  label={"Username"}
                  name={"username"}
                  type={"text"}
                  defaultValue={"james Anderson"}
                />
              </div>

              <div className="my-1  ">
                <FormInput
                  label={"Email"}
                  name={"email"}
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
                <SubmitBtn text={"Register"} />
              </div>
              <div className="guest-user-btn mb-3">
                <button className="btn btn-success w-full">Guest User</button>
              </div>

              <div>
                <p className="text-sm font-medium text-center text-blue-600">
                  Already Registered ?
                  <span>
                    <Link to={"/login"} className="link link-secondary ps-3">
                      Login
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

export default Register;
