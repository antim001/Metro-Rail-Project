import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './../../Provider/AuthProvider';
import { toast } from 'react-hot-toast';

const Login = () => {
  const { signIn, resetPass, user } = useContext(AuthContext);
  const navigate = useNavigate()

  const passReset = () => {
    const email = document.getElementById("email").value;
    if (!email)
      toast.error("Provide an email first");
    else {
      resetPass(email)
        .then(r => {
          toast.success("Password reset email has been sent");
        })
        .catch(err => console.log(err));
    }
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then(res => {
        toast.success('Login successful!');
        navigate('/')
        console.log(res);
      })
      .catch(error => {
        if (error.code === 'auth/invalid-credential') {
          toast.error('Invalid credentials. Please check your email and password.');
        } else {
          toast.error(error.message);
        }
        console.log(error);
      });

  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold mt-4">Login now!</h1>
        </div>

        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSignIn} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" id='email' name='email' className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <input type="password" placeholder="password" name='password' className="input input-bordered" required />
              <label className="label">
                <span onClick={passReset} className="label-text-alt link link-hover">Forgot password?</span>
              </label>
            </div>

            <div className="form-control mt-6">
              <button type='submit' className="btn btn-primary">Login</button>
              <p>New here? please <span className='text-blue-800'><Link to='/register'>Register</Link></span></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;