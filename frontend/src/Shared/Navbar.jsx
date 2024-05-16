import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { AuthContext } from './../Provider/AuthProvider';
import { auth } from './../Firebase/firebase.config';
import  logo from '../assets/logo.png'

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut(auth)
      .then(res => {
        navigate("/login");
      })
      .catch(error => console.log(error));
  }

  const navLinks = <>
    <li className='font-semibold'><Link to='/'>Home</Link></li>

    <li className='font-semibold '><Link to='/metroinfo'>Metro Schedule</Link></li>

    <li className='font-semibold '><Link to='/farechart'>Fare-chart</Link></li>

    <li className='font-semibold '><Link to='/bookings'>Bookings</Link></li>

    {/* <li className='font-semibold '><Link to='/contact'>Contact</Link></li>

    <li className='font-semibold '><Link to='/bookings'>My bookings</Link></li>

    <li className='font-semibold '><Link to="/recharge">Recharge</Link></li> */}

    {
      (user?.email != "admin@admin.com") ?
        <>
          <li className='font-semibold '><Link to='/contact'>Contact</Link></li>

          <li className='font-semibold '><Link to="/recharge">Recharge</Link></li>
        </> :
        <li className='font-semibold '><Link to='/users'>Users</Link></li>
    }

    <li className='font-semibold '><Link to='/lostpage'>Lost File</Link></li>
  </>

  return (
    <div className="navbar fixed z-10 bg-green-900 max-w-screen-2xl text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>

          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {
              navLinks
            }
          </ul>
        </div>
        <div className='flex gap-1'>
        <img  className='max-w-12 bg-white rounded-full' src={logo} alt="" />
        <Link to='/' className=" rounded-xl  text-xl font-bold text-white p-4">Bangladesh Metro Rail</Link>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {
            navLinks
          }
        </ul>
      </div>

      <div className="navbar-end">
        {user?.email ? (
          <div className="flex items-center space-x-4">
            <div className="dropdown dropdown-end">
              <button className='btn btn-outline'>{user.email}</button>
              <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                <li>
                  <button onClick={handleLogout} className="menu-title">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button className='font-semibold '>
            <Link to='/login'>Login</Link>
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;