
import HttpService from 'utils/http'

export const uploadfile = (file) => {
  let apiEndpoint = '/File/UploadImage';
  if (file) {
    return HttpService.uploadFile(apiEndpoint, { Files: file }).then(res => {
      return res && res.data ? res.data : null;

    }).catch(() => { return false });
  }

  return false;
}

export const uploadMultifile = (fileData) => {
  let apiEndpoint = '/File/UploadMultiImage';
  // let file = fileData.target.files ? fileData.target.files[0] : null;
  if (fileData) {
    return HttpService.uploadFile(apiEndpoint, { Files: fileData }).then(res => {
      return res.data.data && res.data.data ? res.data.data : null;

    }).catch(() => { return false });
  }

  return false;
}
