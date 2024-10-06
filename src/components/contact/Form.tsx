import React, { type FormEvent } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const FormContact = () => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [pesan, setPesan] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target as HTMLFormElement)
    try {
      await fetch('/api/kontak', {
        method: 'POST',
        body: formData,
      })
      setName('')
      setEmail('')
      setPesan('')
      toast.success('Pesan telah terkirim', {
        style: {
          borderRadius: '10px',
          background: '#393939',
          color: '#fff',
        },
      })
    } catch (error) {
      console.log('error = ', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full xs:w-[320px] sm:w-[480px]">
      <div className="mb-4">
        <label className="block text-[#919191] text-sm font-bold mb-2" htmlFor="nama">
          Nama
        </label>
        <input
          className="shadow appearance-none border border-[#393939] rounded w-full py-3 px-3 text-[#919191] leading-tight focus:outline-none bg-black/[0.2]"
          id="name"
          name="name"
          placeholder="Masukkan nama"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-[#919191] text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border border-[#393939] rounded w-full py-3 px-3 text-[#919191] leading-tight focus:outline-none bg-black/[0.2]"
          id="email"
          name="email"
          placeholder="Masukkan email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-[#919191] text-sm font-bold mb-2" htmlFor="pesan">
          Pesan
        </label>
        <textarea
          className="shadow appearance-none border border-[#393939] rounded w-full py-3 px-3 text-[#919191] leading-tight focus:outline-none bg-black/[0.2]"
          id="pesan"
          name="pesan"
          placeholder="cth: Bang tolong buatin aku web"
          rows={6}
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-black/[0.2] border border-[#393939] hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none disabled:bg-gray-600 disabled:text-gray-300 disabled:opacity-20 disabled:cursor-not-allowed"
          type="submit"
          disabled={[name, email, pesan].includes('') || loading}
        >
          {loading ? 'Mengirim pesan..' : 'Kirim'}
        </button>
      </div>
      <Toaster />
    </form>
  )
}

export default FormContact