import { useContext } from 'react';
import { Contexts } from '../../Provider/ContextProvider';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const Form = () => {
    const { axiosObj } = useContext(Contexts);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();

        const form = new FormData(e.target);
        const date = new Date();
        const formData = {
            reason: form.get("reason"),
            phone: form.get("phone"),
            email: user.email,
            msg: form.get("msg"),
            date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
        };

        axiosObj.post("/lost", formData)
            .then(res => {
                if (res.data.acknowledged) {
                    toast.success("Responce recieved");
                    e.target.reset();
                    navigate("/lostpage");
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body w-full mt-10">
                <div className="form-control">
                    <h1 className="text-5xl font-bold">Lost and Fine</h1>
                    <div className="w-full px-3 mb-4 md:mb-0">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>

                        <input type="email" placeholder="Email" name='email' className="input input-bordered" required disabled value={user.email} />
                    </div>

                    <div className="w-full  px-3">
                        <label className="label">
                            <span className="label-text">Phone</span>
                        </label>
                        <input type="text" placeholder="Phone" name='phone' className="input input-bordered" required />
                    </div>
                </div>

                <div className="form-control mt-4">
                    <label className="label">
                        <span className="label-text">Reason</span>
                    </label>
                    <div className="flex space-x-4">
                        <label className="cursor-pointer">
                            <input type="radio" className="radio" name="reason" value="walletTheft" required />
                            <span className="ml-2">Wallet Theft</span>
                        </label>

                        <label className="cursor-pointer">
                            <input type="radio" className="radio" name="reason" value="cardBroken" required />
                            <span className="ml-2">Card Broken</span>
                        </label>
                    </div>
                </div>

                <div className="form-control mt-4">
                    <label className="label">
                        <span className="label-text">Message</span>
                    </label>
                    <textarea placeholder="Message" className="textarea textarea-bordered w-full" name="msg" required></textarea>
                </div>

                <div className="form-control mt-6 flex flex-row justify-center gap-1">
                    <button type='submit' className="btn btn-primary">Confirm</button>

                    <Link className="btn btn-error w-[100px]" to="/lostpage">Cancel</Link>
                </div>
            </form>
        </div>
    );
}