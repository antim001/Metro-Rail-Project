import { Outlet } from 'react-router-dom';

const Lost = () => {
    return (
        <div className="hero min-h-screen bg-base-200 pt-[5rem]">
            <div className="hero-content flex-col ">
                <div>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
}

export default Lost;
