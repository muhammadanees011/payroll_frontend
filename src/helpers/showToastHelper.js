import Swal from 'sweetalert2';

/**
 * Show a toast notification.
 * @param {string} type - The type of notification ('success' or 'error').
 * @param {string} message - The message to display.
 */
export function showToast(type, message) {
  const icon = type === 'success' ? 'success' : 'error';
  const title = type === 'success' ? 'Success!' : 'Error!';
  const customClass = type === 'success' ? 'toast-success' : 'toast-error';

  Swal.fire({
    toast: true,
    position: 'top-end',
    icon,
    title: `${title} ${message}`,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
        container: customClass,
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });
}
