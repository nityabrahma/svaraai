'use client';

export default function BackgroundDecorations() {
  return (
    <>
        <div className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-primary/10 blur-[12rem] -z-10" />
        <div className="fixed bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-accent/10 blur-[12rem] -z-10" />
    </>
  );
}
