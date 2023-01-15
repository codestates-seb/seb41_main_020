/* eslint-disable react/react-in-jsx-scope */
// 최상단에는 리액트 컴포넌트
import Home from "./Pages/Home.jsx";
import Tickets from "./Pages/Tickets/Tickets.jsx";
import TicketsDetail from "./Pages/Tickets/TicketsDetail.jsx";
import TicketsCreate from "./Pages/Tickets/TicketsCreate.jsx";
import TicketsEdit from "./Pages/Tickets/TicketsEdit.jsx";
import Search from "./Pages/Search.jsx";
import Signup from "./Pages/Signup/Signup.jsx";
import SignupPerformer from "./Pages/Signup/SignupPerformer.jsx";
import Login from "./Pages/Login.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import ProfileEdit from "./Pages/Profile/ProfileEdit.jsx";
import Board from "./Pages/Boards/Board/BoardList.jsx";
import Post from "./Pages/Boards/Board/Board.jsx";
import PostCreate from "./Pages/Boards/Board/BoardCreate.jsx";
import PostEdit from "./Pages/Boards/Board/BoardEdit.jsx";
import NotFound from "./Pages/NotFound.jsx";

import Header from "./Components/Header.jsx";
// 그다음에는 로컬 모듈
import "./App.css";

// 그다음에는 라이브러리
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>

        {/* 로그인 및 회원가입 */}
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signup/performer" element={<SignupPerformer />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* 프로파일 */}
        <Route path="/user/:id" element={<Profile />}></Route>
        <Route path="/user/:id/edit" element={<ProfileEdit />}></Route>

        {/* 티케팅게시판 */}
        <Route path="/tickets" element={<Tickets />}></Route>
        <Route path="/tickets/create" element={<TicketsCreate />}></Route>
        <Route path="/tickets/:id" element={<TicketsDetail />}></Route>
        <Route path="/tickets/:id/edit" element={<TicketsEdit />}></Route>

        {/* 공연찾기게시판 */}
        <Route path="/search" element={<Search />}></Route>

        {/* 게시판 분류 */}
        {/* 자유게시판 (게시판 홈)*/}
        <Route path="/board" element={<Board />}></Route>
        <Route path="/board/create" element={<PostCreate />}></Route>
        <Route path="/board/:id" element={<Post />}></Route>
        <Route path="/board/:id/edit" element={<PostEdit />}></Route>
        {/* 구인게시판 */}
        <Route path="/board/employ" element={<Board />}></Route>
        <Route path="/board/employ/create" element={<PostCreate />}></Route>
        <Route path="/board/employ/:id" element={<Home />}></Route>
        <Route path="/board/employ/:id/edit" element={<Home />}></Route>
        {/* 요청게시판 */}
        <Route path="/board/request" element={<Board />}></Route>
        <Route path="/board/request/create" element={<PostCreate />}></Route>
        <Route path="/board/request/:id" element={<Post />}></Route>
        <Route path="/board/request/:id/edit" element={<PostEdit />}></Route>
        {/* 홍보게시판 */}
        <Route path="/board/advertise" element={<Board />}></Route>
        <Route path="/board/advertise/create" element={<PostCreate />}></Route>
        <Route path="/board/advertise/:id" element={<Post />}></Route>
        <Route path="/board/advertise/:id/edit" element={<PostEdit />}></Route>
        {/* 후기게시판 */}
        <Route path="/board/review" element={<Board />}></Route>
        <Route path="/baord/review/create" element={<PostCreate />}></Route>
        <Route path="/baord/review/:id" element={<Post />}></Route>
        <Route path="/baord/review/:id/edit" element={<PostEdit />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;

// axios, styled component, (RTK, zustand), tanstack-query, React Router
