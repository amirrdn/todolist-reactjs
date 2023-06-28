import { GrAdd } from 'react-icons/gr';
import iconplus from './assets/tabler_plus.svg'
import emptyImg from './assets/emptysstate.png'
import iconPlus from './assets/icon-plust.svg'
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState, CSSProperties  } from 'react';
import { PiTrashLight } from 'react-icons/pi';
import { LuAlertCircle } from 'react-icons/lu';
import ClipLoader from "react-spinners/ClipLoader";
import {Link, useNavigate} from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Modal } from "react-bootstrap";
import imgDanger from './assets/danger.svg'

const HomePage = () => {
    const navigate = useNavigate();
    const [dataActivity, setDataActivity] = useState(null)
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("#ffffff");
    const [openmodal, setOpenmodal] = useState(false);
    const [notifModal, setNotifModal] = useState(false);
    const [tmpid, setTmpid] = useState(null);
    const [titleModal, setTitlemodal] = useState(null)

    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };
    useEffect(() => {
        getDataactivity();
      }, [])
      const getDataactivity = async() => {
        const config = {
          params: {
            email: "4mir.rdn@gmail.com",
          }
        }
        await axios.get('https://todo.api.devcode.gethired.id/activity-groups?email=4mir.rdn@gmail.com')
        .then((response) => {
          const DataResponse = response.data;
          setDataActivity(DataResponse.data)
          setLoading(false)
        })
    }

    const submitData = async () => {
        const dateNow = moment().format('DD MM YYYY');
        const data = {
            email: "4mir.rdn@gmail.com",
            title: "New Task "+dateNow
        }
        await axios.post('https://todo.api.devcode.gethired.id/activity-groups/', data)
        .then((response) => {
            setLoading(true);
            getDataactivity();
        })
    }
    const RemoveDataApi = (id, title) => {
        setTmpid(id)
        setTitlemodal(title)
        setOpenmodal(true)
    }
    const actionRemove = async () => {
        await axios.delete('https://todo.api.devcode.gethired.id/activity-groups/' + tmpid)
        .then((response) => {
            setLoading(true)
            getDataactivity();
            setOpenmodal(false)
            setNotifModal(true)
        })
    }
    const goTopage = (id) => {
        navigate('/task/detail/'+id)
    }
    const closeModal = () => {
        setOpenmodal(false);
    }
    const closeNotif = () => {
        setNotifModal(false)
    }
    if(loading){
        return(<>
            <ClipLoader
            data-cy="activity-empty-state"
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
                    <title>Todo Task</title>
                </Helmet>
            <div className="home-page">
                <div data-cy="modal-delete">
                    <Modal show={openmodal} onHide={closeModal} backdrop="static" size="sm">
                        <Modal.Header>
                            <Modal.Title>
                                <div className='mx-auto d-block'>
                                <img src={imgDanger} data-cy="modal-delete-icon"/>

                                </div>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p class="pl-3 pr-3"><p>Apakah anda yakin menghapus activity <strong>“{titleModal}”</strong>?</p></p>
                        </Modal.Body>
                        <Modal.Footer>
                            <button data-cy="modal-delete-confirm-button" type='button' className='btn btn-danger' onClick={actionRemove}>Hapus</button>
                            <button data-cy="modal-delete-cancel-button" type='button' className='btn btn-light' onClick={closeModal}>Batal</button>
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
             <div className="col-sm-12 px-5 pt-5">
                        <div className="mb-3 row">
                            <div className="col-sm-6">
                                <h1 data-cy='activity-title'>Activity</h1>
                            </div>
                            <div className="col-sm-6">
                                <button className="btn btn-sm btn-primary float-end btn-add" data-cy="activity-add-button" onClick={submitData} disabled={loading}><img src={iconplus} /> Tambah</button>
                            </div>
                        </div>
                    </div>
            {
                dataActivity === null ?
                <div>
                   
                    <div className='col-sm-12'>
                        <div className='activity-empty'>
                            <div className='box-img'>
                                <img src={emptyImg} />
                            </div>
                            <div className='box-button'>
                                <button className='btn btn-sm btn-primary' onClick={submitData}>
                                    <img src={iconPlus} />
                                </button>
                            </div>
                            <h2 className='text-activity-info'>Buat activity pertamamu</h2>
                        </div>
                    </div> 

                </div>
                :
                <div className='col-sm-12 py-5'>
                    {
                        dataActivity.map((b, index) => (
                            <div className='box-acitivites' key={index}>
                                <Link data-cy="activity-item" to={`/task/detail/${b.id}`}>
                                    <h2 data-cy="activity-item-title" className='title'>{b.title}</h2>
                                    <div className='click-action'></div>
                                </Link>
                                <div data-cy="activity-item-date" className='bottom-text pe-5'>{moment(b.created_at).format('DD MMM YYYY')}</div>
                                <div className='icon float-end'>
                                    <button data-cy='activity-item-delete-button' className="activity-item-delete-button" onClick={(e) => RemoveDataApi(b.id, b.title)}><PiTrashLight /></button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
            
            </div>
            </HelmetProvider>
        </>)
    }
}
export default HomePage;