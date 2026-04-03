/**
 * Uploader
 *
 * File upload component with drag-and-drop, progress tracking, and file list.
 * Handles the upload lifecycle via a handler function that returns signed URLs.
 *
 * Behavior:
 * - Drag-and-drop area with dashed border (highlights on drag-over)
 * - Click to open native file picker
 * - accept: MIME type filter (e.g. "image/*,.pdf")
 * - maxFiles: limits number of files
 * - maxFileSize: limits individual file size in bytes
 * - File list shows: filename, progress bar, remove button, status icon
 * - States per file: pending → uploading (with progress %) → done / error
 * - handler(fileName) returns { fileName, fileNameSigned } — then PUT to signed URL
 * - onUpload fires with handler response(s) after successful upload
 *
 * Implementation:
 * - HTML5 File API + drag-and-drop events (onDragOver, onDrop)
 * - XMLHttpRequest for upload (to track progress via xhr.upload.onprogress)
 * - File state tracked in array: { file, progress, status, response }
 * - <Uploader accept="image/*" maxFiles={5} maxFileSize={5_000_000}
 *     handler={getSignedUrl} onUpload={handleUploaded} />
 *
 * Dependencies: none (uses native File API + XMLHttpRequest)
 */

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
