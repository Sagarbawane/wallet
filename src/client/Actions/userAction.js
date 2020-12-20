//import axios from "axios";
import axios from "../Config/axios";
import Swal from "sweetalert2";

export const setUser = (user) => {
  return { type: "SET_USER", payload: user };
};
export const startGetUser = () => {
  return (dispatch) => {
    axios
      .get("/user/account", {
        headers: {
          auth: localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const user = response.data;
        console.log(user);
        dispatch(setUser(user));
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: { err: "invalid Info" },
        });
      });
  };
};
export const startRegisterUser = (formData, redirect) => {
  return (dispatch) => {
    axios
      .post("/user/register", formData)
      .then((response) => {
        console.log(response)
        if (response.data.hasOwnProperty("errors")) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.errors.message,
          });
        } else {
          Swal.fire({
            title: "Are you sure?",

            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Register ",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(" Registration Done Successfully");
              redirect();
            } else {
              Swal.fire("Cancelled");
            }
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: { err },
        });
      });
  };
};
export const startLoginUser = (formData, redirect) => {
  console.log(formData)
  return (dispatch) => {
    axios.post("/user/login", formData).then((response) => {
      if (response.data.hasOwnProperty("errors")) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.errors.message,
        });
      } else {
        Swal.fire({
          title: "Are you sure?",

          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Login!",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.setItem("authToken", response.data.token);
            axios
              .get("/user/account", {
                headers: {
                  auth: localStorage.getItem("authToken"),
                },
              })
              .then((response) => {
                const user = response.data;
                dispatch(setUser(user));
              })
              .catch((err) => {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: err,
                });
              });

            Swal.fire("You Successfully Login!");
            redirect();
          } else {
            Swal.fire("Cancelled");
          }
        });
      }
    });
  };
};

export const startSendEmail=(Data)=>{
  return (dispatch)=>{
    console.log(Data)
    axios.post('/user/send-email',Data)
    .then((response)=>{
     console.log(response)
      
    
    })
    .catch((err)=>{
console.log(err)
    })
  }
}

export const startLogoutUser = () => {
  return (dispatch) => {
    axios
      .delete("/user/logout", {
        headers: {
          auth: localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        if (response.data.notice) {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Logout!",
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.removeItem("authToken");
              dispatch(setUser({}));

              Swal.fire("Logout!", "You succesfully logout.");
              window.location.href = "/";
            }
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err,
        });
      });
  };
};


export const startDeleteUser = () => {
  return (dispatch) => {
    axios
      .delete("/user/delete", {
        headers: {
          auth: localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        if (response.data.notice) {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete Account!",
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.removeItem("authToken");
              dispatch(setUser({}));

              Swal.fire("Logout!", "You succesfully Deleted Account.");
              window.location.href = "/register";
            }
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err,
        });
      });
  };
};