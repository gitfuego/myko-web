import Phone from "../components/Phone";
import SUPage1 from "../components/signup/SUPage1";
import SUPage2 from "../components/signup/SUPage2";
import SUPage3 from "../components/signup/SUPage3";
import SUFailed from "../components/signup/SUFailed";
import SUSuccess from "../components/signup/SUSuccess";
import VerifyFailed from '../components/VerifyFailed';
import { useState } from "react";
import UserFound from "../components/signup/UserFound";

export default function() {
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [verifyFailed, setVerifyFailed] = useState(false);
  const [userFound, setUserFound] = useState(false);
  const [ pageNumber, setPageNumber ] = useState(1);
  
  const [formData, setFormData] = useState({
    phoneNumber: "",
    name: "",
    password: "",
  });

  function nextPage() {
    setPageNumber(pageNumber + 1);
  }

  function backPage() {
    setPageNumber(pageNumber - 1);
  }

  function failureExit() {
    setPageNumber(1);
    setVerifyFailed(false);
  }

  return (
    <Phone>
      {failed ? <SUFailed setFailed={setFailed} /> : ''}
      {success ? <SUSuccess/> : ''}
      {verifyFailed ? <VerifyFailed failureExit={failureExit} /> : ''}
      {userFound ? <UserFound setUserFound={setUserFound}/> : ''}
      {pageNumber === 1 ? <SUPage1 formData={formData} setFormData={setFormData} nextPage={nextPage} setUserFound={setUserFound} /> : 
      pageNumber === 2 ? <SUPage2 formData={formData} nextPage={nextPage} backPage={backPage} setVerifyFailed={setVerifyFailed} /> : 
      <SUPage3 formData={formData} setFormData={setFormData} setSuccess={setSuccess} setFailed={setFailed} />}
    </Phone>
  );
}