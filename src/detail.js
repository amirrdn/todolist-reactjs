import { AiOutlineLeft } from 'react-icons/ai';
import iconplus from './assets/tabler_plus.svg'
import img2 from     './assets/todo-empty-state-detail.png'
import { Link, useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { HiOutlinePencil } from 'react-icons/hi';
import { BsTrash } from 'react-icons/bs';
import ClipLoader from "react-spinners/ClipLoader";

const DetailPage = () => {
    const [show, setShow] = useState(false);
    const [vform, setVform] = useState(null);
    const [items, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    const MySwal = withReactContent(Swal);
    const [onEdit, setOnedit] = useState(false)
    const [titlepage, setTitlepage] = useState('');
    const [action, setAction] = useState('view');
    const {id} = useParams();
    const optpriority = [
        {
            text: 'Very High',
            value: 'very-high'
        },
        {
            text: 'High',
            value: 'high'
        },
        {
            text: 'Medium',
            value: 'medium'
        },
        {
            text: 'Low',
            value: 'low'
        },
        {
            text: 'Very Low',
            value: 'very-low'
        },
    ]
    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };
    useEffect(() => {
        getDetail()
    }, [])
    const getDetail = async() => {
        await axios.get('https://todo.api.devcode.gethired.id/activity-groups/'+id)
        .then((response) => {
            const dataRes = response.data;
            setTitlepage(dataRes.title)
            setItem(dataRes.todo_items);
            setLoading(false)
        })
    }
    const onChangeForm = (e) => {
        setVform({...vform,[e.target.name]: e.target.value})
    }
    const SelectedValue = (e) => {
        setVform({...vform,priority: e.target.value})
    }
    const handleClose = () => {
        setShow(false)
    }
    const submitForm = () => {
        const data = {
            title: vform.title,
            activity_group_id: id,
            priority: vform.priority
        }
        axios.post('https://todo.api.devcode.gethired.id/todo-items', data)
        .then(() => {
            MySwal.fire('Submit', '', 'success');
            setShow(false)
            getDetail();
        })
    }
    const showModalEdit = (id) => {
        const arr = items.filter(mf => mf.id === id).map((mf, index) => {
            return mf;
        })
        if(arr){
            setVform(arr[0]);
        }
        setAction('edit')
        setShow(true)
        console.log(arr)
    }
    const updateForm = async () => {
        setLoading(true)
        const data = {
            title: vform.title,
            activity_group_id: id,
            priority: vform.priority
        }
        await axios.patch('https://todo.api.devcode.gethired.id/todo-items/'+vform.id, data)
        .then(() => {
            getDetail();
            setShow(false)
        })
    }
    const RemoveDataApi = async (id) => {
        
        MySwal.fire({
            title: <p>Delete Data</p>,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Delete',

          }).then( async(result) => {
            if (result.isConfirmed) {
                await axios.delete('https://todo.api.devcode.gethired.id/todo-items/'+id)
                .then((response) => {
                    setLoading(true)
                    getDetail();
                })
                MySwal.fire('Delete!', '', 'success')
              } else if (result.isDenied) {
                MySwal.fire('Cancel Delete', '', 'info')
              }
            // return MySwal.fire(<p>Shorthand works too</p>)
          })
    }
    if(loading){
        return(<>
            <ClipLoader
            className='loader'
            color={color}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
        
        </>)
    }else{
        return(<>
            <div data-cy="activity-empty-state">
            <div className="col-sm-12 pt-5">
                <div className="mb-3 row">
                    <div className="col-sm-6" >
                        <Link to='/'><AiOutlineLeft className='svg-icon' /></Link>
                        {
                            !onEdit ?
                            <h1 className='title-detail'>New Activity <a href="#" onClick={(e) => setOnedit(true)}><HiOutlinePencil /></a></h1> :
                            <input type='text' onMouseLeave={(e) => {setOnedit(false)}} value={titlepage} className='form-control edit-control' onBlur={(e) => {setOnedit(false)}}/>
                        }
                    </div>
                    <div className="col-sm-6">
                        <button className="btn btn-sm btn-primary float-end btn-add" onClick={(e) => setShow(true)}><img src={iconplus} /> Tambah</button>
                    </div>
                </div>
            </div>
            {
                items === null ? 
                <div className='col-sm-12 pt-5'>
                    <div className="position-relative">
                        <div className="position-absolute top-0 start-50 translate-middle-x">
                            <img src={img2} />
                        </div>
                    </div>
                </div> : ''
            }
            {
                items && items.map((b, ix) => (
                    <div key={ix}>
                        <div className='box-detail p-4'>
                            <div className='mb-3'>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    {
                                        b.priority === 'high' ?
                                        <div className='bullet bg-red'></div> : ''
                                    }
                                    {
                                        b.priority === 'very-high' ?
                                        <div className='bullet bg-yellow'></div> : ''
                                    }
                                    {
                                        b.priority === 'medium' ?
                                        <div className='bullet bg-yellow'></div> : ''
                                    }
                                    {
                                        b.priority === 'low' ?
                                        <div className='bullet bg-purprle'></div> : ''
                                    }
                                    {
                                        b.priority === 'very-low' ?
                                        <div className='bullet bg-ungu'></div> : ''
                                    }
                                    <label className="form-check-label" for="flexCheckDefault">
                                        {b.title}
                                    </label>
                                    </div>
                                    <a href='#' onClick={(e) => showModalEdit(b.id)}><HiOutlinePencil /></a>
                                    <a href='#' className='float-end' onClick={(e) => RemoveDataApi(b.id)}><BsTrash /></a>
                                </div>
                            </div>
                    </div>
                ))
            }
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='mb-3'>
                    <label className='form-label'>Nama List Item</label>
                    <input className='form-control' name='title' value={vform === null ? '' : vform.title} onChange={(e) => onChangeForm(e)}/>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Priority</label>
                    <select className="form-select" aria-label="Default select example" onChange={(e) => SelectedValue(e)}>
                        <option selected>Select Priority</option>
                        {
                            optpriority.map((b, iopt) => (
                                <option value={b.value} selected={vform && vform !== null && vform && vform.priority === b.value ? 'selected' : false} key={iopt}>{b.text}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='mb-3'>
                    {
                        action === 'view' ?
                        <button className='btn btn-primary float-end' onClick={submitForm}>Submit</button>
                        : <button className='btn btn-primary float-end' onClick={updateForm}>Update</button>
                    }
                </div>
            </Modal.Body>
            
        </Modal>
        </div>
        </>)
    }
}
export default DetailPage;