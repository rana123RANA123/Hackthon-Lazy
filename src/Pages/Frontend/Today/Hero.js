import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { signOut } from 'firebase/auth'
import { firestore } from '../../../config/firebase'
// import { message } from 'antd'
// import dayjs from 'dayjs'
// import {HomeOutlined} from '@ant-design/icons'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
// import { Modal, message } from 'antd'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

export default function Hero() {

  const [allDocuments, setAllDocuments] = useState([])
  const [documents, setDocuments] = useState([])
  const [todo, setTodo] = useState({})

  // const { isAuth, dispatch } = useAuthContext()

  console.log("allDocuments", allDocuments)

  const todayDate = dayjs(todo.date).format("YYYY-MM-DD");


  const currentDate = new Date();
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);


  const todayDate2 = dayjs(todo.date).format("YYYY-MM-DD");

  const specialTodos = async () => {
    const colRef = collection(firestore, "uploadCourses")
    const q = query(colRef, where("today", "==", todayDate2))


    onSnapshot(q, (snapshot) => {
      let stickynotes = []
      snapshot.docs.forEach((doc) => {
        stickynotes.push({ ...doc.data(), id: doc.id })
      })
      setAllDocuments(stickynotes)
      setDocuments(stickynotes)
      console.log(stickynotes)
    })

  }
  console.log(specialTodos)


  useEffect(() => {
    specialTodos()
  }, [specialTodos])



  return (
    <>
      <div className="container">
        <div className="text-center" style={{ display: "flex" }} id='fullpage'>
          <div className="row">
            <div className="col mt-2 align-items-center justify-content-center d-flex">
              <div className="row">
                <div className="col">
                  <h1 className='text-center'>Today Courses<span>({documents.length})</span></h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col gap-3 d-flex">
              <Link to='/courses' className='p-4 border-2 fw-bold bottomLine' style={{ textDecoration: "none", fontSize: "30px" }}>All Courses</Link>
              <Link to='/arts' className='p-4 border-2 fw-bold bottomLine' style={{ textDecoration: "none", fontSize: "30px" }}>Arts</Link>
              <Link to='/cs' className='p-4 border-2 fw-bold bottomLine' style={{ textDecoration: "none", fontSize: "30px" }}>Medical</Link>
              <Link to='/law' className='p-4 border-2 fw-bold bottomLine' style={{ textDecoration: "none", fontSize: "30px" }}>Law</Link>
              <Link to='/today' className='p-4 border-2 fw-bold bottomLine' style={{ textDecoration: "none", fontSize: "30px" }}>Today</Link>

            </div>
          </div>
        </div>



        <div className="row row-cols-1 row-cols-md-3" data-aos="fade-up">
          {documents.map((todo, i) => {
            return (
              <div className="col" key={i}>
                <div className="card mt-4" style={{ backgroundColor: document.backgroundColor }}>
                  <div className="card boxShadow gradianColor" style={{ height: '280px', width: "400px" }}>
                    <div className='mt-2' style={{ height: '100%', padding: "9px" }}>
                      <h1 className="card-title text-light text-center mt-3">{todo.courses || "Title"}</h1>
                      <h4 className="card-text text-light d-flex align-items-center"><h3>Date : </h3>{todo.today || "Description"}</h4>
                      <h4 className="card-text text-light d-flex align-items-center"><h3>Time : </h3>{todo.todayTime || "Description"}</h4>
                      <h4 className="card-text text-light d-flex align-items-center"><h3>Description : </h3>{todo.description || "Description"}</h4>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
          }
        </div>
      </div>

    </>
  )
}
