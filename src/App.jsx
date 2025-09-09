import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Admin from './pages/Admin.jsx'
import { getUser } from './utils.js'
function Header(){ const user = getUser(); return (<div className='header'><div className='brand'><div className='logo'></div><strong>Thrivest</strong></div><div>{user ? (<> {user.isAdmin && <Link to='/admin' style={{color:'#fff',marginRight:12}}>Admin</Link>} <Link to='/dashboard' style={{color:'#fff',marginRight:12}}>Dashboard</Link> <a href='#' onClick={()=>{localStorage.removeItem('token'); localStorage.removeItem('user'); window.location.href='/login'}} style={{color:'#fff'}}>Logout</a></>) : (<> <Link to='/login' style={{color:'#fff',marginRight:12}}>Login</Link> <Link to='/signup' style={{color:'#fff'}}>Signup</Link> </>)}</div></div>) }
function Require({children,admin}){ const u = getUser(); if(!u) return <Navigate to='/login' replace/>; if(admin && !u.isAdmin) return <Navigate to='/' replace/>; return children }
export default function App(){ return (<><Header/><div className='container'><Routes><Route path='/' element={<Landing/>} /><Route path='/login' element={<Login/>} /><Route path='/signup' element={<Signup/>} /><Route path='/dashboard' element={<Require><Dashboard/></Require>} /><Route path='/admin' element={<Require admin><Admin/></Require>} /></Routes></div></>) }
