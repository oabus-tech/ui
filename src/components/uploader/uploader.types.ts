// Dependencies: drag-and-drop API, File API, progress tracking

export type UploaderHandlerResponse = {
  fileName: string // original file name
  fileNameSigned: string // signed/uploaded file name (from server)
}

type BaseUploaderProps = {
  accept?: string // accepted MIME types (e.g. 'image/*,.pdf')
  maxFiles?: number // maximum number of files
  maxFileSize?: number // max file size in bytes
  disabled?: boolean // prevents interaction
  handler: (fileName: string) => Promise<UploaderHandlerResponse> // upload handler (required)
}

type SingleUploaderProps = {
  onUpload?: (response: UploaderHandlerResponse, index: number) => void // fires per file upload
}

type MultipleUploaderProps = {
  onUpload?: (response: UploaderHandlerResponse[], index: number) => void // fires with all uploads
}

export type UploaderProps = BaseUploaderProps &
  (SingleUploaderProps | MultipleUploaderProps)
