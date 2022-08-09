import React, { useState, useCallback, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Spinner, Accordion, Table } from 'react-bootstrap';
import UserFooter from '../Common/UserFooter';
import UserHeader from '../Common/UserHeader';
import { FaExclamationTriangle, FaAddressCard, FaCheckCircle } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { DELETE_DOC, GET_DOC, UPLOAD_DOC } from "../../Url"
import { useNavigate } from 'react-router-dom';



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
    let Navigate = useNavigate()

    const handleClose = async () => {
        setShow(false)
        setImgModalShow(false)
    }


    useEffect(() => {
        setFileName(file.name)
    }, [file.name])



    //******************* */ api for upload image *********************************
    const modalhandleClose = async () => {
        const formData = new FormData();
        formData.append("fileName", file);
        formData.append("trackingToken", trackingToken);

        if (docType === "address") {
            formData.append("doc_type", "addressproof");
        }
        if (docType === "id") {
            formData.append("doc_type", "idproof");
        }
        setLoading(true)
        try {
            const { data } = await axios.post(UPLOAD_DOC, formData)
            if (data.statusCode === 403) {
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
                setLoading(false)
            }
            if (data.statusCode === 200) {
                setShow(false);
                setLoading(false)
            }

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

    const [endDate, setEndDate] = useState()
    const [startDate, setStartDate] = useState()

    useEffect(() => {
        axios.get(`https://www.mycreditsensei.com:5000/getDueDate?trackingToken=${trackingToken}`)
            .then((response) => {
                console.log("response", response)
                const enddate = response.data.statusMsg.endDate
                const startDate = response.data.statusMsg.startDate
                var _enddate = new Date(enddate * 1000).toLocaleDateString('en-GB');
                var _startDate = new Date(startDate * 1000).toLocaleDateString('en-GB');


                if (response.data.statusCode === 400) {
                    Navigate("/login")
                }

                setEndDate(_enddate)
                setStartDate(_startDate)

            })
            .catch((err) => {
                console.log(err)
            })
    }, [])




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
                console.log("dfdfdf", data.data)
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
                console.log("data",data)
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

            <Container className='mt-5'>
                <Row>
                    <Col lg={12} md={12}><h5>My Account</h5></Col>
                </Row>
            </Container>


            <section className='mb-5 mt-5'>
                <Container>
                    <Row>
                        <Col lg={12} md={12} sm={12}>


                            <div className='user_myaccount'>

                                <div className='details'>
                                    <h6 className='personal_details'>Personal Details</h6>
                                    <Table className=" table text-start table-sm table-striped table-hover clientdetails" responsive >
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
                                    </Table >

                                </div>

                                <div className='documents' id='info'>
                                    {/* <Table className=" table  table-sm table-striped table-hover" responsive>
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

                                                <td className='text-end viewbtn' onClick={() => getDoc("address")}><div className='doucument_btn'>View</div></td>
                                                <td className='text-center viewbtn' onClick={() => deleteDoc("address")}><div className='doucument_btn'>Delete</div></td>
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

                                                <td className='text-end viewbtn' onClick={() => getDoc("id")}> <div className='doucument_btn'>View</div></td>
                                                <td className='text-center viewbtn' onClick={() => deleteDoc("id")}><div className='doucument_btn'>Delete</div></td>
                                            </tr>
                                        </tbody>
                                    </Table> */}

                                    <div className='paymentInfo'>
                                        <Table className="table" striped bordered hover responsive>
                                            <tbody>
                                                <tr>
                                                    <td colSpan="3" className='payment_info'>PAYMENT INFO</td>
                                                </tr>
                                                <tr className='paymentDetails'>
                                                    <td>Subscription Date</td>
                                                    <td>End date</td>
                                                    <td>Amount</td>
                                                </tr>
                                                <tr className='paymentValue'>
                                                    <td>{startDate}</td>
                                                    <td>{endDate}</td>
                                                    <td style={{ color: "green" }}>$39</td>
                                                </tr>

                                            </tbody>
                                        </Table>

                                    </div>




                                    <div className='myaccount_faq'>

                                        <p className='faq'>FAQ</p>
                                        <Accordion>
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>Why should I add my proof of address and photo ID?</Accordion.Header>
                                                <Accordion.Body>
                                                    It’s your right to dispute any account on your credit report. However, the credit bureaus have the right to refuse your disputes if they are unable to verify that you’re the one sending the dispute. You may receive a letter asking you to resubmit your disputes with the proper ID which will cause a delay. Once you upload your photo ID and proof of address, My Credit Sensei will automatically include those documents in every dispute letter that you create.
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
                        </Col>
                    </Row>
                </Container>


            </section>


            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton >
                    <Modal.Title className='text-center w-100'><h5>Attach File</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <div className='attachfile' id='attachfile1' name="fileName" {...getRootProps()}>
                            <p>Drag your file here</p>
                            <p>or</p>
                            <input type= "file" className="custom-file-input" ></input>
                           
                        </div> */}
                    <div className='attachfile' id='attachfile1' name="fileName" >

                        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="custom-file-input"></input>

                    </div>



                    {fileName ?
                        <div className="filenamediv">
                            <FaAddressCard className='addressCard' />{fileName}
                        </div>
                        :
                        <div></div>
                    }
                     <p className='imguload_note'>Note:Only PNG,JPG and JPEG formate are allowed</p>
                </Modal.Body>
                <Modal.Footer>
                    {loading ?
                        <Button variant="primary" className="w-100 modal_btton">
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        </Button>
                        :
                        <>
                           
                            <Button variant="primary" onClick={modalhandleClose} className="w-100 modal_btton">
                                Save
                            </Button>
                        </>

                    }
                </Modal.Footer>
            </Modal>

            <Modal show={imgModalShow} onHide={handleClose} centered className='imgModal'>
                <Modal.Header closeButton >
                </Modal.Header>
                <Modal.Body>
                    <div className='text-center doucument_img' >
                        <img src={image}></img>
                    </div>
                </Modal.Body>
            </Modal>

            <UserFooter />
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
