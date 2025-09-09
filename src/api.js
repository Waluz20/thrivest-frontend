import axios from 'axios'
const API = import.meta.env.VITE_API_BASE || 'http://localhost:4000'
const instance = axios.create({ baseURL: API })
instance.interceptors.request.use(cfg=>{ const t = localStorage.getItem('token'); if(t) cfg.headers.Authorization = `Bearer ${t}`; return cfg })
export async function signup(name,email,password){ const r=await instance.post('/signup',{name,email,password}); localStorage.setItem('token',r.data.token); localStorage.setItem('user',JSON.stringify(r.data)); return r.data }
export async function login(email,password){ const r=await instance.post('/login',{email,password}); localStorage.setItem('token',r.data.token); localStorage.setItem('user',JSON.stringify(r.data)); return r.data }
export async function me(){ const r=await instance.get('/me'); return r.data }
export async function uploadProfile(file){ const fd=new FormData(); fd.append('profile',file); const r=await instance.post('/upload-profile',fd); const u=JSON.parse(localStorage.getItem('user')||'null'); if(u){ u.profileUrl = r.data.url; localStorage.setItem('user',JSON.stringify(u)) } return r.data }
export async function createDeposit(amount,wallet,method){ const r=await instance.post('/deposits',{amount,wallet,method}); return r.data }
export async function myDeposits(){ const r=await instance.get('/user-deposits'); return r.data }
export async function allDeposits(){ const r=await instance.get('/deposits'); return r.data }
export async function approveDeposit(id){ const r=await instance.put(`/deposits/${id}/approve`); return r.data }
export async function startBot(){ const r=await instance.post('/bot/start'); return r.data }
export async function stopBot(){ const r=await instance.post('/bot/stop'); return r.data }
