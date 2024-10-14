import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function SupInvAdd() {
  const [item_name, setItemName] = useState("");
  const [item_quantity, setItemQty] = useState("");
  const [item_model, setItemModel] = useState("");
  const [item_price, setItemPrice] = useState("");
  const [item_weight, setItemWeight] = useState("");
  const [supplier_id, setSupplierId] = useState("");
  const [supplier_company, setSupplierCompany] = useState("");
  const [item_description, setItemDescription] = useState("");

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validation logic
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

  const Submit = (e) => {
    e.preventDefault();
    const formErrors = validate();

    if (Object.keys(formErrors).length === 0) {
      // No validation errors
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
          toast.success("Item added successfully !", { autoClose: 3000 });
          setTimeout(() => {
            navigate("/supplierInv");
          }, 2000);
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
      <form className="add_form" onSubmit={Submit}>
        <Link to="/supplierInv" className="">
          <i className="fa fa-arrow-left">&ensp;</i> back
        </Link>
        <h3>Add Item Details</h3>
        <div className="item_add_div">
          <div className="left-column">
            <label htmlFor="item_name" className="item_add_form_lable">
              Item Name
            </label>
            <input
              type="text"
              name="item_name"
              id="item_name"
              value={item_name}
              onChange={(e) => setItemName(e.target.value)}
            />
            {errors.item_name && <p className="error">{errors.item_name}</p>}

            <label htmlFor="itemQty" className="item_add_form_lable">
              Item Quantity
            </label>
            <input
              type="number"
              name="itemQty"
              id="itemQty"
              value={item_quantity}
              onChange={(e) => setItemQty(e.target.value)}
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
              id="itemModel"
              value={item_model}
              onChange={(e) => setItemModel(e.target.value)}
            />
            {errors.item_model && <p className="error">{errors.item_model}</p>}

            <label htmlFor="itemPrice" className="item_add_form_lable">
              Item Price
            </label>
            <input
              type="text"
              name="itemPrice"
              id="itemPrice"
              value={item_price}
              onChange={(e) => setItemPrice(e.target.value)}
            />
            {errors.item_price && <p className="error">{errors.item_price}</p>}
          </div>
          <div className="right-column">
            <label htmlFor="itemWeight" className="item_add_form_lable">
              Item Weight
            </label>
            <input
              type="text"
              name="itemWeight"
              id="itemWeight"
              value={item_weight}
              onChange={(e) => setItemWeight(e.target.value)}
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
              id="supplierID"
              value={supplier_id}
              onChange={(e) => setSupplierId(e.target.value)}
            />
            {errors.supplier_id && (
              <p className="error">{errors.supplier_id}</p>
            )}

            <label htmlFor="supplierCompany" className="item_add_form_lable">
              Supplier Company
            </label>
            <input
              type="text"
              name="supplierCompany"
              id="supplierCompany"
              value={supplier_company}
              onChange={(e) => setSupplierCompany(e.target.value)}
            />
            {errors.supplier_company && (
              <p className="error">{errors.supplier_company}</p>
            )}

            <label
              htmlFor="supplierDescription"
              className="item_add_form_lable"
            >
              Supplier Description
            </label>
            <input
              type="text"
              name="supplierDescription"
              id="supplierDescription"
              value={item_description}
              onChange={(e) => setItemDescription(e.target.value)}
            />
            {errors.item_description && (
              <p className="error">{errors.item_description}</p>
            )}

            <button type="submit">Add Item</button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default SupInvAdd;
