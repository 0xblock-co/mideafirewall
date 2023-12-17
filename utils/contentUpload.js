import { contentUploadStaticObj, durationLimit, fileLimit, regex, regexMessage } from "@/constants/global.constants";
import { ToastMessage } from "./toastMessage.utils";
export const getStaticData = (isEdit) => {
    let staticData = [];
    if (isEdit) {
        return staticData;
    }
    staticData = [{ ...contentUploadStaticObj, index: 0, isDropBox: true }];
    return staticData;
};

export const getVideoDuration = async (file) => {
    return new Promise((resolve, reject) => {
        try {
            if (file.type !== "video/avi") {
                let video = document.createElement("video");
                video.preload = "metadata";
                video.onloadedmetadata = function () {
                    resolve(this);
                };
                video.onerror = function () {
                    reject("Invalid video. Please select a video file.");
                };
                video.src = window.URL.createObjectURL(file);
            } else {
                ToastMessage.error("Video format is not supported");
                reject(false);
            }
        } catch (e) {
            reject(e);
        }
    });
};

export const checkContentValidation = async (fileData, isContentUpload, maxUploadFileSizeInMb) => {
    let totalContentSize = 0;
    const contentItem = [];
    const files = [];
    if (fileData) {
        // fileData.map((item) => {
        //   if (item.file) {
        //     contentItem.push(item);
        //     files.push(item.file);
        //   }
        // });

        fileData.map((item) => {
            if (item.file) {
                // Create a new Blob with the modified filename and the same type as the original file
                const modifiedBlob = new Blob([item.file], { type: item.file.type });

                // Create a new File object with the modifiedBlob and the modified filename
                const modifiedFile = new File([modifiedBlob], item.file.name.replace(/\s/g, "_"), { type: item.file.type });

                // Update the item with the new file
                item.file = modifiedFile;

                contentItem.push(item);
                files.push(modifiedFile);
            }
        });
    }
    for (let mediaFile of files) {
        // for gallery content validation
        if (!isContentUpload && !mediaFile.name.match(regex.imageExt)) {
            ToastMessage.error(regexMessage.imageExtMsg);
            return false;
        }

        // for content validation
        if (isContentUpload && !mediaFile.name.match(regex.imageVideoExt)) {
            ToastMessage.error(regexMessage.imageVideoExtMsg);
            return false;
        }

        totalContentSize = totalContentSize + mediaFile.size;
        if (isContentUpload && !mediaFile.type.includes("image") && !mediaFile.type.includes("video")) {
            ToastMessage.error("Only image and video files are allowed.");
            return false;
        }

        // if (isContentUpload && mediaFile.type.includes("video")) {
        //     const maxDuration = durationLimit.MAX_VIDEO_DURATION_PREMIUM;

        //     const video = await getVideoDuration(mediaFile);
        //     if (video && video.duration > maxDuration) {
        //         ToastMessage.error("Video duration can not be longer than 10 minutes.");
        //         return false;
        //     }
        // }
    }

    if (isContentUpload) {
        const maxFileSize = mbToBytes(maxUploadFileSizeInMb);
        if (totalContentSize > maxFileSize) {
            ToastMessage.error(`File size can not be larger than ${maxUploadFileSizeInMb}MB.`);
            return false;
        }
    }
    return true;
};

function mbToBytes(mb) {
    // 1 megabyte is equivalent to 1,048,576 bytes
    var bytes = mb * 1024 * 1024;
    return bytes;
}
