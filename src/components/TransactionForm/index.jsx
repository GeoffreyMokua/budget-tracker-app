import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    transaction_name: yup.string().required(),
    transaction_amount: yup
      .number("Transaction amount must be a number")
      .positive()
      .integer()
      .required(),
    expense_type: yup.string().required(),
  })
  .required();

const TransactionForm = ({ addTransaction }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => addTransaction(data);

  return (
    <div className="flex flex-col">
      <span className="font-bold text-center self-center mt-[30px]">
        Transaction form
      </span>
      <form
        className="p-10 flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <label>Transaction Name</label>
          <input
            {...register("transaction_name")}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            type="text"
            placeholder="Enter Transaction name"
          />
          <p className="text-red-500">{errors.transaction_name?.message}</p>
        </div>
        <div className="flex flex-col gap-3">
          <label>Transaction Amount</label>
          <input
            {...register("transaction_amount")}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            type="text"
            placeholder="Enter Transaction amount"
          />
          <p className="text-red-500">{errors.transaction_amount?.message}</p>
        </div>
        <div className="flex flex-col gap-3">
          <label>Transaction Type</label>
          <select
            {...register("expense_type")}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <p className="text-red-500">{errors.expense_type?.message}</p>
        </div>
        <div>
          <button
            type="submit"
            className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-300">
            Add transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
