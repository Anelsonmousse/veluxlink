import dynamic from "next/dynamic";

const CallComp = dynamic(() => import("../../components/Call"), {
  ssr: false,
});
export default function Call() {
  return <CallComp />;
}
