import { useContext, useEffect, useState } from "react";
import { Contexts } from "../../Provider/ContextProvider";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

export const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const { axiosObj } = useContext(Contexts);
    const { user } = useContext(AuthContext);
    const [showRep, setShowRep] = useState(false);

    useEffect(() => {
        if (user.email == "admin@admin.com") {
            axiosObj.post("/bookings")
                .then(res => {
                    setBookings(res.data);
                })
                .catch(err => console.log(err));
        }
        else {
            axiosObj.post("/bookings", { buyer: user.email })
                .then(res => {
                    setBookings(res.data);
                })
                .catch(err => console.log(err));
        }
    }, [axiosObj]);

    // styles for PDF
    const styles = StyleSheet.create({
        page: {
        },
        section: {
            margin: 10,
            padding: 10,
            fontSize: "14px"
        },
        viewer: {
            width: 800,
            height: window.innerHeight,
            margin: "auto"
        },
        thead: {
            backgroundColor: "#bff0fd",
            display: "flex",
            flexDirection: 'row'
        },
        th: {
            fontStyle: "bold",
            textAlign: "center",
            padding: "5px",
            width: "90px",
            border: "1px solid black"
        },
        tbody: {
            display: "flex",
            flexDirection: 'row'
        },
        td: {
            textAlign: "center",
            padding: "5px",
            width: "90px",
            border: "1px solid black"
        }
    });

    // Document Component for PDF
    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <View style={styles.thead}>
                        <Text
                            style={{
                                fontStyle: "bold",
                                textAlign: "center",
                                padding: "5px",
                                width: "20px",
                                border: "1px solid black"
                            }}
                        >#</Text>

                        <Text style={styles.th}>Date</Text>

                        <Text
                            style={{
                                fontStyle: "bold",
                                textAlign: "center",
                                padding: "5px",
                                width: "110px",
                                border: "1px solid black"
                            }}
                        >User</Text>

                        <Text style={styles.th}>Departure</Text>

                        <Text style={styles.th}>Destination</Text>

                        <Text style={styles.th}>Ticket quantity</Text>

                        <Text style={styles.th}>Total price</Text>
                    </View>

                    {
                        bookings.map((book, index) =>
                            <View style={styles.tbody} key={index}>
                                <Text
                                    style={{
                                        fontStyle: "bold",
                                        textAlign: "center",
                                        padding: "5px",
                                        width: "20px",
                                        border: "1px solid black"
                                    }}
                                >{index + 1}</Text>

                                <Text style={styles.td}>{book.date}</Text>

                                <Text
                                    style={{
                                        textAlign: "center",
                                        padding: "5px",
                                        width: "110px",
                                        border: "1px solid black"
                                    }}
                                >{book.buyer}</Text>

                                <Text style={styles.td}>{book.from}</Text>

                                <Text style={styles.td}>{book.to}</Text>

                                <Text style={styles.td}>{book.quantity}</Text>

                                <Text style={styles.td}>{book.totalFare} Tk</Text>
                            </View>
                        )
                    }
                </View>
            </Page>
        </Document>
    );

    return (
        <div className="py-[7.5rem]">
            <table cellSpacing={0} cellPadding={5} style={{ border: "1px solid white", textAlign: "center" }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>

                        {
                            user.email == "admin@admin.com" ?
                                <>
                                    <th>User</th>
                                </> :
                                <></>
                        }

                        <th>Departure</th>
                        <th>Destination</th>
                        <th>Ticket quantity</th>
                        <th>Total fare</th>

                        {
                            user.email != "admin@admin.com" ?
                                <>
                                    <th>Confirm status</th>
                                    <th>Download ticket</th>
                                </> :
                                <></>
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        bookings.map((book, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>

                                <td>{book.date}</td>

                                {
                                    user.email == "admin@admin.com" ?
                                        <>
                                            <td>{book.buyer}</td>
                                        </> :
                                        <></>
                                }

                                <td>{book.from}</td>

                                <td>{book.to}</td>

                                <td>{book.quantity}</td>

                                <td>{book.totalFare} Tk</td>

                                {
                                    user.email != "admin@admin.com" ?
                                        <>
                                            <td>
                                                {
                                                    book.paid ?
                                                        <span className="text-green-400">Confirmed</span> :
                                                        <Link to={`/ticketinfo/${book._id}`} className="btn btn-sm btn-danger">Confirm now</Link>
                                                }
                                            </td>

                                            <td>
                                                {
                                                    book.paid ?
                                                        <Link to={`/bookings/download/${book._id}`} className="btn btn-sm btn-primary">Download</Link> :
                                                        <span className="text-red-400">Confirm first</span>
                                                }
                                            </td>
                                        </> :
                                        <></>
                                }
                            </tr>
                        )
                    }
                </tbody>
            </table>

            <div className="flex justify-center mt-5">
                <button className="btn btn-primary" onClick={() => setShowRep(!showRep)}>
                    {
                        showRep ? "Hide PDF report" : "Show PDF report"
                    }
                </button>
            </div>

            <div className={`px-[7.5rem] mt-6 ${showRep ? "block" : "hidden"}`}>
                <PDFViewer style={styles.viewer}>
                    <MyDocument />
                </PDFViewer>
            </div>
        </div>
    );
}