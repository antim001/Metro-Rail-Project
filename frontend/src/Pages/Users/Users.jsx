import { Link } from "react-router-dom";
import { useContext, useState } from 'react';
import { Contexts } from '../../Provider/ContextProvider';
import { AuthContext } from '../../Provider/AuthProvider';
import { useEffect } from "react";
import toast from "react-hot-toast";

export const Users = () => {
    const { axiosObj } = useContext(Contexts);
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosObj.post("/users")
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    }, [axiosObj]);

    return (
        <div className="hero min-h-screen bg-base-200 pt-[5rem]">
            <div className="hero-content flex-col ">
                <div>
                    <div className="row">
                        <div className="col-12">
                            <table border={1} cellSpacing={0} className="mt-5">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Email</th>
                                        <th>Balance</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        users.map((user, index) =>
                                            <tr key={index}>
                                                <td className="text-center">{index + 1}</td>

                                                <td className="text-center">
                                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                                </td>

                                                <td className="text-center">{user.balance} Tk</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}