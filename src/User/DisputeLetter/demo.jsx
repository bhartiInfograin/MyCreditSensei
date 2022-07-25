<Col lg={12} md={12}>
    {/* <h4>Inquires</h4> */}
    <div className='transUnion_filter'>

        <div className='back_selectbtn'>
            {finish ?

                <button className='btn selectbtton' onClick={sendEmail}>FINISH</button>
                :
                count === 0
                    ?
                    <button className=' btn selectbtton'> NO ITEM SELECTED </button>
                    :
                    <button className=' btn selectbttonnext' onClick={handleDisputeReason} > {count} &nbsp;ITEM SELECTED - NEXT </button>
            }
        </div>
    </div>

    <Row>
        <Col lg={2} md={2}>
            <div className="nav  verticaLnav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <p className='accountstatus'>Inquiries Status</p>
                {/* <button className="nav-link verticalLink active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#positive" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Positive</button>
                                    <button className="nav-link verticalLink" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#negative" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Negative</button> */}
                <button className="nav-link verticalLink" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#all" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">All</button>
            </div>
        </Col>
        <Col lg={10} md={10}>
            <div className="tab-content" id="v-pills-tabContent">
                {/* ---------------------------------positive----------------------------------------------------- */}
                <div className="tab-pane fade show active" id="positive" role="tabpanel" aria-labelledby="v-pills-home-tab">
                    {/* *************  horizatanl navbar positive ******************* */}

                    <Col lg={12} md={12}>
                        <div className="tab-content" id="pills-tabContent">
                            {/* ************************ transunion report ************************ */}
                            <div className="tab-pane fade show active" id="transunion" role="tabpanel" aria-labelledby="pills-home-tab">
                                <Col lg={12} md={12}>
                                    <div className="accordian_content mt-3">
                                        <Accordion>
                                            {/************************ ************** INQUIRIES ***************************************************************/}
                                            <Accordion.Item eventKey="2">
                                                <Accordion.Header className='accordinbtn'>INQUIRIES</Accordion.Header>
                                                <Accordion.Body>
                                                    <Container>
                                                        <Row>
                                                            <Col lg={12} md={12}>
                                                                {transUnionInquiry ?
                                                                    transUnionInquiry.map((e, index) => {

                                                                        return (
                                                                            <Table size="sm" className='maintable ' responsive>
                                                                                <tr>
                                                                                    <td className='credit_checkbox'>
                                                                                        <div className="form-check">
                                                                                            <input onChange={e => handleCheckCount(e)} className="form-check-input  mycheckbox1" type="checkbox" value={index} id="flexCheckChecked" />
                                                                                            <label className="form-check-label " htmlfor="flexCheckChecked">
                                                                                                Business Name
                                                                                                <br></br>
                                                                                                <b className='subscriberName'>{e.Inquiry.subscriberName}</b>
                                                                                            </label>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td style={{ width: "236px" }}>Business Type
                                                                                        <br></br>
                                                                                        <b className='industryCode'>{e.Inquiry.IndustryCode.description}</b>
                                                                                    </td>
                                                                                    <td>Inquiry For
                                                                                        <br></br>
                                                                                        <span className='individualName'>  {e.Inquiry.inquiryType === "I" ?
                                                                                            <b className='individual'>Individual</b>
                                                                                            :
                                                                                            <b>-</b>
                                                                                        }</span>


                                                                                    </td>


                                                                                    <td>DATE
                                                                                        <br></br>
                                                                                        <b className='inquiryDate'>{e.Inquiry.inquiryDate}</b>
                                                                                    </td>
                                                                                    <td className="disputeReason1" id={index} onClick={e => handleShowInquire(e)} value={index} name="dispute" style={{ color: "red" }}>Add Dispute Reason </td>

                                                                                </tr>
                                                                            </Table>
                                                                        )
                                                                    })
                                                                    :
                                                                    <>
                                                                        Loading.........................
                                                                    </>}
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                </Col>
                            </div>
                        </div>
                    </Col>
                </div>


                {/* ---------------------------------negative----------------------------------------------------- */}

                <div className="tab-pane fade" id="negative" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                    {/* *************  horizatanl navbar negative ******************* */}
                    <Col lg={12} md={12}>
                        <div className="tab-content" id="pills-tabContent">
                            {/* ************************ transunion report ************************ */}
                            <div className="tab-pane fade show active" id="transunion1" role="tabpanel" aria-labelledby="pills-home-tab">
                                <Col lg={12} md={12}>
                                    <div className="accordian_content mt-3">
                                        <Accordion>
                                            {/************************ ************** INQUIRIES ***************************************************************/}
                                            <Accordion.Item eventKey="2">
                                                <Accordion.Header className='accordinbtn'>INQUIRIES</Accordion.Header>
                                                <Accordion.Body>
                                                    <Container>
                                                        <Row>
                                                            <Col lg={12} md={12}>
                                                                {transUnionInquiry ?
                                                                    transUnionInquiry.map((e, index) => {
                                                                        return (
                                                                            <Table size="sm" className='maintable ' responsive>
                                                                                <tr>
                                                                                    <td className='credit_checkbox'>
                                                                                        <div className="form-check">
                                                                                            <input onChange={e => handleCheckCount(e)} className="form-check-input  mycheckbox1" type="checkbox" value={index} id="flexCheckChecked" />
                                                                                            <label className="form-check-label " htmlfor="flexCheckChecked">
                                                                                                Business Name
                                                                                                <br></br>
                                                                                                <b className='subscriberName'>{e.Inquiry.subscriberName}</b>
                                                                                            </label>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td style={{ width: "236px" }}>Business Type
                                                                                        <br></br>
                                                                                        <b className='industryCode'>{e.Inquiry.IndustryCode.description}</b>
                                                                                    </td>
                                                                                    <td>Inquiry For
                                                                                        <br></br>
                                                                                        <span className='individualName'>  {e.Inquiry.inquiryType === "I" ?
                                                                                            <b className='individual'>Individual</b>
                                                                                            :
                                                                                            <b>-</b>
                                                                                        }</span>


                                                                                    </td>


                                                                                    <td>DATE
                                                                                        <br></br>
                                                                                        <b className='inquiryDate'>{e.Inquiry.inquiryDate}</b>
                                                                                    </td>
                                                                                    <td className="disputeReason1" id={index} onClick={e => handleShowInquire(e)} value={index} name="dispute" style={{ color: "red" }}>Add Dispute Reason </td>

                                                                                </tr>
                                                                            </Table>
                                                                        )
                                                                    })
                                                                    :
                                                                    <>
                                                                        Loading.........................
                                                                    </>}
                                                            </Col>
                                                        </Row>
                                                    </Container>

                                                </Accordion.Body>
                                            </Accordion.Item>



                                        </Accordion>
                                    </div>
                                </Col>
                            </div>
                        </div>
                    </Col>
                </div>



                {/* ---------------------------------All----------------------------------------------------- */}

                <div className="tab-pane fade" id="all" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                    {/* *************  horizatanl navbar positive ******************* */}
                    <Col lg={12} md={12}>
                        <div className="tab-content" id="pills-tabContent">
                            {/* ************************ transunion report ************************ */}
                            <div className="tab-pane fade show active" id="transunion4" role="tabpanel" aria-labelledby="pills-home-tab">
                                <Col lg={12} md={12}>
                                    <div className="accordian_content mt-3">
                                        <Accordion>
                                            {/************************ ************** INQUIRIES ***************************************************************/}
                                            <Accordion.Item eventKey="2">
                                                <Accordion.Header className='accordinbtn'>INQUIRIES</Accordion.Header>
                                                <Accordion.Body>
                                                    <Container>
                                                        <Row>
                                                            <Col lg={12} md={12}>
                                                                {transUnionInquiry ?
                                                                    transUnionInquiry.map((e, index) => {

                                                                        return (
                                                                            <Table size="sm" className='maintable ' responsive>
                                                                                <tr>
                                                                                    <td className='credit_checkbox'>
                                                                                        <div className="form-check">
                                                                                            <input onChange={e => handleCheckCount(e)} className="form-check-input  mycheckbox1" type="checkbox" value={index} id="flexCheckChecked" />
                                                                                            <label className="form-check-label " htmlfor="flexCheckChecked">
                                                                                                Business Name
                                                                                                <br></br>
                                                                                                <b className='subscriberName'>{e.Inquiry.subscriberName}</b>
                                                                                            </label>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td style={{ width: "236px" }}>Business Type
                                                                                        <br></br>
                                                                                        <b className='industryCode'>{e.Inquiry.IndustryCode.description}</b>
                                                                                    </td>
                                                                                    <td>Inquiry For
                                                                                        <br></br>
                                                                                        <span className='individualName'>  {e.Inquiry.inquiryType === "I" ?
                                                                                            <b className='individual'>Individual</b>
                                                                                            :
                                                                                            <b>-</b>
                                                                                        }</span>


                                                                                    </td>


                                                                                    <td>DATE
                                                                                        <br></br>
                                                                                        <b className='inquiryDate'>{e.Inquiry.inquiryDate}</b>
                                                                                    </td>
                                                                                    <td className="disputeReason1" id={index} onClick={e => handleShowInquire(e)} value={index} name="dispute" style={{ color: "red" }}>Add Dispute Reason </td>

                                                                                </tr>
                                                                            </Table>
                                                                        )
                                                                    })
                                                                    :
                                                                    <>
                                                                        Loading.........................
                                                                    </>}
                                                            </Col>
                                                        </Row>
                                                    </Container>

                                                </Accordion.Body>
                                            </Accordion.Item>

                                        </Accordion>
                                    </div>
                                </Col>
                            </div>
                        </div>
                    </Col>
                </div>
            </div>
        </Col>

    </Row>
</Col>