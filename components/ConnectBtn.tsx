import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import { FaArrowRight } from "react-icons/fa";
import React from 'react'
// import { SignInWithMetamaskButton } from "@clerk/nextjs";

const ConnectBtn: React.FC = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated')

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="bg-purple-600 border border-purple-600 hover:bg-black
                        py-2 px-6 text-white rounded-lg
                        transition duration-300 ease-in-out"
                                           // onClick={openConnectModal}
                    type="button"
                    // onClick={() => <SignInWithMetamaskButton/>} 
                  >
                    Connect Wallet to Login
                    
                    {/* Get Started  */}
                    {/* Get Started <FaArrowRight /> */}
                  </button>
                )
              }

              if (chain.unsupported) {
                return (
                  <button
                    className="bg-transparent border border-purple-600 hover:bg-purple-700
                        py-2 px-6 text-purple-600 hover:text-white rounded-md
                        transition duration-300 ease-in-out"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </button>
                )
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    className="bg-transparent border border-purple-600 hover:bg-purple-700
                    py-2 px-6 text-purple-600 hover:text-white rounded-full
                    transition duration-300 ease-in-out"
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            width="12"
                            height="12"
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button
                    className="bg-transparent border border-purple-600 hover:bg-purple-700
                    py-2 px-6 text-purple-600 hover:text-white rounded-full
                    transition duration-300 ease-in-out"
                    onClick={openAccountModal}
                    type="button"
                  >
                    {account.displayName}
                    {/* {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''} */}
                  </button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default ConnectBtn
