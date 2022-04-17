import axiosInstance from '../config/axios';

interface Pin{
    title?: string;
    description?: string;
    imageUrl: string;
    owner: string;
}
const onSubmitPin = async (pin: Pin) => (axiosInstance.post('/create-pin', pin));
const onGetAllPins = async () => (axiosInstance.get('/get-all-pins'));
const onGetPinsByUser = async (userId: string) => (axiosInstance.get(`/get-all-pins-by-user/${userId}`));
const onGetPinById = async (pinId: string) => (axiosInstance.get(`/get-pin-by-id/${pinId}`));
export {
  onSubmitPin, onGetAllPins, onGetPinsByUser, onGetPinById,
};
