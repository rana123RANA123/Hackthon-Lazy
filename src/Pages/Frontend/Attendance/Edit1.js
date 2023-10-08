import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, DatePicker, Divider, Form, Input, Row, Select, Typography, message } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { firestore } from '../../../config/firebase'
import { ArrowRightOutlined } from '@ant-design/icons'

const { Title } = Typography

const initialState = { name: "", cnic: "", courses: "", status: ""}

export default function Edit1() {


    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const navigate = useNavigate()
    const params = useParams()

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const getDocument = useCallback(async () => {

        const docRef = doc(firestore, "uploadCourses", params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const todo = docSnap.data()
            setState(todo)
        } else {
            // docSnap.data() will be undefined in this case
            message.error("Student data not found")
        }
    }, [params.id])

    useEffect(() => {
        getDocument()
    }, [getDocument])

    const handleUpdate = async (e) => {
        e.preventDefault()
        let { name, cnic, courses, status } = state

        const todo = {
            ...state,
            name, cnic, courses, status,
            dateModified: new Date().getTime(),
        }

        setIsProcessing(true)
        try {
            await setDoc(doc(firestore, "uploadCourses", todo.id), todo);
            message.success("updated successfully")
            navigate("/courses")
        } catch (e) {
            console.error("Error adding document: ", e);
            message.error("updated not successfully")
        }
        setIsProcessing(false)
    }


    return (
        <>
            <div className="container mt-5 mb-5 boxShadow" style={{ backgroundColor: "white", height: "800px", width: "950px" }}>
                <div className="row">
                    <div className="col">
                        <h1 className='text-center mt-5'>Upload Courses</h1>
                        <p className='mt-4 text-center'>Enter upload product details to get access</p>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-6 px-5 py-3">
                        <label className='fw-bold mb-3'>Student Name</label><br />
                        <input type="text" value={state.name}  className='form-control w-100 border-1' placeholder='Name' name='name' onChange={handleChange} style={{ borderRadius: "0px", height: "50px" }} />
                    </div>

                    <div className="col-6 px-5 py-3">
                        <label className='fw-bold mb-3'>CNIC Number</label><br />
                        <input type="number" value={state.cnic} className='form-control w-100 border-1' placeholder='CNIC' name='cnic' onChange={handleChange} style={{ borderRadius: "0px", height: "50px" }} />
                    </div>

                    <div className="col-6 px-5 py-3">
                        <label className='fw-bold mb-3'>Choose Courses</label><br />
                        <select className="form-select" value={state.courses} onChange={handleChange} name='courses' >
                            <option selected disabled hidden>Choose Quality</option>
                            <option style={{ fontWeight: "bolder" }}>Arts</option>
                            <option style={{ fontWeight: "bolder" }}>Medical</option>
                            <option style={{ fontWeight: "bolder" }}>Law</option>

                        </select>
                    </div>

                    <div className="col-6 px-5 py-3">
                        <label className='fw-bold mb-3'>Choose Status</label><br />
                        <select className="form-select"  value={state.status} onChange={handleChange} name='status' >
                            <option selected disabled hidden>Choose Status</option>
                            <option style={{ fontWeight: "bolder" }}>Present</option>
                            <option style={{ fontWeight: "bolder" }}>Absent</option>
                        </select>
                    </div>


                </div>


                <div className="row mt-5">
                    {/* <div className="col-9 px-5 d-flex align-items-center">
                        <p>Go to Shopping <Link to='/' className='me-4' style={{ color: "black", marginLeft: "3px" }}><ArrowRightOutlined /></Link></p>
                    </div> */}


                    <div className="col-3 d-flex justify-content-end">
                        <button className='btn btn-danger' style={{ borderRadius: "0px", height: "60px", width: "110px" }} onClick={handleUpdate} loading={isProcessing}>Updata</button>
                    </div>
                </div>
            </div>
        </>
    )
}
