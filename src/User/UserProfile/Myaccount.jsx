import React, { useState, useCallback, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Spinner, Accordion } from 'react-bootstrap';
import Footer from '../../Common/Footer';
import UserHeader from '../Common/UserHeader';
import ProfileNav from './Common/ProfileNav';
import { FaExclamationTriangle, FaAddressCard, FaCheckCircle } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { DELETE_DOC, GET_DOC, UPLOAD_DOC } from "../../Url"



export default function Myaccount() {
    const bundledata = JSON.parse(sessionStorage.getItem("BUNDLEDATA"));
    const [show, setShow] = useState(false);
    const [imgModalShow, setImgModalShow] = useState(false);
    const [load, setload] = useState(true);
    const [file, setFile] = useState([]);
    const [docType, setDocType] = useState();
    const [image, setImage] = useState();
    const [uploadDateAdd, setUploadDateAdd] = useState()
    const [uploadDateId, setUploadDateId] = useState()
    const [fileName, setFileName] = useState()
    const [loading, setLoading] = useState(false)
    const trackingToken = (sessionStorage.getItem("TRACKINGTOKEN"));
    const firstName = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerName[0].Name.first;
    const lastName = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerName[0].Name.last;
    const houseNumber = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerAddress[0].CreditAddress.houseNumber;
    const streetName = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerAddress[0].CreditAddress.streetName;
    const streetType = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerAddress[0].CreditAddress.streetType;
    const city = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerAddress[0].CreditAddress.city;
    const state = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerAddress[0].CreditAddress.stateCode;
    const zip = bundledata.BundleComponent[6].TrueLinkCreditReportType.Borrower.BorrowerAddress[0].CreditAddress.postalCode;

    const handleClose = async () => {
        setShow(false)
        setImgModalShow(false)
    }



    //******************* */ api for upload image *********************************
    const modalhandleClose = async () => {
        const formData = new FormData();
        formData.append("fileName", file[0]);
        formData.append("trackingToken", trackingToken);

        if (docType === "address") {
            formData.append("doc_type", "addressproof");
        }
        if (docType === "id") {
            formData.append("doc_type", "idproof");
        }
        setLoading(true)
        try {
            const data = await axios.post(UPLOAD_DOC, formData)
                .then((res) => {
                    console.log(res.data)
                    if (res.data.statusCode === 403) {
                        toast.error('Only png,jpg and jpeg file supported ', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored"
                        });
                    }
                    setLoading(false)
                    if (res.data.statusCode) {
                        setShow(false);
                    }
                })
                .catch((error) => {
                    console.log("error", error)
                })
        } catch (err) {
            console.log("err", err)
        }
    }



    //******************* */ show model *********************************
    const handleShow = (doc) => {
        if (fileName) {
            setFileName('')
        }
        setDocType(doc)
        setShow(true);
    }


    //******************* */ drag and drop file *********************************
    const onDrop = useCallback(acceptedFiles => {
        setFileName(acceptedFiles[0].name)
        setFile(acceptedFiles)
    }, [])
    const { getRootProps } = useDropzone({ onDrop })


    //******************* */ get add on address date  *********************************
    useEffect(() => {
        const article = {
            trackingToken: trackingToken,
            doc_type: "addressproof"
        }
        axios.post(GET_DOC, article)
            .then((data) => {
                if (data.data.statusCode === 200) {
                    var url = data.data.statusMsg
                    var url2 = parseInt(url.split("/")[4])
                    var date = new Date(url2 * 1000).toLocaleDateString('en-GB');
                    setUploadDateAdd(date)
                }
            })
            .catch((error) => {
                console.log("error", error)
            })
    })

    //******************* */ get add on id date  *********************************
    useEffect(() => {
        const article = {
            trackingToken: trackingToken,
            doc_type: "idproof"
        }
        axios.post(GET_DOC, article)
            .then((data) => {
                if (data.data.statusCode === 200) {
                    var url = data.data.statusMsg
                    var url2 = parseInt(url.split("/")[4])
                    var date = new Date(url2 * 1000).toLocaleDateString('en-GB');
                    setUploadDateId(date)
                }
            })
            .catch((error) => {
                console.log("error", error)
            })
    })


    //*******************view doc *********************************
    const getDoc = (docType) => {

        var article
        if (docType === "address") {
            article = {
                trackingToken: trackingToken,
                doc_type: "addressproof"
            }
        }
        if (docType === "id") {
            article = {
                trackingToken: trackingToken,
                doc_type: "idproof"
            }
        }

        axios.post(GET_DOC, article)
            .then((data) => {
                console.log(data.data)
                if (data.data.statusMsg === "please upload your address proof") {
                    toast.error('please upload your address proof', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored"
                    });
                }

                if (data.data.statusCode === 200) {
                    console.log(data.data.statusMsg)
                    setImage(data.data.statusMsg)
                    setImgModalShow(true)
                }
            })
            .catch((error) => {
                console.log("error", error)
            })
    }


    //*******************Delete doc *********************************

    const deleteDoc = (docType) => {

        var article
        if (docType === "address") {
            article = {
                trackingToken: trackingToken,
                doc_type: "addressproof"
            }
        }
        if (docType === "id") {
            article = {
                trackingToken: trackingToken,
                doc_type: "idproof"
            }
        }

        axios.post(DELETE_DOC, article)
            .then((data) => {
                if (data.data.statusCode === 200) {
                    if (docType === "address") {
                        setUploadDateAdd('')
                    }

                    if (docType === "id") {
                        setUploadDateId('')
                    }

                    toast.success('Proof of address deleted successfully', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored"
                    });
                }
            })
            .catch((error) => {
                console.log("error", error)
            })
    }






    return (
        <>
            <UserHeader />

            <ProfileNav
                title="My Account"
                menu1="Profile"
                menu3="Credit Report"
                url1="myaccount"
                url2="#"
                url3="#" />


            <section className='mb-5'>
                <Container>
                    <Row>
                        <Col lg={12} md={12}>
                            <div className='user_myaccount'>
                                <div className='details'>
                                    <h6 className='mb-5'>Personal Details</h6>
                                    <table className=" table text-start table-sm table-striped table-hover clientdetails" >
                                        <tbody>
                                            <tr>
                                                <td>FIRST NAME</td>
                                                <td ><b >{firstName}</b></td>
                                            </tr>
                                            <tr>
                                                <td>LAST NAME</td>
                                                <td><b>{lastName}</b></td>
                                            </tr>

                                            <tr>
                                                <td >ADDRESS</td>
                                                <td><b>{houseNumber + "  " + streetName + "  " + streetType}</b></td>
                                            </tr>
                                            <tr>
                                                <td >CITY</td>
                                                <td><b>{city}</b></td>
                                            </tr>
                                            <tr>
                                                <td >STATE</td>
                                                <td><b>{state}</b></td>
                                            </tr>
                                            <tr>
                                                <td >ZIP</td>
                                                <td><b>{zip}</b></td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>

                                <div className='documents' id='info'>
                                    <table className=" table  table-sm table-striped table-hover" >
                                        <tbody>
                                            <tr>
                                                <td colSpan="3" className='proofofaddress'>PROOF OF ADDRESS</td>
                                            </tr>
                                            <tr>
                                                {uploadDateAdd ?
                                                    <td><FaCheckCircle className='checkcircle' />Added on {uploadDateAdd} </td>
                                                    
                                                    :
                                                    <td className='addnew' onClick={() => handleShow("address")}><FaExclamationTriangle className='triangle_icon' />Add New</td>
                                                }

                                                <td className='text-end viewbtn' onClick={() => getDoc("address")}>View</td>
                                                <td className='text-center viewbtn' onClick={() => deleteDoc("address")}>Delete</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3" className='proofofaddress'>PHOTO ID</td>
                                            </tr>
                                            <tr>


                                                {uploadDateId ?
                                                    <td><FaCheckCircle className='checkcircle' />Added on {uploadDateId} </td>
                                                    :
                                                    <td className='addnew' onClick={() => handleShow("id")}><FaExclamationTriangle className='triangle_icon' />Add New</td>
                                                }

                                                <td className='text-end viewbtn' onClick={() => getDoc("id")}>View</td>
                                                <td className='text-center viewbtn' onClick={() => deleteDoc("id")}>Delete</td>
                                            </tr>
                                        </tbody>
                                    </table>



                                    <div className='myaccount_faq'>

                                        <p className='faq'>FAQ</p>
                                        <Accordion>
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>Why should I add my proof of address and photo ID?</Accordion.Header>
                                                <Accordion.Body>
                                                    It’s your right to dispute any account on your credit report. However, the credit bureaus have the right to refuse your disputes if they are unable to verify that you’re the one sending the dispute. You may receive a letter asking you to resubmit your disputes with the proper ID which will cause a delay. Once you upload your photo ID and proof of address, Credit Versio will automatically include those documents in every dispute letter that you create.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>What can I use as proof of address?</Accordion.Header>
                                                <Accordion.Body>
                                                    The credit bureaus want proof of your current address that’s less than sixty (60) days old, such as a utility bill (electricity, gas, water, trash, or cable). If you don’t have utilities in your name, use the upper section of your bank statement showing only your bank’s name and your name and current address. Or, you can use the cover page of an insurance document with your full name and current address.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="2">
                                                <Accordion.Header>What can I use for photo ID?</Accordion.Header>
                                                <Accordion.Body>
                                                    Provide a black and white or color copy of a current driver’s license, or state issued ID, or current passport.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                </div>
                            </div>


                            <div className='user_myaccount_doc'>
                                {/* <div className='documents'>
                                    <table className=" table  table-sm table-striped table-hover" >
                                        <tbody>
                                            <tr>
                                                <td colSpan="3" className='proofofaddress'>PROOF OF ADDRESS</td>
                                            </tr>
                                            <tr>
                                                {uploadDateAdd ?
                                                    <td><FaCheckCircle className='checkcircle' />Added on {uploadDateAdd} </td>
                                                    :
                                                    <td className='addnew' onClick={() => handleShow("address")}><FaExclamationTriangle className='triangle_icon' />Add New</td>
                                                }

                                                <td className='text-end viewbtn' onClick={() => getDoc("address")}>View</td>
                                                <td className='text-center viewbtn' onClick={() => deleteDoc("address")}>Delete</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3" className='proofofaddress'>PHOTO ID</td>
                                            </tr>
                                            <tr>


                                                {uploadDateId ?
                                                    <td><FaCheckCircle className='checkcircle' />Added on {uploadDateId} </td>
                                                    :
                                                    <td className='addnew' onClick={() => handleShow("id")}><FaExclamationTriangle className='triangle_icon' />Add New</td>
                                                }

                                                <td className='text-end viewbtn' onClick={() => getDoc("id")}>View</td>
                                                <td className='text-center viewbtn' onClick={() => deleteDoc("id")}>Delete</td>
                                            </tr>
                                        </tbody>
                                    </table>



                                    <div className='myaccount_faq'>
                                        <Accordion defaultActiveKey="0">
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>Accordion Item #1</Accordion.Header>
                                                <Accordion.Body>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                                    culpa qui officia deserunt mollit anim id est laborum.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>Accordion Item #2</Accordion.Header>
                                                <Accordion.Body>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                                    culpa qui officia deserunt mollit anim id est laborum.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                </div> */}



                            </div>





                        </Col>
                    </Row>
                </Container>



                <Modal show={show} onHide={handleClose} >
                    <Modal.Header closeButton >
                        <Modal.Title className='text-center w-100'><h5>Attach File</h5></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='attachfile' id='attachfile1' name="fileName" {...getRootProps()}>
                            <p>Drag your file here</p>
                            <p>or</p>
                            <button className='browser'>BROWSER</button>
                        </div>
                        {fileName ?
                            <div className="filenamediv">
                                <FaAddressCard className='addressCard' />{fileName}
                            </div>
                            :
                            <div></div>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        {loading ?
                            <Button variant="primary" className="w-100 modal_btton">
                                {/* Loading................ */}

                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            </Button>
                            :
                            <Button variant="primary" onClick={modalhandleClose} className="w-100 modal_btton">
                                Save
                            </Button>
                        }
                    </Modal.Footer>
                </Modal>



                <Modal show={imgModalShow} onHide={handleClose} centered className='imgModal'>
                    <Modal.Header closeButton >
                    </Modal.Header>
                    <Modal.Body>
                        <div className='text-center'>
                            <img src={image}></img>
                        </div>
                    </Modal.Body>
                </Modal>



            </section>
            <Footer />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

        </>
    )
}
