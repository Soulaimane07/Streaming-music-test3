import React from 'react'
import { FaMinus } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { GetPlans } from '../../../Components/Functions';
import Plan from '../../../Components/Elements/Plans/Plan';
import Footer2 from '../../../Components/Footer2/Footer2';

function Settings() {
    const plans = GetPlans()

  return (
    <div className='flex-1 relative '>
        <div className='pb-40 min-h-screen pt-12'>
            <div className=' pt-40 -mt-12 pb-20 bg-gradient-to-b from-purple-800 to-zinc-900  px-12 flex justify-between'>
                <div className='w-2/3'>
                    <h1 className='text-5xl font-bold mb-6'> 30$ pour 1 mois de Premium </h1>
                    <p className='text-md '> Écoutez votre musique sans pub, hors connexion, et bien plus encore. Annulez à tout moment. </p>
                    <div className='flex space-x-4 mt-8'>
                        <button className='bg-violet-600 px-10 py-2.5 rounded-full hover:scale-105 transition-all font-medium'> Commencer </button>
                        <a href='#subscriptions' className='bg-black border-2 border-gray-300 hover:scale-105 transition-all px-10 py-2.5 rounded-full font-medium'> Voir tous les abonnements </a>
                    </div>
                    <p className='text-xs mr-40 opacity-40 mt-8'> Premium Personnel uniquement. 0 MAD pour 3 mois, puis 40 MAD par mois. Offre uniquement disponible si vous n'avez jamais essayé Premium. Offre soumise à conditions.
                    Valable jusqu'au 31 décembre 2024. </p>
                </div>
                <div className=' flex-1 px-10 '></div>
            </div>

            <div className='text-center mt-20 mb-60'>
                <h1 className='text-3xl font-bold'> Vivez la différence </h1>
                <p className='w-1/2 opacity-80 font-medium mt-5 mx-auto'>Passez à Premium et bénéficiez d'un contrôle total sur votre musique. Annulez à tout moment.</p>

                <div id="detailed-pricing" className="mt-14 overflow-x-auto w-2/3 rounded-sm mx-auto">
                    <div className="overflow-hidden ">
                        <div className="grid grid-cols-3 p-4 text-left text-sm font-medium  border-t border-b border-gray-200 gap-x-16 ">
                            <div className="flex items-center">Vos avantages</div>
                            <div className='w-full'>Spotify sans abonnement</div>
                            <div>Abonnements Spotify Premium</div>
                        </div>
                        <div className="grid grid-cols-3 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                            <div className="text-gray-500 text-left dark:text-gray-400"> Musique sans pub </div>
                            <div className='text-zinc-500 mt-2'>
                                <FaMinus size={24} />
                            </div>
                            <div className='text-white'>
                                <FaCircleCheck size={30} />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                            <div className="text-gray-500 text-left dark:text-gray-400"> Télécharger pour écouter en mode hors connexion </div>
                            <div className='text-zinc-500 mt-2'>
                                <FaMinus size={24} />
                            </div>
                            <div className='text-white'>
                                <FaCircleCheck size={30} />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                            <div className="text-gray-500 text-left dark:text-gray-400"> Choisissez l'ordre de vos titres </div>
                            <div className='text-zinc-500 mt-2'>
                                <FaMinus size={24} />
                            </div>
                            <div className='text-white'>
                                <FaCircleCheck size={30} />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                            <div className="text-gray-500 text-left dark:text-gray-400"> Qualité sonore supérieure </div>
                            <div className='text-zinc-500 mt-2'>
                                <FaMinus size={24} />
                            </div>
                            <div className='text-white'>
                                <FaCircleCheck size={30} />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                            <div className="text-gray-500 text-left dark:text-gray-400"> Écoutez avec d'autres personnes en temps réel </div>
                            <div className='text-zinc-500 mt-2'>
                                <FaMinus size={24} />
                            </div>
                            <div className='text-white'>
                                <FaCircleCheck size={30} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='text-center mb-60'>
                <h1 className='text-3xl font-bold'>Des abonnements abordables pour chaque situation</h1>
                <p className='w-2/3 opacity-80 font-medium mt-5 mx-auto'>Choisissez un abonnement Premium, et écoutez à volonté, sans pub, sur votre téléphone, votre enceinte et d'autres appareils. Payez de différentes manières. Annulez à tout moment.</p>
                <div className='flex items-center justify-center space-x-4 mt-4'>
                    <img src="../images/visa.png" alt='visa' className='w-16 transition-all hover:bg-zinc-400 p-2 rounded-sm' />
                    <img src="../images/Mastercard.png" alt='mastercard' className='w-16 transition-all hover:bg-zinc-400 p-2 rounded-sm' />
                </div>
            </div>

            <div id='subscriptions' className='text-center mb-32 mx-28'>
                <h1 className='text-3xl font-bold w-1/2 mx-auto'> Avantages inclus dans tous les abonnements Premium </h1>
                <div className=' grid grid-cols-3 gap-6 mt-10 '>
                    {plans?.map((item,key)=> (
                        <Plan data={item} key={key} />
                    ))}
                </div>
            </div>
        </div>
        <Footer2 />
    </div>
  )
}

export default Settings