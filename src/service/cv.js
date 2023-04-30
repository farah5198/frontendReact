import Axios from "axios";

export const updateCv = async (CvData, iduser) => {
    const result = await Axios.put(
      "http://localhost:5000/cv/update/" + iduser,
      CvData
    );
    return result.data;
  };

{/* export const getCvbyid = async (id) => {
    const result = await Axios.get("http://localhost:5000/cv/getbyid/" + id);
    return result.data;
  }; */}

export const getCvbyiduser = async (iduser) => {
    const result = await Axios.get("http://localhost:5000/cv/getbyiduser/" + iduser);
    return result.data;
  };