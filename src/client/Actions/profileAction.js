import axios from "../Config/axios";
import Swal from "sweetalert2";


export const Profile = (profile) => {
  return { type: "ADD_PROFILE", payload: profile };
};

export const startGetProfile = () => {
  return (dispatch) => {
    axios
      .get("/profile/list", {
        headers: {
          "auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const profile = response.data;
        dispatch(Profile(profile));
      })
      .catch((err) => {
        alert(err);
      });
  };
};

export const startGetAddProfile = (formData,redirect) => {
  return (dispatch) => {
    axios
      .post("/profile/create", formData, {
        headers: {
          "auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        // console.log('data', response.data)
        console.log(response)
        if (response.data.hasOwnProperty("errors")) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data.errors.message,
              });
        } 
        else {
            Swal.fire({
                title: "Are you sure?",
    
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "create ",
              }).then((result) => {
                if (result.isConfirmed) {
                    const profile= response.data;
                    dispatch(Profile(profile));
                    redirect();
                  Swal.fire(" Profile Created Successfully");
                 
                } else {
                  Swal.fire("Cancelled");
                }
              }).catch((err)=>{
                alert(err)
              })
            }
          })

     
      .catch((err) => {
        alert(err);
      });
  };
};

export const setDeleteProfile= (id) => {
  return { type: "REMOVE_PROFILE", payload: id };
};

export const startDeleteProfile = (id) => {
  return (dispatch) => {
    axios
      .delete(`/profile/delete/${id}`, {
        headers: {
          "auth": localStorage.getItem("authToken"),
        },
      })
      
        .then((response) => {
            if (response.data.hasOwnProperty("errors")) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data.errors,
              });
            } else {
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Delete it!",
              }).then((result) => {
                if (!result.isConfirmed) {
                  Swal.fire(
                    "Cancelled",
                    "Profile Not Been Remove.",
                    "error"
                  );
                } else {
                    const profile = response.data;
                    console.log(profile)
            dispatch(setDeleteProfile(profile._id));
    
            Swal.fire("Delete!", "You succesfully Delete The Profile.");
            window.location.href = "/";
                }
              });
            }
          });
      };
    };
    
       
        

export const setEditProfile = (profile) => {
  return { type: "EDIT_PROFILE", payload: profile };
};

export const startEditProfile = ( formData,id,redirect) => {
    console.log(id)
    console.log(formData)
  return (dispatch) => {
    axios
      .put(`/profile/update/${id}`, formData, {
        headers: {
          "auth": localStorage.getItem("authToken"),
        },
      })
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
              title: "Are you sure you want to update?",
  
              icon: "success",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Update profile ",
            }).then((result) => {
              if (result.isConfirmed) {
                const profile = response.data;
                dispatch(setEditProfile(profile));
                Swal.fire(" Profile Update Done Successfully");
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
        