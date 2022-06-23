import React from 'react';
import Home from "./Home"
import How_It_Works from './How_It_Works';
import Pricing from './Pricing';
import { Routes, Route } from 'react-router-dom'
import Terms_Condition from './Terms_Condition';
import PrivacyPolicy from './PrivacyPolicy';


export default function Main() {
    return (
        <>
           
            <Routes>
                <Route path="/" element={<Home />}  ></Route>
                <Route path="/how_it_work" element={<How_It_Works />}></Route>
                <Route path="/princing" element={<Pricing />}></Route>
                <Route path="/termscondition" element={<Terms_Condition />}></Route>
                <Route path="/privacypolicy" element={<PrivacyPolicy />}></Route> 
          

            </Routes>
          

        </>
    )
}

