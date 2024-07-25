import React from 'react'

const Policy = (props) => {
  return (
    <div  tabindex="-1" className="absolute top-[0px] left-0 z-50 w-[100%] p-4">
    <div className="relative w-[100%] ">
        
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
     
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-[2rem] font-medium text-gray-900 dark:text-white">
                  Terms & Policy 
                </h3>
                <button  type="button" onClick={()=>{props.setPolicy(false)}} className="text-white  bg-black hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="small-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
  
            <div className="p-4 md:p-5 space-y-4">
                <p className="text-[1.5rem] leading-relaxed text-gray-500 dark:text-gray-400">
                    With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                </p>
                <p className="text-[1.5rem] leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
            </div>
       
        
        </div>
    </div>
</div>

  )
}

export default Policy