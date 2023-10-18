// const server = "http://localhost:8000";
const server = 'https://parcel-showcase-server-git-main-william-validos-projects.vercel.app'

const headers = { "Content-Type": "application/json" };

export const getAccessToken = async (username, password) => {
  const payload = {
    login: username,
    password: password,
  };

  return await fetch(`${server}/api/bringer/Generate_Token`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload),
  });
};

export const getTrackingData = async (tracking_number) => {
  return await fetch(
    `${server}/api/bringer/Tracking_Parcel?tracking_number=` + tracking_number,
    {
      method: "GET",
      headers: headers,
    }
  );
};
