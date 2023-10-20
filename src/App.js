import { useEffect, useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

function App() {
  const [transactionList, setTransactionList] = useState([]);
  const [balance, setBalance] = useState(0);
  const myBalance = localStorage.getItem("balance");
  const myTransactions = localStorage.getItem("transactions");
  useEffect(() => {
    if (myTransactions) {
      setTransactionList(JSON.parse(myTransactions));
    }
    if (myBalance) {
      setBalance(parseInt(myBalance));
    }
  }, []);

  const addTransaction = (obj) => {
    setTransactionList([...transactionList, obj]);

    if (obj.expense_type === "income") {
      let newBalance = parseInt(balance) + obj.transaction_amount;
      setBalance((balance) => newBalance);
      localStorage.removeItem("balance");
      localStorage.setItem("balance", newBalance);
      localStorage.removeItem("transactions");
      localStorage.setItem(
        "transactions",
        JSON.stringify([...transactionList, obj])
      );
      return;
    }
    if (obj.expense_type === "expense") {
      let newBalance = parseInt(balance) - obj.transaction_amount;
      setBalance((balance) => newBalance);
      localStorage.removeItem("balance");
      localStorage.setItem("balance", newBalance);
      localStorage.removeItem("transactions");
      localStorage.setItem(
        "transactions",
        JSON.stringify([...transactionList, obj])
      );
      return;
    }
  };

  const handleDelete = (i) => {
    const updatedTransactions = transactionList?.filter(
      (transaction, index) => index !== i
    );
    localStorage.removeItem("transactions");
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

    setTransactionList(updatedTransactions);
  };

  return (
    <div className="w-full flex flex-col justify-center p-10">
      <span className="font-bold text-center self-center mt-[30px]">
        Budget app
      </span>
      <div className="flex ml-auto gap-3 p-5 bg-sky-500 rounded-md">
        <p className="text-[#ffffff]">Balance: </p>{" "}
        <p className="font-bold text-xl text-[#ffffff]">{balance}</p>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 p-10">
        <TransactionForm addTransaction={addTransaction} />
        <TransactionList list={transactionList} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
