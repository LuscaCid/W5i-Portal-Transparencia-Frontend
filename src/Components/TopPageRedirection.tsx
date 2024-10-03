import { ChevronUp } from "lucide-react";
import { MutableRefObject, useCallback, } from "react"

interface Props {
  pageRef : MutableRefObject<HTMLDivElement|null>
}
export const TopPageRedirectButton = ((_ : Props) => {
  const handleNavigateToTopPage = useCallback(() => {
    if (_.pageRef && _.pageRef.current)scroll(0, 0);
  }, [_.pageRef]);
  return (
    <button 
        onClick={handleNavigateToTopPage}
        className="flex items-center justify-center rounded-none border-none bg-dark-text fixed h-10 w-10 z-30 shadow-lg bottom-20 right-5"
    >
        <ChevronUp />
    </button>
  )
})