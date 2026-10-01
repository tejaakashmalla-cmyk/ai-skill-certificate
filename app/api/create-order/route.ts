import {NextResponse} from 'next/server';
import Razorpay from 'razorpay';
export async function POST(){try{const key_id=process.env.RAZORPAY_KEY_ID;const key_secret=process.env.RAZORPAY_KEY_SECRET;if(!key_id||!key_secret)return NextResponse.json({error:'Payment is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env.local.'},{status:503});const razorpay=new Razorpay({key_id,key_secret});const order=await razorpay.orders.create({amount:1900,currency:'INR',receipt:`cert_${Date.now()}`,notes:{purpose:'Veyora AI AI Skill Certificate'}});return NextResponse.json({orderId:order.id,keyId:key_id,amount:1900,currency:'INR'});}catch(e){return NextResponse.json({error:'Unable to create payment order. Check your payment gateway credentials.'},{status:502})}}

