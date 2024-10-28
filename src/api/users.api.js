import http from "../configs/http";


class UsersApi {
  PATH = '/users';

  // PUT
  update = (data) => http.put(`${this.PATH}/update`, data);

  // GET
  info = () => http.get(`${this.PATH}/info`);
  pinnedBoards = () => http.get(`${this.PATH}/pinnedBoards`)
  recentBoards = () => http.get(`${this.PATH}/recentBoards`)
}

export default new UsersApi();