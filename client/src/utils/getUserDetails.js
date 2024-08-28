export const fetchUserDetails = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_ORIGIN}/api/user/getuserdetails`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accessToken: localStorage.getItem("accessToken"),
      }),
    }
  );
  const data = await response.json();

  return data?.user;
};
