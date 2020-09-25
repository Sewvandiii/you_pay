import React from "react";
import "./style.css";
import "bulma/css/bulma.css";

function SignupForm() {
  return (
    <div className="form">
      <div className="field">
        <label className="label">First Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Your First Name Here"
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Last Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Your Last Name Here"
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Phone Number</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Your Phone Number Here"
          />
        </div>
      </div>
      <div className="field is-grouped pt-2">
        <div className="control">
          <button className="button is-primary">Submit</button>
        </div>
        <div className="control">
          <button className="button is-danger">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
