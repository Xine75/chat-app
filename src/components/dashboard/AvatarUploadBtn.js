import React, {useState, useRef} from 'react'
import AvatarEditor from 'react-avatar-editor';
import { Alert, Button, Modal } from 'rsuite';
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { ref as dbRef, update} from "firebase/database";
import { useProfile } from '../../context/profile.context';
import { useModalState } from '../../misc/custom-hooks'
import { storage, database } from '../../misc/firebase';
import ProfileAvatar from './ProfileAvatar';
import { getUserUpdates } from "../../misc/helpers"

const fileInputTypes = ".png, .jpeg, .jpg";

const acceptedFileTypes = ["image/png", "image/jpeg", "image/jpg"];

const isValidFile = (file) => acceptedFileTypes.includes(file.type);

//.getBlob only works on Callback functions, not promises, so this function converts it to a promise function
const getBlob = (canvas) => {
    return new Promise( (resolve, reject) => {
        canvas.toBlob( (blob) => {
            if(blob){
                resolve(blob);
            } else {
                reject(new Error("File process error"))
            }
        });
    });
};

const AvatarUploadBtn = () => {

    const { isOpen, open, close } = useModalState();
    const [image, setImage] = useState(null);
    const avatarEditorRef = useRef();
    const {profile} = useProfile();
    const [isLoading, setIsLoading] = useState(false);

    const onFileInputChange = (ev) => {
        const currFiles = ev.target.files;

        if(currFiles.length === 1){
            const file = currFiles[0];

            if (isValidFile(file)){

                setImage(file)
                open();

            } else {
                Alert.warning(`Wrong file type ${file.type}`, 4000)
            }
        }
    };

    const onUploadClick = async () => {

        const canvas = avatarEditorRef.current.getImageScaledToCanvas();
        setIsLoading(true);
        try {
           
            const blob = await getBlob(canvas);
            const avatarFileRef = storageRef(
                storage, `/profile/${profile.uid}/avatar`);

                await uploadBytes(avatarFileRef, blob, {
                    cacheControl: `public, max-age=${3600 * 24 * 3}` //max age of 3 days specified in seconds
            });                

            const downloadUrl = await getDownloadURL(avatarEditorRef);

            const updates = await getUserUpdates(
                profile.uid,
                "avatar",
                downloadUrl,
                database
            );

            await updates(dbRef(database), updates);

            setIsLoading(false);
            Alert.info("Avatar has been uploaded", 4000);

        } catch (err) {
            setIsLoading(false);
            Alert.error(err.message, 4000)
        }
    }

    return (
        <div className="mt-3 text-center" >
            <ProfileAvatar src={profile.avatar} name={profile.name} className="width-200 height-200 img-fullsize font-huge" />
            <div>
                <label 
                htmlFor="avatar-upload" 
                className="d-block cursor-pointer padded">
                    Select new avatar

                    <input 
                    id="avatar-upload" 
                    type ="file" 
                    className="d-none" 
                    accept={fileInputTypes}
                    onChange={onFileInputChange} />
                </label>

                <Modal show={isOpen} onHide={close}>
                    <Modal.Header>
                            <Modal.Title>Adjust and upload new avatar</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            <div className="d-flex justify-content-center align-items-center h-100">
                            {image && (
                        <AvatarEditor
                            ref={avatarEditorRef}
                            image={image}
                            width={200}
                            height={200}
                            border={10}
                            borderRadius={100}
                            rotate={0}
                            />)}
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button block appearance="ghost" onClick={onUploadClick} disabled={isLoading}>
                                Upload new avatar
                            </Button>
                        </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default AvatarUploadBtn
