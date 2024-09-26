import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function sup_inv_update() {
  //craete like variable to usesatates
  const { id } = useParams();
  const [item_name, setitemName] = useState("");
  const [item_quantity, setitemQty] = useState(0);
  const [item_model, setitemModel] = useState("");
  const [item_price, setitemPrice] = useState("");
  const [item_weight, setitemWeight] = useState("");
  const [supplier_id, setsupplierId] = useState("");
  const [supplier_company, setsupplierCompany] = useState("");
  const [item_description, setitem_description] = useState("");

  const navigate = useNavigate();

  //getting id and setting new datas
  useEffect(() => {
    axios
      .get("http://localhost:8020/get_item/" + id)
      .then((result) => {
        console.log(result);
        setitemName(result.data.item_name);
        setitemQty(result.data.item_quantity);
        setitemModel(result.data.item_model);
        setitemPrice(result.data.item_price);
        setitemWeight(result.data.item_weight);
        setsupplierId(result.data.supplier_id);
        setsupplierCompany(result.data.supplier_company);
        setitem_description(result.data.item_description);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // updating new data to data base
  const Update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8020/item_update/" + id, {
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
        setTimeout(() => {
          alert("updated");
          navigate("/supplierInv"); // Navigate to the homepage after adding the user
        }, 500); // Show success notification
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form className="add_form" onSubmit={Update}>
        <Link to="/supplierInv" className="">
          <i className="fa fa-arrow-left">&ensp;</i>
          back
        </Link>
        <h3>Update Item Details</h3>
        <div class="item_add_div">
          <div class="left-column">
            <label htmlFor="itemName" className="item_add_form_lable">
              Item Name
            </label>
            <input
              type="text"
              name="itemName"
              value={item_name}
              onChange={(e) => setitemName(e.target.value)}
            />

            <label htmlFor="itemQty" className="item_add_form_lable">
              Item Quantity
            </label>
            <input
              type="number"
              name="itemQty"
              value={item_quantity}
              onChange={(e) => setitemQty(e.target.value)}
            />

            <label htmlFor="itemModel" className="item_add_form_lable">
              Item Model
            </label>
            <input
              type="text"
              name="itemModel"
              value={item_model}
              onChange={(e) => setitemModel(e.target.value)}
            />

            <label htmlFor="itemPrice" className="item_add_form_lable">
              Item Price
            </label>
            <input
              type="text"
              name="itemPrice"
              value={item_price}
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
              value={item_weight}
              onChange={(e) => setitemWeight(e.target.value)}
            />

            <label htmlFor="supplierID" className="item_add_form_lable">
              Supplier ID
            </label>
            <input
              type="text"
              name="supplierID"
              value={supplier_id}
              onChange={(e) => setsupplierId(e.target.value)}
            />

            <label htmlFor="suplierCompany" className="item_add_form_lable">
              Supplier Company
            </label>
            <input
              type="text"
              name="suplierCompany"
              value={supplier_company}
              onChange={(e) => setsupplierCompany(e.target.value)}
            />

            <label htmlFor="itemDescription" className="item_add_form_lable">
              Item Description
            </label>
            <input
              type="text"
              name="suplierCompany"
              value={item_description}
              onChange={(e) => setitem_description(e.target.value)}
            />
            <button type="submit">Update Item</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default sup_inv_update;
