import http from "@/configs/http";

class authApi {
  PATH = '/auth';

  // POST
  register = (data) => http.post(`${this.PATH}/register`, data);
  login = (data) => http.post(`${this.PATH}/login`, data);
  sendVerifyEmail = (data) => http.post(`${this.PATH}/send-verify-email`, data);
  sendResetPassword = (data) => http.post(`${this.PATH}/send-reset-password`, data);

  // PUT
  verifyEmail = (data) => http.put(`${this.PATH}/verify-email`, data);
  resetPassword = (data) => http.put(`${this.PATH}/reset-password`, data);
  changePassword = (data) => http.put(`${this.PATH}/change-password`, data);
  enable2FA = (data) => http.put(`${this.PATH}/enable-2fa`, data);
  disable2FA = (data) => http.put(`${this.PATH}/disable-2fa`, data);

  // GET
  refreshToken = () => http.get(`${this.PATH}/refresh-token`);
  qrCode2FA = () => http.get(`${this.PATH}/qrCode-2fa`);

  // DELETE
  logout = () => http.delete(`${this.PATH}/logout`);
}

export default new authApi();
