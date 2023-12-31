const dropZone = document.querySelector(".drop-zone");
const browserBtn = document.querySelector(".browseBtn");
const fileInput = document.querySelector("#fileInput");
const bgProgress = document.querySelector(".bg-progress");

const host = "localhost:3000";
const uploadURL = `${host}api/files`;


dropZone.addEventListener("dragover", (e)=>{
    e.preventDefault()

    if(!dropZone.classList.contains("dragged")){
        dropZone.classList.add("dragged");
    }
});

dropZone.addEventListener("dragleave", ()=>{
    dropZone.classList.remove("dragged")
});

dropZone.addEventListener("drop", (e)=>{
    e.preventDefault();
    dropZone.classList.remove("dragged");
    const files = e.dataTransfer.files
    console.table(files);
    if (files.length) {
        fileInput.files = files;
        uploadFile();
    }

});

fileInput.addEventListener("change", ()=>{
    uploadFile();
})
browserBtn.addEventListener("click", ()=>{
    fileInput.click();
});

const uploadFile = ()=>{

    const file = fileInput.files[0]
    const formData = new formData()
    formData.append("myfile",file)


    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState === XMLHttpRequest.DONE){
            console.log(xhr.response)
    }
    };

    xhr.upload.onprogress = updateProgress;

    xhr.open("POST", uploadURL);
    xhr.send(formData)

}

const updateProgress = (e)=>{
    const percent = Math.round(e.loaded / e.total) * 100
    console.log(e)
    bgProgress.style.width = `${percent}%`
}







 



