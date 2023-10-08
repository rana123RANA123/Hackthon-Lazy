import React, { useEffect, useState } from 'react'
import '../scss/Sidebar.scss'
import { CloseOutlined, MenuOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { AiOutlineUsergroupAdd, AiOutlineRead , AiOutlineBorderInner, AiOutlineArrowUp} from "react-icons/ai"
import { useAuthContext } from '../contexts/AuthContext'
import { message } from 'antd'
import { signOut } from 'firebase/auth'
import { auth, firestore } from '../config/firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore'


export default function SideBar() {

    const { dispatch } = useAuthContext()
    const [allDocuments, setAllDocuments] = useState([])
    const [documents, setDocuments] = useState([])
    const [allDocuments2, setAllDocuments2] = useState([])
    const [documents2, setDocuments2] = useState([])
    const [todo, setTodo] = useState({})

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                message.success("Signout successful")
                dispatch({ type: "SET_LOGGED_OUT" })
            })
            .catch(err => {
                message.error("Signout not successful")
            })
    }


    const specialTodos = async () => {
        const colRef = collection(firestore, "uploadCourses")
        const q = query(colRef, where("make", "==", "courses"))


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


    useEffect(() => {
        specialTodos()
    }, [specialTodos])


    const specialTodos2 = async () => {
        const colRef = collection(firestore, "uploadProduct")
        const q = query(colRef, where("make", "==", "profile"))


        onSnapshot(q, (snapshot) => {
            let stickynotes = []
            snapshot.docs.forEach((doc) => {
                stickynotes.push({ ...doc.data(), id: doc.id })
            })
            setAllDocuments2(stickynotes)
            setDocuments2(stickynotes)
            console.log(stickynotes)
        })

    }


    useEffect(() => {
        specialTodos2()
    }, [specialTodos2])


    console.log(specialTodos)


    return (

        <div style={{ position: "fixed" }}>
            <aside>
                <p> Menu </p>
                <Link to='/'>
                    <i class="fa fa-user-o" aria-hidden="true"></i>
                    <AiOutlineUsergroupAdd /><span className='ms-2'>Students</span> ({documents2.length})
                </Link>
                <Link to='/courses'>
                    <i class="fa fa-laptop" aria-hidden="true"></i>
                    <AiOutlineRead /><span className='ms-2'>Courses</span> ({documents.length})
                </Link>
                <Link to='/attendance'>
                    <i class="fa fa-clone" aria-hidden="true"></i>
                    <AiOutlineBorderInner /><span className='ms-2'>Attendance</span>
                </Link>
                {/* <Link to='/graph'>
                    <i class="fa fa-clone" aria-hidden="true"></i>
                    Chart
                </Link> */}
                <Link to='/dashboard/uploadCourses'>
                    <i class="fa fa-star-o" aria-hidden="true"></i>
                    <AiOutlineArrowUp /><span className='ms-2'>Upload Courses</span>
                </Link>
                <Link to='/dashboard/uploadStudent'>
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                    <AiOutlineArrowUp /> <span className='ms-1'>Upload Student</span>
                </Link>

                <button className='btn btn-primary px-4 py-2' onClick={handleLogout} style={{ position: "relative", top: "200px" }}>Logout</button>
            </aside>

            {/* <div class="social">
                <a href="https://www.linkedin.com/in/florin-cornea-b5118057/" target="_blank">
                    <i class="fa fa-linkedin"></i>
                </a>
            </div> */}
        </div>
    )
}
