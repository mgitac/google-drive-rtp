import MobileScreenShareIcon from '@material-ui/icons/MobileScreenShare';
import DevicesIcon from '@material-ui/icons/Devices';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import styled from 'styled-components';
import { Modal } from '@material-ui/core';
import { useState } from 'react';
import { db, storage } from '../firebase';
import firebase from "firebase";

const SidebarContainer = styled.div`
    margin-top: 10px;
`
const SidebarBtn = styled.div`
    button {
        background: transparent;
        border: 1px solid lightgray;
        display: flex;
        align-items: center;
        border-radius: 40px;
        padding:5px 10px;
        box-shadow:2px 2px 2px #ccc;
        margin-left: 20px;
        span {
            font-size: 16px;
            margin-right: 20px;
            margin-left: 10px;
        }
    }
`

const SidebarOptions = styled.div`
    margin-top: 10px;
    .progress_bar {
        padding: 0px 20px;
    }
    .progress_bar span {
        display: block;
        color:#333;
        font-size: 13px;
    }
`

const SidebarOption = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 20px;
    border-radius: 0px 20px 20px 0px;
    &:hover{
        background: whitesmoke;
        cursor: pointer;
    }
    svg.MuiSvgIcon-root {
        color:rgb(78, 78, 78);
    }
    span {
        margin-left: 15px;
        font-size: 13px;
        font-weight: 500;
        color:rgb(78, 78, 78)
    }
`

const ModalPopup = styled.div`
    top: 50%;
    background-color: #fff;
    width: 500px;
    margin: 0px auto;
    position: relative;
    transform: translateY(-50%);
    padding: 10px;
    border-radius: 10px;
`

const ModalHeading = styled.div`
    text-align: center;
    border-bottom: 1px solid lightgray;
    height: 40px;
`

const ModalBody = styled.div`
    input.modal__submit {
        width: 100%;
        background: darkmagenta;
        padding: 10px 20px;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 5px;
        font-size: 16px;
        border: 0;
        outline: 0;
        border-radius: 5px;
        cursor: pointer;
        margin-top:20px
    }
    input.modal__file {
        background: whitesmoke;
        padding: 20px;
        color: #000;
        display: block;
        margin-top:20px
    }
`

const UploadingPara = styled.p`
    background: green;
    color: #fff;
    margin: 20px;
    text-align: center;
    padding: 10px;
    letter-spacing: 1px;
`

const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState(null);

    const handleFile = e => {
        if(e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleUpload = e => {
        e.preventDefault()
        setUploading(true)
        storage.ref(`files/${file.name}`).put(file).then(snapshot => {
            storage.ref("files").child(file.name).getDownloadURL().then(url => {
                db.collection("myfiles").add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    filename: file.name,
                    fileURL: url,
                    size: snapshot._delegate.bytesTransferred
                })
                setUploading(false)
                setFile(null)
                setOpen(false)
            })
        })
    }

    return (
        <>
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalPopup>
                <form onSubmit={handleUpload}>
                    <ModalHeading>
                        <h3>Select file you want to upload</h3>
                    </ModalHeading>
                    <ModalBody>
                        {uploading ? <UploadingPara>Uploading...</UploadingPara> : (
                            <>
                                <input type="file" className='modal__file' onChange={handleFile} />
                                <input type="submit" className='modal__submit' />
                            </>
                        )}
                    </ModalBody>
                </form>
            </ModalPopup>
        </Modal>
        <SidebarContainer>
            <SidebarBtn>
                <button onClick={() => setOpen(true)}>   
                    <span>New</span>
                </button>
            </SidebarBtn>

            <hr />
            <SidebarOptions>
                <SidebarOption>
                    <CloudQueueIcon />
                    <span>Storage</span>
                </SidebarOption>
                <div className="progress_bar">
                    <progress size="tiny" value="10" max="100" />
                    <span>20 GB  of 200 GB used</span>
                </div>
            </SidebarOptions>
        </SidebarContainer>
        </>
    )
}
export default Sidebar