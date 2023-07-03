import { useState, useEffect, useRef } from "react";
import { FaCartPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaShoppingBasket } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaReceipt } from "react-icons/fa";
import Components from "./CartBuggyComponent";
let num = 0;
export default function GroceryBuggy(){
    let inputRef = useRef();
    let [show, setShow] = useState(false);
    let [toggle, setToggle] = useState(true);
    let [listItem, setListItem] = useState('');
    let [arr, setArr] = useState([]);
    let [trackDelete, settrackDelete] = useState(0);
    function isedit(id, editedItem){
        const mapping = arr.map((named) => {
           if(named.ids == id){
           return {...named, name:editedItem};
           }
           else{
            return named;
           }
        })
        setArr(mapping);
    }
    function isDelete(id) {
      const deleted = arr.filter(item => item.ids !== id);
      setArr(deleted);
      settrackDelete(prevCount => prevCount + 1);
    }
 return(
    <div>
       <div className="main">
        <div className="box" style={{backgroundColor: toggle ? null : 'white'}}>
            <header>
                <FaShoppingBasket className="shopping" style={{color: toggle ? null : 'rgb(21, 33, 54)'}}/>
                <h2 style={{color: toggle ? null : 'rgb(21, 33, 54)'}}>Grocery Buggy</h2>
              <FaEye className="eye" onClick={() => setShow(!show)} style={{color: !toggle ? "rgb(21, 33, 54)" : null}}/>
                <div className={toggle ? "toggle-dark" : "toggle-light"}>
                    <div className={toggle ? "circle-dark" : "circle-light"}onClick={() => setToggle(!toggle)}>
                  {toggle ? <FaMoon/> : <FaSun style={{color: "white"}}/>}
                    </div>
                </div>
            </header>
              {/* 2nd home */}
            <div className="inputs">
            <form onSubmit={e => {show ? null : e.preventDefault()}}>
                <div className="search">
                    <input value={listItem} type="text" placeholder="Enter your grocery" onChange={e => setListItem(e.target.value)}/>
                    <button className="button-cart" type="submit" 
                    style={{backgroundColor: toggle ? "white" : "rgb(21, 33, 54)"}} onClick={() => {
                      if(listItem.length > 0 && (!/\s/.test(listItem.slice(0, 1)) || /\w/.test(listItem.slice(1, 2)))){
                        setArr([...arr, {ids: num++, name: listItem}]);
                        setListItem(" ");
                      }  else{
                       null
                      }}} 
                    onKeyUp={e =>{ 
                      if(e.key === "Enter" && listItem.length !== 0 && (!/\s/.test(listItem.slice(0, 1)) || /\w/.test(listItem.slice(1, 2)))){
                      setArr([...arr, {ids: num++, name: listItem}]);
                      setListItem(" ");
                      } 
                      else {
                        null
                        }}}><FaCartPlus className="cart-icon" alt="Add item" style={{color: toggle ? "rgb(21, 33, 54) " : "white"}}/></button>
            </div>
            <div className="list">
                    {arr.map((list) => (
                      <>
                    <Components item={list.name} num={list} newItem={isedit} trashicon={<FaTrash />} isDeleted={isDelete} />
                      </>
                    ))}
                    </div>
            </form>
          <div className="buttons">
            <button className="clear" onClick={e => {
              setArr([]);
              settrackDelete(0);
            }}>Clear All</button>
          </div>
        </div>
        </div>
        <div className="receipt" style={{display: show ? null : 'none', backgroundColor: toggle ? "white" : "rgb(21, 33, 54)"}}>
          <header className="header-rec" style={{backgroundColor: !toggle ? "white" : "rgb(21, 33, 54)"}}>
            <h2 style={{color: !toggle ? "rgb(21, 33, 54)" : "white"}}>History</h2>
          </header>
          <div className="text-receipt">
           <div className="add"><h3>Added Items:</h3><h3>{arr.length}</h3></div>
           <div className="delete"><h3>Deleted Items:</h3><h3>{trackDelete}</h3></div>
           <button className="back" onClick={() => setShow(!show)} style={{color: !toggle ? "rgb(21, 33, 54)" : null, backgroundColor: !toggle ? "white" : "rgb(21, 33, 54)"}}>Go Back</button>
           </div>
        </div>
       </div>
    </div>
 )
}