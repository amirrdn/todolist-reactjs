import { AiOutlineLeft } from 'react-icons/ai';
import iconplus from './assets/tabler_plus.svg'
import img2 from     './assets/todo-empty-state-detail.png'

const DetailPage = () => {
    return(<>
        <div className="col-sm-12 pt-5">
            <div className="mb-3 row">
                <div className="col-sm-6">
                    <AiOutlineLeft className='svg-icon' />
                    <h1 className='title-detail'>New Activity</h1>
                </div>
                <div className="col-sm-6">
                    <button className="btn btn-sm btn-primary float-end btn-add" ><img src={iconplus} /> Tambah</button>
                </div>
            </div>
        </div>
        <div className='col-sm-12 pt-5'>
            <div class="position-relative">
                <div class="position-absolute top-0 start-50 translate-middle-x">
                    <img src={img2} />
                </div>
            </div>
        </div>
    </>)
}
export default DetailPage;