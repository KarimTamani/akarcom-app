import api from "./api";


const uploadFile = async  (file : File , tour  : boolean = false): Promise<string | null> => {

    
    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post("/upload" + (tour ? "/virtual-tour" : ""), formData, {
        headers: {
            "Content-Type": tour ? "application/x-rar-compressed" :  "multipart/form-data",
            
        },
        onUploadProgress: (progressEvent) => {
            const progress = Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
            );
            console.log(`Uploading... ${progress}%`);
        },
    });

    return res.data.fileUrl;
}


export default uploadFile ; 