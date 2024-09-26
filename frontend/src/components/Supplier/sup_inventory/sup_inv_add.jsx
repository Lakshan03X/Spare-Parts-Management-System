import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function sup_inv_add() {
  const [item_name, setitemName] = React.useState();
  const [item_quantity, setitemQty] = React.useState();
  const [item_model, setitemModel] = React.useState();
  const [item_price, setitemPrice] = React.useState();
  const [item_weight, setitemWeight] = React.useState();
  const [supplier_id, setsupplierId] = React.useState();
  const [supplier_company, setsupplierCompany] = React.useState();
  const [item_description, setitem_description] = React.useState();

  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8020/item_create", {
        item_name,
        item_quantity,
        item_model,
        item_price,
        item_weight,
        supplier_id,
        supplier_company,
        item_description,
      })
      .then((result) => {
        console.log(result);
        alert("added");
        setTimeout(() => {
          navigate("/supplierInv");
        }, 2000); // Show success notification
        // navigate('/'); // Navigate to the homepage after adding the user
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form className="add_form" onSubmit={Submit}>
        <Link to="/supplierInv" className="">
          <i className="fa fa-arrow-left">&ensp;</i>
          back
        </Link>
        <h3>Add Item Details</h3>
        <div class="item_add_div">
          <div class="left-column">
            <label htmlFor="item_name" className="item_add_form_lable">
              Item Name
            </label>
            <input
              type="text"
              name="item_name"
              id="item_name"
              onChange={(e) => setitemName(e.target.value)}
            />

            <label htmlFor="itemQty" className="item_add_form_lable">
              Item Quantity
            </label>
            <input
              type="number"
              name="itemQty"
              id="itemName"
              onChange={(e) => setitemQty(e.target.value)}
            />

            <label htmlFor="itemModel" className="item_add_form_lable">
              Item Model
            </label>
            <input
              type="text"
              name="itemModel"
              id="itemName"
              onChange={(e) => setitemModel(e.target.value)}
            />

            <label htmlFor="itemPrice" className="item_add_form_lable">
              Item Price
            </label>
            <input
              type="text"
              name="itemPrice"
              id="itemName"
              onChange={(e) => setitemPrice(e.target.value)}
            />
          </div>
          <div class="right-column">
            <label htmlFor="itemWeight" className="item_add_form_lable">
              Item Weight
            </label>
            <input
              type="text"
              name="itemWeight"
              id="itemName"
              onChange={(e) => setitemWeight(e.target.value)}
            />

            <label htmlFor="supplierID" className="item_add_form_lable">
              Supplier ID
            </label>
            <input
              type="text"
              name="supplierID"
              id="itemName"
              onChange={(e) => setsupplierId(e.target.value)}
            />

            <label htmlFor="suplierCompany" className="item_add_form_lable">
              Supplier Company
            </label>
            <input
              type="text"
              name="suplierCompany"
              id="itemName"
              onChange={(e) => setsupplierCompany(e.target.value)}
            />

            <label htmlFor="suplierDescription" className="item_add_form_lable">
              Suplier Description
            </label>
            <input
              type="text"
              name="suplierDescription"
              id="suplierDescription"
              onChange={(e) => setitem_description(e.target.value)}
            />
            <button type="submit">Add Item</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default sup_inv_add;
