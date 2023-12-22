"use client"
import Link from 'next/link'
import Image from 'next/image'
import {useState, useEffect} from "react";
import {signIn, signOut, useSession, getProviders} from "next-auth/react";

const Nav = ({children}) => {
    const {data: session} = useSession()
    const [providers, setProviders] = useState(null)
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const getProvidersFunction = async () => {
            const response = await getProviders()
            setProviders(response)
        }
        getProvidersFunction()
    }, []);

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href='/' className="gap-2 flex flex-center">
                <Image src="/assets/images/logo.svg" width={40} height={40} alt="Promptopia logo" className="object-contain" />
                <p className="logo_text">Promptopia</p>
            </Link>

            <div className="hidden sm:flex">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">Create Post</Link>
                        <button type="button" onClick={signOut} className="outline_btn">Sign out</button>
                        <Link href="/profile"><Image src={session?.user.image} width={37} height={37} className="rounded-full" alt="Profile picture" /></Link>
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map(provider => (
                            <button
                                type="button"
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className="black_btn">
                                Sign in
                            </button>
                        ))}
                    </>
                )}
            </div>
            <div className="sm:hidden flex relative">
                {session?.user ?
                    (<div className="flex">
                        <Image src={session?.user.image} width={37} height={37} className="rounded-full" onClick={() => setToggleDropdown(prevValue => !prevValue)} alt="Profile picture" />
                        {toggleDropdown ?
                            (<div className="dropdown">
                                <Link href='/profile' className="dropdown_link" onClick={() => setToggleDropdown(false)}>My Profile</Link>
                                <Link href='/create-prompt' className="dropdown_link" onClick={() => setToggleDropdown(false)}>Create Prompt</Link>
                                <button type="button" className="black_btn mt-5 w-full" onClick={() => {
                                    setToggleDropdown()
                                    signOut()
                                }}>SignOut</button>
                            </div>) :
                            null
                        }
                    </div>) :
                    (<>
                        {providers && Object.values(providers).map(provider => (
                            <button
                                type="button"
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className="black_btn">
                                Sign in
                            </button>
                        ))}
                    </>)
                }
            </div>
        </nav>
    )
}

export  default Nav;
