import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Contexts } from '../../Provider/ContextProvider';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Provider/AuthProvider';

const TicketInfo = () => {
  const { id } = useParams();
  const { axiosObj } = useContext(Contexts);
  const { user } = useContext(AuthContext);
  const [ticketInfo, setTicketInfo] = useState(null);
  const [totalFare, setTotalFare] = useState(0);
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axiosObj.post("/ticket_info", { id, buyer: user.email })
      .then(res => {
        const t = res.data;
        setTicketInfo(t);

        setBalance(t.balance);

        setTotalFare(
          t[`${t.from.toLowerCase()}_to_${t.to.toLowerCase()}`] ?
            (t.quantity * t[`${t.from.toLowerCase()}_to_${t.to.toLowerCase()}`]) :
            (t.quantity * t[`${t.to.toLowerCase()}_to_${t.from.toLowerCase()}`])
        );
      })
      .catch(err => console.log(err));
  }, [axiosObj]);

  const handleSubmission = e => {
    e.preventDefault();

    const formData = {
      ticket_id: ticketInfo.ticket_id,
      email: user.email,
      balance: balance - totalFare,
      totalFare: totalFare
    };
    axiosObj.post("/confirm_booking", formData)
      .then(res => {
        if (res.data.acknowledged) {
          toast.success("Booking is confirmed");
          navigate("/bookings");
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Ticket Details</h2>

            {
              ticketInfo ?
                <>
                  <p className='text-green-500 font-semibold'>Boarding Station: {ticketInfo.from}</p>

                  <p className='text-green-500 font-semibold'>Destination Station: {ticketInfo.to}</p>

                  <p className='text-green-500 font-semibold'> Fare: {totalFare} Tk</p>

                  <p className='text-green-500 font-semibold'> Current Balance: {balance} Tk</p>

                  <p className='text-green-500 font-semibold'> New Balance: {balance - totalFare} Tk</p>

                  <div className="form-control mt-4">
                    {
                      (balance - totalFare) >= 0 ?
                        <button className="btn btn-primary w-[100px] mx-auto" onClick={handleSubmission}>Confirm</button> :
                        <Link to="/recharge" className="btn btn-danger w-[100px] mx-auto">Recharge</Link>
                    }
                  </div>
                </> :
                <h1>Loading....</h1>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketInfo;