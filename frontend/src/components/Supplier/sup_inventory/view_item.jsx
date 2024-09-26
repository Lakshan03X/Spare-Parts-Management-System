import axios from "axios";
import sparePartImage from "../sup_assets/spare_part.jpg";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function view_item() {
  const { id } = useParams();
  const [item_name, setitemName] = useState("");
  const [item_quantity, setitemQty] = useState(0);
  const [item_model, setitemModel] = useState("");
  const [item_price, setitemPrice] = useState("");
  const [item_weight, setitemWeight] = useState("");
  const [supplier_id, setsupplierId] = useState("");
  const [supplier_company, setsupplierCompany] = useState("");
  const [item_description, setitem_description] = useState("");

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

  return (
    <div className="view_container">
      <img
        src={sparePartImage}
        alt="item-image"
        className="view_item_img"
      ></img>
        <div className="view_card">
          <input type="text" value={"Supplier Id : "+supplier_id} className="input_view" readOnly />
          <input type="text" value={"Item Name : "+item_name} className="input_view" readOnly />
          <input type="text" value={"Item Quantity : "+item_quantity} className="input_view" readOnly />
          <input type="text" value={"Item Model : "+item_model} className="input_view" readOnly />
          <input type="text" value={"Item Price : "+ "Rs. "+item_price + " /="} className="input_view" readOnly />
          <input type="text" value={"Item Weight : "+item_weight + " Kg"} className="input_view" readOnly />
          <input type="text" value={"Item Company : "+supplier_company} className="input_view" readOnly />
          <input type="text" value={"Item Description : "+item_description} className="input_view" readOnly />
        </div>
      <Link to="/supplierInv">
        <button className="back-btn">Bact to Home</button>
      </Link>
    </div>
  );
}

export default view_item;
