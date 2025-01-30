import { google } from "googleapis";
import fs from "fs";

const apikey = JSON.parse(process.env.GOOGLE_API_SECRET_KEY);

const authenicateGoogle = () => {
    const auth = new google.auth.GoogleAuth({
        credentials : apikey,
        scopes: ["https://www.googleapis.com/auth/drive.file"],
    });
    return auth;
};

const uploadToGoogleDrive = async ( filePath , fileName , fileMimeType) => {
    const auth = authenicateGoogle();
    const drive = google.drive({ version : "v3" , auth });

    const fileMetadata = {
        name : fileName,
        parents : ["1bx0vxKkbJyAa9MBZU9RvK0fZZx2Eglq1"]
    }

    const media = {
        mimeType : fileMimeType,
        body : fs.createReadStream(filePath),
    };
    
    const response = await drive.files.create({
        resource : fileMetadata,
        media : media,
        fields : "id,webViewLink,webContentLink"
    });

    const fileId = response.data.id;
    // Make the file publicly accessible by setting the permissions
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",  // The file will be publicly readable
        type: "anyone",  // "anyone" means anyone with the link can access
      },
    });

    return response.data;
}

export default uploadToGoogleDrive;