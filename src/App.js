import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import JSONData from './MOCK_DATA.json'

function App() {
  
    useEffect(() => {
      fetch("https://dummy.restapiexample.com/api/v1/employees", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => { console.log(data.data.length); setusers(data.data) } );
    }, []);

  const [users, setusers] = useState(JSONData);

  const [pageNumber, setPageNumber] = useState(0);

  const userPerPage = 5;
  const pagesVisited = pageNumber * userPerPage;

  const pageCount = Math.ceil(users.length / userPerPage);

  const ChangePage = ({selected}) => {
    setPageNumber(selected);
  }

  const displayUser = users.slice(pagesVisited, pagesVisited + userPerPage).map( item =>{

      return(
        <div className="col-md-4 p-4 mt-5" key={item.id} >
          <div className="card bg-primary text-light col-md-12 p-3 pb-5 d-flex justify-content-center align-items-center" style={{boxShadow:"2px 2px 5px rgba(0,0,0,.5)"}}>
            <h1 className="bg-primary text-light d-flex justify-content-center align-items-center display-3" style={{ width:140, height:140, borderRadius:"50%",marginTop:-70,border:"15px solid white" } }>{item.id}</h1>
            <h2 className="mt-3">{item.employee_name}</h2>
            <h5 className="mt-3">Age : {item.employee_age}</h5>
            <button className="btn btn-outline-light btn-lg mt-3 col-10" style={{borderRadius:30}}>Salary : {item.employee_salary}</button>

          </div>
        </div>
      )
  } )

  return (
    <div
      className="col-md-8 offset-md-2 text-center"
      style={{
        backgroundColor: "",
      }}
    > 
    <h1 className="mt-5 mb-2 display-1 p-4"> The Data </h1>
      <div className="row">

      {displayUser}
      </div>
      <div className="row mt-3 mb-5">
          <div className="Page navigation example">
              <ReactPaginate 
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={ChangePage}
                containerClassName={"pagination justify-content-center pagination-lg"}
                previousClassName={"m-2 page-link "}
                nextLinkClassName={"m-2 page-link "}
                activeClassName={" page-link2"}
                disabledClassName={" page-link "}
                breakClassName={" page-link m-2 "}
                pageLinkClassName={"m-2 page-link"}
                
                />
          </div>
      </div>
    </div>
  );
}

export default App;
