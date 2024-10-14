import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';


import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

function DelUpdate() {
    const { id } = useParams();
    const [cusName, setCusName] = useState('');
    const [cusEmail, setCusEmail] = useState('');
    const [cusAddress, setCusAddress] = useState('');
    const [cusPhone, setCusPhone] = useState('');
    const [delPName, setDelPName] = useState('');
    const [delPEmail, setDelPEmail] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [deliveryStatus, setDeliveryStatus] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8020/getDel/${id}`)
            .then((result) => {
                console.log(result.data);
                setCusName(result.data.cus_name);
                setCusEmail(result.data.cus_email);
                setCusAddress(result.data.cus_address);
                setCusPhone(result.data.cus_phone);
                setDelPName(result.data.delP_name);
                setDelPEmail(result.data.delP_email);
                setItemName(result.data.item_name);
                setItemQuantity(result.data.item_quantity);
                setTotalPrice(result.data.total_price);
                setDeliveryStatus(result.data.delivery_status);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const updateDelivery = (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (
            !cusName ||
            !cusEmail ||
            !cusAddress ||
            !cusPhone ||
            !delPName ||
            !delPEmail ||
            !itemName ||
            !itemQuantity ||
            !totalPrice ||
            !deliveryStatus
        ) {
            toast.error("All fields are required!");
            return; // Stop the function if validation fails
        }

        // Prepare the updated data
        const updatedData = {
            cus_name: cusName,
            cus_email: cusEmail,
            cus_address: cusAddress,
            cus_phone: cusPhone,
            delP_name: delPName,
            delP_email: delPEmail,
            item_name: itemName,
            item_quantity: itemQuantity,
            total_price: totalPrice,
            delivery_status: deliveryStatus,
        };

        axios
            .put(`http://localhost:8020/updateDelivery/${id}`, updatedData)
            .then((result) => {
                console.log('Updated Delivery:', result.data);
                toast.success("Delivery Updated Successfully!!");
                navigate("/deliveryManager/track");
            })
            .catch((err) => {
                console.error('Error updating delivery:', err);
                toast.error("Failed to update delivery!");
            });
    };

    return (
        <>
        <ToastContainer/>
            <div className="update-report">
            
                <div className="update-from-head">
                    <Link to={'/deliveryManager/track'} className='remove-text-decor'>
                        <i className="fa-solid fa-arrow-left"></i>
                        <span className='space'>Back</span>
                    </Link>
                </div>
                <div className="report-sec">
                    <form method='post' onSubmit={updateDelivery}>
                        <label htmlFor="cusName">Customer Name</label>
                        <input

                            type="text"
                            className='report-input'
                            name="cusName"
                            id="cusName"
                            value={cusName}
                            onChange={(e) => setCusName(e.target.value)} 
                        />

                        <label htmlFor="cusEmail">Customer Email</label>
                        <input
                            
                            type="email"
                            className='report-input'
                            name="cusEmail"
                            id="cusEmail"
                            value={cusEmail}
                            onChange={(e) => setCusEmail(e.target.value)} 
                        />

                        <label htmlFor="cusAddress">Customer Address</label>
                        <input
                            type="text"
                            className='report-input'
                            name="cusAddress"
                            id="cusAddress"
                            value={cusAddress}
                            onChange={(e) => setCusAddress(e.target.value)} 
                        />

                        <label htmlFor="cusPhone">Customer Phone</label>
                        <input
                            type="tel"
                            className='report-input'
                            name="cusPhone"
                            id="cusPhone"
                            value={cusPhone}
                            onChange={(e) => setCusPhone(e.target.value)} 
                        />

                        <label htmlFor="delPName">Delivery Person Name</label>
                        <input
                            type="text"
                            className='report-input'
                            name="delPName"
                            id="delPName"
                            value={delPName}
                            onChange={(e) => setDelPName(e.target.value)} 
                        />

                        <label htmlFor="delPEmail">Delivery Person Email</label>
                        <input
                            type="email"
                            className='report-input'
                            name="delPEmail"
                            id="delPEmail"
                            value={delPEmail}
                            onChange={(e) => setDelPEmail(e.target.value)} 
                        />

                        <label htmlFor="itemName">Item Name</label>
                        <input
                            readOnly
                            type="text"
                            className='report-input'
                            name="itemName"
                            id="itemName"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)} 
                        />

                        <label htmlFor="itemQuantity">Item Quantity</label>
                        <input
                            readOnly
                            type="text"
                            className='report-input'
                            name="itemQuantity"
                            id="itemQuantity"
                            value={itemQuantity}
                            onChange={(e) => setItemQuantity(e.target.value)} 
                        />

                        <label htmlFor="totalPrice">Total Price</label>
                        <input
                            readOnly
                            type="text"
                            className='report-input'
                            name="totalPrice"
                            id="totalPrice"
                            value={totalPrice}
                            onChange={(e) => setTotalPrice(e.target.value)} 
                        />

                        <label htmlFor="deliveryStatus">Delivery Status</label>
                        <input
                            readOnly
                            type="text"
                            className='report-input'
                            name="deliveryStatus"
                            id="deliveryStatus"
                            value={deliveryStatus}
                            onChange={(e) => setDeliveryStatus(e.target.value)} 
                        />

                        <button type="submit" className='report-sum-btn'>Update</button>
                    </form>
                </div>
                
            </div>
        </>
    );
}

export default DelUpdate;
