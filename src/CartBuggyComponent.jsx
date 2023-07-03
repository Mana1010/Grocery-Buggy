import { useState } from "react";
import {FaEdit} from "react-icons/fa";
import {FaSave} from "react-icons/fa";

export default function Components({ item, num, newItem, trashicon, isDeleted }) {
  let [edit, isEdit] = useState(item);
  let [write, isWriting] = useState('');
  let [decision, isDecision] = useState(true);
  function edits(){
   newItem(num.ids, edit);
   isDecision(false);
  }
  return (
    <ul className="list-item">
      {decision ? (
        <li key={num.ids}>{item}</li>
      ) : (
        <input key={num.ids} value={edit} type="text" onChange={(e) => (!decision ? isEdit(e.target.value) : null)} />
      )}
      <button onClick={() => {
        if(decision){
          edits();
        }
        else{
          edits();
          isDecision(true);
        }
        // isDecision(!decision);
        }} className="edits">{decision ? <FaEdit className="edit"/> : <FaSave className="save"/>}</button>
       <button className="trash" onClick={() => isDeleted(num.ids)}>{trashicon}</button>
    </ul>
  );
}