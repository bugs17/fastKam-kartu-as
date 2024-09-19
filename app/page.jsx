"use client"
import Image from "next/image";
import Navbar from "./component/navbar";
import { useEffect, useRef, useState } from "react";
import Contoh from '../app/asset/img/contoh.jpeg'
import MapsImg from '../app/asset/img/maps.png'
import axios from "axios";

export default function Home() {
  const [useImg, setUseImg] = useState(false)
  const [useUrl, setUseUrl] = useState(false)
  const [useLokasi, setUseLokasi] = useState(false)
  const [file, setFile] = useState(null)
  const [pesan, setPesan] = useState('')
  const [jumlahKontak, setJumlahKontak] = useState(0)
  const [loadingJumlah, setLoadingJumlah] = useState(true)
  const [imagePreview, setImagePreview] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(false);
  const [dataUrl, setDataUrl] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const imgRef = useRef(null)
  const textareaRef = useRef(null)
  const stringUrlRef = useRef(null)
  const latRef = useRef(null)
  const longRef = useRef(null)


  const handleChangeUpload = (e) => {
      const x = e.target.files[0];
      setFile(x)
      const imgUrl = URL.createObjectURL(x)
      setImagePreview(imgUrl)
      
  }

  useEffect(() => {
    if (useImg === false) {
      setFile(null)
    }
    console.log(file)
  }, [useImg, file])

  useEffect(() => {
    // meminta jumlah data kontak
    const fetchJumlahKontak = async () => {
      setLoadingJumlah(true)
      try {
        const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/jumlah'
        const response = await axios.get(url)
        if (response.status === 200) {
          setJumlahKontak(response.data.jumlah)
          setLoadingJumlah(false)
        }
      } catch (error) {
        console.log("Error calculate kontak")
        setLoadingJumlah(false)
      }finally{
        setLoadingJumlah(false)
      }
    }
    console.log('muat ulang jumlah kontak')
    fetchJumlahKontak()
  }, [])


  const handleChangeImage = () => {
    setUseImg(!useImg)
    setUseUrl(false)
    setUseLokasi(false)
    if (imagePreview !== null) {
      setImagePreview(null)
      // imgRef.current.value = null
    }
  }

  const handleChangeUrl = () => {
    setUseUrl(!useUrl)
    setUseLokasi(false)
    setUseImg(false)
  }
  
  const handleChangeLokasi = () => {
    setUseLokasi(!useLokasi)
    setUseUrl(false)
    setUseImg(false)
    setPesan('')
  }


  const sendMessageWithImage = async () => {
    if (pesan === '' || file === null) {
      alert("Pesan & file tidak boleh kosong, ketik pesan anda dan pilih satu file sebelum mengirim")
      return
    }

    setSubmitStatus(true)
    imgRef.current.value = null
    textareaRef.current.value = ''
    
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/send-message-image'
      const form = new FormData()
      form.append('pesan', pesan)
      form.append('gambar', file)
      await axios.post(url, form, {
        headers:{
          'Content-Type':'multipart/form-data',
        }
      })
    } catch (error) {
      console.log("error mengirim pesan dengan file", error)
    }finally{
      setSubmitStatus(false)
      setPesan('')
      setFile(null)
      setImagePreview(null)
    }
  }


  const sendMessageWithUrl = async () => {
    if (pesan === '' || dataUrl === '') {
      alert("Pesan & URL tidak boleh kosong, ketik pesan & URL anda sebelum mengirim")
      return
    }

    setSubmitStatus(true)
    stringUrlRef.current.value = ''
    textareaRef.current.value = ''
    
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/send-message-url'
      const data = {
        'pesan': pesan,
        'stringUrl':dataUrl
      }
      await axios.post(url, data, {
        headers:{
          'Content-Type': 'application/json',
        }
      })
    } catch (error) {
      console.log("error mengirim pesan dengan file", error)
    }finally{
      setSubmitStatus(false)
      setPesan('')
      setDataUrl('')
    }
  }
  
  
  const sendMessageWithLokasi = async () => {
    if (latitude === '' || longitude === '') {
      alert("Latitude & Longitude tidak boleh kosong, ketik Latitude & Longitude anda sebelum mengirim")
      return
    }

    setSubmitStatus(true)
    latRef.current.value = ''
    longRef.current.value = ''
    
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/send-message-lokasi'
      const data = {
        latitude,
        longitude
      }
      await axios.post(url, data, {
        headers:{
          'Content-Type': 'application/json',
        }
      })
    } catch (error) {
      console.log("error mengirim pesan dengan file", error)
    }finally{
      setSubmitStatus(false)
      setLatitude('')
      setLongitude('')
    }
  }


  const sendMessageOnly = async () => {
    if (pesan === '') {
      alert("Pesan tidak boleh kosong, ketik pesan anda sebelum mengirim")
      return
    }

    setSubmitStatus(true)
    textareaRef.current.value = ''
    
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/send-message'
      const data = {
        pesan,
      }
      await axios.post(url, data, {
        headers:{
          'Content-Type': 'application/json',
        }
      })
    } catch (error) {
      console.log("error mengirim pesan dengan file", error)
    }finally{
      setSubmitStatus(false)
      setPesan('')
    }
  }

  const handleSendMessage = async () => {
    try {
      if (useImg) {
        sendMessageWithImage()
      }else if (useUrl) {
        sendMessageWithUrl()
      }else if (useLokasi) {
        sendMessageWithLokasi()
      }else{
        sendMessageOnly()
      }
    } catch (error) {
      console.log("Error mengirim pesan", error)
      setSubmitStatus(false)
    }
  }

  return (
    <div className="flex flex-row lg:px-52 pt-20 w-full h-full justify-between">
      <div className="flex-1 flex flex-col gap-7">
      <span className="">Target: {jumlahKontak} penerima</span>

        <div className="form-control w-40">
          <label className="label cursor-pointer">
            <span className="label-text">Image</span>
            <input type="checkbox" className="toggle toggle-secondary toggle-md" checked={useImg}  onChange={handleChangeImage} />
          </label>
        </div>
        <div className="form-control w-40">
          <label className="label cursor-pointer">
            <span className="label-text">Url</span>
            <input type="checkbox" className="toggle toggle-secondary toggle-md" checked={useUrl}  onChange={handleChangeUrl} />
          </label>
        </div>
        <div className="form-control w-40">
          <label className="label cursor-pointer">
            <span className="label-text">Lokasi</span>
            <input type="checkbox" className="toggle toggle-secondary toggle-md" checked={useLokasi} onChange={handleChangeLokasi} />
          </label>
        </div>

        {/* url */}
        {useUrl && <label className={`form-control w-full`}>
          <div className="label">
            <span className="label-text">Url</span>
          </div>
          <input ref={stringUrlRef} onChange={(e) => setDataUrl(e.target.value)} type="text" placeholder="Masukan URL" className="input input-bordered w-full" />
        </label>}

        {/* lokasi latitude */}
        {useLokasi && <label className={`form-control w-full max-w-full`}>
          <div className="label  ">
            <span className="label-text">Latitude</span>
          </div>
          <input ref={latRef} onChange={(e) => setLatitude(e.target.value)} type="url" placeholder="Masukan koordinat latitude" className="input input-bordered w-full max-w-full" />
        </label>}

        {/* lokasi longitude */}
        {useLokasi && <label className={`form-control w-full max-w-full`}>
          <div className="label">
            <span className="label-text">Longitude</span>
          </div>
          <input ref={longRef} onChange={(e) => setLongitude(e.target.value)} type="text" placeholder="Masukan koordinat longitude" className="input input-bordered w-full max-w-full" />
        </label>}

        {/* upload image */}
        {useImg && <input
        ref={imgRef}
        onChange={handleChangeUpload}
        type="file"
        accept="image/*"
        className={`file-input file-input-bordered w-full max-w-xs self-center`} />}

        {/* textarea */}
        {!useLokasi && <label className="form-control">
          <div className="label">
            <span className="label-text">Pesan</span>
          </div>
          <textarea ref={textareaRef} onChange={(e) => setPesan(e.target.value)} className="textarea textarea-bordered h-24" placeholder="Ketik pesan anda.."></textarea>
        </label>}

        <button disabled={submitStatus} onClick={handleSendMessage} className="btn btn-secondary">Kirim</button>

        
      </div>

      <div className="flex-1 flex flex-col">
        <span className="label-text justify-center flex items-center pl-12 pb-5">PREVIEW</span>
        <div className="w-[300px] flex items-center self-center flex-col">
          <div className="mockup-phone">
            <div className="camera"></div>
            <div className="display">
              <div className="artboard artboard-demo phone-1 bg-slate-900 flex flex-1 justify-start">
              {!useLokasi ?
              <div className={`w-full h-full ${submitStatus ? "items-center flex justify-center" : "items-start pt-14 pr-3 flex justify-end" } `}>
                {!submitStatus
                ?
                <div className={`max-w-60 bg-[#128c7e] py-1 px-2 text-left rounded-md  ${pesan === '' && "hidden" }`}>
                  {useUrl && <span className="text-cyan-300">{dataUrl}</span>}
                  {imagePreview !== null && <Image  alt="image-attach" src={imagePreview} width={100} height={60} layout="responsive" className="w-full h-full mb-1 rounded-md" />}
                  <pre className="whitespace-pre-wrap text-xs font-mono font-medium break-words">{pesan}</pre>
                </div>
                :
                <div className="flex flex-col items-center gap-4">
                  <span className="loading loading-ring loading-lg bg-secondary"></span>
                  <span className="text-xs">Sedang mengirim pesan ke semua kontak.</span>
                </div>}
              </div>
              :
              <div className={`w-full h-full ${submitStatus ? "items-center flex justify-center" : "items-start pt-36 pr-3 flex justify-end" } `}>
                {!submitStatus
                ?
                <div className={`w-60 bg-[#128c7e] py-1 px-2 text-left rounded-md `}>
                  <Image  alt="image-maps-preview" src={MapsImg} width={100} height={60} layout="responsive" className="w-full h-full mb-1 rounded-md" />
                </div>
                :
                <div className="flex flex-col items-center gap-4">
                  <span className="loading loading-ring loading-lg bg-secondary"></span>
                  <span className="text-xs">Sedang mengirim pesan ke semua kontak.</span>
                </div>}
              </div>
              }
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
