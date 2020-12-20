import axios from "../Config/axios";
import Swal from "sweetalert2";

export const TransferFund = (fund) => {
  return { type: "TRANSFER_FUND", payload: fund };
};

export const startGetTransferFund = () => {
  return (dispatch) => {
    axios
      .get("/user/transferFund", {
        headers: {
          auth: localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const fund = response.data;
        dispatch(TransferFund(fund));
      })
      .catch((err) => {
        alert(err);
      });
  };
};
export const StartTransferFund = (formData) => {
  console.log(formData);
  return (dispatch) => {
    axios
      .post("/user/transferFund", formData, {
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
            confirmButtonText: "Transfer!",
          }).then((result) => {
            if (result.isConfirmed) {
              const fund = response.data;
              dispatch(TransferFund(fund));
              Swal.fire("Transfer!", "The Fund has been transfer.", "success");
            } else {
              Swal.fire(
                "Cancelled",
                "The Fund has been transfer.",
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
