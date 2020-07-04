import { apiPostResult, redirectUrl } from "../conf/config";
import axios from "axios";

class FormBiodata extends HTMLElement {
  set answer(answer) {
    this._answer = answer;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="card" style="width:50%;">
        <div class="card-body">
          <div class="form-group">
            <label for="nama">Full name</label>
            <input type="text" class="form-control" id="fullname"  placeholder="Input Full Name" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" placeholder="Input Email" required>
          </div>
          <button type="button" class="btn btn-primary" id="sendBiodata">Submit</button>
        </div>
      </div>
    `;

    const validateEmail = (mail) => {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(mail);
    };

    const sendData = (answer, biodata) => {
      axios
        .post(apiPostResult, {
          biodata: JSON.stringify(biodata),
          answer: JSON.stringify(answer),
        })
        .then(function (response) {
          if (response.status == 200) {
            document.cookie =
              "survey_answer=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = redirectUrl;
          }
        })
        .catch(function (response) {
          console.log(response);
        });
    };

    const btnSend = document.querySelector("#sendBiodata");
    btnSend.addEventListener("click", (event) => {
      event.preventDefault();
      const getForm = document.querySelector("#biodata");
      const getEmail = document.querySelector('#email').value;
      let biodata = [];
      let error = 0;

      const getInput = getForm.querySelectorAll("input");
      for (let i = 0; i < getInput.length; ++i) {
        if (getInput[i].value == "") {
          error = 1;
          alert('Empty field');
          break;
        } else {
          biodata.push(getInput[i].value);
          error = 0;
        }
      }
      if (!validateEmail(getEmail)) {
        error = 1;
        alert("Email Not Valid");
      } else {
        error = 0;
      }
      if (error == 0) {
        sendData(this._answer, biodata);
      }
    });
  }
}

customElements.define("app-form", FormBiodata);
