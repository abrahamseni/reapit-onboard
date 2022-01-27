import { FlexContainer, Subtitle } from '@reapit/elements'
import React from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { dropZoneStyle } from './__styles__/styles'

export default function BasicDropzone() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  const files = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

  return (
    <FlexContainer isFlexColumn>
      <div {...getRootProps({ className: dropZoneStyle })}>
        <label htmlFor="dropzone">Drop your invoices file here:</label>
        <input {...getInputProps()} id="dropzone" />
        <p>Drag n drop some files here, or click to select files</p>
      </div>
      <aside>
        <Subtitle>Files</Subtitle>
        <ul>{files}</ul>
      </aside>
    </FlexContainer>
  )
}
