export const findProfile = (profile, id) => {
    return profile.find((profile) => profile._id === id);
  };