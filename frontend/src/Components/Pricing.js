import React, { useState } from "react";
import axios from "axios"

import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

const PricingCard = () => {
    const { isLoggedIn, userr, checkUserLoggedIn, handleLogout } = useContext(UserContext);

    const handlepayment1 = async () => {
        try {
            if (!isLoggedIn) {
                alert("You are not logged in.");
                return;
                // return navigate("/login");
            }
            // if (userr.isPremium) {
            //     alert('Premium is already there');
            //     return;
            // }

            const orderApi = "http://localhost:8800/api/payment/orders";
            const { data } = await axios.post(
                orderApi,
                { amount: 3500 },
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods":
                            "POST, GET, OPTIONS, PUT, DELETE",
                        "Access-Control-Allow-Headers":
                            "Content-Type, X-Auth-Token, Origin, Authorization",
                    },
                }
            );
            console.log(data);
            initPayment(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handlepayment2 = async () => {
        try {
            if (!isLoggedIn) {
                alert("You are not logged in.");
                return;
                // return navigate("/login");
            }
            // if (userr.isPremium) {
            //     alert('Premium is already there');
            //     return;
            // }

            const orderApi = "http://localhost:8800/api/payment/orders";
            const { data } = await axios.post(
                orderApi,
                { amount: 4500 },
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods":
                            "POST, GET, OPTIONS, PUT, DELETE",
                        "Access-Control-Allow-Headers":
                            "Content-Type, X-Auth-Token, Origin, Authorization",
                    },
                }
            );
            console.log(data);
            initPayment(data.data);
        } catch (error) {
            console.log(error);
        }
    };


    const initPayment = (data) => {
        console.log("In init")
        const options = {
            key: "rzp_test_Uf8e5ZC0BrgIFH",
            amount: data.amount,
            currency: data.currency,
            description: "Test Transaction",
            order_id: data.id,
            handler: async (response) => {
                try {
                    const verifyApi = "http://localhost:8800/api/pay/verifyPremium";
                    const { data } = await axios.post(verifyApi, { ...response, userId: userr._id }, {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
                            'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, Origin, Authorization',
                        },
                    });
                    console.log(data);
                    if (data.status) {
                        alert("Purchased Premium Succesfully");
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#f57e42",
            },
        };

        console.log(options)
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    return (
        <div className="min-h-screen flex justify-center items-center mt-20 mb-20">
            <div className="">
                <div className="text-center font-semibold">
                    <h1 className="text-5xl">
                        <span className="text-red-500 tracking-wide">Flexible </span>
                        <span className='text-white'>Plans</span>
                    </h1>
                    <p className="pt-6 text-xl text-gray-400 font-normal w-full px-8 md:w-full">
                        Choose a plan that works best for you and<br /> your needs.
                    </p>
                </div>
                <div className="pt-24 flex flex-row gap-32">
                    <div className="w-96 p-8 bg-white text-center rounded-3xl pr-16 shadow-xl scale-95">
                        <h1 className="text-black font-semibold text-2xl">Regular</h1>
                        <p className="pt-2 tracking-wide">
                            <span className="text-gray-400 align-top">₹</span>
                            <span className="text-3xl font-semibold">3500 </span>
                            <span className="text-gray-400 font-medium">/ month</span>
                        </p>
                        <hr className="mt-4 border-1" />
                        <div className="pt-8">
                            <p className="font-semibold text-gray-400 text-left">
                                <span className="material-icons align-middle">
                                    done
                                </span>
                                <span className="pl-2">
                                    Varied <span className="text-black">food </span>option
                                </span>
                            </p>
                            <p className="font-semibold text-gray-400 text-left pt-5">
                                <span className="material-icons align-middle">
                                    done
                                </span>
                                <span className="pl-2">
                                    Best <span className="text-black">Rated </span>Menu & Restaurant <span className='text-black px-8'>Listings</span>
                                </span>
                            </p>
                            <p className="font-semibold text-gray-400 text-left pt-5">
                                <span className="material-icons align-middle">
                                    done
                                </span>
                                <span className="pl-2">
                                    Delivery person Details for <span className="text-black px-8">secure on-time delivery</span>
                                </span>
                            </p>

                            <p className="" onClick={handlepayment1}>
                                <p className="w-full py-4 bg-red-600 mt-8 rounded-xl text-white">
                                    <span className="font-medium">
                                        Choose Plan
                                    </span>
                                    <span className="pl-2 material-icons align-middle text-sm">
                                        east
                                    </span>
                                </p>
                            </p>
                        </div>
                    </div>
                    <div className="w-80 p-8 bg-gray-900 text-center rounded-3xl text-white border-4 shadow-xl border-white transform scale-100">
                        <h1 className="text-white font-semibold text-2xl">Premium</h1>
                        <p className="pt-2 tracking-wide">
                            <span className="text-gray-400 align-top">₹ </span>
                            <span className="text-3xl text-white font-semibold">4500</span>
                            <span className="text-gray-400 font-medium">/ month</span>
                        </p>
                        <hr className="mt-4 border-1 border-gray-600" />
                        <div className="pt-8">
                            <p className="font-semibold text-gray-400 text-left">
                                <span className="material-icons align-middle">
                                    done
                                </span>
                                <span className="pl-2">
                                    All features in <span className="text-white">Regular</span>
                                </span>
                            </p>
                            <p className="font-semibold text-gray-400 text-left pt-5">
                                <span className="material-icons align-middle">
                                    done
                                </span>
                                <span className="pl-2">
                                    <span className="text-white">Customized </span> (Food) Thalis
                                </span>
                            </p>
                            <p className="font-semibold text-gray-400 text-left pt-5">
                                <span className="material-icons align-middle">
                                    done
                                </span>
                                <span className="pl-2">
                                    <span className="text-white">Ad-Free </span>Experience
                                </span>
                            </p>
                            <p className="font-semibold text-gray-400 text-left pt-5">
                                <span className="material-icons align-middle">
                                    done
                                </span>
                                <span className="pl-2">
                                    Exclusive <span className="text-white">Discounts, Gift </span><span className='text-white px-8'>Cards & Vouchers</span>
                                </span>
                            </p>

                            <p className="" onClick={handlepayment2}>
                                <p className="w-full py-4 bg-red-600 mt-8 rounded-xl text-white">
                                    <span className="font-medium">
                                        Choose Plan
                                    </span>
                                    <span className="pl-2 material-icons align-middle text-sm">
                                        east
                                    </span>
                                </p>
                            </p>
                        </div>
                        <div className="absolute top-4 right-4">
                            <p className="bg-red-700 text-white font-semibold px-4 py-1 rounded-full uppercase text-xs">Popular</p>
                        </div>
                    </div>
                    {/* <div className="w-96 p-8 bg-white text-center rounded-3xl pl-16 shadow-xl">
                    <h1 className="text-black font-semibold text-2xl">Enterprise</h1>
                    <p className="pt-2 tracking-wide">
                        <span className="text-gray-400 align-top">₹ </span>
                        <span className="text-3xl font-semibold">35</span>
                        <span className="text-gray-400 font-medium">/ month</span>
                    </p>
                    <hr className="mt-4 border-1" />
                    <div className="pt-8">
                        <p className="font-semibold text-gray-400 text-left">
                            <span className="material-icons align-middle">
                                done
                            </span>
                            <span className="pl-2">
                                All features in <span className="text-black">Startup</span>
                            </span>
                        </p>
                        <p className="font-semibold text-gray-400 text-left pt-5">
                            <span className="material-icons align-middle">
                                done
                            </span>
                            <span className="pl-2">
                                Growth <span className="text-black">oriented</span>
                            </span>
                        </p>
                        <p className="font-semibold text-gray-400 text-left pt-5">
                            <span className="material-icons align-middle">
                                done
                            </span>
                            <span className="pl-2">
                                <span className="text-black">Unlimited</span> cloud storage
                            </span>
                        </p>

                        <a href="#" className="">
                            <p className="w-full py-4 bg-red-600 mt-8 rounded-xl text-white">
                                <span className="font-medium">
                                    Choose Plan
                                </span>
                                <span className="pl-2 material-icons align-middle text-sm">
                                    east
                                </span>
                            </p>
                        </a>
                    </div>
                </div> */}
                </div>
            </div>
        </div>
    )
}

export default PricingCard

