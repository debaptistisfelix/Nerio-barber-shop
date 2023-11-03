import toast, { Toaster } from 'react-hot-toast';

const notify = (text, status) => toast(<>{text}</>, {
    style:{
        backgroundColor: status === "success" ? "gray" : "red",
        color: status === "success" ? "white" : "white",
        zIndex: 9999,
    }
   });

export default notify;