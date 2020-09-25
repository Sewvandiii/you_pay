import React, { Component } from "react";
import "./style.css";
import "bulma/css/bulma.css";
import HistoryTable from "../../components/HistoryTable";
import axios from "axios";
import Swal from "sweetalert2";

class ViewTransactionsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNo: "",
    };
  }

  onChangeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  clearFields = () => {
    this.setState({ phoneNo: "" });
  };

  searchHistory = async () => {
    let phoneNo = this.state.phoneNo;
    if (phoneNo === "") {
      Swal.fire("Oops...", "The field cannot be blank", "error");
      return;
    }
    if (
      !/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/.test(
        phoneNo
      )
    ) {
      Swal.fire("Oops...", "Invalid Format", "error");
      return;
    }
    await axios({
      method: "POST",
      url: "http://localhost:5000/transfer/view",
      data: {
        phone: phoneNo,
      },
    })
      .then((response) => {
        //Bind Transaction Type
        response.data.outgoingTransactions.forEach(
          (element) => (element.type = "outgoing")
        );
        response.data.incomingTransactions.forEach(
          (element) => (element.type = "incoming")
        );

        //add a combined array of transactions
        let totalTransactions = response.data.incomingTransactions.concat(
          response.data.outgoingTransactions
        );
        response.data.totalTransactions = totalTransactions;
        this.setState({
          transactions: response.data,
        });
        console.log(this.state.transactions);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Oops...", "User Not Found!", "error");
      });
  };

  render() {
    return (
      <div>
        <div className="container pl-3 pr-3 pt-3 pb-3 has-text-centered">
          <h1 className="title is-1 mt-2 pt-3 color-primary">
            Transaction History
          </h1>
          <img
            src="https://iconicto.com/img/contact.gif"
            alt="registrations"
          ></img>
        </div>
        <div className="columns">
          <div className="column is-2"></div>
          <div className="column is-8">
            <div className="form mb-5">
              <div className="field">
                <label className="label">
                  Insert Your Phone Number To Get History
                </label>
                <div className="control">
                  <input
                    name="phoneNo"
                    onChange={this.onChangeHandler}
                    className="input"
                    type="text"
                    placeholder="Your Phone Number Here"
                    value={this.state.phoneNo}
                  />
                </div>
              </div>
              <div className="field is-grouped pt-1">
                <div className="control">
                  <button
                    className="button is-primary"
                    onClick={this.searchHistory}
                  >
                    Retrieve
                  </button>
                </div>
                <div className="control">
                  <button
                    className="button is-danger"
                    onClick={this.clearFields}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            {this.state.transactions && (
              <HistoryTable transactions={this.state.transactions} />
            )}
          </div>
          <div className="column is-2"></div>
        </div>
      </div>
    );
  }
}
export default ViewTransactionsPage;
