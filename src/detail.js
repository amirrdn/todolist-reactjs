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
import redImg from "./assets/Ellipse 445.svg"
import yellowImg from "./assets/yellow.svg"
import blueImg from "./assets/medium.svg"
import blue2 from "./assets/blue.svg"
import purpleImg from "./assets/purple.svg"
import sortImg from "./assets/tabler_arrows-sort.svg"
import terbaruImg from "./assets/terbaru.svg"
import terlamaImg from "./assets/terlama.svg"
import azImg from "./assets/az.svg"
import zaImg from "./assets/za.svg"
import BelumselesaiImg from "./assets/belum-selesai.svg"
import { Dropdown } from 'primereact/dropdown';
import { SplitButton } from 'primereact/splitbutton';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import imgDanger from './assets/danger.svg'
import { LuAlertCircle } from 'react-icons/lu';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

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
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [showBox, setShowbox] = useState(false);
    const [sortDataitem, setSortData] = useState(null);
    const [activeli, setActiveli] = useState(null)
    const [openmodal, setOpenmodal] = useState(false);
    const [notifModal, setNotifModal] = useState(false);
    const [tmpid, setTmpid] = useState(null);
    const [titleModal, setTitlemodal] = useState(null)

    const {id} = useParams();
    const optpriority = [
        {
            text: 'Very High',
            value: 'very-high',
            image: redImg
        },
        {
            text: 'High',
            value: 'high',
            image: yellowImg
        },
        {
            text: 'Medium',
            value: 'medium',
            image: blueImg
        },
        {
            text: 'Low',
            value: 'low',
            image: blue2
        },
        {
            text: 'Very Low',
            value: 'very-low',
            image: purpleImg
        },
    ]
    const itemsSplit = [
        {
            label: 'Terbaru',
            icon: '<img src='+blueImg+' />',
            command: () => {
            }
        },
        {
            label: 'Terlama',
            icon:  '<img src='+blueImg+' />',
            command: () => {
            }
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
        setVform({...vform,priority: e})
    }
    const handleClose = () => {
        setShow(false)
    }
    const submitForm = (event) => {
        event.preventDefault();
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
    const RemoveDataApi = async (id, title) => {
        setTmpid(id)
        setTitlemodal(title)
        setOpenmodal(true)
    }
    const actionRemove = async () => {
        await axios.delete('https://todo.api.devcode.gethired.id/todo-items/' + tmpid)
        .then((response) => {
            setLoading(true)
            getDetail();
            setOpenmodal(false)
            setNotifModal(true)
        })
    }
    const onChangetitle = (e) => {
        setTitlepage(e.target.value)
    }
    const updateData = async (id) => {
        const data = {
            title: titlepage
        }
        await axios.patch('https://todo.api.devcode.gethired.id/activity-groups/'+id, data)
        .then(() => {
            setOnedit(false)
            getDetail();
        })
    }
    const selectedPriority = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <img alt={option.text} src={option.image} className={`mr-2 flag flag-${option.value}`} style={{ width: '18px' }} />
                    <div className='label-dropdown'>{option.text}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const priorityOptionTemplate = (option) => {
        return (
            <div data-cy="modal-add-priority-item" className="flex align-items-center">
                <img alt={option.text} src={option.image} />
                <div>{option.text}</div>
            </div>
        );
    };

    const panelFooterTemplate = () => {
        return (
            <div className="py-2 px-3">
                {selectedCountry ? (
                    <span>
                        <b>{selectedCountry.name}</b> selected.
                    </span>
                ) : (
                    'No country selected.'
                )}
            </div>
        );
    };
    const setStatus = async (event, id) => {
        let active = 0;
        const arritems = items && items.filter(x => x.id === id)
        .map((x, index) => {
            return x;
        })
        if(arritems && event.target.checked){
            active = 1;
            console.log(arritems[0])
        }
        const data = {
            is_active: active,
            priority: arritems[0].priority
        }

        await axios.patch('https://todo.api.devcode.gethired.id/todo-items/'+id, data)
        .then(() => {
            setLoading(true)
            getDetail()
        })
    }
    useEffect(() => {
        if(sortDataitem && sortDataitem !== null){
            SortDataFc(sortDataitem)
        }
    }, [sortDataitem])
    const SortDataFc = (val) => {
        setActiveli(val)
        if(val === 'desc'){
            const ditems = items.sort((a, b) => (a.id > b.id) ? 1 : -1)
            setItem(ditems);
        }else if(val === 'asc'){
            const ditems = items.sort((a, b) => (a.id < b.id) ? 1 : -1)
            setItem(ditems);
        }else if(val === 'belum'){
            const ditems = items.sort((a, b) => (a.id < b.id && a.is_active === 0) ? 1 : -1)
            setItem(ditems);
        }
    }
    const closeModal = () => {
        setOpenmodal(false);
    }
    const closeNotif = () => {
        setNotifModal(false)
    }
    const showModalForm = () => {
        setShow(true)
    }
    const EmptyState = () => {
        return(<>
            <div data-cy="todo-empty-state"> 
                <div className='col-sm-12 pt-5' onClick={showModalForm}>
                    <div className="position-relative">
                        <div className="position-absolute top-0 start-50 translate-middle-x">
                            <img src={img2} />
                        </div>
                    </div>
                </div> 
            </div>
        </>)
    }
    if(loading){
        return(<>
            <ClipLoader
            data-cy="todo-loader-state"
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
            <HelmetProvider>
                <Helmet>
                    <title>Detail {titlepage}</title>
                </Helmet>
            <div className="detail-page">
                
            <div className="col-sm-12 pt-5">
                <div className="mb-3 row">
                    <div className="col-sm-6" >
                        <Link data-cy="todo-back-button" to='/'><AiOutlineLeft className='svg-icon' /></Link>
                        {
                            !onEdit ?
                            <h1 className='title-detail'><span data-cy="todo-title">{titlepage}</span> <a href="#" data-cy="todo-title-edit-button" onClick={(e) => setOnedit(true)}><HiOutlinePencil /></a></h1> 
                            :
                            <input type='text' onChange={onChangetitle} onMouseLeave={(e) => {updateData(id)}} value={titlepage} className='form-control edit-control' onBlur={(e) => {updateData(id)}}/>
                        }
                    </div>
                    <div className="col-sm-6">
                        <button  data-cy="todo-sort-button" className='btn btn-link float-end sort-icon todo-sort-button' onClick={(e) => setShowbox(true)}>
                            <img src={sortImg} />
                        </button>
                        <button data-cy="todo-add-button" className="btn btn-sm btn-primary float-end btn-add todo-add-button" onClick={showModalForm}>
                            <img src={iconplus} /> Tambah
                        </button>
                    </div>
                        {
                            showBox ?
                            <ul className='box' onMouseLeave={(e) => {setShowbox(false)}}>
                                <li data-cy={`${activeli === 'desc' ? 'sort-selection-selected' : ''}`}>
                                    <a href='#' onClick={(e) => setSortData('desc')}><img src={terbaruImg} data-cy="sort-selection-icon" /> 
                                    <span data-cy="sort-selection-title">Terbaru</span>
                                    </a> 
                                    <i className={`pi pi-check float-end ${activeli === 'desc' ? '' : 'none'}`}></i>
                                </li>
                                <li data-cy={`${activeli === 'asc' ? 'sort-selection-selected' : ''}`}>
                                    <a href='#' onClick={(e) => setSortData('asc')}><img src={terlamaImg} data-cy="sort-selection-icon"/> 
                                    <span data-cy="sort-selection-title">Terlama</span>
                                    </a>
                                    <i className={`pi pi-check float-end ${activeli === 'asc' ? '' : 'none'}`}></i>
                                </li>
                                <li data-cy={`${activeli === 'az' ? 'sort-selection-selected' : ''}`}>
                                    <a href='#' onClick={(e) => setSortData('asc')}><img src={azImg} data-cy="sort-selection-icon" /> 
                                    <span data-cy="sort-selection-title">A-Z</span>
                                    </a>
                                    <i className={`pi pi-check float-end ${activeli === 'az' ? '' : 'none'}`}/>
                                </li>
                                <li data-cy={`${activeli === 'za' ? 'sort-selection-selected' : ''}`}>
                                     <a href='#' onClick={(e) => setSortData('za')}><img src={zaImg} data-cy="sort-selection-icon" /> 
                                     <span data-cy="sort-selection-title">Z-A</span>
                                     </a>
                                     <i className={`pi pi-check float-end ${activeli === 'az' ? '' : 'none'}`}></i>
                                </li>
                                <li data-cy={`${activeli === 'belum' ? 'sort-selection-selected' : ''}`}> 
                                    <a href='#' onClick={(e) => setSortData('belum')}><img src={BelumselesaiImg} data-cy="sort-selection-icon" /> 
                                    <span data-cy="sort-selection-title">Belum Selesai</span>
                                    </a>
                                    <i className={`pi pi-check float-end ${activeli === 'belum' ? '' : 'none'}`} />
                                </li>
                            </ul> : ''
                        }
                    </div>
            </div>
            {
                items.length === 0 ? EmptyState() : ''
                
            }
            {
                items && items.map((b, ix) => (
                    <div key={ix}>
                        <div className='box-detail p-4' data-cy="todo-item">
                            <div className='mb-3'>
                                <div className="form-check">
                                    <input data-cy="todo-item-checkbox" className="form-check-input" type="checkbox" value="" onChange={(e) => setStatus(e, b.id)} 
                                    checked={b.is_active === 1 ? true : false}
                                    />
                                    <label data-cy="todo-item-title" className={`form-check-label ${b.is_active === 1 ? 'status-done' : ''}`} for="flexCheckDefault">
                                        {b.title}
                                    </label>
                                    {
                                        b.priority === 'high' ?
                                        <div className='bullet bg-red' data-cy={`todo-item-${b.priority}-indicator`} ></div> : ''
                                    }
                                    {
                                        b.priority === 'very-high' ?
                                        <div className='bullet bg-yellow' data-cy={`todo-item-${b.priority}-indicator`} ></div> : ''
                                    }
                                    {
                                        b.priority === 'medium' ?
                                        <div className='bullet bg-yellow' data-cy={`todo-item-${b.priority}-indicator`} ></div> : ''
                                    }
                                    {
                                        b.priority === 'low' ?
                                        <div className='bullet bg-purprle' data-cy={`todo-item-${b.priority}-indicator`} ></div> : ''
                                    }
                                    {
                                        b.priority === 'very-low' ?
                                        <div className='bullet bg-ungu' data-cy={`todo-item-${b.priority}-indicator`} ></div> : ''
                                    }
                                    
                                    </div>
                                    <button type='button' data-cy="todo-item-edit-button" className='todo-item-edit-button' onClick={(e) => showModalEdit(b.id)}><HiOutlinePencil /></button>
                                    <button type='button' className='todo-item-delete-button float-end' onClick={(e) => RemoveDataApi(b.id, b.title)}><BsTrash data-cy="todo-item-delete-button"/></button>
                                </div>
                            </div>
                    </div>
                ))
            }
            <Modal show={show} onHide={handleClose}>
            <Modal.Header data-cy="modal-add-close-button" closeButton>
            <Modal.Title data-cy={`modal-${action === 'view' ? 'add-' : 'edit-'}`} >
                {
                    action === 'view' ? 'Tambah List Item' : 'Edit List Item'
                }
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form data-cy="modal-add" onSubmit={submitForm}>
                    <div className='mb-3'>
                        <label data-cy="modal-add-name-title" className='form-label'>Nama List Item</label>
                        <input data-cy='modal-add-name-input' className='form-control' placeholder="Tambahkan nama list item" id='title' name='title' value={vform === null ? '' : vform.title} onChange={(e) => onChangeForm(e)}/>
                    </div>
                    <div className='mb-3'>
                        <div className='col-sm-12'>
                            <label data-cy="modal-add-priority-title" className='form-label'>Priority</label>
                        </div>
                        <div className='col-sm-12'>
                            <Dropdown value={vform === null ? '' : vform.priority} onChange={(e) => SelectedValue(e.value)} options={optpriority} optionLabel="text" placeholder="Select a Priority" 
                                data-cy='modal-add-priority-dropdown'
                                valueTemplate={selectedPriority} itemTemplate={priorityOptionTemplate} className="w-full md:w-14rem" panelFooterTemplate={panelFooterTemplate} />
                        </div>
                    </div>
                    <div className='mb-3'>
                        {
                            action === 'view' ?
                            <button data-cy="modal-add-save-button" type='submit' className='btn btn-primary float-end' disabled={vform === null ? true : false} >Simpan</button>
                            : <button className='btn btn-primary float-end' type='submit' data-cy="modal-edit-save-button" >Update</button>
                        }
                    </div>

                </form>
            </Modal.Body>
            
        </Modal>
        <div data-cy="modal-delete">
                    <Modal show={openmodal} onHide={closeModal} backdrop="static" size="sm">
                        <Modal.Header>
                            <Modal.Title>
                                <div className='mx-auto d-block'>
                                <img src={imgDanger} />

                                </div>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p class="pl-3 pr-3"><p>Apakah anda yakin menghapus activity <strong>“{titleModal}”</strong>?</p></p>
                        </Modal.Body>
                        <Modal.Footer>
                            <button data-cy="modal-delete-cancel-button" type='button' className='btn btn-light' onClick={closeModal}>Batal</button>
                            <button data-cy='modal-delete-confirm-button' type='button' className='btn btn-danger' onClick={actionRemove} >Hapus</button>
                        </Modal.Footer>
                    </Modal>
                </div>
            <div data-cy='modal-information'>
                <Modal id='notif-modal' show={notifModal} onHide={closeNotif} backdrop="static" size="sm">
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <p><LuAlertCircle data-cy="modal-information-icon"/> <span data-cy="modal-information-title">Data Berhasil di hapus</span></p>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
        </HelmetProvider>
        </>)
    }
}
export default DetailPage;