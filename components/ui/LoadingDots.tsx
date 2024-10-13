import "@/public/css/loading-dots.css";

export default function LoadingDots({ classes }: { classes?: string }) {
  return (
    <div className={`loader ${classes ? classes : ''}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
