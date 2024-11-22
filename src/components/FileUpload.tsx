import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setLoading, setError, setInvoices, setProducts, setCustomers } from '../store/store'
import { processFile } from '../lib/fileProcessing'

export function FileUpload() {
  const dispatch = useDispatch()
  const [debug, setDebug] = useState('')

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    dispatch(setLoading(true))
    dispatch(setError(null))
    setDebug('')

    try {
      for (const file of acceptedFiles) {
        console.log('Processing file:', file.name, file.type)
        try {
          const result = await processFile(file)
          console.log('Processed result:', result)
          
          if (result) {
            dispatch(setInvoices(result.invoices))
            dispatch(setProducts(result.products))
            dispatch(setCustomers(result.customers))
          }
        } catch (error) {
          console.error('File processing error:', error)
          const errorMessage = error instanceof Error ? error.message : 'Unknown error'
          dispatch(setError(`Error processing ${file.name}: ${errorMessage}`))
          setDebug(`Failed to process file: ${errorMessage}\nPlease make sure you're uploading a valid PDF invoice.`)
        }
      }
    } catch (error) {
      console.error('Upload error:', error)
      dispatch(setError('Error uploading files'))
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    }
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'}`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive
            ? 'Drop the files here...'
            : 'Drag and drop files here, or click to select files'}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Supports PDF files
        </p>
      </div>
      {debug && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded text-sm">
          <pre className="whitespace-pre-wrap text-yellow-800">{debug}</pre>
        </div>
      )}
    </div>
  )
}