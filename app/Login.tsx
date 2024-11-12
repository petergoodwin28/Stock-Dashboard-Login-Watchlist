import { signIn } from "next-auth/react";
import React from "react";
import Image from "next/image";
import { useFeatureFlags } from '@/components/FeatureFlagWrapper';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Link from "next/link";

function Login() {
  const { featureFlags, setFeatureFlags } = useFeatureFlags();
  const allowedMethods = ['github', 'google'];

  function handleLogin(value: boolean, method: string) {
    if (allowedMethods.includes(method)) {
      // Update the feature flag in session storage for persistence
      sessionStorage.setItem("featureWatchlist", JSON.stringify(value));
      
      // Update the state
      setFeatureFlags({ ...featureFlags, featureWatchlist: value });

      // Sign in with redirect
      signIn(method);
    }
  }

  return (
    <div className="m-auto prose w-full max-w-md ">
      <div className="flex flex-col border rounded-xl mt-32 p-10 pt-5 text-center">
        <h2 className="text-2xl mb-6 border-b-2">Please Login</h2>

        <div className="flex items-center justify-center space-x-4 w-full mb-4">
          <p className="text-lg flex-grow">Sign in with Google</p>
          <HoverCard>
            <HoverCardTrigger asChild>
              <button type="button" onClick={() => handleLogin(true, 'google')}>
                <Image width={24} height={24} src="/icons8-gmail.svg" alt="Google icon" />
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="text-sm">
              <a target="_blank" href="https://icons8.com/icon/P7UIlhbpWzZm/gmail">Gmail</a> icon by
              <a target="_blank" href="https://icons8.com">Icons8</a>
            </HoverCardContent>
          </HoverCard>
        </div>

        <div className="flex items-center justify-center space-x-4 w-full">
          <p className="text-lg flex-grow">Sign in with Github</p>
          <HoverCard>
            <HoverCardTrigger asChild>
              <button type="button" onClick={() => handleLogin(true, 'github')}>
                <Image width={24} height={24} src="/icons8-github.svg" alt="GitHub icon" />
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="text-sm">
              <a target="_blank" href="https://icons8.com/icon/106562/github">GitHub</a> icon by
              <a target="_blank" href="https://icons8.com">Icons8</a>
            </HoverCardContent>
          </HoverCard>
        </div>
        
        <div className="flex items-center justify-center space-x-4 w-full pt-5">
          <Link href={"/stockdashboard"} onClick={() => handleLogin(false, 'null')}>Continue as Guest</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;



// import { signIn } from "next-auth/react";
// import React from "react";
// import Image from "next/image"; // Import Next.js Image component

// import { useFeatureFlags } from '@/components/FeatureFlagWrapper'

// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "@/components/ui/hover-card";
// import Link from "next/link";

// function Login() {

//     const { featureFlags, setFeatureFlags } = useFeatureFlags();
//     const allowedMethods = ['github', 'google']

//     function handleLogin(value : boolean, method : string) {

//         if ( allowedMethods.includes(method) ) {
//             console.log("@ login")
//             // sign in 
//             signIn(method)
//         }

//         // update feature flag so that watchlist is conditionally rendered
//         setFeatureFlags({ ...featureFlags, featureWatchlist: value})

//     }


//   return (
//     <div className="ml-auto mr-auto prose w-full max-w-md">
//       <div className="flex flex-col border rounded-xl m-10 p-10 pt-5 text-center">
//         <h2 className="text-2xl mb-6 border-b-2">Please Login</h2>

//         <div className="flex items-center justify-center space-x-4 w-full mb-4">
//           <p className="text-lg flex-grow">Sign in with Google</p>
//           <HoverCard>
//             <HoverCardTrigger asChild>
//               <button type="button" onClick={() => {
//                 console.log('google sign in attempt')
//                 handleLogin(true, 'google')}}>
//                 <Image
//                   width={24}
//                   height={24}
//                   src="/icons8-gmail.svg"
//                   alt="Google icon"
//                 />
//               </button>
//             </HoverCardTrigger>
//             <HoverCardContent className="text-sm">
//               <a
//                 target="_blank"
//                 href="https://icons8.com/icon/P7UIlhbpWzZm/gmail"
//               >
//                 Gmail
//               </a>
//               icon by
//               <a target="_blank" href="https://icons8.com">
//                 Icons8
//               </a>
//             </HoverCardContent>
//           </HoverCard>
//         </div>

//         <div className="flex items-center justify-center space-x-4 w-full">
//           <p className="text-lg flex-grow">Sign in with Github</p>
//           <HoverCard>
//             <HoverCardTrigger asChild>
//               <button type="button" onClick={() => {
//                 console.log('github sign in attempt')
//                 handleLogin( true, 'github' )
//                 //updateFeatureWatchlist(true)
//                 //signIn("github")
//                 }}>
//                 <Image
//                   width={24}
//                   height={24}
//                   src="/icons8-github.svg"
//                   alt="GitHub icon"
//                 />
//               </button>
//             </HoverCardTrigger>
//             <HoverCardContent className="text-sm">
//               <a target="_blank" href="https://icons8.com/icon/106562/github">
//                 GitHub
//               </a>
//               icon by
//               <a target="_blank" href="https://icons8.com">
//                 Icons8
//               </a>
//             </HoverCardContent>
//           </HoverCard>
//         </div>
//         <div className="flex items-center justify-center space-x-4 w-full pt-5">
//           {/* pushes to /stockdashboard and updates feature flag to not give watchlist  */}
//           <Link href={"/stockdashboard"} onClick={() => handleLogin(false, 'null')}> Continue as Guest </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
