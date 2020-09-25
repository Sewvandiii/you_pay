import React, { Component } from "react";
import "./style.css";
import "bulma/css/bulma.css";

class HistoryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      viewingTransactions: this.props.transactions.totalTransactions,
      totalTransactions: this.props.transactions,
    };
  }

  componentWillReceiveProps = () => {
    //Set props to state. One shows all the transactions initlally and the other preserves the categotized transactions
    this.setState({
      viewingTransactions: this.props.transactions.totalTransactions,
      totalTransactions: this.props.transactions,
    });
  };

  //Convert ISO date String to readable format
  formatDate = (string) => {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  };

  handleToggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  filterIncoming = () => {
    this.handleToggle();
    this.setState({
      viewingTransactions: this.state.totalTransactions.incomingTransactions,
    });
  };
  filterOutgoing = () => {
    this.handleToggle();
    this.setState({
      viewingTransactions: this.state.totalTransactions.outgoingTransactions,
    });
  };

  render() {
    return (
      <div>
        <div className="row mb-2 has-text-right">
          <div
            className={"dropdown" + (this.state.collapsed ? "" : " is-active")}
            tabIndex="0"
          >
            <div className="dropdown-trigger">
              <button
                className="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
                onClick={this.handleToggle}
              >
                <span>Filter Transactions</span>
                <span className="icon is-small">
                  <i className="fas fa-caret-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">
                <a onClick={this.filterIncoming} className="dropdown-item">
                  Incoming Transactions
                </a>
                <a onClick={this.filterOutgoing} className="dropdown-item">
                  Outgoing Transactions
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Date</th>
                <th>To/From</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.viewingTransactions.map((transaction, index) => {
                return (
                  <tr key={index}>
                    <td>{transaction._id}</td>
                    <td>{transaction.fullName}</td>
                    <td>{this.formatDate(transaction.date)}</td>
                    <td>
                      {transaction.type === "outgoing"
                        ? transaction.to
                        : transaction.from}
                    </td>
                    <td>{transaction.amount.$numberDecimal}.00</td>
                    <td>
                      {transaction.type === "incoming" ? (
                        <span className="tag is-primary">Incoming</span>
                      ) : (
                        <span className="tag is-success">Outgoing</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default HistoryTable;
