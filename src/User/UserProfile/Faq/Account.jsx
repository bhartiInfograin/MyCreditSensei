import React from 'react'
import UserHeader from "../../Common/UserHeader";
import Footer from '../../../Common/Footer'
import ProfileNav from '../Common/ProfileNav';
import CommonFaq from './CommonFaq';

export default function Account() {



  return (
  <>
  <UserHeader/>
<ProfileNav
                title="FAQ’S"
                menu1="General"
                menu2="Account"
                menu3="Monitoring"
                url1="general"
                url2="account"
                url3="monitoring" />
<CommonFaq/>
<Footer/>
  
  </>
  )
}
