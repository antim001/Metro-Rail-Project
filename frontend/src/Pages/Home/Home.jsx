import { useContext, useEffect, useState } from 'react';
import metro from '../../../src/assets/metro.jpg';
import Marquee from "react-fast-marquee";
import toast from 'react-hot-toast';
import { Contexts } from "../../Provider/ContextProvider";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const [onSubmission, setOnSubmission] = useState(false);
    const [stops, setStops] = useState([]);
    const { axiosObj } = useContext(Contexts);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // fetching stopages
    useEffect(() => {
        axiosObj.get("/stops")
            .then(res => {
                setStops(res.data.stops);
            })
            .catch(err => console.log(err));
    }, [axiosObj]);

    // handling ticket booking form submission
    const handleSubmission = e => {
        e.preventDefault();

        if (!user) {
            toast.error("Login first");
            navigate("/login");
        }

        setOnSubmission(true);

        const form = new FormData(e.currentTarget);
        const formData = {
            buyer: user.email,
            from: form.get("from"),
            to: form.get("to"),
            date: form.get("date"),
            quantity: parseInt(form.get("quantity")),
            paid: 0
        };

        // validating inputs
        if (formData.from == null || formData.to == null) {
            toast.error("Departure or destination hasn't selected");
        }
        else if (formData.from == formData.to) {
            toast.error("Departure and destination can't be the same");
        }
        else {
            axiosObj.post("/book_ticket", formData)
                .then(res => {
                    if (res.data.acknowledged) {
                        toast.success("Ticket booked. Proceed to confirm");
                        navigate(`/ticketinfo/${res.data.insertedId}`);
                    }
                })
                .catch(err => console.log(err));
        }

        setOnSubmission(false);
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse mt-20 w-full ml-6">

                <img src={metro} className="max-w-sm rounded-lg shadow-2xl lg:w-1/2" />

                <div className='lg:w-1/2 space-y-5 mt-5'>
                    <Marquee pauseOnHover={true} speed={100} className="w-full">
                        <span className='text-2xl font-semibolds'>Dear Passenger,please check metro schedule and then purchase ticket.</span>
                    </Marquee>

                    <form className='card-body' onSubmit={handleSubmission} method="POST">
                        <div className="form-control">
                            <label className='label' htmlFor="from">
                                <span className='label-text'>From:</span>
                            </label>

                            <select id='from' className='input input-bordered w-full placeholder-opacity-50 placeholder-black text-black ml-2 p-2 rounded-md bg-slate-400' required disabled={onSubmission} name='from' defaultValue={-1}>
                                <option disabled="1" value={-1}>Select your departing station</option>
                                {
                                    stops && stops.map((stop, index) => <option key={index} value={stop}>{stop}</option>)
                                }
                            </select>
                        </div>

                        <div className="form-control">
                            <label className='label' htmlFor="to">
                                <span className='label-text'>To:</span>
                            </label>

                            <select id='to' className='input input-bordered w-full placeholder-opacity-50 placeholder-black text-black ml-2 p-2 rounded-md bg-slate-400' required disabled={onSubmission} name='to' defaultValue={-1}>
                                <option value={-1} disabled="1">Select your destination</option>
                                {
                                    stops && stops.map((stop, index) => <option key={index} value={stop}>{stop}</option>)
                                }
                            </select>
                        </div>

                        <div className="form-control">
                            <label htmlFor="date" className='label'>
                                <span className="label-text">Date of journey:</span>
                            </label>

                            <input type="date" name='date' className='input input-bordered w-full placeholder-opacity-50 placeholder-black text-black ml-2 p-2 rounded-md bg-slate-400' required disabled={onSubmission} />
                        </div>

                        <div className="form-control">
                            <label className='label' htmlFor='quantity'>
                                <span className='label-text'>Ticket Quantity:</span>
                            </label>

                            <input
                                className='text-black ml-2 p-2 rounded-md bg-slate-400 mb-2 w-full input input-bordered'
                                type="number"
                                id="quantity"
                                name="quantity"
                                min="1"
                                max="4"
                                defaultValue="1"
                                required
                                disabled={onSubmission}
                            />
                        </div>

                        <div className="form-control flex gap-1 flex-row justify-center">
                            <button className="btn btn-primary w-[150px]" type="submit" disabled={onSubmission}>Purchase Ticket</button>

                            <Link className="btn btn-secondary w-[150px]" to="/recharge">Recharge your card</Link>
                        </div>
                    </form>
                </div>
            </div >
        </div>
    );
}

export default Home;
