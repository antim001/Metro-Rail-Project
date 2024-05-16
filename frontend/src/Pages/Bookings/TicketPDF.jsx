import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Contexts } from "../../Provider/ContextProvider";
import { AuthContext } from "../../Provider/AuthProvider";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import mrt from '../../assets/mrt.jpeg'
export const TicketPDF = () => {
    const { id } = useParams();
    const [bookings, setBookings] = useState([]);
    const { axiosObj } = useContext(Contexts);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axiosObj.post("/bookings", { buyer: user.email, id })
            .then(res => {
                setBookings(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }, [axiosObj]);

    // styles for PDF
    const styles = StyleSheet.create({
        page: {
        },
        section: {
            margin: 10,
            padding: 10,
        },
        viewer: {
            width: 800,
            height: window.innerHeight,
            margin: "auto"
        },
    });

    // Document Component for PDF
    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                {
                    bookings.map((book, index) =>
                        <View style={styles.section} key={index}>
                            <Text>Ticket ID: {book._id}</Text>

                            <Text>Date: {book.date}</Text>

                            <Text>Departure: {book.from}</Text>

                            <Text>Destination: {book.to}</Text>

                            <Text>Ticket quantity: {book.quantity}</Text>

                            <Text>Total price: {book.totalFare} Tk</Text>

                        </View>
               //         <img src={mrt} alt="" />
                    )
                }
            </Page>
        </Document>
    );

    return (
        <div className="py-[7.5rem]">
            <PDFViewer style={styles.viewer}>
                <MyDocument />
            </PDFViewer>
        </div>
    );
}