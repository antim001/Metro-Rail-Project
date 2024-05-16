import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Contexts } from '../../Provider/ContextProvider';
import toast from 'react-hot-toast';

const Recharge = () => {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [rechargeAmount, setRechargeAmount] = useState(0);
  const { user } = useContext(AuthContext);
  const { axiosObj } = useContext(Contexts);

  // fetching current balance
  useEffect(() => {
    axiosObj.post("/current_balance", { email: user.email })
      .then(res => setCurrentBalance(res.data.balance))
      .catch(err => console.log(err));
  }, [axiosObj]);

  // handling form submission
  const handleRecharge = e => {
    e.preventDefault();

    const form = new FormData(e.target);
    const formData = {
      email: user.email,
      recharge: currentBalance + rechargeAmount
    };
    axiosObj.post("/recharge", formData)
      .then(res => {
        if (res.data.acknowledged) {
          toast.success("Account recharged successfully");
          setCurrentBalance(currentBalance + rechargeAmount);
          setRechargeAmount(0);
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="hero min-h-screen bg-base-200 flex items-center justify-center">
      <div className="max-w-md mx-auto p-4 border rounded shadow-lg">
        <h1 className="text-xl font-bold mb-4  text-center">Recharge Page</h1>

        <form onSubmit={handleRecharge}>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block mb-1">Name:</label>
              <input type="text" className="w-full flex-grow border p-2 rounded" required />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block mb-1">Email:</label>
              <input type="text" className="w-full flex-grow border p-2 rounded" value={user.email} required disabled />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block mb-1">Phone Number:</label>
              <input type="text" className="w-full flex-grow border p-2 rounded" required />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block mb-1">Current Balance:</label>
              <span className="block border p-2 rounded">{currentBalance}</span>
            </div>
            <div className="w-full px-2 mb-4">
              <label className="block mb-1">Add Money:</label>
              <input type="number" className="w-full flex-grow border p-2 rounded" value={rechargeAmount} onChange={(e) => setRechargeAmount(parseInt(e.target.value))} />
            </div>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded ml-28">Recharge</button>
        </form>
      </div>
    </div>
  );
}

export default Recharge;
