import dotenv from "dotenv";
dotenv.config();

// access and refresh token expiry
const accessTokenExpiry = parseInt(
  process.env.ACCESS_TOKEN_EXPIRY || "300",
  10
);
const refreshTokenExpiry = parseInt(
  process.env.REFRESH_TOKEN_EXPIRY || "1200",
  10
);

export const accessTokenOption = {
  expires: new Date(Date.now() + accessTokenExpiry * 60 * 1000),
  maxAge: accessTokenExpiry * 60 * 1000,
  // httpOnly: true,
  sameSite: "lax",
};

export const refreshTokenOption = {
  expires: new Date(Date.now() + refreshTokenExpiry * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpiry * 24 * 60 * 60 * 1000,
  // httpOnly: true,
  sameSite: "lax",
};

export const sendToken = ({ user, statusCode, res }) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  res.cookie("accessToken", accessToken, accessTokenOption);
  res.cookie("refreshToken", refreshToken, refreshTokenOption);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};
