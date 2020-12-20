import axios from "../Config/axios";
import Swal from "sweetalert2";

export const AddFund = (fund) => {
  return { type: "ADD_FUND", payload: fund };
};

export const startGetFund = () => {
  return (dispatch) => {
    axios
      .get("/user/addFund", {
        headers: {
          auth: localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const fund = response.data;
        dispatch(AddFund(fund));
      })
      .catch((err) => {
        alert(err);
      });
  };
};
export const startAddFund = (formData,redirect) => {
  console.log(formData);
  return (dispatch) => {
    axios
      .post("/user/addFund", formData, {
        headers: {
          auth: localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.hasOwnProperty("errors")) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Incorrect Amount Has Been Enter",
          });
        } else {
          Swal.fire({
            title: "Are you sure?",

            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ADD!",
          }).then((result) => {
            if (result.isConfirmed) {
              const fund = response.data;
              dispatch(AddFund(fund));
              Swal.fire("Added!", "The Fund has been Added.", "success");
              redirect()
            } else {
              Swal.fire(
                "Cancelled",
                "The Fund has been Added.",
                "error"
              );
            }
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
};
