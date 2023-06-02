import { useState } from "react";
import SUPage1 from "./SUPage1";
import SUPage2 from "./SUPage2";
import SUPage3 from "./SUPage3";

export default function() {
  const [ pageNumber, setPageNumber ] = useState(1);

  function nextPage() {
    setPageNumber(pageNumber + 2);
  }

  function backPage() {
    setPageNumber(pageNumber - 1);
  }

  const [formData, setFormData] = useState({
    phoneNumber: "",
    name: "",
    password: "",
  });

  return (
    <div style={{height: '100%', width: '100%'}}>
      {pageNumber === 1 ? <SUPage1 formData={formData} setFormData={setFormData} nextPage={nextPage} /> : 
      pageNumber === 2 ? <SUPage2 nextPage={nextPage} backPage={backPage} /> : 
      <SUPage3 formData={formData} setFormData={setFormData} />}
    </div>
  );
}