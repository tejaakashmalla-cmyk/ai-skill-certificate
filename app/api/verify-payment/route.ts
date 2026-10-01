import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req:Request){
  try{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature,name,email,organization,score}=await req.json();
    const secret=process.env.RAZORPAY_KEY_SECRET;
    if(!secret) return NextResponse.json({error:'Payment verification is not configured.'},{status:500});
    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) return NextResponse.json({error:'Missing payment details.'},{status:400});
    const expected=crypto.createHmac('sha256',secret).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex');
    if(expected!==razorpay_signature) return NextResponse.json({error:'Payment verification failed.'},{status:400});
    if(Number(score)<21) return NextResponse.json({error:'Certificate requires a passing score.'},{status:400});
    const certificateId=`AIA-${new Date().getFullYear()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    return NextResponse.json({verified:true,certificateId,name,email,organization:organization||'',score:Number(score),paymentId:razorpay_payment_id,issuedAt:new Date().toISOString()});
  }catch{return NextResponse.json({error:'Invalid verification request.'},{status:400});}
}
