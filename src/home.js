import { GrAdd } from 'react-icons/gr';
import iconplus from './assets/tabler_plus.svg'
import emptyImg from './assets/emptysstate.png'
import iconPlus from './assets/icon-plust.svg'
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState, CSSProperties  } from 'react';
import { PiTrashLight } from 'react-icons/pi';
import ClipLoader from "react-spinners/ClipLoader";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    const [dataActivity, setDataActivity] = useState(null)
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    const MySwal = withReactContent(Swal)

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
    const RemoveDataApi = async (id) => {
        
        MySwal.fire({
            title: <p>Delete Data</p>,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Delete',

          }).then( async(result) => {
            if (result.isConfirmed) {
                await axios.delete('https://todo.api.devcode.gethired.id/activity-groups/'+id)
                .then((response) => {
                    setLoading(true)
                    getDataactivity();
                })
                MySwal.fire('Delete!', '', 'success')
              } else if (result.isDenied) {
                MySwal.fire('Cancel Delete', '', 'info')
              }
            // return MySwal.fire(<p>Shorthand works too</p>)
          })
    }
    const goTopage = (id) => {
        navigate('/task/detail/'+id)
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
            <div data-cy="activity-empty-state">
             <div className="col-sm-12 px-5 pt-5">
                        <div className="mb-3 row">
                            <div className="col-sm-6">
                                <h1>Activity</h1>
                            </div>
                            <div className="col-sm-6">
                                <button className="btn btn-sm btn-primary float-end btn-add" onClick={submitData} disabled={loading}><img src={iconplus} /> Tambah</button>
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
                                <div className='title'>{b.title}</div>
                                <div className='click-action' onClick={(e) => goTopage(b.id)}></div>
                                <div className='bottom-text pe-5'>{moment(b.created_at).format('DD MMM YYYY')}</div>
                                <div className='icon float-end'>
                                    <a href='#' onClick={(e) => RemoveDataApi(b.id)}><PiTrashLight /></a>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
            </div>
        </>)
    }
}
export default HomePage;