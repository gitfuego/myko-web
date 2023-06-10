import Phone from "../components/Phone";
import ForgotPage1 from "../components/forgot/ForgotPage1";
import ForgotPage2 from "../components/forgot/ForgotPage2";
import ForgotPage3 from "../components/forgot/ForgotPage3";
import VerifyFailed from "../components/VerifyFailed";
import ResetSuccess from "../components/forgot/ResetSuccess";
import ResetFailed from "../components/forgot/ResetFailed";
import { useState } from "react";

export default function() {
  const [verifyFailed, setVerifyFailed] = useState(false);
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password1: "",
    password2: ""
  });

  function failureExit() {
    setPageNumber(1);
    setVerifyFailed(false);
  }

  function nextPage() {
    setPageNumber(pageNumber + 1);
  }

  function backPage() {
    setPageNumber(pageNumber - 1);
  }

  return (
    <Phone>
      {verifyFailed ? <VerifyFailed failureExit={failureExit} /> : ''}
      {failed ? <ResetFailed setFailed={setFailed} /> : ''}
      {success ? <ResetSuccess /> : ''}
      {pageNumber === 1 ? <ForgotPage1 formData={formData} setFormData={setFormData} nextPage={nextPage} /> : 
      pageNumber === 2 ? <ForgotPage2 formData={formData} nextPage={nextPage} backPage={backPage} setVerifyFailed={setVerifyFailed} /> : 
      <ForgotPage3 formData={formData} setFormData={setFormData}  setSuccess={setSuccess} setFailed={setFailed}/>}
    </Phone>
  );
}