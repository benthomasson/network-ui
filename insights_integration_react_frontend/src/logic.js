
async function postData(url = ``, data = {}) {
  // Default options are marked with *
    var response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
	  return await response.json();
}

class Controller {

  constructor() {
    this.protocol = "http://"
    this.server = process.env.REACT_APP_SERVER ? process.env.REACT_APP_SERVER : window.location.host;
    this.launch = this.launch.bind(this);
    this.cancel = this.cancel.bind(this);
    this.get_playbook = this.get_playbook.bind(this);
    this.get_api_url = this.get_api_url.bind(this);
		this.plan_id = 1;
		this.inventory_id = 1;
		this.key_id = 1;
		this.worker_id = 1;
  }

	get_api_url(name) {
    return this.protocol + this.server + '/insights_integration/api/' + name + '/';
	}

  async get_playbook (plan_id) {
    var response = await fetch(this.get_api_url('playbook') + '?plan=' + plan_id);
    var data = await response.json();
    if (data.length !== 1) {
      console.log(data);
      return null;
    }
    return data[0];
  }

  async launch (e) {
    console.log('launch');
    console.log(e);
    var playbook = await this.get_playbook(this.plan_id);
    console.log(playbook);
    var playbook_run = await postData(this.get_api_url('playbookrun'),
			{
			"inventory": this.inventory_id,
			"key": this.key_id,
			"playbook": playbook.playbook_id,
			"host_pattern": "all",
			"status": "created"
			});
	 	console.log(playbook_run);
	  var worker_queue_entry = await postData(this.get_api_url('workerqueue'),
      {
          "worker": this.worker_id,
          "playbook_run": playbook_run.playbook_run_id 
      });
    console.log(worker_queue_entry);
  }

  cancel (e) {
    console.log('cancel');
    console.log(e);
  }

};
export default Controller;
