import TransactionItem from "../TransactionItem";
import { useState } from "react";
const TransactionList = ({ list, handleDelete }) => {
  const [filterOption, setFilterOption] = useState("all");
  const filteredTransactions = list?.filter((transaction) => {
    if (filterOption === "all") {
      return true;
    } else if (filterOption === "income") {
      return transaction.expense_type === "income";
    } else if (filterOption === "expense") {
      return transaction.expense_type === "expense";
    }
    return true;
  });
  return (
    <div className="flex flex-col shadow-lg rounded-[8px] bg-[#ffffff]">
      <span className="font-bold text-center self-center mt-[30px] mb-5">
        Transaction List
      </span>

      <div className="ml-auto flex mb-6 gap-5 mr-5">
        <label className="flex gap-3">
          <input
            type="radio"
            value="all"
            checked={filterOption === "all"}
            onChange={() => setFilterOption("all")}
          />
          All
        </label>
        <label className="flex gap-3">
          <input
            type="radio"
            value="income"
            checked={filterOption === "income"}
            onChange={() => setFilterOption("income")}
          />
          Income
        </label>
        <label className="flex gap-3">
          <input
            type="radio"
            value="expense"
            checked={filterOption === "expense"}
            onChange={() => setFilterOption("expense")}
          />
          Expense
        </label>
      </div>
      <div className="w-[80%] flex flex-col gap-4 mr-auto ml-auto">
        <div className="grid grid-cols-5 gap-5 w-full">
          <p>#</p>
          <p className="font-bold text-sm">Transaction Name</p>
          <p className="font-bold text-sm">Transaction Amount</p>
          <p className="font-bold text-sm">Transaction Type</p>
          <p className="font-bold text-sm">Action</p>
        </div>
        <div className="overflow-y-scroll h-[300px]">
          {filteredTransactions?.map((item, i) => (
            <TransactionItem
              key={i}
              i={i}
              item={item}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
