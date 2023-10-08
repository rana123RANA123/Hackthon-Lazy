import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../contexts/AuthContext'
import { CloseOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Space, message } from 'antd'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { firestore } from '../../../config/firebase'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { Navigate, useNavigate } from 'react-router-dom'
import logo1 from '../../../assets/logo/student.png'
import logo2 from '../../../assets/logo/reward.png'
import logo3 from '../../../assets/logo/office.png'
import logo4 from '../../../assets/logo/money.png'
import sidePicture from '../../../assets/logo/growth.jpg'
import sidePicture2 from '../../../assets/logo/add.jpg'
import { LogoutOutlined } from '@ant-design/icons'

export default function Hero() {


  const { user } = useAuthContext()
  const [documents, setDocuments] = useState([])
  const [allDocuments, setAllDocuments] = useState([])
  const [isSearch, setIsSearch] = useState([])


  const navigate = useNavigate()

  const handleSearchChange = (e) => {
    setIsSearch(e.target.value)
  }

  const getData = async () => {
    try {
      const q = query(collection(firestore, "uploadProduct"), where("make", "==", "profile"))
      const querySnapshot = await getDocs(q);
      const array = []
      querySnapshot.forEach((doc) => {
        let data = doc.data()
        array.push(data)
      });
      setDocuments(array)
      setAllDocuments(array)
    } catch (error) {
      console.log(error)
      message.error("please connect to Internet")
      return () => getData()
    }

  }
  useEffect(() => {
    getData()
  }, [getData])





  const handleDelete = async (todo) => {

    try {
      await deleteDoc(doc(firestore, "uploadProduct", todo.id));

      let documentsAfterDelete = documents.filter(doc => doc.id !== todo.id)
      setAllDocuments(documentsAfterDelete)
      setDocuments(documentsAfterDelete)

      message.success("Todo deleted successfully")
    } catch (err) {
      console.error(err)
      message.error("something went wrong while delting todo")
    }

  }


  const filteredItems = documents.filter((document) => {
    return document.name.toLocaleLowerCase().indexOf(isSearch) !==
      -1
  }
  );


  const data = [
    { name: "G1", value: 200 },
    { name: "G2", value: 400 },
    { name: "G3", value: 100 },
    { name: "G4", value: 700 },
    { name: "G5", value: 400 },
    { name: "G6", value: 500 },
    { name: "G7", value: 300 },
    { name: "G8", value: 100 },
    { name: documents.length, value: 200 },

  ]


  return (

    <>



      <div className="container mt-3 ms-3">
        <div className="row gap-3" style={{ cursor: "pointer" }}>
          <div className="col-4 d-flex p-5 " style={{ fontSize: "23px", borderRadius: "10px", width: "240px", backgroundColor: "#e5e5e5" }}>
            <div>
              Students
              <br />
              50078
            </div>
            <div>
              <img src={logo1} style={{ height: "50px", width: "50px" }} alt="" />
            </div>
          </div>

          <div className="col-4 d-flex p-5 " style={{ fontSize: "23px", borderRadius: "10px", width: "240px", backgroundColor: "#e5e5e5" }}>
            <div>
              Reward
              <br />
              60+
            </div>
            <div>
              <img src={logo2} style={{ height: "50px", width: "50px" }} alt="" />
            </div>
          </div>

          <div className="col-4 d-flex p-5 " style={{ fontSize: "23px", borderRadius: "10px", width: "240px", backgroundColor: "#e5e5e5" }}>
            <div>
              Department
              <br />
              50078
            </div>
            <div>
              <img src={logo3} style={{ height: "50px", width: "50px" }} alt="" />
            </div>
          </div>

          <div className="col-4 d-flex p-5 " style={{ fontSize: "23px", borderRadius: "10px", width: "240px", backgroundColor: "#e5e5e5" }}>
            <div>
              Revenue
              <br />
              $625
            </div>
            <div>
              <img src={logo4} style={{ height: "50px", width: "50px" }} alt="" />
            </div>
          </div>
          <div className="col-12 d-flex" style={{ fontSize: "23px", position: "absolute", right: "10px", borderRadius: "10px", width: "240px", backgroundColor: "#fff" }}>

            <div>
              <img src={sidePicture} style={{ height: "300px", width: "235px" }} alt="" />
            </div>
          </div>



          <div>
            <img src={sidePicture2} style={{ height: "330px", position: "absolute", right: "2px", top: "350px", width: "235px" }} alt="" />
          </div>

        </div>
      </div>

      <div className="container mt-2 ms-5">
        <div className="row">
          <div className="col">
            <h1>Student Graph</h1>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <LineChart
              width={900}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </div>
        </div>
      </div>



    


      {/* ============================================================================== */}


      <div className="container mt-5 ms-5">
        <div className="row">
          <div className="col">
            <h1>Students</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 mb-5 mt-5" style={{ marginLeft: "400px" }}>
            <input type="search" name="search" id="search" placeholder='Search-Bar' onChange={handleSearchChange} style={{ width: "300px", padding: "12px", border: "1px solid black", borderRadius: "25px" }} />
          </div>
        </div>
      </div>

      <div className="container ms-5 mt-3" style={{ width: "1150px",fontSize:"22px", height: "500px", position: "absolute" }} >
        <div className="row">
          <div className="col">
            <div className="table-responsive">
              <table className="table table-striped table-hover" style={{ cursor: "pointer" }}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Picture</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>CNIC</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((todo, i) => {
                    return (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <td>{<img src={todo.photo?.url} alt={todo.fullName} className='img-fluid rounded' style={{ height: "50px", width: "40px", cursor: "pointer" }} />}</td>
                        <td>{todo.name}</td>
                        <td>{todo.phone}</td>
                        <td>{todo.cnic}</td>
                        <td>{todo.description}</td>
                        < td >
                          <button className='btn btn-success rounded-0' onClick={() => { navigate(`../editProduct/${todo.id}`) }}><EditOutlined /></button>
                          <button className='btn btn-danger ms-2 rounded-0' onClick={() => { handleDelete(todo) }}><DeleteOutlined /></button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div >

      {/* 
      <div className="container">
        <div className="text-center" style={{ display: "flex" }} id='fullpage'>
          <div className="row">
            <div className="col mt-2 align-items-center justify-content-center d-flex">
             
            </div>
          </div>
        </div>



        <div className="row row-cols-1 row-cols-md-3">
          {documents.map((todo, i) => {
            return (
              <div className="col" key={i}>
                <div className="card mt-4" style={{ backgroundColor: document.backgroundColor }}>
                  <div className="card boxShadow " style={{ height: '420px', backgroundColor: "#edf6f9" }}>
                    <div style={{ height: '100%', padding: "9px" }}>
                      <div className='text-center'>{<img src={todo.photo?.url} alt={todo.fullName} className='img-fluid rounded-circle' style={{ height: "100px",borderRadius:"80px", width: "100px", cursor: "pointer" }} />}</div>
                      <h1 className="card-title text-center mt-3">{todo.name || "Title"}</h1>
                      <h4 className="card-text d-flex align-items-center"><h3>Date : </h3>{todo.today || "Description"}</h4>
                      <h4 className="card-text d-flex align-items-center"><h3>Time : </h3>{todo.todayTime || "Description"}</h4>
                      <h4 className="card-text d-flex align-items-center"><h3>Description : </h3>{todo.description || "Description"}</h4>
                      <div className='d-flex'>
                      <button className='btn btn-success px-4 py-2' onClick={() => { navigate(`../editProduct/${todo.id}`) }}>Edit</button>
                      <button className='btn btn-dan px-4 py-2' onClick={handleDelete(todo)}>Edit</button>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            )
          })
          }
        </div>
      </div> */}


    </>
  )
}
