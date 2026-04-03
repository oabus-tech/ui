/**
 * Toast
 *
 * Notification toast system using the Sonner library.
 * Provides success, error, warning, info, and loading variants.
 *
 * Behavior:
 * - Toasts appear at bottom-right (configurable)
 * - Auto-dismiss after timeout
 * - Color-coded left border: green (success), red (error), yellow (warning), blue (info)
 * - Custom icons per variant
 * - Action and cancel button support
 * - Multiple toasts stack with grouping
 *
 * Implementation:
 * - Render <ToastContainer /> (Sonner Toaster) once at app root
 * - Trigger via toast("Message") or toast.success/error/warning/info/loading("Message")
 * - <Toast /> renders the Sonner provider with custom styling
 * - toast.success("Saved!", { description: "Your changes were saved." })
 *
 * Dependencies: sonner library
 */

export type ToastProps = {}
