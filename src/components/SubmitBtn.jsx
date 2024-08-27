import React from "react";
import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ text }) => {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting" ? true : false;

  return (
    <button
      className="btn btn-primary  w-full"
      type="submit"
      disabled={isSubmitting}
    >
      <span>
        {isSubmitting && (
          <span className="loading loading-spinner loading-sm"></span>
        )}
      </span>

      <span>{isSubmitting ? "submitting" : `${text}`}</span>
    </button>
  );
};

export default SubmitBtn;
