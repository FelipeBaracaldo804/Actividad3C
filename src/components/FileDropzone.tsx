// src/components/FileDropzone.tsx

import React, { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { FileWithPreview } from '../types'
import { FileX, Upload, File as FileIcon } from 'lucide-react'

interface FileDropzoneProps {
  file: FileWithPreview | null
  setFile: React.Dispatch<React.SetStateAction<FileWithPreview | null>>
  maxSize?: number
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  file,
  setFile,
  maxSize = 5242880 // 5MB
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const f = acceptedFiles[0]
      const preview = URL.createObjectURL(f)
      setFile(Object.assign(f, { preview }))
    },
    [setFile]
  )

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections
  } = useDropzone({
    onDrop,
    maxSize,
    maxFiles: 1,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    }
  })

  useEffect(() => {
    return () => {
      if (file?.preview) {
        URL.revokeObjectURL(file.preview)
      }
    }
  }, [file])

  const getErrorMessage = () => {
    if (fileRejections.length === 0) return ''
    const error = fileRejections[0].errors[0]
    if (error.code === 'file-too-large') {
      return `Archivo demasiado grande (máx. ${maxSize / 1024 / 1024} MB)`
    }
    if (error.code === 'file-invalid-type') {
      return 'Tipo no soportado. Use PDF, DOC, DOCX, JPG o PNG.'
    }
    return error.message
  }

  const removeFile = () => {
    if (file?.preview) {
      URL.revokeObjectURL(file.preview)
    }
    setFile(null)
  }

  const dropzoneClass = [
    'flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-all duration-200 outline-none',
    isDragActive
      ? 'bg-[var(--dropzone-active)] border-[var(--dropzone-active-border)]'
      : isDragReject
      ? 'bg-[var(--dropzone-reject)] border-[var(--dropzone-reject-border)]'
      : 'bg-[var(--dropzone-bg)] border-[var(--dropzone-border)] hover:border-[var(--primary)]'
  ].join(' ')

  return (
    <div className="mt-4">
      {file ? (
        <div className="p-4 border rounded-lg bg-[var(--dropzone-bg)] border-[var(--dropzone-border)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileIcon className="w-6 h-6 text-[var(--primary)]" />
              <div>
                <p className="text-sm font-medium truncate" style={{ maxWidth: '200px' }}>
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(0)} KB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="p-1 rounded-full text-[var(--error)] hover:bg-[var(--dropzone-reject)] transition-colors"
              aria-label="Eliminar archivo"
            >
              <FileX className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div {...getRootProps({ className: dropzoneClass })}>
          {/* input lleva name="attachment" para que EmailJS lo adjunte */}
          <input {...getInputProps({ name: 'attachment', type: 'file' })} />
          <Upload
            className={`w-10 h-10 mb-2 ${
              isDragReject ? 'text-[var(--error)]' : 'text-[var(--primary)]'
            }`}
          />
          <p className="text-center text-sm">
            {isDragActive
              ? 'Suelte el archivo aquí…'
              : 'Arrastre o haga clic para seleccionar archivo'}
          </p>
          <p className="text-xs text-center mt-1 text-gray-500">
            PDF, DOC, DOCX, JPG, PNG (máx. {maxSize / 1024 / 1024} MB)
          </p>
          {fileRejections.length > 0 && (
            <p className="mt-2 text-xs text-[var(--error)]">{getErrorMessage()}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default FileDropzone
