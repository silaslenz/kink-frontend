import React from "react";

import axios from "axios";
import { EuiHealth, EuiInMemoryTable } from "@elastic/eui";

const columns = [
  {
    field: "date",
    name: "Date",
  },
  {
    field: "category",
    name: "Category",
    render: (category) => {
      if (!category) return "-";
      else return category;
    },
  },
  {
    field: "title",
    name: "Title",
  },
  {
    field: "amount",
    name: "Amount",
    render: (amount) => {
      let color;
      amount = parseFloat(amount);
      if (amount < 0) color = "danger";
      else color = "success";
      return (
        <EuiHealth color={color}>
          {amount.toLocaleString("sv", { minimumFractionDigits: 2 })}
        </EuiHealth>
      );
    },
  },
  {
    field: "balance",
    name: "Balance",
    render: (balance) => {
      balance = parseFloat(balance);
      return balance.toLocaleString("sv", { minimumFractionDigits: 2 });
    },
  },
  {
    field: "currency",
    name: "Currency",
  },
];

const search = {
  box: {
    incremental: true,
    schema: true,
  },
};

export default class TransactionList extends React.Component {
  state = {
    transactions: [],
  };

  componentDidMount() {
    axios.get(`http://localhost:8080/transactions`).then((res) => {
      const transactions = res.data;
      this.setState({ transactions });
    });
  }

  render() {
    return (
      <EuiInMemoryTable
        items={this.state.transactions}
        rowHeader="firstName"
        tableLayout={"auto"}
        columns={columns}
        pagination={{
          pageSize: 20,
          pageSizeOptions: [10, 20, 50, 100, 200],
          hidePerPageOptions: true,
        }}
        search={search}
      />
    );
  }
}
