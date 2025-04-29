// components/image-uploader.tsx

'use client'

import { useState } from 'react'
import { Button } from './ui/button'

interface ImageUploaderProps {
  setImageUrl: (url: string) => void
}

const ImageUploader = ({ setImageUrl }: ImageUploaderProps) => {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFile(file)
    }
  }

  const uploadFile = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      // Assuming you have an API endpoint for file upload
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        setImageUrl(data.imageUrl) // Assume the response has the URL of the uploaded image
      } else {
        console.error('Failed to upload image')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  return (
    <div className='space-y-4'>
      <input type='file' onChange={handleFileChange} />
      <Button onClick={uploadFile}>Upload</Button>
    </div>
  )
}

export default ImageUploader
