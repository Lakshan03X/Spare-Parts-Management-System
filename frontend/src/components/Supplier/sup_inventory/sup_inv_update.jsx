import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

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

  const [errors, setErrors] = useState({});
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

  const validate = () => {
    let formErrors = {};

    if (!item_name) formErrors.item_name = "Item name is required";
    if (!item_quantity || isNaN(item_quantity) || item_quantity <= 0)
      formErrors.item_quantity = "Valid item quantity is required";
    if (!item_model) formErrors.item_model = "Item model is required";
    if (!item_price || isNaN(item_price) || item_price <= 0)
      formErrors.item_price = "Valid item price is required";
    if (!item_weight) {
      formErrors.item_weight = "Item weight is required";
    } else if (item_weight <= 0) {
      formErrors.item_weight = "Item weight must be a positive number";
    }
    if (!supplier_id) formErrors.supplier_id = "Supplier ID is required";
    if (!supplier_company)
      formErrors.supplier_company = "Supplier company is required";
    if (!item_description)
      formErrors.item_description = "Item description is required";

    return formErrors;
  };

  // updating new data to data base
  const Update = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
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
          toast.success("Updated !", { autoClose: 2500 });
          setTimeout(() => {        
            navigate("/supplierInv"); // Navigate to the homepage after adding the user
          }, 1500); // Show success notification
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Set errors to display validation messages
      setErrors(formErrors);
    }
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
            {errors.item_name && <p className="error">{errors.item_name}</p>}

            <label htmlFor="itemQty" className="item_add_form_lable">
              Item Quantity
            </label>
            <input
              type="number"
              name="itemQty"
              value={item_quantity}
              onChange={(e) => setitemQty(e.target.value)}
            />
            {errors.item_quantity && (
              <p className="error">{errors.item_quantity}</p>
            )}

            <label htmlFor="itemModel" className="item_add_form_lable">
              Item Model
            </label>
            <input
              type="text"
              name="itemModel"
              value={item_model}
              onChange={(e) => setitemModel(e.target.value)}
            />
            {errors.item_model && <p className="error">{errors.item_model}</p>}

            <label htmlFor="itemPrice" className="item_add_form_lable">
              Item Price
            </label>
            <input
              type="text"
              name="itemPrice"
              value={item_price}
              onChange={(e) => setitemPrice(e.target.value)}
            />
            {errors.item_price && <p className="error">{errors.item_price}</p>}
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
            {errors.item_weight && (
              <p className="error">{errors.item_weight}</p>
            )}

            <label htmlFor="supplierID" className="item_add_form_lable">
              Supplier ID
            </label>
            <input
              type="text"
              name="supplierID"
              value={supplier_id}
              onChange={(e) => setsupplierId(e.target.value)}
            />
            {errors.supplier_id && (
              <p className="error">{errors.supplier_id}</p>
            )}

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
      <ToastContainer />
    </>
  );
}

export default sup_inv_update;
