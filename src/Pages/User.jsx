import React from 'react';
import { Routes, Route } from 'react-router-dom'
import CreditItem from '../User/CreditItem/CreditItem';
import UserHome from '../User/UserHome/UserHome';
import History from '../User/History/History';
import TransunionDispute from "../User/DisputeLetter/TransunionDispute"
import ExperianDispute from "../User/DisputeLetter/ExperianDispute"
import EquifaxDispute from "../User/DisputeLetter/EquifaxDispute"
import TransunionRound_1 from '../User/DisputeLetter/TransunionRound_1';
import EquifaxRound_1 from '../User/DisputeLetter/EquifaxRound_1'
import ExperianRound_1 from '../User/DisputeLetter/ExperianRound_1'
import Myaccount from '../User/UserProfile/Myaccount'


export default function Main() {
    return (
        <>
           
            <Routes>
                <Route path="/useHome" element={<UserHome/>} ></Route>
                <Route path="/creditItem" element={<CreditItem/>} ></Route>
                <Route path="/history"element={<History/>}></Route>
                <Route path="/transuniondispute"element={<TransunionDispute/>}></Route>
                <Route path="/experiandispute"element={<ExperianDispute/>}></Route>
                <Route path="/equifaxdispute"element={<EquifaxDispute/>}></Route>
                <Route path="/transunionRound_1"element={<TransunionRound_1/>}></Route>
                <Route path="/equifaxround_1"element={<EquifaxRound_1/>}></Route>
                <Route path="/experianRound_1"element={<ExperianRound_1/>}></Route>
                <Route path="/myaccount"element={<Myaccount/>}></Route>
            </Routes>
        </>
    )
}
