import http from "../configs/http";

class BoardsApi {
  PATH = '/boards';

  // POST
  create = (data) => http.post(`${this.PATH}/create`, data);

  // GET
  backgrounds = (data) => http.get(`${this.PATH}/backgrounds/`, data);
  list = (data) => http.get(`${this.PATH}/list`, data);
  detail = (id) => http.get(`${this.PATH}/${id}`);
}

export default new BoardsApi();