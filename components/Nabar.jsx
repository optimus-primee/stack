"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
const Nabar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [dropDown, setDropdown] = useState(false);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);

     
    };
    setUpProviders();
  }, []);
  return (
    <div>
      <div className="mb-16 mt-6 sm:px-16 px-6 flex justify-between items-center">
        <Link href="/">
          <h4 className="text-[20px] font-bold uppercase">LOGO</h4>
        </Link>
   
        <div className="sm:flex hidden">
          {session?.user ? (
            <div className="flex items-center  gap-3">
              <Link href="/create-post">
                <button className="px-6 py-3 bg-white text-black rounded">
                  Create Post
                </button>
              </Link>
              <button
                className="px-6 py-3 bg-white text-black rounded"
                type="button"
                onClick={signOut}
              >
                Signout
              </button>
              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile"
                />
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="px-6 py-3 bg-white text-black rounded"
                  >
                {provider.name}
                  </button>
                ))}
            </>
          )}
        </div>
        <div className="sm:hidden flex">
          {session?.user ? (
            <div className=" relative ">
              <div>
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile"
                  onClick={() => setDropdown((prev) => !prev)}
                />
                {dropDown && (
                  <div className="flex flex-col gap-3  absolute right-0 top-full w-full mt-3 min-w-[200px] p-3 justify-end items-end bg-white  ">
                    <Link
                      href="/profile"
                      className="text-black"
                      onClick={() => setDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setDropdown(false)}
                      className="text-black"
                    >
                      Create Post
                    </Link>
                    <button
                      className="px-6 py-3 bg-black text-white rounded"
                      type="button"
                      onClick={() => {
                        setDropdown(false);
                        {
                          signOut;
                        }
                      }}
                    >
                      Sign out{" "}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
               {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.google)}
                    className="px-6 py-3 bg-white text-black rounded"
                  >
                    Sign In
                  </button>
                 
                ))}
                
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nabar;
