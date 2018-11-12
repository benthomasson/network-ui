
class Controller {

  constructor() {
    this.server = process.env.REACT_APP_SERVER ? process.env.REACT_APP_SERVER : window.location.host;
  }

};
export default Controller;
