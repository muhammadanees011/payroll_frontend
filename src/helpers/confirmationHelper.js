// src/helpers/confirmationHelper.js
import Swal from 'sweetalert2';

export async function showConfirmation({
  title = 'Are you sure?',
  text = 'You won\'t be able to revert this!',
  confirmButtonText = 'Yes, delete it!',
  cancelButtonText = 'Cancel'
} = {}) {
  try {
    const result = await Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText,
      cancelButtonText
    });
    return result.isConfirmed;
  } catch (error) {
    console.error('Error showing confirmation:', error);
    return false;
  }
}
