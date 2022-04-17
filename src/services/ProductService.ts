import axiosInstance from '../config/axios';

interface Pin{
    title?: string;
    description?: string;
    imageUrl: string;
    owner: string;
}
const onSubmitPin = async (pin: Pin) => (axiosInstance.post('/create-pin', pin));
const onGetAllPins = async () => (axiosInstance.get('/get-all-pins'));
export { onSubmitPin, onGetAllPins };
