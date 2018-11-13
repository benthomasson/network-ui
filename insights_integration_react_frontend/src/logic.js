
class Controller {

  constructor() {
    this.protocol = "http://"
    this.server = process.env.REACT_APP_SERVER ? process.env.REACT_APP_SERVER : window.location.host;
    this.launch = this.launch.bind(this);
  }

  launch (e) {
    console.log('launch');
    console.log(e);
    console.log(this.server);
    fetch(this.protocol + this.server + '/insights_integration/api/playbook/?plan=1')
      .then(response => response.json())
      .then(data => console.log(data))
  }

};
export default Controller;
