// src/components/QuoteForm.tsx

import React, { useRef, useState } from 'react'
import emailjs from 'emailjs-com'
import FileDropzone from './FileDropzone'
import { Loader2, Send } from 'lucide-react'

interface FormFields {
  name: string
  email: string
  company: string
  phone: string
  message: string
}

const initialFields: FormFields = {
  name: '',
  email: '',
  company: '',
  phone: '',
  message: ''
}

const QuoteForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [fields, setFields] = useState<FormFields>(initialFields)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
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
        setFields(initialFields)
        setFile(null)
        setTimeout(() => setSuccess(false), 5000)
      })
      .catch(err => {
        console.error('EmailJS error:', err)
        setError('No se pudo enviar. Intente de nuevo más tarde.')
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-[var(--card)] rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Solicitar Cotización
      </h2>

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 border border-green-200 rounded">
          ¡Solicitud enviada con éxito!
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-200 rounded">
          {error}
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <input
          type="hidden"
          name="cc_email"
          value="tu.profesor@dominio.com"
        />

        <label className="block">
          Nombre *
          <input
            type="text"
            name="name"
            required
            value={fields.name}
            onChange={handleChange}
            className="form-input mt-1 w-full"
            placeholder="Juan Pérez"
          />
        </label>

        <label className="block">
          Correo *
          <input
            type="email"
            name="email"
            required
            value={fields.email}
            onChange={handleChange}
            className="form-input mt-1 w-full"
            placeholder="juan@ejemplo.com"
          />
        </label>

        <label className="block">
          Empresa *
          <input
            type="text"
            name="company"
            required
            value={fields.company}
            onChange={handleChange}
            className="form-input mt-1 w-full"
            placeholder="Mi Empresa S.A."
          />
        </label>

        <label className="block">
          Teléfono
          <input
            type="tel"
            name="phone"
            value={fields.phone}
            onChange={handleChange}
            className="form-input mt-1 w-full"
            placeholder="+57 300 123 4567"
          />
        </label>

        <label className="block">
          Mensaje *
          <textarea
            name="message"
            required
            value={fields.message}
            onChange={handleChange}
            className="form-input mt-1 w-full min-h-[100px]"
            placeholder="Cuéntenos sobre su proyecto..."
          />
        </label>

        <div>
          <p className="mb-1">Archivo adjunto (opcional)</p>
          <FileDropzone file={file} setFile={setFile} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded flex justify-center items-center space-x-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> <span>Enviando...</span>
            </>
          ) : (
            <>
              <Send /> <span>Enviar Solicitud</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default QuoteForm
