import React, { useContext } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { Contexts } from '../../Provider/ContextProvider';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Provider/AuthProvider';

const Contact = () => {
  const { axiosObj } = useContext(Contexts);
  const { user } = useContext(AuthContext);

  const handleSubmission = e => {
    e.preventDefault();

    const form = new FormData(e.target);
    const formData = {
      fname: form.get("fname"),
      lname: form.get("lname"),
      email: form.get("email"),
      msg: form.get("msg")
    };

    axiosObj.post("/contact", formData)
      .then(res => {
        if (res.data.acknowledged) {
          toast.success("Responce recieved");
          e.target.reset();
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left mt-20  w-2/4 p-10">
          <h1 className="text-3xl text-green-700 font-boldbold ">Get in touch </h1>
          <div className="divider"></div>
          <div className='flex items-center'>
            <p className='flex items-center '>
              <FaLocationDot className='mr-2 text-2xl'></FaLocationDot>
              <span>Metro Rail office, Begum rokeya avenue</span>
            </p>
          </div>
          <div className='flex items-center mt-2'>
            <p className='flex items-center '>
              <FaPhoneSquareAlt className='mr-2 text-2xl'></FaPhoneSquareAlt>
              <span>0198768,01867653463</span>
            </p>
          </div>
          <div className='flex items-center mt-2'>
            <p className='flex items-center '>
              <MdOutlineMailOutline className='mr-2 text-2xl'></MdOutlineMailOutline>
              <span>bdmetro@gmail.com</span>
            </p>
          </div>
        </div>
        <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100 w-2/4">
          <form className="card-body" onSubmit={handleSubmission}>
            <div className='flex gap-2'>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input type="text" placeholder="Fisrt Name" className="input input-bordered" required name='fname' />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last  Name</span>
                </label>
                <input type="text" placeholder="Last Name" className="input input-bordered" required name='lname' />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" className="input input-bordered" required name='email' disabled value={user.email} />

            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea placeholder="Message" className="textarea textarea-bordered w-full" required name='msg'></textarea>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type='submit'>Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;