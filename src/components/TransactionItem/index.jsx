import { RiDeleteBin6Fill } from "react-icons/ri";
const TransactionItem = ({ item, i,handleDelete }) => {
  return (
    <div className="grid grid-cols-5 gap-5  w-full">
      <p className=" text-lg">{i + 1}</p>
      <p className=" text-lg">{item?.transaction_name}</p>
      <p className=" text-lg">{item?.transaction_amount}</p>
      <p className=" text-lg text-green-500">{item?.expense_type}</p>
      <RiDeleteBin6Fill className="text-red-500 mt-2" onClick={()=>handleDelete(i)} />
    </div>
  );
};
export default TransactionItem;
