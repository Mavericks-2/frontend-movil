import { getPlanogramConfig } from "./planogramService";
import { postComparedPhotos, getAccuracy, getMostFailedProduct, getNumberScanns, getNumberScannsProducts } from "./statusService";
import { classifyImage, compareImages, uploadImage, getImageSize } from "./modelService";
import { signup, verifyToken, getUser, signin } from "./authenticationService";

export { getPlanogramConfig, postComparedPhotos, classifyImage, compareImages, uploadImage, signup, verifyToken, getUser, signin, getImageSize, getAccuracy, getMostFailedProduct, getNumberScanns, getNumberScannsProducts };
