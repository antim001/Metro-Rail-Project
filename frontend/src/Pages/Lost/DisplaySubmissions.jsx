import { Link } from "react-router-dom";
import { useContext, useState } from 'react';
import { Contexts } from '../../Provider/ContextProvider';
import { AuthContext } from '../../Provider/AuthProvider';
import { useEffect } from "react";
import toast from "react-hot-toast";

export const DisplaySubmissions = () => {
    const { axiosObj } = useContext(Contexts);
    const { user } = useContext(AuthContext);
    const [losts, setLosts] = useState([]);
    const [responded, setResponded] = useState(0);

    useEffect(() => {
        axiosObj.post("/losts")
            .then(res => setLosts(res.data))
            .catch(err => console.log(err));
    }, [axiosObj, responded]);

    const respond = (email, lostId) => {
        axiosObj.post("/users", { email })
            .then(res => {
                const usrBalance = res.data[0].balance;
                if (usrBalance < 200) {
                    axiosObj.post("/lost_respond", { email, lostId, balanceEnough: 0 })
                        .then(res => toast.success("Responded successfully"))
                        .catch(err => console.log(err));
                }
                else {
                    axiosObj.post("/lost_respond", { email, lostId, balanceEnough: 1 })
                        .then(res => {
                            toast.success("Responded successfully");
                            setResponded(1);
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="row">
            <div className="col-12">
                {
                    user.email != "admin@admin.com" ?
                        <Link className="btn btn-success" to="/lostpage/form">Submit case</Link> :
                        <></>
                }

                <table border={1} cellSpacing={0} className="mt-5">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>

                            {
                                user.email == "admin@admin.com" ?
                                    <th>Email</th> :
                                    <></>
                            }

                            <th>Reason</th>
                            <th>Request messege</th>
                            <th>Admin response</th>
                            {
                                user.email == "admin@admin.com" ?
                                    <th>Actions</th> :
                                    <></>
                            }
                        </tr>
                    </thead>

                    <tbody>
                        {
                            losts.map((lost, index) =>
                                <tr key={index}>
                                    <td className="text-center">{index + 1}</td>

                                    <td className="text-center">{lost.date}</td>

                                    {
                                        user.email == "admin@admin.com" ?
                                            <td className="text-center">{lost.email}</td> :
                                            <></>
                                    }

                                    <td className="text-center">{lost.reason}</td>

                                    <td className="text-center">{lost.msg}</td>

                                    <td className="text-center">{lost.admin_reply || ""}</td>

                                    {
                                        user.email == "admin@admin.com" ?
                                            <td>
                                                {
                                                    !lost.admin_reply ?
                                                        <button onClick={() => respond(lost.email, lost._id)} className="btn btn-primary">Respond</button> :
                                                        <></>
                                                }
                                            </td> :
                                            <></>
                                    }
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}