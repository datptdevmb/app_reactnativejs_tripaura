import Toast from 'react-native-toast-message';

/**
 * Cập nhật trạng thái booking
 * @param {string} bookingId - ID của booking cần cập nhật
 * @param {string} status - Trạng thái cần cập nhật
 */
export const updateBookingStatus = async (bookingId, status) => {
  try {
    const response = await fetch(`https://trip-aura-server.vercel.app/booking/api/update/${bookingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    if (data.code === 200) {
      Toast.show({
        type: 'success',
        text1: 'Cập nhật booking thành công',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Cập nhật thất bại',
      });
    }
  } catch (error) {
    console.error('Error updating booking status:', error);
    Toast.show({
      type: 'error',
      text1: 'Có lỗi xảy ra khi cập nhật',
    });
  }
};

/**
 * Cập nhật số lượng vé tối đa
 * @param {string} detailId - ID chi tiết cần cập nhật
 * @param {number} ticker - Số lượng vé tối đa mới
 * @returns {object|null} - Payload trả về từ server hoặc null nếu thất bại
 */
export const updateMaxTicket = async (detailId, ticker) => {
  try {
    const response = await fetch(`https://trip-aura-server.vercel.app/detail/api/updateTicket/${detailId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ maxTicket: ticker }),
    });
    const responseData = await response.json();
    if (responseData.code === 200) {
      return responseData.payload;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error updating max ticket:', error);
    return null;
  }
};
