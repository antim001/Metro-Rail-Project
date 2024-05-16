import { useContext, useEffect, useState } from "react";
import { Contexts } from "../../Provider/ContextProvider";
import "./FareChart.css";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";

export default function FareChart() {
    const [departures, setDepartures] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [onSubmission, setOnSubmission] = useState(false);
    const [fares, setFares] = useState(null);
    const { axiosObj } = useContext(Contexts);
    const { user } = useContext(AuthContext);

    // fetching all the stops
    useEffect(() => {
        axiosObj.get("/stops")
            .then(res => {
                setDepartures(res.data.stops);
                setDestinations(res.data.stops);
            })
            .catch(err => console.log(err));
    }, [axiosObj]);

    // fetching all the fares
    useEffect(() => {
        axiosObj.get("/fares")
            .then(res => {
                setFares(res.data);
            })
            .catch(err => console.log(err));
    }, [axiosObj]);

    // handing form submission
    const handleSubmission = e => {
        e.preventDefault();
        setOnSubmission(true);

        const form = new FormData(e.target);
        let formData = {};
        departures.reverse().map((from, i) => {
            destinations.filter((stop, j) => j < destinations.length - 1 - i)
                .map((to, k) => {
                    formData[`${destinations[destinations.length - 1 - k].toLowerCase()}_to_${from.toLowerCase()}`] = parseFloat(form.get(`${destinations[destinations.length - 1 - k].toLowerCase()}_to_${from.toLowerCase()}`) || form.get(`${from.toLowerCase()}_to_${destinations[destinations.length - 1 - k].toLowerCase()}`));
                });
        });

        axiosObj.post("/fares", formData)
            .then(res => toast.success("Fares updated"))
            .catch(err => console.log(err));

        setOnSubmission(false);
    }

    return (
        <div className="py-[7.5rem]">
            {
                // (departures) ?
                (departures && fares) ?
                    <form onSubmit={handleSubmission} method="POST">
                        <div className="form-control overflow-x-auto">
                            <table cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <th>From/To</th>
                                        {
                                            destinations
                                                .filter((stop, index2) => index2 < destinations.length - 1)
                                                .map((stop, index) => <th key={index}>{stop}</th>)
                                        }
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        departures.reverse()
                                            .filter((stop, index2) => index2 < destinations.length - 1)
                                            .map((from, index) =>
                                                <tr key={index}>
                                                    <td className="text-bold">{from}</td>

                                                    {
                                                        destinations.filter((stop, index2) => index2 < destinations.length - 1 - index)
                                                            .map((to, index3) =>
                                                                <td key={index3}>
                                                                    {
                                                                        (user?.email && user.email == "admin@admin.com") ?
                                                                            <input
                                                                                className="input"
                                                                                disabled={onSubmission}
                                                                                type="number"
                                                                                name={`${from.toLowerCase()}_to_${destinations[destinations.length - 1 - index3].toLowerCase()}`}
                                                                                min={20}
                                                                                defaultValue={fares[`${from.toLowerCase()}_to_${destinations[destinations.length - 1 - index3].toLowerCase()}`] || fares[`${destinations[destinations.length - 1 - index3].toLowerCase()}_to_${from.toLowerCase()}`] || 20}
                                                                            /> :
                                                                            <span>{fares[`${from.toLowerCase()}_to_${destinations[destinations.length - 1 - index3].toLowerCase()}`] || fares[`${destinations[destinations.length - 1 - index3].toLowerCase()}_to_${from.toLowerCase()}`] || 20}</span>
                                                                    }
                                                                </td>
                                                            )
                                                    }
                                                </tr>
                                            )
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="form-control mt-8">
                            {
                                (user?.email && user.email == "admin@admin.com") ?
                                    <button className="btn btn-sm btn-success w-[100px]" type="submit" disabled={onSubmission}>Update</button> :
                                    <></>
                            }
                        </div>
                    </form> :
                    <></>
            }
        </div>
    );
}