import { Modal } from "react-bootstrap";
function isGifFile(filename) {
    // Get the file extension
    const extension = filename.split(".").pop().toLowerCase();

    // Check if the extension is "gif"
    return extension === "gif";
}
const VideoModal = ({ show, handleClose, videoUrl, posterImage }) => {
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body style={{ padding: "unset" }}>
                <>
                    {isGifFile(videoUrl) ? (
                        <img src={videoUrl} style={{ height: "100%", width: "100%", objectFit: "contain", maxHeight: "500px", paddingBottom: "5px" }} />
                    ) : (
                        <iframe
                            loading="lazy"
                            width="100%"
                            height={"548"}
                            src={videoUrl}
                            frameBorder="0"
                            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            poster={posterImage}
                        />
                    )}
                </>
            </Modal.Body>
        </Modal>
    );
};

export default VideoModal;
