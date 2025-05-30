// src/components/QuoteForm.tsx

import React, { useRef, useState } from 'react'
import emailjs from 'emailjs-com'
import FileDropzone from './FileDropzone'
import { FileWithPreview, FormData } from '../types'
import { Loader2, Send } from 'lucide-react'

const initialForm: FormData = {
  name: '',
  email: '',
  company: '',
  phone: '',
  message: ''
}

const QuoteForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState<FormData>(initialForm)
  const [file, setFile] = useState<FileWithPreview | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    setLoading(true)
    setError(null)

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then(() => {
        setSuccess(true)
        setFormData(initialForm)
        setFile(null)
        setTimeout(() => setSuccess(false), 5000)
      })
      .catch(err => {
        console.error(err)
        setError('No se pudo enviar. Intenta nuevamente más tarde.')
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow bg-[var(--card)]">
      <h2 className="text-xl font-bold mb-4">Solicitar Cotización</h2>

      {success && (
        <div className="mb-4 p-3 rounded border bg-green-100 text-green-800">
          ¡Enviado con éxito!
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 rounded border bg-red-100 text-red-800">
          {error}
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        {/* Campo oculto para CC */}
        <input
          type="hidden"
          name="cc_email"
          value="tu.profesor@dominio.com"
        />

        <label>
          Nombre *
          <input
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            placeholder="Juan Pérez"
          />
        </label>

        <label>
          Email *
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            placeholder="juan@ejemplo.com"
          />
        </label>

        <label>
          Empresa *
          <input
            name="company"
            required
            value={formData.company}
            onChange={handleChange}
            className="form-input"
            placeholder="Mi Empresa S.A."
          />
        </label>

        <label>
          Teléfono
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
            placeholder="+57 300 123 4567"
          />
        </label>

        <label>
          Mensaje *
          <textarea
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            className="form-input min-h-[80px]"
            placeholder="Cuéntenos sobre su proyecto..."
          />
        </label>

        <div>
          <p className="mb-1">Archivo adjunto</p>
          <FileDropzone file={file} setFile={setFile} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 flex justify-center items-center bg-blue-600 text-white rounded"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="mr-2" />
              Enviar
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default QuoteForm
