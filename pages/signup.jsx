import { useRouter } from "next/router";
import Phone from "../components/Phone";
import SUContainer from "../components/signup/SUContainer";
import SUFailed from "../components/signup/SUFailed";
import SUSuccess from "../components/signup/SUSuccess";

export default function() {
  const router = useRouter();
  const { failed, success } = router.query;
  return (
    <Phone>
      {failed ? <SUFailed /> : ''}
      {success ? <SUSuccess /> : ''}
      <SUContainer />
    </Phone>
  );
}