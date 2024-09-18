"use client"
import axios from 'axios'
import React, { useRef, useState } from 'react'


const Settings = () => {
    const [file, setFile] = useState(null)
    const [allert, setAllert] = useState(false)
    const [loading, setLoading] = useState(false)
    const [allertMsg, setAllertMsg] = useState('Kontak telah dimasukan ke Database')
    const ref = useRef(null)

    const handleChange = (e) => {
        const x = e.target.files[0];
        setFile(x)
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!file) {
            return alert("Pilih file terlebih dahulu sebelum submit")
        }
        setLoading(true)
        const formData = new FormData();
        formData.append('file', file);

        try {
            const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/upload'
            const response = await axios.post(url,formData, {
                headers:{
                    'Content-Type':'multipart/form-data',
                }
            })
            if (response.status === 200) {
                setAllertMsg("Kontak telah berhasil di masukan ke Dtabase")
                setAllert(true)
                setLoading(false)
                ref.current.value = null
            }
        } catch (error) {
            console.log("Error upload file", error)
            setLoading(false)
            ref.current.value = null
        }finally{
            setLoading(false)
            ref.current.value = null
        }
    }

    return (
    <div className='flex flex-col lg:px-52 pt-60 items-center justify-center gap-6'>
        {allert && <div role="alert" className="alert alert-success flex flex-row justify-between">
            <div className='flex flex-row gap-5'>
                <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{allertMsg}</span>
            </div>
            <span onClick={() => setAllert(false)} className='font-bold text-red-500 cursor-pointer'>X</span>
        </div>}
        <div className="label">
            <span className="label-text">{"Upload file nomor kontak (format file xlsx)"}</span>
        </div>
        <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
            <input
            ref={ref}
            accept='.csv, .xls, .xlsx'
            onChange={handleChange}
            type="file"
            className="file-input file-input-bordered w-full max-w-xs" />
            <button disabled={loading} type='submit' className="btn btn-secondary">
                {
                    !loading 
                    ? <span>Submit</span>
                    : <span className="loading loading-ring loading-lg bg-primary"></span>
                }
            
            </button>
        </form>
        <a href='/template/kontak-template.xlsx' className='text-xs hover:text-purple-400 cursor-pointer' download>Download contoh format file kontak</a>
    </div>
    )
}

export default Settings